var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");
var currentAccount = require("./GTALifeClient/modules/LoginSystem/ResetPassword");

function ButtonClick_ForgotPass(loginDetails)
{
    console.log("Sending Data!");
    mp.events.callRemote('forgotpasspanel:resetpass', loginDetails);
};
mp.events.add('forgotpasspanel:resetpass', ButtonClick_ForgotPass)

//This function is used when the user presses Register on the login panel
function ButtonClick_GoBack()
{
    CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/login-screen-UI.html");
};
mp.events.add("forgotpasspanel:goback", ButtonClick_GoBack);

function AccountDetailsCollected(account)
{
    if(account != null)
    {
        CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/reset-pass-screen-UI.html");
        currentAccount = account;
    }
    else
    {
        CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/login-screen-UI.html");
    }
};
mp.events.add("forgotpasspanel:accountcollected", AccountDetailsCollected);