using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class DiaQuincenaHistoria
{
    public int DiaQuincenaHistoriaID { get; set; }

    public int DiaQuincenaID { get; set; }

    public int? AusenciaID { get; set; }

    public int? HoraID { get; set; }

    public decimal? ValorHora { get; set; }

    public int UsuarioID { get; set; }

    public DateTime FechaCambio { get; set; }
}
