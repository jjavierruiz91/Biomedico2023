var tablaControlNutricionDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-ControlNutricion', [0, 1, 2, 3, 4, 5, 6,7,8,9,10,11], null, {
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

    tablaControlNutricionDeportiva = $('#datatable-ControlNutricion').DataTable();
    Get_Data(CargarTabla, '/ControlNutricion/GetListControlNutricionDeportiva')

});

function CargarTabla(data) {
    tablaControlNutricionDeportiva.clear().draw();
    let ControlNutricionDeport = data.objeto;
    console.log(ControlNutricionDeport);
    $.each(ControlNutricionDeport, function (index, item) {
        tablaControlNutricionDeportiva.row.add([
            item.IdControlNutri,
            item.ControlNutrii,
            item.FechaNutrii,
            item.DesayunoControl,
            item.MediaMañanaControl,
            item.AlmuerzoControl,
            item.MediaTardeControl,
            item.CenaControl,
            item.PesoActualControl,
            item.CambiosControl,
            item.NuevoDiagnosticoControl,
            /*item.NumIdentificacion,*/
                        //item.NombreMonitor + " " + item.PrimerApellido,
            /* item.FechaConsulta,*/
            //'<i class=" fa fa-window-close" title="Eliminar" onclick="Eliminar(' + item.IdMedicina + ')" ></i>&ensp;' +
            //'<i class="fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicina + ')"></i>'

            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdControlNutri + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdControlNutri + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdControlNutri + ')" ></i>&ensp;'
        ]).draw(false);

       
        var MediaTardeControl = tablaControlNutricionDeportiva.column(6);
        var CenaControl = tablaControlNutricionDeportiva.column(7);
        var PesoActualControl = tablaControlNutricionDeportiva.column(8);
        var CambiosControl = tablaControlNutricionDeportiva.column(9);
        var NuevoDiagnosticoControl = tablaControlNutricionDeportiva.column(10);
        ////var NumIdentificacion = tablaControlNutricionDeportiva.column(12);

        MediaTardeControl.visible(false);
        CenaControl.visible(false);
        PesoActualControl.visible(false);
        CambiosControl.visible(false);
        NuevoDiagnosticoControl.visible(false);
        //NumIdentificacion.visible(false);
        


    });
}


function ActualizardEportistaData(IdControlNutriDepor) {
    window.location.href = '../ControlNutricion/Agregar?IdControlNutriReg=' + IdControlNutriDepor;

}
function DetalleData(IdControlNutriDepor) {
    window.location.href = '../ControlNutricion/Agregar?IdControlNutriReg=' + IdControlNutriDepor + "&Viewdetail=SI";

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
                Get_Data(RecargarTabla, '/ControlNutricion/Eliminar?idControlNutri=' + IdNutriDep);
            }
            else {
                swal.close()
            }
        });

}

function RecargarTabla() {
    Get_Data(CargarTabla, '/ControlNutricion/GetListControlNutricionDeportiva')
}
