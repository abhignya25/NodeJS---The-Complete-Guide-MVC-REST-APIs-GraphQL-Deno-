const Item = require('../models/Item');

exports.postAddItem = (req, res, next) => {
    const newItem = new Item({
        title: req.body.title,
        priority: req.body.priority,
        completed: req.body.completed,
    });

    newItem.save()
        .then((result) => {
            return res.status(201).json(result);
        })
        .catch((err) => {
            return res.status(400).json({ message: err.message });
        });
};

exports.getItems = (req, res, next) => {
    Item.find()
        .then((items) => {
            if (items.length === 0) {
                return res.status(204).send();
            } else {
                return res.status(200).json(items);
            }
        })
        .catch((err) => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};

exports.getItem = (req, res, next) => {
    Item.findOne({ _id: req.params.itemId })
        .then((item) => {
            if (item) {
                return res.status(200).json(item);
            } else {
                return res.status(400).json({ message: 'Please provide a valid id' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};

exports.putItem = (req, res, next) => {
    Item.findOneAndUpdate(
        { _id: req.params.itemId }, // Filter
        {
            title: req.body.title,
            priority: req.body.priority,
            completed: req.body.completed,
        }, // Update
        { new: true } // Return the updated document
    )
        .then((updatedItem) => {
            if (updatedItem) {
                return res.status(200).json(updatedItem);
            } else {
                return res.status(404).json({ message: 'Item not found' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};

exports.deleteItem = (req, res, next) => {
    Item.findOneAndDelete({ _id: req.params.itemId })
        .then((deletedItem) => {
            if (deletedItem) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ message: 'Please provide a valid Id' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ message: 'Internal Server Error' });
        });
};
