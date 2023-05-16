var tablaControlFisioterapiaDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-ControlFisioterapia', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], null, {
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

    tablaControlFisioterapiaDeportiva = $('#datatable-ControlFisioterapia').DataTable();
    Get_Data(CargarTabla, '/ControlFisioterapia/GetListControlFisioterapiaDeportiva')

});

function CargarTabla(data) {
    tablaControlFisioterapiaDeportiva.clear().draw();
    let ControlFisioterapiaDeport = data.objeto;
    console.log(ControlFisioterapiaDeport);
    $.each(ControlFisioterapiaDeport, function (index, item) {
        tablaControlFisioterapiaDeportiva.row.add([
            item.NumIdentificacion,
            item.PatologicosClinicaFisio,
            item.QuirurgicosClinicaFisio,
            item.TraumaticosClinicaFisio,
            item.FarmacologicosClinicaFisio,
            item.FamiliaresClinicaFisio,
            item.DiagnosticoMedicoClinicaFisio,
            item.MotivoConsultaClinicaFisio,
            item.DolorClinicaFisio,
            item.EdemaClinicaFisio,
            item.AlteradaClinicaFisio,
           
            /*item.NumIdentificacion,*/
            //item.NombreMonitor + " " + item.PrimerApellido,
            /* item.FechaConsulta,*/
            //'<i class=" fa fa-window-close" title="Eliminar" onclick="Eliminar(' + item.IdMedicina + ')" ></i>&ensp;' +
            //'<i class="fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicina + ')"></i>'

            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdHistoriaClinicaFisio + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdHistoriaClinicaFisio + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdHistoriaClinicaFisio + ')" ></i>&ensp;' +
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdHistoriaClinicaFisio + ')" ></i>&ensp;'

        ]).draw(false);


        var MediaTardeControl = tablaControlFisioterapiaDeportiva.column(6);
        var CenaControl = tablaControlFisioterapiaDeportiva.column(7);
        var PesoActualControl = tablaControlFisioterapiaDeportiva.column(8);
        var CambiosControl = tablaControlFisioterapiaDeportiva.column(9);
        var NuevoDiagnosticoControl = tablaControlFisioterapiaDeportiva.column(10);
        //var NumIdentificacion = tablaControlFisioterapiaDeportiva.column(12);

        MediaTardeControl.visible(false);
        CenaControl.visible(false);
        PesoActualControl.visible(false);
        CambiosControl.visible(false);
        NuevoDiagnosticoControl.visible(false);
        //NumIdentificacion.visible(false);



    });
}


function ActualizardEportistaData(IdControlPsicologiaDepor) {
    window.location.href = '../ControlFisioterapia/Agregar?IdControlPsicoReg=' + IdControlPsicologiaDepor;

}
function DetalleData(IdControlPsicologiaDepor) {
    window.location.href = '../ControlFisioterapia/Agregar?IdControlPsicoReg=' + IdControlPsicologiaDepor + "&Viewdetail=SI";

}

function Eliminar(IdNutriDep) {
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
                Get_Data(RecargarTabla, '/ControlFisioterapia/Eliminar?idControlNutri=' + IdNutriDep);
            }
            else {
                swal.close()
            }
        });

}

function RecargarTabla() {
    Get_Data(CargarTabla, '/ControlFisioterapia/GetListControlFisioterapiaDeportiva')
}
function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=ControlFisio' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}