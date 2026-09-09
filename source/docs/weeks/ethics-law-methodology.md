[← Course home](../index.html) · Ethical Hacking

# Week 1 · Framework, Law & Ethics

<span class="kc-badge">🗺️ The map for the whole course</span>

<div class="admonition abstract" markdown="1">

What this page covers

- The attacker–defender **loop**, and how AI accelerates it
- **Threat, vulnerability & risk** — the one idea everything turns on
- The defender's playbook: the **NIST Cybersecurity Framework**
- The attacker's playbook: the **kill chain** — *land and expand* — and how it lines up with the **Cyber Kill Chain** and **MITRE ATT&CK**
- **Enterprise architecture** and **defense in depth** — the layers we'll attack
- **Law & authorization** — the line that makes it *ethical*

</div>

## 1. The attacker–defender loop

Security is a constant back-and-forth between two sides. On one side, the **defenders** — any company trying to protect its infrastructure and data (the "blue" side). On the other, the **attackers** — hackers trying to break in and steal that data (the "red" side). Defenders get better, so attackers get better, so defenders improve again — round and round. If you've played competitive video games, it's the same loop; in real life the stakes are millions of dollars and, increasingly, whole economies.

<div style="max-width:260px;margin:18px auto;" markdown="1">

<svg viewBox="0 0 240 240" role="img" aria-label="The attacker–defender loop: defenders and attackers each keep improving against the other." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:'Syne',system-ui,sans-serif;">
  <defs>
    <marker id="lpB" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="16" refX="5" refY="8" orient="auto"><path d="M2,2 L18,8 L2,14 Z" fill="#1E40AF"/></marker>
    <marker id="lpR" markerUnits="userSpaceOnUse" markerWidth="20" markerHeight="16" refX="5" refY="8" orient="auto"><path d="M2,2 L18,8 L2,14 Z" fill="#c0392b"/></marker>
  </defs>
  <!-- two arcs with a gap top and bottom, arrowheads showing the cycle -->
  <path d="M 128,44 A 76,76 0 0 1 196,148" fill="none" stroke="#1E40AF" stroke-width="11" stroke-linecap="round" marker-end="url(#lpB)"/>
  <path d="M 112,196 A 76,76 0 0 1 44,92" fill="none" stroke="#c0392b" stroke-width="11" stroke-linecap="round" marker-end="url(#lpR)"/>
  <text x="120" y="34" text-anchor="middle" font-size="22">🛡️</text>
  <text x="120" y="214" text-anchor="middle" font-size="22">⚔️</text>
  <text x="120" y="112" text-anchor="middle" font-size="12" font-weight="800" fill="#1E40AF">DEFENDERS</text>
  <text x="120" y="140" text-anchor="middle" font-size="12" font-weight="800" fill="#c0392b">ATTACKERS</text>
</svg>

</div>

In your other courses you may have learned the **blue** side — how defenses are built. **This course flips to the red side:** we learn how attackers get through, because you cannot defend a system well until you understand exactly how it is broken.

And **AI is spinning this loop faster.** It's like an arms dealer arming both sides: attackers use it to find and exploit weaknesses faster (and lets less-skilled people attack at all), while defenders use it to find and fix weaknesses at unprecedented speed.

## 2. Threat, vulnerability & risk

For an attack to actually cause harm, **two things must line up**:

- A **vulnerability** — a weakness or gap in the system (an unpatched server, a misconfigured firewall, no ransomware protection). This is *why harm is possible*.
- A **threat** — an actor trying to exploit that weakness. This is *what causes harm*.

**Risk** lives at the *intersection*. A weakness nobody attacks is harmless; an attacker with nothing to exploit gets nowhere. It's only when a threat meets a vulnerability that risk exists.

<div style="max-width:440px;margin:18px auto;" markdown="1">

