---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 6 · Wireless Hacking

<span class="kc-badge">🧭 Kill chain · Recon → Scanning → Gaining Access (wireless)</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1040/" class="attck-tag" target="_blank">T1040 Network Sniffing</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 Adversary-in-the-Middle</a> <a href="https://attack.mitre.org/techniques/T1110/" class="attck-tag" target="_blank">T1110 Brute Force</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- **Recon & scanning wireless** — the players, beacons, monitor mode, and the deauth trick
- **Gaining access** — cracking WEP, WPA2, and why WPA3 changes the game
- **Bluetooth** — how it connects (no access point) and how each attack exploits a step

</div>

The same playbook as the rest of the course — **recon, then scanning, then gaining access** — just aimed at a radio instead of a wire. Because Wi-Fi broadcasts through the air, an attacker in range needs **no physical access**: just an adapter that can *listen*.

## 1 · The players

<div class="cards" markdown="1">

<div class="card" markdown="1">

### 📻 Station & access point

The **station** is the client — your laptop or phone. The **access point (AP)** is the radio it talks to. The signal between them *is* the Wi-Fi network — radio, not a cable.

</div>

<div class="card" markdown="1">

### 🏷️ SSID vs BSSID

The **SSID** is the network *name* you pick ("CompanyWiFi") — and it can repeat. The **BSSID** is the AP's *MAC address* — unique to that one radio. **One SSID, many BSSIDs.**

</div>

<div class="card" markdown="1">

### 🔀 AP ≠ router

An access point is *just the radio bridge*. The box at home is an AP **plus** a router, switch, and firewall in one. Offices wire up *many* standalone APs, all advertising the same SSID.

</div>

</div>

## 2 · Finding networks is just listening

Every AP is **constantly announcing itself** — a **beacon** about ten times a second that carries the network name, the channel, and, crucially, the **security type** (WEP / WPA2 / WPA3). So finding a network isn't hacking; it's tuning in.

<div class="role-red" markdown="1">

**Recon = pure listening.** Put the card in **monitor mode** (the Wi-Fi version of promiscuous mode) and you transmit *nothing* — you're invisible. You pick up the **beacons** from every AP (this is the `airodump-ng` table: BSSID, channel, encryption, name) *and* the **probe requests** clients leak — phones constantly calling out "is *HomeWiFi* here?" Both are recon.

**Scanning = go active.** Now you transmit: send **probe requests** or **deauths** to flush out hidden SSIDs and force devices to reveal themselves, and read from the captured frames **which clients are on which AP** — your target map.

</div>

The one detail that matters for capturing traffic: an AP talks on **one channel at a time**, like a radio station, so your card has to be tuned to that channel.

??? note "📡 The 802.11 standards & bands — click to expand"

    | Standard | Wi-Fi name | Band(s) |
    |---|---|---|
    | 802.11b / g | — | 2.4 GHz |
    | 802.11n | Wi-Fi 4 | 2.4 + 5 GHz |
    | 802.11ac | Wi-Fi 5 | 5 GHz |
    | 802.11ax | Wi-Fi 6 / 6E | 2.4 / 5 / **6** GHz |

    **2.4 GHz** reaches farther and through walls, but it's slow and crowded. **5 / 6 GHz** are faster with more channels ("lanes"), but shorter range. Higher frequency → less reach, more bandwidth.

## 3 · The deauth trick → capturing the handshake

WPA2's **management frames aren't protected**, so *anyone can forge a deauthentication frame.* That's the hinge between scanning and the attack: force a device to reconnect, and you capture the fresh handshake you need to crack.

