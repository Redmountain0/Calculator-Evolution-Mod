UpdateLog = [{
'1.0': `
&gt; Mod Released!
`,
'1.0.1': `
&gt; Bug Fix
`,
'1.0.2': `
&gt; Bug Fix
`,
'1.0.3': `
&gt; Added Default Save (9e8 SP, softcap of Base VII)<br>
&gt; Bug Fix
`,
'1.0.4': `
&gt; Added Meta Upgrade (*It only has graphics, and it's no use for now)<br>
&gt; Added Update Log
`,
'1.0.5': `
&gt; Fixed Import bug
`
}, {
'1.1': `
&gt; Changed "Grid Lab" Achievement Reward (half of goal QL > Record QL)<br>
&gt; Changed Challenge Record Display<br>
&gt; Added 7 Meta Upgrades<br>
&gt; Added Simulation Reset Button<br>
&gt; Fixed Import bug<br>
&gt; Faster Gameplay<br>
<span style="font-size: 1.3vh; margin-left: 0.8vw;">- Buffed Quantum VII (x2 > x3)</span><br>
<span style="font-size: 1.3vh; margin-left: 0.8vw;">- Nerfed Quantum Challenge Req</span>
`,
'1.1.1': `
&gt; Fixed Process bug
`,
'1.1.2': `
&gt; Fixed Incrementer amount bug<br>
&gt; Changed "Default Save" condition (9e8 SP > 9e8 SP or 1+ Infinitied stat)<br>
&gt; Added Meta button Quantity
`,
'1.1.3': `
&gt; Fixed Process bug
`,
'1.1.4': `
&gt; Fixed Meta display<br>
&gt; Fixed Import bug<br>
&gt; Added some achievements<br>
&gt; Better Challenge display
`
}, {
'1.2': `
&gt; Added some achievements<br>
&gt; Changed some Meta upgrades<br>
&gt; Added Meta Stat<br>
&gt; Added Meta Energy req slice (101010100100101 > 101010100...)<br>
&gt; Fixed "Multi Process" achievement reward (It was not doing anything)<br>
`,
'1.2.1': `
&gt; Added Favicon<br>
&gt; Changed Meta upgrade 6 Formula (3^x > (x+2)^4)<br>
&gt; Added some achievements
`,
'1.2.2': `
&gt; Fixed ME minus bug<br>
&gt; Changed ME formula<br>
&gt; Added NaN autofix (It will do meta/simulation reset when you has more than 3 MM / 10 ME)
`,
'1.2.3': `
&gt; Changed NaN autofix mechanism
`,
'1.2.4': `
&gt; Fixed Research bug
`
}, {
'1.2.5': `
&gt; Changed ME formula again<br>
&gt; Adjust abnormal MM/ME amount (sorry for undoing save)
`,
'1.2.6': `
&gt; Added 1 Meta upgrade
`
}]
function Toggleupdatelog(num) {
    $('#UpdateLogTable').style.opacity = num>0 ? 0.8 : 0;
    $('#UpdateLogTable').style.pointerEvents = num>0 ? 'auto' : 'none';
    $('#UpdateLogTable').innerHTML = ''
    for (i in UpdateLog[num-1]) {
        $('#UpdateLogTable').innerHTML += `${i}<br>${UpdateLog[num-1][i]}<br><br>`
    }
    $('#UpdateLogTable').innerHTML += '<div id="updateLogExit" onclick="Toggleupdatelog(0)">X</div>'
    if (num != 1) $('#UpdateLogTable').innerHTML += `<div id="updateLogMove1" onclick="Toggleupdatelog(${num-1})"><</div>`
    if (num != UpdateLog.length) $('#UpdateLogTable').innerHTML += `<div id="updateLogMove2" onclick="Toggleupdatelog(${num+1})">></div>`
}

var LastVersion = Object.keys(UpdateLog[UpdateLog.length-1])
$('title').innerHTML = `Calculator Evolution Mod v${LastVersion[LastVersion.length-1]}`