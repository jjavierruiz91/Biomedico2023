using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class EncuestaDeportistasController : Controller
    {
        // GET: EncuestaDeportistas
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Encuesta()
        {
            return View();
        }
        public ActionResult ListaEncuestaDeportistas()
        {
            return View();
        }
        public struct ObjEncuestaDeportistas
        {
            public EncuestaDeportistas EncuestaDeportistasDeport { get; set; }
            public EncuestaFamiliar EncuestaFamiliarDepor { get; set; }
            public EncuestaSocioeconomica EncuestaSocioeconomicaDepor { get; set; }
            



        }

        public struct Respuesta//esta es tu respuesta siempre
        {

            public string mensaje { get; set; }
            public bool Error { get; set; }
            public Object objeto { get; set; }
         


        }

        [HttpGet]
        public JsonResult BuscarEncuestador(long Identificacion)
        {
            var DatosEncuesta = new EncuestaDeportistas();
            Respuesta Retorno = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                DatosEncuesta = db.EncuestaDeportistas.FirstOrDefault(w => w.IdEncuestaDeportista == Identificacion);
            }
            if (DatosEncuesta != null)
            {
                Retorno.Error = false;
                Retorno.objeto = DatosEncuesta;
            }


            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetListEncuestaDeportistas()
        {
            Respuesta ret = new Respuesta();
            string result = "";
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var EncuestaDeportistasDeport = db.EncuestaDeportistas.ToList().OrderByDescending(o => o.IdEncuestaDeportista);
                foreach (var item in EncuestaDeportistasDeport)
                {

                    item.EncuestaFamiliar = db.EncuestaFamiliar.Where(w => w.IdEncuestaDeportista == item.IdEncuestaDeportista).ToList();
                    item.EncuestaSocioeconomica = db.EncuestaSocioeconomica.Where(w => w.IdEncuestaDeportista == item.IdEncuestaDeportista).ToList();
                }

                ret.objeto = EncuestaDeportistasDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                //new JsonSerializerSettings
                //{
                //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                //});

            }

            return Json(ret, JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetEncuestaDeportistasDeportById(int IdEncuestaDeportista)
        {
            Respuesta ret = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                var EncuestaUpdate = db.EncuestaDeportistas.FirstOrDefault(w => w.IdEncuestaDeportista == IdEncuestaDeportista);
                if (EncuestaUpdate != null)
                {
                    EncuestaUpdate.EncuestaFamiliar = db.EncuestaFamiliar.Where(w => w.IdEncuestaDeportista == EncuestaUpdate.IdEncuestaDeportista).ToList();
                    EncuestaUpdate.EncuestaSocioeconomica = db.EncuestaSocioeconomica.Where(w => w.IdEncuestaDeportista == EncuestaUpdate.IdEncuestaDeportista).ToList();
                }


                ret.objeto = EncuestaUpdate;



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
        public JsonResult Agregar(ObjEncuestaDeportistas a)
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

                    a.EncuestaDeportistasDeport.FechaRegistro = DateTime.Now;
                    a.EncuestaDeportistasDeport.UsuarioRegistra = Utilidades.ActiveUser.NomUsuario;

                    db.EncuestaDeportistas.Add(a.EncuestaDeportistasDeport);
                    db.SaveChanges();
                    var Id = a.EncuestaDeportistasDeport.IdEncuestaDeportista;

                    //ADD ID TO TABLE SOCIODEMOGRAFICA
                    a.EncuestaFamiliarDepor.IdEncuestaDeportista = Id;
                    a.EncuestaFamiliarDepor.EncuestaDeportistas = db.EncuestaDeportistas.FirstOrDefault(w => w.IdEncuestaDeportista == Id);


                    ////ADD ID TO TABLE SOCIOECONOMICO

                    a.EncuestaSocioeconomicaDepor.IdEncuestaDeportista = Id;
                    a.EncuestaSocioeconomicaDepor.EncuestaDeportistas = db.EncuestaDeportistas.FirstOrDefault(w => w.IdEncuestaDeportista == Id);

                   


                    
                    db.EncuestaFamiliar.Add(a.EncuestaFamiliarDepor);
                    db.EncuestaSocioeconomica.Add(a.EncuestaSocioeconomicaDepor);
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
                Retorno.mensaje = "Datos de encuesta incompletos. Por favor, verifíquelos.";
            }
            return Json(Retorno, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        //[ValidateAntiForgeryToken]
        public JsonResult Actualizar(ObjEncuestaDeportistas a)
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
                        var SiticEncuestaExiste = db.EncuestaDeportistas.FirstOrDefault(w => w.IdEncuestaDeportista == a.EncuestaDeportistasDeport.IdEncuestaDeportista);
                        if (SiticEncuestaExiste != null)
                        {

                            SiticEncuestaExiste.IdEncuestaDeportista = a.EncuestaDeportistasDeport.IdEncuestaDeportista;
                            SiticEncuestaExiste.IdentificacionDeportista = a.EncuestaDeportistasDeport.IdentificacionDeportista;
                            SiticEncuestaExiste.PrimerNombreDepor = a.EncuestaDeportistasDeport.PrimerNombreDepor;
                            SiticEncuestaExiste.SegundonombreDepor = a.EncuestaDeportistasDeport.SegundonombreDepor;
                            SiticEncuestaExiste.PrimerApellidoDepor = a.EncuestaDeportistasDeport.PrimerApellidoDepor;
                            SiticEncuestaExiste.SegundoApellidoDepor = a.EncuestaDeportistasDeport.SegundoApellidoDepor;
                            SiticEncuestaExiste.FechaDepor = a.EncuestaDeportistasDeport.FechaDepor;
                            SiticEncuestaExiste.DireccionDepor = a.EncuestaDeportistasDeport.DireccionDepor;
                            SiticEncuestaExiste.BarrioDepor = a.EncuestaDeportistasDeport.BarrioDepor;
                            SiticEncuestaExiste.DondeNacistesDepor = a.EncuestaDeportistasDeport.DondeNacistesDepor;
                            SiticEncuestaExiste.NacionalidadDepor = a.EncuestaDeportistasDeport.NacionalidadDepor;
                            SiticEncuestaExiste.HospitalNacisteDepor = a.EncuestaDeportistasDeport.HospitalNacisteDepor;
                            SiticEncuestaExiste.DisciplinaDeportivaDepor = a.EncuestaDeportistasDeport.DisciplinaDeportivaDepor;
                            SiticEncuestaExiste.PracticaDeporteDepor = a.EncuestaDeportistasDeport.PracticaDeporteDepor;
                            SiticEncuestaExiste.CategoriaDepor = a.EncuestaDeportistasDeport.CategoriaDepor;
                            SiticEncuestaExiste.TelefonoDepor = a.EncuestaDeportistasDeport.TelefonoDepor;
                            SiticEncuestaExiste.TienesTelefono = a.EncuestaDeportistasDeport.TienesTelefono;
                            SiticEncuestaExiste.CadaCuantoTelefono = a.EncuestaDeportistasDeport.CadaCuantoTelefono;
                            SiticEncuestaExiste.TienesRedesSociales = a.EncuestaDeportistasDeport.TienesRedesSociales;
                            SiticEncuestaExiste.CualesRedes = a.EncuestaDeportistasDeport.CualesRedes;
                            SiticEncuestaExiste.Facebook = a.EncuestaDeportistasDeport.Facebook;
                            SiticEncuestaExiste.Instagram = a.EncuestaDeportistasDeport.Instagram;
                            SiticEncuestaExiste.Twitter = a.EncuestaDeportistasDeport.Twitter;
                            SiticEncuestaExiste.CuantasPersonas = a.EncuestaDeportistasDeport.CuantasPersonas;
                            SiticEncuestaExiste.ConocidosAmigos = a.EncuestaDeportistasDeport.ConocidosAmigos;
                            SiticEncuestaExiste.CuantosTotalAmigos = a.EncuestaDeportistasDeport.CuantosTotalAmigos;
                            SiticEncuestaExiste.MenoresCasa = a.EncuestaDeportistasDeport.MenoresCasa;
                            SiticEncuestaExiste.AgradaEntrenador = a.EncuestaDeportistasDeport.AgradaEntrenador;
                            SiticEncuestaExiste.MayoresCasa = a.EncuestaDeportistasDeport.MayoresCasa;
                            SiticEncuestaExiste.MaltratoVerbalEntrenador = a.EncuestaDeportistasDeport.MaltratoVerbalEntrenador;
                            SiticEncuestaExiste.HermanosTienes = a.EncuestaDeportistasDeport.HermanosTienes;
                            SiticEncuestaExiste.CuantasHorasEntrenas = a.EncuestaDeportistasDeport.CuantasHorasEntrenas;
                            SiticEncuestaExiste.InstalacionesEntrenas = a.EncuestaDeportistasDeport.InstalacionesEntrenas;
                            SiticEncuestaExiste.NoteGustaInstlaciones = a.EncuestaDeportistasDeport.NoteGustaInstlaciones;
                            SiticEncuestaExiste.OtrosDeportes = a.EncuestaDeportistasDeport.OtrosDeportes;
                            SiticEncuestaExiste.OtrosGustosDeportistas = a.EncuestaDeportistasDeport.OtrosGustosDeportistas;
                            SiticEncuestaExiste.AguaDiaria = a.EncuestaDeportistasDeport.AguaDiaria;
                            SiticEncuestaExiste.HorasEntrenamiento = a.EncuestaDeportistasDeport.HorasEntrenamiento;
                            SiticEncuestaExiste.TegustaPublico = a.EncuestaDeportistasDeport.TegustaPublico;
                            SiticEncuestaExiste.NotegustaHablarPublico = a.EncuestaDeportistasDeport.NotegustaHablarPublico;
                            SiticEncuestaExiste.VivesPadres = a.EncuestaDeportistasDeport.VivesPadres;
                            SiticEncuestaExiste.ConquienVives = a.EncuestaDeportistasDeport.ConquienVives;
                            SiticEncuestaExiste.VivesPension = a.EncuestaDeportistasDeport.VivesPension;
                            SiticEncuestaExiste.CuantoPagas = a.EncuestaDeportistasDeport.CuantoPagas;
                            SiticEncuestaExiste.ViveMadre = a.EncuestaDeportistasDeport.ViveMadre;
                            SiticEncuestaExiste.VivePapa = a.EncuestaDeportistasDeport.VivePapa;
                            SiticEncuestaExiste.NombreMadreDepor = a.EncuestaDeportistasDeport.NombreMadreDepor;
                            SiticEncuestaExiste.NombrePadreDepor = a.EncuestaDeportistasDeport.NombrePadreDepor;
                            SiticEncuestaExiste.TrabajoPadreDepor = a.EncuestaDeportistasDeport.TrabajoPadreDepor;
                            SiticEncuestaExiste.TrabajoMadreDepor = a.EncuestaDeportistasDeport.TrabajoMadreDepor;
                            SiticEncuestaExiste.ProblemasPadre = a.EncuestaDeportistasDeport.ProblemasPadre;
                            SiticEncuestaExiste.ProblemasMadre = a.EncuestaDeportistasDeport.ProblemasMadre;
                            SiticEncuestaExiste.DependeEconomicamente = a.EncuestaDeportistasDeport.DependeEconomicamente;
                            SiticEncuestaExiste.GuantoGana = a.EncuestaDeportistasDeport.GuantoGana;
                            SiticEncuestaExiste.VictimaConflicto = a.EncuestaDeportistasDeport.VictimaConflicto;
                            SiticEncuestaExiste.TipoEtnia = a.EncuestaDeportistasDeport.TipoEtnia;
                            SiticEncuestaExiste.GeneroDepor = a.EncuestaDeportistasDeport.GeneroDepor;
                            SiticEncuestaExiste.NivelEstudio = a.EncuestaDeportistasDeport.NivelEstudio;
                            SiticEncuestaExiste.EstadoEconomico = a.EncuestaDeportistasDeport.EstadoEconomico;
                            SiticEncuestaExiste.ComunaDepor = a.EncuestaDeportistasDeport.ComunaDepor;
                        
                            db.SaveChanges();


                            var SocioDemograficoExiste = db.EncuestaFamiliar.FirstOrDefault(w => w.IdEncuestaDeportista == a.EncuestaDeportistasDeport.IdEncuestaDeportista);
                            if (SocioDemograficoExiste != null)
                            {
                                //SocioDemograficoExiste.IdAntecedentes = a.AntecedentesDeport.IdAntecedentes;
                                SocioDemograficoExiste.TrabajaPersonaVives = a.EncuestaFamiliarDepor.TrabajaPersonaVives;
                                SocioDemograficoExiste.CuantoGanaPersona = a.EncuestaFamiliarDepor.CuantoGanaPersona;
                                SocioDemograficoExiste.Problemaspersonasvives = a.EncuestaFamiliarDepor.Problemaspersonasvives;
                                SocioDemograficoExiste.ProblemasMiembroFamilia = a.EncuestaFamiliarDepor.ProblemasMiembroFamilia;
                                SocioDemograficoExiste.FamiliarDiscapacidad = a.EncuestaFamiliarDepor.FamiliarDiscapacidad;
                                SocioDemograficoExiste.PersonasAgresivas = a.EncuestaFamiliarDepor.PersonasAgresivas;
                                SocioDemograficoExiste.FamiliaresAncianos = a.EncuestaFamiliarDepor.FamiliaresAncianos;
                                SocioDemograficoExiste.FamiliaresGestacion = a.EncuestaFamiliarDepor.FamiliaresGestacion;
                                SocioDemograficoExiste.EncuestaDeportistas = a.EncuestaFamiliarDepor.EncuestaDeportistas;
                                SocioDemograficoExiste.TienesDiscapacidad = a.EncuestaFamiliarDepor.TienesDiscapacidad;
                                SocioDemograficoExiste.TienesAyudaTecnica = a.EncuestaFamiliarDepor.TienesAyudaTecnica;
                                SocioDemograficoExiste.Bullying = a.EncuestaFamiliarDepor.Bullying;
                                SocioDemograficoExiste.OrientacionSexual = a.EncuestaFamiliarDepor.OrientacionSexual;
                                SocioDemograficoExiste.TienesPareja = a.EncuestaFamiliarDepor.TienesPareja;
                                SocioDemograficoExiste.BullyingOrientacionSexual = a.EncuestaFamiliarDepor.BullyingOrientacionSexual;
                                SocioDemograficoExiste.HasTenidoDepresion = a.EncuestaFamiliarDepor.HasTenidoDepresion;
                                SocioDemograficoExiste.SalidasFiestas = a.EncuestaFamiliarDepor.SalidasFiestas;
                                SocioDemograficoExiste.BebesAlcohol = a.EncuestaFamiliarDepor.BebesAlcohol;
                                SocioDemograficoExiste.SustanciasPsicoactivas = a.EncuestaFamiliarDepor.SustanciasPsicoactivas;
                                SocioDemograficoExiste.FamiliaresPsicoactivas = a.EncuestaFamiliarDepor.FamiliaresPsicoactivas;
                                SocioDemograficoExiste.SufresDepresion = a.EncuestaFamiliarDepor.SufresDepresion;
                                SocioDemograficoExiste.TienesVacunaCovid19 = a.EncuestaFamiliarDepor.TienesVacunaCovid19;
                                SocioDemograficoExiste.EpisodiosTrastornales = a.EncuestaFamiliarDepor.EpisodiosTrastornales;
                                SocioDemograficoExiste.CualesEpisodios = a.EncuestaFamiliarDepor.CualesEpisodios;
                                SocioDemograficoExiste.VaPsicologo = a.EncuestaFamiliarDepor.VaPsicologo;
                                SocioDemograficoExiste.Estudias = a.EncuestaFamiliarDepor.Estudias;
                                SocioDemograficoExiste.CualEstudio = a.EncuestaFamiliarDepor.CualEstudio;
                                SocioDemograficoExiste.Semestre = a.EncuestaFamiliarDepor.Semestre;
                                SocioDemograficoExiste.Grado = a.EncuestaFamiliarDepor.Grado;
                                SocioDemograficoExiste.CualGrado = a.EncuestaFamiliarDepor.CualGrado;
                                SocioDemograficoExiste.QueEstudias = a.EncuestaFamiliarDepor.QueEstudias;
                                SocioDemograficoExiste.QueteGustariaEstudiar = a.EncuestaFamiliarDepor.QueteGustariaEstudiar;
                                SocioDemograficoExiste.ComidasDiarias = a.EncuestaFamiliarDepor.ComidasDiarias;
                                SocioDemograficoExiste.DuermesDiario = a.EncuestaFamiliarDepor.DuermesDiario;
                                SocioDemograficoExiste.Verduras = a.EncuestaFamiliarDepor.Verduras;
                                SocioDemograficoExiste.Frutas = a.EncuestaFamiliarDepor.Frutas;
                                SocioDemograficoExiste.Cocina = a.EncuestaFamiliarDepor.Cocina;
                                SocioDemograficoExiste.MejorAmigos = a.EncuestaFamiliarDepor.MejorAmigos;
                                SocioDemograficoExiste.SufresAlergias = a.EncuestaFamiliarDepor.SufresAlergias;
                                SocioDemograficoExiste.SufresEnfermedad = a.EncuestaFamiliarDepor.SufresEnfermedad;
                                SocioDemograficoExiste.TratamientoEnfermedad = a.EncuestaFamiliarDepor.TratamientoEnfermedad;
                                SocioDemograficoExiste.TransporteEntrenos = a.EncuestaFamiliarDepor.TransporteEntrenos;
                                SocioDemograficoExiste.TiempoSitioEntreno = a.EncuestaFamiliarDepor.TiempoSitioEntreno;
                                SocioDemograficoExiste.CuantasVecesMovilizacion = a.EncuestaFamiliarDepor.CuantasVecesMovilizacion;
                                SocioDemograficoExiste.ParquesEntrenar = a.EncuestaFamiliarDepor.ParquesEntrenar;

                                SocioDemograficoExiste.IdEncuestaDeportista = SiticEncuestaExiste.IdEncuestaDeportista;
                                SocioDemograficoExiste.EncuestaDeportistas = SiticEncuestaExiste;
                                db.SaveChanges();



                            }

                            var SocioEconomicoExiste = db.EncuestaSocioeconomica.FirstOrDefault(w => w.IdEncuestaDeportista == a.EncuestaDeportistasDeport.IdEncuestaDeportista);
                            if (SocioEconomicoExiste != null)
                            {
                                SocioEconomicoExiste.Acueducto = a.EncuestaSocioeconomicaDepor.Acueducto;
                                SocioEconomicoExiste.UniformeAdecuado = a.EncuestaSocioeconomicaDepor.UniformeAdecuado;
                                SocioEconomicoExiste.TrasportePublico = a.EncuestaSocioeconomicaDepor.TrasportePublico;
                                SocioEconomicoExiste.VecinosAmigables = a.EncuestaSocioeconomicaDepor.VecinosAmigables;
                                SocioEconomicoExiste.ProblemasVecinos = a.EncuestaSocioeconomicaDepor.ProblemasVecinos;
                                SocioEconomicoExiste.CasaPropia = a.EncuestaSocioeconomicaDepor.CasaPropia;
                                SocioEconomicoExiste.PagasArriedno = a.EncuestaSocioeconomicaDepor.PagasArriedno;
                                SocioEconomicoExiste.CuantoArriendo = a.EncuestaSocioeconomicaDepor.CuantoArriendo;
                                SocioEconomicoExiste.ServiciosCasa = a.EncuestaSocioeconomicaDepor.ServiciosCasa;
                                SocioEconomicoExiste.CuantosCuartos = a.EncuestaSocioeconomicaDepor.CuantosCuartos;
                                SocioEconomicoExiste.CuantosBaños = a.EncuestaSocioeconomicaDepor.CuantosBaños;
                                SocioEconomicoExiste.TienesComputadora = a.EncuestaSocioeconomicaDepor.TienesComputadora;
                                SocioEconomicoExiste.TienesAire = a.EncuestaSocioeconomicaDepor.TienesAire;
                                SocioEconomicoExiste.CuantosAires = a.EncuestaSocioeconomicaDepor.CuantosAires;
                                SocioEconomicoExiste.CompartesCuarto = a.EncuestaSocioeconomicaDepor.CompartesCuarto;
                                SocioEconomicoExiste.TienesCama = a.EncuestaSocioeconomicaDepor.TienesCama;
                                SocioEconomicoExiste.TienesNeveraCasa = a.EncuestaSocioeconomicaDepor.TienesNeveraCasa;
                                SocioEconomicoExiste.TienesMascota = a.EncuestaSocioeconomicaDepor.TienesMascota;
                                SocioEconomicoExiste.TipoMascota = a.EncuestaSocioeconomicaDepor.TipoMascota;
                                SocioEconomicoExiste.TeGustaMusica = a.EncuestaSocioeconomicaDepor.TeGustaMusica;
                                SocioEconomicoExiste.SabesBailar = a.EncuestaSocioeconomicaDepor.SabesBailar;
                                SocioEconomicoExiste.DedicasTiempo = a.EncuestaSocioeconomicaDepor.DedicasTiempo;
                                SocioEconomicoExiste.EresFeliz = a.EncuestaSocioeconomicaDepor.EresFeliz;
                                SocioEconomicoExiste.IdEncuestaDeportista = SiticEncuestaExiste.IdEncuestaDeportista;
                                SocioEconomicoExiste.EncuestaDeportistas = SiticEncuestaExiste;
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
                Retorno.mensaje = "Error al agregar ";
            }
            return Json(Retorno);
        }


    }
}