module.exports = {
    name: 'volume',
    aliases: ['vol'],
    utilisation: `{prefix}volume [1-${100}]`,
    voiceChannel: true,

    run(client, message, args) {
        let queue = client.player.getQueue(message.guild.id);
        
        if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);
        let vol = parseInt(args[0]);
        
        if (!vol) return message.channel.send(`Current volume: **${queue.volume}** 🔊\n**To change the volume, with \`1\` to \`${100}\` Type a number between.**`);
        if (queue.volume === vol) return message.channel.send(`${message.author}, The volume you want to change is already the current volume ❌`);
        if (vol < 0 || vol > 100) return message.channel.send(`${message.author}, **Type a number from \`1\` to \`${100}\` to change the volume .** ❌`);
        
        let success = queue.setVolume(vol);
        return message.channel.send(success ? `Volume changed: **%${vol}**/**${100}** 🔊` : `${message.author}, Something went wrong. ❌`) ;
    },
};