<svg viewBox="0 0 440 200" role="img" aria-label="Risk is the intersection of threat and vulnerability." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:'Syne',system-ui,sans-serif;">
  <circle cx="165" cy="100" r="92" fill="rgba(245,158,11,.14)" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="275" cy="100" r="92" fill="rgba(245,158,11,.14)" stroke="#f59e0b" stroke-width="3"/>
  <text x="112" y="96" text-anchor="middle" font-size="14" font-weight="800" fill="#0C447C">THREAT</text>
  <text x="112" y="114" text-anchor="middle" font-size="9.5" fill="#6b7280">causes harm</text>
  <text x="328" y="96" text-anchor="middle" font-size="14" font-weight="800" fill="#0C447C">VULN.</text>
  <text x="328" y="114" text-anchor="middle" font-size="9.5" fill="#6b7280">the weakness</text>
  <text x="220" y="96" text-anchor="middle" font-size="15" font-weight="800" fill="#c0392b">RISK</text>
  <text x="220" y="113" text-anchor="middle" font-size="9" fill="#c0392b">the overlap</text>
</svg>

</div>

<div class="admonition example" markdown="1">

A concrete example

A company has **no ransomware protection** — that's the *vulnerability*. A cybercriminal emails an employee ransomware and they click it — that's the *threat*. The company's data is all encrypted and they must pay to get it back — that's the *risk* (the outcome). Remove either side and there's no incident.

</div>

For a long time it was skilled humans — "black hats" — who found and exploited these weaknesses. Now even unskilled people can use AI to do it, and AI systems are beginning to find and exploit vulnerabilities on their own. As attackers, our whole job in this course is turning vulnerabilities into risk.

## 3. The defender's playbook — the NIST framework

Before we attack, understand how defenders think, because we'll mirror it. The industry standard is the **NIST Cybersecurity Framework** (National Institute of Standards and Technology), built around five phases. The easiest way to hold them is the **house analogy** — **click each phase**:

<div class="nist-strip" markdown="1">

<div id="nist-node-1" class="nist-phase" style="background:#2aa0e0" onclick="nistShow(1)" role="button" tabindex="0" aria-label="Identify" markdown="1">

Identify<span class="small">know your assets</span>

</div>

<div id="nist-node-2" class="nist-phase" style="background:#f59e0b" onclick="nistShow(2)" role="button" tabindex="0" aria-label="Protect" markdown="1">

Protect<span class="small">build the walls</span>

</div>

<div id="nist-node-3" class="nist-phase" style="background:#0C447C" onclick="nistShow(3)" role="button" tabindex="0" aria-label="Detect" markdown="1">

Detect<span class="small">watch for intruders</span>

</div>

<div id="nist-node-4" class="nist-phase" style="background:#c0392b" onclick="nistShow(4)" role="button" tabindex="0" aria-label="Respond" markdown="1">

Respond<span class="small">contain & act</span>

</div>

<div id="nist-node-5" class="nist-phase" style="background:#2e9e5b" onclick="nistShow(5)" role="button" tabindex="0" aria-label="Recover" markdown="1">

Recover<span class="small">restore to normal</span>

</div>

</div>

↑ **Click a phase** — each maps the house analogy to real company tech

<div id="nist-panel-1" class="nist-panel" markdown="1">

#### 🔎 Identify

Figure out what's valuable and worth protecting — you can't protect what you don't know you have.

**At home:** the jewelry, the deed.  **In a company:** asset inventory, data classification.

</div>

<div id="nist-panel-2" class="nist-panel" markdown="1">

#### 🔒 Protect

Put controls in place to keep attackers out.

**At home:** a safe, a locked room, locking the house.  **In a company:** firewalls, antivirus, patching, MFA.

</div>

<div id="nist-panel-3" class="nist-panel" markdown="1">

#### 👁️ Detect

Because protection eventually fails, watch for anything anomalous.

**At home:** cameras.  **In a company:** IDS/IPS, log monitoring, a SIEM & SOC.

</div>

<div id="nist-panel-4" class="nist-panel" markdown="1">

#### 🚨 Respond

Act the moment something is caught — contain it and push the attacker out.

