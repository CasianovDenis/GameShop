using GameShop.Models;
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

        [Route("~/api/add_game_in_db")]
        [HttpPost]
        public JsonResult AddGame(ModeratorAddGame moderator)
        {

            try
            {

                var dbdata = _conString.Game.Single(data => data.Game_name == moderator.Game_name);

                return Json("Game exist");
            }
            catch
            {

                var rights = _conString.Users.Single(data => data.Username == moderator.ModeratorName);

                if (rights.Rights_token == moderator.Rights_token)
                {
                    Game game = new Game();

                    game.Game_name = moderator.Game_name;
                    game.Price = moderator.Price;
                    game.Description = moderator.Description;
                    game.Currency = moderator.Currency;
                    game.Cover = moderator.Cover;

                    _conString.Game.Add(game);
                    _conString.SaveChanges();

                    return Json("Succes");

                }


                return Json("Incorrect admin token");
            }
        }

        [Route("~/api/get_random_games")]
        [HttpGet]
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

        [Route("~/api/get_new_games")]
        [HttpGet]
        public JsonResult NewGames()
        {

            try
            {
                var dbdata = _conString.Game.Where(data => data.ID > 0).OrderBy(data => data.ID).ToList();


                if (dbdata.Count >= 6)
                {


                    int range = dbdata.Count - 5;

                    for (int index = 0; index < range; index++)
                    {

                        dbdata.Remove(dbdata[0]);


                    }

                    return Json(dbdata);
                }
                return Json(dbdata);
            }
            catch
            {
                return Json("Error");
            }
        }



        [HttpGet("~/api/get_game/{GameName}")]
        public JsonResult GetGame(string GameName)
        {

            try
            {
                var dbdata = _conString.Game.Single(data => data.Game_name == GameName);


                return Json(dbdata);


            }
            catch
            {
                return Json("Game not found");
            }
        }

        [Route("~/api/get_all_games")]
        [HttpGet]
        public JsonResult GetAllGames()
        {

            try
            {

                var dbdata = _conString.Game.Where(data => data.ID > 0).ToList();

                return Json(dbdata);

            }
            catch
            {
                return Json("Error");
            }
        }


        [HttpGet("~/api/get_latest_purchased_game/{Username}")]
        public JsonResult GetLatestPurchasedGame(string Username)
        {

            try
            {

                var latest_purchased = _conString.UserPurchases.Where(data => data.Username == Username).OrderByDescending(data => data.ID).ToList();

                var dbdata = _conString.Game.Single(data => data.Game_name == latest_purchased[0].Game_name);

                return Json(dbdata);

            }
            catch
            {
                return Json("Incorrect username");
            }
        }


        [HttpGet("~/api/get_sorted_games_using_range/{Sort_Type}/{Selected_Games}")]
        public JsonResult GetSortedGamesUsingRange(string Sort_Type, int Selected_Games)
        {

            try
            {
                string expression = Sort_Type;
                int difference = Selected_Games - 12;

                if (difference >= 0)
                    switch (expression)
                    {
                        case "Alphabetical":

                            var sorted_games = _conString.Game.Where(data => data.ID > 0).OrderBy(data => data.Game_name).Skip(difference).Take(12).ToList();

                            return Json(sorted_games);

                        case "Low to High":

                            sorted_games = _conString.Game.Where(data => data.ID > 0).OrderBy(data => data.Price).Skip(difference).Take(12).ToList();

                            return Json(sorted_games);



                        case "High to Low":

                            sorted_games = _conString.Game.Where(data => data.ID > 0).OrderByDescending(data => data.Price).Skip(difference).Take(12).ToList();

                            return Json(sorted_games);

                        case "Newest":

                            sorted_games = _conString.Game.Where(data => data.ID > 0).OrderByDescending(data => data.ID).Skip(difference).Take(12).ToList();

                            return Json(sorted_games);

                    }

                return Json("Invalid sort type or incorect number of selected games");

            }
            catch
            {
                return Json("Error");
            }
        }

    }
}
