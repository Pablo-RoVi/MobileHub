using MobileHub.Src.Data;
using MobileHub.Src.DTOs;
using MobileHub.Src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Text;
using System;

namespace MobileHub.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        
        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(RegisterDTO registerDto)
        {
            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Rut.Replace(".", "").Replace("-", ""), salt);

            var user = new User()
            {
                Email = registerDto.Email,
                Rut = registerDto.Rut,
                BirthYear = registerDto.BirthYear,
                FullName = registerDto.FullName,
                Password = passwordHash
            };

            var createdUser = (await _context.Users.AddAsync(user)).Entity;

            await _context.SaveChangesAsync();

            var token = CreateToken(createdUser);

            return token;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(LoginDTO loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user is null) return BadRequest("Invalid Credentials");

            var result = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);

            if(!result) return BadRequest("Invalid Credentials");

            var token = CreateToken(user);
            
            return token;
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new ("email", user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!
            ));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}