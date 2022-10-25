const fs = require('fs');
const yt = require('yt-channel-info');
let database = require('easy-json-database');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, config) => {
    let db = new database();
    
    getNewVideos();
    setInterval(getNewVideos, 60000);
    async function getNewVideos() {
        try {
            let payload = {
                channelId: config.youtube.channel, // Required
                sortBy: 'newest',
                channelIdType: 0
             }
            let videos = (await yt.getChannelVideos(payload)).items;
            let db_videoID = db.get(`${videos[0].videoId}`);
            if(!db_videoID){
                embed(videos[0]);
                db.set(`${videos[0].videoId}`, true);
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    async function embed(data){
        let server = client.guilds.cache.get(config.youtube.serverid);
        let channel = server.channels.cache.get(config.youtube.channelid);
        var embed = new MessageEmbed()
            .setColor("RED")
            .setAuthor(`📢 ${data.author} is published new video!`)
            .setImage(data.videoThumbnails[2].url)
            .addField(`Video Name`, `${data.title}`, true)
            .addField(`Video Duration`, `${data.durationText} minutes`, true)
        channel.send({embeds: [embed], content: '@everyone'});
    }
}