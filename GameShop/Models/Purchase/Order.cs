using System.Net;
using System.Net.Mail;

namespace GameShop.Models.Purchase
{
    public class Order
    {
        public string Email { get; set; }
        public string GameCode { get; set; }

        public static void SendOrder(Game game, Order order)
        {

            SmtpClient Smtp = new SmtpClient("smtp.mail.ru", 587);
            Smtp.EnableSsl = true;
            Smtp.Credentials = new NetworkCredential("email@mail.ru", "password");//real email and password
                                                                                  //was hide
            MailMessage Message = new MailMessage();
            Message.From = new MailAddress("email@mail.ru");//real email was hide

            Message.To.Add(new MailAddress(order.Email));
            Message.Subject = "Game Shop Receipt";
            Message.Body = "Game Shop : " + "\n" +
                "You Order : " + game.Game_name + "\n " +
                "Game Price : " + game.Price + "$" + "\n" +
                "Activation Code : " + order.GameCode + "\n"
                 + "Use this code for activation game in Epic Games";

            Smtp.Send(Message);
        }
    }
}
