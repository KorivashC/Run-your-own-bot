const {
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'embed',
    aliases: ["embed"],
    description: 'Embed generator',
    category: "info",
    run: async (client, message, args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("**You don't have the Administrator role to use this command**");
        
        const filter = m => m.author.id == message.author.id;
        const embed = new MessageEmbed();
        message.channel.send("Type **skip** for skip the input, type **cancel** to stop the command.");
        message.channel.send("Do you want your embed to have any title? Write skip or title");

        message.channel.createMessageCollector({ filter, max: 1 }).on('collect', title => {
            if (title.content == 'cancel') return message.channel.send('Embed generator cancelled.');
            if (title.content !== 'skip' && title.content !== 'cancel') embed.setTitle(title.content);

            message.channel.send("Do you want your embed to have a linked title? Write skip or link");
            message.channel.createMessageCollector({ filter, max: 1 }).on('collect', link => {
                if (link.content == 'cancel') return message.channel.send('Embed generator cancelled.');
                if (link.content !== 'skip' && link.content !== 'cancel') embed.setURL(link.content);

                message.channel.send("Do you want add thumbnail to your embed? Write skip or thumbnail link");
                message.channel.createMessageCollector({ filter, max: 1 }).on('collect', thumbnail => {
                    if (thumbnail.content == 'cancel') return message.channel.send('Embed generator cancelled.');
                    if (thumbnail.content !== 'skip' && thumbnail.content !== 'cancel') embed.setThumbnail(thumbnail.content);

                    message.channel.send("Great! Do you want your embed to have any description? Write skip or description");
                    message.channel.createMessageCollector({ filter, max: 1 }).on('collect', description => {
                        if (description.content == 'cancel') return message.channel.send('Embed generator cancelled.')
                        if (description.content !== 'skip' && description.content !== 'cancel') embed.setDescription(description.content);

                        message.channel.send("So, Do you want your embed to have any footer? Write skip or footer");
                        message.channel.createMessageCollector({ filter, max: 1 }).on('collect', footer => {
                            if (footer.content == 'cancel') return message.channel.send('Embed generator cancelled. ')
                            if (footer.content !== 'skip' && footer.content !== 'cancel') embed.setFooter(footer.content);

                            message.channel.send("Do you want add image to your embed? Write skip or image link");
                            message.channel.createMessageCollector({ filter, max: 1 }).on('collect', image => {
                                if (image.content == 'cancel') return message.channel.send('Embed generator cancelled.');
                                if (image.content !== 'skip' && image.content !== 'cancel') embed.setImage(image.content);

                                message.channel.send("So, Do you want your embed to have any specific color? Write skip or color");
                                message.channel.createMessageCollector({ filter, max: 1 }).on('collect', color => {
                                    if (color.content == 'cancel') return message.channel.send('Embed generator cancelled.');
                                    if (color.content !== 'skip' && color.content !== 'cancel') embed.setColor(color.content.toUpperCase() || "2f3136");

                                    message.channel.send("So, Do you want your embed to have any author field? Write skip or field");
                                    message.channel.createMessageCollector({ filter, max: 1 }).on('collect', author => {
                                        if (author.content == 'cancel') return message.channel.send('Embed generator cancelled.')
                                        if (author.content !== 'skip' && author.content !== 'cancel') embed.setAuthor(author.content);

                                        message.channel.send("So, Do you want your embed to have any TimeStamp? Reply **yes** or **no**");
                                        message.channel.createMessageCollector({ filter, max: 1 }).on('collect', timeStamp => {
                                            if (timeStamp.content == 'cancel') return message.channel.send('Embed generator cancelled.');
                                            if (timeStamp.content == 'yes') embed.setTimestamp();

                                            message.channel.send("Please type the channel id to share the embed or type cancel. If you want use multiple channel please split them with '**-**'\nExample: channelid1-channelid2");
                                            message.channel.createMessageCollector({ filter, max: 1 }).on('collect', async channelsID => {
                                                if (channelsID.content == 'cancel') return message.channel.send('Embed generator cancelled.');
                                                let channels = channelsID.content.split('-');
                                                channels.forEach(async channelID => {
                                                    let channel = await client.channels.fetch(channelID);
                                                    channel.send({ embeds: [embed] });
                                                });    
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}