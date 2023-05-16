var ObjDeportista = {
    Deport: {},//{objetos} llaves y [array] corchetes
    DataFamiliar: {},
    Ocupation: {}
}
var validadorFormDeportista = [];
var IsUpdate = false;
var idDeportistaData = 0;
var IdOcupacion = 0;
var IdDatosfamiliares = 0;
var VerDetalles = 'NO';
$(document).ready(function () {
    idDeportistaData = getQueryVariable('Id');
    VerDetalles = getQueryVariable('Viewdetail');

    if (idDeportistaData>0 ) {
        IsUpdate = true;
    }
    esconde_elemento('ImagenDeport')
    if (VerDetalles == "SI") {
        $('#SaveDeport').html('Atras')
        Get_Data(LlenarCampos, '/Deportista/GetDeportistaById?Iddepor=' + idDeportistaData);
        visible_elemento('ImagenDeport')
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveDeport').html('Actualizar')
        Get_Data(LlenarCampos, '/Deportista/GetDeportistaById?Iddepor=' + idDeportistaData);
    }
   
   
});

//window.addEventListener("offline", (event) => {
//    const statusDisplay = document.getElementById("status");
//    statusDisplay.textContent = "OFFline";
//});

//window.addEventListener("online", (event) => {
//    const statusDisplay = document.getElementById("status");
//    statusDisplay.textContent = "Online";
//});

function checkOnline() {
    setTimeout("doOnlineCheck()", 20000);
}

function doOnlineCheck() {
    //if the server can be reached it returns 1, other wise it times out
    var submitURL = $("#base_path").val() + "index.php/menu/online";

    $.ajax({
        url: submitURL,
        type: "post",
        dataType: "msg",
        timeout: 5000,
        success: function (msg) {
            if (msg == 1) {
                $("#online").addClass("online");
                $("#online").removeClass("offline");
            } else {
                $("#online").addClass("offline");
                $("#online").removeClass("online");
            }
            checkOnline();
        },
        error: function () {
            $("#online").addClass("offline");
            $("#online").removeClass("online");
            checkOnline();
        }
    });
}

function ValidarCedula() {
    let Cedula = $('#NumIdentificacion').val();
    Get_Data(MostrarAlerta, '/Deportista/BuscarDeportista?Identificacion=' + Cedula)
}
function MostrarAlerta(data) {
    if (data != null || data != undefined) {
        swal({
            title: "Atención",
            text: "El Deportista Ya Se Encuentra Registrado",
            type: "warning",
            /*showCancelButton: true,*/
            /*   confirmButtonClass: "btn-danger",*/
            confirmButtonText: "Ok",
        });
    }

}


