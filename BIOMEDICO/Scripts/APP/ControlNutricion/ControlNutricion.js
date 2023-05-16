var ObjControlNutricionDeportiva = {
    ControlNutricionDeport: {},//{objetos} llaves y [array] corchetes
    
}

//var validadorFormDeportista = [];
var IsUpdate = false;
var IdControlNutricionData = 0;

var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    IdControlNutricionData = getQueryVariable('IdControlNutriReg');
    let cedulaPaciente = getQueryVariable('Ced');
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (IdControlNutricionData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }
    //esconde_elemento('ImagenNutricionDeport')
    if (VerDetalles == "SI") {
        $('#SaveControlNutricion').html('Atras')
        Get_Data(LlenarCampos, '/ControlNutricion/GetControlNutricionDeportivaById?IdControlNutriDepor=' + IdControlNutricionData);
    //    visible_elemento('ImagenNutricionDeport')
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveControlNutricion').html('Actualizar')
        Get_Data(LlenarCampos, '/ControlNutricion/GetControlNutricionDeportivaById?IdControlNutriDepor=' + IdControlNutricionData);
    }
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/ControlNutricion/BuscarDeportista?cedula=' + Valuecedula)
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
  
    $('#IdControlNutri').val(data.objeto.IdControlNutri);
    $('#ControlNutrii').val(data.objeto.ControlNutrii);
    $('#FechaNutrii').val(data.objeto.FechaNutrii);
    $('#DesayunoControl').val(data.objeto.DesayunoControl);
    $('#MediaMañanaControl').val(data.objeto.MediaMañanaControl);
    $('#AlmuerzoControl').val(data.objeto.AlmuerzoControl);
    $('#MediaTardeControl').val(data.objeto.MediaTardeControl);
    $('#CenaControl').val(data.objeto.CenaControl);
    $('#PesoActualControl').val(data.objeto.PesoActualControl);
    $('#CambiosControl').val(data.objeto.CambiosControl);
    $('#NuevoDiagnosticoControl').val(data.objeto.NuevoDiagnosticoControl);
    
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
    document.getElementById("SaveControlNutricion").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdControlNutri = 0;
        if (IsUpdate) {
            IdControlNutri = IdControlNutricionData;

        }

    }
    //const file = document.querySelector('#AnexosNutricion').files[0];
    ObjControlNutricionDeportiva = {
        ControlNutricionDeport: {

            IdControlNutri: IdControlNutri,
            ControlNutrii: $('#ControlNutrii').val(),
            FechaNutrii: $('#FechaNutrii').val(),
            DesayunoControl: $('#DesayunoControl').val(),
            MediaMañanaControl: $('#MediaMañanaControl').val(),
            AlmuerzoControl: $('#AlmuerzoControl').val(),
            MediaTardeControl: $('#MediaTardeControl').val(),
            CenaControl: $('#CenaControl').val(),
            PesoActualControl: $('#PesoActualControl').val(),
            CambiosControl: $('#CambiosControl').val(),
            NuevoDiagnosticoControl: $('#NuevoDiagnosticoControl').val(),
            FirmaControlNuriii: $('#FirmaControlNuriii').val(),
            NumIdentificacion: $('#Cedula').val(),
            IdControlNutri: IdControlNutricionData,
            IdMedicina: IdCitaMedica,
        },
        
    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/ControlNutricion/Actualizar', ObjControlNutricionDeportiva, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/ControlNutricion/Agregar', ObjControlNutricionDeportiva, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}

}


function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../ControlNutricion/ListaControlNutricionDeportiva"
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
    SwalErrorMsj(data.mensaje, '/ControlNutricion/GetListControlNutricionDeportiva');
}

//const toBase64 = file => new Promise((resolve, reject) => {
//    const reader = new FileReader();
//    reader.readAsDataURL(file);
//    reader.onload = () => resolve(reader.result);
//    reader.onerror = error => reject(error);
//});