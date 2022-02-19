const schema = require('../../test-mongo');

playerMoney = 0;
playerItems = '';

module.exports = {
    name: 'rob',
    description: 'robs someone',
    async execute(msg, args, response) {
        exp = response.exp;
        money = response.money;

        var player = msg.guild.member(msg.mentions.users.first());
        if(player != null) {
            playerID = player.id;

            const reply = await schema.findOne({
                userID: playerID,
            })
        
        
        
            if(reply != null) {
                if(reply.money > 100) {
                     playerMoney = reply.money;
                     playerItems = reply.items;
                } else {
                    return msg.reply('That player has no money! You can only rob people with at least 100 money!');
                }
            } else {
                msg.reply('Player not in mongo database');
            }
        } else {
            return msg.reply('Please ping the person.');
        }

        msg.reply(`Player has ${playerMoney}`);

        amount = randomizeAmount(playerMoney, 0);

        works = catchChance(msg);

        console.log(works);

        if(works == 0) {
            return msg.reply('Nice try you failed though.')
        } else {
            removeItem = '';
            if(playerItems.includes('pad_lock')) {
                removeItem = playerItems.replace('pad_lock', '')

                playerItemsUpdate(playerID, removeItem)
                return msg.reply('Unlucky you! Player had a padlock!')
            }
            msg.reply('Good job, you got them for ' + amount);
            schemaUpdate(amount, msg, playerID);
        }

    }
}


function randomizeAmount(playerMoney, minimum) {
    max = Math.floor(playerMoney);
    min = Math.ceil(minimum);
    amount = Math.round((Math.random() * (max - min) + min));
    return amount;
}

function catchChance(msg) {

    max = Math.floor(12);
    min = Math.ceil(0);

    number = 0;
     
    number = Math.round(Math.random() * (max-min) + min);
    console.log(number);

    number = 12;

    if(number == 12) {
        msg.reply('You got the lucky number!');

        return 1;
    } else {
        msg.reply('You got caught.');
        caught(msg);
        return 0;
    }

}

async function schemaUpdate(amount, msg, playerID) {
    
    robberGains = amount;
    
    const finalReturn = await schema.findOneAndUpdate({
        userID : msg.author.id
    }, {
        userID : msg.author.id,
        $inc: {
            money: robberGains,
            exp: 17
        }
    })

    const userReturn = await schema.findOneAndUpdate({
        userID: playerID
    }, {
        userID: playerID,
        $inc: {
            money: -robberGains,
            exp: -17
        }
    })
}

async function caught(msg, args) {
    const userReturn = await schema.findOneAndUpdate({
        userID: msg.author.id
    }, {
        userID: msg.author.id,
        isFelon: 'true',
        felonTime: 7,
        timeTillReduce: 0
    })
}

async function playerItemsUpdate(playerID, removeItem) {
    const response = await schema.findOneAndUpdate({
        userID: playerID
    },
    {
        userID: playerID,
        items: removeItem
    })
}
