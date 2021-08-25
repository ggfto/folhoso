const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/db/db.sqlite'
});

module.exports = sequelize;