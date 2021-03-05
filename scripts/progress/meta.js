(function(){

})();

function renderMeta() {
    $("#metaCost").innerHTML = `Cost: ${dNotation(D(10).pow(getMetaReqPow()), 0, 0)} SP`
    $("#metaButton").className = game.singularityPower.gte(D(10).pow(getMetaReqPow())) ? "" : "disabled";
    $("#metaDesc").innerHTML = `You have ${dNotation(game.metaMaterial, 3, 0)} Meta materials and ${dNotation(game.metaEnergy, 3, 0)} Meta Energy`;
    $("#metaSimulationWarp").display = game.achievements.includes(40) ? "block" : "none";
    $("#metaSimulationUnlock").innerHTML = game.achievements.includes(40) ? '' : `Reach ${dNotation(calcMultiProcess(), 1, 0)}/${dNotation(1e15, 1, 0)} Process to Unlock Simulation`
}

function simulationenter() {
    commandAppend('start Simulator.exe');
    slotchange(1, 0)
    goTab(0)
}
function simulationquit() {
    commandAppend('kill Simulator.exe', -110);
    slotchange(0, 0)
    goTab(8)
}

function meta() {
    if (game.singularityPower.lt(D(10).pow(getMetaReqPow()))) return;
    if (game.t5resets.lt(1) && !confirm("If you make meta material you'll lose everything that you have!\nAre you sure to reset all progress?")) return;
  
    game.t5resets = game.t5resets.add(1);
    game.metaMaterial = game.metaMaterial.add(1);
    metaReset();

    commandAppend(`make Meta material (${ordNum(game.t5resets)})`, (30+game.t5resets.toNumber()*3)%360, 1);
}
function getMetaReqPow() {
    return D(50).add(game.metaMaterial.mul(game.metaMaterial.add(2)).mul(5))
}