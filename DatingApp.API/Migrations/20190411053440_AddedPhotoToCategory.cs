using Microsoft.EntityFrameworkCore.Migrations;

namespace DatingApp.API.Migrations
{
    public partial class AddedPhotoToCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MovieCategoryId",
                table: "Photos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "MovieCategories",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Photos_MovieCategoryId",
                table: "Photos",
                column: "MovieCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_MovieCategories_MovieCategoryId",
                table: "Photos",
                column: "MovieCategoryId",
                principalTable: "MovieCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_MovieCategories_MovieCategoryId",
                table: "Photos");

            migrationBuilder.DropIndex(
                name: "IX_Photos_MovieCategoryId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "MovieCategoryId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "MovieCategories");
        }
    }
}
