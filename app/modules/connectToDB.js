const { MongoClient } = require("mongodb");
require("dotenv").config()
const {DB_URL} = process.env;
console.log(DB_URL);
let db;
(async() => {
    const client = await MongoClient.connect(DB_URL);
    db = client.db()
})()
module.exports = {
    db
}