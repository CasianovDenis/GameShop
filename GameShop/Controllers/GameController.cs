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
                    Game game = new Game
                    {
                        Game_name = moderator.Game_name,
                        Price = moderator.Price,
                        Description = moderator.Description,
                        Currency = moderator.Currency,
                        Cover = moderator.Cover
                    };

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
                var games = _conString.Game.Where(data => data.ID > 0).ToList();

                int number = 0, difference = games.Count - 5;

                if (difference > 0)
                {
                    Random rnd = new Random();


                    for (int index = 0; index < difference; index++)
                    {
                        number = rnd.Next(0, games.Count);
                        games.Remove(games[number]);
                    }

                    return Json(games);
                }
                else
                    return Json(games);
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }

        [Route("~/api/get_new_games")]
        [HttpGet]
        public JsonResult NewGames()
        {

            try
            {
                var new_games = _conString.Game.Where(data => data.ID > 0).OrderBy(data => data.ID).ToList();


                if (new_games.Count >= 6)
                {


                    int range = new_games.Count - 5;

                    for (int index = 0; index < range; index++)
                    {

                        new_games.Remove(new_games[0]);


                    }

                    return Json(new_games);
                }
                return Json(new_games);
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
            catch (Exception ex)
            {
                return Json(ex);
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
