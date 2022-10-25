const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "commands",
  category: "special",
  description: "Shows commands",
  usage: "commands",
  run: async (client, message, args) => {
    let B = `\n`;
    let desc = ``;
    let admin = `**Admin commands:**`;
    admin += B +`**!ban** - Ban the user from server <!ban @user reason>`;
    admin += B +`**!kick** - Kick the user from server <!kick @user reason>`;
    admin += B +`**!purge** - Delete messages from channel <!purge amount>`;

    let public = `**User commands:**`;
    public += B + `**!hoop** - Shows our hoop link`;
    public += B + `**!socials** - Shows our socials link`;
    public += B + `**!pokemon** - Shows pokemon game details`;
    public += B + `**!playlist** - Shows our Spotify playlist`;
    public += B + `**!twitch** - Shows our Twitch channel link`;
    public += B + `**!streamschedule** - Shows stream schedule`;
    public += B + `**!communityplaylist** - Shows our community's Spotify playlist`;

    let music = `**Music commands:**`;
    music += B + `**!back** - Back to previous song`;
    music += B + `**!clear** - Clear the queue`;
    music += B + `**!loop** - Loop currently song`;
    music += B + `**!nowplaying** - Shows information about currently song`;
    music += B + `**!pause** - Pause the currently song`;
    music += B + `**!play** - Play the song`;
    music += B + `**!progress** - Shows currently song's progress`;
    music += B + `**!queue** - Shows currently queue`;
    music += B + `**!resume** - Resume the currently song`;
    music += B + `**!skip** - Skip the currently song`;
    music += B + `**!stop** - Stop the song`;
    music += B + `**!volume** - Chane the song volume`;

    if (message.member.permissions.has("ADMINISTRATOR")){
      desc = admin += B + B + public + B + B + music;
    } else {
      desc = public + B + B + music;
    }

    var embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(desc)
    message.reply({embeds: [embed]});
  }
};