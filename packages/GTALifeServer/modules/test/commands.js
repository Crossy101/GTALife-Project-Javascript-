mp.events.addCommand("cv" , (player, vehname) => {
    mp.vehicles.new(mp.joaat(vehname), player.position);
});

mp.events.addCommand("setd", (player) => {
    mp.world.time.set(12, 0, 0);
});

mp.events.addCommand("setn", (player) => {
    mp.world.time.set(0, 0, 0);
});


 