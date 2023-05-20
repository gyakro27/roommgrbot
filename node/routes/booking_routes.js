const express = require('express');
const db = require('../db/client');
const router = express.Router();
const Model = require('../models/booking');
const bookings = db.collection("bookings");

router.get('/', async(req, res) => {
  try{
    const data = await Model.find();
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
    place:body.place,
    bookedBy: body.bookedBy,
    telegram: body.telegram,
    from: body.from,
    to: body.to,
    desc: body.desc
  });
  try {
    const dataToSave = await data.save();
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).json(dataToSave)
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

      const result = await Model.findByIdAndUpdate(
          id, updatedData, options
      )

      res.send(result)
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
})

module.exports = router;