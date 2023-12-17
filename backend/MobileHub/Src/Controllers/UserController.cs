using MobileHub.Src.Data;
using MobileHub.Src.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MobileHub.Src.Controllers
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
        public async Task<ActionResult<List<User>>> AllUsers()
        {
            // Usamos el _context para referencias la tabla Users
            // Y luego obtenemos todos los usuarios del sistema
            // ToListAsync() los guarda en una lista
            var users = await _context.Users.ToListAsync();
            return users;
        }
    }
}