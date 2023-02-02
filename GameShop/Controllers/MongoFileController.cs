using GameShop.Models;
using GameShop.Models.DBConnection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace GameShop.Controllers
{



    [Produces("application/json")]
    [Route("api/Purchase")]
    [ApiController]
    public class MongoFileController : Controller
    {



        [Route("~/api/upload_file")]
        [HttpPost]
        public async Task<ActionResult> AddFileAsync(IFormFile FileData)
        {
            try
            {
                MongoDBServices dBServices = new MongoDBServices();

                MongoObject gamelist = new MongoObject();

                gamelist.File_Name = FileData.FileName;

                if (FileData.ContentDisposition != null)
                {
                    MemoryStream memdata = new MemoryStream();
                    FileData.CopyTo(memdata);
                    gamelist.ImageUrl = Convert.ToBase64String(memdata.ToArray());

                    await dBServices.Create(gamelist);

                }

                return Json("Succes");
            }
            catch
            {
                return Json("Failed upload");
            }
        }

        [Route("~/api/new_file_name")]
        [HttpPut]
        public JsonResult UpdateFileName(TempData temp)
        {
            try
            {

                MongoDBServices dBServices = new MongoDBServices();

                MongoObject gamelist = new MongoObject();

                gamelist = dBServices.Get(temp.OldFileName);

                gamelist.File_Name = temp.NewFileName;

                var result = dBServices.Update(gamelist);

                return Json("File added successfully");
            }
            catch
            {
                return Json("Failed udate");
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
