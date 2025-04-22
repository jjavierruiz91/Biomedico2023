var ObjInscripcionDeportistas = {
    InscripcionDeportistasDeport: {}//{objetos} llaves y [array] corchetes
    
}
var validadorFormDeportista = [];
var IsUpdate = false;
var IdIncripcionBeneficiariosData = 0;
//var IdOcupacion = 0;
//var IdDatosfamiliares = 0;
var VerDetalles = 'NO';
$(document).ready(function () {
    IdIncripcionBeneficiariosData = getQueryVariable('Id');
    VerDetalles = getQueryVariable('Viewdetail');

    if (IdIncripcionBeneficiariosData>0 ) {
        IsUpdate = true;
    }
    //esconde_elemento('ImagenDeport')
    //if (VerDetalles == "SI") {
    //    $('#SaveInscripcioDeportista').html('Atras')
    //    Get_Data(LlenarCampos, '/InscripcionDeportistas/GetDeportistaById?Iddepor=' + IdIncripcionBeneficiariosData);
    //    visible_elemento('ImagenDeport')
    //}

    //if (IsUpdate && VerDetalles == 0) {
    //    $('#SaveInscripcioDeportista').html('Actualizar')
    //    Get_Data(LlenarCampos, '/InscripcionDeportistas/GetDeportistaById?Iddepor=' + IdIncripcionBeneficiariosData);
    //}
   
   
});

function ValidarCedula() {
    let Cedula = $('#NumIdentificacionInscripciones').val();
    Get_Data(MostrarAlerta, '/InscripcionDeportistas/BuscarCedulaDeportista?Identificacion=' + Cedula)
}

function MostrarAlerta(data) {

    if (data != null || data != undefined) {
        swal({
            title: "El deportista ya se encuentra registrado.!",
            text: "No se pueden registrar dos veces el mismo deportista",
            type: "warning",
            /*showCancelButton: true,*/
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Gracias por su visita",
            /* cancelButtonText: "No, jamás",*/
            closeOnConfirm: false,
            closeOnCancel: false

        },

            function (isConfirm) {
                if (isConfirm) {
                    swal("¡Gobernacion del cesar!",
                        "Gracias por utilizar nuestros servicios",
                        "success");
                    timer: 90000000

                } else {
                    swal("¡Gobernacion del cesar!",
                        "Gracias por utilizar nuestros servicios",
                        "error");

                }
                window.location.reload();
            });

        //                
    }

}
function handleSelectionChange() {
    var selectElement = document.getElementById("TipoIdentificacionInscripciones");
    var selectedValue = selectElement.options[selectElement.selectedIndex].value;

    // Simulamos la condición para mostrar la alerta. Ajusta la condición según tu lógica.
    if (selectedValue) {
        MostrarAlerta2(selectedValue);
    }
}

function MostrarAlerta2(data) {
    if (data != null && data != undefined) {
        swal({
            position: "top-end",
            icon: "success",
            title: "Nota: Por favor, complete el siguiente formulario con los datos necesarios para la inscripción de los deportistas. Asegúrese de proporcionar información precisa y actualizada.",
            showConfirmButton: false,
            timer: 3500
        });
        //    window.location.reload();

    }
}

// No es necesario llamar a initValidador si no está definido
window.onload = function () {
    // Aquí puedes inicializar otras funciones si es necesario
};
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

//function ValidarCedula() {
//    let Cedula = $('#NumIdentificacion').val();
//    Get_Data(LlenarcamposInicial, '/Deportista/BuscarDeportista?NumIdentificacion=' + Cedula)
//}
//function MostrarAlerta(data) {
//    if (data != null || data != undefined) {
//        swal({
//            title: "Atención",
//            text: "El Deportista Ya Se Encuentra Registrado",
//            type: "warning",
//            /*showCancelButton: true,*/
//            /*   confirmButtonClass: "btn-danger",*/
//            confirmButtonText: "Ok",
//        });
//    }

//}

//function LlenarcamposInicial(data) {
//    $('#PrimerNombre').val(data.PrimerNombre)
//    $('#SegundoNombre').val(data.SegundoNombre)
//    $('#PrimerApellido').val(data.PrimerApellido)
//    $('#SegundoApellido').val(data.SegundoApellido)
//    $('#Genero').val(data.Genero)
//    $('#Edad').val(data.Edad)
//    $('#Deporte').val(data.Deporte)
//}


