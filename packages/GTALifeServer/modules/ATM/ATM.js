const DatabaseHelper = require("../Database/Database");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.ObjectID;

const allATMLocations = require("./ATMLocations");

mp.events.addCommand('openatm', (player) => {
    player.call('ATM:open');
});

function ATMWithdraw(client, withdrawAmount)
{
    var characterstats = JSON.parse(client.getVariable('character:characterstats'));
    var bankaccount = JSON.parse(client.getVariable('character:bankaccount'));
    if(bankaccount.Balance >= withdrawAmount && withdrawAmount >= 0)
    {
        bankaccount.Balance -= parseInt(withdrawAmount);
        characterstats.Money += parseInt(withdrawAmount);

        client.setVariable('character:bankaccount', JSON.stringify(bankaccount));
        client.setVariable('character:characterstats', JSON.stringify(characterstats));

        client.call('ATM:update');
        client.call('money:update');
        
        DatabaseHelper.GetInstance().GetDocuments('bankaccounts', 'CharacterID', characterstats.CharacterID).then(
            (res) => {
                    res[0].Balance -= parseInt(withdrawAmount);
                    DatabaseHelper.GetInstance().UpdateDocuments(res[0], 'bankaccounts').then(
                        (res) => {
                            console.log(res);
                        },
                        (rej) => {
                            console.log(rej);
                        });

            },
            (rej) => {
                client.call('ATM:failedwithdraw');
            });

    }
    else
    {
        client.call('ATM:failedwithdraw');
    }
}
mp.events.add('ATM:withdraw', ATMWithdraw);

function ATMDeposit(client, depositAmount)
{
    var characterstats = JSON.parse(client.getVariable('character:characterstats'));
    var bankaccount = JSON.parse(client.getVariable('character:bankaccount'));
    
    if(characterstats.Money >= depositAmount && depositAmount >= 0)
    {
        bankaccount.Balance += parseInt(depositAmount);
        characterstats.Money -= parseInt(depositAmount);

        client.setVariable('character:bankaccount', JSON.stringify(bankaccount));
        client.setVariable('character:characterstats', JSON.stringify(characterstats));

        client.call('ATM:update');
        client.call('money:update');
        
        DatabaseHelper.GetInstance().GetDocuments('bankaccounts', 'CharacterID', characterstats.CharacterID).then(
            (res) => {
                    res[0].Balance += parseInt(depositAmount);
                    DatabaseHelper.GetInstance().UpdateDocuments(res[0], 'bankaccounts').then(
                        (res) => {
                            console.log(res);
                        },
                        (rej) => {
                            console.log(rej);
                        });

            },
            (rej) => {
                client.call('ATM:faileddeposit');
            });
    }
    else
    {
        client.call('ATM:faileddeposit');
    }
}
mp.events.add('ATM:deposit', ATMDeposit);

function CreateATM()
{
    var offset = 1;

    
    //Create all ATM Locations on startup!
    allATMLocations.ATMLocations.forEach(curEntity => {
        var specialATMColShape = mp.colshapes.newSphere(parseFloat(curEntity.x), parseFloat(curEntity.y), parseFloat(curEntity.z), 2);
        specialATMColShape.setVariable('CLIENT_EVENT', 'ATM:open');

        var specialATMColShapeText = mp.labels.new(`~g~ATM\r\n ~b~Press ~o~'E' ~b~Key to Open! `, new mp.Vector3(parseFloat(curEntity.x), parseFloat(curEntity.y), parseFloat(curEntity.z)), { drawDistance: 10 });
        var specialATMColMarker = mp.markers.new(1, new mp.Vector3(parseFloat(curEntity.x), parseFloat(curEntity.y), parseFloat(curEntity.z) - offset), 1, { color: [0, 255, 0, 100], visible: true });
    });
};
mp.events.add('ATM:create', CreateATM);

//Call a function to create all ATM's
mp.events.call('ATM:create');
console.log("SERVER: ADDED ALL ATM LOCATIONS!");
