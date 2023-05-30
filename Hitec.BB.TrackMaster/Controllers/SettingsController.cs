using Hitec.BB.TrackMaster.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class SettingsController : Controller
    {
        //
        // GET: /Settings/

        public ActionResult Index()
        {
            return View();
        }
        [NoDirectAccess]
        public ActionResult SetSmsTime()
        {
            return View();
        }
         [NoDirectAccess]
        public ActionResult SetEmailTime()
        {
            return View();
        }
         [NoDirectAccess]
        public ActionResult SetNotificationAlert()
        {
            return View();
        }


         public ActionResult SetcustomAlert()
        {
            return View();
        }
        public ActionResult ChangePassword()
        {
            return View();
        }
         [NoDirectAccess]
        public ActionResult UpdateTripSettings()
        {
            return View();
        }

        


    public  PartialViewResult _changePassword (string userType)
    {
        ViewBag.userType = userType == "userPassword" ? "User" : "Admin";
        return PartialView("_changePassword");
    }

    public ActionResult billpayment()
    {
        return View();
    }


        
    public PartialViewResult _adminLogin(string flag)
    {
        ViewBag.flag = flag;
        return PartialView("_adminLogin");
    }
    [NoDirectAccess]
    public ActionResult Profile()
    {
        return View();
    }


    public ActionResult ManageTrip()
    {
        return View();
    }


    public ActionResult ManageRoute()
    {
        return View();
    }

    public ActionResult alertsetting()
    {
        return View();
    }
    public ActionResult AddRoute()
    {
        return View();
    }
    public ActionResult AddTrip()
    {
        return View();
    }
    public ActionResult Immobilization()
    {
        return View();
    }
    public ActionResult EEAddRoute()
    {
        return View();
    }

    public ActionResult AssignIssue()
    {
        return View();
    }

    public ActionResult AssignVehicle()
    {
        return View();
    }
    }
}
