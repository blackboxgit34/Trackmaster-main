using Hitec.BB.TrackMaster.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class FmsController : Controller
    {
        #region Service Reminder
        public ActionResult ServiceReminders()
        {
            return View();
        }
        public ActionResult AddServiceSchedule(int? ssid)
        {
            if (ssid == null)
            {
                ssid = 0;
                ViewBag.Title = "Add Service Reminder";
            }
            else
            {
                ViewBag.Title = "Edit Service Reminder";
            }
            ViewBag.SSID = ssid;
            return View();
        }
        #endregion

        #region Employee
        public ActionResult ManageEmployee()
        {
            return View();
        }
        public ActionResult BBManageEmployee()
        {
            return View();
        }

        public ActionResult AddEmployee()
        {
            return View();
        }
        public ActionResult bbAddEmployee()
        {
            return View();
        }

        public ActionResult AddConductor()
        {
            return View();
        }
        #endregion

        #region Renewal Reminder, Jasmine
        public ActionResult RenewalReminder()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddUpdateRenewalReminder(int? renewalID)
        {
            RenewalReminder modelObj = new RenewalReminder();

            ViewBag.Title = "Update Vehicle Document Renewal Reminder";

            ViewBag.vehicleId = renewalID;

            return View(modelObj);
        }

        public ActionResult AddRenewalReminder(int? vehicleId)
        {
            ViewBag.Title = "Add Vehicle Renewal Reminder";

            if (vehicleId == null)
                vehicleId = 0;

            ViewBag.Vehicleid = vehicleId;

            return View();
        }

        #endregion

        #region Manage Vendor/Supplier
        public ActionResult ManageVendor()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddUpdateVendor(int? VendorID)
        {
            if (VendorID == null)
            {
                ViewBag.Title = "Add Supplier";
            }
            else
            {
                ViewBag.Title = "Update Supplier";

            }

            ViewBag.VendorID = VendorID;

            return View();
        }
        #endregion

        #region Master Trip
        public ActionResult MasterTrip()
        {
            return View();
        }

        public ActionResult AddMasterTrip()
        {
            return View();
        }
        #endregion

        #region Trip
        public ActionResult TripInfo()
        {
            return View();
        }
        public ActionResult AddTrip()
        {
            return View();
        }

        #endregion

        #region Customer
        public ActionResult ManageCustomer()
        {
            return View();
        }
        public ActionResult AddCustomer()
        {
            return View();
        }
        #endregion

        #region Tyre Management
        public ActionResult TyreInventory()
        {
            return View();
        }
        public ActionResult AddTyreInventory()
        {
            return View();
        }

        public ActionResult TyreFitting()
        {
            return View();
        }

        public ActionResult AddTyreFitting(int? vehicleId)
        {
            if (vehicleId == null)
                vehicleId = 0;

            ViewBag.Vehicleid = vehicleId;
            return View();
        }

        public ActionResult TyreDisposal()
        {
            return View();
        }
        public ActionResult AddTyreDisposal(int? vehicleId)
        {
            if (vehicleId == null)
                vehicleId = 0;

            ViewBag.Vehicleid = vehicleId;
            return View();
        }
        #endregion

        #region Update/Remove File
        [HttpPost]
        public JsonResult UploadFile(string path)
        {
            string _imgname = string.Empty;
            string _path = string.Empty;
            string localpath = string.IsNullOrEmpty(path) ? "/FMSAttachments/" : path;
            if (System.Web.HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var pic = System.Web.HttpContext.Current.Request.Files["MyImages"];
                if (pic.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(pic.FileName);
                    _imgname = Guid.NewGuid().ToString() + '_' + fileName;
                    _path = Server.MapPath(localpath) + _imgname;
                    localpath += _imgname;
                    pic.SaveAs(_path);
                }
            }
            var result = new { imgName = _imgname, imgPath = _path };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public JsonResult RemoveDocument(string DocumentPath)
        {
            bool result = false;
            string fullPath = Request.MapPath(DocumentPath);
            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
                result = true;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Repair/Maintenance Management
        public ActionResult ManageRepairMaintenance()
        {
            return View();
        }

        public ActionResult AddRepairMaintenance(int? vehicleId)
        {
            if (vehicleId == null)
                vehicleId = 0;

            ViewBag.Vehicleid = vehicleId;
            return View();
        }
        public ActionResult UploadImageControl()
        {
            
            return View();
        }

        
        public ActionResult AddUpdateRepairMaintenance()
        {
            return View();
        }
        #endregion

        #region Fuel Management
        public ActionResult ManageFuel()
        {
            return View();
        }
        public ActionResult AddFuel(int? vehicleId)
        {
            if (vehicleId == null)
                vehicleId = 0;

            ViewBag.Vehicleid = vehicleId;

            return View();
        }

        #endregion

        #region Vehicle, By Jasmine 06 Feb, 2017
        public ActionResult ManageVehicles()
        {
            ViewBag.Title = "Manage Vehicles";
            return View();
        }

        public ActionResult AddEditVehicles()
        {
            return View();
        }

        public ActionResult RemarkPage()
        {
            return View();
        }

        public ActionResult ManageConductor()
        {

            return View();

        }
        public ActionResult ManageCrew()
        {
            return View();
        }
        public ActionResult Managelog()
        {
            return View();
        }
        public PartialViewResult GetDriverChangePartialView(string bbid, string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = bbid;
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_ChangeDriverName");
        }

        public PartialViewResult GetConductorChangePartialView(string bbid, string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = bbid;
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_ChangeCondutorName");
        }

   public PartialViewResult VehicleRemarksPartialView(string bbid, string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = bbid;
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_VehicleRemarks");
        }

   public PartialViewResult ReplyVehicleRemarksPartialView(string bbid, string VehicleId, string vehicleName, int custid)
   {
       ViewBag.custid = null;
       ViewBag.bbid = null;
       ViewBag.vehicleName = null;
       ViewBag.VehicleId = null;

       ViewBag.custid = custid;
       ViewBag.bbid = bbid;
       ViewBag.vehicleName = vehicleName;
       ViewBag.VehicleId = VehicleId;

       return PartialView("_VehicleRemarks");
   }
   public PartialViewResult FuelRemarksPartialView()
   {
       ViewBag.custid = null;
       ViewBag.bbid = null;
       ViewBag.vehicleName = null;
       ViewBag.VehicleId = null;

      

       return PartialView("_VehicleRemarks");
   }
        

        public PartialViewResult GettrackingtimeChangePartialView(string bbid, string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = bbid;
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_ChangeTrackingTime");
        }


        public PartialViewResult GetRoutetimePartialView( string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = "Boxid";
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_ChangeRouteTime");
        }

        public PartialViewResult GetDriverPartialView(string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = "Boxid";
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_ChangeDriver");
        }

        public PartialViewResult GetConductorPartialView(string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = "Boxid";
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_ChangeConductor");
        }


        public PartialViewResult GetAdvancedRouteDetails(string VehicleId, string vehicleName, int custid)
        {
            ViewBag.custid = null;
            ViewBag.bbid = null;
            ViewBag.vehicleName = null;
            ViewBag.VehicleId = null;

            ViewBag.custid = custid;
            ViewBag.bbid = "Boxid";
            ViewBag.vehicleName = vehicleName;
            ViewBag.VehicleId = VehicleId;

            return PartialView("_AdvancedRouteTiming");
        }
        #endregion

        #region upload multiple file plugin :Amit
        public class DocInfo
        { 
         public string Name { get; set; }
         public string fullPath { get; set; }
        }

        [HttpPost]
        public JsonResult UploadMyFiles()
        {
            List<DocInfo> docList = new List<DocInfo>();
            try
            {

                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var myFile = Request.Files[i];
                    DocInfo dc = new DocInfo();
                    if (myFile != null && myFile.ContentLength != 0)
                    {
                        string guid = Guid.NewGuid().ToString();
                        var filename = guid.Substring(guid.Length - 4) + "_" + myFile.FileName;
                        string pathTodisplay = "/FMSAttachments/" + filename;
                        string pathForSaving = Server.MapPath("~/FMSAttachments");
                        if (this.CreateFolderIfRequired(pathForSaving))
                        {
                            myFile.SaveAs(Path.Combine(pathForSaving, filename));
                            docList.Add(new DocInfo() { Name = filename, fullPath = pathTodisplay });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                docList.Add(new DocInfo() { Name = ex.Message, fullPath = ex.Message });

                return Json(docList, JsonRequestBehavior.AllowGet);
               
            }
            return Json(docList, JsonRequestBehavior.AllowGet);
        }

        private bool CreateFolderIfRequired(string path)
        {
            bool result = true;
            if (!Directory.Exists(path))
            {
                try
                {
                    Directory.CreateDirectory(path);
                }
                catch (Exception)
                {
                    result = false;
                }
            }
            return result;
        }
        #endregion upload plugin

        #region Manage Driver Documents, Jasmine
        public ActionResult ManageDriverDocs()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddEditDriverDocs(int? DriverId)
        {
            if (DriverId == null)
            {
                ViewBag.Title = "Add Driver Docs";
            }
            else
            {
                ViewBag.Title = "Update Driver Docs";

            }

            ViewBag.DriverId = DriverId;

            return View();
        }
        #endregion

        #region Add / Manage Orders

        public ActionResult OrderBooking()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddUpdateOrders(int? BookingId)
        {
            if (BookingId != null) ViewBag.BookingId = BookingId;
            return View();
        }

        #endregion 


        #region Parts Inventory
        public ActionResult reducePartsInventory()
        {
            return View("_FMSReducePartsInventory");
        }
        public ActionResult addUpdatePartsInventory(int? PartID)
        {
            if (PartID != null) ViewBag.PartID = PartID;
            return View("_FMSAddUpdatePartsInventory");
        }
        public ActionResult addUpdateParts(int? PartId)
        {
            if (PartId != null) ViewBag.PartID = PartId;
            return View();
        }
        public ActionResult ManageParts()
        {
            return View();
        }

        public ActionResult FMSGraphs()
        {
            return View();
        }
        #endregion

        public PartialViewResult CheckPassword(int custid)
        {
            ViewBag.custid = null;
            ViewBag.custid = custid;

            return PartialView("_CheckPassword");
        }
         [NoDirectAccess]
        public ActionResult SetNotificationAlert()
        {
            return View();
        }

        #region NTMManageVehicles : Gaurav( for driver assign to vehicle)
         [NoDirectAccess]
        public ActionResult NTMManageVehicles()
        {
            return View();
        }
        #endregion


         #region ETMManage
         public ActionResult ManageETM()
         {
             return View();
         }

         public PartialViewResult GetETMChange(string custid)
         {
             return PartialView("_GetETMChange");
         }
         #endregion
    }
}
