const schema = require('../../test-mongo');

module.exports = {
    name:'setstats',
    description:'Set Someones stats',
    execute(msg, args, response) {
        money = args[0];
        bank = args[1];
        exp = args[2];
        level = args[3];
        items = args[4];
        bankSize = args[5];
        isFelon = args[6];
        felonTime = args[7];
        timeTillReduce = args[8];
        var player = msg.guild.member(msg.mentions.users.first());
        if(player == null) {
            return msg.reply('You need to ping someone!')
        }
        

        if(money != 'keep') {
            if(isNaN(money) == false) {
                money = args[0];
            } else {
                return msg.reply(`Error 1: money isn't a valid answer`);
            }
        } else {
            money = response.money;
        }

        if(bank != 'keep') {
            if(isNaN(bank) == false) {
                bank = args[1]
            } else {
                return msg.reply(`Error 2: Bank isn't a valid answer`);
            }
        } else {
            bank = response.bank
        }

        if(exp != 'keep') {
            if(isNaN(exp) == false) {
                exp = args[2]
            } else {
                return msg.reply(`Error 3: exp isnt a valid answer`)
            }
        } else {
            exp = response.exp;
        }

        if(level != 'keep') {
            if(isNaN(level) == false) {
                level = args[3]
            } else {
                return msg.reply(`Error 4: level isnt a valid answer!`)
            }
        } else {
            level = response.level
        }

        if(items != 'keep') {
            if(isNaN(items) == true) {
                items = args[4]
            } else {
                return msg.reply(`Error 5: items isnt a valid answer`)
            }
        } else {
            items = response.items
        }

        if(bankSize != 'keep') {
            if(isNaN(bankSize) == false) {
                bankSize = args[5]
            } else {
                return msg.reply(`Error 6: bankSize isnt a valid answer`)
            }
        } else {
            bankSize = response.bankSize
        }

        if(isFelon != "keep") {
            if(isFelon == 'true') {
                isFelon = args[6]
            } else if(isFelon == 'false') {
                isFelon = args[6];
            } else {
                return msg.reply('Error 7: isFelon isnt a valid answer!')
            }
        } else {
            isFelon = response.isFelon
        }

        if(isFelon == 'true') {
            if(felonTime != "keep") {
                if(isNaN(felonTime) == false && felonTime != '0') {
                    felonTime = args[7]
                } else {
                    return msg.reply(`Error 8: felonTime isnt a valid answer!`);
                }
            } else {
                felonTime = response.felonTime;
            }

            if(timeTillReduce != "keep") {
                if(isNaN(timeTillReduce) == false) {
                    if(timeTillReduce <= 24) {
                        timeTillReduce = args[8];
                    } else {
                        return msg.reply('Error 9: timeTillReduce has to be 24 or less')
                    }
                } else {
                    return msg.reply('Error 10: timeTillReduce isnt a valid answer!')
                }
            } else {
                timeTillReduce = response.timeTillReduce;
            } 
        } else {
            felonTime = 0;
            timeTillReduce = 0;
        }
        if(isFelon == 'true') {
            msg.reply(`So the money to be set is ${money}, the bank amount is ${bank}, the exp is ${exp}, the level is ${level}, the items is ${items}, the bankSize is ${bankSize}, isFelon is ${isFelon}, felonTime is ${felonTime}, and timeTillReduce is ${timeTillReduce}`);
        } else {
            msg.reply(`So the money to be set is ${money}, the bank amount is ${bank}, the exp is ${exp}, the level is ${level}, the items is ${items}, the bankSize is ${bankSize}, isFelon is false, felonTime is auto set to 0, and timeTillReduce is auto set to 0`);
        }

        updateUser(player.id, money, bank, exp, level, items, bankSize,isFelon, felonTime, timeTillReduce);
    }
}

async function updateUser(userID, money, bank, exp, level, items, bankSize, isFelon, felonTime, timeTillReduce) {
    response = await schema.findOneAndUpdate({
        userID : userID
    }, {
        userID : userID,
        money: money,
        bank: bank,
        exp: exp,
        level: level,
        items: items,
        bankSize: bankSize,
        isFelon: isFelon,
        felonTime:felonTime,
        timeTillReduce: timeTillReduce
    })
}
