using System.ComponentModel.DataAnnotations;

namespace GameShop.Models
{
    public class UserPurchases
    {

        [Key]
        public int ID { get; set; }

        [Required]
        public string Username { get; set; }
        public string Game_name { get; set; }

        public string KeyOfGame { get; set; }


    }
}
