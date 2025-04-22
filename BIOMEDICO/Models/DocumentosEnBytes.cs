using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BIOMEDICO.Models
{
    public class DocumentosEnBytes
    {
       public byte[] documentoBenefBytes { get; set; }
        public byte[] saludFileBytes { get; set; }
        public byte[] autorizacionFileBytes { get; set; }
        public byte[] cedulaPadreFileBytes { get; set; }
    }
}