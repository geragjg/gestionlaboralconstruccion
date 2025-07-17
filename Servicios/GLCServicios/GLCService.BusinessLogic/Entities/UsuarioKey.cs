using GLCService.BusinessLogic.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLCService.BusinessLogic.Entities
{
    public partial class UsuarioKey : IDomainEntityKey
    {

        public string NombreUsuario { get; set; }
       

    }
}
