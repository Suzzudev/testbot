const { REST } = require('@discordjs/rest');
const config = require("./config.json");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

token = "NzAwNDg2OTE0MDQ1NjQwNzU1.XpjpRg.g8e_ogVAn6GfXdwNeq1yZ8VoagM";
clientID = '700486914045640755';
guildID = "681243251373899789";

const rest = new REST({ version: '9'}).setToken(token);

const commands = [];

const commandFiles = fs.readdirSync('./interactionCommands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const command = require(`./interactionCommands/${file}`)
    commands.push(command.data.toJSON());
}

(async() => {
    try {
        console.log('Started refreshing application (/) commands.')

        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            {body: commands},
        )

        console.log('Successfully reloaded application (/) commands.')

    } catch(error) {
        console.error(error);
    }
})();


