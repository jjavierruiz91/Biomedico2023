using BIOMEDICO.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace BIOMEDICO.Clases
{
    public class Utilidades
    {
        public static Usuarios ActiveUser
        {
            get
            {
                return HttpContext.Current.Session["ActiveUser"] as Usuarios;
            }
            set
            {
                HttpContext.Current.Session.Timeout = 60;
                HttpContext.Current.Session["ActiveUser"] = value;
            }
        }
        public static List<ASignarPermisos> Getlistapermisos()
        {
            List<ASignarPermisos> lista = new List<ASignarPermisos>();
            using (var db= new BIOMEDICO.Models.BIOMEDICOEntities5())
            {
                lista = db.ASignarPermisos.Where(w=>w.CodRol== ActiveUser.CodRol).ToList();
                foreach (var item in lista)
                {
                    item.Permisos = db.Permisos.FirstOrDefault(w => w.IdPermiso == item.CodPermiso);
                }
            }
            return lista;
        }

        public static string ConvertFileToBase64(string path)
        {
            String file = string.Empty;
            try
            {
                Byte[] bytes = File.ReadAllBytes(path);
                file = Convert.ToBase64String(bytes);
            }
            catch (Exception ex)
            {

            }
            return file;
        }
    }
}