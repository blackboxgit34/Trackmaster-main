using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
using Hitec.BB.TrackMaster.Helpers;
using Newtonsoft.Json;
using System.IO;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class ReportController : Controller
    {
        #region Action Methods
        public ActionResult ConsolidatedSafetySummary()
        {
            return View();
        }

        public ActionResult NightDailyReport()
        {
            ViewBag.ReportTitle = "Night Driving Violations";
            return View();
        }

        public ActionResult GetContinousDriving()
        {
            return View();
        }
        public ActionResult CustomOverspeeding()
        {
            return View();
        }
        public ActionResult Acceleration()
        {
            return View();
        }
        public ActionResult DeAcceleration()
        {
            return View();
        }
        [ActionName("distance")]
        public ActionResult DistanceReport()
        {
            return View("Distance");
        }

        public ActionResult CustomEngineHour()
        {
            return View();
        }
        public ActionResult DCMReport()
        {
            return View();
        }
        public ActionResult Batterydiscon()
        {
            return View();
        }


        public ActionResult EngineHourconsumption()
        {
            return View();
        }
        public ActionResult PrismTripReport()
        {
            return View();
        }


        public ActionResult RearEngine()
        {
            return View();
        }
        public ActionResult RotatorDailyTripReport()
        {
            return View();
        }
        public ActionResult McbDailyReport()
        {
            return View();
        }
        
        public ActionResult CustomDailyReport()
        {
            return View();
        }
        public ActionResult NewCustomWorkingHourGraph()
        {
            return View();
        }
        
        public ActionResult DisconnectionReport()
        {
            return View();
        }

        public ActionResult NoiseLevelReport()
        {
            return View();
        }

        [ActionName("LiveStatus")]
        public ActionResult LiveStatus()
        {
            return View("LiveStatus");
        }
        [ActionName("LiveStatusexxon")]
        public ActionResult LiveStatusexxon()
        {
            return View("LiveStatusexxon");
        }

        [ActionName("StoppageAnalysisReport")]
        public ActionResult StoppageAnalysisReport()
        {
            return View("StoppageAnalysisReport");
        }


        [ActionName("SpeedAnalysisReport")]
        public ActionResult SpeedAnalysisReport()
        {
            return View("SpeedAnalysisReport");
        }
        [ActionName("NormalSpeedAnalysisReport")]
        public ActionResult NormalSpeedAnalysisReport()
        {
            return View("NormalSpeedAnalysisReport");
        }

           [ActionName("DetailedSummaryAnalysisReport")]
        public ActionResult DetailedSummaryAnalysisReport()
        {
            return View("DetailedSummaryAnalysisReport");
        }




        
        [ActionName("ignition")]
        public ActionResult IgnitionReport()
        {
            return View("ignition");
        }
        [ActionName("Idling")]
        public ActionResult IdlingReport()
        {
            return View("Idling");
        }
        [ActionName("summary")]
        public ActionResult SummaryReport()
        {
            return View("summary");
        }

        [ActionName("trip")]
        public ActionResult TripReport()
        {
            return View("trip");
        }

      

        [ActionName("details")]
        public ActionResult Details()
        {
            return View("details");
        }
        //Amit
        public ActionResult DoorReport()
        {
            return View();
        }
       
       

        #region RefrigeratorTemperature :Amit(30-11-2016)
        [ActionName("refTemp")]
        public ActionResult RefTempReport()
        {
            return View("refTemp");
        }
        public ActionResult RefTempDetail(DateTime beginDate, DateTime endDate, string bbid, double offset)
        {
            return View();
        }
        #endregion

        #region  dumperlid report :Amit (01-12-2016)
        [ActionName("dumperlid")]
        public ActionResult DumperLidReport()
        {
            return View("dumperlid");
        }

        public ActionResult DumperLidDetail(DateTime beginDate, DateTime endDate, string bbid)
        {
            return View();
        }
        #endregion

        [ActionName("milkLid")]
        public ActionResult milkLidReport()
        {
            return View("milkLidReport");
        }


        public ActionResult InandOutLetReport()
        {
            return View();
        }

        
        [ActionName("FuelLid")]
        public ActionResult fuelLidReport()
        {
            return View("FuelLidReport");
        }

        [ActionName("LiveStatusMotherDairy")]
        public ActionResult LiveStatusMotherDairy()
        {
            return View("LiveStatusMotherDairy");
        }
        #endregion


        #region Non Action methods
        public PartialViewResult _ReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_ReportFilter");
        }
        public PartialViewResult _Custom(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_Custom");
        }
        public PartialViewResult _DumperReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_DumperReportFilter");
        }


        
        public PartialViewResult _RoutePlayBackFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_RoutePlayBackFilter");
        }
        public PartialViewResult _ReportFilterWithVehicleList(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_ReportFilterWithVehicleList");
        }

        public PartialViewResult GetLocationPartialView(string vehname, string lat, string longi, string location, string status)
        {
            EmptyViewBags();
            ViewBag.vehname = vehname;
            ViewBag.lat = lat;
            ViewBag.longi = longi;
            ViewBag.location = location;
            if (status == "undefined")
            {
                status = "";
            }
            ViewBag.status = status;
            return PartialView("_IndividualLocation");
        }

        public PartialViewResult GetLocationPartialViewWithData(string vehname, string lat, string longi, string location, string driverName, string driverNumber, string speed, string dateTime, string status)
        {
            EmptyViewBags();
            ViewBag.vehname = vehname;
            ViewBag.lat = lat;
            ViewBag.longi = longi;
            ViewBag.location = location;
            ViewBag.driverName = driverName;
            ViewBag.driverNumber = driverNumber;
            ViewBag.speed = speed;
            ViewBag.dateTime = dateTime;
            if (status == "undefined")
            {
                status = "";
            }
            ViewBag.status = status;

            return PartialView("_IndividualLocation");
        }


        public PartialViewResult GetLocationPartialViewWithHouseData(string vehname, string lat, string longi, string location, string driverName, string driverNumber, string speed, string dateTime, string status)
        {
            EmptyViewBags();
            ViewBag.vehname = vehname;
            ViewBag.lat = lat;
            ViewBag.longi = longi;
            ViewBag.location = location;
            ViewBag.driverName = driverName;
            ViewBag.driverNumber = driverNumber;
            ViewBag.speed = speed;
            ViewBag.dateTime = dateTime;
            if (status == "undefined")
            {
                status = "";
            }
            ViewBag.status = status;

            return PartialView("_IndividualLocationforhouse");
        }
        private void EmptyViewBags()
        {
            ViewBag.vehname = null;
            ViewBag.lat = null;
            ViewBag.longi = null;
            ViewBag.location = null;
            ViewBag.driverName = null;
            ViewBag.driverNumber = null;
            ViewBag.speed = null;
            ViewBag.dateTime = null;
        }

        public PartialViewResult GetComparisonData(string firstMonthCountIn, string firstMonthCountOut, string secondMonthCountIn, string secondMonthCountOut, string reportName, string firstMonthName, string secondMonthName)
        {
            //EmptyViewBags();
            ViewBag.firstMonthCountIn = firstMonthCountIn;
            ViewBag.firstMonthCountOut = firstMonthCountOut;
            ViewBag.secondMonthCountIn = secondMonthCountIn;
            ViewBag.secondMonthCountOut = secondMonthCountOut;
            ViewBag.reportName = reportName;
            ViewBag.firstMonthName = firstMonthName;
            ViewBag.secondMonthName = secondMonthName;
            return PartialView("_MonthlyGraph");
        }

        #endregion


        public ActionResult GetUploadRetorts()
        {
            return View();
        }

        public ActionResult LiveStatusjwala()
        {
            return View();
        }

        public ActionResult Rajkotfueldetails()
        {
            return View();
        }

        

        
        [HttpPost]
        public JsonResult GetUploadRetorts(string Remark, string MailAdd, string FilePath)
        {
            bool result = Sendmail.SendEmail(Remark, MailAdd, FilePath);
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        [ActionName("Stoppage")]
        public ActionResult Stoppage()
        {
            return View("Stoppage");
        }


        public ActionResult ConsolidatedForAll()
        {
            return View();

        }


        public ActionResult Custommonthlysummary()
        {
            return View();

        }


        
        [ActionName("SmsReports")]
        public ActionResult SmsReports()
        {
            return View("SmsReports");
        }

        #region GetTimeSlotsReport  
        [ActionName("GetTimeSlotsReport")]
        public ActionResult GetTimeSlotsReport()
        {
            return View();
        }
        #endregion
        #region GetTimeSlotsReportDriverBehavior
        [ActionName("GetTimeSlotsReportDriverBehavior")]
        public ActionResult GetTimeSlotsReportDriverBehavior()
        {
            return View();
        }
        #endregion
        #region Over Idling (copy of Idling, just change in logic for over idling: amit sir) : 6-2-2017
        public ActionResult OverIdling()
        {
            return View();
        }
        #endregion

        #region reftempalert
        public ActionResult RefTempAlert()
        {
            return View();
        }
        #endregion

        #region _RefReportFilter : Bhanu Sir(6-15-2017)
        public PartialViewResult _LidReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_LidReportFilter");
        }

        public PartialViewResult _LidVerkaReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_LidVerkaReportFilter");
        }
        public PartialViewResult _RefReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_RefReportFilter");
        }
        public PartialViewResult _FixReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_FixReportFilter");
        }
        public PartialViewResult _MonthlyReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_MonthlyReportFilter");
        }
        
        #endregion

        public ActionResult CombinedReport()
        {
            return View();
        }
        public ActionResult DailyReport()
        {
            ViewBag.ReportTitle = "DailyReport";
            return View();
        }


        public ActionResult VardhmanReport()
        {
            ViewBag.ReportTitle = "vardhman Fleet Summary";
            return View("DailyReport");
        }


       public ActionResult CustomizeTripDetailReport()
        {
            return View();
        }

       public ActionResult CustomizeTripDetailReportNFL()
       {
           return View();
       }

       public ActionResult CustomizeTripDetailReporting()
       {
           return View();
       }

       public ActionResult CustomizeTripDistrictDetail()
       {
           return View();
       }
       public ActionResult Database()
       {
           return View();
       }
       public ActionResult DBReport()
       {
           return View();
       }
       public ActionResult TiltReport()
       {
           return View();
       }
       public ActionResult GensetGraph()
       {
           return View();
       }
       public ActionResult RotatorDailyReport()
       {
           return View();
       }
       public ActionResult Consollidateindiansucrose()
       {
           return View();
     
       }


        public ActionResult CustomCombinedReport()
       {

           return View();
       }

        public ActionResult Efficiency()
        {

            return View();
        }

        public ActionResult UtsavLiveStatus()
        {

            return View();
        }

        public ActionResult MonthlySummary()
        {

            return View();
        }
        public ActionResult Navkardistance()
        {

            return View();
        }

        public ActionResult LiveStatusNavkar()
        {

            return View();
        }


        public ActionResult fuellocationreport()
        {
            return View();
        }


        [HttpPost]
        public JsonResult UploadFile()
        {
            string _imgname = string.Empty;
            string _path = string.Empty;

            string localpath = "/hazardaudio/";
            if (System.Web.HttpContext.Current.Request.Files.Count > 0)
            {
                var pic = System.Web.HttpContext.Current.Request.Files["Audio"];
                if (pic.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(pic.FileName);
                    _imgname = Guid.NewGuid().ToString() + '_' + fileName;
                    _path = Server.MapPath(localpath) + _imgname;
                    localpath += _imgname;
                    pic.SaveAs(_path);
                    _path = "https://trackmaster.in" + localpath;
                }
            }
            var result = new { imgName = _imgname, imgPath = _path };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult UpdateFile(string payload)
        {
            string localpath = "/hazardaudio/";
            //source
            var fileName = Path.GetFileName(payload.Split(':')[1]);
            var _path = Server.MapPath(localpath) + fileName;
            //destination
            var filedest = "haz_" + Path.GetFileName(payload.Split(':')[0] + ".mp3");
            var _pathdest = Server.MapPath(localpath) + filedest;

            try
            {
                System.IO.File.Copy(_path, _pathdest, true);
                var result = new { result = "done", path = _path, dest = _pathdest, error = "" }; 
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ee)
            {
                var result = new { result = "done", path = _path, dest = _pathdest, error = ee.Message };
                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult Hazards()
        {
            return View();
        }

        public ActionResult HazardRoute()
        {
            return View();
        }

        public ActionResult speedcompare()
        {
            return View();
        }

        public ActionResult FuelDiscon()
        {
            return View();
        }

        public ActionResult ConsolidateFuelRodIssueReport()
        {
            return View();
        }

        public ActionResult AnaajChallans()
        {
            return View();
        }
        public ActionResult Tripcalc()
        {
            return View();
        }

        public ActionResult ManageRoutes()
        {
            return View();
        }

        public ActionResult ManageRoaster()
        {
            return View();
        }
        #region Ankita 15 Sept 2021
        public ActionResult EngineWorkingReport()
        {
            return View();
        }

        #endregion

        #region 
        public ActionResult RouteTripReport()
        {
            return View();
        }

        #endregion

        #region
        public ActionResult ConsolidateEngReport()
        {
            return View();
        }

        #endregion
        public ActionResult VodafoneCanedatareport()
        {
            return View();
        }

        public ActionResult TiltGraph()
        {
            return View();
        }
        public ActionResult TiltMonitoring()
        {
            return View();
        }
        public PartialViewResult _TiltGraph(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_TiltGraph");
        }
        public ActionResult ConsolidateWorkingIdlingHour()
        {
            return View();
        }

        //********Neha 16.05.2022 for Patel********
        public ActionResult ConsolidatedEngineFuelReport()        {            return View();        }
    }
}
