const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    run(client, message) {
        let queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);

        let track = queue.current;
        let embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        let methods = ['disabled', 'track', 'queue'];
        let timestamp = queue.getPlayerTimestamp();
        let trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`Audio **%${queue.volume}**\nDuration **${trackDuration}**\nLoop Mode **${methods[queue.repeatMode]}**\n${track. requestedBy}`);
        embed.setTimestamp();
        embed.setFooter('Edited by Korivash ❤️', message.author.avatarURL({ dynamic: true }));

        let saveButton = new MessageButton();
        saveButton.setLabel('Save Song');
        saveButton.setCustomId('saveTrack');
        saveButton.setStyle('SUCCESS');

        let row = new MessageActionRow().addComponents(saveButton);
        message.channel.send({ embeds: [embed], components: [row] });
    }
};