**At home:** call the security company or police.  **In a company:** auto-quarantine a host, alert a SOC analyst, forensics.

</div>

<div id="nist-panel-5" class="nist-panel" markdown="1">

#### ♻️ Recover

Get back to a normal operating state.

**At home:** replace what was taken.  **In a company:** restore from backups, harden against a repeat.

</div>

Most security products you'll ever hear of are really just a solution for one of these five phases.

<div class="admonition note" markdown="1">

A sixth function in CSF 2.0

The 2024 update (**CSF 2.0**) adds a sixth function, **Govern** — the policy, roles, and risk decisions that wrap the other five. We focus on the **operational five** above, since those are what attacks actually touch; just know that in current NIST material you'll see six.

</div>

## 4. The attacker's playbook — the kill chain (*land and expand*)

The attacker's version of that lifecycle is the **kill chain**, and it has a simple shape: **land, then expand.** First they **land** — reconnaissance to study the target, then exploitation to get a foothold on one machine. That first machine is rarely the goal, so they **expand** — escalate privileges, move laterally to the next machine, establish persistence — until they reach something of high value and exfiltrate it.

We'll track this all term. Most of Weeks 2–11 live on one of these phases (Week 10, cryptography, is the exception — it's a cross-cutting data-protection topic, not a phase). **Click a phase** to see what it covers.

<div class="admonition note" markdown="1">

One track runs parallel to this

**Social Engineering & the Identity Layer (Week 11)** is deliberately *off* this diagram. Social engineering doesn't exploit a machine; it manipulates a person so the attacker can **log in, not hack in**. It's a parallel track we close the course on.

</div>

<div class="killchain" markdown="1">

<svg viewBox="0 0 860 150" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:860px;height:auto;" role="img" aria-label="Five-phase ethical hacking kill chain">
  <defs>
    <marker id="kc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa0a6"/>
    </marker>
  </defs>
  <rect class="kc-phase" id="kc-rect-1" x="10" y="35" width="150" height="80" rx="8" fill="#E6F1FB" stroke="#0C447C" stroke-width="1" onclick="khShow(1)"/>
  <text x="85" y="70" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#0C447C" pointer-events="none">1 · Reconnaissance</text>
  <text x="85" y="90" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#0C447C" pointer-events="none">Profile the target</text>
  <line x1="162" y1="75" x2="176" y2="75" stroke="#9aa0a6" stroke-width="1.2" marker-end="url(#kc-arrow)"/>
  <rect class="kc-phase" id="kc-rect-2" x="178" y="35" width="150" height="80" rx="8" fill="#E6F1FB" stroke="#0C447C" stroke-width="1" onclick="khShow(2)"/>
  <text x="253" y="70" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#0C447C" pointer-events="none">2 · Scanning</text>
  <text x="253" y="90" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#0C447C" pointer-events="none">Find what's reachable</text>
  <line x1="330" y1="75" x2="344" y2="75" stroke="#9aa0a6" stroke-width="1.2" marker-end="url(#kc-arrow)"/>
  <rect class="kc-phase" id="kc-rect-3" x="346" y="35" width="150" height="80" rx="8" fill="#FAEEDA" stroke="#854F0B" stroke-width="1" onclick="khShow(3)"/>
  <text x="421" y="70" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#854F0B" pointer-events="none">3 · Gaining Access</text>
  <text x="421" y="90" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#854F0B" pointer-events="none">Exploit &amp; foothold</text>
  <line x1="498" y1="75" x2="512" y2="75" stroke="#9aa0a6" stroke-width="1.2" marker-end="url(#kc-arrow)"/>
  <rect class="kc-phase" id="kc-rect-4" x="514" y="35" width="150" height="80" rx="8" fill="#FAEEDA" stroke="#854F0B" stroke-width="1" onclick="khShow(4)"/>
  <text x="589" y="70" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#854F0B" pointer-events="none">4 · Maintaining</text>
  <text x="589" y="90" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#854F0B" pointer-events="none">Persistence &amp; C2</text>
  <line x1="666" y1="75" x2="680" y2="75" stroke="#9aa0a6" stroke-width="1.2" marker-end="url(#kc-arrow)"/>
  <rect class="kc-phase" id="kc-rect-5" x="682" y="35" width="150" height="80" rx="8" fill="#FCEBEB" stroke="#791F1F" stroke-width="1" onclick="khShow(5)"/>
  <text x="757" y="70" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="13" fill="#791F1F" pointer-events="none">5 · Covering Tracks</text>
  <text x="757" y="90" text-anchor="middle" font-family="sans-serif" font-size="10.5" fill="#791F1F" pointer-events="none">Evade &amp; clean up</text>
