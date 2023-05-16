var ObjNutricionDeportiva = {
    NutricionDeport: {},//{objetos} llaves y [array] corchetes
    AnamnesisNutriDeport: {},
    SeguimientoNutriDeport: {}
}

//var validadorFormDeportista = [];
var IsUpdate = false;
var IdNutricionData = 0;
var IdAnamnesis = 0;
var IdSeguimientoNutricion = 0;
var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    IdNutricionData = getQueryVariable('IdNutriReg');
    let cedulaPaciente = getQueryVariable('Ced');
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (IdNutricionData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }
    esconde_elemento('ImagenNutricionDeport')
    if (VerDetalles == "SI") {
        $('#SaveNutricion').html('Atras')
        Get_Data(LlenarCampos, '/Nutricion/GetNutricionDeportivaById?IdNutriDepor=' + IdNutricionData);
        visible_elemento('ImagenNutricionDeport')
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveNutricion').html('Actualizar')
        Get_Data(LlenarCampos, '/Nutricion/GetNutricionDeportivaById?IdNutriDepor=' + IdNutricionData);
    }
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/Nutricion/BuscarDeportista?cedula=' + Valuecedula)
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
    //console.log(JSONDateconverter(data.objeto.FechaRegistro));
    //var FechaReg = new Date(JSONDateconverter(data.objeto.FechaRegistro));
    //FechaRegParceMes = FechaReg.getMonth() + 1;
    //FechaRegParcedia = FechaReg.getDate();
    //FechaRegParce = FechaRegParceMes + "_" + FechaRegParcedia;
    //console.log(FechaRegParce)
    let rutaimg = SetUrlForQueryLocal('/images/Nutricion/' + data.objeto.NumIdentificacion + ".jpg");
    //document.getElementById("ImagenDeport") = rutaimg;
    $("#ImagenNutricionDeport").attr("src", rutaimg);
    $('#IdNutricion').val(data.objeto.IdNutricion);
    $('#CodNutricion').val(data.objeto.CodNutricion);
    $('#AntecedentesNutri').val(data.objeto.AntecedentesNutri);
    $('#FamiliaresNutri').val(data.objeto.FamiliaresNutri);
    $('#PersonalesNutri').val(data.objeto.PersonalesNutri);
    $('#FarmacologicosNutri').val(data.objeto.FarmacologicosNutri);
    $('#GinecologicoNutri').val(data.objeto.GinecologicoNutri);
    $('#SueñoNutri').val(data.objeto.SueñoNutri);
    $('#PielNutri').val(data.objeto.PielNutri);
    $('#ApetitoNutri').val(data.objeto.ApetitoNutri);
    $('#FracturaNutri').val(data.objeto.FracturaNutri);
    $('#AspectoFisicoNutri').val(data.objeto.AspectoFisicoNutri);
    $('#PieNutri').val(data.objeto.PieNutri);
    $('#TiempoRecuperacionNutri').val(data.objeto.TiempoRecuperacionNutri);
    $('#BioquimicoNutri').val(data.objeto.BioquimicoNutri);
    $('#HidratacionNutri').val(data.objeto.HidratacionNutri);
    $('#HorarioActividadNutri').val(data.objeto.HorarioActividadNutri);
    $('#UsuarioRegistro').val(data.objeto.UsuarioRegistro);
    $('#Cedula').val(data.objeto.NumIdentificacion);

    ////DATOS ANTECEDENTES FISIOTERAPIA

    IdAnamnesis = data.objeto.AnamnesisNutricion[0].IdAnamnesis;
    $('#DesayunoNutri').val(data.objeto.AnamnesisNutricion[0].DesayunoNutri);
    $('#MediaMañanaNutri').val(data.objeto.AnamnesisNutricion[0].MediaMañanaNutri);
    $('#AlmuerzoNutri').val(data.objeto.AnamnesisNutricion[0].AlmuerzoNutri);
    $('#MediaTardeNutri').val(data.objeto.AnamnesisNutricion[0].MediaTardeNutri);
    $('#CenaNutri').val(data.objeto.AnamnesisNutricion[0].CenaNutri);
    $('#AlergicoNutri').val(data.objeto.AnamnesisNutricion[0].AlergicoNutri);
    $('#SuplementacionNutri').val(data.objeto.AnamnesisNutricion[0].SuplementacionNutri);
    $('#AlimentoNoDeseados').val(data.objeto.AnamnesisNutricion[0].AlimentoNoDeseados);
    $('#EdadNutri').val(data.objeto.AnamnesisNutricion[0].EdadNutri);
    $('#PesoNutri').val(data.objeto.AnamnesisNutricion[0].PesoNutri);
    $('#TallaNutri').val(data.objeto.AnamnesisNutricion[0].TallaNutri);
    $('#ImcNutri').val(data.objeto.AnamnesisNutricion[0].ImcNutri);
    $('#EscapularNutri').val(data.objeto.AnamnesisNutricion[0].EscapularNutri);
    $('#TricepsNutri').val(data.objeto.AnamnesisNutricion[0].TricepsNutri);
    $('#BicepsNutri').val(data.objeto.AnamnesisNutricion[0].BicepsNutri);
    $('#AbdomenNutri').val(data.objeto.AnamnesisNutricion[0].AbdomenNutri);
    $('#MusloNutri').val(data.objeto.AnamnesisNutricion[0].MusculosNutri);
    $('#PiernaNutri').val(data.objeto.AnamnesisNutricion[0].PiernaNutri);
    $('#BrazosNutrii').val(data.objeto.AnamnesisNutricion[0].BrazosNutrii);
    $('#AntebrazoNutrii').val(data.objeto.AnamnesisNutricion[0].AntebrazoNutrii);
    $('#MuñecaNutrii').val(data.objeto.AnamnesisNutricion[0].MuñecaNutrii);
    $('#PechoNutrii').val(data.objeto.AnamnesisNutricion[0].PechoNutrii);
    $('#CinturaNutrii').val(data.objeto.AnamnesisNutricion[0].CinturaNutrii);
    $('#CaderaNutrii').val(data.objeto.AnamnesisNutricion[0].CaderaNutrii);
    $('#MusloSuperiorNutrii').val(data.objeto.AnamnesisNutricion[0].MusloSuperiorNutrii);
    $('#MusloMedioNutrii').val(data.objeto.AnamnesisNutricion[0].MusloMedioNutrii);
    $('#PiernaPerimetroNutrii').val(data.objeto.AnamnesisNutricion[0].PiernaPerimetroNutrii);
    $('#TobilloPerimetroNutrii').val(data.objeto.AnamnesisNutricion[0].TobilloPerimetroNutrii);


        //DATOS EVOLUCION FISIOTERAPIA


    IdSeguimientoNutricion = data.objeto.SeguimientoNutricion[0].IdTratamientofisio
    $('#HumeroNutri').val(data.objeto.SeguimientoNutricion[0].HumeroNutri);
    $('#MuñecaHumeroNutri').val(data.objeto.SeguimientoNutricion[0].MuñecaHumeroNutri);
    $('#FermorHumeroNutri').val(data.objeto.SeguimientoNutricion[0].FermorHumeroNutri);
    $('#ImcNutri').val(data.objeto.SeguimientoNutricion[0].ImcNutri);
    $('#GrasaNutri').val(data.objeto.SeguimientoNutricion[0].GrasaNutri);
    $('#MusculosNutri').val(data.objeto.SeguimientoNutricion[0].MusculosNutri);
    $('#HuesosNutri').val(data.objeto.SeguimientoNutricion[0].HuesosNutri);
    $('#ResidualesNutri').val(data.objeto.SeguimientoNutricion[0].ResidualesNutri);
    $('#PesosGrasosNutri').val(data.objeto.SeguimientoNutricion[0].PesosGrasosNutri);
    $('#PesosMusculosNutri').val(data.objeto.SeguimientoNutricion[0].PesosMusculosNutri);
    $('#PesoResiducalesNutri').val(data.objeto.SeguimientoNutricion[0].PesoResiducalesNutri);
    $('#DiagnosticoNutri').val(data.objeto.SeguimientoNutricion[0].DiagnosticoNutri);
    $('#TratamientoNutri').val(data.objeto.SeguimientoNutricion[0].TratamientoNutri);
    $('#ObservacionesNutricion').val(data.objeto.SeguimientoNutricion[0].ObservacionesNutricion);
    
    $('#ProximaCitaNutri').val(JSONDateconverter(data.objeto.SeguimientoNutricion[0].ProximaCitaNutri));
    $('#FirmaDoctorNutri').val(JSONDateconverter(data.objeto.SeguimientoNutricion[0].FirmaDoctorNutri));
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