function LlenarCampos(data) {
    let rutaimg = SetUrlForQueryLocal( '/images/Deportistas/'+ data.objeto.NumIdentificacion + ".jpg");
    //document.getElementById("ImagenDeport") = rutaimg;
    $("#ImagenDeport").attr("src", rutaimg);
   
    $('#TipoIdentificacion').val(data.objeto.TipoIdentificacion);
    $('#NumIdentificacion').val(data.objeto.NumIdentificacion);
    $('#EstadoDeportista').val(data.objeto.EstadoDeportista);
    $('#PrimerNombre').val(data.objeto.PrimerNombre);
    $('#SegundoNombre').val(data.objeto.SegundoNombre);
    $('#PrimerApellido').val(data.objeto.PrimerApellido);
    $('#SegundoApellido').val(data.objeto.SegundoApellido);
   /* $('#Imagen').val(data.objeto.Imagen);*/
    $('#Edad').val(data.objeto.Edad.trim());
    $('#Genero').val(data.objeto.Genero);
    $('#GrupoSanguineo').val(data.objeto.GrupoSanguineo);
    $('#Eps').val(data.objeto.Eps);
    $('#CorreoDeportista').val(data.objeto.CorreoDeportista);
    $('#Deporte').val(data.objeto.Deporte);
    $('#FechaNacimiento').val(JSONDateconverter(data.objeto.FechaNacimiento));
    $('#PaisNacimiento').val(data.objeto.PaisNacimiento);
    $('#DepartamentoNacimiento').val(data.objeto.DepartamentoNacimiento);
    $('#MunicipioNacimiento').val(data.objeto.MunicipioNacimiento);
    $('#GrupoEtareo').val(data.objeto.GrupoEtareo);
    $('#CondicionPoblacion').val(data.objeto.CondicionPoblacion);
    $('#Telefono').val(data.objeto.Telefono.trim());
    $('#NivelEstudio').val(data.objeto.NivelEstudio);
    $('#PaisResidencia').val(data.objeto.PaisResidencia);
    $('#DepartamentoResidencia').val(data.objeto.DepartamentoResidencia);
    $('#MunicipioResidencia').val(data.objeto.MunicipioResidencia);
    $('#BarrioResidencia').val(data.objeto.BarrioResidencia);
    $('#DireccionResidencia').val(data.objeto.DireccionResidencia);
    $('#TipoEtnia').val(data.objeto.TipoEtnia);
    $('#ZonaInfluencia').val(data.objeto.ZonaInfluencia);
    $('#EntidadPrestadora').val(data.objeto.EntidadPrestadora);
    $('#NombreMonitor').val(data.objeto.NombreMonitor);
    $('#NombreGrupo').val(data.objeto.NombreGrupo);
    //FechaServicio:$('#NumIdentificacion').val(data.objeto.NumIdentificacion); Tomados del server
    $('#EstadoCivil').val(data.objeto.EstadoCivil);
    $('#UsuarioCreacion').val(data.objeto.UsuarioCreacion);
   
    ////DATOS FAMILIARES

    IdDatosfamiliares = data.objeto.DatosFamiliares[0].IdFamiliares;
    $('#NomMadre').val(data.objeto.DatosFamiliares[0].NomMadre);
    $('#ApeMadre').val(data.objeto.DatosFamiliares[0].ApeMadre);
    $('#TipoDocumento').val(data.objeto.DatosFamiliares[0].TipoDocumento);
    $('#NumDocumento').val(data.objeto.DatosFamiliares[0].NumDocumento);
    $('#Direccion').val(data.objeto.DatosFamiliares[0].Direccion);
    $('#Barrio').val(data.objeto.DatosFamiliares[0].Barrio);
    $('#Celular').val(data.objeto.DatosFamiliares[0].Celular);
    $('#Ocupacion').val(data.objeto.DatosFamiliares[0].Ocupacion);
    $('#NomPadre').val(data.objeto.DatosFamiliares[0].NomPadre);
    $('#ApePadre').val(data.objeto.DatosFamiliares[0].ApePadre);
    $('#TipoPadre').val(data.objeto.DatosFamiliares[0].TipoPadre);
    $('#NumPadre').val(data.objeto.DatosFamiliares[0].NumPadre);
    $('#DireccionPadre').val(data.objeto.DatosFamiliares[0].DireccionPadre);
    $('#BarrioPadre').val(data.objeto.DatosFamiliares[0].BarrioPadre);
    $('#CelularPadre').val(data.objeto.DatosFamiliares[0].CelularPadre);
    $('#OcupacionPadre').val(data.objeto.DatosFamiliares[0].OcupacionPadre);
   
    //DATOS OCUPACION
    IdOcupacion = data.objeto.Ocupacion[0].IdOcupacion;
    $('#Ocupacion1').val(data.objeto.Ocupacion[0].Ocupacion1);
    $('#NivelEducativo').val(data.objeto.Ocupacion[0].NivelEducativo);
    $('#NivelEducativo').val(data.objeto.Ocupacion[0].NivelEducativo);
    $('#Institucion').val(data.objeto.Ocupacion[0].Institucion);
    $('#TelefonoInstitucion').val(data.objeto.Ocupacion[0].TelefonoInstitucion);
    $('#DirectorGrado').val(data.objeto.Ocupacion[0].DirectorGrado);
    $('#Peso').val(data.objeto.Ocupacion[0].Peso);
    $('#Estatura').val(data.objeto.Ocupacion[0].Estatura);
    $('#TallaCamisa').val(data.objeto.Ocupacion[0].TallaCamisa);
    $('#TallaPantalon').val(data.objeto.Ocupacion[0].TallaPantalon);
    $('#TallaCalzado').val(data.objeto.Ocupacion[0].TallaCalzado);
    $('#TallaSudadera').val(data.objeto.Ocupacion[0].TallaSudadera);
    $('#NumeroHijos').val(data.objeto.Ocupacion[0].NumeroHijos);

}

