const Discord = require("discord.js");

var emojiArray = ['◀', '❌', '▶']

embedOn = 0;

currentEmbed = 0;

module.exports = {
    name: 'info',
    description: "info on bot",
    async execute(msg, args, money, level, xp, bank, items, timeTillReduce, felonTime, isFelon) {

        itemList = fixItemListLook(items);

        inpm = false;

        if(msg.guild == null) {
            msg.reply('Either not in a server, or in pm')
            inpm = true;
        }

        console.log(inpm);

        if(inpm == false) {
            if(msg.member.roles.cache.find(role => role.id == '908141160084688897')){
                blacklisted = `yes, ${msg.author.username}, is blacklisted`;
            } else {
                blacklisted = `no, ${msg.author.username}, is not blacklisted`;
            }
        } else {
            blacklisted = `Not in the correct server or in pm`
        }
        const infoEmbed = new Discord.MessageEmbed()
        .setTitle('Information Embed')
        .addField('Version', '.5, In development.')
        .addField('Developer', 'PuppyNuff')
        .addField('Prefix', '.')
        .addField('Account','SBDoggos_bot, Thank you s8qn!')
        .addField('Commands', `.info - sends this embed,\n
         .msg sends a message in chat. Max size for ${msg.author.username} is ${94 - msg.author.username.length}, all dependant on the length of your username \n
         .patch-notes - Shows the up-to-date patch notes.\n
         .old-patch-notes - Shows the previous updates patch notes.\n
         .list-blacklist - Shows the people on the blakclist\n
         .blacklist {@person} - adds person to the blacklist, only usable if you are b9ss, puppynuff, or royaldoggo
         .unblacklist {@person} - removes person to the blacklist, only usable if you are b9ss, puppynuff, or royaldoggo\n
         .mute [player] [time -minutes (m), days(d)] - mutes player in game, only usable if you have moderator rank, or you are puppynuff\n
         .gunmute [player] - unmutes player in game, only usable if you have moderator rank, or you are puppynuff
         if you are in the #guild-discord channel (currently only available to staff.) you dont need .msg. \n`)
        .addField('Ingame commands', `/profile - WIP, sends sky.shiiyu.moe for the sender.\n
        more to be added soon.`)
        .addField('Are you blacklisted?', blacklisted)
        .addField('Rules', 'No spamming, and no emojis, or else you will be added to a blacklist from the bot')
        .addField('Rank Info', 'Moderator - the staff of the discord, \nOG - the origional people from the guild, \nDonator - People who donated 500k or more to B9SS, \nGuildMember - anyone in the discord.')
        .addField('Guild rank info','STAFF = Staff, \nDOOGAN = People over Cata 34, \nHUGEPP = Donators, \nDOGGOS = Normal Guild Members')
        .setThumbnail('https://cdn.discordapp.com/icons/843568795620606012/6c2f887755f35a49e2eec06e578efcb4.png?size=128"')
        const infoEmbed2 = new Discord.MessageEmbed()
        .setTitle('Info page 2')
        .addField('Rank info 2', 'OG - origional people from the guild\nfloor 1-7 - dungeon roles, pings for runs.\nDeveloper - Creator of the bot (Me :) )\nHelper - offbrand staff\nSuper epic mega cool donator - 2 people, s8qn for donating the account and project supmeme because YES.\nBot-blocked - blacklisted people.')

        const infoEmbed3 = new Discord.MessageEmbed()
        .addField('money', money)
        .addField('Bank', bank)
        .addField('Level', level)
        .addField('XP', xp)
        .addField('Is a felon?', isFelon)
        .addField('items', itemList)
        .addField('timeTillReduce', timeTillReduce)
        .addField('felonTime', felonTime)
        
        if(args[0] == 1) {
            msg.reply(infoEmbed);
        
        }
        if(args[0] == 2) {
            msg.reply(infoEmbed2);
        } else {
            msg.author.send(infoEmbed3);
            msg.author.send('Its private messaged so people dont know if you have a padlock, if you want the other embeds please put .info 1 / .info 2');
        }
    }
}
/*
function fixItemListLook(items) {
    //Update as more items are added please
    fixedItems = '';
    if(items.includes('bank_upgrade')) {
        fixedItems = fixedItems + 'bank_upgrade,';
    } 

    if(items.includes('pad_lock')) {
        fixedItems = fixedItems + 'pad_lock'

    }
    return fixedItems;
}
*/