const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

var moment = require('moment');

const Ban = new Schema({
    _id: {type: String, require: false},
    AccountID: String,
    StaffID: String,
    BanDate: Date,
    EndDate: Date,
    Reason: String,
    Permanent: Boolean,
    IP: String,
    Serial: String
});

var BanModel = mongoose.model('Blacklist', Ban, 'blacklist');

function BanUserSystem(client, setyears, setmonths, sethours, setminutes, setreason)
{
    var account = JSON.parse(client.getVariable('player:account'));

    var calculatedEndDate = moment().add({years: setyears, months: setmonths, hours: sethours, minutes: setminutes});

    var newSystemBan = new BanModel({AccountID: account.AccountID, StaffID: 'SYSTEM', BanDate: moment(), EndDate:  calculatedEndDate, Reason: setreason, Permanent: false, IP: client.ip, Serial: client.serial});

    DatabaseHelper.GetInstance().InsertDocuments(newSystemBan, 'blacklist').then(
        (res) => {
            console.log(`Banned User: ${account.AccountID}`);
            console.log(`End Date: ${calculatedEndDate}`);
        },
        (rej) => {
            console.log(rej);
        });

    client.outputChatBox("You have been banned!");
    client.outputChatBox(`End Date: ${calculatedEndDate}`);
    client.kick(setreason);
};
mp.events.add('system:banuser', BanUserSystem);





