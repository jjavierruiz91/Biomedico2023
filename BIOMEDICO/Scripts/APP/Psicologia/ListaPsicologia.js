var tablaPsicologiaDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-Psicologia', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,61,62,63,64,65,66,67,68], null, {
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

    tablaPsicologiaDeportiva = $('#datatable-Psicologia').DataTable();
    Get_Data(CargarTabla, '/Psicologia/GetListPsicologiaDeportiva')

});

function CargarTabla(data) {
    tablaPsicologiaDeportiva.clear().draw();
    let PsicologiaDeport = data.objeto;
    console.log(PsicologiaDeport);
    $.each(PsicologiaDeport, function (index, item) {
        tablaPsicologiaDeportiva.row.add([
            item.NumIdentificacion,
            item.EstadoCivil,
            item.NivelEducativo,
            item.YoSoy,
            item.NumHermanos,
            item.VivoCon,
            item.Actualmente,
            item.Religion,
            item.DependenciaEconomia,


            item.HistoriaFamiliaresPsicologia.length > 0 ? item.HistoriaFamiliaresPsicologia[0].NombrePadre : "",
            item.HistoriaFamiliaresPsicologia.length > 0 ? item.HistoriaFamiliaresPsicologia[0].EdadPadre: "",
            item.HistoriaFamiliaresPsicologia.length > 0 ? item.HistoriaFamiliaresPsicologia[0].RelacionPadre: "",
            item.HistoriaFamiliaresPsicologia.length > 0 ?  item.HistoriaFamiliaresPsicologia[0].NombreMAdre: "",
            item.HistoriaFamiliaresPsicologia.length > 0 ? item.HistoriaFamiliaresPsicologia[0].EdadMadre: "",
            item.HistoriaFamiliaresPsicologia.length > 0 ? item.HistoriaFamiliaresPsicologia[0].RelacionMadre: "",
            item.HistoriaFamiliaresPsicologia.length > 0 ?  item.HistoriaFamiliaresPsicologia[0].RelacionHermanos: "",

            item.FamiliaresPsicologia.length > 0 ? item.FamiliaresPsicologia[0].SustanciasPsicoFmlia: "",
            item.FamiliaresPsicologia.length > 0 ? item.FamiliaresPsicologia[0].EnferMentalesFmlia: "",
            item.FamiliaresPsicologia.length > 0 ? item.FamiliaresPsicologia[0].EnferCoronariasFmlia: "",
            item.FamiliaresPsicologia.length > 0 ? item.FamiliaresPsicologia[0].ObesidadFmlia: "",
            item.FamiliaresPsicologia.length > 0 ? item.FamiliaresPsicologia[0].CancerFmlia: "",
            item.FamiliaresPsicologia.length > 0 ? item.FamiliaresPsicologia[0].HipertensionFmlia: "",
            item.FamiliaresPsicologia.length > 0 ? item.FamiliaresPsicologia[0].EnferAlergicasFmlia: "",
            
           
            item.EnfermedadPersonalPsicologia.length > 0 ?  item.EnfermedadPersonalPsicologia[0].SustanciasPsicoactivasPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].EnferMentalesPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].DiabetesPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].EnferCoronariasPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].ObesidadPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ?   item.EnfermedadPersonalPsicologia[0].CancerPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].HipertensionPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].EnferAlergicasPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].AsmaPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].ComplicacionesPartoPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].LesionesPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].CualesLesionesPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].TrabajoConcentrarsePer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].DolorMuscularPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].PartoCesareaPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].PartoNormalPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].LesionadoActualPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].DificultadSueñoPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].DolorCabezaPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].CirugiasPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].ApetitoPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ?  item.EnfermedadPersonalPsicologia[0].CansadoPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].OtroPer: "",
            item.EnfermedadPersonalPsicologia.length > 0 ? item.EnfermedadPersonalPsicologia[0].HistoriadelProblemaPer: "",

            
            item.VidapersonalPsicologia.length > 0 ? item.VidapersonalPsicologia[0].EntrenamientoActualPsi: "",
            item.VidapersonalPsicologia.length > 0 ? item.VidapersonalPsicologia[0].HorasDiariasPsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].NumeroSesionesPsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].LugarPsi: "",
            item.VidapersonalPsicologia.length > 0 ?   item.VidapersonalPsicologia[0].NombreEntrenadorPsi: "",
            item.VidapersonalPsicologia.length > 0 ?   item.VidapersonalPsicologia[0].InicioDeportePsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].EntrenamiendoPsi: "",
            item.VidapersonalPsicologia.length > 0 ?   item.VidapersonalPsicologia[0].CompeticionPsi: "",
            item.VidapersonalPsicologia.length > 0 ?   item.VidapersonalPsicologia[0].EntrenamientoGuiadoPsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].MeApoyanPsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].CompromisoPsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].EntramientoPsicologicoPsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].ObservacionesPsi: "",
            item.VidapersonalPsicologia.length > 0 ?  item.VidapersonalPsicologia[0].ResultadosPsi: "",
            item.VidapersonalPsicologia.length > 0 ?   item.VidapersonalPsicologia[0].RecomendacionesPsi: "",
            item.VidapersonalPsicologia.length > 0 ?   item.VidapersonalPsicologia[0].RemisionPsi: "",
            item.VidapersonalPsicologia.length > 0 ?    item.VidapersonalPsicologia[0].SeguimientoPsi: "",
            
            
            item.TestPsicologia.length > 0 ?   item.TestPsicologia[0].Prueba: "",
            item.TestPsicologia.length > 0 ?  item.TestPsicologia[0].Puntuacion: "",
            item.TestPsicologia.length > 0 ?  item.TestPsicologia[0].Valoracion: "",
            item.TestPsicologia.length > 0 ?  item.TestPsicologia[0].Concepto: "",

            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdDatosDemograficos + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdDatosDemograficos + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdDatosDemograficos + ')" ></i>&ensp;'+
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdDatosDemograficos + ')" ></i>&ensp;'

        ]).draw(false);
   
        
        var NumHermanos = tablaPsicologiaDeportiva.column(4);
            var VivoCon= tablaPsicologiaDeportiva.column(5);
            var Actualmente= tablaPsicologiaDeportiva.column(6);
            var Religion= tablaPsicologiaDeportiva.column(7);
            var DependenciaEconomia= tablaPsicologiaDeportiva.column(8);


        var NombrePadre = tablaPsicologiaDeportiva.column(9);
        var EdadPadre = tablaPsicologiaDeportiva.column(10);
        var RelacionPadre = tablaPsicologiaDeportiva.column(11);
        var NombreMAdre = tablaPsicologiaDeportiva.column(12);
        var EdadMadre = tablaPsicologiaDeportiva.column(13);
        var RelacionMadre = tablaPsicologiaDeportiva.column(14);
        var RelacionHermanos = tablaPsicologiaDeportiva.column(15);

       
        var SustanciasPsicoFmlia = tablaPsicologiaDeportiva.column(16);
        var EnferMentalesFmlia = tablaPsicologiaDeportiva.column(17);
        var EnferCoronariasFmlia = tablaPsicologiaDeportiva.column(18);
        var ObesidadFmlia = tablaPsicologiaDeportiva.column(19);
        var CancerFmlia = tablaPsicologiaDeportiva.column(20);
        var HipertensionFmlia = tablaPsicologiaDeportiva.column(21);
        var EnferAlergicasFmlia = tablaPsicologiaDeportiva.column(22);


        var SustanciasPsicoactivasPer = tablaPsicologiaDeportiva.column(23);
        var EnferMentalesPer = tablaPsicologiaDeportiva.column(24);
        var DiabetesPer = tablaPsicologiaDeportiva.column(25);
        var EnferCoronariasPer = tablaPsicologiaDeportiva.column(26);
        var ObesidadPer = tablaPsicologiaDeportiva.column(27);
        var CancerPer = tablaPsicologiaDeportiva.column(28);
        var HipertensionPer = tablaPsicologiaDeportiva.column(29);
        var EnferAlergicasPer = tablaPsicologiaDeportiva.column(30);
        var AsmaPer = tablaPsicologiaDeportiva.column(31);
        var ComplicacionesPartoPer = tablaPsicologiaDeportiva.column(32);
        var LesionesPer = tablaPsicologiaDeportiva.column(33);
        var CualesLesionesPer = tablaPsicologiaDeportiva.column(34);
        var TrabajoConcentrarsePer = tablaPsicologiaDeportiva.column(35);
        var DolorMuscularPer = tablaPsicologiaDeportiva.column(36);
        var PartoCesareaPer = tablaPsicologiaDeportiva.column(37);
        var PartoNormalPer = tablaPsicologiaDeportiva.column(38);
        var LesionadoActualPer = tablaPsicologiaDeportiva.column(39);
        var DificultadSueñoPer = tablaPsicologiaDeportiva.column(40);
        var DolorCabezaPer = tablaPsicologiaDeportiva.column(41);
        var CirugiasPer = tablaPsicologiaDeportiva.column(42);
        var ApetitoPer = tablaPsicologiaDeportiva.column(43);
        var CansadoPer = tablaPsicologiaDeportiva.column(44);
        var OtroPer = tablaPsicologiaDeportiva.column(45);
        var HistoriadelProblemaPer = tablaPsicologiaDeportiva.column(46);

        var EntrenamientoActualPsi = tablaPsicologiaDeportiva.column(47);
        var HorasDiariasPsi = tablaPsicologiaDeportiva.column(48);
        var NumeroSesionesPsi = tablaPsicologiaDeportiva.column(49);
        var LugarPsi = tablaPsicologiaDeportiva.column(50);
        var NombreEntrenadorPsi = tablaPsicologiaDeportiva.column(51);
        var InicioDeportePsi = tablaPsicologiaDeportiva.column(52);
        var EntrenamiendoPsi = tablaPsicologiaDeportiva.column(53);
        var CompeticionPsi = tablaPsicologiaDeportiva.column(54);
        var EntrenamientoGuiadoPsi = tablaPsicologiaDeportiva.column(55);
        var MeApoyanPsi = tablaPsicologiaDeportiva.column(56);
        var CompromisoPsi = tablaPsicologiaDeportiva.column(57);
        var EntramientoPsicologicoPsi = tablaPsicologiaDeportiva.column(58);
        var ObservacionesPsi = tablaPsicologiaDeportiva.column(59);
        var ResultadosPsi = tablaPsicologiaDeportiva.column(60);
        var RecomendacionesPsi = tablaPsicologiaDeportiva.column(61);
        var RemisionPsi = tablaPsicologiaDeportiva.column(62);
        var SeguimientoPsi = tablaPsicologiaDeportiva.column(63);
        

        var Prueba = tablaPsicologiaDeportiva.column(64);
        var Puntuacion = tablaPsicologiaDeportiva.column(65);
        var Valoracion = tablaPsicologiaDeportiva.column(66);
        var Concepto = tablaPsicologiaDeportiva.column(67);

        NumHermanos.visible(false);
        VivoCon.visible(false);
        Actualmente.visible(false);
        Religion.visible(false);
        DependenciaEconomia.visible(false);


        NombrePadre.visible(false);
        EdadPadre.visible(false);
        RelacionPadre.visible(false);
        NombreMAdre.visible(false);
        EdadMadre.visible(false);
        RelacionMadre.visible(false);
        RelacionHermanos.visible(false);

      
        SustanciasPsicoFmlia.visible(false);
        EnferMentalesFmlia.visible(false);
        EnferCoronariasFmlia.visible(false);
        ObesidadFmlia.visible(false);
        CancerFmlia.visible(false);
        HipertensionFmlia.visible(false);
        EnferAlergicasFmlia.visible(false);


        SustanciasPsicoactivasPer.visible(false);
        EnferMentalesPer.visible(false);
        DiabetesPer.visible(false);
        EnferCoronariasPer.visible(false);
        ObesidadPer.visible(false);
        CancerPer.visible(false);
        HipertensionPer.visible(false);
        EnferAlergicasPer.visible(false);
        AsmaPer.visible(false);
        ComplicacionesPartoPer.visible(false);
        LesionesPer.visible(false);
        CualesLesionesPer.visible(false);
        TrabajoConcentrarsePer.visible(false);
        DolorMuscularPer.visible(false);
        PartoCesareaPer.visible(false);
        PartoNormalPer.visible(false);
        LesionadoActualPer.visible(false);
        DificultadSueñoPer.visible(false);
        DolorCabezaPer.visible(false);
        CirugiasPer.visible(false);
        ApetitoPer.visible(false);
        CansadoPer.visible(false);
        OtroPer.visible(false);
        HistoriadelProblemaPer.visible(false);

        EntrenamientoActualPsi.visible(false);
        HorasDiariasPsi.visible(false);
        NumeroSesionesPsi.visible(false);
        LugarPsi.visible(false);
        NombreEntrenadorPsi.visible(false);
        InicioDeportePsi.visible(false);
        EntrenamiendoPsi.visible(false);
        CompeticionPsi.visible(false);
        EntrenamientoGuiadoPsi.visible(false);
        MeApoyanPsi.visible(false);
        CompromisoPsi.visible(false);
        EntramientoPsicologicoPsi.visible(false);
        ObservacionesPsi.visible(false);
        ResultadosPsi.visible(false);
        RecomendacionesPsi.visible(false);
        RemisionPsi.visible(false);
        SeguimientoPsi.visible(false);
       
        Prueba.visible(false);
        Puntuacion.visible(false);
        Valoracion.visible(false);
        Concepto.visible(false);

    });
}

function ActualizardEportistaData(iddepor) {
    window.location.href = '../Psicologia/Agregar?IdPsicoReg=' + iddepor;

}
function DetalleData(iddepor) {
    window.location.href = '../Psicologia/Agregar?IdPsicoReg=' + iddepor + "&Viewdetail=SI";

}


function Eliminar(IdMed) {
    swal({
        title: "Atención",
        text: "¿Estas seguro de eliminar este registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                Get_Data(RecargarTabla, '/Psicologia/Eliminar?IdPsicologiaDep=' + IdMed);
            }
            else {
                swal.close()
            }
        });
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/Psicologia/GetListPsicologiaDeportiva')
}
function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=Psico' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}