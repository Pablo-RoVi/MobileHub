using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DTOs
{
    public class RepositoryDTO
    {
        public string Name { get; set; } = null!;

        public DateTimeOffset CreatedAt { get; set; } = DateTime.Now;

        public DateTimeOffset UpdatedAt { get; set; } = DateTime.Now;

        public int CommitsAmount { get; set; }
    }
}