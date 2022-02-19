testSchema = require('../../test-mongo')

module.exports = {
    name: 'work',
    description: 'Works for args[1] time',
    async execute(msg, args, result) {
        level = result.level;
        money = result.money;
        time = args[0];
        bank = result.bank;
        userid = result.userID;
        exp = result.exp;
        felonTime = 0;
        timeTillReduce  = 0;
        isFelon = result.isFelon;
        responseString1 = '';
        responseString2 = '';
        felonResponse = '';
        if(isFelon == 'true') {
            felonTime = result.felonTime;
            timeTillReduce = result.timeTillReduce;
        } else {
            felonTime = 0;
        }

        if(isNaN(time) == true) {
            return msg.reply('Please give a valid time.');
        }

        if(time > level) {
           return msg.reply('You can only work for the same amount as time as your level! Work gives extra exp. (Random between 10 - 100 per hour) capping at the 10 hour mark')
        }

        earnings = estimateEarnings(time, 11, 21, msg);
        expEarnings = randomizeExpGain(time, msg, 10, 20);
        console.log(earnings);
        console.log(expEarnings);
        
        exp = exp +  expEarnings;

        
        for(i = 0; exp >= 100; i++) {
            exp = exp -100;
            level = level + 1;
        }

        console.log(timeTillReduce);

        if(isFelon == 'true') {
            if(time >= 24) {
                felonTime = felonTime - 1;
                timeTillReduce = 24;
            } else {
                if((timeTillReduce - time) <= 0) {
                    felonTime = felonTime - 1;
                    timeTillReduce = 24;
                } else {
                    timeTillReduce = timeTillReduce - time;
                }
            }
        }

        console.log(timeTillReduce);

        if(felonTime == 0) {
            isFelon = 'false';
        }

        finalMoney = (money + earnings);

        if(isFelon == 'true') {
           felonResponse = 'You are a felon currently and you have ' + felonTime + ' days till its gone worth of working at half wage. Time till day reduce is ' + timeTillReduce
        }
        const updateEarnings = await testSchema.findOneAndUpdate({
            userID: msg.author.id
        }, {
            userID: msg.author.id,
            money: finalMoney,
            level: level,
            exp: exp,
            bank: bank,
            timeTillReduce: timeTillReduce,
            isFelon: isFelon,
            felonTime: felonTime,
            latestMessage: msg.toString()

        })

        msg.reply(responseString1 + `
${responseString2}
${felonResponse}
Finished working!`)
    }
}

function estimateEarnings(time, lowAmount, highAmount, msg, isFelon) {

    if(isFelon = true) {
        max = Math.ceil(Math.round(lowAmount / 2));
        min = Math.round((highAmount / 2));
    } else {
        min = Math.ceil(lowAmount);
        max = Math.floor(highAmount);
    }

    amount = Math.round((Math.random() * (max - min) + min));

    earnings = amount * time;
    responseString1 = `you worked for $${amount} per hour and eared $${earnings}`
    
    return earnings;
}

function randomizeExpGain(time, msg, highAmount, lowAmount) {
    min = Math.ceil(lowAmount);
    max = Math.floor(highAmount);
    ExpAmount = Math.round((Math.random() * (max - min) + min));
    expEarned = ExpAmount * 10;

    responseString2 = `You worked and earned ${ExpAmount} exp per hour with a total of ${expEarned} exp earned! (Work exp is capped at 10 hours)`

    return expEarned;
}