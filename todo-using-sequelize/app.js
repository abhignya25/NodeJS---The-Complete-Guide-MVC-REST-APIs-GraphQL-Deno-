const express = require('express');
const parser = require('body-parser');

const sequelize = require('./util/sequelize');
const TodoItem = require('./models/Item') // Ensure that you import model models after the Sequelize instance is created in your app.js file. This makes sure the models are registered with Sequelize.
const itemRoutes = require('./routes/items');

const app = express();

app.use(parser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/items', itemRoutes);

// Creates tables automatically from models
sequelize.sync({ force: false })
    .then(() => {
        app.listen(3000)
    })
    .catch(err => {
        console.error('Failed to create tables:', err);
    });
