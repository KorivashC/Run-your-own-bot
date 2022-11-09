module.exports = {
  name: "playlist",
  category: "special",
  description: "Shows playlist",
  usage: "playlist",
  run: async (client, message, args) => {
    return message.reply(`You can check out my spotify playlist insert URL here`);
  }
};