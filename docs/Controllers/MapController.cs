﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class MapController : Controller
    {
        [ActionName("all")]
        public ActionResult All()
        {
            ViewBag.ReportTitle = "Map";
            return View("all");
        }

        [ActionName("replay")]
        public ActionResult Replay()
        {
            ViewBag.ReportTitle = "Route Playback";
            return View("replay");
        }

        [ActionName("status")]
        public ActionResult StatusMap()
        {
            ViewBag.ReportTitle = "Status Map";
            return View("statusmap");
        }

        public ActionResult SixEyeMap()
        {
            return View();
        }

        public ActionResult CustomMapDadri()
        {
            return View();
        }
        [ActionName("search")]
        public ActionResult Search()
        {
            ViewBag.ReportTitle = "Nearby Vehicles";
            return View("search");
        }
        [ActionName("ShowMap")]
        public ActionResult ShowMap()
        {
           // ViewBag.userId = 1619;
            ViewBag.ReportTitle = "Search Vehicles";
            return View("ShowMap");
        }


        [ActionName("IconShowMap")]
        public ActionResult IconShowMap()
        {
            // ViewBag.userId = 1619;
            ViewBag.ReportTitle = "Search Vehicles";
            return View("IconShowMap");
        }

        public ActionResult RouteTrack()
        {
            return View();
        }
       

        public ActionResult AreaCalculater()
        {
            return View();
        }
        public ActionResult ManageArea()
        {
            return View();
        }

        public ActionResult MultipleRoutes()
        {
            return View();
        }
    }
}
