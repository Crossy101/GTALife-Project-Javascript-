var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");

var debounce = false;
var ATMColShapeDistance = 1;

function OpenATM()
{
    var bankAccount = JSON.parse(mp.players.local.getVariable('character:bankaccount'));

    var obj = {
        BankAccountID: `${bankAccount.BankAccountID}`,
        Balance: `${bankAccount.Balance}`
    };

    var object = JSON.stringify(obj);
    CEF.CreateCEFWithMouse(htmlLink + "ATM/ATM.html");
    currentCEF.execute(`LoadATM(${object})`);
}
mp.events.add('ATM:open', OpenATM);

function UpdateATM()
{
    var bankAccount = JSON.parse(mp.players.local.getVariable('character:bankaccount'));
    var obj = {
        BankAccountID: `${bankAccount.BankAccountID}`,
        Balance: `${bankAccount.Balance}`
    };

    var object = JSON.stringify(obj);
    currentCEF.execute(`LoadATM(${object})`);
}
mp.events.add('ATM:update', UpdateATM);

function CloseATM()
{
    CEF.DeleteCEF();
}
mp.events.add("ATM:close", CloseATM);

function DepositMoney(depositAmount)
{   
    if(!debounce)
    {
        mp.events.callRemote('ATM:deposit', depositAmount);
        ATMTimer();
    }
    else
    {
        mp.gui.chat.push(`!{#ff0000}You must wait 30 seconds for another transaction!`);
    }
}
mp.events.add('ATM:deposit', DepositMoney);

function WithdrawMoney(withdrawAmount)
{
    if(!debounce)
    {
        mp.events.callRemote('ATM:withdraw', withdrawAmount);
        ATMTimer();
    }
    else
    {
        mp.gui.chat.push(`!{#ff0000}You must wait 30 seconds for another transaction!`);
    }
}
mp.events.add('ATM:withdraw', WithdrawMoney);

function FailedToWithdraw()
{
    mp.gui.chat.push("Failed to Withdraw!");
}
mp.events.add('ATM:failedwithdraw', FailedToWithdraw);

function FailedToDeposit()
{
    mp.gui.chat.push("Failed to Deposit!");
}
mp.events.add('ATM:faileddeposit', FailedToDeposit);

function ATMTimer()
{
    debounce = true;
    setTimeout(() => {
        debounce = false;
    }, 30000);
};