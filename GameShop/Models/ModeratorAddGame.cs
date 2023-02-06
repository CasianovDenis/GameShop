using System.ComponentModel.DataAnnotations;

namespace GameShop.Models
{
    public class ModeratorAddGame : Game
    {
        [Required]
        public string ModeratorName { get; set; }

        public string Rights_token { get; set; }
    }
}
