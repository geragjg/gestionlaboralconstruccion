using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class Operario
{
    public int OperarioID { get; set; }

    public string NumFuncionario { get; set; } = null!;

    public DateOnly FechaIngreso { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string? TipoContratacion { get; set; }

    public string? TareaDeObra { get; set; }

    public string NCedula { get; set; } = null!;

    public string? Departamento { get; set; }

    public bool? Archivado { get; set; }
}
