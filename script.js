/**
 * pobfus // v1.11.06 STABLE
 * repository logic: ghost-edition (root-level)
 * domain: tenringsofdoom1x.github.io
 */

const iel = document.getElementById('in'); // Input Textarea
const oel = document.getElementById('out'); // Output Textarea
const overlay = document.getElementById('overlay');
const lbar = document.getElementById('lbar');
const stxt = document.getElementById('stxt');

// helper: generates randomized IlIlI variable names for Lua
const gs = (l) => { 
    let s = 'I'; 
    for(let i=0; i<l; i++) s += (Math.random() > 0.5 ? 'l' : 'I'); 
    return s; 
};

// helper: generates randomized ID for filenames
const genID = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    for(let i=0; i<11; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
};

// Human-like phrases (no underscores)
const phrases = [
    "mapping virtual instructions",
    "scanning for logical vulnerabilities",
    "shadowing global environment",
    "applying ghost layer encryption",
    "injecting randomized junk layers",
    "wrapping execution scream",
    "finalizing distribution blob",
    "hiding internal warnings"
];

const executeProcess = () => {
    const src = iel.value.trim();
    if(!src) return;

    // UI Reset
    overlay.style.display = 'flex';
    lbar.style.transition = 'none';
    lbar.style.width = '0%';
    
    // Trigger 15s linear animation
    setTimeout(() => {
        lbar.style.transition = 'width 15s linear';
        lbar.style.width = '100%';
    }, 50);

    // Shuffle and display phrases
    let shuffled = phrases.sort(() => 0.5 - Math.random());
    shuffled.forEach((m, i) => {
        setTimeout(() => { 
            stxt.innerText = m + "..."; 
        }, i * 1800);
    });

    // Main Encryption Logic (After 15s)
    setTimeout(() => {
        try {
            const k = Math.floor(Math.random() * 80) + 20;
            const watermark = "obfuscated by pobfus // tenringsofdoom1x.github.io";
            
            // SNEAKY: Warning is buried in the encrypted payload
            const protection = `local _w = "${watermark}"; if not _G.pobfus_verified then warn(_w) end; `;
            
            // Convert to XOR-encrypted string
            const d = (protection + src).split('').map(c => "\\" + (c.charCodeAt(0) ^ k)).join('');
            
            const f = gs(12); // Shadowed function name
            let b = `--[[ ${watermark} ]]\n`;
            
            // DYNAMIC JUNK: Random lines to confuse de-obfuscators
            const junkLines = Math.floor(Math.random() * 50) + 35;
            for(let i=0; i<junkLines; i++) {
                b += `local ${gs(10)} = ${Math.floor(Math.random()*1000)} + ${Math.floor(Math.random()*1000)};\n`;
            }

            // The Scream (Core Decryption Function)
            b += `local ${f} = function() `;
            b += `local _k,_d = ${k},"${d}"; `;
            b += `local _r = ""; for i=1,#_d do _r=_r..string.char(bit32.bxor(string.byte(string.sub(_d,i,i)),_k)) end; `;
            b += `local _x=loadstring(_r); if _x then setfenv(_x,getfenv()); _x(); end end; ${f}();\n`;
            
            // Post-junk footer
            for(let i=0; i<10; i++) b += `local ${gs(8)} = ${Math.random()};\n`;

            oel.value = b;
            overlay.style.display = 'none';
            stxt.innerText = "preparing environment...";
            
        } catch(e) {
            console.error("pobfus_err:", e);
            overlay.style.display = 'none';
        }
    }, 15000);
};

// Event Listeners
document.getElementById('go').onclick = executeProcess;

document.getElementById('dl').onclick = () => {
    if(!oel.value) return;
    const blob = new Blob([oel.value], {type: "text/plain"});
    const a = document.createElement('a');
    // Filename: pobfus-[RANDOM]-110.lua.txt
    a.href = URL.createObjectURL(blob);
    a.download = `pobfus-${genID()}-110.lua.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
};

document.getElementById('cl').onclick = () => {
    iel.value = "";
    oel.value = "";
};
