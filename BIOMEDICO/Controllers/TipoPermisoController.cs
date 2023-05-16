using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class TipoPermisoController : Controller
    {
        // GET: TipoPermiso
        public ActionResult Permisos()
        {
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                var listaPermisos = db.Permisos.ToList();

                return View(listaPermisos);

            }

        }

        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Agregar(Permisos a)
        {
            if (!ModelState.IsValid)
                return View();
            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {
                    a.TipoPermiso1 = db.TipoPermiso.Where(w => w.CodPermiso == a.TipoPermiso).FirstOrDefault();
                    db.Permisos.Add(a);
                    db.SaveChanges();

                    return RedirectToAction("Permisos");
                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al agregar el Permiso- " + ex.Message);

                return View();
            }

        }

        [HttpGet]

        public ActionResult Editar(int id)
        {

            try
            {
                using (var db = new Models.BIOMEDICOEntities5())
                {
                    Permisos Cli = db.Permisos.Where(a => a.IdPermiso == id).FirstOrDefault();

                    return View(Cli);
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Error al actualizar usuario - " + ex.Message);

                return View();
            }

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Editar(Permisos a)
        {

            try
            {

                using (var db = new Models.BIOMEDICOEntities5())
                {

                    Permisos Cli = db.Permisos.Find(a.IdPermiso);

                    Cli.IdPermiso = a.IdPermiso;
                    Cli.CodPermiso = a.CodPermiso;
                    Cli.NomPermiso = a.NomPermiso;
                    Cli.EtiquetaPermiso = a.EtiquetaPermiso;
                    Cli.Url = a.Url;
                    Cli.DesPermiso = a.DesPermiso;
                    Cli.TipoPermiso = a.TipoPermiso;
                    Cli.PadrePermiso = a.PadrePermiso;

                    db.SaveChanges();
                    return RedirectToAction("Permisos");

                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al actualizar usuario- " + ex.Message);

                return View();
            }
        }

        public ActionResult Detalles(int id)
        {

            try
            {
                using (var db = new Models.BIOMEDICOEntities5())
                {
                    Permisos Cli = db.Permisos.Where(a => a.IdPermiso == id).FirstOrDefault();

                    return View(Cli);
                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al mostrar detalles- " + ex.Message);

                return View();
            }

        }

        public ActionResult Eliminar(int id)
        {
            try
            {
                using (var db = new Models.BIOMEDICOEntities5())
                {
                    Permisos Est = db.Permisos.Where(a => a.IdPermiso == id).FirstOrDefault();
                    db.Permisos.Remove(Est);
                    db.SaveChanges();
                    return RedirectToAction("Permisos");

                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al Eliminar Permisos- " + ex.Message);

                return View();
            }

        }


        public static List<TipoPermiso> ListaTipoPermisos()
        {
            using (var bd = new Models.BIOMEDICOEntities5())
            {
                return bd.TipoPermiso.ToList();
            }
        }
    }
}