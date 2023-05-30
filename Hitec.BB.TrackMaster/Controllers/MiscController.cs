using Hitec.BB.TrackMaster.Helpers;
using Hitec.BB.TrackMaster.Models;
using Microsoft.ApplicationBlocks.Data;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Hitec.BB.TrackMaster.Controllers
{
    public class MiscController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult DownloadManual()
        {
            var files = GetFiles();
            return View(files);
        }

        public ActionResult AddTaxiUser()
        {
            return View();
        }



        [ActionName("AddServiceRequest")]
        public ActionResult AddServiceRequest()
        {
            return View("AddServiceRequest");
        }

        public ActionResult AddSubUser()
        {
            return View("AddSubUser");
        }

        [ActionName("ViewAllComplaint")]
        public ActionResult ViewAllComplaint()
        {
            return View("ViewAllComplaint");
        }
        [ActionName("AddDepartment")]
        public ActionResult AddDepartments()
        {
            return View("AddDepartments");
        }

        [ActionName("AddPrice")]
        public ActionResult AddPrice()
        {
            return View("AddPrice");
        }

        [ActionName("ResetPassword")]
        public ActionResult ResetPassword()
        {
            return View("ResetPassword");
        }

        #region Non-Methods
        public PartialViewResult _ReportFilter(string reportTitle)
        {
            ViewBag.ReportTitle = reportTitle;
            return PartialView("_ReportFilter");
        }
        public List<FileNames> GetFiles()
        {
            List<FileNames> lstFiles = new List<FileNames>();
            DirectoryInfo dirInfo = new DirectoryInfo(HostingEnvironment.MapPath("~/resources/Files"));
            int i = 0;
            foreach (var item in dirInfo.GetFiles())
            {
                lstFiles.Add(new FileNames() { FileId = i + 1, FileName = "blackbox installation mannual.pptx", FilePath = dirInfo.FullName + @"\" + "blackbox installation mannual.pptx" });
                i = i + 1;
            }
            return lstFiles;
        }
        public FileResult StartDownload()
        {
            var files = GetFiles();
            string filename = (from f in files select f.FilePath).First();
            string contentType = "application/pdf";
            return File(filename, contentType, "blackbox installation mannual.pptx");
        }
        public ActionResult auth(string client_id, string redirect_uri, string state)
        {
            ViewBag.uri = redirect_uri;
            ViewBag.state = state;
            return View();
        }

        [HttpPost]
        public ActionResult _auth(auth obj)
        {
            obj.code = "Hello";
            string res = string.Format("{0}?code={1}&state={2}", obj.url, obj.code, obj.state);
            return Redirect(res);
        }

        [HttpPost]
        public JsonResult exchangetoken(tokenReq obj)
        {
            token res = new token();
            if (obj.grant_type == "authorization_code")
            {
                res.token_type = "Bearer";
                res.access_token = "final";
                res.refresh_token = "refresh";
                res.expires_in = 60 * 60 * 24;
            }
            else
            {
                res.token_type = "Bearer";
                res.access_token = "tokenRefreshed";
                res.expires_in = 60 * 60 * 24;
            }
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult FulfillmentURL(IntentReq req)
        {
            if (req.inputs[0].intent == "action.devices.SYNC")
            {
                IntentRes res = new IntentRes();
                res.requestId = req.requestId; res.payload.agentUserId = "1836.15267389";

                Device device1 = new Device();
                device1.id = "abc"; device1.type = "action.devices.types.OUTLET";
                device1.traits.Add("action.devices.traits.OnOff");
                device1.name.defaultNames.Add("My Outlet abc");
                device1.name.name = "Night light"; device1.name.nicknames.Add("wall plug");
                device1.willReportState = true; device1.roomHint = "My room";
                device1.deviceInfo.manufacturer = "lights-out-inc"; device1.deviceInfo.model = "hs1234";
                device1.deviceInfo.hwVersion = "3.2"; device1.deviceInfo.swVersion = "11.4";
                device1.otherDeviceIds.Add(new OtherDeviceId { deviceId = "otherDeviceIds1" });
                device1.customData.fooValue = 74; device1.customData.barValue = true;
                device1.customData.bazValue = "foo";
                res.payload.devices.Add(device1);
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            else if (req.inputs[0].intent == "action.devices.QUERY")
            {
                string deviceid = req.inputs[0].payload.devices[0].id;
                bool status = (bool)SqlHelper.ExecuteScalar(Utility.GetConString, CommandType.StoredProcedure, "getDeviceonStatus", new SqlParameter("@deviceid", deviceid));
                QryIntentRes res = new QryIntentRes();
                res.requestId = req.requestId;
                res.payload = new QryPayload(); res.payload.devices = new Devices();
                res.payload.devices.abc = new abc(); res.payload.devices.abc.on = status;
                res.payload.devices.abc.online = true; res.payload.devices.abc.status = "SUCCESS";
                var json = JsonConvert.SerializeObject(res);json = json.Replace("abc", "xxx");
                return Content(json.ToString(), "application/json");
            }
            else if (req.inputs[0].intent == "action.devices.EXECUTE")
            {
                SqlParameter []param = new SqlParameter[]
                {
                    new SqlParameter("@deviceid", req.inputs[0].payload.commands[0].devices[0].id),
                    new SqlParameter("@status", req.inputs[0].payload.commands[0].execution[0].@params.on)
                };
                bool status = (bool)SqlHelper.ExecuteScalar(Utility.GetConString, CommandType.StoredProcedure, "updateDeviceonStatus", param);
                ExeIntentRes res = new ExeIntentRes();
                res.requestId = req.requestId;
                res.payload = new ExePayload();
                res.payload.commands = new List<ExeCommand>();
                ExeCommand execmd = new ExeCommand();
                execmd.ids = new List<string>(); execmd.ids.Add("abc");
                execmd.status = "SUCCESS"; execmd.states = new States();
                execmd.states.on = status; execmd.states.online = true;
                res.payload.commands.Add(execmd);
                return Json(res, JsonRequestBehavior.AllowGet);
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
    #endregion

    #region extrass
    public class Name
    {
        public Name()
        {
            defaultNames = new List<string>();
            nicknames = new List<string>();
        }
        public List<string> defaultNames { get; set; }
        public string name { get; set; }
        public List<string> nicknames { get; set; }
    }

    public class DeviceInfo
    {
        public string manufacturer { get; set; }
        public string model { get; set; }
        public string hwVersion { get; set; }
        public string swVersion { get; set; }
    }

    public class OtherDeviceId
    {
        public string deviceId { get; set; }
    }

    public class CustomData
    {
        public int fooValue { get; set; }
        public bool barValue { get; set; }
        public string bazValue { get; set; }
    }

    public class Device
    {
        public Device()
        {
            deviceInfo = new DeviceInfo();
            otherDeviceIds = new List<OtherDeviceId>();
            customData = new CustomData();
            traits = new List<string>();
            name = new Name();
        }
        public string id { get; set; }
        public string type { get; set; }
        public List<string> traits { get; set; }
        public Name name { get; set; }
        public bool willReportState { get; set; }
        public string roomHint { get; set; }
        public DeviceInfo deviceInfo { get; set; }
        public List<OtherDeviceId> otherDeviceIds { get; set; }
        public CustomData customData { get; set; }
    }

    public class SyncPayload
    {
        //public Payload()
        //{
        //    commands = new List<Command>();
        //}
        public string agentUserId { get; set; }
        public List<Device> devices { get; set; }
    }

    public class Payload
    {
        //public Payload()
        //{
        //    commands = new List<Command>();
        //}
        public string agentUserId { get; set; }
        public List<Device> devices { get; set; }
        public List<Command> commands { get; set; }
    }

    public class Command
    {
        public Command()
        {
            devices = new List<Device>();
            execution = new List<Execution>();
            states = new States();
            ids = new List<string>();
        }
        public List<string> ids { get; set; }
        public string status { get; set; }
        public States states { get; set; }
        public string errorCode { get; set; }
        public List<Device> devices { get; set; }
        public List<Execution> execution { get; set; }
    }

    public class States
    {
        public bool on { get; set; }
        public bool online { get; set; }
    }

    public class Params
    {
        public bool on { get; set; }
    }

    public class Execution
    {
        public Execution()
        {
            @params = new Params();
        }
        public string command { get; set; }
        public Params @params { get; set; }
    }

    public class IntentRes
    {
        public IntentRes()
        {
            payload = new SyncPayload();
            //payload.commands = new List<Command>();
            payload.devices = new List<Device>();
        }
        public string requestId { get; set; }
        public SyncPayload payload { get; set; }
    }


    public class Input
    {
        public string intent { get; set; }
        public Payload payload { get; set; }
    }

    public class IntentReq
    {
        public string requestId { get; set; }
        public List<Input> inputs { get; set; }
    }

    public class auth
    {
        public string url { get; set; }
        public string state { get; set; }
        public string code { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }

    public class tokenReq
    {
        public string client_id { get; set; }
        public string client_secret { get; set; }
        public string grant_type { get; set; }
        public string code { get; set; }
        public string redirect_uri { get; set; }
    }

    public class token
    {
        public string token_type { get; set; }
        public string access_token { get; set; }
        public string refresh_token { get; set; }
        public int expires_in { get; set; }
    }

    public class QryIntentRes
    {
        public string requestId { get; set; }
        public QryPayload payload { get; set; }
    }

    public class QryPayload
    {
        public Devices devices { get; set; }
    }

    public class abc
    {
        public bool on { get; set; }
        public bool online { get; set; }
        public string status { get; set; }
    }

    public class Devices
    {
        public abc abc { get; set; }
    }

    public class ExeIntentRes
    {
        public string requestId { get; set; }
        public ExePayload payload { get; set; }
    }

    public class ExeCommand
    {
        public List<string> ids { get; set; }
        public string status { get; set; }
        public States states { get; set; }
        public string errorCode { get; set; }
    }

    public class ExePayload
    {
        public List<ExeCommand> commands { get; set; }
    }


    #endregion
}
