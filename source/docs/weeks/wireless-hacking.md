---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 6 · Wireless Hacking

<span class="kc-badge">🧭 CEH life cycle · Recon → Scanning → Gaining Access (wireless)</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1040/" class="attck-tag" target="_blank">T1040 Network Sniffing</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 Adversary-in-the-Middle</a> <a href="https://attack.mitre.org/techniques/T1110/" class="attck-tag" target="_blank">T1110 Brute Force</a>

</div>

<div class="admonition abstract" markdown="1">

This week, in three lectures

- **Part 1 · Recon & scanning** — the players, what the AP broadcasts, listening vs. probing, and the deauth trick that captures the handshake.
- **Part 2 · Gaining access** — the two ways onto a network, why Wi-Fi leaks past the walls, and how WEP → WPA2 → WPA3 try to stop eavesdropping and the Evil Twin.
- **Part 3 · Bluetooth** — wireless with no access point, and how each attack exploits a step of the connection.

</div>

The same playbook as the rest of the course — **recon, then scanning, then gaining access** — just aimed at a radio instead of a wire. Because Wi-Fi broadcasts through the air, an attacker in range needs **no physical access**: just an adapter that can *listen*. This page follows the three lectures in order.

## Part 1 · Recon & scanning — building the map

Recon and scanning are the **first two phases** of the CEH life cycle. As with the rest of the course, the goal is to **build a map** — like the crew in *Ocean's Eleven* putting pins on a board — except the target here is the **wireless network itself**: who the access points are, which standard and security they use, and which clients are talking to them.

### The players — a station, an access point, and the signal between

First, *who is actually talking.* On one side is the **station** — the client, your laptop or phone. On the other is the **access point (AP)** — the radio the station talks to. And the **radio signal between them *is* the Wi-Fi network**: radio waves, not a cable. That's the whole cast.

<svg viewBox="0 0 720 190" role="img" aria-label="A station, the client laptop or phone, on the left connects by radio signal to an access point on the right. The signal between them is the Wi-Fi network. The network is named by its SSID; the access point is identified by its BSSID, which is its MAC address." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:640px;height:auto;display:block;margin:16px auto;font-family:system-ui,sans-serif;font-size:12px;">
  <rect x="28" y="72" width="168" height="54" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.55"/>
  <text x="112" y="96" text-anchor="middle" fill="currentColor" font-weight="700" font-size="13">Station</text>
  <text x="112" y="114" text-anchor="middle" fill="currentColor" fill-opacity="0.7">the client — laptop / phone</text>
  <rect x="524" y="72" width="168" height="54" rx="8" fill="#0e6b82"/>
  <text x="608" y="96" text-anchor="middle" fill="#ffffff" font-weight="700" font-size="13">Access Point</text>
  <text x="608" y="114" text-anchor="middle" fill="#cfe6ec">BSSID = its MAC address</text>
  <line x1="196" y1="99" x2="524" y2="99" stroke="currentColor" stroke-width="2" stroke-dasharray="6 5"/>
  <g fill="none" stroke="#076D83" stroke-width="2.4" stroke-linecap="round">
    <path d="M344 95 a24 24 0 0 1 32 0"/>
    <path d="M335 87 a37 37 0 0 1 50 0"/>
  </g>
  <circle cx="360" cy="99" r="3.5" fill="#076D83"/>
  <text x="360" y="62" text-anchor="middle" fill="#076D83" font-weight="700">SSID — the network's name</text>
  <text x="360" y="150" text-anchor="middle" fill="currentColor" fill-opacity="0.75" font-style="italic">the signal between them is the Wi-Fi network — radio, not a cable</text>
</svg>

Those two players are each *identified* by a label — and this is where SSID and BSSID come in. The whole network goes by a **name, the SSID** ("CompanyWiFi"), and the same SSID can be broadcast by many radios at once. Each individual access point is identified by its **BSSID**, which is simply that radio's **MAC address**. So **one SSID can sit on many BSSIDs.**

One clarification, because the words get used interchangeably: an **access point is not a router.** The AP is *only the radio bridge* — the box at home bundles an AP together with a router, a switch, and a firewall. An **office** wires up many standalone APs — one or more per floor, each cabled to the corporate LAN — all advertising the *same* SSID, so you roam the building on one name. At **home**, a Wi-Fi **extender** forms a *mesh* with your router to widen coverage, with only the router actually reaching the internet.

### The standards & bands

The signal itself comes in generations — the **802.11** family — and which one an access point uses sets its speed, its range, and how many channels it has to work with.

