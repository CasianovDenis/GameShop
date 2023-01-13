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
            Smtp.Credentials = new NetworkCredential("kasyanov_2001@mail.ru", "VnpsqpHSY8pysJn7Lmum");//real email and password
                                                                                                      //was hide
            MailMessage Message = new MailMessage();
            Message.From = new MailAddress("kasyanov_2001@mail.ru");//real email was hide

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
