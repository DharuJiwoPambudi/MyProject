using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProject.Migrations
{
    /// <inheritdoc />
    public partial class changetablenameaccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_MyProject_Employee_EmployeeNIK",
                table: "Accounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Accounts",
                table: "Accounts");

            migrationBuilder.RenameTable(
                name: "Accounts",
                newName: "MyProject_Account");

            migrationBuilder.RenameIndex(
                name: "IX_Accounts_EmployeeNIK",
                table: "MyProject_Account",
                newName: "IX_MyProject_Account_EmployeeNIK");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MyProject_Account",
                table: "MyProject_Account",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MyProject_Account_MyProject_Employee_EmployeeNIK",
                table: "MyProject_Account",
                column: "EmployeeNIK",
                principalTable: "MyProject_Employee",
                principalColumn: "NIK",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyProject_Account_MyProject_Employee_EmployeeNIK",
                table: "MyProject_Account");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MyProject_Account",
                table: "MyProject_Account");

            migrationBuilder.RenameTable(
                name: "MyProject_Account",
                newName: "Accounts");

            migrationBuilder.RenameIndex(
                name: "IX_MyProject_Account_EmployeeNIK",
                table: "Accounts",
                newName: "IX_Accounts_EmployeeNIK");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Accounts",
                table: "Accounts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_MyProject_Employee_EmployeeNIK",
                table: "Accounts",
                column: "EmployeeNIK",
                principalTable: "MyProject_Employee",
                principalColumn: "NIK",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
