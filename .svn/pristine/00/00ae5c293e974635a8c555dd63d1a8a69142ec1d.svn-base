using System;
using CCA.Util;
using Hitec.BB.TrackMaster.Models;


namespace Hitec.BB.TrackMaster.AspxPages
{
    public partial class payforSMS : System.Web.UI.Page
    {
        CCACrypto chkSum = new CCACrypto();
        string WorkingKey = "76FF9DE87EB43AA1FD20D64DAAE18321";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                CustomerDetails l = (CustomerDetails)Session["SecRec"];
                System.Web.HttpContext.Current.Cache["BillEmail"] =l.email;
                string billingPageHeading;
                billingPageHeading = Request.Form["billingPageHeading"] != null ? Request.Form["billingPageHeading"].ToString() : "Online SMS Recharge";
                string Res = chkSum.getchecksum("153998", Session["Orderid"].ToString(), Session["txtAmountNet"].ToString(), "http://trackmaster.in/Subscription/thankyou", WorkingKey);
                string ToEncrypt = "Order_Id=" + Session["OrderId"].ToString() + "&Amount=" + Session["txtAmountNet"].ToString() + "&Merchant_Id=" + "153998" + "&Redirect_Url=" + "http://trackmaster.in/Subscription/thankyou" +
                    "&Checksum=" + Res + "&billing_cust_name="+l.Billname+"&billing_cust_address=" + l.address + "&billing_cust_country=" + l.Country +
                    "&billing_cust_tel=" + l.phone + "&billing_cust_email=" + l.email + "&billing_cust_state=" + l.state +
                    "&billing_cust_city=" + l.city + "&billing_zip_code=" + l.PostalCode + "&billing_cust_notes=" + "" +
                    "&delivery_cust_name=" + l.Billname + "&delivery_cust_address=" + l.address + "&delivery_cust_country=" + l.Country +
                    "&delivery_cust_tel=" + l.phone + "&delivery_cust_state=" + l.state + "&delivery_cust_city=" + l.city +
                    "&delivery_zip_code=" + l.PostalCode + "&Merchant_Param=" + "" + "&billingPageHeading=" + billingPageHeading + "&payType=" + Session["Drpnetbank"].ToString();
                string Encrypted;

                Encrypted = chkSum.Encrypt(ToEncrypt, WorkingKey);

                Session["detail"] = Encrypted;
                Merchant_Id.Value = "153998";
                encRequest.Value = Encrypted;
            }

           
        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
           

        }
    }
}