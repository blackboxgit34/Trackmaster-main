using CCA.Util;
using Hitec.BB.TrackMaster.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class SubscriptionController : Controller
    {
        //
        // GET: /Subscription/

        #region web api details
        HttpClient client;
        //The URL of the WEB API Service
        string url = "http://localhost:3970/api/SmsControlAPI/UpdateOrderId";
        string urlorderid = "http://localhost:3970/api/SmsControlAPI/GetOrderId";      
        //The HttpClient Class, this will be used for performing 
        //HTTP Operations, GET, POST, PUT, DELETE
        //Set the base address and the Header Formatter
        public SubscriptionController()
        {
            client = new HttpClient();  
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json")); 
        }
        //
        // GET: /SmsPortal/
        #endregion



        #region Cross check Payemt Received:Bhanu
        string WorkingKey = "mqeeert19w0v2bhqla";
        NameValueCollection Params = new NameValueCollection();
        CCACrypto CCAvenue = new CCACrypto();
        public async  Task<ActionResult> thankyou()
        {
            string encResponse = Request.Form.ToString();
            string[] segments = encResponse.Split('&');
            foreach (string seg in segments)
            {
                string[] parts = seg.Split('=');
                if (parts.Length > 0)
                {
                    string Key = parts[0].Trim();
                    string Value = parts[1].Trim();
                    Params.Add(Key, Value);
                }
            }
            string strVerify = CCAvenue.verifychecksum(Params["Merchant_Id"].ToString(), Params["Order_Id"].ToString(), Params["Amount"].ToString(), Params["AuthDesc"].ToString(), WorkingKey, Params["Checksum"].ToString());
           string custname = Params["billing_cust_name"].ToString();
                ViewData["OrderId"]=  Params["Order_Id"].ToString();
                ViewData["Amount"]=Params["Amount"].ToString();
                ViewData["RechargeType"] = Session["Drpnetbank"].ToString();

                string telephn = Params["billing_cust_tel"].ToString();
              string email = System.Web.HttpContext.Current.Cache["BillEmail"].ToString();
              if (strVerify.ToUpper() == "TRUE")
              {
                if (Params["AuthDesc"].ToString().Trim() == "Y")
                {
                    HttpResponseMessage responseMessage = await client.GetAsync(url + "?OrderId=" + Convert.ToInt32(Params["Order_Id"]) + "&status=" + 1);
                    if (responseMessage.IsSuccessStatusCode)
                    {                  
                        var responseData = responseMessage.Content.ReadAsStringAsync().Result;
                    }
                    EmailDetails emails = new EmailDetails();
                    emails.EmailTo = email;
                    emails.EmailCC = "bhanu@hitecpoint.in";
                    emails.EmailSubject = string.Format("Payment Information  {0}", DateTime.Now.ToString("dd-MMM-yy HH:mm"));
                    emails.EmailDate = DateTime.Now;
                    emails.EmailFrom = "info@hitecpoint.in";
                    emails.EmailType = 1;
                    Hashtable ht = new Hashtable();
                    ht.Add("@Name", custname);
                    ht.Add("@Email", email);
                    ht.Add("@Phone", telephn);
                    ht.Add("@OrderId",Params["Order_Id"].ToString());
                    ht.Add("@Amount",Params["Amount"].ToString());
                    ht.Add("@Amount", Params["Amount"].ToString());
                    string msgBody = emails.GetContentFromTemplate(ht, "InvoicePayment.htm");
                    var htmlView = System.Net.Mail.AlternateView.CreateAlternateViewFromString(msgBody, null, "text/html");
                    emails.EmailContent = msgBody;
                    MailMessage mail = new MailMessage();
                    mail.Bcc.Add("bhanu@hitecpoint.in");
                    string[] strArr = null;
                    int count = 0;
                    char[] splitchar = { ',' };
                    SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                    mail.From = new MailAddress("blackboxhitec@gmail.com");
                    if (!string.IsNullOrEmpty(email))
                    {
                        strArr = email.Split(splitchar);
                        for (count = 0; count <= strArr.Length - 1; count++)
                        {
                            string e = strArr[count];
                            mail.To.Add(e);
                        }
                    }
                    mail.To.Add(emails.EmailCC);
                    mail.Subject = emails.EmailSubject + DateTime.Now.AddDays(-1).ToString("dd-MMM-yyyy") + " - Black Box";
                    mail.AlternateViews.Add(htmlView);
                    mail.IsBodyHtml = true;
                    SmtpServer.Port = 587;
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("blackboxhitec@gmail.com", "Blackbox4321");
                    SmtpServer.EnableSsl = true;
                    SmtpServer.Send(mail);
                }

                return View();
            }
            else
            {


                return RedirectToAction("ErrorPage");
            }

        }


        #endregion 

        #region Subscription Plans : Gaurav (5-5-2017)
        public ActionResult SubscriptionPlans()
        {
            return View();
        }
        #endregion
    }
}
