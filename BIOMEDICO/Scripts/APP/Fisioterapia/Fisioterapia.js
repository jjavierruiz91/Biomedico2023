var ObjFisioterapiaDeportiva = {
    FisioterapiaDeport: {},//{objetos} llaves y [array] corchetes
    AntecedentesFisioDeport: {},
    EvolucionFisioDeport: {},
    FisioterapiaEvaluacionDeport: {}
}


//var validadorFormDeportista = [];
var IsUpdate = false;
var IdFisioterapiaData = 0;
var IdAntecedentesfisi = 0;
var IdTratamientofisio = 0;
var IdEvaluacion = 0;

var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    IdFisioterapiaData = getQueryVariable('IdFisioReg');
    let cedulaPaciente = getQueryVariable('Ced');
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (IdFisioterapiaData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }
    esconde_elemento('ImagenFisioterapiaDeport')
    if (VerDetalles == "SI") {
        $('#SaveFisioterapia').html('Atras')
        Get_Data(LlenarCampos, '/Fisioterapia/GetFisioterapiaDeportivaById?IdfisioDepor=' + IdFisioterapiaData);
        visible_elemento('ImagenFisioterapiaDeport')
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveFisioterapia').html('Actualizar')
        Get_Data(LlenarCampos, '/Fisioterapia/GetFisioterapiaDeportivaById?IdfisioDepor=' + IdFisioterapiaData);

    }
});

function CargarInfoinicial() {
    var Valuecedula = $('#Cedula').val();
    Get_Data(LlenarcamposInicial, '/Fisioterapia/BuscarDeportista?cedula=' + Valuecedula)
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
    
    CargarInfoinicial();
}


