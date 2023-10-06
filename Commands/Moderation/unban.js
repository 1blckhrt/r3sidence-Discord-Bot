const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Select a member and unban them.")
        .addStringOption(option =>
            option
                .setName("target")
                .setDescription("The User ID of the person you want to unban.")
                .setRequired(true))
        .addStringOption(option => option
                .setName("reason")
                .setDescription("The reason for unbanning.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

        async execute(interaction, client) {
            if (!interaction.member.permissions.has(PermissionsBitField.BanMembers)) return await interaction.reply({content: "You don't have permission to use this command!", ephemeral: true});
            const target = interaction.options.getString('target');
            const reason = interaction.options.getString('reason') ?? 'No reason provided';
    
            await interaction.guild.members.unban(target);
            const icon = `${client.user.displayAvatarURL()}`;
            const embed = new EmbedBuilder()
            .setTitle("Unban Executed!")
            .setColor("DarkButNotBlack")
            .setDescription(`${target} has been successfully unbanned by ${interaction.user} for ${reason}.`)
            .setAuthor({name: "r3sidence", iconURL: icon})
            .setTimestamp()
       
    await interaction.reply({embeds: [embed]});
            }
        }