module.exports = {
    bot_token: "", //your discord bot token
    bot_prefix: "!", // your bot prefix
    bot_playing: "", // bot playing section
    level_embed: "RED",
    rolemessageID: "", // Enter your role message ID
    twitch: {
        serverid: "", //discord server id
        channelid: "", //discord channel id for share notification
        id: "", // This can be found in your twitch dev panel 
        secret: "", // This can be found in your twitch dev panel
        channel: "" // Enter the channel name you would like to broadcast here
    },
    youtube: {
        serverid: "", //discord server id
        channelid: "", //discord channel id for share notification
        channel: "" // Enter the channel ID here
    },
    roles: {
        "welcome": "", //role id for auto give welcome role
        "✅": "" // role id for auto give welcome role
    },
    channels: {
        role: "974087623356338239", // Do not touch
        logger: "" //channel id for send join/leave messages
    }
};