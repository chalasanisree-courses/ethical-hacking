---
title: Week 8 · System Attacks, Malware & Persistence
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 8 · System Attacks, Malware & Persistence

<span class="kc-badge">🧭 CEH life cycle · Phases 3–4 — Gaining → Maintaining Access</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1190/" class="attck-tag" target="_blank">T1190 Exploit Public-Facing App</a> <a href="https://attack.mitre.org/techniques/T1068/" class="attck-tag" target="_blank">T1068 Exploit for PrivEsc</a> <a href="https://attack.mitre.org/techniques/T1071/" class="attck-tag" target="_blank">T1071 App-Layer C2</a> <a href="https://attack.mitre.org/techniques/T1219/" class="attck-tag" target="_blank">T1219 Remote Access Software</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- **From vulnerability to shell** — how an exploit becomes code execution, and the Metasploit workflow end to end
- **Privilege escalation** — becoming root / SYSTEM on Windows and Linux
- **Post-exploitation & persistence** — surviving a reboot, pivoting, and collection
- **Malware** — viruses, worms, trojans, RATs, and ransomware, and how command-and-control works

</div>

Last week we got *through* the perimeter. This week we land on an actual machine and take it over — turning one exploited service into full control of the host, then making that control **stick**. Exploitation gets you in; privilege escalation makes you root; persistence and malware let you *stay*. (Denial of service, which used to live here, now sits in **Week 7 — Network Defense Evasion & DoS**.)

## 1. From vulnerability to shell

This is the phase everything before it was building toward. You take a vulnerability found in Week 3's analysis, match it to an **exploit**, and deliver a **payload** that gives you code execution on the target. The key reality: exploitation almost always lands you as a **low-privileged user** — the account the vulnerable service runs as (`www-data`, a service account) — *not* as administrator. Getting in is step one; becoming root/SYSTEM is a separate fight (§3).

Payloads range from a simple **reverse shell** (the target connects back to you, which sails through outbound-only firewalls — exactly the trick from Week 7) to a full **Meterpreter** session with file access, screenshotting, and pivoting built in.

## 2. Metasploit — the exploitation framework

Metasploit standardizes the whole process so you're not hand-writing exploits:

- **Modules** — thousands of pre-built exploits and auxiliary tools.
- **`msfconsole`** — pick an exploit, set the target (`RHOSTS`) and your payload (`LHOST`/`LPORT`), and fire.
- **Meterpreter** — a powerful in-memory payload for everything after the shell: `getsystem`, `hashdump`, `migrate`, pivoting to other hosts.
- **`msfvenom`** — generate and encode standalone payloads for delivery.

Understanding this workflow is also what lets a defender recognize its very recognizable footprints.

## 3. Privilege escalation

Exploitation drops you in as a low-privileged user; privilege escalation is how you become root or SYSTEM.

??? note "🪟 Windows privesc"

    Unquoted service paths, weak service permissions, always-install-elevated policies, and token-impersonation ("Potato") attacks. Tools like **WinPEAS** enumerate the options automatically.

??? note "🐧 Linux privesc"

    Misconfigured **SUID** binaries, permissive **sudo** rules (check `sudo -l`), writable cron jobs, and outdated kernels. **LinPEAS** and the **GTFOBins** catalog map the paths.

??? note "🔑 Credential reuse"

    The fastest escalation is often no exploit at all — passwords reused across accounts, or credentials sitting in config files and scripts on the compromised host.

## 4. Post-exploitation & persistence

