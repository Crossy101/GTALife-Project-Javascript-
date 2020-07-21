const murmurhash = require('murmurhash');
const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;


function ResetPassword(client, ...currentargs)
{
    var account = JSON.parse(currentargs[0]);

    var buffer = new Buffer.from(currentargs[1].toString(), 'base64');
    var password = JSON.parse(buffer);
    
    DBFindAccount(client, account, password);
}
mp.events.add('resetpasspanel:resetpass', ResetPassword);

function DBFindAccount(client, account, newPassword)
{
    DatabaseHelper.GetInstance().GetDocuments('accounts', 'AccountID', account.AccountID).then(
        (res) => {
            res[0].Password = murmurhash.v3(newPassword.Password).toString();
            DatabaseHelper.GetInstance().UpdateDocuments(res[0], 'accounts').then(
                (res) => {
                    console.log(res);
                    client.call("resetpasspanel:completed");
                },
                (err) => {
                    console.log(err);
                }
            )
        },
        (rej) => {
            console.log(rej);
        }
    );
}