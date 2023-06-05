const { ButtonStyle } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'suporte',
  description: 'Comando com um botão e um embed',
  run: async (client, message, args) => {
    // Criar o botão
    const button = new ButtonBuilder()
      .setCustomId('botao1')
      .setLabel('🔧 Suporte')
      .setStyle(ButtonStyle.Danger);

    // Criar a linha de ação com o botão
    const buttonRow = new ActionRowBuilder().addComponents(button);

    // Criar o embed
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('Suporte - Creative Store')
      .setDescription('★ Clique o botão abaixo para acessar o meu servidor de suporte e minha loja!')
        .setFooter({ text: `Creative Store © 2023`})    .setImage("https://media.discordapp.net/attachments/1113913043844354141/1115033111135269014/Creative.gif?width=713&height=401")
    

    // Enviar a mensagem com o botão e o embed
    const messageSent = await message.channel.send({ embeds: [embed], components: [buttonRow] });

    // Aguardar o evento de interação com o botão
    const collector = messageSent.createMessageComponentCollector({ time: 15000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'botao1') {
        await interaction.reply('Aqui o servidor de suporte => https://discord.gg/A8NQfDTrea');
      }
    });

    collector.on('end', () => {
      // Remover o botão da mensagem após o tempo limite (15 segundos)
      messageSent.edit({ components: [] });
    });
  },
};
