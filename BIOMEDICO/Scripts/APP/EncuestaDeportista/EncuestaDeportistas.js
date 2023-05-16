var ObjEncuestaDeportistas = {
    EncuestaDeportistasDeport: {},//{objetos} llaves y [array] corchetes
    EncuestaFamiliarDepor: {},
    EncuestaSocioeconomicaDepor: {}
}

//var validadorFormDeportista = [];
var IsUpdate = false;
var IdEncuestaDeportistaData = 0;
var IdEncuestaFamiliar = 0;
var IdEncuestaSocieconomica = 0;
var VerDetalles = 'NO';
$(document).ready(function () {//FUNCION INICIAL;
    IdEncuestaDeportistaData = getQueryVariable('Id');
    let cedulaPaciente = getQueryVariable('Ced');
    IdCitaMedica = getQueryVariable('IdReg');
    let Actualizar = getQueryVariable('IsUpdate');
    VerDetalles = getQueryVariable('Viewdetail');
    if (IdEncuestaDeportistaData > 0) {
        IsUpdate = true;
    }

    if (cedulaPaciente > 0) {
        $('#Cedula').val(cedulaPaciente);
        CargarInfoinicial();
    }
    //esconde_elemento('ImagenNutricionDeport')
    if (VerDetalles == "SI") {
        $('#SaveEncuestaDeportistas').html('Atras')
        Get_Data(LlenarCampos, '/EncuestaDeportistas/GetEncuestaDeportistasDeportById?IdEncuestaDeportista=' + IdEncuestaDeportistaData);
    //    visible_elemento('ImagenNutricionDeport')
    }

    if (IsUpdate && VerDetalles == 0) {
        $('#SaveEncuestaDeportistas').html('Actualizar')
        Get_Data(LlenarCampos, '/EncuestaDeportistas/GetEncuestaDeportistasDeportById?IdEncuestaDeportista=' + IdEncuestaDeportistaData);
    }
});

//function CargarInfoinicial() {
//    var Valuecedula = $('#Cedula').val();
//    Get_Data(LlenarcamposInicial, '/EncuestaDeportistas/BuscarDeportista?cedula=' + Valuecedula)
//}

//function LlenarcamposInicial(data) {
//    $('#PrimerNombre').val(data.PrimerNombre)
//    $('#SegundoNombre').val(data.SegundoNombre)
//    $('#PrimerApellido').val(data.PrimerApellido)
//    $('#SegundoApellido').val(data.SegundoApellido)
//    $('#Edad').val(data.Edad)
//    $('#Deporte').val(data.Deporte)
//    $('#Genero').val(data.Genero)

//}


