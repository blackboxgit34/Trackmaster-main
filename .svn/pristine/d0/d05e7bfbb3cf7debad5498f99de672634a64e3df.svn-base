using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace Hitec.BB.TrackMaster.Models
{
    public class EmailDetails
    {

      
        public string EmailTo { get; set; }
        public string EmailCC { get; set; }
        public string EmailSubject { get; set;}
        public int EmailType { get; set; }
        public string EmailFrom { get; set; }
        public DateTime EmailDate { get; set; }
        public string EmailBCC { get; set; }
        public string EmailContent { get; set; }

        public  string GetContentFromTemplate(Hashtable ht, string templateName)
        {
            string strContents = "";
            string fileName = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["TEMPLATE_PATH"] + templateName);
            FileInfo file__1 = new System.IO.FileInfo(fileName);
            if (file__1.Exists)
            {
                try
                {
                    StreamReader sr = new StreamReader(fileName, System.Text.Encoding.Default);
                    File.OpenText(fileName);
                    strContents += sr.ReadToEnd();
                    sr.Close();
                }
                catch (System.IO.IOException ex)
                {
                    throw ex;
                }
            }
            ICollection ICol = ht.Keys;
            Array arr = new string[ht.Keys.Count];
            ICol.CopyTo(arr, 0);

            for (int i = 0; i <= arr.GetUpperBound(0); i++)
            {
                if (strContents.Length > 0)
                {
                    strContents = strContents.Replace(arr.GetValue(i).ToString(), ht[arr.GetValue(i).ToString()].ToString());
                }
            }
            int index = strContents.IndexOf("<html");
            if (index > 0)
            {
                try
                {
                    strContents = strContents.Substring(index);
                    strContents.Replace("''", "'");
                }
                catch
                {
                }
            }
            return strContents;
        }
    }



    
}


