(function(){
    metaUpgradeDesc = [
        'CPU Speed x64', 'Game Speed x10', 'Meta Energy Gain x2', '\'Bonus CPU Level\' research\'s effect x2', '',
        '', '', '', '', '',
        '100 Extra Qubit', '10 Extra Incrementer', '', '', '',
        '', '', '', '', '',
    ]
    metaUpgradeCost = [
        '1 Meta Material', '1 Meta Energy', '2 Meta Materials', '3 Meta Energy', '',
        '', '', '', '', '',
        '1 Meta Energy', '2 Meta Energy', '', '', '',
        '', '', '', '', '',
    ]
})();

function renderMeta() {
    $("#metaCost").innerHTML = `Cost: ${dNotation(D(10).pow(getMetaReqPow()), 0, 0)} SP`
    $("#metaButton").className = game.singularityPower.gte(D(10).pow(getMetaReqPow())) ? "" : "disabled";
    $("#metaDesc").innerHTML = `You have ${dNotation(game.metaMaterial, 3, 0)} Meta materials and ${dNotation(game.metaEnergy, 3, 0)} Meta Energy`;
    $("#metaSimulationWarp").display = game.achievements.includes(40) ? "block" : "none";
    $("#metaSimulationUnlock").innerHTML = game.achievements.includes(40) ? '' : `Reach ${dNotation(calcMultiProcess(), 1, 0)}/${dNotation(1e15, 1, 0)} Process to Unlock Simulation`
}
function initMetaUpgrades() {
  var tableNode = $('#metaUpgradeWarp');
  var cNode = document.createElement('tbody');
  tableNode.appendChild(cNode);
  tableNode = $('#metaUpgradeWarp > tbody');
  var trNode = $('#metaUpgradeWarp > tbody > tr:last-child');
  for (var i = 0; i < metaUpgradeDesc.length; i++) {
    if (i%10 == 0) {
        var cNode = document.createElement('tr');
        tableNode.appendChild(cNode);
        trNode = $('#metaUpgradeWarp > tbody > tr:last-child');
        var cNode = document.createElement('td');
        cNode.innerHTML = i==0 ? 'Simulation' : 'Main Game'
        if (i == 0) cNode.classList.add("MetaDescPurple"); else cNode.classList.add("MetaDescRed");
        trNode.appendChild(cNode);
    }
    if (i%5 == 0) {
        var cNode = document.createElement('tr');
        tableNode.appendChild(cNode);
        trNode = $('#metaUpgradeWarp > tbody > tr:last-child');
    }
    var cNode = document.createElement('td');
    cNode.innerHTML = `${metaUpgradeDesc[i]}<br><br>Cost: ${metaUpgradeCost[i]}`
    cNode.classList.add("MetaUpgradeNode");
    if (i < 10) cNode.classList.add("MetaUpgradePurple");
    trNode.appendChild(cNode);
  }
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
    game.metaMaterial = game.metaMaterial.add(calcMetaMaterialGain(game.singularityPower));
    metaReset();

    commandAppend(`make Meta material (${ordNum(game.t5resets)})`, (30+game.t5resets.toNumber()*3)%360, 1);
}
function getMetaReqPow() {
    return D(50).add(game.metaMaterial.mul(game.metaMaterial.add(2)).mul(5))
}
function calcMetaMaterialGain(r) {
    if (Object.keys(tempData).includes('MMGain') && tempData['MMGain'][0] == tickDone) return tempData['MMGain'][1]
    // SP: start from e50 ... -> 1e50*10^(5x(x+2))
    var fromSPGain = r.pow(D(1)).div(1e50).log(10).div(5).add(1).sqrt(2);
    if (fromSPGain.isNaN()) fromSPGain = D(0);
    
    var labGain = D.floor(fromSPGain);
    tempData['MMGain'] = [tickDone, labGain.floor(0)]
    return labGain.floor(0);
  }