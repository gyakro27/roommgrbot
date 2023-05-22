const express = require('express');
const db = require('../db/client');
const router = express.Router()
const Model = require('../models/rooms');
const buildings = require('../models/building')
var cors = require('cors')
router.use(cors());
router.get('/:buildingId?',cors(), async(req, res) => {
  try{
    if(req.params.buildingId != null){
        const data = await Model.find().byBuilding(req.params.buildingId);
        res.json(data)    
    } else{
        const data = await Model.find();
        res.json(data)
    }
}
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get('/:id',cors(), async(req, res) => {
  try{
    const data = await Model.findById(req.params.id);
    const building = await buildings.findById(data.buildingId);

    data.building = building.name;
    res.json(data)
}
catch(error){
    res.status(500).json({message: error.message})
}
});

router.post('/', async (req, res) => {
  const body = req.body;
  const data = new Model({
    name: body.name,
    buildingId: body.buildingId
  });
  try {
    const dataToSave = await data.save();
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