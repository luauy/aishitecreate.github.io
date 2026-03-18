const skidShadow = `--[[
███████╗██╗  ██╗██╗██████╗ ██╗██╗    ███████╗██╗  ██╗██╗██████╗ ██████╗ ██╗██╗██╗██╗██╗    
██╔════╝██║ ██╔╝██║██╔══██╗██║██║    ██╔════╝██║ ██╔╝██║██╔══██╗██╔══██╗██║██║██║██║██║    
███████╗█████╔╝ ██║██║  ██║██║██║    ███████╗█████╔╝ ██║██║  ██║██║  ██║██║██║██║██║██║    
╚════██║██╔═██╗ ██║██║  ██║╚═╝╚═╝    ╚════██║██╔═██╗ ██║██║  ██║██║  ██║╚═╝╚═╝╚═╝╚═╝╚═╝    
███████║██║  ██╗██║██████╔╝██╗██╗    ███████║██║  ██╗██║██████╔╝██████╔╝██╗██╗██╗██╗██╗    
╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═╝╚═╝    ╚══════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═════╝ ╚═╝╚═╝╚═╝╚═╝╚═╝    
]]\n`;

function hex(s) { return s.split('').map(c => `\\x${c.charCodeAt(0).toString(16).toUpperCase()}`).join(''); }
function rVar() { return "_" + Math.random().toString(36).substring(2, 12).toUpperCase(); }

function buildSteroids() {
    const input = document.getElementById('inputCode').value;
    if (!input.trim()) return alert("Buffer is empty.");

    // 1. SYNC LOADING (Ghost-Encoded Dots)
    const loadMsg = hex("pez.bf: INITIALIZING_SKID_PROTECT");
    const dots = [hex("·"), hex("··"), hex("···"), hex("··")];
    const loader = `task.spawn(function() local d={"${dots.join('","')}"} for i=1,20 do for _,v in pairs(d) do print("${loadMsg} "..v) task.wait(0.07) end end end)\n` + " ".repeat(10000) + "\n";

    // 2. ENCRYPTION (1-0 and 100-900 Multi-Key)
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 10, 20, 30, 40, 50, 60, 70, 80, 90];
    const payload = input.split('').map((c, i) => `\\${(c.charCodeAt(0) + keys[i % keys.length]) % 256}`).join('');

    // 3. CFF DISPATCHER (State-Machine Architecture)
    const vState = rVar(); 
    const vBuffer = rVar();
    let engine = `return(function(...)local ${vState}=30;local ${vBuffer}={}while ${vState}~=0 do `;
    engine += `if ${vState}==30 then ${vBuffer}.d=[[${payload}]]${vState}=15 `;
    engine += `elseif ${vState}==15 then ${vBuffer}.k={${keys.join(',')}}${vState}=45 `;
    engine += `elseif ${vState}==45 then local b=""for i=1,#${vBuffer}.d do b=b..string.char((${vBuffer}.d:byte(i)-${vBuffer}.k[(i-1)%#${vBuffer}.k+1])%256)end;${vBuffer}.r=loadstring(b)${vState}=60 `;
    engine += `elseif ${vState}==60 then return ${vBuffer}.r(...)else ${vState}=0 end end end)(...)`;

    // Final Output: Skid-Trap Loader -> 10k Spaces -> SKID-SKID Banner -> Minified VM
    document.getElementById('outputCode').value = loader + skidShadow + engine.replace(/\s+/g, '');
}
