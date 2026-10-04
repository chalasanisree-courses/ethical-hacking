---
title: Week 7 · Network Defense Evasion & DoS
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 7 · Network Defense Evasion & DoS

<span class="kc-badge">🧭 CEH life cycle · Gaining Access — getting past the network defenses</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1190/" class="attck-tag" target="_blank">T1190 Exploit Public-Facing Application</a> <a href="https://attack.mitre.org/techniques/T1059/" class="attck-tag" target="_blank">T1059 Command & Scripting Interpreter</a> <a href="https://attack.mitre.org/techniques/T1041/" class="attck-tag" target="_blank">T1041 Exfiltration Over C2 Channel</a> <a href="https://attack.mitre.org/techniques/T1498/" class="attck-tag" target="_blank">T1498 Network Denial of Service</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- **The enterprise network we're attacking** — the perimeter, the DMZ, and the three-tier architecture behind it
- **The firewall** — what it checks, and the two gaps that let everything else in
- **One attack, start to finish** — exploit in the payload (ShellShock) → reverse shell → lateral movement → exfiltration
- **The defenses that answer each gap** — IDS/IPS, the NGFW, host firewalls & segmentation, honeypots, the WAF — and, when nothing works, denial of service

</div>

For the last few modules we've been working our way *toward* a company's network — mapping it, scanning it, sniffing it. The goal the whole time has been the same: get **into** the enterprise network. Until now we tried the **quiet way** — find a credential on the wire and log in like a regular employee, tripping no alarms. This week we assume that option is gone, so we do it the **loud way**: we go straight *through* the network's defenses.

## The network we're breaking into

A company keeps its valuable data — customer records, credit-card data — on **database servers** deep inside. In front of those sit **application servers** running the code, and in front of *those* sit the **web servers** that the public actually talks to. That's the classic **three-tier architecture**: presentation (web), application, and data.

The public has to reach the web servers — a retail site is no use if customers can't load it — so those web servers sit in a **DMZ** (demilitarized zone), a buffer between the open internet and the trusted internal network. A **strong perimeter** of firewalls and intrusion systems separates the internet (full of attackers like us) from everything inside.