</svg>

↑ **Click any phase** to see what it covers

<div id="kc-panel-1" class="kc-panel" markdown="1">

#### 1 · Reconnaissance <span style="font-weight:400;color:#6b7280;">— LAND</span>

Gather information about the target without (or before) touching it directly: footprinting, OSINT, WHOIS, and DNS. The output is a target profile that drives everything else.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 2 · **ATT&CK tactic:** Reconnaissance (TA0043)

</div>

</div>

<div id="kc-panel-2" class="kc-panel" markdown="1">

#### 2 · Scanning & Enumeration <span style="font-weight:400;color:#6b7280;">— LAND</span>

Actively probe the target to find live hosts, open ports, services, and versions — then enumerate those services for users, shares, and configuration.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 3 (and network sniffing, Week 4) · **ATT&CK technique:** Active Scanning (T1595, under Reconnaissance) — external scanning is pre-compromise; the *Discovery* tactic (TA0007) is its internal, post-foothold cousin

</div>

</div>

<div id="kc-panel-3" class="kc-panel" markdown="1">

#### 3 · Gaining Access <span style="font-weight:400;color:#6b7280;">— LAND → EXPAND</span>

Exploit a vulnerability to get code execution — on a system, a web app, a wireless network, or a person. This is the foothold, and where **privilege escalation** and **lateral movement** begin.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 5 (wireless), Week 6 (systems), Weeks 8–9 (web) · **ATT&CK tactics:** Initial Access (TA0001), Execution (TA0002)

</div>

</div>

<div id="kc-panel-4" class="kc-panel" markdown="1">

#### 4 · Maintaining Access <span style="font-weight:400;color:#6b7280;">— EXPAND</span>

Keep the foothold alive and reach for the crown jewels: backdoors, trojans/RATs, command-and-control, and exfiltration. Also where denial-of-service and session hijacking live.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 7 · **ATT&CK tactics:** Persistence (TA0003), Command & Control (TA0011)

</div>

</div>

<div id="kc-panel-5" class="kc-panel" markdown="1">

#### 5 · Covering Tracks <span style="font-weight:400;color:#6b7280;">— EXPAND</span>

Evade detection and hide the intrusion — log tampering, timestomping, and anti-forensics. For the defender, this is where good logging and a pen-test report matter most.

<div class="kc-weeks" markdown="1">

**Covered in:** folded into the full engagement (Week 12) rather than taught as its own week · **ATT&CK tactic:** Defense Evasion (TA0005)

</div>

</div>

</div>

### One attack, four ways to name it

The attacker loop is simple: **reconnaissance** to study the target, then **land** — exploitation to get a foothold — then **expand** — escalate, move, and persist to reach the prize. The course itself is organized by the **CEH five phases**, and two named industry models — Lockheed Martin's **Cyber Kill Chain** and **MITRE ATT&CK** — describe the same sequence. Here's how they line up:

<div style="overflow-x:auto;margin:20px 0;" markdown="1">

