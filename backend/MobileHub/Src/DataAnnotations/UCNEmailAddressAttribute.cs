using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DataAnnotations
{
    public class UCNEmailAddressAttribute : ValidationAttribute
    {
        public UCNEmailAddressAttribute()
        {
            ErrorMessage = "Rut is not valid";
        }

        public UCNEmailAddressAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {

        }

        public UCNEmailAddressAttribute(string errorMessage) : base(errorMessage)
        {

        }

        public override bool IsValid(object? value)
        {
            if(value is not string email) return false;

            var isValidEmail = new EmailAddressAttribute().IsValid(email);

            if (!isValidEmail) return false;

            try {
                var emailDomain = email.Split('@')[1];
                var ucnDomains = new List<string> { "ucn.cl", "alumnos.ucn.cl", "disc.ucn.cl", "ce.ucn.cl" };
                return ucnDomains.Contains(emailDomain);

            } catch (Exception) {
                return false;
            }
        }
    }
}