const express = require('express');
const router = express.Router();
const {
  addThickness,
  addWidth,
  addLength
} = require('../controllers/custumAddController');

router.put('/addThickness/:id', addThickness);
router.put('/addWidth/:id', addWidth);
router.put('/addLength/:id', addLength);

module.exports = router;
