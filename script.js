(function() {
    const LOGO_TEXT = ` _______         __           ___                 \n|_   __ \\       [  |        .' ..]                \n  | |__) | .--.  | |.--.   _| |_  __   _   .--.   \n  |  ___// .'\`\\ \\| '/'\`\\ \\'-| |-'[  | | | ( (\`\\]  \n _| |_   | \\__. ||  \\__/ |  | |   | \\_/ |, \`'.'.  \n|_____|   '.__.'[__;.__.'  [___]  '.__.'_/([__) ) \n     [ Pobfus 1.11.01 | Suite Test ]`;

    // Complex Test Code: Fibonacci, Print, and Junk Aimbot Logic
    const TEST_CODE = `-- Pobfus 1.11.01 HEAVY TEST
print("Initializing CamBuscate 0.2.1 Virtualization...")

-- [1] Fibonacci Sequence Test
local function fib(n)
    local a, b = 0, 1
    for i = 1, n do
        a, b = b, a + b
    end
    return a
end
print("Fibonacci(10): " .. tostring(fib(10)))

-- [2] Junk Aimbot Logic (Visual Complexity Test)
local Settings = { Enabled = true, FOV = 150, Smoothness = 0.5 }
local function GetClosestPlayer()
    local target = nil
    local dist = Settings.FOV
    -- Fake logic to test table indexing
    for _, p in pairs(game:GetService("Players"):GetPlayers()) do
        if p.Character and p.Character:FindFirstChild("Head") then
            target = p.Character.Head
        end
    end
    return target
end

-- [3] Final Yield Test
task.spawn(function()
    while task.wait(1) do
        print("Obfuscated background thread heart-beat~")
    end
end)

warn("Pobfus 1.11.01: Suite Test Injected Successfully!")`;

    const ROASTS = [
        "your decompiler likes me~ too much...",
        "feed me to your poor decompiler senpai!!!~",
        "staring at my bytecode again? how lewd~",
        "is that a hook? how aggressive, senpai~"
    ];

    const _barcode = (l) => {
        let r = "I";
        for(let i=0; i<l; i++) r += "Il".charAt(Math.floor(Math.random() * 2));
        return r;
    };

    window.onload = () => {
        document.getElementById('logo').textContent = LOGO_TEXT;
        const iEl = document.getElementById('in'), oEl = document.getElementById('out'), sEl = document.getElementById('status');

        document.getElementById('ts').onclick = () => {
            iEl.value = TEST_CODE;
            sEl.innerText = "STATUS: HEAVY_SUITE_LOADED";
        };

        document.getElementById('go').onclick = function() {
            if (!iEl.value.trim()) return;
            sEl.innerText = "STATUS: VIRTUALIZING...";
            
            setTimeout(() => {
                try {
                    const key = Math.floor(Math.random() * 80) + 40;
                    const raw = iEl.value;
                    let stream = [];

                    for (let i = 0; i < raw.length; i++) {
                        stream.push("0x" + (raw.charCodeAt(i) ^ key).toString(16).toUpperCase());
                        // MOONSEC STYLE: Inject Roasts as table-slop
                        if (i % 5 === 0) {
                            const r = ROASTS[Math.floor(Math.random() * ROASTS.length)];
                            stream.push(`"${r}_${_barcode(3)}"`);
                        }
                    }

                    const v = { env: _barcode(12), vm: _barcode(14), out: _barcode(10), tab: _barcode(16) };

                    // BUILD THE MOONSEC BRICK
                    let res = `--[[${LOGO_TEXT}\n[!] POBFUS_1.11.01 // CAMBUSCATE_0.2.1]]\n`;
                    res += `local ${v.env}=(getfenv(0) or _G);local ${v.out}="";local ${v.tab}={${stream.join(',')}};`;
                    res += `local function ${v.vm}(d,k)for _,v in pairs(d)do if type(v)=="\110\117\109\98\101\114"then `;
                    res += `${v.out}=${v.out}..${v.env}["\115\116\114\105\110\103"]["\99\104\97\114"](${v.env}["\98\105\116\51\50"]["\98\120\111\114"](v,k))`;
                    res += `else local _="${ROASTS[1]}" end end;`;
                    res += `local x,e=(loadstring or load)(${v.out});if x then pcall(x)else warn("VM_FATAL_0.2.1")end end;${v.vm}(${v.tab},${key});`;

                    oEl.value = res;
                    sEl.innerText = "STATUS: SUCCESS_1.11.01";
                } catch (e) {
                    sEl.innerText = "STATUS: ENGINE_CRASH";
                }
            }, 50);
        };

        // Universal Copy
        document.getElementById('cp').onclick = () => {
            if (!oEl.value) return;
            navigator.clipboard.writeText(oEl.value).then(() => {
                sEl.innerText = "COPIED!";
            });
        };

        // Mobile/PC Download
        document.getElementById('dl').onclick = () => {
            if (!oEl.value) return;
            const blob = new Blob([oEl.value], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let name = "pobfus-";
            for(let i=0; i<20; i++) name += chars.charAt(Math.floor(Math.random() * chars.length));
            a.href = url;
            a.download = name + ".lua";
            a.click();
        };
    };
})();