function LlenarCampos(data) {
    console.log(JSONDateconverter(data.objeto.FechaRegistro));
    var FechaReg = new Date(JSONDateconverter(data.objeto.FechaRegistro));
    //FechaRegParceMes = FechaReg.getMonth() + 1;
    //FechaRegParcedia = FechaReg.getDate();
    ////FechaRegParce = FechaRegParceMes + "_" + FechaRegParcedia;
    //console.log(FechaRegParce)
    let rutaimg = SetUrlForQueryLocal('/images/Psicologia/' + data.objeto.NumIdentificacion + ".jpg");
    //document.getElementById("ImagenDeport") = rutaimg;
    $("#ImagenFisioterapiaDeport").attr("src", rutaimg);
    $('#IdFisioterapia').val(data.objeto.IdFisioterapia);
    $('#CodFisioterapi').val(data.objeto.CodFisioterapi);
    $('#FechaFisioter').val(data.objeto.FechaFisioter != null ? JSONDateconverter(data.objeto.FechaFisioter) : '');

    //$('#FechaFisioter') != null?.val(JSONDateconverter(data.objeto.FechaFisioter));
    //$('#FechaFisioter').val(JSONDateconverter(data.objeto.FechaFisioter));
    $('#ReportaLesion').val(data.objeto.ReportaLesion);
    $('#AntecedentesLesion').val(data.objeto.AntecedentesLesion);
    $('#CualLesion').val(data.objeto.CualLesion);
    $('#LesionActual').val(data.objeto.LesionActual);
    $('#NumeroReLesiones').val(data.objeto.NumeroReLesiones);
    $('#TratamientoLesion').val(data.objeto.TratamientoLesion);
    $('#HuesoLesion').val(data.objeto.HuesoLesion);
    $('#LigamentoLesion').val(data.objeto.LigamentoLesion);
    $('#TendonLesion').val(data.objeto.TendonLesion);
    $('#MusculoLesion').val(data.objeto.MusculoLesion);
    $('#CabezaLesion').val(data.objeto.CabezaLesion);
    $('#ColumnaLesion').val(data.objeto.ColumnaLesion);
    $('#HombroLesion').val(data.objeto.HombroLesion);
    $('#CodoLesion').val(data.objeto.CodoLesion);
    $('#MuñecamanoLesion').val(data.objeto.MuñecamanoLesion);
    $('#CaderaLesion').val(data.objeto.CaderaLesion);
    $('#RodillaLesion').val(data.objeto.RodillaLesion);
    $('#CuelloPieLesion').val(data.objeto.CuelloPieLesion);
    $('#AnexosFisioterapia').val(data.objeto.AnexosFisioterapia);
    $('#Cedula').val(data.objeto.NumIdentificacion);


    ////DATOS ANTECEDENTES FISIOTERAPIA

    //IdAntecedentesfisi = data.objeto.AntecedentesFisioterapia[0].IdAntecedentesfisi;
    //$('#Patologicos').val(data.objeto.AntecedentesFisioterapia[0].Patologicos);
    /*$('#IdAntecedentesfisi').val(data.objeto.AntecedentesFisioterapia[0].IdAntecedentesfisi);*/
    $('#MmssRealDer').val(data.objeto.AntecedentesFisioterapia[0].MmssRealDer);
    $('#MmssRealizq').val(data.objeto.AntecedentesFisioterapia[0].MmssRealizq);
    $('#AparenteMmssDer').val(data.objeto.AntecedentesFisioterapia[0].AparenteMmssDer);
    $('#AparenteMmssIzq').val(data.objeto.AntecedentesFisioterapia[0].AparenteMmssIzq);
    $('#RealMmiiDer').val(data.objeto.AntecedentesFisioterapia[0].RealMmiiDer);
    $('#RealMmiiIzq').val(data.objeto.AntecedentesFisioterapia[0].RealMmiiIzq);
    $('#AparenteMmiiDer').val(data.objeto.AntecedentesFisioterapia[0].AparenteMmiiDer);
    $('#AparenteMmiiIzq').val(data.objeto.AntecedentesFisioterapia[0].AparenteMmiiIzq);
    $('#ObservacionesPosturaFisio').val(data.objeto.AntecedentesFisioterapia[0].ObservacionesPosturaFisio);
    $('#BalanceoOjosAbiertos2').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosAbiertos2);
    $('#BalanceoOjosAbiertos1').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosAbiertos1);
    $('#BalanceoOjosAbiertos0').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosAbiertos0);
    $('#BalanceoOjosAbiertosObservaciones').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosAbiertosObservaciones);
    $('#BalanceoOjosCerrados2').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosCerrados2);
    $('#BalanceoOjosCerrados1').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosCerrados1);
    $('#BalanceoOjosCerrados0').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosCerrados0);
    $('#BalanceoOjosCerradosObservaciones').val(data.objeto.AntecedentesFisioterapia[0].BalanceoOjosCerradosObservaciones);
    $('#FlexibilidadFisioterapia').val(data.objeto.AntecedentesFisioterapia[0].FlexibilidadFisioterapia);

    //DATOS EVOLUCION FISIOTERAPIA


    //IdTratamientofisio = data.objeto.Evolucionfisioterapia[0].IdTratamientofisio
    //$('#FechaTratamiento').val(JSONDateconverter(data.objeto.Evolucionfisioterapia[0].FechaTratamiento));
    $('#Sentadilla3').val(data.objeto.Evolucionfisioterapia[0].Sentadilla3);
    $('#Sentadilla2').val(data.objeto.Evolucionfisioterapia[0].Sentadilla2);
    $('#Sentadilla1').val(data.objeto.Evolucionfisioterapia[0].Sentadilla1);
    $('#Sentadilla0').val(data.objeto.Evolucionfisioterapia[0].Sentadilla0);
    $('#PasosValla3').val(data.objeto.Evolucionfisioterapia[0].PasosValla3);
    $('#PasosValle2').val(data.objeto.Evolucionfisioterapia[0].PasosValle2);
    $('#PasosValle1').val(data.objeto.Evolucionfisioterapia[0].PasosValle1);
    $('#PasosValle0').val(data.objeto.Evolucionfisioterapia[0].PasosValle0);
    $('#TijeraLinea3').val(data.objeto.Evolucionfisioterapia[0].TijeraLinea3);
    $('#TijeraLinea2').val(data.objeto.Evolucionfisioterapia[0].TijeraLinea2);
    $('#TijeraLinea1').val(data.objeto.Evolucionfisioterapia[0].TijeraLinea1);
    $('#TijeraLinea0').val(data.objeto.Evolucionfisioterapia[0].TijeraLinea0);
    $('#HombroActividad3').val(data.objeto.Evolucionfisioterapia[0].HombroActividad3);
    $('#HombroActividad2').val(data.objeto.Evolucionfisioterapia[0].HombroActividad2);
    $('#HombroActividad1').val(data.objeto.Evolucionfisioterapia[0].HombroActividad1);
    $('#HombroActividad0').val(data.objeto.Evolucionfisioterapia[0].HombroActividad0);
    $('#Pierna3').val(data.objeto.Evolucionfisioterapia[0].Pierna3);
    $('#Pierna2').val(data.objeto.Evolucionfisioterapia[0].Pierna2);
    $('#Pierna1').val(data.objeto.Evolucionfisioterapia[0].Pierna1);
    $('#Pierna0').val(data.objeto.Evolucionfisioterapia[0].Pierna0);
    $('#Pulgares3').val(data.objeto.Evolucionfisioterapia[0].Pulgares3);
    $('#Pulgares2').val(data.objeto.Evolucionfisioterapia[0].Pulgares2);
    $('#Pulgares1').val(data.objeto.Evolucionfisioterapia[0].Pulgares1);
    $('#Pulgares0').val(data.objeto.Evolucionfisioterapia[0].Pulgares0);
    $('#Tronco3').val(data.objeto.Evolucionfisioterapia[0].Tronco3);
    $('#Tronco2').val(data.objeto.Evolucionfisioterapia[0].Tronco2);
    $('#Tronco1').val(data.objeto.Evolucionfisioterapia[0].Tronco1);
    $('#Tronco0').val(data.objeto.Evolucionfisioterapia[0].Tronco0);
    $('#Planchas3').val(data.objeto.Evolucionfisioterapia[0].Planchas3);
    $('#Planchas2').val(data.objeto.Evolucionfisioterapia[0].Planchas2);
    $('#Planchas1').val(data.objeto.Evolucionfisioterapia[0].Planchas1);
    $('#Planchas0').val(data.objeto.Evolucionfisioterapia[0].Planchas0);
    $('#Sumatoria3').val(data.objeto.Evolucionfisioterapia[0].Sumatoria3);
    $('#Sumatoria2').val(data.objeto.Evolucionfisioterapia[0].Sumatoria2);
    $('#Sumatoria1').val(data.objeto.Evolucionfisioterapia[0].Sumatoria1);
    $('#Sumatoria0').val(data.objeto.Evolucionfisioterapia[0].Sumatoria0);
    $('#FlexoresTronco').val(data.objeto.Evolucionfisioterapia[0].FlexoresTronco);
    $('#FlexoresPlancha').val(data.objeto.Evolucionfisioterapia[0].FlexoresPlancha);
    $('#FlexoresColumna').val(data.objeto.Evolucionfisioterapia[0].FlexoresColumna);
    $('#FlexoresRecta').val(data.objeto.Evolucionfisioterapia[0].FlexoresRecta);
    $('#ObservacionesGlobal').val(data.objeto.Evolucionfisioterapia[0].ObservacionesGlobal);
    $('#FechaTratamiento').val(data.objeto.Evolucionfisioterapia[0].FechaTratamiento != null ? JSONDateconverter(data.objeto.Evolucionfisioterapia[0].FechaTratamiento) : '');

    //$('#FechaTratamiento') != null ?.val(JSONDateconverter(data.objeto.Evolucionfisioterapia[0].FechaTratamiento));
    //$('#FirmaDoctorGeneralFisio').val(data.objeto.Evolucionfisioterapia[0].FirmaDoctorGeneralFisio);


    //$('#IdEvaluacion').val(data.objeto.IdEvaluacion);
    //$('#Cedula').val(data.objeto.NumIdentificacion);
    $('#LesionEvaluacion').val(data.objeto.EvaluacionFisioterapia[0].LesionEvaluacion);
    $('#CualLesionEvaluacion').val(data.objeto.EvaluacionFisioterapia[0].CualLesionEvaluacion);
    $('#MmssSimetria').val(data.objeto.EvaluacionFisioterapia[0].MmssSimetria);
    $('#MmssAsimetria').val(data.objeto.EvaluacionFisioterapia[0].MmssAsimetria);
    $('#MmiiSimetria').val(data.objeto.EvaluacionFisioterapia[0].MmiiSimetria);
    $('#MmiiAsimetria').val(data.objeto.EvaluacionFisioterapia[0].MmiiAsimetria);
    $('#DescripcionAsimetria').val(data.objeto.EvaluacionFisioterapia[0].DescripcionAsimetria);
    $('#DescripcionSimetria').val(data.objeto.EvaluacionFisioterapia[0].DescripcionSimetria);
    $('#PosturaEvaluacionFisio').val(data.objeto.EvaluacionFisioterapia[0].PosturaEvaluacionFisio);
    $('#TrotePuesto').val(data.objeto.EvaluacionFisioterapia[0].TrotePuesto);
    $('#GeneroFisioterapia').val(data.objeto.EvaluacionFisioterapia[0].GeneroFisioterapia);
    $('#SuperiosTest').val(data.objeto.EvaluacionFisioterapia[0].SuperiosTest);
    $('#ExcelenteTest').val(data.objeto.EvaluacionFisioterapia[0].ExcelenteTest);
    $('#BuenoTest').val(data.objeto.EvaluacionFisioterapia[0].BuenoTest);
    $('#Promediotest').val(data.objeto.EvaluacionFisioterapia[0].Promediotest);
    $('#DeficienteTest').val(data.objeto.EvaluacionFisioterapia[0].DeficienteTest);
    $('#PobreTest').val(data.objeto.EvaluacionFisioterapia[0].PobreTest);
    $('#MuyPobreTest').val(data.objeto.EvaluacionFisioterapia[0].MuyPobreTest);
    $('#PasoVallaCali').val(data.objeto.EvaluacionFisioterapia[0].PasoVallaCali);
    $('#SentadillaCali').val(data.objeto.EvaluacionFisioterapia[0].SentadillaCali);
    $('#TijeraCali').val(data.objeto.EvaluacionFisioterapia[0].TijeraCali);
    $('#HombroCali').val(data.objeto.EvaluacionFisioterapia[0].HombroCali);
    $('#PiernaCali').val(data.objeto.EvaluacionFisioterapia[0].PiernaCali);
    $('#TroncoCali').val(data.objeto.EvaluacionFisioterapia[0].TroncoCali);
    $('#EstabilidadCali').val(data.objeto.EvaluacionFisioterapia[0].EstabilidadCali);
    $('#TotalCali').val(data.objeto.EvaluacionFisioterapia[0].TotalCali);
    $('#SentadillaObs').val(data.objeto.EvaluacionFisioterapia[0].SentadillaObs);
    $('#TijeraObs').val(data.objeto.EvaluacionFisioterapia[0].TijeraObs);
    $('#HombroObs').val(data.objeto.EvaluacionFisioterapia[0].HombroObs);
    $('#PiernaObs').val(data.objeto.EvaluacionFisioterapia[0].PiernaObs);
    $('#TroncoObs').val(data.objeto.EvaluacionFisioterapia[0].TroncoObs);
    $('#PasoVallaObs').val(data.objeto.EvaluacionFisioterapia[0].PasoVallaObs);
    $('#EstabilidadObs').val(data.objeto.EvaluacionFisioterapia[0].EstabilidadObs);
    $('#TotalObs').val(data.objeto.EvaluacionFisioterapia[0].TotalObs);
    $('#ResistenciaF').val(data.objeto.EvaluacionFisioterapia[0].ResistenciaF);
    $('#ResistenciaM').val(data.objeto.EvaluacionFisioterapia[0].ResistenciaM);
    $('#Puentef').val(data.objeto.EvaluacionFisioterapia[0].Puentef);
    $('#PuenteM').val(data.objeto.EvaluacionFisioterapia[0].PuenteM);
    $('#ExtensoresF').val(data.objeto.EvaluacionFisioterapia[0].ExtensoresF);
    $('#ExtensoresM').val(data.objeto.EvaluacionFisioterapia[0].ExtensoresM);
    $('#PuenteDF').val(data.objeto.EvaluacionFisioterapia[0].PuenteDF);
    $('#PuenteDM').val(data.objeto.EvaluacionFisioterapia[0].PuenteDM);
    $('#PuenteIF').val(data.objeto.EvaluacionFisioterapia[0].PuenteIF);
    $('#PuenteIM').val(data.objeto.EvaluacionFisioterapia[0].PuenteIM);
    $('#ExcelenteEvaluacion').val(data.objeto.EvaluacionFisioterapia[0].ExcelenteEvaluacion);
    $('#MuyBuenoEvaluacion').val(data.objeto.EvaluacionFisioterapia[0].MuyBuenoEvaluacion);
    $('#BuenoEvaluacion').val(data.objeto.EvaluacionFisioterapia[0].BuenoEvaluacion);
    $('#RegularEvaluacion').val(data.objeto.EvaluacionFisioterapia[0].RegularEvaluacion);
    $('#MaloRegulacion').val(data.objeto.EvaluacionFisioterapia[0].MaloRegulacion);
    $('#CalificacionObs').val(data.objeto.EvaluacionFisioterapia[0].CalificacionObs);
    $('#RecomendacionesObs').val(data.objeto.EvaluacionFisioterapia[0].RecomendacionesObs);
    $('#TestSitGenero').val(data.objeto.EvaluacionFisioterapia[0].TestSitGenero);
    $('#TestSitSuperior').val(data.objeto.EvaluacionFisioterapia[0].TestSitSuperior);
    $('#TestSitExcelente').val(data.objeto.EvaluacionFisioterapia[0].TestSitExcelente);
    $('#TestSitBueno').val(data.objeto.EvaluacionFisioterapia[0].TestSitBueno);
    $('#TestSitPromedio').val(data.objeto.EvaluacionFisioterapia[0].TestSitPromedio);
    $('#TestSitDeficiente').val(data.objeto.EvaluacionFisioterapia[0].TestSitDeficiente);
    $('#TestSitPobre').val(data.objeto.EvaluacionFisioterapia[0].TestSitPobre);
    $('#TestSitMuyPobre').val(data.objeto.EvaluacionFisioterapia[0].TestSitMuyPobre);
    $('#TestSentadillaProfunda1').val(data.objeto.EvaluacionFisioterapia[0].TestSentadillaProfunda1);
    $('#TestSentadillaProfunda2').val(data.objeto.EvaluacionFisioterapia[0].TestSentadillaProfunda2);
    $('#TestPasodeValla1').val(data.objeto.EvaluacionFisioterapia[0].TestPasodeValla1);
    $('#TestPasodeValla2').val(data.objeto.EvaluacionFisioterapia[0].TestPasodeValla2);
    $('#TestTijeraLinea1').val(data.objeto.EvaluacionFisioterapia[0].TestTijeraLinea1);
    $('#TestTijeraLinea2').val(data.objeto.EvaluacionFisioterapia[0].TestTijeraLinea2);
    $('#TestHombro1').val(data.objeto.EvaluacionFisioterapia[0].TestHombro1);
    $('#TestHombro2').val(data.objeto.EvaluacionFisioterapia[0].TestHombro2);
    $('#TestMovilidadPierna1').val(data.objeto.EvaluacionFisioterapia[0].TestMovilidadPierna1);
    $('#TestMovilidadPierna2').val(data.objeto.EvaluacionFisioterapia[0].TestMovilidadPierna2);
    $('#TestPush1').val(data.objeto.EvaluacionFisioterapia[0].TestPush1);
    $('#TestPush2').val(data.objeto.EvaluacionFisioterapia[0].TestPush2);
    $('#TestEstabilidadTronco1').val(data.objeto.EvaluacionFisioterapia[0].TestEstabilidadTronco1);
    $('#TestEstabilidadTronco2').val(data.objeto.EvaluacionFisioterapia[0].TestEstabilidadTronco2);
    $('#TestSumarotia1').val(data.objeto.EvaluacionFisioterapia[0].TestSumarotia1);
    $('#TestSumarotia2').val(data.objeto.EvaluacionFisioterapia[0].TestSumarotia2);
    $('#TestObservaciones1').val(data.objeto.EvaluacionFisioterapia[0].TestObservaciones1);
    $('#TestObservaciones2').val(data.objeto.EvaluacionFisioterapia[0].TestObservaciones2);
    $('#TestFlexora1').val(data.objeto.EvaluacionFisioterapia[0].TestFlexora1);
    $('#TestFlexora2').val(data.objeto.EvaluacionFisioterapia[0].TestFlexora2);
    $('#TestPuente1').val(data.objeto.EvaluacionFisioterapia[0].TestPuente1);
    $('#TestPuente2').val(data.objeto.EvaluacionFisioterapia[0].TestPuente2);
    $('#TestResistencia1').val(data.objeto.EvaluacionFisioterapia[0].TestResistencia1);
    $('#TestResistencia2').val(data.objeto.EvaluacionFisioterapia[0].TestResistencia2);
    $('#TestPuenteLateral1').val(data.objeto.EvaluacionFisioterapia[0].TestPuenteLateral1);
    $('#TestPuenteLateral2').val(data.objeto.EvaluacionFisioterapia[0].TestPuenteLateral2);
    $('#TestCoreSumatoria1').val(data.objeto.EvaluacionFisioterapia[0].TestCoreSumatoria1);
    $('#TestCoreSumatoria2').val(data.objeto.EvaluacionFisioterapia[0].TestCoreSumatoria2);
    $('#TestCoreObservaciones1').val(data.objeto.EvaluacionFisioterapia[0].TestCoreObservaciones1);
    $('#TestCoreObservaciones2').val(data.objeto.EvaluacionFisioterapia[0].TestCoreObservaciones2);
    $('#TestCoreExcelente').val(data.objeto.EvaluacionFisioterapia[0].TestCoreExcelente);
    $('#TestCoreMuyBueno').val(data.objeto.EvaluacionFisioterapia[0].TestCoreMuyBueno);
    $('#TestCoreBueno').val(data.objeto.EvaluacionFisioterapia[0].TestCoreBueno);
    $('#TestCoreRegular').val(data.objeto.EvaluacionFisioterapia[0].TestCoreRegular);
    $('#TestCoreMalo').val(data.objeto.EvaluacionFisioterapia[0].TestCoreMalo);
    $('#FirmaDoctorFisioterapia').val(data.objeto.EvaluacionFisioterapia[0].FirmaDoctorFisioterapia);
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
    document.getElementById("SaveFisioterapia").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdFisioterapia = 0;
        if (IsUpdate) {
            IdFisioterapia = IdFisioterapiaData;

        }

    }
    const file = document.querySelector('#AnexosFisioterapia').files[0];
    ObjFisioterapiaDeportiva = {
        FisioterapiaDeport: {

            IdFisioterapia: IdFisioterapia,
            FechaFisioter: $('#FechaFisioter').val(),
            CodFisioterapi: $('#CodFisioterapi').val(),
            ReportaLesion: $('#ReportaLesion').val(),
            AntecedentesLesion: $('#AntecedentesLesion').val(),
            CualLesion: $('#CualLesion').val(),
            LesionActual: $('#LesionActual').val(),
            NumeroReLesiones: $('#NumeroReLesiones').val(),
            TratamientoLesion: $('#TratamientoLesion').val(),
            HuesoLesion: $('#HuesoLesion').val(),
            LigamentoLesion: $('#LigamentoLesion').val(),
            TendonLesion: $('#TendonLesion').val(),
            MusculoLesion: $('#MusculoLesion').val(),
            CabezaLesion: $('#CabezaLesion').val(),
            ColumnaLesion: $('#ColumnaLesion').val(),
            HombroLesion: $('#HombroLesion').val(),
            CodoLesion: $('#CodoLesion').val(),
            MuñecamanoLesion: $('#MuñecamanoLesion').val(),
            CaderaLesion: $('#CaderaLesion').val(),
            RodillaLesion: $('#RodillaLesion').val(),
            CuelloPieLesion: $('#CuelloPieLesion').val(),
            AnexosFisioterapia: file == undefined ? "" : await toBase64(file),
            NumIdentificacion: $('#Cedula').val(),
            IdFisioterapia: IdFisioterapiaData,
            IdCitaMedica: IdCitaMedica,


        },//End obj MedicinaDeportiva
        AntecedentesFisioDeport: {

            IdAntecedentesfisi: IdAntecedentesfisi,
            MmssRealDer: $('#MmssRealDer').val(),
            MmssRealizq: $('#MmssRealizq').val(),
            AparenteMmssDer: $('#AparenteMmssDer').val(),
            AparenteMmssIzq: $('#AparenteMmssIzq').val(),
            RealMmiiDer: $('#RealMmiiDer').val(),
            RealMmiiIzq: $('#RealMmiiIzq').val(),
            AparenteMmiiDer: $('#AparenteMmiiDer').val(),
            AparenteMmiiIzq: $('#AparenteMmiiIzq').val(),
            ObservacionesPosturaFisio: $('#ObservacionesPosturaFisio').val(),
            BalanceoOjosAbiertos2: $('#BalanceoOjosAbiertos2').val(),
            BalanceoOjosAbiertos1: $('#BalanceoOjosAbiertos1').val(),
            BalanceoOjosAbiertos0: $('#BalanceoOjosAbiertos0').val(),
            BalanceoOjosAbiertosObservaciones: $('#BalanceoOjosAbiertosObservaciones').val(),
            BalanceoOjosCerrados2: $('#BalanceoOjosCerrados2').val(),
            BalanceoOjosCerrados1: $('#BalanceoOjosCerrados1').val(),
            BalanceoOjosCerrados0: $('#BalanceoOjosCerrados0').val(),
            BalanceoOjosCerradosObservaciones: $('#BalanceoOjosCerradosObservaciones').val(),
            FlexibilidadFisioterapia: $('#FlexibilidadFisioterapia').val(),
            IdFisioterapia: $('#IdFisioterapia').val(),


        },

        EvolucionFisioDeport: {


            IdTratamientofisio: IdTratamientofisio,
            Sentadilla3: $('#Sentadilla3').val(),
            Sentadilla2: $('#Sentadilla2').val(),
            Sentadilla1: $('#Sentadilla1').val(),
            Sentadilla0: $('#Sentadilla0').val(),
            PasosValla3: $('#PasosValla3').val(),
            PasosValle2: $('#PasosValle2').val(),
            PasosValle1: $('#PasosValle1').val(),
            PasosValle0: $('#PasosValle0').val(),
            TijeraLinea3: $('#TijeraLinea3').val(),
            TijeraLinea2: $('#TijeraLinea2').val(),
            TijeraLinea1: $('#TijeraLinea1').val(),
            TijeraLinea0: $('#TijeraLinea0').val(),
            HombroActividad3: $('#HombroActividad3').val(),
            HombroActividad2: $('#HombroActividad2').val(),
            HombroActividad1: $('#HombroActividad1').val(),
            HombroActividad0: $('#HombroActividad0').val(),
            Pierna3: $('#Pierna3').val(),
            Pierna2: $('#Pierna2').val(),
            Pierna1: $('#Pierna1').val(),
            Pierna0: $('#Pierna0').val(),
            Pulgares3: $('#Pulgares3').val(),
            Pulgares2: $('#Pulgares2').val(),
            Pulgares1: $('#Pulgares1').val(),
            Pulgares0: $('#Pulgares0').val(),
            Tronco3: $('#Tronco3').val(),
            Tronco2: $('#Tronco2').val(),
            Tronco1: $('#Tronco1').val(),
            Tronco0: $('#Tronco0').val(),
            Planchas3: $('#Planchas3').val(),
            Planchas2: $('#Planchas2').val(),
            Planchas1: $('#Planchas1').val(),
            Planchas0: $('#Planchas0').val(),
            Sumatoria3: $('#Sumatoria3').val(),
            Sumatoria2: $('#Sumatoria2').val(),
            Sumatoria1: $('#Sumatoria1').val(),
            Sumatoria0: $('#Sumatoria0').val(),
            FlexoresTronco: $('#FlexoresTronco').val(),
            FlexoresPlancha: $('#FlexoresPlancha').val(),
            FlexoresColumna: $('#FlexoresColumna').val(),
            FlexoresRecta: $('#FlexoresRecta').val(),
            ObservacionesGlobal: $('#ObservacionesGlobal').val(),
            FechaTratamiento: $('#FechaTratamiento').val(),

        },

        FisioterapiaEvaluacionDeport: {

            IdEvaluacion: IdEvaluacion,
            LesionEvaluacion: $('#LesionEvaluacion').val(),
            CualLesionEvaluacion: $('#CualLesionEvaluacion').val(),
            MmssSimetria: $('#MmssSimetria').val(),
            MmssAsimetria: $('#MmssAsimetria').val(),
            MmiiSimetria: $('#MmiiSimetria').val(),
            MmiiAsimetria: $('#MmiiAsimetria').val(),
            DescripcionAsimetria: $('#DescripcionAsimetria').val(),
            DescripcionSimetria: $('#DescripcionSimetria').val(),
            PosturaEvaluacionFisio: $('#PosturaEvaluacionFisio').val(),
            TrotePuesto: $('#TrotePuesto').val(),
            GeneroFisioterapia: $('#GeneroFisioterapia').val(),
            SuperiosTest: $('#SuperiosTest').val(),
            ExcelenteTest: $('#ExcelenteTest').val(),
            BuenoTest: $('#BuenoTest').val(),
            Promediotest: $('#Promediotest').val(),
            DeficienteTest: $('#DeficienteTest').val(),
            PobreTest: $('#PobreTest').val(),
            MuyPobreTest: $('#MuyPobreTest').val(),
            SentadillaCali: $('#SentadillaCali').val(),
            TijeraCali: $('#TijeraCali').val(),
            HombroCali: $('#HombroCali').val(),
            PiernaCali: $('#PiernaCali').val(),
            TroncoCali: $('#TroncoCali').val(),
            PasoVallaCali: $('#PasoVallaCali').val(),
            EstabilidadCali: $('#EstabilidadCali').val(),
            TotalCali: $('#TotalCali').val(),
            SentadillaObs: $('#SentadillaObs').val(),
            TijeraObs: $('#TijeraObs').val(),
            HombroObs: $('#HombroObs').val(),
            PiernaObs: $('#PiernaObs').val(),
            TroncoObs: $('#TroncoObs').val(),
            PasoVallaObs: $('#PasoVallaObs').val(),
            EstabilidadObs: $('#EstabilidadObs').val(),
            TotalObs: $('#TotalObs').val(),
            ResistenciaF: $('#ResistenciaF').val(),
            ResistenciaM: $('#ResistenciaM').val(),
            Puentef: $('#Puentef').val(),
            PuenteM: $('#PuenteM').val(),
            ExtensoresF: $('#ExtensoresF').val(),
            ExtensoresM: $('#ExtensoresM').val(),
            PuenteDF: $('#PuenteDF').val(),
            PuenteDM: $('#PuenteDM').val(),
            PuenteIF: $('#PuenteIF').val(),
            PuenteIM: $('#PuenteIM').val(),
            ExcelenteEvaluacion: $('#ExcelenteEvaluacion').val(),
            MuyBuenoEvaluacion: $('#MuyBuenoEvaluacion').val(),
            BuenoEvaluacion: $('#BuenoEvaluacion').val(),
            RegularEvaluacion: $('#RegularEvaluacion').val(),
            MaloRegulacion: $('#MaloRegulacion').val(),
            CalificacionObs: $('#CalificacionObs').val(),
            RecomendacionesObs: $('#RecomendacionesObs').val(),
            FirmaDoctorFisioterapia: $('#FirmaDoctorFisioterapia').val(),
            NumIdentificacion: $('#Cedula').val(),

            TestSitGenero: $('#TestSitGenero').val(),
            TestSitSuperior: $('#TestSitSuperior').val(),
            TestSitExcelente: $('#TestSitExcelente').val(),
            TestSitBueno: $('#TestSitBueno').val(),
            TestSitPromedio: $('#TestSitPromedio').val(),
            TestSitDeficiente: $('#TestSitDeficiente').val(),
            TestSitPobre: $('#TestSitPobre').val(),
            TestSitMuyPobre: $('#TestSitMuyPobre').val(),

            TestSentadillaProfunda1: $('#TestSentadillaProfunda1').val(),
            TestSentadillaProfunda2: $('#TestSentadillaProfunda2').val(),
            TestPasodeValla1: $('#TestPasodeValla1').val(),
            TestPasodeValla2: $('#TestPasodeValla2').val(),
            TestTijeraLinea1: $('#TestTijeraLinea1').val(),
            TestTijeraLinea2: $('#TestTijeraLinea2').val(),
            TestHombro1: $('#TestHombro1').val(),
            TestHombro2: $('#TestHombro2').val(),
            TestMovilidadPierna1: $('#TestMovilidadPierna1').val(),
            TestMovilidadPierna2: $('#TestMovilidadPierna2').val(),
            TestPush1: $('#TestPush1').val(),
            TestPush2: $('#TestPush2').val(),
            TestEstabilidadTronco1: $('#TestEstabilidadTronco1').val(),
            TestEstabilidadTronco2: $('#TestEstabilidadTronco2').val(),
            //TestEstabilidadRotatoria1: $('#TestEstabilidadRotatoria1').val(),
            //TestEstabilidadRotatoria2: $('#TestEstabilidadRotatoria2').val(),
            TestSumarotia1: $('#TestSumarotia1').val(),
            TestSumarotia2: $('#TestSumarotia2').val(),
            TestObservaciones1: $('#TestObservaciones1').val(),
            TestObservaciones2: $('#TestObservaciones2').val(),
            TestFlexora1: $('#TestFlexora1').val(),
            TestFlexora2: $('#TestFlexora2').val(),
            TestPuente1: $('#TestPuente1').val(),
            TestPuente2: $('#TestPuente2').val(),
            TestResistencia1: $('#TestResistencia1').val(),
            TestResistencia2: $('#TestResistencia2').val(),
            TestPuenteLateral1: $('#TestPuenteLateral1').val(),
            TestPuenteLateral2: $('#TestPuenteLateral2').val(),
            TestCoreSumatoria1: $('#TestCoreSumatoria1').val(),
            TestCoreSumatoria2: $('#TestCoreSumatoria2').val(),
            TestCoreObservaciones1: $('#TestCoreObservaciones1').val(),
            TestCoreObservaciones2: $('#TestCoreObservaciones2').val(),
            TestCoreExcelente: $('#TestCoreExcelente').val(),
            TestCoreMuyBueno: $('#TestCoreMuyBueno').val(),
            TestCoreBueno: $('#TestCoreBueno').val(),
            TestCoreRegular: $('#TestCoreRegular').val(),
            TestCoreMalo: $('#TestCoreMalo').val(),
            /* IdEvaluacion: IdEvaluacionFisioterapiaData,*/

        },

    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/Fisioterapia/Actualizar', ObjFisioterapiaDeportiva, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/Fisioterapia/Agregar', ObjFisioterapiaDeportiva, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}

}


function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../Fisioterapia/ListaFisioterapiaDeportiva"
    }
}


function LimpiarFormulario() {
    $('#CodFisioterapi').val('')
    $('#CodFisioterapi').val('')
    $('#Lesion').val('')
    $('#cual').val('')
    $('#NumIdentificacion').val('')
    $('#IdAntecedentesfisi').val('')
    $('#Patologicos').val('')
    $('#Quirurgicos').val('')
    $('#Traumaticos').val('')
    $('#Farmacologicos').val('')
    $('#Familiares').val('')
    $('#DiagnosticoMedico').val('')
    $('#MotivoConsultar').val('')
    $('#DolorFisio').val('')
    $('#EdemaFisio').val('')
    $('#AlteradaFisio').val('')
    $('#NoAlteradaFisio').val('')
    $('#Screenmifisio').val('')
    $('#DesempeñoMuscularFisio').val('')
    $('#PosturaFisio').val('')
    $('#ValoracionInicial').val('')
    $('#FechaTratamiento').val('')
    $('#PlanTrata').val('')
    $('#Evolucion').val('')

}


function RecargarDataUpdate(data) {
    SwalErrorMsj(data.mensaje, '/Fisioterapia/GetListFisioterapiaDeportiva');
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
