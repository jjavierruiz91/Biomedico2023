using BIOMEDICO.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;
using BIOMEDICO.Clases;
using System.IO;

namespace BIOMEDICO.Controllers
{
    public class DeportistaController : Controller
    {
        // GET: Deportista
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListaDeportista()
        {
            return View();
        }


        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }

        public struct ObjDeportista
        {
            public Deportistas Deport { get; set; }
            public DatosFamiliares DataFamiliar { get; set; }
            public Ocupacion Ocupation { get; set; }


        }

        public struct Respuesta
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }

        }

        [HttpGet]
        public JsonResult BuscarDeportista(long Identificacion)
        {
            var DatosdEportista = new Deportistas();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosdEportista = db.Deportistas.FirstOrDefault(w => w.NumIdentificacion == Identificacion);
            }
            return Json(DatosdEportista, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetDeportistaPorSexo()
        {
            List<Deportistas> DatosdEportista = new List<Deportistas>();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosdEportista = db.Deportistas.ToList();
            }
            return Json(DatosdEportista, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetListdEportista()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var DepoList = db.Deportistas.ToList().OrderByDescending(o => o.IdDeportista);
                List<Nutricion> ListaNutri = new List<Nutricion>();
                List<DemograficoPsicologia> ListaSicolo = new List<DemograficoPsicologia>();
                List<Fisioterapia> ListaFisio = new List<Fisioterapia>();
                List<MedicinaDelDeporte> ListaMedi = new List<MedicinaDelDeporte>();
                foreach (var item in DepoList)
                {
                    item.DatosFamiliares = db.DatosFamiliares.Include(f => f.Deportistas).Where(w => w.IdDeportista == item.IdDeportista).ToList();
                    item.Ocupacion = db.Ocupacion.Include(f => f.Deportistas).Where(w => w.IdDeportista == item.IdDeportista).ToList();

                    var nutriTemp = db.Nutricion.Where(w => w.NumIdentificacion == item.NumIdentificacion).ToList();
                    if (nutriTemp.Count()>0)
                    {
                        var numero = nutriTemp.Max(w => w.IdNutricion);
                        var Nutri = db.Nutricion.FirstOrDefault(w => w.IdNutricion == numero);
                        if (Nutri != null)
                        {
                            Nutri.AnamnesisNutricion = db.AnamnesisNutricion.Where(w => w.IdNutricion == Nutri.IdNutricion).ToList() ;
                            Nutri.SeguimientoNutricion = db.SeguimientoNutricion.Where(w => w.IdNutricion == Nutri.IdNutricion).ToList();
                            ListaNutri.Add(Nutri);
                        }
                    }

                    var SicoTemp = db.DemograficoPsicologia.Where(w => w.NumIdentificacion == item.NumIdentificacion).ToList();
                    if (SicoTemp.Count() > 0)
                    {
                        var numero = SicoTemp.Max(w => w.IdDatosDemograficos);
                        var sico = db.DemograficoPsicologia.FirstOrDefault(w => w.IdDatosDemograficos == numero);
                        if (sico != null)
                        {
                            sico.HistoriaFamiliaresPsicologia = db.HistoriaFamiliaresPsicologia.Where(w => w.IdDatosDemograficos == sico.IdDatosDemograficos).ToList();
                            sico.FamiliaresPsicologia = db.FamiliaresPsicologia.Where(w => w.IdDatosDemograficos == sico.IdDatosDemograficos).ToList();
                            sico.EnfermedadPersonalPsicologia = db.EnfermedadPersonalPsicologia.Where(w => w.IdDatosDemograficos == sico.IdDatosDemograficos).ToList();
                            sico.TestPsicologia = db.TestPsicologia.Where(w => w.IdDatosDemograficos == sico.IdDatosDemograficos).ToList();
                            sico.VidapersonalPsicologia = db.VidapersonalPsicologia.Where(w => w.IdDatosDemograficos == sico.IdDatosDemograficos).ToList();
                            sico.SeguimientoPsicologia = db.SeguimientoPsicologia.Where(w => w.IdDatosDemograficos == sico.IdDatosDemograficos).ToList();

                            ListaSicolo.Add(sico);
                        }
                    }

                    var FisioTemp = db.Fisioterapia.Where(w => w.NumIdentificacion == item.NumIdentificacion).ToList();
                    if (FisioTemp.Count() > 0)
                    {
                        var FisioNumero = FisioTemp.Max(w => w.IdFisioterapia);
                        var FisioSico = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == FisioNumero);
                        if (FisioSico != null)
                        {
                            FisioSico.AntecedentesFisioterapia = db.AntecedentesFisioterapia.Where(w => w.IdFisioterapia == FisioSico.IdFisioterapia).ToList();
                            FisioSico.Evolucionfisioterapia = db.Evolucionfisioterapia.Where(w => w.IdFisioterapia == FisioSico.IdFisioterapia).ToList();
                            ListaFisio.Add(FisioSico);
                        }
                    }


                    var MedicinaTemp = db.MedicinaDelDeporte.Where(w => w.NumIdentificacion == item.NumIdentificacion).ToList();
                    if (MedicinaTemp.Count() > 0)
                    {
                        var MedicinaNumero = MedicinaTemp.Max(w => w.IdMedicina);
                        var MedicinaSico = db.MedicinaDelDeporte.FirstOrDefault(w => w.IdMedicina == MedicinaNumero);
                        if (MedicinaSico != null)
                        {
                            MedicinaSico.AntecedentesMedicinaDelDeporte = db.AntecedentesMedicinaDelDeporte.Where(w => w.IdMedicina == MedicinaSico.IdMedicina).ToList();
                            MedicinaSico.ExamenFisicoMedicinaDelDeporte = db.ExamenFisicoMedicinaDelDeporte.Where(w => w.IdMedicina == MedicinaSico.IdMedicina).ToList();
                            ListaMedi.Add(MedicinaSico);
                        }
                    }


                }
                ret.objeto =new { DepoListResul = DepoList, FichaTecnicaNutri = ListaNutri, FichaSico= ListaSicolo, FichaFisio = ListaFisio, FichaMedicina = ListaMedi, }; 


            }
            var jsonResult = Json(ret, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            
        }

        [HttpGet]
        public JsonResult GetDeportistaById(int Iddepor)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var DepoUpdate = db.Deportistas.FirstOrDefault(w => w.IdDeportista == Iddepor);
                if (DepoUpdate != null)
                {
                    DepoUpdate.DatosFamiliares = db.DatosFamiliares.Where(w => w.IdDeportista == DepoUpdate.IdDeportista).ToList();
                    DepoUpdate.Ocupacion = db.Ocupacion.Where(w => w.IdDeportista == DepoUpdate.IdDeportista).ToList();
                }


                ret.objeto = DepoUpdate;



            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Agregar(ObjDeportista a)
        {
            Respuesta Retorno = new Respuesta();

            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {


                    //a.Depor = db.Deportistas.Where(w => w.CodRol == a.CodRol).FirstOrDefault();
                    a.Deport.FechaCreacion = DateTime.Now;
                    a.Deport.FechaServicio = DateTime.Now;
                    a.Deport.UsuarioCreacion = Utilidades.ActiveUser.IdUsuario;
                    a.Deport.Imagen= SaveImagenFile(a.Deport.Imagen, a.Deport.NumIdentificacion.ToString() + ".jpg");
                    db.Deportistas.Add(a.Deport);
                    db.SaveChanges();
                    var Id = a.Deport.IdDeportista;

                    //ADD ID TO TABLE DATAFAMILIA
                    a.DataFamiliar.IdDeportista = Id;
                    a.DataFamiliar.Deportistas = db.Deportistas.FirstOrDefault(w => w.IdDeportista == Id);

                    //add id to tabla ocupation

                    a.Ocupation.IdDeportista = Id;
                    a.Ocupation.Deportistas = db.Deportistas.FirstOrDefault(w => w.IdDeportista == Id);

                    db.DatosFamiliares.Add(a.DataFamiliar);
                    db.Ocupacion.Add(a.Ocupation);
                    db.SaveChanges();

                    if (Id > 0)
                    {
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
                Retorno.mensaje = "Error al agregar deportistas";
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Actualizar(ObjDeportista a)
        {
            Respuesta Retorno = new Respuesta();
            //JsonConvert.DeserializeObject<List<ObjDeportista>>(a);
            //if (!ModelState.IsValid)
            //    Retorno.mensaje="Datos invalidos";

            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    a.Deport.Imagen = SaveImagenFile(a.Deport.Imagen, a.Deport.NumIdentificacion.ToString() + ".jpg");
                    try
                    {
                        var Deportistaexiste = db.Deportistas.FirstOrDefault(w => w.IdDeportista == a.Deport.IdDeportista);
                        if (Deportistaexiste != null)
                        {
                            Deportistaexiste.TipoIdentificacion = a.Deport.TipoIdentificacion;
                            Deportistaexiste.NumIdentificacion = a.Deport.NumIdentificacion;
                            Deportistaexiste.PrimerNombre = a.Deport.PrimerNombre;
                            Deportistaexiste.SegundoNombre = a.Deport.SegundoNombre;
                            Deportistaexiste.PrimerApellido = a.Deport.PrimerApellido;
                            Deportistaexiste.SegundoApellido = a.Deport.SegundoApellido;
                            Deportistaexiste.Imagen = a.Deport.Imagen;
                            Deportistaexiste.Edad = a.Deport.Edad;
                            Deportistaexiste.Genero = a.Deport.Genero;
                            Deportistaexiste.GrupoSanguineo = a.Deport.GrupoSanguineo;
                            Deportistaexiste.Eps = a.Deport.Eps;
                            Deportistaexiste.CorreoDeportista = a.Deport.CorreoDeportista;
                            Deportistaexiste.Deporte = a.Deport.Deporte;
                            Deportistaexiste.FechaNacimiento = a.Deport.FechaNacimiento;
                            Deportistaexiste.DepartamentoNacimiento = a.Deport.DepartamentoNacimiento;
                            Deportistaexiste.MunicipioNacimiento = a.Deport.MunicipioNacimiento;
                            Deportistaexiste.GrupoEtareo = a.Deport.GrupoEtareo;
                            Deportistaexiste.CondicionPoblacion = a.Deport.CondicionPoblacion;
                            Deportistaexiste.Telefono = a.Deport.Telefono;
                            Deportistaexiste.NivelEstudio = a.Deport.NivelEstudio;
                            Deportistaexiste.PaisResidencia = a.Deport.PaisResidencia;
                            Deportistaexiste.DepartamentoResidencia = a.Deport.DepartamentoResidencia;
                            Deportistaexiste.MunicipioResidencia = a.Deport.MunicipioResidencia;
                            Deportistaexiste.BarrioResidencia = a.Deport.BarrioResidencia;
                            Deportistaexiste.TipoEtnia = a.Deport.TipoEtnia;
                            Deportistaexiste.ZonaInfluencia = a.Deport.ZonaInfluencia;
                            Deportistaexiste.EntidadPrestadora = a.Deport.EntidadPrestadora;
                            Deportistaexiste.NombreMonitor = a.Deport.NombreMonitor;
                            Deportistaexiste.NombreGrupo = a.Deport.NombreGrupo;
                            Deportistaexiste.EstadoCivil = a.Deport.EstadoCivil;
                            Deportistaexiste.IdDeportista = a.Deport.IdDeportista;

                            db.SaveChanges();

                        }
                       
                       
                        var FamilianDepoexiste = db.DatosFamiliares.FirstOrDefault(w => w.IdDeportista == a.Deport.IdDeportista );
                        if (FamilianDepoexiste != null)
                        {
                            FamilianDepoexiste.NomMadre = a.DataFamiliar.NomMadre;
                            FamilianDepoexiste.ApeMadre = a.DataFamiliar.ApeMadre;
                            FamilianDepoexiste.TipoDocumento = a.DataFamiliar.TipoDocumento;
                            FamilianDepoexiste.NumDocumento = a.DataFamiliar.NumDocumento;
                            FamilianDepoexiste.Direccion = a.DataFamiliar.Direccion;
                            FamilianDepoexiste.Barrio = a.DataFamiliar.Barrio;
                            FamilianDepoexiste.Celular = a.DataFamiliar.Celular;
                            FamilianDepoexiste.Ocupacion = a.DataFamiliar.Ocupacion;
                            FamilianDepoexiste.NomPadre = a.DataFamiliar.NomPadre;
                            FamilianDepoexiste.TipoPadre = a.DataFamiliar.TipoPadre;
                            FamilianDepoexiste.NumPadre = a.DataFamiliar.NumPadre;
                            FamilianDepoexiste.DireccionPadre = a.DataFamiliar.DireccionPadre;
                            FamilianDepoexiste.BarrioPadre = a.DataFamiliar.BarrioPadre;
                            FamilianDepoexiste.CelularPadre = a.DataFamiliar.CelularPadre;
                            FamilianDepoexiste.OcupacionPadre = a.DataFamiliar.OcupacionPadre;
                            FamilianDepoexiste.OcupacionPadre = a.DataFamiliar.OcupacionPadre;
                            FamilianDepoexiste.Deportistas = Deportistaexiste;
                            db.SaveChanges();

                        }

                        var OcupacionDepoexiste = db.Ocupacion.FirstOrDefault(w => w.IdDeportista == a.Deport.IdDeportista);
                        if (OcupacionDepoexiste != null)
                        {
                            OcupacionDepoexiste.Ocupacion1 = a.Ocupation.Ocupacion1;
                            OcupacionDepoexiste.NivelEducativo = a.Ocupation.NivelEducativo;
                            OcupacionDepoexiste.Institucion = a.Ocupation.Institucion;
                            OcupacionDepoexiste.TelefonoInstitucion = a.Ocupation.TelefonoInstitucion;
                            OcupacionDepoexiste.DirectorGrado = a.Ocupation.DirectorGrado;
                            OcupacionDepoexiste.Peso = a.Ocupation.Peso;
                            OcupacionDepoexiste.Estatura = a.Ocupation.Estatura;
                            OcupacionDepoexiste.TallaCamisa = a.Ocupation.TallaCamisa;
                            OcupacionDepoexiste.TallaPantalon = a.Ocupation.TallaPantalon;
                            OcupacionDepoexiste.TallaCalzado = a.Ocupation.TallaCalzado;
                            OcupacionDepoexiste.TallaSudadera = a.Ocupation.TallaSudadera;
                            OcupacionDepoexiste.NumeroHijos = a.Ocupation.NumeroHijos;
                            OcupacionDepoexiste.Deportistas = Deportistaexiste;
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
        public JsonResult Eliminar(int idDep)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var Depoexiste = db.Deportistas.FirstOrDefault(w => w.IdDeportista == idDep);
                    if (Depoexiste != null)
                    {
                        var OcupacionDepoexiste = db.Ocupacion.FirstOrDefault(w => w.IdDeportista == idDep);
                        if (OcupacionDepoexiste != null)
                        {
                            db.Ocupacion.Remove(OcupacionDepoexiste);
                        }
                        var FamilianDepoexiste = db.DatosFamiliares.FirstOrDefault(w => w.IdDeportista == idDep);
                        if (FamilianDepoexiste != null)
                        {
                            db.DatosFamiliares.Remove(FamilianDepoexiste);
                        }

                        db.Deportistas.Remove(Depoexiste);
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
        public static string SaveImagenFile(string Imagen, string NameFile)
        {
            string Respuesta = "";
            try
            {
                if (!string.IsNullOrEmpty(Imagen))
                {
                    Imagen = Imagen.Substring(23);
                }
                var filePath = "";
                filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/images/Deportistas");

                byte[] fileBytes = Convert.FromBase64String(Imagen);
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