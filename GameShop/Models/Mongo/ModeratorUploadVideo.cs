using System.ComponentModel.DataAnnotations;

namespace GameShop.Models.Mongo
{
    public class ModeratorUploadVideo
    {
        [Required]
        public string VideoUrl { get; set; }


        [Required]
        public string GameName { get; set; }

        [Required]
        public string ModeratorName { get; set; }
        [Required]
        public string Rights_token { get; set; }

    }
}
