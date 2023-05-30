using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class GeofenceController : Controller
    {
        //
        // GET: /Geofence/bhanu


        public ActionResult ChartJS()
        {
           
            return View();
        }
        public ActionResult Set()
        {
            ViewBag.ReportTitle = "Set-Geofence";
            return View();
        }
        public ActionResult AreaCalculater()
        {
            ViewBag.ReportTitle = "Area-Calculater";
            return View();
        }


        [ActionName("MangaeGeofence")]
        public ActionResult MangaeGeofence()
        {
             ViewBag.ReportTitle = "Manage-Geofence";
            return View();

        }

        [ActionName("fence-violations")]
        public ActionResult FenceViolationsReport()
        {
            return View("violations");
        }

        [ActionName("ViewGeofence")]
        public ActionResult ViewGeofence()
        {
            ViewBag.userId = 1619;
            ViewBag.ReportTitle = "View-Geofence";
            return View("ViewGeofence");
        }
    }
}
