using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class Ausencia
{
    public int AusenciaID { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public int? MaximoAnual { get; set; }

    public bool? Archivado { get; set; }
}
