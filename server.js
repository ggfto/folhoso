require('dotenv').config();
const Discord = require("discord.js");
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.greetings = new Discord.Collection();
client.config = {};

['command_handler','greeting_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.BOT_TOKEN);

// if the Promise is rejected this will catch it
process.on('unhandledRejection', error => {
    throw error
});

process.on('uncaughtException', error => {
    console.error(error);
});