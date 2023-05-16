var tablaNutricionDeportiva = [];
$(document).ready(function () {

    RenderTable('datatable-Nutricion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,61], null, {
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

    tablaNutricionDeportiva = $('#datatable-Nutricion').DataTable();
    Get_Data(CargarTabla, '/Nutricion/GetListNutricionDeportiva')

});

function CargarTabla(data) {
    tablaNutricionDeportiva.clear().draw();
    let NutricionDeport = data.objeto;
    console.log(NutricionDeport);
    $.each(NutricionDeport, function (index, item) {
        tablaNutricionDeportiva.row.add([
            item.NumIdentificacion,
            item.CodNutricion,
            item.AntecedentesNutri,
            item.FamiliaresNutri,
            item.PersonalesNutri,

            item.FarmacologicosNutri,
            item.GinecologicoNutri,
            item.SueñoNutri,
            item.PielNutri,
            item.ApetitoNutri,
            item.FracturaNutri,
            item.AspectoFisicoNutri,
            item.PieNutri,
            item.TiempoRecuperacionNutri,
            item.BioquimicoNutri,
            item.HidratacionNutri,
            item.HorarioActividadNutri,
            item.NumIdentificacion,

            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].DesayunoNutri : "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MediaMañanaNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].AlmuerzoNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MediaTardeNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].CenaNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].AlergicoNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].SuplementacionNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].AlimentoNoDeseados: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].EdadNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].PesoNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].TallaNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].ImcNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].EscapularNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].TricepsNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].BicepsNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].AbdomenNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MusloNutri: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].PiernaNutri: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].BrazosNutrii: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].AntebrazoNutrii: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MuñecaNutrii: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].PechoNutrii: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].CinturaNutrii: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].CaderaNutrii: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MusloSuperiorNutrii: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].MusloMedioNutrii: "",
            item.AnamnesisNutricion.length > 0 ? item.AnamnesisNutricion[0].PiernaPerimetroNutrii: "",
            item.AnamnesisNutricion.length > 0 ?  item.AnamnesisNutricion[0].TobilloPerimetroNutrii: "",

            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].HumeroNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].MuñecaHumeroNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].FermorHumeroNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].ImcNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].GrasaNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].MusculosNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].HuesosNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].ResidualesNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].PesosGrasosNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].PesosMusculosNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].PesoResiducalesNutri: "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].DiagnosticoNutri : "",
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].TratamientoNutri : "",
            
            item.SeguimientoNutricion.length > 0 ? item.SeguimientoNutricion[0].ProximaCitaNutri: "",
            item.SeguimientoNutricion.length > 0 ?  item.SeguimientoNutricion[0].FirmaDoctorNutri: "",

            //item.NombreMonitor + " " + item.PrimerApellido,
            /* item.FechaConsulta,*/
            //'<i class=" fa fa-window-close" title="Eliminar" onclick="Eliminar(' + item.IdMedicina + ')" ></i>&ensp;' +
            //'<i class="fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdMedicina + ')"></i>'

            //'<i class="btn btn-danger btn-group-sm icon-trash" title="Eliminar" onclick="Eliminar(' + item.IdNutricion + ')" ></i>&ensp;' +
            '<i class="btn btn-primary btn-group-sm fa fa-pencil-square-o" id="edit_ActEco_' + index + '" title="Modificar" style="fontsize:90px !important" onclick="ActualizardEportistaData(' + item.IdNutricion + ')"></i>&ensp;' +
            '<i class="btn btn-info btn-group-sm icon-magazine" title="Detalle" onclick="DetalleData(' + item.IdNutricion + ')" ></i>&ensp;'+
            '<i class="btn btn-warning btn-group-sm icon-shredder" title="PDF" onclick="VerPdf(' + item.IdNutricion + ')" ></i>&ensp;'

        ]).draw(false);
       
        var PersonalesNutri= tablaNutricionDeportiva.column(4);
        var FarmacologicosNutri = tablaNutricionDeportiva.column(5);
        var    GinecologicoNutri= tablaNutricionDeportiva.column(6);
        var   SueñoNutri= tablaNutricionDeportiva.column(7);
        var    PielNutri= tablaNutricionDeportiva.column(8);
        var    ApetitoNutri= tablaNutricionDeportiva.column(9);
        var     FracturaNutri= tablaNutricionDeportiva.column(10);
        var    AspectoFisicoNutri= tablaNutricionDeportiva.column(11);
        var      PieNutri= tablaNutricionDeportiva.column(12);
        var   TiempoRecuperacionNutri= tablaNutricionDeportiva.column(13);
        var    BioquimicoNutri= tablaNutricionDeportiva.column(14);
        var   HidratacionNutri= tablaNutricionDeportiva.column(15);
        var   HorarioActividadNutri= tablaNutricionDeportiva.column(16);
        var  NumIdentificacion= tablaNutricionDeportiva.column(17);

        var  DesayunoNutri= tablaNutricionDeportiva.column(18);
        var   MediaMañanaNutri= tablaNutricionDeportiva.column(19);
        var   AlmuerzoNutri= tablaNutricionDeportiva.column(20);
        var  MediaTardeNutri= tablaNutricionDeportiva.column(21);
        var  CenaNutri= tablaNutricionDeportiva.column(22);
        var  AlergicoNutri= tablaNutricionDeportiva.column(23);
        var  SuplementacionNutri= tablaNutricionDeportiva.column(24);
        var  AlimentoNoDeseados= tablaNutricionDeportiva.column(25);
        var  EdadNutri= tablaNutricionDeportiva.column(26);
        var  PesoNutri= tablaNutricionDeportiva.column(27);
        var  TallaNutri= tablaNutricionDeportiva.column(28);
        var  ImcNutri= tablaNutricionDeportiva.column(29);
        var  EscapularNutri= tablaNutricionDeportiva.column(30);
        var TricepsNutri= tablaNutricionDeportiva.column(31);
        var BicepsNutri= tablaNutricionDeportiva.column(32);
        var  AbdomenNutri= tablaNutricionDeportiva.column(33);
        var  MusloNutri= tablaNutricionDeportiva.column(34);
        var PiernaNutri= tablaNutricionDeportiva.column(35);
        var  BrazosNutrii= tablaNutricionDeportiva.column(36);
        var  AntebrazoNutrii= tablaNutricionDeportiva.column(37);
        var  MuñecaNutrii= tablaNutricionDeportiva.column(38);
        var  PechoNutrii= tablaNutricionDeportiva.column(39);
        var  CinturaNutrii= tablaNutricionDeportiva.column(40);
        var  CaderaNutrii= tablaNutricionDeportiva.column(41);
        var  MusloSuperiorNutrii= tablaNutricionDeportiva.column(42);
        var  MusloMedioNutrii= tablaNutricionDeportiva.column(43);
        var  PiernaPerimetroNutrii= tablaNutricionDeportiva.column(44);
        var  TobilloPerimetroNutrii= tablaNutricionDeportiva.column(45);

        var  HumeroNutri= tablaNutricionDeportiva.column(46);
        var   MuñecaHumeroNutri= tablaNutricionDeportiva.column(47);
        var   FermorHumeroNutri= tablaNutricionDeportiva.column(48);
        var  ImcNutri= tablaNutricionDeportiva.column(49);
        var GrasaNutri = tablaNutricionDeportiva.column(50);
        var MusculosNutri= tablaNutricionDeportiva.column(51);
        var HuesosNutri= tablaNutricionDeportiva.column(52);
        var ResidualesNutri= tablaNutricionDeportiva.column(53);
        var PesosGrasosNutri= tablaNutricionDeportiva.column(54);
        var PesosMusculosNutri= tablaNutricionDeportiva.column(55);
        var  PesoResiducalesNutri= tablaNutricionDeportiva.column(56);
        var DiagnosticoNutri = tablaNutricionDeportiva.column(57);
        var TratamientoNutri = tablaNutricionDeportiva.column(58);
        
        var  ProximaCitaNutri= tablaNutricionDeportiva.column(59);
        var FirmaDoctorNutri= tablaNutricionDeportiva.column(60);



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
           NumIdentificacion.visible(false);

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
           ImcNutri.visible(false);
           GrasaNutri.visible(false);
           MusculosNutri.visible(false);
           HuesosNutri.visible(false);
           ResidualesNutri.visible(false);
           PesosGrasosNutri.visible(false);
           PesosMusculosNutri.visible(false);
           PesoResiducalesNutri.visible(false);
        DiagnosticoNutri.visible(false);
        TratamientoNutri.visible(false);
           ProximaCitaNutri.visible(false);
           FirmaDoctorNutri.visible(false);

    });
}


function ActualizardEportistaData(IdNutriDepor) {
    window.location.href = '../Nutricion/Agregar?IdNutriReg=' + IdNutriDepor;

}
function DetalleData(IdNutriDepor) {
    window.location.href = '../Nutricion/Agregar?IdNutriReg=' + IdNutriDepor + "&Viewdetail=SI";

}

function Eliminar(IdNutriDep) {
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
                Get_Data(RecargarTabla, '/Nutricion/Eliminar?idNutri=' + IdNutriDep);
            }
            else {
                swal.close()
            }
        });

}

function VerPdf(NumIdentificacion) {
    var formURL = '../Report?tipo=Nutri' + "&IdUser=" + NumIdentificacion;
    window.open(formURL, "_blank");

}

function RecargarTabla() {
    Get_Data(CargarTabla, '/Nutricion/GetListNutricionDeportiva')
}
