using GameShop.Models;
using System.Net;
using System.Net.Mail;

namespace PasswordManager.Models
{
    public class SendOrder
    {
        public SendOrder(TempData temp)
        {
            //Send email which contain order data
            SmtpClient Smtp = new SmtpClient("smtp.mail.ru", 587);
            Smtp.EnableSsl = true;
            Smtp.Credentials = new NetworkCredential("email@gmail.com", "password");//real email and password
                                                                                    //was hide
            MailMessage Message = new MailMessage();
            Message.From = new MailAddress("email@gmail.com");//real email was hide

            Message.To.Add(new MailAddress(temp.Email));
            Message.Subject = "Game Shop Receipt";
            Message.Body = "Game Shop : " + "\n" +
                "You Order : " + temp.TempGameName + "\n " +
                "Game Price : " + temp.GamePrice + "$" + "\n" +
                "Activation Code : " + temp.GameCode + "\n"
                 + "Use this code for activation game in Epic Games";

            Smtp.Send(Message);
        }
    }
}
