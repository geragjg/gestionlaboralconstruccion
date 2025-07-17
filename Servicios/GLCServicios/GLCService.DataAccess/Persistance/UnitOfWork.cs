using GLCService.BusinessLogic.Entities;
using GLCService.BusinessLogic.Interfaces;
using GLCService.BusinessLogic.Interfaces.Repositories;
using GLCService.DataAccess.Instances;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLCService.DataAccess.Persistance
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly MiJornaleraDbContext _context;
        private IDbContextTransaction? _transaction;

        public IUsuarioRepository Usuarios { get; }
       

        public UnitOfWork(MiJornaleraDbContext context)
        {
            _context = context;
            Usuarios = new UsuarioRepository(_context);           
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
            if (_transaction != null)
                await _transaction.CommitAsync();
        }

        public async Task RollbackAsync()
        {
            if (_transaction != null)
                await _transaction.RollbackAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
