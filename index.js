const { Client, Intents, Collection} = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const mongo = require("mongoose");
const config = require("./config.json");
//const config = require('./required/config.json');
const testSchema = require('./test-mongo');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const emojiArray = ['✅', '❌']
mongo.connect('mongodb+srv://shareduser:notgenericpassword@database.sgj6x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    keepAlive: true
})

const client = new Client({intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
]})
token = "NzAwNDg2OTE0MDQ1NjQwNzU1.XpjpRg.g8e_ogVAn6GfXdwNeq1yZ8VoagM";

const interactionCommands = fs.readdirSync('./interactionCommands/').filter(file => file.endsWith('.js'))

client.commands = new Collection();

for(const file of interactionCommands) {
    const command = require(`./interactionCommands/${file}`);

    client.commands.set(command.data.name, command);
}

mongo.connection.on('connected', ()=> {
    console.log('Mongodb Connected')
})

let prefix= "woof?";


/*
const basicCommands = fs.readdirSync('./Commands/basic-bot-commands').filter(file => file.endsWith('.js'))
const moderationCommands = fs.readdirSync('./Commands/moderation-commands').filter(file => file.endsWith('.js'))
const mongoCommands = fs.readdirSync('./Commands/mongo-related-commands').filter(file => file.endsWith('.js'))
const roleCommands = fs.readdirSync('./Commands/role-commands').filter(file => file.endsWith('.js'));
const testCommands = fs.readdirSync('./Commands/test-commands').filter(file => file.endsWith('.js'))

for (const file of basicCommands){
    const command = require(`./Commands/basic-bot-commands/${file}`);

    client.commands.set(command.name, command);
}

for (const file of moderationCommands){
    const command = require(`./Commands/moderation-commands/${file}`);

    client.commands.set(command.name, command);
}

for (const file of mongoCommands) {
    const command = require(`./Commands/mongo-related-commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of testCommands) {
    const command = require(`./Commands/test-commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of roleCommands) {
    const command = require(`./Commands/role-commands/${file}`);
    client.commands.set(command.name, command);
}
*/
completeFound = false;

var servers = {};

client.once("ready", async => {
    console.log("Bot Online");
    client.user.setStatus('online');
    client.user.setActivity(`Use woof?info.`, {type: "playing"}); 

    let channel = client.channels.cache.get("878026030877663262")
    //let channel2 = client.channels.cache.get('907398869439111238');
    channel.send("Bot online");
    //channel2.send("Bot online");
    checkCredits();
})

