using Client.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    
    
    public class DepartmentsController : Controller
    {
        //[Authentication]
        //[Authorize]
        //[AllowAnonymous]
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
