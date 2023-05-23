const express = require('express')
const bodyParser = require('body-parser');
const buildingRoutes = require('./routes/building_routes');
const bookingRoutes = require('./routes/booking_routes');
const roomsRoutes = require('./routes/rooms_routes');
const expressApp = express();
var cors = require('cors')
const path = require("path");
const port = process.env.PORT || 88;
expressApp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

expressApp.use(express.static('static'));
expressApp.use(express.json());
expressApp.use('/buildings', buildingRoutes);
expressApp.use('/bookings', bookingRoutes);
expressApp.use('/rooms', roomsRoutes);

require('dotenv').config({path:__dirname+'\\bot.env'});

const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
expressApp.use(bot.webhookCallback('/tbot'));
bot.telegram.setWebhook(process.env.NGROK);

expressApp.use(express.static(path.join(__dirname, "..", "build")));
expressApp.use(express.static("public"));
expressApp.use(bodyParser.json());

bot.start(ctx => {
  return ctx.reply('Kattints a gombra, hogy elindítsd az alkalmazást: <b>KTK foglalás</b>', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.webApp('KTK foglalás', process.env.NETLIFY)
    ])
  });
});


expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});


  
expressApp.listen(port, () => {
  console.log('App listening on port '+port);
  console.log(path.resolve(__dirname, '../webapp/react-blog/build/index.html'));
});

