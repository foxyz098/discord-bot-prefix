const { Permissions } = require('discord.js')
const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
  name: 'setstatus',
  description: 'Define o status do bot',

  run: async (client, message, args) => {

    const status = args[0];
    const description = args.slice(1).join(' ');

    if (!status) {
      return message.reply('Por favor, forneça um status válido.\nOpções disponíveis: `online`, `idle`, `dnd`, `invisible`');
    }

    const validStatuses = ['online', 'idle', 'dnd', 'invisible'];

    if (!validStatuses.includes(status)) {
      return message.reply('Status inválido. Opções disponíveis: `online`, `idle`, `dnd`, `invisible`');
    }

    try {
      client.user.setPresence({
        status: status,
        activities: [
          {
            name: description,
          },
        ],
      });

      const embed = new Discord.EmbedBuilder()
        .setColor('Green')
        .setDescription(`${config.emojis.sim} **Status Atualizado**\nOlá ${message.author}, o status e a descrição foram alterados com sucesso.\nStatus: \`${status}\`\nDescrição: \`${description}\``)


      message.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      message.reply('Ocorreu um erro ao definir o status.');
    }
  },
};
