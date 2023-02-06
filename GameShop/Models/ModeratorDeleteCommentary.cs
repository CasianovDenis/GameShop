using System.ComponentModel.DataAnnotations;

namespace GameShop.Models
{
    public class ModeratorDeleteCommentary : GamesCommentary
    {
        [Required]
        public string ModeratorName { get; set; }
        [Required]
        public string Rights_token { get; set; }
    }
}
