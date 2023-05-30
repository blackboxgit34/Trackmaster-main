using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hitec.BB.TrackMaster.Models
{
    #region DispatchedVehicleStatus : gaurav 10/102016
    public class DispatchedVehicleStatus
    {
        public PPVehicleActivities ppVehicleActivites { get; set; }
        public List<MasterLiveStatus> ObjMasterLiveStatus { get; set; }
    }
    public class PPVehicleActivities
    {
        public string VehicleName { get; set; }
        public string Location { get; set; }
        public string EndLocation { get; set; }
        public string remarks { get; set; }
        public string BBID { get; set; }
        public int userId { get; set; }
        public Boolean IsDispatched { get; set; }
        public string StartLocationLat { get; set; }
        public string StartLocationLong { get; set; }
        public string EndLocationLat { get; set; }
        public string EndLocationLong { get; set; }
        public string ClosedRemarks { get; set; }

        public string mobileNumber { get; set; }
        public string smsText { get; set; }

    }
    public class MasterLiveStatus : IEntity<string>, IBlackBoxBase
    {
        public string MasterName { get; set; }
        public string Sno { get; set; }
        public string DriverName { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public int Speed { get; set; }
        public string Location { get; set; }
        public int PageCount { get; set; }
        // public DateTime DateTime { get; set; }
        //public DateTime DateTime { get; set; }
        private string dateTime;
        public string DateTime
        {
            get
            {
                if (!String.IsNullOrEmpty(dateTime))
                {
                    return Convert.ToDateTime(dateTime).ToString(HitecConfig.DateTimeFormat12Hour);
                }
                return dateTime;
            }
            set
            {
                dateTime = value;
            }
        }
        public double Distance { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Status { get; set; }
        public string ProgressStatus { get; set; }
        public string ID { get; set; }
        private string vehicleName;
        public string VehicleName
        {
            get { return vehicleName.StripHtml(); }
            set { vehicleName = value; }
        }
        public string BBID { get; set; }
        public string VehicleRegNo { get; set; }
        public string gpsTooltip { get; set; }
        public string batteryTooltip { get; set; }
        public string batteryText { get; set; }
        public string gpsText { get; set; }
        public string antenaTooltip { get; set; }
        public string antenaText { get; set; }
        public int FuelActive { get; set; }
        public int DemoVehcile { get; set; }
        public string VehcileStatus { get; set; }
        public int SimDisconnect { get; set; }
        public int LidStatus { get; set; }
        //Gaurav
        public Boolean IsDispatched { get; set; }
        public string RemarksPP { get; set; }
        public string StartLocation { get; set; }
        public string EndLocation { get; set; }
        public Boolean ReachedStatus { get; set; }

        //Start: Added by Jasmine to merge live status and master live status
        public string IsReadyToGo { get; set; }
        public string VIcon { get; set; }
        public string VIconName { get; set; }
        public string zoneName { get; set; }
        public string StatusCode { get; set; }
        public string AuxCode { get; set; }
        public string vehTypeCode { get; set; }
        //End: Added by Jasmine to merge live status and master live status
    }
    #endregion
}