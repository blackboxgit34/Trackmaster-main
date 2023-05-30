using Hitec.BB.TrackMaster.Helpers;
using Microsoft.ApplicationBlocks.Data;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class CommonController : Controller
    {
        //
        // GET: /Common/



        public ActionResult DutyRoasterChart()
        {
            return View();
        }

        public ActionResult ADDPOI()
        {
            return View();
        }
        public ActionResult eeADDPOI()
        {
            return View();
        }
        public ActionResult EditPoi()
        {
            return View();
        }
        public ActionResult POiDetails()
        {
            return View();
        }
        public PartialViewResult _ReportFilter(string reportTitle, string report)
        {
            ViewBag.ReportTitle = reportTitle;
            ViewBag.Report = report;
            return PartialView("_ReportFilter");
        }

        public PartialViewResult _SendSMS()
        {
            return PartialView("_SendSMS");
        }
         public ActionResult ScheduleInterface()
        {
            return View();
        }

         public ActionResult ScheduleReport()
        {
            return View();
        }

         public ActionResult PIS()
         {
             return View();
         }
        
        

        public ActionResult addemployee()
         {
             return View();
         }


    


        [HttpPost]
        public ActionResult addemployee(HttpPostedFileBase file, string custid)
        {
            try
            {


                var tbl = new DataTable();

                if ((file != null && file.ContentLength > 0 && !string.IsNullOrEmpty(file.FileName)))
                {
                    string fileName = file.FileName;
                    string fileContentType = file.ContentType;
                    byte[] filebytes = new byte[file.ContentLength];
                    var data = file.InputStream.Read(filebytes, 0, Convert.ToInt32(file.ContentLength));

                    //var suppleirList = new List<CleanSupplierClaim>();

                    using (var excel = new ExcelPackage(file.InputStream))
                    {

                        var ws = excel.Workbook.Worksheets.First();
                        var hasHeader = true;  // adjust accordingly
                        // add DataColumns to DataTable

                        //Add Header
                        foreach (var firstRowCell in ws.Cells[1, 1, 1, ws.Dimension.End.Column])
                            tbl.Columns.Add(hasHeader ? firstRowCell.Text
                                : String.Format("Column {0}", firstRowCell.Start.Column));

                        // add DataRows to DataTable
                        int startRow = hasHeader ? 2 : 1;
                        for (int rowNum = startRow; rowNum <= ws.Dimension.End.Row; rowNum++)
                        {
                            var wsRow = ws.Cells[rowNum, 1, rowNum, ws.Dimension.End.Column];
                            DataRow row = tbl.NewRow();
                            foreach (var cell in wsRow)
                                row[cell.Start.Column - 1] = cell.Text;
                            tbl.Rows.Add(row);
                        }
                        ViewBag.Message = String.Format("RFID records updated successfully"); 
                    }

                    Uploaddevicedata(tbl, custid);
                  
                   
                    return View();

                }
                ViewBag.Message = String.Format("Kindly choose Rfid card excel to upload !"); 
                return View();
            }
            catch (Exception)
            {
                ViewBag.Message = String.Format("Error while uploading   excel ,kindly update and upload again."); 
              
                return View();

            }
          

        }
        public void Uploaddevicedata(DataTable dt, string custid)
        {

            
            int result = 0;

           
            foreach (DataRow row in dt.Rows)
            {

              var  cardno = Convert.IsDBNull(row["cardno"]) ? "" : Convert.ToString(row["cardno"]).TrimStart().TrimEnd();
              var employeeid = Convert.IsDBNull(row["employeeid"]) ? "" : Convert.ToString(row["employeeid"]).TrimStart().TrimEnd();
              var employeename = Convert.IsDBNull(row["employeename"]) ? "" : Convert.ToString(row["employeename"]).TrimStart().TrimEnd();            
                var contactno = Convert.IsDBNull(row["contactno"]) ? "" : Convert.ToString(row["contactno"]).TrimStart().TrimEnd();
                var empGender = Convert.IsDBNull(row["gender"]) ? "" : Convert.ToString(row["gender"]);

                SqlParameter[] prm = new SqlParameter[]
                    {
                          new SqlParameter("@cardno" , cardno ),
                          new SqlParameter("@custid" , custid ),
                           new SqlParameter("@employeeid" , employeeid ),
                            new SqlParameter("@employeename" , employeename ),
                           new SqlParameter("@empgender" ,empGender ),
                            new SqlParameter("@contactno" , contactno ),

                    };

                
                   // result = SqlHelper.ExecuteNonQuery(Utility.GetConString, CommandType.StoredProcedure, "InsertCardno", prm);
                result = SqlHelper.ExecuteNonQuery(Utility.GetConString, CommandType.StoredProcedure, "InsertCardEmpInfo", prm);
            };

        }

        public FileResult DownloadRFIDExcel()
        {
           
            return new FilePathResult(Server.MapPath("/App_Data/Rfiddata.xlsx"), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        }
    }
}
