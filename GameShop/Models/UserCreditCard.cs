using System.ComponentModel.DataAnnotations;

namespace GameShop.Models
{
    public class UserCreditCard
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Username { get; set; }

        public string CardNumber { get; set; }

        public string ExpireMonth { get; set; }

        public string ExpireYear { get; set; }

        public byte[] Key { get; set; }

        public byte[] IV { get; set; }
    }
}
