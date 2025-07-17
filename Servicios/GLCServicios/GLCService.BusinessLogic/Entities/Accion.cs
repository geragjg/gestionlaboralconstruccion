using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class Accion
{
    public int AccionID { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }
}
