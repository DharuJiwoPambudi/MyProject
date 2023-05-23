﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyProject.Migrations
{
    /// <inheritdoc />
    public partial class cretaeFKDeptID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyProject_Employee_MyProject_Department_DepartmentId",
                table: "MyProject_Employee");

            migrationBuilder.AlterColumn<int>(
                name: "DepartmentId",
                table: "MyProject_Employee",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_MyProject_Employee_MyProject_Department_DepartmentId",
                table: "MyProject_Employee",
                column: "DepartmentId",
                principalTable: "MyProject_Department",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MyProject_Employee_MyProject_Department_DepartmentId",
                table: "MyProject_Employee");

            migrationBuilder.AlterColumn<int>(
                name: "DepartmentId",
                table: "MyProject_Employee",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_MyProject_Employee_MyProject_Department_DepartmentId",
                table: "MyProject_Employee",
                column: "DepartmentId",
                principalTable: "MyProject_Department",
                principalColumn: "Id");
        }
    }
}
