using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BIOMEDICO.Models;
using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;

namespace BIOMEDICO.Controllers
{
    public class ReportController : Controller
    {
        // GET: Report
        public ActionResult Index()
        {
            //try
            //{
            //geting repot data from the business object
            string Id = (Request.QueryString["Id"] != null ? Request.QueryString["Id"] : "0");
            int IdUser = (Request.QueryString["IdUser"] != null ? int.Parse(Request.QueryString["IdUser"]) : 0);
            string tipo = Request.QueryString["tipo"] != null ? Request.QueryString["tipo"] : "";
            string Opcion = Request.QueryString["Opcion"] != null ? Request.QueryString["Opcion"] : "";
            Boolean View = Request.QueryString["View"] != null ? true : false;
            Core Core = new Core();
            var reportViewModel = Core.LlenarReporte(tipo, Id, IdUser, Opcion);

            reportViewModel.ViewAsAttachment = View;

            var renderedBytes = reportViewModel.RenderReport();

            if (reportViewModel.ViewAsAttachment)
                Response.AddHeader("content-disposition", reportViewModel.ReporExportFileName);
            return File(renderedBytes, reportViewModel.LastmimeType);
            //}
            //catch (Exception ex)
            //{
            //    return null;
            //}
        }

        private void saveInDisk(string fileName, byte[] dataArray)
        {

            using (FileStream
                fileStream = new FileStream(Server.MapPath("~/Content/PdfsTemporales/" + fileName + ".pdf"), FileMode.Create))
            {
                for (int i = 0; i < dataArray.Length; i++)
                {
                    fileStream.WriteByte(dataArray[i]);
                }

                fileStream.Seek(0, SeekOrigin.Begin);

                for (int i = 0; i < fileStream.Length; i++)
                {
                    if (dataArray[i] != fileStream.ReadByte())
                    {

                        return;
                    }
                }

            }
        }
        public void PdfMergerGeneric()
        {

            try
            {
                // Obtenemos los valores a consultar.
                string Id = (Request.QueryString["Id"] != null ? Request.QueryString["Id"] : "0");
                int IdUser = (Request.QueryString["IdUser"] != null ? int.Parse(Request.QueryString["IdUser"]) : 0);
                string tipo = Request.QueryString["tipo"] != null ? Request.QueryString["tipo"] : "";
                string Opcion = Request.QueryString["Opcion"] != null ? Request.QueryString["Opcion"] : "";
                Boolean View = Request.QueryString["View"] != null ? true : false;

                List<string> ListaNro = new List<string>();



                PdfDocument pdfDoc = new PdfDocument();

                var Core = new Core();

                int cont = 0;
                string fileName = "temp";

                List<PdfDocument> pdfs = new List<PdfDocument>();


                //Verificamos si el directorio existe, si no pues lo creamos
                if (!Directory.Exists(Server.MapPath("~/Content/PdfsTemporales/")))
                {
                    Directory.CreateDirectory(Server.MapPath("~/Content/PdfsTemporales/"));
                };

                //Guardamos en el disco los pdfs de cada declaracion
                //
                ReporteModel model0 = Core.LlenarReporte("Deport", "", IdUser);

                model0.ViewAsAttachment = true;
                cont = cont + 1;

                string name0 = fileName + cont.ToString();
                saveInDisk(name0, model0.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name0 + ".pdf"), PdfDocumentOpenMode.Import));


                ReporteModel model = Core.LlenarReporte("Fisio", "ALL", IdUser);

                model.ViewAsAttachment = true;
                cont = cont + 1;

                string name = fileName + cont.ToString();
                saveInDisk(name, model.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name + ".pdf"), PdfDocumentOpenMode.Import));

                ReporteModel model4 = Core.LlenarReporte("ControlFisio", "ALL", IdUser);

                model.ViewAsAttachment = true;
                cont = cont + 1;

                string name4 = fileName + cont.ToString();
                saveInDisk(name4, model4.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name4 + ".pdf"), PdfDocumentOpenMode.Import));


                ReporteModel model1 = Core.LlenarReporte("Nutri", "ALL", IdUser);

                model1.ViewAsAttachment = true;
                cont = cont + 1;

                string name1 = fileName + cont.ToString();
                saveInDisk(name1, model1.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name1 + ".pdf"), PdfDocumentOpenMode.Import));


                ReporteModel model2 = Core.LlenarReporte("Psico", "ALL", IdUser);

                model2.ViewAsAttachment = true;
                cont = cont + 1;

                string name2 = fileName + cont.ToString();
                saveInDisk(name2, model2.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name2 + ".pdf"), PdfDocumentOpenMode.Import));


                ReporteModel model3 = Core.LlenarReporte("Med", "ALL", IdUser);

                model3.ViewAsAttachment = true;
                cont = cont + 1;

                string name3 = fileName + cont.ToString();
                saveInDisk(name3, model3.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name3 + ".pdf"), PdfDocumentOpenMode.Import));


                ReporteModel model5 = Core.LlenarReporte("ControlMedicina", "ALL", IdUser);

                model3.ViewAsAttachment = true;
                cont = cont + 1;

                string name5 = fileName + cont.ToString();
                saveInDisk(name5, model5.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name5 + ".pdf"), PdfDocumentOpenMode.Import));


                ReporteModel model6 = Core.LlenarReporte("ControlPsicologia", "ALL", IdUser);

                model6.ViewAsAttachment = true;
                cont = cont + 1;

                string name6 = fileName + cont.ToString();
                saveInDisk(name6, model6.RenderReport());

                pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name6 + ".pdf"), PdfDocumentOpenMode.Import));

                //ReporteModel model7 = Core.LlenarReporte("ControlNutricion", "ALL", IdUser);

                //model7.ViewAsAttachment = true;
                //cont = cont + 1;

                //string name7 = fileName + cont.ToString();
                //saveInDisk(name6, model7.RenderReport());

                //pdfs.Add(PdfReader.Open(Server.MapPath("~/Content/PdfsTemporales/" + name7 + ".pdf"), PdfDocumentOpenMode.Import));






                PdfDocument combinedOutput = new PdfDocument();

                //Integramos todos los pdfs en uno solo
                foreach (PdfDocument pdf in pdfs)
                {
                    int repPageCount = pdf.PageCount;
                    for (int i = 0; i < repPageCount; i++)
                    {
                        PdfPage page = pdf.Pages[i];
                        page = combinedOutput.AddPage(page);
                    }

                    pdf.Dispose();


                }
                pdfs.Clear();
                pdfs = null;


                //Guardamos el pdf con todas las declaraciones
                combinedOutput.Save(Server.MapPath("~/Content/report.pdf"));

                Response.ContentType = "application/pdf"; //set the MIME type here
                Response.AddHeader("content-disposition", "attachment; filename=Registros.pdf");
                Response.TransmitFile(Server.MapPath("~/Content/report.pdf")); //Enviamos el archivo

                combinedOutput.Dispose();

            }
            catch (Exception ex)
            {

                //return null;
            }
        }

    }
}