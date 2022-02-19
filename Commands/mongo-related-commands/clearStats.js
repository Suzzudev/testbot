const schema = require('../../test-mongo');

var emojiArray = ['✅', '❌']

module.exports = {
    name: 'clearStats',
    description: 'Clears someones stats, unless you logged their stats its NON REVERSABLE',
    execute(msg, args, response) {

        const filter = (reaction, user) => {
            return emojiArray.includes(reaction.emoji.name) && user.id == msg.author.id;
        }

        var player = msg.guild.member(msg.mentions.users.first());

        if(player == null) {
            return msg.reply('Please ping the person');
        }

        userID = player.id;

        msg.reply(userID);

        msg.reply('Log channel is required so you can reset. Make sure there is a channel named log').then(message => {
            let duration = 5;
            message.react('❌');
            message.react('✅');
            message.awaitReactions(filter, {
                max:1,
                time: 12000,
                errors: ['time']
            }).then(collected => {
                const reaction = collected.first();
                hasReacted = reaction.emoji.name;
                if(reaction.emoji.name == '✅') {
                    msg.channel.send('Sending in log.. And resetting...');
                    channel = message.guild.channels.cache.find(channel => channel.name === "log");
                    if(channel == null) {
                        return msg.reply('You need a log channel.');
                    }
                    channel.send(`Command to reset is:
woof?setstats ${response.money} ${response.bank} ${response.exp} ${response.level} ${response.items} ${response.bankSize} ${response.isFelon} ${response.felonTime} ${response.timeTillReduce}
Remember To ping them!`);
                    resetStats(player.id, msg);
                } else {
                    return msg.channel.send('Cancelled!');
                }
            }).catch(err => {return console.error(err)});
            let interval = setInterval(() =>{
                if(duration == 0) {
                    clearInterval(interval)
                    msg.channel.send('Cancelled!')
                } else if(hasReacted != 'no') {
                    clearInterval(interval);
                }
            }, 2000)
        })
    }
}


async function resetStats(userID, msg) {
    const response = await schema.findOneAndRemove({
       userID: userID
    })

    console.log(userID);

    msg.reply('deleted!');

}