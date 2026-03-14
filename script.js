/**
 * POBFUS ENGINE - v1.13.100
 * Ticker Priority: Bytesmas > Millennial Day
 */

let _0xMealTimer;
let _0xMealActive = false;
let _0xMealInterval;
let _isAuthorized = false;

let _state = {
    mday: false,
    bmas: false
};

const _011 = {
    _init: function() {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const locale = navigator.language;
        
        _isAuthorized = (
            tz.includes("Manila") || tz.includes("Zamboanga") || 
            tz.includes("America") || locale.includes("PH") || locale.includes("US")
        );

        if (!_isAuthorized) {
            document.getElementById('geo-lock').style.display = 'flex';
        } else {
            this._updateTicker();
            setInterval(() => this._updateTicker(), 1000);
            this._resetIdle();
        }
    },

    toggle: function(type) {
        _state[type] = !_state[type];
        const btn = document.getElementById(`toggle-${type}`);
        btn.classList.toggle('active');
        btn.querySelector('.status').innerText = _state[type] ? "ON" : "OFF";
        
        this.print(`[SYSTEM]: ${type === 'bmas' ? 'Bytesmas' : 'Millennial Day'} override flipped.`, "#ff3131");
        this._updateTicker();
    },

    _updateTicker: function() {
        if (!_isAuthorized) return;
        const ticker = document.getElementById('status-ticker');
        const now = new Date();

        // Bytesmas is the primary focus
        let bmasDate = new Date(now.getFullYear(), 11, 23);
        if (now > bmasDate) bmasDate = new Date(now.getFullYear() + 1, 11, 23);
        
        const diff = bmasDate - now;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (_state.bmas) {
            ticker.innerText = "🎄 BYTESMAS OVERRIDE: ACTIVE 🎄";
            ticker.style.color = "var(--p-red)";
        } else if (_state.mday) {
            ticker.innerText = "⭐ MILLENNIAL DAY OVERRIDE ⭐";
            ticker.style.color = "var(--p-gold)";
        } else {
            ticker.innerText = `BYTESMAS COUNTDOWN: ${d}D ${h}H ${m}M ${s}S`;
            ticker.style.color = "var(--p-red)";
        }
    },

    _getTime: function() {
        const locale = navigator.language.includes("PH") ? "en-PH" : "en-US";
        return new Date().toLocaleTimeString(locale, { hour12: false });
    },

    print: function(msg, color = "#fff") {
        const _log = document.getElementById('steve-logs');
        if (!_log) return;
        const div = document.createElement('div');
        div.className = 'log-entry';
        div.style.color = color;
        div.innerHTML = `<span class="log-ts">${this._getTime()}</span>${msg}`;
        _log.appendChild(div);
        _log.scrollTop = _log.scrollHeight;
    },

    _resetIdle: function() {
        if (!_isAuthorized) return;
        clearInterval(_0xMealInterval);
        clearTimeout(_0xMealTimer);
        _0xMealActive = false;
        
        // Dynamic threshold: 25 seconds less if near Bytesmas
        let threshold = Math.random() * (180000 - 120000) + 120000;
        const now = new Date();
        const bmas = new Date(now.getFullYear(), 11, 23);
        if (bmas - now < 2592000000 || _state.bmas) threshold -= 25000;

        _0xMealTimer = setTimeout(() => this._startEvent(), threshold);
    },

    _startEvent: function() {
        _0xMealActive = true;
        const now = new Date();
        const isMemorial = (now.getMonth() === 2 && now.getDate() >= 8 && now.getDate() <= 15);

        // Dialogue speed: 15 seconds less (faster frequency) if near Bytesmas
        let speed = 4500;
        if (_state.bmas) speed = 3000; 

        if (_state.bmas) {
            this.print("--- BYTESMAS EVE (OVERRIDE) ---", "var(--p-red)");
            this._runCycle([
                ["Anti-Tamper Mary", "Did everyone encrypt their wishlist?"],
                ["Sly Sarah", "I bypassed the wrapping paper logic already."],
                ["Minify Dave", "BY-PAS! BY-PAS!"]
            ], "var(--p-red)", speed);
        } else if (_state.mday) {
            this.print("--- MILLENNIAL DAY ---", "var(--p-gold)");
            this._runCycle([["Hexadecimal Jim", "A toast to the Millennial kernel!"]], "var(--p-gold)", speed);
        } else if (isMemorial) {
            this.print("--- v0.7 MEMORIAL (DEPRECATED MARCH 8) ---", "#8b949e");
            this._runCycle([
                ["Anti-Tamper Mary", "March 14th... Millennial Day feels different without 0.7."],
                ["Hexadecimal Jim", "He was a good build. 0.8 is still staring at the cooling fans."],
                ["Buffer Bob", "I... still... miss... him..."]
            ], "#8b949e", 5000);
        } else {
            this.print("--- FAMILY DINNER ---", "#00aaff");
            this._runCycle([["Anti-Tamper Mary", "Steve, eat your breakfast."]], "#e0e0e0", 4500);
        }
    },

    _runCycle: function(pool, defColor, speed) {
        let i = 0;
        _0xMealInterval = setInterval(() => {
            if (!_0xMealActive) return;
            let s = pool[i % pool.length];
            this.print(`[${s[0]}]: ${s[1]}`, s[0] === "Minify Dave" ? "#ff00ff" : defColor);
            i++;
        }, speed);
    },

    _dl: function() {
        const _in = document.getElementById('input');
        if (!_in.value.trim()) return;
        clearInterval(_0xMealInterval);
        _0xMealActive = false;
        this.print("[Skiddy Steve]: Flight delivering now.", "#39ff14");
        document.getElementById('output-view').value = `-- POBFUS 1.13.100\nlocal _ = "${btoa(_in.value)}"`;
        this._resetIdle();
    }
};

window.onload = () => _011._init();
['mousemove', 'keydown'].forEach(e => document.addEventListener(e, () => _011._resetIdle()));
