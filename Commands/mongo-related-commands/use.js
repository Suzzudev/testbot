const schema = require('../../test-mongo');

playerItems = '';

module.exports = {
    name: 'use',
    description: 'uses a item', 
    execute(msg, args, response){
        item = args[0];
        playerItems = response.items;
        userID = response.userID;
        bankSize = 0;
        if(response.bankSize == null) {
            bankSize = 1000000;
        } else {
            bankSize = response.bankSize;
        }
        if(playerItems == null) {
            return msg.reply('You dont have any items!');
        }

        if(playerItems.includes(item)) {
            if(item == 'bank_upgrade') {
                bankSize = bankSize + 1000000
                items = playerItems.replace('bank_upgrade', '');
                return updateBank(bankSize, items, userID, msg);
            } else if(item == 'pad_lock') {
                msg.reply('Padlocks auto set off when someone successfully robs you.');
            }
        } else {
            itemList = fixItemListLook(playerItems, msg);

            return msg.reply('you have ' + itemList);

        }

    } 
}

function fixItemListLook(items, msg) {
    //Update as more items are added please
    fixedItems = '';
    if(items.includes('bank_upgrade')) {
        fixedItems = fixedItems + 'bank_upgrade,';
    } 

    if(items.includes('pad_lock')) {
        fixedItems = fixedItems + 'pad_lock,'
        msg.reply('Note: You cant "use" a padlock, it auto sets off when someone successfully robs you');
    }
    fixedItems = fixedItems + 'and thats it';
    return fixedItems;
}
async function updateBank(bankSize, items, userID, msg) {
    responseItems = '';
    const response = await schema.findOneAndUpdate({
        userID: userID
    }, {
        userID: userID,
        bankSize: bankSize,
        items:items
    });

    responseItems = response.items



    //remainingItems = fixItemListLook(responseItems, msg);

    console.log(response.items);

    msg.reply('Your new bank size is:' + response.bankSize + 'and your remaining items are ' + responseItems);
}