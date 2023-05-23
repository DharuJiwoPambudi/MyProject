using Microsoft.AspNetCore.Mvc;

namespace Client.Controllers
{
    public class TokenController : Controller
    {
        public IConfiguration configuration;
        public TokenController() { }
        public IActionResult Index()
        {
            return View();
        }
    }
}
