# 🛡️ Pobfus v1.0.6 | The Monolith
### *High-Density Virtualization & Dynamic Slop Injection*

[![Version](https://img.shields.io/badge/Release-v1.0.6--Stable-238636?style=for-the-badge&logo=github)](https://github.com/tenringsofdoom1x/)
[![Status](https://img.shields.io/badge/Status-Operational-0078D4?style=for-the-badge&logo=statuspage)](https://tenringsofdoom1x.github.io/)
[![Security](https://img.shields.io/badge/Security-Hell--Mode-critical?style=for-the-badge)](https://github.com/tenringsofdoom1x/)
[![Engine](https://img.shields.io/badge/Engine-CamBuscate--0.1.1-gray?style=flat-square)](https://github.com/tenringsofdoom1x/)

> [!IMPORTANT]
> **OPERATIONS:** RESUMED (STABLE)  
> **ENGINE CORE:** v1.0.6 High-Density Hex-Table  
> **AUTHOR:** tenringsofdoom1x

**Pobfus** is a standalone, client-side Lua obfuscator built to eliminate API dependencies. It utilizes a **Brick Wall** methodology, expanding source code by ~600% using randomized junk-bit (slop) injection while maintaining 1:1 logic execution via a localized Virtual Machine.

---

## 📊 Engine Comparison

| Feature | Standard APIs | Old-Gen Obf | **Pobfus v1.0.6** |
| :--- | :---: | :---: | :---: |
| **Logic Cleaning** | Manual | None | **Auto-Beautify (Minifier)** |
| **Variable Mapping** | Static | Variable Rename | **Dynamic Shuffling (JS-Side)** |
| **Anti-Tamper** | Simple Error | Print Warning | **Encrypted Roast + Thread Lock** |
| **Analysis Difficulty** | Low | Medium | **High (High-Density Slop)** |
| **Uptime** | Varies (API Keys) | Server Dependent | **100% (GitHub Pages)** |

---

## 🚀 Pro-Tier Features (v1.0.6)

### 1. 🧹 Integrated Beautifier
Before the code is smashed into the hex-wall, Pobfus runs a pre-processing pass that strips all comments (`--` and `--[[]]`) and collapses unnecessary whitespace. This ensures the VM only processes functional logic.

### 2. 🧬 Dynamic Variable Shuffling
The JavaScript engine generates random names for the Lua VM's local registers (`pairs`, `string.char`, `bit32.bxor`) every time the "Protect" button is clicked. No two obfuscations are identical.

### 3. 🧱 High-Density Slop
Every byte is appended with a 5-character alphanumeric "tail." The VM's dispatcher uses a localized substring filter to ignore the slop at runtime while making the source look like a solid wall of data.



---

## 🏗️ Build Your Own "Pobfus-Type" Engine

Pobfus is a framework. To customize your own version of the Monolith:
1. **Modify `randVar()`:** Change the character set in `script.js` to use special symbols or emojis for variable names.
2. **Inject Custom Roasts:** Update the `roastMsg` variable in the `run()` function to change the "Anti-Skid" message.
3. **Adjust Slop Density:** Change `.substring(2, 7)` to a higher range to make the output files even larger and more intimidating.



---

## 🛠️ Deployment
1. **Fork** the repository.
2. Ensure `index.html` and `script.js` are in the root directory.
3. Go to **Settings > Pages** and enable deployment from the `main` branch.
4. Your obfuscator is live at `https://yourname.github.io/Pobfus/`.

---

## ⚠️ Disclaimer
Pobfus is designed for educational research into code virtualization and protection. 
Created by **tenringsofdoom1x**.
