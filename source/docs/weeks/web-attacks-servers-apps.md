---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 8 · Web Attacks I — Servers & Apps

<span class="kc-badge">🧭 Kill chain · Phase 3 — Gaining Access (web)</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1190/" class="attck-tag" target="_blank">T1190 Exploit Public-Facing App</a> <a href="https://attack.mitre.org/techniques/T1505/" class="attck-tag" target="_blank">T1505 Server Software Component</a> <a href="https://attack.mitre.org/techniques/T1059/" class="attck-tag" target="_blank">T1059 Command &amp; Scripting</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- The web-server vs. web-application attack surface
- The OWASP Top 10 as a shared vocabulary
- How web flaws chain into backend and OS access

</div>

## 1. Why the web is the biggest target

Almost every organization exposes web applications to the entire internet by design — which makes the web tier the single largest, most-probed attack surface most companies have. Unlike an internal service behind a firewall, a web app is reachable by anyone, so a single flaw is directly exploitable from anywhere.

## 2. Web-server attacks

Before the application, the **server** itself is a target:

- Misconfiguration (directory listing, exposed `.git`, default admin panels)
- Default or weak credentials on management interfaces
- Outdated components with known CVEs
- Directory traversal / path traversal to read files outside the web root
- **Web shells** — uploading a script that gives command execution and *persistent* access

## 3. Web-app attack classes

Click each to expand.

🧩 Broken access control

Acting outside intended permissions — IDOR (changing an `id=123` to `id=124`), forced browsing to admin URLs, privilege bypass. The **\#1** risk on the OWASP Top 10.

💉 Injection

Untrusted input interpreted as code or a query — SQL injection (Week 9), command injection, LDAP/NoSQL injection. The app treats attacker data as instructions.

🖼️ XSS & CSRF

Stored/reflected **cross-site scripting** runs attacker JavaScript in a victim's browser (session theft, keylogging). **CSRF** tricks an authenticated browser into performing actions the user didn't intend.

🔀 SSRF

Server-Side Request Forgery makes the server fetch a URL the attacker controls — often used to reach internal-only systems and cloud metadata endpoints.

## 4. The OWASP Top 10 & methodology

The **OWASP Top 10** is the industry's shared list of the most critical web risks — the vocabulary you'll use to classify and report every finding. The testing method is consistent: **map** the app (spidering, content discovery) → **discover** inputs and endpoints → **exploit** → **document**. Burp Suite is the standard tool for intercepting and manipulating requests along the way.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Web attacks are visible in **access logs and WAF logs**: encoded payloads in URLs, path-traversal sequences (`../`, `%2e%2e`), unexpected POST bodies, spikes of 4xx/5xx responses, and requests to endpoints that shouldn't exist. A sudden new file appearing in a web directory is a classic **web-shell** indicator.

**Best control:** secure coding (input validation, output encoding, parameterized queries) is the real fix; a **WAF** and timely patching are the layers behind it; file-integrity monitoring on the web root catches web shells.

</div>

<div class="admonition note" markdown="1">

Real-world context

The 2011 **Sony Pictures / PlayStation-era** breaches and countless others started with basic web flaws (SQLi, weak input handling). More recently, the **MOVEit** (2023) mass-exploitation used a single web-app SQL-injection flaw to breach thousands of organizations at once — a reminder that one web vulnerability can scale to a global incident.

</div>

## References

- **OWASP Top 10.** [owasp.org/www-project-top-ten](https://owasp.org/www-project-top-ten/)
- **OWASP Web Security Testing Guide (WSTG).** [owasp.org/www-project-web-security-testing-guide](https://owasp.org/www-project-web-security-testing-guide/)
