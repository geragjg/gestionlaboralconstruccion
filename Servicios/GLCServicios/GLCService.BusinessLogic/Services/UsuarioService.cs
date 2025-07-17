using BCrypt.Net;
using GLCService.BusinessLogic.Entities;
using GLCService.BusinessLogic.Interfaces;
using GLCService.BusinessLogic.RequestsResponses;

namespace GLCService.BusinessLogic.Services
{
    public class UsuarioService
    {
        private IUnitOfWork _unitOfWork;
        public UsuarioService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public OperationResult<Usuario> Login(string nombreUsuario, string contrasenha)
        {
            var result = new OperationResult<Usuario>();
            var usuario = result.Data;
            result.Data = _unitOfWork.Usuarios.GetByKey(new UsuarioKey() { NombreUsuario = nombreUsuario });

            return result;

        }
    }
}
