---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

<style>
.md-typeset .scan-panel h4,
.md-typeset .ai-panel h4,
.md-typeset .dil-panel h4 { font-size: 0.85rem; font-weight: 700; letter-spacing: 0; margin-bottom: 6px; }
</style>

# Week 4 · Network Hacking & Sniffing

<span class="kc-badge">🧭 Kill chain · Phase 3 — Gaining Access (the quiet way)</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1040/" class="attck-tag" target="_blank">T1040 Network Sniffing</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 Adversary-in-the-Middle</a> <a href="https://attack.mitre.org/techniques/T1557/002/" class="attck-tag" target="_blank">T1557.002 ARP Cache Poisoning</a> <a href="https://attack.mitre.org/tactics/TA0005/" class="attck-tag" target="_blank">TA0005 Defense Evasion</a>

</div>

The <span style="color:#c0392b;font-weight:700;">red line</span> down the left marks the **attacker's** view (most of this page). The <span style="color:#0e6b82;font-weight:700;">blue line</span> near the end marks the **defender's** view.

<div class="rt-rail" markdown="1">

<span class="rail-label red">🔴 RED TEAM · attacker's view</span>

<div class="admonition abstract" markdown="1">

What you'll learn

- Where we are in the attacker's life cycle — **gaining access**, the *quiet* way in
- How a password gets **read straight off the wire** when traffic isn't encrypted
- Why getting **inside** a flat network makes listening so powerful — and how **switches** change the game
- **ARP spoofing** — how the attacker becomes the **man in the middle**
- How attackers **slip past** the network's defenses — and what the **blue team** does about all of it

</div>

## 1. Where we are: gaining access

We've been walking the attacker's life cycle — the **CEH kill chain**. We built the map (**recon**, Week 2), we tried the doors (**scanning**, Week 3), and now we're at **Phase 3 — gaining access**: actually getting in.

<figure>
<svg viewBox="0 0 860 132" role="img" aria-label="The five CEH phases: Reconnaissance and Scanning are done, Gaining Access is where we are now, Maintaining Access and Covering Tracks come later." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:'Segoe UI',system-ui,sans-serif;">
  <!-- connectors -->
  <g fill="#c3cad6"><polygon points="160,60 177,60 177,54 189,62 177,70 177,64 160,64"/><polygon points="337,60 354,60 354,54 366,62 354,70 354,64 337,64"/><polygon points="515,60 532,60 532,54 544,62 532,70 532,64 515,64"/><polygon points="692,60 709,60 709,54 721,62 709,70 709,64 692,64"/></g>
  <!-- 1 -->
  <rect x="0" y="14" width="150" height="96" rx="9" fill="#E6F1FB" stroke="#b6cfe8"/>
  <text x="75" y="40" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#0C447C">PHASE 1</text>
  <text x="75" y="64" text-anchor="middle" font-size="13.5" font-weight="700" fill="#0C447C">Reconnaissance</text>
  <text x="75" y="88" text-anchor="middle" font-size="11" fill="#3b6ea5">Week 2 ✓</text>
  <!-- 2 -->
  <rect x="177" y="14" width="150" height="96" rx="9" fill="#E6F1FB" stroke="#b6cfe8"/>
  <text x="252" y="40" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#0C447C">PHASE 2</text>
  <text x="252" y="64" text-anchor="middle" font-size="13.5" font-weight="700" fill="#0C447C">Scanning</text>
  <text x="252" y="88" text-anchor="middle" font-size="11" fill="#3b6ea5">Week 3 ✓</text>
  <!-- 3 current -->
  <rect x="354" y="8" width="150" height="108" rx="9" fill="#C0392B"/>
  <text x="429" y="36" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#f7d9d5">PHASE 3</text>
  <text x="429" y="62" text-anchor="middle" font-size="14" font-weight="800" fill="#ffffff">Gaining Access</text>
  <text x="429" y="88" text-anchor="middle" font-size="10.5" font-weight="700" letter-spacing="0.04em" fill="#ffffff">◀ YOU ARE HERE</text>
  <!-- 4 -->
  <rect x="532" y="14" width="150" height="96" rx="9" fill="#F1F4F9" stroke="#dde3ec"/>
  <text x="607" y="40" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#8a93a3">PHASE 4</text>
  <text x="607" y="60" text-anchor="middle" font-size="12.5" font-weight="700" fill="#6b7480">Maintaining</text>
  <text x="607" y="76" text-anchor="middle" font-size="12.5" font-weight="700" fill="#6b7480">Access</text>
  <text x="607" y="98" text-anchor="middle" font-size="10.5" fill="#9aa3b2">later</text>
  <!-- 5 -->
  <rect x="710" y="14" width="150" height="96" rx="9" fill="#F1F4F9" stroke="#dde3ec"/>
  <text x="785" y="40" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.06em" fill="#8a93a3">PHASE 5</text>
  <text x="785" y="60" text-anchor="middle" font-size="12.5" font-weight="700" fill="#6b7480">Covering</text>
  <text x="785" y="76" text-anchor="middle" font-size="12.5" font-weight="700" fill="#6b7480">Tracks</text>
  <text x="785" y="98" text-anchor="middle" font-size="10.5" fill="#9aa3b2">later</text>
