using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MobileHub.Src.Models;

namespace MobileHub.Src.Data
{
    /// <summary>
    /// Represents the application's data context for interacting with the database.
    /// </summary>
    public class DataContext : DbContext
    {
        /// <summary>
        /// Gets or sets the DbSet for the User entity, representing the "Users" table in the database.
        /// </summary>
        public DbSet<User> Users { get; set; } = null!;

        /// <summary>
        /// Initializes a new instance of the <see cref="DataContext"/> class.
        /// </summary>
        /// <param name="options">The DbContext options, typically configured in Startup.cs.</param>
        public DataContext(DbContextOptions options) : base(options)
        {
        }
    }
}
