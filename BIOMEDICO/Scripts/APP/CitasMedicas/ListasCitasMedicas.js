

var tablaCitasMedicasDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-citasmedicas', [0, 1, 2, 3, 4, 5], null, {
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

    tablaCitasMedicasDeportiva = $('#datatable-citasmedicas').DataTable();
    Get_Data(CargarTabla, '/CitasMedicas/GetListCitasMedicasDeportiva')

});
var Arraycitasglobal = [];
function CargarTabla(data) {
    tablaCitasMedicasDeportiva.clear().draw();
    let CitasMedicasDeport = data.objeto;
    Arraycitasglobal = CitasMedicasDeport;
    console.log(CitasMedicasDeport);
    $.each(CitasMedicasDeport, function (index, item) {
        if (item.Fecha != null) {
            let Fecha;
            if (item.Fecha != null) {
                Fecha = JSONDateconverter(item.Fecha);
            }
            tablaCitasMedicasDeportiva.row.add([
                /* item.IdCitaMedica,*/
                item.NumIdentificacion,
                item.Especialista,
                Fecha,
                item.Hora + ": " + item.Minutos + " :" + item.Segundos,
                item.EstadoCitas,



                '<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdCitaMedica + ')" ></i>&ensp;' +
                '<i class="btn btn-warning btn-group-sm fa fa-medkit" title="CambiarEstado" onclick="CambiarEstado(' + item.IdCitaMedica + ')" ></i>&ensp;' +
                //'<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdCitaMedica + ')"></i>&ensp;' +
                '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdCitaMedica + ')" ></i>&ensp;' +
                '<i class="btn btn-primary btn-group-sm icon-calendar52" id="edit_ActEco_' + index + '" title="RegistrarCita" style="fontsize:90px !important" onclick="RegistarCitasMEdicasData(' + item.IdCitaMedica + ')" ></i>&ensp;'
            ]).draw(false);



        }
        
    });
}


function ActualizardEportistaData(idCitasMed) {
    window.location.href = '../CitasMedicas/Agregar?IdCitasMedReg=' + idCitasMed +'&IsUpdate=true';

}

function RegistarCitasMEdicasData(idCitasMed) {
    let CitasSelect = Arraycitasglobal.find(w => w.IdCitaMedica == idCitasMed);
    if (CitasSelect != undefined) {
        let Especialidad = CitasSelect.Especialista.split(':')[0];
        switch (Especialidad) {
            case "MEDICINA DEL DEPORTE":
                window.location.href = '../MedicinaDeportiva/Agregar?IdCitasMedReg=' + idCitasMed + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
                break;
            case "FISIOTERAPIA":
                window.location.href = '../ControlFisioterapia/Agregar?IdCitasMedReg=' + idCitasMed + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
                break;
            case "PSICOLOGIA":
                
                window.location.href = '../Psicologia/Agregar?IdCitasMedReg=' + idCitasMed + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
                
                break;
            case "NUTRICIÓN":
                window.location.href = '../Nutricion/Agregar?IdCitasMedReg=' + idCitasMed + '&IsUpdate=false&Ced=' + CitasSelect.NumIdentificacion;
                break;
            default:
                break;
        }
       
    }
    

}
function DetalleData(idCitasMed) {
    window.location.href = '../CitasMedicas/Agregar?IdCitasMedReg=' + idCitasMed + "&Viewdetail=SI";

}
function CambiarEstado(idCitasMed) {
    swal({
        title: "Atención",
        text: "¿Estas seguro de actualizar el estado de la cita medica?",
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
                Get_Data(RecargarTabla, '/CitasMedicas/ActualizarEstado?IdCitaMedica=' + idCitasMed);
            }
            else {
                swal.close()
            }
        });
}


function Eliminar(IdCitasMed) {
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
                Get_Data(RecargarTabla, '/CitasMedicas/Eliminar?IdCitasDepor=' + IdCitasMed);
            }
            else {
                swal.close()
            }
        });
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/CitasMedicas/GetListCitasMedicasDeportiva')
}