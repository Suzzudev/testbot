var items = ['bank_upgrade', 'pad_lock'];

padLockPrice = 100000;
bankUpgradePrice = 1000000;
const schema = require('../../test-mongo');

module.exports = {
    name: 'buy',
    description: 'Buy stuff from the store',
    execute(msg, args, response) {
        money = response.money;
        bank = response.bank;
        currentItems = response.items;

        if(args[0] == null) {
            msg.reply('Please say what you want');

            msg.reply('The current things you can buy is a Pad lock (pad_lock) or bank upgrades (bank_upgrade)');
        } else if (items.includes(args[0])) {
            answer = args[0]

            msg.reply(`Ok so you want the ${answer} right?`);

            if(args[0] == 'bank_upgrade') {
            price = bankUpgradePrice;

            if(currentItems == '') {
                currentItems = 'bank_upgrade';
            }else if (currentItems.includes('bank_upgrade')) {
                msg.reply('You already have that.');
            }else {
                currentItems = currentItems + " " + "bank_upgrade"; 
            }
            updateSchemaItems(msg, price, response.userID, currentItems);
            } else if(args[0] == 'pad_lock') {
                price = padLockPrice;

                if(currentItems == '') {
                    currentItems = 'pad_lock';
                }else if (currentItems.includes('pad_lock')) {
                    return msg.reply('You already have that.');
                }else {
                    currentItems = currentItems+"pad_lock"; 
                }

                updateSchemaItems(msg, price, response.userID, currentItems, args);
            }


        } else {
            msg.reply('Not a valid answer.');
        }
    }
}


async function updateSchemaItems(msg, price, userID, currentItems, args) {
    
    const response2 = await schema.findOneAndUpdate({
        userID: userID
    }, {
        userID: userID,
        latestMessage: msg.toString(),
        $inc: {
            money: -price
        },

        items: currentItems

    })

    msg.reply('You currently have ' + response2.items+ args[0] + ' (This is how its stored, sorry its for easier replacements)');

} 