module.exports = {
    name: 'progress',
    aliases: ["time"],
    utilisation: '{prefix}progress',
    voiceChannel: true,

    async run(client, message) {
        let queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);
        let progress = queue.createProgressBar();
        let timestamp = queue.getPlayerTimestamp();
        if (timestamp.progress == 'Infinity') return message.channel.send(`This song is live streaming, no duration data to display. 🎧`);
        message.channel.send(`${progress} (**${timestamp.progress}**%)`);
    },
};