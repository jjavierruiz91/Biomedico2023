using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class ControlPsicologiaDeportivaController : Controller
    {
        // GET: ControlPsicologiaDeportiva
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult ListaControlPsicologiaDeportiva()
        {
            return View();
        }
        public struct ObjControlPsicologiaDeportiva
        {
            public SeguimientoPsicologia ControlPsicologiaDeport { get; set; }



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
        public JsonResult GetListControlPsicologiaDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var ControlPsicologiaDeport = db.SeguimientoPsicologia.ToList().OrderByDescending(o => o.IdSeguimiento);
                foreach (var item in ControlPsicologiaDeport)
                {

                }

                ret.objeto = ControlPsicologiaDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetControlPsicologiaDeportivaById(int IdControlPsicologiaDepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var ControlPsicologiaDepoUpdate = db.SeguimientoPsicologia.FirstOrDefault(w => w.IdSeguimiento == IdControlPsicologiaDepor);
                if (ControlPsicologiaDepoUpdate != null)
                {
                }


                ret.objeto = ControlPsicologiaDepoUpdate;



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
        public JsonResult Agregar(ObjControlPsicologiaDeportiva a)
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
                    //var IdCita = a.ControlPsicologiaDeport.IdMedicina;
                    a.ControlPsicologiaDeport.FirmaDocPsicologia = Utilidades.ActiveUser.CedUsuario;

                    db.SeguimientoPsicologia.Add(a.ControlPsicologiaDeport);
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
        //            db.SaveChanges();
        //            var Id = a.ControlPsicologiaDeport.IdMedicina;

        //            //ADD ID TO TABLE DATAFAMILIA


        //            var CitasDeportistaExiste = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdCita);
        //            if (CitasDeportistaExiste != null)
        //            {

        //                CitasDeportistaExiste.EstadoCitas = "FINALIZADA";

        //                db.SaveChanges();
        //            }

        //            db.SaveChanges();

        //            if (Id > 0)
        //            {
        //                Retorno.Error = false;
        //                Retorno.mensaje = "Guardado";

        //            }
        //            else
        //            {
        //                Retorno.Error = true;
        //                Retorno.mensaje = "No se pudo guardar";
        //            }


        //        }
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
        public JsonResult Actualizar(ObjControlPsicologiaDeportiva a)
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
                        a.ControlPsicologiaDeport.FirmaDocPsicologia = Utilidades.ActiveUser.CedUsuario;
                        var NutriDeportivaExiste = db.SeguimientoPsicologia.FirstOrDefault(w => w.IdSeguimiento == a.ControlPsicologiaDeport.IdSeguimiento);
                        if (NutriDeportivaExiste != null)
                        {
                  

                            NutriDeportivaExiste.Fecha = a.ControlPsicologiaDeport.Fecha;
                            NutriDeportivaExiste.EvolucionPsicologia = a.ControlPsicologiaDeport.EvolucionPsicologia;
                            NutriDeportivaExiste.TestsPsicologico = a.ControlPsicologiaDeport.TestsPsicologico;
                            




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
        public JsonResult Eliminar(int idControlPsicologia)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var ControlPsicologiaDepoExiste = db.SeguimientoPsicologia.FirstOrDefault(w => w.IdSeguimiento == idControlPsicologia);
                    if (ControlPsicologiaDepoExiste != null)
                    {
                        db.SeguimientoPsicologia.Remove(ControlPsicologiaDepoExiste);

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


    }
}