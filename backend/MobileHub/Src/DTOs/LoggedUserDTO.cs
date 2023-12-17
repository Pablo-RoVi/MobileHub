namespace MobileHub.Src.DTOs
{
    public class LoggedUserDTO
    {
        public string Token { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int BirthYear { get; set; }
        public string Rut { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
    }
}