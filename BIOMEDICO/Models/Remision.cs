//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BIOMEDICO.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Remision
    {
        public int IdRemisiones { get; set; }
        public Nullable<long> NumeroIdentificacion { get; set; }
        public Nullable<System.DateTime> FechaRemision { get; set; }
        public string DisciplinaRemision { get; set; }
        public string MunicipioRemision { get; set; }
        public string CategoriaRemision { get; set; }
        public string AreaServicioRemision { get; set; }
        public string NombreDeportistaRemision { get; set; }
        public string CelularRemision { get; set; }
        public string CorreoRemision { get; set; }
        public string TipoLesionRemision { get; set; }
        public string FechaLesionRemision { get; set; }
        public string FirmaEntrenadoRemision { get; set; }
        public string EstadoRevision { get; set; }
    }
}