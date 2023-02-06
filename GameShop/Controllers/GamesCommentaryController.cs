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


        [HttpGet("~/api/get_game_commentary/{GameName}/{number_displaying_comment}")]
        public JsonResult GetGameCommentary(string GameName, int number_displaying_comment)
        {

            try
            {

                var commentary = _conString.GamesCommentary.Where(data => data.GameName == GameName)
                         .OrderByDescending(data => data.ID).Take(number_displaying_comment).ToList();

                return Json(commentary);
            }
            catch
            {


                return Json("No commentary for this game");
            }
        }


        [HttpGet("~/api/get_number_of_commentary/{GameName}")]
        public JsonResult GetNumberOfCommentary(string GameName)
        {

            try
            {

                var commentary = _conString.GamesCommentary.Where(data => data.GameName == GameName).ToList();

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

        [Route("~/api/delete_game_commentary")]
        [HttpDelete]
        public JsonResult DeleteGameCommentary(ModeratorDeleteCommentary deletecomment)
        {

            try
            {
                var moderator = _conString.Users.Single(data => data.Username == deletecomment.ModeratorName);

                if (moderator.Rights_token == deletecomment.Rights_token)
                {
                    var comment = _conString.GamesCommentary.Single(data => data.ID == deletecomment.ID);

                    _conString.Remove(comment);
                    _conString.SaveChanges();

                    return Json("Commentary deleted succesfully");
                }
                return Json("Incorrect rights token");
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}
