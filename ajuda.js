var Discord = require("discord.js")
var config = require("../config.json")

module.exports = {
  name: "ajuda",
  description: "veja meu comandos",

  run: async (client, message, args) => {

    var embed = new Discord.EmbedBuilder()
      .setTitle(`${config.emojis.config} Veja meu comandos abaixo:`)
      .setDescription("Ajuda (Ver os comandos)\nBan (Banir usuários)\nBotinfo (Veja minhas informações)\nKick (Expulsar o usuário)\nLock (Trancar o canal)\nUnlock (Destrancar o canal)\nPing (Veja meu ping)\nSetavatar (Mudar o meu avatar)\nSuporte (Acessar o servidor de suporte)\nUnban (Desbanir o Usuário)")
    .setFooter({ text: "Creative © 202"})

    message.reply({ embeds: [embed] })
  }
}