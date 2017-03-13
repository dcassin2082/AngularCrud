using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NgCrud.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Orders()
        {
            ViewBag.title = "Orders";
            return View();
        }

        public ActionResult Suppliers()
        {
            ViewBag.title = "Suppliers";
            return View();
        }

        public ActionResult Products()
        {
            ViewBag.title = "Products";
            return View();
        }
        
        public ActionResult Customers()
        {
            ViewBag.title = "Customers";
            return View();
        }
    }
}
