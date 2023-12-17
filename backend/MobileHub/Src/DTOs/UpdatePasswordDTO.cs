using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.Src.DTOs
{
    public class UpdatePasswordDTO
    {
        public string Password { get; set; } = null!;

        public string NewPassword { get; set; } = null!;
    }
}