const Discord = require("discord.js");

module.exports = {
  name: "botinfo",
  description: "Ver meu ping", 
  
  run: async (client, message, args) => {
    var ping = client.ws.ping;
    var host = "Discloud";
    var ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB'}`;
    var up = client.readyTimestamp;
    var linguagem = "Discord.JS";

    const embed = new Discord.EmbedBuilder()
      .setTitle("Botinfo - Panic Moderator")
      .setColor("Blue")
      .setDescription(`> Olá, eu sou o ${client.user.username}, sou um bot de moderação para organizar o servidor ${message.guild.name} \n\n Fui criado por:\n Creative Store \n\n Host:\n ${host} \n\nRam: \n${ram} \n\n Ping: \n${ping}ms \n\nLinguagem:\n ${linguagem}`)
      .setFooter({ text: `Creative Store © 2023`})    .setImage("https://media.discordapp.net/attachments/1113913043844354141/1115033111135269014/Creative.gif?width=713&height=401")
    
    message.reply({ embeds: [embed] });
  }
}