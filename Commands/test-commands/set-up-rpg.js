const { MessageMentions } = require('discord.js');

discord = require('discord.js');


var emojiArray = ['❌' , '✔']


module.exports = {
    name : 'set-up-rpg',
    description : 'Sets up the rpg part',
    execute(msg,args) {
        message = msg.reply('You sure you want to set this up? It stops all other processes.')
        .then((message) =>  {
        message.react("✔");
        message.react("❌");

        const filter = (reaction, user) => {
            return emojiArray.includes(reaction.emoji.name) && user.id === msg.author.id;
        }

        const collector = message.createReactionCollector(filter, {
            max:1,
            time: 15000
        });

        collector.on('end', (collected, reason) => {
            if(reason == 'time') {
                msg.reply('please answer the question');
            } else {
            const reaction = collected.first();
            console.log(reaction.emoji.name);
            if(reaction.emoji.name === '❌') {
                msg.author.send('Cancelled!');
            } else {
                msg.reply('This did nothing....');
            }
            }
        })
    });
    }
}


const rpg_game = async function(msg,args) {


    while (true) {

        

    }

}