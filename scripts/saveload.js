(function(){
  savePoint = 'CalculatorEvolutionMod';
})();
tempGame = {
  gameSpeed: 1,
  lastRestoreSaved: 0,
  saveRestorePoint: 0,
  startTime: new Date().getTime(),
  number: D(0),
  rebootNum: D(0),
  base: D(2),
  digits: D(1),
  mDigits: D(6),
  tLast: new Date().getTime(),
  programActive: new Array(15).fill(0),
  money: D(0),
  shopBought: new Array(15).fill(0),
  researchPoint: D(0),
  researchSpeed: new Array(9).fill(0),
  researchLevel: new Array(9).fill(0),
  researchProgress: new Array(9).fill(0),
  rebootTime: new Date().getTime(),
  t2toggle: 0,
  t2time: 0,
  t2resets: D(0),
  optionToggle: new Array(9).fill(1),
  theme: 0,
  notation: 0,
  hyperMode: false,
  achievements: [],
  durability: D(1),
  t3toggle: 0,
  t3resets: D(0),
  quantumLab: D(0),
  maxQuantumLab: D(0),
  qubit: D(0),
  qubitProgress: D(0),
  quantumUpgradeBought: [],
  quantumUpgradePreset: {},
  quantumAutomateToggle: new Array(7).fill(1),
  quantumTime: new Date().getTime(),
  t4toggle: 0,
  t4resets: D(0),
  t4resetTime: 1e110,
  singularityTime: new Date().getTime(),
  singularityGrid: {},
  singularityGridPreset: [{}, {}, {}],
  singularityGridActivate: 0,
  singularityPower: D(0),
  wormholeChallengeProgress: new Array(8).fill(0),
  challengeRecord: new Array(8).fill(D(0)),
  challengeEntered: -1,
  challengeTime: new Date().getTime(),
  t5toggle: 0,
  t5resets: D(0),
  metaEnergy: D(0),
  metaMaterial: D(0),
  metaTime: new Date().getTime(),
  metaUpgradeBought: [],
  b: 0,
  metaRecord: [D(0), D(0)]
};
game = {};
tempGameSlot = {main: tempGame, simulation: tempGame, now: 0 /* 0: main; 1: simulation */, b: 2}
GameSlot = tempGameSlot
//            vvv    commandAppear=1
function save(c=1) {
  if ((new Date().getTime())-game.lastRestoreSaved >= 1000*3600) {
    localStorage[`CalculatorEvolution2_restore${game.saveRestorePoint%24}`] = JSON.stringify(GameSlot);
    game.saveRestorePoint++;
    game.lastRestoreSaved = new Date().getTime();
  }
  localStorage[savePoint] = JSON.stringify(GameSlot);
  if (c) commandAppend('save', 70);
}
function load(c=1) {
  basicInits();
  // type fix
  // Number(string) -> Deciamal
  for (const i in tempGame) {
    if (Array.isArray(tempGame[i])) {
      var temp = tempGame[i];
      game[i] = [];

      for (var j = 0, l = temp.length; j < l; j++) {
        if (temp[j] instanceof Decimal) {
          game[i].push(D(temp[j]));
        } else {
          game[i].push(temp[j]);
        }
      }
    } else if (tempGame[i] instanceof Decimal) {
      game[i] = D(tempGame[i]);
    } else {
      game[i] = tempGame[i];
    }
  }
  if (localStorage[savePoint] !== undefined) {
    tempLoad = JSON.parse(localStorage[savePoint]);
    GameSlot = tempLoad
    var SaveList = ["main", "simulation"]
    for (i in GameSlot[SaveList[GameSlot.now]]) {
      if (game[i] = GameSlot[SaveList[GameSlot.now]][i] instanceof Decimal) {
        game[i] = D(game[i] = GameSlot[SaveList[GameSlot.now]][i]);
      } else {
        game[i] = game[i] = GameSlot[SaveList[GameSlot.now]][i];
      }
    }
    GameSlot[SaveList[GameSlot.now]] = game
  } else {
    game = {};
  }
  for (const i in game) {
    if (typeof game[i] == "undefined") continue;
    if (tempGame[i] instanceof Decimal) {
      game[i] = D(game[i]);
    } else {
      game[i] = game[i];
    }
  }
  for (var i = 0, l = game.challengeRecord.length; i < l; i++) game.challengeRecord[i] = D(game.challengeRecord[i]);
  // Obj -> SingularityMachine
  for (var i in game.singularityGrid) {
    game.singularityGrid[i] = new SingularityMachine(game.singularityGrid[i]);
    game.singularityGrid[i].value = D(game.singularityGrid[i].value);
  }

  // old version fix
  if (game.researchSpeed.length == 5) {
    for (var i = 0; i < 4; i++) {
      game.researchSpeed.push(0);
      game.researchLevel.push(0);
      game.researchProgress.push(0);
    }
  }
  if (game.b == 0) {
    game.quantumUpgradeBought = [];
    dokeepMilestone();
    game.b++;
  }

  if (game.b == 1) {

  }

  // meta Record fix
  game.metaRecord[0] = D.max(game.metaMaterial, game.metaRecord[0]);
  game.metaRecord[1] = D.max(game.metaEnergy, game.metaRecord[1]);

  // offline progress delete
  if (!game.optionToggle[2]) game.tLast = new Date().getTime();

  // bug fix
  game.quantumUpgradeBought = [...new Set(game.quantumUpgradeBought)];
  if (c) commandAppend('load', 70);
}
function hardReset() {
  for (const i in tempGameSlot) {
    GameSlot[i] = tempGameSlot[i];
  }
  save(0);
  load(0);
}
function slotchange(slot, c=1) {
  GameSlot.now = slot
  var SaveList = ["main", "simulation"]
  game = GameSlot[SaveList[GameSlot.now]]
  if (c) commandAppend('Slot changed!', 70);
  save(0);
  load(0);
}
function exportGame() {
  copyText(btoa(JSON.stringify(GameSlot)));
  commandAppend('export game to clipboard');
}
function importGame() {
  var recSaveFile = atob(window.prompt("Import Savefile here", ""));
  try {
    recSaveFile = JSON.parse(recSaveFile);
    console.log(recSaveFile.main)
    if (recSaveFile.main == undefined) {
      if (D(recSaveFile.singularityPower).gte(9e8) || D(recSaveFile.t5resets).gte(1)) {
        GameSlot = JSON.parse('{"main":{"gameSpeed":1,"lastRestoreSaved":0,"saveRestorePoint":0,"startTime":1614997802983,"number":"0","rebootNum":"0","base":"2","digits":"1","mDigits":"6","tLast":1614997831015,"programActive":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"money":"0","shopBought":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"researchPoint":"0","researchSpeed":[0,0,0,0,0,0,0,0,0],"researchLevel":[0,0,0,0,0,0,0,0,0],"researchProgress":[0,0,0,0,0,0,0,0,0],"rebootTime":1614997802983,"t2toggle":1,"t2time":0,"t2resets":"0","optionToggle":[1,1,1,1,1,1,1,1,1],"theme":0,"notation":0,"hyperMode":false,"achievements":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],"durability":"1","t3toggle":1,"t3resets":"0","quantumLab":"0","maxQuantumLab":"0","qubit":"68","qubitProgress":"16449.196678877390596","quantumUpgradeBought":[],"quantumUpgradePreset":{},"quantumAutomateToggle":[1,1,1,1,1,1,1],"quantumTime":1614997802983,"t4toggle":1,"t4resets":"2","t4resetTime":1e+110,"singularityTime":1614997802983,"singularityGrid":{},"singularityGridActivate":0,"singularityPower":"900000000","wormholeChallengeProgress":[10,10,10,10,10,10,2,0],"challengeRecord":["0","0","0","0","0","0","0","0"],"challengeEntered":-1,"challengeTime":1614997802983,"t5toggle":0,"t5resets":"0","metaEnergy":"0","metaMaterial":"0","metaTime":1614997802983,"b":1,"Achievementtoggle":1},"simulation":{"gameSpeed":1,"lastRestoreSaved":0,"saveRestorePoint":0,"startTime":1614997802983,"number":"0","rebootNum":"0","base":"2","digits":"1","mDigits":"6","tLast":1614997802983,"programActive":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"money":"0","shopBought":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"researchPoint":"0","researchSpeed":[0,0,0,0,0,0,0,0,0],"researchLevel":[0,0,0,0,0,0,0,0,0],"researchProgress":[0,0,0,0,0,0,0,0,0],"rebootTime":1614997802983,"t2toggle":0,"t2time":0,"t2resets":"0","optionToggle":[1,1,1,1,1,1,1,1,1],"theme":0,"notation":0,"hyperMode":false,"achievements":[],"durability":"1","t3toggle":0,"t3resets":"0","quantumLab":"0","maxQuantumLab":"0","qubit":"0","qubitProgress":"0","quantumUpgradeBought":[],"quantumUpgradePreset":{},"quantumAutomateToggle":[1,1,1,1,1,1,1],"quantumTime":1614997802983,"t4toggle":0,"t4resets":"0","t4resetTime":1e+110,"singularityTime":1614997802983,"singularityGrid":{},"singularityGridActivate":0,"singularityPower":"0","wormholeChallengeProgress":[0,0,0,0,0,0,0,0],"challengeRecord":["0","0","0","0","0","0","0","0"],"challengeEntered":-1,"challengeTime":1614997802983,"t5toggle":0,"t5resets":"0","metaEnergy":"0","metaMaterial":"0","metaTime":1614997802983,"b":0},"now":0,"b":"0"}')
      } else {
        GameSlot = {main: recSaveFile, simulation: tempGame, now: 0 /* 0: main; 1: simulation */, b: 0}
      }
    } else {
      GameSlot = recSaveFile
    }
    var SaveList = ["main", "simulation"]
    game = GameSlot[SaveList[GameSlot.now]]
    save(0);
    load(0);
    commandAppend('import string to game');
  } catch (e) {
    commandAppend('invaild savefile!', -110, 1);
  }
  basicInits();
}
function undoGame() {
  var uSave = JSON.parse(localStorage[`CalculatorEvolution2_restore${(game.saveRestorePoint-1)%24}`]);
  if (game.saveRestorePoint-uSave.saveRestorePoint == 1) {
    if (!confirm(`Are you sure to load ${timeNotation((new Date().getTime() - uSave.lastRestoreSaved)/1000)} ago save?`)) return;
    game = uSave;
    save(0);
    load(0);
    commandAppend("load backup #" + uSave.saveRestorePoint)
  } else {
    alert("no backup found!");
  }
  setTheme();
}

function openSavefileList() {
  
}