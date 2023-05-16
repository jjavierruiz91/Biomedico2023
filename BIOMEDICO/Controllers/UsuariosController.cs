using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Controllers
{
    public class UsuariosController : Controller
    {
        // GET: Usuarios
        public ActionResult Usuarios()
        {
            using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
            {
                var listaUsuarios = db.Usuarios.ToList();
                listaUsuarios.ForEach(w => w.Password = Encriptardor.Encriptar(w.Password));
                return View(listaUsuarios);

            }

        }

        [HttpGet]
        public ActionResult Agregar()
        {

            return View();

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Agregar(Usuarios a)
        {
            if (!ModelState.IsValid)
                return View();
            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())

                {


                    a.Rol = db.Rol.Where(w => w.CodRol == a.CodRol).FirstOrDefault();
                    db.Usuarios.Add(a);
                    db.SaveChanges();

                    return RedirectToAction("Usuarios");
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
                    Usuarios User = db.Usuarios.Where(a => a.IdUsuario == id).FirstOrDefault();

                    return View(User);
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
        public ActionResult Editar(Usuarios a)
        {

            try
            {

                using (var db = new Models.BIOMEDICOEntities5())
                {

                    Usuarios User = db.Usuarios.Find(a.IdUsuario);

                    User.IdUsuario = a.IdUsuario;
                    User.CedUsuario = a.CedUsuario;
                    User.NomUsuario = a.NomUsuario;
                    User.ApeUsuario = a.ApeUsuario;
                    User.Telefono = a.Telefono;
                    User.Correo = a.Correo;
                    User.Password = a.Password;
                    User.CodRol = a.CodRol;

                    db.SaveChanges();
                    return RedirectToAction("Usuarios");

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
                    Usuarios User = db.Usuarios.Where(a => a.IdUsuario == id).FirstOrDefault();

                    return View(User);
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
                    Usuarios User = db.Usuarios.Where(a => a.IdUsuario == id).FirstOrDefault();
                    db.Usuarios.Remove(User);
                    db.SaveChanges();
                    return RedirectToAction("Usuarios");

                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError("", "Error al Eliminar Permisos- " + ex.Message);

                return View();
            }

        }


        public static List<Rol> ListaRol()
        {
            using (var bd = new Models.BIOMEDICOEntities5())
            {
                return bd.Rol.ToList();
            }
        }


    }
}