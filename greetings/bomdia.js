const cfg = require("../config/config");

const definition = {
    name: 'bomdia',
    type: 'greeting',
    description: 'Mensagem de bom dia randômica'
}

module.exports = {
    name: definition.name,
    description: definition.description,
    async execute(client, message, args, Discord) {
        if(await cfg.isActive(message.guild.id, definition) && await cfg.willTrigger(message.guild.id, definition))
            message.reply(cfg.getRandomReply(replyBank));
    }
}

const replyBank = [
    "bom dia pra quem?",
    "bom dia princesa!",
    "bom dia? Só se for pra você!",
    "bom dia? Tá mais pra boa tarde!",
    "finalmente ein?"
];