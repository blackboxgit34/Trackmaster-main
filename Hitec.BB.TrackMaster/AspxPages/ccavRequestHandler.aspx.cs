﻿using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CCA.Util;

public partial class SubmitDataInv : System.Web.UI.Page
{
    CCACrypto ccaCrypto = new CCACrypto();
    string workingKey = "1EFC724372E13692B38D28B4C6B0964E";//put in the 32bit alpha numeric key in the quotes provided here 	
    string ccaRequest = "";
    public string iframeSrc = "";
    public string strEncRequest = "";
    public string strAccessCode = "AVWU74EK14AN34UWNA"; // put the access code in the quotes provided here.

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            foreach (string name in Request.Form)
            {
                if (name != null)
                {
                    if (!name.StartsWith("_"))
                    {
                        ccaRequest = ccaRequest + name + "=" + Request.Form[name] + "&";
                        /* Response.Write(name + "=" + Request.Form[name]);
                          Response.Write("</br>");*/
                    }
                }
            }
            ccaRequest = ccaRequest + "merchant_id=153998&currency=INR&integration_type=iframe_normal&redirect_url=http://trackmaster.in/AspxPages/ccavResponseHandler.aspx&cancel_url=http://trackmaster.in/AspxPages/ccavResponseHandler.aspx&";
            strEncRequest = ccaCrypto.Encrypt(ccaRequest, workingKey);
            iframeSrc = "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&encRequest=" + strEncRequest + "&access_code=" + strAccessCode;
        }

    }

}

