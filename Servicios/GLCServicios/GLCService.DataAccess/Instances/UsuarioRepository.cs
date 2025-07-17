using GLCService.BusinessLogic.Entities;
using GLCService.BusinessLogic.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Numerics;


namespace GLCService.DataAccess.Instances
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly MiJornaleraDbContext _context;

        public UsuarioRepository(MiJornaleraDbContext context)
        {
            _context = context;
        }

        public void Create(Usuario entity)
        {
            _context.Usuarios.Add(entity);
        }



        public IQueryable<Usuario> GetAll()
        {
            return _context.Usuarios.Include(u => u.Rol);
        }

        public Usuario GetById(int id)
        {
            return _context.Usuarios.Find(id);
        }

        public Usuario GetByName(string name)
        {
            return _context.Usuarios.FirstOrDefault(a => a.Nombre == name); // or another identifying field
        }

        public int Delete(int id)
        {
            var aircraft = _context.Usuarios.Find(id);
            if (aircraft == null) return 0;

            _context.Usuarios.Remove(aircraft);
            return id;
        }

        public int Update(Usuario entity, int id)
        {
            //var existing = _context.Planets.Find(id);
            //if (existing == null) return 0;

            //existing.PlanetName = entity.PlanetName;
            //existing.SectorID = entity.SectorID;
            //existing.RebelInfluence = entity.RebelInfluence;
            //existing.Code = entity.Code;

            //_context.Planets.Update(existing);
            return id;
        }

        
        public Usuario GetByKey(UsuarioKey key)
        {
           return _context.Usuarios
                .Include(u => u.Rol)
                .FirstOrDefault(u => u.NombreUsuario == key.NombreUsuario);
        }

        /*
         * 
          public async Usuario? GetUsuarioByNombreUsuario(string nombreUsuario)
        {
            return await _context.Usuarios
                .Include(u => u.Rol)
                .FirstOrDefault(u => u.NombreUsuario == nombreUsuario);
        }

        public List<Usuario> GetUsuarios()
        {
            return _context.Usuarios.Include(u => u.Rol).ToList();
        }
        */
    }

}
