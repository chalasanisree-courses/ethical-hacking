# Ethical Hacking

<div class="week-hero" markdown="1">

Interactive notes · CEH-aligned

## Attack it. Defend it. Report it.

A CEH-aligned introduction to ethical hacking — learn to scan, test,
exploit, and secure systems, and to see every attack from both the
attacker's and the defender's side.

<div class="meta-row" markdown="1">

<span class="chip">12 weeks · 8 stages</span> <span class="chip">CEH
exam-aligned</span> <span class="chip">Interactive notes + video</span>
<span class="chip">Open-access readings — \$0</span>

</div>

</div>

<div class="admonition tip" markdown="1">

New here? Start with **[Week 1 · Framework, Law &
Ethics](weeks/ethics-law-methodology.html)**

One map ties the whole course together: the attacker–defender loop,
threat vs. risk, the NIST framework, the kill chain, and the **layers**
of defense — plus the law and authorization that make it *ethical*.
Every week hangs off that picture.

</div>

## About this course

Students scan, test, hack, and secure systems, implement perimeter
defenses, and attack and defend virtual networks. Coverage includes
intrusion detection, social engineering, footprinting, DoS attacks,
buffer overflows, SQL injection, privilege escalation, trojans,
backdoors, and wireless hacking, with emphasis on legal and ethical
guidelines. The course prepares students for the **Certified Ethical
Hacker (CEH)** exam.

## How the course flows

The course runs as one attack, from the outside in. You **get oriented**, **stalk the target**, then break through each layer of its defenses — network, host, application, and the data at its core — before turning to the softest wall of all, people, and finally running the whole thing as a real engagement. Every week is an interactive notes page tied to its place in the attack.

<div class="cards" markdown="1">

<div class="card" markdown="1">

### 🧭 Getting Oriented

The whole framework in one week — the attacker/defender loop, threat vs. risk, NIST, the kill chain, and the layers of defense — plus the law and ethics that authorize it all.

</div>

<div class="card" markdown="1">

### 🔎 Stalking the Target

Profile the target, then find what is reachable — footprinting, OSINT, Nmap, enumeration, and vulnerability analysis.

</div>

<div class="card" markdown="1">

### 📡 Storming the Perimeter

Break in at the network edge — sniff the wire, slip past IDS and firewalls, and crack the wireless door.

</div>

<div class="card" markdown="1">

### 🖥️ Owning the Machine

Take Windows and Linux hosts, escalate to admin, and hold control with malware, trojans, and command-and-control — plus denial-of-service.

</div>

<div class="card" markdown="1">

### 🌐 Breaking the Application

The biggest attack surface — web servers, web applications, SQL injection, and session hijacking.

</div>

<div class="card" markdown="1">

### 🔐 Cracking the Vault

The cryptography that guards data everywhere — how it works, and how it fails. It lands right after you steal the password database in Week 9.

</div>

<div class="card" markdown="1">

### 🎭 Hacking the Human

The wall with no patch — manipulate people, not machines. *Log in, not hack in.*

</div>

<div class="card" markdown="1">

### 🎯 The Full Engagement

Run the whole cycle across every layer, then write the professional report a client pays for.

</div>

</div>

### 🗓️ Full schedule at a glance

