const { execute } = require("./info");

module.exports = {
    name: 'leave',
    description: 'Leaves the voice call',
    async execute(msg, args) {
        const voiceChannel = msg.member.voice.channel;

        if(!voiceChannel) return msg.channel.send('You need to be in a voice channel to have the bot leave');

        await voiceChannel.leave()
        await msg.channel.send('Leaving channel :smiling_face_with_tear:')
    }
}