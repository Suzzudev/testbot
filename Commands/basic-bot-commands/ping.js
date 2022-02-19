module.exports = {
    name: 'ping',
    description: "Ping command",
    execute(msg, args) {
        msg.channel.send('pong!');
    }
}