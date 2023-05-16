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
    public class NutricionController : Controller
    {
        // GET: Nutricion
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListaNutricionDeportiva()
        {
            return View();
        }

        public struct ObjNutricionDeportiva
        {
            public Nutricion NutricionDeport { get; set; }
            public AnamnesisNutricion AnamnesisNutriDeport { get; set; }

            public SeguimientoNutricion SeguimientoNutriDeport { get; set; }


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
        public JsonResult GetListNutricionDeportiva()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var NutricionDeport = db.Nutricion.ToList().OrderByDescending(o => o.IdNutricion);
                foreach (var item in NutricionDeport)
                {

                    item.AnamnesisNutricion = db.AnamnesisNutricion.Where(w => w.IdNutricion == item.IdNutricion).ToList();
                    item.SeguimientoNutricion = db.SeguimientoNutricion.Where(w => w.IdNutricion == item.IdNutricion).ToList();
                }

                ret.objeto = NutricionDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetNutricionDeportivaById(int IdNutriDepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var NutriDepoUpdate = db.Nutricion.FirstOrDefault(w => w.IdNutricion == IdNutriDepor);
                if (NutriDepoUpdate != null)
                {
                    NutriDepoUpdate.AnamnesisNutricion = db.AnamnesisNutricion.Where(w => w.IdNutricion == NutriDepoUpdate.IdNutricion).ToList();
                    NutriDepoUpdate.SeguimientoNutricion = db.SeguimientoNutricion.Where(w => w.IdNutricion == NutriDepoUpdate.IdNutricion).ToList();
                }


                ret.objeto = NutriDepoUpdate;



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
        public JsonResult Agregar(ObjNutricionDeportiva a)
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
                    a.NutricionDeport.FechaRegistroNutri = DateTime.Now;
                    a.SeguimientoNutriDeport.FirmaDoctorNutri = Utilidades.ActiveUser.CedUsuario;
                    var IdCita = a.NutricionDeport.IdCitaMedica;
                    a.NutricionDeport.UsuarioRegistro = Utilidades.ActiveUser.NomUsuario;
                    a.NutricionDeport.AnexosNutricion = SaveImagenFile(a.NutricionDeport.AnexosNutricion, a.NutricionDeport.NumIdentificacion + ".jpg");

                    db.Nutricion.Add(a.NutricionDeport);
                    db.SaveChanges();
                    var Id = a.NutricionDeport.IdNutricion;

                    ////ADD ID TO TABLE HISTORIA PSICOLOGIA
                    a.AnamnesisNutriDeport.IdNutricion = Id;
                    a.AnamnesisNutriDeport.Nutricion = db.Nutricion.FirstOrDefault(w => w.IdNutricion == Id);

                    //////ADD ID TO TABLE FAMILIA PSICOLOGIA

                    a.SeguimientoNutriDeport.IdNutricion = Id;
                    a.SeguimientoNutriDeport.Nutricion = db.Nutricion.FirstOrDefault(w => w.IdNutricion == Id);

                     //////add id to tabla ocupation


                    db.AnamnesisNutricion.Add(a.AnamnesisNutriDeport);
                    db.SeguimientoNutricion.Add(a.SeguimientoNutriDeport);

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
        public JsonResult Actualizar(ObjNutricionDeportiva a)
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
                        a.NutricionDeport.FechaRegistroNutri = DateTime.Now;
                        a.SeguimientoNutriDeport.FirmaDoctorNutri = Utilidades.ActiveUser.CedUsuario;
                        var NutriDeportivaExiste = db.Nutricion.FirstOrDefault(w => w.IdNutricion == a.NutricionDeport.IdNutricion);
                        if (NutriDeportivaExiste != null)
                        {

                            NutriDeportivaExiste.CodNutricion = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.AntecedentesNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.FamiliaresNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.PersonalesNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.FarmacologicosNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.GinecologicoNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.SueñoNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.PielNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.ApetitoNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.FracturaNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.AspectoFisicoNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.PieNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.TiempoRecuperacionNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.HidratacionNutri = a.NutricionDeport.CodNutricion;
                            NutriDeportivaExiste.HorarioActividadNutri = a.NutricionDeport.CodNutricion;
                           
                            
                                       
         
                            db.SaveChanges();

                            var AmnasisFisioDeportivaExiste = db.AnamnesisNutricion.FirstOrDefault(w => w.IdNutricion == a.NutricionDeport.IdNutricion);
                            if (AmnasisFisioDeportivaExiste != null)
                            {
                                //AmnasisFisioDeportivaExiste.IdAntecedentes = a.AnamnesisNutriDeport.IdAntecedentes;
                                AmnasisFisioDeportivaExiste.DesayunoNutri = a.AnamnesisNutriDeport.DesayunoNutri;
                                AmnasisFisioDeportivaExiste.MediaMañanaNutri = a.AnamnesisNutriDeport.MediaMañanaNutri;
                                AmnasisFisioDeportivaExiste.AlmuerzoNutri = a.AnamnesisNutriDeport.AlmuerzoNutri;
                                AmnasisFisioDeportivaExiste.MediaTardeNutri = a.AnamnesisNutriDeport.MediaTardeNutri;
                                AmnasisFisioDeportivaExiste.CenaNutri = a.AnamnesisNutriDeport.CenaNutri;
                                AmnasisFisioDeportivaExiste.AlergicoNutri = a.AnamnesisNutriDeport.AlergicoNutri;
                                AmnasisFisioDeportivaExiste.SuplementacionNutri = a.AnamnesisNutriDeport.SuplementacionNutri;
                                AmnasisFisioDeportivaExiste.AlimentoNoDeseados = a.AnamnesisNutriDeport.AlimentoNoDeseados;
                                AmnasisFisioDeportivaExiste.EdadNutri = a.AnamnesisNutriDeport.EdadNutri;
                                AmnasisFisioDeportivaExiste.PesoNutri = a.AnamnesisNutriDeport.PesoNutri;
                                AmnasisFisioDeportivaExiste.TallaNutri = a.AnamnesisNutriDeport.TallaNutri;
                                AmnasisFisioDeportivaExiste.ImcNutri = a.AnamnesisNutriDeport.ImcNutri;
                                AmnasisFisioDeportivaExiste.EscapularNutri = a.AnamnesisNutriDeport.EscapularNutri;
                                AmnasisFisioDeportivaExiste.TricepsNutri = a.AnamnesisNutriDeport.TricepsNutri;
                                AmnasisFisioDeportivaExiste.BicepsNutri = a.AnamnesisNutriDeport.BicepsNutri;
                                AmnasisFisioDeportivaExiste.AbdomenNutri = a.AnamnesisNutriDeport.AbdomenNutri;
                                AmnasisFisioDeportivaExiste.MusloNutri = a.AnamnesisNutriDeport.MusloNutri;
                                AmnasisFisioDeportivaExiste.PiernaNutri = a.AnamnesisNutriDeport.PiernaNutri;
                                AmnasisFisioDeportivaExiste.BrazosNutrii = a.AnamnesisNutriDeport.BrazosNutrii;
                                AmnasisFisioDeportivaExiste.AntebrazoNutrii = a.AnamnesisNutriDeport.AntebrazoNutrii;
                                AmnasisFisioDeportivaExiste.MuñecaNutrii = a.AnamnesisNutriDeport.MuñecaNutrii;
                                AmnasisFisioDeportivaExiste.PechoNutrii = a.AnamnesisNutriDeport.PechoNutrii;
                                AmnasisFisioDeportivaExiste.CinturaNutrii = a.AnamnesisNutriDeport.CinturaNutrii;
                                AmnasisFisioDeportivaExiste.CaderaNutrii = a.AnamnesisNutriDeport.CaderaNutrii;
                                AmnasisFisioDeportivaExiste.MusloSuperiorNutrii = a.AnamnesisNutriDeport.MusloSuperiorNutrii;
                                AmnasisFisioDeportivaExiste.MusloMedioNutrii = a.AnamnesisNutriDeport.MusloMedioNutrii;
                                AmnasisFisioDeportivaExiste.PiernaPerimetroNutrii = a.AnamnesisNutriDeport.PiernaPerimetroNutrii;
                                AmnasisFisioDeportivaExiste.TobilloPerimetroNutrii = a.AnamnesisNutriDeport.TobilloPerimetroNutrii;
                                AmnasisFisioDeportivaExiste.IdNutricion = NutriDeportivaExiste.IdNutricion;
                                AmnasisFisioDeportivaExiste.Nutricion = NutriDeportivaExiste;
                                db.SaveChanges();


                            }
                            var SeguimientoFisioExiste = db.SeguimientoNutricion.FirstOrDefault(w => w.IdNutricion == a.NutricionDeport.IdNutricion);
                            if (SeguimientoFisioExiste != null)
                            {
                                //ExamenFiscoDepoExiste.IdExamenFisico = a.ExamenDeport.IdExamenFisico;
                                SeguimientoFisioExiste.HumeroNutri = a.SeguimientoNutriDeport.HumeroNutri;
                                SeguimientoFisioExiste.MuñecaHumeroNutri = a.SeguimientoNutriDeport.MuñecaHumeroNutri;
                                SeguimientoFisioExiste.FermorHumeroNutri = a.SeguimientoNutriDeport.FermorHumeroNutri;
                                SeguimientoFisioExiste.ImcNutri = a.SeguimientoNutriDeport.ImcNutri;
                                SeguimientoFisioExiste.GrasaNutri = a.SeguimientoNutriDeport.GrasaNutri;
                                SeguimientoFisioExiste.MusculosNutri = a.SeguimientoNutriDeport.MusculosNutri;
                                SeguimientoFisioExiste.HuesosNutri = a.SeguimientoNutriDeport.HuesosNutri;
                                SeguimientoFisioExiste.ResidualesNutri = a.SeguimientoNutriDeport.ResidualesNutri;
                                SeguimientoFisioExiste.PesosGrasosNutri = a.SeguimientoNutriDeport.PesosGrasosNutri;
                                SeguimientoFisioExiste.PesosMusculosNutri = a.SeguimientoNutriDeport.PesosMusculosNutri;
                                SeguimientoFisioExiste.PesoResiducalesNutri = a.SeguimientoNutriDeport.PesoResiducalesNutri;
                                SeguimientoFisioExiste.DiagnosticoNutri = a.SeguimientoNutriDeport.DiagnosticoNutri;
                                SeguimientoFisioExiste.TratamientoNutri = a.SeguimientoNutriDeport.TratamientoNutri;
                                SeguimientoFisioExiste.ProximaCitaNutri = a.SeguimientoNutriDeport.ProximaCitaNutri;
                                SeguimientoFisioExiste.ObservacionesNutricion = a.SeguimientoNutriDeport.ObservacionesNutricion;
                                
                                SeguimientoFisioExiste.FirmaDoctorNutri = a.SeguimientoNutriDeport.FirmaDoctorNutri;
                                SeguimientoFisioExiste.IdNutricion = NutriDeportivaExiste.IdNutricion;
                                SeguimientoFisioExiste.Nutricion = NutriDeportivaExiste;
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
        public JsonResult Eliminar(int idNutri)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var NutriDepoExiste = db.Nutricion.FirstOrDefault(w => w.IdNutricion == idNutri);
                    if (NutriDepoExiste != null)
                    {
                        db.Nutricion.Remove(NutriDepoExiste);

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
        public static string SaveImagenFile(string AnexosNutricion, string NameFile)
        {
            string Respuesta = "";
            try
            {
                if (!string.IsNullOrEmpty(AnexosNutricion))
                {
                    AnexosNutricion = AnexosNutricion.Split(',')[1];
                }
                var filePath = "";
                filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/images/Nutricion");

                byte[] fileBytes = Convert.FromBase64String(AnexosNutricion);
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