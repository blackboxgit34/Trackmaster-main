using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class CommonController : Controller
    {
        //
        // GET: /Common/



        public ActionResult DutyRoasterChart()
        {
            return View();
        }

        public ActionResult ADDPOI()
        {
            return View();
        }
        public ActionResult eeADDPOI()
        {
            return View();
        }
        public ActionResult EditPoi()
        {
            return View();
        }
        public ActionResult POiDetails()
        {
            return View();
        }
        public PartialViewResult _ReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_ReportFilter");
        }

        public PartialViewResult _SendSMS()
        {
            return PartialView("_SendSMS");
        }
         public ActionResult ScheduleInterface()
        {
            return View();
        }

         public ActionResult ScheduleReport()
        {
            return View();
        }

         public ActionResult PIS()
         {
             return View();
         }
        
        
    }
}
