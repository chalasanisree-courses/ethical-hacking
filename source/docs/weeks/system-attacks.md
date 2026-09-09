[← Course home](../index.html) · Ethical Hacking

# Week 6 · System Attacks

<span class="kc-badge">🧭 Kill chain · Phase 3 — Gaining Access</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span>
<a href="https://attack.mitre.org/techniques/T1190/" class="attck-tag"
target="_blank">T1190 Exploit Public-Facing App</a>
<a href="https://attack.mitre.org/techniques/T1059/" class="attck-tag"
target="_blank">T1059 Command &amp; Scripting</a>
<a href="https://attack.mitre.org/techniques/T1068/" class="attck-tag"
target="_blank">T1068 Exploit for PrivEsc</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- How an exploit turns a vulnerability into code execution
- The Metasploit workflow, end to end
- Privilege escalation on Windows and Linux
- Post-exploitation — and the trail it leaves

</div>

## 1. From vulnerability to shell

This is the phase everything before it was building toward. You take a
vulnerability found in Week 3's analysis, match it to an **exploit**,
and deliver a **payload** that gives you code execution on the target.
The key reality: exploitation almost always lands you as a
**low-privileged user** — the account the vulnerable service runs as
(`www-data`, a service account) — *not* as administrator. Getting in is
step one; becoming root/SYSTEM is a separate fight (§3).

Payloads range from a simple **reverse shell** (the target connects back
to you, which sails through outbound-only firewalls) to a full
**Meterpreter** session with file access, screenshotting, and pivoting
built in.

## 2. Metasploit — the exploitation framework

Metasploit standardizes the whole process so you're not hand-writing
exploits:

- **Modules** — thousands of pre-built exploits and auxiliary tools.
- **`msfconsole`** — pick an exploit, set the target (`RHOSTS`) and your
  payload (`LHOST`/`LPORT`), and fire.
- **Meterpreter** — a powerful in-memory payload for everything after
  the shell: `getsystem`, `hashdump`, `migrate`, pivoting to other
  hosts.
- **`msfvenom`** — generate and encode standalone payloads for delivery.

Understanding this workflow is also what lets a defender recognize its
very recognizable footprints.

## 3. Privilege escalation

Click each to expand.

🪟 Windows privesc

Unquoted service paths, weak service permissions,
always-install-elevated policies, and token-impersonation ("Potato")
attacks. Tools like **WinPEAS** enumerate the options automatically.

🐧 Linux privesc

Misconfigured **SUID** binaries, permissive **sudo** rules (check
`sudo -l`), writable cron jobs, and outdated kernels. **LinPEAS** and
the **GTFOBins** catalog map the paths.

🔑 Credential reuse

The fastest escalation is often no exploit at all — passwords reused
across accounts, or credentials sitting in config files and scripts on
the compromised host.

## 4. Post-exploitation

Once you have privileged access, the objectives are **persistence**
(surviving a reboot), **pivoting** (using this host to reach others —
Week 4's techniques), and **collection** (the data the engagement was
scoped to demonstrate access to). Every one of these actions leaves
artifacts — new services, new scheduled tasks, unusual process trees —
which is precisely what the defender hunts for.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Exploitation is the **highest-signal** phase of the whole chain: a
request to a vulnerable endpoint carrying an anomalous payload,
immediately followed by an unexpected **outbound** connection (the
reverse shell) and a service account suddenly spawning a shell or
PowerShell. Privilege escalation is quieter and depends on host
telemetry — **Sysmon** (Windows) or **auditd** (Linux) — being
configured *before* the attack, watching for SUID/sudo abuse and token
manipulation.

**Best control:** the single most effective remediation is **patching**
so the exploit fails outright — backed by **least-privilege** service
accounts, application allowlisting, and EDR to catch the
post-exploitation behavior.

</div>

<div class="admonition note" markdown="1">

Real-world context — EternalBlue & WannaCry

In 2017 the **WannaCry** ransomware used **EternalBlue** (MS17-010), an
exploit for a flaw in Windows SMB, to get SYSTEM-level code execution on
unpatched machines — then wormed itself across networks automatically,
hitting hospitals, telecoms, and factories in over 150 countries within
days. Microsoft had released the patch **two months earlier**. It's the
definitive case for why "gaining access" plus "unpatched systems" is a
catastrophe, and why patch management is the highest-value defense on
this page.

</div>

## References

- **Metasploit Unleashed** (OffSec, free).
  [offsec.com/metasploit-unleashed](https://www.offsec.com/metasploit-unleashed/)
- **Kali Linux Revealed** (official, free). [kali.org
  book](https://www.kali.org/download-kali-linux-revealed-book/)
- **GTFOBins** (Linux privesc reference).
  [gtfobins.github.io](https://gtfobins.github.io/)
