using System.ComponentModel.DataAnnotations;

namespace GameShop.Models.TempClasses
{
    public class CommentaryData : GamesCommentary
    {
        [Required]
        public string AuthorizationToken { get; set; }
    }
}
