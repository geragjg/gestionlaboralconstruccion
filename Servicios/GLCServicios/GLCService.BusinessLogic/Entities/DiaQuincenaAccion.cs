using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class DiaQuincenaAccion
{
    public int DiaQuincenaAccionID { get; set; }

    public int DiaQuincenaID { get; set; }

    public int AccionID { get; set; }
}
