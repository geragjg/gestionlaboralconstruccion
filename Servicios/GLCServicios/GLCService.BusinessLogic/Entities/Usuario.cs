using GLCService.BusinessLogic.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GLCService.BusinessLogic.Entities;

[Table("Usuario")]
public partial class Usuario
{
    public int UsuarioID { get; set; }

    public string NombreUsuario { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Cedula { get; set; } = null!;

    public string Contrasenha { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public int RolID { get; set; }

    public bool EsAdmin { get; set; }

    // added manually
    public Rol Rol { get; set; }
}
