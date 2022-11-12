const { MongoClient } = require("mongodb");
require("dotenv").config()
const {DB_URL, DB_HOST, DB_NAME, DB_OPTION} = process.env;
async function connectToCluster() {
    let mongoClient;

    try {
        mongoClient = new MongoClient(DB_HOST);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
}

module.exports = {
    connectToCluster
}