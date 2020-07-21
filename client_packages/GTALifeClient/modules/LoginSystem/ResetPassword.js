var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");

var currentAccount = null;

function ButtonClick_ForgotPass(newPassword)
{
    var testAccount = JSON.stringify(currentAccount);
    mp.events.callRemote('resetpasspanel:resetpass', testAccount, newPassword);
};
mp.events.add('resetpasspanel:resetpass', ButtonClick_ForgotPass);

//This function is used when the user presses Register on the login panel
function ButtonClick_GoBack()
{
    CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/login-screen-UI.html");
};
mp.events.add("resetpasspanel:goback", ButtonClick_GoBack);

function ResetPassCompleted()
{
    CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/login-screen-UI.html");
};
mp.events.add("resetpasspanel:completed", ResetPassCompleted);

exports = {currentAccount};