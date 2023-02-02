using GameShop.Models;
using GameShop.Models.DBConnection;
using GameShop.Models.List;
using GameShop.Models.TempClasses;
using Microsoft.AspNetCore.Mvc;
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
                var dbdata = _conString.Users.Single(data => data.Username == user.Username);

                if (dbdata.Password == user.Password)
                    return Json("Authorization successfully");

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
                var dbdata = _conString.Users.Single(data => data.Username == newuser.Username);

                return Json("Username is taken");

            }
            catch
            {
                try
                {
                    var dbdata = _conString.Users.Single(data => data.Email == newuser.Email);

                    return Json("Email already used");
                }
                catch
                {
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
                var dbdata = _conString.Users.Single(data => data.Username == Username);

                return Json(dbdata.Role);

            }
            catch
            {

                return Json("User not exist");
            }
        }



        [HttpGet("~/api/get_user_games/{Username}")]
        public JsonResult GetUserGames(string Username)
        {

            try
            {
                var user_games = _conString.UserPurchases.Where(data => data.Username == Username).ToList();


                List<GamePurchasesByUser> purchases_game = new List<GamePurchasesByUser>();

                for (int index = 0; index < user_games.Count; index++)
                {
                    var game = _conString.Game.Single(data => data.Game_name == user_games[index].Game_name);

                    purchases_game.Add(new GamePurchasesByUser(user_games[index].Game_name, user_games[index].KeyOfGame, game.Cover));
                }

                return Json(purchases_game);

            }
            catch
            {

                return Json("User not exist");
            }
        }



        [HttpGet("~/api/checking_user_purchased_this_game/{Username}/{Game_name}")]
        public JsonResult Checking_User_Purchased_This_Game(string Username, string Game_name)
        {

            try
            {
                var dbdata = _conString.UserPurchases.Single(data => data.Username == Username

                                                                       && data.Game_name == Game_name);

                return Json("Already bought");

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

                var dbdata = _conString.Users.Single(data => data.Username == tempdata.Username);

                if (tempdata.Email == dbdata.Email)
                {
                    dbdata.Email = tempdata.NewEmail;
                    _conString.SaveChanges();

                    return Json("Email was changed successfully");
                }

                return Json("Incorrect current email");

            }
        }

        [Route("~/api/update_user_password")]
        [HttpPut]
        public JsonResult UpdateUserPassword(TempUserInfo tempdata)
        {

            try
            {
                var dbdata = _conString.Users.Single(data => data.Username == tempdata.Username);

                if (tempdata.Password == dbdata.Password)
                {

                    dbdata.Password = tempdata.NewPassword;
                    _conString.SaveChanges();

                    return Json("Password change successfuly");

                }

                return Json("Incorrect current password");

            }
            catch
            {
                return Json("Username incorrect");
            }
        }


    }


}

