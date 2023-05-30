using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Mvc;
using Hitec.BB.Data.Abstraction;
using Hitec.BB.Data.Repositories;
using Hitec.BB.Entities;

namespace Hitec.BB.API.Controllers
{
    public class InvoiceAPIController : System.Web.Http.ApiController
    {
        #region variables
        public IInvoiceRepository invoiceRepositoryIF = null;
        #endregion

        #region ctor
        public InvoiceAPIController()
        {
            invoiceRepositoryIF = new InvoiceRepository();
        }
        #endregion

        #region Account Summary
        [AcceptVerbs("GET")]
        [ActionName("AccountSummary")]
        public HttpResponseMessage GetAccountSummary(int CustId,
            int sEcho, int iDisplayStart, int iDisplayLength, int iSortCol_0, string sSortDir_0)
        {
            // get data
            InvoiceEx modelObj = new InvoiceEx();
            modelObj = invoiceRepositoryIF.GetBillPlansAll_2013_14_2(CustId);
            if (modelObj != null)
            {

                return this.Request.CreateResponse(HttpStatusCode.OK, new
                {
                    sEcho = sEcho,
                    iTotalRecords = modelObj.Count,
                    iTotalDisplayRecords = modelObj.Count,
                    aaData = modelObj.objInvoice
                });

            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
        }


        [AcceptVerbs("GET")]
        [ActionName("AccountSummaryOld")]
        public HttpResponseMessage GetAccountSummaryOld(int CustId,
            int sEcho, int iDisplayStart, int iDisplayLength, int iSortCol_0, string sSortDir_0)
        {
            InvoiceEx modelObj = new InvoiceEx();
            modelObj = invoiceRepositoryIF.GetBillPlansAll_2013_14(CustId);
            if (modelObj != null)
            {

                return this.Request.CreateResponse(HttpStatusCode.OK, new
                {
                    sEcho = sEcho,
                    iTotalRecords = modelObj.Count,
                    iTotalDisplayRecords = modelObj.Count,
                    aaData = modelObj.objInvoice
                });

            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
        }
        #endregion

        #region Bill Summary
        [AcceptVerbs("GET")]
        [ActionName("BillSummary")]
        public HttpResponseMessage GetBillSummary(string BillNo, int CustID, string BillPeriodID, string FromDate )
        {
           
            SubsBill modelObj = new SubsBill();
            BillDetails details = new BillDetails();
            details.BillNo = BillNo;
            details.CustID = CustID;
            details.BillPeriodID = BillPeriodID;
            details.FromDate = FromDate;
            modelObj = invoiceRepositoryIF.GetSubsBill2013_14_2(details);
            if (modelObj != null)
            {
                return this.Request.CreateResponse(HttpStatusCode.OK, modelObj);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
        }


        [AcceptVerbs("GET")]
        [ActionName("BillSummaryOld")]
        public HttpResponseMessage GetBillSummaryOld(string BillNo, int CustID, string BillPeriodID, string FromDate)
        {
            
            SubsBill modelObj = new SubsBill();
            
            BillDetails details = new BillDetails();
            details.BillNo = BillNo;
            details.CustID = CustID;
            details.BillPeriodID = BillPeriodID;
            details.FromDate = FromDate;
            modelObj = invoiceRepositoryIF.GetSubsBill2013_14(details);
            if (modelObj != null)
            {
                return this.Request.CreateResponse(HttpStatusCode.OK, modelObj);
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
        }
        #endregion

        [AcceptVerbs("GET")]
        [ActionName("GetBillDetails")]
        public HttpResponseMessage GetBillDetails(int CustID, string BillPeriodID, string FromDate,
            int sEcho, int iDisplayStart, int iDisplayLength, int iSortCol_0, string sSortDir_0)
        {
          
            BillDetails obj = new BillDetails();
            obj.CustID = CustID;
            obj.BillPeriodID = BillPeriodID;
            obj.FromDate = FromDate;
            obj.Standard =true;
            SubsBillDetailEx modelObj = invoiceRepositoryIF.GetSubsBillDetails2013_14(obj);
            if (modelObj != null)
            {
                return this.Request.CreateResponse(HttpStatusCode.OK, new
                {
                    sEcho = sEcho,
                    iTotalRecords = modelObj.objbilldetail.Count,
                    iTotalDisplayRecords = modelObj.objbilldetail.Count,
                    aaData = modelObj.objbilldetail
                });
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }
            
        }



        [AcceptVerbs("GET")]
        [ActionName("GetBillDetailsOld")]
        public HttpResponseMessage GetBillDetailsOld(int CustID, string BillPeriodID,string FromDate,
            int sEcho, int iDisplayStart, int iDisplayLength, int iSortCol_0, string sSortDir_0)
        {          
            BillDetails obj = new BillDetails();
            obj.CustID = CustID;
            obj.BillPeriodID = BillPeriodID;
            obj.FromDate = FromDate;
            obj.Standard = true;
            SubsBillDetailEx modelObj = invoiceRepositoryIF.GetSubsBillDetails2013_14(obj);
            if (modelObj != null)
            {
                return this.Request.CreateResponse(HttpStatusCode.OK, new
                {
                    sEcho = sEcho,
                    iTotalRecords = modelObj.objbilldetail.Count,
                    iTotalDisplayRecords = modelObj.objbilldetail.Count,
                    aaData = modelObj.objbilldetail
                });
            }
            else
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }

        }






    }
}
