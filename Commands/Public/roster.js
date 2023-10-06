const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
data: new SlashCommandBuilder()
.setName("roster")
.setDescription("Displays the r3sidence roster."),
async execute(interaction, client) {
    const icon = `${client.user.displayAvatarURL()}`;
    const embed = new EmbedBuilder()
    .setTitle("Roster")
    .setColor("DarkButNotBlack")
    .setDescription(`${interaction.user}, here is the roster:`)
    .setAuthor({name: "r3sidence", iconURL: icon})
    .setTimestamp()
    .addFields({name: "Link: ", value: `https://www.r3sidence.net/main/roster`})

    await interaction.reply({embeds: [embed]})
}
};