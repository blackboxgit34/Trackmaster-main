using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace Hitec.BB.TrackMaster.Helpers
{
    public class Sendmail
    {
        public static bool SendEmail(string Remark, string MailAdd, string FilePath)
        {
            try
            {
                MailMessage mm = new MailMessage("blackboxhitec@gmail.com", MailAdd);
                mm.CC.Add("bhanu@blackboxgps.net");
                mm.Subject = "File Status";
                mm.Body = string.Format("Hi ,<br /><br />" + Remark + "<br /><br />Thank You.");
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();

                FilePath = AppDomain.CurrentDomain.BaseDirectory + FilePath.Replace("../..//", "");
                if (File.Exists(FilePath))
                {
                    System.Net.Mail.Attachment attachment;
                    attachment = new System.Net.Mail.Attachment(FilePath);
                    mm.Attachments.Add(attachment);
                }

                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential();
                NetworkCred.UserName = "blackboxhitec@gmail.com";
                NetworkCred.Password = "Blackbox4321";
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = 587;
                smtp.Send(mm);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}