<svg viewBox="0 0 910 294" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:910px;height:auto;display:block;font-family:sans-serif;" role="img" aria-label="The lecture&apos;s land-and-expand attacker loop, mapped to the CEH course structure, the Lockheed Cyber Kill Chain, and MITRE ATT&amp;CK.">
<line x1="211.0" y1="106" x2="211.0" y2="286" stroke="#d9dee5" stroke-width="1"/>
<line x1="365.0" y1="106" x2="365.0" y2="286" stroke="#d9dee5" stroke-width="1"/>
<line x1="519.0" y1="106" x2="519.0" y2="286" stroke="#d9dee5" stroke-width="1"/>
<line x1="673.0" y1="106" x2="673.0" y2="286" stroke="#d9dee5" stroke-width="1"/>
<line x1="827.0" y1="106" x2="827.0" y2="286" stroke="#d9dee5" stroke-width="1"/>
<text x="8" y="24.0" font-size="11" font-weight="800" fill="#7a2f22">Attacker loop</text>
<text x="8" y="38.0" font-size="9.2" fill="#6b7280">the intuition</text>
<text x="8" y="79.0" font-size="11" font-weight="800" fill="#0e6b82">CEH</text>
<text x="8" y="93.0" font-size="9.2" fill="#6b7280">course structure</text>
<text x="8" y="137.0" font-size="11" font-weight="800" fill="#0C447C">Cyber Kill Chain</text>
<text x="8" y="151.0" font-size="9.2" fill="#6b7280">Lockheed Martin</text>
<text x="8" y="225.0" font-size="11" font-weight="800" fill="#7a4a0b">MITRE ATT&amp;CK</text>
<text x="8" y="239.0" font-size="9.2" fill="#6b7280">tactics / techniques</text>
<rect x="138" y="10" width="300" height="34" rx="9" fill="none" stroke="#c2ccd8" stroke-width="1.5" stroke-dasharray="4 3"/>
<text x="288" y="31.0" text-anchor="middle" font-size="10.5" font-weight="600" fill="#64748b">reconnaissance &middot; before the foothold</text>
<rect x="446" y="10" width="146" height="34" rx="17" fill="#2b6cb0"/>
<text x="519" y="32.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff" letter-spacing="1">LAND</text>
<text x="596" y="33.0" text-anchor="middle" font-size="16" font-weight="800" fill="#9aa3af">&#8250;</text>
<rect x="600" y="10" width="146" height="34" rx="17" fill="#c0453a"/>
<text x="673" y="32.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff" letter-spacing="1">EXPAND</text>
<rect x="754" y="10" width="146" height="34" rx="9" fill="none" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4 3"/>
<text x="827" y="31.0" text-anchor="middle" font-size="10" font-style="italic" fill="#94a3b8">not in the loop</text>
<rect x="138" y="58" width="146" height="48" rx="9" fill="#0e6b82" stroke="#0a5666" stroke-width="1"/>
<text x="211.0" y="87.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">1 · Reconnaissance</text>
<rect x="138" y="114" width="146" height="52" rx="9" fill="#eaf2fb" stroke="#b6cfe8" stroke-width="1"/>
<text x="211.0" y="136.0" text-anchor="middle" font-size="11" font-weight="600" fill="#0C447C">Reconnaissance</text>
<text x="211.0" y="151.0" text-anchor="middle" font-size="11" font-weight="600" fill="#0C447C">Weaponization</text>
<rect x="138" y="174" width="146" height="108" rx="9" fill="#fdf1df" stroke="#e6c99a" stroke-width="1"/>
<text x="211.0" y="222.6" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Reconnaissance (TA0043)</text>
<text x="211.0" y="237.6" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Resource Dev. (TA0042)</text>
<rect x="292" y="58" width="146" height="48" rx="9" fill="#0e6b82" stroke="#0a5666" stroke-width="1"/>
<text x="365.0" y="79.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">2 · Scanning &amp;</text>
<text x="365.0" y="95.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">Enumeration</text>
<rect x="292" y="114" width="146" height="52" rx="9" fill="#f1f4f8" stroke="#d7dee8" stroke-width="1"/>
<text x="365.0" y="143.0" text-anchor="middle" font-size="10.5" font-weight="500" fill="#9aa3af">(no direct stage)</text>
<rect x="292" y="174" width="146" height="108" rx="9" fill="#fdf1df" stroke="#e6c99a" stroke-width="1"/>
<text x="365.0" y="230.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Active Scanning (T1595)</text>
<rect x="446" y="58" width="146" height="48" rx="9" fill="#0e6b82" stroke="#0a5666" stroke-width="1"/>
<text x="519.0" y="87.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">3 · Gaining Access</text>
<rect x="446" y="114" width="146" height="52" rx="9" fill="#eaf2fb" stroke="#b6cfe8" stroke-width="1"/>
<text x="519.0" y="128.5" text-anchor="middle" font-size="11" font-weight="600" fill="#0C447C">Delivery</text>
<text x="519.0" y="143.5" text-anchor="middle" font-size="11" font-weight="600" fill="#0C447C">Exploitation</text>
<text x="519.0" y="158.5" text-anchor="middle" font-size="11" font-weight="600" fill="#0C447C">Installation</text>
<rect x="446" y="174" width="146" height="108" rx="9" fill="#fdf1df" stroke="#e6c99a" stroke-width="1"/>
<text x="519.0" y="215.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Initial Access (TA0001)</text>
<text x="519.0" y="230.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Execution (TA0002)</text>
<text x="519.0" y="245.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Priv. Escalation (TA0004)</text>
<rect x="600" y="58" width="146" height="48" rx="9" fill="#0e6b82" stroke="#0a5666" stroke-width="1"/>
<text x="673.0" y="79.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">4 · Maintaining</text>
<text x="673.0" y="95.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">Access</text>
<rect x="600" y="114" width="146" height="52" rx="9" fill="#eaf2fb" stroke="#b6cfe8" stroke-width="1"/>
<text x="673.0" y="136.0" text-anchor="middle" font-size="11" font-weight="600" fill="#0C447C">Command &amp; Control</text>
<text x="673.0" y="151.0" text-anchor="middle" font-size="11" font-weight="600" fill="#0C447C">Actions on Objectives</text>
<rect x="600" y="174" width="146" height="108" rx="9" fill="#fdf1df" stroke="#e6c99a" stroke-width="1"/>
<text x="673.0" y="200.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Persistence (TA0003)</text>
<text x="673.0" y="215.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Lateral Move. (TA0008)</text>
<text x="673.0" y="230.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Command &amp; Control (TA0011)</text>
<text x="673.0" y="245.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Exfiltration (TA0010)</text>
<text x="673.0" y="260.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Impact (TA0040)</text>
<rect x="754" y="58" width="146" height="48" rx="9" fill="#0e6b82" stroke="#0a5666" stroke-width="1"/>
<text x="827.0" y="87.0" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">5 · Covering Tracks</text>
<rect x="754" y="114" width="146" height="52" rx="9" fill="#f1f4f8" stroke="#d7dee8" stroke-width="1"/>
<text x="827.0" y="143.0" text-anchor="middle" font-size="10.5" font-weight="500" fill="#9aa3af">(no direct stage)</text>
<rect x="754" y="174" width="146" height="108" rx="9" fill="#fdf1df" stroke="#e6c99a" stroke-width="1"/>
<text x="827.0" y="230.1" text-anchor="middle" font-size="9.6" font-weight="500" fill="#7a4a0b">Defense Evasion (TA0005)</text>
</svg>

