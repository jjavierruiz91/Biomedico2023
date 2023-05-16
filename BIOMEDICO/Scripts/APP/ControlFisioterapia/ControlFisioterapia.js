var ObjControlFisioterapiaDeportiva = {
    ControlFisioterapiaDeport: {},//{objetos} llaves y [array] corchetes

}

//var validadorFormDeportista = [];
var IsUpdate = false;
var IdControlFisioterapiaData = 0;

var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    IdControlFisioterapiaData = getQueryVariable('IdControlPsicoReg');
    IdCitaMedica = getQueryVariable('IdReg');
    let cedulaPaciente = getQueryVariable('Ced');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (IdControlFisioterapiaData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }

    if (VerDetalles == "SI") {
        $('#SaveControPsicologia').html('Atras')
        Get_Data(LlenarCampos, '/ControlFisioterapia/GetControlFisioterapiaDeportivaById?IdControlPsicologiaDepor=' + IdControlFisioterapiaData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveControPsicologia').html('Actualizar')
        Get_Data(LlenarCampos, '/ControlFisioterapia/GetControlFisioterapiaDeportivaById?IdControlPsicologiaDepor=' + IdControlFisioterapiaData);
    }
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/ControlFisioterapia/BuscarDeportista?cedula=' + Valuecedula)
}

function LlenarcamposInicial(data) {
    $('#PrimerNombre').val(data.PrimerNombre)
    $('#SegundoNombre').val(data.SegundoNombre)
    $('#PrimerApellido').val(data.PrimerApellido)
    $('#SegundoApellido').val(data.SegundoApellido)
    $('#Edad').val(data.Edad)
    $('#Deporte').val(data.Deporte)
    $('#Genero').val(data.Genero)
    $('#Telefono').val(data.Telefono)

}


