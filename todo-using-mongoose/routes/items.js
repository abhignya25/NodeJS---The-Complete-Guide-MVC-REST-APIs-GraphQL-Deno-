const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/items');

router.post('/add-item', itemsController.postAddItem);

router.put('/edit-item/:itemId', itemsController.putItem);

router.delete('/:itemId', itemsController.deleteItem);

router.get('/:itemId', itemsController.getItem);

router.get('/', itemsController.getItems);

module.exports = router;