using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class BillingController : Controller
    {

        public ActionResult AccountSummaryCustom()
        {

            return View("AccountSummaryCustom");
        }

        public ActionResult BillCustom()
        {

            return View("BillCustom");
        }
        [ActionName("account-summary")]
        public ActionResult AccountSummary()
        {
            ViewBag.Title = "Account Summary";
            return View("AccountSummary");
        }

        [ActionName("account-summary-old")]
        public ActionResult AccountSummaryOld()
        {
            ViewBag.Title = "Account Summary Old";
            return View("AccountSummaryOld");
        }

        [ActionName("bill")]
        public ActionResult Replay()
        {
            ViewBag.ReportTitle = "Subscription Bill";
            return View("bill");
        }
        [ActionName("billold")]
        public ActionResult ReplayOld()
        {
            ViewBag.ReportTitle = "Subscription Bill";
            return View("billold");
        }

        [ActionName("payment-options")]
        public ActionResult PaymentOptions()
        {
            ViewBag.ModeList = getmode();
            ViewBag.BankList = getbank();
            return View("PaymentOptions");
        }

        #region Non-Action PaymentOption :Amit
        public List<SelectListItem> getmode()
        {
            List<SelectListItem> items = new List<SelectListItem>();
            items.Add(new SelectListItem { Text = "--Select--", Value = "0", Selected = true });
            items.Add(new SelectListItem { Text = "Cheque", Value = "1" });
            items.Add(new SelectListItem { Text = "Demand Draft", Value = "2" });
            items.Add(new SelectListItem { Text = "Money Order", Value = "3" });
            items.Add(new SelectListItem { Text = "Cash Deposit", Value = "5" });
            items.Add(new SelectListItem { Text = "Other", Value = "6" });
            return items;
        }
        public List<SelectListItem> getbank()
        {
            List<SelectListItem> item1 = new List<SelectListItem>();
            item1.Add(new SelectListItem { Text = "--Select--", Value = "0", Selected = true });
            item1.Add(new SelectListItem { Text = "STATE BANK OF INDIA", Value = "1" });
            item1.Add(new SelectListItem { Text = "KARUR VYSYA BANK", Value = "2" });
            return item1;
        }
        #endregion

    }
}
