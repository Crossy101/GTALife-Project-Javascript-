const uuidv4 = require('uuid/v4');
const murmurhash = require('murmurhash');

const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;


function RegisterAccount(client, accountdetails)
{
    var buffer = new Buffer.from(accountdetails, 'base64');
    var userAccount = JSON.parse(buffer.toString());
    DBRegisterAccount(userAccount);
}
mp.events.add('registerpanel:register', RegisterAccount)

const Account = new Schema({
    _id: {type: String, require: false},
    AccountID: String,
    Username: String,
    Password: String,
    Email: String
});

var AccountModel = mongoose.model('AccountInfo', Account, 'accounts');

function DBRegisterAccount(userAccount)
{
    let newPassword = murmurhash.v3(userAccount.Password).toString();
    var newAccount = new AccountModel({ AccountID: uuidv4(), Username: userAccount.Username, Password: newPassword, Email: userAccount.Email});
    DatabaseHelper.GetInstance().InsertDocuments(newAccount, 'accounts').then(
        (res) => {
            if(res) {
                console.log("==> Succesfully Added New Entry!");
            }
            else
            {
                console.log("==> Failed to Add Entry");
            }
        });
}