<svg viewBox="0 0 720 250" role="img" aria-label="Deauth sequence: the attacker forges a deauth pretending to be the AP; the client is kicked off and automatically reconnects; the fresh four-way handshake is captured by the attacker in monitor mode." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:660px;height:auto;display:block;margin:14px auto;font-family:system-ui,sans-serif;font-size:12.5px;">
  <g stroke="currentColor" stroke-opacity="0.28" stroke-dasharray="4 4"><line x1="95" y1="52" x2="95" y2="238"/><line x1="360" y1="52" x2="360" y2="238"/><line x1="625" y1="52" x2="625" y2="238"/></g>
  <rect x="35" y="24" width="120" height="30" rx="7" fill="#c0392b"/><text x="95" y="43" text-anchor="middle" fill="#fff" font-weight="700">Attacker</text>
  <rect x="305" y="24" width="110" height="30" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.5"/><text x="360" y="43" text-anchor="middle" fill="currentColor" font-weight="700">Client</text>
  <rect x="565" y="24" width="120" height="30" rx="7" fill="#0e6b82"/><text x="625" y="43" text-anchor="middle" fill="#fff" font-weight="700">Access Point</text>
  <line x1="95" y1="86" x2="352" y2="86" stroke="#c0392b" stroke-width="2" marker-end="url(#ah)"/>
  <text x="100" y="79" fill="#c0392b" font-weight="700">① forged deauth — "you're disconnected" (spoofing the AP)</text>
  <text x="360" y="118" text-anchor="middle" fill="currentColor" font-style="italic">② client drops the connection</text>
  <line x1="368" y1="150" x2="623" y2="150" stroke="currentColor" stroke-width="2" marker-end="url(#ag)"/>
  <text x="372" y="143" fill="currentColor" font-weight="700">③ auto-reconnect → 4-way handshake</text>
  <line x1="500" y1="196" x2="100" y2="196" stroke="#B45309" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#am)"/>
  <text x="150" y="220" fill="#B45309" font-weight="700">④ handshake captured in monitor mode → crack it offline</text>
  <defs>
    <marker id="ah" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c0392b"/></marker>
    <marker id="ag" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="currentColor"/></marker>
    <marker id="am" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#B45309"/></marker>
  </defs>
</svg>

## 4 · Gaining access — cracking the key

What you read off the beacon — the **encryption type** — tells you which attack applies. Click each to expand.

??? danger "💥 WEP — broken by design"

    WEP's short **initialization vector (IV)** is sent in the clear and the key is derived from it too simply, so **every packet leaks a little key material.** Capture enough traffic and the key falls in minutes — *you extract it, you don't guess it* — no matter how long the password is. WEP should never appear in production, but it lingers on legacy gear.

??? note "🤝 WPA2 — capture, then crack offline"

    You **can't** brute-force WPA2 over the air. Instead you capture the **4-way handshake** (a deauth forces a fresh one), then run an **offline** dictionary/brute-force attack against it. The password is never sent, and the key can't be pulled from ciphertext like WEP — so **passphrase strength is the only thing protecting it.** A weak passphrase falls; a long random one holds.

??? success "🛡️ WPA3 — record-now-crack-later is dead"

    WPA3's **SAE** handshake makes a recorded capture **useless** for guessing. To test a password an attacker must try it **live** against the real AP, one at a time — slow and detectable. Offline cracking is off the table. WPA3 also protects management frames, which blocks the deauth trick.

??? info "🪪 Enterprise — certificates instead of a shared password"

    A shared Wi-Fi password is a liability (people who leave still know it). Enterprise Wi-Fi (**802.1X**) has the AP prove its identity with a **certificate** the client verifies — the same idea as an HTTPS web server — so there's no shared secret to leak.

**The attacker's toolkit** — the aircrack-ng workflow. Click a step:

<div class="recon-strip" markdown="1">

<div id="recon-node-1" class="recon-phase" onclick="reconShow(1)" role="button" tabindex="0" style="background:#0E6B82" markdown="1">

<span class="num">STEP 1</span>airmon-ng<small>monitor mode</small>

</div>

<div id="recon-node-2" class="recon-phase" onclick="reconShow(2)" role="button" tabindex="0" style="background:#157f8f" markdown="1">

<span class="num">STEP 2</span>airodump-ng<small>capture</small>

</div>

<div id="recon-node-3" class="recon-phase" onclick="reconShow(3)" role="button" tabindex="0" style="background:#1f8a99" markdown="1">

<span class="num">STEP 3</span>aireplay-ng<small>deauth</small>

</div>

<div id="recon-node-4" class="recon-phase" onclick="reconShow(4)" role="button" tabindex="0" style="background:#2a95a3" markdown="1">

<span class="num">STEP 4</span>aircrack-ng<small>crack</small>

</div>

</div>

<div id="recon-panel-1" class="recon-panel active" markdown="1">

**`airmon-ng` — monitor mode.** Put the wireless card into monitor mode so it captures *all* nearby 802.11 frames, not just its own traffic.

</div>

<div id="recon-panel-2" class="recon-panel" markdown="1">

**`airodump-ng` — capture.** Listen on the target's channel, list every AP and client, and record the frames — including any handshake that occurs.

