using System.ComponentModel.DataAnnotations;
using MobileHub.DataAnnotations;

namespace MobileHub.Src.DTOs
{
    public class UpdateUserDTO
    {
        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public int BirthYear { get; set; }
    }
}