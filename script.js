/* POBFUS 0.7 - FULL CORE 
   Place this in your script.js 
*/

const POBFUS_LOGO = String.raw`
 /$$$$$$$           /$$        /$$$$$$                    
| $$__  $$         | $$       /$$__  $$                   
| $$  \ $$ /$$$$$$ | $$$$$$$ | $$  \__//$$   /$$  /$$$$$$$
| $$$$$$$//$$__  $$| $$__  $$| $$$$   | $$  | $$ /$$_____/
| $$____/| $$  \ $$| $$  \ $$| $$_/   | $$  | $$|  $$$$$$ 
| $$     | $$  | $$| $$  | $$| $$     | $$  | $$ \____  $$
| $$     |  $$$$$$/| $$$$$$$/| $$     |  $$$$$$/ /$$$$$$$/
|__/      \______/ |_______/ |__/      \______/ |_______/ 
`;

function generateJunk() {
    const segments = [
        "if _G.PobfusManaged == nil then _G.PobfusManaged = true end",
        "local _0xTemp = debug and debug.info or getfenv",
        "if (5 + 2 == 10) then while true do end end",
        "local _env = getfenv and getfenv() or _G",
        "for i=1, math.random(2, 5) do local x = i * 2 end"
    ];
    return segments[Math.floor(Math.random() * segments.length)];
}

function pobfusStart() {
    const input = document.getElementById('inputCode').value;
    if (!input) return alert("Please input your Lua script!");

    // 1. Convert Lua String to Encrypted Bytecode Table
    const key = Math.floor(Math.random() * 255) + 1;
    const bytes = input.split('').map(char => char.charCodeAt(0) ^ key);

    // 2. Build the VM (The Interpreter)
    // We use getfenv to hide the execution environment
    const output = `--[[
${POBFUS_LOGO}
    [ VERSION: 0.7 BETA ]
    [ PROTECTION: VM + X-TABLE ]
--]]

local _0xData = {${bytes.join(",")}}
local _0xKey = ${key}
local _0xBuffer = ""
${generateJunk()}

local _0xVM = function()
    local _0xEnvCheck = getfenv and getfenv() or _G
    ${generateJunk()}
    for i=1, #_0xData do
        _0xBuffer = _0xBuffer .. string.char(_0xData[i] ~ _0xKey)
        if i % 20 == 0 then
            ${generateJunk()}
        end
    end
    ${generateJunk()}
    local _0xLoad = loadstring or load
    return _0xLoad
