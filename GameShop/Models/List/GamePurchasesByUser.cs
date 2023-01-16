namespace GameShop.Models.List
{
    public class GamePurchasesByUser
    {
        public string GameName { get; set; }

        public string KeyOfGame { get; set; }

        public string URL_Image { get; set; }


        public GamePurchasesByUser(string gamename, string key, string url)
        {

            GameName = gamename;
            KeyOfGame = key;
            URL_Image = url;
        }
    }
}