client.on('interactionCreate', async interaction => {
    console.log('Interaction created!');
    if(!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content : 'There was a error while trying to run this command!', ephemeral: true})
    }
})
/*
client.on("message", async (msg) => {

    if(msg.author.bot) return;

    await run(msg);

    var result = "waiting";

    if(completeFound) {
            var result = await testSchema.findOneAndUpdate( {
            userID: msg.author.id
        },
        {
            userID: msg.author.id,
            $inc: {
                exp: 10
            },
            latestMessage: msg.toString()
        })
        
        resultLevel = result.level;
        bankSize = 0;
        if(result.bankSize == null) {
            bankSize = 1000000
        } else {
            bankSize = result.bankSize
        }

        if(result.exp >= 100) {
            const result2 = await testSchema.findOneAndUpdate( {
                userID: msg.author.id
            },
            {
                userID: msg.author.id,
                exp: 0,
                $inc:{
                    level:1
                },
                bankSize: bankSize,
                latestMessage: msg.toString()
            })
        }

        //console.log(resultLevel);
        //console.log(result.level);

        //msg.reply('You are in the mongoDB');
    } else {

        const user ={
            userID: msg.author.id,
            money: 0,
            bank: 0,
            exp: 1,
            level: 1,
            bankSize: 1000000,
            latestMessage: msg.toString()
        }
        
        await new testSchema(user).save()

        msg.reply('You can now use mongo commands!');
    }

    /*const newUser = await testSchema.create({
        username: msg.author.username,
        userID: msg.author.id,
        exp:1,
        level:1,
        latestMessage: msg.toString(),
        bank: 100,
        money: 100
    })

    let channel = client.channels.cache.get("878026030877663262")
    const args = msg.content.slice(prefix.length).split(" ")
    const command = args.shift().toLowerCase();
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    
    const filter = (reaction, user) => {
        return emojiArray.includes(reaction.emoji.name) && user.id == msg.author.id;
    }
    
    if (command == 'ping'){
        client.commands.get('ping').execute(msg, args);
    }

    if (command == 'info'){
        client.commands.get('info').execute(msg, args, result.money, result.level, result.exp, result.bank, result.items, result.timeTillReduce, result.felonTime, result.isFelon);
    }

    if(command == 'msg'){
        client.commands.get('msg').execute(msg, args);
    }

    if (command == 'patch-notes'){
        client.commands.get('patch-notes').execute(msg, args);
    }

    if(command == 'old-patch-notes'){
        client.commands.get('old-patch-notes').execute(msg,args);
    }

    if(command == 'list-blacklist') {
        client.commands.get('list-blacklist').execute(msg,args);
    }

    if(command == 'blacklist') {
        client.commands.get('blacklist').execute(msg, args);
    }

    if(command == 'blacklist-remove') {
        client.commands.get('blacklist-remove').execute(msg, args);
    }

    if(command == 'gmute') {
        client.commands.get('gmute').execute(msg,args);
    }
    
    if(command == 'gunmute') {
        client.commands.get('gunmute').execute(msg,args);
    }

    if(command == 'play') {
        client.commands.get('play').execute(msg, args);
    }

    if(command == 'leave') {
        client.commands.get('leave').execute(msg, args);
    }

    if(command == 'countdown') {
        client.commands.get('countdown').execute(msg, args);
    }

    if(command == 'networth') {
        client.commands.get('networth').execute(msg, args);
    }

    if(command == 'apitest') {
        client.commands.get('apitest').execute(msg, args);
    }

    if (command == 'create-role') {
        client.commands.get('create-role').execute(msg,args);
    }

    if(command == 'clear') {
        client.commands.get('clear').execute(msg, args);
    };

    if (command == 'add-role') {
        client.commands.get('add-role').execute(msg,args);
    }

    if (command == 'remove-role') {
        client.commands.get('remove-role').execute(msg,args);
    }

    if (command == 'delete-role') {
        client.commands.get('delete-role').execute(msg,args);
    }

    if (command == 'create-channel') {
        client.commands.get('create-channel').execute(msg,args);
    }

    if (command == 'delete-channel') {
        client.commands.get('delete-channel').execute(msg,args);
    }

    if(command == 'set-up-rpg') {
        client.commands.get('set-up-rpg').execute(msg,args);
    }

    if(command == 'spam-b9ss') {
        client.commands.get('spam-b9ss').execute(msg,args);
    }

    if(command == 'warn') {
        client.commands.get('warning').execute(msg, args);
    }

    if(command == 'work') {
        client.commands.get('work').execute(msg, args, result);
    }

    if(command == 'deposit') {
        client.commands.get('deposit').execute(msg, args, result);
    }

    if(command == 'withdraw') {
        client.commands.get('withdraw').execute(msg, args, result);
    } 

    if(command == 'rob') {
        client.commands.get('rob').execute(msg, args, result);
    }

    if(command == 'transfer') {
       client.commands.get('transfer').execute(msg, args, result);
   }

   if(command == 'store') {
       client.commands.get('store').execute(msg);
   }

   if(command == 'buy') {
       client.commands.get('buy').execute(msg, args, result);
   }

   if(command == 'use') {
       client.commands.get('use').execute(msg, args, result);
   }

   if (command == 'clearstats') {
       client.commands.get('clearStats').execute(msg, args, result);
   }

   hasReacted = 'no';

   if(command == 'setstats') {
       msg.reply(`Did you put in all of the values? For values that stay the same just put : keep. 
       Order : money, bank, exp, level, items, bankSize, felonTime, isFelon, timeTillReduce (No commas just spaces) then the pinged person`).then((message)=>{
        let duration = 5;
        message.react('❌');
        message.react('✅');
        message.awaitReactions(filter, {
            max:1,
            time: 12000,
            errors: ['time']
        }).then(collected => {
            const reaction = collected.first();
            hasReacted = reaction.emoji.name;
            if(reaction.emoji.name == '✅') {
                client.commands.get('setstats').execute(msg, args, result);
            } else {
                msg.channel.send('Cancelled!');
            }
        }).catch(err => {return console.error(err)});
        let interval = setInterval(() =>{
            msg.channel.send(`Time Left: ${duration--}`);
            if(duration == 0) {
                clearInterval(interval)
                msg.edit(`Time Left: ${duration--}`)
                msg.channel.send('Cancelled!')
            } else if(hasReacted != 'no') {
                clearInterval(interval);
            }
        }, 2000)
        
       });
   }

})*/


