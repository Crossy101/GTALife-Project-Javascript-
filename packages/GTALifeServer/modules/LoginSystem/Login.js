const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

const murmurhash = require('murmurhash')

function PlayerIsReady(player)
{
    player.call('PlayerStartGame', [player]);
}
mp.events.add('playerReady', PlayerIsReady);    

function LoginAttempt(client, accountDetails)
{   
    var buffer = new Buffer.from(accountDetails, 'base64');
    var obj = JSON.parse(buffer);
    DBCheckLogin(client, obj);
}
mp.events.add('loginpanel:login', LoginAttempt);

function DBCheckLogin(client, accountDetails)
{
    DatabaseHelper.GetInstance().GetDocuments('accounts', 'Username', accountDetails.Username).then(
        (res) => {
            if(res[0].Password == murmurhash.v3(accountDetails.Password).toString())
            {
                client.call("loginpanel:loginsuccess", res[0]);
                client.setVariable('player:account', JSON.stringify(res[0]));
            }
            else
            {
                client.call("loginpanel:loginfailed", res[0]);
            }
        },
        (rej) => {
            console.log(rej);
            client.call("loginpanel:loginfailed", [null]);
        }
    );
}