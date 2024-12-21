const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance
const sequelize = new Sequelize('Todo', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Change to 'postgres', 'sqlite', or 'mssql' as needed,
});

module.exports = sequelize;
