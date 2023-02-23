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
        public JsonResult AddGameCommentary(CommentaryData commentAuthorization)
        {

            try
            {
                var user_data = _conString.Users.Single(data => data.Username == commentAuthorization.Username);

                if (user_data.Authorization_token == commentAuthorization.AuthorizationToken)
                {
                    GamesCommentary gamecomment = new GamesCommentary
                    {
                        Username = commentAuthorization.Username,
                        Commentary = commentAuthorization.Commentary,
                        GameName = commentAuthorization.GameName
                    };

                    _conString.Add(gamecomment);
                    _conString.SaveChanges();

                    return Json("Commentary added succesfully");
                }

                return Json("Incorrect authorization token");

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

        [Route("~/api/update_user_comment")]
        [HttpPut]
        public JsonResult UpdateUserComment(CommentaryData newcomment)
        {

            try
            {
                var oldcomment = _conString.GamesCommentary.Single(data => data.ID == newcomment.ID);

                var user_data = _conString.Users.Single(data => data.Username == newcomment.Username);

                if (user_data.Authorization_token == newcomment.AuthorizationToken)
                {

                    oldcomment.Commentary = newcomment.Commentary;

                    _conString.Update(oldcomment);
                    _conString.SaveChanges();

                    return Json("Commentary edited successfully");
                }
                else
                    return Json("Incorrect authorization token");
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }
    }
}
