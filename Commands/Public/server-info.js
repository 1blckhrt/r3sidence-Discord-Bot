const { SlashCommandBuilder, EmbedBuilder, Emoji, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("View information about the server."),
    async execute (interaction) {

        const { guild } = interaction;
        const { members } = guild;
        const { name, ownerId, createdTimestamp, memberCount } = guild;
        const icon = guild.iconURL() || 'https://cdn.discordapp.com/attachments/1148454727646978150/1148927950129999922/r3_logo.jpg';
        const roles = guild.roles.cache.size;
        const emojis = guild.emojis.cache.size;
        const id = guild.id;

        let baseVerification = guild.VerificationLevel;

        if (baseVerification == 0) baseVerification = "None"
        if (baseVerification == 1) baseVerification = "Low"
        if (baseVerification == 2) baseVerification = "Medium"
        if (baseVerification == 3) baseVerification = "High"
        if (baseVerification == 4) baseVerification = "Very High"

        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Discord Server")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.gg/r3sidence"),

            new ButtonBuilder()
            .setLabel("SoundCloud Page")
            .setStyle(ButtonStyle.Link)
            .setURL("https://soundcloud.com/r3sidence"),

            new ButtonBuilder()
            .setLabel("Instagram Page")
            .setStyle(ButtonStyle.Link)
            .setURL("https://instagram.com/r3sidentiary"),

            new ButtonBuilder()
            .setLabel("Official Website + Merch Store")
            .setStyle(ButtonStyle.Link)
            .setURL("https://r3sidence.net/"),
   
        )

        const embed = new EmbedBuilder()
        .setTitle("Server Info")
        .setColor("DarkButNotBlack")
        .setThumbnail(icon)
        .setAuthor({ name: name, iconURL: icon })
        .setFooter({ text: `Server ID: ${id}` })
        .setTimestamp()
        .addFields({ name: "Name:", value: `${name}`, inline: false })
        .addFields({ name: "Date Created", value: `<t:${parseInt(createdTimestamp / 1000)}:R> (hover for complete date)`, inline:true })
        .addFields({ name: "Server Owner", value: "wystenia & tungsten", inline:true })
        .addFields({ name: "Server Members", value: `${memberCount}`, inline:true })
        .addFields({ name: "Role Number", value: `${roles}`, inline:true })
        .addFields({ name: "Emoji Number", value: `${emojis}`, inline:true })
        .addFields({ name: "Verification Level", value: `${baseVerification}`, inline: true})
        .addFields({ name: "Server Boosts", value: `${guild.premiumSubscriptionCount}`, inline:true });

        await interaction.reply({embeds: [embed], components: [row]});
    }
}