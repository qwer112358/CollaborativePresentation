using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Whiteboard.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Points = table.Column<string>(type: "text", nullable: false),
                    Stroke = table.Column<string>(type: "text", nullable: false),
                    Tool = table.Column<string>(type: "text", nullable: false),
                    StartX = table.Column<float>(type: "real", nullable: true),
                    StartY = table.Column<float>(type: "real", nullable: true),
                    EndX = table.Column<float>(type: "real", nullable: true),
                    EndY = table.Column<float>(type: "real", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lines", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lines");
        }
    }
}
