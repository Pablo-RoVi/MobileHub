using MobileHub.Src.Data;
using MobileHub.Src.Models;
using MobileHub.Src.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MobileHub.Src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpPut("update-user/{rut}")]
        public async Task<ActionResult<User>> UpdateUser(string rut, UpdateUserDTO updateUserDTO)
        {
            // Buscamos el usuario por su rut
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Rut == rut);

            // Si no existe, retornamos un error
            if (userToUpdate == null)
            {
                return NotFound();
            }

            // Si existe, actualizamos sus datos
            userToUpdate.FullName = updateUserDTO.FullName;
            userToUpdate.BirthYear = updateUserDTO.BirthYear;
            userToUpdate.Email = updateUserDTO.Email;

            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Retornamos el usuario actualizado
            return userToUpdate;
        }

        [HttpPut("update-password/{rut}")]
        public async Task<ActionResult<User>> UpdatePassword(string rut, UpdatePasswordDTO updatePasswordDTO)
        {
            // Buscamos el usuario por su rut
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Rut == rut);

            // Si no existe, retornamos un error
            if (userToUpdate == null)
            {
                return NotFound();
            }

            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);

            string passwordHash = BCrypt.Net.BCrypt.HashPassword(updatePasswordDTO.NewPassword, salt);

            // Si existe, actualizamos su contraseña
            userToUpdate.Password = passwordHash;

            // Guardamos los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Retornamos el usuario actualizado
            return userToUpdate;
        }
    }
}