Once you have privileged access, the objectives are **persistence** (surviving a reboot), **pivoting** (using this host to reach others — Week 4's techniques), and **collection** (the data the engagement was scoped to demonstrate access to). Persistence is usually bought with **registry run keys, scheduled tasks, or new services** that relaunch your implant after a reboot. Every one of these actions leaves artifacts — new services, new scheduled tasks, unusual process trees — which is precisely what the defender hunts for.

## 5. Malware — the taxonomy

Persistence at scale is what **malware** automates. The key distinction is **propagation** (how it spreads) vs. **payload** (what it does):

- **Virus** — attaches to a file/program; spreads when that file runs.
- **Worm** — self-propagates across a network with no user action (WannaCry spread this way).
- **Trojan** — disguised as something legitimate; the user runs it willingly.
- **RAT (Remote Access Trojan)** — a trojan whose payload gives the attacker ongoing remote control — the essence of *maintaining access*.
- **Ransomware** — encrypts data for extortion; often the final payload of a longer intrusion.

## 6. The RAT lifecycle

Click each stage to expand.

??? note "🔨 Build & obfuscate"

    The attacker generates a payload (e.g., with `msfvenom`) and obfuscates/encodes it to slip past antivirus signature matching.

??? note "📬 Deliver & execute"

    The payload reaches the victim (phishing attachment, malicious download, trojanized installer) and runs — often via a document macro or a fake update.

??? note "📡 Command & control (C2)"

    The implant connects back to the attacker's C2 server, disguised as ordinary HTTPS or DNS traffic so it blends into normal outbound flow. (Same outbound-is-trusted logic as the Week 7 reverse shell — just automated and persistent.)

??? note "🔒 Persist"

    Registry run keys, scheduled tasks, or services ensure the RAT survives reboots.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Exploitation is the **highest-signal** phase of the whole chain: a request to a vulnerable endpoint carrying an anomalous payload, immediately followed by an unexpected **outbound** connection (the reverse shell) and a service account suddenly spawning a shell or PowerShell. Privilege escalation is quieter and depends on host telemetry — **Sysmon** (Windows) or **auditd** (Linux) — being configured *before* the attack, watching for SUID/sudo abuse and token manipulation.

Malware and C2 then show up as **beaconing** — small, regular outbound connections to an unfamiliar host at suspiciously even intervals — and as unusual process trees (a Word doc spawning PowerShell).

**Best controls:** the single most effective remediation is **patching** so the exploit fails outright — backed by **least-privilege** service accounts, application allowlisting, **egress filtering + DNS monitoring** to catch C2 leaving the network, and **EDR** to catch the post-exploitation and implant behavior on-host.

</div>

<div class="admonition note" markdown="1">

Real-world context

**EternalBlue & WannaCry (2017).** The WannaCry ransomware used **EternalBlue** (MS17-010), an exploit for a flaw in Windows SMB, to get SYSTEM-level code execution on unpatched machines — then **wormed** itself across networks automatically, hitting hospitals, telecoms, and factories in over 150 countries within days. Microsoft had released the patch **two months earlier** — the definitive case for why "gaining access" plus "unpatched systems" is a catastrophe.

**Emotet.** Began as a banking trojan and evolved into a delivery platform — a RAT that, once resident, downloaded other malware (including ransomware) and used the victim's own contacts to spread. The textbook example of "maintaining access" as a business model, and of why C2 detection matters more than any single signature.

</div>

## References

- **Metasploit Unleashed** (OffSec, free). [offsec.com/metasploit-unleashed](https://www.offsec.com/metasploit-unleashed/)
- **Kali Linux Revealed** (official, free). [kali.org book](https://www.kali.org/download-kali-linux-revealed-book/)
- **GTFOBins** (Linux privesc reference). [gtfobins.github.io](https://gtfobins.github.io/)
- **MITRE ATT&CK** — Exploit Public-Facing Application (T1190) · Exploitation for Privilege Escalation (T1068) · Command & Control (TA0011) · Remote Access Software (T1219). [T1190](https://attack.mitre.org/techniques/T1190/) · [T1068](https://attack.mitre.org/techniques/T1068/) · [TA0011](https://attack.mitre.org/tactics/TA0011/) · [T1219](https://attack.mitre.org/techniques/T1219/)