//function LlenarCampos(data) {
//    let rutaimg = SetUrlForQueryLocal( '/images/Deportistas/'+ data.objeto.NumIdentificacion + ".jpg");
//    //document.getElementById("ImagenDeport") = rutaimg;
//    $("#ImagenDeport").attr("src", rutaimg);
   
//    $('#TipoIdentificacion').val(data.objeto.TipoIdentificacion);
//    $('#NumIdentificacion').val(data.objeto.NumIdentificacion);
//    $('#EstadoDeportista').val(data.objeto.EstadoDeportista);
//    $('#PrimerNombre').val(data.objeto.PrimerNombre);
//    $('#SegundoNombre').val(data.objeto.SegundoNombre);
//    $('#PrimerApellido').val(data.objeto.PrimerApellido);
//    $('#SegundoApellido').val(data.objeto.SegundoApellido);
//   /* $('#Imagen').val(data.objeto.Imagen);*/
//    $('#Edad').val(data.objeto.Edad.trim());
//    $('#Genero').val(data.objeto.Genero);
//    $('#GrupoSanguineo').val(data.objeto.GrupoSanguineo);
//    $('#Eps').val(data.objeto.Eps);
//    $('#CorreoDeportista').val(data.objeto.CorreoDeportista);
//    $('#Deporte').val(data.objeto.Deporte);
//    $('#FechaNacimiento').val(JSONDateconverter(data.objeto.FechaNacimiento));
//    $('#PaisNacimiento').val(data.objeto.PaisNacimiento);
//    $('#DepartamentoNacimiento').val(data.objeto.DepartamentoNacimiento);
//    $('#MunicipioNacimiento').val(data.objeto.MunicipioNacimiento);
//    $('#GrupoEtareo').val(data.objeto.GrupoEtareo);
//    $('#CondicionPoblacion').val(data.objeto.CondicionPoblacion);
//    $('#Telefono').val(data.objeto.Telefono.trim());
//    $('#NivelEstudio').val(data.objeto.NivelEstudio);
//    $('#PaisResidencia').val(data.objeto.PaisResidencia);
//    $('#DepartamentoResidencia').val(data.objeto.DepartamentoResidencia);
//    $('#MunicipioResidencia').val(data.objeto.MunicipioResidencia);
//    $('#BarrioResidencia').val(data.objeto.BarrioResidencia);
//    $('#DireccionResidencia').val(data.objeto.DireccionResidencia);
//    $('#TipoEtnia').val(data.objeto.TipoEtnia);
//    $('#ZonaInfluencia').val(data.objeto.ZonaInfluencia);
//    $('#EntidadPrestadora').val(data.objeto.EntidadPrestadora);
//    $('#NombreMonitor').val(data.objeto.NombreMonitor);
//    $('#NombreGrupo').val(data.objeto.NombreGrupo);
//    //FechaServicio:$('#NumIdentificacion').val(data.objeto.NumIdentificacion); Tomados del server
//    $('#EstadoCivil').val(data.objeto.EstadoCivil);
//    $('#UsuarioCreacion').val(data.objeto.UsuarioCreacion);
  

//}

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
//async function Createobj() {
//    //document.getElementById("SaveInscripcioDeportista").disabled = true;
//    if (VerDetalles == "SI") {
//        Atras();
//    }
//    else {
//   // if (validadorFormDeportista.form()) {
//        var test = $('#NumIde').val();
//        var IdIncripcionBeneficiarios = 0;

//        if (IsUpdate) {
//            IdIncripcionBeneficiarios = IdIncripcionBeneficiariosData;
//        }
//        const fileFormDocumento = document.querySelector('#DocumentoPdf') ? (document.querySelector('#DocumentoPdf').files ? document.querySelector('#DocumentoPdf').files[0] : null) : null;
//        const fileFormSalud = document.querySelector('#SaludPdf') ? (document.querySelector('#SaludPdf').files ? document.querySelector('#SaludPdf').files[0] : null) : null;
//        const fileFormAutorizacion = document.querySelector('#AutorizacionPdf') ? (document.querySelector('#AutorizacionPdf').files ? document.querySelector('#AutorizacionPdf').files[0] : null) : null;
//        const fileFormCedulaPadre = document.querySelector('#CedulaPadrePdf') ? (document.querySelector('#CedulaPadrePdf').files ? document.querySelector('#CedulaPadrePdf').files[0] : null) : null;