??? note "📡 The 802.11 standards & bands — click to expand"

    | Standard | Wi-Fi name | Band(s) |
    |---|---|---|
    | 802.11b / g | — | 2.4 GHz |
    | 802.11n | Wi-Fi 4 | 2.4 + 5 GHz |
    | 802.11ac | Wi-Fi 5 | 5 GHz |
    | 802.11ax | Wi-Fi 6 / 6E | 2.4 / 5 / **6** GHz |

    Think of it like roads. **2.4 GHz** is El Camino Real — it runs *far* and through walls, but it's a slow, congested two-lane road. **5 / 6 GHz** are the freeway — more lanes (channels) and much higher speed, but they don't reach as far. Higher frequency → less range, more bandwidth.

### What the access point is doing

An AP does three things, and the first one is what makes recon so easy:

1. **Advertises itself** — it sends out a **beacon** about ten times a second, carrying the network **name**, the **channel**, and the **security type** (WEP / WPA2 / WPA3).
2. **Accepts** clients — it runs a handshake, agrees on security, and lets the client join.
3. **Relays** data — once you're on, it shuttles your traffic to and from the internet.

Because the beacon is a constant public broadcast, **finding a network isn't hacking — it's tuning in**, like turning a car radio to a station.

<div class="role-red" markdown="1">

**Recon = pure listening.** Put the card in **monitor mode** (the Wi-Fi version of promiscuous mode) and you transmit *nothing* — you're invisible. You pick up the **beacons** from every AP (this is the `airodump-ng` table: BSSID, channel, encryption, name) *and* the **probe requests** clients leak — phones constantly calling out "is *HomeWiFi* here?" Both are recon.

**Scanning = go active.** Now you transmit: send **probe requests** or **deauths** to flush out hidden SSIDs and force devices to reveal themselves, and read from the captured frames **which clients are on which AP** — your target map.

</div>

The one detail that matters for capturing traffic: an AP talks on **one channel at a time**, like a radio station, so your card has to be tuned to that channel.

### The deauth trick → capturing the handshake

Here's the hinge from recon into the actual attack. When a client first joins an AP, the two run a **handshake** that carries the secrets you'd want to crack — but if you walked into the coffee shop late, you *missed it*. WPA2's **management frames aren't protected**, so anyone can **forge a deauthentication frame** that looks like it came from the AP. Knock the client off, it reconnects automatically, and you capture a **fresh handshake** — which you take away and crack in Part 2.

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

## Part 2 · Gaining access — cracking the door

Gaining access is **Phase 3** — breaching the network's outer wall. There are two ways in: the **quiet way**, where you steal a credential and then just *log in like an employee* (last week's sniffing was the quiet way), and the **loud way**, where you force through firewalls and intrusion-detection systems. Cracking Wi-Fi is about getting onto the network in the first place — and Wi-Fi makes the quiet way dangerously easy.

### Why Wi-Fi is different — the parking-lot problem

On a wired network, an attacker has to physically **plug in**. Wi-Fi radiates *past the walls*, so an attacker can sit in the **parking lot** and work with nothing but an antenna. From there, two moves are possible:

<div class="cards" markdown="1">

<div class="card" markdown="1">

### 👂 Eavesdrop

Just **listen** to the traffic in the air. If it isn't encrypted, the attacker reads your data directly — passwords, messages, whatever crosses the link.

</div>

<div class="card" markdown="1">

### 👯 Evil Twin

Stand up a **fake AP** broadcasting the *same SSID* as the real one. Victims connect to the stronger signal — the attacker's — who now sits **in the middle** and reads or alters everything.

</div>

</div>

<svg viewBox="0 0 720 210" role="img" aria-label="Evil Twin: the victim device connects to the attacker's fake access point, which uses the same SSID as the real access point. The attacker relays traffic to the real AP and sits in the middle, reading and altering everything." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:640px;height:auto;display:block;margin:14px auto;font-family:system-ui,sans-serif;font-size:12px;">
  <rect x="24" y="82" width="128" height="38" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.55"/><text x="88" y="105" text-anchor="middle" fill="currentColor" font-weight="700">Victim device</text>
  <rect x="278" y="14" width="176" height="42" rx="8" fill="#c0392b"/><text x="366" y="32" text-anchor="middle" fill="#fff" font-weight="700">Evil Twin AP</text><text x="366" y="47" text-anchor="middle" fill="#f6d9d5" font-size="10.5">SSID: "CompanyWiFi"</text>
  <rect x="566" y="82" width="130" height="38" rx="7" fill="#0e6b82"/><text x="631" y="100" text-anchor="middle" fill="#fff" font-weight="700">Real AP</text><text x="631" y="114" text-anchor="middle" fill="#cfe6ec" font-size="10.5">SSID: "CompanyWiFi"</text>
  <line x1="150" y1="92" x2="286" y2="54" stroke="#c0392b" stroke-width="2" marker-end="url(#et1)"/>
  <line x1="452" y1="54" x2="576" y2="90" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#et2)"/>
  <text x="366" y="86" text-anchor="middle" fill="#c0392b" font-weight="700">③ sits in the middle — reads & alters everything</text>
  <text x="60" y="164" fill="#c0392b" font-weight="700">① victim joins the strongest "CompanyWiFi"</text>
  <text x="452" y="164" fill="currentColor" font-weight="700">② attacker relays it to the real AP</text>
  <defs>
    <marker id="et1" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#c0392b"/></marker>
    <marker id="et2" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="currentColor"/></marker>
  </defs>
