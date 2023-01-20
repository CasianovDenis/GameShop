namespace GameShop.Models
{
    public class TempData
    {
        public string OldFileName { get; set; }
        public string NewFileName { get; set; }

        public string TempGameName { get; set; }
        public string Email { get; set; }

        public string GameCode { get; set; }

        public double GamePrice { get; set; }

        public string Sort_Type { get; set; }

        public int Selected_Games { get; set; }
    }
}
