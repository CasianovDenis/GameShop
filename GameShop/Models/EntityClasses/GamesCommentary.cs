using System.ComponentModel.DataAnnotations;

namespace GameShop.Models
{
    public class GamesCommentary
    {
        [Key]
        public int ID { get; set; }

        public string Username { get; set; }
        public string Commentary { get; set; }
        public string GameName { get; set; }
    }
}
