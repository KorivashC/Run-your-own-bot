module.exports = async (client, config) => {
    const { MessageEmbed } = require('discord.js');
    const database = require('easy-json-database');
    const EZTwitch = require('@redcrafter07/eztwitch');
    
    let db = new database();
    let twitchClient = new EZTwitch.client().setID(config.twitch.id).setSecret(config.twitch.secret);
    await twitchClient.setup();
    setInterval(twitch, 60000);

    async function twitch(){
        let data = await EZTwitch.utils.getStreamInfo(config.twitch.channel, twitchClient);
        let online = data.startedAt == undefined ? false : true;
        let db_streamId = db.get(`${data.streamId}`);
        if(online && !db_streamId){
            db.set(`${data.streamId}`, true);
            embed(data) 
        }
    }

    async function embed(data){
        let server = client.guilds.cache.get(config.twitch.serverid);
        let channel = server.channels.cache.get(config.twitch.channelid);
        var embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`🔴 ${data.display} is live!`)
            .setImage(data.profileImage)
            .addField(`Viewers`, `${data.viewers}`, true)
            .addField(`Game`, `${data.game}`, true)
            .setDescription(data.title)
        channel.send({embeds: [embed], content: '@everyone'});
    }
}