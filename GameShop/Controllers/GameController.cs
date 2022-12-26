using GameShop.Models.DBConnection;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace GameShop.Controllers
{
    [Route("api/game")]
    [ApiController]
    public class GameController : Controller
    {
        private readonly ConString _conString;

        public GameController(ConString conection)
        {
            _conString = conection;

        }


        [Route("~/api/get_random_games")]
        [HttpPost]
        public JsonResult RandomGames()
        {

            try
            {
                var dbdata = _conString.Game.Where(data => data.ID > 0).ToList();

                int number = 0, difference = dbdata.Count - 5;

                if (difference > 0)
                {
                    Random rnd = new Random();


                    for (int index = 0; index < difference; index++)
                    {
                        number = rnd.Next(0, dbdata.Count);
                        dbdata.Remove(dbdata[number]);
                    }

                    return Json(dbdata);
                }
                else
                    return Json(dbdata);
            }
            catch
            {
                return Json("Error");
            }
        }

    }
}
