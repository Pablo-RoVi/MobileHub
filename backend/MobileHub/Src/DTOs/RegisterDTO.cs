using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.Src.DTOs
{
    /// <summary>
    /// Data Transfer Object (DTO) representing registration information for a new user.
    /// </summary>
    public class RegisterDTO
    {
        /// <summary>
        /// Gets or sets the email address associated with the registration.
        /// </summary>
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the RUT (Rol Único Tributario) associated with the registration.
        /// </summary>
        [Required(ErrorMessage = "RUT is required.")]
        public string Rut { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the birth year associated with the registration.
        /// </summary>
        [Required(ErrorMessage = "Birth year is required.")]
        public int BirthYear { get; set; }

        /// <summary>
        /// Gets or sets the full name associated with the registration.
        /// </summary>
        [Required(ErrorMessage = "Full name is required.")]
        [MinLength(10, ErrorMessage = "Full name must be at least 10 characters.")]
        [MaxLength(150, ErrorMessage = "Full name cannot exceed 150 characters.")]
        public string FullName { get; set; } = string.Empty;
    }
}
