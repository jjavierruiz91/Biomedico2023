using BIOMEDICO.Clases;
using BIOMEDICO.Controllers;
using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIOMEDICO.Filters
{
    public class Verificaciones : ActionFilterAttribute 
    {
        private Usuarios dUsuarios;
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            try
            {
                base.OnActionExecuting(filterContext);

                dUsuarios = Utilidades.ActiveUser;
                if (dUsuarios == null)
                {
                    if (filterContext.Controller is LoginController == false)
                    {
                        filterContext.HttpContext.Response.Redirect("~/Login/Login");
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}