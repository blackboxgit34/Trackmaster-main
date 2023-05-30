using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Login()
        {
            return View("Login");
        }
        public ActionResult Index()
        {
            return View("Blank");
        }

        public ActionResult Feedback()
        {
            return View("Feedback");
        }

        public ActionResult View2()
        {
            return View();
        }

        public ActionResult ForgotPassword()
        {
            return View("ForgotPassword");
        }

        public ActionResult FeatureDisable()
        {
            return View();
                
        }
     


        public PartialViewResult _SubmitReportRequest()
        {

          //  var monthDays = DateTime.Today.AddMonths(1).AddDays(-2);
          //var Interval = monthDays.Subtract(DateTime.Now).TotalSeconds * 1000;
          //  var test = monthDays;
            
            return PartialView("_SubmitReportRequest");
        }


        public ActionResult AnimateTest()
        {
            return View();

        }


        public ActionResult TermAndConditions()
        {
            return View();

        }

        public ActionResult FAQ()
        {
            return View();

        }

    }
}
