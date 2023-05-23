using Microsoft.AspNetCore.Mvc;
using MyProject.Repository;
using MyProject.ViewModels;
using System.Net;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly AccountRepository accountRepository;
        public AccountsController(AccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }
        //Get(string email, string password)
        [HttpGet]
        public ActionResult GetAll()
        {
            var myAcc = accountRepository.GetAll();
            if (myAcc != null)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = myAcc.Count() + " data found", Data = myAcc });

            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found please cek your email and password!", Data = myAcc });
        }

        [HttpPost("/api/[controller]/Login1")]
        public ActionResult Get(string email, string passwoord)
        {
            var myAcc = accountRepository.Get(email, passwoord);
            if (myAcc != null)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data found", Data = myAcc });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myAcc });
        }

        [HttpPost("/api/[controller]/Login2")]
        public ActionResult GetByView(ViewLogin viewLogin)
        {
            var myAcc = accountRepository.GetByView(viewLogin);
            if (myAcc != null)
            {
                return StatusCode(200, new { status = HttpStatusCode.OK, message = "Data found", Data = myAcc });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = myAcc });
        }


    }
}
