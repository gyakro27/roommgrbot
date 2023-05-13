const mongo = require("mongodb").MongoClient

const url = "mongodb://localhost:27017";

let db;

const init = () =>
console.log("init");
  MongoClient.connect(url, { useNewUrlParser: true }).then((client) => {
    db = client.db("ktk_foglalas");
  })