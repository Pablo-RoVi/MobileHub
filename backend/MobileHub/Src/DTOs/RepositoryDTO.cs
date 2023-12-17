using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MobileHub.DTOs
{
    /// <summary>
    /// Data Transfer Object (DTO) representing information about a repository.
    /// </summary>
    public class RepositoryDTO
    {
        /// <summary>
        /// Gets or sets the name of the repository.
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Gets or sets the timestamp when the repository was created.
        /// Defaults to the current date and time if not explicitly set.
        /// </summary>
        public DateTimeOffset CreatedAt { get; set; } = DateTime.Now;

        /// <summary>
        /// Gets or sets the timestamp when the repository was last updated.
        /// Defaults to the current date and time if not explicitly set.
        /// </summary>
        public DateTimeOffset UpdatedAt { get; set; } = DateTime.Now;

        /// <summary>
        /// Gets or sets the number of commits associated with the repository.
        /// </summary>
        public int CommitsAmount { get; set; }
    }
}
