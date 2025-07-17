using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class Obra
{
    public int ObraID { get; set; }

    public DateOnly FechaInicio { get; set; }

    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public DateOnly? FechaFin { get; set; }

    public string? Cliente { get; set; }
}
