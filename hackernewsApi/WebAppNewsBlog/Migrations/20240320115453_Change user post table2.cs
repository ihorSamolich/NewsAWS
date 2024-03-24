using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HackerNewsApi.Migrations
{
    /// <inheritdoc />
    public partial class Changeuserposttable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_UserEntityId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_UserEntityId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "UserEntityId",
                table: "Posts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserEntityId",
                table: "Posts",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserEntityId",
                table: "Posts",
                column: "UserEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_UserEntityId",
                table: "Posts",
                column: "UserEntityId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
