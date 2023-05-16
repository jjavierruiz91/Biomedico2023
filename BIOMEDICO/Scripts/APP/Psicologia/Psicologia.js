var ObjPsicologiaDeportiva = {
    DemoPsicologiaDeport: {},//{objetos} llaves y [array] corchetes
    HistFamiliaresPsicologiaDeport: {},
    FamPsicologiaDeport: {},
    EnfPersonalPsicologiaDeport: {},
    TestPsiDeport: {},
    VidapersonalPsiDeport: {}
    
}
var ListTestPsiDeportTemporal = [];//--array
var TestPsiDeport = {
    Prueba: $('#Prueba').val(),
    Puntuacion: $('#Puntuacion').val(),
    Valoracion: $('#Valoracion').val(),
    Concepto: $('#Concepto').val(),
}


//var validadorFormDeportista = [];
var IsUpdate = false;
var idPsicologiaData = 0;
var IdHistoriaPsicologia = 0;
var IdEnfermedadesFamiliares = 0;
var IdPersonal = 0;
var IdTestPsicologia = 0;
var IdPersonalFisi = 0;


var tablaTestTemporal = [];
var VerDetalles = 'NO';

$(document).ready(function () {//FUNCION INICIAL;
    idPsicologiaData = getQueryVariable('IdPsicoReg');
    let cedulaPaciente = getQueryVariable('Ced');
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');

    RenderTable('datatable-Test', [0, 1, 2], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,
    });

    tablaTestTemporal = $('#datatable-Test').DataTable();

   

    if (idPsicologiaData > 0) {
        IsUpdate = true;
    }
    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }
    esconde_elemento('ImagenPsicologiaDeport')
    if (VerDetalles == "SI") {
        $('#SavePsicologia').html('Atras')
        Get_Data(LlenarCampos, '/Psicologia/GetPsicologiaDeportivaById?IdPsicologiadepor=' + idPsicologiaData);
        visible_elemento('ImagenPsicologiaDeport')
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SavePsicologia').html('Actualizar')
        Get_Data(LlenarCampos, '/Psicologia/GetPsicologiaDeportivaById?IdPsicologiadepor=' + idPsicologiaData);
    }

    
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/Psicologia/BuscarDeportista?cedula=' + Valuecedula)
}
function LlenarcamposInicial(data) {
    $('#PrimerNombre').val(data.PrimerNombre)
    $('#SegundoNombre').val(data.SegundoNombre)
    $('#PrimerApellido').val(data.PrimerApellido)
    $('#SegundoApellido').val(data.SegundoApellido)
    $('#Genero').val(data.Genero)
    $('#Edad').val(data.Edad)
    $('#Deporte').val(data.Deporte)
    CargarInfoinicial();
}



