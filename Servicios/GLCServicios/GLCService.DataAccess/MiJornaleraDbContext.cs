using GLCService.BusinessLogic.Entities;
using Microsoft.EntityFrameworkCore;

namespace GLCService.DataAccess
{
    public class MiJornaleraDbContext : DbContext
    {
        public MiJornaleraDbContext(DbContextOptions<MiJornaleraDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Rol> Roles { get; set; }
    }
}
