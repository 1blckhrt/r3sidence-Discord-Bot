const { Events, EmbedBuilder } = require("discord.js");
const { filteredWords } = require("../../config.json");
module.exports = {
  name: Events.MessageCreate,
  once: false,
  async execute (message, client) {
    if (message.author.bot || message.author.id === "476468885088894986") return;
    else {
        channel = message.channel.id;
        const modChannel = client.channels.cache.get("1054992523434672128"); 

        if (filteredWords.some(word => message.content.toLowerCase().includes(word))) {
            const icon = `${client.user.displayAvatarURL()}`;
            const embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription(`${message.author}, your message has been deleted because it contains a blacklisted word!`)
            .setAuthor({name: "r3sidence", iconURL: icon})
            .setTimestamp()

            const logEmbed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription(`${message.author} has posted the following content in ${message.channel.name}. Their message will be deleted shortly.`)
            .setAuthor({name: "r3sidence", iconURL: icon})
            .addFields({name: "Content:", value:`${message.content}`})
            .setTimestamp()
    
            await message.channel.send({embeds: [embed]});
            await modChannel.send({embeds: [logEmbed]});
            console.log(message.content);
            await message.delete(message.id); 
        }
    }
  } 
}