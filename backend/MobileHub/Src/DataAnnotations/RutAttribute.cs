using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DataAnnotations
{
    /// <summary>
    /// Custom validation attribute for validating Chilean RUT (Rol Único Tributario) numbers.
    /// </summary>
    public class RutAttribute : ValidationAttribute
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="RutAttribute"/> class with a default error message.
        /// </summary>
        public RutAttribute()
        {
            ErrorMessage = "Rut is not valid";
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="RutAttribute"/> class with a custom error message.
        /// </summary>
        /// <param name="errorMessageAccessor">A function that returns the error message.</param>
        public RutAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
            // This constructor allows providing a custom error message.
        }

        /// <summary>
        /// Initializes a new instance of the <see cref="RutAttribute"/> class with a specific error message.
        /// </summary>
        /// <param name="errorMessage">The error message to display.</param>
        public RutAttribute(string errorMessage) : base(errorMessage)
        {
            // This constructor allows providing a specific error message.
        }

        /// <inheritdoc />
        public override bool IsValid(object? value)
        {
            if (!(value is string rut)) return false;

            // Use a regular expression to check if the RUT matches the expected format.
            var isValidRut = new Regex(@"^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$").IsMatch(rut);

            if (!isValidRut) return false;

            try
            {
                // Remove any dots and hyphens from the input
                rut = rut.Replace(".", "").Replace("-", "");

                // Validate the length of the RUT
                if (rut.Length != 9 && rut.Length != 8) return false;

                // Extract the verifier digit
                char verifierDigit = rut[rut.Length - 1];

                // Extract the numerical part of the RUT
                string numericPart = rut.Substring(0, rut.Length - 1);

                // Validate the format using a regular expression
                var rutRegex = new Regex(@"^\d{1,2}(\.\d{3}){2}-\d$");

                if (!rutRegex.IsMatch(numericPart)) return false;

                // Validate the verifier digit
                int verifier;

                if (verifierDigit == 'K' || verifierDigit == 'k') verifier = 10;

                else if (!int.TryParse(verifierDigit.ToString(), out verifier)) return false;

                int sum = 0;
                int multiplier = 2;

                // Calculate the sum for the numerical part
                for (int i = numericPart.Length - 1; i >= 0; i--)
                {
                    sum += int.Parse(numericPart[i].ToString()) * multiplier;
                    multiplier = multiplier == 7 ? 2 : multiplier + 1;
                }

                // Calculate the remainder and subtract it from 11
                int remainder = 11 - (sum % 11);

                // Check if the remainder matches the verifier digit
                return remainder == verifier || (remainder == 10 && verifier == 0);
            }
            catch (Exception)
            {
                // Handle exceptions if necessary, but for validation purposes, returning false is sufficient.
                return false;
            }
        }
    }
}
