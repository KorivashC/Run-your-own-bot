module.exports = {
    name: 'resume',
    aliases: [],
    utilisation: '{prefix}resume',
    voiceChannel: true,

    run(client, message) {
        let queue = client.player.getQueue(message.guild.id);
        if (!queue) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);
        let success = queue.setPaused(false);
        return message.channel.send(success ? `**${queue.current.title}**, The song continues to play. ✅` : `${message.author}, Something went wrong. ❌`);
    },
};