</svg>
<figcaption>The attacker's five phases. We've done recon and scanning; this week is <strong>gaining access</strong> — and there are two ways to do it: the quiet way (sniff for a key, this week) or the loud way (exploit a service, Week 6). We start quiet.</figcaption>
</figure>

## 2. What the attacker is breaking into

Before picking a lock, be clear on **what** we're breaking into. Companies wrap their internal network in a strong **perimeter** that separates the inside from the open internet — and everything valuable lives behind it.

<figure>
<div style="display:flex;gap:18px;flex-wrap:wrap;justify-content:center;align-items:center;margin:6px 0;">
<img src="../img/ea-network.png" alt="A real enterprise network: the internet reaches a firewall, then IDS/IPS, then a router, with workstations and servers behind the network perimeter, each with endpoint protection." style="width:47%;min-width:280px;border:1px solid #e2e8f0;border-radius:8px;background:#fff;" />
<img src="../img/ea-castle.png" alt="The same enterprise drawn as a castle: the internet is the moat, the network and firewall are the outer walls, the VPN is the drawbridge, and the data center is the keep." style="width:45%;min-width:260px;" />
</div>
<figcaption>Left: a real enterprise network — internet → firewall → IDS/IPS → router → workstations and servers, inside the network perimeter. Right: the same thing as a <strong>castle</strong> — the internet is the moat, the network and firewall are the outer walls, the VPN is the drawbridge, and the data center is the keep with the crown jewels.</figcaption>
</figure>

## 3. The layers of defense — and where this week fits

Defenders never rely on one wall. They build **layers** — the outermost is the **network** (the perimeter); inside are the device, the applications, the data, and at the very core, identity. The whole course walks these layers from the outside in. This module, *Storming the Perimeter*, is the **outermost ring** — everything this week attacks the **network** layer.

<div style="max-width:520px;margin:20px auto;" markdown="1">

