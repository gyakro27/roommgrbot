const express = require('express');
const db = require('../db/client');
const router = express.Router();
const Model = require('../models/booking');
const bookings = db.collection("bookings");

router.get('/', async(req, res) => {
  try{
    let date = req.query.date;
    let tomorrow;
    let today;
    console.log(date);
    if(date == null){
      tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate()+1);
      today = new Date();
    } else{
      today = new Date(date);
      tomorrow = new Date();
      tomorrow.setDate(today.getDate()+1);      
    }
    const data = await Model.find({ from: { $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()), $lte: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()) } }).lean();
      res.json(data)
} 
catch(error){
    res.status(500).json({message: error.message})
}
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  const data = new Model({
    title: body.title,
    room:body.room,
    roomId:body.roomId,
    bookedBy: body.bookedBy,
    telegram: body.telegram,
    from: body.from,
    to: body.to,
    desc: body.desc
  });
  try {
    if(await !isOccupied(body.roomId, body.from, body.to)){
      res.status(400).json({message: "Időpont foglalt"}); 
    } else if(body.to <= body.from) {
      res.status(400).json({message: "Foglalás vége a foglalás kezdete után kell legyen"})
    }
    else{
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
    }
    
}
catch (error) {
    res.status(400).json({message: error.message})
}
});

router.put('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      if(await !isOccupied(req.body.roomId, req.body.from, req.body.to)){
        res.status(400).json({message: "Időpont foglalt"});
      } else if(req.body.from <= req.body.to){
        res.status(400).json({message: "Foglalás vége a foglalás kezdete után kell legyen"})
      }else{
        const result = await Model.findByIdAndUpdate(
          id, updatedData, options
      )

      res.send(result)
        
      }
      
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
});

router.delete('/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const data = await Model.findByIdAndDelete(id)
      res.send(`Document with ${data.name} has been deleted..`)
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
});

async function isOccupied(roomId, dateFrom, dateTo)  {
  const from = await Model.find().where({roomId: roomId}).where('from').lt(dateFrom).where('to').gt(dateFrom).lean();
  const to = await Model.find().where({roomId: roomId}).where('to').gt(dateTo).where('from').lt(dateTo).lean();
  const between = await Model.find().where({roomId: roomId}).where('to').lt(dateTo).where('from').gt(dateFrom).lean();
  return to.length == 0 && from.length == 0 && between.length == 0;
}

module.exports = router;