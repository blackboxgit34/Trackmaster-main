using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Collections;
using System.Collections.Specialized;
using CCA.Util;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.ApplicationBlocks.Data;
using System.Data.SqlClient;
using System.Data;
using Hitec.BB.TrackMaster.Helpers;
using System.Net;
using System.IO;
using System.Text;

public partial class ResponseHandlerInv : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string workingKey = "1EFC724372E13692B38D28B4C6B0964E";//put in the 32bit alpha numeric key in the quotes provided here
        int sms = 0;
        string str = "default";
        CCACrypto ccaCrypto = new CCACrypto();
        string encResponse = ccaCrypto.Decrypt(Request.Form["encResp"], workingKey);
        NameValueCollection Params = new NameValueCollection();
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

        try
        {
            if (Params[3] == "Success")
            {
                if (Params[0].Contains("SMS"))
                {
                    if (Params[10].Contains("295")) sms = 1000;
                    else if (Params[10].Contains("566.4")) sms = 2000;
                    else if (Params[10].Contains("1298")) sms = 5000;
                    else if (Params[10].Contains("2360")) sms = 10000;
                    //else if (Params[10].Contains("1")) sms = 200;
                    SqlParameter[] para = new SqlParameter[]
                {
                    new SqlParameter("@billno", Params[0]),
                    new SqlParameter("@smscount", sms),
                    new SqlParameter("@RechargeAmount", Params[10])
                };
                    SqlHelper.ExecuteNonQuery(Utility.GetConString, CommandType.StoredProcedure, "addSMSToCust", para);
                }

                Label1.Text = "Payment successful!";
                //Image1.ImageUrl = "https://i2.wp.com/www.wponlinesupport.com/wp-content/uploads/2015/11/payment-successful.png";
                Image1.ImageUrl = "~/images/payment-successful.png";
                // insert in db and redirect
                //Response.Redirect("/Report/newLiveStatus");
            }
            else
            {
                Label1.Text = "Payment unsuccessful!";
                //Image1.ImageUrl = "https://vector.me/files/images/1/3/133744/wrong_cross_clip_art.jpg";
                Image1.ImageUrl = "~/images/payment-error.jpg";
                // show error and redirect
                //Response.Redirect("/Invoice/AccountSummary_2");
            }

            if (Params[26].Contains("puma"))
            {
                str = "enter";
                string url = @"http://112.196.27.102:86/api/CCAvenueAPI/GetCCAvenueResponse?";
                url = url + "orderid=" + Params[0] + "&name=" + Params[11] + "&address=" + Params[12] + "&city=" + Params[13] + "&state=" + Params[14] + "&phone=" + Params[17] + "&email=" + Params[18] + "&amount=" + Params[10] + "&date=" + DateTime.Now.ToString() + "&message=" + Params[8] + "&order_status=" + Params[3] + "&TransactionAmount=" + Params[35] + "";
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();

                Stream receiveStream = response.GetResponseStream();
                MemoryStream ms = new MemoryStream();
                receiveStream.CopyTo(ms);
                str = Encoding.ASCII.GetString(ms.ToArray());
            }
        }
        catch (Exception ee)
        {

        }

        finally
        {
            SqlParameter[] pp = new SqlParameter[]
            {
                new SqlParameter("@billno", Params[0]),
                new SqlParameter("@status", Params[3] + " / " + str),
                new SqlParameter("@tracking_id", Params[1]),
                new SqlParameter("@bank_ref_no", Params[2]),
                //new SqlParameter("@mode", Params[5]),
                new SqlParameter("@mode", sms.ToString()),
                new SqlParameter("@amount", Params[10]),
                new SqlParameter("@fullstr", encResponse),
            };
            SqlHelper.ExecuteNonQuery(Utility.GetConString, CommandType.StoredProcedure, "SavePaymentDetail", pp);
        }
    }
}