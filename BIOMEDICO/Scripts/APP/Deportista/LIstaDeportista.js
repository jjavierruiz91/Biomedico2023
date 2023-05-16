var tablaDeportista = [];
$(document).ready(function () {

    RenderTable('datatable-Deportista', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
        58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
        87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
        112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134,
        135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158,
        159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182,
        183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207,
        208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232,
        233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257,
        258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 278, 279, 280, 281, 282, 283,
        284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309,
        310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333,334


        ], null, {
        "paging": true,
        "ordering": false,
        "info": true,
        "searching": true,

        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> Excel ",
                filename: "CitasMedicas",
                titleAttr: 'Excel',
            },
            //{
            //    extend: 'pdfHtml5',
            //    text: " <b>&ensp;<i class=' icon-download4 position-left'></i></b> PDF ",
            //    filename: "CitasMedicas",
            //    titleAttr: 'Excel',
            //},

        ]
    });

    tablaDeportista = $('#datatable-Deportista').DataTable();
    Get_Data(CargarTabla, '/Deportista/GetListdEportista')
    
});

var ListaNutriciones = [];
var ListaSicologia = [];
var ListaFisioterapia = [];
var ListaMedi = [];

function CargarTabla(data) {
    tablaDeportista.clear().draw();
    let DataDepor = data.objeto.DepoListResul;
    ListaNutriciones = data.objeto.FichaTecnicaNutri;
    ListaSicologia = data.objeto.FichaSico;
    ListaFisioterapia = data.objeto.FichaFisio;
    ListaMedi = data.objeto.FichaMedicina;
    console.log(DataDepor);
    $.each(DataDepor, function (index, item) {
        var NutriDEport = ListaNutriciones.find(w => w.NumIdentificacion == item.NumIdentificacion);
        var AntecedentesNutri = '';
        var FamiliaresNutri = '';
        var PersonalesNutri = '';
        var FarmacologicosNutri = '';
        var GinecologicoNutri = '';
        var SueñoNutri = '';
        var PielNutri = '';
        var ApetitoNutri = '';
        var FracturaNutri = '';
        var AspectoFisicoNutri = '';
        var PieNutri = '';
        var TiempoRecuperacionNutri = '';
        var BioquimicoNutri = '';
        var HidratacionNutri = '';
        var HorarioActividadNutri = '';

        var DesayunoNutri = '';
        var MediaMañanaNutri = '';
        var AlmuerzoNutri = '';
        var MediaTardeNutri = '';
        var CenaNutri = '';
        var AlergicoNutri = '';
        var SuplementacionNutri = '';
        var AlimentoNoDeseados = '';
        var EdadNutri = '';
        var PesoNutri = '';
        var TallaNutri = '';
        var ImcNutri = '';
        var EscapularNutri = '';
        var TricepsNutri = '';
        var BicepsNutri = '';
        var AbdomenNutri = '';
        var MusloNutri = '';
        var PiernaNutri = '';
        var BrazosNutrii = '';
        var AntebrazoNutrii = '';
        var MuñecaNutrii = '';
        var PechoNutrii = '';
        var CinturaNutrii = '';
        var CaderaNutrii = '';
        var MusloSuperiorNutrii = '';
        var MusloMedioNutrii = '';
        var PiernaPerimetroNutrii = '';
        var TobilloPerimetroNutrii = '';

        var HumeroNutri = '';
        var MuñecaHumeroNutri = '';
        var FermorHumeroNutri = '';
        var ImcNutri = '';
        var GrasaNutri = '';
        var MusculosNutri = '';
        var HuesosNutri = '';
        var ResidualesNutri = '';
        var PesosGrasosNutri = '';
        var PesosMusculosNutri = '';
        var PesoResiducalesNutri = '';
        var DiagnosticoNutri = '';
        var ProximaCitaNutri = '';
        /*var FirmaDoctorNutri = '';*/

        if (NutriDEport != undefined) {
            AntecedentesNutri = NutriDEport.AntecedentesNutri
            FamiliaresNutri = NutriDEport.FamiliaresNutri
            PersonalesNutri = NutriDEport.PersonalesNutri
            FarmacologicosNutri = NutriDEport.FarmacologicosNutri
            GinecologicoNutri = NutriDEport.GinecologicoNutri
            SueñoNutri = NutriDEport.SueñoNutri
            PielNutri = NutriDEport.PielNutri
            ApetitoNutri = NutriDEport.ApetitoNutri
            FracturaNutri = NutriDEport.FracturaNutri
            AspectoFisicoNutri = NutriDEport.AspectoFisicoNutri
            PieNutri = NutriDEport.PieNutri
            TiempoRecuperacionNutri = NutriDEport.TiempoRecuperacionNutri
            BioquimicoNutri = NutriDEport.BioquimicoNutri
            HidratacionNutri = NutriDEport.HidratacionNutri
            HorarioActividadNutri = NutriDEport.HorarioActividadNutri
            DesayunoNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].DesayunoNutri : '';
            MediaMañanaNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].MediaMañanaNutri : '';
            AlmuerzoNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].AlmuerzoNutri : '';
            MediaTardeNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].MediaTardeNutri : '';
            CenaNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].CenaNutri : '';
            AlergicoNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].AlergicoNutri : '';
            SuplementacionNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].SuplementacionNutri : '';
            AlimentoNoDeseados = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].AlimentoNoDeseados : '';
            EdadNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].EdadNutri : '';
            PesoNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].PesoNutri : '';
            TallaNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].TallaNutri : '';
            ImcNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].ImcNutri : '';
            EscapularNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].EscapularNutri : '';
            TricepsNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].TricepsNutri : '';
            BicepsNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].BicepsNutri : '';
            AbdomenNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].AbdomenNutri : '';
            MusloNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].MusloNutri : '';
            PiernaNutri = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].PiernaNutri : '';
            BrazosNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].BrazosNutrii : '';
            AntebrazoNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].AntebrazoNutrii : '';
            MuñecaNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].MuñecaNutrii : '';
            PechoNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].PechoNutrii : '';
            CinturaNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].CinturaNutrii : '';
            CaderaNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].CaderaNutrii : '';
            MusloSuperiorNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].MusloNutri : '';
            MusloMedioNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].MusloMedioNutrii : '';
            PiernaPerimetroNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].PiernaPerimetroNutrii : '';
            TobilloPerimetroNutrii = NutriDEport.AnamnesisNutricion.length > 0 ? NutriDEport.AnamnesisNutricion[0].TobilloPerimetroNutrii : '';
            HumeroNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].HumeroNutri : '';
            MuñecaHumeroNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].MuñecaHumeroNutri : '';
            FermorHumeroNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].FermorHumeroNutri : '';
            ImcNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].ImcNutri : '';
            GrasaNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].GrasaNutri : '';
            MusculosNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].MusculosNutri : '';
            HuesosNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].HuesosNutri : '';
            HuesosNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].HuesosNutri : '';
            ResidualesNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].ResidualesNutri : '';
            PesosGrasosNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].PesosGrasosNutri : '';
            PesosMusculosNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].PesosMusculosNutri : '';
            PesoResiducalesNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].PesoResiducalesNutri : '';
            DiagnosticoNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].DiagnosticoNutri : '';
            ProximaCitaNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].ProximaCitaNutri : '';
            //FirmaDoctorNutri = NutriDEport.SeguimientoNutricion.length > 0 ? NutriDEport.SeguimientoNutricion[0].FirmaDoctorNutri : '';




        }
        //**psicologia
        var SicoDEport = ListaSicologia.find(w => w.NumIdentificacion == item.NumIdentificacion);
        var EstadoCivil = '';
        var NivelEducativo = '';
        var YoSoy = '';
        var NumHermanos = '';
        var VivoCon = '';
        var Actualmente = '';
        var Religion = '';
        var DependenciaEconomia = '';

        var NombrePadre = '';
        var EdadPadre = '';
        var RelacionPadre = '';
        var NombreMAdre = '';
        var EdadMadre = '';
        var RelacionMadre = '';
        var RelacionHermanos = '';

        var SustanciasPsicoFmlia = '';
        var EnferMentalesFmlia = '';
        var EnferCoronariasFmlia = '';
        var ObesidadFmlia = '';
        var CancerFmlia = '';
        var HipertensionFmlia = '';
        var EnferAlergicasFmlia = '';

        var SustanciasPsicoactivasPer = '';
        var EnferMentalesPer = '';
        var DiabetesPer = '';
        var EnferCoronariasPer = '';
        var ObesidadPer = '';
        var CancerPer = '';
        var HipertensionPer = '';
        var EnferAlergicasPer = '';
        var AsmaPer = '';
        var ComplicacionesPartoPer = '';
        var LesionesPer = '';
        var CualesLesionesPer = '';
        var TrabajoConcentrarsePer = '';
        var DolorMuscularPer = '';
        var PartoCesareaPer = '';
        var PartoNormalPer = '';
        var LesionadoActualPer = '';
        var DificultadSueñoPer = '';
        var DolorCabezaPer = '';
        var CirugiasPer = '';
        var ApetitoPer = '';
        var CansadoPer = '';
        var OtroPer = '';
        var HistoriadelProblemaPer = '';
       
        var Prueba = '';
        var Puntuacion = '';
        var Valoracion = '';
        var Concepto = '';
      
        var EntrenamientoActualPsi = '';
        var HorasDiariasPsi = '';
        var NumeroSesionesPsi = '';
        var LugarPsi = '';
        var NombreEntrenadorPsi = '';
        var InicioDeportePsi = '';
        var EntrenamiendoPsi = '';
        var CompeticionPsi = '';
        var EntrenamientoGuiadoPsi = '';
        var MeApoyanPsi = '';
        var CompromisoPsi = '';
        var EntramientoPsicologicoPsi = '';
        var ObservacionesPsi = '';
        var ResultadosPsi = '';
        var RecomendacionesPsi = '';
        var RemisionPsi = '';
        var SeguimientoPsi = '';

   

        var Fecha = '';
        var Evolucion = '';
        //var FirmaDoc = '';  

                if (SicoDEport != undefined) {
            EstadoCivil = SicoDEport.EstadoCivil
            NivelEducativo = SicoDEport.NivelEducativo
                    YoSoy = SicoDEport.YoSoy
                    NumHermanos = SicoDEport.NumHermanos
                    VivoCon = SicoDEport.VivoCon
                    Actualmente = SicoDEport.Actualmente
                    Religion = SicoDEport.Religion
                    DependenciaEconomia = SicoDEport.DependenciaEconomia
                    
                    NombrePadre = SicoDEport.HistoriaFamiliaresPsicologia.length > 0 ? SicoDEport.HistoriaFamiliaresPsicologia[0].NombrePadre : '';
                    EdadPadre = SicoDEport.HistoriaFamiliaresPsicologia.length > 0 ? SicoDEport.HistoriaFamiliaresPsicologia[0].EdadPadre : '';
                    RelacionPadre = SicoDEport.HistoriaFamiliaresPsicologia.length > 0 ? SicoDEport.HistoriaFamiliaresPsicologia[0].RelacionPadre : '';
                    NombreMAdre = SicoDEport.HistoriaFamiliaresPsicologia.length > 0 ? SicoDEport.HistoriaFamiliaresPsicologia[0].NombreMAdre : '';
                    EdadMadre = SicoDEport.HistoriaFamiliaresPsicologia.length > 0 ? SicoDEport.HistoriaFamiliaresPsicologia[0].EdadMadre : '';
                    RelacionMadre = SicoDEport.HistoriaFamiliaresPsicologia.length > 0 ? SicoDEport.HistoriaFamiliaresPsicologia[0].RelacionMadre : '';
                    RelacionHermanos = SicoDEport.HistoriaFamiliaresPsicologia.length > 0 ? SicoDEport.HistoriaFamiliaresPsicologia[0].RelacionHermanos : ''; 

                    SustanciasPsicoFmlia = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.FamiliaresPsicologia[0].SustanciasPsicoFmlia : '';    
                    EnferMentalesFmlia = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.FamiliaresPsicologia[0].EnferMentalesFmlia : ''; 
                    EnferCoronariasFmlia = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.FamiliaresPsicologia[0].EnferCoronariasFmlia : '';
                    ObesidadFmlia = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.FamiliaresPsicologia[0].ObesidadFmlia : '';
                    CancerFmlia = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.FamiliaresPsicologia[0].CancerFmlia : '';
                    HipertensionFmlia = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.FamiliaresPsicologia[0].HipertensionFmlia : '';
                    EnferAlergicasFmlia = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.FamiliaresPsicologia[0].EnferAlergicasFmlia : '';


                    SustanciasPsicoactivasPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].SustanciasPsicoactivasPer : '';
                    EnferMentalesPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].EnferMentalesPer : '';
                    DiabetesPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].DiabetesPer : '';
                    EnferCoronariasPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].EnferCoronariasPer : '';
                    ObesidadPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].ObesidadPer : '';
                    CancerPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].CancerPer : '';
                    HipertensionPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].HipertensionPer : '';
                    EnferAlergicasPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].EnferAlergicasPer : '';
                    AsmaPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].AsmaPer : '';
                    ComplicacionesPartoPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].ComplicacionesPartoPer : '';
                    LesionesPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].LesionesPer : '';
                    CualesLesionesPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].CualesLesionesPer : '';
                    TrabajoConcentrarsePer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].TrabajoConcentrarsePer : '';
                    DolorMuscularPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].DolorMuscularPer : '';
                    PartoCesareaPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].PartoCesareaPer : '';
                    PartoNormalPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].PartoNormalPer : '';
                    LesionadoActualPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].LesionadoActualPer : '';
                    DificultadSueñoPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].DificultadSueñoPer : '';
                    DolorCabezaPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].DolorCabezaPer : '';
                    CirugiasPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].CirugiasPer : '';
                    ApetitoPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].ApetitoPer : '';
                    CansadoPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].CansadoPer : '';
                    OtroPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].OtroPer : '';
                    HistoriadelProblemaPer = SicoDEport.FamiliaresPsicologia.length > 0 ? SicoDEport.EnfermedadPersonalPsicologia[0].HistoriadelProblemaPer : '';

                    Prueba = SicoDEport.TestPsicologia.length > 0 ? SicoDEport.TestPsicologia[0].Prueba : '';
                 
                    Puntuacion = SicoDEport.TestPsicologia.length > 0 ? SicoDEport.TestPsicologia[0].Puntuacion : '';
                    Valoracion = SicoDEport.TestPsicologia.length > 0 ? SicoDEport.TestPsicologia[0].Valoracion : '';
                     Concepto = SicoDEport.TestPsicologia.length > 0 ? SicoDEport.TestPsicologia[0].Concepto : '';
                        
                    EntrenamientoActualPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].EntrenamientoActualPsi : '';
                    HorasDiariasPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].HorasDiariasPsi : '';
                    NumeroSesionesPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].NumeroSesionesPsi : '';
                    LugarPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].LugarPsi : '';
                    NombreEntrenadorPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].NombreEntrenadorPsi : '';
                    InicioDeportePsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].InicioDeportePsi : '';
                    EntrenamiendoPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].EntrenamiendoPsi : '';
                    CompeticionPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].CompeticionPsi : '';
                    EntrenamientoGuiadoPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].EntrenamientoGuiadoPsi : '';
                    MeApoyanPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].MeApoyanPsi : '';
                    CompromisoPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].CompeticionPsi : '';
                    EntramientoPsicologicoPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].EntramientoPsicologicoPsi : '';
                    ObservacionesPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].ObservacionesPsi : '';
                    ResultadosPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].ResultadosPsi : '';
                    RecomendacionesPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].RecomendacionesPsi : '';
                    RemisionPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].RemisionPsi : '';
                    SeguimientoPsi = SicoDEport.VidapersonalPsicologia.length > 0 ? SicoDEport.VidapersonalPsicologia[0].SeguimientoPsi : '';



                    Fecha = SicoDEport.SeguimientoPsicologia.length > 0 ? SicoDEport.SeguimientoPsicologia[0].Fecha : '';
                    Evolucion = SicoDEport.SeguimientoPsicologia.length > 0 ? SicoDEport.SeguimientoPsicologia[0].Evolucion : '';
                    //FirmaDoc = SicoDEport.SeguimientoPsicologia.length > 0 ? SicoDEport.SeguimientoPsicologia[0].FirmaDoc : '';

        }

        //***fin sicologia*///

        //**Fisioterapia
        var FisioDeport = ListaFisioterapia.find(w => w.NumIdentificacion == item.NumIdentificacion);
        var CodFisioterapi = '';
        var ReportaLesion = '';
        var AntecedentesLesion = '';
        var CualLesion = '';
        var LesionActual = '';
        var NumeroReLesiones = '';
        var TratamientoLesion = '';
        var HuesoLesion = '';
        var LigamentoLesion = '';
        var TendonLesion = '';
        var MusculoLesion = '';
        var CabezaLesion = '';
        var ColumnaLesion = '';
        var HombroLesion = '';
        var CodoLesion = '';
        var MuñecamanoLesion = '';
        var CaderaLesion = '';
        var RodillaLesion = '';
        var CuelloPieLesion = '';
        var AnexosFisioterapia = '';
       



        var MmssRealDer = '';
        var MmssRealizq = '';
        var AparenteMmssDer= '';
        var AparenteMmssIzq = '';
        var RealMmiiDer = '';
        var RealMmiiIzq = '';
        var AparenteMmiiDer = '';
        var AparenteMmiiIzq = '';
        var ObservacionesPosturaFisio = '';
        var BalanceoOjosAbiertos2 = '';
        var BalanceoOjosAbiertos1 = '';
        var BalanceoOjosAbiertos0 = '';
        var BalanceoOjosAbiertosObservaciones = '';
        var BalanceoOjosCerrados2 = '';
        var BalanceoOjosCerrados1 = '';
        var BalanceoOjosCerrados0 = '';
        var BalanceoOjosCerradosObservaciones = '';
        var FlexibilidadFisioterapia = '';

        var Sentadilla3 = '';
        var Sentadilla2 = '';
        var Sentadilla1 = '';
        var Sentadilla0 = '';
        var PasosValla3 = '';
        var PasosValle2 = '';
        var PasosValle1 = '';
        var PasosValle0 = '';
        var TijeraLinea3 = '';
        var TijeraLinea2= '';
        var TijeraLinea1 = '';
        var TijeraLinea0 = '';
        var HombroActividad3 = '';
        var HombroActividad2 = '';
        var HombroActividad1 = '';
        var HombroActividad0 = '';
        var Pierna3 = '';
        var Pierna2 = '';
        var Pierna1 = '';
        var Pierna0 = '';
        var Pulgares3 = '';
        var Pulgares2 = '';
        var Pulgares1 = '';
        var Pulgares0 = '';
        var Tronco3 = '';
        var Tronco2 = '';
        var Tronco1 = '';
        var Tronco0 = '';
        var Planchas3 = '';
        var Planchas2 = '';
        var Planchas1 = '';
        var Planchas0 = '';
        var Sumatoria3 = '';
        var Sumatoria2 = '';
        var Sumatoria1 = '';
        var Sumatoria0 = '';
        var FlexoresTronco = '';
        var FlexoresPlancha = '';
        var FlexoresColumna = '';
        var FlexoresRecta = '';
        var ObservacionesGlobal = '';

        var LesionEvaluacion = '';
        var CualLesionEvaluacion = '';
        var  MmssSimetria= ''; 
        var  MmssAsimetria= ''; 
        var  MmiiSimetria= '';
        var MmiiAsimetria= ''; 
        var DescripcionAsimetria= '';
        var DescripcionSimetria= ''; 
        var  PosturaEvaluacionFisio= ''; 
        var  TrotePuesto= ''; 
        var  GeneroFisioterapia= ''; 
        var  SuperiosTest= ''; 
        var  ExcelenteTest= ''; 
        var  BuenoTest= '';
        var Promediotest= '';
        var DeficienteTest= '';
        var PobreTest= '';
        var MuyPobreTest= '';
        var SentadillaCali= '';
        var TijeraCali= '';
        var HombroCali= '';
        var PiernaCali = '';
        var TroncoCali = '';
        var EstabilidadCali= '';
        var TotalCali= '';
        var SentadillaObs= '';
        var TijeraObs= '';
        var HombroObs= '';
        var PiernaObs= '';
        var TroncoObs= '';
        var EstabilidadObs = '';
        var TotalObs= '';
        var ResistenciaF = '';
        var ResistenciaM = '';
        var Puentef= '';
        var PuenteM= '';
        var ExtensoresF= '';
        var ExtensoresM= '';
        var PuenteDF= '';
        var PuenteDM= '';
        var PuenteIF= '';
        var PuenteIM= '';
        var ExcelenteEvaluacion= '';
        var MuyBuenoEvaluacion= '';
        var BuenoEvaluacion= '';
        var RegularEvaluacion = '';
        var MaloRegulacion= '';
        var CalificacionObs= '';
        var RecomendacionesObs= '';
                    
            
            if (FisioDeport != undefined) {
            CodFisioterapi = FisioDeport.CodFisioterapi
            ReportaLesion = FisioDeport.ReportaLesion
            AntecedentesLesion = FisioDeport.
            CualLesion = FisioDeport.CualLesion
            LesionActual = FisioDeport.LesionActual
            NumeroReLesiones = FisioDeport.NumeroReLesiones
            TratamientoLesion = FisioDeport.TratamientoLesion
            HuesoLesion = FisioDeport.HuesoLesion
            LigamentoLesion = FisioDeport.LigamentoLesion
            TendonLesion = FisioDeport.TendonLesion
            MusculoLesion = FisioDeport.MusculoLesion
            CabezaLesion = FisioDeport.CabezaLesion
            ColumnaLesion = FisioDeport.ColumnaLesion
            HombroLesion = FisioDeport.HombroLesion
            CodoLesion = FisioDeport.CodoLesion
            MuñecamanoLesion = FisioDeport.MuñecamanoLesion
            CaderaLesion = FisioDeport.CaderaLesion
            RodillaLesion = FisioDeport.RodillaLesion
            CuelloPieLesion = FisioDeport.CuelloPieLesion
            
            



            MmssRealDer = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].MmssRealDer : '';
            MmssRealizq = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].MmssRealizq : '';
            AparenteMmssDer = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].AparenteMmssDer : '';
            AparenteMmssIzq = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].AparenteMmssIzq : '';
            RealMmiiDer = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].RealMmiiDer : '';
            RealMmiiIzq = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].RealMmiiIzq : '';
            AparenteMmiiDer = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].AparenteMmiiDer : '';
            AparenteMmiiIzq = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].AparenteMmiiIzq : '';
            ObservacionesPosturaFisio = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].ObservacionesPosturaFisio : '';
            BalanceoOjosAbiertos2 = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosAbiertos2 : '';
            BalanceoOjosAbiertos1 = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosAbiertos1 : '';
            BalanceoOjosAbiertos0 = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosAbiertos0 : '';
            BalanceoOjosAbiertosObservaciones = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosAbiertosObservaciones : '';
            BalanceoOjosCerrados2 = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosCerrados2 : '';
            BalanceoOjosCerrados1 = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosCerrados1 : '';
            BalanceoOjosCerrados0 = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosCerrados0 : '';
            BalanceoOjosCerradosObservaciones = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].BalanceoOjosCerradosObservaciones : '';
            FlexibilidadFisioterapia = FisioDeport.AntecedentesFisioterapia.length > 0 ? FisioDeport.AntecedentesFisioterapia[0].FlexibilidadFisioterapia : '';
            


                Sentadilla3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sentadilla3 : '';
                Sentadilla2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sentadilla2 : '';
                Sentadilla1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sentadilla1 : '';
                Sentadilla0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sentadilla0 : '';
                PasosValla3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].PasosValla3 : '';
                PasosValle2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].PasosValle2 : '';
                PasosValle1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].PasosValle1 : '';
                PasosValle0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].PasosValle0 : '';
                TijeraLinea3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].TijeraLinea3 : '';
                TijeraLinea2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].TijeraLinea2 : '';
                TijeraLinea1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].TijeraLinea1 : '';
                TijeraLinea0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].TijeraLinea0 : '';
                HombroActividad3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].HombroActividad3 : '';
                HombroActividad2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].HombroActividad2 : '';
                HombroActividad1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].HombroActividad1 : '';
                HombroActividad0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].HombroActividad0 : '';
                Pierna3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pierna3 : '';
                Pierna2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pierna2 : '';
                Pierna1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pierna1 : '';
                Pierna0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pierna0 : '';
                Pulgares3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pulgares3 : '';
                Pulgares2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pulgares2 : '';
                Pulgares1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pulgares1 : '';
                Pulgares0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Pulgares0 : '';
                Tronco3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Tronco3 : '';
                Tronco2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Tronco2 : '';
                Tronco1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Tronco1 : '';
                Tronco0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Tronco0 : '';
                Planchas3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Planchas3 : '';
                Planchas2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Planchas2 : '';
                Planchas1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Planchas1 : '';
                Planchas0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Planchas0 : '';
                Sumatoria3 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sumatoria3 : '';
                Sumatoria2 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sumatoria2 : '';
                Sumatoria1 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sumatoria1 : '';
                Sumatoria0 = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Sumatoria0 : '';
                FlexoresTronco = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].FlexoresTronco : '';
                FlexoresPlancha = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].FlexoresPlancha : '';
                FlexoresColumna = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].FlexoresColumna : '';
                FlexoresRecta = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].FlexoresRecta : '';
                ObservacionesGlobal = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].ObservacionesGlobal : '';
                //FechaTratamiento = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].FechaTratamiento : '';
                //PlanTrata = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].PlanTrata : '';
                //Evolucion = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].Evolucion : '';
                //FirmaDoctorGeneralFisio = FisioDeport.Evolucionfisioterapia.length > 0 ? FisioDeport.Evolucionfisioterapia[0].FirmaDoctorGeneralFisio : '';
                LesionEvaluacion = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].LesionEvaluacion : '';
                CualLesionEvaluacion = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].CualLesionEvaluacion : '';
                MmssSimetria = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].MmssSimetria : '';
                MmssAsimetria = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].MmssAsimetria : '';
                MmiiSimetria = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].MmiiSimetria : '';
                MmiiAsimetria = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].MmiiAsimetria : '';
                DescripcionAsimetria = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].DescripcionAsimetria : '';
                DescripcionSimetria = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].DescripcionSimetria : '';
                PosturaEvaluacionFisio = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PosturaEvaluacionFisio : '';
                TrotePuesto = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].TrotePuesto : '';
                GeneroFisioterapia = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].GeneroFisioterapia : '';
                SuperiosTest = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].SuperiosTest : '';
                ExcelenteTest = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].ExcelenteTest : '';
                BuenoTest = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].BuenoTest : '';
                Promediotest = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].Promediotest : '';
                DeficienteTest = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].DeficienteTest : '';
                PobreTest = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PobreTest : '';
                MuyPobreTest = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].MuyPobreTest : '';
                SentadillaCali = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].SentadillaCali : '';
                TijeraCali = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].TijeraCali : '';
                HombroCali = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].HombroCali : '';
                PiernaCali = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PiernaCali : '';
                TroncoCali = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].TroncoCali : '';
                EstabilidadCali = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].EstabilidadCali : '';
                TotalCali = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].TotalCali : '';
                SentadillaObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].SentadillaCali : '';
                TijeraObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].TijeraObs : '';
                HombroObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].HombroObs : '';
                PiernaObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PiernaObs : '';
                TroncoObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].TroncoObs : '';
                EstabilidadObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].EstabilidadObs : '';
                TotalObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].TotalObs : '';
                ResistenciaF = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].ResistenciaF : '';
                ResistenciaM = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].ResistenciaM : '';
                Puentef = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].Puentef : '';
                PuenteM = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PuenteM : '';
                ExtensoresF = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].ExtensoresF : '';
                ExtensoresM = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].ExtensoresM : '';
                PuenteDF = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PuenteDF : '';
                PuenteDM = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PuenteDM : '';
                PuenteIF = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PuenteIF : '';
                PuenteIM = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].PuenteIM : '';
                ExcelenteEvaluacion = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].ExcelenteEvaluacion : '';
                MuyBuenoEvaluacion = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].MuyBuenoEvaluacion : '';
                BuenoEvaluacion = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].BuenoEvaluacion : '';
                RegularEvaluacion= FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].RegularEvaluacion : '';
                MaloRegulacion = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].MaloRegulacion : '';
                CalificacionObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].CalificacionObs : '';
                RecomendacionesObs = FisioDeport.EvaluacionFisioterapia.length > 0 ? FisioDeport.EvaluacionFisioterapia[0].RecomendacionesObs : ''; 

            }

        //***fin Fisioterapia*///

        ////**** inicio Medicina Deportiva ***/////

        var MedcinaDeport = ListaMedi.find(w => w.NumIdentificacion == item.NumIdentificacion);
        
        var CodMedicina = '';
        var FechaConsulta = '';
        var MotivoConsulta = '';
        var EnfermedadActual = '';

        var Patologicos = '';
        var Quirurgicos = '';
        var Farmacologicos = '';
        var Familiares = '';
        var Traumatologicos = '';
        var LesionesDeportivas = '';
        var Alergicos = '';
        var PruebaCovid19 = '';
        var AnexosMedicinaDeportiva = '';
                                        
        var TensionArterial = '';
        var Peso = '';
        var IndiceMasaCorporal = '';
        var Postura = '';
        
        var FrecuenciaCardiaca = '';
        var Talla = '';
        var Tanner = '';
       
        var Grasos = '';
        var Muscular = '';
       
        var ExamenEspecifico = '';
        var Diagnostico = '';
        var Conducta = '';
        var FirmaMedico = '';
     


        if (MedcinaDeport != undefined) {

            CodMedicina = MedcinaDeport.CodMedicina
            FechaConsulta = MedcinaDeport.FechaConsulta
            MotivoConsulta = MedcinaDeport.MotivoConsulta
            EnfermedadActual = MedcinaDeport.EnfermedadActual

            
            Patologicos = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].Patologicos : '';
            Quirurgicos = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].Quirurgicos : '';
            Farmacologicos = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].Farmacologicos : '';
            Familiares = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].Familiares : '';
            Traumatologicos = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].Traumatologicos : '';
            LesionesDeportivas = MedcinaDeport.AntecedentesMedicinaDelDeporte > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].LesionesDeportivas : '';
            Alergicos = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].Alergicos : '';
            PruebaCovid19 = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].PruebaCovid19 : '';
            AnexosMedicinaDeportiva = MedcinaDeport.AntecedentesMedicinaDelDeporte.length > 0 ? MedcinaDeport.AntecedentesMedicinaDelDeporte[0].AnexosMedicinaDeportiva : '';

            TensionArterial = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].TensionArterial : '';
            Peso = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Peso : '';
            IndiceMasaCorporal = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].IndiceMasaCorporal : '';
            Postura = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Postura : '';
            FrecuenciaCardiaca = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].FrecuenciaCardiaca : '';
            Talla = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Talla : '';
            Tanner = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Tanner : '';
            Grasos = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Grasos : '';
            Muscular = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Muscular : '';
            ExamenEspecifico = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].ExamenEspecifico : '';
            Diagnostico = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Diagnostico : '';
            Conducta = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].Conducta : '';
            FirmaMedico = MedcinaDeport.ExamenFisicoMedicinaDelDeporte.length > 0 ? MedcinaDeport.ExamenFisicoMedicinaDelDeporte[0].FirmaMedico : '';
        }







        ///*** Fin Medicina Deportiva**////



        tablaDeportista.row.add([
            item.TipoIdentificacion,
            item.NumIdentificacion,
            item.PrimerNombre,
            //item.NombreMonitor + " " + item.PrimerApellido,
            item.SegundoNombre,
            item.PrimerApellido,
            item.SegundoApellido,
            item.FechaNacimiento != null ? JSONDateconverter(item.FechaNacimiento) : '',
            item.PaisNacimiento,
            item.DepartamentoNacimiento,
            item.MunicipioNacimiento,
            item.Edad,
            item.GrupoEtareo,
            item.Genero,
            item.CondicionPoblacion,
            item.EntidadPrestadora,
            item.Telefono,
            item.NivelEstudio,
            item.PaisResidencia,
            item.DepartamentoResidencia,
            item.MunicipioResidencia,
            item.BarrioResidencia,
            item.DireccionResidencia,
            item.TipoEtnia,
            item.ZonaInfluencia,
            item.Deporte,
            item.NombreGrupo,
            item.Ocupacion.length > 0 ? item.Ocupacion[0].Peso : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].Estatura : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].TallaCamisa : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].TallaPantalon : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].TallaCalzado : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].TallaSudadera : "",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].NomPadre : "",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].ApePadre : "",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].CelularPadre : "",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].DireccionPadre : "",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].BarrioPadre : "",
            item.CorreoDeportista,
            item.GrupoSanguineo,
            item.Eps,
            
            
            item.NombreMonitor,
            item.EstadoCivil,
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].NomMadre:"",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].ApeMadre:"",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].TipoDocumento:"",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].NumDocumento:"",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].Direccion:"",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].Barrio:"",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].Celular : "",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].Ocupacion : "",
            
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].TipoPadre : "",
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].NumPadre : "",
            
            item.DatosFamiliares.length > 0 ? item.DatosFamiliares[0].OcupacionPadre: "",

            item.Ocupacion.length > 0 ? item.Ocupacion[0].Ocupacion1:"",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].NivelEducativo : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].Institucion : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].TelefonoInstitucion : "",
            item.Ocupacion.length > 0 ? item.Ocupacion[0].DirectorGrado : "",
            
           
            item.Ocupacion.length > 0 ? item.Ocupacion[0].NumeroHijos : "",




            AntecedentesNutri,
            FamiliaresNutri,
            PersonalesNutri,
            FarmacologicosNutri,
            GinecologicoNutri,
            SueñoNutri,
            PielNutri,
            ApetitoNutri,
            FracturaNutri,
            AspectoFisicoNutri,
            PieNutri,
            TiempoRecuperacionNutri,
            BioquimicoNutri,
            HidratacionNutri,
            HorarioActividadNutri,
            DesayunoNutri,
            MediaMañanaNutri,
            AlmuerzoNutri,
            MediaTardeNutri,
            CenaNutri,
            AlergicoNutri,
            SuplementacionNutri,
            AlimentoNoDeseados,
            EdadNutri,
            PesoNutri,
            TallaNutri,
            ImcNutri,
            EscapularNutri,
            TricepsNutri,
            BicepsNutri,
            AbdomenNutri,
            MusloNutri,
            PiernaNutri,
            BrazosNutrii,
            AntebrazoNutrii,
            MuñecaNutrii,
            PechoNutrii,
            CinturaNutrii,
            CaderaNutrii,
            MusloSuperiorNutrii,
            MusloMedioNutrii,
            PiernaPerimetroNutrii,
            TobilloPerimetroNutrii,

             HumeroNutri,
             MuñecaHumeroNutri,
             FermorHumeroNutri,
             ImcNutri,
             GrasaNutri,
             MusculosNutri,
             HuesosNutri,
             ResidualesNutri,
             PesosGrasosNutri,
             PesosMusculosNutri,
             PesoResiducalesNutri,
             DiagnosticoNutri,
             ProximaCitaNutri != null ? JSONDateconverter(ProximaCitaNutri) : '',



            CodFisioterapi,
            ReportaLesion,
            AntecedentesLesion,
            CualLesion,
            LesionActual,
            NumeroReLesiones,
            TratamientoLesion,
            HuesoLesion,
            LigamentoLesion,
            TendonLesion,
            MusculoLesion,
            CabezaLesion,
            ColumnaLesion,
            HombroLesion,
            CodoLesion,
            MuñecamanoLesion,
            CaderaLesion,
            RodillaLesion,
            CuelloPieLesion,
           
            



            MmssRealDer,
            MmssRealizq,
            AparenteMmssDer,
            AparenteMmssIzq,
            RealMmiiDer,
            RealMmiiIzq,
            AparenteMmiiDer,
            AparenteMmiiIzq,
            ObservacionesPosturaFisio,
            BalanceoOjosAbiertos2,
            BalanceoOjosAbiertos1,
            BalanceoOjosAbiertos0,
            BalanceoOjosAbiertosObservaciones,
            BalanceoOjosCerrados2,
            BalanceoOjosCerrados1,
            BalanceoOjosCerrados0,
            BalanceoOjosCerradosObservaciones,
            FlexibilidadFisioterapia,



            
            Sentadilla3,
            Sentadilla2,
            Sentadilla1,
            Sentadilla0,
            PasosValla3,
            PasosValle2,
            PasosValle1,
            PasosValle0,
            TijeraLinea3,
            TijeraLinea2,
            TijeraLinea1,
            TijeraLinea0,
            HombroActividad3,
            HombroActividad2,
            HombroActividad1,
            HombroActividad0,
            Pierna3,
            Pierna2,
            Pierna1,
            Pierna0,
            Pulgares3,
            Pulgares2,
            Pulgares1,
            Pulgares0,
            Tronco3 ,
            Tronco2,
            Tronco1,
            Tronco0,
            Planchas3,
            Planchas2,
            Planchas1,
            Planchas0,
            Sumatoria3,
            Sumatoria2,
            Sumatoria1,
            Sumatoria0,
            FlexoresTronco,
            FlexoresPlancha,
            FlexoresColumna,
            FlexoresRecta,
            ObservacionesGlobal,
         
            LesionEvaluacion,
            CualLesionEvaluacion,
            MmssSimetria,
            MmssAsimetria,
            MmiiSimetria,
            MmiiAsimetria,
            DescripcionAsimetria,
            DescripcionSimetria,
            PosturaEvaluacionFisio,
            TrotePuesto,
            GeneroFisioterapia,
            SuperiosTest,
            ExcelenteTest,
            BuenoTest,
            Promediotest,
            DeficienteTest,
            PobreTest,
            MuyPobreTest,
            SentadillaCali,
            TijeraCali,
            HombroCali,
            PiernaCali,
            TroncoCali,
            EstabilidadCali,
            TotalCali,
            SentadillaObs,
            TijeraObs,
            HombroObs,
            PiernaObs,
            TroncoObs,
            EstabilidadObs,
            TotalObs,
            ResistenciaF,
            ResistenciaM,
            Puentef,
            PuenteM,
            ExtensoresF,
            ExtensoresM,
            PuenteDF,
            PuenteDM,
            PuenteIF,
            PuenteIM,
            ExcelenteEvaluacion,
            MuyBuenoEvaluacion,
            BuenoEvaluacion,
            RegularEvaluacion,
            MaloRegulacion,
            CalificacionObs,
            RecomendacionesObs, 

            EstadoCivil,
            NivelEducativo,
            YoSoy,
            NumHermanos,
            VivoCon,
            Actualmente,
            Religion,
            DependenciaEconomia,
            NombrePadre,
            EdadPadre,
            RelacionPadre,
            NombreMAdre,
            EdadMadre,
            RelacionMadre,
            RelacionHermanos,
            SustanciasPsicoFmlia,
            EnferMentalesFmlia,
            EnferCoronariasFmlia,
            ObesidadFmlia,
            CancerFmlia,
            HipertensionFmlia,
            EnferAlergicasFmlia,


            SustanciasPsicoactivasPer,
            EnferMentalesPer,
            DiabetesPer,
            EnferCoronariasPer,
            ObesidadPer,
            CancerPer,
            HipertensionPer,
            EnferAlergicasPer,
            AsmaPer,
            ComplicacionesPartoPer,
            LesionesPer,
            CualesLesionesPer,
            TrabajoConcentrarsePer,
            DolorMuscularPer,
            PartoCesareaPer,
            PartoNormalPer,
            LesionadoActualPer,
            DificultadSueñoPer,
            DolorCabezaPer,
            CirugiasPer,
            ApetitoPer,
            CansadoPer,
            OtroPer,
            HistoriadelProblemaPer,
       

            Prueba,
            Puntuacion,
            Valoracion,
            Concepto ,

      
            EntrenamientoActualPsi,
            HorasDiariasPsi,
            NumeroSesionesPsi,
            LugarPsi,
            NombreEntrenadorPsi,
            InicioDeportePsi,
            EntrenamiendoPsi,
            CompeticionPsi,
            EntrenamientoGuiadoPsi,
            MeApoyanPsi,
            CompromisoPsi,
            EntramientoPsicologicoPsi,
            ObservacionesPsi,
            ResultadosPsi,
            RecomendacionesPsi,
            RemisionPsi,
            SeguimientoPsi,

          


             CodMedicina,
             FechaConsulta != null ? JSONDateconverter(FechaConsulta):'',
             MotivoConsulta,
             EnfermedadActual,
             Patologicos,
             Quirurgicos,
             Farmacologicos,
             Familiares,
             Traumatologicos,
             LesionesDeportivas,
             Alergicos,
             PruebaCovid19,
            
                                        
             TensionArterial,
             Peso,
             IndiceMasaCorporal,
             Postura,
      
             FrecuenciaCardiaca,
             Talla,
             Tanner,
            
             Grasos,
             Muscular,
            
             ExamenEspecifico,
             Diagnostico,
             Conducta,
             FirmaMedico,


            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdDeportista + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdDeportista + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdDeportista + ')" ></i>&ensp;'+
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdfMerge(' + item.NumIdentificacion + ')" ></i>&ensp;' 


        ]).draw(false);
        var Edad = tablaDeportista.column(6);
        var Genero= tablaDeportista.column(7);
            var GrupoSanguineo= tablaDeportista.column(8);
            var Eps= tablaDeportista.column(9);
            var CorreoDeportista= tablaDeportista.column(10);
            var Deporte= tablaDeportista.column(11);
            var FechaNacimiento = tablaDeportista.column(12);
            var PaisNacimiento= tablaDeportista.column(13);
            var DepartamentoNacimiento= tablaDeportista.column(14);
            var MunicipioNacimiento= tablaDeportista.column(15);
            var GrupoEtareo= tablaDeportista.column(16);
            var CondicionPoblacion= tablaDeportista.column(17);
            var Telefono= tablaDeportista.column(18);
            var NivelEstudio= tablaDeportista.column(19);
            var PaisResidencia= tablaDeportista.column(20);
            var DepartamentoResidencia= tablaDeportista.column(21);
            var MunicipioResidencia= tablaDeportista.column(22);
            var BarrioResidencia= tablaDeportista.column(23);
            var DireccionResidencia= tablaDeportista.column(24);
            var TipoEtnia= tablaDeportista.column(25);
            var ZonaInfluencia= tablaDeportista.column(26);
            var EntidadPrestadora= tablaDeportista.column(27);
            var NombreMonitor= tablaDeportista.column(28);
            var NombreGrupo= tablaDeportista.column(29);
            var EstadoCivil= tablaDeportista.column(30);
            var NomMadre= tablaDeportista.column(31);
            var ApeMadre= tablaDeportista.column(32);
            var TipoDocumento= tablaDeportista.column(33);
            var NumDocumento= tablaDeportista.column(34);
            var Direccion= tablaDeportista.column(35);
            var Barrio= tablaDeportista.column(36);
            var Celular= tablaDeportista.column(37);
            var Ocupacion= tablaDeportista.column(38);
            var NomPadre= tablaDeportista.column(39);
            var ApePadre= tablaDeportista.column(40);
            var TipoPadre= tablaDeportista.column(41);
            var NumPadre= tablaDeportista.column(42);
            var DireccionPadre= tablaDeportista.column(43);
            var BarrioPadre= tablaDeportista.column(44);
            var CelularPadre= tablaDeportista.column(45);
            var OcupacionPadre= tablaDeportista.column(46);

            var Ocupacion1= tablaDeportista.column(47);
            var NivelEducativo= tablaDeportista.column(48);
            var Institucion= tablaDeportista.column(49);
            var TelefonoInstitucion= tablaDeportista.column(50);
            var DirectorGrado= tablaDeportista.column(51);
            var Peso= tablaDeportista.column(52);
            var Estatura= tablaDeportista.column(53);
            var TallaCamisa= tablaDeportista.column(54);
            var TallaPantalon= tablaDeportista.column(55);
            var TallaCalzado= tablaDeportista.column(56);
            var TallaSudadera= tablaDeportista.column(57);
            var NumeroHijos= tablaDeportista.column(58);




        var AntecedentesNutri= tablaDeportista.column(59);
        var FamiliaresNutri= tablaDeportista.column(60);
        var PersonalesNutri= tablaDeportista.column(61);
        var  FarmacologicosNutri= tablaDeportista.column(62);
        var GinecologicoNutri= tablaDeportista.column(63);
        var SueñoNutri= tablaDeportista.column(64);
        var PielNutri= tablaDeportista.column(65);
        var ApetitoNutri= tablaDeportista.column(66);
        var FracturaNutri= tablaDeportista.column(67);
        var AspectoFisicoNutri= tablaDeportista.column(68);
        var PieNutri= tablaDeportista.column(69);
        var TiempoRecuperacionNutri= tablaDeportista.column(70);
        var BioquimicoNutri= tablaDeportista.column(71);
        var HidratacionNutri= tablaDeportista.column(72);
        var HorarioActividadNutri= tablaDeportista.column(73);
        var DesayunoNutri= tablaDeportista.column(74);
        var MediaMañanaNutri= tablaDeportista.column(75);
        var AlmuerzoNutri= tablaDeportista.column(76);
        var MediaTardeNutri= tablaDeportista.column(77);
        var CenaNutri= tablaDeportista.column(78);
        var AlergicoNutri= tablaDeportista.column(79);
        var SuplementacionNutri= tablaDeportista.column(80);
        var AlimentoNoDeseados= tablaDeportista.column(81);
        var EdadNutri= tablaDeportista.column(82);
        var PesoNutri= tablaDeportista.column(83);
        var TallaNutri= tablaDeportista.column(84);
        var ImcNutri= tablaDeportista.column(85);
        var EscapularNutri= tablaDeportista.column(86);
        var TricepsNutri= tablaDeportista.column(87);
        var  BicepsNutri= tablaDeportista.column(88);
        var AbdomenNutri= tablaDeportista.column(89);
        var MusloNutri= tablaDeportista.column(90);
        var PiernaNutri= tablaDeportista.column(91);
        var BrazosNutrii= tablaDeportista.column(92);
        var AntebrazoNutrii= tablaDeportista.column(93);
        var MuñecaNutrii= tablaDeportista.column(94);
        var PechoNutrii= tablaDeportista.column(95);
        var CinturaNutrii= tablaDeportista.column(96);
        var CaderaNutrii= tablaDeportista.column(97);
        var MusloSuperiorNutrii= tablaDeportista.column(98);
        var MusloMedioNutrii= tablaDeportista.column(99);
        var PiernaPerimetroNutrii= tablaDeportista.column(100);
        var TobilloPerimetroNutrii= tablaDeportista.column(101);

        var HumeroNutri= tablaDeportista.column(102);
        var MuñecaHumeroNutri= tablaDeportista.column(103);
        var FermorHumeroNutri= tablaDeportista.column(104);
        var NutriDEportImcNutri= tablaDeportista.column(105);
        var GrasaNutri= tablaDeportista.column(106);
        var MusculosNutri= tablaDeportista.column(107);
        var HuesosNutri= tablaDeportista.column(108);
        var ResidualesNutri= tablaDeportista.column(109);
        var PesosGrasosNutri= tablaDeportista.column(110);
        var PesosMusculosNutri= tablaDeportista.column(111);
        var PesoResiducalesNutri= tablaDeportista.column(112);
        var DiagnosticoNutri= tablaDeportista.column(113);
        var ProximaCitaNutri= tablaDeportista.column(114);
        var FirmaDoctorNutri= tablaDeportista.column(115);
      
        var CodFisioterapi= tablaDeportista.column(116);
        var ReportaLesion= tablaDeportista.column(117);
        var AntecedentesLesion= tablaDeportista.column(118);
        var CualLesion= tablaDeportista.column(119);
        var LesionActual= tablaDeportista.column(120);
        var NumeroReLesiones= tablaDeportista.column(121);
        var TratamientoLesion= tablaDeportista.column(122);
        var HuesoLesion= tablaDeportista.column(123);
        var LigamentoLesion= tablaDeportista.column(124);
        var TendonLesion= tablaDeportista.column(125);
        var MusculoLesion= tablaDeportista.column(126);
        var CabezaLesion= tablaDeportista.column(127);
        var ColumnaLesion= tablaDeportista.column(128);
        var HombroLesion= tablaDeportista.column(129);
        var CodoLesion= tablaDeportista.column(130);
        var MuñecamanoLesion= tablaDeportista.column(131);
        var CaderaLesion= tablaDeportista.column(132);
        var RodillaLesion= tablaDeportista.column(133);
        var CuelloPieLesion= tablaDeportista.column(134);

        var MmssRealDer= tablaDeportista.column(135);
        var MmssRealizq= tablaDeportista.column(136);
        var AparenteMmssDer= tablaDeportista.column(137);
        var AparenteMmssIzq= tablaDeportista.column(138);
        var RealMmiiDer= tablaDeportista.column(139);
        var RealMmiiIzq= tablaDeportista.column(140);
        var AparenteMmiiDer= tablaDeportista.column(141);
        var AparenteMmiiIzq= tablaDeportista.column(142);
        var ObservacionesPosturaFisio= tablaDeportista.column(143);
        var BalanceoOjosAbiertos2= tablaDeportista.column(144);
        var BalanceoOjosAbiertos1= tablaDeportista.column(145);
        var BalanceoOjosAbiertos0= tablaDeportista.column(146);
        var BalanceoOjosAbiertosObservaciones= tablaDeportista.column(147);
        var BalanceoOjosCerrados2= tablaDeportista.column(148);
        var BalanceoOjosCerrados1= tablaDeportista.column(149);
        var BalanceoOjosCerrados0= tablaDeportista.column(150);
        var BalanceoOjosCerradosObservaciones= tablaDeportista.column(151);
        var FlexibilidadFisioterapia= tablaDeportista.column(152);
        
        var Sentadilla3= tablaDeportista.column(153);
        var  Sentadilla2= tablaDeportista.column(154);
        var Sentadilla1= tablaDeportista.column(155);
        var Sentadilla0= tablaDeportista.column(156);
        var PasosValla3= tablaDeportista.column(157);
        var PasosValle2= tablaDeportista.column(158);
        var PasosValle1= tablaDeportista.column(159);
        var PasosValle0= tablaDeportista.column(160);
        var TijeraLinea3= tablaDeportista.column(161);
        var TijeraLinea2= tablaDeportista.column(162);
        var TijeraLinea1= tablaDeportista.column(163);
        var TijeraLinea0= tablaDeportista.column(164);
        var HombroActividad3= tablaDeportista.column(165);
        var HombroActividad2= tablaDeportista.column(166);
        var HombroActividad1= tablaDeportista.column(167);
        var HombroActividad0= tablaDeportista.column(168);
        var Pierna3= tablaDeportista.column(169);
        var Pierna2= tablaDeportista.column(170);
        var Pierna1= tablaDeportista.column(171);
        var Pierna0= tablaDeportista.column(172);
        var Pulgares3= tablaDeportista.column(173);
        var Pulgares2= tablaDeportista.column(174);
        var Pulgares1= tablaDeportista.column(175);
        var Pulgares0= tablaDeportista.column(176);
        var Tronco3= tablaDeportista.column(177);
        var Tronco2= tablaDeportista.column(178);
        var Tronco1= tablaDeportista.column(179);
        var Tronco0= tablaDeportista.column(180);
        var Planchas3= tablaDeportista.column(181);
        var Planchas2= tablaDeportista.column(182);
        var Planchas1= tablaDeportista.column(183);
        var Planchas0= tablaDeportista.column(184);
        var Sumatoria3= tablaDeportista.column(185);
        var Sumatoria2= tablaDeportista.column(186);
        var Sumatoria1= tablaDeportista.column(187);
        var Sumatoria0= tablaDeportista.column(188);
        var FlexoresTronco= tablaDeportista.column(189);
        var FlexoresPlancha= tablaDeportista.column(190);
        var FlexoresColumna= tablaDeportista.column(191);
        var FlexoresRecta= tablaDeportista.column(192);
        var ObservacionesGlobal= tablaDeportista.column(193);
  


        var LesionEvaluacion= tablaDeportista.column(194);
        var  CualLesionEvaluacion= tablaDeportista.column(195);
        var  MmssSimetria= tablaDeportista.column(196);
        var   MmssAsimetria= tablaDeportista.column(197);
        var  MmiiSimetria= tablaDeportista.column(198);
        var MmiiAsimetria= tablaDeportista.column(199);
        var DescripcionAsimetria= tablaDeportista.column(200);
        var DescripcionSimetria= tablaDeportista.column(201);
        var PosturaEvaluacionFisio= tablaDeportista.column(202);
        var TrotePuesto= tablaDeportista.column(203);
        var GeneroFisioterapia= tablaDeportista.column(204);
        var SuperiosTest= tablaDeportista.column(205);
        var ExcelenteTest= tablaDeportista.column(206);
        var BuenoTest= tablaDeportista.column(207);
        var Promediotest= tablaDeportista.column(208);
        var DeficienteTest= tablaDeportista.column(209);
        var PobreTest= tablaDeportista.column(210);
        var MuyPobreTest= tablaDeportista.column(211);
        var SentadillaCali= tablaDeportista.column(212);
        var TijeraCali= tablaDeportista.column(213);
        var HombroCali= tablaDeportista.column(214);
        var PiernaCali= tablaDeportista.column(215);
        var TroncoCali= tablaDeportista.column(216);
        var EstabilidadCali= tablaDeportista.column(217);
        var TotalCali= tablaDeportista.column(218);
        var SentadillaObs= tablaDeportista.column(219);
        var TijeraObs= tablaDeportista.column(220);
        var HombroObs= tablaDeportista.column(221);
        var PiernaObs= tablaDeportista.column(222);
        var TroncoObs= tablaDeportista.column(223);
        var EstabilidadObs= tablaDeportista.column(224);
        var TotalObs= tablaDeportista.column(225);
        var ResistenciaF= tablaDeportista.column(226);
        var ResistenciaM= tablaDeportista.column(227);
        var Puentef= tablaDeportista.column(228);
        var PuenteM= tablaDeportista.column(229);
        var ExtensoresF= tablaDeportista.column(230);
        var ExtensoresM= tablaDeportista.column(231);
        var PuenteDF= tablaDeportista.column(232);
        var PuenteDM= tablaDeportista.column(233);
        var PuenteIF= tablaDeportista.column(234);
        var PuenteIM= tablaDeportista.column(235);
        var ExcelenteEvaluacion= tablaDeportista.column(236);
        var MuyBuenoEvaluacion= tablaDeportista.column(237);
        var BuenoEvaluacion= tablaDeportista.column(238);
        var RegularEvaluacion= tablaDeportista.column(239);
        var MaloRegulacion= tablaDeportista.column(240);
        var CalificacionObs= tablaDeportista.column(241);
        var RecomendacionesObs= tablaDeportista.column(242); 


        var SicoDEportEstadoCivil = tablaDeportista.column(243);
        var SicoDEportNivelEducativo= tablaDeportista.column(244);
        var YoSoy= tablaDeportista.column(245);
        var NumHermanos= tablaDeportista.column(246);
        var VivoCon= tablaDeportista.column(247);
        var Actualmente= tablaDeportista.column(248);
        var Religion= tablaDeportista.column(249);
        var DependenciaEconomia= tablaDeportista.column(250);
        var NombrePadre= tablaDeportista.column(251);
        var EdadPadre= tablaDeportista.column(252);
        var RelacionPadre= tablaDeportista.column(253);
        var NombreMAdre= tablaDeportista.column(254);
        var EdadMadre= tablaDeportista.column(255);
        var RelacionMadre= tablaDeportista.column(256);
        var RelacionHermanos= tablaDeportista.column(257);
        var SustanciasPsicoFmlia= tablaDeportista.column(258);
        var EnferMentalesFmlia= tablaDeportista.column(259);
        var EnferCoronariasFmlia= tablaDeportista.column(260);
        var ObesidadFmlia= tablaDeportista.column(261);
        var CancerFmlia= tablaDeportista.column(262);
        var HipertensionFmlia= tablaDeportista.column(263);
        var EnferAlergicasFmlia= tablaDeportista.column(264);
        

        var SustanciasPsicoactivasPer= tablaDeportista.column(265);
        var EnferMentalesPer= tablaDeportista.column(266);
        var DiabetesPer= tablaDeportista.column(267);
        var EnferCoronariasPer= tablaDeportista.column(268);
        var ObesidadPer= tablaDeportista.column(269);
        var CancerPer= tablaDeportista.column(270);
        var HipertensionPer= tablaDeportista.column(271);
        var EnferAlergicasPer= tablaDeportista.column(272);
        var AsmaPer= tablaDeportista.column(273);
        var ComplicacionesPartoPer= tablaDeportista.column(274);
        var LesionesPer= tablaDeportista.column(275);
        var CualesLesionesPer= tablaDeportista.column(276);
        var TrabajoConcentrarsePer= tablaDeportista.column(277);
        var DolorMuscularPer= tablaDeportista.column(278);
        var PartoCesareaPer= tablaDeportista.column(279);
        var PartoNormalPer= tablaDeportista.column(280);
        var LesionadoActualPer= tablaDeportista.column(281);
        var DificultadSueñoPer= tablaDeportista.column(282);
        var DolorCabezaPer= tablaDeportista.column(283);
        var CirugiasPer= tablaDeportista.column(284);
        var ApetitoPer= tablaDeportista.column(285);
        var CansadoPer= tablaDeportista.column(286);
        var OtroPer= tablaDeportista.column(287);
        var HistoriadelProblemaPer= tablaDeportista.column(288);


        var Prueba= tablaDeportista.column(289);
        var Puntuacion= tablaDeportista.column(290);
        var Valoracion= tablaDeportista.column(291);
        var Concepto= tablaDeportista.column(292);


        var EntrenamientoActualPsi= tablaDeportista.column(293);
        var HorasDiariasPsi= tablaDeportista.column(294);
        var NumeroSesionesPsi= tablaDeportista.column(295);
        var LugarPsi= tablaDeportista.column(296);
        var NombreEntrenadorPsi= tablaDeportista.column(297);
        var InicioDeportePsi= tablaDeportista.column(298);
        var EntrenamiendoPsi= tablaDeportista.column(299);
        var CompeticionPsi= tablaDeportista.column(300);
        var EntrenamientoGuiadoPsi= tablaDeportista.column(301);
        var MeApoyanPsi= tablaDeportista.column(302);
        var CompromisoPsi= tablaDeportista.column(303);
        var EntramientoPsicologicoPsi= tablaDeportista.column(304);
        var ObservacionesPsi= tablaDeportista.column(305);
        var ResultadosPsi= tablaDeportista.column(306);
        var RecomendacionesPsi= tablaDeportista.column(307);
        var RemisionPsi= tablaDeportista.column(308);
        var SeguimientoPsi= tablaDeportista.column(309);




  
        var CodMedicina = tablaDeportista.column(310);
        var FechaConsulta = tablaDeportista.column(311);
        
        var MotivoConsulta= tablaDeportista.column(312);
        var EnfermedadActual= tablaDeportista.column(313);
        var Patologicos= tablaDeportista.column(314);
        var Quirurgicos= tablaDeportista.column(315);
        var Farmacologicos= tablaDeportista.column(316);
        var Familiares= tablaDeportista.column(317);
        var Traumatologicos= tablaDeportista.column(318);
        var LesionesDeportivas= tablaDeportista.column(319);
        var Alergicos= tablaDeportista.column(320);
        var PruebaCovid19= tablaDeportista.column(321);
      /*  var AnexosMedicinaDeportiva= tablaDeportista.column(323);*/

        var TensionArterial= tablaDeportista.column(322);
        var MedcinaDeportPeso= tablaDeportista.column(323);
        var IndiceMasaCorporal= tablaDeportista.column(324);
        var Postura= tablaDeportista.column(325);
        
        var FrecuenciaCardiaca= tablaDeportista.column(326);
        var Talla= tablaDeportista.column(327);
        var Tanner= tablaDeportista.column(328);

        var Grasos= tablaDeportista.column(329);
        var Muscular= tablaDeportista.column(330);

        var ExamenEspecifico= tablaDeportista.column(331);
        var Diagnostico= tablaDeportista.column(332);
        var Conducta= tablaDeportista.column(333);
        var FirmaMedico= tablaDeportista.column();


        Edad.visible(false);
        Genero.visible(false);
            GrupoSanguineo.visible(false);
            Eps.visible(false);
            CorreoDeportista.visible(false);
            Deporte.visible(false);
            FechaNacimiento.visible(false);
            PaisNacimiento.visible(false);
            DepartamentoNacimiento.visible(false);
            MunicipioNacimiento.visible(false);
            GrupoEtareo.visible(false);
            CondicionPoblacion.visible(false);
            Telefono.visible(false);
            NivelEstudio.visible(false);
            PaisResidencia.visible(false);
            DepartamentoResidencia.visible(false);
            MunicipioResidencia.visible(false);
            BarrioResidencia.visible(false);
            DireccionResidencia.visible(false);
            TipoEtnia.visible(false);
            ZonaInfluencia.visible(false);
            EntidadPrestadora.visible(false);
            NombreMonitor.visible(false);
            NombreGrupo.visible(false);
            EstadoCivil.visible(false);
            NomMadre.visible(false);
            ApeMadre.visible(false);
            TipoDocumento.visible(false);
            NumDocumento.visible(false);
            Direccion.visible(false);
            Barrio.visible(false);
            Celular.visible(false);
            Ocupacion.visible(false);
            NomPadre.visible(false);
            ApePadre.visible(false);
            TipoPadre.visible(false);
            NumPadre.visible(false);
            DireccionPadre.visible(false);
            BarrioPadre.visible(false);
            CelularPadre.visible(false);
            OcupacionPadre.visible(false);

            Ocupacion1.visible(false);
            NivelEducativo.visible(false);
            Institucion.visible(false);
            TelefonoInstitucion.visible(false);
            DirectorGrado.visible(false);
            Peso.visible(false);
            Estatura.visible(false);
            TallaCamisa.visible(false);
            TallaPantalon.visible(false);
            TallaCalzado.visible(false);
            TallaSudadera.visible(false);
            NumeroHijos.visible(false);




            AntecedentesNutri.visible(false);
            FamiliaresNutri.visible(false);
            PersonalesNutri.visible(false);
            FarmacologicosNutri.visible(false);
            GinecologicoNutri.visible(false);
            SueñoNutri.visible(false);
            PielNutri.visible(false);
            ApetitoNutri.visible(false);
            FracturaNutri.visible(false);
            AspectoFisicoNutri.visible(false);
            PieNutri.visible(false);
            TiempoRecuperacionNutri.visible(false);
            BioquimicoNutri.visible(false);
            HidratacionNutri.visible(false);
            HorarioActividadNutri.visible(false);
            DesayunoNutri.visible(false);
            MediaMañanaNutri.visible(false);
            AlmuerzoNutri.visible(false);
            MediaTardeNutri.visible(false);
            CenaNutri.visible(false);
            AlergicoNutri.visible(false);
            SuplementacionNutri.visible(false);
            AlimentoNoDeseados.visible(false);
            EdadNutri.visible(false);
            PesoNutri.visible(false);
            TallaNutri.visible(false);
            ImcNutri.visible(false);
            EscapularNutri.visible(false);
            TricepsNutri.visible(false);
            BicepsNutri.visible(false);
            AbdomenNutri.visible(false);
            MusloNutri.visible(false);
            PiernaNutri.visible(false);
            BrazosNutrii.visible(false);
            AntebrazoNutrii.visible(false);
            MuñecaNutrii.visible(false);
            PechoNutrii.visible(false);
            CinturaNutrii.visible(false);
            CaderaNutrii.visible(false);
            MusloSuperiorNutrii.visible(false);
            MusloMedioNutrii.visible(false);
            PiernaPerimetroNutrii.visible(false);
            TobilloPerimetroNutrii.visible(false);

            HumeroNutri.visible(false);
            MuñecaHumeroNutri.visible(false);
            FermorHumeroNutri.visible(false);
            NutriDEportImcNutri.visible(false);
            GrasaNutri.visible(false);
            MusculosNutri.visible(false);
            HuesosNutri.visible(false);
            ResidualesNutri.visible(false);
            PesosGrasosNutri.visible(false);
            PesosMusculosNutri.visible(false);
            PesoResiducalesNutri.visible(false);
            DiagnosticoNutri.visible(false);
            ProximaCitaNutri.visible(false);
             FirmaDoctorNutri.visible(false);
        


            CodFisioterapi.visible(false);
            ReportaLesion.visible(false);
            AntecedentesLesion.visible(false);
            CualLesion.visible(false);
            LesionActual.visible(false);
            NumeroReLesiones.visible(false);
            TratamientoLesion.visible(false);
            HuesoLesion.visible(false);
            LigamentoLesion.visible(false);
            TendonLesion.visible(false);
            MusculoLesion.visible(false);
            CabezaLesion.visible(false);
            ColumnaLesion.visible(false);
            HombroLesion.visible(false);
            CodoLesion.visible(false);
            MuñecamanoLesion.visible(false);
            CaderaLesion.visible(false);
            RodillaLesion.visible(false);
            CuelloPieLesion.visible(false);





            MmssRealDer.visible(false);
            MmssRealizq.visible(false);
            AparenteMmssDer.visible(false);
            AparenteMmssIzq.visible(false);
            RealMmiiDer.visible(false);
            RealMmiiIzq.visible(false);
            AparenteMmiiDer.visible(false);
            AparenteMmiiIzq.visible(false);
            ObservacionesPosturaFisio.visible(false);
            BalanceoOjosAbiertos2.visible(false);
            BalanceoOjosAbiertos1.visible(false);
            BalanceoOjosAbiertos0.visible(false);
            BalanceoOjosAbiertosObservaciones.visible(false);
            BalanceoOjosCerrados2.visible(false);
            BalanceoOjosCerrados1.visible(false);
            BalanceoOjosCerrados0.visible(false);
            BalanceoOjosCerradosObservaciones.visible(false);
            FlexibilidadFisioterapia.visible(false);




            Sentadilla3.visible(false);
            Sentadilla2.visible(false);
            Sentadilla1.visible(false);
            Sentadilla0.visible(false);
            PasosValla3.visible(false);
            PasosValle2.visible(false);
            PasosValle1.visible(false);
            PasosValle0.visible(false);
            TijeraLinea3.visible(false);
            TijeraLinea2.visible(false);
            TijeraLinea1.visible(false);
            TijeraLinea0.visible(false);
            HombroActividad3.visible(false);
            HombroActividad2.visible(false);
            HombroActividad1.visible(false);
            HombroActividad0.visible(false);
            Pierna3.visible(false);
            Pierna2.visible(false);
            Pierna1.visible(false);
            Pierna0.visible(false);
            Pulgares3.visible(false);
            Pulgares2.visible(false);
            Pulgares1.visible(false);
            Pulgares0.visible(false);
            Tronco3.visible(false);
            Tronco2.visible(false);
            Tronco1.visible(false);
            Tronco0.visible(false);
            Planchas3.visible(false);
            Planchas2.visible(false);
            Planchas1.visible(false);
            Planchas0.visible(false);
            Sumatoria3.visible(false);
            Sumatoria2.visible(false);
            Sumatoria1.visible(false);
            Sumatoria0.visible(false);
            FlexoresTronco.visible(false);
            FlexoresPlancha.visible(false);
            FlexoresColumna.visible(false);
            FlexoresRecta.visible(false);
            ObservacionesGlobal.visible(false);
            /* SicoDEportEvolucion.visible(false);*/
            //FechaTratamiento.visible(false);
            //Evolucion.visible(false);
            //FirmaDoctorGeneralFisio.visible(false);


        LesionEvaluacion.visible(false);
        CualLesionEvaluacion.visible(false);
        MmssSimetria.visible(false);
        MmssAsimetria.visible(false);
        MmiiSimetria.visible(false);
        MmiiAsimetria.visible(false);
        DescripcionAsimetria.visible(false);
        DescripcionSimetria.visible(false);
        PosturaEvaluacionFisio.visible(false);
        TrotePuesto.visible(false);
        GeneroFisioterapia.visible(false);
        SuperiosTest.visible(false);
        ExcelenteTest.visible(false);
        BuenoTest.visible(false);
        Promediotest.visible(false);
        DeficienteTest.visible(false);
        PobreTest.visible(false);
        MuyPobreTest.visible(false);
        SentadillaCali.visible(false);
        TijeraCali.visible(false);
        HombroCali.visible(false);
        PiernaCali.visible(false);
        TroncoCali.visible(false);
        EstabilidadCali.visible(false);
        TotalCali.visible(false);
        SentadillaObs.visible(false);
        TijeraObs.visible(false);
        HombroObs.visible(false);
        PiernaObs.visible(false);
        TroncoObs.visible(false);
        EstabilidadObs.visible(false);
        TotalObs.visible(false);
        ResistenciaF.visible(false);
        ResistenciaM.visible(false);
        Puentef.visible(false);
        PuenteM.visible(false);
        ExtensoresF.visible(false);
        ExtensoresM.visible(false);
        PuenteDF.visible(false);
        PuenteDM.visible(false);
        PuenteIF.visible(false);
        PuenteIM.visible(false);
        ExcelenteEvaluacion.visible(false);
        MuyBuenoEvaluacion.visible(false);
        BuenoEvaluacion.visible(false);
        RegularEvaluacion.visible(false);
        MaloRegulacion.visible(false);
        CalificacionObs.visible(false);
        RecomendacionesObs.visible(false); 




            SicoDEportEstadoCivil.visible(false);
            SicoDEportNivelEducativo.visible(false);
            YoSoy.visible(false);
            NumHermanos.visible(false);
            VivoCon.visible(false);
            Actualmente.visible(false);
            Religion.visible(false);
            DependenciaEconomia.visible(false);
            NombrePadre.visible(false);
            EdadPadre.visible(false);
            RelacionPadre.visible(false);
            NombreMAdre.visible(false);
            EdadMadre.visible(false);
            RelacionMadre.visible(false);
            RelacionHermanos.visible(false);
            SustanciasPsicoFmlia.visible(false);
            EnferMentalesFmlia.visible(false);
            EnferCoronariasFmlia.visible(false);
            ObesidadFmlia.visible(false);
            CancerFmlia.visible(false);
            HipertensionFmlia.visible(false);
            EnferAlergicasFmlia.visible(false);


            SustanciasPsicoactivasPer.visible(false);
            EnferMentalesPer.visible(false);
            DiabetesPer.visible(false);
            EnferCoronariasPer.visible(false);
            ObesidadPer.visible(false);
            CancerPer.visible(false);
            HipertensionPer.visible(false);
            EnferAlergicasPer.visible(false);
            AsmaPer.visible(false);
            ComplicacionesPartoPer.visible(false);
            LesionesPer.visible(false);
            CualesLesionesPer.visible(false);
            TrabajoConcentrarsePer.visible(false);
            DolorMuscularPer.visible(false);
            PartoCesareaPer.visible(false);
            PartoNormalPer.visible(false);
            LesionadoActualPer.visible(false);
            DificultadSueñoPer.visible(false);
            DolorCabezaPer.visible(false);
            CirugiasPer.visible(false);
            ApetitoPer.visible(false);
            CansadoPer.visible(false);
            OtroPer.visible(false);
            HistoriadelProblemaPer.visible(false);


            Prueba.visible(false);

            Puntuacion.visible(false);
            Valoracion.visible(false);
            Concepto.visible(false);


            EntrenamientoActualPsi.visible(false);
            HorasDiariasPsi.visible(false);
            NumeroSesionesPsi.visible(false);
            LugarPsi.visible(false);
            NombreEntrenadorPsi.visible(false);
            InicioDeportePsi.visible(false);
            EntrenamiendoPsi.visible(false);
            CompeticionPsi.visible(false);
            EntrenamientoGuiadoPsi.visible(false);
            MeApoyanPsi.visible(false);
            CompromisoPsi.visible(false);
            EntramientoPsicologicoPsi.visible(false);
            ObservacionesPsi.visible(false);
            ResultadosPsi.visible(false);
            RecomendacionesPsi.visible(false);
            RemisionPsi.visible(false);
            SeguimientoPsi.visible(false);


            //Fecha.visible(false);
            ////SicoDEportEvolucion.visible(false);
            //FirmaDoc.visible(false);


        CodMedicina.visible(false);
        FechaConsulta.visible(false);
            MotivoConsulta.visible(false);
            EnfermedadActual.visible(false);
            Patologicos.visible(false);
            Quirurgicos.visible(false);
            Farmacologicos.visible(false);
            Familiares.visible(false);
            Traumatologicos.visible(false);
            LesionesDeportivas.visible(false);
            Alergicos.visible(false);
            PruebaCovid19.visible(false);
            //AnexosMedicinaDeportiva.visible(false);

            TensionArterial.visible(false);
            MedcinaDeportPeso.visible(false);
            IndiceMasaCorporal.visible(false);
            Postura.visible(false);

            FrecuenciaCardiaca.visible(false);
            Talla.visible(false);
            Tanner.visible(false);

            Grasos.visible(false);
            Muscular.visible(false);

            ExamenEspecifico.visible(false);
            Diagnostico.visible(false);
            Conducta.visible(false);
            FirmaMedico.visible(false);


    });
}


function ActualizardEportistaData(iddepor) {
    window.location.href='../Deportista/Agregar?Id=' + iddepor;
    
}

function DetalleData(iddepor) {
    window.location.href = '../Deportista/Agregar?Id=' + iddepor + "&Viewdetail=SI";

}

function Eliminar(IdDepo) {
    swal({
        title: "Atención",
        text: "¿Estas seguro de eliminar este registro?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal.close()
                Get_Data(RecargarTabla, '/Deportista/Eliminar?idDep=' + IdDepo);            }
            else {
                swal.close()
            }
        });
    
}

function RecargarTabla() {
    Get_Data(CargarTabla, '/Deportista/GetListdEportista')
}

function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=Deport' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}
function VerPdfMerge(IdEncTrabj) {
    var formURL = '../Report/PdfMergerGeneric?tipo=Med' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}