function LlenarCampos(data) {
    //console.log(JSONDateconverter(data.objeto.FechaRegistro));
    //var FechaReg = new Date(JSONDateconverter(data.objeto.FechaRegistro));
    //FechaRegParceMes = FechaReg.getMonth() + 1;
    //FechaRegParcedia = FechaReg.getDate();
    //FechaRegParce = FechaRegParceMes + "_" + FechaRegParcedia;
    //console.log(FechaRegParce)
    //let rutaimg = SetUrlForQueryLocal('/images/EncuestaDeportistas/' + data.objeto.NumIdentificacion + ".jpg");
    //document.getElementById("ImagenDeport") = rutaimg;
    //$("#ImagenNutricionDeport").attr("src", rutaimg);
    $('#IdentificacionDeportista').val(data.objeto.IdentificacionDeportista);
    $('#PrimerNombreDepor').val(data.objeto.PrimerNombreDepor);
    $('#SegundonombreDepor').val(data.objeto.SegundonombreDepor);
    $('#PrimerApellidoDepor').val(data.objeto.PrimerApellidoDepor);
    $('#SegundoApellidoDepor').val(data.objeto.SegundoApellidoDepor);
    $('#FechaDepor').val(data.objeto.FechaDepor != null ? JSONDateconverter(data.objeto.FechaDepor) : '');
    /*$('#FechaDepor').val(data.objeto.FechaDepor);*/
    $('#EdadDepor').val(data.objeto.EdadDepor);
    $('#DireccionDepor').val(data.objeto.DireccionDepor);
    $('#BarrioDepor').val(data.objeto.BarrioDepor);
    $('#DondeNacistesDepor').val(data.objeto.DondeNacistesDepor);
    $('#NacionalidadDepor').val(data.objeto.NacionalidadDepor);
    $('#HospitalNacisteDepor').val(data.objeto.HospitalNacisteDepor);
    $('#DisciplinaDeportivaDepor').val(data.objeto.DisciplinaDeportivaDepor);
    $('#PracticaDeporteDepor').val(data.objeto.PracticaDeporteDepor);
    $('#CategoriaDepor').val(data.objeto.CategoriaDepor);
    $('#TelefonoDepor').val(data.objeto.TelefonoDepor);
    $('#TienesTelefono').val(data.objeto.TienesTelefono);
    $('#CadaCuantoTelefono').val(data.objeto.CadaCuantoTelefono);
    $('#TienesRedesSociales').val(data.objeto.TienesRedesSociales);
    $('#CualesRedes').val(data.objeto.CualesRedes);
    $('#Facebook').val(data.objeto.Facebook);
    $('#Instagram').val(data.objeto.Instagram);
    $('#Twitter').val(data.objeto.Twitter);
    $('#CuantasPersonas').val(data.objeto.CuantasPersonas);
    $('#ConocidosAmigos').val(data.objeto.ConocidosAmigos);
    $('#CuantosTotalAmigos').val(data.objeto.CuantosTotalAmigos);
    $('#MenoresCasa').val(data.objeto.MenoresCasa);
    $('#AgradaEntrenador').val(data.objeto.AgradaEntrenador);
    $('#MayoresCasa').val(data.objeto.MayoresCasa);
    $('#MaltratoVerbalEntrenador').val(data.objeto.MaltratoVerbalEntrenador);
    $('#HermanosTienes').val(data.objeto.HermanosTienes);
    $('#CuantasHorasEntrenas').val(data.objeto.CuantasHorasEntrenas);
    $('#InstalacionesEntrenas').val(data.objeto.InstalacionesEntrenas);
    $('#NoteGustaInstlaciones').val(data.objeto.NoteGustaInstlaciones);
    $('#OtrosDeportes').val(data.objeto.OtrosDeportes);
    $('#OtrosGustosDeportistas').val(data.objeto.OtrosGustosDeportistas);
    $('#AguaDiaria').val(data.objeto.AguaDiaria);
    $('#HorasEntrenamiento').val(data.objeto.HorasEntrenamiento);
    $('#TegustaPublico').val(data.objeto.TegustaPublico);
    $('#NotegustaHablarPublico').val(data.objeto.NotegustaHablarPublico);
    $('#VivesPadres').val(data.objeto.VivesPadres);
    $('#ConquienVives').val(data.objeto.ConquienVives);
    $('#VivesPension').val(data.objeto.VivesPension);
    $('#CuantoPagas').val(data.objeto.CuantoPagas);
    $('#ViveMadre').val(data.objeto.ViveMadre);
    $('#VivePapa').val(data.objeto.VivePapa);
    $('#NombreMadreDepor').val(data.objeto.NombreMadreDepor);
    $('#NombrePadreDepor').val(data.objeto.NombrePadreDepor);
    $('#TrabajoPadreDepor').val(data.objeto.TrabajoPadreDepor);
    $('#TrabajoMadreDepor').val(data.objeto.NombreMadreDepor);
    $('#ProblemasPadre').val(data.objeto.ProblemasPadre);
    $('#ProblemasMadre').val(data.objeto.ProblemasMadre);
    $('#DependeEconomicamente').val(data.objeto.DependeEconomicamente);
    $('#GuantoGana').val(data.objeto.GuantoGana); 
    $('#VictimaConflicto').val(data.objeto.VictimaConflicto); 
    $('#TipoEtnia').val(data.objeto.TipoEtnia); 
    $('#GeneroDepor').val(data.objeto.GeneroDepor); 
    $('#NivelEstudio').val(data.objeto.NivelEstudio); 
    $('#EstadoEconomico').val(data.objeto.EstadoEconomico); 
    $('#ComunaDepor').val(data.objeto.ComunaDepor); 
     
      
    
    
    ////DATOS ANTECEDENTES FISIOTERAPIA
    
    IdEncuestaFamiliar = data.objeto.EncuestaFamiliar[0].IdEncuestaFamiliar;
    $('#TrabajaPersonaVives').val(data.objeto.EncuestaFamiliar[0].TrabajaPersonaVives);
    $('#CuantoGanaPersona').val(data.objeto.EncuestaFamiliar[0].CuantoGanaPersona);
    $('#Problemaspersonasvives').val(data.objeto.EncuestaFamiliar[0].Problemaspersonasvives);
    $('#ProblemasMiembroFamilia').val(data.objeto.EncuestaFamiliar[0].ProblemasMiembroFamilia);
    $('#FamiliarDiscapacidad').val(data.objeto.EncuestaFamiliar[0].FamiliarDiscapacidad);
    $('#PersonasAgresivas').val(data.objeto.EncuestaFamiliar[0].PersonasAgresivas);
    $('#FamiliaresAncianos').val(data.objeto.EncuestaFamiliar[0].FamiliaresAncianos);
    $('#FamiliaresGestacion').val(data.objeto.EncuestaFamiliar[0].FamiliaresGestacion);
    $('#FamiliaresDeportistas').val(data.objeto.EncuestaFamiliar[0].FamiliaresDeportistas);
    $('#TienesDiscapacidad').val(data.objeto.EncuestaFamiliar[0].TienesDiscapacidad);
    $('#TienesAyudaTecnica').val(data.objeto.EncuestaFamiliar[0].TienesAyudaTecnica);
    $('#Bullying').val(data.objeto.EncuestaFamiliar[0].Bullying);
    $('#OrientacionSexual').val(data.objeto.EncuestaFamiliar[0].OrientacionSexual);
    $('#TienesPareja').val(data.objeto.EncuestaFamiliar[0].TienesPareja);
    $('#BullyingOrientacionSexual').val(data.objeto.EncuestaFamiliar[0].BullyingOrientacionSexual);
    $('#HasTenidoDepresion').val(data.objeto.EncuestaFamiliar[0].HasTenidoDepresion);
    $('#SalidasFiestas').val(data.objeto.EncuestaFamiliar[0].SalidasFiestas);
    $('#BebesAlcohol').val(data.objeto.EncuestaFamiliar[0].BebesAlcohol);
    $('#SustanciasPsicoactivas').val(data.objeto.EncuestaFamiliar[0].SustanciasPsicoactivas);
    $('#FamiliaresPsicoactivas').val(data.objeto.EncuestaFamiliar[0].FamiliaresPsicoactivas);
    $('#SufresDepresion').val(data.objeto.EncuestaFamiliar[0].SufresDepresion);
    $('#TienesVacunaCovid19').val(data.objeto.EncuestaFamiliar[0].TienesVacunaCovid19);
    $('#EpisodiosTrastornales').val(data.objeto.EncuestaFamiliar[0].EpisodiosTrastornales);
    $('#CualesEpisodios').val(data.objeto.EncuestaFamiliar[0].CualesEpisodios);
    $('#VaPsicologo').val(data.objeto.EncuestaFamiliar[0].VaPsicologo);
    $('#Estudias').val(data.objeto.EncuestaFamiliar[0].Estudias);
    $('#CualEstudio').val(data.objeto.EncuestaFamiliar[0].CualEstudio);
    $('#Semestre').val(data.objeto.EncuestaFamiliar[0].Semestre);
    $('#Grado').val(data.objeto.EncuestaFamiliar[0].Grado);
    $('#CualGrado').val(data.objeto.EncuestaFamiliar[0].CualGrado);
    $('#QueEstudias').val(data.objeto.EncuestaFamiliar[0].QueEstudias);
    $('#QueteGustariaEstudiar').val(data.objeto.EncuestaFamiliar[0].QueteGustariaEstudiar);
    $('#ComidasDiarias').val(data.objeto.EncuestaFamiliar[0].ComidasDiarias);
    $('#DuermesDiario').val(data.objeto.EncuestaFamiliar[0].DuermesDiario);
    $('#Verduras').val(data.objeto.EncuestaFamiliar[0].Verduras);
    $('#Frutas').val(data.objeto.EncuestaFamiliar[0].Frutas);
    $('#Cocina').val(data.objeto.EncuestaFamiliar[0].Cocina);
    $('#MejorAmigos').val(data.objeto.EncuestaFamiliar[0].MejorAmigos);
    $('#SufresAlergias').val(data.objeto.EncuestaFamiliar[0].SufresAlergias);
    $('#SufresEnfermedad').val(data.objeto.EncuestaFamiliar[0].SufresEnfermedad);
    $('#TratamientoEnfermedad').val(data.objeto.EncuestaFamiliar[0].TratamientoEnfermedad);
    $('#TransporteEntrenos').val(data.objeto.EncuestaFamiliar[0].TransporteEntrenos);
    $('#TiempoSitioEntreno').val(data.objeto.EncuestaFamiliar[0].TiempoSitioEntreno);
    $('#CuantasVecesMovilizacion').val(data.objeto.EncuestaFamiliar[0].CuantasVecesMovilizacion);
    $('#ParquesEntrenar').val(data.objeto.EncuestaFamiliar[0].ParquesEntrenar);


        //DATOS EVOLUCION FISIOTERAPIA


    IdEncuestaSocieconomica = data.objeto.EncuestaSocioeconomica[0].IdTratamientofisio
    $('#Acueducto').val(data.objeto.EncuestaSocioeconomica[0].Acueducto);
    $('#UniformeAdecuado').val(data.objeto.EncuestaSocioeconomica[0].UniformeAdecuado);
    $('#TrasportePublico').val(data.objeto.EncuestaSocioeconomica[0].TrasportePublico);
    $('#VecinosAmigables').val(data.objeto.EncuestaSocioeconomica[0].VecinosAmigables);
    $('#ProblemasVecinos').val(data.objeto.EncuestaSocioeconomica[0].ProblemasVecinos);
    $('#CasaPropia').val(data.objeto.EncuestaSocioeconomica[0].CasaPropia);
    $('#PagasArriedno').val(data.objeto.EncuestaSocioeconomica[0].PagasArriedno);
    $('#CuantoArriendo').val(data.objeto.EncuestaSocioeconomica[0].CuantoArriendo);
    $('#ServiciosCasa').val(data.objeto.EncuestaSocioeconomica[0].ServiciosCasa);
    $('#CuantosCuartos').val(data.objeto.EncuestaSocioeconomica[0].CuantosCuartos);
    $('#CuantosBaños').val(data.objeto.EncuestaSocioeconomica[0].CuantosBaños);
    $('#TienesComputadora').val(data.objeto.EncuestaSocioeconomica[0].TienesComputadora);
    $('#TienesAire').val(data.objeto.EncuestaSocioeconomica[0].TienesAire);
    $('#CuantosAires').val(data.objeto.EncuestaSocioeconomica[0].CuantosAires);
    $('#CompartesCuarto').val(data.objeto.EncuestaSocioeconomica[0].CompartesCuarto);
    $('#CuantosCompartescuarto').val(data.objeto.EncuestaSocioeconomica[0].CuantosCompartescuarto);
    $('#TienesCama').val(data.objeto.EncuestaSocioeconomica[0].TienesCama);
    $('#TienesNeveraCasa').val(data.objeto.EncuestaSocioeconomica[0].TienesNeveraCasa);
    $('#TienesMascota').val(data.objeto.EncuestaSocioeconomica[0].TienesMascota);
    $('#TipoMascota').val(data.objeto.EncuestaSocioeconomica[0].TipoMascota);
    $('#TeGustaMusica').val(data.objeto.EncuestaSocioeconomica[0].TeGustaMusica);
    $('#SabesBailar').val(data.objeto.EncuestaSocioeconomica[0].SabesBailar);
    $('#DedicasTiempo').val(data.objeto.EncuestaSocioeconomica[0].DedicasTiempo);
    $('#EresFeliz').val(data.objeto.EncuestaSocioeconomica[0].EresFeliz);

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
    document.getElementById("SaveEncuestaDeportistas").disabled = true;

    // if (validadorFormMedicinaDeportiva.form()) {
    if (VerDetalles == "SI") {
        Atras();
    }
    else {
        var test = $('#NumIde').val();
        var IdEncuestaDeportista = 0;
        if (IsUpdate) {
            IdEncuestaDeportista = IdEncuestaDeportistaData;

        }

    }
    //const file = document.querySelector('#AnexosNutricion').files[0];
    ObjEncuestaDeportistas = {
        EncuestaDeportistasDeport: {

            IdEncuestaDeportista: IdEncuestaDeportista,
            IdentificacionDeportista: $('#IdentificacionDeportista').val(),
            PrimerNombreDepor: $('#PrimerNombreDepor').val(),
            SegundonombreDepor: $('#SegundonombreDepor').val(),
            PrimerApellidoDepor: $('#PrimerApellidoDepor').val(),
            SegundoApellidoDepor: $('#SegundoApellidoDepor').val(),
            FechaDepor: $('#FechaDepor').val(),
            EdadDepor: $('#EdadDepor').val(),
            DireccionDepor: $('#DireccionDepor').val(),
            BarrioDepor: $('#BarrioDepor').val(),
            DondeNacistesDepor: $('#DondeNacistesDepor').val(),
            NacionalidadDepor: $('#NacionalidadDepor').val(),
            HospitalNacisteDepor: $('#HospitalNacisteDepor').val(),
            DisciplinaDeportivaDepor: $('#DisciplinaDeportivaDepor').val(),
            PracticaDeporteDepor: $('#PracticaDeporteDepor').val(),
            CategoriaDepor: $('#CategoriaDepor').val(),
            TelefonoDepor: $('#TelefonoDepor').val(),
            TienesTelefono: $('#TienesTelefono').val(),
            CadaCuantoTelefono: $('#CadaCuantoTelefono').val(),
            TienesRedesSociales: $('#TienesRedesSociales').val(),
            CualesRedes: $('#CualesRedes').val() + "_" + $('#CualesRedes2').val()
                + "_" + $('#CualesRedes3').val() + "_" + $('#CualesRedes4').val() + "_" + $('#CualesRedes5').val(),
            Facebook: $('#Facebook').val(),
            Instagram: $('#Instagram').val(),
            Twitter: $('#Twitter').val(),
            CuantasPersonas: $('#CuantasPersonas').val(),
            ConocidosAmigos: $('#ConocidosAmigos').val(),
            CuantosTotalAmigos: $('#CuantosTotalAmigos').val(),
            MenoresCasa: $('#MenoresCasa').val(),
            AgradaEntrenador: $('#AgradaEntrenador').val(),
            MayoresCasa: $('#MayoresCasa').val(),
            MaltratoVerbalEntrenador: $('#MaltratoVerbalEntrenador').val(),
            HermanosTienes: $('#HermanosTienes').val(),
            CuantasHorasEntrenas: $('#CuantasHorasEntrenas').val(),
            InstalacionesEntrenas: $('#InstalacionesEntrenas').val(),
            NoteGustaInstlaciones: $('#NoteGustaInstlaciones').val(),
            OtrosDeportes: $('#OtrosDeportes').val(),
            OtrosGustosDeportistas: $('#OtrosGustosDeportistas').val(),
            AguaDiaria: $('#AguaDiaria').val(),
            HorasEntrenamiento: $('#HorasEntrenamiento').val(),
            TegustaPublico: $('#TegustaPublico').val(),
            NotegustaHablarPublico: $('#NotegustaHablarPublico').val(),
            VivesPadres: $('#VivesPadres').val(),
            ConquienVives: $('#ConquienVives').val(),
            VivesPension: $('#VivesPension').val(),
            CuantoPagas: $('#CuantoPagas').val(),
            ViveMadre: $('#ViveMadre').val(),
            VivePapa: $('#VivePapa').val(),
            NombreMadreDepor: $('#NombreMadreDepor').val(),
            NombrePadreDepor: $('#NombrePadreDepor').val(),
            TrabajoPadreDepor: $('#TrabajoPadreDepor').val(),
            TrabajoMadreDepor: $('#TrabajoMadreDepor').val(),
            ProblemasPadre: $('#ProblemasPadre').val(),
            ProblemasMadre: $('#ProblemasMadre').val(),
            DependeEconomicamente: $('#DependeEconomicamente').val(),
            GuantoGana: $('#GuantoGana').val(),

            VictimaConflicto: $('#VictimaConflicto').val(),
            TipoEtnia: $('#TipoEtnia').val(),
            GeneroDepor: $('#GeneroDepor').val(),
            NivelEstudio: $('#NivelEstudio').val(),
            EstadoEconomico: $('#EstadoEconomico').val(),
            ComunaDepor: $('#ComunaDepor').val(),

            //AnexosNutricion: file == undefined ? "" : await toBase64(file),
           
            IdEncuestaDeportista: IdEncuestaDeportistaData,
        },//End obj MedicinaDeportiva
        EncuestaFamiliarDepor: {

            IdEncuestaFamiliar: IdEncuestaFamiliar,
            TrabajaPersonaVives: $('#TrabajaPersonaVives').val(),
            CuantoGanaPersona: $('#CuantoGanaPersona').val(),
            Problemaspersonasvives: $('#Problemaspersonasvives').val(),
            ProblemasMiembroFamilia: $('#ProblemasMiembroFamilia').val(),
            FamiliarDiscapacidad: $('#FamiliarDiscapacidad').val(),
            PersonasAgresivas: $('#PersonasAgresivas').val(),
            FamiliaresAncianos: $('#FamiliaresAncianos').val(),
            FamiliaresGestacion: $('#FamiliaresGestacion').val(),
            FamiliaresDeportistas: $('#FamiliaresDeportistas').val(),
            TienesDiscapacidad: $('#TienesDiscapacidad').val(),
            TienesAyudaTecnica: $('#TienesAyudaTecnica').val(),
            Bullying: $('#Bullying').val(),
            OrientacionSexual: $('#OrientacionSexual').val(),
            TienesPareja: $('#TienesPareja').val(),
            BullyingOrientacionSexual: $('#BullyingOrientacionSexual').val(),
            HasTenidoDepresion: $('#HasTenidoDepresion').val(),
            SalidasFiestas: $('#SalidasFiestas').val(),
            BebesAlcohol: $('#BebesAlcohol').val(),
            SustanciasPsicoactivas: $('#SustanciasPsicoactivas').val(),
            FamiliaresPsicoactivas: $('#FamiliaresPsicoactivas').val(),
            SufresDepresion: $('#SufresDepresion').val(),
            TienesVacunaCovid19: $('#TienesVacunaCovid19').val(),
            EpisodiosTrastornales: $('#EpisodiosTrastornales').val(),
            CualesEpisodios: $('#CualesEpisodios').val(),
            VaPsicologo: $('#VaPsicologo').val(),
            Estudias: $('#Estudias').val(),
            CualEstudio: $('#CualEstudio').val(),
            Semestre: $('#Semestre').val(),
            Grado: $('#Grado').val(),
            CualGrado: $('#CualGrado').val(),
            QueEstudias: $('#QueEstudias').val(),
            QueteGustariaEstudiar: $('#QueteGustariaEstudiar').val(),
            ComidasDiarias: $('#ComidasDiarias').val(),
            DuermesDiario: $('#DuermesDiario').val(),
            Verduras: $('#Verduras').val(),
            Frutas: $('#Frutas').val(),
            Cocina: $('#Cocina').val(),
            MejorAmigos: $('#MejorAmigos').val(),
            SufresAlergias: $('#SufresAlergias').val(),
            SufresEnfermedad: $('#SufresEnfermedad').val(),
            TratamientoEnfermedad: $('#TratamientoEnfermedad').val(),
             TransporteEntrenos: $('#TransporteEntrenos').val(),
            TiempoSitioEntreno: $('#TiempoSitioEntreno').val(),
            CuantasVecesMovilizacion: $('#CuantasVecesMovilizacion').val(),
            ParquesEntrenar: $('#ParquesEntrenar').val(),
         
            
        },

        EncuestaSocioeconomicaDepor: {


            IdEncuestaSocieconomica: IdEncuestaSocieconomica,
          
            Acueducto: $('#Acueducto').val(),
            UniformeAdecuado: $('#UniformeAdecuado').val(),
            TrasportePublico: $('#TrasportePublico').val(),
            VecinosAmigables: $('#VecinosAmigables').val(),
            ProblemasVecinos: $('#ProblemasVecinos').val(),
            CasaPropia: $('#CasaPropia').val(),
            PagasArriedno: $('#PagasArriedno').val(),
            CuantoArriendo: $('#CuantoArriendo').val(),
            ServiciosCasa: $('#ServiciosCasa').val() + "_" + $('#ServiciosCasa2').val()
                + "_" + $('#ServiciosCasa3').val() + "_" + $('#ServiciosCasa4').val() + "_" + $('#ServiciosCasa5').val(),
            CuantosCuartos: $('#CuantosCuartos').val(),
            CuantosBaños: $('#CuantosBaños').val(),
            TienesComputadora: $('#TienesComputadora').val(),
            TienesAire: $('#TienesAire').val(),
            CuantosAires: $('#CuantosAires').val(),
            CompartesCuarto: $('#CompartesCuarto').val(),
            CuantosCompartescuarto: $('#CuantosCompartescuarto').val(),
            TienesCama: $('#TienesCama').val(),
            TienesNeveraCasa: $('#TienesNeveraCasa').val(),
            TienesMascota: $('#TienesMascota').val(),
            TipoMascota: $('#TipoMascota').val(),
            TeGustaMusica: $('#TeGustaMusica').val(),
            SabesBailar: $('#SabesBailar').val(),
            DedicasTiempo: $('#DedicasTiempo').val(),
            EresFeliz: $('#EresFeliz').val(),
            Fotografico: $('#Fotografico').val(),
 

        }
    }
    let id = 10;

    if (IsUpdate) {
        Save_Data(ActualizarVista, '/EncuestaDeportistas/Actualizar', ObjEncuestaDeportistas, 'Actualizacion');
    }
    else {
        Save_Data(ActualizarVista, '/EncuestaDeportistas/Agregar', ObjEncuestaDeportistas, 'Guardado');

        // LimpiarFormulario()
    }

    //} else {
    //    SwalErrorMsj("No ingreso todos los campos por favor verifique");
    //}

}


function ActualizarVista(data) {
    if (!data.Error) {
        window.location.href = "../EncuestaDeportistas/ListaEncuestaDeportistas"
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
    SwalErrorMsj(data.mensaje, '/EncuestaDeportistas/GetListEncuestaDeportistas');
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});