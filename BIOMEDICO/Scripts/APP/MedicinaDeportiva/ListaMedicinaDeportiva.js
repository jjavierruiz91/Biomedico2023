var tablaMedicinaDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-MedicinaDeportiva', [0, 1, 2, 3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], null, {
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

    tablaMedicinaDeportiva = $('#datatable-MedicinaDeportiva').DataTable();
    Get_Data(CargarTabla, '/MedicinaDeportiva/GetListMedicinaDeportiva')

    //Get_Data(Permisos,"/ASignarPermisos/GetPermisos")

});
//var arrayPermisos = [];
//function Permisos(data) {
//    arrayPermisos = data;
//    console.log(arrayPermisos);
//    Get_Data(CargarTabla, '/MedicinaDeportiva/GetListMedicinaDeportiva')
//}

function CargarTabla(data) {
    tablaMedicinaDeportiva.clear().draw();
    let MedicinaDeport = data.objeto;
    console.log(MedicinaDeport);
    $.each(MedicinaDeport, function (index, item) {
        //let Butonpdf = "";
        //let ButonDetail = "";
        //let Editar = "";

        //if (arrayPermisos.find(w => w.Permisos.NomPermiso == "LISTADEPORTISTAPDF") != undefined) {
        //    Butonpdf = '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdMedicina + ')" ></i>&ensp;';
        //}
        //if (arrayPermisos.find(w => w.Permisos.NomPermiso == "LISTADEPORTISTADET") != undefined) {
        //    ButonDetail = '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdMedicina + ')" ></i>&ensp;';
        //}
        //if (arrayPermisos.find(w => w.Permisos.NomPermiso == "LISTADEPORTISTAEDITAR") != undefined) {
        //        Editar = '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicina + ')"></i>&ensp;';
        //}

        tablaMedicinaDeportiva.row.add([
            item.NumIdentificacion,
            item.CodMedicina,
            item.MotivoConsulta,
            item.EnfermedadActual,

            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].Diagnostico : "",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].Conducta : "",
            
            item.AntecedentesMedicinaDelDeporte.length > 0 ? item.AntecedentesMedicinaDelDeporte[0].Farmacologicos:"",
            item.AntecedentesMedicinaDelDeporte.length > 0 ?item.AntecedentesMedicinaDelDeporte[0].Familiares:"",
            item.AntecedentesMedicinaDelDeporte.length > 0 ? item.AntecedentesMedicinaDelDeporte[0].Traumatologicos:"",
            item.AntecedentesMedicinaDelDeporte.length > 0 ? item.AntecedentesMedicinaDelDeporte[0].LesionesDeportivas:"",
            item.AntecedentesMedicinaDelDeporte.length > 0 ? item.AntecedentesMedicinaDelDeporte[0].Alergicos:"",
            item.AntecedentesMedicinaDelDeporte.length > 0 ? item.AntecedentesMedicinaDelDeporte[0].PruebaCovid19:"",
            

            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].TensionArterial:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ?  item.ExamenFisicoMedicinaDelDeporte[0].Peso:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].IndiceMasaCorporal:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].Postura:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].FrecuenciaCardiaca:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].Talla:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].Tanner:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].Grasos:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].Muscular:"",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].ExamenEspecifico:"",
            item.AntecedentesMedicinaDelDeporte.length > 0 ? item.AntecedentesMedicinaDelDeporte[0].Patologicos : "",
            item.AntecedentesMedicinaDelDeporte.length > 0 ? item.AntecedentesMedicinaDelDeporte[0].Quirurgicos : "",
            item.ExamenFisicoMedicinaDelDeporte.length > 0 ? item.ExamenFisicoMedicinaDelDeporte[0].FirmaMedico:"",

           /* Editar + ButonDetail + Butonpdf/*/
            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdMedicina + ')" ></i>&ensp;' +
            
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicina + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdMedicina + ')" ></i>&ensp;' +
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdMedicina + ')" ></i>&ensp;'

            

        ]).draw(false);
         //var TobilloPerimetroNutrii= tablaDeportista.column(101);
        //var Patologicos = tablaMedicinaDeportiva.column();
        //var Quirurgicos = tablaMedicinaDeportiva.column();
        var CodMedicina = tablaMedicinaDeportiva.column(1);
        
        var  Farmacologicos = tablaMedicinaDeportiva.column(6);
        var  Familiares = tablaMedicinaDeportiva.column(7);
        var  Traumatologicos = tablaMedicinaDeportiva.column(8);
        var  LesionesDeportivas = tablaMedicinaDeportiva.column(9);
        var   Alergicos = tablaMedicinaDeportiva.column(10);
        var   PruebaCovid19 = tablaMedicinaDeportiva.column(11);

        var  TensionArterial = tablaMedicinaDeportiva.column(12);
        var  Peso = tablaMedicinaDeportiva.column(13);
        var  IndiceMasaCorporal = tablaMedicinaDeportiva.column(14);
        var  Postura = tablaMedicinaDeportiva.column(15);
        var  FrecuenciaCardiaca = tablaMedicinaDeportiva.column(16);
        var  Talla = tablaMedicinaDeportiva.column(17);
        var  Tanner = tablaMedicinaDeportiva.column(18);
        var  Grasos = tablaMedicinaDeportiva.column(19);
        var  Muscular = tablaMedicinaDeportiva.column(20);
        var  ExamenEspecifico = tablaMedicinaDeportiva.column(21);
        var Patologicos = tablaMedicinaDeportiva.column(22);
        var Quirurgicos = tablaMedicinaDeportiva.column(23);
        var FirmaMedico = tablaMedicinaDeportiva.column(24); 


       
        CodMedicina.visible(false);
        
        Farmacologicos.visible(false);
        Familiares.visible(false);
        Traumatologicos.visible(false);
        LesionesDeportivas.visible(false);
        Alergicos.visible(false);
        PruebaCovid19.visible(false);

        TensionArterial.visible(false);
        Peso.visible(false);
        IndiceMasaCorporal.visible(false);
        Postura.visible(false);
        FrecuenciaCardiaca.visible(false);
        Talla.visible(false);
        Tanner.visible(false);
        Grasos.visible(false);
        Muscular.visible(false);
        ExamenEspecifico.visible(false);
        Patologicos.visible(false);
        Quirurgicos.visible(false);
        //Diagnostico.visible(false);
        //Conducta.visible(false);
        FirmaMedico.visible(false);
    });
}


function ActualizardEportistaData(iddepor) {
    window.location.href = '../MedicinaDeportiva/Agregar?IdMedicinaReg=' + iddepor;

}
function DetalleData(iddepor) {
    window.location.href = '../MedicinaDeportiva/Agregar?IdMedicinaReg=' + iddepor +"&Viewdetail=SI";

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
                Get_Data(RecargarTabla, '/MedicinaDeportiva/Eliminar?idMedDep=' + IdMed);
            }
            else {
                swal.close()
            }
        });
   
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/MedicinaDeportiva/GetListMedicinaDeportiva')
}

function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=Med' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}