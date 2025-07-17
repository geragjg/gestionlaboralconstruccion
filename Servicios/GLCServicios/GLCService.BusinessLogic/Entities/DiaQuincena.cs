using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class DiaQuincena
{
    public int DiaQuincenaID { get; set; }

    public int Dia { get; set; }

    public int NumeroQuincena { get; set; }

    public DateOnly Fecha { get; set; }

    public int Anho { get; set; }

    public int OperarioID { get; set; }

    public int ObraID { get; set; }
}
