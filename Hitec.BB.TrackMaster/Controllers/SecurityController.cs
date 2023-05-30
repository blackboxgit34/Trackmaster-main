using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class SecurityController : Controller
    {
        public PartialViewResult CheckPassword(int custid)
        {
            ViewBag.custid = null;
            ViewBag.custid = custid;

            return PartialView("_CheckPassword");
        }
        public PartialViewResult TripCheckPassword(int custid, int tripid)
        {
            ViewBag.custid = null;
            ViewBag.custid = custid;
            ViewBag.tripid = null;
            ViewBag.tripid = tripid;

            return PartialView("_TripCheckPassword");
        }
    }
}
