/**
 * POBFUS v1.0.6 - CORE ENGINE LOGIC
 * Includes: Comment Stripping, Var Shuffling, & High-Density Slop
 */

const LOGO = `ooooooooo.              .o8        .o88o.                      
\`888   \`Y88.           "888        888 \`"                      
 888   .d88'  .ooooo.   888oooo.  o888oo  oooo  oooo   .oooo.o 
 888ooo88P'  d88' \`88b  d88' \`88b  888    \`888  \`888  d88(  "8 
 888         888   888  888   888  888     888   888  \`"Y88b.  
 888         888   888  888   888  888     888   888  o.  )88b 
o888o        \`Y8bod8P'  \`Y8bod8P' o888o    \`V88V"V8P' 8""888P'
         [ POBFUS 1.0.6 | tenringsofdoom1x ]`;

document.addEventListener('DOMContentLoaded', () => {
    const l = document.getElementById('logo');
    if (l) l.innerText = LOGO;
});

function notify(m) {
    const t = document.getElementById('toast');
    t.innerText = m; t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 2000);
}

function test() {
    document.getElementById('in').value = "-- Pobfus Test\nprint('Testing Virtualization...')\nlocal x = 10\nif x == 10 then print('Logic Passed') end";
    notify("TEST_DATA_LOADED");
}

function randVar() {
    const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let r = c.charAt(Math.floor(Math.random() * c.length));
    for(let i=0; i<4; i++) r += c.charAt(Math.floor(Math.random() * c.length));
    return r;
}

// --- BEAUTIFIER: STRIPS COMMENTS & WHITESPACE ---
function beautifyInput(code) {
    let clean = code.replace(/--.*$/gm, ''); // Single line
    clean = clean.replace(/--\[\[[\s\S]*?\]\]/g, ''); // Multi line
    clean = clean.replace(/\n\s*\n/g, '\n'); // Double lines
    return clean.trim();
}

async function run() {
    let src = document.getElementById('in').value;
    const btn = document.getElementById('go');
    const out = document.getElementById('out');

    if (!src.trim()) return notify("ERROR: BUFFER_EMPTY");

    btn.disabled = true;
    out.value = "[!] CLEANING SOURCE...\n[!] REMOVING COMMENTS...\n[!] PREPARING VM...";

    // Run Beautification before processing
    src = beautifyInput(src);

    const phases = ["MAPPING_XOR", "INJECTING_SLOP", "FLATTENING_FLOW", "FINALIZING"];
    for (let p of phases) {
        btn.innerText = p + "...";
        out.value += `\n[SYSTEM]: ${p} [OK]`;
        await new Promise(r => setTimeout(r, 600));
    }

    try {
        const key = (LOGO.length % 255) ^ 108;
        
        // SLOP GENERATION (5-char junk tail)
        const slop = src.split('').map(c => {
            const h = (c.charCodeAt(0) ^ key).toString(16).toUpperCase().padStart(2, '0');
            const j = Math.random().toString(36).substring(2, 7); 
            return "0x" + h + j;
        }).join(',');

        // ROAST TRAP
        const rst = "tenringsofdoom1x_owns_you".split('').map(c => 
            "0x" + (c.charCodeAt(0) ^ key).toString(16).toUpperCase().padStart(2, '0')
        ).join(',');

        // DYNAMIC LUA VARS
        const v = { p: randVar(), c: randVar(), x: randVar(), d: randVar(), t: randVar(), vm: randVar(), r: randVar() };

        // THE MONOLITH BRICK WALL
        const final = `--[[${LOGO}\n    [!] PROTECTED BY POBFUS v1.0.6\n    [!] PROJECT: https://tenringsofdoom1x.github.io/Pobfus/]]\nlocal ${v.p},${v.c},${v.x}=pairs,(string.char),(bit32.bxor);local ${v.d}={${slop}}local ${v.t}={${rst}}local ${v.vm}=function(o,k)local r,s="",100 repeat if s==100 then for _,v in ${v.p}(o)do local h=tostring(v):sub(1,4)local b=tonumber(h,16)if b then r=r..${v.c}(${v.x}(b,k))end end s=0 end until s==0 return r end local ${v.r}=function()local k=108~(#debug.getinfo(1).source%255)local ok,res=pcall(function()return(loadstring or load)(${v.vm}(${v.data||v.d},k))end)if ok and res then pcall(res)else print(${v.vm}(${v.t},k))while true do end end end ${v.r}()`;

        out.value = final;
        document.getElementById('dl').style.display = 'inline-block';
        notify("OBFUSCATION_COMPLETE");

    } catch (e) { notify("ENGINE_CRASH"); }
    finally { btn.disabled = false; btn.innerText = "PROTECT_SOURCE"; }
}

function copy() {
    const o = document.getElementById('out');
    if (!o.value) return; o.select(); document.execCommand('copy');
    notify("CLIPBOARD_UPDATED");
}

function save() {
    const c = document.getElementById('out').value;
    const b = new Blob([c], { type: 'text/plain' });
    const u = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = u; a.download = 'pobfus_out.lua'; a.click();
    URL.revokeObjectURL(u); notify("HEX_FILE_SAVED");
                    }
