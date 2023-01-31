using GameShop.Models;
using GameShop.Models.DBConnection;
using GameShop.Models.TempClasses;
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
        public JsonResult GetGameCommentary(TempGamesCommentary tempgamescomment)
        {

            try
            {

                var commentary = _conString.GamesCommentary.Where(data => data.GameName == tempgamescomment.GameName)
                         .OrderByDescending(data => data.ID).Take(tempgamescomment.number_displaying_comment).ToList();

                return Json(commentary);
            }
            catch
            {


                return Json("No commentary for this game");
            }
        }

        [Route("~/api/get_number_of_commentary")]
        [HttpPost]
        public JsonResult GetNumberOfCommentary(TempGamesCommentary tempgamescomment)
        {

            try
            {

                var commentary = _conString.GamesCommentary.Where(data => data.GameName == tempgamescomment.GameName).ToList();

                return Json(commentary.Count);
            }
            catch (Exception exception)
            {


                return Json(exception);
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
