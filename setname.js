const { EmbedBuilder } = require('discord.js');
const config = require("../config.json")

module.exports = {
  name: 'setname',
  description: 'Alterar nome do bot',
  run: async (client, message, args) => {
    const nome_bot = args.join(' ');

    const allowedIDs = ['923727443301367848', '1067587722379796652', '1112878766386069575'];

    if (!allowedIDs.includes(message.author.id)) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`**${message.author.tag}**, você não tem permissão para usar este comando.`)
            .setColor('Red')
            .setTimestamp(),
        ],
        ephemeral: true,
      });
    } else {
      message.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor('Green')
            .setDescription(`${config.emojis.sim} **${message.author.tag}**, alterei o meu nome para:\nName: ${nome_bot}`)
            .setTimestamp()
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL({ dynamic: true }) }),
        ],
      });

      setTimeout(() => {
        client.user.setUsername(nome_bot);
      }, 5000); // Espera 5 segundos antes de fazer a alteração
    }
  },
};