function LlenarCampos(data) {
    console.log(JSONDateconverter(data.objeto.FechaRegistro));
    var FechaReg = new Date(JSONDateconverter(data.objeto.FechaRegistro));
    FechaRegParceMes = FechaReg.getMonth() + 1;
    FechaRegParcedia = FechaReg.getDate();
    FechaRegParce = FechaRegParceMes + "_" + FechaRegParcedia;
    console.log(FechaRegParce)
    let rutaimg = SetUrlForQueryLocal('/images/Psicologia/' + data.objeto.NumIdentificacion + ".jpg");
    //document.getElementById("ImagenDeport") = rutaimg;
    $("#ImagenPsicologiaDeport").attr("src", rutaimg);
    $('#IdDatosDemograficos').val(data.objeto.IdDatosDemograficos);
    $('#CodigoPsicologia').val(data.objeto.CodigoPsicologia);
    $('#EstadoCivil').val(data.objeto.EstadoCivil);
    $('#NivelEducativo').val(data.objeto.NivelEducativo);
    $('#YoSoy').val(data.objeto.YoSoy);
    $('#NumHermanos').val(data.objeto.NumHermanos);
    $('#VivoCon').val(data.objeto.VivoCon);
    $('#Actualmente').val(data.objeto.Actualmente);
    $('#Religion').val(data.objeto.Religion);
    $('#DependenciaEconomia').val(data.objeto.DependenciaEconomia);
    $('#Cedula').val(data.objeto.NumIdentificacion);

    ////DATOS ANTECEDENTES
    //IdHistoriaPsicologia = data.objeto.HistoriaFamiliaresPsicologia[0].IdHistoriaPsicologia;
    $('#NombrePadre').val(data.objeto.HistoriaFamiliaresPsicologia[0].NombrePadre);
    $('#EdadPadre').val(data.objeto.HistoriaFamiliaresPsicologia[0].EdadPadre);
    $('#RelacionPadre').val(data.objeto.HistoriaFamiliaresPsicologia[0].RelacionPadre);
    $('#NombreMAdre').val(data.objeto.HistoriaFamiliaresPsicologia[0].NombreMAdre);
    $('#EdadMadre').val(data.objeto.HistoriaFamiliaresPsicologia[0].EdadMadre);
    $('#RelacionMadre').val(data.objeto.HistoriaFamiliaresPsicologia[0].RelacionMadre);
    $('#RelacionHermanos').val(data.objeto.HistoriaFamiliaresPsicologia[0].RelacionHermanos);

    //DATOS FAMILIARES

    //IdEnfermedadesFamiliares = data.objeto.FamiliaresPsicologia[0].IdEnfermedadesFamiliares
    $('#SustanciasPsicoFmlia').val(data.objeto.FamiliaresPsicologia[0].SustanciasPsicoFmlia);
    $('#EnferMentalesFmlia').val(data.objeto.FamiliaresPsicologia[0].EnferMentalesFmlia);
    $('#EnferCoronariasFmlia').val(data.objeto.FamiliaresPsicologia[0].EnferCoronariasFmlia);
    $('#ObesidadFmlia').val(data.objeto.FamiliaresPsicologia[0].ObesidadFmlia);
    $('#CancerFmlia').val(data.objeto.FamiliaresPsicologia[0].CancerFmlia);
    $('#HipertensionFmlia').val(data.objeto.FamiliaresPsicologia[0].HipertensionFmlia);
    $('#EnferAlergicasFmlia').val(data.objeto.FamiliaresPsicologia[0].EnferAlergicasFmlia);

    ////DATOS ENFERMEDAD 

    //IdPersonal = data.objeto.EnfermedadPersonalPsicologia[0].IdPersonal;
    $('#SustanciasPsicoactivasPer').val(data.objeto.EnfermedadPersonalPsicologia[0].SustanciasPsicoactivasPer);
    $('#EnferMentalesPer').val(data.objeto.EnfermedadPersonalPsicologia[0].EnferMentalesPer);
    $('#DiabetesPer').val(data.objeto.EnfermedadPersonalPsicologia[0].DiabetesPer);
    $('#EnferCoronariasPer').val(data.objeto.EnfermedadPersonalPsicologia[0].EnferCoronariasPer);
    $('#ObesidadPer').val(data.objeto.EnfermedadPersonalPsicologia[0].ObesidadPer);
    $('#CancerPer').val(data.objeto.EnfermedadPersonalPsicologia[0].CancerPer);
    $('#HipertensionPer').val(data.objeto.EnfermedadPersonalPsicologia[0].HipertensionPer);
    $('#EnferAlergicasPer').val(data.objeto.EnfermedadPersonalPsicologia[0].EnferAlergicasPer);
    $('#AsmaPer').val(data.objeto.EnfermedadPersonalPsicologia[0].AsmaPer);
    $('#ComplicacionesPartoPer').val(data.objeto.EnfermedadPersonalPsicologia[0].ComplicacionesPartoPer);
    $('#LesionesPer').val(data.objeto.EnfermedadPersonalPsicologia[0].LesionesPer);
    $('#CualesLesionesPer').val(data.objeto.EnfermedadPersonalPsicologia[0].CualesLesionesPer);
    $('#TrabajoConcentrarsePer').val(data.objeto.EnfermedadPersonalPsicologia[0].TrabajoConcentrarsePer);
    $('#DolorMuscularPer').val(data.objeto.EnfermedadPersonalPsicologia[0].DolorMuscularPer);
    $('#PartoCesareaPer').val(data.objeto.EnfermedadPersonalPsicologia[0].PartoCesareaPer);
    $('#PartoNormalPer').val(data.objeto.EnfermedadPersonalPsicologia[0].PartoNormalPer);
    $('#LesionadoActualPer').val(data.objeto.EnfermedadPersonalPsicologia[0].LesionadoActualPer);
    $('#DificultadSueñoPer').val(data.objeto.EnfermedadPersonalPsicologia[0].DificultadSueñoPer);
    $('#DolorCabezaPer').val(data.objeto.EnfermedadPersonalPsicologia[0].DolorCabezaPer);
    $('#CirugiasPer').val(data.objeto.EnfermedadPersonalPsicologia[0].CirugiasPer);
    $('#ApetitoPer').val(data.objeto.EnfermedadPersonalPsicologia[0].ApetitoPer);
    $('#CansadoPer').val(data.objeto.EnfermedadPersonalPsicologia[0].CansadoPer);
    $('#OtroPer').val(data.objeto.EnfermedadPersonalPsicologia[0].OtroPer);
    $('#HistoriadelProblemaPer').val(data.objeto.EnfermedadPersonalPsicologia[0].HistoriadelProblemaPer);


    //DATOS TEST 

    //IdTestPsicologia = data.objeto.TestPsicologia[0].IdTestPsicologia
    $('#Prueba').val(data.objeto.TestPsicologia[0].Prueba);
    $('#Puntuacion').val(data.objeto.TestPsicologia[0].Puntuacion);
    $('#Valoracion').val(data.objeto.TestPsicologia[0].Valoracion);
    $('#Concepto').val(data.objeto.TestPsicologia[0].Concepto);



    //DATOS VIDA PERSONAL

    IdPersonalFisi = data.objeto.VidapersonalPsicologia[0].IdPersonalFisi
    $('#EntrenamientoActualPsi').val(data.objeto.VidapersonalPsicologia[0].EntrenamientoActualPsi);
    $('#HorasDiariasPsi').val(data.objeto.VidapersonalPsicologia[0].HorasDiariasPsi);
    $('#NumeroSesionesPsi').val(data.objeto.VidapersonalPsicologia[0].NumeroSesionesPsi);
    $('#LugarPsi').val(data.objeto.VidapersonalPsicologia[0].LugarPsi);
    $('#NombreEntrenadorPsi').val(data.objeto.VidapersonalPsicologia[0].NombreEntrenadorPsi);
    $('#InicioDeportePsi').val(data.objeto.VidapersonalPsicologia[0].InicioDeportePsi);
    $('#EntrenamiendoPsi').val(data.objeto.VidapersonalPsicologia[0].EntrenamientoPsi);
    $('#CompeticionPsi').val(data.objeto.VidapersonalPsicologia[0].CompeticionPsi);
    $('#EntrenamientoGuiadoPsi').val(data.objeto.VidapersonalPsicologia[0].EntrenamientoGuiadoPsi);
    $('#MeApoyanPsi').val(data.objeto.VidapersonalPsicologia[0].MeApoyanPsi);
    $('#CompromisoPsi').val(data.objeto.VidapersonalPsicologia[0].CompromisoPsi);
    $('#EntramientoPsicologicoPsi').val(data.objeto.VidapersonalPsicologia[0].EntramientoPsicologicoPsi);
    $('#ObservacionesPsi').val(data.objeto.VidapersonalPsicologia[0].ObservacionesPsi);
    $('#ResultadosPsi').val(data.objeto.VidapersonalPsicologia[0].ResultadosPsi);
    $('#RecomendacionesPsi').val(data.objeto.VidapersonalPsicologia[0].RecomendacionesPsi);
    $('#RemisionPsi').val(data.objeto.VidapersonalPsicologia[0].RemisionPsi);
    $('#SeguimientoPsi').val(data.objeto.VidapersonalPsicologia[0].SeguimientoPsi);
    $('#FirmaDoctorPsicologia').val(data.objeto.VidapersonalPsicologia[0].FirmaDoctorPsicologia);

   

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
    document.getElementById("SavePsicologia").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    var test = $('#NumIde').val();
    var IdDatosDemograficos = 0;
    if (IsUpdate) {
        IdDatosDemograficos = idPsicologiaData;

    }

    const file = document.querySelector('#AnexosPsicologia').files[0];
    ObjPsicologiaDeportiva = {
        DemoPsicologiaDeport: {

            IdDatosDemograficos: IdDatosDemograficos,
            CodigoPsicologia: $('#CodigoPsicologia').val(),
            EstadoCivil: $('#EstadoCivil').val(),
            NivelEducativo: $('#NivelEducativo').val(),
            YoSoy: $('#YoSoy').val(),
            NumHermanos: $('#NumHermanos').val(),
            VivoCon: $('#VivoCon').val(),
            Actualmente: $('#Actualmente').val(),
            Religion: $('#Religion').val(),
            DependenciaEconomia: $('#DependenciaEconomia').val(),
            AnexosPsicologia: file == undefined ? "" : await toBase64(file),
            NumIdentificacion: $('#Cedula').val(),
            IdCitaMedica: IdCitaMedica,

        },//End obj Psicologia

        HistFamiliaresPsicologiaDeport: {

            IdHistoriaPsicologia: IdHistoriaPsicologia,
            NombrePadre: $('#NombrePadre').val(),
            EdadPadre: $('#EdadPadre').val(),
            RelacionPadre: $('#RelacionPadre').val(),
            NombreMAdre: $('#NombreMAdre').val(),
            EdadMadre: $('#EdadMadre').val(),
            RelacionMadre: $('#RelacionMadre').val(),
            RelacionHermanos: $('#RelacionHermanos').val(),

        },
        FamPsicologiaDeport: {

            IdEnfermedadesFamiliares: IdEnfermedadesFamiliares,
            SustanciasPsicoFmlia: $('#SustanciasPsicoFmlia').val(),
            EnferMentalesFmlia: $('#EnferMentalesFmlia').val(),
            EnferCoronariasFmlia: $('#EnferCoronariasFmlia').val(),
            ObesidadFmlia: $('#ObesidadFmlia').val(),
            CancerFmlia: $('#CancerFmlia').val(),
            HipertensionFmlia: $('#HipertensionFmlia').val(),
            EnferAlergicasFmlia: $('#EnferAlergicasFmlia').val(),

        },
        EnfPersonalPsicologiaDeport: {


            IdPersonal: IdPersonal,
            SustanciasPsicoactivasPer: $('#SustanciasPsicoactivasPer').val(),
            EnferMentalesPer: $('#EnferMentalesPer').val(),
            DiabetesPer: $('#DiabetesPer').val(),
            EnferCoronariasPer: $('#EnferCoronariasPer').val(),
            ObesidadPer: $('#ObesidadPer').val(),
            CancerPer: $('#CancerPer').val(),
            HipertensionPer: $('#HipertensionPer').val(),
            EnferAlergicasPer: $('#EnferAlergicasPer').val(),
            AsmaPer: $('#AsmaPer').val(),
            ComplicacionesPartoPer: $('#ComplicacionesPartoPer').val(),
            LesionesPer: $('#LesionesPer').val(),
            CualesLesionesPer: $('#CualesLesionesPer').val(),
            TrabajoConcentrarsePer: $('#TrabajoConcentrarsePer').val(),
            DolorMuscularPer: $('#DolorMuscularPer').val(),
            PartoCesareaPer: $('#PartoCesareaPer').val(),
            PartoNormalPer: $('#PartoNormalPer').val(),
            LesionadoActualPer: $('#LesionadoActualPer').val(),
            DificultadSueñoPer: $('#DificultadSueñoPer').val(),
            DolorCabezaPer: $('#DolorCabezaPer').val(),
            CirugiasPer: $('#CirugiasPer').val(),
            ApetitoPer: $('#ApetitoPer').val(),
            CansadoPer: $('#CansadoPer').val(),
            OtroPer: $('#OtroPer').val(),
            HistoriadelProblemaPer: $('#HistoriadelProblemaPer').val(),
        },

       
        VidapersonalPsiDeport: {

            IdPersonalFisi: IdPersonalFisi,
            EntrenamientoActualPsi: $('#EntrenamientoActualPsi').val() + "_" + $('#EntrenamientoActualPsi2').val()
                + "_" + $('#EntrenamientoActualPsi3').val() + "_" + $('#EntrenamientoActualPsi4').val() + "_" + $('#EntrenamientoActualPsi5').val(),
            HorasDiariasPsi: $('#HorasDiariasPsi').val(),
            NumeroSesionesPsi: $('#NumeroSesionesPsi').val(),
            LugarPsi: $('#LugarPsi').val(),
            NombreEntrenadorPsi: $('#NombreEntrenadorPsi').val(),
            InicioDeportePsi: $('#InicioDeportePsi').val(),
            EntrenamiendoPsi: $('#EntrenamiendoPsi').val(),
            CompeticionPsi: $('#CompeticionPsi').val(),
            EntrenamientoGuiadoPsi: $('#EntrenamientoGuiadoPsi').val(),
            MeApoyanPsi: $('#MeApoyanPsi').val(),
            CompromisoPsi: $('#CompromisoPsi').val(),
            EntramientoPsicologicoPsi: $('#EntramientoPsicologicoPsi').val(),
            ObservacionesPsi: $('#ObservacionesPsi').val(),
            ResultadosPsi: $('#ResultadosPsi').val(),
            RecomendacionesPsi: $('#RecomendacionesPsi').val(),
            RemisionPsi: $('#RemisionPsi').val(),
            SeguimientoPsi: $('#SeguimientoPsi').val(),
            FirmaDoctorPsicologia: $('#FirmaDoctorPsicologia').val(),
            

        },

        ListTestPsiDeport: ListTestPsiDeportTemporal,

      
    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/Psicologia/Actualizar', ObjPsicologiaDeportiva, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/Psicologia/Agregar', ObjPsicologiaDeportiva, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}



}
function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Psicologia/ListaPsicologiaDeportiva"
    }
}


