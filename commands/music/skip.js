module.exports = {
    name: 'skip',
    aliases: [],
    utilisation: '{prefix}skip',
    voiceChannel: true,

    run(client, message) {
        let queue = client.player.getQueue(message.guild.id);
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);
        let success = queue.skip();
        return message.channel.send(success ? `**${queue.current.title}**, Skipped song ✅` : `${message.author}, Something went wrong ❌`);
    },
};