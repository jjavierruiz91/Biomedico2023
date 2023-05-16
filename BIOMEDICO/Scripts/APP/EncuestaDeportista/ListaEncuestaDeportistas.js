var TablaEncuestaDeportistas = [];
$(document).ready(function () {

    RenderTable('datatable-EncuestaDeportistas', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], null, {
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
                filename: "EncuestaTrabajadores",
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

    TablaEncuestaDeportistas = $('#datatable-EncuestaDeportistas').DataTable();
    Get_Data(CargarTabla, '/EncuestaDeportistas/GetListEncuestaDeportistas')

});

function CargarTabla(data) {
    TablaEncuestaDeportistas.clear().draw();
    let EncuestaDeportistasDeport = data.objeto;
    console.log(EncuestaDeportistasDeport);
    $.each(EncuestaDeportistasDeport, function (index, item) {
        TablaEncuestaDeportistas.row.add([
            item.IdentificacionDeportista,
            item.PrimerNombreDepor,
            item.SegundonombreDepor,
            item.PrimerApellidoDepor,
            item.SegundoApellidoDepor,
            /*JSONDateconverter(item.FechaDepor),*/
            item.FechaDepor == undefined ? '' : JSONDateconverter(item.FechaDepor),
            item.EdadDepor,
            item.DireccionDepor,
            item.BarrioDepor,
            item.DondeNacistesDepor,
            item.NacionalidadDepor,

         

            
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].DesayunoNutri : "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MediaMañanaNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].AlmuerzoNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MediaTardeNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].CenaNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].AlergicoNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].SuplementacionNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].AlimentoNoDeseados: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].EdadNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].PesoNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].TallaNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].ImcNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].EscapularNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].TricepsNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].BicepsNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].AbdomenNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MusloNutri: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].PiernaNutri: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].BrazosNutrii: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].AntebrazoNutrii: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MuñecaNutrii: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].PechoNutrii: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].CinturaNutrii: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].CaderaNutrii: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MusloSuperiorNutrii: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MusloMedioNutrii: "",
            //item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].PiernaPerimetroNutrii: "",
            //item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].TobilloPerimetroNutrii: "",

            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].HumeroNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].MuñecaHumeroNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].FermorHumeroNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].ImcNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].GrasaNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].MusculosNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].HuesosNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].ResidualesNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].PesosGrasosNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].PesosMusculosNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].PesoResiducalesNutri: "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].DiagnosticoNutri : "",
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].TratamientoNutri : "",
            
            //item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].ProximaCitaNutri: "",
            //item.SeguimientoNutricion.length > 0 ?  item.SeguimientoNutricion[0].FirmaDoctorNutri: "",

            ////item.NombreMonitor + " " + item.PrimerApellido,
            /* item.FechaConsulta,*/
            //'<i class=" fa fa-window-close" title="Eliminar" onclick="Eliminar(' + item.IdMedicina + ')" ></i>&ensp;' +
            //'<i class="fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicina + ')"></i>'

            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdNutricion + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdEncuestaDeportista + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdEncuestaDeportista + ')" ></i>&ensp;'
            //'<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdEncuestaDeportista + ')" ></i>&ensp;'

        ]).draw(false);
       
        var EdadDepor = TablaEncuestaDeportistas.column(6);
        var DireccionDepor = TablaEncuestaDeportistas.column(7);
        var BarrioDepor = TablaEncuestaDeportistas.column(8);
        var DondeNacistesDepor = TablaEncuestaDeportistas.column(9);
        var NacionalidadDepor = TablaEncuestaDeportistas.column(10);
        //var    PielNutri= TablaEncuestaDeportistas.column(8);
        //var    ApetitoNutri= TablaEncuestaDeportistas.column(9);
        //var     FracturaNutri= TablaEncuestaDeportistas.column(10);
        //var    AspectoFisicoNutri= TablaEncuestaDeportistas.column(11);
        //var      PieNutri= TablaEncuestaDeportistas.column(12);
        //var   TiempoRecuperacionNutri= TablaEncuestaDeportistas.column(13);
        //var    BioquimicoNutri= TablaEncuestaDeportistas.column(14);
        //var   HidratacionNutri= TablaEncuestaDeportistas.column(15);
        //var   HorarioActividadNutri= TablaEncuestaDeportistas.column(16);
        //var  NumIdentificacion= TablaEncuestaDeportistas.column(17);

        //var  DesayunoNutri= TablaEncuestaDeportistas.column(18);
        //var   MediaMañanaNutri= TablaEncuestaDeportistas.column(19);
        //var   AlmuerzoNutri= TablaEncuestaDeportistas.column(20);
        //var  MediaTardeNutri= TablaEncuestaDeportistas.column(21);
        //var  CenaNutri= TablaEncuestaDeportistas.column(22);
        //var  AlergicoNutri= TablaEncuestaDeportistas.column(23);
        //var  SuplementacionNutri= TablaEncuestaDeportistas.column(24);
        //var  AlimentoNoDeseados= TablaEncuestaDeportistas.column(25);
        //var  EdadNutri= TablaEncuestaDeportistas.column(26);
        //var  PesoNutri= TablaEncuestaDeportistas.column(27);
        //var  TallaNutri= TablaEncuestaDeportistas.column(28);
        //var  ImcNutri= TablaEncuestaDeportistas.column(29);
        //var  EscapularNutri= TablaEncuestaDeportistas.column(30);
        //var TricepsNutri= TablaEncuestaDeportistas.column(31);
        //var BicepsNutri= TablaEncuestaDeportistas.column(32);
        //var  AbdomenNutri= TablaEncuestaDeportistas.column(33);
        //var  MusloNutri= TablaEncuestaDeportistas.column(34);
        //var PiernaNutri= TablaEncuestaDeportistas.column(35);
        //var  BrazosNutrii= TablaEncuestaDeportistas.column(36);
        //var  AntebrazoNutrii= TablaEncuestaDeportistas.column(37);
        //var  MuñecaNutrii= TablaEncuestaDeportistas.column(38);
        //var  PechoNutrii= TablaEncuestaDeportistas.column(39);
        //var  CinturaNutrii= TablaEncuestaDeportistas.column(40);
        //var  CaderaNutrii= TablaEncuestaDeportistas.column(41);
        //var  MusloSuperiorNutrii= TablaEncuestaDeportistas.column(42);
        //var  MusloMedioNutrii= TablaEncuestaDeportistas.column(43);
        //var  PiernaPerimetroNutrii= TablaEncuestaDeportistas.column(44);
        //var  TobilloPerimetroNutrii= TablaEncuestaDeportistas.column(45);

        //var  HumeroNutri= TablaEncuestaDeportistas.column(46);
        //var   MuñecaHumeroNutri= TablaEncuestaDeportistas.column(47);
        //var   FermorHumeroNutri= TablaEncuestaDeportistas.column(48);
        //var  ImcNutri= TablaEncuestaDeportistas.column(49);
        //var GrasaNutri = TablaEncuestaDeportistas.column(50);
        //var MusculosNutri= TablaEncuestaDeportistas.column(51);
        //var HuesosNutri= TablaEncuestaDeportistas.column(52);
        //var ResidualesNutri= TablaEncuestaDeportistas.column(53);
        //var PesosGrasosNutri= TablaEncuestaDeportistas.column(54);
        //var PesosMusculosNutri= TablaEncuestaDeportistas.column(55);
        //var  PesoResiducalesNutri= TablaEncuestaDeportistas.column(56);
        //var DiagnosticoNutri = TablaEncuestaDeportistas.column(57);
        //var TratamientoNutri = TablaEncuestaDeportistas.column(58);
        
        //var  ProximaCitaNutri= TablaEncuestaDeportistas.column(59);
        //var FirmaDoctorNutri= TablaEncuestaDeportistas.column(60);


        EdadDepor.visible(false);
        DireccionDepor.visible(false);
        BarrioDepor.visible(false);
        DondeNacistesDepor.visible(false);
        NacionalidadDepor.visible(false);
        //PersonalesNutri.visible(false);
        //   FarmacologicosNutri.visible(false);
        //   GinecologicoNutri.visible(false);
        //   SueñoNutri.visible(false);
        //   PielNutri.visible(false);
        //   ApetitoNutri.visible(false);
        //   FracturaNutri.visible(false);
        //   AspectoFisicoNutri.visible(false);
        //   PieNutri.visible(false);
        //   TiempoRecuperacionNutri.visible(false);
        //   BioquimicoNutri.visible(false);
        //   HidratacionNutri.visible(false);
        //   HorarioActividadNutri.visible(false);
        //   NumIdentificacion.visible(false);

        //   DesayunoNutri.visible(false);
        //   MediaMañanaNutri.visible(false);
        //   AlmuerzoNutri.visible(false);
        //   MediaTardeNutri.visible(false);
        //   CenaNutri.visible(false);
        //   AlergicoNutri.visible(false);
        //   SuplementacionNutri.visible(false);
        //   AlimentoNoDeseados.visible(false);
        //   EdadNutri.visible(false);
        //   PesoNutri.visible(false);
        //   TallaNutri.visible(false);
        //   ImcNutri.visible(false);
        //   EscapularNutri.visible(false);
        //   TricepsNutri.visible(false);
        //   BicepsNutri.visible(false);
        //   AbdomenNutri.visible(false);
        //   MusloNutri.visible(false);
        //   PiernaNutri.visible(false);
        //   BrazosNutrii.visible(false);
        //   AntebrazoNutrii.visible(false);
        //   MuñecaNutrii.visible(false);
        //   PechoNutrii.visible(false);
        //   CinturaNutrii.visible(false);
        //   CaderaNutrii.visible(false);
        //   MusloSuperiorNutrii.visible(false);
        //   MusloMedioNutrii.visible(false);
        //   PiernaPerimetroNutrii.visible(false);
        //   TobilloPerimetroNutrii.visible(false);

        //   HumeroNutri.visible(false);
        //   MuñecaHumeroNutri.visible(false);
        //   FermorHumeroNutri.visible(false);
        //   ImcNutri.visible(false);
        //   GrasaNutri.visible(false);
        //   MusculosNutri.visible(false);
        //   HuesosNutri.visible(false);
        //   ResidualesNutri.visible(false);
        //   PesosGrasosNutri.visible(false);
        //   PesosMusculosNutri.visible(false);
        //   PesoResiducalesNutri.visible(false);
        //DiagnosticoNutri.visible(false);
        //TratamientoNutri.visible(false);
        //   ProximaCitaNutri.visible(false);
        //   FirmaDoctorNutri.visible(false);

    });
}


function ActualizardEportistaData(IdEncuestaDeportista) {
    window.location.href = '../EncuestaDeportistas/Agregar?Id=' + IdEncuestaDeportista;

}
function DetalleData(IdEncuestaDeportista) {
    window.location.href = '../EncuestaDeportistas/Agregar?Id=' + IdEncuestaDeportista + "&Viewdetail=SI";

}


function VerPdf(NumIdentificacion) {
    var formURL = '../Report?tipo=Nutri' + "&IdUser=" + NumIdentificacion;
    window.open(formURL, "_blank");

}

function RecargarTabla() {
    Get_Data(CargarTabla, '/EncuestaDeportistas/GetListEncuestaDeportistas')
}
