var tablaFisioterapiaDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-Fisioterapia', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 67, 65, 66, 67,
        68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113,
        114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 129, 130, 131, 132, 133, 134, 135, 136, 137,
        138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164,
    165,166,167,168,169,170,171,172,173,174    ], null, {
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

    tablaFisioterapiaDeportiva = $('#datatable-Fisioterapia').DataTable();
    Get_Data(CargarTabla, '/Fisioterapia/GetListFisioterapiaDeportiva')

});

function CargarTabla(data) {
    tablaFisioterapiaDeportiva.clear().draw();
    let FisioterapiaDeport = data.objeto;
    console.log(FisioterapiaDeport);
    $.each(FisioterapiaDeport, function (index, item) {
        tablaFisioterapiaDeportiva.row.add([
            item.NumIdentificacion,
            item.CodFisioterapi,
            item.ReportaLesion,
            item.AntecedentesLesion,

            item.CualLesion,
            item.LesionActual,
            item.NumeroReLesiones,
            item.TratamientoLesion,
            item.HuesoLesion,
            item.LigamentoLesion,
            item.TendonLesion,
            item.MusculoLesion,
            item.CabezaLesion,
            item.ColumnaLesion,
            item.HombroLesion,
            item.CodoLesion,
            item.MuñecamanoLesion,
            item.CaderaLesion,
            item.RodillaLesion,
            item.CuelloPieLesion,
            
          

            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].MmssRealDer:"",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].MmssRealizq: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].AparenteMmssDer: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].AparenteMmssIzq: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].RealMmiiDer: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].RealMmiiIzq: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].AparenteMmiiDer: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].AparenteMmiiIzq: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].ObservacionesPosturaFisio: "",
            item.AntecedentesFisioterapia.length > 0 ?  item.AntecedentesFisioterapia[0].BalanceoOjosAbiertos2: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].BalanceoOjosAbiertos1: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].BalanceoOjosAbiertos0: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].BalanceoOjosAbiertosObservaciones: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].BalanceoOjosCerrados2: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].BalanceoOjosCerrados1: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].BalanceoOjosCerrados0: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].BalanceoOjosCerradosObservaciones: "",
            item.AntecedentesFisioterapia.length > 0 ? item.AntecedentesFisioterapia[0].FlexibilidadFisioterapia: "",

            
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Sentadilla3: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Sentadilla2: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Sentadilla1: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Sentadilla0: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].PasosValla3: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].PasosValle2: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].PasosValle1: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].PasosValle0: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].TijeraLinea3: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].TijeraLinea2: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].TijeraLinea1: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].TijeraLinea0: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].HombroActividad3: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].HombroActividad2: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].HombroActividad1: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].HombroActividad0: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Pierna3: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Pierna2: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Pierna1: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Pierna0: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Pulgares3: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Pulgares2: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Pulgares1: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Pulgares0: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Tronco3: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Tronco2: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Tronco1: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Tronco0: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Planchas3: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Planchas2: "",
            item.Evolucionfisioterapia.length > 0 ?   item.Evolucionfisioterapia[0].Planchas1: "",
            item.Evolucionfisioterapia.length > 0 ?   item.Evolucionfisioterapia[0].Planchas0: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].Sumatoria3: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Sumatoria2: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Sumatoria1: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].Sumatoria0: "",
            item.Evolucionfisioterapia.length > 0 ? item.Evolucionfisioterapia[0].FlexoresTronco: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].FlexoresPlancha: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].FlexoresColumna: "",
            item.Evolucionfisioterapia.length > 0 ?  item.Evolucionfisioterapia[0].FlexoresRecta: "",
            item.Evolucionfisioterapia.length > 0 ?   item.Evolucionfisioterapia[0].ObservacionesGlobal: "",
            



            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].LesionEvaluacion: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].CualLesionEvaluacion: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].MmssSimetria: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].MmssAsimetria: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].MmiiSimetria: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].MmiiAsimetria: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].DescripcionAsimetria: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].DescripcionSimetria: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].PosturaEvaluacionFisio: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].TrotePuesto: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].GeneroFisioterapia: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].SuperiosTest: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].ExcelenteTest: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].BuenoTest: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].Promediotest: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].DeficienteTest: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].PobreTest: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].MuyPobreTest: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].PasoVallaCali: "",
            
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].SentadillaCali: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].TijeraCali: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].HombroCali: "",
            item.EvaluacionFisioterapia.length > 0 ?  item.EvaluacionFisioterapia[0].PiernaCali: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].TroncoCali: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].EstabilidadCali: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].TotalCali: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].SentadillaObs: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].TijeraObs: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].HombroObs: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].PiernaObs: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].TroncoObs: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].PasoVallaObs: "",
            
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].EstabilidadObs: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].TotalObs: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].ResistenciaF: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].ResistenciaM: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].Puentef: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].PuenteM: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].ExtensoresF: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].ExtensoresM: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].PuenteDF: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].PuenteDM: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].PuenteIF: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].PuenteIM: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].ExcelenteEvaluacion: "",
            item.EvaluacionFisioterapia.length > 0 ?     item.EvaluacionFisioterapia[0].MuyBuenoEvaluacion: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].BuenoEvaluacion: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].RegularEvaluacion: "",
            item.EvaluacionFisioterapia.length > 0 ?    item.EvaluacionFisioterapia[0].MaloRegulacion: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].CalificacionObs: "",
            item.EvaluacionFisioterapia.length > 0 ?   item.EvaluacionFisioterapia[0].RecomendacionesObs: "",
            


            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitGenero : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitSuperior : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitExcelente : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitBueno : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitPromedio : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitDeficiente : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitPobre : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSitMuyPobre : "",


            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSentadillaProfunda1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSentadillaProfunda2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPasodeValla1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPasodeValla2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestTijeraLinea1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestTijeraLinea2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestHombro1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestHombro2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestMovilidadPierna1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestMovilidadPierna2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPush1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPush2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestEstabilidadTronco1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestEstabilidadTronco2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSumarotia1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestSumarotia2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestObservaciones1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestObservaciones2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestFlexora1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestFlexora2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPuente1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPuente2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestResistencia1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestResistencia2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPuenteLateral1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestPuenteLateral2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreSumatoria1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreSumatoria2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreObservaciones1 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreObservaciones2 : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreExcelente : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreMuyBueno : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreBueno : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreRegular : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].TestCoreMalo : "",
            item.EvaluacionFisioterapia.length > 0 ? item.EvaluacionFisioterapia[0].FirmaDoctorFisioterapia : "",
           

            
     






            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdFisioterapia + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdFisioterapia + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdFisioterapia + ')" ></i>&ensp;' +
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdFisioterapia + ')" ></i>&ensp;'

        ]).draw(false);


        var LesionActual = tablaFisioterapiaDeportiva.column(5);
            var NumeroReLesiones= tablaFisioterapiaDeportiva.column(6);
            var TratamientoLesion= tablaFisioterapiaDeportiva.column(7);
            var HuesoLesion= tablaFisioterapiaDeportiva.column(8);
            var LigamentoLesion= tablaFisioterapiaDeportiva.column(9);
            var TendonLesion= tablaFisioterapiaDeportiva.column(10);
            var MusculoLesion= tablaFisioterapiaDeportiva.column(11);
            var CabezaLesion= tablaFisioterapiaDeportiva.column(12);
            var ColumnaLesion= tablaFisioterapiaDeportiva.column(13);
            var HombroLesion= tablaFisioterapiaDeportiva.column(14);
            var CodoLesion= tablaFisioterapiaDeportiva.column(15);
            var MuñecamanoLesion= tablaFisioterapiaDeportiva.column(16);
            var CaderaLesion= tablaFisioterapiaDeportiva.column(17);
            var RodillaLesion= tablaFisioterapiaDeportiva.column(18);
            var CuelloPieLesion= tablaFisioterapiaDeportiva.column(19);



            var MmssRealDer= tablaFisioterapiaDeportiva.column(20);
            var MmssRealizq= tablaFisioterapiaDeportiva.column(21);
            var AparenteMmssDer= tablaFisioterapiaDeportiva.column(22);
            var AparenteMmssIzq= tablaFisioterapiaDeportiva.column(23);
            var RealMmiiDer= tablaFisioterapiaDeportiva.column(24);
            var RealMmiiIzq= tablaFisioterapiaDeportiva.column(25);
            var AparenteMmiiDer= tablaFisioterapiaDeportiva.column(26);
            var AparenteMmiiIzq= tablaFisioterapiaDeportiva.column(27);
            var ObservacionesPosturaFisio= tablaFisioterapiaDeportiva.column(28);
            var BalanceoOjosAbiertos2= tablaFisioterapiaDeportiva.column(29);
            var BalanceoOjosAbiertos1= tablaFisioterapiaDeportiva.column(30);
            var BalanceoOjosAbiertos0= tablaFisioterapiaDeportiva.column(31);
            var BalanceoOjosAbiertosObservaciones= tablaFisioterapiaDeportiva.column(32);
            var BalanceoOjosCerrados2= tablaFisioterapiaDeportiva.column(33);
            var BalanceoOjosCerrados1= tablaFisioterapiaDeportiva.column(34);
            var BalanceoOjosCerrados0= tablaFisioterapiaDeportiva.column(35);
            var BalanceoOjosCerradosObservaciones= tablaFisioterapiaDeportiva.column(36);
            var FlexibilidadFisioterapia= tablaFisioterapiaDeportiva.column(37);


            var Sentadilla3= tablaFisioterapiaDeportiva.column(38);
            var Sentadilla2= tablaFisioterapiaDeportiva.column(39);
            var Sentadilla1= tablaFisioterapiaDeportiva.column(40);
            var Sentadilla0= tablaFisioterapiaDeportiva.column(41);
            var PasosValla3= tablaFisioterapiaDeportiva.column(42);
            var PasosValle2= tablaFisioterapiaDeportiva.column(43);
            var PasosValle1= tablaFisioterapiaDeportiva.column(44);
            var PasosValle0= tablaFisioterapiaDeportiva.column(45);
            var TijeraLinea3= tablaFisioterapiaDeportiva.column(46);
            var TijeraLinea2= tablaFisioterapiaDeportiva.column(47);
            var TijeraLinea1= tablaFisioterapiaDeportiva.column(48);
            var TijeraLinea0= tablaFisioterapiaDeportiva.column(49);
            var HombroActividad3= tablaFisioterapiaDeportiva.column(50);
            var HombroActividad2= tablaFisioterapiaDeportiva.column(51);
            var HombroActividad1= tablaFisioterapiaDeportiva.column(52);
            var HombroActividad0= tablaFisioterapiaDeportiva.column(53);
            var Pierna3= tablaFisioterapiaDeportiva.column(54);
            var Pierna2= tablaFisioterapiaDeportiva.column(55);
            var Pierna1= tablaFisioterapiaDeportiva.column(56);
            var Pierna0= tablaFisioterapiaDeportiva.column(57);
            var Pulgares3= tablaFisioterapiaDeportiva.column(58);
            var Pulgares2= tablaFisioterapiaDeportiva.column(59);
            var Pulgares1= tablaFisioterapiaDeportiva.column(60);
            var Pulgares0= tablaFisioterapiaDeportiva.column(61);
            var Tronco3= tablaFisioterapiaDeportiva.column(62);
            var Tronco2= tablaFisioterapiaDeportiva.column(63);
            var Tronco1= tablaFisioterapiaDeportiva.column(64);
            var Tronco0= tablaFisioterapiaDeportiva.column(65);
            var Planchas3= tablaFisioterapiaDeportiva.column(66);
            var Planchas2= tablaFisioterapiaDeportiva.column(67);
            var Planchas1= tablaFisioterapiaDeportiva.column(68);
            var Planchas0= tablaFisioterapiaDeportiva.column(69);
            var Sumatoria3= tablaFisioterapiaDeportiva.column(70);
            var Sumatoria2= tablaFisioterapiaDeportiva.column(71);
            var Sumatoria1= tablaFisioterapiaDeportiva.column(72);
            var Sumatoria0= tablaFisioterapiaDeportiva.column(73);
            var FlexoresTronco= tablaFisioterapiaDeportiva.column(74);
            var FlexoresPlancha= tablaFisioterapiaDeportiva.column(75);
            var FlexoresColumna= tablaFisioterapiaDeportiva.column(76);
            var FlexoresRecta= tablaFisioterapiaDeportiva.column(77);
            var ObservacionesGlobal= tablaFisioterapiaDeportiva.column(78);




             var LesionEvaluacion= tablaFisioterapiaDeportiva.column(79);
             var CualLesionEvaluacion= tablaFisioterapiaDeportiva.column(80);
             var MmssSimetria= tablaFisioterapiaDeportiva.column(81);
             var MmssAsimetria= tablaFisioterapiaDeportiva.column(82);
             var MmiiSimetria= tablaFisioterapiaDeportiva.column(83);
             var MmiiAsimetria= tablaFisioterapiaDeportiva.column(84);
             var DescripcionAsimetria= tablaFisioterapiaDeportiva.column(85);
             var DescripcionSimetria= tablaFisioterapiaDeportiva.column(86);
             var PosturaEvaluacionFisio= tablaFisioterapiaDeportiva.column(87);
             var TrotePuesto= tablaFisioterapiaDeportiva.column(88);
             var GeneroFisioterapia= tablaFisioterapiaDeportiva.column(89);
             var SuperiosTest= tablaFisioterapiaDeportiva.column(90);
             var ExcelenteTest= tablaFisioterapiaDeportiva.column(91);
             var BuenoTest= tablaFisioterapiaDeportiva.column(92);
             var Promediotest= tablaFisioterapiaDeportiva.column(93);
             var DeficienteTest= tablaFisioterapiaDeportiva.column(94);
             var PobreTest= tablaFisioterapiaDeportiva.column(95);
        var MuyPobreTest = tablaFisioterapiaDeportiva.column(96);
        var PasoVallaCali = tablaFisioterapiaDeportiva.column(97);
        
             var SentadillaCali= tablaFisioterapiaDeportiva.column(98);
             var TijeraCali= tablaFisioterapiaDeportiva.column(99);
             var HombroCali= tablaFisioterapiaDeportiva.column(100);
             var PiernaCali= tablaFisioterapiaDeportiva.column(101);
             var TroncoCali= tablaFisioterapiaDeportiva.column(102);
             var EstabilidadCali= tablaFisioterapiaDeportiva.column(103);
             var TotalCali= tablaFisioterapiaDeportiva.column(104);
             var SentadillaObs= tablaFisioterapiaDeportiva.column(105);
             var TijeraObs= tablaFisioterapiaDeportiva.column(106);
             var HombroObs= tablaFisioterapiaDeportiva.column(107);
             var PiernaObs= tablaFisioterapiaDeportiva.column(108);
        var TroncoObs = tablaFisioterapiaDeportiva.column(109);
        var PasoVallaObs = tablaFisioterapiaDeportiva.column(110);
        
             var EstabilidadObs= tablaFisioterapiaDeportiva.column(111);
             var TotalObs= tablaFisioterapiaDeportiva.column(112);
             var ResistenciaF= tablaFisioterapiaDeportiva.column(113);
             var ResistenciaM= tablaFisioterapiaDeportiva.column(114);
             var Puentef= tablaFisioterapiaDeportiva.column(115);
             var PuenteM= tablaFisioterapiaDeportiva.column(116);
             var ExtensoresF= tablaFisioterapiaDeportiva.column(117);
             var ExtensoresM= tablaFisioterapiaDeportiva.column(118);
             var PuenteDF= tablaFisioterapiaDeportiva.column(119);
             var PuenteDM= tablaFisioterapiaDeportiva.column(120);
             var PuenteIF= tablaFisioterapiaDeportiva.column(121);
             var PuenteIM= tablaFisioterapiaDeportiva.column(122);
             var ExcelenteEvaluacion= tablaFisioterapiaDeportiva.column(123);
             var MuyBuenoEvaluacion= tablaFisioterapiaDeportiva.column(124);
             var BuenoEvaluacion= tablaFisioterapiaDeportiva.column(125);
             var RegularEvaluacion= tablaFisioterapiaDeportiva.column(126);
             var MaloRegulacion= tablaFisioterapiaDeportiva.column(127);
             var CalificacionObs= tablaFisioterapiaDeportiva.column(128);
             var RecomendacionesObs= tablaFisioterapiaDeportiva.column(129);
             
        var TestSitGenero = tablaFisioterapiaDeportiva.column(130);
        var TestSitSuperior = tablaFisioterapiaDeportiva.column(131);
        var TestSitExcelente = tablaFisioterapiaDeportiva.column(132);
        var TestSitBueno = tablaFisioterapiaDeportiva.column(133);
        var TestSitPromedio = tablaFisioterapiaDeportiva.column(134);
        var TestSitDeficiente = tablaFisioterapiaDeportiva.column(135);
        var TestSitPobre = tablaFisioterapiaDeportiva.column(136);
        var TestSitMuyPobre = tablaFisioterapiaDeportiva.column(137);
        var TestSentadillaProfunda1 = tablaFisioterapiaDeportiva.column(138);
        var TestSentadillaProfunda2 = tablaFisioterapiaDeportiva.column(139);
        var TestPasodeValla1 = tablaFisioterapiaDeportiva.column(140);
        var TestPasodeValla2 = tablaFisioterapiaDeportiva.column(141);
        var TestTijeraLinea1 = tablaFisioterapiaDeportiva.column(142);
        var TestTijeraLinea2 = tablaFisioterapiaDeportiva.column(143);
        var TestHombro1 = tablaFisioterapiaDeportiva.column(144);
        var TestHombro2 = tablaFisioterapiaDeportiva.column(145);
        var TestMovilidadPierna1 = tablaFisioterapiaDeportiva.column(146);
        var TestMovilidadPierna2 = tablaFisioterapiaDeportiva.column(147);
        var TestPush1 = tablaFisioterapiaDeportiva.column(148);
        var TestPush2 = tablaFisioterapiaDeportiva.column(149);
        var TestEstabilidadTronco1 = tablaFisioterapiaDeportiva.column(150);
        var TestEstabilidadTronco2 = tablaFisioterapiaDeportiva.column(151);
        var TestSumarotia1 = tablaFisioterapiaDeportiva.column(152);
        var TestSumarotia2 = tablaFisioterapiaDeportiva.column(153);
        var TestObservaciones1 = tablaFisioterapiaDeportiva.column(154);
        var TestObservaciones2 = tablaFisioterapiaDeportiva.column(155);
        var TestFlexora1 = tablaFisioterapiaDeportiva.column(156);
        var TestFlexora2 = tablaFisioterapiaDeportiva.column(157);
        var TestPuente1 = tablaFisioterapiaDeportiva.column(158);
        var TestPuente2 = tablaFisioterapiaDeportiva.column(159);
        var TestResistencia1 = tablaFisioterapiaDeportiva.column(160);
        var TestResistencia2 = tablaFisioterapiaDeportiva.column(161);
        var TestPuenteLateral1 = tablaFisioterapiaDeportiva.column(162);
        var TestPuenteLateral2 = tablaFisioterapiaDeportiva.column(163);
        var TestCoreSumatoria1 = tablaFisioterapiaDeportiva.column(164);
        var TestCoreSumatoria2 = tablaFisioterapiaDeportiva.column(165);
        var TestCoreObservaciones1 = tablaFisioterapiaDeportiva.column(166);
        var TestCoreObservaciones2 = tablaFisioterapiaDeportiva.column(167);
        var TestCoreExcelente = tablaFisioterapiaDeportiva.column(168);
        var TestCoreMuyBueno = tablaFisioterapiaDeportiva.column(169);
        var TestCoreBueno = tablaFisioterapiaDeportiva.column(170);
        var TestCoreRegular = tablaFisioterapiaDeportiva.column(171);
        var TestCoreMalo = tablaFisioterapiaDeportiva.column(172);

        var FirmaDoctorFisioterapia = tablaFisioterapiaDeportiva.column(173);
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
        PasoVallaCali.visible(false);
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
        PasoVallaObs.visible(false);
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

        TestSitGenero.visible(false);
        TestSitSuperior.visible(false);
        TestSitExcelente.visible(false);
        TestSitBueno.visible(false);
        TestSitPromedio.visible(false);
        TestSitDeficiente.visible(false);
        TestSitPobre.visible(false);
        TestSitMuyPobre.visible(false);
        TestSentadillaProfunda1.visible(false);
        TestSentadillaProfunda2.visible(false);
        TestPasodeValla1.visible(false);
        TestPasodeValla2.visible(false);
        TestTijeraLinea1.visible(false);
        TestTijeraLinea2.visible(false);
        TestHombro1.visible(false);
        TestHombro2.visible(false);
        TestMovilidadPierna1.visible(false);
        TestMovilidadPierna2.visible(false);
        TestPush1.visible(false);
        TestPush2.visible(false);
        TestEstabilidadTronco1.visible(false);
        TestEstabilidadTronco2.visible(false);
        TestSumarotia1.visible(false);
        TestSumarotia2.visible(false);
        TestObservaciones1.visible(false);
        TestObservaciones2.visible(false);
        TestFlexora1.visible(false);
        TestFlexora2.visible(false);
        TestPuente1.visible(false);
        TestPuente2.visible(false);
        TestResistencia1.visible(false);
        TestResistencia2.visible(false);
        TestPuenteLateral1.visible(false);
        TestPuenteLateral2.visible(false);
        TestCoreSumatoria1.visible(false);
        TestCoreSumatoria2.visible(false);
        TestCoreObservaciones1.visible(false);
        TestCoreObservaciones2.visible(false);
        TestCoreExcelente.visible(false);
        TestCoreMuyBueno.visible(false);
        TestCoreBueno.visible(false);
        TestCoreRegular.visible(false);
        TestCoreMalo.visible(false);
        FirmaDoctorFisioterapia.visible(false);


    });
}


function ActualizardEportistaData(IFisioDepor) {
    window.location.href = '../Fisioterapia/Agregar?IdFisioReg=' + IFisioDepor;

}
function DetalleData(IFisioDepor) {
    window.location.href = '../Fisioterapia/Agregar?IdFisioReg=' + IFisioDepor + "&Viewdetail=SI";

}

function Eliminar(IdMed) {
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
                Get_Data(RecargarTabla, '/Fisioterapia/Eliminar?idFisio=' + IdMed);
            }
            else {
                swal.close()
            }
        });

}

function VerPdf(IdEncTrabj) {
    var formURL = '../Report?tipo=Fisio' + "&IdUser=" + IdEncTrabj;
    window.open(formURL, "_blank");

}
//function VerPdfMerge(IdEncTrabj) {
//    var formURL = '/Report/PdfMergerGeneric?tipo=Fisio' + "&IdUser=" + IdEncTrabj;
//    window.open(formURL, "_blank");

//}

function RecargarTabla() {
    Get_Data(CargarTabla, '/Fisioterapia/GetListFisioterapiaDeportiva')
}