using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; } = null!;

        [Required]
        [Rut(ErrorMessage = "Rut is not valid")]
        public string Rut { get; set; } = null!;
        
        [Required]
        public int BirthYear { get; set; }

        [Required]
        public string FullName { get; set; } = null!;
        
    }
}