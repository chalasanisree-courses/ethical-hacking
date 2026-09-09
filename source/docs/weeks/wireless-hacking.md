---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 5 · Wireless Hacking

<span class="kc-badge">🧭 Kill chain · Phase 3 — Gaining Access (wireless)</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1040/" class="attck-tag" target="_blank">T1040 Network Sniffing</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 Adversary-in-the-Middle</a> <a href="https://attack.mitre.org/techniques/T1110/" class="attck-tag" target="_blank">T1110 Brute Force</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- Wi-Fi security: WEP, WPA / WPA2 / WPA3
- Capturing a handshake and cracking the key
- Rogue access points and the Bluetooth attack surface

</div>

## 1. Wireless architecture

Wi-Fi broadcasts through the air, so an attacker within range needs **no physical network access** — just an adapter in monitor mode. The core concepts: SSIDs (network names), access points (APs), client association, and the **WPA 4-way handshake** that proves a client knows the passphrase without sending it.

## 2. Cracking Wi-Fi

Click each to expand.

💥 WEP — broken by design

WEP's initialization-vector reuse leaks key material with every packet. Capture enough traffic and the key falls in minutes, regardless of its length. WEP should never be seen in production — but still appears on legacy gear.

🤝 WPA / WPA2 — capture then crack offline

You can't brute-force WPA over the air. Instead you capture the 4-way handshake (optionally forcing a reconnection with a **deauthentication** attack), then run an **offline** dictionary/brute-force attack against it. Strength depends entirely on passphrase quality.

🛰️ Aircrack-ng workflow

`airmon-ng` (monitor mode) → `airodump-ng` (capture) → `aireplay-ng` (deauth) → `aircrack-ng` (crack). WPA3's SAE handshake closes the offline-cracking gap.

## 3. Rogue APs & Bluetooth

- **Evil twin / rogue AP** — stand up a look-alike SSID; clients auto-associate and route their traffic through you (a wireless man-in-the-middle).
- **Bluetooth** — bluejacking, bluesnarfing, and BLE flaws are a smaller but growing surface, especially on wearables, medical devices, and IoT.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Handshake capture is passive and nearly invisible. What *is* detectable is the **deauthentication flood** used to force a re-handshake, and **rogue / evil-twin access points** broadcasting your SSID — both caught by a **Wireless IDS (WIDS)** watching for unexpected BSSIDs and deauth storms.

**Best control:** **WPA3** (or WPA2 with a long, random passphrase), enterprise auth (802.1X) instead of a shared key, and WIDS for rogue-AP detection. For guest Wi-Fi, isolate it from the corporate network entirely.

</div>

<div class="admonition note" markdown="1">

Real-world context

The 2000s **TJX / TJ Maxx** breach — ~94M cards — traced back to attackers cracking **WEP** in a store parking lot and pivoting into the corporate network. It's the canonical case for why weak wireless is a full-network risk, not just a "Wi-Fi problem."

</div>

## References

- **Aircrack-ng documentation & tutorials.** [aircrack-ng.org/documentation](https://www.aircrack-ng.org/documentation.html)
- **MITRE ATT&CK** (adversary-in-the-middle / wireless-relevant techniques). [attack.mitre.org](https://attack.mitre.org/)
