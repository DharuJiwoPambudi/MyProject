using Microsoft.AspNetCore.Mvc;
using MyProject.Models;
using MyProject.Repository;
using MyProject.ViewModels;
using System.Net;
using System.Text.RegularExpressions;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeRepository employeeRepository;
        public EmployeesController(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        [HttpPost("/api/[controller]/newRegister")]
        public ActionResult Register(NewAccount newAccount)
        {
            var myAcc = employeeRepository.Register(newAccount);
            if (myAcc != 6)
            {
                if (myAcc != 7)
                {
                    if (myAcc != 3)
                    {
                        if (myAcc != 2)
                        {
                            if (myAcc != 5)
                            {
                                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data has been added with email " + newAccount.Email + "." + " Please remember the email!", Data = newAccount });
                            }
                            return StatusCode(404, new { status = HttpStatusCode.NotFound, massage = "Please cek your department ID!", Data = newAccount.DeptId });
                        }
                        return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your phone number because it's already used", Data = newAccount.Phone });
                    }
                    return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your email because it's already used", Data = newAccount.Email });
                }
                return StatusCode(501, new { status = HttpStatusCode.NotImplemented, massage = "Please cek your user name and make sure it dont have any white space", Data = newAccount.UserName });
            }
            return StatusCode(501, new { status = HttpStatusCode.NotImplemented, massage = "Please cek your password. Password must have min 8 characters with at least a capital character, a number, and a special character", Data = newAccount.Password });
        }

        [HttpPost]
        public ActionResult Insert(Employee employee)
        {
            var myEmp = employeeRepository.Insert(employee);
            if (myEmp != 3)
            {
                if (myEmp != 2)
                {
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data has been added with NIK " + employee.NIK + "." + " Please remember the NIK!", Data = employee });
                }
                return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your phone number because it's already used", Data = employee.Phone });
            }
            return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your email because it's already used", Data = employee.Email });
        }

        [HttpGet]
        public ActionResult Get()
        {
            var myEmp = employeeRepository.Get();
            if (myEmp != null)//true
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = employeeRepository.Get().Count() + " data found", Data = myEmp });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myEmp });
        }

        [HttpGet("TestCORS")]
        public ActionResult TestCORS()
        {
            return Ok("Test CORS Success");
        }

        [HttpGet("/api/[controller]/newObject")]
        public ActionResult GetSaveralRows()
        {
            var myEmp = employeeRepository.GetSaveralRows();
            if (myEmp != null)//true
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = employeeRepository.Get().Count() + " data found", Data = myEmp });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myEmp });
        }

        [HttpGet("{NIK}")]
        public ActionResult Get(string NIK)
        {
            var get = employeeRepository.Get(NIK);
            if (get != null)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data with NIK " + NIK + " found", Data = get });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = get });
        }

        [HttpPut]
        public ActionResult Update(Employee employee)
        {
            var updateMyEmp = employeeRepository.Update(employee);

            if (ModelState.IsValid)
            {
                if (updateMyEmp != 0)
                {
                    if (updateMyEmp != 3)
                    {
                        if (updateMyEmp != 2)
                        {

                            return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data with NIK " + employee.NIK + "." + " has been updated", Data = updateMyEmp });
                        }
                        return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your phone number because it's already used", Data = employee.Phone });
                    }
                    return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your email because it's already used", Data = employee.Email });
                }
                return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = updateMyEmp });
            }
            return BadRequest("Invalid data");
        }


        [HttpPut("{NIK}")]
        public ActionResult Update(string NIK, Employee employee)
        {
            var myEmp = employeeRepository.Get(NIK);
            myEmp.NIK = employee.NIK;
            myEmp.Email = employee.Email;
            myEmp.BirthDate = employee.BirthDate;
            myEmp.FirstName = employee.FirstName;
            myEmp.LastName = employee.LastName;
            myEmp.Phone = employee.Phone;
            myEmp.Salary = employee.Salary;
            myEmp.Gender = employee.Gender;
            myEmp.Department.Id = employee.Department.Id;
            var updateMyEmp = employeeRepository.Update(myEmp);

            if (ModelState.IsValid)
            {
                if (updateMyEmp != 4)
                {
                    if (updateMyEmp != 3)
                    {
                        if (updateMyEmp != 2)
                        {
                            return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data with NIK " + employee.NIK + "." + " has been updated", Data = myEmp });
                        }
                        return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your phone number because it's already used", Data = myEmp.Phone });
                    }
                    return StatusCode(422, new { status = HttpStatusCode.UnprocessableEntity, massage = "Please cek your email because it's already used", Data = myEmp.Email });
                }
                return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myEmp });
            }
            return BadRequest("Invalid data");
        }

        [HttpDelete("{NIK}")]
        public ActionResult Delete(string NIK)
        {
            var myEmp = employeeRepository.Delete(NIK);
            if (myEmp == 1)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data with NIK " + NIK + "." + " has been deleted", Data = myEmp });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myEmp });
        }
    }

}
