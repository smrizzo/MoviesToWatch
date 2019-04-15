using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class AddedRatingsAndVideos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Movies",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Trailer_url",
                table: "Movies",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "Vote_average",
                table: "Movies",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "Watched",
                table: "Movies",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "Trailer_url",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "Vote_average",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "Watched",
                table: "Movies");
        }
    }
}
