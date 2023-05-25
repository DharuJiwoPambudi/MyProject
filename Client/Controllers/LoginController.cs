
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Client.Utilities;

namespace Client.Controllers
{
    public class LoginController : Controller
    {
        private readonly IConfiguration configuration;

        public LoginController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        //Post Action Login using token - if token generate in client
        [HttpPost]
        public IActionResult LoginToken(string email)
        {
            if (HttpContext.Session.GetString("UserName") == null)
            {

                var claims = new[]
                {
                        new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Email", email)
                    };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    configuration["Jwt:Issuer"],
                    configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddSeconds(15),
                    signingCredentials: signIn);
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddSeconds(15),
                    HttpOnly = true,
                    SameSite = SameSiteMode.None, // Set the SameSite attribute to None
                    Secure = true // Set the Secure flag to true to ensure that the cookie is only sent over HTTPS 
                };
                Console.WriteLine(new JwtSecurityTokenHandler().WriteToken(token));

                HttpContext.Response.Cookies.Append("jwt", new JwtSecurityTokenHandler().WriteToken(token), cookieOptions);

                HttpContext.Session.SetString("UserName", token.ToString());

                return Ok();

            }
            else
            {
                return RedirectToAction("Login");
            }

        }

        // Get Action
        public IActionResult Login()
        {
            if (HttpContext.Session.GetString("UserName") == null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Departments");
            }
        }

        //Post Action login using session
        [HttpPost]
        public ActionResult LoginSession(string email)
        {
            if (HttpContext.Session.GetString("UserName") != null)
            {
                if (ModelState.IsValid)
                {
                    HttpContext.Session.SetString("UserName", email);
                    return RedirectToAction("Index", "Departments");
                }
            }
            else
            {
                return RedirectToAction("Login");
            }

            return View();
        }

        //Post Action Login without any condition
        [HttpPost]
        public ActionResult LoginPrimer()
        {
            return RedirectToAction("Index", "Departments");
        }

        //public ActionResult Logout()
        //{
        //    //HttpContext.Session.Clear();
        //    //HttpContext.Session.Remove("userToken");
        //    return RedirectToAction("Login");
        //}

        [Authentication]
        public IActionResult Index()
        {
            return View();
        }
    }
}
