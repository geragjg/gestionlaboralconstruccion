using GLCService.BusinessLogic.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLCService.BusinessLogic.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {

        IUsuarioRepository Usuarios { get; }
        //IAirCraftRepository AirCrafts { get; }
        //ISectorRepository Sectors { get; }

        //IDistanceRepository Distances { get; }

        //IPriceRepository Prices { get; }


        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
        Task SaveChangesAsync();
    }
}


