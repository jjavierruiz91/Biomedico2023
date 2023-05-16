var ObjAgendaDeportiva = {
    CitasDeport: {}//{objetos} llaves y [array] corchetes

}


//var validadorFormDeportista = [];
var IsUpdate = false;
var idAgendarData = 0;
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idAgendarData = getQueryVariable('IdCitasReg');
    VerDetalles = getQueryVariable('Viewdetail');
    if (idAgendarData > 0) {
        IsUpdate = true;
    }
    if (VerDetalles == "SI") {
        $('#SaveAgendaCita').html('Atras')
        Get_Data(LlenarCampos, '/AgendarCitas/GetAgendaCitasDeportivaById?IdAgendaDepor=' + idAgendarData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveAgendaCita').html('Actualizar')
        Get_Data(LlenarCampos, '/AgendarCitas/GetAgendaCitasDeportivaById?IdAgendaDepor=' + idAgendarData);
    }

});




function LlenarCampos(data) {
/*    (JSONDateconverter(data.objeto.Evolucionfisioterapia[0].FechaTratamiento));*/
    $('#IdAgendarCitas').val(data.objeto.IdAgendarCitas);
    $('#CedEspecialistaCitas').val(data.objeto.CedEspecialistaCitas);
    $('#NombrEspecilistaCitas').val(data.objeto.NombrEspecilistaCitas);
    $('#NotificacionCampoCitas').val(data.objeto.NotificacionCampoCitas);
    $('#HoraIniciocitas').val(JSONDateconverter(data.objeto.HoraIniciocitas));
    $('#HoraFinCitas').val(JSONDateconverter(data.objeto.HoraFinCitas));
    $('#FechaCitas').val(JSONDateconverter(data.objeto.FechaCitas));
    $('#ObservacionesCitasMedicas').val(data.objeto.ObservacionesCitasMedicas);
  

    CargarInfoinicial();
}

function getQueryVariable(variable) {//saca los valores de la uRL
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 0;
}

function Atras() {
    window.history.back();
}

function Createobj() {
    document.getElementById("SaveAgendaCita").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdAgendarCitas = 0;
        if (IsUpdate) {
            IdAgendarCitas = idAgendarData;
        }
        ObjAgendaDeportiva = {
            CitasDeport: {

                IdAgendarCitas: IdAgendarCitas,
                CedEspecialistaCitas: $('#CedEspecialistaCitas').val(),
                NombrEspecilistaCitas: $('#NombrEspecilistaCitas').val(),
                NotificacionCampoCitas: $('#NotificacionCampoCitas').val(),
                HoraIniciocitas: $('#HoraIniciocitas').val(),
                HoraFinCitas: $('#HoraFinCitas').val(),
                FechaCitas: $('#FechaCitas').val(),
                ObservacionesCitasMedicas: $('#ObservacionesCitasMedicas').val(),
              
        

            }
        }
        let id = 10;

        if (IsUpdate) {
            Save_Data(ActualizarVista, '/AgendarCitas/Actualizar', ObjAgendaDeportiva, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/AgendarCitas/Agregar', ObjAgendaDeportiva, 'Guardado');

            // LimpiarFormulario()
        }

        //} else {
        //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
        //}

    }

}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../AgendarCitas/ListaAgendaDeportiva"
    }
}


function LimpiarFormulario() {

    $('#IdAgendarCitas').val('')
    $('#CedEspecialistaCitas').val('')
    $('#HoraIniciocitas').val('')
    $('#HoraFinCitas').val('')
    $('#FechaCitas').val('')
    
}

