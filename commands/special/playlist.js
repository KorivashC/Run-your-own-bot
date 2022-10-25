module.exports = {
  name: "playlist",
  category: "special",
  description: "Shows playlist",
  usage: "playlist",
  run: async (client, message, args) => {
    return message.reply(`You can check out my spotify playlist here: https://open.spotify.com/playlist/4qVFBMFyWno44XkugUnBIq?si=51c48af42fd3431c`);
  }
};