function LimpiarFormulario() {
    $('#IdDatosDemograficos').val('')
    $('#EstadoCivil').val('')
    $('#NivelEducativo').val('')
    $('#YoSoy').val('')
    $('#NumHermanos').val('')
    $('#VivoCon').val('')
    $('#Actualmente').val('')
    $('#Religion').val('')
    $('#DependenciaEconomia').val('')
    $('#IdHistoriaPsicologia').val('')
    $('#NombrePadre').val('')
    $('#EdadPadre').val('')
    $('#RelacionPadre').val('')
    $('#NombreMAdre').val('')
    $('#EdadMadre').val('')
    $('#RelacionMadre').val('')
    $('#RelacionHermanos').val('')
    $('#IdEnfermedadesFamiliares').val('')
    $('#SustanciasPsico').val('')
    $('#EnferMentales').val('')
    $('#EnferCoronarias').val('')
    $('#Obesidad').val('')
    $('#Cancer').val('')
    $('#Hipertension').val('')
    $('#EnferAlergicas').val('')
    $('#IdPersonal').val('')
    $('#SustanciasPsicoactivas').val('')
    $('#EnferMentales').val('')
    $('#Diabetes').val('')
    $('#EnferCoronarias').val('')
    $('#Obesidad').val('')
    $('#Cancer').val('')
    $('#Hipertension').val('')
    $('#EnferAlergicas').val('')
    $('#Asma').val('')
    $('#ComplicacionesParto').val('')
    $('#Lesiones').val('')
    $('#CualesLesiones').val('')
    $('#TrabajoConcentrarse').val('')
    $('#DolorMuscular').val('')
    $('#PartoCesarea').val('')
    $('#PartoNormal').val('')
    $('#LesionadoActual').val('')
    $('#DificultadSueño').val('')
    $('#DolorCabeza').val('')
    $('#Cirugias').val('')
    $('#Apetito').val('')
    $('#Cansado').val('')
    $('#Otro').val('')
    $('#HistoriadelProblema').val('')
    $('#IdTestPsicologia').val('')
    $('#Prueba').val('')
    
    $('#Puntuacion').val('')
    $('#Valoracion').val('')
    $('#Concepto').val('')
    $('#IdPersonalFisi').val('')
    $('#EntrenamientoActual').val('')
    $('#HorasDiarias').val('')
    $('#NumeroSesiones').val('')
    $('#Lugar').val('')
    $('#NombreEntrenador').val('')
    $('#InicioDeporte').val('')
    $('#Entrenamiendo').val('')
    $('#Competicion').val('')
    $('#EntrenamientoGuiado').val('')
    $('#MeApoyan').val('')
    $('#Compromiso').val('')
    $('#EntramientoPsicologico').val('')
    $('#Observaciones').val('')
    $('#Resultados').val('')
    $('#Recomendaciones').val('')
    $('#Remision').val('')
    $('#Seguimiento').val('')
    $('#IdSeguimiento').val('')
    $('#Fecha').val('')
    $('#Evolucion').val('')
    $('#FirmaDoc').val('')

}

