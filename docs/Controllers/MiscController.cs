using Hitec.BB.TrackMaster.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class MiscController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult DownloadManual()
        {
            var files = GetFiles();
            return View(files);
        }


        [ActionName("AddServiceRequest")]
        public ActionResult AddServiceRequest()
        {
            return View("AddServiceRequest");
        }

        public ActionResult AddSubUser()
        {
            return View("AddSubUser");
        }

        [ActionName("ViewAllComplaint")]
        public ActionResult ViewAllComplaint()
        {
            return View("ViewAllComplaint");
        }
        #region Non-Methods
        public PartialViewResult _ReportFilter(string reportTitle)
        {
            ViewBag.ReportTitle = reportTitle;
            return PartialView("_ReportFilter");
        }
        public List<FileNames> GetFiles()
        {
            List<FileNames> lstFiles = new List<FileNames>();
            DirectoryInfo dirInfo = new DirectoryInfo(HostingEnvironment.MapPath("~/resources/Files"));
            int i = 0;
            foreach (var item in dirInfo.GetFiles())
            {
                lstFiles.Add(new FileNames() { FileId = i + 1, FileName = "blackbox installation mannual.pptx", FilePath = dirInfo.FullName + @"\" + "blackbox installation mannual.pptx" });
                i = i + 1;
            }
            return lstFiles;
        }
        public FileResult StartDownload()
        {
            var files = GetFiles();
            string filename = (from f in files select f.FilePath).First();
            string contentType = "application/pdf";
            return File(filename, contentType, "blackbox installation mannual.pptx");
        }
        #endregion
    }
}
