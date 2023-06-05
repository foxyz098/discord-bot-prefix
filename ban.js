const Discord = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Banir um usuário.',
  
  run: async (client, message, args) => {
    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply('Você não possui permissão para banir membros.');
    }

    const banLogsChannelId = '1113913043844354141'; // Coloque o ID do canal de texto onde ficará as logs.
    if (!message.guild.channels.cache.has(banLogsChannelId)) {
      return message.reply('O canal de logs de banimentos não foi encontrado.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Mencione o usuário que deseja banir.');
    }

    const motivo = args.slice(1).join(' ') || 'Não definido.';

    const embed = new Discord.EmbedBuilder()
      .setTitle('Novo Banimento')
      .setDescription(`**Usuário:** ${user}\n**Motivo:** ${motivo}`)
      .setColor('Red')
      .setFooter({ text: `Author: ${message.author.tag}`});

    const member = message.guild.members.cache.get(user.id);
    if (member) {
      try {
        await member.ban({ reason: motivo });
        message.guild.channels.cache.get(banLogsChannelId).send({ embeds: [embed] });
        message.reply(`O usuário ${user} foi banido com sucesso.`);
      } catch (error) {
        console.error(error);
        message.reply(`Ocorreu um erro ao banir o usuário ${user}.`);
      }
    } else {
      message.reply('O usuário mencionado não foi encontrado no servidor.');
    }
  },
};
