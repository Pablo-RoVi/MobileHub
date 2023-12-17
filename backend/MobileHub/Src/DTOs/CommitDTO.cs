using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DTOs
{
    /// <summary>
    /// Data Transfer Object (DTO) representing information about a commit.
    /// </summary>
    public class CommitDTO
    {
        /// <summary>
        /// Gets or sets the author of the commit.
        /// </summary>
        public string Author { get; set; } = null!;

        /// <summary>
        /// Gets or sets the commit message.
        /// </summary>
        public string Commit { get; set; } = null!;

        /// <summary>
        /// Gets or sets the timestamp when the commit was created.
        /// Defaults to the current date and time if not explicitly set.
        /// </summary>
        public DateTimeOffset CreatedAt { get; set; } = DateTime.Now;
    }
}
