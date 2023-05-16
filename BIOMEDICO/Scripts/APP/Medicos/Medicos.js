    var ObjMedicosDeportiva = {
        MedicosDeport: {}//{objetos} llaves y [array] corchetes

}
//var validadorFormDeportista = [];
var IsUpdate = false;
var idMedicosData = 0;
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idMedicosData = getQueryVariable('IdReg');
    VerDetalles = getQueryVariable('Viewdetail');
    if (idMedicosData > 0) {
        IsUpdate = true;
    }
    if (VerDetalles == "SI") {
        $('#SaveMedicos').html('Atras')
        Get_Data(LlenarCampos, '/Medicos/GetMedicosDeportivaById?IdMedicosDepor=' + idMedicosData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveMedicos').html('Actualizar')
        Get_Data(LlenarCampos, '/Medicos/GetMedicosDeportivaById?IdMedicosDepor=' + idMedicosData);
    }

});

//function CargarInfoinicial() {
//    var Valuecedula = $('#Cedula').val();
//    Get_Data(LlenarcamposInicial, '/Nutricion/BuscarDeportista?cedula=' + Valuecedula)
//}
//function LlenarcamposInicial(data) {
//    $('#PrimerNombre').val(data.PrimerNombre)
//    $('#SegundoNombre').val(data.SegundoNombre)
//    $('#PrimerApellido').val(data.PrimerApellido)
//    $('#SegundoApellido').val(data.SegundoApellido)
//    $('#Edad').val(data.Edad)


//}


function LlenarCampos(data) {
    
    $('#IdMedicos').val(data.objeto.IdMedicos);
    $('#CodMedicos').val(data.objeto.CodMedicos);
    $('#EstadoEspecialistas').val(data.objeto.EstadoEspecialistas);
    $('#PrimerNombre').val(data.objeto.PrimerNombre);
    $('#SegundoNombre').val(data.objeto.SegundoNombre);
    $('#PrimerApellido').val(data.objeto.PrimerApellido);
    $('#SegundoApellido').val(data.objeto.SegundoApellido);
    $('#FechaNacimiento').val(data.objeto.FechaNacimiento);
    $('#Especialidad').val(data.objeto.Especialidad);
    $('#Direcccion').val(data.objeto.Direcccion);
    $('#Telefono').val(data.objeto.Telefono);
    $('#Centro').val(data.objeto.Centro);
    $('#Genero').val(data.objeto.Genero);
    $('#Correo').val(data.objeto.Correo);
  
    //CargarInfoinicial();

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
    document.getElementById("SaveMedicos").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdMedicos = 0;
        if (IsUpdate) {
            IdMedicos = idMedicosData;
        }
        ObjMedicosDeportiva = {
            MedicosDeport: {

                IdMedicos: IdMedicos,
                CodMedicos: $('#CodMedicos').val(),
                EstadoEspecialistas: $('#EstadoEspecialistas').val(),
                PrimerNombre: $('#PrimerNombre').val(),
                SegundoNombre: $('#SegundoNombre').val(),
                PrimerApellido: $('#PrimerApellido').val(),
                SegundoApellido: $('#SegundoApellido').val(),
                FechaNacimiento: $('#FechaNacimiento').val(),
                Especialidad: $('#Especialidad').val(),
                Direcccion: $('#Direcccion').val(),
                Telefono: $('#Telefono').val(),
                Centro: $('#Centro').val(),
                Genero: $('#Genero').val(),
                Correo: $('#Correo').val(),



            }
        }
        let id = 10;

        if (IsUpdate) {
            Save_Data(ActualizarVista, '/Medicos/Actualizar', ObjMedicosDeportiva, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/Medicos/Agregar', ObjMedicosDeportiva, 'Guardado');

            // LimpiarFormulario()
        }

        //} else {
        //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
        //}

    }

}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Medicos/ListaMedicosDeportiva"
    }
}


function LimpiarFormulario() {
        
    $('#CodMedicos').val('')
    $('#EstadoEspecialistas').val('')
    $('#PrimerNombre').val('')
    $('#SegundoNombre').val('')
    $('#PrimerApellido').val(''),
    $('#SegundoApellido').val('')
    $('#FechaNacimiento').val('')
    $('#Especialidad').val('')
    $('#Direcccion').val('')
    $('#Telefono').val('')
    $('#Centro').val('')
    $('#Genero').val('')
    $('#Correo').val('')

}

