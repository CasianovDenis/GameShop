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



        [Route("~/api/create_user")]
        [HttpPost]
        public JsonResult Create_user(Users newuser)
        {

            try
            {
                var dbdata = _conString.Users.Single(data => data.Username == newuser.Username);

                return Json("User Exist");

            }
            catch
            {

                _conString.Add(newuser);
                _conString.SaveChanges();

                return Json("Account created successfully");
            }
        }

        [Route("~/api/get_user_role")]
        [HttpPost]
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

    }


}