//        //const fileFormDocumento = document.querySelector('#DocumentoPdfField').files[0];
//        //const fileFormSalud = document.querySelector('#SaludPdfField').files[0];
//        //const fileFormAutorizacion = document.querySelector('#AutorizacionPdfField').files[0];
//        //const fileFormCedulaPadre = document.querySelector('#CedulaPadrePdfField').files[0];

//        try {
//            var fileStringBase64Documento = await getBase64(fileFormDocumento);
//            var fileStringBase64Salud = await getBase64(fileFormSalud);
//            var fileStringBase64Autorizacion = await getBase64(fileFormAutorizacion);
//            var fileStringBase64CedulaPadre = await getBase64(fileFormCedulaPadre);

//            // Continuar con el procesamiento de los archivos
//        } catch (error) {
//            // No es necesario hacer nada aquí si el error esperado es "Falta el archivo"
//            // Puedes agregar otro manejo de errores si es necesario.
//        }

//        ObjInscripcionDeportistas = {
//            InscripcionDeportistasDeport: {
//                IdIncripcionBeneficiarios: IdIncripcionBeneficiarios,

//                ProgramaInscripciones: $('#ProgramaInscripciones').val(),
//                TipoIdentificacionInscripciones: $('#TipoIdentificacionInscripciones').val(),
//                DocumentoPdf: fileStringBase64Documento,
//                SaludPdf: fileStringBase64Salud,
//                AutorizacionPdf: fileStringBase64Autorizacion,
//                CedulaPadrePdf: fileStringBase64CedulaPadre,
//                NumIdentificacionInscripciones: $('#NumIdentificacionInscripciones').val(),
//                PrimerNombreInscripciones: $('#PrimerNombreInscripciones').val(),
//                SegundonombreInscripciones: $('#SegundonombreInscripciones').val(),
//                PrimerApellidoInscripciones: $('#PrimerApellidoInscripciones').val(),
//                SegundoApellidoInscripciones: $('#SegundoApellidoInscripciones').val(),
//                FechaNacimientoInscripciones: $('#FechaNacimientoInscripciones').val(),
//                EdadInscripciones: $('#EdadInscripciones').val(),
//                PaisNacimientoInscripciones: $('#PaisNacimientoInscripciones').val(),
//                DepartamentoInscripciones: $('#DepartamentoInscripciones').val(),
//                MunicipioInscripciones: $('#MunicipioInscripciones').val(),
//                GeneroInscripciones: $('#GeneroInscripciones').val(),
//                GrupoEtarreoInscripciones: $('#GrupoEtarreoInscripciones').val(),
//                DireccionResidencia: $('#DireccionResidencia').val(),
//                BarrioResidencia: $('#BarrioResidencia').val(),
//                MunicipioResidencia: $('#MunicipioResidencia').val(),
//                EstratoResidencia: $('#EstratoResidencia').val(),
//                ZonaResidencia: $('#ZonaResidencia').val(),
//                TelefonoResidencia: $('#TelefonoResidencia').val(),
//                CorreoResidencia: $('#CorreoResidencia').val(),
//                EstadoCivil: $('#EstadoCivil').val(),
//                NivelEstudio: $('#NivelEstudio').val(),
//                RegimenSalud: $('#RegimenSalud').val(),
//                Eps: $('#Eps').val(),
//                Tiposangre: $('#Tiposangre').val(),
//                CondicionPoblacion: $('#CondicionPoblacion').val(),
//                DiscapacidadPoblacion: $('#DiscapacidadPoblacion').val(),
//                GrupoEtnico: $('#GrupoEtnico').val(),
//                DeportePractica: $('#DeportePractica').val(),
//                NombreEntrenador: $('#NombreEntrenador').val(),
//                NombreContacto: $('#NombreContacto').val(),
//                TelefonoContacto: $('#TelefonoContacto').val(),
//                CorreoContacto: $('#CorreoContacto').val(),
//            }


//        }
//        let id = 10;


//        if (IsUpdate) {
//           /* Save_Data(ActualizarVista, '/Deportista/Actualizar', ObjDeportista, 'Actualizacion');*/
//        }
//        else {
//            Save_Data(ActualizarVista, '/InscripcionDeportistas/Agregar', ObjInscripcionDeportistas, 'Guardado');

