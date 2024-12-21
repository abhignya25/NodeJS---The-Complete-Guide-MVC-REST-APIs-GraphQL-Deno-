const { v4: uuidv4 } = require('uuid');
const Item = require('../models/Item');

exports.postAddItem = (req, res, next) => {
    Item.create({
        id: uuidv4(),
        title: req.body.title,
        priority: req.body.priority,
        completed: req.body.completed
    })
    .then((result) => {
        return res.status(201).json(result)
    })
    .catch((err) => {
        return res.status(400).json({ message: err.errors[0].message });
    })
};

exports.getItems = (req, res, next) => {
    return Item.findAll()
            .then((items) => {
                if (items.length === 0) {
                    return res.status(204);
                } else {
                    return res.status(200).json(items);
                }
            })
            .catch((err) => {
                return res.status(500).json({ message: 'Internal Server Error' });
            });
};

exports.getItem = (req, res, next) => {
    return Item.findByPk(req.params.itemId)
            .then((item) => {
                if (item) {
                    return res.status(200).json(item)
                } else {
                    return res.status(400).json({
                        "message": "Please provide a valid id"
                    })
                }
            })
            .catch((err) => {
                return res.status(500).json({ message: 'Internal Server Error' });
            });
};

exports.putItem = (req, res, next) => {
    return Item.update({
        id: req.params.itemId,
        title: req.body.title,
        priority: req.body.priority,
        completed: req.body.completed
    }, {
        where: { 
            id: req.params.itemId
        }
    })
    .then((items) => {
        return res.status(200).json({
            "message": `${req.params.itemId} updated`
        });
    })
    .catch((err) => {
        return res.status(500).json({ message: 'Internal Server Error' });
    });
};

exports.deleteItem = (req, res, next) => {
    return Item.destroy({
        where: {
            id: req.params.itemId
        }
    })
    .then((rowsDeleted) => {
        if (rowsDeleted > 0) {
            return res.status(204).send(null)
        }
        else {
            return res.status(404).json({
                "message": "Please provide a valid Id"
            })
        }
    })
    .catch((err) => {
        return res.status(500).json({ message: 'Internal Server Error' });
    });
}

