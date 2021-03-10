(function(){
    metaUpgradeDesc = [
        'CPU Speed x256', 'Game Speed x16', '10 Extra RP<br>and reduce Reboot req', '\'Bonus CPU Level\' research\'s effect x2', 'Meta Energy Gain x2',
        'Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!',
        '100 Extra Qubit', '10 Extra Incrementer', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!',
        'Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!', 'Coming Soon!',
    ]
    metaUpgradeCost = [
        '1 Meta Material', '1 Meta Energy', '2 Meta Energy', '3 Meta Energy', '3 Meta Materials',
        'Infinity', 'Infinity', 'Infinity', 'Infinity', 'Infinity',
        '1 Meta Energy', '3 Meta Energy', 'Infinity', 'Infinity', 'Infinity',
        'Infinity', 'Infinity', 'Infinity', 'Infinity', 'Infinity',
    ]
})();

function renderMeta() {
    $('#metaQuantity').innerHTML = calcMetaMaterialGain().valueOf() <= 1 ? 'a' : calcMetaMaterialGain()
    $('#metaQuantity2').innerHTML = calcMetaEnergyGain().valueOf() <= 1 ? 'a' : calcMetaEnergyGain()
    $("#metaCost").innerHTML = `Cost: ${dNotation(getMetaReq(), 0, 0)} SP`
    $("#metaCost2").innerHTML = `Cost: ${formatWithBase(getMetaReq(1), GameSlot.simulation.base)} (${GameSlot.simulation.base})`
    $("#metaButton").className = game.singularityPower.gte(getMetaReq()) ? "" : "disabled";
    $("#metaButton2").className = D(GameSlot.simulation.number).gte(getMetaReq(1)) ? "" : "disabled";
    $("#metaButton2").style.display = game.achievements.includes(42) ? "inline-block" : "none";
    $("#metaDesc").innerHTML = `You have ${dNotation(game.metaMaterial, 3, 0)} Meta materials and ${dNotation(game.metaEnergy, 3, 0)} Meta Energy`;
    $("#metaSimulationWarp").style.display = game.achievements.includes(39) ? "block" : "none";
    $("#metaUpgradeWarp").style.display = game.achievements.includes(42) ? "block" : "none";
    $("#metaSimulationUnlock").innerHTML = game.achievements.includes(39) ? '' : `Reach ${dNotation(calcMultiProcess(), 1, 0)}/${dNotation(1e15, 1, 0)} Process to Unlock Simulation`
    for (var i = 0; i < metaUpgradeDesc.length; i++) {
        var index = [2, 3, 5, 6]
        if (game.metaUpgradeBought.includes(i)) {
            $(`#metaUpgradeWarp > tbody > tr:nth-child(${index[Math.floor(i / 5)]}) > td:nth-child(${i % 5 + 1})`).classList.add('bought')
        }
    }
}
function buyMetaUpgrade(num) {
    if (game.metaUpgradeBought.includes(num)) return;
    metaUpgradePrice = metaUpgradeCost[num].split(' ')

    if (metaUpgradePrice[2] == 'Energy') {
        if (game.metaEnergy.gte(D(metaUpgradePrice[0]))) {
            game.metaEnergy = game.metaEnergy.sub(metaUpgradePrice[0])
            game.metaUpgradeBought.push(num)
        }
    } else {
        if (game.metaMaterial.gte(D(metaUpgradePrice[0]))) {
            game.metaMaterial = game.metaMaterial.sub(metaUpgradePrice[0])
            game.metaUpgradeBought.push(num)
        }
    }
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
    cNode.setAttribute('onclick', `buyMetaUpgrade(${i})`)
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
function simulationmeta() {
    game.metaEnergy = game.metaEnergy.add(calcMetaEnergyGain())
    simulationreset()
}
function simulationreset() {
    for (const i in tempGame) {
        GameSlot.simulation[i] = tempGame[i];
    }
    if (game.metaUpgradeBought.includes(2)) GameSlot.simulation.researchPoint = 10; GameSlot.simulation.t2toggle = 1;
}

function meta() {
    if (game.singularityPower.lt(getMetaReq())) return;
    if (game.t5resets.lt(1) && !confirm("If you make meta material you'll lose everything that you have!\nAre you sure to reset all progress?")) return;
  
    game.t5resets = game.t5resets.add(1);
    game.metaMaterial = game.metaMaterial.add(calcMetaMaterialGain(game.singularityPower));
    metaReset();

    commandAppend(`make Meta material (${ordNum(game.t5resets)})`, (30+game.t5resets.toNumber()*3)%360, 1);
}
function getMetaReq(c=0) {
    if (c) {
        return game.metaEnergy.pow(2).mul(2).add(5).pow(6).sub(1)
    } else {
        return D(1e50).mul(D(10).pow(game.metaMaterial.mul(game.metaMaterial.add(2)).mul(5)))
    }
}
function calcMetaMaterialGain() {
    if (Object.keys(tempData).includes('MMGain') && tempData['MMGain'][0] == tickDone) return tempData['MMGain'][1]
    // SP: start from e50 ... -> 1e50*10^(5x(x+2))
    var fromSPGain = game.singularityPower.pow(D(1)).div(1e50).log(10).div(5).add(1).sqrt(2);
    if (fromSPGain.isNaN()) fromSPGain = D(0);
    
    var labGain = D.floor(fromSPGain);
    tempData['MMGain'] = [tickDone, labGain.floor(0)]
    return labGain.floor(0);
}
function calcMetaEnergyGain() {
    var MEGain = D(GameSlot.simulation.number).plus(1).pow(1/6).sub(5).round().div(2).sqrt().floor().add(1)
    if (MEGain.isNaN()) MEGain = D(0);

    return MEGain.sub(game.metaEnergy)
}