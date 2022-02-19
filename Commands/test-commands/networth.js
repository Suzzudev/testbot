const axios = require('axios');
const mojangAPI = require('mojang-api');
module.exports = {
    name : "networth",
    description : 'attempt at getting a players networth',
    execute(msg, args) {
        var uuid = null;
        username = args[0];

        if(username == null) {
            return msg.reply('Please enter a valid username.');
        }
        
        console.log(username);

        uuid =mojangAPI.nameToUuid(username, function(err, res) {
            if(err) console.log(err);
            else {
                console.log(res[0].id);
                msg.reply(`your uuid == ${res[0].id}`);
                getNetworth(/*res[0].id*/ '6df4bea8-3060-42fa-bccb-316e6de66ea0', '61629039-8cac-4f51-ba4a-1a8d2d2e050c');

                console.log('Your uuid is ,' + res[0].id + 'and the api key is' + '61629039-8cac-4f51-ba4a-1a8d2d2e050c');
                return res[0].id;
            }
        })

    }
}

const getActiveProfile = function (profiles, uuid) {
    return profiles.sort((a,b) => b.members[uuid].lastsave - a.members[uuid].last_save)[0];
};

const getNetworth = async function (uuid, key, msg) {
    console.log(uuid + " " + key);
    
    const { data } = await axios.get(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`);

    const activeProfile = getActiveProfile(data.profiles, uuid);

    const profile = activeProfile.members[uuid];
    profile.banking = activeProfile.banking;

    const response = await axios.post('https://maro.skybrokers.xyz/api/networth/categories', {data : profile});

    return response.data;
    
};