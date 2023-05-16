using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class ControlMedicinaDeporteController : Controller
    {
        private object utilidades;

        // GET: ControlMedicinaDeporte
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListaControlMedicinaDeportiva()
        {
            return View();
        }
        public struct ObjControlMedicinaDeportiva
        {
            public SeguimientoMedicinaDeporte ControlMedicinaDeport { get; set; }
          

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
        public JsonResult GetListControlMedicinaDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var ControlMedicinaDeport = db.SeguimientoMedicinaDeporte.ToList().OrderByDescending(o => o.IdMedicina); 
               

                ret.objeto = ControlMedicinaDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetControlMedicinaDeportivaById(int IdControlMedicinaDepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var MedControlDepoUpdate = db.SeguimientoMedicinaDeporte.FirstOrDefault(w => w.IdSeguimientoDeportiva == IdControlMedicinaDepor);
               


                ret.objeto = MedControlDepoUpdate;



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
        public JsonResult Agregar(ObjControlMedicinaDeportiva a)
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


                    a.ControlMedicinaDeport.FirmaDeportiva = Utilidades.ActiveUser.CedUsuario;

                    a.ControlMedicinaDeport.MedicinaDelDeporte=db.MedicinaDelDeporte.FirstOrDefault();
                    //var IdCita = a.ControlMedicinaDeport.IdMedicina;
                    db.SeguimientoMedicinaDeporte.Add(a.ControlMedicinaDeport);

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
        //db.SaveChanges();
        //            var Id = a.ControlMedicinaDeport.IdMedicina;

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
        public JsonResult Actualizar(ObjControlMedicinaDeportiva a)
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
                        a.ControlMedicinaDeport.FirmaDeportiva = Utilidades.ActiveUser.CedUsuario;
                        var ControlMedicinaDeportivaExiste = db.SeguimientoMedicinaDeporte.FirstOrDefault(w => w.IdSeguimientoDeportiva == a.ControlMedicinaDeport.IdSeguimientoDeportiva);
                        if (ControlMedicinaDeportivaExiste != null)
                        {

                            ControlMedicinaDeportivaExiste.Fecha = a.ControlMedicinaDeport.Fecha;
                            ControlMedicinaDeportivaExiste.DiagnosticoDeportiva = a.ControlMedicinaDeport.DiagnosticoDeportiva;
                            ControlMedicinaDeportivaExiste.EvolucionDeportiva = a.ControlMedicinaDeport.EvolucionDeportiva;
                            ControlMedicinaDeportivaExiste.ConductaDeportiva = a.ControlMedicinaDeport.ConductaDeportiva;
                            //ControlMedicinaDeportivaExiste.FirmaDeportiva = a.ControlMedicinaDeport.FirmaDeportiva;
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
                Retorno.mensaje = "Error al agregar ";
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
                    var MedDepoExiste = db.SeguimientoMedicinaDeporte.FirstOrDefault(w => w.IdMedicina == idMedDep);
                    if (MedDepoExiste != null)
                    {
                        db.SeguimientoMedicinaDeporte.Remove(MedDepoExiste);

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