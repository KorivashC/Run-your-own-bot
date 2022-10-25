module.exports = {
  name: "communityplaylist",
  category: "special",
  description: "Shows community playlist",
  usage: "communityplaylist",
  run: async (client, message, args) => {
    return message.reply(`https://open.spotify.com/playlist/2AvtgzjWYFMlfIbI147Cgb?si=8698db12cc124287`);
  }
};