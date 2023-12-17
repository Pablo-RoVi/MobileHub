namespace MobileHub.Src.Models
{
    /// <summary>
    /// Model representing a user in the system.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Gets or sets the unique identifier for the user.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the email address associated with the user.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the birth year associated with the user.
        /// </summary>
        public int BirthYear { get; set; }

        /// <summary>
        /// Gets or sets the RUT (Rol Único Tributario) associated with the user.
        /// </summary>
        public string Rut { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the full name associated with the user.
        /// </summary>
        public string FullName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the hashed password associated with the user.
        /// </summary>
        public string Password { get; set; } = string.Empty;
    }
}
