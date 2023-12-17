using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobileHub.Src.Data.Migrations
{
    /// <summary>
    /// Migration class for adding the User entity to the database.
    /// </summary>
    public partial class UserEntityAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Create the Users table in the database.
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    // Define columns for the Users table.
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true), // Auto-incremental Id field.
                    Email = table.Column<string>(type: "TEXT", nullable: false), // Email field (non-nullable).
                    BirthYear = table.Column<int>(type: "INTEGER", nullable: false), // BirthYear field (non-nullable).
                    Rut = table.Column<string>(type: "TEXT", nullable: false), // Rut field (non-nullable).
                    FullName = table.Column<string>(type: "TEXT", nullable: false), // FullName field (non-nullable).
                    Password = table.Column<string>(type: "TEXT", nullable: false) // Password field (non-nullable).
                },
                constraints: table =>
                {
                    // Set primary key constraint for the Users table.
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop the Users table from the database.
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