function LlenarCampos(data) {


    $('#IdHistoriaClinicaFisio').val(data.objeto.IdHistoriaClinicaFisio);
    $('#PatologicosClinicaFisio').val(data.objeto.PatologicosClinicaFisio);
    $('#QuirurgicosClinicaFisio').val(data.objeto.QuirurgicosClinicaFisio);
    $('#TraumaticosClinicaFisio').val(data.objeto.TraumaticosClinicaFisio);
    $('#FarmacologicosClinicaFisio').val(data.objeto.FarmacologicosClinicaFisio);
    $('#FamiliaresClinicaFisio').val(data.objeto.FamiliaresClinicaFisio);
    $('#DiagnosticoMedicoClinicaFisio').val(data.objeto.DiagnosticoMedicoClinicaFisio);
    $('#MotivoConsultaClinicaFisio').val(data.objeto.MotivoConsultaClinicaFisio);
    $('#DolorClinicaFisio').val(data.objeto.DolorClinicaFisio);
    $('#EdemaClinicaFisio').val(data.objeto.EdemaClinicaFisio);
    $('#AlteradaClinicaFisio').val(data.objeto.AlteradaClinicaFisio);
    $('#NoalterdaClinicaFisio').val(data.objeto.NoalterdaClinicaFisio);
    $('#ScreemFuncionalClinicaFisio').val(data.objeto.ScreemFuncionalClinicaFisio);
    $('#DesempeñoClinicaFisio').val(data.objeto.DesempeñoClinicaFisio);
    $('#PosturaClinicaFisio').val(data.objeto.PosturaClinicaFisio);
    $('#FechaClinicaFisio').val(data.objeto.FechaClinicaFisio != null ? JSONDateconverter(data.objeto.FechaClinicaFisio) : '');
    //$('#FechaClinicaFisio').val(JSONDateconverter(data.objeto.FechaClinicaFisio));
    ////$('#FechaClinicaFisio') != null?.val(JSONDateconverter(data.objeto.FechaClinicaFisio));
    $('#PlanTratamientoClinicaFisio').val(data.objeto.PlanTratamientoClinicaFisio);
    $('#EvolucionClinicaFisio1').val(data.objeto.EvolucionClinicaFisio1);
    $('#EvolucionClinicaFisio2').val(data.objeto.EvolucionClinicaFisio2);
    $('#EvolucionClinicaFisio3').val(data.objeto.EvolucionClinicaFisio3);
    $('#EvolucionClinicaFisio4').val(data.objeto.EvolucionClinicaFisio4);
    $('#EvolucionClinicaFisio5').val(data.objeto.EvolucionClinicaFisio5);
    $('#EvolucionClinicaFisio6').val(data.objeto.EvolucionClinicaFisio6);
    $('#EvolucionClinicaFisio7').val(data.objeto.EvolucionClinicaFisio7);
    $('#EvolucionClinicaFisio8').val(data.objeto.EvolucionClinicaFisio8);
    $('#EvolucionClinicaFisio9').val(data.objeto.EvolucionClinicaFisio9);
    $('#EvolucionClinicaFisio10').val(data.objeto.EvolucionClinicaFisio10);
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
    document.getElementById("SaveControPsicologia").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdHistoriaClinicaFisio = 0;
        if (IsUpdate) {
            IdHistoriaClinicaFisio = IdControlFisioterapiaData;

        }

    }
    ObjControlFisioterapiaDeportiva = {
        ControlFisioterapiaDeport: {

            IdHistoriaClinicaFisio: IdHistoriaClinicaFisio,
            PatologicosClinicaFisio: $('#PatologicosClinicaFisio').val(),
            QuirurgicosClinicaFisio: $('#QuirurgicosClinicaFisio').val(),
            TraumaticosClinicaFisio: $('#TraumaticosClinicaFisio').val(),
            FarmacologicosClinicaFisio: $('#FarmacologicosClinicaFisio').val(),
            FamiliaresClinicaFisio: $('#FamiliaresClinicaFisio').val(),
            DiagnosticoMedicoClinicaFisio: $('#DiagnosticoMedicoClinicaFisio').val(),
            MotivoConsultaClinicaFisio: $('#MotivoConsultaClinicaFisio').val(),
            DolorClinicaFisio: $('#DolorClinicaFisio').val(),
            EdemaClinicaFisio: $('#EdemaClinicaFisio').val(),
            AlteradaClinicaFisio: $('#AlteradaClinicaFisio').val(),
            NoalterdaClinicaFisio: $('#NoalterdaClinicaFisio').val(),
            ScreemFuncionalClinicaFisio: $('#ScreemFuncionalClinicaFisio').val(),
            DesempeñoClinicaFisio: $('#DesempeñoClinicaFisio').val(),
            PosturaClinicaFisio: $('#PosturaClinicaFisio').val(),
            FechaClinicaFisio: $('#FechaClinicaFisio').val(),
            PlanTratamientoClinicaFisio: $('#PlanTratamientoClinicaFisio').val(),
            EvolucionClinicaFisio1: $('#EvolucionClinicaFisio1').val(),
            EvolucionClinicaFisio2: $('#EvolucionClinicaFisio2').val(),
            EvolucionClinicaFisio3: $('#EvolucionClinicaFisio3').val(),
            EvolucionClinicaFisio4: $('#EvolucionClinicaFisio4').val(),
            EvolucionClinicaFisio5: $('#EvolucionClinicaFisio5').val(),
            EvolucionClinicaFisio6: $('#EvolucionClinicaFisio6').val(),
            EvolucionClinicaFisio7: $('#EvolucionClinicaFisio7').val(),
            EvolucionClinicaFisio8: $('#EvolucionClinicaFisio8').val(),
            EvolucionClinicaFisio9: $('#EvolucionClinicaFisio9').val(),
            EvolucionClinicaFisio10: $('#EvolucionClinicaFisio10').val(),
            FirmaEvolucionClinica: $('#FirmaEvolucionClinica').val(),
            NumIdentificacion: $('#Cedula').val(),
            IdHistoriaClinicaFisio: IdControlFisioterapiaData,
            IdMedicina: IdCitaMedica,
        },

    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/ControlFisioterapia/Actualizar', ObjControlFisioterapiaDeportiva, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/ControlFisioterapia/Agregar', ObjControlFisioterapiaDeportiva, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}

}


function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../ControlFisioterapia/ListaControlFisioterapiaDeportiva"
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
    SwalErrorMsj(data.mensaje, '/ControlFisioterapia/GetListControlFisioterapiaDeportiva');
}

