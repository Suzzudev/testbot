const { MessageFlags } = require('discord.js');
const schema = require('../../test-mongo');

response = 0;

module.exports = {
    name : 'beg',
    description: 'Begs for currency or for a chance of items',
    execute(msg, args, response) {
        response
        begChance()
    }
}


function begChance(isFelon, level, msg) {

    if(isFelon == true) {
        msg.response('Chance is reduced because you are a felon.');

        response = chance(1, 30);
    } else {
        response = chance(1, 15);
    }

    if(response == 8) {
        itemCheck(1, 50);
        if(response == 13) {
            randomItem(1, 2);
        } 
    }

}

function chance(min, max) {

    low = Math.ceil(min);
    high = Math.floor(max);

    chance = Math.round((Math.random() * (max - min) + min));

    return chance;

}

function itemCheck(min, max) {
    low = Math.ceil(min);
    high = Math.floor(max);

    chance2 = Math.round((Math.random() * (max - min) + min));

    return chance2;
}


function randomItem(min, max, curItems, msg) {
    low = Math.ceil(min);
    high = Math.floor(max);
    item == 'pad_lock';
    chance3 = Math.round((Math.random() * (max - min) + min));

    if(chance3 == 1) {
        if(curItems.includes('pad_lock')) {
            chance3 + 1
        } else {
            item = 'pad_lock';
        }
    } 
    if(chance3 == 2) {
        item == 'bank_upgrade';
        if(curItems.includes('bank_upgrades')) {
            chance3 + 1;
        } else {
            item = 'bank_upgrade';
        }
    }

    if(chance3 == 3) {
        msg.reply('You already have all of the items! Unlucky.. Well you will have the chance for bonus money!');
        randomMoney(1000, 1000000);
    }

    return item;
}


function randomMoney(min, max, msg) {
    low = Math.ceil(min);
    high = Math.floor(max);

    amount = Math.round((Math.random() * (max - min) + min));
    
    msg.reply('They gave you ' + amount);
    return amount;
}
