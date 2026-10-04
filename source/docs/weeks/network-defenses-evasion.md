---
title: Week 7 · Network Defense Evasion & DoS
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 7 · Network Defense Evasion & DoS

<span class="kc-badge">🧭 CEH life cycle · Gaining Access — getting past the network defenses</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1190/" class="attck-tag" target="_blank">T1190 Exploit Public-Facing App</a> <a href="https://attack.mitre.org/techniques/T1059/" class="attck-tag" target="_blank">T1059 Command & Scripting</a> <a href="https://attack.mitre.org/techniques/T1041/" class="attck-tag" target="_blank">T1041 Exfil Over C2</a> <a href="https://attack.mitre.org/techniques/T1498/" class="attck-tag" target="_blank">T1498 Network DoS</a>

</div>

<div class="admonition abstract" markdown="1">

Two ways to beat a network

Facing a defended network, an attacker has **two approaches**: **get past** the defenses (evasion), or **bring the network down** (denial of service). We spend most of this week on the first — the defense equipment standing in the way, what each does, and how attackers slip past.

</div>

## Approach 1 · Evading the network defenses

This is the enterprise network you're attacking. **Click a defense box** (highlighted) to see what it does, its pros and cons — or **trace the attack** with the buttons below to watch an intruder ride through the same network.

