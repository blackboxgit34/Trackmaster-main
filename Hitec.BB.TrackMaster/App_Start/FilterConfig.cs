using System.Web;
using System.Web.Mvc;

namespace Hitec.BB.TrackMaster
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}