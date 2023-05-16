var TablaAgendarcitasDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-agendarcitas', [0, 1, 2, 3, 4, 5,6,7,8], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,

        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            //{
            //    extend: 'excelHtml5',
            //    text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> Excel ",
            //    filename: "CitasMedicas",
            //    titleAttr: 'Excel',
            //},
            //{
            //    extend: 'pdfHtml5',
            //    text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
            //    filename: "CitasMedicas",
            //    titleAttr: 'Excel',
            //},

        ]
    });

    TablaAgendarcitasDeportiva = $('#datatable-agendarcitas').DataTable();
    Get_Data(CargarTabla, '/AgendarCitas/GetListaAgendaDeportiva')

});

function CargarTabla(data) {
    TablaAgendarcitasDeportiva.clear().draw();
    let CitasDeport = data.objeto;
    console.log(CitasDeport);
    $.each(CitasDeport, function (index, item) {
        TablaAgendarcitasDeportiva.row.add([
            item.IdAgendarCitas,
            item.CedEspecialistaCitas,
            item.NombrEspecilistaCitas,
            item.NotificacionCampoCitas,
           
            item.HoraIniciocitas == undefined ? '' : JSONDateconverter(item.HoraIniciocitas, true),
            //item.NombreMonitor + " " + item.PrimerApellido,
            item.HoraFinCitas == undefined ? '' : JSONDateconverter(item.HoraFinCitas, true),
            item.FechaCitas == undefined ? '' : JSONDateconverter(item.FechaCitas),
            item.ObservacionesCitasMedicas,
        
            '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdAgendarCitas + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdAgendarCitas + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdAgendarCitas + ')" ></i>&ensp;'
        ]).draw(false);


        //]).draw(false);



    });
}


function ActualizardEportistaData(idAgendarCitadepor) {
    window.location.href = '../AgendarCitas/Agregar?IdCitasReg=' + idAgendarCitadepor;

}
function DetalleData(idAgendarCitadepor) {
    window.location.href = '../AgendarCitas/Agregar?IdCitasReg=' + idAgendarCitadepor + "&Viewdetail=SI";

}


function Eliminar(IdAgendarCita) {
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
                Get_Data(RecargarTabla, '/AgendarCitas/Eliminar?idAgendarCitaDep=' + IdAgendarCita);
            }
            else {
                swal.close()
            }
        });
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/AgendarCitas/GetListaAgendaDeportiva')
}