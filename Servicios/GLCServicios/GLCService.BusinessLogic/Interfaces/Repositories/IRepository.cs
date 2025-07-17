using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLCService.BusinessLogic.Interfaces.Repositories
{
    public interface IRepository<T, K> :  ICreate<T>, IRead<T, K>, IDelete, IUpdate<T> where K : IDomainEntityKey
    {
    }
}
