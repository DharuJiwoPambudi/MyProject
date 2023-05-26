using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyProject.Context;
using MyProject.Repository;
using MyProject.ViewModels;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokensController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly AccountRepository accountRepository;
        private readonly MyContext myContext;
        public TokensController(IConfiguration configuration, MyContext myContext, AccountRepository accountRepository)
        {
            this.configuration = configuration;
            this.accountRepository = accountRepository;
            this.myContext = myContext;
        }
        [HttpPost]
        public IActionResult Login(ViewLogin viewLogin)
        {
            if (viewLogin != null && viewLogin.Email != null && viewLogin.Password != null)
            {
                var user = accountRepository.GetByView(viewLogin);
                if (user != null)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Email", viewLogin.Email),
                        new Claim("Password", viewLogin.Password)
                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        configuration["Jwt:Issuer"],
                        configuration["Jwt:Audience"],
                        claims,
                        expires: DateTime.UtcNow.AddHours(5),
                        signingCredentials: signIn);
                    var userToken = new JwtSecurityTokenHandler().WriteToken(token);
                    return StatusCode(200, new { status = HttpStatusCode.OK, message = "Token :" + new JwtSecurityTokenHandler().WriteToken(token), Data = userToken });
                }
                return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Data not found!", Data = user });
            }
            return StatusCode(404, new { status = HttpStatusCode.NotFound, message = "Invalid input!", Data = User });
        }
        //private async Task<ViewLogin> GetUser(string email, string password)
        //{
        //    return await myContext..FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        //}
    }
}
