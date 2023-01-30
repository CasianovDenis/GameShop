using GameShop.Models;
using GameShop.Models.DBConnection;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace GameShop.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class GamesCommentaryController : Controller
    {
        private readonly ConString _conString;

        public GamesCommentaryController(ConString conection)
        {
            _conString = conection;

        }

        [Route("~/api/get_game_commentary")]
        [HttpPost]
        public JsonResult GetGameCommentary(GamesCommentary gamescomment)
        {

            try
            {

                var commentary = _conString.GamesCommentary.Where(data => data.GameName == gamescomment.GameName).OrderByDescending(data => data.ID).ToList();

                return Json(commentary);
            }
            catch
            {


                return Json("No commentary for this game");
            }
        }

        [Route("~/api/add_game_commentary")]
        [HttpPost]
        public JsonResult AddGameCommentary(GamesCommentary gamescomment)
        {

            try
            {

                _conString.Add(gamescomment);
                _conString.SaveChanges();

                return Json("Commentary added succesfully");

            }
            catch (Exception exception)
            {
                return Json(exception);
            }
        }
    }
}