async function Createobj() {
    document.getElementById("SaveNutricion").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdNutricion = 0;
        if (IsUpdate) {
            IdNutricion = IdNutricionData;

        }

    }
    const file = document.querySelector('#AnexosNutricion').files[0];
    ObjNutricionDeportiva = {
        NutricionDeport: {

            IdNutricion: IdNutricion,
            CodNutricion: $('#CodNutricion').val(),
            AntecedentesNutri: $('#AntecedentesNutri').val(),
            FamiliaresNutri: $('#FamiliaresNutri').val(),
            PersonalesNutri: $('#PersonalesNutri').val(),
            FarmacologicosNutri: $('#FarmacologicosNutri').val(),
            GinecologicoNutri: $('#GinecologicoNutri').val(),
            SueñoNutri: $('#SueñoNutri').val(),
            PielNutri: $('#PielNutri').val(),
            ApetitoNutri: $('#ApetitoNutri').val(),
            FracturaNutri: $('#FracturaNutri').val(),
            AspectoFisicoNutri: $('#AspectoFisicoNutri').val(),
            PieNutri: $('#PieNutri').val(),
            TiempoRecuperacionNutri: $('#TiempoRecuperacionNutri').val(),
            BioquimicoNutri: $('#BioquimicoNutri').val(),
            HidratacionNutri: $('#HidratacionNutri').val(),
            HorarioActividadNutri: $('#HorarioActividadNutri').val(),
            AnexosNutricion: file == undefined ? "" : await toBase64(file),
            UsuarioRegistro: $('#UsuarioRegistro').val(),
            NumIdentificacion: $('#Cedula').val(),
            IdNutricion: IdNutricionData,
            IdCitaMedica: IdCitaMedica,
        },//End obj MedicinaDeportiva
        AnamnesisNutriDeport: {

            IdAnamnesis: IdAnamnesis,
            DesayunoNutri: $('#DesayunoNutri').val(),
            MediaMañanaNutri: $('#MediaMañanaNutri').val(),
            AlmuerzoNutri: $('#AlmuerzoNutri').val(),
            MediaTardeNutri: $('#MediaTardeNutri').val(),
            CenaNutri: $('#CenaNutri').val(),
            AlergicoNutri: $('#AlergicoNutri').val(),
            SuplementacionNutri: $('#SuplementacionNutri').val(),
            AlimentoNoDeseados: $('#AlimentoNoDeseados').val(),
            EdadNutri: $('#EdadNutri').val(),
            PesoNutri: $('#PesoNutri').val(),
            TallaNutri: $('#TallaNutri').val(),
            ImcNutri: $('#ImcNutri').val(),
            EscapularNutri: $('#EscapularNutri').val(),
            TricepsNutri: $('#TricepsNutri').val(),
            BicepsNutri: $('#BicepsNutri').val(),
            AbdomenNutri: $('#AbdomenNutri').val(),
            MusloNutri: $('#MusloNutri').val(),
            PiernaNutri: $('#PiernaNutri').val(),
            BrazosNutrii: $('#BrazosNutrii').val(),
            AntebrazoNutrii: $('#AntebrazoNutrii').val(),
            MuñecaNutrii: $('#MuñecaNutrii').val(),
            PechoNutrii: $('#PechoNutrii').val(),
            CinturaNutrii: $('#CinturaNutrii').val(),
            CaderaNutrii: $('#CaderaNutrii').val(),
            MusloSuperiorNutrii: $('#MusloSuperiorNutrii').val(),
            MusloMedioNutrii: $('#MusloMedioNutrii').val(),
            PiernaPerimetroNutrii: $('#PiernaPerimetroNutrii').val(),
            TobilloPerimetroNutrii: $('#TobilloPerimetroNutrii').val(),
         
            
        },

        SeguimientoNutriDeport: {


            IdSeguimientoNutricion: IdSeguimientoNutricion,
            HumeroNutri: $('#HumeroNutri').val(),
            MuñecaHumeroNutri: $('#MuñecaHumeroNutri').val(),
            FermorHumeroNutri: $('#FermorHumeroNutri').val(),
            ImcNutri: $('#ImcNutri').val(),
            GrasaNutri: $('#GrasaNutri').val(),
            MusculosNutri: $('#MusculosNutri').val(),
            HuesosNutri: $('#HuesosNutri').val(),
            ResidualesNutri: $('#ResidualesNutri').val(),
            PesosGrasosNutri: $('#PesosGrasosNutri').val(),
            PesosMusculosNutri: $('#PesosMusculosNutri').val(),
            PesoResiducalesNutri: $('#PesoResiducalesNutri').val(),
            DiagnosticoNutri: $('#DiagnosticoNutri').val(),
            TratamientoNutri: $('#TratamientoNutri').val(),
            ObservacionesNutricion: $('#ObservacionesNutricion').val(),
            
            ProximaCitaNutri: $('#ProximaCitaNutri').val(),
            FirmaDoctorNutri: $('#FirmaDoctorNutri').val(),
 

        }
    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/Nutricion/Actualizar', ObjNutricionDeportiva, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/Nutricion/Agregar', ObjNutricionDeportiva, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}

}


function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Nutricion/ListaNutricionDeportiva"
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
    SwalErrorMsj(data.mensaje, '/Nutricion/GetListNutricionDeportiva');
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});