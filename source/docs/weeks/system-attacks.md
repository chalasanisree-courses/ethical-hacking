---
title: Week 8 · System Attacks, Malware & Persistence
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 8 · System Attacks, Malware & Persistence

<span class="kc-badge">🧭 CEH life cycle — Gaining Access → Maintaining Access → Covering Tracks</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1190/" class="attck-tag" target="_blank">T1190 Exploit Public-Facing App</a> <a href="https://attack.mitre.org/techniques/T1068/" class="attck-tag" target="_blank">T1068 Exploit for PrivEsc</a> <a href="https://attack.mitre.org/techniques/T1543/" class="attck-tag" target="_blank">T1543 Persistence</a> <a href="https://attack.mitre.org/techniques/T1003/" class="attck-tag" target="_blank">T1003 Credential Dumping</a> <a href="https://attack.mitre.org/techniques/T1021/" class="attck-tag" target="_blank">T1021 Lateral Movement</a> <a href="https://attack.mitre.org/techniques/T1071/" class="attck-tag" target="_blank">T1071 App-Layer C2</a> <a href="https://attack.mitre.org/techniques/T1048/" class="attck-tag" target="_blank">T1048 Exfil / Alt Protocol</a> <a href="https://attack.mitre.org/techniques/T1070/" class="attck-tag" target="_blank">T1070 Indicator Removal</a>

</div>

!!! abstract "What this page covers"

    - **The loop** — the routine you run on every host: get in → escalate → persist → steal credentials → act / pivot
    - **The board** — how the OS decides who can do what, and the 2×2 of identities that sets the goal
    - **Each move in turn** — escalation, persistence and the RAT, staying hidden, credential theft, the pivot to the domain controller, and exfiltration
    - **Stealth vs. covering tracks**, and the idea that ties it together: **malware is this loop, automated**

Last week we got *through* the perimeter. This week we're standing on a single machine with a foothold, and we ask the only question that matters next: **now what?** The answer is a routine — the same moves run on every host you reach:

> **get in → escalate → persist → steal credentials → act / pivot** — then repeat on the next machine.

Stealth runs *underneath* that whole routine — you're trying not to be noticed the entire time — and **covering your tracks** is the exit. We teach it on one running example, **ShellShock**, and translate to Windows as we go. The burglar analogy holds throughout: get in, don't get kicked out, find something worth taking, and leave without anyone realizing you were there.

## Land and expand

The machine you landed on may hold nothing worth taking — so the plan is **land and expand**: take full control of this host, look around, and use what you find to reach the next host. Repeat until you hit something valuable.

- 🖥️ **Foothold** — land as a low-privilege user
- 🔐 **Full control** — climb to root / SYSTEM
- 🔑 **Harvest secrets** — passwords and cached credentials
- 🌐 **Next host** — log in with the stolen keys → the new host is a fresh foothold, so run the loop again

??? note "💡 Why you move *on the inside*"

    The database and the other servers sit **inside** the network. The perimeter firewall guards the edge — the boundary between the internet and the inside — not host-to-host traffic. Once you're on one internal box, the rest are reachable. This is **lateral movement**, and it's where the week heads.

??? note "💡 …and you don't always climb"

    Match the move to the goal. To encrypt a user's files for ransom, or read the web app's own database, the foothold's privileges are often enough — no root needed. You climb to the superuser only when the goal needs the whole machine or a path deeper into the network.

---

## 1. Get in — credentials · code · config

Recap of how we got here. There are only three ways onto a host — the **CCC** — and the same three come back as the ways to *climb* once you're inside.

??? note "🔑 ① Credentials — steal a key"

    No exploit at all — you just use a valid login. Steal an employee's password and log in as them from the internet; or phish a user into opening an attachment, and now your code runs **as them**. The quiet way.

??? note "🐛 ② Code — exploit a bug"

    Every program is written by humans, so it has bugs. **ShellShock** was a bug in **Bash** — the shell, *not* the web server — that let a crafted web request run a command. Others: **Dirty COW** (Linux kernel), **PrintNightmare** (Windows print service). You land at the privilege of whatever you broke.

