const Discord = require("discord.js");

module.exports = {
    name: 'patch-notes',
    description: 'tells the user bot patch notes',
    execute(msg, args) {
        const patchNotesEmbed = new Discord.MessageEmbed()
            .setTitle('Patch Notes')
            .addField('Additions', `\nAdded the main bot code, and the ability to talk to guild chat through the bot. \n 
            Added the ability to see the info by doing .info.\n
            Added a character cap to avoid sending too long messages to the guild discord.\n 
            Added the patch notes embed.\n 
            Added custom status.\n
            Added the prefix . <- The prefix\n
            Added the ability for the bot to detect peoples usernames and show there minecraft head in the messages.\n
            Added the ability to see past patch notes (none currently)\n 
            Changed from detecting every message from every channel to only checking sending messages with .msg at the start.\n
            Added Join messages.\n
            Added Leave messages.\n
            Added guild bot blacklist.\n
            Added the ability to list the people on the blacklist.\n
            added in game commands to the info embed\n
            added /profile in game\n`)
            .setThumbnail('https://cdn.discordapp.com/icons/843568795620606012/6c2f887755f35a49e2eec06e578efcb4.png?size=128"')
            const patchNotesEmbed2 = new Discord.MessageEmbed()
            .setTitle('Patch Notes - Page 2')
            .addField('Additions', `            In the guild discord (currently staff only) .msg command is not needed to send messages, and still channel specific. \n
            Changed blacklist to role specific, not user specific.\n
            changed .info to tell if you are blacklisted\n
            gave the bot the ability to auto unmute itself.\n
            bots now able to mute other people in game\n
            bots now able to blacklist and unblacklist people
            bots now able to unmute other people in game\n
            Changed from 1 file to a ton of smaller files for organization`)
            .setThumbnail('https://cdn.discordapp.com/icons/843568795620606012/6c2f887755f35a49e2eec06e578efcb4.png?size=128"')
            msg.reply(patchNotesEmbed);
            msg.reply(patchNotesEmbed2);
    }
}