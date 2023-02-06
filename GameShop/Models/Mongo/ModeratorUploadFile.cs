using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace GameShop.Models.Mongo
{
    public class ModeratorUploadFile
    {
        [Required]
        public IFormFile File { get; set; }

        [Required]
        public string GameName { get; set; }

        [Required]
        public string ModeratorName { get; set; }
        [Required]
        public string Rights_token { get; set; }
    }
}
