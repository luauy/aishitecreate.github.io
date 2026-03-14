// ELEMENTS
const input = document.getElementById('input');
const hl = document.getElementById('hl-layer');
const output = document.getElementById('output');
const steve = document.getElementById('steve-logs');
const logoImg = document.getElementById('lua-logo-main');

// BASE64 LUA LOGO (White version for clean UI)
const LUA_LOGO_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD9obvaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXBNTS8xLjAvIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXBNTS8xLjAvc1Jlc291cmNlIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0IyRUM5NTE0NjI4MTFFNzlFQ0VBMUNCNTEzQTU1NkEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0IyRUM5NTI0NjI4MTFFNzlFQ0VBMUNCNTEzQTU1NkEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQjJFQzk0RjQ2MjgxMUU3OUVDRUExQ0I1MTNBNTU2QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQjJFQzk1MDQ2MjgxMUU3OUVDRUExQ0I1MTNBNTU2QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtZk5mAAAABvUExURf///+Hh4ePj4+fn5+jo6Onp6erq6unp6erq6unp6erq6uvr6+vr6/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///9DQ0Ofn5+zs7Pf397q6uvX19czMzN3d3V3jB7gAAAAmdFJOU///////AOfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+dfqD+AAAAAgUlEQVRo3u3V2XLDIAwG4JgsCc0SskA6pPe/2UlpO206Yyb8N5uNPh0XIsR0KNo7vD83mY+9Y+vH7S0u3n8+v94+Hq7fX9/uv78+3z/uV8sS7Nre/z8S693Y+R9pI8W+C9NAsfO+6iL0fWj7LpQ6D6F3odB96PsudB4EnyU6D553ofMg+C7UeRB8F4q8C3Xfhbrvwp90oVOn0K1TqNQp9OskCn0SjT6JQZ/Eoc9h0eeR6HNJ9Pkk+p8U+n8S+k8S+icS+iUJ/ZKE/p6EfkhCPyShtyehtyehtyehtyehtyehtyehtydh80nC5pOEzScJm0/S3Xwp+vUkvXmS7uYk9c2T9DcX8Zun2DdPsm+eYt88y755mX3zNvvmfXay9/0H2u+hI45p0MIAAAAASUVORK5CYII=";

// INITIALIZE LOGO
logoImg.src = LUA_LOGO_B64;

/**
 * SYNTAX HIGHLIGHTER (Spectrum + Shiny Silver)
 */
const paint = () => {
    let code = input.value;
    code = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // Comments
    code = code.replace(/(--.*)/g, '<span style="color: #6a737d;">$1</span>');
    
    // SHINY SILVER LOCALS
    code = code.replace(/(local)\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, 
        '<span style="color: #ff7b72;">$1</span> <span style="color: #E0E0E0; text-shadow: 0 0 2px rgba(255,255,255,0.3);">$2</span>');

    // Keywords
    code = code.replace(/\b(function|if|then|else|elseif|end|return|for|while|do|in|repeat|until|break)\b/g, '<span style="color: #ff7b72;">$1</span>');
    
    // Built-ins
    code = code.replace(/\b(game|workspace|script|Instance|Enum|shared|_G|getgenv|getfenv|setfenv|loadstring)\b/g, '<span style="color: #d2a8ff;">$1</span>');
    
    // Methods
    code = code.replace(/\b(print|warn|wait|delay|spawn|pairs|ipairs|math|string|table|task)\b/g, '<span style="color: #79c0ff;">$1</span>');
    
    // Strings
    code = code.replace(/('|")(.*?)('|")/g, '<span style="color: #a5d6ff;">$1$2$3</span>');
    
    // Numbers
    code = code.replace(/\b(\d+)\b/g, '<span style="color: #ffa657;">$1</span>');
    
    // Booleans
    code = code.replace(/\b(true|false|nil)\b/g, '<span style="color: #f2cc60;">$1</span>');

    hl.innerHTML = code;
};

input.oninput = () => { paint(); hl.scrollTop = input.scrollTop; };
input.onscroll = () => { hl.scrollTop = input.scrollTop; };

/**
 * PSU / MOONSEC STYLE LOADER
 */
const obfuscate = (src) => {
    let res = src.replace(/--.*$/gm, "").trim();
    res = `setfenv(1, getgenv())\n` + res;
    res = res.replace(/\b(\d+)\b/g, (n) => `(${n-1}+1)`);
    
    const b64 = btoa(unescape(encodeURIComponent(res)));
    const reversedB64 = b64.split('').reverse().join('');

    return `--[[ Protected by Pobfus v1.13.90 Successor ]]\n` +
           `local _P = function(s) return s:reverse() end;\n` +
           `local _D = game:GetService("HttpService"):Base64Decode(_P("${reversedB64}"));\n` +
           `local _E = (function() local _L = "" for _V in pairs({108,111,97,100,115,116,114,105,110,103}) do _L = _L .. string.char(_V) end return _G[_L] or load end)();\n` +
           `_E(_D)();`;
};

/**
 * UI CONTROLS
 */
document.getElementById('pushBtn').onclick = () => {
    if(!input.value.trim()) return;
    steve.innerHTML = "Line 1 Script: Encoding virtual macro payload...";
    setTimeout(() => {
        output.innerText = obfuscate(input.value);
        steve.innerHTML = "Line 1 Script: <span style='color: Lime;'>[SUCCESS] v1.13.90 Deployed.</span>";
    }, 400);
};

document.getElementById('clrBtn').onclick = () => {
    input.value = ""; 
    output.innerText = "-- [ Successor Stream ]"; 
    hl.innerHTML = "";
    steve.innerHTML = "Line 1 Script: Purged.";
};
