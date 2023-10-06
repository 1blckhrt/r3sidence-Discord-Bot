const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Shuts down the r3sidence bot."),
    async execute (interaction) {
        if (!interaction.user.id === "800222752572702731" || !interaction.user.id === "490977674563420160" || !interaction.user.id === "476468885088894986") await interaction.reply({content: "You must be the developer of this bot to run this command!", ephemeral: true});
        else {
            const embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription(`:white_check_mark: The r3sidence bot has been shutdown!`)

            await interaction.reply({ content: "Shutting down your bot...", ephemeral: true});

            setTimeout( async () => {
                await interaction.editReply({content: ``, embeds: [embed]});
                process.exit();
            }, 2000)
        }
    }
}