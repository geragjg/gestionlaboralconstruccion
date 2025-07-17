using GLCService.BusinessLogic.RequestsResponses;
using Microsoft.AspNetCore.Mvc;

namespace GLCServicios.Helpers
{
    public static class ErrorMapper
    {
        public static IActionResult ToActionResult(ErrorType errorType, string message = null)
        {
            switch (errorType)
            {
                case ErrorType.NotFound:
                    return new NotFoundObjectResult(message ?? "Resource not found.");
                case ErrorType.InternalError:
                    return new ObjectResult(message ?? "Interal Server error.") { StatusCode = 500 };
                case ErrorType.Unauthorized:
                    return new UnauthorizedObjectResult(message ?? "Unauthorized.");
                case ErrorType.InvalidInput:
                    return new BadRequestObjectResult(message ?? "Invalid Input.") { StatusCode = 403 };
                case ErrorType.NoData:
                    return new NotFoundObjectResult(message ?? "No data available");
                default:
                    return new ObjectResult(message ?? "An unexpected error occurred.") { StatusCode = 500 };
            }

        }
    }
}
