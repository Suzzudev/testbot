module.exports = {
    name: 'blacklist-remove',
    description: 'removes someone off of the blacklist',
    execute(msg, args){
        if(msg.author.id == '678788394519756800' || msg.author.id == '451488574701961216' || msg.author.id == '697644097057587330') {
            console.log("command used");
            var person = msg.guild.member(msg.mentions.users.first())
            let role = msg.guild.roles.cache.find(r => r.id === '908141160084688897');
            person.roles.remove(role);
            msg.reply(`un-blacklisted ${person}`)
        } else {
            console.log("user without permissions attempted the command.");
        }
    }
}