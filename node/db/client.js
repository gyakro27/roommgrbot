const mongo = require("mongodb").MongoClient
require('dotenv').config({path:'../node/bot.env'});

const url = process.env.MONGO_LOCAL ;

let db;

const init = () =>
console.log("init");
  mongo.connect(url, { useNewUrlParser: true }).then((client) => {
    db = client.db("ktk_foglalas");
    buildings=db.collection("buildings");
  })

  module.exports = db;