const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');

router.get('/:itemId', tasksController.getItem);

router.get('/', tasksController.getItems);

router.post('/', tasksController.postAddItem);

router.put('/:itemId', tasksController.putItem);

router.delete('/:itemId', tasksController.deleteItem);

module.exports = router;