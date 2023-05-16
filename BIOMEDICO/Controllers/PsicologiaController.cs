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
    public class PsicologiaController : Controller
    {
        // GET: Psicologia
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListaPsicologiaDeportiva()
        {
            return View();
        }
        public struct ObjPsicologiaDeportiva
        {
            public DemograficoPsicologia DemoPsicologiaDeport { get; set; }
            public HistoriaFamiliaresPsicologia HistFamiliaresPsicologiaDeport { get; set; }
            public FamiliaresPsicologia FamPsicologiaDeport { get; set; }
            public EnfermedadPersonalPsicologia EnfPersonalPsicologiaDeport { get; set; }
            public List<TestPsicologia> ListTestPsiDeport { get; set; }
            public VidapersonalPsicologia VidapersonalPsiDeport { get; set; }
            

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
        public JsonResult GetListPsicologiaDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var PsicologiaDeport = db.DemograficoPsicologia.ToList().OrderByDescending(o => o.IdDatosDemograficos);
                foreach (var item in PsicologiaDeport)
                {

                    item.HistoriaFamiliaresPsicologia = db.HistoriaFamiliaresPsicologia.Where(w => w.IdDatosDemograficos == item.IdDatosDemograficos).ToList();
                    item.FamiliaresPsicologia = db.FamiliaresPsicologia.Where(w => w.IdDatosDemograficos == item.IdDatosDemograficos).ToList();
                    item.EnfermedadPersonalPsicologia = db.EnfermedadPersonalPsicologia.Where(w => w.IdDatosDemograficos == item.IdDatosDemograficos).ToList();
                    item.TestPsicologia = db.TestPsicologia.Where(w => w.IdDatosDemograficos == item.IdDatosDemograficos).ToList();
                    item.VidapersonalPsicologia = db.VidapersonalPsicologia.Where(w => w.IdDatosDemograficos == item.IdDatosDemograficos).ToList();

                }

                ret.objeto = PsicologiaDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            //return Json(ret, JsonRequestBehavior.AllowGet);
            var jsonResult = Json(ret, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public JsonResult GetPsicologiaDeportivaById(int IdPsicologiadepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var PsiDepoUpdate = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == IdPsicologiadepor);
                if (PsiDepoUpdate != null)
                {
                    PsiDepoUpdate.HistoriaFamiliaresPsicologia = db.HistoriaFamiliaresPsicologia.Where(w => w.IdDatosDemograficos == PsiDepoUpdate.IdDatosDemograficos).ToList();
                    PsiDepoUpdate.FamiliaresPsicologia = db.FamiliaresPsicologia.Where(w => w.IdDatosDemograficos == PsiDepoUpdate.IdDatosDemograficos).ToList();
                    PsiDepoUpdate.EnfermedadPersonalPsicologia = db.EnfermedadPersonalPsicologia.Where(w => w.IdDatosDemograficos == PsiDepoUpdate.IdDatosDemograficos).ToList();
                    PsiDepoUpdate.TestPsicologia = db.TestPsicologia.Where(w => w.IdDatosDemograficos == PsiDepoUpdate.IdDatosDemograficos).ToList();
                    PsiDepoUpdate.VidapersonalPsicologia = db.VidapersonalPsicologia.Where(w => w.IdDatosDemograficos == PsiDepoUpdate.IdDatosDemograficos).ToList();

                }


                ret.objeto = PsiDepoUpdate;



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
        public JsonResult Agregar(ObjPsicologiaDeportiva a)
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
                    a.VidapersonalPsiDeport.FirmaDoctorPsicologia = Utilidades.ActiveUser.CedUsuario;

                    a.DemoPsicologiaDeport.AnexosPsicologia = SaveImagenFile(a.DemoPsicologiaDeport.AnexosPsicologia, a.DemoPsicologiaDeport.NumIdentificacion + ".jpg");

                    a.DemoPsicologiaDeport.FechaRegistro = DateTime.Now;
                    a.DemoPsicologiaDeport.UsuarioRegistro = Utilidades.ActiveUser.NomUsuario;
                    var IdCita = a.DemoPsicologiaDeport.IdCitaMedica;

                    db.DemograficoPsicologia.Add(a.DemoPsicologiaDeport);
                    db.SaveChanges();
                    var Id = a.DemoPsicologiaDeport.IdDatosDemograficos;

                ////ADD ID TO TABLE HISTORIA PSICOLOGIA
                a.HistFamiliaresPsicologiaDeport.IdDatosDemograficos = Id;
                a.HistFamiliaresPsicologiaDeport.DemograficoPsicologia = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == Id);

                //////ADD ID TO TABLE FAMILIA PSICOLOGIA

                a.FamPsicologiaDeport.IdDatosDemograficos = Id;
                a.FamPsicologiaDeport.DemograficoPsicologia = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == Id);

                //////ADD ID TO TABLE ANTECEDENTES PSICOLOGIA
                a.EnfPersonalPsicologiaDeport.IdDatosDemograficos = Id;
                a.EnfPersonalPsicologiaDeport.DemograficoPsicologia = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == Id);

                // ADD ID TO TABLE ANTECEDENTES PSICOLOGIA
                a.VidapersonalPsiDeport.IdDatosDemograficos = Id;
                a.VidapersonalPsiDeport.DemograficoPsicologia = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == Id);

                    ////add id to tabla test
                    if (a.ListTestPsiDeport != null)
                    {
                        foreach (var item in a.ListTestPsiDeport)
                        {
                            item.IdDatosDemograficos = Id;
                            item.DemograficoPsicologia = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == Id);
                            db.TestPsicologia.Add(item);
                        }
                    }
               



                ////////add id to tabla ocupation

                //a.SegPsicologiaDeport.IdDatosDemograficos = Id;
                //a.SegPsicologiaDeport.DemograficoPsicologia = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == Id);


                db.HistoriaFamiliaresPsicologia.Add(a.HistFamiliaresPsicologiaDeport);
                db.FamiliaresPsicologia.Add(a.FamPsicologiaDeport);
                db.EnfermedadPersonalPsicologia.Add(a.EnfPersonalPsicologiaDeport);
                db.VidapersonalPsicologia.Add(a.VidapersonalPsiDeport);


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
        public JsonResult Actualizar(ObjPsicologiaDeportiva a)
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
                        a.VidapersonalPsiDeport.FirmaDoctorPsicologia = Utilidades.ActiveUser.CedUsuario;
                        var DemoGraficoPsicologiaExiste = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == a.DemoPsicologiaDeport.IdDatosDemograficos);
                        if (DemoGraficoPsicologiaExiste != null)
                        {

                            DemoGraficoPsicologiaExiste.IdDatosDemograficos = a.DemoPsicologiaDeport.IdDatosDemograficos;
                            DemoGraficoPsicologiaExiste.NumIdentificacion = a.DemoPsicologiaDeport.NumIdentificacion;
                            DemoGraficoPsicologiaExiste.EstadoCivil = a.DemoPsicologiaDeport.EstadoCivil;
                            DemoGraficoPsicologiaExiste.NivelEducativo = a.DemoPsicologiaDeport.NivelEducativo;
                            DemoGraficoPsicologiaExiste.YoSoy = a.DemoPsicologiaDeport.YoSoy;
                            DemoGraficoPsicologiaExiste.NumHermanos = a.DemoPsicologiaDeport.NumHermanos;
                            DemoGraficoPsicologiaExiste.VivoCon = a.DemoPsicologiaDeport.VivoCon;
                            DemoGraficoPsicologiaExiste.Actualmente = a.DemoPsicologiaDeport.Actualmente;
                            DemoGraficoPsicologiaExiste.Religion = a.DemoPsicologiaDeport.Religion;
                            DemoGraficoPsicologiaExiste.DependenciaEconomia = a.DemoPsicologiaDeport.DependenciaEconomia;
                            db.SaveChanges();

                            var HistoriaFamiliarPsicoExiste = db.HistoriaFamiliaresPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == a.DemoPsicologiaDeport.IdDatosDemograficos);
                            if (HistoriaFamiliarPsicoExiste != null)
                            {
                                //HistoriaFamiliarPsicoExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                HistoriaFamiliarPsicoExiste.NombrePadre = a.HistFamiliaresPsicologiaDeport.NombrePadre;
                                HistoriaFamiliarPsicoExiste.EdadPadre = a.HistFamiliaresPsicologiaDeport.EdadPadre;
                                HistoriaFamiliarPsicoExiste.RelacionPadre = a.HistFamiliaresPsicologiaDeport.RelacionPadre;
                                HistoriaFamiliarPsicoExiste.NombreMAdre = a.HistFamiliaresPsicologiaDeport.NombreMAdre;
                                HistoriaFamiliarPsicoExiste.EdadMadre = a.HistFamiliaresPsicologiaDeport.EdadMadre;
                                HistoriaFamiliarPsicoExiste.RelacionMadre = a.HistFamiliaresPsicologiaDeport.RelacionMadre;
                                HistoriaFamiliarPsicoExiste.RelacionHermanos = a.HistFamiliaresPsicologiaDeport.RelacionHermanos;
                                HistoriaFamiliarPsicoExiste.IdDatosDemograficos = DemoGraficoPsicologiaExiste.IdDatosDemograficos;
                                HistoriaFamiliarPsicoExiste.DemograficoPsicologia = DemoGraficoPsicologiaExiste;
                                db.SaveChanges();


                            }
                            var FamiliaresPsicologiaExiste = db.FamiliaresPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == a.DemoPsicologiaDeport.IdDatosDemograficos);
                            if (FamiliaresPsicologiaExiste != null)
                            {
                                //FamiliaresPsicologiaExiste.IdExamenFisico = a.ExamenDeport.IdExamenFisico;
                                FamiliaresPsicologiaExiste.SustanciasPsicoFmlia = a.FamPsicologiaDeport.SustanciasPsicoFmlia;
                                FamiliaresPsicologiaExiste.EnferMentalesFmlia = a.FamPsicologiaDeport.EnferMentalesFmlia;
                                FamiliaresPsicologiaExiste.EnferCoronariasFmlia = a.FamPsicologiaDeport.EnferCoronariasFmlia;
                                FamiliaresPsicologiaExiste.ObesidadFmlia = a.FamPsicologiaDeport.ObesidadFmlia;
                                FamiliaresPsicologiaExiste.CancerFmlia = a.FamPsicologiaDeport.CancerFmlia;
                                FamiliaresPsicologiaExiste.HipertensionFmlia = a.FamPsicologiaDeport.HipertensionFmlia;
                                FamiliaresPsicologiaExiste.EnferAlergicasFmlia = a.FamPsicologiaDeport.EnferAlergicasFmlia;
                                FamiliaresPsicologiaExiste.IdDatosDemograficos = DemoGraficoPsicologiaExiste.IdDatosDemograficos;
                                FamiliaresPsicologiaExiste.DemograficoPsicologia = DemoGraficoPsicologiaExiste;
                                db.SaveChanges();
                            }
                            var EnferPersonalesExiste = db.EnfermedadPersonalPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == a.DemoPsicologiaDeport.IdDatosDemograficos);
                            if (EnferPersonalesExiste != null)
                            {
                                //FamiliaresPsicologiaExiste.IdExamenFisico = a.ExamenDeport.IdExamenFisico;
                                EnferPersonalesExiste.SustanciasPsicoactivasPer = a.EnfPersonalPsicologiaDeport.SustanciasPsicoactivasPer;
                                EnferPersonalesExiste.EnferMentalesPer = a.EnfPersonalPsicologiaDeport.EnferMentalesPer;
                                EnferPersonalesExiste.DiabetesPer = a.EnfPersonalPsicologiaDeport.DiabetesPer;
                                EnferPersonalesExiste.EnferCoronariasPer = a.EnfPersonalPsicologiaDeport.EnferCoronariasPer;
                                EnferPersonalesExiste.ObesidadPer = a.EnfPersonalPsicologiaDeport.ObesidadPer;
                                EnferPersonalesExiste.CancerPer = a.EnfPersonalPsicologiaDeport.CancerPer;
                                EnferPersonalesExiste.HipertensionPer = a.EnfPersonalPsicologiaDeport.HipertensionPer;
                                EnferPersonalesExiste.EnferAlergicasPer = a.EnfPersonalPsicologiaDeport.EnferAlergicasPer;
                                EnferPersonalesExiste.AsmaPer = a.EnfPersonalPsicologiaDeport.AsmaPer;
                                EnferPersonalesExiste.ComplicacionesPartoPer = a.EnfPersonalPsicologiaDeport.ComplicacionesPartoPer;
                                EnferPersonalesExiste.LesionesPer = a.EnfPersonalPsicologiaDeport.LesionesPer;
                                EnferPersonalesExiste.CualesLesionesPer = a.EnfPersonalPsicologiaDeport.CualesLesionesPer;
                                EnferPersonalesExiste.TrabajoConcentrarsePer = a.EnfPersonalPsicologiaDeport.TrabajoConcentrarsePer;
                                EnferPersonalesExiste.DolorMuscularPer = a.EnfPersonalPsicologiaDeport.DolorMuscularPer;
                                EnferPersonalesExiste.PartoCesareaPer = a.EnfPersonalPsicologiaDeport.PartoCesareaPer;
                                EnferPersonalesExiste.PartoNormalPer = a.EnfPersonalPsicologiaDeport.PartoNormalPer;
                                EnferPersonalesExiste.LesionadoActualPer = a.EnfPersonalPsicologiaDeport.LesionadoActualPer;
                                EnferPersonalesExiste.DificultadSueñoPer = a.EnfPersonalPsicologiaDeport.DificultadSueñoPer;
                                EnferPersonalesExiste.DolorCabezaPer = a.EnfPersonalPsicologiaDeport.DolorCabezaPer;
                                EnferPersonalesExiste.CirugiasPer = a.EnfPersonalPsicologiaDeport.CirugiasPer;
                                EnferPersonalesExiste.ApetitoPer = a.EnfPersonalPsicologiaDeport.ApetitoPer;
                                EnferPersonalesExiste.CansadoPer = a.EnfPersonalPsicologiaDeport.CansadoPer;
                                EnferPersonalesExiste.OtroPer = a.EnfPersonalPsicologiaDeport.OtroPer;
                                EnferPersonalesExiste.HistoriadelProblemaPer = a.EnfPersonalPsicologiaDeport.HistoriadelProblemaPer;
                                EnferPersonalesExiste.IdDatosDemograficos = DemoGraficoPsicologiaExiste.IdDatosDemograficos;
                                EnferPersonalesExiste.DemograficoPsicologia = DemoGraficoPsicologiaExiste;
                                db.SaveChanges();
                            }
                            //var TestPsicologiaExiste = db.TestPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == a.DemoPsicologiaDeport.IdDatosDemograficos);
                            //if (FamiliaresPsicologiaExiste != null)
                            //{
                            //    //FamiliaresPsicologiaExiste.IdExamenFisico = a.ExamenDeport.IdExamenFisico;
                            //    TestPsicologiaExiste.Prueba = a.;
                            //    TestPsicologiaExiste.Variable = a.ListTestPsiDeport.EnferMentalesFmlia;
                            //    TestPsicologiaExiste.Puntuacion = a.ListTestPsiDeport.EnferCoronariasFmlia;
                            //    TestPsicologiaExiste.Valoracion = a.ListTestPsiDeport.ObesidadFmlia;
                            //    TestPsicologiaExiste.Concepto = a.ListTestPsiDeport.CancerFmlia;
                            //    FamiliaresPsicologiaExiste.IdDatosDemograficos = DemoGraficoPsicologiaExiste.IdDatosDemograficos;
                            //    FamiliaresPsicologiaExiste.DemograficoPsicologia = DemoGraficoPsicologiaExiste;
                            //    db.SaveChanges();
                            //}
                            var VidaPersonalExiste = db.VidapersonalPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == a.DemoPsicologiaDeport.IdDatosDemograficos);
                            if (VidaPersonalExiste != null)
                            {
                                //FamiliaresPsicologiaExiste.IdExamenFisico = a.ExamenDeport.IdExamenFisico;
                                VidaPersonalExiste.EntrenamientoActualPsi = a.VidapersonalPsiDeport.EntrenamientoActualPsi;
                                VidaPersonalExiste.HorasDiariasPsi = a.VidapersonalPsiDeport.HorasDiariasPsi;
                                VidaPersonalExiste.NumeroSesionesPsi = a.VidapersonalPsiDeport.NumeroSesionesPsi;
                                VidaPersonalExiste.LugarPsi = a.VidapersonalPsiDeport.LugarPsi;
                                VidaPersonalExiste.NombreEntrenadorPsi = a.VidapersonalPsiDeport.NombreEntrenadorPsi;
                                VidaPersonalExiste.InicioDeportePsi = a.VidapersonalPsiDeport.InicioDeportePsi;
                                VidaPersonalExiste.EntrenamiendoPsi = a.VidapersonalPsiDeport.EntrenamiendoPsi;
                                VidaPersonalExiste.CompeticionPsi = a.VidapersonalPsiDeport.CompeticionPsi;
                                VidaPersonalExiste.EntrenamientoGuiadoPsi = a.VidapersonalPsiDeport.EntrenamiendoPsi;
                                VidaPersonalExiste.MeApoyanPsi = a.VidapersonalPsiDeport.MeApoyanPsi;
                                VidaPersonalExiste.CompromisoPsi = a.VidapersonalPsiDeport.CompromisoPsi;
                                VidaPersonalExiste.EntramientoPsicologicoPsi = a.VidapersonalPsiDeport.EntramientoPsicologicoPsi;
                                VidaPersonalExiste.ObservacionesPsi = a.VidapersonalPsiDeport.ObservacionesPsi;
                                VidaPersonalExiste.ResultadosPsi = a.VidapersonalPsiDeport.ResultadosPsi;
                                VidaPersonalExiste.RecomendacionesPsi = a.VidapersonalPsiDeport.RecomendacionesPsi;
                                VidaPersonalExiste.RemisionPsi = a.VidapersonalPsiDeport.RemisionPsi;
                                VidaPersonalExiste.SeguimientoPsi = a.VidapersonalPsiDeport.SeguimientoPsi;
                                VidaPersonalExiste.FirmaDoctorPsicologia = a.VidapersonalPsiDeport.FirmaDoctorPsicologia;

 
       
     
        VidaPersonalExiste.IdDatosDemograficos = DemoGraficoPsicologiaExiste.IdDatosDemograficos;
                                VidaPersonalExiste.DemograficoPsicologia = DemoGraficoPsicologiaExiste;
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
        public JsonResult Eliminar(int IdPsicologiaDep)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var PsiDeporExiste = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == IdPsicologiaDep);
                    if (PsiDeporExiste != null)
                    {
                        db.DemograficoPsicologia.Remove(PsiDeporExiste);

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

        public static string SaveImagenFile(string AnexosPsicologia, string NameFile)
        {
            string Respuesta = "";
            try
            {
                if (!string.IsNullOrEmpty(AnexosPsicologia))
                {
                    AnexosPsicologia = AnexosPsicologia.Split(',')[1];
                }
                var filePath = "";
                filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/images/Psicologia");

                byte[] fileBytes = Convert.FromBase64String(AnexosPsicologia);
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