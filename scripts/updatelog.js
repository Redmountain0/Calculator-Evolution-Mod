UpdateLog = {
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
%gt; Fixed Import bug
`
}
function Toggleupdatelog(num) {
    $('#UpdateLogTable').style.opacity = num>0 ? 0.8 : 0;
    $('#UpdateLogTable').style.pointerEvents = num>0 ? 'auto' : 'none';
    $('#UpdateLogTable').innerHTML = ''
    for (i in UpdateLog) {
        $('#UpdateLogTable').innerHTML += `${i}<br>${UpdateLog[i]}<br><br>`
    }
    $('#UpdateLogTable').innerHTML += '<div id="updateLogExit" onclick="Toggleupdatelog(0)">X</div>'
}