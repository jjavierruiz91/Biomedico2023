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
    
    public partial class ControlNutricion
    {
        public int IdControlNutri { get; set; }
        public string ControlNutrii { get; set; }
        public string FechaNutrii { get; set; }
        public string DesayunoControl { get; set; }
        public string MediaMañanaControl { get; set; }
        public string AlmuerzoControl { get; set; }
        public string MediaTardeControl { get; set; }
        public string CenaControl { get; set; }
        public string PesoActualControl { get; set; }
        public string CambiosControl { get; set; }
        public Nullable<long> NumIdentificacion { get; set; }
        public string NuevoDiagnosticoControl { get; set; }
        public string FirmaControlNuriii { get; set; }
        public Nullable<int> IdNutricion { get; set; }
        public Nullable<int> IdMedicina { get; set; }
    
        public virtual Nutricion Nutricion { get; set; }
    }
}