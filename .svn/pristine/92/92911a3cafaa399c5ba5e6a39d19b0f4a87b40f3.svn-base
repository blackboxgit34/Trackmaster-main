using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Hitec.BB.TrackMaster.Models
{
    public static class Extensions
    {
        public static string StripHtml(this string input)
        {
            // Will this simple expression replace all tags???
            var tagsExpression = new Regex(@"</?.+?>");
            return tagsExpression.Replace(input, " ");
        }
    }
}