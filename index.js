const { Client, GatewayIntentBits, Partials, Collection, Guild, ActivityType, EmbedBuilder, Embed} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;
const { errorHandler } = require("./Utils/errorHandler");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const {token} = require("./config.json");
const client = new Client({
    intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates ],
    partials: [User, Message, GuildMember, ThreadMember],
    presence: {activities: [{name: "R3 Radio", type:ActivityType.Listening}], status: "dnd"}
});

errorHandler(client);
client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

client.on("voiceStateUpdate", async (oldState, newState) => {
    const logChannel = client.channels.cache.get('1054992523434672128');
    const member = newState.member;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    if (!oldChannel && newChannel) {
        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Joined')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " joined " + `${newChannel}` + "!");
        
        await logChannel.send({embeds: [embed]});

    } else if (oldChannel && !newChannel) {
        const embed2 = new EmbedBuilder()
            .setTitle('Voice Channel Left')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " left " + `${oldChannel}` + "!");
        
        await logChannel.send({embeds: [embed2]});

    } else if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
        const embed3 = new EmbedBuilder()
            .setTitle('Voice Channel Switched')
            .setColor("DarkButNotBlack")
            .setDescription(member.user.tag + " left " + oldChannel.name + " and joined " + newChannel.name + "!");
        
        await logChannel.send({embeds: [embed3]});
    }
});

client.on('guildMemberRemove', member => {
    const logChannel = client.channels.cache.get('1054992523434672128');
    member.guild.fetchAuditLogs({limit: 1})
      .then(audit => {
        const banLog = audit.entries.find(entry => entry.target.id === member.id && entry.action === 'MEMBER_BAN_ADD');
        const kickLog = audit.entries.find(entry => entry.target.id === member.id && entry.action === 'MEMBER_KICK');
  
        if (!banLog && !kickLog) {
            const embed4 = new EmbedBuilder()
            .setTitle('Member Left')
            .setColor("DarkButNotBlack")
            logChannel.send(`${member.user.tag} left the server.`);
        }
      })
      .catch(console.error);
  });

client.login(client.config.token);