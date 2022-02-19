const discord = require('discord.js');

module.exports = {
    name: 'embedexample', //Make sure it is the same as the file name.
    description: 'Does not matter here but optional',
    execute(msg, args) { //You can add more variables if you need, for example : (variable),(variable2)
        const infoEmbed = new discord.MessageEmbed()
        .setTitle('This is the title')
        .addField('example', 'Adds a field with the name example and then this as its text')

        msg.reply(infoEmbed);
    }
}