const ms = require("ms");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'castigo',
  description: 'Coloque algum usuário de castigo.',
  run: async (client, message, args) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('Você não possui permissão para utilizar esse comando.');
    }

    const usuario = message.mentions.users.first();
    if (!usuario) {
      return message.reply('Você precisa mencionar um usuário para colocar de castigo.');
    }

    const tempo = args[1];
    if (!tempo || typeof tempo !== 'string') {
      return message.reply('Você precisa fornecer um tempo válido para o castigo.');
    }

    const motivo = args.slice(2).join(' ') || 'Nenhum';
    const membro = message.guild.members.cache.get(usuario.id);
    if (!membro) {
      return message.reply('Não foi possível encontrar o usuário no servidor.');
    }

    const duracao = ms(tempo);
    if (!duracao) {
      return message.reply('O tempo fornecido não é válido. Certifique-se de usar um formato correto (ex: 1h, 30m, 1d).');
    }

    const ryanEmbed = new EmbedBuilder()
      .setColor('Green')
      .setDescription(`O usuário ${usuario} (${usuario.id}) foi castigado com sucesso pelo motivo \`${motivo}\` com a duração de \`${tempo}\`.`)
      .setFooter({ text: `Comando requisitado por: ${message.author.tag}`});

    const erroEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription('Houve um erro ao tentar colocar esse usuário de castigo.');

    membro.timeout(duracao, motivo)
      .then(() => {
        message.reply({ embeds: [ryanEmbed] }).catch(e => {
          message.reply({ embeds: [erroEmbed] });
        });
      });
  },
};
