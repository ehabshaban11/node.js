const express = require('express');
const router = express.Router();
const Point = require('../models/Point');

// Get all points
router.get('/', async (req, res) => {
  const points = await Point.find();
  res.json(points);
});

// Add a new point
router.post('/', async (req, res) => {
  const newPoint = new Point(req.body);
  await newPoint.save();
  res.status(201).json(newPoint);
});

// Update a point
router.put('/:id', async (req, res) => {
  const updatedPoint = await Point.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPoint);
});

// Delete a point
router.delete('/:id', async (req, res) => {
  await Point.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
