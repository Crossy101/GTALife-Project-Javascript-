var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");

function ButtonClick_Register(accountDetails)
{
    mp.events.callRemote('registerpanel:register', accountDetails);
    CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/login-screen-UI.html");
}
mp.events.add('registerpanel:register', ButtonClick_Register)

//This function is used when the user presses Register on the login panel
function ButtonClick_GoBack()
{
    CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/login-screen-UI.html");
}
mp.events.add("registerpanel:goback", ButtonClick_GoBack);
