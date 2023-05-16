using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class RemisionController : Controller
    {
        // GET: Remision
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListaRemisionMedicasDeportiva()
        {
            return View();
        }
        public struct ObjRemisionMedicasDeportiva
        {
            public Remision  RemisionMedicas { get; set; }

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


        [HttpGet]
        public JsonResult GetListRemisionMedicasDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var RemisionMedicas = db.Remision.ToList().OrderByDescending(o=>o.IdRemisiones).ToList();
                foreach (var item in RemisionMedicas)
                {

                }

                ret.objeto = RemisionMedicas; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetRemisionMedicasDeportivaById(int IdRemisionDepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var RemisionDepoUpdate = db.Remision.FirstOrDefault(w => w.IdRemisiones == IdRemisionDepor);
                if (RemisionDepoUpdate != null)
                {
                }


                ret.objeto = RemisionDepoUpdate;



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
        public JsonResult Agregar(ObjRemisionMedicasDeportiva a)
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
                    ////a.Deport.UsuarioCreacion = Utilidades.ActiveUser.IdUsuario;
                    ////a.RemisionMedicas.UsuarioRegistro = Utilidades.ActiveUser.ApeUsuario;
                    ////a.RemisionMedicas.FechaRegistro = DateTime.Now;
                    //a.RemisionMedicas.FirmaEntrenadoRemision = Utilidades.ActiveUser.NomUsuario;
                    db.Remision.Add(a.RemisionMedicas);
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
        public JsonResult Actualizar(ObjRemisionMedicasDeportiva a)
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
                        var RemisionDeportivaExiste = db.Remision.FirstOrDefault(w => w.IdRemisiones == a.RemisionMedicas.IdRemisiones);
                        if (RemisionDeportivaExiste != null)
                        {

                            RemisionDeportivaExiste.NumeroIdentificacion = a.RemisionMedicas.NumeroIdentificacion;
                            RemisionDeportivaExiste.FechaLesionRemision = a.RemisionMedicas.FechaLesionRemision;
                            RemisionDeportivaExiste.DisciplinaRemision = a.RemisionMedicas.DisciplinaRemision;
                            RemisionDeportivaExiste.MunicipioRemision = a.RemisionMedicas.MunicipioRemision;
                            RemisionDeportivaExiste.CategoriaRemision = a.RemisionMedicas.CategoriaRemision;
                            RemisionDeportivaExiste.AreaServicioRemision = a.RemisionMedicas.AreaServicioRemision;
                            RemisionDeportivaExiste.NombreDeportistaRemision = a.RemisionMedicas.NombreDeportistaRemision;
                            RemisionDeportivaExiste.CelularRemision = a.RemisionMedicas.CelularRemision;
                            RemisionDeportivaExiste.CorreoRemision = a.RemisionMedicas.CorreoRemision;
                            RemisionDeportivaExiste.TipoLesionRemision = a.RemisionMedicas.TipoLesionRemision;
                            RemisionDeportivaExiste.FechaLesionRemision = a.RemisionMedicas.FechaLesionRemision;
                            RemisionDeportivaExiste.FirmaEntrenadoRemision = a.RemisionMedicas.FirmaEntrenadoRemision;
                            RemisionDeportivaExiste.EstadoRevision = a.RemisionMedicas.EstadoRevision;
                            


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
                Retorno.mensaje = "Error al agregar remisión";
            }
            return Json(Retorno);
        }



    }

}