</div>

<span class="small">In the attacker loop, **recon** comes first (studying the target); **land** is getting a foothold — CEH’s *Gaining Access*; and **expand** is the whole post-exploitation loop — CEH’s *Maintaining Access*. *Covering Tracks* isn’t part of the loop. The **CEH row is how the course is structured** (one phase per week); Lockheed and ATT&CK are the industry references, and the fit isn’t perfectly one-to-one.</span>

## 5. Enterprise architecture — what we're attacking

So what do those attacks target? Picture a bank. Employees use **client machines** (laptops) to reach **applications on servers**, tied together by **networking equipment** (routers, switches). To keep the internet's "bad stuff" out, the network is walled off by **security equipment** — **firewalls**, and **IDS/IPS** (intrusion detection/prevention) watching for anomalies. That boundary is the **network perimeter**.

Customers still need in, so external traffic first lands in the **DMZ** (demilitarized zone), where a **web server** takes the request (and **secure web** and **email gateways** scan incoming traffic for malware). Only valid requests pass deeper, to the **application servers**, and only they may reach the **database servers**, where the data lives — a **three-tier** architecture on separate subnets, separated by **internal firewalls** too. Think of a neighborhood: gates on the streets *and* gates on each house.

<div class="admonition note" markdown="1">

The castle-and-moat — and its flaw

