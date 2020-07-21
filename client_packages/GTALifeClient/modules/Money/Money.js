function UpdateMoney()
{
    var characterStats = JSON.parse(mp.players.local.getVariable('character:characterstats'));
    mp.game.stats.statSetInt(mp.game.joaat("SP0_TOTAL_CASH"), parseInt(characterStats.Money), false);
}
mp.events.add('money:update', UpdateMoney);