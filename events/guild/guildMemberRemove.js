const Configuration = require("../../config/configuration");

module.exports = async (Discord, client, member) => {
    let config = await Configuration.findByPk(member.guild.id).catch(console.error);
    if(config && config.goodbye_channel_id && config.greeting_message) {
        const channel = member.guild.channels.cache.find(ch => ch.id == config.goodbye_channel_id);
        const msg = config.goodbye_message.replace("_membro_", member).replace("_servidor_", message.guild.name).replace("_data_", new Date());
        let obj = undefined;
        try {
            obj = JSON.parse(msg);
        } catch(error) {}
        if(obj) channel.send(obj).catch(console.error);
        else  channel.send(msg).catch(console.error);
    }
}