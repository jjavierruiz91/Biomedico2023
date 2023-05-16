var ObjMedicinaDeportiva = {
    MedicinaDeport: {},//{objetos} llaves y [array] corchetes
    AntecedentesDeport: {},
    ExamenDeport: {}
}
//var validadorFormDeportista = [];
var IsUpdate = false;
var idMedicinaData = 0;
var IdAntecedentes = 0;
var IdExamen = 0;
var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    idMedicinaData = getQueryVariable('IdMedicinaReg'); 
    let cedulaPaciente = getQueryVariable('Ced'); 
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (idMedicinaData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente>0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }
    esconde_elemento('ImagenMedicinaDeport')
    if (VerDetalles=="SI") {
        $('#SaveMedicina').html('Atras')
        Get_Data(LlenarCampos, '/MedicinaDeportiva/GetMedicinaDeportivaById?Idmeddepor=' + idMedicinaData);
        visible_elemento('ImagenMedicinaDeport')
    }
  
    if (IsUpdate && VerDetalles==0) {
        $('#SaveMedicina').html('Actualizar')
        Get_Data(LlenarCampos, '/MedicinaDeportiva/GetMedicinaDeportivaById?Idmeddepor=' + idMedicinaData);
        
    }
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/MedicinaDeportiva/BuscarDeportista?cedula=' + Valuecedula)
}



function LlenarcamposInicial(data) {
    $('#PrimerNombre').val(data.PrimerNombre)
    $('#SegundoNombre').val(data.SegundoNombre)
    $('#PrimerApellido').val(data.PrimerApellido)
    $('#SegundoApellido').val(data.SegundoApellido)
    $('#Genero').val(data.Genero)
    $('#Edad').val(data.Edad)
    $('#Deporte').val(data.Deporte)
  }



