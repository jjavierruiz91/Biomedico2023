using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class ControlFisioterapiaController : Controller
    {
        // GET: ControlFisioterapia
        public ActionResult Index()
        {
            return View();
        }



            public ActionResult ListaControlFisioterapiaDeportiva()
            {
                return View();
            }
            public struct ObjControlFisioterapiaDeportiva
            {
                public HistoriaClinicaFisioterapia ControlFisioterapiaDeport { get; set; }



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
            public JsonResult GetListControlFisioterapiaDeportiva()
            {
                Respuesta ret = new Respuesta();
                string result = "";
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    var ControlFisioterapiaDeport = db.HistoriaClinicaFisioterapia.ToList().OrderByDescending(o => o.IdHistoriaClinicaFisio); ;
                    foreach (var item in ControlFisioterapiaDeport)
                    {

                    }

                    ret.objeto = ControlFisioterapiaDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                    //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                    //new JsonSerializerSettings
                    //{
                    //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    //});

                }

                return Json(ret, JsonRequestBehavior.AllowGet);
            }

            [HttpGet]
            public JsonResult GetControlFisioterapiaDeportivaById(int IdControlPsicologiaDepor)
            {
                Respuesta ret = new Respuesta();
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    var ControlFisioterapiaDepoUpdate = db.HistoriaClinicaFisioterapia.FirstOrDefault(w => w.IdHistoriaClinicaFisio == IdControlPsicologiaDepor);
                    if (ControlFisioterapiaDepoUpdate != null)
                    {
                    }


                    ret.objeto = ControlFisioterapiaDepoUpdate;



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
            public JsonResult Agregar(ObjControlFisioterapiaDeportiva a)
            {
                Respuesta Retorno = new Respuesta();


                try
                {

                    using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                    {

                    a.ControlFisioterapiaDeport.FirmaEvolucionClinica = Utilidades.ActiveUser.CedUsuario;
                    db.HistoriaClinicaFisioterapia.Add(a.ControlFisioterapiaDeport);
                    db.SaveChanges();
                    var IdCita = a.ControlFisioterapiaDeport.IdMedicina;
                    var Id = a.ControlFisioterapiaDeport.IdHistoriaClinicaFisio;

                    var CitasDeportistaExiste = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdCita);
                    if (CitasDeportistaExiste != null)
                    {

                        CitasDeportistaExiste.EstadoCitas = "FINALIZADA";

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
        public JsonResult Actualizar(ObjControlFisioterapiaDeportiva a)
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
                        a.ControlFisioterapiaDeport.FirmaEvolucionClinica = Utilidades.ActiveUser.CedUsuario;
                        var NutriDeportivaExiste = db.HistoriaClinicaFisioterapia.FirstOrDefault(w => w.IdHistoriaClinicaFisio == a.ControlFisioterapiaDeport.IdHistoriaClinicaFisio);
                        if (NutriDeportivaExiste != null)
                        {
                            NutriDeportivaExiste.IdHistoriaClinicaFisio = a.ControlFisioterapiaDeport.IdHistoriaClinicaFisio;
                            NutriDeportivaExiste.PatologicosClinicaFisio = a.ControlFisioterapiaDeport.PatologicosClinicaFisio;
                            NutriDeportivaExiste.QuirurgicosClinicaFisio = a.ControlFisioterapiaDeport.QuirurgicosClinicaFisio;
                            NutriDeportivaExiste.TraumaticosClinicaFisio = a.ControlFisioterapiaDeport.TraumaticosClinicaFisio;
                            NutriDeportivaExiste.FarmacologicosClinicaFisio = a.ControlFisioterapiaDeport.FarmacologicosClinicaFisio;
                            NutriDeportivaExiste.FamiliaresClinicaFisio = a.ControlFisioterapiaDeport.FamiliaresClinicaFisio;
                            NutriDeportivaExiste.DiagnosticoMedicoClinicaFisio = a.ControlFisioterapiaDeport.DiagnosticoMedicoClinicaFisio;
                            NutriDeportivaExiste.MotivoConsultaClinicaFisio = a.ControlFisioterapiaDeport.MotivoConsultaClinicaFisio;
                            NutriDeportivaExiste.DolorClinicaFisio = a.ControlFisioterapiaDeport.DolorClinicaFisio;
                            NutriDeportivaExiste.EdemaClinicaFisio = a.ControlFisioterapiaDeport.EdemaClinicaFisio;
                            NutriDeportivaExiste.AlteradaClinicaFisio = a.ControlFisioterapiaDeport.AlteradaClinicaFisio;
                            NutriDeportivaExiste.NoalterdaClinicaFisio = a.ControlFisioterapiaDeport.NoalterdaClinicaFisio;
                            NutriDeportivaExiste.ScreemFuncionalClinicaFisio = a.ControlFisioterapiaDeport.ScreemFuncionalClinicaFisio;
                            NutriDeportivaExiste.DesempeñoClinicaFisio = a.ControlFisioterapiaDeport.DesempeñoClinicaFisio;
                            NutriDeportivaExiste.PosturaClinicaFisio = a.ControlFisioterapiaDeport.PosturaClinicaFisio;
                            NutriDeportivaExiste.FechaClinicaFisio = a.ControlFisioterapiaDeport.FechaClinicaFisio;
                            NutriDeportivaExiste.PlanTratamientoClinicaFisio = a.ControlFisioterapiaDeport.PlanTratamientoClinicaFisio;
                            NutriDeportivaExiste.EvolucionClinicaFisio1 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio1;
                            NutriDeportivaExiste.EvolucionClinicaFisio2 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio2;
                            NutriDeportivaExiste.EvolucionClinicaFisio3 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio3;
                            NutriDeportivaExiste.EvolucionClinicaFisio4 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio4;
                            NutriDeportivaExiste.EvolucionClinicaFisio5 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio5;
                            NutriDeportivaExiste.EvolucionClinicaFisio6 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio6;
                            NutriDeportivaExiste.EvolucionClinicaFisio7 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio7;
                            NutriDeportivaExiste.EvolucionClinicaFisio8 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio8;
                            NutriDeportivaExiste.EvolucionClinicaFisio9 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio9;
                            NutriDeportivaExiste.EvolucionClinicaFisio10 = a.ControlFisioterapiaDeport.EvolucionClinicaFisio10;
                            NutriDeportivaExiste.FirmaEvolucionClinica = Utilidades.ActiveUser.CedUsuario;




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