<div markdown="0">
<svg viewBox="0 0 560 480" role="img" aria-label="Interactive defense-in-depth layers — click a ring." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:'Syne',system-ui,sans-serif;">
  <circle cx="280" cy="240" r="216" fill="none" stroke="#c0392b" stroke-width="3" stroke-dasharray="7 5" pointer-events="none"/>
  <circle class="dil-ring" id="dil-ring-1" cx="280" cy="240" r="205" fill="#2b8ca6" onclick="dilShow(1)" tabindex="0" role="button" aria-label="Network layer"/>
  <circle class="dil-ring" id="dil-ring-2" cx="280" cy="240" r="168" fill="#3ba0ba" onclick="dilShow(2)" tabindex="0" role="button" aria-label="Device layer"/>
  <circle class="dil-ring" id="dil-ring-3" cx="280" cy="240" r="131" fill="#57b8cf" onclick="dilShow(3)" tabindex="0" role="button" aria-label="Application layer"/>
  <circle class="dil-ring" id="dil-ring-4" cx="280" cy="240" r="94"  fill="#8ad2e3" onclick="dilShow(4)" tabindex="0" role="button" aria-label="Data layer"/>
  <circle class="dil-ring" id="dil-ring-5" cx="280" cy="240" r="57"  fill="#0e6b82" onclick="dilShow(5)" tabindex="0" role="button" aria-label="Identity layer"/>
  <text x="280" y="60"  text-anchor="middle" font-size="15" font-weight="700" fill="#ffffff" pointer-events="none">NETWORK</text>
  <text x="280" y="95"  text-anchor="middle" font-size="14" font-weight="700" fill="#ffffff" pointer-events="none">DEVICE</text>
  <text x="280" y="130" text-anchor="middle" font-size="13" font-weight="700" fill="#ffffff" pointer-events="none">APPLICATION</text>
  <text x="280" y="165" text-anchor="middle" font-size="12.5" font-weight="700" fill="#1a3a44" pointer-events="none">DATA</text>
  <text x="280" y="238" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff" pointer-events="none">IDENTITY</text>
  <text x="280" y="254" text-anchor="middle" font-size="9.5" fill="#cfeef6" pointer-events="none">the core</text>
</svg>
</div>

↑ **Click a layer** — the <span style="color:#c0392b;font-weight:700;">red ring</span> (Network) is where we are this week

</div>

<div id="dil-panel-1" class="dil-panel" markdown="1">

#### 🌐 Network — the perimeter ◀ this week

Controls what traffic is even allowed onto the network: **firewalls, IDS/IPS, the DMZ,** and segmentation.

**We attack it in:** [Recon](reconnaissance-footprinting.html) · [Scanning](scanning-enumeration.html) · **Network Hacking & Sniffing (here)** · [Wireless](wireless-hacking.html)

</div>

<div id="dil-panel-2" class="dil-panel" markdown="1">

#### 💻 Device — the endpoints

Hardening the machines: **OS patching, antivirus/EDR, disk encryption,** host firewalls.

**We attack it in:** [System Attacks](system-attacks.html) · [Malware, Trojans & DoS](malware-trojans-dos.html)

</div>

<div id="dil-panel-3" class="dil-panel" markdown="1">

#### ⚙️ Application — the software

Code that isn't exploitable: **secure coding, authn & authz,** web application firewalls.

**We attack it in:** [Web Attacks I](web-attacks-servers-apps.html) · [Web Attacks II — SQLi](web-attacks-sqli-session.html)

</div>

<div id="dil-panel-4" class="dil-panel" markdown="1">

#### 🗄️ Data — the information

Protecting the data itself: **encryption, backups,** tight access control — what attackers ultimately want.

**We attack it in:** [Cryptography](cryptography.html)

</div>

<div id="dil-panel-5" class="dil-panel" markdown="1">

#### 🪪 Identity — the core

*Who* can log in and *what* they can do — MFA, IAM, least privilege. Break identity and you don't hack in, you **log in**.

**We attack it in:** [Social Engineering & the Identity Layer](social-engineering-identity.html)

</div>

<div class="admonition warning" markdown="1">

⚖️ Read this first — is sniffing even legal?

Last week's recon was passive and legal; scanning was active and needed authorization. **Sniffing is more subtle.** Even if you send *not a single packet* and "just listen," capturing traffic that isn't yours can be **wiretapping** — a crime. Reading public records about a house is fine; tapping the phone line to listen in is not. And **ARP spoofing**, later on, is fully active — you inject forged packets. So everything here runs only on **your own lab, your own VMs, your own traffic**.

</div>

## 4. Two ways in — find a key, or kick the door

| | 🔑 Find the key *(this week)* | 🚪 Kick the door *(Week 6)* |
|---|---|---|
| **Method** | Sniff the network; grab credentials off the wire | Exploit a weak service and force entry |
| **Noise** | Quiet — often nothing is "broken" | Loud — crashes, alarms, logs |
| **You walk in with** | A stolen key | A broken lock |

A real attacker tries to **find a key before kicking any doors** — quiet before loud. So we start with the key.

