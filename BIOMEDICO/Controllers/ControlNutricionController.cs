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
    public class ControlNutricionController : Controller
    {
        // GET: ControlNutricion
        public ActionResult Index()
        {
            return View();
        }
      
            public ActionResult ListaControlNutricionDeportiva()
            {
                return View();
            }
            public struct ObjControlNutricionDeportiva
            {
                public ControlNutricion ControlNutricionDeport { get; set; }
           


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
            public JsonResult GetListControlNutricionDeportiva()
            {
                Respuesta ret = new Respuesta();
                string result = "";
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    var ControlNutricionDeport = db.ControlNutricion.ToList().OrderByDescending(o => o.IdControlNutri);
                foreach (var item in ControlNutricionDeport)
                    {

                    }

                    ret.objeto = ControlNutricionDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                    //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                    //new JsonSerializerSettings
                    //{
                    //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    //});

                }

                return Json(ret, JsonRequestBehavior.AllowGet);
            }

            [HttpGet]
            public JsonResult GetControlNutricionDeportivaById(int IdControlNutriDepor)
            {
                Respuesta ret = new Respuesta();
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    var ControlNutriDepoUpdate = db.ControlNutricion.FirstOrDefault(w => w.IdControlNutri == IdControlNutriDepor);
                    if (ControlNutriDepoUpdate != null)
                    {
                    }


                    ret.objeto = ControlNutriDepoUpdate;



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
            public JsonResult Agregar(ObjControlNutricionDeportiva a)
            {
                Respuesta Retorno = new Respuesta();

                //if (!ModelState.IsValid)
                //    Retorno.mensaje="Datos invalidos";

                //          public struct 
                //{
                //    public Nutricion NutricionDeport { get; set; }
                //    public AnamnesisNutricion AnamnesisNutriDeport { get; set; }

                //    public SeguimientoNutricion SeguimientoNutriDeport { get; set; }

                try
                {

                    using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                    {
                    //a.ControlNutricionDeport.AnexosNutricion = SaveImagenFile(a.ControlNutricionDeport.AnexosNutricion, a.ControlNutricionDeport.NumIdentificacion + ".jpg");
                    a.ControlNutricionDeport.FirmaControlNuriii = Utilidades.ActiveUser.CedUsuario;

                    db.ControlNutricion.Add(a.ControlNutricionDeport);

                    db.SaveChanges();



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
        //var IdCita = a.ControlNutricionDeport.IdMedicina;
        //db.SaveChanges();
        //        var Id = a.ControlNutricionDeport.IdMedicina;

        //        //ADD ID TO TABLE DATAFAMILIA


        //        var CitasDeportistaExiste = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdCita);
        //        if (CitasDeportistaExiste != null)
        //        {

        //            CitasDeportistaExiste.EstadoCitas = "FINALIZADA";

        //            db.SaveChanges();
        //        }

        //        db.SaveChanges();

        //        if (Id > 0)
        //        {
        //            Retorno.Error = false;
        //            Retorno.mensaje = "Guardado";

        //        }
        //        else
        //        {
        //            Retorno.Error = true;
        //            Retorno.mensaje = "No se pudo guardar";
        //        }
        //    }
        //    }
        //    catch (Exception ex)
        //    {
        //        String Error = ex.Message;
        //        //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
        //        Retorno.Error = true;
        //        Retorno.mensaje = "Error al agregar";
        //    }
        //    return Json(Retorno, JsonRequestBehavior.AllowGet);
        //}

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Actualizar(ObjControlNutricionDeportiva a)
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
                        a.ControlNutricionDeport.FirmaControlNuriii = Utilidades.ActiveUser.CedUsuario;
                        var NutriDeportivaExiste = db.ControlNutricion.FirstOrDefault(w => w.IdControlNutri == a.ControlNutricionDeport.IdControlNutri);
                        if (NutriDeportivaExiste != null)
                        {
                      
        
                             NutriDeportivaExiste.ControlNutrii = a.ControlNutricionDeport.ControlNutrii;
                            NutriDeportivaExiste.FechaNutrii = a.ControlNutricionDeport.FechaNutrii;
                            NutriDeportivaExiste.DesayunoControl = a.ControlNutricionDeport.DesayunoControl;
                            NutriDeportivaExiste.MediaMañanaControl = a.ControlNutricionDeport.MediaMañanaControl;
                            NutriDeportivaExiste.AlmuerzoControl = a.ControlNutricionDeport.AlmuerzoControl;
                            NutriDeportivaExiste.MediaTardeControl = a.ControlNutricionDeport.MediaTardeControl;
                            NutriDeportivaExiste.CenaControl = a.ControlNutricionDeport.CenaControl;
                            NutriDeportivaExiste.PesoActualControl = a.ControlNutricionDeport.PesoActualControl;
                            NutriDeportivaExiste.CambiosControl = a.ControlNutricionDeport.CambiosControl;
                




                            db.SaveChanges();

                            

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
            public JsonResult Eliminar(int idControlNutri)
            {
                Respuesta respuesta = new Respuesta();
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    try
                    {
                        var ControlNutriDepoExiste = db.ControlNutricion.FirstOrDefault(w => w.IdControlNutri == idControlNutri);
                        if (ControlNutriDepoExiste != null)
                        {
                            db.ControlNutricion.Remove(ControlNutriDepoExiste);

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

        //public static string SaveImagenFile(string AnexosNutricion, string NameFile)
        //{
        //    string Respuesta = "";
        //    try
        //    {
        //        if (!string.IsNullOrEmpty(AnexosNutricion))
        //        {
        //            AnexosNutricion = AnexosNutricion.Split(',')[1];
        //        }
        //        var filePath = "";
        //        filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/images/Nutricion");

        //        byte[] fileBytes = Convert.FromBase64String(AnexosNutricion);
        //        string imgPath = Path.Combine(filePath, NameFile);

        //        if (System.IO.File.Exists(imgPath))
        //            System.IO.File.Delete(imgPath);

        //        System.IO.File.WriteAllBytes(imgPath, fileBytes);
        //        Respuesta = imgPath;
        //    }
        //    catch (Exception ex)
        //    {
        //        return Respuesta = "";
        //    }

        //    return Respuesta;
        //}
    }
    }
