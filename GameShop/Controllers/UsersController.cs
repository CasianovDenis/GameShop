using Effortless.Net.Encryption;
using GameShop.Models;
using GameShop.Models.DBConnection;
using GameShop.Models.List;
using GameShop.Models.TempClasses;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

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

        [Route("~/api/get_user_role")]
        [HttpPost]
        public JsonResult GetUserRole(Users user)
        {

            try
            {
                var dbdata = _conString.Users.Single(data => data.Username == user.Username);

                return Json(dbdata.Role);

            }
            catch
            {

                return Json("User not exist");
            }
        }


        [Route("~/api/get_user_games")]
        [HttpPost]
        public JsonResult GetUserGames(Users user)
        {

            try
            {
                var user_games = _conString.UserPurchases.Where(data => data.Username == user.Username).ToList();


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


        [Route("~/api/checking_user_purchased_this_game")]
        [HttpPost]
        public JsonResult Checking_User_Purchased_This_Game(UserPurchases userpurchases)
        {

            try
            {
                var dbdata = _conString.UserPurchases.Single(data => data.Username == userpurchases.Username

                                                                       && data.Game_name == userpurchases.Game_name);

                return Json("Already bought");

            }
            catch
            {

                return Json("Game not bought");
            }
        }



        [Route("~/api/update_user_email")]
        [HttpPost]
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
        [HttpPost]
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

        [Route("~/api/add_user_credit_card")]
        [HttpPost]
        public JsonResult AddUserCreditCard(UserCreditCard creditcard)
        {

            try
            {
                var dbdata = _conString.UserCreditCard.Single(data => data.Username == creditcard.Username);



                return Json("You already have credit card");

            }
            catch
            {
                byte[] byte_card_number = Convert.FromBase64String(creditcard.CardNumber);
                string decoded_card_number = Encoding.UTF8.GetString(byte_card_number);
                //encrypt 
                byte[] key = Bytes.GenerateKey();
                byte[] iv = Bytes.GenerateIV();
                var crypt_password = Strings.Encrypt(decoded_card_number, key, iv);

                creditcard.CardNumber = crypt_password;
                creditcard.Key = key;
                creditcard.IV = iv;

                _conString.Add(creditcard);
                _conString.SaveChanges();

                return Json("Credit card was added successfully");
            }
        }

        [Route("~/api/checking_user_have_credit_card")]
        [HttpPost]
        public JsonResult Checking_User_Have_Credit_Card(Users user)
        {

            try
            {
                var dbdata = _conString.UserCreditCard.Single(data => data.Username == user.Username);

                return Json("Card exist");

            }
            catch
            {

                return Json("Username incorrect");
            }
        }

        [Route("~/api/delete_user_credit_card")]
        [HttpPost]
        public JsonResult DeleteUserCreditCard(Users user)
        {

            try
            {
                var dbdata = _conString.UserCreditCard.Single(data => data.Username == user.Username);

                _conString.Remove(dbdata);
                _conString.SaveChanges();

                return Json("Card deleted");

            }
            catch
            {

                return Json("Username incorrect");
            }
        }
    }


}

