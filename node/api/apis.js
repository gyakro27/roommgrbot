const express = require('express')
const expressApp = express()

expressApp.get('/', (req, res) => {
    res.send('Hello World!');
  })
  
  expressApp.get('/booking', (req, res) => {
    res.send('Hello!');
  })
  