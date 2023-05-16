var ObjControlPsicologiaDeportiva = {
    ControlPsicologiaDeport: {},//{objetos} llaves y [array] corchetes

}


//var validadorFormDeportista = [];
var IsUpdate = false;
var IdControlPsicologiaData = 0;

var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    IdControlPsicologiaData = getQueryVariable('IdControlPsicologiaReg');
    let cedulaPaciente = getQueryVariable('Ced');
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (IdControlPsicologiaData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }

    if (VerDetalles == "SI") {
        $('#SaveControlPsicologia').html('Atras')
        Get_Data(LlenarCampos, '/ControlPsicologiaDeportiva/GetControlPsicologiaDeportivaById?IdControlPsicologiaDepor=' + IdControlPsicologiaData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveControlPsicologia').html('Actualizar')
        Get_Data(LlenarCampos, '/ControlPsicologiaDeportiva/GetControlPsicologiaDeportivaById?IdControlPsicologiaDepor=' + IdControlPsicologiaData);
    }
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/ControlPsicologiaDeportiva/BuscarDeportista?cedula=' + Valuecedula)
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

    $('#IdSeguimiento').val(data.objeto.IdSeguimiento);
    $('#Fecha').val(JSONDateconverter(data.objeto.Fecha));
    $('#EvolucionPsicologia').val(data.objeto.EvolucionPsicologia);
    $('#TestsPsicologico').val(data.objeto.TestsPsicologico);
    $('#FirmaDocPsicologia').val(data.objeto.FirmaDocPsicologia);
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

function Createobj() {
    document.getElementById("SaveControlPsicologia").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdSeguimiento = 0;
        if (IsUpdate) {
            IdSeguimiento = IdControlPsicologiaData;

        }

    }
    ObjControlPsicologiaDeportiva = {
        ControlPsicologiaDeport: {

            IdSeguimiento: IdSeguimiento,
            Fecha: $('#Fecha').val(),
            EvolucionPsicologia: $('#EvolucionPsicologia').val(),
            TestsPsicologico: $('#TestsPsicologico').val(),
            FirmaDocPsicologia: $('#FirmaDocPsicologia').val(),
            NumIdentificacion: $('#Cedula').val(),
            IdSeguimiento: IdControlPsicologiaData,
            IdMedicina: IdCitaMedica,
        },

    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/ControlPsicologiaDeportiva/Actualizar', ObjControlPsicologiaDeportiva, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/ControlPsicologiaDeportiva/Agregar', ObjControlPsicologiaDeportiva, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}

}


function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../ControlPsicologiaDeportiva/ListaControlPsicologiaDeportiva"
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
    SwalErrorMsj(data.mensaje, '/ControlPsicologiaDeportiva/GetListControlPsicologiaDeportiva');
}

