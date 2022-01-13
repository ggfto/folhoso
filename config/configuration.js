const Sequelize = require('sequelize');
const database = require('./db');

const Configuration = database.define('configuration', {
    server: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    welcome_channel_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    goodbye_channel_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    greeting_message: {
        type: Sequelize.STRING,
        allowNull: true
    },
    goodbye_message: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Configuration;