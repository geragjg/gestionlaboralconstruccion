//using VY.Imperial.CommercialRoutes.WebApi.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace GLCService.BusinessLogic.Interfaces.Repositories
{
    public interface IRead<T, K> where K : IDomainEntityKey
    {
        IQueryable<T> GetAll();
        T GetById(int id);
        T GetByName(string name);
        T GetByKey(K key);
    }
}
