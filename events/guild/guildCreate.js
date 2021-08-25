const Configuration = require("../../config/configuration");

module.exports = async (Discord, client, guild) => {
    let config = await Configuration.findByPk(guild.id);
    if(config) await config.destroy();
    config = await Configuration.create({
        server: guild.id
    });
    await config.save();
}