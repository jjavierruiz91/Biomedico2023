var tablaIncripcionDeportista = [];
$(document).ready(function () {

    RenderTable('datatable-incripciondeportista', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28, 29, 30, 31, 32,34], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,

        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> Excel ",
                filename: "CitasMedicas",
                titleAttr: 'Excel',
            },
            //{
            //    extend: 'pdfHtml5',
            //    text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
            //    filename: "CitasMedicas",
            //    titleAttr: 'Excel',
            //},

        ]
    });

    tablaIncripcionDeportista = $('#datatable-incripciondeportista').DataTable();
    Get_Data(CargarTabla, '/InscripcionDeportistas/GetListInscripcionDeportistas')
    
});

function CargarTabla(data) {
    tablaIncripcionDeportista.clear().draw();
    let InscripcionDeportistasDeport = data.objeto;
    console.log(InscripcionDeportistasDeport);
    $.each(InscripcionDeportistasDeport, function (index, item) {
        tablaIncripcionDeportista.row.add([
            //item.IdIncripcionBeneficiarios,
            item.ProgramaInscripciones,
            item.TipoIdentificacionInscripciones,
            item.NumIdentificacionInscripciones,
            item.PrimerNombreInscripciones,
            item.SegundonombreInscripciones,
            item.PrimerApellidoInscripciones,
            item.SegundoApellidoInscripciones,
            item.FechaNacimientoInscripciones,
            item.EdadInscripciones,
            item.PaisNacimientoInscripciones,
            item.DepartamentoInscripciones,
            item.MunicipioInscripciones,
            item.GeneroInscripciones,
            item.GrupoEtarreoInscripciones,
            item.DireccionResidencia,
            item.BarrioResidencia,
            item.MunicipioResidencia,
            item.EstratoResidencia,
            item.ZonaResidencia,
            item.TelefonoResidencia,
            item.CorreoResidencia,
            item.EstadoCivil,
            item.NivelEstudio,
            item.RegimenSalud,
            item.Eps,
            item.Tiposangre,
            item.CondicionPoblacion,
            item.DiscapacidadPoblacion,
            item.GrupoEtnico,
            item.DeportePractica,
            item.NombreEntrenador,
            item.NombreContacto,
            item.TelefonoContacto,
            item.CorreoContacto,
            
            
           






            ' <i class="btn btn-primary btn-group-sm fa fa-download" title="Descargar Archivos" onclick="DownloadPdfs(' + item.NumIdentificacionInscripciones + ')"></i>&ensp;'




        ]).draw(false);

        var EdadInscripciones = tablaIncripcionDeportista.column(8);
        var PaisNacimientoInscripciones= tablaIncripcionDeportista.column(9);
        var DepartamentoInscripciones= tablaIncripcionDeportista.column(10);
        var MunicipioInscripciones= tablaIncripcionDeportista.column(11);
        var GeneroInscripciones= tablaIncripcionDeportista.column(12);
        var GrupoEtarreoInscripciones= tablaIncripcionDeportista.column(13);
        var DireccionResidencia= tablaIncripcionDeportista.column(14);
        var BarrioResidencia= tablaIncripcionDeportista.column(15);
        var MunicipioResidencia= tablaIncripcionDeportista.column(16);
        var EstratoResidencia= tablaIncripcionDeportista.column(17);
        var ZonaResidencia= tablaIncripcionDeportista.column(18);
        var TelefonoResidencia= tablaIncripcionDeportista.column(19);
        var CorreoResidencia= tablaIncripcionDeportista.column(20);
        var EstadoCivil= tablaIncripcionDeportista.column(21);
        var NivelEstudio= tablaIncripcionDeportista.column(22);
        var RegimenSalud= tablaIncripcionDeportista.column(23);
        var Eps= tablaIncripcionDeportista.column(24);
        var Tiposangre= tablaIncripcionDeportista.column(25);
        var CondicionPoblacion= tablaIncripcionDeportista.column(26);
        var DiscapacidadPoblacion= tablaIncripcionDeportista.column(27);
        var GrupoEtnico= tablaIncripcionDeportista.column(28);
        var DeportePractica= tablaIncripcionDeportista.column(29);
        var NombreEntrenador= tablaIncripcionDeportista.column(30);
        var NombreContacto= tablaIncripcionDeportista.column(31);
        var TelefonoContacto= tablaIncripcionDeportista.column(32);
        var CorreoContacto= tablaIncripcionDeportista.column(33);



            EdadInscripciones.visible(false);
            PaisNacimientoInscripciones.visible(false);
            DepartamentoInscripciones.visible(false);
            MunicipioInscripciones.visible(false);
            GeneroInscripciones.visible(false);
            GrupoEtarreoInscripciones.visible(false);
            DireccionResidencia.visible(false);
            BarrioResidencia.visible(false);
            MunicipioResidencia.visible(false);
            EstratoResidencia.visible(false);
            ZonaResidencia.visible(false);
            TelefonoResidencia.visible(false);
            CorreoResidencia.visible(false);
            EstadoCivil.visible(false);
            NivelEstudio.visible(false);
            RegimenSalud.visible(false);
            Eps.visible(false);
            Tiposangre.visible(false);
            CondicionPoblacion.visible(false);
            DiscapacidadPoblacion.visible(false);
            GrupoEtnico.visible(false);
            DeportePractica.visible(false);
            NombreEntrenador.visible(false);
            NombreContacto.visible(false);
            TelefonoContacto.visible(false);
            CorreoContacto.visible(false);
                 


    });
}

function ActualizardEportistaData(iddepor) {
    window.location.href ='../InscripcionDeportistas/Agregar?Id=' + iddepor;
    
}

function DetalleData(iddepor) {
    window.location.href = '../InscripcionDeportistas/Agregar?Id=' + iddepor + "&Viewdetail=SI";

}

function RecargarTabla() {
    Get_Data(CargarTabla, '/InscripcionDeportistas/GetListInscripcionDeportistas')
}

function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=Deport' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}
function VerPdfMerge(IdEncTrabj) {
    var formURL = '../Report/PdfMergerGeneric?tipo=Med' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}
function DownloadPdfs(IdIncripcionBeneficiarios) {
    var url = "/InscripcionDeportistas/DownloadPdfs?IdIncripcionBeneficiarios=" + IdIncripcionBeneficiarios;

    // Crear un enlace temporal
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Archivos-' + IdIncripcionBeneficiarios + '.zip'; // Nombre del archivo ZIP
    a.style.display = 'none'; // Ocultar el enlace

    // Agregar el enlace al cuerpo del documento
    document.body.appendChild(a);

    // Simular un clic en el enlace
    a.click();

    // Remover el enlace del cuerpo del documento
    document.body.removeChild(a);
       


}

   
                