const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

router.get('/', foodController.getAll);
router.get('/:id', foodController.getById);

module.exports = router;