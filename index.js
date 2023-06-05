const Discord = require("discord.js");
const config = require("./config.json");

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
        allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: false
        },
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
        ],
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.Reaction,
        ],
});

const canalId = '1113913043844354141'; 

/*client.on('ready', () => {
    setInterval(() => {
              let canal = client.channels.cache.get(canalId)//id do canal.
      var embed = new Discord.EmbedBuider()
      .setDescription("teste")
             message.canal.send({ embeds: [embed] })//mensagem aqui
            }, 100000)//tempo que a mensagem sera enviada.
              console.log('menssagem enviada')
})
*/
client.login(config.config.token);

client.on('messageCreate', message => {
  if (message.author.bot || message.channel.type === 'DM') return;
  
  if (!message.content.toLowerCase().startsWith(config.config.prefix)) return;
  
  const args = message.content.slice(config.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  try {
    const commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error('Erro ao executar o comando:', err);

  }
});

client.guildSettings = new Map();
  
client.on('ready', () => {
  console.log(`Bot está online!`);

  // Defina os status que deseja usar
  const statuses = [
    { name: "discord.gg/panicox", type: "0"},
  ];

  setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status.name, { type: status.activity });
  }, 2000); // Altere o valor em milissegundos para definir a frequência de atualização do status
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Rejeição não tratada:', reason);
});

process.on('uncaughtException', (err, origin) => {
  console.error('Exceção não capturada:', err);
});

