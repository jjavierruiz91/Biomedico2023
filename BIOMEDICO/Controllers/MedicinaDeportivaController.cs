using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class MedicinaDeportivaController : Controller
    {
        // GET: MedicinaDeportiva
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListaMedicinaDeportiva()
        {
            return View();
        }
        public struct ObjMedicinaDeportiva
        {
            public MedicinaDelDeporte MedicinaDeport { get; set; }
            public AntecedentesMedicinaDelDeporte AntecedentesDeport { get; set; }

            public ExamenFisicoMedicinaDelDeporte ExamenDeport { get; set; }




        }

        public struct Respuesta
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }

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
        public JsonResult GetListMedicinaDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var MedicinaDeport = db.MedicinaDelDeporte.ToList().OrderByDescending(o => o.IdMedicina);
                foreach (var item in MedicinaDeport)
                {
                              
                    item.AntecedentesMedicinaDelDeporte = db.AntecedentesMedicinaDelDeporte.Where(w => w.IdMedicina == item.IdMedicina).ToList();
                    item.ExamenFisicoMedicinaDelDeporte = db.ExamenFisicoMedicinaDelDeporte.Where(w => w.IdMedicina == item.IdMedicina).ToList();
                }

                ret.objeto = MedicinaDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetMedicinaDeportivaById(int Idmeddepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var MedDepoUpdate = db.MedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == Idmeddepor);
                if (MedDepoUpdate != null)
                {
                    MedDepoUpdate.AntecedentesMedicinaDelDeporte = db.AntecedentesMedicinaDelDeporte.Where(w => w.IdMedicina == MedDepoUpdate.IdMedicina).ToList();
                    MedDepoUpdate.ExamenFisicoMedicinaDelDeporte = db.ExamenFisicoMedicinaDelDeporte.Where(w => w.IdMedicina == MedDepoUpdate.IdMedicina).ToList();
                }


                ret.objeto = MedDepoUpdate;



            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }

  
              

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Agregar(ObjMedicinaDeportiva a)
        {
            Respuesta Retorno = new Respuesta();

            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {


                    ////a.Depor = db.Deportistas.Where(w => w.CodRol == a.CodRol).FirstOrDefault();
                    //a.Deport.FechaCreacion = DateTime.Now;
                    //a.Deport.FechaServicio = DateTime.Now;
                    a.AntecedentesDeport.AnexosMedicinaDeportiva = SaveImagenFile(a.AntecedentesDeport.AnexosMedicinaDeportiva, a.MedicinaDeport.NumIdentificacion + ".jpg");

                    a.MedicinaDeport.FechaRegistro = DateTime.Now;
                    a.MedicinaDeport.UsuarioRegistro = Utilidades.ActiveUser.NomUsuario;
                    a.ExamenDeport.FirmaMedico = Utilidades.ActiveUser.CedUsuario;


                    db.MedicinaDelDeporte.Add(a.MedicinaDeport);
                    var IdCita = a.MedicinaDeport.IdCitaMedica;
                    db.SaveChanges();
                    var Id = a.MedicinaDeport.IdMedicina;

                    //ADD ID TO TABLE DATAFAMILIA
                    a.AntecedentesDeport.IdMedicina = Id;
                    a.AntecedentesDeport.MedicinaDelDeporte = db.MedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == Id);

                    //add id to tabla ocupation

                    a.ExamenDeport.IdMedicina = Id;
                    a.ExamenDeport.MedicinaDelDeporte = db.MedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == Id);

                    db.AntecedentesMedicinaDelDeporte.Add(a.AntecedentesDeport);
                    db.ExamenFisicoMedicinaDelDeporte.Add(a.ExamenDeport);

                    var CitasDeportistaExiste = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdCita);
                    if (CitasDeportistaExiste != null)
                    {

                        CitasDeportistaExiste.EstadoCitas  = "FINALIZADA";

                        db.SaveChanges();
                    }

                        db.SaveChanges();

                    if (Id > 0)
                    {
                        Retorno.Error = false;
                        Retorno.mensaje = "Guardado";

                    }
                    else
                    {
                        Retorno.Error = true;
                        Retorno.mensaje = "No se pudo guardar";
                    }

                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Error al agregar";
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Actualizar(ObjMedicinaDeportiva a)
        {
            Respuesta Retorno = new Respuesta();
            //JsonConvert.DeserializeObject<List<ObjDeportista>>(a);
            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    try
                    {
                        a.ExamenDeport.FirmaMedico = Utilidades.ActiveUser.CedUsuario;
                        var MedicinaDeportivaExiste = db.MedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == a.MedicinaDeport.IdMedicina);
                        if (MedicinaDeportivaExiste != null)
                        {

                            MedicinaDeportivaExiste.IdMedicina = a.MedicinaDeport.IdMedicina;
                            MedicinaDeportivaExiste.CodMedicina = a.MedicinaDeport.CodMedicina;
                            MedicinaDeportivaExiste.FechaConsulta = a.MedicinaDeport.FechaConsulta;
                            MedicinaDeportivaExiste.MotivoConsulta = a.MedicinaDeport.MotivoConsulta;
                            MedicinaDeportivaExiste.EnfermedadActual = a.MedicinaDeport.EnfermedadActual;
                            db.SaveChanges();

                            var AntecendetesMedicinaDepoExiste = db.AntecedentesMedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == a.MedicinaDeport.IdMedicina);
                            if (AntecendetesMedicinaDepoExiste != null)
                            {
                                //AntecendetesMedicinaDepoExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                AntecendetesMedicinaDepoExiste.Patologicos = a.AntecedentesDeport.Patologicos;
                                AntecendetesMedicinaDepoExiste.Quirurgicos = a.AntecedentesDeport.Quirurgicos;
                                AntecendetesMedicinaDepoExiste.Farmacologicos = a.AntecedentesDeport.Farmacologicos;
                                AntecendetesMedicinaDepoExiste.Familiares = a.AntecedentesDeport.Familiares;
                                AntecendetesMedicinaDepoExiste.Traumatologicos = a.AntecedentesDeport.Traumatologicos;
                                AntecendetesMedicinaDepoExiste.LesionesDeportivas = a.AntecedentesDeport.LesionesDeportivas;
                                AntecendetesMedicinaDepoExiste.Alergicos = a.AntecedentesDeport.Alergicos;
                                AntecendetesMedicinaDepoExiste.PruebaCovid19 = a.AntecedentesDeport.PruebaCovid19;
                                AntecendetesMedicinaDepoExiste.AnexosMedicinaDeportiva = a.AntecedentesDeport.AnexosMedicinaDeportiva;
                                AntecendetesMedicinaDepoExiste.IdMedicina = MedicinaDeportivaExiste.IdMedicina;
                                AntecendetesMedicinaDepoExiste.MedicinaDelDeporte = MedicinaDeportivaExiste;
                                db.SaveChanges();


                            }
                            var ExamenFiscoDepoExiste = db.ExamenFisicoMedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == a.MedicinaDeport.IdMedicina);
                            if (ExamenFiscoDepoExiste != null)
                            {
                                //ExamenFiscoDepoExiste.IdExamenFisico = a.ExamenDeport.IdExamenFisico;
                                ExamenFiscoDepoExiste.TensionArterial = a.ExamenDeport.TensionArterial;
                                ExamenFiscoDepoExiste.Peso = a.ExamenDeport.Peso;
                                ExamenFiscoDepoExiste.IndiceMasaCorporal = a.ExamenDeport.IndiceMasaCorporal;
                                ExamenFiscoDepoExiste.Postura = a.ExamenDeport.Postura;
                                ExamenFiscoDepoExiste.FrecuenciaCardiaca = a.ExamenDeport.FrecuenciaCardiaca;
                                ExamenFiscoDepoExiste.Talla = a.ExamenDeport.Talla;
                                ExamenFiscoDepoExiste.Tanner = a.ExamenDeport.Tanner;
                                ExamenFiscoDepoExiste.Grasos = a.ExamenDeport.Grasos;
                                ExamenFiscoDepoExiste.Muscular = a.ExamenDeport.Muscular;
                                ExamenFiscoDepoExiste.ExamenEspecifico = a.ExamenDeport.ExamenEspecifico;
                                ExamenFiscoDepoExiste.Diagnostico = a.ExamenDeport.Diagnostico;
                                ExamenFiscoDepoExiste.Conducta = a.ExamenDeport.Conducta;
                                ExamenFiscoDepoExiste.FirmaMedico = a.ExamenDeport.FirmaMedico;
                                ExamenFiscoDepoExiste.IdMedicina = MedicinaDeportivaExiste.IdMedicina;
                                ExamenFiscoDepoExiste.MedicinaDelDeporte = MedicinaDeportivaExiste;
                                db.SaveChanges();
                            }
                            
                        }

                        Retorno.Error = false;
                        Retorno.mensaje = "Actualizado";


                    }
                    catch (Exception ex)
                    {
                        Retorno.Error = true;
                        Retorno.mensaje = "Error al Actualizar";
                    }




                }
            }
            catch (Exception ex)
            {
                String Error = ex.Message;
                //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
                Retorno.Error = true;
                Retorno.mensaje = "Error al agregar deportistas";
            }
            return Json(Retorno);
        }


        [HttpGet]
        public JsonResult Eliminar(int idMedDep)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var MedDepoExiste = db.MedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == idMedDep);
                    if (MedDepoExiste != null)
                    {
                        db.MedicinaDelDeporte.Remove(MedDepoExiste);

                        db.SaveChanges();
                        respuesta.Error = false;
                    }
                }
                catch (Exception ex)
                {
                    respuesta.mensaje = ex.Message;
                    respuesta.Error = true;
                }


            }

            return Json(respuesta, JsonRequestBehavior.AllowGet);
        }

        public static string SaveImagenFile(string AnexosMedicinaDeportiva, string NameFile)
        {
            string Respuesta = "";
            try
            {
                if (!string.IsNullOrEmpty(AnexosMedicinaDeportiva))
                {
                    AnexosMedicinaDeportiva = AnexosMedicinaDeportiva.Split(',')[1];
                }
                var filePath = "";
                filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/images/MedicinaDeportiva");

                byte[] fileBytes = Convert.FromBase64String(AnexosMedicinaDeportiva);
                string imgPath = Path.Combine(filePath, NameFile);

                if (System.IO.File.Exists(imgPath))
                    System.IO.File.Delete(imgPath);

                System.IO.File.WriteAllBytes(imgPath, fileBytes);
                Respuesta = imgPath;
            }
            catch (Exception ex)
            {
                return Respuesta = "";
            }

            return Respuesta;
        }
    }
}