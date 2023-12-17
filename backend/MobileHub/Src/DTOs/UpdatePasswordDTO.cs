using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.Src.DTOs
{
    /// <summary>
    /// Data Transfer Object (DTO) representing information for updating a user's password.
    /// </summary>
    public class UpdatePasswordDTO
    {
        /// <summary>
        /// Gets or sets the current password associated with the user.
        /// </summary>
        public string Password { get; set; } = null!;

        /// <summary>
        /// Gets or sets the new password for updating the user's password.
        /// </summary>
        public string NewPassword { get; set; } = null!;
    }
}
