const schema = require('../../test-mongo')

const emojiArray = ['✅', '❌']

module.exports = {
    name: 'transfer',
    description: 'Transfers money',
    async execute(msg, args, response) {
        userID = response.userID;

        bank = response.bank;

        amount = args[0];

        hasReacted = 'no';

        var player = msg.guild.member(msg.mentions.users.first());
        if(player == null) {
            return msg.reply('Please ping the recipient');
        }

        playerID = player.id;

        const filter = (reaction, user) => {
            return emojiArray.includes(reaction.emoji.name) && user.id == msg.author.id;
        }

        msg.reply(`You sure you want to do this? You can't choose to take it back. Time left: 6`).then((msg) => {
            let duration = 5;
            msg.react('❌');
            msg.react('✅');
            msg.awaitReactions(filter, {
                max:1,
                time: 12000,
                errors: ['time']
            }).then(collected => {
                const reaction = collected.first();
                hasReacted = reaction.emoji.name;
                if(reaction.emoji.name == '✅') {
                    msg.channel.send('Transferring now!');
                    if(amount > bank) {
                        return msg.channel.send('You dont have that much money!');
                    } else {
                        updateAuthorBank(amount, userID);
                        updateRecipientBank(amount, playerID);
                        msg.reply('Finished transferring!');
                    }
                } else {
                    return msg.channel.send('Cancelled!');
                }
            }).catch(err => {return console.error(err)});
            let interval = setInterval(() =>{
                msg.edit(`You sure you want to do this? You cant choose to take it back. Time left: ${duration--}`);
                if(duration == 0) {
                    clearInterval(interval)
                    msg.edit(`You sure you want to do this? You cant choose to take it back. Time left: 0`)
                    msg.channel.send('Cancelled!')
                } else if(hasReacted != 'no') {
                    clearInterval(interval);
                }
            }, 2000)
        })
    }
}


async function updateAuthorBank(amount, userID, msg) {
    response2 = await schema.findOneAndUpdate({
        userID: userID
    }, {
        userID: userID,
        $inc: {
            bank: -amount
        }
    })
}

async function updateRecipientBank(amount, recipientID) {
    response3 = await schema.findOneAndUpdate({
        userID: recipientID
    }, {
        userID : recipientID,
        $inc: {
            bank: amount
        }
    })

    console.log(amount + " " + recipientID);
}