This is the **castle-and-moat** model: a strong wall (firewall) and a moat separate inside from outside, with a guarded drawbridge (the VPN and gateways) as the only sanctioned way across, protecting the crown jewels in the data center. Its weakness: **once you're past the wall, you can often roam freely** — internal machines trust each other. That flat internal trust is exactly what "expand" exploits.

</div>

## 6. Defense in depth — the layers

Because one wall is never enough, defenders build **layers** — *defense in depth* — with protective controls at every level:

<div style="max-width:520px;margin:20px auto;" markdown="1">

<svg viewBox="0 0 560 480" role="img" aria-label="Interactive defense-in-depth layers — click a ring." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;font-family:'Syne',system-ui,sans-serif;">
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

↑ **Click a layer** to see its controls and which weeks attack it

</div>

<div id="dil-panel-1" class="dil-panel" markdown="1">

#### 🌐 Network — the perimeter

Controls what traffic is even allowed onto the network: **firewalls, IDS/IPS, the DMZ,** and network segmentation.

**We attack it in:** [Recon (W2)](reconnaissance-footprinting.html) · [Scanning (W3)](scanning-enumeration.html) · [Network Hacking & Sniffing (W4)](network-hacking-sniffing.html) · [Wireless (W10)](wireless-hacking.html)

</div>

<div id="dil-panel-2" class="dil-panel" markdown="1">

#### 💻 Device — the endpoints

Hardening the machines themselves: **OS patching, antivirus/EDR, disk encryption,** and host-level firewalls.

**We attack it in:** [System Attacks (W6)](system-attacks.html) · [Malware, Trojans & DoS (W7)](malware-trojans-dos.html)

</div>

<div id="dil-panel-3" class="dil-panel" markdown="1">

#### ⚙️ Application — the software

Writing code that isn't exploitable: **secure coding, authentication & authorization,** and web application firewalls (WAF).

**We attack it in:** [Web Attacks I (W8)](web-attacks-servers-apps.html) · [Web Attacks II — SQLi (W9)](web-attacks-sqli-session.html)

</div>

<div id="dil-panel-4" class="dil-panel" markdown="1">

#### 🗄️ Data — the information

Protecting the data itself: **encryption, backups,** and tight access control. This is what attackers ultimately want.

**We attack it in:** [Cryptography (W5)](cryptography.html)

</div>

<div id="dil-panel-5" class="dil-panel" markdown="1">

#### 🪪 Identity — the core

*Who* is allowed to log in and *what* they can do — MFA, IAM, least privilege. Break identity and you don't hack in, you **log in**.

**We attack it in:** [Social Engineering & the Identity Layer (W12)](social-engineering-identity.html)

</div>

Each ring is a wall; if one fails, the next still stands.

## 7. The whole course on one map

For the next twelve weeks **we play the attacker**, walking the kill chain against each layer — and on every technique we also flip to the **Defender's view**. Here's where each week lives:

