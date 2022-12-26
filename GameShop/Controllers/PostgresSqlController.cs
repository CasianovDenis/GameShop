using GameShop.Models;
using GameShop.Models.DBConnection;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace GameShop.Controllers
{
    [Route("api/PostgresSQL")]
    [ApiController]
    public class PostgresSqlController : Controller
    {

        private readonly ConString _conString;

        public PostgresSqlController(ConString conection)
        {
            _conString = conection;

        }

        [Route("~/api/upload_data")]
        [HttpPost]
        public JsonResult InsertDataFromField(Game game)
        {

            try
            {

                var dbdata = _conString.Game.Single(data => data.Game_name == game.Game_name);

                return Json("Game exist");
            }
            catch
            {
                _conString.Game.Add(game);
                _conString.SaveChanges();

                return Json("Succes");
            }
        }




    }
}
