using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Hitec.BB.TrackMaster.Models;

namespace Hitec.BB.Entities
{
    public class OverSpeedAnalysisEx
    {
        public string bbid { get; set; }
        public int custid { get; set; }
        public string vehname { get; set; }
        public int overspeedCount { get; set; }
        public int overspeedLimit { get; set; }
    }

    public class OverSpeedReport
    {
        public List<OverSpeedAnalysisEx> vehicleList { get; set; }
        public ReportSearchModel reportSearchObj { get; set; }
    }

    public class OverSpeedAnalysis
    {
        private string dateTime;
        public string DateTime
        {
            get
            {
                if (!String.IsNullOrEmpty(dateTime))
                {
                    return Convert.ToDateTime(dateTime).ToString("dd-MMM-yyyy hh:mm:ss tt");
                }
                return dateTime;
            }
            set
            {
                dateTime = value;
            }
        }
        public string Location { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string Speed { get; set; }
        public string VehicleName { get; set; }
        public string TotalDistance { get; set; }
        public string ReportDate { get; set; }
        public int Overspeed { get; set; }
        public int OverSpeedLimit { get; set; }
        public string BBID { get; set; }
        public string OverSpeedCount { get; set; }
        public string MaxOverSpeed { get; set; }


    }
}
