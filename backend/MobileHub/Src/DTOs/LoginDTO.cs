using System.ComponentModel.DataAnnotations;

namespace MobileHub.Src.DTOs
{
    /// <summary>
    /// Data Transfer Object (DTO) representing login credentials.
    /// </summary>
    public class LoginDTO
    {
        /// <summary>
        /// Gets or sets the email address associated with the login credentials.
        /// </summary>
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the password associated with the login credentials.
        /// </summary>
        [Required(ErrorMessage = "Password is required.")]
        public string Password { get; set; } = string.Empty;
    }
}
