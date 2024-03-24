using HackerNewsApi.Interfaces.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAppNewsBlog.Constants;
using WebAppNewsBlog.Helpers;
using WebAppNewsBlog.Models.User;

namespace WebAppNewsBlog.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _userService.AuthenticateAsync(model.Email);

                if (user != null)
                {
                    return Ok(user);
                }
                else
                {
                    return Unauthorized("Invalid email or password.");
                }
            }
            catch
            {
                return StatusCode(500, "Some error server.");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userService.RegisterUserAsync(model);
                return Ok("User registered successfully.");
            }
            catch
            {
                return StatusCode(500, "Failed to register user.");
            }
        }
    }
}