</svg>

### So Wi-Fi security needs two things

Every Wi-Fi standard is really an attempt to deliver **two controls** — and to let the client be sure it's talking to the *real* AP, not an Evil Twin.

<div class="role-blue" markdown="1">

**Access control.** Only authorized devices should be able to join — you have to **prove you know the network's password** before you're let on.

**Confidentiality.** Traffic is **encrypted**, so an eavesdropper in the parking lot captures **ciphertext**, not your data.

</div>

Both come out of the join itself. When a client connects, the handshake is designed so that each side **proves it knows the password without ever sending it**, and then both derive a fresh **session key** seeded from that password. That is exactly the handshake the deauth trick captures — which is why capturing it is worth the trouble.

### The standards, as an arms race

What you read off the beacon — the **security type** — tells you which world you're in. Each generation was built to close the gap the last one left. Click each to expand.

??? danger "💥 WEP — both controls fail"

    WEP loses on *both* fronts. Its short **24-bit initialization vector (IV)** is sent in the clear and reused, and a weakness in **RC4's key scheduling** turns those repeats into leaked key bytes — so **every packet gives up a little key material** and the key falls in minutes (*you extract it, you don't guess it*, no matter how long the password is). That breaks **confidentiality**. And WEP never checks that the AP is the *real* one — so an **Evil Twin** slides right in. It should never appear in production, but it lingers on legacy gear.

??? note "🤝 WPA2 — the fix (with one gap left)"

    WPA2 delivers both controls. The **4-way handshake** has each side prove it knows the password using random **nonces** — a man-in-the-middle who doesn't know the password *can't* complete it, which blocks the **Evil Twin**. The keys are built by **one-way hashing** (password + network name → a password key; add the handshake nonces → a temporary **session key**), and traffic is encrypted with **AES** — so eavesdropping now yields only ciphertext.

    **The gap:** you can still **record the handshake and crack it offline**, guessing millions of common passwords (`password123`) at your leisure. The password never crosses the air and the key can't be pulled from ciphertext like WEP — so **passphrase strength is the only thing left protecting it.**

??? success "🛡️ WPA3 — closes the offline crack"

    WPA3's **SAE** handshake makes a recorded capture **useless** for guessing. To test a password an attacker must try it **live** against the real AP, one at a time — slow and detectable. Offline cracking is off the table. WPA3 also protects management frames, which blocks the deauth trick outright.

??? info "🪪 Enterprise — the AP proves who it is"

    A single shared Wi-Fi password is a liability — everyone knows it, and people who leave still do. Enterprise Wi-Fi (**802.1X**) has the **access point present a certificate** that the client verifies — the same idea as an HTTPS web server proving its identity — so clients aren't trusting a shared password, and there's no single secret that opens the whole network.

<div class="wl-scorecard" markdown="1">

| Does it stop… | WEP | WPA2 | WPA3 |
|---|:---:|:---:|:---:|
| Eavesdropping (read the traffic) | ❌ | ✅ | ✅ |
| The Evil Twin / fake AP | ❌ | ✅ | ✅ |
| Offline cracking of a captured handshake | ❌ | ⚠️ *weak passwords* | ✅ |

</div>

**The attacker's toolkit.** In practice the capture-and-crack attack runs through one well-worn toolset — the aircrack-ng suite. Click a step:

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

<div class="admonition note" markdown="1">

Real-world context — the TJX breach

The 2000s **TJX / T.J. Maxx** breach — **45 million+** cards — traced back to attackers cracking **WEP** from a store **parking lot** and pivoting into the corporate network. It's the canonical case for why weak wireless is a *full-network* risk, not just a "Wi-Fi problem" — and it's still one of the largest retail breaches on record.

</div>

<div class="admonition quote" markdown="1">

The takeaway — from castle-and-moat to Zero Trust

Wi-Fi leaks the signal past the walls, so you **can't** count on a hard perimeter — the old "castle-and-moat" model, where anything inside is trusted. The modern answer is **Zero Trust**: verify **every** identity and **encrypt everything**, inside the network as much as outside it.