//           // LimpiarFormulario()
//        }

//    }



//}
async function Createobj() {
    var boton = document.getElementById("SaveInscripcioDeportista");
    boton.disabled = true;

    setTimeout(function () {
        boton.disabled = false;
    }, 3000);

    if (VerDetalles == "SI") {
        Atras();
    } else {
        var test = $('#NumIde').val();
        var IdIncripcionBeneficiarios = 0;

        if (IsUpdate) {
            IdIncripcionBeneficiarios = IdIncripcionBeneficiariosData;
        }
        const fileFormDocumento = document.querySelector('#DocumentoPdf') ? (document.querySelector('#DocumentoPdf').files ? document.querySelector('#DocumentoPdf').files[0] : null) : null;
        const fileFormSalud = document.querySelector('#SaludPdf') ? (document.querySelector('#SaludPdf').files ? document.querySelector('#SaludPdf').files[0] : null) : null;
        const fileFormAutorizacion = document.querySelector('#AutorizacionPdf') ? (document.querySelector('#AutorizacionPdf').files ? document.querySelector('#AutorizacionPdf').files[0] : null) : null;
        const fileFormCedulaPadre = document.querySelector('#CedulaPadrePdf') ? (document.querySelector('#CedulaPadrePdf').files ? document.querySelector('#CedulaPadrePdf').files[0] : null) : null;

        try {
            var fileStringBase64Documento = await getBase64(fileFormDocumento);
            var fileStringBase64Salud = await getBase64(fileFormSalud);
            var fileStringBase64Autorizacion = await getBase64(fileFormAutorizacion);
            var fileStringBase64CedulaPadre = await getBase64(fileFormCedulaPadre);
        } catch (error) {
            console.error("Error al convertir archivos a Base64:", error);
        }

        var ObjInscripcionDeportistas = {
            InscripcionDeportistasDeport: {
                IdIncripcionBeneficiarios: IdIncripcionBeneficiarios,
                ProgramaInscripciones: $('#ProgramaInscripciones').val(),
                TipoIdentificacionInscripciones: $('#TipoIdentificacionInscripciones').val(),
                //DocumentoPdf: fileStringBase64Documento,
                //SaludPdf: fileStringBase64Salud,
                //AutorizacionPdf: fileStringBase64Autorizacion,
                //CedulaPadrePdf: fileStringBase64CedulaPadre,
                NumIdentificacionInscripciones: $('#NumIdentificacionInscripciones').val(),
                PrimerNombreInscripciones: $('#PrimerNombreInscripciones').val(),
                SegundonombreInscripciones: $('#SegundonombreInscripciones').val(),
                PrimerApellidoInscripciones: $('#PrimerApellidoInscripciones').val(),
                SegundoApellidoInscripciones: $('#SegundoApellidoInscripciones').val(),
                FechaNacimientoInscripciones: $('#FechaNacimientoInscripciones').val(),
                EdadInscripciones: $('#EdadInscripciones').val(),
                PaisNacimientoInscripciones: $('#PaisNacimientoInscripciones').val(),
                DepartamentoInscripciones: $('#DepartamentoInscripciones').val(),
                MunicipioInscripciones: $('#MunicipioInscripciones').val(),
                GeneroInscripciones: $('#GeneroInscripciones').val(),
                GrupoEtarreoInscripciones: $('#GrupoEtarreoInscripciones').val(),
                DireccionResidencia: $('#DireccionResidencia').val(),
                BarrioResidencia: $('#BarrioResidencia').val(),
                MunicipioResidencia: $('#MunicipioResidencia').val(),
                EstratoResidencia: $('#EstratoResidencia').val(),
                ZonaResidencia: $('#ZonaResidencia').val(),
                TelefonoResidencia: $('#TelefonoResidencia').val(),
                CorreoResidencia: $('#CorreoResidencia').val(),
                EstadoCivil: $('#EstadoCivil').val(),
                NivelEstudio: $('#NivelEstudio').val(),
                RegimenSalud: $('#RegimenSalud').val(),
                Eps: $('#Eps').val(),
                Tiposangre: $('#Tiposangre').val(),
                CondicionPoblacion: $('#CondicionPoblacion').val(),
                DiscapacidadPoblacion: $('#DiscapacidadPoblacion').val(),
                GrupoEtnico: $('#GrupoEtnico').val(),
                DeportePractica: $('#DeportePractica').val(),
                NombreEntrenador: $('#NombreEntrenador').val(),
                NombreContacto: $('#NombreContacto').val(),
                TelefonoContacto: $('#TelefonoContacto').val(),
                CorreoContacto: $('#CorreoContacto').val(),
            }
        };

        console.log("Objeto a enviar:", ObjInscripcionDeportistas);
        let formDataModel = new FormData()
        formDataModel.append('persona', JSON.stringify(ObjInscripcionDeportistas))

        let cedulaBeneficiarioFile = $('#DocumentoPdf').get(0).files;
        for (let e = 0; e < cedulaBeneficiarioFile.length; e++) {
            formDataModel.append("cedulaBeneficiarioFile", cedulaBeneficiarioFile[e])
        }

        let saludFile = $('#SaludPdf').get(0).files;
        for (let e = 0; e < saludFile.length; e++) {
            formDataModel.append("saludFile", saludFile[e])
        }

        let autorizacionFile = $('#AutorizacionPdf').get(0).files;
        for (let e = 0; e < autorizacionFile.length; e++) {
            formDataModel.append("autorizacionFile", autorizacionFile[e])
        }

        let cedulaPadreFile = $('#CedulaPadrePdf').get(0).files;
        for (let e = 0; e < cedulaPadreFile.length; e++) {
            formDataModel.append("cedulaPadreFile", cedulaPadreFile[e])
        }

        if (IsUpdate) {
            // Save_Data(ActualizarVista, '/Deportista/Actualizar', ObjDeportista, 'Actualizacion');
        } else {
            Save_Data_FormData(ActualizarVista, '/InscripcionDeportistas/Agregar', formDataModel, 'Guardado');
        }
    }
}

