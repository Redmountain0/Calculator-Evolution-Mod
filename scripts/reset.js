function rebootReset(layer=1) {
  game.rebootNum = D(0);
  game.durability = D(1).mul(game.researchLevel[5]+1);
  if (!game.programActive[4]) {
    for (var i = 0; i < game.programActive.length; i++) {
      game.programActive[i] = 0;
    }
    game.base = D(2);
  }
  if (!game.programActive[4] || game.shopBought[2] < 2) game.digits = D(1);
  if (!game.programActive[4] || game.shopBought[2] < 2) game.number = D(0);
  if (!game.programActive[4] || game.shopBought[2] < 3) game.money = D(0);
  if (!game.programActive[4] || game.shopBought[2] < 3) game.shopBought[5] = 0;
  game.rebootTime = new Date().getTime();
}

function quantumReset(layer=2) {
  if (!game.quantumUpgradeBought.includes('65')) game.programActive[4] = false;
  rebootReset(layer);
  if (!game.quantumUpgradeBought.includes('63')) game.researchPoint = D(0);
  if (game.achievements.includes(22)) game.researchPoint = game.researchPoint.add(100);
  for (var i = 0; i < 9; i++) {
    game.researchProgress[i] = 0;
    if (!game.quantumUpgradeBought.includes('66')) game.researchLevel[i] = (game.quantumUpgradeBought.includes('62') ? Math.min(3, game.researchLevel[i]) : 0);
    game.researchSpeed[i] = 0;
  }
  game.durability = D(1).mul(game.researchLevel[5]+1);
  if (!game.quantumUpgradeBought.includes('66')) {
    for (var i = 0; i < 15; i++) {
      if (i < 5) {
        if (game.quantumUpgradeBought.includes('64')) continue;
        if (game.quantumUpgradeBought.includes('61')) {
          game.shopBought[i] = Math.min(1, game.shopBought[i]);
          continue;
        }
      }
      game.shopBought[i] = 0;
    }
  }
  if (game.quantumUpgradeBought.includes('41') && game.researchLevel[1] < 2) game.researchLevel[1] = 2;
  game.quantumTime = new Date().getTime();
  game.t2resets = D(0);
}

function singularityReset(layer=3) {
  console.log(layer)
  if (!game.quantumUpgradeBought.includes('67') || layer > 3) {
    game.quantumUpgradeBought = [];
    game.qubit = D(0);
    game.qubitProgress = D(0);
    game.quantumLab = D(0);
  }
  quantumReset(layer);
  game.singularityTime = new Date().getTime();
  singularityMachineChanged();
  game.t3resets = D(0);
  dokeepMilestone();
}

function metaReset(layer=4) {
  game.singularityPower = D(0)
  singularityReset(layer);
  game.t4resets = D(0);
  game.metaTime = new Date().getTime()
  game.singularityGrid = {}
  game.singularityGridActivate = 0
  if (!game.metaUpgradeBought.includes(13)) {
    game.wormholeChallengeProgress = new Array(8).fill(0)
    game.challengeRecord = new Array(8).fill(D(0))
  }
  game.challengeEntered = -1
}