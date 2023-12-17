namespace MobileHub.Src.DTOs
{
    /// <summary>
    /// Data Transfer Object (DTO) representing information about a logged-in user.
    /// </summary>
    public class LoggedUserDTO
    {
        /// <summary>
        /// Gets or sets the authentication token associated with the logged-in user.
        /// </summary>
        public string Token { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the email address of the logged-in user.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the birth year of the logged-in user.
        /// </summary>
        public int BirthYear { get; set; }

        /// <summary>
        /// Gets or sets the RUT (Rol Único Tributario) of the logged-in user.
        /// </summary>
        public string Rut { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the full name of the logged-in user.
        /// </summary>
        public string FullName { get; set; } = string.Empty;
    }
}
