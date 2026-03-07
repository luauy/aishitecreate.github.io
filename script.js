const i = document.getElementById('in');
const o = document.getElementById('out');
const luaImg = document.getElementById('luaImg');
const log = document.getElementById('status-log');
const lbar = document.getElementById('lbar');
const loader = document.getElementById('output-loader');
const goBtn = document.getElementById('go');

const gen = (t, l) => {
    let c = t === 'upper' ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : t === 'mixed' ? "AbCdEfGhIjKlMnOpQrStUvWxYz" : "lIlIIllllIIl";
    return Array.from({length: l}, () => c[Math.floor(Math.random() * c.length)]).join('');
};

const junkMath = (n) => {
    const r = Math.floor(Math.random() * 5000);
    return `(${r + n} - ${r})`;
};

const phases = [
    "pobfus v1.12.01-1 connecting...",
    "fetching premium tamper assets...",
    "generating polymorphic bytecode...",
    "obfuscating control flow...",
    "applying xor-masking...",
    "sealing virtual machine..."
];

const updateLog = async (text) => {
    const entries = log.querySelectorAll('.status-entry');
    entries.forEach(e => e.classList.add('dim'));
    if (entries.length > 2) entries[0].remove();

    const div = document.createElement('div');
    div.className = 'status-entry';
    div.innerText = text;
    log.appendChild(div);
};

goBtn.onclick = async () => {
    const source = i.value.trim();
    if (!source) return;

    loader.style.display = 'flex';
    log.innerHTML = '';
    lbar.style.width = '0%';
    luaImg.classList.remove('fade');

    for (let idx = 0; idx < phases.length; idx++) {
        if (idx === 2) luaImg.classList.add('fade');
        await updateLog(phases[idx]);
        lbar.style.width = `${((idx + 1) / phases.length) * 100}%`;
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
    }

    // Protection Logic
    const key = Math.floor(Math.random() * 200) + 50;
    const bytes = source.split('').map(c => c.charCodeAt(0) ^ key);
    
    // Robux Icon:  | Premium Icon: 
    const ROBUX = "\\238\\128\\139";
    const PREM = "\\238\\128\\129";

    const V_VM = gen('upper', 25);
    const V_KEY = gen('upper', 12);
    const V_DATA = gen('', 35);
    const V_CRASH = gen('mixed', 18);
    const V_ITER = gen('mixed', 8);

    let payload = `--[[ protected by pobfus v1.12.01-1 ]]\n`;
    
    // Standalone Tamper Function
    payload += `local function ${V_CRASH}() while true do warn("${ROBUX} UNAUTHORIZED TAMPER ${PREM}") end end `;
    payload += `if (debug and debug.getinfo) or (_G.shared) then ${V_CRASH}() end `;

    // Virtual Machine
    payload += `local ${V_KEY} = ${junkMath(key)} `;
    payload += `local ${V_DATA} = {${bytes.join(',')}} `;
    payload += `local function ${V_VM}() `;
    payload += `if tostring(${V_VM}):find("func") == nil then ${V_CRASH}() end `;
    payload += `local s = "" for ${V_ITER}=1, #${V_DATA} do s = s .. string.char(bit32.bxor(${V_DATA}[${V_ITER}], ${V_KEY})) end `;
    payload += `local f = loadstring(s) if f then setfenv(f, getfenv()) f() end end `;
    payload += `${V_VM}() --[[ end of obfuscation ]]`;

    o.value = payload;
    setTimeout(() => { loader.style.display = 'none'; }, 600);
};
