const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "kick", // Coloque o nome do comando do arquivo
    aliases: ["expulsar"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        if (!message.member.permissions.has("KICK_MEMBERS")) {
            const embed = new Discord.EmbedBuilder()
                .setColor("Red")
                .setDescription("Você não possui permissão para utilizar este comando.");

            message.reply({ embeds: [embed] });
        } else {
            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            let motivo = args[1];

            if (!motivo) motivo = "Não definido.";

            if (!user) {
                const embed = new Discord.EmbedBuilder()
                    .setColor("#000000")
                    .setDescription(`${config.emojis.info} Aqui está o exemplo de kick ${config.emojis.seta} \`${config.config.prefix}kick [membro] [motivo]\``);

                message.reply({ embeds: [embed] });
            } else {
                user.kick(motivo)
                    .then(() => {
                        const embed = new Discord.EmbedBuilder()
                            .setColor("Green")
                            .setDescription(`${config.emojis.sim} O usuário \`${user.user.tag}\` foi expulso com sucesso.`);

                        message.reply({ embeds: [embed] });
                    })
                    .catch(e => {
                        const embed = new Discord.EmbedBuilder()
                            .setColor("Red")
                            .setDescription(`${config.emojis.nao} Não foi possível expulsar o usuário \`${user.user.tag}\`.`);

                        message.reply({ embeds: [embed] });
                    });
            }
        }
    }
}
