const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Turns on slowmode in the specified channel.")
    .addIntegerOption(option => option.setName("duration").setDescription("The time of the slowmode.").setRequired(true))
    .addChannelOption(option => option.setName("channel").setDescription("The channel you want to turn slowmode on in.").addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.BanMembers)) return await interaction.reply({content: "You don't have permission to use this command!", ephemeral: true});
        const { options } = interaction;
        const duration = options.getInteger("duration");
        const channel = options.getChannel("channel") || interaction.channel;

        const icon = `${client.user.displayAvatarURL()}`;
        const embed = new EmbedBuilder()
        .setTitle("Slowmode Executed!")
        .setColor("DarkButNotBlack")
        .setDescription(`${channel} now has ${duration} second slowmode.`)
        .setAuthor({name: "r3sidence", iconURL: icon})
        .setTimestamp()

        channel.setRateLimitPerUser(duration).catch(err => {
            return;
        });

        await interaction.reply({embeds: [embed]});
    }
}