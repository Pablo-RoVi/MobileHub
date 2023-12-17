using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.Src.DTOs
{
    /// <summary>
    /// Data Transfer Object (DTO) representing information for updating a user's profile.
    /// </summary>
    public class UpdateUserDTO
    {
        /// <summary>
        /// Gets or sets the updated full name associated with the user's profile.
        /// </summary>
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the updated email address associated with the user's profile.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the updated birth year associated with the user's profile.
        /// </summary>
        public int BirthYear { get; set; }
    }
}
