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

        [Route("~/api/create_game_data")]
        [HttpPost]
        public JsonResult CreateGameData(Game game)
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

        [Route("~/api/get_new_games")]
        [HttpPost]
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


        [Route("~/api/get_game")]
        [HttpPost]
        public JsonResult GetGame(Game game)
        {

            try
            {
                var dbdata = _conString.Game.Single(data => data.Game_name == game.Game_name);


                return Json(dbdata);


            }
            catch
            {
                return Json("Game not found");
            }
        }

        [Route("~/api/get_all_games")]
        [HttpPost]
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


        [Route("~/api/get_sorted_games_using_range")]
        [HttpPost]
        public JsonResult GetSortedGamesUsingRange(TempData tempdata)
        {

            try
            {
                string expression = tempdata.Sort_Type;
                int difference = tempdata.Selected_Games - 12;

                if (difference > 0)
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