function AddTest() {
    //let Objtemp = {};
    //Objtemp = TestPsiDeport;
    //Objtemp.Prueba = $('#Prueba').val();
    //Objtemp.Variable = $('#Variable').val();
    //Objtemp.Puntuacion = $('#Puntuacion').val();
    //Objtemp.Valoracion = $('#Valoracion').val();
    //Objtemp.Concepto = $('#Concepto').val();

    ListTestPsiDeportTemporal.push({
        Prueba : $('#Prueba').val(),
       /* Variable : $('#Variable').val(),*/
        Puntuacion : $('#Puntuacion').val(),
        Valoracion : $('#Valoracion').val(),
        Concepto: $('#Concepto').val()
    });
    CargartablatestTemporal(ListTestPsiDeportTemporal);
    Limpiarcampos();
}
function Limpiarcampos() {
    $('#Prueba').val('');
    /*$('#Variable').val('');*/
    $('#Puntuacion').val('');
    $('#Valoracion').val('');
    $('#Concepto').val('');
}

function CargartablatestTemporal(Lista) {
    tablaTestTemporal.clear().draw();
    $.each(Lista, function (index, item) {
        tablaTestTemporal.row.add([
            item.Prueba,
           /* item.Variable,*/
            item.Puntuacion,
            item.Valoracion,
            item.Concepto,
            
            //'<i class=" fa fa-window-close" title="Eliminar" onclick="Eliminar(' + item.IdDatosDemograficos + ')" ></i>&ensp;' +
            //'<i class="fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdDatosDemograficos + ')"></i>'



        ]).draw(false);



    });
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});