function LlenarCampos(data) {
    console.log(JSONDateconverter(data.objeto.FechaRegistro));
    var FechaReg = new Date(JSONDateconverter(data.objeto.FechaRegistro));
    FechaRegParceMes = FechaReg.getMonth()+1;
    FechaRegParcedia = FechaReg.getDate();
    FechaRegParce = FechaRegParceMes + "_" + FechaRegParcedia;
    console.log(FechaRegParce)
    let rutaimg = SetUrlForQueryLocal('/images/MedicinaDeportiva/' + data.objeto.NumIdentificacion + ".jpg");
    //document.getElementById("ImagenDeport") = rutaimg;
    $("#ImagenMedicinaDeport").attr("src", rutaimg);
    $('#IdMedicina').val(data.objeto.IdMedicina);
    $('#CodMedicina').val(data.objeto.CodMedicina);
    $('#FechaConsulta').val(data.objeto.FechaConsulta);
    $('#MotivoConsulta').val(data.objeto.MotivoConsulta);
    $('#EnfermedadActual').val(data.objeto.EnfermedadActual);
    $('#Cedula').val(data.objeto.NumIdentificacion);

    ////DATOS ANTECEDENTES
    //IdAntecedentes = data.objeto.AntecedentesMedicinaDelDeporte[0].IdAntecedentes;
    $('#Patologicos').val(data.objeto.AntecedentesMedicinaDelDeporte[0].Patologicos);
    $('#Quirurgicos').val(data.objeto.AntecedentesMedicinaDelDeporte[0].Quirurgicos);
    $('#Farmacologicos').val(data.objeto.AntecedentesMedicinaDelDeporte[0].Farmacologicos);
    $('#Familiares').val(data.objeto.AntecedentesMedicinaDelDeporte[0].Familiares);
    $('#Traumatologicos').val(data.objeto.AntecedentesMedicinaDelDeporte[0].Traumatologicos);
    $('#LesionesDeportivas').val(data.objeto.AntecedentesMedicinaDelDeporte[0].LesionesDeportivas);
    $('#Alergicos').val(data.objeto.AntecedentesMedicinaDelDeporte[0].Alergicos);
    $('#PruebaCovid19').val(data.objeto.AntecedentesMedicinaDelDeporte[0].PruebaCovid19);


    //DATOS EXAMEN FISICO DEPORTISTAS

    //IdExamen = data.objeto.ExamenFisicoMedicinaDelDeporte[0].IdExamenFisico
    $('#IdExamenFisico').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].IdExamenFisico);
    $('#TensionArterial').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].TensionArterial);
    $('#Peso').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].Peso);
    $('#IndiceMasaCorporal').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].IndiceMasaCorporal);
    $('#Postura').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].Podoscopia);
    
    $('#FrecuenciaCardiaca').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].FrecuenciaCardiaca);
    $('#Talla').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].Talla);
    
    $('#Grasos').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].Grasos);
    $('#Muscular').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].Muscular);
    
    $('#ExamenEspecifico').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].ExamenEspecifico);
    $('#Diagnostico').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].Diagnostico);
    $('#Conducta').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].Conducta);
    $('#FirmaMedico').val(data.objeto.ExamenFisicoMedicinaDelDeporte[0].FirmaMedico);
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
    document.getElementById("SaveMedicina").disabled = true;
   // if (validadorFormMedicinaDeportiva.form()) {
        if (VerDetalles == "SI") {
            Atras();
        }
        else {
        var test = $('#NumIde').val();
        var IdMedicina = 0;
        if (IsUpdate) {
            IdMedicina = idMedicinaData;

            }

        const file = document.querySelector('#AnexosMedicinaDeportiva').files[0];

        ObjMedicinaDeportiva = {
            MedicinaDeport: {
                IdMedicina: IdMedicina,
                CodMedicina: $('#CodMedicina').val(),
                FechaConsulta: $('#FechaConsulta').val(),
                MotivoConsulta: $('#MotivoConsulta').val(),
                EnfermedadActual: $('#EnfermedadActual').val(),
                NumIdentificacion: $('#Cedula').val(),
                IdCitaMedica: IdCitaMedica,

            },//End obj MedicinaDeportiva
            AntecedentesDeport: {
                IdAntecedentes: IdAntecedentes,
                Patologicos: $('#Patologicos').val(),
                Quirurgicos: $('#Quirurgicos').val(),
                Farmacologicos: $('#Farmacologicos').val(),
                Familiares: $('#Familiares').val(),
                Traumatologicos: $('#Traumatologicos').val(),
                LesionesDeportivas: $('#LesionesDeportivas').val(),
                Alergicos: $('#Alergicos').val(),
                PruebaCovid19: $('#PruebaCovid19').val(),
                AnexosMedicinaDeportiva:file == undefined?"": await toBase64(file),
                //AnexosMedicinaDeportiva: $('#AnexosMedicinaDeportiva').val(),
                IdMedicina: $('#IdMedicina').val(),

            },
            ExamenDeport: {

                IdExamenFisico: IdExamen,
                TensionArterial: $('#TensionArterial').val(),
                Peso: $('#Peso').val(),
                IndiceMasaCorporal: $('#IndiceMasaCorporal').val(),
                Postura: $('#Postura').val(),
                FrecuenciaCardiaca: $('#FrecuenciaCardiaca').val(),
                Talla: $('#Talla').val(),
                Tanner: $('#Tanner').val(),
                Grasos: $('#Grasos').val(),
                Muscular: $('#Muscular').val(),
                ExamenEspecifico: $('#ExamenEspecifico').val(),
                Diagnostico: $('#Diagnostico').val(),
                Conducta: $('#Conducta').val(),
                FirmaMedico: $('#FirmaMedico').val(),
                IdMedicina: $('#IdMedicina').val(),
            }
           
        }
        let id = 10;

        

            if (IsUpdate) {
                Save_Data(ActualizarVista, '/MedicinaDeportiva/Actualizar', ObjMedicinaDeportiva,'Actualizacion');
            }
            else {
                Save_Data(ActualizarVista, '/MedicinaDeportiva/Agregar', ObjMedicinaDeportiva,'Guardado');

                // LimpiarFormulario()
            }
        }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}



}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../MedicinaDeportiva/ListaMedicinaDeportiva"
    }
}


function LimpiarFormulario() {
    $('#IdMedicina').val('')
    $('#CodMedicina').val('')
    $('#FechaConsulta').val('')
    $('#MotivoConsulta').val('')
    $('#EnfermedadActual').val('')
    $('#Cedula').val(''),
    $('#IdAntecedentes').val('')
    $('#Patologicos').val('')
    $('#Quirurgicos').val('')
    $('#Farmacologicos').val('')
    $('#Familiares').val('')
    $('#Traumatologicos').val('')
    $('#LesionesDeportivas').val('')
    $('#Alergicos').val('')
    $('#PruebaCovid19').val('')
    $('#AnexosMedicinaDeportiva').val('')
    $('#IdMedicina').val('')
    $('#IdExamenFisico').val('')
    $('#TensionArterial').val('')
    $('#Peso').val('')
    $('#IndiceMasaCorporal').val('')
    $('#Postura').val('')
    
    $('#FrecuenciaCardiaca').val('')
    $('#Talla').val('')
    $('#Tanner').val('')
   
    $('#Grasos').val('')
    $('#Muscular').val('')
    
    $('#ExamenEspecifico').val('')
    $('#Diagnostico').val('')
    $('#Conducta').val('')
    $('#FirmaMedico').val('')
    $('#IdMedicina').val('')

}
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});







