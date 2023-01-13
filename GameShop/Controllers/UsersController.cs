using GameShop.Models;
using GameShop.Models.DBConnection;
using Microsoft.AspNetCore.Mvc;
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

    }


}