## 5. Grabbing a password off the wire

Any protocol that sends its data **unencrypted** — HTTP, FTP, Telnet, old SMTP, legacy database links — hands its username, password, and content to anyone on the path. Picture the attacker on the same coffee-shop Wi-Fi as you: you log into a plain **HTTP** site, and your password crosses the wire in plain text. No exploit, nothing broken — they read the key off the wire and log in as you. **This is the reason the entire web moved to HTTPS.**

<div class="admonition example" markdown="1">

Live demo — see a password in the clear (authorized target)

`http://demo.testfire.net` is a deliberately vulnerable **practice** app (a fake bank) put online for exactly this. Log in with `DemoUser` / `DemoPassword123` over plain HTTP, capture with **Wireshark**, then **Follow → HTTP Stream** on the `POST /doLogin` — the `uid` and `passw` are right there in the request body. Follow an **HTTPS** stream and it's just opaque bytes. That contrast *is* the lesson: cleartext is free keys; encryption is a wall.

</div>

<div class="admonition quote" markdown="1">

🌐 Real-world case — Firesheep (2010)

A developer released **Firesheep**, a one-click Firefox add-on that sniffed **unencrypted session cookies** on open Wi-Fi and let anyone log in as other people on Facebook, Twitter, and more. Sites had moved *login* to HTTPS — but were still sending the **session cookie** back in the clear, so it could be grabbed and replayed. It wasn't new tech; it just made cleartext sniffing so public it pushed the whole web to **HTTPS-everywhere**.

</div>

<div class="admonition note" markdown="1">

But from outside, this only goes so far

Almost everything is **HTTPS** today, so you usually can't just grab a login off the open internet — forcing a login from outside is **brute force**, which we save for Week 6. The real danger is the attacker who's already **inside** the network. So let's go there.

</div>

## 6. Getting inside, then listening to the network

How does an attacker get *inside*? The perimeter only has to fail **once**: a phishing click that turns a laptop into a foothold, a rogue device on a jack, stolen VPN credentials, guest Wi-Fi, or an exposed service.

<div class="admonition defender" markdown="1">

🔵 Blue team, part 1 — prevention: the firewall blocks entry

The **firewall** is the gate at the perimeter: it blocks connections that aren't allowed in (you met it in Week 2 as `filtered` ports). Attackers get past it by **tunneling** — hiding their traffic inside something it already allows, like **HTTPS** or **DNS** — or by the human routes above (a phishing click, a rogue device) that simply walk in the front door. *(The blue team's second job — catching the attacker once they're inside — comes at the end of the page.)*

</div>

