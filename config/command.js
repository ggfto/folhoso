const Sequelize = require('sequelize');
const database = require('./db');
 
const Command = database.define('command', {
    server: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.STRING,
        allowNull: true
    }
})
 
module.exports = Command;