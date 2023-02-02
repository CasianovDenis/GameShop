using Braintree;
using GameShop.Interfaces;
using GameShop.Models;
using GameShop.Models.DBConnection;
using GameShop.Models.Purchase;
using Microsoft.AspNetCore.Mvc;
using PasswordManager.Models;
using System;
using System.Linq;

namespace GameShop.Controllers
{
    [Produces("application/json")]
    [Route("api/Purchase")]
    [ApiController]
    public class PurchaseController : Controller
    {
        private readonly ConString _conString;
        private readonly IBraintreeService _braintreeService;


        public PurchaseController(ConString conection, IBraintreeService braintreeService)
        {
            _conString = conection;
            _braintreeService = braintreeService;


        }



        [Route("~/api/client_token")]
        [HttpGet]
        public JsonResult GenerateTocken()
        {

            try
            {

                var gateway = _braintreeService.GetGateway();
                var clientToken = gateway.ClientToken.Generate();  //Genarate a token


                return Json(clientToken);
            }
            catch
            {
                return Json("Not work");
            }

        }

        [Route("~/api/guest_buying_game")]
        [HttpPost]
        public JsonResult Guest_Buying_Game(GamePurchase game)
        {
            try
            {

                var gateway = _braintreeService.GetGateway();

                var customer = new CustomerRequest
                {
                    FirstName = game.FirstName,
                    LastName = game.LastName
                };

                var request = new TransactionRequest
                {

                    Customer = customer,
                    ProductSku = game.Game_name,
                    Amount = Convert.ToDecimal(game.Price),
                    PaymentMethodNonce = game.Nonce,

                    Options = new TransactionOptionsRequest
                    {
                        SubmitForSettlement = true
                    }
                };

                Result<Transaction> result = gateway.Transaction.Sale(request);



                TempData temp = new TempData();

                temp.TempGameName = game.Game_name;
                temp.GamePrice = game.Price;
                temp.Email = game.Email;
                temp.GameCode = RandomString(16);

                SendOrder sendmessage = new SendOrder(temp);

                return Json("Succes");

            }
            catch
            {

                return Json("Failure");
            }

        }

        [Route("~/api/user_buying_game")]
        [HttpPost]
        public JsonResult User_Buying_Game(GamePurchase game)
        {
            try
            {

                var gateway = _braintreeService.GetGateway();

                var customer = new CustomerRequest
                {
                    FirstName = game.FirstName
                };

                var request = new TransactionRequest
                {

                    Customer = customer,
                    ProductSku = game.Game_name,
                    Amount = Convert.ToDecimal(game.Price),
                    PaymentMethodNonce = game.Nonce,

                    Options = new TransactionOptionsRequest
                    {
                        SubmitForSettlement = true
                    }
                };

                Result<Transaction> result = gateway.Transaction.Sale(request);


                UserPurchases userpurchases = new UserPurchases();

                userpurchases.Username = game.FirstName;
                userpurchases.Game_name = game.Game_name;
                userpurchases.KeyOfGame = RandomString(16);

                _conString.UserPurchases.Add(userpurchases);
                _conString.SaveChanges();

                return Json("Succes");

            }
            catch
            {

                return Json("Failure");
            }

        }


        public static string RandomString(int length)
        {
            Random random = new Random();

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }

}
