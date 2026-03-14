/**
 * POBFUS ENGINE - v1.13.100
 * Signature: 110\011 | FAMILY ERROR PROTOCOL
 */

const _0x110 = [
    '\x74\x65\x78\x74\x43\x6f\x6e\x74\x65\x6e\x74', 
    '\x67\x65\x74\x45\x6c\x65\x6d\x65\x6e\x74\x42\x79\x49\x64',
    '\x73\x74\x65\x76\x65\x2d\x6c\x6f\x67\x73',
    '\x69\x6e\x70\x75\x74',
    '\x65\x72\x72\x2d\x62\x61\x72'
];

let _0xIdleTimer;
let _0xIsDinnerActive = false;
const _0xDinnerThreshold = (Math.random() * (210000 - 120000) + 120000);

const _011 = {
    _getTime: function() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour12: false }) + '.' + now.getMilliseconds().toString().padStart(3, '0');
    },

    print: function(msg, color = "#fff") {
        const _log = document[_0x110[1]](_0x110[2]);
        if (_log) {
            const div = document.createElement('div');
            div.style.color = color;
            div.innerHTML = `<span style="color:#888">${this._getTime()}</span> -- ${msg}`;
            _log.appendChild(div);
            _log.scrollTop = _log.scrollHeight;
        }
    },

    _boot: function() {
        const _icon = document[_0x110[1]]('lua-logo-main');
        if (_icon) _icon.src = "https://img.icons8.com/?size=128&id=42bqS7y7Ga9o&format=png";
        
        this.print("POBFUS v1.13.100 initialized.", "#39ff14");
        this.print("Ready for flight. Systems clear.");
        this._resetIdle();
    },

    _resetIdle: function() {
        clearTimeout(_0xIdleTimer);
        _0xIsDinnerActive = false;
        _0xIdleTimer = setTimeout(() => this._startDinner(), _0xDinnerThreshold);
    },

    /**
     * FAMILY ERROR LOGS: Mentioned only when things break
     */
    _triggerFamilyError: function(type) {
        const _errBar = document[_0x110[1]](_0x110[4]);
        _errBar.style.display = 'block';
        setTimeout(() => { _errBar.style.display = 'none'; }, 4000);

        if (type === "EMPTY") {
            this.print("CRITICAL: [Anti-Tamper Mary] STOP. You are trying to obfuscate air. Input code!", "#ff3131");
            this.print("[Skiddy Steve]: Seriously? I can't fly a plane with no passengers.", "#ff3131");
            this.print("[Minify Dave]: (Baby Crying) - Bu-bu-buffer empty!", "#ff00ff");
        } else {
            this.print("CRITICAL: [Hexadecimal Jim] 0xERROR. The export path is corrupted.", "#ff3131");
            this.print("[Sly Sarah]: I tried to spoof the failure, but it's too messy.", "#ff3131");
            this.print("[Buffer Bob]: The... mashed... junk... is... spilling... everywhere...", "#ff3131");
        }
    },

    _startDinner: function() {
        _0xIsDinnerActive = true;
        const chats = [
            ["Anti-Tamper Mary", "It's quiet. v0.8's brother anniversary dinner is served."],
            ["Hexadecimal Jim", "Pass the 0x43\x6f\x6e\x74\x72\x6f\x6c\x20\x46\x6c\x6f\x77 Wine. To the pilots v0.7 and 1.0."],
            ["Skiddy Steve", "Mashed Junk Injection-tatoes are the best, Mom."],
            ["Sly Sarah", "I'm checking on v1.12.05's charity while I eat."],
            ["Buffer Bob", "Minify Dave... is... eating... his... Anti-Tamper Cheese... fast..."],
            ["Minify Dave", "Goo-goo! (50-day anniversary noises)"],
            ["Anti-Tamper Mary", "Remember 1.12.06 in the ICU tonight. Eat up, family."]
        ];
        
        this.print("--- IDLE MODE: FAMILY DINNER IN SESSION ---", "#00aaff");
        let i = 0;
        const interval = setInterval(() => {
            if (!_0xIsDinnerActive) { clearInterval(interval); return; }
            if (i < chats.length) {
                this.print(`[${chats[i][0]}]: ${chats[i][1]}`, "#e0e0e0");
                i++;
            } else { clearInterval(interval); }
        }, 4500);
    },

    _dl: function() {
        const _in = document[_0x110[1]](_0x110[3]);
        const _val = _in ? _in.value : '';

        // If empty, trigger the Family Error Logs
        if (!_val || _val.trim().length === 0) {
            this._triggerFamilyError("EMPTY");
            return;
        }

        _0xIsDinnerActive = false;
        
        try {
            const _fname = `pobfus-${Math.random().toString(36).substring(2, 15).toUpperCase()}.lua.txt`;
            const _blob = new Blob(["-- POBFUS PROTECTED --\n" + _val], { 'type': 'text/plain' });
            const _url = window.URL.createObjectURL(_blob);
            const _link = document.createElement('a');
            _link.href = _url;
            _link.download = _fname;
            _link.click();

            this.print(`AutoSave:Download Finished [${_fname}]`, "#00aaff");
        } catch (e) {
            this._triggerFamilyError("CRASH");
        }
        this._resetIdle();
    }
};

window.onload = () => _011._boot();
document.addEventListener('mousemove', () => _011._resetIdle());
document.addEventListener('keydown', () => _011._resetIdle());
