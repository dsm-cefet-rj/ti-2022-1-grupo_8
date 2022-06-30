const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

const uri = process.env.MONGODB_URI.replace("<username>", username).replace(
    "<password>",
    password
);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const getConnection = async () => {
    const connection = await client.connect();
    return connection.db("PizzariaOn");
};

module.exports = {
    getConnection,
};
