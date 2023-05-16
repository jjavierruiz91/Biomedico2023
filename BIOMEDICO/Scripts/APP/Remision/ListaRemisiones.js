var tablaRemisionDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-Remisiones', [0, 1, 2, 3, 4, 5, 6 , 7 , 8 , 9 , 10 ,11 ,12 ,13 ,14 ,15], null, {
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

    tablaRemisionDeportiva = $('#datatable-Remisiones').DataTable();
    Get_Data(CargarTabla, '/Remision/GetListRemisionMedicasDeportiva')

});

function CargarTabla(data) {
    tablaRemisionDeportiva.clear().draw();
    let RemisionMedicas = data.objeto;
    console.log(RemisionMedicas);
    $.each(RemisionMedicas, function (index, item) {
        tablaRemisionDeportiva.row.add([
           

            item.IdRemisiones,
            item.EstadoRevision,
            item.NumeroIdentificacion,
            item.FechaRemision == undefined?'': JSONDateconverter(item.FechaRemision),
            item.DisciplinaRemision,
            //item.NombreMonitor + " " + item.PrimerApellido,
            item.MunicipioRemision,
            item.CategoriaRemision,
            item.AreaServicioRemision,
            item.NombreDeportistaRemision,
            item.CelularRemision,
            item.CorreoRemision,
            item.TipoLesionRemision,
            item.FechaLesionRemision == undefined ? '' : JSONDateconverter(item.FechaLesionRemision),
            item.FirmaEntrenadoRemision,
            item.EstadoRevision,
        


           //    '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdNutricion + ')" ></i>&ensp;' +
            //    '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdNutricion + ')"></i>'
            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdNutricion + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdRemisiones + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdRemisiones + ')" ></i>&ensp;'
        ]).draw(false);
        
        var IdRemisiones = tablaRemisionDeportiva.column(0);
        var NombreDeportistaRemision = tablaRemisionDeportiva.column(8);
        var CelularRemision = tablaRemisionDeportiva.column(9);
        var CorreoRemision = tablaRemisionDeportiva.column(10);
        var TipoLesionRemision = tablaRemisionDeportiva.column(11);
        var FechaLesionRemision = tablaRemisionDeportiva.column(12);
        var FirmaEntrenadoRemision = tablaRemisionDeportiva.column(13);
        var EstadoRevision = tablaRemisionDeportiva.column(14);
        
        //]).draw(false);
        IdRemisiones.visible(false);
        NombreDeportistaRemision.visible(false);
        CelularRemision.visible(false);
        CorreoRemision.visible(false);
        TipoLesionRemision.visible(false);
        FechaLesionRemision.visible(false);
        FirmaEntrenadoRemision.visible(false);
        EstadoRevision.visible(false);

    });
}


function ActualizardEportistaData(IdRemisionDepor) {
    window.location.href = '../Remision/Agregar?IdReg=' + IdRemisionDepor;

}
function DetalleData(IdRemisionDepor) {
    window.location.href = '../Remision/Agregar?IdReg=' + IdRemisionDepor + "&Viewdetail=SI";

}



function RecargarTabla() {
    Get_Data(CargarTabla, '/Remision/GetListRemisionMedicasDeportiva')
}