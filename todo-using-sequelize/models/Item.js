const Sequelize = require('sequelize');
;
const sequelize = require('../util/sequelize');

const Item = sequelize.define('Items', {
    id: {
        type: Sequelize.STRING, // Use STRING to allow flexibility (e.g., UUID or custom IDs)
        allowNull: false, // Disallow NULL values
        primaryKey: true, // Marks this field as the primary key
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    priority: {
        type: Sequelize.ENUM('low', 'medium', 'high'), // Enum type for priority levels
        defaultValue: 'medium', // Default priority
    },
});

module.exports = Item;