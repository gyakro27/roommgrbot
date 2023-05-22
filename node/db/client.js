const mongo = require("mongoose");
require('dotenv').config({path:'../node/bot.env'});

const url = process.env.MONGO_DB ;
mongo.connect(url);
let db = mongo.connection;

db.on('error', (error) => {
  console.log(error)
})

db.once('connected', () => {
  console.log('Database Connected');
})

 module.exports = db;