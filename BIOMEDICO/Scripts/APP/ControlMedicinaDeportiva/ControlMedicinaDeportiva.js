var ObjControlMedicinaDeportiva = {
    ControlMedicinaDeport: {},//{objetos} llaves y [array] corchetes

}


//var validadorFormDeportista = [];
var IsUpdate = false;
var IdControlMedicinaData = 0;
var idMedicinaData = 0;
var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    IdControlMedicinaData = getQueryVariable('IdControlMedicinaReg');
    let cedulaPaciente = getQueryVariable('Ced');
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (IdControlMedicinaData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }

    if (VerDetalles == "SI") {
        $('#SaveControlMedicinaDeportiva').html('Atras')
        Get_Data(LlenarCampos, '/ControlMedicinaDeporte/GetControlMedicinaDeportivaById?IdControlMedicinaDepor=' + IdControlMedicinaData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveControlMedicinaDeportiva').html('Actualizar')
        Get_Data(LlenarCampos, '/ControlMedicinaDeporte/GetControlMedicinaDeportivaById?IdControlMedicinaDepor=' + IdControlMedicinaData);
    }
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/ControlMedicinaDeporte/BuscarDeportista?cedula=' + Valuecedula)
}

function LlenarcamposInicial(data) {
    $('#PrimerNombre').val(data.PrimerNombre)
    $('#SegundoNombre').val(data.SegundoNombre)
    $('#PrimerApellido').val(data.PrimerApellido)
    $('#SegundoApellido').val(data.SegundoApellido)
    $('#Edad').val(data.Edad)
    $('#Deporte').val(data.Deporte)
    $('#Genero').val(data.Genero)

}


function LlenarCampos(data) {

    $('#IdSeguimientoDeportiva').val(data.objeto.IdSeguimientoDeportiva);
    $('#Fecha').val(JSONDateconverter(data.objeto.Fecha));
    $('#DiagnosticoDeportiva').val(data.objeto.DiagnosticoDeportiva);
    $('#EvolucionDeportiva').val(data.objeto.EvolucionDeportiva);
    $('#ConductaDeportiva').val(data.objeto.ConductaDeportiva);
    $('#FirmaDeportiva').val(data.objeto.FirmaDeportiva);
    $('#Cedula').val(data.objeto.NumIdentificacion);
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

var IdCitaMedica = 0;
function Createobj() {
    document.getElementById("SaveControlMedicinaDeportiva").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdSeguimientoDeportiva = 0;
        if (IsUpdate) {
            IdSeguimientoDeportiva = IdControlMedicinaData;

        }

    }
    ObjControlMedicinaDeportiva = {
        ControlMedicinaDeport: {

            IdSeguimientoDeportiva: IdSeguimientoDeportiva,
            Fecha: $('#Fecha').val(),
            DiagnosticoDeportiva: $('#DiagnosticoDeportiva').val(),
            EvolucionDeportiva: $('#EvolucionDeportiva').val(),
            ConductaDeportiva: $('#ConductaDeportiva').val(),
            FirmaDeportiva: $('#FirmaDeportiva').val(),
            NumIdentificacion: $('#Cedula').val(),
            IdSeguimientoDeportiva: IdControlMedicinaData,
            IdMedicina: IdCitaMedica,
        },

    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/ControlMedicinaDeporte/Actualizar', ObjControlMedicinaDeportiva, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/ControlMedicinaDeporte/Agregar', ObjControlMedicinaDeportiva, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}

}


function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../ControlMedicinaDeporte/ListaControlMedicinaDeportiva"
    }
}


//function LimpiarFormulario() {
//    $('#CodFisioterapi').val('')
//    $('#CodFisioterapi').val('')
//    $('#Lesion').val('')
//    $('#cual').val('')
//    $('#NumIdentificacion').val('')
//    $('#IdAntecedentesfisi').val('')
//    $('#Patologicos').val('')
//    $('#Quirurgicos').val('')
//    $('#Traumaticos').val('')
//    $('#Farmacologicos').val('')
//    $('#Familiares').val('')
//    $('#DiagnosticoMedico').val('')
//    $('#MotivoConsultar').val('')
//    $('#DolorFisio').val('')
//    $('#EdemaFisio').val('')
//    $('#AlteradaFisio').val('')
//    $('#NoAlteradaFisio').val('')
//    $('#Screenmifisio').val('')
//    $('#DesempeñoMuscularFisio').val('')
//    $('#PosturaFisio').val('')
//    $('#ValoracionInicial').val('')
//    $('#FechaTratamiento').val('')
//    $('#PlanTrata').val('')
//    $('#Evolucion').val('')

//}


function RecargarDataUpdate(data) {
    SwalErrorMsj(data.mensaje, '/ControlMedicinaDeporte/GetListControlMedicinaDeportiva');
}

