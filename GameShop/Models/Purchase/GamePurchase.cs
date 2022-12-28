using System.ComponentModel.DataAnnotations;

namespace GameShop.Models.Purchase
{
    public class GamePurchase : Game
    {
        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string Nonce { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
