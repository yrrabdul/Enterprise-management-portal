const express = require('express');
const router = express.Router();
const Addgroup = require('../models/Addgroup');

// POST route to add a new group
router.post('/addgroup', async (req, res) => {
  try {
    const { groupName } = req.body;
    // Create a new group entry
    const newGroup = new Addgroup({ groupName });
    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET route to fetch all groups
router.get('/getgroups', async (req, res) => { // Changed route path to /getgroups
    try {
      const groups = await Addgroup.find();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// DELETE route to delete a group by its ID
router.delete('/deletegroup/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Addgroup.findByIdAndDelete(id);
      res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// PUT route to update a group by its ID
router.put('/updategroup/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { groupName } = req.body;
      const updatedGroup = await Addgroup.findByIdAndUpdate(id, { groupName }, { new: true });
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
