using GLCService.Common;
using GLCService.Common.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GLCServicios.Requests;
using GLCService.BusinessLogic.Entities;
using GLCService.BusinessLogic.Services;
using GLCService.BusinessLogic.RequestsResponses;
using GLCServicios.Helpers;

namespace GLCServicios.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        private readonly JwtService _jwtService;

        public UsuarioController(UsuarioService usuarioService, JwtService jwtService)
        {
            _usuarioService = usuarioService;
            _jwtService = jwtService;
        }
               

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = _usuarioService.Login(request.NombreUsuario, request.Contrasenha);
           

            if (!result.Success)
                return ErrorMapper.ToActionResult(result.ErrorType, result.Message);

            var token = _jwtService.GenerateToken(result.Data);
            return Ok(new ApiResponse<string>()
            {
                Success = true,
                Data = token,
                Message = "Success"
            });
        }


        [Authorize]
        [HttpGet("printHelloUser")]
        public OperationResult<string> PrintHelloUser()
        {
            var result = new OperationResult<string>();

            var username = User.Identity.Name;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            result.Data = $"Hola {username}, {role}";
            result.Message = "OK";
            return result;
        }
    }


}
