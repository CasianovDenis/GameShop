using Braintree;
using GameShop.Interfaces;
using GameShop.Models.DBConnection;
using GameShop.Models.Purchase;
using Microsoft.AspNetCore.Mvc;
using System;

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
        [HttpPost]
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

        [Route("~/api/purchase")]
        [HttpPost]
        public JsonResult PurchaseGame(GamePurchase game)
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
                    //price need to make dynamic
                    Customer = customer,
                    ProductSku = game.Game_name,
                    Amount = Convert.ToDecimal("250"),
                    PaymentMethodNonce = game.Nonce,

                    Options = new TransactionOptionsRequest
                    {
                        SubmitForSettlement = true
                    }
                };

                Result<Transaction> result = gateway.Transaction.Sale(request);


                return Json("Succes");

            }
            catch
            {

                return Json("Failure");
            }

        }

    }
}
