using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using BIOMEDICO.Clases;
using BIOMEDICO.Models;
using Newtonsoft.Json;
namespace BIOMEDICO.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {

            return View();

        }

        public static Usuarios GetDataUserLog(string dataUser) 
        {
            var Datos = JsonConvert.DeserializeObject<Usuarios>(dataUser);
            return Datos;
        }
       

        [HttpPost]
        public ActionResult Login (string User, string Pass)
         {
        
            try
            {

                using (Models.BIOMEDICOEntities5 db = new Models.BIOMEDICOEntities5())
                {
                    var dUser = db.Usuarios.FirstOrDefault(d => d.Correo == User.Trim() && d.Password == Pass.Trim());
                                //(from d in db.Usuarios
                                // where d.Correo == User.Trim() && d.Password == Pass.Trim()
                                // select d).FirstOrDefault();

                    if (dUser== null)
                    {
                        ViewBag.Error = "Usuario o contraseña invalida";
                        return View();
                    }
                    Utilidades.ActiveUser =(Usuarios) dUser;
                }
                

                    return RedirectToAction("Index", "Home");

                {
                    
                }
            }
            catch (Exception ex)
            {
                ViewBag.Error = ex.Message;
                return View();
                
            }

        }


    }
}