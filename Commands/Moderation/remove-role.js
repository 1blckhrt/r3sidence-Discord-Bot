const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-role")
        .setDescription("Select a member and remove one of their roles.")
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("The member you would like to remove a role from.")
                .setRequired(true))
        .addRoleOption(option => option
                .setName("role")
                .setDescription("The role you want to remove.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

        async execute (interaction, client) {
            const user = interaction.options.getUser("target");
            const roleUser = await interaction.guild.members.fetch(user.id);
            const roleName = interaction.options.getRole('role');
            const roles = ["945056035863941161", "1148452915330154557", "945055113607786516", "1132806320664354997", "1132815179697102899", "1148134870967656569", "955990940517040159", "1132817281144082452"];

            if (!user) return await interaction.reply({content: "The person mentioned is no longer within the server", ephemeral: true});
            if (roles.some(role => roleUser.roles.cache.get(role))) return await interaction.reply({content: "You do not have permission to remove this role! Please have an r3 owner remove this role manually!", ephemeral: true});
            if (!roleUser.roles.cache.has(roleName.id)) return await interaction.reply({content: "This person doesn't have this role!", ephemeral: true});

            await roleUser.roles.remove(roleName);
            const icon = `${client.user.displayAvatarURL()}`;
            const embed = new EmbedBuilder()
            .setTitle("Role Removal Executed!")
            .setColor("DarkButNotBlack")
            .setDescription(`${interaction.user} has removed the ${roleName} role from ${user}.`)
            .setAuthor({name: "r3sidence", iconURL: icon})
            .setTimestamp()

            
            await interaction.reply({embeds: [embed]})
        },
};