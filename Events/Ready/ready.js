const { Client, Events } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute (client) { 
    await loadCommands(client);
    console.log(`${client.user.username} is online!`);
}};