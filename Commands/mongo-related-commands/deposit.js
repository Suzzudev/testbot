testSchema = require('../../test-mongo')

module.exports = {
    name: 'deposit',
    description: 'Deposits money for the user',
    async execute(msg, args, result) {
        amount = args[0];
        money = result.money;
        bank = result.bank;
        maxBank = result.bankSize;
        if(result.bankSize == null) {
            maxBank = 1000000
        }

        if(amount > money) {
            return msg.reply(`You don't have that much money! You can put $${maxBank - bank} in there!`);
        } 

        bankResult = bank + amount;
        moneyResult = money - amount;
        if(maxBank < (bank + amount)) {
            return msg.reply('You dont have that much room in your bank! Buy a bank upgrade to deposit!');
        }
        const updateMoney = await testSchema.findOneAndUpdate({
            userID: msg.author.id
        }, {
            userID: msg.author.id,
            money: moneyResult,
            bank: bankResult,
            bankSize: maxBank,
            latestMessage: msg.toString()

        })

        msg.reply('Finished depositing!');

    }
}