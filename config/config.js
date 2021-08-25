const db = require('./db');
const Configuration  = require('../config/configuration');

exports.dbSync = async function() {
    await db.sync().catch(console.error);
}