Once inside, most enterprises are **castle-and-moat** — a hard shell but a soft inside — so the attacker roams with **free movement** across the internal network (exactly the castle's weakness from the picture above).

So the attacker **listens** — that's sniffing. A **sniffer** (Wireshark, tcpdump) captures packets crossing the network. How easy that is comes down to the **network gear** — click each to see it:

<div class="ai-strip" markdown="1">

<div id="ai-card-1" class="ai-card ai-target" onclick="aiShow(1)" role="button" tabindex="0" aria-label="Passive sniffing" markdown="1">

<span class="ai-emoji">👂</span><span class="ai-title">PASSIVE — just listen</span><span class="ai-sub">on a hub · silent · invisible on the wire</span>

</div>

<div id="ai-card-2" class="ai-card ai-weapon" onclick="aiShow(2)" role="button" tabindex="0" aria-label="Active sniffing" markdown="1">

<span class="ai-emoji">🎯</span><span class="ai-title">ACTIVE — force it to you</span><span class="ai-sub">on a switch · you inject packets</span>

</div>

</div>

↑ **Click each** — the network gear decides the game

<div id="ai-panel-1" class="ai-panel" markdown="1">

#### 👂 Passive sniffing — on a hub

An old **hub** is a loudspeaker: every packet it receives is copied out to **every** port. So the attacker just plugs in, puts their card in *promiscuous mode*, and quietly hears everyone's traffic. Nothing is injected, nothing is sent — it's completely **silent**, with no way to detect it on the wire. If a network still runs on hubs, sniffing is basically free.

<figure><img src="../img/sniff-hub.svg" width="520" alt="A hub copies every packet to every port, so the attacker receives a copy of everyone's traffic just by listening." /></figure>

</div>

<div id="ai-panel-2" class="ai-panel" markdown="1">

#### 🎯 Active sniffing — on a switch

A modern **switch** is smarter: it learns which device is on which port and sends each frame **only** to its destination. So the attacker plugs in and hears almost nothing — just their own traffic and broadcasts. To grab anyone else's traffic they can't stay passive; they have to **actively insert themselves** into the path — and that starts injecting packets, which leaves fingerprints. The classic way to do it is **ARP spoofing** — the next section.

<figure><img src="../img/sniff-switch.svg" width="520" alt="A switch sends each frame only to its destination port, so the attacker gets nothing and must ARP-spoof to force traffic through them." /></figure>

</div>

## 7. Becoming the man in the middle — ARP spoofing

On a local network, machines find each other by **MAC address** using **ARP** (Address Resolution Protocol) — a trusting protocol with **no authentication**. Whoever answers "who has this IP?" first is believed and cached. ARP spoofing abuses exactly that: the attacker sends **forged replies** telling the victim *"I'm the gateway"* and telling the gateway *"I'm the victim."* Now every packet flows **through** the attacker — a man-in-the-middle who can read it, capture credentials, or change it in transit.

<figure>
<img src="../img/sniff-mitm.svg" width="820" alt="Before ARP poisoning the victim's traffic goes straight to the real gateway; after, forged ARP replies route every packet through the attacker, who relays it on to the gateway." /><br />
<figcaption>Before: the victim's traffic goes straight to the real gateway. After forged ARP replies, every packet detours <strong>through the attacker</strong> — who quietly relays it on, so nothing looks broken.</figcaption>
</figure>

**Walk the attack, step by step.** Click each step to see what happens on the wire — with the exact packets you'd point to in a Wireshark capture.

<div class="scan-strip" markdown="1">

<div id="scan-node-1" class="scan-phase" aria-label="Learn the next hop" onclick="scanShow(1)" role="button" style="background:#0E6B82" tabindex="0" markdown="1">

<span class="num">STEP 1</span>Learn the next hop<small>who is the gateway</small>

</div>

<div id="scan-node-2" class="scan-phase" aria-label="Normal path" onclick="scanShow(2)" role="button" style="background:#157f8f" tabindex="0" markdown="1">

<span class="num">STEP 2</span>Normal path<small>traffic → real gateway</small>

</div>

<div id="scan-node-3" class="scan-phase" aria-label="Poison the cache" onclick="scanShow(3)" role="button" style="background:#B45309" tabindex="0" markdown="1">

<span class="num">STEP 3</span>Poison the cache<small>forged ARP replies</small>

</div>

<div id="scan-node-4" class="scan-phase" aria-label="Traffic reroutes" onclick="scanShow(4)" role="button" style="background:#c0522b" tabindex="0" markdown="1">

<span class="num">STEP 4</span>Traffic reroutes<small>now via the attacker</small>

</div>

<div id="scan-node-5" class="scan-phase" aria-label="Read and relay" onclick="scanShow(5)" role="button" style="background:#C0392B" tabindex="0" markdown="1">

<span class="num">STEP 5</span>Read &amp; relay<small>the man-in-the-middle</small>

</div>

</div>

↑ **Click a step** — each shows what happens and the packets to look for

<div id="scan-panel-1" class="scan-panel" markdown="1">

#### 📇 Step 1 — learn the next hop's MAC

The victim (`192.168.1.165`) wants to reach `8.8.8.8` — which is **out on the internet, not on the LAN** — so the next hop is the **gateway** `192.168.1.254`. To send even one frame it needs the gateway's **MAC**, so it broadcasts an ARP request: *"Who has 192.168.1.254?"* The gateway replies with its real MAC, and the victim **caches** it. *(If the target were local, it would ARP for that host directly.)*

🔎 In a capture: a broadcast **who-has** request, then a unicast **is-at** reply — the reply nobody authenticates.

</div>

<div id="scan-panel-2" class="scan-panel" markdown="1">

#### ➡️ Step 2 — the normal path

With the gateway's real MAC cached, the victim's traffic (say a ping to `8.8.8.8`) leaves with the **destination MAC = the real gateway**. Everything flows correctly out to the internet. This is the "before" picture — show it first so the change stands out.

🔎 In a capture: the outbound packet's **Ethernet destination** is the gateway's real MAC (`ec:c3:…:c1`).

</div>

<div id="scan-panel-3" class="scan-panel" markdown="1">

#### ☠️ Step 3 — poison the cache

The attacker (`192.168.1.199`, MAC `de:ad:be:ef:00:99`) sends **unsolicited** ARP replies — ARP has no rule that says *"only accept a reply if I asked,"* so the victim's cache happily **overwrites** the good entry: `192.168.1.254 → de:ad:be:ef:00:99`. A matching lie goes to the gateway (*"192.168.1.165 is at de:ad…"*). The attacker repeats every couple of seconds so the real gateway's legit replies never win the entry back. *(Tools: Ettercap, bettercap, arpspoof.)*

🚩 In a capture: this is the tell — Wireshark raises **"Duplicate IP address configured"** (one IP, two MACs).

</div>

<div id="scan-panel-4" class="scan-panel" markdown="1">

#### 🔀 Step 4 — the traffic reroutes

Same lookup, poisoned answer. The victim's next packet to `8.8.8.8` now leaves with **destination MAC = the attacker**. The IP addresses are unchanged (`192.168.1.165 → 8.8.8.8`) — only the **MAC** hopped. That's why a man-in-the-middle is nearly invisible if you only read Wireshark's default Source/Destination (IP) columns.

🔎 In a capture: the **Ethernet destination** on the identical packet is now the attacker's MAC — add `eth.src` / `eth.dst` columns to see it.

</div>

<div id="scan-panel-5" class="scan-panel" markdown="1">

#### 🕳️ Step 5 — read &amp; relay (the MITM)

The attacker receives the victim's traffic, reads it (grabbing any cleartext credentials or cookies), and **forwards** it on to the real gateway — keeping the victim's connection alive so nothing looks broken. He doesn't rewrite the IP source, because if he did the reply would come back to *him* and tip the victim off. He's a **silent relay**, sitting in the middle of every conversation.

🔎 In a capture: the relayed packet keeps the **victim's IP** as source but rides the **attacker's MAC** — proof of the man-in-the-middle.

</div>

<div class="admonition quote" markdown="1">

📢 Real-world case — Superfish (2015)

Lenovo shipped laptops with adware that installed its **own root certificate** to break HTTPS and inject ads — a factory-installed man-in-the-middle. Because a browser trusts a certificate authority to prove a site is who it claims, Superfish forged that trust locally so it could sit in the middle of *encrypted* sessions. Worse, it was so poorly secured that **third parties** could ride it to intercept banking traffic. Millions in fines followed.

</div>

<div class="admonition quote" markdown="1">

🔏 Real-world case — DigiNotar (2011)

Attackers breached a **certificate authority** and forged Google certificates, then used them to man-in-the-middle **Gmail for ~300,000 people in Iran**. Same idea as Superfish — break the trust that HTTPS relies on — but at internet scale. Listening, and **impersonating**: the network isn't just something you cross; it's a place you can sit and intercept.

</div>

## 8. Staying hidden — the evasion rule

<div class="admonition note" markdown="1">

The attacker's rule of evasion

Whatever the move, evasion comes down to one idea: **defenses only inspect what they can see.** Encrypt it, fragment it, or tunnel it inside allowed traffic (HTTPS, DNS), and the IDS/IPS and firewalls watching the wire lose the thread — which is exactly why sneaking stolen data back *out* over an encrypted channel is so hard to catch. That's the problem the blue team now has to solve ↓

</div>

</div>

------------------------------------------------------------------------

<div class="bt-rail" markdown="1">

<span class="rail-label blue">🔵 BLUE TEAM · defender's view</span>

## 9. Blue team, part 2 — catch the intruder who got in

Prevention (the firewall) tries to keep them out — but assume they got in. Now the blue team has to **catch the active moves and make the capture worthless.** The hard part: **passive sniffing is invisible** — a pure listener sends nothing, so there's nothing on the wire to detect. So the defender leans on detecting the *active* moves and shrinking what's worth stealing.

<div class="admonition defender" markdown="1">

Detect the intruder

- **IDS / IPS** (Snort, Suricata) watch for **anomalies** — a machine suddenly claiming to be the gateway, the **"Duplicate IP address"** from ARP poisoning, or traffic that just looks wrong.
- **Honeypots** — decoy systems planted on the network; the moment an intruder touches one it fires a high-confidence alert, because a real user never would.
- **Watch the fingerprints** — sudden ARP-table changes, duplicate-IP warnings, and oddly large or oddly regular outbound flows are your MITM and **exfiltration** alarms.

</div>

<div class="admonition defender" markdown="1">

Shrink what's worth capturing — and contain it

- **Encrypt everything in transit** — the great equalizer. If captured traffic is encrypted, a listener gets useless bytes. *(This is the wall from the demo.)*
- **Dynamic ARP Inspection + port security** on switches — block the ARP spoofing that makes active MITM possible in the first place.
- **Segment the network** — so a foothold in one corner (the soft castle interior, and the Target breach) can't sniff or reach everything.

You can't hear a listener — so you make sure whatever they hear is **worthless**, and you watch for the moment they get loud.

</div>

</div>

------------------------------------------------------------------------

<div class="admonition info" markdown="1">

Where this maps in MITRE ATT&CK

**MITRE ATT&CK** is a free public catalog of real attacker techniques, each with an ID. This week maps to **T1040** (Network Sniffing), **T1557** (Adversary-in-the-Middle) and its sub-technique **T1557.002** (ARP Cache Poisoning), and the evasion side to **TA0005** (Defense Evasion). Browse it at [attack.mitre.org](https://attack.mitre.org/techniques/T1557/002/).

</div>

<div class="admonition tip" markdown="1">

Try it yourself — only on your own lab and your own traffic

1. **See cleartext:** capture your own login to `http://demo.testfire.net` (`DemoUser` / `DemoPassword123`), then **Follow → HTTP Stream** the `POST /doLogin`. Compare against an HTTPS stream — opaque.
2. **Read ARP:** open any capture, filter `arp`, and find a **who-has** request paired with its **is-at** reply. Ask: *who verified that reply?* (Nobody — that's the hole.)
3. **Spot poisoning:** in a capture that contains ARP spoofing, `Analyze → Expert Information` flags **"Duplicate IP address configured."** Add **Hardware Source/Dest Address** (`eth.src` / `eth.dst`) columns and watch the same IP hop onto a new MAC.

**Next week →** we take the same idea off the wire and into the air — **Wireless Hacking**, where the keys are left out over the radio. Then in Week 6 we finally *kick the door in*.

</div>

<div class="admonition quote" markdown="1">

Remember

Network hacking is the **quiet** way in: read credentials off the wire, or sit in the middle of the traffic. **Cleartext** hands you keys; a **switch** forces you to ARP-spoof your way into the path; **passive** listening is silent while the **active** moves get you caught — and **encryption** turns all of it into useless bytes.

</div>

------------------------------------------------------------------------

## References

- **Wireshark User's Guide.** [wireshark.org/docs](https://www.wireshark.org/docs/wsug_html_chunked/)
- **MITRE ATT&CK — Adversary-in-the-Middle (T1557) · ARP Cache Poisoning (T1557.002) · Network Sniffing (T1040).** [attack.mitre.org](https://attack.mitre.org/techniques/T1557/)
- **NIST SP 800-115** — Technical Guide to Information Security Testing. [Free PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf)
- **Practice safely:** [demo.testfire.net](http://demo.testfire.net) — an intentionally vulnerable practice application.
