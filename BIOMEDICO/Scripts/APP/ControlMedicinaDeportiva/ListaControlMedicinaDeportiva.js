var tablaControlMedicinaDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-ControlMedicina', [0, 1, 2, 3, 4, 5], null, {
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

    tablaControlMedicinaDeportiva = $('#datatable-ControlMedicina').DataTable();
    Get_Data(CargarTabla, '/ControlMedicinaDeporte/GetListControlMedicinaDeportiva')

});

function CargarTabla(data) {
    tablaControlMedicinaDeportiva.clear().draw();
    let SeguimientoMedicinaDeport = data.objeto;
    console.log(SeguimientoMedicinaDeport);
    $.each(SeguimientoMedicinaDeport, function (index, item) {
        tablaControlMedicinaDeportiva.row.add([
            item.NumIdentificacion,
            JSONDateconverter(item.Fecha),
            item.EvolucionDeportiva,
            item.ConductaDeportiva,
            item.FirmaDeportiva,
         

  
            /*item.NumIdentificacion,*/
            //item.NombreMonitor + " " + item.PrimerApellido,
            /* item.FechaConsulta,*/
            //'<i class=" fa fa-window-close" title="Eliminar" onclick="Eliminar(' + item.IdMedicina + ')" ></i>&ensp;' +
            //'<i class="fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicina + ')"></i>'

            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdSeguimientoDeportiva + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdSeguimientoDeportiva + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdSeguimientoDeportiva + ')" ></i>&ensp;'+
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdSeguimientoDeportiva + ')" ></i>&ensp;'

        ]).draw(false);


        var FirmaDeportiva = tablaControlMedicinaDeportiva.column(4);
        //var CenaControl = tablaControlNutricionDeportiva.column(7);
        //var PesoActualControl = tablaControlNutricionDeportiva.column(8);
        //var CambiosControl = tablaControlNutricionDeportiva.column(9);
        //var NuevoDiagnosticoControl = tablaControlNutricionDeportiva.column(10);
        ////var NumIdentificacion = tablaControlNutricionDeportiva.column(12);

        FirmaDeportiva.visible(false);
        //CenaControl.visible(false);
        //PesoActualControl.visible(false);
        //CambiosControl.visible(false);
        //NuevoDiagnosticoControl.visible(false);
        //NumIdentificacion.visible(false);



    });
}


function ActualizardEportistaData(IdControlMedcinaDEportivaDepor) {
    window.location.href = '../ControlMedicinaDeporte/Agregar?IdControlMedicinaReg=' + IdControlMedcinaDEportivaDepor;

}
function DetalleData(IdControlMedcinaDEportivaDepor) {
    window.location.href = '../ControlMedicinaDeporte/Agregar?IdControlMedicinaReg=' + IdControlMedcinaDEportivaDepor + "&Viewdetail=SI";

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
                Get_Data(RecargarTabla, '/ControlMedicinaDeporte/Eliminar?IdSeguimientoDeportiva=' + IdNutriDep);
            }
            else {
                swal.close()
            }
        });

}

function RecargarTabla() {
    Get_Data(CargarTabla, '/ControlMedicinaDeporte/GetListControlMedicinaDeportiva')
}

function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=ControlMedicina' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}