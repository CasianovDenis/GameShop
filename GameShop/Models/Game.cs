using System.ComponentModel.DataAnnotations;

namespace GameShop.Models
{
    public class Game
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Game_name { get; set; }

        public double Price { get; set; }

        public string Description { get; set; }

        public char Currency { get; set; }

        public string Cover { get; set; }



    }
}
