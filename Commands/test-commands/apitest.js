const fetch = require('cross-fetch');
const mojangAPI = require('mojang-api');
const axios = require('axios');


let API_FILE = require('../API_KEY.json')

let API_KEY = API_FILE["API_KEY"]
module.exports = {
    'name' : 'apitest',
    'description' : 'testing the api',
    execute(msg, args) {
        const playerName = "puppynuff"
        const playerUUID = '6df4bea8-3060-42fa-bccb-316e6de66ea0';

        apiPull(playerUUID, API_KEY, msg);

        /*fetch(`https://api.hypixel.net/skyblock/profiles?key=${API_KEY}&uuid=${playerUUID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
        })
        
        .catch(error => console.log('Network Error', error));
        */
    }
}

const apiPull = async function(uuid, key, msg) {
    const { data } = await axios.get(`https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`);
    //lastProfile = data.profiles.sort((a,b) => b.members[uuid].last_save - a.members[uuid].last_save)[0];

    data => data.JSON();
    message = JSON.stringify(data);

    msg.reply(message);
}