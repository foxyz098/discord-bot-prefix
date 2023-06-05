const Discord = require("discord.js")

module.exports = {
    name: "lock",
    aliases: ["lock"],
    author: "Patin",

    run: async (client, message, args) => {

        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            message.reply(`Você não possui a permissão \`Genrenciar Canais\` para poder uttilizar este comando.`)
        } else {

            let embed = new Discord.EmbedBuilder()
                .setTitle("Canal Tracado 🔒")
                .setColor('Red')
                .setDescription(`Este chat foi trancado com sucesso por: ${message.author} `)

            message.reply({ embeds: [embed] }).then(msg => {
                message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: false }).catch(e => {
                    console.log(e)
                    msg.edit(`❌ Ops, algo deu errado ao tentar destrancar este chat.`)
                })
            })
    
                }
            }        
    }