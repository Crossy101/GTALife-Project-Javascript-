const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

const uuidv4 = require('uuid/v4');
const random = require('random');

var moment = require('moment');

function CharacterCreationComplete(client, characterdetails, charactergender)
{
    var buffer = new Buffer.from(characterdetails, 'base64');
    var characterDetails = JSON.parse(buffer);

    DBCreateCharacter(client, characterDetails, charactergender);
}
mp.events.add('charactercreation:charactercomplete', CharacterCreationComplete);


//CREATE CHARACTER ON THE DATABASE!
const BankAccount = new Schema({
    _id: {type: String, require: false},
    BankAccountID: Number,
    CharacterID: String,
    Balance: Number
});

const Character = new Schema({
    _id: {type: String, require: false},
    AccountID: String,
    CharacterID: String,
    FirstName: String,
    LastName: String,
    Nationality: String,
    DateOfBirth: String,
    Height: String,
    Gender: Boolean,
    DateCreated: Date,
    TimeOnline: Number
});

const CharacterStats = new Schema({
    _id: {type: String, require: false},
    CharacterID: String,
    Health: Number,
    Armor: Number, 
    Experience: Number,
    Money: Number,
    Hunger: Number,
    Thirst: Number
});

const CharacterClothes = new Schema({
    _id: {type: String, require: false},
    CharacterID: String,
    Head: Number,
    Beard: Number, 
    Hair: Number,
    Torso: Number,
    Legs: Number,
    Hands: Number,
    Foot: Number,
    Eyes: Number,
    Utilities: Number,
    Backpack: Number,
    Mask: Number,
    AuxillaryTorso: Number
});

const TruckingJob = new Schema({
    _id: {type: String, require: false},
    CharacterID: String,
    Level: Number,
    Experiece: Number,
    JobsCompleted: Number,
    TotalEarned: Number,
    MilesDriven: Number
});

var BankAccountModel = mongoose.model('BankAccount', BankAccount, 'bankaccounts');
var CharacterModel = mongoose.model('Characters', Character, 'characters');
var CharacterStatsModel = mongoose.model('CharacterStats', CharacterStats, 'characterstats');
var CharacterClothesModel = mongoose.model('CharacterClothes', CharacterClothes, 'characterclothes');
var TruckingJobModel = mongoose.model('TruckingJobs', TruckingJob, 'truckingjob');

function DBCreateCharacter(client, characterdetails, charactergender)
{
    var playerAccount = JSON.parse(client.getVariable("player:account"));
    var newCharacter = new CharacterModel({AccountID: playerAccount.AccountID,
                                           CharacterID: uuidv4(),
                                           FirstName: characterdetails.FirstName,
                                           LastName: characterdetails.LastName,
                                           Nationality: characterdetails.Nationality,
                                           DateOfBirth: characterdetails.DateOfBirth,
                                           Gender: charactergender,
                                           DateCreated: moment(),
                                           TimeOnline: 0});

    DatabaseHelper.GetInstance().InsertDocuments(newCharacter, 'characters').then(
        (res) => {
            console.log(res);
        },
        (rej) => {
            console.log(rej);
        });

    client.setVariable('character:character', JSON.stringify(newCharacter));

    DBCreateCharacterStats(client);
    DBCreateCharacterBankAccount(client);
    client.call('charactercreation:finalised');
}

function DBCreateCharacterStats(client)
{
    var character = JSON.parse(client.getVariable('character:character'));
    var newCharacterStats = new CharacterStatsModel({CharacterID: character.CharacterID,
                                                     Health: 100,
                                                     Armor: 0,
                                                     Experience: 0,
                                                     Money: 5000,
                                                     Hunger: 100,
                                                     Thirst: 100});

    DatabaseHelper.GetInstance().InsertDocuments(newCharacterStats, 'characterstats').then(
        (res) => {
            console.log(res);
        },
        (rej) => {
            console.log(rej);
        }
    )

    client.setVariable('character:characterstats', JSON.stringify(newCharacterStats));
}

function DBCreateCharacterBankAccount(client)
{
    var character = JSON.parse(client.getVariable('character:character'));
    var newBankAccount = new BankAccountModel({BankAccountID: random.int(1000000, 9999999),
                                               CharacterID: character.CharacterID,
                                               Balance: 0});

    DatabaseHelper.GetInstance().InsertDocuments(newBankAccount, 'bankaccounts').then(
        (res) => {
            console.log(res);
        },
        (rej) => {
            console.log(rej);
        }
    )
    client.setVariable('character:bankaccount', JSON.stringify(newBankAccount));
}

function DBCreateCharacterTrucking(client)
{

}