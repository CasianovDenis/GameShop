using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GameShop.Models
{
    public class MongoObject
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        public string File_Name { get; set; } = null!;
        public string ImageUrl { get; set; }

    }
}
