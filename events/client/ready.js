const config = require('../../config/config');

module.exports = async (Discord, client) => {
    await config.dbSync();
    console.log('Folhoso is on');
}