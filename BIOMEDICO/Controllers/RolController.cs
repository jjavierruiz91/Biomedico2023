using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class RolController : Controller
    {
        // GET: Rol
        public ActionResult Rol()
        {
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                var listaRol = db.Rol.ToList();

                return View(listaRol);

            }

        }

        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Agregar(Rol a)
        {
            if (!ModelState.IsValid)
                return View();
            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {


                    db.Rol.Add(a);
                    db.SaveChanges();

                    return RedirectToAction("Rol");
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
                    Rol User = db.Rol.Where(a => a.CodRol == id).FirstOrDefault();

                    return View(User);
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
        public ActionResult Editar(Rol a)
        {

            try
            {

                using (var db = new Models.BIOMEDICOEntities5())
                {

                    Rol Roles = db.Rol.Find(a.CodRol);

                    Roles.CodRol = a.CodRol;
                    Roles.NomRol = a.NomRol;
                    

                    db.SaveChanges();
                    return RedirectToAction("Rol");

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
                    Rol Roles = db.Rol.Where(a => a.CodRol == id).FirstOrDefault();

                    return View(Roles);
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
                    Rol Roles = db.Rol.Where(a => a.CodRol == id).FirstOrDefault();
                    db.Rol.Remove(Roles);
                    db.SaveChanges();
                    return RedirectToAction("Rol");

                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al Eliminar roles- " + ex.Message);

                return View();
            }

        }


        //public static List<Rol> ListaRol()
        //{
        //    using (var bd = new Models.BIOMEDICOEntities5())
        //    {
        //        return bd.Rol.ToList();
        //    }
        //}
    }
}