//async function Createobj() {
//    var boton = document.getElementById("SaveInscripcioDeportista");
//    boton.disabled = true;

//    // Reactivar el botón después de 5 segundos (5000 milisegundos)
//    setTimeout(function () {
//        boton.disabled = false;
//    }, 3000);

//    if (VerDetalles == "SI") {
//        Atras();
//    } else {
//        // if (validadorFormDeportista.form()) {
//        var test = $('#NumIde').val();
//        var IdIncripcionBeneficiarios = 0;

//        if (IsUpdate) {
//            IdIncripcionBeneficiarios = IdIncripcionBeneficiariosData;
//        }
//        const fileFormDocumento = document.querySelector('#DocumentoPdf') ? (document.querySelector('#DocumentoPdf').files ? document.querySelector('#DocumentoPdf').files[0] : null) : null;
//        const fileFormSalud = document.querySelector('#SaludPdf') ? (document.querySelector('#SaludPdf').files ? document.querySelector('#SaludPdf').files[0] : null) : null;
//        const fileFormAutorizacion = document.querySelector('#AutorizacionPdf') ? (document.querySelector('#AutorizacionPdf').files ? document.querySelector('#AutorizacionPdf').files[0] : null) : null;
//        const fileFormCedulaPadre = document.querySelector('#CedulaPadrePdf') ? (document.querySelector('#CedulaPadrePdf').files ? document.querySelector('#CedulaPadrePdf').files[0] : null) : null;

//        try {
//            var fileStringBase64Documento = await getBase64(fileFormDocumento);
//            var fileStringBase64Salud = await getBase64(fileFormSalud);
//            var fileStringBase64Autorizacion = await getBase64(fileFormAutorizacion);
//            var fileStringBase64CedulaPadre = await getBase64(fileFormCedulaPadre);

//            // Continuar con el procesamiento de los archivos
//        } catch (error) {
//            // No es necesario hacer nada aquí si el error esperado es "Falta el archivo"
//            // Puedes agregar otro manejo de errores si es necesario.
//        }

//        ObjInscripcionDeportistas = {
//            InscripcionDeportistasDeport: {
//                IdIncripcionBeneficiarios: IdIncripcionBeneficiarios,

