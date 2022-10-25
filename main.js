const fs = require('fs');
const Enmap = require("enmap");
const config = require('./config');
const { Player } = require('discord-player');
const { Client, Intents, MessageEmbed, Collection } = require("discord.js");

const client = new Client({ intents: [ 
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
] }, { fetchAllMembers: true });

client.player = new Player(client, {ytdlOptions: { quality: 'highestaudio', highWaterMark: 1 << 25 }});
client.points = new Enmap({ name: "points" });
const player = client.player;

client.login(config.bot_token);

client.on('ready', () => {
    client.user.setStatus('Online');
    client.commands = new Collection();
    client.user.setActivity(config.bot_playing);
    console.log(`Logged in as ${client.user.tag}!`);

    readHelpers();
    readCommands();
});

function readCommands(){
    fs.readdirSync("./commands/").forEach(dirs => {
        let commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
        
        for (let file of commands) {
            let pull = require(`./commands/${dirs}/${file}`);
            client.commands.set(pull.name, pull);
        };
    });
}

function readHelpers(){
    fs.readdirSync("./helpers/").forEach(file => {
        require(`./helpers/${file}`)(client, config);
    });
    let pull = require(`./interactionCreate.js`);
    client.on('interactionCreate', pull.bind(null, client));
}

client.on('message', async (message) => {
    const args = message.content.slice(config.bot_prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(!message.author.bot){
        if (cmd.length === 0) return;
        let command = client.commands.get(cmd);
        if (command) command.run(client, message, args);
    }
});

player.on('error', (queue, error) => {
    console.log(`There was a problem with the song queue => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`I'm having trouble connecting => ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`🎵 Music started playing: **${track.title}** -> Channel: **${queue.connection.channel.name}** 🎧`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`**${track.title}** added to playlist. ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('Someone from the audio channel Im connected to kicked me out, the whole playlist has been cleared! ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('I left the audio channel because there is no one on my audio channel. ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('All play queue finished, I think you can listen to some more music. ✅');
});