using BIOMEDICO.Clases;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace BIOMEDICO.Models
{

    public enum TipoParametro
    {
        Parametro,
        DataSource
    }

    public class Parametros
    {
        public string name { get; set; }
        public string value { get; set; }
        public TipoParametro tipo { get; set; }

        public List<Campo> campos { get; set; }

        public Parametros() { }
        public Parametros(string nombre, string valor, TipoParametro t, List<Campo> c)
        {

            this.name = nombre;
            this.value = valor;
            this.tipo = t;
            this.campos = c;
        }

        public Parametros(string nombre, string valor, TipoParametro t)
        {
            this.name = nombre;
            this.value = valor;
            this.tipo = t;
        }
    }
    public class Campo
    {
        public string name { get; set; }
        public int posicion { get; set; }

        public string Type { get; set; }


        public Campo(string name, int position, string type)
        {
            this.name = name;
            this.posicion = position;
            this.Type = type;
        }


        public Campo()
        {
        }

    }
    public class ReporteModel
    {
        public enum ReportFormat { PDF = 1, Word = 2, Excel = 3 }

        public ReporteModel()
        {
            List<ReportDataSource> ReportDataSets = new List<ReportDataSource>();
        }

        //Name of the report
        public string Name { get; set; }

        //Language of the report
        public string ReportLanguage { get; set; }

        //Reference to the RDLC file that contain the report definition
        public string FileName { get; set; }

        //date for printing the report
        public DateTime ReportDate { get; set; }

        //the user name that is printing the report
        public string UserNamPrinting { get; set; }

        public ReportParameterCollection Parameters { get; set; }
        //dataset holder
        public List<ReportDataSource> ReportDataSets { get; set; }


        public virtual void Iteracion_Handler(object sender, SubreportProcessingEventArgs e)
        {


        }

        //report format needed
        public ReportFormat Format { get; set; }
        public bool ViewAsAttachment { get; set; }
        //an helper class to store the data for each report data set
        //public class ReportDataSet
        //{
        //    public string DatasetName { get; set; }
        //    public List<dynamic> DataSetData { get; set; }
        //    //public Barcode DataSetCode { get; set; } 
        //}

        public string ReporExportFileName
        {
            get
            {
                return string.Format("attachment; filename={0}{1}", this.Name, ReporExportExtention);
            }
        }
        public string ReporExportExtention
        {
            get
            {
                switch (this.Format)
                {
                    case ReporteModel.ReportFormat.Word: return ".doc";
                    case ReporteModel.ReportFormat.Excel: return ".xls";
                    default:
                        return ".pdf";
                }
            }
        }

        public string LastmimeType
        {
            get
            {
                return mimeType;
            }
        }
        private string mimeType;
        public byte[] RenderReport()
        {
            //geting repot data from the business object

            //creating a new report and setting its path
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = HttpContext.Current.Server.MapPath(this.FileName);
            localReport.DisplayName = Name;

            // Se muestra el subreporte 
            //adding the reort datasets with there names

            //enabeling external images
            localReport.EnableExternalImages = true;

            localReport.SetParameters(Parameters);

            foreach (var dataset in this.ReportDataSets)
            {
                //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                localReport.DataSources.Add(dataset);
            }
            foreach (var dataset in this.ReportDataSets)
            {
                //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                localReport.DataSources.Add(dataset);
            }

            localReport.SubreportProcessing += new SubreportProcessingEventHandler(Iteracion_Handler);
            localReport.Refresh();


            string reportType = this.Format.ToString();

            string encoding;
            string fileNameExtension;

            //The DeviceInfo settings should be changed based on the reportType
            //http://msdn2.microsoft.com/en-us/library/ms155397.aspx
            string deviceInfo =
            "<DeviceInfo>" +
            "  <OutputFormat>" + Format.ToString() + "</OutputFormat>" +
            "</DeviceInfo>";

            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;

            //Render the report
            renderedBytes = localReport.Render(
                reportType,
                deviceInfo,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streams,
                out warnings);

            return renderedBytes;
        }

        public byte[] RenderReportContextExterno(HttpServerUtilityBase server)
        {
            //geting repot data from the business object

            //creating a new report and setting its path
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = server.MapPath(this.FileName);
            localReport.DisplayName = Name;

            // Se muestra el subreporte 
            //adding the reort datasets with there names

            //enabeling external images
            localReport.EnableExternalImages = true;

            localReport.SetParameters(Parameters);

            foreach (var dataset in this.ReportDataSets)
            {
                //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                localReport.DataSources.Add(dataset);
            }
            foreach (var dataset in this.ReportDataSets)
            {
                //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                localReport.DataSources.Add(dataset);
            }

            localReport.SubreportProcessing += new SubreportProcessingEventHandler(Iteracion_Handler);
            localReport.Refresh();


            string reportType = this.Format.ToString();

            string encoding;
            string fileNameExtension;

            //The DeviceInfo settings should be changed based on the reportType
            //http://msdn2.microsoft.com/en-us/library/ms155397.aspx
            string deviceInfo =
            "<DeviceInfo>" +
            "  <OutputFormat>" + Format.ToString() + "</OutputFormat>" +
            "</DeviceInfo>";

            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;

            //Render the report
            renderedBytes = localReport.Render(
                reportType,
                deviceInfo,
                out mimeType,
                out encoding,
                out fileNameExtension,
                out streams,
                out warnings);

            return renderedBytes;
        }

        public byte[] RenderReportII()
        {
            LocalReport report = new LocalReport();


            string format = "PDF";
            string deviceInfo = null;
            string encoding = String.Empty;
            string mimeType = String.Empty;
            string extension = String.Empty;
            Warning[] warnings = null;
            string[] streamIDs = null;

            report = new LocalReport();
            report.EnableExternalImages = true;
            report.ReportPath = System.Web.HttpContext.Current.Server.MapPath(this.FileName);
            report.DisplayName = Name;


            report.SetParameters(Parameters);

            foreach (var dataset in this.ReportDataSets)
            {
                //ReportDataSource reportDataSource = new ReportDataSource(dataset.DatasetName, dataset.DataSetData);
                report.DataSources.Add(dataset);
            }

            report.SubreportProcessing += new SubreportProcessingEventHandler(Iteracion_Handler);
            report.Refresh();

            deviceInfo =
       "<DeviceInfo>" +
       "<HumanReadablePDF>True</HumanReadablePDF>" +
       "</DeviceInfo>";

            // <DeviceInfo><HumanReadablePDF>True</HumanReadablePDF></DeviceInfo>



            Byte[] pdfArray = report.Render(
               format,
               deviceInfo,
               out mimeType,
               out encoding,
               out extension,
               out streamIDs,
               out warnings);


            return pdfArray;
        }
    }

    public class Core
    {

        public async static Task<string> GetImageAsBase64Url(string url)
        {
            
            using (var client = new HttpClient())
            {
                var bytes = await client.GetByteArrayAsync(url);
                return "image/jpeg;base64," + Convert.ToBase64String(bytes);
            }
        }
        public static Image Base64ToImage(string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            // Convert byte[] to Image
            using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                Image image = Image.FromStream(ms, true);
                return image;
            }
        }
        public static string ConvertImageToBase64(Image image, ImageFormat format)
        {
            byte[] imageArray;

            using (System.IO.MemoryStream imageStream = new System.IO.MemoryStream())
            {
                image.Save(imageStream, format);
                imageArray = new byte[imageStream.Length];
                imageStream.Seek(0, System.IO.SeekOrigin.Begin);
                imageStream.Read(imageArray, 0, int.Parse(imageStream.Length.ToString()));
            }

            return Convert.ToBase64String(imageArray);
        }

      
        public ReporteModel LlenarReporte(string type, string Op, int IdUser, string Opcion = "")
        {
            //Datos dt = new Datos();
            var reportViewModel = new ReporteModel();

            try
            {
                switch (type)
                {

                    case "Fisio":
                        return new ReportFisioterapiaBlanco(IdUser,Op);
                    case "Nutri":
                        return new ReportNutricionBlanco(IdUser, Op);
                    case "Psico":
                        return new ReportPsicologiaBlanco(IdUser, Op);
                    case "Med":
                        return new ReportMedicinaBlanco(IdUser, Op);
                    case "Deport":
                        return new ReportDeportistaBlanco(IdUser, Op);
                    case "ControlFisio":
                        return new ReportControlFisioterapiaBlanco(IdUser, Op);
                    case "ControlMedicina":
                        return new ReportControlMedicinaBlanco(IdUser, Op);
                    case "ControlPsicologia":
                        return new ReportControlPsicologiaBlanco(IdUser, Op);
                    //case "ControlNutricion":
                    //    return new ReportControlNutricionBlanco(IdUser, Op);
                    default:
                    
                        return null;
                }
            }
            catch (Exception ex)
            {
                return reportViewModel;
            }
        }




        public class ReportFisioterapiaBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportFisioterapiaBlanco(int IdFisioterapia,string Op =null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportFisioterapia.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();



                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    Fisioterapia fisioterapia = new Fisioterapia();
                    if (Op != "0")
                    {
                         fisioterapia = db.Fisioterapia.OrderByDescending(w=>w.FechaRegistro).ToList().FirstOrDefault(w => w.NumIdentificacion == IdFisioterapia);
                    }
                    else
                    {
                        fisioterapia = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == IdFisioterapia);
                    }
                   
                    if (fisioterapia != null)
                    {
                        Parameters.Add(new ReportParameter("IdFisioterapia", fisioterapia.IdFisioterapia.ToString()));
                        Parameters.Add(new ReportParameter("CodFisioterapi", fisioterapia.CodFisioterapi == null ? "" : fisioterapia.CodFisioterapi.ToString()));
                        Parameters.Add(new ReportParameter("ReportaLesion", fisioterapia.ReportaLesion == null ? "" : fisioterapia.ReportaLesion.ToString()));
                        Parameters.Add(new ReportParameter("AntecedentesLesion", fisioterapia.CualLesion == null ? "" : fisioterapia.AntecedentesLesion));
                        Parameters.Add(new ReportParameter("CualLesion", fisioterapia.CualLesion==null?"": fisioterapia.CualLesion.ToString()));
                        Parameters.Add(new ReportParameter("LesionActual", fisioterapia.LesionActual == null ? "" : fisioterapia.LesionActual));
                        Parameters.Add(new ReportParameter("NumeroReLesiones", fisioterapia.NumeroReLesiones == null ? "" :fisioterapia.NumeroReLesiones));
                        Parameters.Add(new ReportParameter("TratamientoLesion", fisioterapia.TratamientoLesion == null ? "" : fisioterapia.TratamientoLesion));
                        Parameters.Add(new ReportParameter("HuesoLesion", fisioterapia.HuesoLesion == null ? "" : fisioterapia.HuesoLesion));
                        Parameters.Add(new ReportParameter("LigamentoLesion", fisioterapia.LigamentoLesion == null ? "" : fisioterapia.LigamentoLesion));
                        Parameters.Add(new ReportParameter("TendonLesion", fisioterapia.TendonLesion == null ? "" : fisioterapia.TendonLesion.ToString()));
                        Parameters.Add(new ReportParameter("MusculoLesion", fisioterapia.MusculoLesion == null ? "" : fisioterapia.MusculoLesion.ToString()));
                        Parameters.Add(new ReportParameter("CabezaLesion", fisioterapia.CabezaLesion == null ? "" : fisioterapia.CabezaLesion));
                        Parameters.Add(new ReportParameter("ColumnaLesion", fisioterapia.ColumnaLesion == null ? "" : fisioterapia.ColumnaLesion));
                        Parameters.Add(new ReportParameter("HombroLesion", fisioterapia.HombroLesion == null ? "" : fisioterapia.HombroLesion));
                        Parameters.Add(new ReportParameter("CodoLesion", fisioterapia.CodoLesion == null ? "" : fisioterapia.CodoLesion));
                        Parameters.Add(new ReportParameter("MuñecamanoLesion", fisioterapia.MuñecamanoLesion == null ? "" : fisioterapia.MuñecamanoLesion));
                        Parameters.Add(new ReportParameter("CaderaLesion", fisioterapia.CaderaLesion == null ? "" : fisioterapia.CaderaLesion));
                        Parameters.Add(new ReportParameter("RodillaLesion", fisioterapia.RodillaLesion == null ? "" : fisioterapia.RodillaLesion));
                        Parameters.Add(new ReportParameter("CuelloPieLesion", fisioterapia.CuelloPieLesion == null ? "" : fisioterapia.CuelloPieLesion)); 
                        Parameters.Add(new ReportParameter("FechaRegistro", fisioterapia.FechaRegistro == null ? "" : fisioterapia.FechaRegistro.ToString())); 



                         var AntecedentesFisioterapia = db.AntecedentesFisioterapia.FirstOrDefault(w => w.IdFisioterapia == fisioterapia.IdFisioterapia);
                        if (AntecedentesFisioterapia != null)
                        {
                            Parameters.Add(new ReportParameter("MmssRealDer", AntecedentesFisioterapia.MmssRealDer == null ? "" : AntecedentesFisioterapia.MmssRealDer));
                            Parameters.Add(new ReportParameter("MmssRealizq", AntecedentesFisioterapia.MmssRealizq == null ? "" : AntecedentesFisioterapia.MmssRealizq));
                            Parameters.Add(new ReportParameter("AparenteMmssDer", AntecedentesFisioterapia.AparenteMmssDer == null ? "" : AntecedentesFisioterapia.AparenteMmssDer));
                            Parameters.Add(new ReportParameter("AparenteMmssIzq", AntecedentesFisioterapia.AparenteMmssIzq == null ? "" : AntecedentesFisioterapia.AparenteMmssIzq));
                            Parameters.Add(new ReportParameter("RealMmiiDer", AntecedentesFisioterapia.RealMmiiDer == null ? "" : AntecedentesFisioterapia.RealMmiiDer));
                            Parameters.Add(new ReportParameter("RealMmiiIzq", AntecedentesFisioterapia.RealMmiiIzq == null ? "" : AntecedentesFisioterapia.RealMmiiIzq));
                            Parameters.Add(new ReportParameter("AparenteMmiiDer", AntecedentesFisioterapia.AparenteMmiiDer == null ? "" : AntecedentesFisioterapia.AparenteMmiiDer));
                            Parameters.Add(new ReportParameter("AparenteMmiiIzq", AntecedentesFisioterapia.AparenteMmiiIzq == null ? "" : AntecedentesFisioterapia.AparenteMmiiIzq));
                            Parameters.Add(new ReportParameter("ObservacionesPosturaFisio", AntecedentesFisioterapia.ObservacionesPosturaFisio == null ? "" : AntecedentesFisioterapia.ObservacionesPosturaFisio));
                            Parameters.Add(new ReportParameter("BalanceoOjosAbiertos2", AntecedentesFisioterapia.BalanceoOjosAbiertos2 == null ? "" : AntecedentesFisioterapia.BalanceoOjosAbiertos2));
                            Parameters.Add(new ReportParameter("BalanceoOjosAbiertos1", AntecedentesFisioterapia.BalanceoOjosAbiertos1 == null ? "" : AntecedentesFisioterapia.BalanceoOjosAbiertos1));
                            Parameters.Add(new ReportParameter("BalanceoOjosAbiertos0", AntecedentesFisioterapia.BalanceoOjosAbiertos0 == null ? "" : AntecedentesFisioterapia.BalanceoOjosAbiertos0));
                            Parameters.Add(new ReportParameter("BalanceoOjosAbiertosObservaciones", AntecedentesFisioterapia.BalanceoOjosAbiertosObservaciones == null ? "" : AntecedentesFisioterapia.BalanceoOjosAbiertosObservaciones));
                            Parameters.Add(new ReportParameter("BalanceoOjosCerrados2", AntecedentesFisioterapia.BalanceoOjosCerrados2 == null ? "" : AntecedentesFisioterapia.BalanceoOjosCerrados2));
                            Parameters.Add(new ReportParameter("BalanceoOjosCerrados1", AntecedentesFisioterapia.BalanceoOjosCerrados1 == null ? "" : AntecedentesFisioterapia.BalanceoOjosCerrados1));
                            Parameters.Add(new ReportParameter("BalanceoOjosCerrados0", AntecedentesFisioterapia.BalanceoOjosCerrados0 == null ? "" : AntecedentesFisioterapia.BalanceoOjosCerrados0));
                            Parameters.Add(new ReportParameter("BalanceoOjosCerradosObservaciones", AntecedentesFisioterapia.BalanceoOjosCerradosObservaciones == null ? "" : AntecedentesFisioterapia.BalanceoOjosCerradosObservaciones));
                            Parameters.Add(new ReportParameter("FlexibilidadFisioterapia", AntecedentesFisioterapia.FlexibilidadFisioterapia == null ? "" : AntecedentesFisioterapia.FlexibilidadFisioterapia));

                        }


                        var Evolucionfisioterapia = db.Evolucionfisioterapia.FirstOrDefault(w => w.IdFisioterapia == fisioterapia.IdFisioterapia);

                        if (Evolucionfisioterapia != null)
                        {
                            Parameters.Add(new ReportParameter("Sentadilla3", Evolucionfisioterapia.Sentadilla3 == null ? "" : Evolucionfisioterapia.Sentadilla3));
                            Parameters.Add(new ReportParameter("Sentadilla2", Evolucionfisioterapia.Sentadilla2 == null ? "" : Evolucionfisioterapia.Sentadilla2));
                            Parameters.Add(new ReportParameter("Sentadilla1", Evolucionfisioterapia.Sentadilla1 == null ? "" : Evolucionfisioterapia.Sentadilla1));
                            Parameters.Add(new ReportParameter("Sentadilla0", Evolucionfisioterapia.Sentadilla0 == null ? "" : Evolucionfisioterapia.Sentadilla0));
                            Parameters.Add(new ReportParameter("PasosValla3", Evolucionfisioterapia.PasosValla3 == null ? "" : Evolucionfisioterapia.PasosValla3));
                            Parameters.Add(new ReportParameter("PasosValle2", Evolucionfisioterapia.PasosValle2 == null ? "" : Evolucionfisioterapia.PasosValle2));
                            Parameters.Add(new ReportParameter("PasosValle1", Evolucionfisioterapia.PasosValle1 == null ? "" : Evolucionfisioterapia.PasosValle1));
                            Parameters.Add(new ReportParameter("PasosValle0", Evolucionfisioterapia.PasosValle0 == null ? "" : Evolucionfisioterapia.PasosValle0));
                            Parameters.Add(new ReportParameter("TijeraLinea3", Evolucionfisioterapia.TijeraLinea3 == null ? "" : Evolucionfisioterapia.TijeraLinea3));
                            Parameters.Add(new ReportParameter("TijeraLinea2", Evolucionfisioterapia.TijeraLinea2 == null ? "" : Evolucionfisioterapia.TijeraLinea2));
                            Parameters.Add(new ReportParameter("TijeraLinea1", Evolucionfisioterapia.TijeraLinea1 == null ? "" : Evolucionfisioterapia.TijeraLinea1));
                            Parameters.Add(new ReportParameter("TijeraLinea0", Evolucionfisioterapia.TijeraLinea0 == null ? "" : Evolucionfisioterapia.TijeraLinea0.ToString()));
                            Parameters.Add(new ReportParameter("HombroActividad3", Evolucionfisioterapia.HombroActividad3 == null ? "" : Evolucionfisioterapia.HombroActividad3.ToString()));
                            Parameters.Add(new ReportParameter("HombroActividad2", Evolucionfisioterapia.HombroActividad2 == null ? "" : Evolucionfisioterapia.HombroActividad2.ToString()));
                            Parameters.Add(new ReportParameter("HombroActividad1", Evolucionfisioterapia.HombroActividad1 == null ? "" : Evolucionfisioterapia.HombroActividad1.ToString()));
                            Parameters.Add(new ReportParameter("HombroActividad0", Evolucionfisioterapia.HombroActividad0 == null ? "" : Evolucionfisioterapia.HombroActividad0.ToString()));
                            Parameters.Add(new ReportParameter("Pierna3", Evolucionfisioterapia.Pierna3 == null ? "" : Evolucionfisioterapia.Pierna3));
                            Parameters.Add(new ReportParameter("Pierna2", Evolucionfisioterapia.Pierna2 == null ? "" : Evolucionfisioterapia.Pierna2));
                            Parameters.Add(new ReportParameter("Pierna1", Evolucionfisioterapia.Pierna1 == null ? "" : Evolucionfisioterapia.Pierna1));
                            Parameters.Add(new ReportParameter("Pierna0", Evolucionfisioterapia.Pierna0 == null ? "" : Evolucionfisioterapia.Pierna0));
                            Parameters.Add(new ReportParameter("Pulgares3", Evolucionfisioterapia.Pulgares3 == null ? "" : Evolucionfisioterapia.Pulgares3));
                            Parameters.Add(new ReportParameter("Pulgares2", Evolucionfisioterapia.Pulgares2 == null ? "" : Evolucionfisioterapia.Pulgares2));
                            Parameters.Add(new ReportParameter("Pulgares1", Evolucionfisioterapia.Pulgares1 == null ? "" : Evolucionfisioterapia.Pulgares1));
                            Parameters.Add(new ReportParameter("Pulgares0", Evolucionfisioterapia.Pulgares0 == null ? "" : Evolucionfisioterapia.Pulgares0));
                            Parameters.Add(new ReportParameter("Tronco3", Evolucionfisioterapia.Tronco3 == null ? "" : Evolucionfisioterapia.Tronco3));
                            Parameters.Add(new ReportParameter("Tronco2", Evolucionfisioterapia.Tronco2 == null ? "" : Evolucionfisioterapia.Tronco2));
                            Parameters.Add(new ReportParameter("Tronco1", Evolucionfisioterapia.Tronco1 == null ? "" : Evolucionfisioterapia.Tronco1));
                            Parameters.Add(new ReportParameter("Tronco0", Evolucionfisioterapia.Tronco0 == null ? "" : Evolucionfisioterapia.Tronco0));
                            Parameters.Add(new ReportParameter("Planchas3", Evolucionfisioterapia.Planchas3 == null ? "" : Evolucionfisioterapia.Planchas3));
                            Parameters.Add(new ReportParameter("Planchas2", Evolucionfisioterapia.Planchas2 == null ? "" : Evolucionfisioterapia.Planchas2));
                            Parameters.Add(new ReportParameter("Planchas1", Evolucionfisioterapia.Planchas1 == null ? "" : Evolucionfisioterapia.Planchas1));
                            Parameters.Add(new ReportParameter("Planchas0", Evolucionfisioterapia.Planchas0 == null ? "" : Evolucionfisioterapia.Planchas0));
                            Parameters.Add(new ReportParameter("Sumatoria3", Evolucionfisioterapia.Sumatoria3 == null ? "" : Evolucionfisioterapia.Sumatoria3));
                            Parameters.Add(new ReportParameter("Sumatoria2", Evolucionfisioterapia.Sumatoria2 == null ? "" : Evolucionfisioterapia.Sumatoria2));
                            Parameters.Add(new ReportParameter("Sumatoria1", Evolucionfisioterapia.Sumatoria1 == null ? "" : Evolucionfisioterapia.Sumatoria1));
                            Parameters.Add(new ReportParameter("Sumatoria0", Evolucionfisioterapia.Sumatoria0 == null ? "" : Evolucionfisioterapia.Sumatoria0));
                            Parameters.Add(new ReportParameter("FlexoresTronco", Evolucionfisioterapia.FlexoresTronco == null ? "" : Evolucionfisioterapia.FlexoresTronco));
                            Parameters.Add(new ReportParameter("FlexoresPlancha", Evolucionfisioterapia.FlexoresPlancha == null ? "" : Evolucionfisioterapia.FlexoresPlancha));
                            Parameters.Add(new ReportParameter("FlexoresColumna", Evolucionfisioterapia.FlexoresColumna == null ? "" : Evolucionfisioterapia.FlexoresColumna));
                            Parameters.Add(new ReportParameter("FlexoresRecta", Evolucionfisioterapia.FlexoresRecta == null ? "" : Evolucionfisioterapia.FlexoresRecta));
                            Parameters.Add(new ReportParameter("ObservacionesGlobal", Evolucionfisioterapia.ObservacionesGlobal == null ? "" : Evolucionfisioterapia.ObservacionesGlobal));


                        }





                        var EvaluacionFisioterapia = db.EvaluacionFisioterapia.FirstOrDefault(w => w.IdFisioterapia == fisioterapia.IdFisioterapia);
                        if (EvaluacionFisioterapia != null)
                        {

                            Parameters.Add(new ReportParameter("LesionEvaluacion", EvaluacionFisioterapia.LesionEvaluacion == null ? "" : EvaluacionFisioterapia.LesionEvaluacion));
                            Parameters.Add(new ReportParameter("CualLesionEvaluacion", EvaluacionFisioterapia.CualLesionEvaluacion == null ? "" : EvaluacionFisioterapia.CualLesionEvaluacion));
                            Parameters.Add(new ReportParameter("MmssSimetria", EvaluacionFisioterapia.MmssSimetria == null ? "" : EvaluacionFisioterapia.MmssSimetria));
                            Parameters.Add(new ReportParameter("MmssAsimetria", EvaluacionFisioterapia.MmssAsimetria == null ? "" : EvaluacionFisioterapia.MmssAsimetria));
                            Parameters.Add(new ReportParameter("MmiiSimetria", EvaluacionFisioterapia.MmiiSimetria == null ? "" : EvaluacionFisioterapia.MmiiSimetria));
                            Parameters.Add(new ReportParameter("MmiiAsimetria", EvaluacionFisioterapia.MmiiAsimetria == null ? "" : EvaluacionFisioterapia.MmiiAsimetria));
                            Parameters.Add(new ReportParameter("DescripcionAsimetria", EvaluacionFisioterapia.DescripcionAsimetria == null ? "" : EvaluacionFisioterapia.DescripcionAsimetria));
                            Parameters.Add(new ReportParameter("DescripcionSimetria", EvaluacionFisioterapia.DescripcionSimetria == null ? "" : EvaluacionFisioterapia.DescripcionSimetria));
                            Parameters.Add(new ReportParameter("PosturaEvaluacionFisio", EvaluacionFisioterapia.PosturaEvaluacionFisio == null ? "" : EvaluacionFisioterapia.PosturaEvaluacionFisio));
                            Parameters.Add(new ReportParameter("TrotePuesto", EvaluacionFisioterapia.TrotePuesto == null ? "" : EvaluacionFisioterapia.TrotePuesto));
                            Parameters.Add(new ReportParameter("SuperiosTest", EvaluacionFisioterapia.SuperiosTest == null ? "" : EvaluacionFisioterapia.SuperiosTest));
                            Parameters.Add(new ReportParameter("ExcelenteTest", EvaluacionFisioterapia.ExcelenteTest == null ? "" : EvaluacionFisioterapia.ExcelenteTest));
                            Parameters.Add(new ReportParameter("BuenoTest", EvaluacionFisioterapia.BuenoTest == null ? "" : EvaluacionFisioterapia.BuenoTest));
                            Parameters.Add(new ReportParameter("Promediotest", EvaluacionFisioterapia.Promediotest == null ? "" : EvaluacionFisioterapia.Promediotest));
                            Parameters.Add(new ReportParameter("DeficienteTest", EvaluacionFisioterapia.DeficienteTest == null ? "" : EvaluacionFisioterapia.DeficienteTest));
                            Parameters.Add(new ReportParameter("PobreTest", EvaluacionFisioterapia.PobreTest == null ? "" : EvaluacionFisioterapia.PobreTest));
                            Parameters.Add(new ReportParameter("MuyPobreTest", EvaluacionFisioterapia.MuyPobreTest == null ? "" : EvaluacionFisioterapia.MuyPobreTest));
                            Parameters.Add(new ReportParameter("PasoVallaCali", EvaluacionFisioterapia.PasoVallaCali == null ? "" : EvaluacionFisioterapia.PasoVallaCali));

                            Parameters.Add(new ReportParameter("SentadillaCali", EvaluacionFisioterapia.SentadillaCali == null ? "" : EvaluacionFisioterapia.SentadillaCali));
                            Parameters.Add(new ReportParameter("TijeraCali", EvaluacionFisioterapia.TijeraCali == null ? "" : EvaluacionFisioterapia.TijeraCali));
                            Parameters.Add(new ReportParameter("HombroCali", EvaluacionFisioterapia.HombroCali == null ? "" : EvaluacionFisioterapia.HombroCali));
                            Parameters.Add(new ReportParameter("PiernaCali", EvaluacionFisioterapia.PiernaCali == null ? "" : EvaluacionFisioterapia.PiernaCali));
                            Parameters.Add(new ReportParameter("TroncoCali", EvaluacionFisioterapia.TroncoCali == null ? "" : EvaluacionFisioterapia.TroncoCali));
                            Parameters.Add(new ReportParameter("EstabilidadCali", EvaluacionFisioterapia.EstabilidadCali == null ? "" : EvaluacionFisioterapia.EstabilidadCali));
                            Parameters.Add(new ReportParameter("TotalCali", EvaluacionFisioterapia.TotalCali == null ? "" : EvaluacionFisioterapia.TotalCali));
                            Parameters.Add(new ReportParameter("SentadillaObs", EvaluacionFisioterapia.SentadillaObs == null ? "" : EvaluacionFisioterapia.SentadillaObs));
                            Parameters.Add(new ReportParameter("TijeraObs", EvaluacionFisioterapia.TijeraObs == null ? "" : EvaluacionFisioterapia.TijeraObs));
                            Parameters.Add(new ReportParameter("HombroObs", EvaluacionFisioterapia.HombroObs == null ? "" : EvaluacionFisioterapia.HombroObs));
                            Parameters.Add(new ReportParameter("PiernaObs", EvaluacionFisioterapia.PiernaObs == null ? "" : EvaluacionFisioterapia.PiernaObs));
                            Parameters.Add(new ReportParameter("TroncoObs", EvaluacionFisioterapia.TroncoObs == null ? "" : EvaluacionFisioterapia.TroncoObs));
                            Parameters.Add(new ReportParameter("PasoVallaObs", EvaluacionFisioterapia.PasoVallaObs == null ? "" : EvaluacionFisioterapia.PasoVallaObs));

                            Parameters.Add(new ReportParameter("EstabilidadObs", EvaluacionFisioterapia.EstabilidadObs == null ? "" : EvaluacionFisioterapia.EstabilidadObs));
                            Parameters.Add(new ReportParameter("TotalObs", EvaluacionFisioterapia.TotalObs == null ? "" : EvaluacionFisioterapia.TotalObs));
                            Parameters.Add(new ReportParameter("ResistenciaF", EvaluacionFisioterapia.ResistenciaF == null ? "" : EvaluacionFisioterapia.ResistenciaF));
                            Parameters.Add(new ReportParameter("ResistenciaM", EvaluacionFisioterapia.ResistenciaM == null ? "" : EvaluacionFisioterapia.ResistenciaM));
                            Parameters.Add(new ReportParameter("Puentef", EvaluacionFisioterapia.Puentef == null ? "" : EvaluacionFisioterapia.Puentef));
                            Parameters.Add(new ReportParameter("PuenteM", EvaluacionFisioterapia.PuenteM == null ? "" : EvaluacionFisioterapia.PuenteM));
                            Parameters.Add(new ReportParameter("ExtensoresF", EvaluacionFisioterapia.ExtensoresF == null ? "" : EvaluacionFisioterapia.ExtensoresF));
                            Parameters.Add(new ReportParameter("ExtensoresM", EvaluacionFisioterapia.ExtensoresM == null ? "" : EvaluacionFisioterapia.ExtensoresM));
                            Parameters.Add(new ReportParameter("PuenteDF", EvaluacionFisioterapia.PuenteDF == null ? "" : EvaluacionFisioterapia.PuenteDF));
                            Parameters.Add(new ReportParameter("PuenteDM", EvaluacionFisioterapia.PuenteDM == null ? "" : EvaluacionFisioterapia.PuenteDM));
                            Parameters.Add(new ReportParameter("PuenteIF", EvaluacionFisioterapia.PuenteIF == null ? "" : EvaluacionFisioterapia.PuenteIF));
                            Parameters.Add(new ReportParameter("PuenteIM", EvaluacionFisioterapia.PuenteIM == null ? "" : EvaluacionFisioterapia.PuenteIM));
                            Parameters.Add(new ReportParameter("ExcelenteEvaluacion", EvaluacionFisioterapia.ExcelenteEvaluacion == null ? "" : EvaluacionFisioterapia.ExcelenteEvaluacion));
                            Parameters.Add(new ReportParameter("MuyBuenoEvaluacion", EvaluacionFisioterapia.MuyBuenoEvaluacion == null ? "" : EvaluacionFisioterapia.MuyBuenoEvaluacion));
                            Parameters.Add(new ReportParameter("BuenoEvaluacion", EvaluacionFisioterapia.BuenoEvaluacion == null ? "" : EvaluacionFisioterapia.BuenoEvaluacion));
                            Parameters.Add(new ReportParameter("RegularEvaluacion", EvaluacionFisioterapia.RegularEvaluacion == null ? "" : EvaluacionFisioterapia.RegularEvaluacion));
                            Parameters.Add(new ReportParameter("MaloRegulacion", EvaluacionFisioterapia.MaloRegulacion == null ? "" : EvaluacionFisioterapia.MaloRegulacion));
                            Parameters.Add(new ReportParameter("CalificacionObs", EvaluacionFisioterapia.CalificacionObs == null ? "" : EvaluacionFisioterapia.CalificacionObs));
                            Parameters.Add(new ReportParameter("RecomendacionesObs", EvaluacionFisioterapia.RecomendacionesObs == null ? "" : EvaluacionFisioterapia.RecomendacionesObs));
                            Parameters.Add(new ReportParameter("FirmaDoctorFisioterapia", EvaluacionFisioterapia.FirmaDoctorFisioterapia == null ? "" : EvaluacionFisioterapia.FirmaDoctorFisioterapia));

                            string ImagenBase64 = string.Empty;
                            string Ruta = string.Empty;
                            switch (EvaluacionFisioterapia.FirmaDoctorFisioterapia.Trim())
                            {
                                case "1065599074":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ENRIQUE_JIMENEZ.png");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49742607":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANA_RAMIREZ.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49606718":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANDREA_PABA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;

                                case "49761713":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_DAZA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49778637":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_ROA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49787755":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/MAIRA_ROMERO.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "56077833":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/LUISANA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;


                            }
                        }



                        var HistoriaClinicaFisioterapia = db.HistoriaClinicaFisioterapia.FirstOrDefault(w => w.NumIdentificacion == fisioterapia.NumIdentificacion);

                        if (HistoriaClinicaFisioterapia != null)
                        {
                            Parameters.Add(new ReportParameter("PatologicosClinicaFisio", HistoriaClinicaFisioterapia.PatologicosClinicaFisio == null ? "" : HistoriaClinicaFisioterapia.PatologicosClinicaFisio));
                            Parameters.Add(new ReportParameter("TraumaticosClinicaFisio", HistoriaClinicaFisioterapia.TraumaticosClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.TraumaticosClinicaFisio));
                            Parameters.Add(new ReportParameter("FarmacologicosClinicaFisio", HistoriaClinicaFisioterapia.FarmacologicosClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.FarmacologicosClinicaFisio));
                            Parameters.Add(new ReportParameter("FamiliaresClinicaFisio", HistoriaClinicaFisioterapia.FamiliaresClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.FamiliaresClinicaFisio));
                            Parameters.Add(new ReportParameter("DiagnosticoMedicoClinicaFisio", HistoriaClinicaFisioterapia.DiagnosticoMedicoClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.DiagnosticoMedicoClinicaFisio));
                            Parameters.Add(new ReportParameter("MotivoConsultaClinicaFisio", HistoriaClinicaFisioterapia.MotivoConsultaClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.MotivoConsultaClinicaFisio));
                            Parameters.Add(new ReportParameter("DolorClinicaFisio", HistoriaClinicaFisioterapia.DolorClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.DolorClinicaFisio));
                            Parameters.Add(new ReportParameter("EdemaClinicaFisio", HistoriaClinicaFisioterapia.EdemaClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.EdemaClinicaFisio));
                            Parameters.Add(new ReportParameter("AlteradaClinicaFisio", HistoriaClinicaFisioterapia.AlteradaClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.AlteradaClinicaFisio));
                            Parameters.Add(new ReportParameter("NoalterdaClinicaFisio", HistoriaClinicaFisioterapia.NoalterdaClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.NoalterdaClinicaFisio));
                            Parameters.Add(new ReportParameter("ScreemFuncionalClinicaFisio", HistoriaClinicaFisioterapia.ScreemFuncionalClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.ScreemFuncionalClinicaFisio));
                            Parameters.Add(new ReportParameter("DesempeñoClinicaFisio", HistoriaClinicaFisioterapia.DesempeñoClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.DesempeñoClinicaFisio));
                            Parameters.Add(new ReportParameter("PosturaClinicaFisio", HistoriaClinicaFisioterapia.PosturaClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.PosturaClinicaFisio));
                            Parameters.Add(new ReportParameter("FechaClinicaFisio", HistoriaClinicaFisioterapia.FechaClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.FechaClinicaFisio.ToString()));
                            Parameters.Add(new ReportParameter("PlanTratamientoClinicaFisio", HistoriaClinicaFisioterapia.PlanTratamientoClinicaFisio == null ? "" :  HistoriaClinicaFisioterapia.PlanTratamientoClinicaFisio));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio1", HistoriaClinicaFisioterapia.EvolucionClinicaFisio1 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio1));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio2", HistoriaClinicaFisioterapia.EvolucionClinicaFisio2 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio2));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio3", HistoriaClinicaFisioterapia.EvolucionClinicaFisio3 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio3));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio4", HistoriaClinicaFisioterapia.EvolucionClinicaFisio4 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio4));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio5", HistoriaClinicaFisioterapia.EvolucionClinicaFisio5 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio5));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio6", HistoriaClinicaFisioterapia.EvolucionClinicaFisio6 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio6));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio7", HistoriaClinicaFisioterapia.EvolucionClinicaFisio7 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio7));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio8", HistoriaClinicaFisioterapia.EvolucionClinicaFisio8 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio8));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio9", HistoriaClinicaFisioterapia.EvolucionClinicaFisio9 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio9));
                            Parameters.Add(new ReportParameter("EvolucionClinicaFisio10", HistoriaClinicaFisioterapia.EvolucionClinicaFisio10 == null ? "" :  HistoriaClinicaFisioterapia.EvolucionClinicaFisio10));
                        }
                       



                        var Deportistas = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == fisioterapia.NumIdentificacion);
                        if (Deportistas != null)
                        {


                            Parameters.Add(new ReportParameter("PrimerNombre", Deportistas.PrimerNombre == null ? "" : Deportistas.PrimerNombre));
                            Parameters.Add(new ReportParameter("SegundoNombre", Deportistas.SegundoNombre == null ? "" : Deportistas.SegundoNombre));
                            Parameters.Add(new ReportParameter("PrimerApellido", Deportistas.PrimerApellido == null ? "" : Deportistas.PrimerApellido));
                            Parameters.Add(new ReportParameter("SegundoApellido", Deportistas.SegundoApellido == null ? "" : Deportistas.SegundoApellido));
                            Parameters.Add(new ReportParameter("Edad", Deportistas.Edad == null ? "" : Deportistas.Edad));
                            Parameters.Add(new ReportParameter("Genero", Deportistas.Genero == null ? "" : Deportistas.Genero));
                            Parameters.Add(new ReportParameter("Deporte", Deportistas.Deporte == null ? "" : Deportistas.Deporte));
                            Parameters.Add(new ReportParameter("NumIdentificacion", Deportistas.NumIdentificacion == null ? "" : Deportistas.NumIdentificacion.ToString()));

                        }








                    }

                }





                this.ReportDataSets = new List<ReportDataSource>();

            }


        }

        public class ReportControlFisioterapiaBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportControlFisioterapiaBlanco(int IdHistoriaClinicaFisio, string Op = null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportControlFisioterapia.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();



                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    HistoriaClinicaFisioterapia HistoriaFisio = new HistoriaClinicaFisioterapia();
                    if (Op != "0")
                    {

                        HistoriaFisio = db.HistoriaClinicaFisioterapia.OrderByDescending(w => w.FechaClinicaFisio).ToList().FirstOrDefault(w => w.NumIdentificacion == IdHistoriaClinicaFisio );
                    }
                    else
                    {
                        HistoriaFisio = db.HistoriaClinicaFisioterapia.FirstOrDefault(w => w.IdHistoriaClinicaFisio == IdHistoriaClinicaFisio);

                    }




                    if (HistoriaFisio != null)
                    {
                        Parameters.Add(new ReportParameter("IdHistoriaClinicaFisio", HistoriaFisio.IdHistoriaClinicaFisio.ToString()));

                        Parameters.Add(new ReportParameter("PatologicosClinicaFisio", HistoriaFisio.PatologicosClinicaFisio == null ? "" : HistoriaFisio.PatologicosClinicaFisio));
                        Parameters.Add(new ReportParameter("TraumaticosClinicaFisio", HistoriaFisio.TraumaticosClinicaFisio == null ? "" : HistoriaFisio.TraumaticosClinicaFisio));
                        Parameters.Add(new ReportParameter("FarmacologicosClinicaFisio", HistoriaFisio.FarmacologicosClinicaFisio == null ? "" : HistoriaFisio.FarmacologicosClinicaFisio));
                        Parameters.Add(new ReportParameter("FamiliaresClinicaFisio", HistoriaFisio.FamiliaresClinicaFisio == null ? "" : HistoriaFisio.FamiliaresClinicaFisio));
                        Parameters.Add(new ReportParameter("DiagnosticoMedicoClinicaFisio", HistoriaFisio.DiagnosticoMedicoClinicaFisio == null ? "" : HistoriaFisio.DiagnosticoMedicoClinicaFisio));
                        Parameters.Add(new ReportParameter("MotivoConsultaClinicaFisio", HistoriaFisio.MotivoConsultaClinicaFisio == null ? "" : HistoriaFisio.MotivoConsultaClinicaFisio));
                        Parameters.Add(new ReportParameter("DolorClinicaFisio", HistoriaFisio.DolorClinicaFisio == null ? "" : HistoriaFisio.DolorClinicaFisio));
                        Parameters.Add(new ReportParameter("EdemaClinicaFisio", HistoriaFisio.EdemaClinicaFisio == null ? "" : HistoriaFisio.EdemaClinicaFisio));
                        Parameters.Add(new ReportParameter("AlteradaClinicaFisio", HistoriaFisio.AlteradaClinicaFisio == null ? "" : HistoriaFisio.AlteradaClinicaFisio));
                        Parameters.Add(new ReportParameter("NoalterdaClinicaFisio", HistoriaFisio.NoalterdaClinicaFisio == null ? "" : HistoriaFisio.NoalterdaClinicaFisio));
                        Parameters.Add(new ReportParameter("ScreemFuncionalClinicaFisio", HistoriaFisio.ScreemFuncionalClinicaFisio == null ? "" : HistoriaFisio.ScreemFuncionalClinicaFisio));
                        Parameters.Add(new ReportParameter("DesempeñoClinicaFisio", HistoriaFisio.DesempeñoClinicaFisio == null ? "" : HistoriaFisio.DesempeñoClinicaFisio));
                        Parameters.Add(new ReportParameter("PosturaClinicaFisio", HistoriaFisio.PosturaClinicaFisio == null ? "" : HistoriaFisio.PosturaClinicaFisio));
                        Parameters.Add(new ReportParameter("FechaClinicaFisio", HistoriaFisio.FechaClinicaFisio == null ? "" : HistoriaFisio.FechaClinicaFisio.ToString()));
                        Parameters.Add(new ReportParameter("PlanTratamientoClinicaFisio", HistoriaFisio.PlanTratamientoClinicaFisio == null ? "" : HistoriaFisio.PlanTratamientoClinicaFisio));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio1", HistoriaFisio.EvolucionClinicaFisio1 == null ? "" : HistoriaFisio.EvolucionClinicaFisio1));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio2", HistoriaFisio.EvolucionClinicaFisio2 == null ? "" : HistoriaFisio.EvolucionClinicaFisio2));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio3", HistoriaFisio.EvolucionClinicaFisio3 == null ? "" : HistoriaFisio.EvolucionClinicaFisio3));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio4", HistoriaFisio.EvolucionClinicaFisio4 == null ? "" : HistoriaFisio.EvolucionClinicaFisio4));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio5", HistoriaFisio.EvolucionClinicaFisio5 == null ? "" : HistoriaFisio.EvolucionClinicaFisio5));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio6", HistoriaFisio.EvolucionClinicaFisio6 == null ? "" : HistoriaFisio.EvolucionClinicaFisio6));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio7", HistoriaFisio.EvolucionClinicaFisio7 == null ? "" : HistoriaFisio.EvolucionClinicaFisio7));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio8", HistoriaFisio.EvolucionClinicaFisio8 == null ? "" : HistoriaFisio.EvolucionClinicaFisio8));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio9", HistoriaFisio.EvolucionClinicaFisio9 == null ? "" : HistoriaFisio.EvolucionClinicaFisio9));
                        Parameters.Add(new ReportParameter("EvolucionClinicaFisio10", HistoriaFisio.EvolucionClinicaFisio10 == null ? "" : HistoriaFisio.EvolucionClinicaFisio10));
                        Parameters.Add(new ReportParameter("FirmaEvolucionClinica", HistoriaFisio.FirmaEvolucionClinica == null ? "" : HistoriaFisio.FirmaEvolucionClinica));

                        string ImagenBase64 = string.Empty;
                        string Ruta = string.Empty;
                        switch (HistoriaFisio.FirmaEvolucionClinica.Trim())
                        {
                            case "1065599074":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ENRIQUE_JIMENEZ.png");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49742607":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ANA_RAMIREZ.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49606718":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ANDREA_PABA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;

                            case "49761713":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_DAZA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49778637":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_ROA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49787755":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/MAIRA_ROMERO.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "56077833":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/LUISANA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;

                        }

                    }


                        var Deportistas = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == HistoriaFisio.NumIdentificacion);
                    if (Deportistas != null)
                    {


                        Parameters.Add(new ReportParameter("PrimerNombre", Deportistas.PrimerNombre == null ? "" : Deportistas.PrimerNombre));
                        Parameters.Add(new ReportParameter("SegundoNombre", Deportistas.SegundoNombre == null ? "" : Deportistas.SegundoNombre));
                        Parameters.Add(new ReportParameter("PrimerApellido", Deportistas.PrimerApellido == null ? "" : Deportistas.PrimerApellido));
                        Parameters.Add(new ReportParameter("SegundoApellido", Deportistas.SegundoApellido == null ? "" : Deportistas.SegundoApellido));
                        Parameters.Add(new ReportParameter("Edad", Deportistas.Edad == null ? "" : Deportistas.Edad));
                        Parameters.Add(new ReportParameter("Genero", Deportistas.Genero == null ? "" : Deportistas.Genero));
                        Parameters.Add(new ReportParameter("Deporte", Deportistas.Deporte == null ? "" : Deportistas.Deporte));
                        Parameters.Add(new ReportParameter("NumIdentificacion", Deportistas.NumIdentificacion == null ? "" : Deportistas.NumIdentificacion.ToString()));

                    }


                

                   
                         

                        
                    



                }





                this.ReportDataSets = new List<ReportDataSource>();

            }


        }

        public class ReportNutricionBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportNutricionBlanco(int IdNutricion, string OP = null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportNutricion.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    Nutricion nutricion = new Nutricion();
                    if (OP != "0")
                    {

                        nutricion = db.Nutricion.OrderByDescending(w => w.FechaRegistroNutri).ToList().FirstOrDefault(w => w.NumIdentificacion == IdNutricion);
                    }
                    else
                    {
                        nutricion = db.Nutricion.FirstOrDefault(w => w.IdNutricion == IdNutricion);
                    }
                    
                    if (nutricion != null)
                    {
                        Parameters.Add(new ReportParameter("IdNutricion", nutricion.IdNutricion.ToString()));
                        Parameters.Add(new ReportParameter("CodNutricion", nutricion.CodNutricion == null ? "" : nutricion.CodNutricion.ToString()));
                        Parameters.Add(new ReportParameter("AntecedentesNutri", nutricion.AntecedentesNutri == null ? "" : nutricion.AntecedentesNutri.ToString()));
                        Parameters.Add(new ReportParameter("FamiliaresNutri", nutricion.FamiliaresNutri == null ? "" : nutricion.FamiliaresNutri));
                        Parameters.Add(new ReportParameter("PersonalesNutri", nutricion.PersonalesNutri == null ? "" : nutricion.PersonalesNutri.ToString()));
                        Parameters.Add(new ReportParameter("FarmacologicosNutri", nutricion.FarmacologicosNutri == null ? "" : nutricion.FarmacologicosNutri));
                        Parameters.Add(new ReportParameter("GinecologicoNutri", nutricion.GinecologicoNutri == null ? "" : nutricion.GinecologicoNutri));
                        Parameters.Add(new ReportParameter("SueñoNutri", nutricion.SueñoNutri == null ? "" : nutricion.SueñoNutri));
                        Parameters.Add(new ReportParameter("PielNutri", nutricion.PielNutri == null ? "" : nutricion.PielNutri));
                        Parameters.Add(new ReportParameter("FracturaNutri", nutricion.FracturaNutri == null ? "" : nutricion.FracturaNutri));
                        Parameters.Add(new ReportParameter("AspectoFisicoNutri", nutricion.AspectoFisicoNutri == null ? "" : nutricion.AspectoFisicoNutri.ToString()));
                        //Parameters.Add(new ReportParameter("PieNutri", nutricion.CodNutricion == null ? "" : nutricion.PielNutri.ToString()));
                        Parameters.Add(new ReportParameter("TiempoRecuperacionNutri", nutricion.TiempoRecuperacionNutri == null ? "" : nutricion.TiempoRecuperacionNutri));
                        Parameters.Add(new ReportParameter("BioquimicoNutri", nutricion.BioquimicoNutri == null ? "" : nutricion.BioquimicoNutri));
                        Parameters.Add(new ReportParameter("HidratacionNutri", nutricion.HidratacionNutri == null ? "" : nutricion.HidratacionNutri));
                        Parameters.Add(new ReportParameter("HorarioActividadNutri", nutricion.HorarioActividadNutri == null ? "" : nutricion.HorarioActividadNutri)); 
                        Parameters.Add(new ReportParameter("FechaRegistroNutri", nutricion.FechaRegistroNutri == null ? "" : nutricion.FechaRegistroNutri.ToString())); 



                         var AnamnesisNutricion = db.AnamnesisNutricion.FirstOrDefault(w => w.IdNutricion == nutricion.IdNutricion);
                        if (AnamnesisNutricion != null)
                        {
                            Parameters.Add(new ReportParameter("DesayunoNutri", AnamnesisNutricion.DesayunoNutri == null ? "" : AnamnesisNutricion.DesayunoNutri));
                            Parameters.Add(new ReportParameter("MediaMañanaNutri", AnamnesisNutricion.MediaMañanaNutri == null ? "" : AnamnesisNutricion.MediaMañanaNutri));
                            Parameters.Add(new ReportParameter("AlmuerzoNutri", AnamnesisNutricion.AlmuerzoNutri == null ? "" : AnamnesisNutricion.AlmuerzoNutri));
                            Parameters.Add(new ReportParameter("MediaTardeNutri", AnamnesisNutricion.MediaTardeNutri == null ? "" : AnamnesisNutricion.MediaTardeNutri));
                            Parameters.Add(new ReportParameter("CenaNutri", AnamnesisNutricion.CenaNutri == null ? "" : AnamnesisNutricion.CenaNutri));
                            Parameters.Add(new ReportParameter("AlergicoNutri", AnamnesisNutricion.AlergicoNutri == null ? "" : AnamnesisNutricion.AlergicoNutri));
                            Parameters.Add(new ReportParameter("SuplementacionNutri", AnamnesisNutricion.SuplementacionNutri == null ? "" : AnamnesisNutricion.SuplementacionNutri));
                            Parameters.Add(new ReportParameter("AlimentoNoDeseados", AnamnesisNutricion.AlimentoNoDeseados == null ? "" : AnamnesisNutricion.AlimentoNoDeseados));
                            Parameters.Add(new ReportParameter("EdadNutri", AnamnesisNutricion.EdadNutri == null ? "" : AnamnesisNutricion.EdadNutri));
                            Parameters.Add(new ReportParameter("PesoNutri", AnamnesisNutricion.PesoNutri == null ? "" : AnamnesisNutricion.PesoNutri));
                            Parameters.Add(new ReportParameter("TallaNutri", AnamnesisNutricion.TallaNutri == null ? "" : AnamnesisNutricion.TallaNutri));
                            Parameters.Add(new ReportParameter("ImcNutri", AnamnesisNutricion.ImcNutri == null ? "" : AnamnesisNutricion.ImcNutri));
                            Parameters.Add(new ReportParameter("EscapularNutri", AnamnesisNutricion.EscapularNutri == null ? "" : AnamnesisNutricion.EscapularNutri));
                            Parameters.Add(new ReportParameter("TricepsNutri", AnamnesisNutricion.TricepsNutri == null ? "" : AnamnesisNutricion.TricepsNutri));
                            Parameters.Add(new ReportParameter("BicepsNutri", AnamnesisNutricion.BicepsNutri == null ? "" : AnamnesisNutricion.BicepsNutri));
                            Parameters.Add(new ReportParameter("AbdomenNutri", AnamnesisNutricion.AbdomenNutri == null ? "" : AnamnesisNutricion.AbdomenNutri));
                            Parameters.Add(new ReportParameter("MusloNutri", AnamnesisNutricion.MusloNutri == null ? "" : AnamnesisNutricion.MusloNutri));
                            Parameters.Add(new ReportParameter("PiernaNutri", AnamnesisNutricion.PiernaNutri == null ? "" : AnamnesisNutricion.PiernaNutri));
                            Parameters.Add(new ReportParameter("BrazosNutrii", AnamnesisNutricion.BrazosNutrii == null ? "" : AnamnesisNutricion.BrazosNutrii));
                            Parameters.Add(new ReportParameter("AntebrazoNutrii", AnamnesisNutricion.AntebrazoNutrii == null ? "" : AnamnesisNutricion.AntebrazoNutrii));
                            Parameters.Add(new ReportParameter("MuñecaNutrii", AnamnesisNutricion.MuñecaNutrii == null ? "" : AnamnesisNutricion.MuñecaNutrii));
                            Parameters.Add(new ReportParameter("PechoNutrii", AnamnesisNutricion.PechoNutrii == null ? "" : AnamnesisNutricion.PechoNutrii));
                            Parameters.Add(new ReportParameter("CinturaNutrii", AnamnesisNutricion.CinturaNutrii == null ? "" : AnamnesisNutricion.CinturaNutrii));
                            Parameters.Add(new ReportParameter("CaderaNutrii", AnamnesisNutricion.CaderaNutrii == null ? "" : AnamnesisNutricion.CaderaNutrii));
                            Parameters.Add(new ReportParameter("MusloSuperiorNutrii", AnamnesisNutricion.MusloSuperiorNutrii == null ? "" : AnamnesisNutricion.MusloSuperiorNutrii));
                            Parameters.Add(new ReportParameter("MusloMedioNutrii", AnamnesisNutricion.MusloMedioNutrii == null ? "" : AnamnesisNutricion.MusloMedioNutrii));
                            Parameters.Add(new ReportParameter("PiernaPerimetroNutrii", AnamnesisNutricion.PiernaPerimetroNutrii == null ? "" : AnamnesisNutricion.PiernaPerimetroNutrii));
                            Parameters.Add(new ReportParameter("TobilloPerimetroNutrii", AnamnesisNutricion.TobilloPerimetroNutrii == null ? "" : AnamnesisNutricion.TobilloPerimetroNutrii));

                        }



                        var SeguimientoNutricion = db.SeguimientoNutricion.FirstOrDefault(w => w.IdNutricion == nutricion.IdNutricion);
                        if (SeguimientoNutricion != null)
                        {
                            Parameters.Add(new ReportParameter("HumeroNutri", SeguimientoNutricion.HumeroNutri == null ? "" : SeguimientoNutricion.HumeroNutri));
                            Parameters.Add(new ReportParameter("MuñecaHumeroNutri", SeguimientoNutricion.MuñecaHumeroNutri == null ? "" :  SeguimientoNutricion.MuñecaHumeroNutri));
                            Parameters.Add(new ReportParameter("FermorHumeroNutri", SeguimientoNutricion.FermorHumeroNutri == null ? "" :  SeguimientoNutricion.FermorHumeroNutri));
                            Parameters.Add(new ReportParameter("GrasaNutri", SeguimientoNutricion.GrasaNutri == null ? "" :  SeguimientoNutricion.GrasaNutri));
                            Parameters.Add(new ReportParameter("HuesosNutri", SeguimientoNutricion.HuesosNutri == null ? "" :  SeguimientoNutricion.HuesosNutri));
                            Parameters.Add(new ReportParameter("ResidualesNutri", SeguimientoNutricion.ResidualesNutri == null ? "" :  SeguimientoNutricion.ResidualesNutri));
                            Parameters.Add(new ReportParameter("PesosGrasosNutri", SeguimientoNutricion.PesosGrasosNutri == null ? "" :  SeguimientoNutricion.PesosGrasosNutri));
                            Parameters.Add(new ReportParameter("PesosMusculosNutri", SeguimientoNutricion.PesosMusculosNutri == null ? "" :  SeguimientoNutricion.PesosMusculosNutri));
                            Parameters.Add(new ReportParameter("PesoResiducalesNutri", SeguimientoNutricion.PesoResiducalesNutri == null ? "" :  SeguimientoNutricion.PesoResiducalesNutri));
                            Parameters.Add(new ReportParameter("DiagnosticoNutri", SeguimientoNutricion.DiagnosticoNutri == null ? "" :  SeguimientoNutricion.DiagnosticoNutri));
                            Parameters.Add(new ReportParameter("TratamientoNutri", SeguimientoNutricion.TratamientoNutri == null ? "" :  SeguimientoNutricion.TratamientoNutri));
                            Parameters.Add(new ReportParameter("ObservacionesNutricion", SeguimientoNutricion.ObservacionesNutricion == null ? "" :  SeguimientoNutricion.ObservacionesNutricion));
                            
                                
                            Parameters.Add(new ReportParameter("ProximaCitaNutri", SeguimientoNutricion.ProximaCitaNutri == null ? "" :  SeguimientoNutricion.ProximaCitaNutri.ToString()));
                            Parameters.Add(new ReportParameter("FirmaDoctorNutri", SeguimientoNutricion.FirmaDoctorNutri == null ? "" :  SeguimientoNutricion.FirmaDoctorNutri));
                            string ImagenBase64 = string.Empty;
                            string Ruta = string.Empty;
                            switch (SeguimientoNutricion.FirmaDoctorNutri.Trim())
                            {
                                case "1065599074":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ENRIQUE_JIMENEZ.png");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49742607":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANA_RAMIREZ.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49606718":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANDREA_PABA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;

                                case "49761713":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_DAZA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49778637":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_ROA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49787755":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/MAIRA_ROMERO.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "56077833":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/LUISANA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;


                            }

                        }


                        var Deportistas = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == nutricion.NumIdentificacion);
                        if (Deportistas != null)
                        {
                            Parameters.Add(new ReportParameter("PrimerNombre", Deportistas.PrimerNombre == null ? "" :  Deportistas.PrimerNombre));
                            Parameters.Add(new ReportParameter("SegundoNombre", Deportistas.SegundoNombre == null ? "" : Deportistas.SegundoNombre));
                            Parameters.Add(new ReportParameter("PrimerApellido", Deportistas.PrimerApellido == null ? "" : Deportistas.PrimerApellido));
                            Parameters.Add(new ReportParameter("SegundoApellido", Deportistas.SegundoApellido == null ? "" : Deportistas.SegundoApellido));
                            Parameters.Add(new ReportParameter("Edad", Deportistas.Edad == null ? "" : Deportistas.Edad));
                            Parameters.Add(new ReportParameter("Genero", Deportistas.Genero == null ? "" : Deportistas.Genero));
                            Parameters.Add(new ReportParameter("Deporte", Deportistas.Deporte == null ? "" : Deportistas.Deporte));

                            Parameters.Add(new ReportParameter("NumIdentificacion", Deportistas.NumIdentificacion == null ? "" : Deportistas.NumIdentificacion.ToString()));

                        }






                    }

                }











                this.ReportDataSets = new List<ReportDataSource>();

            }


        }

        public class ReportPsicologiaBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportPsicologiaBlanco(int IdPsicologia , string OP = null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportPsicologia.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    DemograficoPsicologia psicologia = new DemograficoPsicologia();
                    if (OP != "0")
                    {
                        psicologia = db.DemograficoPsicologia.OrderByDescending(w => w.FechaRegistro).FirstOrDefault(w => w.NumIdentificacion == IdPsicologia);
                    }
                    else
                    {
                        psicologia = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == IdPsicologia);
                    }
                        if (psicologia != null)
                    {
                        Parameters.Add(new ReportParameter("IdDatosDemograficos", psicologia.IdDatosDemograficos.ToString()));
                        Parameters.Add(new ReportParameter("EstadoCivil", psicologia.EstadoCivil == null ? "" : psicologia.EstadoCivil.ToString()));
                        Parameters.Add(new ReportParameter("NivelEducativo", psicologia.NivelEducativo == null ? "" : psicologia.NivelEducativo.ToString()));
                        Parameters.Add(new ReportParameter("YoSoy", psicologia.YoSoy == null ? "" : psicologia.YoSoy));
                        Parameters.Add(new ReportParameter("VivoCon", psicologia.VivoCon == null ? "" : psicologia.VivoCon.ToString()));
                        Parameters.Add(new ReportParameter("Actualmente", psicologia.Actualmente == null ? "" : psicologia.Actualmente));
                        Parameters.Add(new ReportParameter("Religion", psicologia.Religion == null ? "" : psicologia.Religion));
                        Parameters.Add(new ReportParameter("DependenciaEconomia", psicologia.DependenciaEconomia == null ? "" : psicologia.DependenciaEconomia)); 
                        Parameters.Add(new ReportParameter("FechaRegistro", psicologia.FechaRegistro == null ? "" : psicologia.FechaRegistro.ToString())); 


                         var HistoriaFamiliaresPsicologia = db.HistoriaFamiliaresPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == psicologia.IdDatosDemograficos);
                        if (HistoriaFamiliaresPsicologia != null)
                        {
                            Parameters.Add(new ReportParameter("NombrePadre", HistoriaFamiliaresPsicologia.NombrePadre == null ? "" : HistoriaFamiliaresPsicologia.NombrePadre));
                            Parameters.Add(new ReportParameter("EdadPadre", HistoriaFamiliaresPsicologia.EdadPadre == null ? "" : HistoriaFamiliaresPsicologia.EdadPadre));
                            Parameters.Add(new ReportParameter("RelacionPadre", HistoriaFamiliaresPsicologia.RelacionPadre == null ? "" : HistoriaFamiliaresPsicologia.RelacionPadre));
                            Parameters.Add(new ReportParameter("NombreMAdre", HistoriaFamiliaresPsicologia.NombreMAdre == null ? "" : HistoriaFamiliaresPsicologia.NombreMAdre));
                            Parameters.Add(new ReportParameter("EdadMadre", HistoriaFamiliaresPsicologia.EdadMadre == null ? "" : HistoriaFamiliaresPsicologia.EdadMadre));
                            Parameters.Add(new ReportParameter("RelacionMadre", HistoriaFamiliaresPsicologia.RelacionMadre == null ? "" : HistoriaFamiliaresPsicologia.RelacionMadre));
                            Parameters.Add(new ReportParameter("RelacionHermanos", HistoriaFamiliaresPsicologia.RelacionHermanos == null ? "" : HistoriaFamiliaresPsicologia.RelacionHermanos));


                        }





                        var FamiliaresPsicologia = db.FamiliaresPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == psicologia.IdDatosDemograficos);
                        if (FamiliaresPsicologia != null)
                        {
                            Parameters.Add(new ReportParameter("SustanciasPsicoFmlia", FamiliaresPsicologia.SustanciasPsicoFmlia == null ? "" : FamiliaresPsicologia.SustanciasPsicoFmlia));
                            Parameters.Add(new ReportParameter("EnferMentalesFmlia", FamiliaresPsicologia.EnferMentalesFmlia == null ? "" : FamiliaresPsicologia.EnferMentalesFmlia));
                            Parameters.Add(new ReportParameter("EnferCoronariasFmlia", FamiliaresPsicologia.EnferCoronariasFmlia == null ? "" : FamiliaresPsicologia.EnferCoronariasFmlia));
                            Parameters.Add(new ReportParameter("ObesidadFmlia", FamiliaresPsicologia.ObesidadFmlia == null ? "" : FamiliaresPsicologia.ObesidadFmlia));
                            Parameters.Add(new ReportParameter("CancerFmlia", FamiliaresPsicologia.CancerFmlia == null ? "" : FamiliaresPsicologia.CancerFmlia));
                            Parameters.Add(new ReportParameter("HipertensionFmlia", FamiliaresPsicologia.HipertensionFmlia == null ? "" : FamiliaresPsicologia.HipertensionFmlia));
                            Parameters.Add(new ReportParameter("EnferAlergicasFmlia", FamiliaresPsicologia.EnferAlergicasFmlia == null ? "" : FamiliaresPsicologia.EnferAlergicasFmlia));

                        }



                        var EnfermedadPersonalPsicologia = db.EnfermedadPersonalPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == psicologia.IdDatosDemograficos);
                        if (EnfermedadPersonalPsicologia != null)
                        {
                            Parameters.Add(new ReportParameter("SustanciasPsicoactivasPer", EnfermedadPersonalPsicologia.SustanciasPsicoactivasPer == null ? "" : EnfermedadPersonalPsicologia.SustanciasPsicoactivasPer));
                            Parameters.Add(new ReportParameter("EnferMentalesPer", EnfermedadPersonalPsicologia.EnferMentalesPer == null ? "" :  EnfermedadPersonalPsicologia.EnferMentalesPer));
                            Parameters.Add(new ReportParameter("DiabetesPer", EnfermedadPersonalPsicologia.DiabetesPer == null ? "" :  EnfermedadPersonalPsicologia.DiabetesPer));
                            Parameters.Add(new ReportParameter("EnferCoronariasPer", EnfermedadPersonalPsicologia.EnferCoronariasPer == null ? "" :  EnfermedadPersonalPsicologia.EnferCoronariasPer));
                            Parameters.Add(new ReportParameter("ObesidadPer", EnfermedadPersonalPsicologia.ObesidadPer == null ? "" :  EnfermedadPersonalPsicologia.ObesidadPer));
                            Parameters.Add(new ReportParameter("CancerPer", EnfermedadPersonalPsicologia.CancerPer == null ? "" :  EnfermedadPersonalPsicologia.CancerPer));
                            Parameters.Add(new ReportParameter("HipertensionPer", EnfermedadPersonalPsicologia.HipertensionPer == null ? "" :  EnfermedadPersonalPsicologia.HipertensionPer));
                            Parameters.Add(new ReportParameter("EnferAlergicasPer", EnfermedadPersonalPsicologia.EnferAlergicasPer == null ? "" :  EnfermedadPersonalPsicologia.EnferAlergicasPer));
                            Parameters.Add(new ReportParameter("AsmaPer", EnfermedadPersonalPsicologia.AsmaPer == null ? "" :  EnfermedadPersonalPsicologia.AsmaPer));
                            Parameters.Add(new ReportParameter("ComplicacionesPartoPer", EnfermedadPersonalPsicologia.ComplicacionesPartoPer == null ? "" :  EnfermedadPersonalPsicologia.ComplicacionesPartoPer));
                            Parameters.Add(new ReportParameter("LesionesPer", EnfermedadPersonalPsicologia.LesionesPer == null ? "" :  EnfermedadPersonalPsicologia.LesionesPer));
                            Parameters.Add(new ReportParameter("CualesLesionesPer", EnfermedadPersonalPsicologia.CualesLesionesPer == null ? "" :  EnfermedadPersonalPsicologia.CualesLesionesPer));
                            Parameters.Add(new ReportParameter("TrabajoConcentrarsePer", EnfermedadPersonalPsicologia.TrabajoConcentrarsePer == null ? "" :  EnfermedadPersonalPsicologia.TrabajoConcentrarsePer));
                            Parameters.Add(new ReportParameter("DolorMuscularPer", EnfermedadPersonalPsicologia.DolorMuscularPer == null ? "" :  EnfermedadPersonalPsicologia.DolorMuscularPer));
                            Parameters.Add(new ReportParameter("PartoCesareaPer", EnfermedadPersonalPsicologia.PartoCesareaPer == null ? "" :  EnfermedadPersonalPsicologia.PartoCesareaPer));
                            Parameters.Add(new ReportParameter("PartoNormalPer", EnfermedadPersonalPsicologia.PartoNormalPer == null ? "" :  EnfermedadPersonalPsicologia.PartoNormalPer));
                            Parameters.Add(new ReportParameter("LesionadoActualPer", EnfermedadPersonalPsicologia.LesionadoActualPer == null ? "" :  EnfermedadPersonalPsicologia.LesionadoActualPer));
                            Parameters.Add(new ReportParameter("DificultadSueñoPer", EnfermedadPersonalPsicologia.DificultadSueñoPer == null ? "" :  EnfermedadPersonalPsicologia.DificultadSueñoPer));
                            Parameters.Add(new ReportParameter("DolorCabezaPer", EnfermedadPersonalPsicologia.DolorCabezaPer == null ? "" :  EnfermedadPersonalPsicologia.DolorCabezaPer));
                            Parameters.Add(new ReportParameter("CirugiasPer", EnfermedadPersonalPsicologia.CirugiasPer == null ? "" :  EnfermedadPersonalPsicologia.CirugiasPer));
                            Parameters.Add(new ReportParameter("ApetitoPer", EnfermedadPersonalPsicologia.ApetitoPer == null ? "" :  EnfermedadPersonalPsicologia.ApetitoPer));
                            Parameters.Add(new ReportParameter("CansadoPer", EnfermedadPersonalPsicologia.CansadoPer == null ? "" :  EnfermedadPersonalPsicologia.CansadoPer));
                            Parameters.Add(new ReportParameter("OtroPer", EnfermedadPersonalPsicologia.OtroPer == null ? "" :  EnfermedadPersonalPsicologia.OtroPer));
                            Parameters.Add(new ReportParameter("HistoriadelProblemaPer", EnfermedadPersonalPsicologia.HistoriadelProblemaPer == null ? "" :  EnfermedadPersonalPsicologia.HistoriadelProblemaPer));


                        }



                        var TestPsicologia = db.TestPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == psicologia.IdDatosDemograficos);
                        if (TestPsicologia != null)
                        {
                            Parameters.Add(new ReportParameter("Prueba", TestPsicologia.Prueba == null ? "" : TestPsicologia.Prueba));
                            Parameters.Add(new ReportParameter("Puntuacion", TestPsicologia.Puntuacion == null ? "" : TestPsicologia.Puntuacion));
                            Parameters.Add(new ReportParameter("Valoracion", TestPsicologia.Valoracion == null ? "" : TestPsicologia.Valoracion));
                            Parameters.Add(new ReportParameter("Concepto", TestPsicologia.Concepto == null ? "" : TestPsicologia.Concepto));
                        }
                       


                        var VidapersonalPsicologia = db.VidapersonalPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == psicologia.IdDatosDemograficos);
                        if (VidapersonalPsicologia != null)
                        {
                            Parameters.Add(new ReportParameter("EntrenamientoActualPsi", VidapersonalPsicologia.EntrenamientoActualPsi == null ? "" : VidapersonalPsicologia.EntrenamientoActualPsi));
                            Parameters.Add(new ReportParameter("HorasDiariasPsi", VidapersonalPsicologia.HorasDiariasPsi == null ? "" : VidapersonalPsicologia.HorasDiariasPsi));
                            Parameters.Add(new ReportParameter("NumeroSesionesPsi", VidapersonalPsicologia.NumeroSesionesPsi == null ? "" : VidapersonalPsicologia.NumeroSesionesPsi));
                            Parameters.Add(new ReportParameter("LugarPsi", VidapersonalPsicologia.LugarPsi == null ? "" : VidapersonalPsicologia.LugarPsi));
                            Parameters.Add(new ReportParameter("NombreEntrenadorPsi", VidapersonalPsicologia.NombreEntrenadorPsi == null ? "" : VidapersonalPsicologia.NombreEntrenadorPsi));
                            Parameters.Add(new ReportParameter("InicioDeportePsi", VidapersonalPsicologia.InicioDeportePsi == null ? "" : VidapersonalPsicologia.InicioDeportePsi));
                            Parameters.Add(new ReportParameter("EntrenamiendoPsi", VidapersonalPsicologia.EntrenamiendoPsi == null ? "" : VidapersonalPsicologia.EntrenamiendoPsi));
                            Parameters.Add(new ReportParameter("CompeticionPsi", VidapersonalPsicologia.CompeticionPsi == null ? "" : VidapersonalPsicologia.CompeticionPsi));
                            Parameters.Add(new ReportParameter("MeApoyanPsi", VidapersonalPsicologia.MeApoyanPsi == null ? "" : VidapersonalPsicologia.MeApoyanPsi));
                            Parameters.Add(new ReportParameter("CompromisoPsi", VidapersonalPsicologia.CompromisoPsi == null ? "" : VidapersonalPsicologia.CompromisoPsi));
                            Parameters.Add(new ReportParameter("EntramientoPsicologicoPsi", VidapersonalPsicologia.EntramientoPsicologicoPsi == null ? "" : VidapersonalPsicologia.EntramientoPsicologicoPsi));
                            Parameters.Add(new ReportParameter("ObservacionesPsi", VidapersonalPsicologia.ObservacionesPsi == null ? "" : VidapersonalPsicologia.ObservacionesPsi));
                            Parameters.Add(new ReportParameter("ResultadosPsi", VidapersonalPsicologia.ResultadosPsi == null ? "" : VidapersonalPsicologia.ResultadosPsi));
                            Parameters.Add(new ReportParameter("RecomendacionesPsi", VidapersonalPsicologia.RecomendacionesPsi == null ? "" : VidapersonalPsicologia.RecomendacionesPsi));
                            Parameters.Add(new ReportParameter("RemisionPsi", VidapersonalPsicologia.RemisionPsi == null ? "" : VidapersonalPsicologia.RemisionPsi));
                            Parameters.Add(new ReportParameter("SeguimientoPsi", VidapersonalPsicologia.SeguimientoPsi == null ? "" : VidapersonalPsicologia.SeguimientoPsi));
                            Parameters.Add(new ReportParameter("FirmaDoctorPsicologia", VidapersonalPsicologia.FirmaDoctorPsicologia == null ? "" : VidapersonalPsicologia.FirmaDoctorPsicologia));

                            string ImagenBase64 = string.Empty;
                            string Ruta = string.Empty;
                            switch (VidapersonalPsicologia.FirmaDoctorPsicologia.Trim())
                            {
                                case "1065599074":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ENRIQUE_JIMENEZ.png");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49742607":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANA_RAMIREZ.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49606718":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANDREA_PABA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;

                                case "49761713":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_DAZA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49778637":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_ROA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49787755":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/MAIRA_ROMERO.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "56077833":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/LUISANA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;


                            }


                        }

                        var Deportistas = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == psicologia.NumIdentificacion);

                        if (Deportistas != null)
                        {
                            Parameters.Add(new ReportParameter("PrimerNombre", Deportistas.PrimerNombre == null ? "" : Deportistas.PrimerNombre));
                            Parameters.Add(new ReportParameter("SegundoNombre", Deportistas.SegundoNombre == null ? "" : Deportistas.SegundoNombre));
                            Parameters.Add(new ReportParameter("PrimerApellido", Deportistas.PrimerApellido == null ? "" : Deportistas.PrimerApellido));
                            Parameters.Add(new ReportParameter("SegundoApellido", Deportistas.SegundoApellido == null ? "" : Deportistas.SegundoApellido));
                            Parameters.Add(new ReportParameter("Edad", Deportistas.Edad == null ? "" : Deportistas.Edad));
                            Parameters.Add(new ReportParameter("Genero", Deportistas.Genero == null ? "" : Deportistas.Genero));
                            Parameters.Add(new ReportParameter("Deporte", Deportistas.Deporte == null ? "" : Deportistas.Deporte));
                            Parameters.Add(new ReportParameter("NumIdentificacion", Deportistas.NumIdentificacion == null ? "" : Deportistas.NumIdentificacion.ToString()));

                        }







                    }

                }










                this.ReportDataSets = new List<ReportDataSource>();

            }


        }

        public class ReportControlPsicologiaBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportControlPsicologiaBlanco(int IdSeguimiento, string OP = null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportControlPsicologia.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    SeguimientoPsicologia HistoriaPsicologia = new SeguimientoPsicologia();
                    if (OP != "0")
                    {

                        HistoriaPsicologia = db.SeguimientoPsicologia.OrderByDescending(w => w.Fecha).ToList().FirstOrDefault(w => w.NumIdentificacion == IdSeguimiento);
                     

                    }
                    else
                    {
                        HistoriaPsicologia = db.SeguimientoPsicologia.FirstOrDefault(w => w.IdSeguimiento == IdSeguimiento);

                    }

                    if (HistoriaPsicologia != null)
                        {
                        Parameters.Add(new ReportParameter("IdSeguimiento", HistoriaPsicologia.IdSeguimiento.ToString()));

                        Parameters.Add(new ReportParameter("Fecha", HistoriaPsicologia.Fecha == null ? "" : HistoriaPsicologia.Fecha.ToString()));
                            Parameters.Add(new ReportParameter("EvolucionPsicologia", HistoriaPsicologia.EvolucionPsicologia == null ? "" : HistoriaPsicologia.EvolucionPsicologia));
                            Parameters.Add(new ReportParameter("TestsPsicologico", HistoriaPsicologia.TestsPsicologico == null ? "" : HistoriaPsicologia.TestsPsicologico));
                            Parameters.Add(new ReportParameter("FirmaDocPsicologia", HistoriaPsicologia.FirmaDocPsicologia == null ? "" : HistoriaPsicologia.FirmaDocPsicologia));

                            string ImagenBase64 = string.Empty;
                            string Ruta = string.Empty;
                            switch (HistoriaPsicologia.FirmaDocPsicologia.Trim())
                            {
                            case "1065599074":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ENRIQUE_JIMENEZ.png");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49742607":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ANA_RAMIREZ.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49606718":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ANDREA_PABA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;

                            case "49761713":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_DAZA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49778637":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_ROA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49787755":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/MAIRA_ROMERO.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "56077833":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/LUISANA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;


                        }


                        }

                        var Deportistas = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == HistoriaPsicologia.NumIdentificacion);

                        if (Deportistas != null)
                        {
                            Parameters.Add(new ReportParameter("PrimerNombre", Deportistas.PrimerNombre == null ? "" : Deportistas.PrimerNombre));
                            Parameters.Add(new ReportParameter("SegundoNombre", Deportistas.SegundoNombre == null ? "" : Deportistas.SegundoNombre));
                            Parameters.Add(new ReportParameter("PrimerApellido", Deportistas.PrimerApellido == null ? "" : Deportistas.PrimerApellido));
                            Parameters.Add(new ReportParameter("SegundoApellido", Deportistas.SegundoApellido == null ? "" : Deportistas.SegundoApellido));
                            Parameters.Add(new ReportParameter("Edad", Deportistas.Edad == null ? "" : Deportistas.Edad));
                            Parameters.Add(new ReportParameter("Genero", Deportistas.Genero == null ? "" : Deportistas.Genero));
                            Parameters.Add(new ReportParameter("Deporte", Deportistas.Deporte == null ? "" : Deportistas.Deporte));
                            Parameters.Add(new ReportParameter("NumIdentificacion", Deportistas.NumIdentificacion == null ? "" : Deportistas.NumIdentificacion.ToString()));

                        }







                    

                }










                this.ReportDataSets = new List<ReportDataSource>();

            }


        }

        public class ReportMedicinaBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportMedicinaBlanco(int IdMedicinaDeporte, string OP = null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportMedicina.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    MedicinaDelDeporte Medicina = new MedicinaDelDeporte();
                    if (OP != "0")
                    {
                        Medicina =   db.MedicinaDelDeporte.OrderByDescending(w => w.FechaRegistro).FirstOrDefault(w => w.NumIdentificacion == IdMedicinaDeporte);
                    }
                    else
                    {
                        Medicina =   db.MedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == IdMedicinaDeporte);

                    }
                   
                    if (Medicina != null)
                    {
                        Parameters.Add(new ReportParameter("IdMedicina", Medicina.IdMedicina.ToString()));
                        Parameters.Add(new ReportParameter("CodMedicina", Medicina.CodMedicina == null ? "" : Medicina.CodMedicina.ToString()));
                        Parameters.Add(new ReportParameter("FechaConsulta", Medicina.FechaConsulta == null ? "" : Medicina.FechaConsulta.ToString()));
                        Parameters.Add(new ReportParameter("MotivoConsulta", Medicina.MotivoConsulta == null ? "" : Medicina.MotivoConsulta));
                        Parameters.Add(new ReportParameter("EnfermedadActual", Medicina.EnfermedadActual == null ? "" : Medicina.EnfermedadActual.ToString())); 
                        Parameters.Add(new ReportParameter("FechaRegistro", Medicina.FechaRegistro == null ? "" : Medicina.FechaRegistro.ToString())); 

                         var AntecedentesMedicinaDelDeporte = db.AntecedentesMedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == Medicina.IdMedicina);
                        if (AntecedentesMedicinaDelDeporte != null)
                        {
                            Parameters.Add(new ReportParameter("Patologicos", AntecedentesMedicinaDelDeporte.Patologicos == null ? "" : AntecedentesMedicinaDelDeporte.Patologicos));
                            Parameters.Add(new ReportParameter("Quirurgicos", AntecedentesMedicinaDelDeporte.Quirurgicos == null ? "" : AntecedentesMedicinaDelDeporte.Quirurgicos));
                            Parameters.Add(new ReportParameter("Farmacologicos", AntecedentesMedicinaDelDeporte.Farmacologicos == null ? "" : AntecedentesMedicinaDelDeporte.Farmacologicos));
                            Parameters.Add(new ReportParameter("Familiares", AntecedentesMedicinaDelDeporte.Familiares == null ? "" : AntecedentesMedicinaDelDeporte.Familiares));
                            Parameters.Add(new ReportParameter("Traumatologicos", AntecedentesMedicinaDelDeporte.Traumatologicos == null ? "" : AntecedentesMedicinaDelDeporte.Traumatologicos));
                            Parameters.Add(new ReportParameter("LesionesDeportivas", AntecedentesMedicinaDelDeporte.LesionesDeportivas == null ? "" : AntecedentesMedicinaDelDeporte.LesionesDeportivas));
                            Parameters.Add(new ReportParameter("Alergicos", AntecedentesMedicinaDelDeporte.Alergicos == null ? "" : AntecedentesMedicinaDelDeporte.Alergicos));
                            Parameters.Add(new ReportParameter("PruebaCovid19", AntecedentesMedicinaDelDeporte.PruebaCovid19 == null ? "" : AntecedentesMedicinaDelDeporte.PruebaCovid19));

                        }


                        var ExamenFisicoMedicinaDelDeporte = db.ExamenFisicoMedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == Medicina.IdMedicina);
                        if (ExamenFisicoMedicinaDelDeporte != null)
                        {
                            Parameters.Add(new ReportParameter("TensionArterial", ExamenFisicoMedicinaDelDeporte.TensionArterial == null ? "" : ExamenFisicoMedicinaDelDeporte.TensionArterial));
                            Parameters.Add(new ReportParameter("Peso", ExamenFisicoMedicinaDelDeporte.Peso == null ? "" : ExamenFisicoMedicinaDelDeporte.Peso.ToString()));
                            Parameters.Add(new ReportParameter("IndiceMasaCorporal", ExamenFisicoMedicinaDelDeporte.IndiceMasaCorporal == null ? "" : ExamenFisicoMedicinaDelDeporte.IndiceMasaCorporal));
                            Parameters.Add(new ReportParameter("Postura", ExamenFisicoMedicinaDelDeporte.Postura == null ? "" : ExamenFisicoMedicinaDelDeporte.Postura));
                            Parameters.Add(new ReportParameter("FrecuenciaCardiaca", ExamenFisicoMedicinaDelDeporte.FrecuenciaCardiaca == null ? "" : ExamenFisicoMedicinaDelDeporte.FrecuenciaCardiaca));
                            Parameters.Add(new ReportParameter("Talla", ExamenFisicoMedicinaDelDeporte.Talla == null ? "" : ExamenFisicoMedicinaDelDeporte.Talla.ToString()));
                            Parameters.Add(new ReportParameter("Tanner", ExamenFisicoMedicinaDelDeporte.Tanner == null ? "" : ExamenFisicoMedicinaDelDeporte.Tanner));
                            Parameters.Add(new ReportParameter("Grasos", ExamenFisicoMedicinaDelDeporte.Grasos == null ? "" : ExamenFisicoMedicinaDelDeporte.Grasos));
                            Parameters.Add(new ReportParameter("Muscular", ExamenFisicoMedicinaDelDeporte.Muscular == null ? "" : ExamenFisicoMedicinaDelDeporte.Muscular));
                            Parameters.Add(new ReportParameter("ExamenEspecifico", ExamenFisicoMedicinaDelDeporte.ExamenEspecifico == null ? "" : ExamenFisicoMedicinaDelDeporte.ExamenEspecifico));
                            Parameters.Add(new ReportParameter("Diagnostico", ExamenFisicoMedicinaDelDeporte.Diagnostico == null ? "" : ExamenFisicoMedicinaDelDeporte.Diagnostico));
                            Parameters.Add(new ReportParameter("Conducta", ExamenFisicoMedicinaDelDeporte.Conducta == null ? "" : ExamenFisicoMedicinaDelDeporte.Conducta));
                            
                            
                            
                            
                            
                            
                            
                            Parameters.Add(new ReportParameter("FirmaMedico", ExamenFisicoMedicinaDelDeporte.FirmaMedico == null ? "" : ExamenFisicoMedicinaDelDeporte.FirmaMedico));

                            string ImagenBase64 = string.Empty;
                            string Ruta = string.Empty;
                            switch (ExamenFisicoMedicinaDelDeporte.FirmaMedico.Trim())
                            {
                                case "1065599074":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ENRIQUE_JIMENEZ.png");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49742607":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANA_RAMIREZ.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49606718":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ANDREA_PABA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;

                                case "49761713":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_DAZA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49778637":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_ROA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "49787755":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/MAIRA_ROMERO.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;
                                case "56077833":
                                    Ruta = HttpContext.Current.Server.MapPath("~/images/LUISANA.PNG");
                                    ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                    Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                    break;


                            }


                        }

                        var Deportistas = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == Medicina.NumIdentificacion);
                        if (Deportistas != null)
                        {
                            Parameters.Add(new ReportParameter("PrimerNombre", Deportistas.PrimerNombre == null ? "" : Deportistas.PrimerNombre));
                            Parameters.Add(new ReportParameter("SegundoNombre", Deportistas.SegundoNombre == null ? "" : Deportistas.SegundoNombre));
                            Parameters.Add(new ReportParameter("PrimerApellido", Deportistas.PrimerApellido == null ? "" : Deportistas.PrimerApellido));
                            Parameters.Add(new ReportParameter("SegundoApellido", Deportistas.SegundoApellido == null ? "" : Deportistas.SegundoApellido));
                            Parameters.Add(new ReportParameter("Edad", Deportistas.Edad == null ? "" : Deportistas.Edad));
                            Parameters.Add(new ReportParameter("Genero", Deportistas.Genero == null ? "" : Deportistas.Genero));
                            Parameters.Add(new ReportParameter("Deporte", Deportistas.Deporte == null ? "" : Deportistas.Deporte));

                            Parameters.Add(new ReportParameter("NumIdentificacion", Deportistas.NumIdentificacion == null ? "" : Deportistas.NumIdentificacion.ToString()));

                        }





                    }

                }









                this.ReportDataSets = new List<ReportDataSource>();

            }


        }

        public class ReportControlMedicinaBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportControlMedicinaBlanco(int IdSeguimientoDeportiva, string OP = null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportControlMedicina.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {

                    SeguimientoMedicinaDeporte HistoriaMedicinaDeporte = new SeguimientoMedicinaDeporte();
                    if (OP != "0")
                    {

                        HistoriaMedicinaDeporte = db.SeguimientoMedicinaDeporte.OrderByDescending(w => w.Fecha).ToList().FirstOrDefault(w => w.NumIdentificacion == IdSeguimientoDeportiva);


                    }
                    else
                    {
                        HistoriaMedicinaDeporte = db.SeguimientoMedicinaDeporte.FirstOrDefault(w => w.IdSeguimientoDeportiva == IdSeguimientoDeportiva);

                    }

                    if (HistoriaMedicinaDeporte != null)
                        {
                        Parameters.Add(new ReportParameter("IdSeguimientoDeportiva", HistoriaMedicinaDeporte.IdSeguimientoDeportiva.ToString()));
                            Parameters.Add(new ReportParameter("Fecha", HistoriaMedicinaDeporte.Fecha == null ? "" : HistoriaMedicinaDeporte.Fecha.ToString()));
                            Parameters.Add(new ReportParameter("DiagnosticoDeportiva", HistoriaMedicinaDeporte.DiagnosticoDeportiva == null ? "" : HistoriaMedicinaDeporte.DiagnosticoDeportiva));
                            Parameters.Add(new ReportParameter("EvolucionDeportiva", HistoriaMedicinaDeporte.EvolucionDeportiva == null ? "" : HistoriaMedicinaDeporte.EvolucionDeportiva));
                            Parameters.Add(new ReportParameter("ConductaDeportiva", HistoriaMedicinaDeporte.ConductaDeportiva == null ? "" : HistoriaMedicinaDeporte.ConductaDeportiva.ToString()));
                           Parameters.Add(new ReportParameter("FirmaDeportiva", HistoriaMedicinaDeporte.FirmaDeportiva == null ? "" : HistoriaMedicinaDeporte.FirmaDeportiva));

                            string ImagenBase64 = string.Empty;
                            string Ruta = string.Empty;
                            switch (HistoriaMedicinaDeporte.FirmaDeportiva.Trim())
                            {
                            case "1065599074":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ENRIQUE_JIMENEZ.png");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49742607":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ANA_RAMIREZ.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49606718":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ANDREA_PABA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;

                            case "49761713":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_DAZA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49778637":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/ELIANA_ROA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "49787755":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/MAIRA_ROMERO.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;
                            case "56077833":
                                Ruta = HttpContext.Current.Server.MapPath("~/images/LUISANA.PNG");
                                ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                                Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                                break;


                        }


                        }

                        var Deportistas = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == HistoriaMedicinaDeporte.NumIdentificacion);
                        if (Deportistas != null)
                        {
                            Parameters.Add(new ReportParameter("PrimerNombre", Deportistas.PrimerNombre == null ? "" : Deportistas.PrimerNombre));
                            Parameters.Add(new ReportParameter("SegundoNombre", Deportistas.SegundoNombre == null ? "" : Deportistas.SegundoNombre));
                            Parameters.Add(new ReportParameter("PrimerApellido", Deportistas.PrimerApellido == null ? "" : Deportistas.PrimerApellido));
                            Parameters.Add(new ReportParameter("SegundoApellido", Deportistas.SegundoApellido == null ? "" : Deportistas.SegundoApellido));
                            Parameters.Add(new ReportParameter("Edad", Deportistas.Edad == null ? "" : Deportistas.Edad));
                            Parameters.Add(new ReportParameter("Genero", Deportistas.Genero == null ? "" : Deportistas.Genero));
                            Parameters.Add(new ReportParameter("Deporte", Deportistas.Deporte == null ? "" : Deportistas.Deporte));
                        Parameters.Add(new ReportParameter("NumIdentificacion", Deportistas.NumIdentificacion == null ? "" : Deportistas.NumIdentificacion.ToString()));

                        }





                    

                }









                this.ReportDataSets = new List<ReportDataSource>();

            }


        }
        public class ReportDeportistaBlanco : ReporteModel
        {

            //The main title for the reprt
            public string ReportTitle { get; set; }

            //The right and left titles and sub title for the report
            public string SubTitle1 { get; set; }
            public string SubTitle2 { get; set; }
            public string SubTitle { get; set; }
            public string Versionfisco { get; set; }
            public string ReportLogo { get; set; }
            public string ReportLogoPie { get; set; }

            // Usuario Activo
            public string Nombre { get; set; }
            public string Identificacion { get; set; }
            public string Correo { get; set; }
            public string DigitoVerificacion { get; set; }
            public string Direccion { get; set; }

            //Contrato
            public string Contrato { get; set; }
            public Boolean Visibilidad { get; set; }
            public ReportDeportistaBlanco(int IdDeportista, string OP = null)
            {

                UserNamPrinting = Utilidades.ActiveUser != null ? Utilidades.ActiveUser.NomUsuario : "Anonimo";
                Format = ReporteModel.ReportFormat.PDF;
                FileName = "~/Reportes/ReportDeportista.rdlc";


                ReportLogo = "";
                ReportLogoPie = "";
                ReportTitle = "";
                SubTitle = "";
                SubTitle1 = "";
                SubTitle2 = "";


                ReportDate = DateTime.Now;
                ReportLanguage = "en-US";
                Nombre = Utilidades.ActiveUser.NomUsuario + " " + Utilidades.ActiveUser.ApeUsuario;
                //Direccion = "";
                DigitoVerificacion = "";
                Identificacion = Utilidades.ActiveUser.CedUsuario;
                Correo = Utilidades.ActiveUser.Correo;
                Format = ReporteModel.ReportFormat.PDF;
                Visibilidad = true;



                //Datos encuesta

                Parameters = new ReportParameterCollection();

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    Deportistas Deport = new Deportistas();
                    if (OP != "0")
                    {
                        Deport = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == IdDeportista);
                    }
                    else
                    {
                        Deport = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == IdDeportista);

                    }

                    if (Deport != null)
                  
                    {
                        Parameters.Add(new ReportParameter("TipoIdentificacion", Deport.TipoIdentificacion == null ? "" : Deport.TipoIdentificacion.ToString()));
                        Parameters.Add(new ReportParameter("NumIdentificacion", Deport.NumIdentificacion == null ? "" : Deport.NumIdentificacion.ToString()));
                        Parameters.Add(new ReportParameter("EstadoDeportista", Deport.EstadoDeportista == null ? "" : Deport.EstadoDeportista));
                        Parameters.Add(new ReportParameter("PrimerNombre", Deport.PrimerNombre == null ? "" : Deport.PrimerNombre));
                        Parameters.Add(new ReportParameter("SegundoNombre", Deport.SegundoNombre == null ? "" : Deport.SegundoNombre));
                        Parameters.Add(new ReportParameter("PrimerApellido", Deport.PrimerApellido == null ? "" : Deport.PrimerApellido));
                        Parameters.Add(new ReportParameter("SegundoApellido", Deport.SegundoApellido == null ? "" : Deport.SegundoApellido));
                        Parameters.Add(new ReportParameter("Edad", Deport.Edad == null ? "" : Deport.Edad));
                        //string ImagenBase64 = string.Empty;
                        //string Ruta = string.Empty;
                        //switch (Utilidades.ActiveUser.CedUsuario.Trim())
                        //{
                        //    case "158974":
                        //        Ruta = HttpContext.Current.Server.MapPath("~/images/final1.jpg");
                        //        ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                        //        Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                        //        break;
                        //    case "1065628638":
                        //        Ruta = HttpContext.Current.Server.MapPath("~/images/bg3.jpg");
                        //        ImagenBase64 = Utilidades.ConvertFileToBase64(Ruta);
                        //        Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                        //        break;
                        //}


                        if (!string.IsNullOrEmpty(Deport.Imagen))
                        {
                            string ImagenBase64 = Utilidades.ConvertFileToBase64(Deport.Imagen);
                            Parameters.Add(new ReportParameter("Imagen", ImagenBase64));
                        }
                        else
                            Parameters.Add(new ReportParameter("Imagen", ""));






                        Parameters.Add(new ReportParameter("Genero", Deport.Genero == null ? "" : Deport.Genero));
                        Parameters.Add(new ReportParameter("GrupoSanguineo", Deport.GrupoSanguineo == null ? "" : Deport.GrupoSanguineo));
                        Parameters.Add(new ReportParameter("Eps", Deport.Eps == null ? "" : Deport.Eps));
                        Parameters.Add(new ReportParameter("CorreoDeportista", Deport.CorreoDeportista == null ? "" : Deport.CorreoDeportista));
                        Parameters.Add(new ReportParameter("FechaNacimiento", Deport.FechaNacimiento == null ? "" : Deport.FechaNacimiento.ToString()));
                        Parameters.Add(new ReportParameter("PaisNacimiento", Deport.PaisNacimiento == null ? "" : Deport.PaisNacimiento));
                        Parameters.Add(new ReportParameter("DepartamentoNacimiento", Deport.DepartamentoNacimiento == null ? "" : Deport.DepartamentoNacimiento));
                        Parameters.Add(new ReportParameter("MunicipioNacimiento", Deport.MunicipioNacimiento == null ? "" : Deport.MunicipioNacimiento));
                        Parameters.Add(new ReportParameter("GrupoEtareo", Deport.GrupoEtareo == null ? "" : Deport.GrupoEtareo));
                        Parameters.Add(new ReportParameter("CondicionPoblacion", Deport.CondicionPoblacion == null ? "" : Deport.CondicionPoblacion));
                        Parameters.Add(new ReportParameter("Telefono", Deport.Telefono == null ? "" : Deport.Telefono));
                        Parameters.Add(new ReportParameter("NivelEstudio", Deport.NivelEstudio == null ? "" : Deport.NivelEstudio));
                        Parameters.Add(new ReportParameter("PaisResidencia", Deport.PaisResidencia == null ? "" : Deport.PaisResidencia));
                        Parameters.Add(new ReportParameter("DepartamentoResidencia", Deport.DepartamentoResidencia == null ? "" : Deport.DepartamentoResidencia));
                        Parameters.Add(new ReportParameter("MunicipioResidencia", Deport.MunicipioResidencia == null ? "" : Deport.MunicipioResidencia));
                        Parameters.Add(new ReportParameter("BarrioResidencia", Deport.BarrioResidencia == null ? "" : Deport.BarrioResidencia));
                        Parameters.Add(new ReportParameter("DireccionResidencia", Deport.DireccionResidencia == null ? "" : Deport.DireccionResidencia));
                        Parameters.Add(new ReportParameter("TipoEtnia", Deport.TipoEtnia == null ? "" : Deport.TipoEtnia));
                        Parameters.Add(new ReportParameter("ZonaInfluencia", Deport.ZonaInfluencia == null ? "" : Deport.ZonaInfluencia));
                        Parameters.Add(new ReportParameter("EntidadPrestadora", Deport.EntidadPrestadora == null ? "" : Deport.EntidadPrestadora));
                        Parameters.Add(new ReportParameter("NombreMonitor", Deport.NombreMonitor == null ? "" : Deport.NombreMonitor));
                        Parameters.Add(new ReportParameter("NombreGrupo", Deport.NombreGrupo == null ? "" : Deport.NombreGrupo));





                        var DatosFamiliares = db.DatosFamiliares.FirstOrDefault(w => w.IdDeportista == Deport.IdDeportista);
                        if (DatosFamiliares != null)
                        {
                            Parameters.Add(new ReportParameter("NomMadre", DatosFamiliares.NomMadre == null ? "" : DatosFamiliares.NomMadre));
                            Parameters.Add(new ReportParameter("ApeMadre", DatosFamiliares.ApeMadre == null ? "" :  DatosFamiliares.ApeMadre));
                            Parameters.Add(new ReportParameter("TipoDocumento", DatosFamiliares.TipoDocumento == null ? "" :  DatosFamiliares.TipoDocumento));
                            Parameters.Add(new ReportParameter("NumDocumento", DatosFamiliares.NumDocumento == null ? "" :  DatosFamiliares.NumDocumento));
                            Parameters.Add(new ReportParameter("Direccion", DatosFamiliares.Direccion == null ? "" :  DatosFamiliares.Direccion));
                            Parameters.Add(new ReportParameter("Barrio", DatosFamiliares.Barrio == null ? "" :  DatosFamiliares.Barrio));
                            Parameters.Add(new ReportParameter("Celular", DatosFamiliares.Celular == null ? "" :  DatosFamiliares.Celular));
                            Parameters.Add(new ReportParameter("Ocupacion", DatosFamiliares.Ocupacion == null ? "" :  DatosFamiliares.Ocupacion));
                            Parameters.Add(new ReportParameter("NomPadre", DatosFamiliares.NomPadre == null ? "" :  DatosFamiliares.NomPadre));
                            Parameters.Add(new ReportParameter("ApePadre", DatosFamiliares.ApePadre == null ? "" :  DatosFamiliares.ApePadre));
                            Parameters.Add(new ReportParameter("TipoPadre", DatosFamiliares.TipoPadre == null ? "" :  DatosFamiliares.TipoPadre));
                            Parameters.Add(new ReportParameter("NumPadre", DatosFamiliares.NumPadre == null ? "" :  DatosFamiliares.NumPadre));
                            Parameters.Add(new ReportParameter("DireccionPadre", DatosFamiliares.DireccionPadre == null ? "" :  DatosFamiliares.DireccionPadre));
                            Parameters.Add(new ReportParameter("BarrioPadre", DatosFamiliares.BarrioPadre == null ? "" :  DatosFamiliares.BarrioPadre));
                            Parameters.Add(new ReportParameter("CelularPadre", DatosFamiliares.CelularPadre == null ? "" :  DatosFamiliares.CelularPadre));
                            Parameters.Add(new ReportParameter("OcupacionPadre", DatosFamiliares.OcupacionPadre == null ? "" :  DatosFamiliares.OcupacionPadre));
                        }
                        




                        var Ocupacion = db.Ocupacion.FirstOrDefault(w => w.IdDeportista == Deport.IdDeportista);
                        if (Ocupacion != null)
                        {
                            Parameters.Add(new ReportParameter("Ocupacion1", Ocupacion.Ocupacion1 == null ? "" : Ocupacion.Ocupacion1));
                            //Parameters.Add(new ReportParameter("NivelEducativo", DatosFamiliares.NomMadre == null ? "" :  Ocupacion.NivelEducativo));
                            Parameters.Add(new ReportParameter("Institucion", Ocupacion.Institucion == null ? "" :  Ocupacion.Institucion));
                            //Parameters.Add(new ReportParameter("TelefonoInstitucion", Ocupacion.Ocupacion1 == null ? "" :  Ocupacion.TelefonoInstitucion));
                            //Parameters.Add(new ReportParameter("DirectorGrado", Ocupacion.Ocupacion1 == null ? "" :  Ocupacion.DirectorGrado));
                            Parameters.Add(new ReportParameter("Peso", Ocupacion.Peso == null ? "" :  Ocupacion.Peso.ToString()));
                            Parameters.Add(new ReportParameter("Estatura", Ocupacion.Estatura == null ? "" :  Ocupacion.Estatura.ToString()));
                            Parameters.Add(new ReportParameter("TallaCamisa", Ocupacion.TallaCamisa == null ? "" :  Ocupacion.TallaCamisa));
                            Parameters.Add(new ReportParameter("TallaPantalon", Ocupacion.TallaPantalon == null ? "" :  Ocupacion.TallaPantalon.ToString()));
                            Parameters.Add(new ReportParameter("TallaCalzado", Ocupacion.TallaCalzado == null ? "" :  Ocupacion.TallaCalzado.ToString()));
                            Parameters.Add(new ReportParameter("TallaSudadera", Ocupacion.TallaSudadera == null ? "" :  Ocupacion.TallaSudadera));
                            Parameters.Add(new ReportParameter("NumeroHijos", Ocupacion.NumeroHijos == null ? "" :  Ocupacion.NumeroHijos.ToString()));

                        }


                    }

                }









                this.ReportDataSets = new List<ReportDataSource>();

            }


        }


    }
}