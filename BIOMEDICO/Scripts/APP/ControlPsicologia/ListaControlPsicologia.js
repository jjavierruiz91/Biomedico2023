var tablaControlPsicologiaDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-ControlPsicologia', [0, 1, 2, 3, 4, 5 ], null, {
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

    tablaControlPsicologiaDeportiva = $('#datatable-ControlPsicologia').DataTable();
    Get_Data(CargarTabla, '/ControlPsicologiaDeportiva/GetListControlPsicologiaDeportiva')

});

function CargarTabla(data) {
    tablaControlPsicologiaDeportiva.clear().draw();
    let ControlPsicologiaDeport = data.objeto;
    console.log(ControlPsicologiaDeport);
    $.each(ControlPsicologiaDeport, function (index, item) {
        tablaControlPsicologiaDeportiva.row.add([
            item.NumIdentificacion,
            JSONDateconverter(item.Fecha),
            item.EvolucionPsicologia,
            item.TestsPsicologico,
            item.FirmaDocPsicologia,
            
            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdSeguimiento + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdSeguimiento + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdSeguimiento + ')" ></i>&ensp;'+
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdSeguimiento + ')" ></i>&ensp;'

        ]).draw(false);

        var FirmaDocPsicologia = tablaControlPsicologiaDeportiva.column(4);
        //var NumIdentificacion = tablaControlFisioterapiaDeportiva.column(12);

        FirmaDocPsicologia.visible(false);


    });
}


function ActualizardEportistaData(IdControlPsicologiaDepor) {
    window.location.href = '../ControlPsicologiaDeportiva/Agregar?IdControlPsicologiaReg=' + IdControlPsicologiaDepor;

}
function DetalleData(IdControlPsicologiaDepor) {
    window.location.href = '../ControlPsicologiaDeportiva/Agregar?IdControlPsicologiaReg=' + IdControlPsicologiaDepor + "&Viewdetail=SI";

}

function Eliminar(idControlPsi) {
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
                Get_Data(RecargarTabla, '/ControlPsicologiaDeportiva/Eliminar?IdSeguimiento=' + idControlPsi);
            }
            else {
                swal.close()
            }
        });

}

function RecargarTabla() {
    Get_Data(CargarTabla, '/ControlPsicologiaDeportiva/GetListControlPsicologiaDeportiva')
}
function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=ControlPsicologia' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}