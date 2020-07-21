const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;


function ForgotAccountPassword(client, loginDetails)
{
    var buffer = new Buffer.from(loginDetails, 'base64');
    var userDetails = JSON.parse(buffer.toString());
    
    DBFindAccount(client, userDetails);
}
mp.events.add('forgotpasspanel:resetpass', ForgotAccountPassword);

function DBFindAccount(client, userDetails)
{
    DatabaseHelper.GetInstance().GetDocuments('accounts', 'Username', userDetails.Username).then(
        (res) => {
            if(res[0].Email == userDetails.Email && res[0].Username == userDetails.Username)
            {
                client.call("forgotpasspanel:accountcollected", [res[0]]);
            }
            else
            {
                client.call("forgotpasspanel:accountcollected", [null]);
            }
        },
        (rej) => {
            console.log(rej);
            client.call("forgotpasspanel:accountcollected", [null]);
        });
}
