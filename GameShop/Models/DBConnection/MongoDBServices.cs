using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameShop.Models.DBConnection
{
    //надо настроить
    public class MongoDBServices
    {
        IGridFSBucket gridFS;
        IMongoCollection<MongoObject> documents;

        public MongoDBServices()
        {

            string connectionString = "mongodb://localhost:27017/GameStore";
            //string connectionString = "mongodb+srv://AngelBenny:alibaba321@manageproject.xl5mycl.mongodb.net/?retryWrites=true&w=majority";

            var connection = new MongoUrlBuilder(connectionString);

            MongoClient client = new MongoClient(connectionString);

            IMongoDatabase database = client.GetDatabase("GameStore");

            gridFS = new GridFSBucket(database);


            documents = database.GetCollection<MongoObject>("GameCollection");
        }

        // получаем один документ по id
        public MongoObject Get(string name)
        {
            return documents.Find(new BsonDocument("File_Name", new string(name))).FirstOrDefault();
        }

        public IEnumerable<MongoObject> GetAll(string name)
        {
            var get = documents.Find(new BsonDocument("File_Name", new string(name))).ToList();
            return get;
        }
        // добавление документа
        public async Task Create(MongoObject mobj)
        {

            await documents.InsertOneAsync(mobj);
        }

        // удаление документа
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
