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
<div style="font-size: 1.3vh; margin-left: 0.8vw;">
- Buffed Quantum VII (x2 > x3)<br>
- Nerfed Quantum Challenge Req
</div>
`,
'1.1.1': `
&gt; Fixed Process bug
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