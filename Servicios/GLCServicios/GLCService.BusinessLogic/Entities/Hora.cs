using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class Hora
{
    public int HoraID { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripccion { get; set; }

    public int? MaximoDiario { get; set; }

    public string? Categoria { get; set; }

    public int? MaximoSemanal { get; set; }

    public int? Orden { get; set; }

    public bool? Predefinido { get; set; }

    public bool? Archivado { get; set; }
}
