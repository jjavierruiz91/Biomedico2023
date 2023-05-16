var ObjRemisionMedicasDeportiva = {
    RemisionMedicas: {}//{objetos} llaves y [array] corchetes

}

    
//var validadorFormDeportista = [];
var IsUpdate = false;
var idRemisionData = 0;
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idRemisionData = getQueryVariable('IdReg');
    let cedulaPaciente = getQueryVariable('Ced');
    VerDetalles = getQueryVariable('Viewdetail');
    if (idRemisionData > 0) {
        IsUpdate = true;
    }
    if (VerDetalles == "SI") {
        $('#SaveRemisiones').html('Atras')
        Get_Data(LlenarCampos, '/Remision/GetRemisionMedicasDeportivaById?IdRemisionDepor=' + idRemisionData);
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveRemisiones').html('Actualizar')
        Get_Data(LlenarCampos, '/Remision/GetRemisionMedicasDeportivaById?IdRemisionDepor=' + idRemisionData);
    }

});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/Remision/BuscarDeportista?cedula=' + Valuecedula)
}
//function LlenarcamposInicial(data) {
//    $('#PrimerNombre').val(data.PrimerNombre)
//    $('#SegundoNombre').val(data.SegundoNombre)
//    $('#PrimerApellido').val(data.PrimerApellido)
//    $('#SegundoApellido').val(data.SegundoApellido)
//    $('#Edad').val(data.Edad)


//}


function LlenarCampos(data) {
    
    $('#NumeroIdentificacion').val(data.objeto.NumeroIdentificacion);
    $('#IdRemisiones').val(data.objeto.IdRemisiones);
    $('#FechaRemision').val(JSONDateconverter(data.objeto.FechaRemision));
    $('#DisciplinaRemision').val(data.objeto.DisciplinaRemision);
    $('#MunicipioRemision').val(data.objeto.MunicipioRemision);
    $('#CategoriaRemision').val(data.objeto.CategoriaRemision);
    $('#AreaServicioRemision').val(data.objeto.AreaServicioRemision);
    $('#NombreDeportistaRemision').val(data.objeto.NombreDeportistaRemision);
    $('#CelularRemision').val(data.objeto.CelularRemision);
    $('#CorreoRemision').val(data.objeto.CorreoRemision);
    $('#TipoLesionRemision').val(data.objeto.TipoLesionRemision);
    $('#FechaLesionRemision').val(JSONDateconverter(data.objeto.FechaLesionRemision));
    $('#FirmaEntrenadoRemision').val(data.objeto.FirmaEntrenadoRemision);
    $('#EstadoRevision').val(data.objeto.EstadoRevision);
    
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
    document.getElementById("SaveRemisiones").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdRemisiones = 0;
        if (IsUpdate) {
            IdRemisiones = idRemisionData;
        }
          ObjRemisionMedicasDeportiva = {
                RemisionMedicas: {
                
             IdRemisiones: IdRemisiones,               
            NumeroIdentificacion: $('#NumeroIdentificacion').val(),
            FechaRemision: $('#FechaRemision').val(),
            DisciplinaRemision: $('#DisciplinaRemision').val(),
            MunicipioRemision: $('#MunicipioRemision').val(),
            CategoriaRemision: $('#CategoriaRemision').val(),
            AreaServicioRemision: $('#AreaServicioRemision').val(),
            NombreDeportistaRemision: $('#NombreDeportistaRemision').val(),
            CelularRemision: $('#CelularRemision').val(),
            CorreoRemision: $('#CorreoRemision').val(),
            TipoLesionRemision: $('#TipoLesionRemision').val(),
            FechaLesionRemision: $('#FechaLesionRemision').val(),
            FirmaEntrenadoRemision: $('#FirmaEntrenadoRemision').val(),
                  EstadoRevision: $('#EstadoRevision').val(),
            NumIdentificacion: $('#Cedula').val(),



            }
        }
        let id = 10;

        if (IsUpdate) {
            Save_Data(ActualizarVista, '/Remision/Actualizar', ObjRemisionMedicasDeportiva, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/Remision/Agregar', ObjRemisionMedicasDeportiva, 'Guardado');

            // LimpiarFormulario()
        }

        //} else {
        //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
        //}

    }

}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Remision/ListaRemisionMedicasDeportiva"
    }
}


function LimpiarFormulario() {
    
    $('#IdRemisiones').val('')
    $('#NumeroIdentificacion').val('')
    $('#FechaRemision').val('')
    $('#DisciplinaRemision').val('')
    $('#MunicipioRemision').val('')
    $('#CategoriaRemision').val(''),
    $('#AreaServicioRemision').val('')
    $('#NombreDeportistaRemision').val('')
    $('#CelularRemision').val('')
    $('#CorreoRemision').val('')
    $('#TipoLesionRemision').val('')
    $('#FechaLesionRemision').val('')
    $('#FirmaEntrenadoRemision').val('')

}

