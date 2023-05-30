using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.WebPages.Html;

namespace Hitec.BB.TrackMaster.Helpers
{
    public class Utility
    {       
        /// <summary>
        ///Method to create api URL
        /// </summary>  
        public static string GetApiUrl(string controllerName, string actionName)
        {
            string baseUrl = ConfigurationManager.AppSettings["ApiUrl"].ToString();
            string url = baseUrl + "/api/" + controllerName + "/" + actionName;
            return url;
        }

        /// <summary>
        /// method to call any api using GET
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        public static async Task<HttpResponseMessage> CallGetAPI(string url)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            HttpResponseMessage response = await client.GetAsync(url);
            return response;
        }
       
        public static async Task<HttpResponseMessage> CallPostAPI<T>(string url, T obj)
        {
            HttpClient clientPost = new HttpClient();
            string baseUrl = ConfigurationManager.AppSettings["ApiUrl"].ToString();
            HttpResponseMessage responseMessage = await clientPost.PostAsync(url, new StringContent(
            Newtonsoft.Json.JsonConvert.SerializeObject(obj),
            Encoding.UTF8, "application/json"));
            return responseMessage;
        }

        public static String GetConString = ConfigurationManager.ConnectionStrings["BlackboxMain"].ConnectionString;
    }
}
