const express = require('express')
const expressApp = express()
const axios = require("axios");
const path = require("path");
const mongo = require("mongodb");
const port = process.env.PORT || 88;

expressApp.use(express.static('static'))
expressApp.use(express.json());
require('dotenv').config({path:__dirname+'\\bot.env'});

const { Telegraf, Markup } = require('telegraf');
const { read } = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);
expressApp.use(bot.webhookCallback('/tbot'))
bot.telegram.setWebhook('https://2d81-188-142-239-29.eu.ngrok.io/tbot')

expressApp.use(express.static(path.join(__dirname, "..", "build")));
expressApp.use(express.static("public"));

const link = "78.139.43.40:443";



bot.start(ctx => {
  return ctx.reply('Click on the button to open <b>Google.com</b>', {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      Markup.button.webApp('gogel', 'https://google.com')
    ])
  })
});

expressApp.get('/', (req, res) => {
  res.send('Hello World!');
})

expressApp.get('/booking', (req, res) => {
  res.send('Hello!');
})
  
expressApp.listen(port, () => {
  console.log('App listening on port '+port);
  console.log(path.resolve(__dirname, '../webapp/react-blog/build/index.html'));
})

  