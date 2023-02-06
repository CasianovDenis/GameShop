using System.ComponentModel.DataAnnotations;

namespace GameShop.Models
{
    public class Users
    {

        [Key]
        public int ID { get; set; }
        [Required]
        public string Username { get; set; }


        public string Password { get; set; }


        public string Email { get; set; }

        public string Role { get; set; }

        public string Rights_token { get; set; }

    }
}
