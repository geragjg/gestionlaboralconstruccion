using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class DiaQuincenaAusencia
{
    public int DiaQuincenaAusenciaID { get; set; }

    public int DiaQuincenaID { get; set; }

    public int AusenciaID { get; set; }

    public int UsuarioID { get; set; }

    public DateTime FechaCambio { get; set; }
}
