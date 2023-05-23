using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProject.Models;
using MyProject.Repository;
using System.Net;

namespace MyProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly DepartmentRepository departmentRepository;
        public DepartmentsController(DepartmentRepository departmentRepository)
        {
            this.departmentRepository = departmentRepository;
        }
        [HttpPost]
        public ActionResult Insert(Department department)
        {
            var myDept = departmentRepository.Insert(department);
            if (myDept == 1)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data has been added! with ID " + department.Id, Data = department });
            }
            return StatusCode(409, new { status = HttpStatusCode.Conflict, message = "Data has added, Please cek your department Name!", Data = department.Id });
        }
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var myDept = await departmentRepository.Get();
            if (myDept != null)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = myDept.Count() + " data found", Data = myDept });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found", Data = myDept });
        }
        [HttpPut]
        public ActionResult Put(Department department)
        {
            var myDept = departmentRepository.Update(department);


            if (myDept == 1)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data updated", Data = myDept });
            }
            return StatusCode(409, new { status = HttpStatusCode.Conflict, message = "Name exists, please cek the name!", Data = department.DepartmentName });
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var myDept = departmentRepository.Get(id);
            if (myDept != null)
            {
                departmentRepository.Delete(id);
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data deleted succesfully", Data = myDept });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myDept });
        }
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var myDept = departmentRepository.Get(id);
            if (myDept != null)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data found", Data = myDept });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myDept });
        }
    }
}
