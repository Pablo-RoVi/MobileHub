using MobileHub.Src.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MobileHub.DTOs;
using System.Threading.Tasks;
using MobileHub.Src.Models;

namespace MobileHub.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }
    }
}