import { MongoClient } from "mongodb";

let db;
(async() => {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    db = client.db("yadaki")
})()
export {
    db
}