</div>

## Part 3 · Bluetooth — wireless without an access point

The last lecture turns to Bluetooth — a second wireless standard attackers have learned to interfere with, and one that connects in a very different shape from Wi-Fi.

<div class="cards" markdown="1">

<div class="card" markdown="1">

### 🎧 Bluetooth Classic (BR/EDR)

Continuous streams, more power — audio, headsets, keyboards, file transfer. The original Bluetooth (versions 1–3).

</div>

<div class="card" markdown="1">

### ⌚ Bluetooth Low Energy (BLE)

Tiny bursts, months on a coin cell — wearables, medical devices, IoT sensors, trackers, car keys. Added in Bluetooth 4.0, and **where the attack surface is** — because these devices are now everywhere.

</div>

</div>

Both live on **2.4 GHz** and dodge interference by **frequency hopping** across many narrow channels many times a second. Each device has a **BD_ADDR** — its hardware address, the Bluetooth version of a MAC.

The big structural difference from Wi-Fi: **there's no access point.** Wi-Fi is hub-and-spoke through an AP; Bluetooth is a **point-to-point** link between devices in a *piconet* — and a more capable device (your phone) often acts as the **central** that peripherals connect to.

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

**Pair.** The two agree on keys and establish trust. How depends on each device's screen/keypad: **"Just Works"** (no confirmation — an earbud with no display), **passkey entry** (one shows a code, you type it on the other — a watch and a phone), or **numeric comparison** (both show the same number, you confirm it matches).

</div>

<div id="scan-panel-3" class="scan-panel" markdown="1">

**Connect.** Now bonded, the two exchange data, frequency-hopping across channels the whole time.

</div>

**The attacks — one per step.** Click each to expand.

??? danger "📣 Discovery & services — the \"blue-\" family"

    They climb in severity: **bluejacking** pushes an unsolicited message (annoyance — like graffiti) → **bluesnarfing** pulls data such as contacts off the device → **bluebugging** takes full control (redirect a call, plant a backdoor). All three reach a *discoverable* device exposing services with weak access control. **Defense:** turn off discoverability; only pair with — and keep — devices you recognize.

??? danger "🔑 Pairing & keys — Just Works & KNOB"

    **"Just Works"** has no code to confirm the peer, so a **man-in-the-middle** can slip into the pairing. **KNOB (2019)** attacks the key *negotiation* — forcing the encryption key down to as little as **one byte**, then brute-forcing it — even when a code was used. **Defenses (two different fixes):** numeric-comparison pairing (LE Secure Connections) stops the man-in-the-middle; a **minimum key-length floor** — enforced in patched firmware, where the Bluetooth standard now requires at least 7 bytes — blocks the KNOB downgrade.

??? danger "🧬 The stack itself — BlueBorne"

    **BlueBorne (2017)** skipped discovery and pairing entirely — it hit the Bluetooth **stack** directly (which runs at high privilege and is always listening) for **remote code execution or MITM**, just by being in range. **Defense:** patch the Bluetooth stack.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Handshake capture is passive and nearly invisible. What *is* detectable is the **deauthentication flood** used to force a re-handshake, and **rogue / evil-twin access points** broadcasting your SSID — both caught by a **Wireless IDS (WIDS)** watching for unexpected BSSIDs and deauth storms.

**Best controls:** **WPA3** (or WPA2 with a long, random passphrase), **enterprise 802.1X** instead of a shared key, and WIDS for rogue-AP detection. For guest Wi-Fi, isolate it from the corporate network entirely. For Bluetooth: disable discoverability, prefer **LE Secure Connections**, and **patch the stack**.

</div>

## References

- **Aircrack-ng documentation & tutorials** — the WEP/WPA cracking toolset (`airmon-ng` · `airodump-ng` · `aireplay-ng` · `aircrack-ng`). [aircrack-ng.org/documentation](https://www.aircrack-ng.org/documentation.html)
- **Wireshark User's Guide** — capturing and reading 802.11 beacons, probe requests, and management frames. [wireshark.org/docs](https://www.wireshark.org/docs/wsug_html_chunked/)
- **MITRE ATT&CK** — Network Sniffing (T1040) · Adversary-in-the-Middle (T1557) · Brute Force (T1110). [T1040](https://attack.mitre.org/techniques/T1040/) · [T1557](https://attack.mitre.org/techniques/T1557/) · [T1110](https://attack.mitre.org/techniques/T1110/)
- **Wi-Fi Alliance — Wi-Fi security & WPA3.** [wi-fi.org/discover-wi-fi/security](https://www.wi-fi.org/discover-wi-fi/security)
