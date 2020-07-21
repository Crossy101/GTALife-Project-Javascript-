var debounceKey = false;
var colshape_event = null;

mp.events.add('playerEnterColshape', (colshape) => {
    if(colshape.getVariable('CLIENT_EVENT') != undefined)
    {
        colshape_event = colshape.getVariable('CLIENT_EVENT');
    }
});

mp.events.add('playerExitColshape', (colshape) => {
    if(colshape.getVariable('CLIENT_EVENT') != undefined)
    {
        colshape_event = null;
    }
});

mp.events.add('render', () => {
    if (mp.keys.isDown(69) === true && !debounceKey && colshape_event != null) { // 69 is the key code for 'E'
        mp.events.call(colshape_event);

        debounceKey = true;
        setTimeout(function () {
            debounceKey = false;
        }, 500);
    } 

    if(mp.keys.isDown(113) === true)
    {
        mp.gui.chat.push(`Position: {${mp.players.local.position.x}, ${mp.players.local.position.y}, ${mp.players.local.position.z}}`);
        debounceKey = true;
        setTimeout(function () {
            debounceKey = false;
        }, 500);
    }
});