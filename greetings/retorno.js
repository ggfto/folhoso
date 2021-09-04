const cfg = require("../config/config");

const definition = {
    name: 'retorno',
    type: 'greeting',
    description: 'Mensagem de retorno randômica'
}

module.exports = {
    name: definition.name,
    description: definition.description,
    async execute(client, message, args, Discord) {
        if(await cfg.isActive(message.guild.id, definition) && await cfg.willTrigger(message.guild.id, definition)) {
            message.reply(cfg.getRandomReply(replyBank));
        }
    }
}

const replyBank = [
    "pensei que ia ficar o resto do dia atoa...",
    "finalmente ein?"
];