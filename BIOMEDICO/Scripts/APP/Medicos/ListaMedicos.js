var tablaMedicosDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-medicos', [0, 1, 2, 3, 4, 5, 6], null, {
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

    tablaMedicosDeportiva = $('#datatable-medicos').DataTable();
    Get_Data(CargarTabla, '/Medicos/GetListMedicosDeportiva')

});

function CargarTabla(data) {
    tablaMedicosDeportiva.clear().draw();
    let MedicosDeport = data.objeto.DatosMed;
    console.log(MedicosDeport);
    $.each(MedicosDeport, function (index, item) {
        tablaMedicosDeportiva.row.add([
            item.IdMedicos,
            item.CodMedicos,
            item.PrimerNombre != null ? item.PrimerNombre : '' + " " + item.SegundoNombre != null ? item.SegundoNombre :'' ,
            item.PrimerApellido,
            item.Especialidad,
            item.Genero,
            //    '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdNutricion + ')" ></i>&ensp;' +
            //    '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdNutricion + ')"></i>'
            '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdMedicos + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicos + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdMedicos + ')" ></i>&ensp;'
        ]).draw(false);


        //]).draw(false);



    });
}


function ActualizardEportistaData(idMedicosdepor) {
    window.location.href = '../Medicos/Agregar?IdReg=' + idMedicosdepor;

}
function DetalleData(idMedicosdepor) {
    window.location.href = '../Medicos/Agregar?IdReg=' + idMedicosdepor + "&Viewdetail=SI";

}


function Eliminar(IdMedicos) {
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
                Get_Data(RecargarTabla, '/Medicos/Eliminar?idMedicoDep=' + IdMedicos);
            }
            else {
                swal.close()
            }
        });
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/Medicos/GetListMedicosDeportiva')
}