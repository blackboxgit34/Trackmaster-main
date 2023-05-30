using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hitec.BB.TrackMaster.Models
{
    using System.ComponentModel.DataAnnotations;

    interface IBlackBoxBase
    {
        [Required]
        string BBID { get; set; }
        string VehicleName { get; set; }
        string VehicleRegNo { get; set; }
    }
}