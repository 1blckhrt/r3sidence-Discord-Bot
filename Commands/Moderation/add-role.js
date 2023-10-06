const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-role")
        .setDescription("Select a member and give them a role.")
        .addUserOption(option =>
            option
                .setName("target")
                .setDescription("The member you would like to add a role to.")
                .setRequired(true))
        .addRoleOption(option => option
                .setName("role")
                .setDescription("The role you want to add.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),

        async execute (interaction, client) {
            const user = interaction.options.getUser("target");
            const roleUser = await interaction.guild.members.fetch(user.id);
            const roleName = interaction.options.getRole('role');
            const roles = ["945056035863941161", "1148452915330154557", "945055113607786516", "1132806320664354997", "1132815179697102899", "1148134870967656569", "955990940517040159", "1132817281144082452"];

            if (!user) return await interaction.reply({content: "The person mentioned is no longer within the server", ephemeral: true});
            if (roles.some(role => roleUser.roles.cache.get(role))) return await interaction.reply({content: "You do not have permission to give this role! Please have an r3 owner give this role manually!", ephemeral: true});
            if (roleUser.roles.cache.has(roleName.id)) return await interaction.reply({content: "This person already has this role!", ephemeral: true});

            await roleUser.roles.add(roleName);
            const icon = `${client.user.displayAvatarURL()}`;
            const embed = new EmbedBuilder()
            .setTitle("Add Role Executed!")
            .setColor("DarkButNotBlack")
            .setDescription(`${interaction.user} has added the ${roleName} role to ${user}.`)
            .setAuthor({name: "r3sidence", iconURL: icon})
            .setTimestamp()

            
            await interaction.reply({embeds: [embed]})
        },
};