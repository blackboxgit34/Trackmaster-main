﻿using CCA.Util;
using Hitec.BB.TrackMaster.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class SmsPortalController : Controller
    {


        #region web api details
        HttpClient client;
        //The URL of the WEB API Service
        string url = "http://api1.trackmaster.in/api/SmsControlAPI/GetCustomerDetails";
        string urlorderid = "http://api1.trackmaster.in/api/SmsControlAPI/GetOrderId";      
        //The HttpClient Class, this will be used for performing 
        //HTTP Operations, GET, POST, PUT, DELETE
        //Set the base address and the Header Formatter
        public SmsPortalController()
        {
            client = new HttpClient();  
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json")); 
        }
        //
        // GET: /SmsPortal/
        #endregion

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AddSmsForCustomer()
        {
            return View();
        }

        public ActionResult Addforbackup()
        {
            return View();
        }

        
        #region SavepaymentInfo:Bhanu
        [HttpGet]
        public async  Task<JsonResult> Savepaymentdetails(string CustId, string Amount, string payid, string Billdate, string BankType)
        {
            decimal RealValue = Convert.ToDecimal(Amount);
            decimal caltdr = RealValue;
            switch (payid)
            {
                case "1":
                    caltdr = RealValue * Convert.ToDecimal(5.5) / 100;
                    break;
                case "2":
                    caltdr = RealValue * Convert.ToDecimal(1.25) / 100;
                    break;
                case "3":
                    caltdr = RealValue * Convert.ToDecimal(4) / 100;
                    break;
            }

            RealValue= RealValue + caltdr;
            HttpResponseMessage responseMessage = await client.GetAsync(url + "?custid="+CustId);
            HttpResponseMessage responseMessagenew = await client.GetAsync(urlorderid + "?custid=" +Convert.ToInt32(CustId));

            if (responseMessage.IsSuccessStatusCode)
            {
                   var responseDatanew = responseMessagenew.Content.ReadAsStringAsync().Result;
                var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                var Employees = JsonConvert.DeserializeObject<CustomerDetails>(responseData);
                Session["SecRec"] = Employees;
                Session["OrderId"] = responseDatanew.ToString();
                Session["txtAmountNet"] = RealValue.ToString();
                Session["Drpnetbank"] = BankType;

             
                return Json(1, JsonRequestBehavior.AllowGet);

            }
            else
            {
                return Json(0, JsonRequestBehavior.AllowGet);
            }
           
        }

        #endregion




        

    }
}
