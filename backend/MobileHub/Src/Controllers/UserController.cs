using MobileHub.Src.Data;
using MobileHub.Src.Models;
using MobileHub.Src.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MobileHub.Src.Controllers
{
    /// <summary>
    /// Controller for managing user-related operations.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="UsersController"/> class.
        /// </summary>
        /// <param name="context">The data context.</param>
        public UsersController(DataContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Retrieves a list of all users in the system.
        /// </summary>
        /// <returns>Returns a list of all users.</returns>
        [HttpGet]
        public async Task<ActionResult<List<User>>> AllUsers()
        {
            // Use the _context to reference the Users table
            // Retrieve all users from the system using ToListAsync() and store them in a list.
            var users = await _context.Users.ToListAsync();
            return users;
        }

        /// <summary>
        /// Updates user information based on the provided Rut.
        /// </summary>
        /// <param name="rut">The Rut of the user to be updated.</param>
        /// <param name="updateUserDTO">DTO containing updated user information.</param>
        /// <returns>Returns the updated user.</returns>
        [HttpPut("update-user/{rut}")]
        public async Task<ActionResult<User>> UpdateUser(string rut, UpdateUserDTO updateUserDTO)
        {
            // Search for the user by Rut.
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Rut == rut);

            // If the user does not exist, return an error.
            if (userToUpdate == null)
            {
                return NotFound();
            }

            // If the user exists, update their data.
            userToUpdate.FullName = updateUserDTO.FullName;
            userToUpdate.BirthYear = updateUserDTO.BirthYear;
            userToUpdate.Email = updateUserDTO.Email;

            // Save changes to the database.
            await _context.SaveChangesAsync();

            // Return the updated user.
            return userToUpdate;
        }

        /// <summary>
        /// Updates the password for a user based on the provided Rut.
        /// </summary>
        /// <param name="rut">The Rut of the user whose password will be updated.</param>
        /// <param name="updatePasswordDTO">DTO containing the new password.</param>
        /// <returns>Returns the user with the updated password.</returns>
        [HttpPut("update-password/{rut}")]
        public async Task<ActionResult<User>> UpdatePassword(string rut, UpdatePasswordDTO updatePasswordDTO)
        {
            // Search for the user by Rut.
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Rut == rut);

            // If the user does not exist, return an error.
            if (userToUpdate == null)
            {
                return NotFound();
            }

            // Generate a new salt for password hashing.
            var salt = BCrypt.Net.BCrypt.GenerateSalt(12);

            // Hash the new password with the generated salt.
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(updatePasswordDTO.NewPassword, salt);

            // Update the user's password.
            userToUpdate.Password = passwordHash;

            // Save changes to the database.
            await _context.SaveChangesAsync();

            // Return the user with the updated password.
            return userToUpdate;
        }
    }
}
