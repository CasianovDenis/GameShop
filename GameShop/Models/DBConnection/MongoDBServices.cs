using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameShop.Models.DBConnection
{

    public class MongoDBServices
    {
        IGridFSBucket gridFS;
        IMongoCollection<MongoObject> documents;

        public MongoDBServices()
        {

            string connectionString = "mongodb://localhost:27017/GameStore";


            var connection = new MongoUrlBuilder(connectionString);

            MongoClient client = new MongoClient(connectionString);

            IMongoDatabase database = client.GetDatabase("GameStore");

            gridFS = new GridFSBucket(database);


            documents = database.GetCollection<MongoObject>("GameCollection");
        }


        public MongoObject Get(string name)
        {
            return documents.Find(new BsonDocument("File_Name", new string(name))).FirstOrDefault();
        }

        public IEnumerable<MongoObject> GetAll(string name)
        {
            var get = documents.Find(new BsonDocument("File_Name", new string(name))).ToList();
            return get;
        }

        public async Task Create(MongoObject mobj)
        {

            await documents.InsertOneAsync(mobj);
        }


        public async Task Remove(string id)
        {
            await documents.DeleteOneAsync(new BsonDocument("_id", new ObjectId(id)));
        }

        public async Task Update(MongoObject mobj)
        {

            await documents.ReplaceOneAsync(new BsonDocument("_id", new ObjectId(mobj._id)), mobj);



        }
    }
}
