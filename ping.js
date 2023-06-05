const Discord = require("discord.js")

module.exports = {
  name: "ping",
  description: "Ver meu ping", 
  
  run: async(client, message, args) => {
    var ping = client.ws.ping;
    
    var embed = new Discord.EmbedBuilder()
      .setColor("Random")
    .setDescription(`🏓 Pong! | ${ping}ms`)
    .setFooter({ text: `Creative Store © 2023` })
     
  message.reply({ embeds: [embed] })
  }
}