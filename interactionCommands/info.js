const { SlashCommandBuilder } = require("@discordjs/builders");
const { discord } = require('discord.js');

module.name = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Info command')
        .addIntegerOption(option => option.name('embed').setDescription('Embed number (1 or 2)').setRequired(true)),
    execute(interaction) {
        const embed1 = new discord.MessageEmbed()
    }
}