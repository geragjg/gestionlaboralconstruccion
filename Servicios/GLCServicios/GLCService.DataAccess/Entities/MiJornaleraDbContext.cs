using System;
using System.Collections.Generic;
using GLCService.BusinessLogic.Entities;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace GLCService.DataAccess.Entities;

public partial class MiJornaleraDbContext : DbContext
{
    public MiJornaleraDbContext()
    {
    }

    public MiJornaleraDbContext(DbContextOptions<MiJornaleraDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Accion> Accions { get; set; }

    public virtual DbSet<Ausencia> Ausencias { get; set; }

    public virtual DbSet<DiaQuincena> DiaQuincenas { get; set; }

    public virtual DbSet<DiaQuincenaAccion> DiaQuincenaAccions { get; set; }

    public virtual DbSet<DiaQuincenaAusencia> DiaQuincenaAusencias { get; set; }

    public virtual DbSet<DiaQuincenaCertificado> DiaQuincenaCertificados { get; set; }

    public virtual DbSet<DiaQuincenaHistoria> DiaQuincenaHistorias { get; set; }

    public virtual DbSet<DiaQuincenaHora> DiaQuincenaHoras { get; set; }

    public virtual DbSet<Hora> Horas { get; set; }

    public virtual DbSet<Obra> Obras { get; set; }

    public virtual DbSet<Operario> Operarios { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=Mijornalera_base;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("5.7.31-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8_general_ci")
            .HasCharSet("utf8");

        modelBuilder.Entity<Accion>(entity =>
        {
            entity.ToTable("Accion");
            entity.HasKey(e => e.AccionID).HasName("PRIMARY");
            entity.Property(e => e.AccionID).HasColumnType("int(11)");
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);
        });

        modelBuilder.Entity<Ausencia>(entity =>
        {
            entity.ToTable("Ausencia");
            entity.HasKey(e => e.AusenciaID).HasName("PRIMARY");
            entity.Property(e => e.AusenciaID).HasColumnType("int(11)");
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.MaximoAnual).HasColumnType("int(11)");
            entity.Property(e => e.Nombre).HasMaxLength(255);
        });

        modelBuilder.Entity<DiaQuincena>(entity =>
        {
            entity.ToTable("DiaQuincena");
            entity.HasKey(e => e.DiaQuincenaID).HasName("PRIMARY");
            entity.HasIndex(e => e.ObraID, "FK_DiaQuincena_Obra");
            entity.HasIndex(e => e.OperarioID, "FK_DiaQuincena_Operario");
            entity.Property(e => e.DiaQuincenaID).HasColumnType("int(11)");
            entity.Property(e => e.Anho).HasColumnType("int(11)");
            entity.Property(e => e.Dia).HasColumnType("int(11)");
            entity.Property(e => e.NumeroQuincena).HasColumnType("int(11)");
            entity.Property(e => e.ObraID).HasColumnType("int(11)");
            entity.Property(e => e.OperarioID).HasColumnType("int(11)");
        });

        modelBuilder.Entity<DiaQuincenaAccion>(entity =>
        {
            entity.ToTable("DiaQuincenaAccion");
            entity.HasKey(e => e.DiaQuincenaAccionID).HasName("PRIMARY");
            entity.HasIndex(e => e.AccionID, "FK_DQAccion_Accion");
            entity.HasIndex(e => e.DiaQuincenaID, "FK_DQAccion_DiaQuincena");
            entity.Property(e => e.DiaQuincenaAccionID).HasColumnType("int(11)");
            entity.Property(e => e.AccionID).HasColumnType("int(11)");
            entity.Property(e => e.DiaQuincenaID).HasColumnType("int(11)");
        });

        modelBuilder.Entity<DiaQuincenaAusencia>(entity =>
        {
            entity.ToTable("DiaQuincenaAusencia");
            entity.HasKey(e => e.DiaQuincenaAusenciaID).HasName("PRIMARY");
            entity.HasIndex(e => e.AusenciaID, "FK_DQAusencia_Ausencia");
            entity.HasIndex(e => e.DiaQuincenaID, "FK_DQAusencia_DiaQuincena");
            entity.HasIndex(e => e.UsuarioID, "FK_DQAusencia_Usuario");
            entity.Property(e => e.DiaQuincenaAusenciaID).HasColumnType("int(11)");
            entity.Property(e => e.AusenciaID).HasColumnType("int(11)");
            entity.Property(e => e.DiaQuincenaID).HasColumnType("int(11)");
            entity.Property(e => e.FechaCambio).HasColumnType("datetime");
            entity.Property(e => e.UsuarioID).HasColumnType("int(11)");
        });

        modelBuilder.Entity<DiaQuincenaCertificado>(entity =>
        {
            entity.ToTable("DiaQuincenaCertificado");
            entity.HasKey(e => e.DiaQuincenaCertificadoID).HasName("PRIMARY");
            entity.HasIndex(e => e.DiaQuincenaID, "FK_DQCertificado_DiaQuincena");
            entity.Property(e => e.DiaQuincenaCertificadoID).HasColumnType("int(11)");
            entity.Property(e => e.Adjunto).HasMaxLength(255);
            entity.Property(e => e.DiaQuincenaID).HasColumnType("int(11)");
        });