<svg class="netdiag" viewBox="0 0 760 470" role="img" aria-label="Interactive enterprise network. Clickable defense equipment: the perimeter firewall, the IDS/IPS, the web application firewall, the host firewalls and segmentation around the internal servers, and a honeypot. Context nodes: the internet, the DMZ web server, the router, the application server, and the database. An attack path can be traced from the internet through the web server to the internal database.">
  <text x="66" y="54" text-anchor="middle" font-size="24">🌐</text>
  <text x="66" y="80" text-anchor="middle" class="lbl" fill="#c0392b">Internet</text>
  <line x1="92" y1="74" x2="132" y2="74" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g id="net-node-firewall" class="net-node sel" role="button" tabindex="0" onclick="netShow('firewall')" aria-label="Firewall">
    <rect class="box" x="134" y="46" width="104" height="58" rx="7"/>
    <text x="186" y="76" text-anchor="middle" font-size="19">🧱</text>
    <text x="186" y="96" text-anchor="middle" class="lbl">Firewall</text>
  </g>
  <line x1="238" y1="74" x2="280" y2="74" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g id="net-node-ids" class="net-node" role="button" tabindex="0" onclick="netShow('ids')" aria-label="IDS / IPS">
    <rect class="box" x="282" y="46" width="108" height="58" rx="7"/>
    <text x="336" y="76" text-anchor="middle" font-size="18">🛡️</text>
    <text x="336" y="96" text-anchor="middle" class="lbl">IDS / IPS</text>
  </g>
  <line x1="390" y1="74" x2="432" y2="74" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g id="net-node-waf" class="net-node" role="button" tabindex="0" onclick="netShow('waf')" aria-label="Web Application Firewall">
    <rect class="box" x="434" y="42" width="104" height="66" rx="7"/>
    <text x="486" y="72" text-anchor="middle" font-size="18">🛡️</text>
    <text x="486" y="90" text-anchor="middle" class="lbl">WAF</text>
    <text x="486" y="101" text-anchor="middle" class="sub">app firewall</text>
  </g>
  <line x1="538" y1="74" x2="580" y2="74" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g class="ctx">
    <rect class="box" x="582" y="42" width="112" height="66" rx="7"/>
    <text x="638" y="72" text-anchor="middle" font-size="18">🖥️</text>
    <text x="638" y="90" text-anchor="middle" class="lbl">Web server</text>
    <text x="638" y="101" text-anchor="middle" class="sub">DMZ</text>
  </g>
  <line x1="186" y1="104" x2="186" y2="236" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <rect x="112" y="214" width="636" height="226" rx="11" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-dasharray="6 5"/>
  <text x="128" y="233" class="sub" font-weight="700" fill-opacity="0.65">INTERNAL NETWORK</text>
  <g class="ctx">
    <rect class="box" x="140" y="238" width="96" height="56" rx="7"/>
    <text x="188" y="266" text-anchor="middle" font-size="17">🔀</text>
    <text x="188" y="285" text-anchor="middle" class="lbl">Router</text>
  </g>
  <line x1="236" y1="266" x2="296" y2="266" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g id="net-node-hostfw" class="net-node" role="button" tabindex="0" onclick="netShow('hostfw')" aria-label="Host firewalls and segmentation">
    <rect class="box" x="298" y="232" width="128" height="68" rx="7"/>
    <text x="362" y="262" text-anchor="middle" font-size="18">🧱🔒</text>
    <text x="362" y="282" text-anchor="middle" class="lbl">Host firewalls</text>
    <text x="362" y="293" text-anchor="middle" class="sub">+ segmentation</text>
  </g>
  <line x1="426" y1="266" x2="462" y2="266" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g class="ctx">
    <rect class="box" x="464" y="238" width="92" height="56" rx="7"/>
    <text x="510" y="266" text-anchor="middle" font-size="17">⚙️</text>
    <text x="510" y="285" text-anchor="middle" class="lbl">App server</text>
  </g>
  <line x1="556" y1="266" x2="588" y2="266" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g class="ctx">
    <rect class="box" x="590" y="238" width="104" height="56" rx="7"/>
    <text x="642" y="266" text-anchor="middle" font-size="17">🗄️</text>
    <text x="642" y="285" text-anchor="middle" class="lbl">Database</text>
  </g>
  <line x1="188" y1="294" x2="188" y2="348" stroke="currentColor" stroke-opacity="0.45" stroke-width="2" marker-end="url(#na)"/>
  <g id="net-node-honeypot" class="net-node" role="button" tabindex="0" onclick="netShow('honeypot')" aria-label="Honeypot">
    <rect class="box" x="134" y="350" width="120" height="58" rx="7"/>
    <text x="194" y="380" text-anchor="middle" font-size="18">🍯</text>
    <text x="194" y="400" text-anchor="middle" class="lbl">Honeypot</text>
  </g>
  <g id="cweb" class="atk-mark"><rect x="582" y="42" width="112" height="66" rx="7" fill="#c0392b" fill-opacity="0.12" stroke="#c0392b" stroke-width="2.5"/><text x="686" y="56" font-size="15">💥</text></g>
  <g id="capp" class="atk-mark"><rect x="464" y="238" width="92" height="56" rx="7" fill="#c0392b" fill-opacity="0.12" stroke="#c0392b" stroke-width="2.5"/><text x="550" y="250" font-size="14">💥</text></g>
  <g id="cdb" class="atk-mark"><rect x="590" y="238" width="104" height="56" rx="7" fill="#c0392b" fill-opacity="0.12" stroke="#c0392b" stroke-width="2.5"/><text x="686" y="250" font-size="14">💥</text></g>
  <g id="atk-arrow-1" class="atk-arrow"><path d="M70,36 Q360,4 636,40" fill="none" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 4" marker-end="url(#ra)"/><text x="360" y="22" text-anchor="middle" font-size="10" font-weight="700" fill="#c0392b">① exploit rides in the payload</text></g>
  <g id="atk-arrow-2" class="atk-arrow"><path d="M638,112 L638,160 L66,160 L66,98" fill="none" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 4" marker-end="url(#ra)"/><text x="360" y="153" text-anchor="middle" font-size="10" font-weight="700" fill="#c0392b">② reverse shell — outbound channel</text></g>
  <g id="atk-arrow-3" class="atk-arrow"><path d="M638,114 L638,210 L510,210 L510,232" fill="none" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 4" marker-end="url(#ra)"/><path d="M556,276 L586,276" fill="none" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 4" marker-end="url(#ra)"/><text x="548" y="332" text-anchor="middle" font-size="10" font-weight="700" fill="#c0392b">③ lateral movement</text></g>
  <g id="atk-arrow-4" class="atk-arrow"><path d="M642,236 L642,184 L66,184 L66,98" fill="none" stroke="#c0392b" stroke-width="2.5" stroke-dasharray="7 4" marker-end="url(#ra)"/><text x="360" y="177" text-anchor="middle" font-size="10" font-weight="700" fill="#c0392b">④ exfiltrate the data out</text></g>
  <defs>
    <marker id="na" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor" fill-opacity="0.5"/></marker>
    <marker id="ra" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker>
  </defs>
</svg>

<p class="net-hint">🛡️ Click a defense box for what it does · pros · cons —— or ⚔️ trace the attack:</p>

<div class="atk-strip" markdown="1">

<div id="atk-step-1" class="atk-step" onclick="atkShow(1)" role="button" tabindex="0" style="background:#c0392b" markdown="1">

<span class="num">STEP ①</span>Exploit the web server

</div>

<div id="atk-step-2" class="atk-step" onclick="atkShow(2)" role="button" tabindex="0" style="background:#a93226" markdown="1">

<span class="num">STEP ②</span>Reverse shell

</div>

<div id="atk-step-3" class="atk-step" onclick="atkShow(3)" role="button" tabindex="0" style="background:#8a1f14" markdown="1">

<span class="num">STEP ③</span>Lateral movement

</div>

<div id="atk-step-4" class="atk-step" onclick="atkShow(4)" role="button" tabindex="0" style="background:#6a160e" markdown="1">

<span class="num">STEP ④</span>Exfiltration

</div>

</div>

<div id="net-panel-firewall" class="net-panel active" markdown="1">

#### 🧱 Firewall — the perimeter gate (and the NGFW)

**What it does.** Sits at the edge and checks every packet's **header** (source/dest IP, port, protocol) against rules — **allow**, **drop**, or **reject**. A **next-gen firewall (NGFW)** goes further: it reads the **payload** too, identifies the real application, can decrypt TLS, and folds in an IPS.

**Pros.** Fast, simple, the essential first filter; default-deny blocks everything not explicitly allowed. An NGFW adds payload inspection and app awareness in one box.

**Cons.** A basic firewall reads **only the header** — it must leave 80/443 open to the world, and can't see an exploit hidden in the payload (that's how ShellShock rides in on an allowed port — trace the attack above). Attackers beat an NGFW by **encrypting or fragmenting** the payload.

</div>

<div id="net-panel-ids" class="net-panel" markdown="1">

#### 🛡️ IDS / IPS — watches the traffic, inside too

**What it does.** Monitors traffic — crucially **including internal, east-west traffic** — for **signatures** (known attacks) and **anomalies** (a web server querying a database it never touches). The **IDS** watches a copy and **alerts** (passive); the **IPS** sits **inline** and can **block** (active).

**Pros.** Sees what the firewall can't — payload-borne attacks, and the lateral movement and exfil happening *inside* the perimeter.

**Cons.** Detection is **reactive**; signatures miss novel attacks; anomaly baselines need tuning or they drown you in false positives; an IDS only *alerts* (someone must be watching). Attackers go **low-and-slow** or **encrypt** to stay under the radar.

</div>

<div id="net-panel-waf" class="net-panel" markdown="1">

#### 🛡️ WAF — guards the application

**What it does.** A **Web Application Firewall** sits inline in front of the web server and reads the **full HTTP request**, blocking application-logic attacks the network defenses can't see — SQL injection, cross-site scripting.

**Pros.** The only thing that catches a perfectly *valid-looking* request that abuses the app — e.g. `GET /product?id=1' OR '1'='1' --`, which dumps the whole database.

**Cons.** App-specific rules need constant tuning; obfuscated or encoded payloads can slip; it only covers web traffic. *(Full treatment in the web-hacking module.)*

</div>

<div id="net-panel-hostfw" class="net-panel" markdown="1">

#### 🧱🔒 Host firewalls + segmentation — locks on every machine

**What it does.** A firewall on **each machine** (allow only the connections it truly needs), plus splitting the network into **zones** so traffic between them is controlled.

**Pros.** Contains **lateral movement** — owning one server no longer hands over the next. Classic defense in depth: a breach in one zone stays in that zone.

**Cons.** Complex to configure and maintain at scale; a *valid* connection along an allowed path still works; it doesn't stop the attacker's initial foothold — only limits where they can go next.

</div>

<div id="net-panel-honeypot" class="net-panel" markdown="1">

#### 🍯 Honeypot — a decoy that trips a reliable alarm

**What it does.** A fake system with **no legitimate purpose**, made to look valuable. Nothing real has any reason to touch it — so **any** interaction is almost certainly an intruder, and fires a high-confidence alarm.

**Pros.** Near-**zero false positives**; reveals an attacker's presence and what they're after, early.

**Cons.** Only helps **if** the attacker touches it — a careful one spots the decoy (too easy, oddly isolated, no real traffic) and avoids it. Adds setup and maintenance.

</div>

<div id="atk-panel-1" class="atk-panel" markdown="1">

#### ⚔️ Step ① — exploit the web server (ShellShock)

A normal-looking HTTP request to port 80 — the firewall sees the right port and passes it. But the `User-Agent` (which is *payload* to the firewall) carries `() { :; }; /bin/cat /etc/passwd`. The web server hands that header to Bash via CGI, the trailing command runs, and the attacker has **code execution** on the web server. *The firewall checked the header; the exploit was in the payload it never reads.*

</div>

<div id="atk-panel-2" class="atk-panel" markdown="1">

#### ⚔️ Step ② — reverse shell (dial out)

Code execution that fires once isn't enough — so the exploit opens a connection **outbound**, from the web server back to the attacker's server. Firewalls scrutinize **inbound** traffic but trust **outbound**, so it sails through — a standing channel back into the network, on demand.

</div>

<div id="atk-panel-3" class="atk-panel" markdown="1">

#### ⚔️ Step ③ — lateral movement

From the web server, the attacker reads logs and config to find the app and database servers, then hops to them — all **host-to-host, inside** the network, where the perimeter firewall can't see. This blindness is exactly what **IDS/IPS** and **host firewalls** are there to answer.

</div>

<div id="atk-panel-4" class="atk-panel" markdown="1">

#### ⚔️ Step ④ — exfiltration

The attacker pulls the data from the database and streams it back out through the channel already open, often **encrypted** so watchers see only ciphertext. The data walks out the front door as ordinary outbound traffic.

</div>

---

## Approach 2 · Bringing the network down — DoS / DDoS

The second approach is the opposite of subtle. If you can't get *in*, stop trying — and attack **availability** instead. A **denial-of-service** attack floods the target so real users can't get through. The goal isn't data; it's downtime.

| Type | How it overwhelms |
|---|---|
| **Volumetric** | Flood the bandwidth with traffic — ICMP floods, oversized pings — until real requests can't get through. |
| **Protocol / state** | A **SYN flood**: start the TCP handshake but never finish it, filling the server's connection table with half-open connections. |
| **Application** | Slow, partial requests that tie up the server's workers — low traffic, hard to tell from genuinely slow users. |

From one machine it's a **DoS**; from a **botnet** of hijacked machines flooding together it's a **DDoS** — far harder to block, and it hides the origin behind thousands of sources.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

- **Egress filtering + TLS inspection** — watch what *leaves*, and decrypt at the gateway so encrypted exfil can be seen.
- **Internal monitoring + baselines** — tuned IDS/IPS catch the quiet lateral movement and the sudden spikes of a flood.
- **Segment, and lock every host** — contain a breach to one zone.
- **Honeypots** — any hit is an instant, high-confidence signal.
- **Rate limiting & upstream scrubbing** — absorb a DDoS before it reaches you.

Underneath it all is **zero trust**: getting through the perimeter earns no trust inside. Verify and inspect everywhere.

</div>

## References

- **NIST SP 800-41 Rev. 1 — Guidelines on Firewalls and Firewall Policy.** [csrc.nist.gov/pubs/sp/800/41/r1/final](https://csrc.nist.gov/pubs/sp/800/41/r1/final)
- **CVE-2014-6271 — "ShellShock."** [nvd.nist.gov/vuln/detail/CVE-2014-6271](https://nvd.nist.gov/vuln/detail/CVE-2014-6271)
- **Snort — open-source IDS/IPS.** [snort.org](https://www.snort.org/)
- **Cloudflare — What is a DDoS attack?** [cloudflare.com/learning/ddos](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
