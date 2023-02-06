using GameShop.Models;
using GameShop.Models.DBConnection;
using GameShop.Models.Mongo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GameShop.Controllers
{



    [Produces("application/json")]
    [Route("api/Purchase")]
    [ApiController]
    public class MongoFileController : Controller
    {

        private readonly ConString _conString;

        public MongoFileController(ConString conection)
        {
            _conString = conection;

        }

        [Route("~/api/upload_file")]
        [HttpPost]
        public async Task<ActionResult> AddFileAsync([FromForm] ModeratorUploadFile FileData)
        {
            try
            {
                var moderator = _conString.Users.Single(data => data.Username == FileData.ModeratorName);

                if (moderator.Rights_token == FileData.Rights_token)
                {
                    MongoDBServices dBServices = new MongoDBServices();

                    MongoObject gamelist = new MongoObject();

                    gamelist.File_Name = FileData.GameName;

                    if (FileData.File.ContentDisposition != null)
                    {
                        MemoryStream memdata = new MemoryStream();
                        FileData.File.CopyTo(memdata);
                        gamelist.ImageUrl = Convert.ToBase64String(memdata.ToArray());

                        await dBServices.Create(gamelist);

                    }

                    return Json("Succes");
                }

                return Json("Incorrect rights token");
            }
            catch (Exception ex)
            {
                return Json(ex);
            }
        }


        [HttpGet("~/api/get_files/{GameName}")]
        public JsonResult GetFiles(string GameName)
        {
            try
            {

                MongoDBServices dBServices = new MongoDBServices();



                var photolist = dBServices.GetAll(GameName);


                return Json(photolist);
            }
            catch
            {
                return Json("Game data not exist");
            }
        }


    }
}