        modelBuilder.Entity<DiaQuincenaHistoria>(entity =>
        {
            entity.ToTable("DiaQuincenaHistoria");
            entity.HasKey(e => e.DiaQuincenaHistoriaID).HasName("PRIMARY");
            entity.HasIndex(e => e.AusenciaID, "FK_DQHistoria_Ausencia");
            entity.HasIndex(e => e.DiaQuincenaID, "FK_DQHistoria_DiaQuincena");
            entity.HasIndex(e => e.HoraID, "FK_DQHistoria_Hora");
            entity.HasIndex(e => e.UsuarioID, "FK_DQHistoria_Usuario");
            entity.Property(e => e.DiaQuincenaHistoriaID).HasColumnType("int(11)");
            entity.Property(e => e.AusenciaID).HasColumnType("int(11)");
            entity.Property(e => e.DiaQuincenaID).HasColumnType("int(11)");
            entity.Property(e => e.FechaCambio).HasColumnType("datetime");
            entity.Property(e => e.HoraID).HasColumnType("int(11)");
            entity.Property(e => e.UsuarioID).HasColumnType("int(11)");
            entity.Property(e => e.ValorHora).HasPrecision(10, 2);
        });

        modelBuilder.Entity<DiaQuincenaHora>(entity =>
        {
            entity.ToTable("DiaQuincenaHora");
            entity.HasKey(e => e.DiaQuincenaHoraID).HasName("PRIMARY");
            entity.HasIndex(e => e.DiaQuincenaID, "FK_DQHora_DiaQuincena");
            entity.HasIndex(e => e.HoraID, "FK_DQHora_Hora");
            entity.HasIndex(e => e.UsuarioID, "FK_DQHora_Usuario");
            entity.Property(e => e.DiaQuincenaHoraID).HasColumnType("int(11)");
            entity.Property(e => e.DiaQuincenaID).HasColumnType("int(11)");
            entity.Property(e => e.FechaCambio).HasColumnType("datetime");
            entity.Property(e => e.HoraID).HasColumnType("int(11)");
            entity.Property(e => e.UsuarioID).HasColumnType("int(11)");
            entity.Property(e => e.ValorHora).HasPrecision(10, 2);
        });

        modelBuilder.Entity<Hora>(entity =>
        {
            entity.ToTable("Hora");
            entity.HasKey(e => e.HoraID).HasName("PRIMARY");
            entity.Property(e => e.HoraID).HasColumnType("int(11)");
            entity.Property(e => e.Categoria).HasMaxLength(255);
            entity.Property(e => e.Descripccion).HasMaxLength(255);
            entity.Property(e => e.MaximoDiario).HasColumnType("int(11)");
            entity.Property(e => e.MaximoSemanal).HasColumnType("int(11)");
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.Orden).HasColumnType("int(11)");
        });

        modelBuilder.Entity<Obra>(entity =>
        {
            entity.ToTable("Obra");
            entity.HasKey(e => e.ObraID).HasName("PRIMARY");
            entity.Property(e => e.ObraID).HasColumnType("int(11)");
            entity.Property(e => e.Cliente).HasMaxLength(255);
            entity.Property(e => e.Descripcion).HasMaxLength(255);
            entity.Property(e => e.Estado).HasMaxLength(50);
            entity.Property(e => e.Nombre).HasMaxLength(255);
        });

        modelBuilder.Entity<Operario>(entity =>
        {
            entity.ToTable("Operario");
            entity.HasKey(e => e.OperarioID).HasName("PRIMARY");
            entity.Property(e => e.OperarioID).HasColumnType("int(11)");
            entity.Property(e => e.Apellido).HasMaxLength(255);
            entity.Property(e => e.Departamento).HasMaxLength(100);
            entity.Property(e => e.NCedula).HasMaxLength(20);
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.NumFuncionario).HasMaxLength(50);
            entity.Property(e => e.TareaDeObra).HasMaxLength(255);
            entity.Property(e => e.TipoContratacion).HasMaxLength(100);
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.ToTable("Rol");
            entity.HasKey(e => e.RolID).HasName("PRIMARY");
            entity.HasIndex(e => e.Descripcion, "Descripcion").IsUnique();
            entity.HasIndex(e => e.Nombre, "Nombre").IsUnique();
            entity.Property(e => e.RolID).HasColumnType("int(11)");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("Usuario");
            entity.HasKey(e => e.UsuarioID).HasName("PRIMARY");
            entity.HasIndex(e => e.Cedula, "Cedula").IsUnique();
            entity.HasIndex(e => e.Correo, "Correo").IsUnique();
            entity.HasIndex(e => e.RolID, "FK_Usuario_Rol");
            entity.Property(e => e.UsuarioID).HasColumnType("int(11)");
            entity.Property(e => e.Apellido).HasMaxLength(255);
            entity.Property(e => e.Cedula).HasMaxLength(20);
            entity.Property(e => e.Contrasenha).HasMaxLength(255);
            entity.Property(e => e.Nombre).HasMaxLength(255);
            entity.Property(e => e.NombreUsuario).HasMaxLength(100);
            entity.Property(e => e.RolID).HasColumnType("int(11)");
        });

        OnModelCreatingPartial(modelBuilder);
    }


    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
