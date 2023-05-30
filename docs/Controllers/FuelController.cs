﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class FuelController : Controller
    {
        //
        // GET: /Fuel/

        public ActionResult FuelGraph()
        {
            return View();
        }

        public ActionResult Fueltanker()
        {
            return View();
        }



        public PartialViewResult _reportFilterWithFuelList(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_reportFilterWithFuelList");
        }


        public ActionResult GraphMaster()
        {
            return View();
        }


        public ActionResult CustomFuelGraph()
        {
            return View();
        }


    

    }
}
