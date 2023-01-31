using System.ComponentModel.DataAnnotations;

namespace GameShop.Models.TempClasses
{
    public class TempGamesCommentary : GamesCommentary
    {
        [Required]
        public int number_displaying_comment { get; set; }
    }
}
