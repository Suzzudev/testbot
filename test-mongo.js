const mongo = require('mongoose');

const reqString = {
    type:String,
    required: true
}

const Numbers = {
    type:Number,
}

const reqNumbers = {
    type:Number,
    required: true
}
const schema = new mongo.Schema({
    userID: reqString,
    latestMessage: String,
    money: Numbers,
    bank: Numbers,
    exp: Numbers,
    level: Numbers,
    pings: String,
    felonTime: Numbers,
    isFelon: String,
    timeTillReduce: Numbers,
    items: String,
    bankSize: Numbers
})

module.exports = mongo.model('testing', schema);