# Ethical Hacking

<div class="week-hero" markdown="1">

Interactive notes · CEH-aligned

## Attack it. Defend it. Report it.

A CEH-aligned introduction to ethical hacking — learn to scan, test, exploit, and secure systems, and to see every attack from both the attacker's and the defender's side.

<div class="meta-row" markdown="1">

<span class="chip">12 weeks · 8 stages</span> <span class="chip">CEH exam-aligned</span> <span class="chip">Interactive notes + video</span> <span class="chip">Open-access readings — $0</span>

</div>

</div>

<div class="admonition tip" markdown="1">

New here? Start with **[Week 1 · Framework, Law & Ethics](weeks/ethics-law-methodology.html)**

One map ties the whole course together: the attacker–defender loop, threat vs. risk, the NIST framework, the kill chain, and the **layers** of defense — plus the law and authorization that make it *ethical*. Every week hangs off that picture.

</div>

## About this course

Students scan, test, hack, and secure systems, implement perimeter defenses, and attack and defend virtual networks. Coverage includes intrusion detection, social engineering, footprinting, DoS attacks, buffer overflows, SQL injection, privilege escalation, trojans, backdoors, and wireless hacking, with emphasis on legal and ethical guidelines. The course prepares students for the **Certified Ethical Hacker (CEH)** exam.

## How the course flows

The course runs as one attack, from the outside in. You **get oriented**, **stalk the target**, then break through each layer of its defenses — network, host, application, and the data at its core — before turning to the softest wall of all, people, and finally running the whole thing as a real engagement. Every week is an interactive notes page tied to its place in the attack.

### 🗓️ Full schedule at a glance

<table class="sched">
<thead><tr><th>Wk</th><th>Layer</th><th>Topic</th><th>What it covers</th></tr></thead>
<tbody>
<tr class="sched-group"><td colspan="4">🧭 Getting Oriented</td></tr>
<tr><td class="wk">1</td><td><span class="pill pill-found">Foundation</span></td><td><a href="weeks/ethics-law-methodology.html">Framework, Law &amp; Ethics</a></td><td>The whole framework in one week — the attacker/defender loop, threat vs. risk, NIST, the kill chain, and the law and ethics that authorize it all.</td></tr>
<tr class="sched-group"><td colspan="4">🔎 Stalking the Target</td></tr>
<tr><td class="wk">2</td><td><span class="pill pill-net">Network</span></td><td><a href="weeks/reconnaissance-footprinting.html">Reconnaissance &amp; Footprinting</a></td><td>Profile the target from the outside — footprinting, OSINT, and mapping the attack surface before you touch it.</td></tr>
<tr><td class="wk">3</td><td><span class="pill pill-net">Network</span></td><td><a href="weeks/scanning-enumeration.html">Scanning, Enumeration &amp; Vuln Analysis</a></td><td>Find what's reachable and what's weak — Nmap host discovery, port scanning, enumeration, and vulnerability analysis.</td></tr>
<tr class="sched-group"><td colspan="4">📡 Storming the Perimeter</td></tr>
<tr><td class="wk">4</td><td><span class="pill pill-net">Network</span></td><td><a href="weeks/network-hacking-sniffing.html">Network Hacking &amp; Sniffing</a></td><td>Get on the wire — sniffing, ARP poisoning, and man-in-the-middle at the network edge.</td></tr>
<tr><td class="wk">5</td><td><span class="pill pill-data">Data</span></td><td><a href="weeks/cryptography.html">Cryptography</a></td><td>The math behind HTTPS, built then broken — you attack weak passwords, missing salt, and forged trust, not the cipher.</td></tr>
<tr><td class="wk">6</td><td><span class="pill pill-net">Network</span></td><td><a href="weeks/wireless-hacking.html">Wireless Hacking</a></td><td>Crack the wireless door — find Wi-Fi by listening, capture the handshake, and break WEP/WPA.</td></tr>
<tr class="sched-group"><td colspan="4">🖥️ Owning the Machine</td></tr>
<tr><td class="wk">7</td><td><span class="pill pill-dev">Device</span></td><td><a href="weeks/system-attacks.html">System Attacks</a></td><td>Take Windows and Linux hosts — exploitation, privilege escalation, and holding control.</td></tr>
<tr><td class="wk">8</td><td><span class="pill pill-dev">Device</span></td><td><a href="weeks/malware-trojans-dos.html">Malware, Trojans &amp; DoS</a></td><td>Persistence and disruption — malware, trojans, command-and-control, and denial-of-service.</td></tr>
<tr class="sched-group"><td colspan="4">🌐 Breaking the Application</td></tr>
<tr><td class="wk">9</td><td><span class="pill pill-app">Application</span></td><td><a href="weeks/web-attacks-servers-apps.html">Web Attacks I — Servers &amp; Apps</a></td><td>The biggest attack surface — web server and web application flaws, mapped to the OWASP Top 10.</td></tr>
<tr><td class="wk">10</td><td><span class="pill pill-app">Application</span></td><td><a href="weeks/web-attacks-sqli-session.html">Web Attacks II — SQLi &amp; Session Hijacking</a></td><td>Break the database and steal the session — SQL injection and session hijacking.</td></tr>
<tr class="sched-group"><td colspan="4">🎭 Hacking the Human</td></tr>
<tr><td class="wk">11</td><td><span class="pill pill-idty">Identity</span></td><td><a href="weeks/social-engineering-identity.html">Social Engineering &amp; the Identity Layer</a></td><td>The wall with no patch — manipulate people, not machines. <em>Log in, not hack in.</em></td></tr>
<tr class="sched-group"><td colspan="4">🎯 The Full Engagement</td></tr>
<tr><td class="wk">12</td><td><span class="pill pill-found">All layers</span></td><td><a href="weeks/penetration-testing.html">Penetration Testing — Methodology &amp; Reporting</a></td><td>Run the whole cycle across every layer, then write the professional report a client pays for.</td></tr>
</tbody>
</table>

