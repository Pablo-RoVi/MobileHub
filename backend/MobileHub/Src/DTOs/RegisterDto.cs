using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.Src.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Rut { get; set; } = string.Empty;
        
        [Required]
        public int BirthYear { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;
        
    }
}