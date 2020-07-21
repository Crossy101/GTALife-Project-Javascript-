var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");

function CreateCharacterIntialise()
{
    SetupCharacterCreationCamera();
    CEF.CreateCEFWithMouse(htmlLink + "CharacterCreation/character-creation-menu.html");
}
mp.events.add('charactercreation:intialise', CreateCharacterIntialise);

function CreateCharacterCompleted(characterdetails)
{
    var femaleGender = 0x9C9EFFD8;

    var gender = false;
    if(mp.players.local.model == femaleGender)
    {
        gender = true;
    }
    mp.events.callRemote('charactercreation:charactercomplete', characterdetails, gender);
}
mp.events.add('charactercreation:charactercomplete', CreateCharacterCompleted);

function CharacterChangeHair(hairstyle)
{
    mp.players.local.setComponentVariation(2, hairstyle, 0, 2);
}
mp.events.add('charactercreation:changehair', CharacterChangeHair);

function CharacterChangeFace(val, facefeature)
{
    val = parseFloat(val);
    facefeature = parseInt(facefeature);
    mp.players.local.setFaceFeature(facefeature, val);
}
mp.events.add('charactercreation:changeface', CharacterChangeFace);

function CharacterChangeGender(gender)
{
    var maleGender = 0x705E61F2;
    var femaleGender = 0x9C9EFFD8;

    gender = parseInt(gender);

    if(gender == 0)
    {
        mp.players.local.model = maleGender;
    } else {
        mp.players.local.model = femaleGender;
    }
}
mp.events.add('charactercreation:changegender', CharacterChangeGender);

function CharacterFinalised()
{
    mp.events.call('ATM:create');
    ResetPlayer();
}  
mp.events.add('charactercreation:finalised', CharacterFinalised);

function ResetPlayer()
{
    var airportPositon = new mp.Vector3(-1054.504, -2766.555, 4.639799);
    var airportRotation = new mp.Vector3(0, 0, -30.419);

    mp.players.local.position = airportPositon;
    mp.players.local.setRotation(airportRotation.x, airportRotation.y, airportRotation.z, 1, true);

    mp.players.local.freezePosition(false);
    mp.players.local.setVisible(true, false);

    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    CEF.DeleteCEF();
}

function SetupCharacterCreationCamera()
{
    mp.game.cam.destroyAllCams(true);

    //Position for Login Camera to Point at
    var cameraPointAtCoords = new mp.Vector3(-428.9911, 0.381, 327.6906);

    //Position for Login Camera
    var characterCreationCameraPosition = new mp.Vector3(439.0553, -993.3426, 32.0);
    var characterCreationCameraRotation = new mp.Vector3(0, 0, 0);

    let currentCamera = mp.cameras.new('default', characterCreationCameraPosition, characterCreationCameraRotation, 40);

    var newPlayerPosition = new mp.Vector3(436.4661, -993.4235, 30.68959)
    mp.players.local.position = newPlayerPosition;

    currentCamera.pointAtCoord(newPlayerPosition.x, newPlayerPosition.y, newPlayerPosition.z);
    currentCamera.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, false, false);

    mp.players.local.setVisible(true, false);
};