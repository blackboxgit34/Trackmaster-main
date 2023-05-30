using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult UpdationForm()
        {

            return View("~/Views/Admin/_UpdationForm.cshtml");
        }

        public ActionResult UpDateSettings()
        {
            return View();

        }


        public ActionResult Updatealertsettings()
        {
            return View();

        }


        [NoDirectAccess]
        public ActionResult UpdateOverSpeedStopSettings()
        {

            return View();
        }


        public ActionResult AverageSpeedReport()
        {

            return View();
        }
        public ActionResult OverSpeedReport()
        {

            return View();
        }
        public ActionResult AdminDashBoard()
        {

            return View();
        }

        #region StatusReport : Gaurav (25/1/2017)
        public ActionResult StatusReport()
        {

            return View();
        }
        #endregion
        #region Dashboard reports : gaurav 2-4-2017
        #region _DashboardTrackReport
        public PartialViewResult _DashboardTrackReport(string firstMonthCountIn, string firstMonthCountOut, string secondMonthCountIn, string secondMonthCountOut, string reportName, string firstMonthName, string secondMonthName)
        {
            return PartialView("_DashboardTrackReport");
        }
        #endregion
        #region _DashboardAverageSpeedReport : gaurav 2-22-2017
        public PartialViewResult _DashboardAverageSpeedReport()
        {
            return PartialView("_DashboardAverageSpeedReport");
        }
        #endregion
        #region _DashboardOverSpeedReport : gaurav 2-22-2017
        public PartialViewResult _DashboardOverSpeedReport()
        {
            return PartialView("_DashboardOverSpeedReport");
        }
        #endregion
        #endregion


        #region Staff : Gaurav -2-13-2017
        [NoDirectAccess]
        public ActionResult Staff()
        {
            return View();
        }

        #endregion


        #region Non Action methods
        public PartialViewResult _AdminReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_AdminReportFilter");
        }
        #endregion


        #region GetBoxInfo : Gaurav 3/24/2017
        [NoDirectAccess]
        public ActionResult GetBoxInfo()
        {
            return View();

        }
        #endregion



        #region NON-Action Method
        public class DocInfo
        {
            public string Name { get; set; }
            public string fullPath { get; set; }
        }

        [HttpPost]
        public JsonResult UploadMyFiles()
        {
            List<DocInfo> docList = new List<DocInfo>();
            try
            {

                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var myFile = Request.Files[i];
                    DocInfo dc = new DocInfo();
                    if (myFile != null && myFile.ContentLength != 0)
                    {
                        string guid = Guid.NewGuid().ToString();
                        var filename = guid.Substring(guid.Length - 4) + "_" + myFile.FileName;
                        string pathTodisplay = "/CustomerLogo/" + filename;
                        string pathForSaving = Server.MapPath("~/CustomerLogo");
                        if (this.CreateFolderIfRequired(pathForSaving))
                        {
                            myFile.SaveAs(Path.Combine(pathForSaving, filename));
                            docList.Add(new DocInfo() { Name = filename, fullPath = pathTodisplay });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                List<string> errors = new List<string>();
                errors.Add(ex.Message);
                return Json(errors);
            }
            return Json(docList, JsonRequestBehavior.AllowGet);
        }

        private bool CreateFolderIfRequired(string path)
        {
            bool result = true;
            if (!Directory.Exists(path))
            {
                try
                {
                    Directory.CreateDirectory(path);
                }
                catch (Exception)
                {
                    result = false;
                }
            }
            return result;
        }
        #endregion


        #region FeedBack : Gaurav(4/7/2017)

        public ActionResult FeedBack()
        {
            return View();
        }
        #endregion

        #region DriverPerformance : Gaurav (10/4/2017)

        public ActionResult DriverPerformance()
        {
            return View();
        }

        #endregion

        #region AccelerationReport : Shashank Sir(4/10/2017)
        [ActionName("AccelerationReport")]
        public ActionResult AccelerationReport()
        {
            return View("AccelerationReport");
        }
        #endregion

        #region HarshBrakingReport : Shashank Sir(4/10/2017)
        [ActionName("HarshBrakingReport")]
        public ActionResult HarshBrakingReport()
        {
            return View("HarshBrakingReport");
        }
        #endregion

        #region HarshBrakingReport : Shashank Sir(4/10/2017)
        [ActionName("ConsDrvrPrfrmnce")]
        public ActionResult ConsDrvrPrfrmnce()
        {
            return View("ConsDrvrPrfrmnce");
        }
        #endregion

        #region Settings for max mileage timing slots : Gaurav(4/14/2017)
        [NoDirectAccess]
        [ActionName("MaxMileageTimeSlots")]
        public ActionResult MaxMileageTimeSlots()
        {
            return View();
        }
        #endregion

        #region Settings for max mileage timing slots : Gaurav(4/14/2017)
        [NoDirectAccess]
        [ActionName("AdminSettings")]
        public ActionResult AdminSettings()
        {
            return View();
        }
        #endregion

        #region _DashboardAverageSpeedReport : gaurav 5-17-2017
        public PartialViewResult _DashConsDrvrPrfrmnce()
        {
            return PartialView("_DashConsDrvrPrfrmnce");
        }
        #endregion

        #region CustKeyAuthen
        public ActionResult CustkeyAuthen() { return View(); }
        #endregion

        public ActionResult GetBoxSettings()
        {
            return View();
        }
        public PartialViewResult _ReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_ReportFilter");
        }

        public ActionResult vehiclemapping()
        {
            return View();
        }
    }
}