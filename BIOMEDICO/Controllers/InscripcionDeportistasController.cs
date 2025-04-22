using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using static BIOMEDICO.Controllers.ControlNutricionController;
using System.Net.Http.Headers;
using BIOMEDICO.Filters;
using Newtonsoft.Json;
using System.Runtime.InteropServices.ComTypes;

namespace BIOMEDICO.Controllers
{
    public class InscripcionDeportistasController : Controller
    {
        // GET: InscripcionDeportistas
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListaInscripcionDeportistas()
        {
            return View();
        }
        public struct ObjInscripcionDeportistas
        {
            public InscripcionesDeportistas InscripcionDeportistasDeport { get; set; }
            
                   

        }

        public struct Respuesta
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }
            public bool refrescar { get; set; }

        }
        [HttpGet]
        public JsonResult BuscarCedulaDeportista(long Identificacion)
        {
            var DatosDeportista = new InscripcionesDeportistas();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosDeportista = db.InscripcionesDeportistas.FirstOrDefault(w => w.NumIdentificacionInscripciones == Identificacion);
            }
            return Json(DatosDeportista, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]

        public JsonResult BuscarDeportista(long cedula)
        {
            var DatosdEportista = new Deportistas();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosdEportista = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == cedula);
            }
            return Json(DatosdEportista, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListInscripcionDeportistas()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var InscripcionDeportistasDeport = db.InscripcionesDeportistas.ToList().OrderByDescending(o => o.IdIncripcionBeneficiarios);
                foreach (var item in InscripcionDeportistasDeport)
                {

                }

                ret.objeto = InscripcionDeportistasDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

               

            }
            var jsonResult = Json(ret, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public JsonResult GetInscripcionDeportistasDeportDeportivaById(int IdInscripcionDeportistasDeportDepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var InscripcionDeportistasDeportDepoUpdate = db.InscripcionesDeportistas.FirstOrDefault(w => w.IdIncripcionBeneficiarios == IdInscripcionDeportistasDeportDepor);
                if (InscripcionDeportistasDeportDepoUpdate != null)
                {
                }


                ret.objeto = InscripcionDeportistasDeportDepoUpdate;



            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }



        [HttpGet]        
        public ActionResult Agregar(bool ViewFree = false)
        {
            ViewBag.ViewFree = ViewFree;
            return View();

        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Agregar()
        {
            Respuesta Retorno = new Respuesta();

            try
            {
                ObjInscripcionDeportistas a = JsonConvert.DeserializeObject<ObjInscripcionDeportistas>(Request.Form["persona"]);
                var files = Request.Files;
                var documentoBenefFile = files["cedulaBeneficiarioFile"];
                var saludFile = files["saludFile"];
                var autorizacionFile = files["autorizacionFile"];
                var cedulaPadreFile = files["cedulaPadreFile"];
                DocumentosEnBytes documentosEnBytes = new DocumentosEnBytes();                

                if (documentoBenefFile != null && documentoBenefFile.InputStream.CanSeek)
                {
                    documentoBenefFile.InputStream.Seek(0, SeekOrigin.Begin);

                    using (MemoryStream memoryStream = new MemoryStream())
                    {                       
                        documentoBenefFile.InputStream.CopyTo(memoryStream);
                        documentosEnBytes.documentoBenefBytes = memoryStream.ToArray();
                    }
                }               

                if (saludFile != null && saludFile.InputStream.CanSeek)
                {
                    saludFile.InputStream.Seek(0, SeekOrigin.Begin);

                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        saludFile.InputStream.CopyTo(memoryStream);
                        documentosEnBytes.saludFileBytes = memoryStream.ToArray();
                    }
                }
               
                if (autorizacionFile != null && autorizacionFile.InputStream.CanSeek)
                {
                    autorizacionFile.InputStream.Seek(0, SeekOrigin.Begin);
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        autorizacionFile.InputStream.CopyTo(memoryStream);
                        documentosEnBytes.autorizacionFileBytes = memoryStream.ToArray();
                    }
                }
               
                if (cedulaPadreFile != null && cedulaPadreFile.InputStream.CanSeek)
                {
                    cedulaPadreFile.InputStream.Seek(0, SeekOrigin.Begin);
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        cedulaPadreFile.InputStream.CopyTo(memoryStream);
                        documentosEnBytes.cedulaPadreFileBytes = memoryStream.ToArray();
                    }
                }

               

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
                {
                    // Verificar si el número de identificación ya existe
                    var existeCedula = db.InscripcionesDeportistas.Any(i => i.NumIdentificacionInscripciones == a.InscripcionDeportistasDeport.NumIdentificacionInscripciones);

                    if (existeCedula)
                    {
                        Retorno.Error = true;
                        Retorno.mensaje = "El deportista ya fue registrado con exito.!";
                        Retorno.refrescar = true;  // Añadir propiedad para refrescar
                        return Json(Retorno, JsonRequestBehavior.AllowGet);
                    }

                    db.InscripcionesDeportistas.Add(a.InscripcionDeportistasDeport);
                    db.SaveChanges();

                    string basePath = AppDomain.CurrentDomain.BaseDirectory;
                    string path = Path.Combine(basePath, "ArchivosPDF", $"{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}");

                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    if (string.IsNullOrEmpty(a.InscripcionDeportistasDeport.DocumentoPdf) || EsPDF(documentosEnBytes?.documentoBenefBytes))
                    {
                        if (!string.IsNullOrEmpty(documentoBenefFile?.FileName))
                        {
                            System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-Documento.pdf", documentosEnBytes.documentoBenefBytes);
                        }

                        if (!string.IsNullOrEmpty(saludFile?.FileName) && EsPDF(documentosEnBytes?.saludFileBytes))
                        {
                            System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-Salud.pdf", documentosEnBytes.saludFileBytes);
                        }
  
                        if (!string.IsNullOrEmpty(autorizacionFile?.FileName) && EsPDF(documentosEnBytes?.autorizacionFileBytes))
                        {
                            System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-Autorizacion.pdf", documentosEnBytes.autorizacionFileBytes);
                        }

                        if (!string.IsNullOrEmpty(cedulaPadreFile?.FileName) && EsPDF(documentosEnBytes?.cedulaPadreFileBytes))
                        {
                            System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-Cedulafamiliar.pdf", documentosEnBytes.cedulaPadreFileBytes);
                        }
                    }
                    else
                    {
                        Console.WriteLine("No tiene documento");
                    }

                    Retorno.Error = false;
                    Retorno.mensaje = "Formulario Inscripcion Deportistas guardado correctamente.";
                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                Retorno.Error = true;
                Retorno.mensaje = "Error al agregar deportistas: " + ex.Message;
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);

            // Función para verificar si es un PDF
            bool EsPDF(byte[] bytes)
            {               
                if (bytes.Length >= 5 &&
                    bytes[0] == 0x25 && // %
                    bytes[1] == 0x50 && // P
                    bytes[2] == 0x44 && // D
                    bytes[3] == 0x46 && // F
                    bytes[4] == 0x2D)   // -
                {
                    return true;
                }
                return false;
            }
        }


        //[HttpPost]
        ////[ValidateAntiForgeryToken]
        //public JsonResult Agregar(ObjInscripcionDeportistas a)
        //{
        //    Respuesta Retorno = new Respuesta();


        //    try
        //    {

        //        using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

        //        {

        //            db.InscripcionesDeportistas.Add(a.InscripcionDeportistasDeport);

        //            db.SaveChanges();


        //            string basePath = AppDomain.CurrentDomain.BaseDirectory;
        //            string path = Path.Combine(basePath, "ArchivosPDF", $"{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}");

        //            if (!Directory.Exists(path))
        //            {
        //                Directory.CreateDirectory(path);
        //            }
        //            if (string.IsNullOrEmpty(a.InscripcionDeportistasDeport.DocumentoPdf) || EsPDF(a.InscripcionDeportistasDeport.DocumentoPdf))
        //            {
        //                if (!string.IsNullOrEmpty(a.InscripcionDeportistasDeport.DocumentoPdf))
        //                {
        //                    System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-Documento.pdf", Convert.FromBase64String(a.InscripcionDeportistasDeport.DocumentoPdf));
        //                }

        //                if (!string.IsNullOrEmpty(a.InscripcionDeportistasDeport.SaludPdf) && EsPDF(a.InscripcionDeportistasDeport.SaludPdf))
        //                {
        //                    System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-Salud.pdf", Convert.FromBase64String(a.InscripcionDeportistasDeport.SaludPdf));
        //                }

        //                if (!string.IsNullOrEmpty(a.InscripcionDeportistasDeport.AutorizacionPdf) && EsPDF(a.InscripcionDeportistasDeport.AutorizacionPdf))
        //                {
        //                    System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-autorizacion.pdf", Convert.FromBase64String(a.InscripcionDeportistasDeport.AutorizacionPdf));
        //                }


        //                if (!string.IsNullOrEmpty(a.InscripcionDeportistasDeport.CedulaPadrePdf) && EsPDF(a.InscripcionDeportistasDeport.CedulaPadrePdf))
        //                 {
        //                   System.IO.File.WriteAllBytes($"{path}/{a.InscripcionDeportistasDeport.NumIdentificacionInscripciones}-Cedulafamiliar.pdf", Convert.FromBase64String(a.InscripcionDeportistasDeport.CedulaPadrePdf));
        //                 }
        //                }                  



        //            else
        //            {
        //                Console.WriteLine("No tiene documento");
        //            }


        //            // Función para verificar si es un PDF
        //            bool EsPDF(string base64String)
        //            {
        //                // Convierte la cadena base64 en un array de bytes
        //                byte[] bytes = Convert.FromBase64String(base64String);

        //                // Verifica si los primeros bytes coinciden con la cabecera de un PDF ("%PDF-")
        //                if (bytes.Length >= 5 &&
        //                    bytes[0] == 0x25 && // %
        //                    bytes[1] == 0x50 && // P
        //                    bytes[2] == 0x44 && // D
        //                    bytes[3] == 0x46 && // F
        //                    bytes[4] == 0x2D)   // -
        //                {
        //                    // Si los primeros bytes coinciden, es un PDF
        //                    return true;
        //                }

        //                // Si no se cumple la condición, no es un PDF
        //                return false;
        //            }


        //            Retorno.Error = false;
        //            Retorno.mensaje = "Formulario Inscripcion Deportistas.! ";


        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        String Error = ex.Message;
        //        //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
        //        Retorno.Error = true;
        //        Retorno.mensaje = "Debes completar todos los registros del formulario!";
        //    }
        //    return Json(Retorno, JsonRequestBehavior.AllowGet);
        //}

        public static string SavePdfFile(string PdfData, string FileName)
        {
            string Respuesta = "";

            try
            {
                if (!string.IsNullOrEmpty(PdfData) && PdfData.Contains(","))
                {
                    PdfData = PdfData.Substring(PdfData.IndexOf(",") + 1);


                }

                var filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/images/DocumentosPdf"); // Ruta donde se guardarán los archivos PDF
                var pdfPath = Path.Combine(filePath, FileName);


                byte[] pdfBytes = Convert.FromBase64String(PdfData);

                if (System.IO.File.Exists(pdfPath))
                {
                    System.IO.File.Delete(pdfPath);
                }

                System.IO.File.WriteAllBytes(pdfPath, pdfBytes);

                Respuesta = pdfPath;
            }
            catch (Exception ex)
            {
                // Registra el mensaje de excepción para depuración
                Console.WriteLine("Excepción: " + ex.ToString());
                Respuesta = "";
            }


            return Respuesta;
        }

        [HttpGet]
        public ActionResult DownloadPdfs(string IdIncripcionBeneficiarios)
        {
            // Ruta a la carpeta que contiene los archivos PDF
            string folderPath = Server.MapPath("~/ArchivosPDF/" + IdIncripcionBeneficiarios);
            string zipFileName = "myzipfile.zip";
            // Verificar si la carpeta existe
            //if (Directory.Exists(folderPath))
            //{
            //    // Nombre del archivo ZIP que se descargará
            //    string zipFileName = "archivos_" + IdIncripcionBeneficiarios + ".zip";
            //    string zipFilePath = Server.MapPath("~/ArchivosPDF/" + zipFileName);

            // Devuelve el archivo ZIP como FileResult

            PushStreamContent pushStreamContent;
            try
            {
                var directoryFileBytes = System.IO.Directory.GetFiles(folderPath);
                //string zipFileName2 = "archivos_" + IdIncripcionBeneficiarios + ".zip";
                //ZipFile.CreateFromDirectory(folderPath, zipFileName2);

                using (MemoryStream zipMemoryStream = new MemoryStream())
                {
                    // Create a new zip file
                    using (ZipArchive zipArchive = new ZipArchive(zipMemoryStream, ZipArchiveMode.Create, true))
                    {
                        // Add each file to the zip archive
                        foreach (string filePath in directoryFileBytes)
                        {
                            // Get the relative path of the file within the directory
                            string relativePath = Path.Combine(folderPath, Path.GetFileName(filePath));

                            // Create a new entry in the zip archive
                            ZipArchiveEntry entry = zipArchive.CreateEntry(Path.GetFileName(filePath));

                            // Write the file content to the zip entry
                            using (FileStream fileStream = new FileStream(filePath, FileMode.Open))
                            using (Stream entryStream = entry.Open())
                            {
                                fileStream.CopyTo(entryStream);
                            }
                        }
                    }

                    // Reset the memory stream position
                    zipMemoryStream.Position = 0;

                    // Create a PushStreamContent object with the zip file content
                    pushStreamContent = new PushStreamContent((stream, content, context) =>
                    {
                        zipMemoryStream.CopyTo(stream);
                        stream.Flush();
                        stream.Close();
                    });

                    // Set the content type
                    pushStreamContent.Headers.ContentType = new MediaTypeHeaderValue("application/zip");
                    pushStreamContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                    {
                        FileName = zipFileName
                    };

                    return File(pushStreamContent.ReadAsByteArrayAsync().Result, "application/zip");
                }
            }
            catch (Exception)
            {
                return HttpNotFound();
            }
                          
        }
    }

}