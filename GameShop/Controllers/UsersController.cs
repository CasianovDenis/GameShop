using GameShop.Models;
using GameShop.Models.DBConnection;
using GameShop.Models.List;
using GameShop.Models.TempClasses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;


namespace GameShop.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : Controller
    {

        private readonly ConString _conString;

        public UsersController(ConString conection)
        {
            _conString = conection;

        }

        [Route("~/api/user_authentication")]
        [HttpPost]
        public JsonResult User_Authentication(Users user)
        {

            try
            {
                var user_data = _conString.Users.Single(data => data.Username == user.Username);

                if (user_data.Password == user.Password)
                {
                    if (user_data.Role == "admin")
                    {

                        user_data.Rights_token = RandomString(20);
                        user_data.Authorization_token = RandomString(25);
                        _conString.Update(user_data);
                        _conString.SaveChanges();

                        var tokens = new { Authorization_token = user_data.Authorization_token, Rights_token = user_data.Rights_token };
                        return Json(tokens);
                    }
                    else
                    {
                        user_data.Authorization_token = RandomString(25);
                        _conString.Update(user_data);
                        _conString.SaveChanges();

                        return Json(user_data.Authorization_token);
                    }


                }
                //false
                return Json("Password incorrect");

            }
            catch
            {

                return Json("User not exist");


            }
        }

        [Route("~/api/create_user")]
        [HttpPost]
        public JsonResult Create_user(Users newuser)
        {

            try
            {
                var verifie_username = _conString.Users.Single(data => data.Username == newuser.Username);

                return Json("Username is taken");

            }
            catch
            {
                try
                {
                    var verifie_email = _conString.Users.Single(data => data.Email == newuser.Email);

                    return Json("Email already used");
                }
                catch
                {
                    newuser.Authorization_token = "null";
                    _conString.Add(newuser);
                    _conString.SaveChanges();

                    return Json("Account created successfully");
                }

            }
        }


        [HttpGet("~/api/get_user_role/{Username}")]
        public JsonResult GetUserRole(string Username)
        {

            try
            {
                var user_data = _conString.Users.Single(data => data.Username == Username);

                return Json(user_data.Role);

            }
            catch
            {

                return Json("User not exist");
            }
        }




        [HttpGet("~/api/get_user_games/{Username}/{authorizationToken}")]
        public JsonResult GetUserGames(string Username, string authorizationToken)
        {

            try
            {
                var user_data = _conString.Users.Single(data => data.Username == Username);

                if (authorizationToken == user_data.Authorization_token)
                {

                    var user_games = _conString.UserPurchases.Where(data => data.Username == Username).OrderBy(data => data.Game_name).ToList();


                    List<GamePurchasesByUser> purchases_game = new List<GamePurchasesByUser>();

                    for (int index = 0; index < user_games.Count; index++)
                    {
                        var game = _conString.Game.Single(data => data.Game_name == user_games[index].Game_name);

                        purchases_game.Add(new GamePurchasesByUser(user_games[index].Game_name, user_games[index].KeyOfGame, game.Cover));
                    }

                    return Json(purchases_game);
                }
                else
                    return Json("Incorrect authorization token");

            }
            catch
            {

                return Json("Incorrect Username");
            }
        }

        [HttpGet("~/api/get_sort_user_games/{Username}/{authorizationToken}/{sort_type}")]
        public JsonResult GetSortUserGames(string Username, string authorizationToken, string sort_type)
        {

            try
            {
                var user_data = _conString.Users.Single(data => data.Username == Username);

                if (authorizationToken == user_data.Authorization_token)
                {

                    switch (sort_type)
                    {
                        case "Alphabetical":

                            var user_games = _conString.UserPurchases.Where(data => data.Username == Username).OrderBy(data => data.Game_name).ToList();

                            List<GamePurchasesByUser> alphabetical_games = new List<GamePurchasesByUser>();

                            for (int index = 0; index < user_games.Count; index++)
                            {
                                var game = _conString.Game.Single(data => data.Game_name == user_games[index].Game_name);

                                alphabetical_games.Add(new GamePurchasesByUser(user_games[index].Game_name, user_games[index].KeyOfGame, game.Cover));
                            }

                            return Json(alphabetical_games);

                        case "Newest":
                            user_games = _conString.UserPurchases.Where(data => data.Username == Username).OrderBy(data => data.ID).ToList();

                            List<GamePurchasesByUser> newest_games = new List<GamePurchasesByUser>();

                            for (int index = 0; index < user_games.Count; index++)
                            {
                                var game = _conString.Game.Single(data => data.Game_name == user_games[index].Game_name);

                                newest_games.Add(new GamePurchasesByUser(user_games[index].Game_name, user_games[index].KeyOfGame, game.Cover));
                            }

                            return Json(newest_games);

                    }

                    return Json("Incorrect sort type");

                }
                else
                    return Json("Incorrect authorization token");

            }
            catch
            {

                return Json("Incorrect Username");
            }
        }



        [HttpGet("~/api/checking_user_purchased_this_game/{Username}/{Game_name}/{authorizationToken}")]
        public JsonResult Checking_User_Purchased_This_Game(string Username, string Game_name, string authorizationToken)
        {

            try
            {
                var user_data = _conString.Users.Single(data => data.Username == Username);

                if (authorizationToken == user_data.Authorization_token)
                {
                    var dbdata = _conString.UserPurchases.Single(data => data.Username == Username

                                                                         && data.Game_name == Game_name);

                    return Json("Already bought");
                }
                else
                    return Json("You don't have permission");

            }
            catch
            {

                return Json("Game not bought");
            }
        }



        [Route("~/api/update_user_email")]
        [HttpPut]
        public JsonResult UpdateUserEmail(TempUserInfo tempdata)
        {

            try
            {
                var exist = _conString.Users.Single(data => data.Username == tempdata.NewEmail);

                return Json("Email already exist");

            }
            catch
            {

                var user_data = _conString.Users.Single(data => data.Username == tempdata.Username);

                if (user_data.Authorization_token == tempdata.AuthorizationToken)
                {
                    if (tempdata.Email == user_data.Email)
                    {
                        user_data.Email = tempdata.NewEmail;
                        _conString.SaveChanges();

                        return Json("Email was changed successfully");
                    }

                    return Json("Incorrect current email");
                }
                else
                    return Json("Incorrect authorization token");
            }
        }

        [Route("~/api/update_user_password")]
        [HttpPut]
        public JsonResult UpdateUserPassword(TempUserInfo tempdata)
        {

            try
            {
                var user_data = _conString.Users.Single(data => data.Username == tempdata.Username);

                if (tempdata.AuthorizationToken == user_data.Authorization_token)
                {
                    if (tempdata.Password == user_data.Password)
                    {

                        user_data.Password = tempdata.NewPassword;
                        _conString.SaveChanges();

                        return Json("Password change successfuly");

                    }

                    return Json("Incorrect current password");
                }
                return Json("Incorrect authorization token");
            }
            catch
            {
                return Json("Username incorrect");
            }
        }

        public static string RandomString(int length)
        {
            Random random = new Random();

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

    }


}

