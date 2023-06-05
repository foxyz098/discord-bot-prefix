const { EmbedBuilder } = require('discord.js')
const config = require("../config.json")

module.exports = {
  name: 'setavatar',
  description: 'Alterar o avatar do bot',
  run: async (client, message, args) => {
    const avatarURL = args[0];

    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply(`${config.emojis.nao} Você não tem permissão para usar este comando.`);
    }

    if (!avatarURL) {
      return message.reply('Por favor, forneça uma URL válida para o novo avatar.\nExemplo de uso: `!setavatar <URL>`');
    }

    try {
      await client.user.setAvatar(avatarURL);
      
      const embed = new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${config.emojis.sim} Avatar alterado com sucesso!`)
        .setImage(avatarURL);

      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao alterar o avatar.');
    }
  },
};
