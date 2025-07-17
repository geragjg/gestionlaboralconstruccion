using System;
using System.Collections.Generic;

namespace GLCService.BusinessLogic.Entities;

public partial class DiaQuincenaCertificado
{
    public int DiaQuincenaCertificadoID { get; set; }

    public int DiaQuincenaID { get; set; }

    public string? Adjunto { get; set; }
}
