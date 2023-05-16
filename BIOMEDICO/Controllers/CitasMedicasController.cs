using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class CitasMedicasController : Controller
    {
        // GET: CitasMedicas
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListaCitasMedicasDeportiva()
        {
            return View();
        }

        public ActionResult ListaConsultaCitasMedicas()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetListConsultaCitasMedicas()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var CitasMedicasDeport = db.CitasMedicas.ToList().OrderByDescending(o => o.IdCitaMedica);
              

                ret.objeto = CitasMedicasDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        public struct ObjCitasMedicasDeportiva
        {
            public CitasMedicas  CitasMedicasDeport { get; set; }

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

        public JsonResult BuscarAgendaCitas(long IdAgenda)
        {
            var DatosAgentaDeportista = new CitasMedicas();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosAgentaDeportista = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdAgenda);
                if (DatosAgentaDeportista != null)
                {

                    DatosAgentaDeportista.EstadoCitas = "FINALIZADO";

                }

                db.SaveChanges();
            }
            return Json(DatosAgentaDeportista, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        //[ValidateAntiForgeryToken]
        public JsonResult ActualizarEstado(int IdCitaMedica)
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
                        var CitasDeportivaExiste = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdCitaMedica);
                        if (CitasDeportivaExiste != null)
                        {

                            
                            CitasDeportivaExiste.EstadoCitas = "FINALIZADO";

                        }

                        db.SaveChanges();

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
            return Json(Retorno,JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetListCitasMedicasDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {

                var CitasMedicasDeport = db.CitasMedicas.Where(w => w.EstadoCitas == "PENDIENTE").ToList();
                foreach (var item in CitasMedicasDeport)
                {

                }

                ret.objeto = CitasMedicasDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCitasMedicasDeportivaById(int IdCitasDepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {

                var CitasDepoUpdate = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdCitasDepor) ;
                if (CitasDepoUpdate != null)
                {
                }


                ret.objeto = CitasDepoUpdate;



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
        public JsonResult Agregar(ObjCitasMedicasDeportiva a)
        {
            Respuesta Retorno = new Respuesta();

            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                        var EstadoCitaDeportivaExiste = db.CitasMedicas.FirstOrDefault(w => w.EstadoCitas == "PENDIENTE" && w.Hora  == a.CitasMedicasDeport.Hora && w.Minutos==a.CitasMedicasDeport.Minutos );
                    if (EstadoCitaDeportivaExiste == null)
                    { 
                        int cedula = int.Parse(a.CitasMedicasDeport.Especialista);
                        var datosMedico = db.Medicos.FirstOrDefault(w => w.CodMedicos == cedula);
                        a.CitasMedicasDeport.Especialista = datosMedico.Especialidad+":"+ datosMedico.PrimerNombre +" "+ datosMedico.PrimerApellido;
                        a.CitasMedicasDeport.EstadoCitas = "PENDIENTE";
                        db.CitasMedicas.Add(a.CitasMedicasDeport);
                        db.SaveChanges();
                        Retorno.Error = false;
                        Retorno.mensaje = "Cita creada";
                    }
                    else {
                        Retorno.Error = false;
                        Retorno.mensaje = "Error! ya existe una cita creada para esta hora";
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

        //[HttpPost]
        ////[ValidateAntiForgeryToken]
        //public JsonResult Actualizar(ObjCitasMedicasDeportiva a)
        //{
        //    Respuesta Retorno = new Respuesta();
        //    //JsonConvert.DeserializeObject<List<ObjDeportista>>(a);
        //    //if (!ModelState.IsValid)
        //    //    Retorno.mensaje="Datos invalidos";

        //    try
        //    {

        //        using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

        //        {
        //            try
        //            {
        //                var CitasDeportivaExiste = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == a.CitasMedicasDeport.IdCitaMedica);
        //                if (CitasDeportivaExiste != null)
        //                {

        //                    CitasDeportivaExiste.IdCitaMedica = a.CitasMedicasDeport.IdCitaMedica;
        //                    CitasDeportivaExiste.Especialista = a.CitasMedicasDeport.Especialista;
        //                    CitasDeportivaExiste.Fecha = a.CitasMedicasDeport.Fecha;
        //                    CitasDeportivaExiste.Hora = a.CitasMedicasDeport.Hora;
        //                    CitasDeportivaExiste.Minutos = a.CitasMedicasDeport.Minutos;
        //                    CitasDeportivaExiste.Segundos = a.CitasMedicasDeport.Segundos;
        //                    CitasDeportivaExiste.EstadoCitas = "FINALIZADO";

        //                }

        //                db.SaveChanges();

        //                Retorno.Error = false;
        //                Retorno.mensaje = "Actualizado";


        //            }
        //            catch (Exception ex)
        //            {
        //                Retorno.Error = true;
        //                Retorno.mensaje = "Error al Actualizar";
        //            }




        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        String Error = ex.Message;
        //        //ModelState.AddModelError("", "Error al agregar deportistas" + ex.Message);
        //        Retorno.Error = true;
        //        Retorno.mensaje = "Error al agregar nutricionista";
        //    }
        //    return Json(Retorno);
        //}

        [HttpGet]
        public JsonResult Eliminar(int IdCitasDepor)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var CitasMedicasDepoExiste = db.CitasMedicas.FirstOrDefault(w => w.IdCitaMedica == IdCitasDepor);
                    if (CitasMedicasDepoExiste != null)
                    {
                    }

                    db.CitasMedicas.Remove(CitasMedicasDepoExiste);
                    db.SaveChanges();
                    respuesta.Error = false;

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