</div>

<div id="recon-panel-3" class="recon-panel" markdown="1">

**`aireplay-ng` — deauth.** Forge a deauthentication frame to knock a client off, forcing it to reconnect so a **fresh handshake** is captured.

</div>

<div id="recon-panel-4" class="recon-panel" markdown="1">

**`aircrack-ng` — crack.** Run the captured handshake against a wordlist offline. WEP falls from the traffic itself; WPA2 falls only if the passphrase is weak.

</div>

## 5 · Bluetooth — the other wireless

<div class="cards" markdown="1">

<div class="card" markdown="1">

### 🎧 Bluetooth Classic (BR/EDR)

Continuous streams, more power — audio, headsets, keyboards, file transfer. The original Bluetooth (versions 1–3).

</div>

<div class="card" markdown="1">

### ⌚ Bluetooth Low Energy (BLE)

Tiny bursts, months on a coin cell — wearables, medical devices, IoT sensors, trackers, car keys. Added in Bluetooth 4.0, and **where the attack surface is.**

</div>

</div>

Both live on **2.4 GHz** and dodge interference by **frequency hopping** across many narrow channels many times a second. Each device has a **BD_ADDR** — its hardware address, the Bluetooth version of a MAC.

The big structural difference from Wi-Fi: **there's no access point.** Wi-Fi is hub-and-spoke through an AP; Bluetooth is devices **pairing directly** in a *piconet*.

<svg viewBox="0 0 720 240" role="img" aria-label="Left: Wi-Fi, several clients connect up through one central access point. Right: Bluetooth piconet, a phone links directly to earbuds, watch, and speaker with no access point." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:660px;height:auto;display:block;margin:14px auto;font-family:system-ui,sans-serif;font-size:12px;">
  <line x1="360" y1="18" x2="360" y2="222" stroke="currentColor" stroke-opacity="0.18"/>
  <text x="175" y="30" text-anchor="middle" fill="currentColor" font-weight="700" font-size="13">Wi-Fi — through an access point</text>
  <g stroke="currentColor" stroke-opacity="0.4"><line x1="175" y1="78" x2="80" y2="150"/><line x1="175" y1="78" x2="175" y2="150"/><line x1="175" y1="78" x2="270" y2="150"/></g>
  <rect x="128" y="52" width="94" height="30" rx="7" fill="#0e6b82"/><text x="175" y="71" text-anchor="middle" fill="#fff" font-weight="700">Access Point</text>
  <g fill="none" stroke="currentColor" stroke-opacity="0.5"><rect x="40" y="150" width="80" height="26" rx="6"/><rect x="135" y="150" width="80" height="26" rx="6"/><rect x="230" y="150" width="80" height="26" rx="6"/></g>
  <g fill="currentColor" text-anchor="middle"><text x="80" y="167">Laptop</text><text x="175" y="167">Phone</text><text x="270" y="167">Tablet</text></g>
  <text x="175" y="205" text-anchor="middle" fill="currentColor" fill-opacity="0.7">everyone joins one network the AP advertises</text>
  <text x="545" y="30" text-anchor="middle" fill="currentColor" font-weight="700" font-size="13">Bluetooth — a piconet (no AP)</text>
  <g stroke="#0e6b82" stroke-width="1.5"><line x1="545" y1="120" x2="455" y2="70"/><line x1="545" y1="120" x2="635" y2="70"/><line x1="545" y1="120" x2="545" y2="185"/></g>
  <g fill="none" stroke="currentColor" stroke-opacity="0.5"><rect x="410" y="55" width="90" height="26" rx="6"/><rect x="590" y="55" width="90" height="26" rx="6"/><rect x="500" y="185" width="90" height="26" rx="6"/></g>
  <g fill="currentColor" text-anchor="middle"><text x="455" y="72">Earbuds</text><text x="635" y="72">Watch</text><text x="545" y="202">Speaker</text></g>
  <rect x="487" y="104" width="116" height="32" rx="7" fill="#3949ab"/><text x="545" y="124" text-anchor="middle" fill="#fff" font-weight="700">Phone · central</text>
</svg>

Every link is built in three steps — and each step is where an attack lives. Click through:

<div class="scan-strip" markdown="1">

<div id="scan-node-1" class="scan-phase" onclick="scanShow(1)" role="button" tabindex="0" style="background:#0E6B82" markdown="1">

