using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class ASignarPermisosController : Controller
    {
        // GET: ASignarPermisos
        public ActionResult AsignarPermisos()
        {
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                var listaAsignarPermisos = db.ASignarPermisos.ToList();

                return View(listaAsignarPermisos);

            }

        }

        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Agregar(ASignarPermisos a)
        {
            if (!ModelState.IsValid)
                return View();
            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {

                    a.Permisos = db.Permisos.FirstOrDefault(w => w.CodPermiso == a.CodPermiso);
                    a.Rol = db.Rol.FirstOrDefault(w => w.CodRol == a.CodRol);
                    db.ASignarPermisos.Add(a);
                    db.SaveChanges();

                    return RedirectToAction("AsignarPermisos");
                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al agregar el Usuario" + ex.Message);

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
                    ASignarPermisos Asig = db.ASignarPermisos.Where(a => a.IdPermiso == id).FirstOrDefault();

                    return View(Asig);
                }
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Error al actualizar roles - " + ex.Message);

                return View();
            }

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Editar(ASignarPermisos a)
        {

            try
            {

                using (var db = new Models.BIOMEDICOEntities5())
                {

                    ASignarPermisos Asig = db.ASignarPermisos.Find(a.IdPermiso);

                    Asig.IdPermiso = a.IdPermiso;
                    Asig.CodPermiso = a.CodPermiso;
                    Asig.CodRol = a.CodRol;

                    db.SaveChanges();
                    return RedirectToAction("Asig");

                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al actualizar roles- " + ex.Message);

                return View();
            }
        }

        public ActionResult Detalles(int id)
        {

            try
            {
                using (var db = new Models.BIOMEDICOEntities5())
                {
                    ASignarPermisos Asig = db.ASignarPermisos.Where(a => a.IdPermiso == id).FirstOrDefault();

                    return View(Asig);
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
                    ASignarPermisos Asig = db.ASignarPermisos.Where(a => a.IdPermiso == id).FirstOrDefault();
                    db.ASignarPermisos.Remove(Asig);
                    db.SaveChanges();
                    return RedirectToAction("ASignarPermisos");

                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al Eliminar roles- " + ex.Message);

                return View();
            }

        }
        public JsonResult GetPermisos()
        {
            List<ASignarPermisos> lista = new List<ASignarPermisos>();
            using (var db = new BIOMEDICO.Models.BIOMEDICOEntities5())
            {
                lista = db.ASignarPermisos.Where(w => w.CodRol ==Utilidades.ActiveUser.CodRol).ToList();
                foreach (var item in lista)
                {
                    item.Permisos = db.Permisos.FirstOrDefault(w => w.IdPermiso == item.CodPermiso);
                }
            }
            return Json(lista,JsonRequestBehavior.AllowGet);
        }

    }
}