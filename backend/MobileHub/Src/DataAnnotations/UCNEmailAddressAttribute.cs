using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DataAnnotations
{
    /// <summary>
    /// Custom validation attribute for validating email addresses with specific UCN domains.
    /// </summary>
    public class UCNEmailAddressAttribute : ValidationAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="UCNEmailAddressAttribute"/> class with a default error message.
        /// </summary>
        public UCNEmailAddressAttribute()
        {
            ErrorMessage = "Email is not from a valid UCN domain";
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="UCNEmailAddressAttribute"/> class with a custom error message.
        /// </summary>
        /// <param name="errorMessageAccessor">A function that returns the error message.</param>
        public UCNEmailAddressAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
            // This constructor allows providing a custom error message.
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="UCNEmailAddressAttribute"/> class with a specific error message.
        /// </summary>
        /// <param name="errorMessage">The error message to display.</param>
        public UCNEmailAddressAttribute(string errorMessage) : base(errorMessage)
        {
            // This constructor allows providing a specific error message.
        }

        /// <inheritdoc />
        public override bool IsValid(object? value)
        {
            if (value is not string email) return false;

            // Use the built-in EmailAddressAttribute for basic email format validation.
            var isValidEmail = new EmailAddressAttribute().IsValid(email);

            if (!isValidEmail) return false;

            try
            {
                // Extract the email domain from the email address.
                var emailDomain = email.Split('@')[1];

                // Define a list of valid UCN email domains.
                var ucnDomains = new List<string> { "ucn.cl", "alumnos.ucn.cl", "disc.ucn.cl", "ce.ucn.cl" };

                // Check if the email domain is in the list of valid UCN domains.
                return ucnDomains.Contains(emailDomain);
            }
            catch (Exception)
            {
                // Handle exceptions if necessary, but for validation purposes, returning false is sufficient.
                return false;
            }
        }
    }
}
