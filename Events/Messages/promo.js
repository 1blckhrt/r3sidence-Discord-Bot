const { Events, EmbedBuilder } = require("discord.js");
module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute (message, client) {
    if (message.author.bot) return;
    else {
        const channel = message.channel.id;
        const roles = ["1054991162492080169", "1055036193303183370", "1062049756689481858", "1140844190465544295", "1140076225348522084", "1038595954665852949", "945068041388048387", "945056035863941161", "1148452915330154557", "945055113607786516", "1132806320664354997", "1132815179697102899", "1148134870967656569", "955990940517040159", "1132817281144082452", "945070121381159063", "1097642066571436164"];
        const words = ["promo", " promo "];

        if (channel === "945053887566590044") {
            const checkChannel = true;

            if (roles.some(role => message.member.roles.cache.get(role))) return;
            else {
                if (words.some(word => message.content.toLowerCase().includes(word))) {
                    const checkWord = true;
            
                    if (checkChannel === true && checkWord === true ) {
                        try {
                            console.log(message.content);
                            const icon = `${client.user.displayAvatarURL()}`;
                            const embed = new EmbedBuilder()
                            .setColor("DarkButNotBlack")
                            .setDescription(`${message.member}, to be able to use the promo channel, you must be level 5 in mee6! You can gain levels by simply talking in the server. You can run /rank in the commands channel to view your level.`)
                            .setAuthor({name: "r3sidence", iconURL: icon})
                            .setTimestamp()
                            await message.channel.send({embeds: [embed]})
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
        }
    }}};