??? note "⚙️ ③ Config — abuse a setting"

    Nothing is broken; a setting was just left too loose. User errors are everywhere, so this is often the *easiest* path. (Full worked example under [Escalate](#2-escalate-climb-to-the-superuser).)

Through ShellShock we became `www-data` — the web server's **low-privilege service account**. Not root, not an administrator.

!!! warning "Exploit ≠ escalation"

    Getting code to run on the box is **initial access**, not privilege escalation. An exploit gives you **exactly** the privileges the broken process already had — no more. Climbing higher is the next, separate job.

## The machine we're climbing

Three layers, bottom to top: **hardware → operating system (the kernel) → applications**. Apps can't touch hardware directly — they ask the OS through **system calls**. Think of the kernel as a **security guard** with two jobs.

- **Job 1 — mediate the hardware.** Your browser can't grab the network card itself; it asks the kernel, which time-slices that one card between every program that wants it at the same time.
- **Job 2 — enforce identity.** Bob and Alice share a machine. When Bob's File Explorer reaches for one of Alice's private files, the kernel checks Bob's identity against the file's permissions — and denies it. **Every** file access runs through that check.

That one check is the whole security model, and the week is about getting around it. The password hashes live in `/etc/shadow`, readable only by root:

```
$ ls -l /etc/shadow
-rw-r----- 1 root shadow ... /etc/shadow
```

Owner **root** can read/write, group **shadow** can read, **others get nothing** — so our `www-data` foothold is simply denied. The lever that matters: **root (uid 0) bypasses every check**, which is exactly what makes it the goal.

??? note "🪟 The Windows mirror"

    Objects carry **ACLs** instead of rwx bits; the local superuser is **SYSTEM**; the password store is the **SAM** on disk and **LSASS** in memory, not `/etc/shadow`. Same model — identity decides access, and SYSTEM bypasses it.

## Every process runs as someone

When a Linux machine boots, the first process — **systemd** — runs as root and spawns everything else, so you get a tree of processes, each tagged with an identity. Those identities split two ways: **who they're for** × **how much power**.

|             | **Low privilege**                       | **High privilege**                     |
|-------------|-----------------------------------------|----------------------------------------|
| **Human**   | ordinary user — `alice`                 | human admin — a sudoer / administrator  |
| **Service** | low-priv service — `www-data`, `mysql`  | **superuser — `root` / `SYSTEM`**      |

A foothold almost always drops you in the **bottom row**. The destination is the **top-right cell** — the local superuser, and `root` ≈ `SYSTEM` is that same role on either OS. A phished attachment runs with *your* identity; a printer service is a non-human **service account** with no business reading `/etc/shadow`, so it can't. The goal is always to climb to the top.

## 2. Escalate — climb to the superuser

A shell runs at the privilege of **whoever spawned it**. So escalation means getting something already privileged to run your code — through the same three routes (code · config · credentials). You don't guess; **LinPEAS / WinPEAS** enumerate every opening.

Here's the **config** route in full — and notice it takes *two* mistakes together. An admin lets an operator run a root-owned backup script via `sudo` (reasonable), but also leaves the script writable by the operator's group:

```
$ id
uid=1001(operator) gid=1001(operator) groups=operator,ops

$ ls -l /opt/backup.sh
-rwxrwxr-x 1 root ops  /opt/backup.sh      # group 'ops' can write — and we're in ops
```

??? danger "Reveal the exploit →"

    ```
    $ echo 'bash -i' >> /opt/backup.sh     # append one line: spawn a shell
    $ sudo /opt/backup.sh
    # whoami
    root
    ```

    `sudo` runs **our edited** script as root, so the shell comes back as root. Neither mistake alone is enough — the grant was meant for a fixed, trusted script, and a writable script you run as *yourself* is harmless. It's the **combination** — run it as root *and* change what it does — that hands over the box.

<div class="admonition defender" markdown="1">

🛡 The defender's counter — least privilege

Give every account and service only the power it genuinely needs. Then even when an attacker lands a foothold or finds one of these openings, there's very little to reach, and the climb to root stalls.

</div>

## 3. Persist — keeping the position, and the RAT

What you have right now is fragile. A **reverse shell** is one connection the box dials *outward*; it dies on a reboot, a dropped link, or — worst — a **patch of the hole you climbed in through**. **Persistence** means leaving a way back in, at your elevated level.

- **Your own way back in.** Like a burglar copying the key: create a new admin/root account for yourself, or drop an **SSH key** into an account's `authorized_keys` — now you just log straight back in.
- **Hook into startup**, so you're relaunched every reboot. 🐧 **Linux:** a cron job or a systemd service. 🪟 **Windows:** a registry **Run** key, a scheduled task, or a new service — add your malware there and it comes up alongside the legitimate ones.

**The RAT.** Tie those together and a **Remote Access Trojan** automates the whole return into one implant that does three jobs: it **persists** (survives reboot), it **calls home** to a command-and-control (C2) server, and it hands the operator **remote control**. A *trojan* because it's disguised; *remote-access* because it opens a channel back in.

**Beaconing is the tell.** The implant must check in — small, clockwork "phone-home" connections to an unfamiliar host. Why reach *out*? Inbound is heavily guarded and monitored, while traffic leaving the network looks like any employee browsing. Same "outbound is trusted" trick as the reverse shell, now automated and always on.

??? example "Real case — SolarWinds (2020)"

    A backdoor hidden inside a **signed** software update stayed dormant for ~2 weeks, then beaconed to command-and-control through traffic disguised as the product's own. Thousands of networks, undetected for months.

<div class="admonition defender" markdown="1">

🛡 The defender's counter — patch first

**Patch** is the #1 control: it closes the exact hole the exploit needs, so the exploit simply fails. It's precisely *because* a patch can lock the attacker out that they rush to persist first. Defenders also hunt for rogue Run keys, services, and tasks, and watch outbound traffic for beaconing.

</div>

## Staying hidden

The whole time you operate, you're trying not to be seen — so stealth isn't a stage, it's a **band under the entire loop**. And the host is defended: client and server endpoints run **endpoint protection (EPP)** — classic antivirus, with modern **EDR** layered on top. Antivirus runs two checks, and each evasion beats one of them.

- 📦 **Packing** — *beats the on-disk signature scan.* Signature AV knows what known malware looks like on disk; packing compresses and scrambles the file so it matches nothing on the list. Same malware, new fingerprint.
- 🧬 **Process hollowing** — *beats the running-process watch.* Take a trusted OS process like `svchost`, gut it, and run your code inside under its good name. To the scanner it still looks like a legitimate process.

So defenders moved past signatures: **EDR** watches *behavior* — is this process writing to the registry, making connections it shouldn't? The malware's answer is to stay under the radar and not trip the alarms. And the deepest move of all:

!!! danger "Rootkit — corrupt the reporter"

    AV and EDR are only as good as what the **OS reports** to them. Compromise the OS itself and it can report your process as normal — or not at all. The source they trust is now yours, so there's nothing left to detect.

??? example "Real case — Stuxnet (2010)"

    A kernel-level rootkit whose components were signed with **stolen but genuine** code-signing certificates. Hidden for months; targeted the centrifuges at Iran's Natanz facility.

## 4. Steal credentials, then pivot

Now that you're the superuser, the stored secrets are finally readable. This is a different move from escalation: there you stole *one* credential to go **up** on this box; here you harvest *every* credential on it to go **out** to other boxes — and you couldn't have done it a moment ago, because it needs root.

- 🐧 **Linux** — grab `/etc/shadow` (the file we couldn't read before) and **crack the hashes offline** until the weak ones give up their passwords.
- 🪟 **Windows** — the credentials of anyone recently logged in are cached in memory in **LSASS**. The classic tool **Mimikatz** scrapes them straight out; if an admin ever logged into this box, their credentials are sitting there.

Those keys feed **lateral movement** toward the **domain controller** — the server that holds the accounts and credentials for the *entire* network, centrally. Find the key to one room, then the key to the vault. Own the domain controller and you can log into *any* machine as a legitimate admin: **game over**. Each hop is a new foothold → rerun the loop.

??? example "Real case — Target (2013)"

    Entry through a phished HVAC contractor's stolen vendor login, then lateral movement to the point-of-sale network — roughly 40 million card numbers. A worm is this same move, automated.

<div class="admonition defender" markdown="1">

🛡 The defender's counter — protect the credentials

**Credential Guard** and **LSASS protection** wall off that memory from Mimikatz; **unique local-admin passwords** stop one stolen password opening the rest; and **multi-factor authentication** means a stolen password alone isn't enough to log in.

</div>

## 5. Act — exfiltrate, quietly

Eventually you reach the prize — the database of card numbers or SSNs. As a trusted admin, **reaching** the data is the easy part. **Getting it out** is the hard part, because a big transfer of sensitive data to an unfamiliar host lights up volume alerts and **DLP** (data-loss-prevention) tools. So the act is done under stealth.

- 🐢 **Low and slow** — trickle the data out in small chunks over days, so there's never a volume spike to notice. Disguise it as ordinary **HTTPS** to a normal-looking site, and encrypt it so inspection can't read the contents.
- 🕳️ **DNS tunneling** — every web request starts with a DNS lookup, so DNS is almost always allowed out. Encode the data into lookups (`chunk1.attacker.com`, `chunk2…`) and the network forwards each one to the attacker's DNS server. Many lookups, but the data leaves without an alarm.

## Covering tracks — the exit

The work is done; now clean up on the way out — and this is different from stealth. Stealth kept you unseen *while* operating; covering tracks is anti-forensics *afterward*. Like a burglar switching off the cameras **and** wiping what they already recorded.

- 🎥 **Disable logging** — turn the cameras off before they record you
- 🧹 **Clear logs** — event, auth, and shell history
- 🕰️ **Timestomp** — fake file timestamps so planted files blend in

Why bother? Two reasons. First, to **buy time** — the later anyone notices, the longer your access lasts and the colder the trail gets. Second, and bigger, to **defeat the forensic investigation**: when responders arrive to reconstruct how you got in, what you took, how long you stayed, and who you are, there's no evidence left to answer them.

## Malware is this loop, automated

Everything above was done by hand. Malware is simply that routine written as software — modules assembled like any other program, custom-built for a target.

| Stage in the loop  | Malware component            |
|--------------------|------------------------------|
| get in             | dropper / exploit            |
| escalate           | privilege-escalation module  |
| persist            | persistence mechanism        |
| steal credentials  | credential-theft module      |
| act / pivot        | payload + C2                 |

Stealth spans *every* stage — it's the band, not a box. Real samples use only the pieces they need, and the familiar names are just common bundles:

- **virus** — infects existing files · **worm** — self-spreads, no user needed · **trojan** — disguised, run by a tricked user · **RAT** — ongoing remote control · **ransomware** — the encrypt-for-extortion payoff

??? note "💣 Damage, not theft"

    Not every attacker wants data. **Ransomware** encrypts your files and holds them for a ransom — and attacks on **industrial and refrigeration control systems** can manipulate physical equipment directly. When the goal is damage, the "act" looks different, but the routine to reach it is the same.

One line to take away: **the loop is the spine, stealth is the band, malware is the tooling — run on every host you reach.**

## Defender's view

<div class="admonition defender" markdown="1">

A control at every step

Because the attacker is *forced* to follow this routine, the defender gets to place a control at **every step** — that's what "defense in depth" means.

| Attacker's move | Defender's control |
|---|---|
| Get in / escalate | **Patch** — closes the hole so the exploit fails |
| Any foothold | **Least privilege** — limits what a compromise reaches |
| Stay hidden | **EDR** — catches behavior packing can't hide |
| Steal credentials | **Credential Guard · LAPS · MFA** — nothing worth stealing |
| Exfiltrate | **DLP · outbound monitoring** — watches data leaving |
| Cover tracks | **Protected telemetry** — logs they can't erase |

The routine is predictable, which is exactly what makes it defendable: the attacker has to get every step right; the defender only has to catch one.

</div>

## Recap

**By hand:** get in (ShellShock → `www-data`) → escalate to root/SYSTEM → persist → stay hidden → harvest credentials → pivot toward the domain controller → exfiltrate the prize — logs cleared on the way out. **Automated:** the same loop handed to tools (dropper, privesc, persistence, cred theft, payload + C2) under a stealth layer — a RAT bundles several of the pieces, a worm loops the whole thing, ransomware is the payoff. Next week we move up a layer: **Web Attacks**, where the vulnerable thing is the application itself.

## References

- **MITRE ATT&CK** — the technique tags above link straight to it. [attack.mitre.org](https://attack.mitre.org/)
- **GTFOBins** — Linux privilege-escalation reference. [gtfobins.github.io](https://gtfobins.github.io/)
- **LOLBAS** — the Windows equivalent (living-off-the-land binaries). [lolbas-project.github.io](https://lolbas-project.github.io/)
- **Metasploit Unleashed** (OffSec, free). [offsec.com/metasploit-unleashed](https://www.offsec.com/metasploit-unleashed/)
