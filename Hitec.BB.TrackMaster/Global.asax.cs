using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Hitec.BB.TrackMaster
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            //json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.None;

        }

        //protected void Application_BeginRequest()
        //{
        //    if (!Context.Request.IsSecureConnection)
        //        Response.Redirect(Context.Request.Url.ToString().Replace("http:", "https:"));
        //}


        protected void Application_BeginRequest()
        {
           //  do not  remove below code 

            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "https://secure.ccavenue.com/");


            string returnVal;
            HttpContext context = HttpContext.Current;

            if (System.Web.HttpContext.Current.Request.Url.Host == "trackmaster.in")
           // if(true)
            {
                if (context != null)
                {
                    returnVal = System.Web.HttpContext.Current.Request.Url.AbsoluteUri;
                }
                else
                {
                    returnVal = "can't determine page name";
                }

                if ((!Context.Request.IsSecureConnection && !returnVal.Contains("AspxPages"))) // (returnVal != "http://trackmaster.in/AspxPages/ccavResponseHandler.aspx" || returnVal != "http://trackmaster.in/AspxPages/ccavResponseHandler.aspx" || returnVal != "http://trackmaster.in/AspxPages/GetRSA.aspx"))
                    Response.Redirect(Context.Request.Url.ToString().Replace("http:", "https:"));
            }
           
                    
        }
    }
}