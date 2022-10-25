
const { MessageEmbed } = require("discord.js");

module.exports = async function (client, config) {
    client.on("guildMemberAdd", async member => {
        member.roles.add(config.roles.welcome);
        let channel = await client.channels.cache.get(config.channels.logger);
        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(member.guild.name, member.guild.iconURL())
            .setDescription(`${member.user} joined the server. \nNow we have **${member.guild.memberCount}** members!`);
        channel.send({embeds: [embed]});
    });

    client.on("guildMemberRemove", async member => {
        let channel = await client.channels.cache.get(config.channels.logger);
        let embed = new MessageEmbed()
            .setColor("RED")
            .setAuthor(member.guild.name, member.guild.iconURL())
            .setDescription(`${member.user} left the server. \nNow we have **${member.guild.memberCount}** members!`);
        channel.send({embeds: [embed]});
    });
};

