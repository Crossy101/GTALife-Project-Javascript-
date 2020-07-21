var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");

function PlayerReady(player)
{
    SetupLoginCamera();
    CreateCEFWithMouse(CEF.htmlLink + "Login/login-screen-UI.html");
};
mp.events.add('PlayerStartGame', PlayerReady);

function ButtonClick_Login(accountDetails)
{
    mp.events.callRemote("loginpanel:login", accountDetails);
};
mp.events.add('loginpanel:login', ButtonClick_Login);

//This function is used when the user presses Register on the login panel
function ButtonClick_Register()
{
    CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/register-screen-UI.html");
};
mp.events.add("loginpanel:register", ButtonClick_Register);

//This function is used when the user presses ForgotPass on the login panel
function ButtonClick_ForgotPassword()
{
    CEF.CreateCEFWithMouse(CEF.htmlLink + "Login/forgot-pass-screen-UI.html");
};
mp.events.add("loginpanel:forgotpassword", ButtonClick_ForgotPassword);

function LoginSuccess()
{
    mp.events.call('loginquiz:intialise');
};
mp.events.add("loginpanel:loginsuccess", LoginSuccess);

function LoginFailed()
{
    mp.gui.chat.push("Failed!");
};
mp.events.add("loginpanel:loginfailed", LoginFailed);

function SetupLoginCamera()
{
    //setup chat colours
    mp.gui.chat.colors = true;
    mp.gui.chat.safeMode = false;

    //Position for Login Camera to Point at
    var cameraPointAtCoords = new mp.Vector3(-428.9911, 0.381, 327.6906);

    //Position for Login Camera
    var loginCameraPosition = new mp.Vector3(-465.6965, -1000.35, 333.0065);
    var loginCameraRotation = new mp.Vector3(0, 0, 0);

    let currentCamera = mp.cameras.new('default', loginCameraPosition, loginCameraRotation, 70);

    currentCamera.pointAtCoord(cameraPointAtCoords.x, cameraPointAtCoords.y, cameraPointAtCoords.z);
    currentCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, false, false);

    mp.players.local.setInvincible(true);
    mp.players.local.setVisible(false, false);
    mp.players.local.freezePosition(true);
};