const Discord = require('discord.js');

module.exports = {
    name: 'list-blacklist',
    description: 'lists the blacklist',
    execute(msg, args){
        const blacklistEmbed = new Discord.MessageEmbed()
            .setTitle("blacklist")
            .addField("People added to blacklist - ", "No_blank_characters /              <- actual username")
            .setThumbnail('https://cdn.discordapp.com/icons/843568795620606012/6c2f887755f35a49e2eec06e578efcb4.png?size=128')
            msg.reply(blacklistEmbed);
    }
}