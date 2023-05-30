using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class AddOnController : Controller
    {
        [ActionName("fuel")]
        public ActionResult Fuel()
        {
            return View();
        }

        [ActionName("fuel-detail")]
        public ActionResult FuelDetail()
        {
            return View("FuelDetail");
        }

        [ActionName("temperature")]
        public ActionResult Temperature()
        {
            return View();
        }
        
        [ActionName("ac")]
        public ActionResult AC()
        {
            return View();
        }

        [ActionName("manualdispenser")]
        public ActionResult manualdispenser()
        {
            return View();
        }

        [ActionName("Workhours")]
        public ActionResult WorkHours()
        {
            return View("WorkHours");
        }

        public ActionResult Mdvrimage()
        {
            return View();
        }

        

        [ActionName("Thresher")]
        public ActionResult ThresherHours()
        {
            return View("ThresherHours");
        }

        [ActionName("door")]
        public ActionResult Door()
        {
            return View();
        }

        [ActionName("lid")]
        public ActionResult Lid()
        {
            return View();
        }

        [ActionName("dumper")]
        public ActionResult Dumper()
        {
            return View();
        }
        public PartialViewResult _ReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_ReportFilter");
        }
        [ActionName("rfid")]
        public ActionResult RFID()
        {
            return View("RFID");
        }

        [ActionName("PanicReport")]
        public ActionResult PanicReport()
        {
            return View("PanicReport");
        }

        [ActionName("EmployeeRFIDReport")]
        public ActionResult EmployeeRFIDReport()
        {
            return View("EmployeeRFIDReport");
        }

        [ActionName("DriverRFIDReport")]
        public ActionResult DriverRFIDReport()
        {
            return View();
        }

        [ActionName("VehicleRFIDReport")]
        public ActionResult VehicleRFIDReport()
        {
            return View();
        }
        [ActionName("OdoMeterReport")]
        public ActionResult OdoMeterReport()
        {
            return View();
        }



        public ActionResult RFIDUnauth()
        {
            return View();
        }


        public ActionResult RFIDauth()
        {
            return View();
        }
     

        [ActionName("ExxonPanicReport")]
        public ActionResult ExxonPanicReport()
        {
            return View("ExxonPanicReport");
        }
        #region Camera Images : Gaurav(12/26/2016)
        public ActionResult CameraImages()
        {
            return View();
        }



        public ActionResult CreateLink()
        {
            return View();
        }




        public ActionResult ReactContent()
        {
            return View();
        }
        #endregion

        #region 
        public ActionResult Godrejvehregistration()
        {
            return View();
        }
        public ActionResult GodrejvehList()
        {
            return View();
        }
        public ActionResult RouteLog()
        {
            return View();
        }
        public ActionResult InVehicleLog()
        {
            return View();
        }
        public ActionResult CompanyDetails()
        {

            return View();
        }
        public ActionResult CompanyDetailsList()
        {

            return View();
        }
        #endregion

    }
}
