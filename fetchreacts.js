module.exports = async (client, config, db) => {
    let msg = await client.channels.cache.get(config.channels.role).messages.fetch(config.role_messageID);
    let collector = msg.first().createReactionCollector({ dispose: true });
    
    collector.on('collect', async(reaction, usr) => {
        let user = await msg.first().guild.members.fetch(usr.id);
        let role = reaction.emoji.name;

        if(config.roles[role]){
            await user.roles.add(config.roles[role]);
        }
    });
        
    collector.on('remove', async(reaction, usr) => {
        let user = await msg.first().guild.members.fetch(usr.id);
        let role = reaction.emoji.name;
        
        if(config.roles[role]){
            user.roles.remove(config.roles[role]);
        }
    });
};