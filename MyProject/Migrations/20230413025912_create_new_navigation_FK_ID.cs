using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProject.Migrations
{
    /// <inheritdoc />
    public partial class createnewnavigationFKID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyProject_Account_MyProject_Employee_EmployeeNIK",
                table: "MyProject_Account");

            migrationBuilder.DropIndex(
                name: "IX_MyProject_Account_EmployeeNIK",
                table: "MyProject_Account");

            migrationBuilder.DropColumn(
                name: "EmployeeNIK",
                table: "MyProject_Account");

            migrationBuilder.AddForeignKey(
                name: "FK_MyProject_Account_MyProject_Employee_Id",
                table: "MyProject_Account",
                column: "Id",
                principalTable: "MyProject_Employee",
                principalColumn: "NIK",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyProject_Account_MyProject_Employee_Id",
                table: "MyProject_Account");

            migrationBuilder.AddColumn<string>(
                name: "EmployeeNIK",
                table: "MyProject_Account",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_MyProject_Account_EmployeeNIK",
                table: "MyProject_Account",
                column: "EmployeeNIK",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MyProject_Account_MyProject_Employee_EmployeeNIK",
                table: "MyProject_Account",
                column: "EmployeeNIK",
                principalTable: "MyProject_Employee",
                principalColumn: "NIK",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
