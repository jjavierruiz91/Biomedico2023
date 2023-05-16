using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class MedicosController : Controller
    {
        // GET: Usuarios
        public ActionResult Medicos()
        {
             return View();

            }
        public ActionResult ListaMedicosDeportiva()
        {
            return View();
        }
        public struct ObjMedicosDeportiva
        {
            public Medicos MedicosDeport { get; set; }

        }

        public struct Respuesta
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }

        }
        //[HttpGet]
        //public JsonResult BuscarDeportista(long cedula)
        //{
        //    var DatosdEportista = new Deportistas();
        //    using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
        //    {
        //        DatosdEportista = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == cedula);
        //    }
        //    return Json(DatosdEportista, JsonRequestBehavior.AllowGet);
        //}
        public struct HorariosMedicos {
            public string cedula { get; set; }
            public DateTime Fecha { get; set; }
            public int Hora { get; set; }
            public int Minutos { get; set; }
        }

        [HttpGet]
        public JsonResult GetListMedicosDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            List<AgendarCitas> Listaagenda = new List<AgendarCitas>();
            List<HorariosMedicos> listaHorario = new List<HorariosMedicos>();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var MedicosDeport = db.Medicos.ToList();
                foreach (var item in MedicosDeport)
                {
                    var agendas = db.AgendarCitas.Where(w => w.CedEspecialistaCitas == item.CodMedicos.ToString() ).ToList();
                    if (agendas.Count>0)
                    {
                        agendas = agendas.Where(w => w.FechaCitas.Value.Date >= DateTime.Now.Date).ToList();
;                       Listaagenda.AddRange(agendas);
                    }
                   
                }
                foreach (var item in Listaagenda)
                {
                    int HOraInt = Convert.ToDateTime(item.HoraIniciocitas).Hour;
                    int Horafin= Convert.ToDateTime(item.HoraFinCitas).Hour;

                    int SumeMinutos= (Horafin-HOraInt)*60;

                    int NUmCitas= SumeMinutos / 20;
                    HorariosMedicos Horario = new HorariosMedicos();
                    int Contandorminutos = 0;
                    for (int i = 0; i < NUmCitas; i++)
                    {
                        if (i==0)
                        {
                            Horario = new HorariosMedicos
                            {
                                cedula = item.CedEspecialistaCitas,
                                Fecha = Convert.ToDateTime(item.FechaCitas).Date,
                                Hora = Convert.ToDateTime(item.HoraIniciocitas).Hour,
                                Minutos = Convert.ToDateTime(item.HoraIniciocitas).Minute,
                            };
                        }
                        else 
                        {
                            Contandorminutos += 20;
                            DateTime NewhOra = Convert.ToDateTime(item.HoraIniciocitas).AddMinutes(Contandorminutos);
                            Horario = new HorariosMedicos
                            {
                                cedula = item.CedEspecialistaCitas,
                                Fecha = Convert.ToDateTime(item.FechaCitas).Date,
                                Hora = NewhOra.Hour,
                                Minutos = NewhOra.Minute,
                            };
                        }
                        listaHorario.Add(Horario);
                    }
                   
                }

                ret.objeto =new { DatosMed = MedicosDeport , ListaHorario= listaHorario }; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetMedicosDeportivaById(int IdMedicosDepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var MedicosDepoUpdate = db.Medicos.FirstOrDefault(w => w.IdMedicos == IdMedicosDepor);
                if (MedicosDepoUpdate != null)
                {
                }


                ret.objeto = MedicosDepoUpdate;



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
        public JsonResult Agregar(ObjMedicosDeportiva a)
        {
            Respuesta Retorno = new Respuesta();

            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {


                    db.Medicos.Add(a.MedicosDeport);
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

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Actualizar(ObjMedicosDeportiva a)
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
                        var MedicosDeportivaExiste = db.Medicos.FirstOrDefault(w => w.IdMedicos == a.MedicosDeport.IdMedicos);
                        if (MedicosDeportivaExiste != null)
                        {

                            MedicosDeportivaExiste.IdMedicos = a.MedicosDeport.IdMedicos;
                            MedicosDeportivaExiste.CodMedicos = a.MedicosDeport.CodMedicos;
                            MedicosDeportivaExiste.PrimerNombre = a.MedicosDeport.PrimerNombre;
                            MedicosDeportivaExiste.SegundoNombre = a.MedicosDeport.SegundoNombre;
                            MedicosDeportivaExiste.PrimerApellido = a.MedicosDeport.PrimerApellido;
                            MedicosDeportivaExiste.SegundoApellido = a.MedicosDeport.SegundoApellido;
                            MedicosDeportivaExiste.FechaNacimiento = a.MedicosDeport.FechaNacimiento;
                            MedicosDeportivaExiste.Especialidad = a.MedicosDeport.Especialidad;
                            MedicosDeportivaExiste.Direcccion = a.MedicosDeport.Direcccion;
                            MedicosDeportivaExiste.Telefono = a.MedicosDeport.Telefono;
                            MedicosDeportivaExiste.Centro = a.MedicosDeport.Centro;
                            MedicosDeportivaExiste.Genero = a.MedicosDeport.Genero;
                            MedicosDeportivaExiste.Correo = a.MedicosDeport.Correo;

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
                Retorno.mensaje = "Error al agregar nutricionista";
            }
            return Json(Retorno);
        }


        [HttpGet]
        public JsonResult Eliminar(int idMedicoDep)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var MedicoDeporExiste = db.Medicos.FirstOrDefault(w => w.IdMedicos == idMedicoDep);
                    if (MedicoDeporExiste != null)
                    {
                    }

                    db.Medicos.Remove(MedicoDeporExiste);
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