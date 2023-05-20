const express = require('express')
const bodyParser = require('body-parser');
const db = require('../node/db/client');
const expressApp = express();
const path = require("path");
const port = process.env.PORT || 88;

expressApp.use(express.static('static'));
expressApp.use(express.json());
require('dotenv').config({path:__dirname+'\\bot.env'});

const { Telegraf, Markup } = require('telegraf');
const { read } = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);
expressApp.use(bot.webhookCallback('/tbot'));
bot.telegram.setWebhook('https://bd60-188-142-239-29.ngrok-free.app/tbot');

expressApp.use(express.static(path.join(__dirname, "..", "build")));
expressApp.use(express.static("public"));
expressApp.use(bodyParser.json());

bot.start(ctx => {
  return ctx.reply('Kattints a gombra, hogy elindítsd az alkalmazást: <b>KTK foglalás</b>', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.webApp('KTK foglalás', 'https://64688844b16cbf7995f304e0--peppy-cupcake-a889e9.netlify.app/')
    ])
  })
});


expressApp.get('/', (req, res) => {
  res.send('Hello World!');
});

expressApp.get('/buildings', (req, res) => {
    buildings.find({}).toArray().then((items) => {
        res.status(200).json({ buildings: items });
    
    });
  
  
});

expressApp.post('/buildings', (req, res) => {
  const body = req.body;
  console.log(body)
  buildings.insertOne({ building: body.building, }).then((err, result) => {
    if (err) {
      console.error(err)
      res.status(500).json({ err: err })
      return
    }
    console.log(result);
    res.status(200).json({ ok: true })
  })
});

  
expressApp.listen(port, () => {
  console.log('App listening on port '+port);
  console.log(path.resolve(__dirname, '../webapp/react-blog/build/index.html'));
});