function getQueryVariable(variable) {
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
    document.getElementById("SaveDeport").disabled = true;
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
   // if (validadorFormDeportista.form()) {
        var test = $('#NumIde').val();
        var IdDeportista = 0;
        if (IsUpdate) {
            IdDeportista = idDeportistaData;
        }
        const file = document.querySelector('#Imagen').files[0];
        //console.log(await toBase64(file));
        ObjDeportista = {
            Deport: {
                IdDeportista: IdDeportista,
                
                TipoIdentificacion: $('#TipoIdentificacion').val(),
                NumIdentificacion: $('#NumIdentificacion').val(),
                EstadoDeportista: $('#EstadoDeportista').val(),
                PrimerNombre: $('#PrimerNombre').val(),
                SegundoNombre: $('#SegundoNombre').val(),
                PrimerApellido: $('#PrimerApellido').val(),
                SegundoApellido: $('#SegundoApellido').val(),
                Imagen: file == undefined ? "" : await toBase64(file),
                Edad: $('#Edad').val(),
                Genero: $('#Genero').val(),
                GrupoSanguineo: $('#GrupoSanguineo').val(),
                Eps: $('#Eps').val(),
                CorreoDeportista: $('#CorreoDeportista').val(),
                Deporte: $('#Deporte').val(),
                FechaNacimiento: $('#FechaNacimiento').val(),
                PaisNacimiento: $('#PaisNacimiento').val(),
                DepartamentoNacimiento: $('#DepartamentoNacimiento').val(),
                MunicipioNacimiento: $('#MunicipioNacimiento').val(),
                GrupoEtareo: $('#GrupoEtareo').val(),
                CondicionPoblacion: $('#CondicionPoblacion').val(),
                Telefono: $('#Telefono').val(),
                NivelEstudio: $('#NivelEstudio').val(),
                PaisResidencia: $('#PaisResidencia').val(),
                DepartamentoResidencia: $('#DepartamentoResidencia').val(),
                MunicipioResidencia: $('#MunicipioResidencia').val(),
                BarrioResidencia: $('#BarrioResidencia').val(),
                DireccionResidencia: $('#DireccionResidencia').val(),
                TipoEtnia: $('#TipoEtnia').val(),
                ZonaInfluencia: $('#ZonaInfluencia').val(),
                EntidadPrestadora: $('#EntidadPrestadora').val(),
                NombreMonitor: $('#NombreMonitor').val(),
                NombreGrupo: $('#NombreGrupo').val(),
                //FechaServicio:$('#NumIdentificacion').val(), Tomados del server
                EstadoCivil: $('#EstadoCivil').val(),
                UsuarioCreacion: $('#UsuarioCreacion').val(),
                //FechaCreacion:$('#NumIdentificacion').val(),Tomados del server
            },//End obj Deportista
            DataFamiliar: {

                IdFamiliares: IdDatosfamiliares,
                NomMadre: $('#NomMadre').val(),
                ApeMadre: $('#ApeMadre').val(),
                TipoDocumento: $('#TipoDocumento').val(),
                NumDocumento: $('#NumDocumento').val(),
                Direccion: $('#Direccion').val(),
                Barrio: $('#Barrio').val(),
                Celular: $('#Celular').val(),
                Ocupacion: $('#Ocupacion').val(),
                NomPadre: $('#NomPadre').val(),
                ApePadre: $('#ApePadre').val(),
                TipoPadre: $('#TipoPadre').val(),
                NumPadre: $('#NumPadre').val(),
                DireccionPadre: $('#DireccionPadre').val(),
                BarrioPadre: $('#BarrioPadre').val(),
                CelularPadre: $('#CelularPadre').val(),
                OcupacionPadre: $('#OcupacionPadre').val(),
                IdDeportista: $('#IdFamiliares').val(),

            },
            Ocupation: {

                IdOcupacion: IdOcupacion,
                Ocupacion1: $('#Ocupacion1').val(),
                NivelEducativo: $('#NivelEducativo').val(),
                Institucion: $('#Institucion').val(),
                TelefonoInstitucion: $('#TelefonoInstitucion').val(),
                DirectorGrado: $('#DirectorGrado').val(),
                Peso: $('#Peso').val(),
                Estatura: $('#Estatura').val(),
                TallaCamisa: $('#TallaCamisa').val(),
                TallaPantalon: $('#TallaPantalon').val(),
                TallaCalzado: $('#TallaCalzado').val(),
                TallaSudadera: $('#TallaSudadera').val(),
                NumeroHijos: $('#NumeroHijos').val(),
                IdDeportista: $('#IdDeportista').val(),
            }
        }
        let id = 10;


        if (IsUpdate) {
            Save_Data(ActualizarVista, '/Deportista/Actualizar', ObjDeportista, 'Actualizacion');
        }
        else {
            Save_Data(ActualizarVista, '/Deportista/Agregar', ObjDeportista, 'Guardado');

           // LimpiarFormulario()
        }

    } 

    
  
}

