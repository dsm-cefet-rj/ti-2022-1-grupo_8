const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;


const connectionSingleton = () => {
    let instance = null;
    return () => {
        if (instance === null) {
            const uri = process.env.MONGODB_URI.replace("<username>", username).replace(
                "<password>",
                password
            );
            instance = new MongoClient(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,
            });
        }
        return instance;
    }
}


const getConnection = async () => {
    const connection = connectionSingleton();
    const client = await client.connect();
    return client.db("PizzariaOn");
}

module.exports = {
    getConnection,
}

