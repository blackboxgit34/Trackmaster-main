using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class CustomReportController : Controller
    {
        #region Action Methods
        [ActionName("EntryExitReport")]
        public ActionResult EntryExitReport()
        {
            return View();
        }
        public ActionResult ForwardTravel()
        {
            return View();
        }

        public ActionResult PrismAssignVehicle()
        {
            return View();
        }

        public ActionResult AssignVehiclesPrismMaster()
        {
            return View();
        }
        public ActionResult TLOCK()
        {
            return View();
        }
        public ActionResult ReverseTravel()
        {
            return View();
        }
        public ActionResult liftup()
        {
            return View();
        }
        public ActionResult liftdown()
        {
            return View();
        }

        public ActionResult CustomLidReport()
        {
            return View();
        }
        public ActionResult ConsolidatedToyotaReport()
        {
            return View();
        }
       
        #endregion

        public ActionResult AddLoc()
        {
            return View();
        }
        public ActionResult EditLoc()
        {
            return View();
        }
        public ActionResult Locdetails()
        {
            return View();
        }


        public ActionResult HouseDetail()
        {
            return View();
        }
        public ActionResult Stationaryreport()
        {
            return View();
        }
        public ActionResult LatlongDetail()
        {
            return View();
        }
        public ActionResult ConsolidateAceReport()
        {
            return View();
        }
        public PartialViewResult _RoutePlayBackFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_RoutePlayBackFilter");
        }
        public ActionResult Threshermap()
        {
            return View();
        }

        public ActionResult TrolleyBoxInfo()
        {
            return View();
        }

        public ActionResult TrolleyReport()
        {
            return View();
        }
        
        public ActionResult EntryExitTower()
        {
            return View();
        }
        public ActionResult CustomExitEntry()
        {
            return View();
        }
        public ActionResult NoiseReading()
        {
            return View();
        }
        public ActionResult impactmachine()
        {
            return View();
        }

        public ActionResult Punchdetails()
        {
            return View();
        }
        
        

        public ActionResult BreakDownReport()
        {
            return View();

        }
        public ActionResult Tempraturewithroutereport()
        {
            return View();

        }
        public ActionResult PumpWorkingHour()
        {
            return View();
        }
        public ActionResult PumpIdlingReport()
        {
            return View();
        }
        public ActionResult DailyFuelReport()
        {
            ViewBag.ReportTitle = "Custom Daily Summary";
            return View();
        }

        #region Action Method of Concrete Mixture Report
        [ActionName("ConcreteMixtureReport")]
        public ActionResult ConcreteMixtureReport()
        {


            return View();
        }


        public ActionResult MultipleAddonFeatureReport()
        {
            return View();
        }
        #endregion  
   
        #region Action Method of Fuel Theft
        [ActionName ("FuelTheftReport")]
        public ActionResult FuelTheftReport()
        {
            //ViewBag.fromdate = fromdate;
            //ViewBag.Todate = Todate;
            //ViewBag.vehicleid = vehicleid;

            return View();
        }
    
        public ActionResult ManageFuelTheftReport()
        {
          

            return View();
        }
        #endregion
        
        #region Action Method of Fuel Milage
        [ActionName("FuelMilageReport")]
        public ActionResult FuelMilageReport(DateTime fromdate, DateTime Todate, string vehicleid)
        {
            ViewBag.fromdate = fromdate;
            ViewBag.Todate = Todate;
            ViewBag.vehicleid = vehicleid;

            return View();
        }
        #endregion
        #region Action Method of FuelFillingReport
        [ActionName("FuelFillingReport")]
        public ActionResult FuelFillingReport()
        {
            //ViewBag.fromdate = fromdate;
            //ViewBag.Todate = Todate;
            //ViewBag.vehicleid = vehicleid;
            return View();
        }

        public ActionResult CustomVehicleSummary()
        {
            //ViewBag.fromdate = fromdate;
            //ViewBag.Todate = Todate;
            //ViewBag.vehicleid = vehicleid;
            return View();
        }
        
        #endregion

        #region Non Action methods

        public PartialViewResult _CustomLidFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_CustomLidFilter");
        }
        public PartialViewResult _ReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_ReportFilter");
        }


        public PartialViewResult _Panicreportfilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_Panicreportfilter");
        }

        public PartialViewResult _DcmReportFilter(string ReportTitle, string Report)
        {
            ViewBag.ReportTitle = ReportTitle;
            ViewBag.Report = Report;
            return PartialView("_DcmReportFilter");
        }
        
        public PartialViewResult GetLocationPartialView(string vehname, string bbid)
        {
            ViewBag.vehname = vehname;
            ViewBag.bbid = bbid;
            return PartialView("_trail");
        }


        public PartialViewResult GetDocumentPartialView( string bbid)
        {
          
            ViewBag.bbid = bbid;
            return PartialView("_Documents");
        }
        public ActionResult WorkinghourReport()
        {
            return View();
        }
        public ActionResult LiveStatusHaryanaPolice()
        {

            return View();
        }
        #endregion

        #region Action Method of Trip Report
        [ActionName("TripReport")]
        public ActionResult TripReport()
        {


            return View();
        }

       
        public ActionResult DailyTrackingReport()
        {


            return View();
        }

         
           public ActionResult UTCtripreport()
           {


               return View();
           }

           public ActionResult ACCtripreport()
           {


               return View();
           }

        [ActionName("RouteReport")]
        public ActionResult RouteReport()
        {


            return View();
        }

            [ActionName("customfuelReport")]
        public ActionResult customfuelReport()
        {

            return View();
        }



        
        public PartialViewResult _reportFilterWithRouteList(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_reportFilterWithRouteList");
        }
        public PartialViewResult _TravePathHeader()
        {
            return PartialView("_TravePathHeader");
        }
        public PartialViewResult _partialroute()
        {
            return PartialView("_partialroute");
        }
       
        

        #endregion

        #region Reliance Customer Reports: Shanank Sir (5-16-2017)

        public ActionResult AngleDetailReport()
        {
            return View();
        }
        public ActionResult AngleReport()
        {
            return View();
        }
        public ActionResult EngineOilPressureAlerts()
        {
            return View();

        }
        public ActionResult EngineTempDetailReport()
        {
            return View();
        }
        public ActionResult EngineTemperature()
        {
            return View();
        }
        public ActionResult LoadDetailReport()
        {
            return View();
        }
        public ActionResult LoadPickupReport()
        {
            return View();
        }
        public ActionResult OverArticulationAngleAlert()
        {
            return View();
        }
        public ActionResult OverLoadAlerts()
        {
            return View();
        }
        public ActionResult RadiusDetailReport()
        {
            return View();
        }
        public ActionResult RadiusReport()
        {
            return View();
        }
        public ActionResult RpmDetailReport()
        {
            return View();
        }
        public ActionResult Rpmreport()
        {
            return View();
        }
        #endregion



        public ActionResult CustomEngineWorkingHourReport()
        {
            return View();

        }


        public ActionResult Routedetailswithvehicleotherinfo()
        {
            return View();
        }
        public ActionResult CustomDistance()
        {
            return View();

        }
        public ActionResult TravelPath()
        {
            return View();

        }
        public ActionResult RefrigratorGraph()
        {

            return View();
        }


        public ActionResult PRTCCustom()
        {
            return View();
        }
        public ActionResult NitcoCustom()
        {
            return View();
        }

        
        public ActionResult GetListOfBusRouteTable()
        {
            return View();
        }


        public ActionResult TripCountWithPOI ()
        {

            return View();
        }

        public ActionResult Genset()
        {

            return View();
        }
        public ActionResult ShowMapHRPolice()
        {

            return View();
        }

        public ActionResult Dynamicweblink()
        {

            return View();
        }

        public ActionResult Deviation()
        {

            return View();
        }


        public ActionResult ACCEEReport()
        {
            return View();
        }

        public PartialViewResult _reportFilterforACC(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_reportFilterforACC");
        }



        public ActionResult utcBusTracking()
        {

            return View();
        }


        public ActionResult CustomMonthlywithplayback()
        {

            return View();
        }

        public ActionResult addlocation()
        {
            return View();
        }

        public ActionResult UTCmisreport()
        {
            return View();
        }

        public ActionResult CustomExitEntryReport()
        {
            return View();
        }
        public ActionResult DynamicWebLinkCopy()
        {

            return View();
        }
        #region
        [ActionName("ReaderMain")]
        public ActionResult ReaderMain()
        {
            return View("ReaderMain");
        }

        #endregion
    }
}