<small>*Videos and graded work live in Canvas. Week numbers are a guide — pages are named by topic, so the schedule can shift without breaking links.*</small>

## What you'll be able to do

By the end of the course you will be able to **demonstrate the ability to attack and defend a network** — the core learning outcome — and you'll be prepared for the **Certified Ethical Hacker (CEH)** exam. Concretely, you'll be able to:

- Conduct reconnaissance and map a target's attack surface.
- Scan and enumerate hosts, services, and vulnerabilities.
- Exploit systems and web applications safely and legally.
- Recognize and reason about malware, DoS, and social-engineering attacks.
- Apply cryptographic concepts and evade basic network defenses.
- Plan a penetration test and communicate findings clearly.

## How this site works

<div class="admonition info" markdown="1">

Interactive lecture notes

These pages are the **interactive notes** that accompany the course videos — concept explanations, the kill-chain framing, ATT&CK tags, and a *Defender's view* on every topic. Everything else for the course — videos, schedule, and graded work — lives in **Canvas**.

</div>

- **Readings** are all free and open-access — NIST, OWASP, the official Nmap book, Crypto 101, Metasploit Unleashed, and more. See the [Free Resource Library](reference/resources.html).
- **Ethics and law** run through the whole course, anchored by Alana Maurushat's open-access *Ethical Hacking*.

## Start here

- New to the toolset? Skim **[Kali Linux Revealed](reference/resources.html)** before you start the hands-on labs.
- Jump to **[Week 1 · Framework, Law & Ethics](weeks/ethics-law-methodology.html)**.

<div class="admonition warning" markdown="1">

Authorization first

Everything in this course is practiced **only** on systems you have **explicit written permission** to test. Unauthorized access to computer systems is a crime — the legal boundaries are covered up front, in **Getting Oriented**.

</div>
