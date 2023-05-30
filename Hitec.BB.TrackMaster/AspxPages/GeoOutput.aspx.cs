using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.ApplicationBlocks.Data;
using System.Text;
using Hitec.BB.TrackMaster.Helpers;


public partial class GeoOutput : System.Web.UI.Page
{
 
    String lat = String.Empty;
    String lng = String.Empty;
    String fenceName = string.Empty;
    string Bbid = string.Empty;

    protected void Page_Load(object sender, EventArgs e)
    {
        //Session["hcid"] = SessionCL.CustId;
       
        if (Session["GEO_BBID"] != null)
        {
            try
            {
                if ((Session["hcid"] != null))
                {
                    Response.ContentType = "text/xml";
                    StringBuilder strXML = new StringBuilder();
                    strXML.Append("<markers>");
                    DataSet dsFence = new DataSet();
                    Bbid = Convert.ToString(Session["GEO_BBID"]);
                    SqlParameter[] param = new SqlParameter[1];
                    param[0] = new SqlParameter("@BBID", Convert.ToString(Session["GEO_BBID"]));
               

                    dsFence = SqlHelper.ExecuteDataset(Utility.GetConString, CommandType.Text, "select FM.FenceName,FM.ID as FenceId,FP.Lat,FP.Long,FDM.Bbid from FenceMain FM inner join FenceDeviceMaping FDM on FM.ID=FDM.FenceIDFK inner join  FencePoints FP on  FP.FenceIDFK= FM.ID where FDM.Bbid= @BBID", param);
                    for (int i = 0; i <= dsFence.Tables[0].Rows.Count - 1; i++)
                    {
                        if (!(Convert.IsDBNull(dsFence.Tables[0].Rows[i]["lat"])))
                        {
                            lat = Convert.ToString(dsFence.Tables[0].Rows[i]["lat"]);
                        }
                        if (!(Convert.IsDBNull(dsFence.Tables[0].Rows[i]["long"])))
                        {
                            lng = Convert.ToString(dsFence.Tables[0].Rows[i]["long"]);
                        }
                        if (!(Convert.IsDBNull(dsFence.Tables[0].Rows[i]["FenceName"])))
                        {
                            fenceName = Convert.ToString(dsFence.Tables[0].Rows[i]["fenceName"]);
                        }
                        if (!(Convert.IsDBNull(dsFence.Tables[0].Rows[i]["Bbid"])))
                        {
                            Bbid = Convert.ToString(dsFence.Tables[0].Rows[i]["Bbid"]);
                        }
                        if (!String.IsNullOrEmpty(lat) && !String.IsNullOrEmpty(lng))
                        {
                            strXML.Append("<marker bbid=\""+Bbid +"\" lat=\"" + lat + "\" lng=\"" + lng + "\" fenceName=\""+ fenceName+ "\"  />");
                        }
                    }
                    strXML.Append("</markers>");
                   
                    string str = strXML.ToString();
                    Response.Write(strXML.ToString());
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
