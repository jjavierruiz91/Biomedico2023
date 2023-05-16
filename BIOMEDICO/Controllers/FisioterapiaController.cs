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
    public class FisioterapiaController : Controller
    {
        // GET: Fisioterapia
        public ActionResult Index()
        {
            return View();
        }
             public ActionResult ListaFisioterapiaDeportiva()
            {
                return View();
            }
            public struct ObjFisioterapiaDeportiva
            {
                public Fisioterapia FisioterapiaDeport { get; set; }
                public AntecedentesFisioterapia AntecedentesFisioDeport { get; set; }
                public Evolucionfisioterapia EvolucionFisioDeport { get; set; }
                public EvaluacionFisioterapia FisioterapiaEvaluacionDeport { get; set; }

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
            public JsonResult GetListFisioterapiaDeportiva()
            {
                Respuesta ret = new Respuesta();
                string result = "";
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    var FisioterapiaDeport = db.Fisioterapia.ToList().OrderByDescending(o => o.IdFisioterapia);
                foreach (var item in FisioterapiaDeport)
                    {

                        item.AntecedentesFisioterapia = db.AntecedentesFisioterapia.Where(w => w.IdFisioterapia == item.IdFisioterapia).ToList();
                        item.Evolucionfisioterapia = db.Evolucionfisioterapia.Where(w => w.IdFisioterapia == item.IdFisioterapia).ToList();
                        item.EvaluacionFisioterapia = db.EvaluacionFisioterapia.Where(w => w.IdFisioterapia == item.IdFisioterapia).ToList();
                }

                ret.objeto = FisioterapiaDeport; //ocupacion = DAtosocupacion };//, datosFamiliar=DatosFamiliar };

                    //result = JsonConvert.SerializeObject(ret, Formatting.Indented,
                    //new JsonSerializerSettings
                    //{
                    //   ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    //});

                }

            var jsonResult = Json(ret, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

            [HttpGet]
            public JsonResult GetFisioterapiaDeportivaById(int IdfisioDepor)
            {
                Respuesta ret = new Respuesta();
                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    var FisioDepoUpdate = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == IdfisioDepor);
                    if (FisioDepoUpdate != null)
                    {
                    FisioDepoUpdate.AntecedentesFisioterapia = db.AntecedentesFisioterapia.Where(w => w.IdFisioterapia == FisioDepoUpdate.IdFisioterapia).ToList();
                    FisioDepoUpdate.Evolucionfisioterapia = db.Evolucionfisioterapia.Where(w => w.IdFisioterapia == FisioDepoUpdate.IdFisioterapia).ToList();
                    FisioDepoUpdate.EvaluacionFisioterapia = db.EvaluacionFisioterapia.Where(w => w.IdFisioterapia == FisioDepoUpdate.IdFisioterapia).ToList();
                    
                }


                    ret.objeto = FisioDepoUpdate;



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
            public JsonResult Agregar(ObjFisioterapiaDeportiva a)
            {
                Respuesta Retorno = new Respuesta();

                //if (!ModelState.IsValid)
                //    Retorno.mensaje="Datos invalidos";

                try
                {

                    using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                    {
                    a.FisioterapiaEvaluacionDeport.FirmaDoctorFisioterapia = Utilidades.ActiveUser.CedUsuario;
                    var IdCita = a.FisioterapiaDeport.IdCitaMedica;
                    a.FisioterapiaDeport.AnexosFisioterapia = SaveImagenFile(a.FisioterapiaDeport.AnexosFisioterapia, a.FisioterapiaDeport.NumIdentificacion + ".jpg");

                    a.FisioterapiaDeport.FechaRegistro = DateTime.Now;
                    a.FisioterapiaDeport.UsuarioRegistro = Utilidades.ActiveUser.NomUsuario;
                    db.Fisioterapia.Add(a.FisioterapiaDeport);
                    db.SaveChanges();
                    var Id = a.FisioterapiaDeport.IdFisioterapia;

                    ////ADD ID TO TABLE HISTORIA PSICOLOGIA
                    a.AntecedentesFisioDeport.IdFisioterapia = Id;
                    a.AntecedentesFisioDeport.Fisioterapia = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == Id);

                    //////ADD ID TO TABLE FAMILIA PSICOLOGIA

                    a.EvolucionFisioDeport.IdFisioterapia = Id;
                    a.EvolucionFisioDeport.Fisioterapia = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == Id);


                    a.FisioterapiaEvaluacionDeport.IdFisioterapia = Id;
                    a.FisioterapiaEvaluacionDeport.Fisioterapia = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == Id);


                    //////add id to tabla ocupation






                    db.AntecedentesFisioterapia.Add(a.AntecedentesFisioDeport);
                    db.Evolucionfisioterapia.Add(a.EvolucionFisioDeport);
                    db.EvaluacionFisioterapia.Add(a.FisioterapiaEvaluacionDeport);

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
        public JsonResult Actualizar(ObjFisioterapiaDeportiva a)
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
                        a.FisioterapiaEvaluacionDeport.FirmaDoctorFisioterapia = Utilidades.ActiveUser.CedUsuario;

                        var FisioDeportivaExiste = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == a.FisioterapiaDeport.IdFisioterapia);
                        if (FisioDeportivaExiste != null)
                        {

                            FisioDeportivaExiste.FechaFisioter = a.FisioterapiaDeport.FechaFisioter;
                            FisioDeportivaExiste.CodFisioterapi = a.FisioterapiaDeport.CodFisioterapi;
                            
                            FisioDeportivaExiste.ReportaLesion = a.FisioterapiaDeport.ReportaLesion;
                            FisioDeportivaExiste.AntecedentesLesion = a.FisioterapiaDeport.AntecedentesLesion;
                            FisioDeportivaExiste.CualLesion = a.FisioterapiaDeport.CualLesion;
                            FisioDeportivaExiste.LesionActual = a.FisioterapiaDeport.LesionActual;
                            FisioDeportivaExiste.NumeroReLesiones = a.FisioterapiaDeport.NumeroReLesiones;
                            FisioDeportivaExiste.TratamientoLesion = a.FisioterapiaDeport.TratamientoLesion;
                            FisioDeportivaExiste.HuesoLesion = a.FisioterapiaDeport.HuesoLesion;
                            FisioDeportivaExiste.LigamentoLesion = a.FisioterapiaDeport.LigamentoLesion;
                            FisioDeportivaExiste.TendonLesion = a.FisioterapiaDeport.TendonLesion;
                            FisioDeportivaExiste.MusculoLesion = a.FisioterapiaDeport.MusculoLesion;
                            FisioDeportivaExiste.CabezaLesion = a.FisioterapiaDeport.CabezaLesion;
                            FisioDeportivaExiste.ColumnaLesion = a.FisioterapiaDeport.ColumnaLesion;
                            FisioDeportivaExiste.HombroLesion = a.FisioterapiaDeport.HombroLesion;
                            FisioDeportivaExiste.CodoLesion = a.FisioterapiaDeport.CodoLesion;
                            FisioDeportivaExiste.MuñecamanoLesion = a.FisioterapiaDeport.MuñecamanoLesion;
                            FisioDeportivaExiste.CaderaLesion = a.FisioterapiaDeport.CaderaLesion;
                            FisioDeportivaExiste.RodillaLesion = a.FisioterapiaDeport.RodillaLesion;
                            FisioDeportivaExiste.CuelloPieLesion = a.FisioterapiaDeport.CuelloPieLesion;
                            FisioDeportivaExiste.AnexosFisioterapia = a.FisioterapiaDeport.AnexosFisioterapia;
                            FisioDeportivaExiste.NumIdentificacion = a.FisioterapiaDeport.NumIdentificacion;

                

                            db.SaveChanges();
                            
                            var AntecedentesFisioDeportivaExiste = db.AntecedentesFisioterapia.FirstOrDefault(w => w.IdFisioterapia == a.FisioterapiaDeport.IdFisioterapia);
                            if (AntecedentesFisioDeportivaExiste != null)
                            {
                                //AntecedentesFisioDeportivaExiste.IdAntecedentes = a.AntecedentesFisioDeport.IdAntecedentes;
                                AntecedentesFisioDeportivaExiste.MmssRealDer = a.AntecedentesFisioDeport.MmssRealDer;
                                AntecedentesFisioDeportivaExiste.MmssRealizq = a.AntecedentesFisioDeport.MmssRealizq;
                                AntecedentesFisioDeportivaExiste.AparenteMmssDer = a.AntecedentesFisioDeport.AparenteMmssDer;
                                AntecedentesFisioDeportivaExiste.AparenteMmssIzq = a.AntecedentesFisioDeport.AparenteMmssIzq;
                                AntecedentesFisioDeportivaExiste.RealMmiiDer = a.AntecedentesFisioDeport.RealMmiiDer;
                                AntecedentesFisioDeportivaExiste.RealMmiiIzq = a.AntecedentesFisioDeport.RealMmiiIzq;
                                AntecedentesFisioDeportivaExiste.AparenteMmiiDer = a.AntecedentesFisioDeport.AparenteMmiiDer;
                                AntecedentesFisioDeportivaExiste.AparenteMmiiIzq = a.AntecedentesFisioDeport.AparenteMmiiIzq;
                                AntecedentesFisioDeportivaExiste.ObservacionesPosturaFisio = a.AntecedentesFisioDeport.ObservacionesPosturaFisio;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosAbiertos2 = a.AntecedentesFisioDeport.BalanceoOjosAbiertos2;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosAbiertos1 = a.AntecedentesFisioDeport.BalanceoOjosAbiertos1;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosAbiertos0 = a.AntecedentesFisioDeport.BalanceoOjosAbiertos0;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosAbiertosObservaciones = a.AntecedentesFisioDeport.BalanceoOjosAbiertosObservaciones;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosCerrados2 = a.AntecedentesFisioDeport.BalanceoOjosCerrados2;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosCerrados1 = a.AntecedentesFisioDeport.BalanceoOjosCerrados1;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosCerrados0 = a.AntecedentesFisioDeport.BalanceoOjosCerrados0;
                                AntecedentesFisioDeportivaExiste.BalanceoOjosCerradosObservaciones = a.AntecedentesFisioDeport.BalanceoOjosCerradosObservaciones;
                                AntecedentesFisioDeportivaExiste.FlexibilidadFisioterapia = a.AntecedentesFisioDeport.FlexibilidadFisioterapia;
                                AntecedentesFisioDeportivaExiste.IdFisioterapia = FisioDeportivaExiste.IdFisioterapia;
                                AntecedentesFisioDeportivaExiste.Fisioterapia = FisioDeportivaExiste;
                                db.SaveChanges();


                            }
                            var EvolucionFisioExiste = db.Evolucionfisioterapia.FirstOrDefault(w => w.IdFisioterapia == a.FisioterapiaDeport.IdFisioterapia);
                            if (EvolucionFisioExiste != null)
                            {
                                //ExamenFiscoDepoExiste.IdExamenFisico = a.ExamenDeport.IdExamenFisico;
                                
                                EvolucionFisioExiste.FechaTratamiento  = a.EvolucionFisioDeport.FechaTratamiento;
                                EvolucionFisioExiste.Sentadilla3 = a.EvolucionFisioDeport.Sentadilla3;
                                EvolucionFisioExiste.Sentadilla2 = a.EvolucionFisioDeport.Sentadilla2;
                                EvolucionFisioExiste.Sentadilla1 = a.EvolucionFisioDeport.Sentadilla1;
                                EvolucionFisioExiste.Sentadilla0 = a.EvolucionFisioDeport.Sentadilla0;
                                EvolucionFisioExiste.PasosValla3 = a.EvolucionFisioDeport.PasosValla3;
                                EvolucionFisioExiste.PasosValle2 = a.EvolucionFisioDeport.PasosValle2;
                                EvolucionFisioExiste.PasosValle1 = a.EvolucionFisioDeport.PasosValle1;
                                EvolucionFisioExiste.PasosValle0 = a.EvolucionFisioDeport.PasosValle0;
                                EvolucionFisioExiste.TijeraLinea3 = a.EvolucionFisioDeport.TijeraLinea3;
                                EvolucionFisioExiste.TijeraLinea2 = a.EvolucionFisioDeport.TijeraLinea1;
                                EvolucionFisioExiste.TijeraLinea1 = a.EvolucionFisioDeport.TijeraLinea1;
                                EvolucionFisioExiste.TijeraLinea0 = a.EvolucionFisioDeport.TijeraLinea0;
                                EvolucionFisioExiste.HombroActividad3 = a.EvolucionFisioDeport.HombroActividad3;
                                EvolucionFisioExiste.HombroActividad2 = a.EvolucionFisioDeport.HombroActividad2;
                                EvolucionFisioExiste.HombroActividad1 = a.EvolucionFisioDeport.HombroActividad1;
                                EvolucionFisioExiste.HombroActividad0 = a.EvolucionFisioDeport.HombroActividad0;
                                EvolucionFisioExiste.Pierna3 = a.EvolucionFisioDeport.Pierna3;
                                EvolucionFisioExiste.Pierna2 = a.EvolucionFisioDeport.Pierna2;
                                EvolucionFisioExiste.Pierna1 = a.EvolucionFisioDeport.Pierna1;
                                EvolucionFisioExiste.Pierna0 = a.EvolucionFisioDeport.Pierna0;
                                EvolucionFisioExiste.Pulgares3 = a.EvolucionFisioDeport.Pulgares3;
                                EvolucionFisioExiste.Pulgares2 = a.EvolucionFisioDeport.Pulgares2;
                                EvolucionFisioExiste.Pulgares1 = a.EvolucionFisioDeport.Pulgares1;
                                EvolucionFisioExiste.Pulgares0 = a.EvolucionFisioDeport.Pulgares0;
                                EvolucionFisioExiste.Tronco3 = a.EvolucionFisioDeport.Tronco3;
                                EvolucionFisioExiste.Tronco2 = a.EvolucionFisioDeport.Tronco2;
                                EvolucionFisioExiste.Tronco1 = a.EvolucionFisioDeport.Tronco1;
                                EvolucionFisioExiste.Tronco0 = a.EvolucionFisioDeport.Tronco0;
                                EvolucionFisioExiste.Planchas3 = a.EvolucionFisioDeport.Planchas3;
                                EvolucionFisioExiste.Planchas2 = a.EvolucionFisioDeport.Planchas2;
                                EvolucionFisioExiste.Planchas1 = a.EvolucionFisioDeport.Planchas1;
                                EvolucionFisioExiste.Planchas0 = a.EvolucionFisioDeport.Planchas0;
                                EvolucionFisioExiste.Sumatoria3 = a.EvolucionFisioDeport.Sumatoria3;
                                EvolucionFisioExiste.Sumatoria2 = a.EvolucionFisioDeport.Sumatoria2;
                                EvolucionFisioExiste.Sumatoria1 = a.EvolucionFisioDeport.Sumatoria1;
                                EvolucionFisioExiste.Sumatoria0 = a.EvolucionFisioDeport.Sumatoria0;
                                EvolucionFisioExiste.FlexoresTronco = a.EvolucionFisioDeport.FlexoresTronco;
                                EvolucionFisioExiste.FlexoresPlancha = a.EvolucionFisioDeport.FlexoresPlancha;
                                EvolucionFisioExiste.FlexoresColumna = a.EvolucionFisioDeport.FlexoresColumna;
                                EvolucionFisioExiste.FlexoresRecta = a.EvolucionFisioDeport.FlexoresRecta;
                                EvolucionFisioExiste.ObservacionesGlobal = a.EvolucionFisioDeport.ObservacionesGlobal;
                                EvolucionFisioExiste.FechaTratamiento = a.EvolucionFisioDeport.FechaTratamiento;

                                 EvolucionFisioExiste.IdFisioterapia = FisioDeportivaExiste.IdFisioterapia;
                                EvolucionFisioExiste.Fisioterapia = FisioDeportivaExiste;
                                db.SaveChanges();

                                var EvaluacionFisioDeportivaExiste = db.EvaluacionFisioterapia.FirstOrDefault(w => w.IdFisioterapia == a.FisioterapiaDeport.IdFisioterapia);
                                if (EvaluacionFisioDeportivaExiste != null)
                                {
                                    //AntecedentesFisioDeportivaExiste.IdAntecedentes = a.AntecedentesFisioDeport.IdAntecedentes;
                                    EvaluacionFisioDeportivaExiste.LesionEvaluacion = a.FisioterapiaEvaluacionDeport.LesionEvaluacion;
                                    EvaluacionFisioDeportivaExiste.CualLesionEvaluacion = a.FisioterapiaEvaluacionDeport.CualLesionEvaluacion;
                                    EvaluacionFisioDeportivaExiste.MmssSimetria = a.FisioterapiaEvaluacionDeport.MmssSimetria;
                                    EvaluacionFisioDeportivaExiste.MmssAsimetria = a.FisioterapiaEvaluacionDeport.MmssAsimetria;
                                    EvaluacionFisioDeportivaExiste.MmiiSimetria = a.FisioterapiaEvaluacionDeport.MmiiSimetria;
                                    EvaluacionFisioDeportivaExiste.MmiiAsimetria = a.FisioterapiaEvaluacionDeport.MmiiAsimetria;
                                    EvaluacionFisioDeportivaExiste.DescripcionAsimetria = a.FisioterapiaEvaluacionDeport.DescripcionAsimetria;
                                    EvaluacionFisioDeportivaExiste.DescripcionSimetria = a.FisioterapiaEvaluacionDeport.DescripcionSimetria;
                                    EvaluacionFisioDeportivaExiste.PosturaEvaluacionFisio = a.FisioterapiaEvaluacionDeport.PosturaEvaluacionFisio;
                                    EvaluacionFisioDeportivaExiste.TrotePuesto = a.FisioterapiaEvaluacionDeport.TrotePuesto;
                                    EvaluacionFisioDeportivaExiste.GeneroFisioterapia = a.FisioterapiaEvaluacionDeport.GeneroFisioterapia;
                                    EvaluacionFisioDeportivaExiste.SuperiosTest = a.FisioterapiaEvaluacionDeport.SuperiosTest;
                                    EvaluacionFisioDeportivaExiste.ExcelenteTest = a.FisioterapiaEvaluacionDeport.ExcelenteTest;
                                    EvaluacionFisioDeportivaExiste.BuenoTest = a.FisioterapiaEvaluacionDeport.BuenoTest;
                                    EvaluacionFisioDeportivaExiste.Promediotest = a.FisioterapiaEvaluacionDeport.Promediotest;
                                    EvaluacionFisioDeportivaExiste.DeficienteTest = a.FisioterapiaEvaluacionDeport.DeficienteTest;
                                    EvaluacionFisioDeportivaExiste.PobreTest = a.FisioterapiaEvaluacionDeport.PobreTest;
                                    EvaluacionFisioDeportivaExiste.MuyPobreTest = a.FisioterapiaEvaluacionDeport.MuyPobreTest;
                                    EvaluacionFisioDeportivaExiste.SentadillaCali = a.FisioterapiaEvaluacionDeport.SentadillaCali;
                                    EvaluacionFisioDeportivaExiste.TijeraCali = a.FisioterapiaEvaluacionDeport.TijeraCali;
                                    EvaluacionFisioDeportivaExiste.HombroCali = a.FisioterapiaEvaluacionDeport.HombroCali;
                                    EvaluacionFisioDeportivaExiste.PiernaCali = a.FisioterapiaEvaluacionDeport.PiernaCali;
                                    EvaluacionFisioDeportivaExiste.TroncoCali = a.FisioterapiaEvaluacionDeport.TroncoCali;
                                    EvaluacionFisioDeportivaExiste.EstabilidadCali = a.FisioterapiaEvaluacionDeport.EstabilidadCali;
                                    EvaluacionFisioDeportivaExiste.TotalCali = a.FisioterapiaEvaluacionDeport.TotalCali;
                                    EvaluacionFisioDeportivaExiste.SentadillaObs = a.FisioterapiaEvaluacionDeport.SentadillaObs;
                                    EvaluacionFisioDeportivaExiste.TijeraObs = a.FisioterapiaEvaluacionDeport.TijeraObs;
                                    EvaluacionFisioDeportivaExiste.HombroObs = a.FisioterapiaEvaluacionDeport.HombroObs;
                                    EvaluacionFisioDeportivaExiste.PiernaObs = a.FisioterapiaEvaluacionDeport.PiernaObs;
                                    EvaluacionFisioDeportivaExiste.TroncoObs = a.FisioterapiaEvaluacionDeport.TroncoObs;
                                    EvaluacionFisioDeportivaExiste.EstabilidadObs = a.FisioterapiaEvaluacionDeport.EstabilidadObs;
                                    EvaluacionFisioDeportivaExiste.TotalObs = a.FisioterapiaEvaluacionDeport.TotalObs;
                                    EvaluacionFisioDeportivaExiste.ResistenciaF = a.FisioterapiaEvaluacionDeport.ResistenciaF;
                                    EvaluacionFisioDeportivaExiste.ResistenciaM = a.FisioterapiaEvaluacionDeport.ResistenciaM;
                                    EvaluacionFisioDeportivaExiste.Puentef = a.FisioterapiaEvaluacionDeport.Puentef;
                                    EvaluacionFisioDeportivaExiste.PuenteM = a.FisioterapiaEvaluacionDeport.PuenteM;
                                    EvaluacionFisioDeportivaExiste.ExtensoresF = a.FisioterapiaEvaluacionDeport.ExtensoresF;
                                    EvaluacionFisioDeportivaExiste.ExtensoresM = a.FisioterapiaEvaluacionDeport.ExtensoresM;
                                    EvaluacionFisioDeportivaExiste.PuenteDF = a.FisioterapiaEvaluacionDeport.PuenteDF;
                                    EvaluacionFisioDeportivaExiste.PuenteDM = a.FisioterapiaEvaluacionDeport.PuenteDM;
                                    EvaluacionFisioDeportivaExiste.PuenteIF = a.FisioterapiaEvaluacionDeport.PuenteIF;
                                    EvaluacionFisioDeportivaExiste.PuenteIM = a.FisioterapiaEvaluacionDeport.PuenteIM;
                                    EvaluacionFisioDeportivaExiste.CalificacionObs = a.FisioterapiaEvaluacionDeport.CalificacionObs;
                                    EvaluacionFisioDeportivaExiste.ExcelenteEvaluacion = a.FisioterapiaEvaluacionDeport.ExcelenteEvaluacion;
                                    EvaluacionFisioDeportivaExiste.MuyBuenoEvaluacion = a.FisioterapiaEvaluacionDeport.MuyBuenoEvaluacion;
                                    EvaluacionFisioDeportivaExiste.BuenoEvaluacion = a.FisioterapiaEvaluacionDeport.BuenoEvaluacion;
                                    EvaluacionFisioDeportivaExiste.RegularEvaluacion = a.FisioterapiaEvaluacionDeport.RegularEvaluacion;
                                    EvaluacionFisioDeportivaExiste.MaloRegulacion = a.FisioterapiaEvaluacionDeport.MaloRegulacion;
                                    EvaluacionFisioDeportivaExiste.RecomendacionesObs = a.FisioterapiaEvaluacionDeport.RecomendacionesObs;
                                    EvaluacionFisioDeportivaExiste.FirmaDoctorFisioterapia = Utilidades.ActiveUser.CedUsuario;
                                    
                                   
                                    
                                    EvaluacionFisioDeportivaExiste.TestSitGenero = a.FisioterapiaEvaluacionDeport.TestSitGenero;
                                    EvaluacionFisioDeportivaExiste.TestSitSuperior = a.FisioterapiaEvaluacionDeport.TestSitSuperior;
                                    EvaluacionFisioDeportivaExiste.TestSitExcelente = a.FisioterapiaEvaluacionDeport.TestSitExcelente;
                                    EvaluacionFisioDeportivaExiste.TestSitBueno = a.FisioterapiaEvaluacionDeport.TestSitBueno;
                                    EvaluacionFisioDeportivaExiste.TestSitPromedio = a.FisioterapiaEvaluacionDeport.TestSitPromedio;
                                    EvaluacionFisioDeportivaExiste.TestSitDeficiente = a.FisioterapiaEvaluacionDeport.TestSitDeficiente;
                                    EvaluacionFisioDeportivaExiste.TestSitPobre = a.FisioterapiaEvaluacionDeport.TestSitPobre;
                                    EvaluacionFisioDeportivaExiste.TestSitMuyPobre = a.FisioterapiaEvaluacionDeport.TestSitMuyPobre;
                                    EvaluacionFisioDeportivaExiste.TestSentadillaProfunda1 = a.FisioterapiaEvaluacionDeport.TestSentadillaProfunda1;
                                    EvaluacionFisioDeportivaExiste.TestSentadillaProfunda2 = a.FisioterapiaEvaluacionDeport.TestSentadillaProfunda2;
                                    EvaluacionFisioDeportivaExiste.TestPasodeValla1 = a.FisioterapiaEvaluacionDeport.TestPasodeValla1;
                                    EvaluacionFisioDeportivaExiste.TestPasodeValla2 = a.FisioterapiaEvaluacionDeport.TestPasodeValla2;
                                    EvaluacionFisioDeportivaExiste.TestTijeraLinea1 = a.FisioterapiaEvaluacionDeport.TestTijeraLinea1;
                                    EvaluacionFisioDeportivaExiste.TestTijeraLinea2 = a.FisioterapiaEvaluacionDeport.TestTijeraLinea2;
                                    
                                    EvaluacionFisioDeportivaExiste.TestHombro1 = a.FisioterapiaEvaluacionDeport.TestHombro1;
                                    EvaluacionFisioDeportivaExiste.TestHombro2 = a.FisioterapiaEvaluacionDeport.TestHombro2;
                                    EvaluacionFisioDeportivaExiste.TestMovilidadPierna1 = a.FisioterapiaEvaluacionDeport.TestMovilidadPierna1;
                                    EvaluacionFisioDeportivaExiste.TestMovilidadPierna2 = a.FisioterapiaEvaluacionDeport.TestMovilidadPierna2;
                                    EvaluacionFisioDeportivaExiste.TestPush1 = a.FisioterapiaEvaluacionDeport.TestPush1;
                                    EvaluacionFisioDeportivaExiste.TestPush2 = a.FisioterapiaEvaluacionDeport.TestPush2;
                                    EvaluacionFisioDeportivaExiste.TestEstabilidadTronco1 = a.FisioterapiaEvaluacionDeport.TestEstabilidadTronco1;
                                    EvaluacionFisioDeportivaExiste.TestEstabilidadTronco2 = a.FisioterapiaEvaluacionDeport.TestEstabilidadTronco2;
                                    EvaluacionFisioDeportivaExiste.TestEstabilidadRotatoria1 = a.FisioterapiaEvaluacionDeport.TestEstabilidadRotatoria1;
                                    EvaluacionFisioDeportivaExiste.TestEstabilidadRotatoria2 = a.FisioterapiaEvaluacionDeport.TestEstabilidadRotatoria2;
                                    EvaluacionFisioDeportivaExiste.TestSumarotia1 = a.FisioterapiaEvaluacionDeport.TestSumarotia1;
                                    EvaluacionFisioDeportivaExiste.TestSumarotia2 = a.FisioterapiaEvaluacionDeport.TestSumarotia2;
                                    EvaluacionFisioDeportivaExiste.TestObservaciones1 = a.FisioterapiaEvaluacionDeport.TestObservaciones1;
                                    EvaluacionFisioDeportivaExiste.TestObservaciones2 = a.FisioterapiaEvaluacionDeport.TestObservaciones2;
                                    EvaluacionFisioDeportivaExiste.TestFlexora1 = a.FisioterapiaEvaluacionDeport.TestFlexora1;
                                    EvaluacionFisioDeportivaExiste.TestFlexora2 = a.FisioterapiaEvaluacionDeport.TestFlexora2;
                                   
                                    EvaluacionFisioDeportivaExiste.TestPuente1 = a.FisioterapiaEvaluacionDeport.TestPuente1;
                                    EvaluacionFisioDeportivaExiste.TestPuente2 = a.FisioterapiaEvaluacionDeport.TestPuente2;
                                    EvaluacionFisioDeportivaExiste.TestResistencia1 = a.FisioterapiaEvaluacionDeport.TestResistencia1;
                                    EvaluacionFisioDeportivaExiste.TestResistencia2 = a.FisioterapiaEvaluacionDeport.TestResistencia2;
                                    EvaluacionFisioDeportivaExiste.TestPuenteLateral1 = a.FisioterapiaEvaluacionDeport.TestPuenteLateral1;
                                    EvaluacionFisioDeportivaExiste.TestPuenteLateral2 = a.FisioterapiaEvaluacionDeport.TestPuenteLateral2;
                                    EvaluacionFisioDeportivaExiste.TestCoreSumatoria1 = a.FisioterapiaEvaluacionDeport.TestCoreSumatoria1;
                                    EvaluacionFisioDeportivaExiste.TestCoreSumatoria2 = a.FisioterapiaEvaluacionDeport.TestCoreSumatoria2;
                                    EvaluacionFisioDeportivaExiste.TestCoreObservaciones1 = a.FisioterapiaEvaluacionDeport.TestCoreObservaciones1;
                                    EvaluacionFisioDeportivaExiste.TestCoreObservaciones2 = a.FisioterapiaEvaluacionDeport.TestCoreObservaciones2;
                                    EvaluacionFisioDeportivaExiste.TestCoreExcelente = a.FisioterapiaEvaluacionDeport.TestCoreExcelente;
                                    EvaluacionFisioDeportivaExiste.TestCoreMuyBueno = a.FisioterapiaEvaluacionDeport.TestCoreMuyBueno;
                                    EvaluacionFisioDeportivaExiste.TestCoreBueno = a.FisioterapiaEvaluacionDeport.TestCoreBueno;
                                    EvaluacionFisioDeportivaExiste.TestCoreRegular = a.FisioterapiaEvaluacionDeport.TestCoreRegular;
                                    EvaluacionFisioDeportivaExiste.TestCoreMalo = a.FisioterapiaEvaluacionDeport.TestCoreMalo;

               
               
        
       

                                    EvaluacionFisioDeportivaExiste.IdFisioterapia = FisioDeportivaExiste.IdFisioterapia;
                                    EvaluacionFisioDeportivaExiste.Fisioterapia = FisioDeportivaExiste;
                                    db.SaveChanges();


                                }
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
        public JsonResult Eliminar(int idFisio)
        {
            Respuesta respuesta = new Respuesta();
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

            {
                try
                {
                    var FisioDepoExiste = db.Fisioterapia.FirstOrDefault(w => w.IdFisioterapia == idFisio);
                    if (FisioDepoExiste != null)
                    {
                        db.Fisioterapia.Remove(FisioDepoExiste);

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

        public static string SaveImagenFile(string AnexosFisioterapia, string NameFile)
        {
            string Respuesta = "";
            try
            {
                if (!string.IsNullOrEmpty(AnexosFisioterapia))
                {
                    AnexosFisioterapia = AnexosFisioterapia.Split(',')[1];
                }
                var filePath = "";
                filePath = System.Web.Hosting.HostingEnvironment.MapPath("~/images/Fisioterapia");

                byte[] fileBytes = Convert.FromBase64String(AnexosFisioterapia);
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

