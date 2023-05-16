var ObjCitasMedicasDeportiva = {
    CitasMedicasDeport: {}//{objetos} llaves y [array] corchetes

}
//var validadorFormDeportista = [];
var IsUpdate = false;
var idCitasMedicasData = 0;
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idCitasMedicasData = getQueryVariable('IdCitasMedReg');
    let cedulaPaciente = getQueryVariable('Ced');
    VerDetalles = getQueryVariable('Viewdetail');
    IdCitaMedica = getQueryVariable('IdReg');
    Get_DataGet(CargarSelectEspecialistas, '/Medicos/GetListMedicosDeportiva');
    if (idCitasMedicasData > 0) {
        IsUpdate = true;
    }
    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }
    if (VerDetalles == "SI") {
        $('#SaveCitasMedicas').html('Atras')
        Get_Data(LlenarCampos, '/CitasMedicas/GetCitasMedicasDeportivaById?IdCitasDepor=' + idCitasMedicasData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveCitasMedicas').html('Actualizar')
        Get_Data(LlenarCampos, '/CitasMedicas/GetCitasMedicasDeportivaById?IdCitasDepor=' + idCitasMedicasData);
    }

});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/CitasMedicas/BuscarDeportista?cedula=' + Valuecedula)
}
function LlenarcamposInicial(data) {
    $('#PrimerNombre').val(data.PrimerNombre)
    $('#SegundoNombre').val(data.SegundoNombre)
    $('#PrimerApellido').val(data.PrimerApellido)
    $('#SegundoApellido').val(data.SegundoApellido)
    $('#Edad').val(data.Edad)
   
}
function LlenarCampos(data) {
    $('#IdCitaMedica').val(data.objeto.IdCitaMedica);
    $('#Especialista').val(data.objeto.Especialista);
    $('#Fecha').val(JSONDateconverter(data.objeto.Fecha));
    $('#Hora').val(data.objeto.Hora);
    $('#Minutos').val(data.objeto.Minutos);
    $('#Segundos').val(data.objeto.Segundos);
    $('#Cedula').val(data.objeto.NumIdentificacion);

    CargarInfoinicial();
}
var DatosHorario = [];
function CargarSelectEspecialistas(data) {
    Especialista = data;
    console.log(Especialista);
    var HtmlEmp = "";
    HtmlEmp = "<option value=''>Seleccionar</option>"
    $.each(data.objeto.DatosMed, function (index, item) {
        HtmlEmp += "<option value='" + item.CodMedicos + "'>" + item.Especialidad + " - "+item.PrimerApellido+ "</option>"
    })
    $('#Especialista').html(HtmlEmp);
    $('#Especialista').select2();
    DatosHorario=Especialista.objeto.ListaHorario;
}

function CargarSelectFecha() {
    let ArrayFecha = [];
    let Especialista = $('#Especialista').val();
    let agenda = DatosHorario.filter(w => w.cedula == Especialista);
    var HtmlEmp = "";
    HtmlEmp = "<option value=''>Seleccionar</option>"
    $.each(agenda, function (index, item) {
        let ExistefEcha = ArrayFecha.find(w => w == item.Fecha);

        if (ExistefEcha == undefined) {
            HtmlEmp += "<option value='" + item.Fecha + "'>" + JSONDateconverter(item.Fecha) + "</option>"
            ArrayFecha.push(item.Fecha);
        }
       
    })
    $('#Fecha').html(HtmlEmp);
    $('#Fecha').select2();
}

function CargarSelectHora() {
    let Arrayhra = [];
    let FechasElect = $('#Fecha').val();
    let Especialista = $('#Especialista').val();
    let Horarios = DatosHorario.filter(w => w.Fecha == FechasElect && w.cedula == Especialista);
    var HtmlEmp = "";
    HtmlEmp = "<option value=''>Seleccionar</option>";
    $.each(Horarios, function (index, item) {
        let ExisteHOra = Arrayhra.find(w => w == item.Hora);

        if (ExisteHOra == undefined) {
            HtmlEmp += "<option value='" + item.Hora + "'>" + item.Hora + "</option>"
            Arrayhra.push(item.Hora);
        }
           

    })
    $('#Hora').html(HtmlEmp);
    $('#Hora').select2();
}

function CargarSelectMInutos() {
    let ArrayFecha = [];
    let FechasElect = $('#Fecha').val();
    let Especialista = $('#Especialista').val();
    let hora = $('#Hora').val();
    let Horarios = DatosHorario.filter(w => w.Fecha == FechasElect && w.cedula == Especialista && w.Hora ==parseInt(hora));
    
    var HtmlMin = "";
    HtmlMin = "<option value=''>Seleccionar</option>"
    $.each(Horarios, function (index, item) {

        HtmlMin += "<option value='" + item.Minutos + "'>" + item.Minutos + "</option>"


    })
    $('#Minutos').html(HtmlMin);
    $('#Minutos').select2();
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
    document.getElementById("SaveCitasMedicas").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdCitaMedica = 0;
        if (IsUpdate) {
            IdCitaMedica = idCitasMedicasData;
        }
            ObjCitasMedicasDeportiva = {
                CitasMedicasDeport: {

       
             IdCitaMedica: IdCitaMedica,
            Especialista: $('#Especialista').val(),
            Fecha: JSONDateconverter($('#Fecha').val()),
            Hora: $('#Hora').val(),
            Minutos: $('#Minutos').val(),
            Segundos: $('#Segundos').val(),
            NumIdentificacion: $('#Cedula').val(),



            }
        }
        let id = 10;

        if (IsUpdate) {
            Save_Data(ActualizarVista, '/CitasMedicas/Actualizar', ObjCitasMedicasDeportiva, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/CitasMedicas/Agregar', ObjCitasMedicasDeportiva, 'Guardado');

            // LimpiarFormulario()
        }

        //} else {
        //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
        //}

    }

}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../CitasMedicas/ListaCitasMedicasDeportiva"
    }
}


function LimpiarFormulario() {

    $('#IdCitaMedica').val('')
    $('#Especialista').val('')
    $('#Fecha').val('')
    $('#Hora').val('')
    $('#Minutos').val(''),
    $('#Segundos').val('')
    

}