//                ProgramaInscripciones: $('#ProgramaInscripciones').val(),
//                TipoIdentificacionInscripciones: $('#TipoIdentificacionInscripciones').val(),
//                DocumentoPdf: fileStringBase64Documento,
//                SaludPdf: fileStringBase64Salud,
//                AutorizacionPdf: fileStringBase64Autorizacion,
//                CedulaPadrePdf: fileStringBase64CedulaPadre,
//                NumIdentificacionInscripciones: $('#NumIdentificacionInscripciones').val(),
//                PrimerNombreInscripciones: $('#PrimerNombreInscripciones').val(),
//                SegundonombreInscripciones: $('#SegundonombreInscripciones').val(),
//                PrimerApellidoInscripciones: $('#PrimerApellidoInscripciones').val(),
//                SegundoApellidoInscripciones: $('#SegundoApellidoInscripciones').val(),
//                FechaNacimientoInscripciones: $('#FechaNacimientoInscripciones').val(),
//                EdadInscripciones: $('#EdadInscripciones').val(),
//                PaisNacimientoInscripciones: $('#PaisNacimientoInscripciones').val(),
//                DepartamentoInscripciones: $('#DepartamentoInscripciones').val(),
//                MunicipioInscripciones: $('#MunicipioInscripciones').val(),
//                GeneroInscripciones: $('#GeneroInscripciones').val(),
//                GrupoEtarreoInscripciones: $('#GrupoEtarreoInscripciones').val(),
//                DireccionResidencia: $('#DireccionResidencia').val(),
//                BarrioResidencia: $('#BarrioResidencia').val(),
//                MunicipioResidencia: $('#MunicipioResidencia').val(),
//                EstratoResidencia: $('#EstratoResidencia').val(),
//                ZonaResidencia: $('#ZonaResidencia').val(),
//                TelefonoResidencia: $('#TelefonoResidencia').val(),
//                CorreoResidencia: $('#CorreoResidencia').val(),
//                EstadoCivil: $('#EstadoCivil').val(),
//                NivelEstudio: $('#NivelEstudio').val(),
//                RegimenSalud: $('#RegimenSalud').val(),
//                Eps: $('#Eps').val(),
//                Tiposangre: $('#Tiposangre').val(),
//                CondicionPoblacion: $('#CondicionPoblacion').val(),
//                DiscapacidadPoblacion: $('#DiscapacidadPoblacion').val(),
//                GrupoEtnico: $('#GrupoEtnico').val(),
//                DeportePractica: $('#DeportePractica').val(),
//                NombreEntrenador: $('#NombreEntrenador').val(),
//                NombreContacto: $('#NombreContacto').val(),
//                TelefonoContacto: $('#TelefonoContacto').val(),
//                CorreoContacto: $('#CorreoContacto').val(),
//            }
//        };

//        let id = 10;

//        if (IsUpdate) {
//            // Save_Data(ActualizarVista, '/Deportista/Actualizar', ObjDeportista, 'Actualizacion');
//        } else {
//            Save_Data(ActualizarVista, '/InscripcionDeportistas/Agregar', ObjInscripcionDeportistas, 'Guardado');
//            // LimpiarFormulario()
//        }
//    }
//}

function ActualizarVista() {
    window.location.reload();
}



function RecargarDataUpdate(data) {
    SwalErrorMsj(data.mensaje, '/InscripcionDeportistas/GetListInscripcionDeportistas');
}



function validarCorreo(input) {
    const correo = input.value;
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(correo)) {
        // Usar SweetAlert para informar que el formato del correo no es válido
        swal({
            icon: 'error',
            title: 'Formato de correo inválido',
            text: 'Por favor, ingrese un correo electrónico válido.',
        });
        input.value = ''; // Borrar el valor del campo de entrada
    }
}

async function getBase64(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'Falta el archivo',
                text: 'Por favor, debe cargar todos los documentos.'
            });
            reject("Falta el archivo");
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                let stringBase64 = reader.result;
                resolve(stringBase64.split(",")[1]);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar el archivo',
                    text: 'Ocurrió un error al cargar el archivo.'
                });
                reject(error);
            };
        }
    });
}
//function Createobj() {
//    var boton = document.getElementById("SaveInscripcioDeportista");
//    boton.disabled = true;

//    // Reactivar el botón después de 5 segundos (5000 milisegundos)
//    setTimeout(function () {
//        boton.disabled = false;
//    }, 5000);

//    // Aquí puedes agregar el resto de la lógica que debe ejecutar la función Createobj
//    // ...
//}