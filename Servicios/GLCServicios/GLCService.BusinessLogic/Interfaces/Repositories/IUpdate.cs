using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace GLCService.BusinessLogic.Interfaces.Repositories
{
    public interface IUpdate<T>
    {
        int Update(T entity, int id);
    }
}
