using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GLCService.BusinessLogic.Entities;

[Table("Rol")]
public partial class Rol
{
    public int RolID { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;
}
