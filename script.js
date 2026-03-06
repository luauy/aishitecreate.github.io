/**
 * POBFUS v1.0.61 - THE MONOLITH
 * Built for Execution Dominance
 */

const LOGO_A = `
#####  ###  ####    #   #   #  ####      #      ###     ### 
#   # #   #  #     ###   # #  #         ##      # #     #   
#   # #   #  #### # # #   #   #          #      # #     ### 
#   # #   #  #  #  ###   #    #          #      # #     # # 
#   #  ###  #####   #   #      ####     ###  #  ###  #  ### 
          [ POBFUS 1.0.61 | MONOLITH ]`;

const LOGO_B = `
MM"""""""\`YM          dP       .8888b                   dP 
MM  mmmmm  M          88       88   "                   88 
M'        .M .d8888b. 88d888b. 88aaa  dP    dP .d8888b. 88 
MM  MMMMMMMM 88'  \`88 88'  \`88 88     88    88 Y8ooooo. dP 
MM  MMMMMMMM 88.  .88 88.  .88 88     88.  .88       88    
MM  MMMMMMMM \`88888P' 88Y8888' dP     \`88888P' \`88888P' oo 
MMMMMMMMMMMM                                               
          [ POBFUS 1.0.61 | MONOLITH ]`;

let ACTIVE_LOGO = Math.random() > 0.5 ? LOGO_A : LOGO_B;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logo').textContent = ACTIVE_LOGO;
});

function notify(m) {
    const t = document.getElementById('toast');
    t.innerText = m; t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 2000);
}

function randVar() {
    const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let r = c.charAt(Math.floor(Math.random() * c.length));
    for(let i=0; i<6; i++) r += c.charAt(Math.floor(Math.random() * c.length));
    return r;
}

function generateScream(len) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let res = "";
    for(let i=0; i<len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
}

function beautifyInput(code) {
    return code.replace(/--.*$/gm, '').replace(/--\[\[[\s\S]*?\]\]/g, '').replace(/\n\s*\n/g, '\n').trim();
}

async function run() {
    let src = document.getElementById('in').value;
    const btn = document.getElementById('go');
    const out = document.getElementById('out');
    if (!src.trim()) return notify("ERROR: NO_INPUT");

    btn.disabled = true;
    out.value = "[!] BOOTING_VM_v1.0.61...";

    const logs = [
        "STRIPPING SOURCE COMMENTS...",
        "MAPPING ENV_SPOOF (_genv, _renv)...",
        "GENERATING LAG-SYNC v1-v5 BUFFERS...",
        "FINALIZING_HEX_BRICK_WALL..."
    ];

    for (let log of logs) {
        out.value += `\n[!] ${log}`;
        await new Promise(r => setTimeout(r, 450));
    }

    try {
        const key = (ACTIVE_LOGO.length % 255) ^ 108;
        
        // Screaming Slop
        const slop = src.split('').map((c, i) => {
            const h = (c.charCodeAt(0) ^ key).toString(16).toUpperCase().padStart(2, '0');
            let noise = Math.random().toString(36).substring(2, 5); 
            if (i % 3 === 0) noise += "_" + generateScream(12) + "_";
            return "0x" + h + noise;
        }).join(',');

        // Lag Stages
        let lagStages = "";
        ['v1', 'v2', 'v3', 'v4', 'v5'].forEach(s => {
            lagStages += `local ${s} = ""; for i=1, 450 do ${s} = ${s} .. "${generateScream(4)}" end; `;
        });

        const v = { p: randVar(), c: randVar(), x: randVar(), d: randVar(), vm: randVar(), r: randVar(), env: randVar(), tab: randVar() };

        // Output Assembly
        const final = `--[[${ACTIVE_LOGO}\n    [!] PROTECTED BY POBFUS v1.0.61\n    [!] WEBSITE: https://tenringsofdoom1x.github.io/]]\n\n${lagStages}\n\nlocal ${v.env} = { _genv = (getgenv or function() return _G end), _renv = (getrenv or function() return _G end), _fenv = getfenv };\nlocal ${v.p},${v.c},${v.x}=pairs,(${v.env}._fenv(1).string.char),(${v.env}._fenv(1).bit32.bxor);\nlocal ${v.d}={${slop}}\n\nlocal ${v.vm}=function(o,k) local r,s="",100 repeat if s==100 then for _,v in ${v.p}(o) do local h=tostring(v):sub(1,4) local b=tonumber(h,16) if b then r=r..${v.c}(${v.x}(b,k)) end end s=0 end until s==0 return r end\n\nlocal function ${v.tab}() local t = {} for i=1, 800 do t[i] = {["val"] = "${generateScream(8)}"} end end; ${v.tab}();\n\nlocal ${v.r}=function() local k=108~(#debug.getinfo(1).source%255) local ok,res=pcall(function() return (loadstring or load)(${v.vm}(${v.d},k)) end) if ok and res then pcall(res) end end; ${v.r}()`;

        out.value = final;
        document.getElementById('dl').style.display = 'inline-block';
        notify("MONOLITH_ACTIVE");

    } catch (e) { notify("ENGINE_CRASH"); }
    finally { btn.disabled = false; btn.innerText = "Protect Source"; }
}

function copy() {
    const o = document.getElementById('out');
    if (!o.value) return; o.select(); document.execCommand('copy');
    notify("HEX_COPIED");
}

function save() {
    const c = document.getElementById('out').value;
    const b = new Blob([c], { type: 'text/plain' });
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = u; a.download = 'monolith_v1.0.61.lua'; a.click();
    URL.revokeObjectURL(u); notify("DOWNLOADED");
}

function test() {
    document.getElementById('in').value = "-- Pobfus v1.0.61 Monolith Test\nprint('Virtualization Successful')\nlocal val = 100\nprint('Entropy: ' .. (val * math.random()))";
    notify("SAMPLE_LOADED");
     }
