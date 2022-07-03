// Esse arquivo salva todas as coleções do banco de dados e salva em um arquivo JSON
// O arquivo JSON é salvo em /BackUp/BackUp.json

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const prettier = require("prettier");
const fs = require("fs");
require("dotenv").config();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

if (!username || !password) {
    throw new Error("MongoDB username or password not found 🥺");
}

if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI not found 🥺");
}

const uri = process.env.MONGODB_URI.replace("<username>", username).replace(
    "<password>",
    password
);

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const databaseName = "PizzariaOn";

const colectionNames = [
    "ingredientes",
    "pedidos",
    "pizzas",
    "produtos",
    "usuarios",
];

const getConnection = async () => {
    const connection = await client.connect();
    return connection.db(databaseName);
};

// Salva todas as coleções do banco de dados em um arquivo JSON

const saveAllCollections = async () => {
    const connection = await getConnection();
    const collections = await connection.collections();
    const data = {};
    for (const collection of collections) {
        const collectionName = collection.collectionName;
        const collectionData = await collection.find({}).toArray();
        data[collectionName] = collectionData;
    }
    // Print some info about the data
    console.log(`${Object.keys(data).length} retrieved collections 📚 with ${Object.keys(data).reduce((acc, curr) => acc + data[curr].length, 0)} documents 📄`);
    fs.writeFileSync("./DataBaseHealer/BackUp.json",
        prettier.format(JSON.stringify(data), { parser: "json" }));
}

async function main() {
    console.log("Backup started ▶️");
    await saveAllCollections();
    console.log("Backup finished 🏁");
    // Exit 0
    process.exit(0);
}

// run the main function
main();