client.login("NzAwNDg2OTE0MDQ1NjQwNzU1.XpjpRg.g8e_ogVAn6GfXdwNeq1yZ8VoagM");

const clients = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES]});

let prefixes = "-"

clients.commands = new Collection();

const jimothyCommands = fs.readdirSync('./jimothyCommands/').filter(file => file.endsWith('.js'))

for (const file of jimothyCommands){
    const command = require(`./jimothyCommands/${file}`);

    clients.commands.set(command.name, command);
}

clients.on("ready", () => {
    console.log("Teaching Bot online");
})

//To make a command go into the folder : Commands/jimothycommands and add the file with the same name as the command.
//Make sure it ends in js and to set it up look at ping.js but change 
//execute(msg) {}
//to execute(msg, args){}

clients.on("message",async (msg) => {
    //If the command doesn't start with -  and also if the author (The person who messaged) is a bot it stops the code.
    if(!msg.content.startsWith(prefixes) || msg.author.bot) return; 
    //Cuts the prefix and also makes it so you can call on seperate parts of the command, for example :
    /*
    if the command has special things to be added, the command needs a space for the arguments.
    The command would use the arguments to call the different stuff seperated by a space, starting with args[0];
    All lines exept for the end of methods need a semicolon,
    Example -
    if(command == 'ping') { <- says the command needs to be the same as ping.
        client.commands.get('ping').execute(msg, args); <- needs a semicolon. The stuff in between the parethesis is the required things called by the command.
    } <- needs no semicolon.

    const is used when you dont plan on changing it after the start. Its a variable which can be a method too.
    => is to make a function, to bring stuff in from other methods it is 
    (variable) => {

    }

    To create a function you do 
    function name(requirements) {
        (Code here)
    }

    Await is only available in async functions, to make a function async, you have to do this one other thing
    async function name(requirements) {
        (Code here)
    }

    to use a function you made you do 
    name(requirements);
    The code will run when you do that.

    There is no int, string, double, float, or other things like that to work with, unlike C#, C++, Java, HTML 5, C, ect.

    When making a variable for a int
    name = 12321 <-- Number
    for a string it is 
    name = "hello there"
    When calling to see if a command is equal to something make sure there is == not =
    if you dont have two than it breaks the if statement
    When calling a for you do 
    for(i = 0; i == 10; i++) {

    }
    at the end of the code it increases i by one,
    once i = 10 then the code stops.

    If you want to mess around with the code for a bit I will start the share and help if you need help.
    To join go into live share and type or copy
    https://prod.liveshare.vsengsaas.visualstudio.com/join?C70249B491EECF01613574E188B97BA08959

    I will try to help if I see that you need help and after I am back.
    */
    const args = msg.content.slice(prefixes.length).split(" ");
    //Changes the message to fully lower case so people can't accidentally run the command wrong because of capital letters
    const command = args.shift().toLowerCase();

    if(command == "ping") {
        clients.commands.get("ping").execute(msg);
    }

    if(command == "embedexample") {
        clients.commands.get("embedexample").execute(msg, args);
    }
})

clients.login("OTQwNDA5MzQ0MjYzMDc3OTE4.YgG-cw.D_2ASavPU9TroY1oN8OjiO64A4c");


function checkCredits() {
    const path = "./required/credit.js";
    //If you want you can update this file for your additions. Please leave credits.
    if(fs.existsSync(path)) {
    console.log("Ok to continue.");
    } else {
        throw { 
            name:        "System Error", 
            level:       "Show Stopper", 
            message:     "Error - You are required by the license to leave the credits.", 
            toString:    function(){return this.name + ": " + this.message;} 
          }; 
    }
}



async function run(msg) {

    id = msg.author.id


    const response = await testSchema.findOne({
        userID: msg.author.id,
    })

    console.log(response);

    if(response != null) {
        if(response.userID == msg.author.id){
            completeFound = true;
        }
    } else {
        completeFound = false;
    }

    /*if(testSchema.findOne({'userID': msg.author.id}).exists){
        completeFound = true;
        msg.reply('you are in the db')
    } else {
        completeFound = false;
        msg.reply('your not in the db')
    }*/


    
}