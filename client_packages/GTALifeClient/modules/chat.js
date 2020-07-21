mp.events.add('playerSpawn', (player) => {
    mp.gui.chat.push(`Name: ${player.name}`);
});