| Wk | Kill-chain phase | Topic | Primary reading (free / open-access) |
|----|------------------|-------|--------------------------------------|
| 🧭 Getting Oriented | | | |
| 1 | Foundation | [Framework, Law & Ethics](weeks/ethics-law-methodology.html) | [Maurushat, *Ethical Hacking* — Ch. 1](https://library.oapen.org/bitstream/id/ab438eb4-5f5d-4509-8c0b-f6c57f271e84/9780776627922.pdf) |
| 🔎 Stalking the Target | | | |
| 2 | Reconnaissance | [Reconnaissance & Footprinting](weeks/reconnaissance-footprinting.html) | [NIST SP 800-115 §4](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf) |
| 3 | Scanning & enumeration | [Scanning, Enumeration & Vuln Analysis](weeks/scanning-enumeration.html) | [Nmap Network Scanning (book)](https://nmap.org/book/toc.html) |
| 📡 Storming the Perimeter | | | |
| 4 | Sniffing & evasion | [Network Hacking & Sniffing](weeks/network-hacking-sniffing.html) | [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) |
| 5 | Wireless access | [Wireless Hacking](weeks/wireless-hacking.html) | [Aircrack-ng documentation](https://www.aircrack-ng.org/documentation.html) |
| 🖥️ Owning the Machine | | | |
| 6 | Gaining access | [System Attacks](weeks/system-attacks.html) | [Metasploit Unleashed](https://www.offsec.com/metasploit-unleashed/) |
| 7 | Malware & command-and-control | [Malware, Trojans & DoS](weeks/malware-trojans-dos.html) | [MITRE ATT&CK — C2 (TA0011)](https://attack.mitre.org/tactics/TA0011/) |
| 🌐 Breaking the Application | | | |
| 8 | Web — gaining access | [Web Attacks I — Servers & Apps](weeks/web-attacks-servers-apps.html) | [OWASP Top 10](https://owasp.org/www-project-top-ten/) |
| 9 | Web — SQLi & session | [Web Attacks II — SQLi & Session Hijacking](weeks/web-attacks-sqli-session.html) | [OWASP SQLi Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html) |
| 🔐 Cracking the Vault | | | |
| 10 | Cryptography (cross-cutting) | [Cryptography](weeks/cryptography.html) | [Crypto 101 — Ch. 1–7](https://www.crypto101.io/) |
| 🎭 Hacking the Human | | | |
| 11 | Identity layer | [Social Engineering & the Identity Layer](weeks/social-engineering-identity.html) | [Identity Under Attack (interactive lesson)](human-layer/identity-under-attack.html) |
| 🎯 The Full Engagement | | | |
| 12 | Full engagement | [Penetration Testing — Methodology & Reporting](weeks/penetration-testing.html) | [NIST SP 800-115 §5–8](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf) |

<span class="small">*Videos and graded work live in Canvas. Week numbers are a guide — pages are named by topic, so the schedule can shift without breaking links.*</span>

## What you'll be able to do

By the end of the course you will be able to **demonstrate the ability
to attack and defend a network** — the core learning outcome — and
you'll be prepared for the **Certified Ethical Hacker (CEH)** exam.
Concretely, you'll be able to:

- Conduct reconnaissance and map a target's attack surface.
- Scan and enumerate hosts, services, and vulnerabilities.
- Exploit systems and web applications safely and legally.
- Recognize and reason about malware, DoS, and social-engineering
  attacks.
- Apply cryptographic concepts and evade basic network defenses.
- Plan a penetration test and communicate findings clearly.

## How this site works

<div class="admonition info" markdown="1">

Interactive lecture notes

These pages are the **interactive notes** that accompany the course
videos — concept explanations, the kill-chain framing, ATT&CK tags, and
a *Defender's view* on every topic. Everything else for the course —
videos, schedule, and graded work — lives in **Canvas**.

</div>

- **Readings** are all free and open-access — NIST, OWASP, the official
  Nmap book, Crypto 101, Metasploit Unleashed, and more. See the [Free
  Resource Library](reference/resources.html).
- **Ethics and law** run through the whole course, anchored by Alana
  Maurushat's open-access *Ethical Hacking*.

## Start here

- New to the toolset? Skim **[Kali Linux
  Revealed](reference/resources.html)** before Week 2.
- Jump to **[Week 1 · Framework, Law &
  Ethics](weeks/ethics-law-methodology.html)**.

<div class="admonition warning" markdown="1">

Authorization first

Everything in this course is practiced **only** on systems you have
**explicit written permission** to test. Unauthorized access to computer
systems is a crime — the legal boundaries are covered in Week 1.

</div>
