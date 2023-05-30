using System.Web.Mvc;

namespace Hitec.BB.TrackMaster.Areas.Galileo
{
    public class GalileoAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Galileo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Galileo_default",
                "Galileo/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
