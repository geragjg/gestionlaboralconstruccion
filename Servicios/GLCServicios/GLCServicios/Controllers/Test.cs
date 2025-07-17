using GLCService.BusinessLogic.RequestsResponses;
using GLCService.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GLCServicios.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Test : Controller
    {
        [HttpGet]
        public IActionResult TestTime()
        {
            var result = new OperationResult<string>
            {
                Data = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                Message = "OK"
            };
            return Ok(result);
        }
    }
}
