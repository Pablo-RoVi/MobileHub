using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DTOs
{
    public class CommitDTO
    {
        public string Author { get; set; } = null!;

        public string Commit { get; set; } = null!;

        public DateTimeOffset CreatedAt { get; set; } = DateTime.Now;

    }
}