<span class="num">STEP 1</span>Discover<small>advertise & scan</small>

</div>

<div id="scan-node-2" class="scan-phase" onclick="scanShow(2)" role="button" tabindex="0" style="background:#157f8f" markdown="1">

<span class="num">STEP 2</span>Pair<small>agree keys & trust</small>

</div>

<div id="scan-node-3" class="scan-phase" onclick="scanShow(3)" role="button" tabindex="0" style="background:#1f8a99" markdown="1">

<span class="num">STEP 3</span>Connect<small>bonded, hopping</small>

</div>

</div>

<div id="scan-panel-1" class="scan-panel active" markdown="1">

**Discover.** A device in discoverable mode advertises its **BD_ADDR, name, and services**; the other scans and hears it — the same "just listen" idea as a Wi-Fi beacon.

</div>

<div id="scan-panel-2" class="scan-panel" markdown="1">

**Pair.** The two agree on keys and establish trust. How depends on each device's screen/keypad: **"Just Works"** (no confirmation), **passkey entry** (one shows a code, you type it on the other), or **numeric comparison** (both show the same number, you confirm it matches).

</div>

<div id="scan-panel-3" class="scan-panel" markdown="1">

**Connect.** Now bonded, the two exchange data, frequency-hopping across channels the whole time.

</div>

**The attacks — one per step.** Click each to expand.

??? danger "📣 Discovery & services — the \"blue-\" family"

    They climb in severity: **bluejacking** pushes an unsolicited message (annoyance) → **bluesnarfing** pulls data such as contacts off the device → **bluebugging** takes full control (place calls, plant a backdoor). All three reach a *discoverable* device exposing services with weak access control. **Defense:** turn off discoverability; unpair devices you don't recognize.

??? danger "🔑 Pairing & keys — Just Works & KNOB"

    **"Just Works"** has no code to confirm the peer, so a **man-in-the-middle** can slip into the pairing. **KNOB (2019)** attacks the key *negotiation* — forcing the encryption key down to as little as **one byte**, then brute-forcing it — even when a code was used. **Defense:** numeric-comparison pairing / LE Secure Connections.

??? danger "🧬 The stack itself — BlueBorne"

    **BlueBorne (2017)** skipped discovery and pairing entirely — it hit the Bluetooth **stack** directly (which runs at high privilege and is always listening) for **remote code execution or MITM**, just by being in range. **Defense:** patch the Bluetooth stack.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Handshake capture is passive and nearly invisible. What *is* detectable is the **deauthentication flood** used to force a re-handshake, and **rogue / evil-twin access points** broadcasting your SSID — both caught by a **Wireless IDS (WIDS)** watching for unexpected BSSIDs and deauth storms.

**Best controls:** **WPA3** (or WPA2 with a long, random passphrase), **enterprise 802.1X** instead of a shared key, and WIDS for rogue-AP detection. For guest Wi-Fi, isolate it from the corporate network entirely. For Bluetooth: disable discoverability, prefer **LE Secure Connections**, and **patch the stack**.

</div>

<div class="admonition note" markdown="1">

Real-world context

The 2000s **TJX / T.J. Maxx** breach — 45 million+ cards — traced back to attackers cracking **WEP** in a store parking lot and pivoting into the corporate network. It's the canonical case for why weak wireless is a *full-network* risk, not just a "Wi-Fi problem."

</div>

## References

- **Aircrack-ng documentation & tutorials** — the WEP/WPA cracking toolset (`airmon-ng` · `airodump-ng` · `aireplay-ng` · `aircrack-ng`). [aircrack-ng.org/documentation](https://www.aircrack-ng.org/documentation.html)
- **Wireshark User's Guide** — capturing and reading 802.11 beacons, probe requests, and management frames. [wireshark.org/docs](https://www.wireshark.org/docs/wsug_html_chunked/)
- **MITRE ATT&CK** — Network Sniffing (T1040) · Adversary-in-the-Middle (T1557) · Brute Force (T1110). [T1040](https://attack.mitre.org/techniques/T1040/) · [T1557](https://attack.mitre.org/techniques/T1557/) · [T1110](https://attack.mitre.org/techniques/T1110/)
- **Wi-Fi Alliance — Wi-Fi security & WPA3.** [wi-fi.org/discover-wi-fi/security](https://www.wi-fi.org/discover-wi-fi/security)
