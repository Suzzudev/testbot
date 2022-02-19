//Files exports
module.exports = {
    //Giving it a name and description
    name: 'add-role',
    description: 'whatever',
    execute(msg,args){
        //Checking if they have permissions
        if(msg.author.id == '678788394519756800' || msg.author.id == '697644097057587330' || msg.author.id == '451488574701961216') {
            //Logs in the console the command was used
            console.log("command used");
            //Finds the member and adds them to the variable.
            var person = msg.guild.member(msg.mentions.users.first())
            //Setting the role
            let role = msg.guild.roles.cache.find(r => r.name === args[0]);
            //Adding the role.
            person.roles.add(role);
            //Saying the person was Blacklisted.
            msg.reply(`added ${person}`)
        } else {
            //If they don't have the permissions.
            console.log("user without permissions attempted the command.");
        }
    }
}