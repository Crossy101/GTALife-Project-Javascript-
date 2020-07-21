var CEF = require("./GTALifeClient/modules/CEFUtils/CEF");

var allCharactersLoaded = [];

function CharacterSelectionIntialise()
{
    mp.gui.chat.push('Loading Character Selection!');
    mp.events.callRemote('characterselection:intialise');
}
mp.events.add('characterselection:intialise', CharacterSelectionIntialise);

function CharacterSelectionLoadCharacters(allCharacterDetails)
{   
    CEF.CreateCEFWithMouse(htmlLink + "CharacterSelect/character-select-UI.html");
    var extraCharacter = 0;

    if(allCharacterDetails != null)
    {
        if(allCharacterDetails.length >= 1)
        {
            allCharacterDetails.forEach((element, idx, array) => {
                allCharactersLoaded.push([element[0], element[1]]);
                var obj = {
                    FirstName: `${element[0].FirstName}`,
                    LastName: `${element[0].LastName}`,
                    Faction: "Civilian",
                    Experience: `${element[1].Experience}`,
                    Health: `${element[1].Health}`,
                    Money: `${element[1].Money}`
                };

                var object = JSON.stringify(obj);
                currentCEF.execute(`bundle.LoadCharacter(${object}, ${extraCharacter})`);
            });

            if(allCharacterDetails.length != 3)
            {
                currentCEF.execute(`bundle.LoadCharacter(${null}, ${extraCharacter})`);
            }
        }
        else
        {
            currentCEF.execute(`bundle.LoadCharacter(${null}, ${extraCharacter})`);
        }
    } else {
        currentCEF.execute(`bundle.LoadCharacter(${null}, ${extraCharacter})`);
    }  
}
mp.events.add('characterselection:characterselectionloadcharacters', CharacterSelectionLoadCharacters);

function ButtonClick_CreateCharacter()
{
    mp.events.call('charactercreation:intialise');
}
mp.events.add('characterselection:createcharacter', ButtonClick_CreateCharacter);

function ButtonClick_LoadCharacter(index)
{
    var data = JSON.stringify(allCharactersLoaded[index]);
    mp.events.callRemote('characterselection:loadallcharacterdetails', data);
}
mp.events.add('characterselection:characterselected', ButtonClick_LoadCharacter);