<svg viewBox="0 0 760 248" role="img" aria-label="The enterprise network. On the left, the internet, full of attackers. A network firewall sits on the perimeter. Behind it, inside a dashed enterprise boundary, a DMZ holds the public web server; behind the web server an application server; behind that the database server holding valuable data. Traffic flows inward from web to app to database." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:720px;height:auto;display:block;margin:20px auto;font-family:system-ui,sans-serif;">
  <text x="52" y="30" text-anchor="middle" font-size="11" font-weight="700" fill="#c0392b" letter-spacing="0.5">INTERNET</text>
  <text x="52" y="45" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity="0.7">attackers</text>
  <circle cx="52" cy="92" r="26" fill="none" stroke="#c0392b" stroke-width="1.6"/>
  <text x="52" y="97" text-anchor="middle" font-size="18">🌐</text>
  <line x1="80" y1="92" x2="120" y2="92" stroke="currentColor" stroke-opacity="0.55" stroke-width="2" marker-end="url(#ea)"/>
  <rect x="122" y="66" width="52" height="52" rx="5" fill="none" stroke="#0e6b82" stroke-width="2"/>
  <text x="148" y="88" text-anchor="middle" font-size="16">🧱</text>
  <text x="148" y="106" text-anchor="middle" font-size="8.5" font-weight="700" fill="#0e6b82">FIREWALL</text>
  <text x="148" y="135" text-anchor="middle" font-size="8.5" fill="currentColor" fill-opacity="0.65">perimeter</text>
  <rect x="196" y="20" width="548" height="208" rx="10" fill="none" stroke="currentColor" stroke-opacity="0.4" stroke-dasharray="5 4"/>
  <text x="210" y="38" font-size="9.5" font-weight="700" fill="currentColor" fill-opacity="0.6" letter-spacing="0.5">ENTERPRISE NETWORK</text>
  <rect x="210" y="52" width="150" height="150" rx="8" fill="#0e6b82" fill-opacity="0.06" stroke="#0e6b82" stroke-opacity="0.5" stroke-dasharray="4 3"/>
  <text x="285" y="70" text-anchor="middle" font-size="9" font-weight="700" fill="#0e6b82" letter-spacing="0.5">DMZ</text>
  <rect x="245" y="86" width="80" height="80" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.55"/>
  <text x="285" y="120" text-anchor="middle" font-size="22">🖥️</text>
  <text x="285" y="142" text-anchor="middle" font-size="9.5" font-weight="700" fill="currentColor">Web server</text>
  <text x="285" y="156" text-anchor="middle" font-size="8" fill="currentColor" fill-opacity="0.6">presentation</text>
  <line x1="362" y1="127" x2="406" y2="127" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" marker-end="url(#ea)"/>
  <rect x="408" y="86" width="120" height="80" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.55"/>
  <text x="468" y="120" text-anchor="middle" font-size="22">⚙️</text>
  <text x="468" y="142" text-anchor="middle" font-size="9.5" font-weight="700" fill="currentColor">App server</text>
  <text x="468" y="156" text-anchor="middle" font-size="8" fill="currentColor" fill-opacity="0.6">application</text>
  <line x1="530" y1="127" x2="574" y2="127" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" marker-end="url(#ea)"/>
  <rect x="576" y="86" width="150" height="80" rx="6" fill="#B45309" fill-opacity="0.06" stroke="#B45309" stroke-opacity="0.6"/>
  <text x="651" y="120" text-anchor="middle" font-size="22">🗄️</text>
  <text x="651" y="142" text-anchor="middle" font-size="9.5" font-weight="700" fill="#B45309">Database</text>
  <text x="651" y="156" text-anchor="middle" font-size="8" fill="currentColor" fill-opacity="0.6">valuable data · the goal</text>
  <defs><marker id="ea" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor" fill-opacity="0.6"/></marker></defs>
</svg>

Our goal is all the way on the right — reach a database and get its data back out. Between us and that data sits a **stack of defenses**, and the thread for the whole week is this: *each one was added to cover a weakness in the one before it.*

<div class="cards" markdown="1">

<div class="card" markdown="1">

### 🧱 Firewall

The front gate. Checks every packet's **header** against rules and allows, drops, or rejects it.

</div>

<div class="card" markdown="1">

### 📹 IDS / IPS

Watch the traffic — **including inside** the network — for attacks. The IDS alerts; the IPS also acts.

</div>

<div class="card" markdown="1">

### 🧱➕ NGFW · host FW · honeypots

A firewall that finally reads the **payload**, a lock on **every machine**, and **traps** for the curious.

</div>

<div class="card" markdown="1">

### 🌀 WAF → DDoS

Guard the **app** itself; and when you can't get in at all, **overwhelm** it instead.

</div>

</div>

## Defense 1 — the network firewall

The first thing in our way is the **network firewall**. It scans every packet, matches it against a set of rules, and then **allows**, **drops**, or **rejects** it — reading only the **header**.

A packet has two parts. The **TCP/IP header** is the envelope: source and destination IP, source and destination port, and the protocol. The **payload** is the contents — here, the whole HTTP request. The firewall reads the header and *nothing else*.

<svg viewBox="0 0 720 250" role="img" aria-label="An abstracted packet. The TCP/IP header holds source IP, destination IP, source port, destination port 80, and protocol TCP — this is all the firewall reads. The payload holds the full HTTP request, including the HTTP headers Host, User-Agent, and Cookie. The firewall never opens the payload, so the HTTP headers inside it are invisible to the firewall even though they are also called headers." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:680px;height:auto;display:block;margin:18px auto;font-family:system-ui,sans-serif;">
  <text x="172" y="38" text-anchor="end" font-size="12.5" font-weight="700" fill="#0e6b82">Firewall reads this</text>
  <text x="172" y="55" text-anchor="end" font-size="10.5" fill="currentColor" fill-opacity="0.7">IP · port · protocol</text>
  <line x1="176" y1="47" x2="187" y2="47" stroke="#0e6b82" stroke-width="2" marker-end="url(#fka)"/>
  <text x="172" y="150" text-anchor="end" font-size="12.5" font-weight="700" fill="#B45309">Firewall never</text>
  <text x="172" y="167" text-anchor="end" font-size="12.5" font-weight="700" fill="#B45309">opens this</text>
  <line x1="176" y1="140" x2="187" y2="140" stroke="#B45309" stroke-width="2" marker-end="url(#fkb)"/>
  <text x="192" y="22" font-size="9.5" font-weight="700" fill="#0e6b82" letter-spacing="1">TCP/IP HEADER</text>
  <rect x="190" y="28" width="90" height="52" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="235" y="46" text-anchor="middle" font-size="8.5" fill="currentColor" fill-opacity="0.6">Src IP</text>
  <text x="235" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">7.7.7.7</text>
  <rect x="284" y="28" width="90" height="52" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="329" y="46" text-anchor="middle" font-size="8.5" fill="currentColor" fill-opacity="0.6">Dst IP</text>
  <text x="329" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">web-srv</text>
  <rect x="378" y="28" width="90" height="52" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="423" y="46" text-anchor="middle" font-size="8.5" fill="currentColor" fill-opacity="0.6">Src Port</text>
  <text x="423" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">51000</text>
  <rect x="472" y="27" width="90" height="54" rx="4" fill="none" stroke="#0e6b82" stroke-width="2"/>
  <text x="517" y="46" text-anchor="middle" font-size="8.5" fill="#0e6b82">Dst Port</text>
  <text x="517" y="67" text-anchor="middle" font-size="13" font-weight="800" fill="#0e6b82">80</text>
  <rect x="566" y="28" width="90" height="52" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="611" y="46" text-anchor="middle" font-size="8.5" fill="currentColor" fill-opacity="0.6">Protocol</text>
  <text x="611" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">TCP</text>
  <text x="192" y="103" font-size="9.5" font-weight="700" fill="#B45309" letter-spacing="1">PAYLOAD — the full HTTP request</text>
  <rect x="190" y="110" width="466" height="92" rx="4" fill="#B45309" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.35"/>
  <text x="206" y="132" font-size="12" font-family="Consolas,Menlo,monospace" fill="currentColor">GET /products?id=42 HTTP/1.1</text>
  <text x="206" y="152" font-size="12" font-family="Consolas,Menlo,monospace" fill="currentColor">Host: www.campus.edu</text>
  <text x="206" y="172" font-size="12" font-family="Consolas,Menlo,monospace" fill="currentColor">User-Agent: Mozilla/5.0</text>
  <text x="206" y="192" font-size="12" font-family="Consolas,Menlo,monospace" fill="currentColor">Cookie: session=abc123</text>
  <text x="360" y="228" text-anchor="middle" font-size="10.5" font-style="italic" fill="currentColor" fill-opacity="0.8">Watch the two "headers": the HTTP headers (Host, User-Agent, Cookie) live inside the payload — not the TCP/IP header.</text>
  <defs>
    <marker id="fka" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0e6b82"/></marker>
    <marker id="fkb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#B45309"/></marker>
  </defs>
</svg>

<div class="admonition note" markdown="1">

⚠️ Two things both called "header"

The **TCP/IP header** (IP, port, protocol) is what the firewall reads. The **HTTP headers** — `Host`, `User-Agent`, `Cookie` — are part of the HTTP request, which lives *inside the payload*. Same word, two different layers. The firewall sees the first and never the second. Hold onto this — it's the whole trick behind ShellShock in a moment.

</div>

**How it decides.** It's simple rule-matching against the header — *allow port 80, block port 22*. When it says no, it can **drop** the packet silently (stealthy — the sender learns nothing) or **reject** it with a refusal message (which reveals that a firewall is even there). Most firewalls are set to **drop silently**, and to **default-deny**: block everything unless a rule explicitly allows it.

> You already saw this from the other side in the **scanning** module: an nmap port came back **open**, **closed**, or **filtered** — and *filtered* is exactly a firewall silently dropping the probe.

### The two problems with a header-only firewall

<div class="role-red" markdown="1">

**Problem 1 · Some ports must stay open.** A public web server in the DMZ needs ports **80** and **443** reachable, or customers can't use the site — so the firewall has to leave those doors open to the *entire* internet, not just trusted users.

**Problem 2 · It only reads the header.** It checks *where* a packet is going, not *what it carries*. A packet addressed to the open web-server port is allowed — **even if its payload contains an exploit** for a bug on that server.

**Put them together** and you have the attack: send traffic the firewall is happy to allow — to an open port — and hide the attack *inside the payload it never looks at.*

</div>

## One attack, start to finish

Here's how that plays out, step by step. Click through the chain:

<div class="scan-strip" markdown="1">

<div id="scan-node-1" class="scan-phase" onclick="scanShow(1)" role="button" tabindex="0" style="background:#c0392b" markdown="1">

<span class="num">STEP ①</span>Exploit in the payload<small>ShellShock → code execution</small>

</div>

<div id="scan-node-2" class="scan-phase" onclick="scanShow(2)" role="button" tabindex="0" style="background:#B45309" markdown="1">

<span class="num">STEP ②</span>Reverse shell<small>make the server dial out</small>

</div>

<div id="scan-node-3" class="scan-phase" onclick="scanShow(3)" role="button" tabindex="0" style="background:#0e6b82" markdown="1">

<span class="num">STEP ③</span>Lateral movement<small>hop toward the data</small>

</div>

<div id="scan-node-4" class="scan-phase" onclick="scanShow(4)" role="button" tabindex="0" style="background:#223350" markdown="1">

<span class="num">STEP ④</span>Exfiltration<small>send the data out</small>

</div>

</div>

<div id="scan-panel-1" class="scan-panel active" markdown="1">

**ShellShock — the exploit rides in the payload.** A real vulnerability from 2014. The attacker sends a normal-looking HTTP request to the web server on **port 80** — the firewall sees the right port and passes it. But look at the `User-Agent`, which is an **HTTP header** and therefore *payload* to the firewall:

`User-Agent: () { :; }; /bin/cat /etc/passwd`

The web server runs a CGI script, and CGI copies incoming HTTP headers into **environment variables** handed to **Bash**. On a vulnerable Bash, the leading `() { :; };` tricks the shell into running the command that follows. So the trailing command executes on the server — **remote code execution**, as the web-server user. Here it reads `/etc/passwd` and the file comes back in the web response, *proving* the attacker can run arbitrary commands.

</div>

<div id="scan-panel-2" class="scan-panel" markdown="1">

**The reverse shell — make the server dial out.** Code execution that fires once per request isn't enough; the attacker wants a channel back in **whenever they like**. So the exploit runs one more command that opens a connection **outbound**, from the compromised web server to the attacker's own server on the internet.

Why outbound? Because firewalls scrutinize connections coming **in**, but connections going **out** are usually trusted — servers need to reach the internet for updates and APIs. The firewall waves the outbound connection through as ordinary traffic, and now the attacker has a **standing channel** into the network.

</div>

<div id="scan-panel-3" class="scan-panel" markdown="1">

**Lateral movement — hop toward the data.** From the foothold on the web server, the attacker reads its **logs and config** to learn which application and database servers it talks to. Then they reach those — one hop at a time, web server → app server → database — until they find a database with something valuable, like credit-card data.

None of this crosses the perimeter firewall. It's all **host-to-host, inside** the network — and the firewall isn't on those internal paths.

</div>

<div id="scan-panel-4" class="scan-panel" markdown="1">

**Exfiltration — send the data out.** The attacker pulls the data from the database and streams it back out through the channel they already opened. To make it even harder to spot, they **encrypt** what they send, so anyone watching sees only ciphertext leaving — indistinguishable from a normal upload.

And here's the uncomfortable part: once the attacker is **inside**, nobody is watching. The firewall blocks *incoming* traffic, but the attacker is roaming the internal network freely — and the firewall never sees the outbound exfil as anything but trusted traffic leaving.

</div>

<div class="role-red" markdown="1">

**Why the whole chain works.** The firewall checked the *header* (port 80 — allowed) and never read the *payload* where the exploit hid. Then outbound was trusted, so the reverse shell slipped out. Then, **inside the perimeter, no one was watching the traffic at all**, so the attacker moved freely and carried the data out. Every gap here is what the next defenses are built to close.

</div>

## Defense 2 — IDS / IPS: watch the traffic inside

The fix for that blind spot: don't only guard the edge — **monitor the traffic, including internal traffic**, for attacks.

What do they look for? **Signatures** — patterns of known attacks — and **anomalies**: traffic that doesn't fit the normal baseline. A web server suddenly querying a database it never touches, or a large transfer leaving at an odd hour, is exactly the kind of anomaly that would have caught the quiet exfil we just watched.

<div class="role-blue" markdown="1">

**IDS vs IPS — the difference everyone asks about.** An **IDS** (Intrusion *Detection* System) watches a *copy* of the traffic and **raises an alert** — like a camera, it spots the intruder and calls it in, but it doesn't physically stop anything. An **IPS** (Intrusion *Prevention* System) does the same inspection but sits **inline**, in the path of the traffic, so it can **drop the packet or block the source** — not just alert. Same eyes; one watches, one acts.

</div>

The point: put sensors **inside** the network, not just at the perimeter. The IDS would have flagged the exfil as anomalous; the IPS could have cut it off.

## Defense 3 — the NGFW: a firewall that reads the payload

Detection is good — but better to stop the exploit before it ever lands. So you might ask: *why not just make the firewall smarter and have it read the payload too?* That's exactly the **next-generation firewall (NGFW)**.

An NGFW inspects **not just the TCP/IP header but the payload** — so in the ShellShock case it can spot the malicious content in the `User-Agent` and **block the packet at the door**. It also identifies the real application regardless of port, and can **decrypt TLS** to inspect encrypted traffic.

In effect, the **NGFW is the firewall and the IPS merged into one device** at the perimeter — the same deep payload inspection, now preventive and right at the gate.

<div class="role-red" markdown="1">

**The offense responds — the arms race.** Attackers hide the exploit by **encrypting** the payload or **fragmenting** it across many packets so no single one shows the full pattern. NGFWs answered by learning to **decrypt** and to **reassemble fragments** before they inspect. Every defense breeds a new offense, and every offense a better defense.

</div>

## Defense 4 — host firewalls & segmentation

Even a smart perimeter firewall is still **one gate**. So push firewalls *inward*:

- **Host firewalls** — every machine runs its own firewall, allowing only the connections it genuinely needs. If the web server has no business reaching the finance database, its host firewall simply refuses that connection.
- **Network segmentation** — don't run one big flat network where anyone inside can roam freely. Split it into **zones**, each with its own firewall, and control what may cross between them.

<div class="role-blue" markdown="1">

**This is defense in depth.** Host firewalls and segmentation directly attack the **lateral movement** from our attack chain: if one segment (or one machine) is compromised, it doesn't hand the attacker the rest of the network. Owning one server is where it ends, not where it begins.

</div>

## Defense 5 — honeypots

Companies also plant **honeypots** — decoy systems. There's **no legitimate reason** for normal traffic ever to touch one, so **any** interaction is almost certainly an intruder. A honeypot is dressed up to look valuable — like a juicy database — and the moment anyone pokes at it, it fires a **high-confidence alarm** with nearly no false positives, and shows the defender what the attacker was after.

<div class="role-red" markdown="1">

**Smell the bait.** From the attacker's side, be suspicious of a target that's **too easy** to reach, **oddly isolated** from everything else, or has **no real traffic** on it. A careful attacker tries to spot the decoy and avoid it — but many don't, which is exactly why honeypots work.

</div>

## A clean payload can still be an attack — SQL injection

Everything so far assumed the payload carried something *malicious*. But a payload with **no malware at all** can still be an attack.

Take a normal product lookup and craft the input:

`GET /product?id=1' OR '1'='1' --`

When the application builds its database query from that input, the `' OR '1'='1'` makes the condition **always true**, so the database returns **every** row instead of one product. This is **SQL injection**.

<div class="role-red" markdown="1">

**Why nothing above catches it.** There's no malware to scan for, and it's a perfectly valid HTTP request to a port that's *supposed* to be open. The firewall, the NGFW, and payload scanners all see nothing wrong — because nothing is wrong at the network level. It's the **application's own logic** being abused to return data it shouldn't.

</div>

Catching this takes a firewall that understands the application itself — a **Web Application Firewall (WAF)**. You can place firewalls at the **network** layer, at the **host** layer, and at the **application** layer; the WAF is that third kind. *We'll go deep on WAFs in the web-hacking module.*

## Last resort — denial of service

Suppose every defense holds and you simply can't get in. There's still one move: stop trying to break in and **make sure no one else can get through either**. That's **denial of service** — it attacks **availability**, not access.

Picture attackers trying to overwhelm a bank. The intent isn't to steal data from inside; it's to **bring the web servers down**. From one machine it's a **DoS**; from a **botnet** of hijacked machines — hundreds of thousands of bots flooding at once — it's a **distributed** denial of service, a **DDoS**, far harder to block because it hides behind thousands of sources.

| Type | How it overwhelms |
|---|---|
| **Volumetric** | A flood of traffic — millions of requests, ICMP floods — until bandwidth is exhausted and real requests can't get through. |
| **Protocol / state** | A **SYN flood**: open the TCP three-way handshake (SYN → SYN-ACK → …) but never send the final ACK. Thousands of **half-finished connections** fill the server's connection table so it can't accept anyone new. |
| **Application** | Slow, partial requests that tie up the server's workers — low traffic, and hard to tell apart from genuinely slow users. |

<svg viewBox="0 0 680 150" role="img" aria-label="A SYN flood. The attacker sends a SYN to the server, the server replies SYN-ACK and reserves a connection slot, but the attacker never sends the final ACK. Repeated many times, the half-open connections fill the server's connection table." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:560px;height:auto;display:block;margin:16px auto;font-family:system-ui,sans-serif;">
  <text x="70" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#c0392b">Attacker</text>
  <text x="610" y="26" text-anchor="middle" font-size="11" font-weight="700" fill="#0e6b82">Server</text>
  <line x1="70" y1="34" x2="70" y2="140" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5"/>
  <line x1="610" y1="34" x2="610" y2="140" stroke="currentColor" stroke-opacity="0.3" stroke-width="1.5"/>
  <line x1="74" y1="52" x2="604" y2="52" stroke="#c0392b" stroke-width="1.8" marker-end="url(#sa)"/>
  <text x="340" y="47" text-anchor="middle" font-size="11" font-weight="700" fill="#c0392b">① SYN</text>
  <line x1="606" y1="82" x2="76" y2="82" stroke="#0e6b82" stroke-width="1.8" marker-end="url(#sb)"/>
  <text x="340" y="77" text-anchor="middle" font-size="11" font-weight="700" fill="#0e6b82">② SYN-ACK — slot reserved</text>
  <line x1="74" y1="112" x2="604" y2="112" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.6" stroke-dasharray="5 4"/>
  <text x="340" y="107" text-anchor="middle" font-size="11" font-weight="700" fill="#c0392b">③ ACK — never sent ✕</text>
  <text x="340" y="138" text-anchor="middle" font-size="10" font-style="italic" fill="currentColor" fill-opacity="0.8">Repeat thousands of times → the connection table fills with half-open connections.</text>
  <defs>
    <marker id="sa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker>
    <marker id="sb" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0e6b82"/></marker>
  </defs>
</svg>

## The whole picture — each defense answers the gap before it

| Defense | What it does | The gap it leaves |
|---|---|---|
| **Firewall** | Checks the header; allow / drop / reject | Can't see the payload |
| *(the attack)* | Exploit in the payload → reverse shell → lateral movement → exfil | The perimeter is blind *inside* |
| **IDS / IPS** | Watch traffic inside too; detect, and block | Better to stop the exploit at the door |
| **NGFW** | Firewall + IPS in one; reads the payload | Evasion (encrypt / fragment), and app-logic attacks remain |
| **Host FW + honeypots** | A lock on every machine; a trap for the curious | A perfectly valid request can still be an attack |
| **WAF → then DDoS** | Guard the app; and when all else fails, overwhelm | — |

Read it top to bottom: the firewall's gap lets the attack happen; the damage the attack does motivates IDS/IPS; detection motivates the NGFW; the remaining gaps motivate host firewalls, honeypots, and the WAF; and DDoS is the move for when you can't get in at all. That chain **is** the week.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

- **Egress filtering + TLS inspection** — watch what *leaves* the network, not just what enters, and decrypt at the gateway so encrypted exfil can actually be seen.
- **Internal monitoring + baselines** — tuned IDS/IPS with good baselines catch both the quiet, anomalous lateral movement and the sudden spikes of a flood.
- **Segment, and lock every host** — host firewalls and segmentation contain a breach to one zone instead of the whole network.
- **Honeypots** — any hit at all is an instant, high-confidence signal that someone is inside and poking around.
- **Rate limiting & upstream scrubbing** — absorb and filter a DDoS before it reaches the target.

Underneath all of it is **zero trust**: getting through the perimeter earns you no trust inside. Verify and inspect everything, everywhere.

</div>

## References

- **NIST SP 800-41 Rev. 1 — Guidelines on Firewalls and Firewall Policy.** The standard reference on firewall types, placement, and rule design. [csrc.nist.gov/pubs/sp/800/41/r1/final](https://csrc.nist.gov/pubs/sp/800/41/r1/final)
- **CVE-2014-6271 — "ShellShock."** The Bash environment-variable code-execution vulnerability. [nvd.nist.gov/vuln/detail/CVE-2014-6271](https://nvd.nist.gov/vuln/detail/CVE-2014-6271)
- **Snort — open-source IDS/IPS.** The classic signature-based intrusion detection/prevention engine and its rule language. [snort.org](https://www.snort.org/)
- **Cloudflare Learning Center — What is a DDoS attack?** Clear, open-access explainer on DoS vs DDoS, botnets, and mitigation. [cloudflare.com/learning/ddos](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)
- **MITRE ATT&CK** — Exploit Public-Facing Application (T1190) · Command & Scripting Interpreter (T1059) · Exfiltration Over C2 Channel (T1041) · Network Denial of Service (T1498). [T1190](https://attack.mitre.org/techniques/T1190/) · [T1059](https://attack.mitre.org/techniques/T1059/) · [T1041](https://attack.mitre.org/techniques/T1041/) · [T1498](https://attack.mitre.org/techniques/T1498/)
