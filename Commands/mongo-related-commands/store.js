const discord = require('discord.js');

module.exports = {
    name: 'store',
    description: 'sends the store',
    execute(msg) {
        const embed = new discord.MessageEmbed()
        .setTitle('Store')
        .addField('pad_lock :lock:', 'Protects money out of bank (one time use, only sets off on successful attemps), cost: 1,000')
        .addField('bank_upgrade :moneybag:', 'Upgrades the amount you can have in your bank by 1,000,000 (one time use), price: 1,000,000')
        .addField('Note:exclamation:', 'You can only have 1 of each item, because I am too lazy to check if its in there multiple times.')
        .addField('Info :question:', 'to use the items other than the pad_lock use woof?use item')
        .setThumbnail('https://cdn.discordapp.com/attachments/682760333365870619/937832297305096243/shoppingCart.png')
        msg.reply(embed);
    }
}