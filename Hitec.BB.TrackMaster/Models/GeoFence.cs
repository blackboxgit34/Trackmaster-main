using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Hitec.BB.TrackMaster.Models

{

    public  class MessageBox
    {
        public bool Show { get; set; }

    }
    public  class GeoFenceViolationsML:MessageBox
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public String BBID { get; set; }
        public int custid { get; set; }
        public int geoalert_id { get; set; }
        public String location { get; set; }
        public String geotime { get; set; }
        public String fencestatus { get; set; }
        public String vehname { get; set; }
        public String DriverName { get; set; }
        public int speed { get; set; }
        public decimal lat { get; set; }
        public decimal longi {get;set;}

    }
}
