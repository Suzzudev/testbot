const discord = require('discord.js')

module.exports = {
    name : 'spam-b9ss',
    description : 'Spams b9ss',
    execute(msg, args) {
        msg.channel.bulkDelete(1);
        setInterval(function () {
            var player = msg.guild.member(msg.mentions.users.first());
            player.send("val?");
            console.log('sent');

        }, 1000)
    }
}