| Layer                   | What we attack it with                                                                                                                                                                            |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Network**             | [Recon](reconnaissance-footprinting.html) · [Scanning & Enumeration](scanning-enumeration.html) · [Network Hacking & Sniffing](network-hacking-sniffing.html) · [Wireless](wireless-hacking.html) |
| **Device**              | [System Attacks](system-attacks.html) · [Malware, Trojans & DoS](malware-trojans-dos.html)                                                                                                        |
| **Application**         | [Web Attacks I](web-attacks-servers-apps.html) · [Web Attacks II — SQLi](web-attacks-sqli-session.html)                                                                                           |
| **Data**                | [Cryptography](cryptography.html)                                                                                                                                                                 |
| **Identity**            | [Social Engineering & the Identity Layer](social-engineering-identity.html)                                                                                                                       |
| **The full engagement** | [Penetration Testing](penetration-testing.html) — land & expand, end to end                                                                                                                       |

## 8. What makes it *ethical* — law & authorization

Everything above is the same skill a criminal uses. The **only** thing separating an ethical hacker from a criminal is **authorization** — written permission to test. Companies pay people to attack their own systems precisely because you can't defend what you don't understand; that's **penetration testing**.

The "hats" describe **intent and authorization, not skill**:

- **White hat** — authorized, works to improve security (this course).
- **Black hat** — unauthorized, for personal gain or harm.
- **Grey hat** — in between; may probe without permission but disclose findings. Legally still exposed.

Before any testing, a professional engagement establishes a **signed scope** (exactly what's in and out of bounds), **rules of engagement** (allowed techniques, testing windows, emergency contacts), and **written authorization** — a signed "get out of jail" letter from someone with the authority to grant it, often with an NDA.

In the U.S. the governing law is the **Computer Fraud and Abuse Act (CFAA)**; unauthorized access is a federal crime, and "I had good intentions" is **not** a defense — **authorization is**. When anything is unclear, stop and confirm scope before you touch a thing.

<div class="admonition note" markdown="1">

Real-world context — authorization is not optional

In 2019, two professional penetration testers from **Coalfire** were **arrested and jailed** while physically testing an Iowa courthouse — even though they had a signed contract from the state judicial branch. The scope had been miscommunicated between the state and the *county* that actually owned the building. The lesson: a signed contract isn't enough if the *right* person didn't authorize the *specific* target. Scope and authorization are the difference between a paycheck and handcuffs.

</div>

## 9. ATT&CK — the shared vocabulary

Throughout the course each week is tagged with the **MITRE ATT&CK** techniques it covers — the same IDs used by every SOC and threat-intel team in industry. You'll see a tag strip near the top of each page:

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/tactics/TA0043/" class="attck-tag" target="_blank">TA0043 Recon</a> <a href="https://attack.mitre.org/tactics/TA0007/" class="attck-tag" target="_blank">TA0007 Discovery</a> <a href="https://attack.mitre.org/tactics/TA0001/" class="attck-tag" target="_blank">TA0001 Initial Access</a>

</div>

Clicking a tag opens its definition on the MITRE ATT&CK site.

## 10. The Defender's view

Every attack leaves a trace. On each week's page you'll find a blue **Defender's view** panel showing how that week's technique looks from the SOC seat — the logs, signatures, or telemetry that reveal it, and the one control that best stops it:

<div class="admonition defender" markdown="1">

Defender's view — example

Reconnaissance is noisy but easy to dismiss as background internet traffic. A defender watches for **directionality and pattern**: a single source touching many ports or many URLs in seconds, often with a scanner user-agent. The best control isn't detection — it's **reducing what's exposed** in the first place.

</div>

## References

- **Maurushat, *Ethical Hacking*** (uOttawa, open access) — Introduction + Ch. 1. [Publisher](https://press.uottawa.ca/en/9780776627946/ethical-hacking/) · [PDF](https://library.oapen.org/bitstream/id/ab438eb4-5f5d-4509-8c0b-f6c57f271e84/9780776627922.pdf)
- **NIST SP 800-115** §1–2 (security testing overview). [Free PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf)
- **NIST Cybersecurity Framework (CSF)** — Identify · Protect · Detect · Respond · Recover. [nist.gov/cyberframework](https://www.nist.gov/cyberframework)
- **MITRE ATT&CK** — the framework we'll use all term. [attack.mitre.org](https://attack.mitre.org/)
