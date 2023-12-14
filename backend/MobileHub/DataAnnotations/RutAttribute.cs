using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DataAnnotations
{
    public class RutAttribute : ValidationAttribute
    {
        public RutAttribute()
        {
            ErrorMessage = "Rut is not valid";
        }

        public RutAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {

        }

        public RutAttribute(string errorMessage) : base(errorMessage)
        {

        }

        public override bool IsValid(object? value)
        {
            
            return false;
        }
    }
}