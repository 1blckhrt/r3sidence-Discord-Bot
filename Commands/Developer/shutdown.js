const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false)
    .setDescription("Shuts down the bot."),
    async execute (interaction, client) {
        const adminRole = "945056035863941161";

        if (!interaction.member.roles.cache.has(adminRole)) return interaction.reply({content: "You do not have permission to use this command.", ephemeral: true});
        else {
            const embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setDescription(`:white_check_mark: The r3 bot has been shutdown!`)
            console.log(interaction.user.id + " has shut down the bot.")

            await interaction.reply({ content: "Shutting down your bot...", ephemeral: true});

            setTimeout( async () => {
                await interaction.editReply({content: ``, embeds: [embed]});
                client.destroy()
            }, 2000)
        }
    }
}