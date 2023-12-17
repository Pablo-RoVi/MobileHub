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
    /// <summary>
    /// Controller responsible for authentication operations.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        
        /// <summary>
        /// Initializes a new instance of the <see cref="AuthController"/> class.
        /// </summary>
        /// <param name="context">The data context.</param>
        /// <param name="configuration">The configuration.</param>
        public AuthController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Registers a new user.
        /// </summary>
        /// <param name="registerDto">The registration data.</param>
        /// <returns>Returns a token and user information upon successful registration.</returns>
        [HttpPost("register")]
        public async Task<ActionResult<LoggedUserDTO>> Register(RegisterDTO registerDto)
        {
            // Generate a salt for password hashing with a cost factor of 12.
            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);

            // Hash the user's password using BCrypt with the generated salt.
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Rut.Replace(".", "").Replace("-", ""), salt);

            // Create a new User object with the provided registration data and hashed password.
            var user = new User()
            {
                Email = registerDto.Email,
                Rut = registerDto.Rut,
                BirthYear = registerDto.BirthYear,
                FullName = registerDto.FullName,
                Password = passwordHash
            };

            // Add the new user to the database asynchronously and retrieve the created entity.
            var createdUser = (await _context.Users.AddAsync(user)).Entity;

            // Save changes to the database.
            await _context.SaveChangesAsync();

            // Create a JWT token for the newly registered user.
            var token = CreateToken(createdUser);

            // Create a DTO representing the logged-in user with token and user information.
            var loggedUser = new LoggedUserDTO()
            {
                Token = token,
                Email = createdUser.Email,
                Rut = createdUser.Rut,
                BirthYear = createdUser.BirthYear,
                FullName = createdUser.FullName
            };

            // Return the DTO as the result of the registration process.
            return loggedUser;

        }

        /// <summary>
        /// Logs in an existing user.
        /// </summary>
        /// <param name="loginDto">The login data.</param>
        /// <returns>Returns a token and user information upon successful login.</returns>
        [HttpPost("login")]
        public async Task<ActionResult<LoggedUserDTO>> Login(LoginDTO loginDto)
        {
            // Attempt to retrieve a user from the database based on the provided email.
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            // Check if the user is not found. If so, return a BadRequest response indicating invalid credentials.
            if (user is null)
            {
                return BadRequest("Invalid Credentials");
            }

            // Verify the provided password against the hashed password stored in the database.
            var result = BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password);

            // Check if the password verification fails. If so, return a BadRequest response indicating invalid credentials.
            if (!result)
            {
                return BadRequest("Invalid Credentials");
            }

            // Create a JWT token for the authenticated user.
            var token = CreateToken(user);

            // Create a DTO representing the logged-in user with token and user information.
            var loggedUser = new LoggedUserDTO()
            {
                Token = token,
                Email = user.Email,
                Rut = user.Rut,
                BirthYear = user.BirthYear,
                FullName = user.FullName
            };

            // Return the DTO as the result of the successful login process.
            return loggedUser;
        }

        /// <summary>
        /// Creates a JWT token for the specified user.
        /// </summary>
        /// <param name="user">The user for whom the token is created.</param>
        /// <returns>Returns a JWT token.</returns>
        private string CreateToken(User user)
        {
            // Create a list of claims to be included in the JWT token.
            var claims = new List<Claim>
            {
                // Include the user's email as a claim in the token.
                new Claim("email", user.Email),
            };

            // Retrieve the secret key for signing the token from the configuration.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!
            ));

            // Create signing credentials using the secret key and the HmacSha512 signature algorithm.
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Create a new JWT token with specified claims, expiration time, and signing credentials.
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),  // Token expiration time (adjust as needed).
                signingCredentials: creds
            );

            // Use JwtSecurityTokenHandler to write the token to its string representation (JWT).
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            // Return the generated JWT token.
            return jwt;

        }
    }
}