function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Deportista/ListaDeportista"
    }
}


function LimpiarFormulario()
{
    
    $('#TipoIdentificacion').val('')
    $('#NumIdentificacion').val('')
    $('#EstadoDeportista').val('')
    $('#PrimerNombre').val('')
    $('#SegundoNombre').val('')
    $('#PrimerApellido').val('')
    $('#SegundoApellido').val('')
    $('#Imagen').val('')
    $('#Edad').val('')
    $('#Genero').val('')
    $('#GrupoSanguineo').val('')
    $('#Eps').val('')
    $('#CorreoDeportista').val('')
    $('#Deporte').val('')
    $('#FechaNacimiento').val('')
    $('#PaisNacimiento').val('')
    $('#DepartamentoNacimiento').val('')
    $('#MunicipioNacimiento').val('')
    $('#GrupoEtareo').val('')
    $('#CondicionPoblacion').val('')
    $('#Telefono').val('')
    $('#NivelEstudio').val('')
    $('#PaisResidencia').val('')
    $('#DepartamentoResidencia').val('')
    $('#MunicipioResidencia').val('')
    $('#BarrioResidencia').val('')
    $('#DireccionResidencia').val('')
    $('#TipoEtnia').val('')
    $('#ZonaInfluencia').val('')
    $('#EntidadPrestadora').val('')
    $('#NombreMonitor').val('')
    $('#NombreGrupo').val('')
    $('#NumIdentificacion').val('')
    $('#EstadoCivil').val('')
    $('#UsuarioCreacion').val('')
    $('#NumIdentificacion').val('')
    $('#NomMadre').val('')
    $('#ApeMadre').val('')
    $('#TipoDocumento').val('')
    $('#NumDocumento').val('')
    $('#Direccion').val('')
    $('#Barrio').val('')
    $('#Celular').val('')
    $('#Ocupacion').val('')
    $('#NomPadre').val('')
    $('#ApePadre').val('')
    $('#TipoPadre').val('')
    $('#NumPadre').val('')
    $('#DireccionPadre').val('')
    $('#BarrioPadre').val('')
    $('#CelularPadre').val('')
    $('#OcupacionPadre').val('')
    $('#Ocupacion1').val('')
    $('#NivelEducativo').val('')
    $('#Institucion').val('')
    $('#TelefonoInstitucion').val('')
    $('#DirectorGrado').val('')
    $('#Peso').val('')
    $('#Estatura').val('')
    $('#TallaCamisa').val('')
    $('#TallaPantalon').val('')
    $('#TallaCalzado').val('')
    $('#TallaSudadera').val('')
    $('#NumeroHijos').val('')
   
}

function RecargarDataUpdate(data) {
    SwalErrorMsj(data.mensaje, '/Deportista/GetListdEportista');
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
