const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;


function CharacterSelectionIntialise(client)
{
    GetAccountCharacters(client);
}
mp.events.add('characterselection:intialise', CharacterSelectionIntialise);

function GetAccountCharacters(client)
{
    let account = JSON.parse(client.getVariable('player:account'));

    console.log("Collecting Details!");
    DatabaseHelper.GetInstance().GetDocuments('characters', 'AccountID', account.AccountID).then(
        (res) => {
            var allCharacters = [];
            res.forEach(element => {
                allCharacters.push(element);
            });
            CollectCharacterDetails(client, allCharacters);
        },
        (rej) => {
            console.log(rej);
            client.call('characterselection:characterselectionloadcharacters', null);
        }
    )
};

function CollectCharacterDetails(client, allCharacters)
{
    console.log("Collecting Character Details!");

    var allCharactersData = [];
    allCharacters.forEach((element, idx, array) => {
        DatabaseHelper.GetInstance().GetDocuments('characterstats', 'CharacterID', element.CharacterID).then(
            (res) => {
                console.log(res[0]);
                allCharactersData.push([allCharacters[idx], res[0]]);
                if(idx == array.length - 1)
                {
                    client.call('characterselection:characterselectionloadcharacters', [allCharactersData]);
                };
            },
            (rej) => {
                console.log(rej);
            });
    });
}

function CollectAllCharacterDetails(client, data)
{
    var allCharactersLoaded = JSON.parse(data);

    var characterDetails = allCharactersLoaded[0];
    var characterStats = allCharactersLoaded[1];

    client.setVariable('character:character', JSON.stringify(characterDetails));
    client.setVariable('character:characterstats', JSON.stringify(characterStats));

    GetCharacterBankAccountDetails(client, characterDetails);

    CharacterSelectedCompleted(client);
}
mp.events.add('characterselection:loadallcharacterdetails', CollectAllCharacterDetails);

function GetCharacterBankAccountDetails(client, characterDetails)
{
    DatabaseHelper.GetInstance().GetDocuments('bankaccounts', 'CharacterID', characterDetails.CharacterID).then(
        (res) => {
            client.setVariable('character:bankaccount', JSON.stringify(res[0]));
        },
        (rej) => {
            console.log(rej);
        });
}

function CharacterSelectedCompleted(client)
{
    client.call('charactercreation:finalised');
}