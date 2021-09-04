const cfg = require("../config/config");

const definition = {
    name: 'saindo',
    type: 'greeting',
    description: 'Mensagem de adeus randômica'
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
    "mundo caindo e você indo embora?",
    "quem te liberou?",
    "com autorização de quem?",
    "a Rachel tá sabendo?",
    "tem OS na sua fila?",
    "que Nossa Senhora do Parto te dê boas dores!",
    "como assim?",
    "você tá liberado! Bom descanso!",
    "a Complementar tá funcionando?"
];