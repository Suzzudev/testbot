const Discord = require('discord.js');

module.exports = {
    name: 'old-patch-notes',
    description: 'shows previous patch notes',
    execute(msg, args) {
        const oldPatchNotesEmbed = new Discord.MessageEmbed()
            .setTitle('Previous Patch notes')
            .addField('Patch Notes :', '\nNo previous patch notes, seems its the first update!')
            .setThumbnail('https://cdn.discordapp.com/icons/843568795620606012/6c2f887755f35a49e2eec06e578efcb4.png?size=128"')
            msg.reply(oldPatchNotesEmbed);
    }
}