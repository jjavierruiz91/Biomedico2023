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
    
    public partial class MedicinaDelDeporte
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public MedicinaDelDeporte()
        {
            this.AntecedentesMedicinaDelDeporte = new HashSet<AntecedentesMedicinaDelDeporte>();
            this.ExamenFisicoMedicinaDelDeporte = new HashSet<ExamenFisicoMedicinaDelDeporte>();
            this.SeguimientoMedicinaDeporte = new HashSet<SeguimientoMedicinaDeporte>();
        }
    
        public int IdMedicina { get; set; }
        public Nullable<int> CodMedicina { get; set; }
        public Nullable<System.DateTime> FechaConsulta { get; set; }
        public string MotivoConsulta { get; set; }
        public string EnfermedadActual { get; set; }
        public Nullable<System.DateTime> FechaRegistro { get; set; }
        public string UsuarioRegistro { get; set; }
        public Nullable<long> NumIdentificacion { get; set; }
        public Nullable<int> IdCitaMedica { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AntecedentesMedicinaDelDeporte> AntecedentesMedicinaDelDeporte { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ExamenFisicoMedicinaDelDeporte> ExamenFisicoMedicinaDelDeporte { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SeguimientoMedicinaDeporte> SeguimientoMedicinaDeporte { get; set; }
    }
}
