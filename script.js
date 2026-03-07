const i = document.getElementById('in');
const o = document.getElementById('out');
const ghSpinner = document.getElementById('gh-spinner');
const log = document.getElementById('status-log');
const lbar = document.getElementById('lbar');
const loader = document.getElementById('output-loader');
const goBtn = document.getElementById('go');
const dlBtn = document.getElementById('dl');
const clearBtn = document.getElementById('clear');

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const updateLog = (text) => {
    log.innerHTML = `<div class="status-entry">${text}</div>`;
};

clearBtn.onclick = () => {
    i.value = ''; o.value = ''; 
    dlBtn.disabled = true; 
    dlBtn.style.opacity = "0.5";
};

dlBtn.onclick = () => {
    const blob = new Blob([o.value], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "protected_build.lua";
    a.click();
};

goBtn.onclick = async () => {
    const source = i.value.trim();
    if (!source) return;

    // UI Reset
    loader.style.display = 'flex';
    ghSpinner.classList.add('spinning');
    lbar.style.width = '0%';
    
    const phases = [
        "initializing v1.12.01-1...",
        "fetching robux assets...",
        "building xor stack...",
        "sealing polymorphic vm..."
    ];

    // Execution with forced UI painting
    for (let idx = 0; idx < phases.length; idx++) {
        updateLog(phases[idx]);
        lbar.style.width = `${((idx + 1) / phases.length) * 100}%`;
        await sleep(900); // Give enough time for the spin to be seen
    }

    // Heavy Processing (Small delay so "Sealing" text shows first)
    await sleep(100);

    const key = Math.floor(Math.random() * 200) + 50;
    const bytes = source.split('').map(c => c.charCodeAt(0) ^ key);
    
    // Robux:  (\238\128\139) | Premium:  (\238\128\129)
    const ROBUX = "\\238\\128\\139";
    const PREM = "\\238\\128\\129";
    const V_VM = "VM_" + Math.random().toString(36).substring(7).toUpperCase();

    let payload = `--[[ protected by pobfus v1.12.01-1 ]]\n`;
    payload += `local function crash() while true do warn("${ROBUX} TAMPER DETECTED ${PREM}") end end\n`;
    payload += `if (debug and debug.getinfo) or _G.shared then crash() end\n`;
    payload += `local d={${bytes.join(',')}} local k=${key}\n`;
    payload += `local function ${V_VM}() local s="" for i=1,#d do s=s..string.char(bit32.bxor(d[i],k)) end\n`;
    payload += `local f=loadstring(s) if f then setfenv(f,getfenv()) f() end end ${V_VM}()`;

    o.value = payload;
    
    // Finalize UI
    dlBtn.disabled = false;
    dlBtn.style.opacity = "1";
    ghSpinner.classList.remove('spinning');
    await sleep(400);
    loader.style.display = 'none';
};
