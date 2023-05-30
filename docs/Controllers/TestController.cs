using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult UploadMyFiles()
        {
            List<DocInfo> docList = new List<DocInfo>();
            for (int i = 0; i < Request.Files.Count; i++)
            {
                var myFile = Request.Files[i];
                DocInfo dc = new DocInfo();
                if (myFile != null && myFile.ContentLength != 0)
                {
                    string guid = Guid.NewGuid().ToString();
                    var filename = guid.Substring(guid.Length - 4) + "_" + myFile.FileName;
                    string pathTodisplay = "/ExcelFiles/" + filename;
                    string pathForSaving = Server.MapPath("~/ExcelFiles");
                    if (this.CreateFolderIfRequired(pathForSaving))
                    {
                        myFile.SaveAs(Path.Combine(pathForSaving, filename));
                        docList.Add(new DocInfo() { Name = filename, fullPath = pathForSaving });
                    }
                }
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

    }

    public class DocInfo
    {
        public string Name { get; set; }
        public string fullPath { get; set; }
    }
}
