[← Course home](../index.html) · Ethical Hacking

# Week 1 · Framework, Law & Ethics

<span class="kc-badge">🗺️ The map for the whole course</span>

<div class="admonition abstract" markdown="1">

What this page covers

- The attacker–defender **loop**, and how AI accelerates it
- **Threat, vulnerability & risk** — the one idea everything turns on
- The defender's playbook: the **NIST Cybersecurity Framework**
- The attacker's playbook: the **kill chain** — *land and expand* — and
  how it lines up with the **Cyber Kill Chain** and **MITRE ATT&CK**
- **Enterprise architecture** and **defense in depth** — the layers
  we'll attack
- **Law & authorization** — the line that makes it *ethical*

</div>

## 1. The attacker–defender loop

Security is a constant back-and-forth between two sides. On one side,
the **defenders** — any company trying to protect its infrastructure and
data (the "blue" side). On the other, the **attackers** — hackers trying
to break in and steal that data (the "red" side). Defenders get better,
so attackers get better, so defenders improve again — round and round.
If you've played competitive video games, it's the same loop; in real
life the stakes are millions of dollars and, increasingly, whole
economies.

<div style="max-width:260px;margin:18px auto;" markdown="1">

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgMjQwIDI0MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJUaGUgYXR0YWNrZXLigJNkZWZlbmRlciBsb29wOiBkZWZlbmRlcnMgYW5kIGF0dGFja2VycyBlYWNoIGtlZXAgaW1wcm92aW5nIGFnYWluc3QgdGhlIG90aGVyLiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0id2lkdGg6MTAwJTtoZWlnaHQ6YXV0bztkaXNwbGF5OmJsb2NrO2ZvbnQtZmFtaWx5OiYjMzk7U3luZSYjMzk7LHN5c3RlbS11aSxzYW5zLXNlcmlmOyI+CiAgPGRlZnM+CiAgICA8bWFya2VyIGlkPSJscEIiIG1hcmtlcnVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgbWFya2Vyd2lkdGg9IjIwIiBtYXJrZXJoZWlnaHQ9IjE2IiByZWZ4PSI1IiByZWZ5PSI4IiBvcmllbnQ9ImF1dG8iPjxwYXRoIGQ9Ik0yLDIgTDE4LDggTDIsMTQgWiIgZmlsbD0iIzFFNDBBRiI+PC9wYXRoPjwvbWFya2VyPgogICAgPG1hcmtlciBpZD0ibHBSIiBtYXJrZXJ1bml0cz0idXNlclNwYWNlT25Vc2UiIG1hcmtlcndpZHRoPSIyMCIgbWFya2VyaGVpZ2h0PSIxNiIgcmVmeD0iNSIgcmVmeT0iOCIgb3JpZW50PSJhdXRvIj48cGF0aCBkPSJNMiwyIEwxOCw4IEwyLDE0IFoiIGZpbGw9IiNjMDM5MmIiPjwvcGF0aD48L21hcmtlcj4KICA8L2RlZnM+CiAgPCEtLSB0d28gYXJjcyB3aXRoIGEgZ2FwIHRvcCBhbmQgYm90dG9tLCBhcnJvd2hlYWRzIHNob3dpbmcgdGhlIGN5Y2xlIC0tPgogIDxwYXRoIGQ9Ik0gMTI4LDQ0IEEgNzYsNzYgMCAwIDEgMTk2LDE0OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUU0MEFGIiBzdHJva2Utd2lkdGg9IjExIiBzdHJva2UtbGluZWNhcD0icm91bmQiIG1hcmtlci1lbmQ9InVybCgjbHBCKSI+PC9wYXRoPgogIDxwYXRoIGQ9Ik0gMTEyLDE5NiBBIDc2LDc2IDAgMCAxIDQ0LDkyIiBmaWxsPSJub25lIiBzdHJva2U9IiNjMDM5MmIiIHN0cm9rZS13aWR0aD0iMTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgbWFya2VyLWVuZD0idXJsKCNscFIpIj48L3BhdGg+CiAgPHRleHQgeD0iMTIwIiB5PSIzNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiI+8J+boe+4jzwvdGV4dD4KICA8dGV4dCB4PSIxMjAiIHk9IjIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiI+4pqU77iPPC90ZXh0PgogIDx0ZXh0IHg9IjEyMCIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjMUU0MEFGIj5ERUZFTkRFUlM8L3RleHQ+CiAgPHRleHQgeD0iMTIwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiNjMDM5MmIiPkFUVEFDS0VSUzwvdGV4dD4KPC9zdmc+)

</div>

In your other courses you may have learned the **blue** side — how
defenses are built. **This course flips to the red side:** we learn how
attackers get through, because you cannot defend a system well until you
understand exactly how it is broken.

And **AI is spinning this loop faster.** It's like an arms dealer arming
both sides: attackers use it to find and exploit weaknesses faster (and
lets less-skilled people attack at all), while defenders use it to find
and fix weaknesses at unprecedented speed.

## 2. Threat, vulnerability & risk

For an attack to actually cause harm, **two things must line up**:

- A **vulnerability** — a weakness or gap in the system (an unpatched
  server, a misconfigured firewall, no ransomware protection). This is
  *why harm is possible*.
- A **threat** — an actor trying to exploit that weakness. This is *what
  causes harm*.

**Risk** lives at the *intersection*. A weakness nobody attacks is
harmless; an attacker with nothing to exploit gets nowhere. It's only
when a threat meets a vulnerability that risk exists.

<div style="max-width:440px;margin:18px auto;" markdown="1">

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNDQwIDIwMCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJSaXNrIGlzIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhyZWF0IGFuZCB2dWxuZXJhYmlsaXR5LiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0id2lkdGg6MTAwJTtoZWlnaHQ6YXV0bztkaXNwbGF5OmJsb2NrO2ZvbnQtZmFtaWx5OiYjMzk7U3luZSYjMzk7LHN5c3RlbS11aSxzYW5zLXNlcmlmOyI+CiAgPGNpcmNsZSBjeD0iMTY1IiBjeT0iMTAwIiByPSI5MiIgZmlsbD0icmdiYSgyNDUsMTU4LDExLC4xNCkiIHN0cm9rZT0iI2Y1OWUwYiIgc3Ryb2tlLXdpZHRoPSIzIj48L2NpcmNsZT4KICA8Y2lyY2xlIGN4PSIyNzUiIGN5PSIxMDAiIHI9IjkyIiBmaWxsPSJyZ2JhKDI0NSwxNTgsMTEsLjE0KSIgc3Ryb2tlPSIjZjU5ZTBiIiBzdHJva2Utd2lkdGg9IjMiPjwvY2lyY2xlPgogIDx0ZXh0IHg9IjExMiIgeT0iOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiMwQzQ0N0MiPlRIUkVBVDwvdGV4dD4KICA8dGV4dCB4PSIxMTIiIHk9IjExNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjUiIGZpbGw9IiM2YjcyODAiPmNhdXNlcyBoYXJtPC90ZXh0PgogIDx0ZXh0IHg9IjMyOCIgeT0iOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiMwQzQ0N0MiPlZVTE4uPC90ZXh0PgogIDx0ZXh0IHg9IjMyOCIgeT0iMTE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iIzZiNzI4MCI+dGhlIHdlYWtuZXNzPC90ZXh0PgogIDx0ZXh0IHg9IjIyMCIgeT0iOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiNjMDM5MmIiPlJJU0s8L3RleHQ+CiAgPHRleHQgeD0iMjIwIiB5PSIxMTMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iI2MwMzkyYiI+dGhlIG92ZXJsYXA8L3RleHQ+Cjwvc3ZnPg==)

</div>

<div class="admonition example" markdown="1">

A concrete example

A company has **no ransomware protection** — that's the *vulnerability*.
A cybercriminal emails an employee ransomware and they click it — that's
the *threat*. The company's data is all encrypted and they must pay to
get it back — that's the *risk* (the outcome). Remove either side and
there's no incident.

</div>

For a long time it was skilled humans — "black hats" — who found and
exploited these weaknesses. Now even unskilled people can use AI to do
it, and AI systems are beginning to find and exploit vulnerabilities on
their own. As attackers, our whole job in this course is turning
vulnerabilities into risk.

## 3. The defender's playbook — the NIST framework

Before we attack, understand how defenders think, because we'll mirror
it. The industry standard is the **NIST Cybersecurity Framework**
(National Institute of Standards and Technology), built around five
phases. The easiest way to hold them is the **house analogy** — **click
each phase**:

<div class="nist-strip" markdown="1">

<div id="nist-node-1" class="nist-phase" style="background:#2aa0e0"
onclick="nistShow(1)" role="button" tabindex="0" aria-label="Identify" markdown="1">

Identify<span class="small">know your assets</span>

</div>

<div id="nist-node-2" class="nist-phase" style="background:#f59e0b"
onclick="nistShow(2)" role="button" tabindex="0" aria-label="Protect" markdown="1">

Protect<span class="small">build the walls</span>

</div>

<div id="nist-node-3" class="nist-phase" style="background:#0C447C"
onclick="nistShow(3)" role="button" tabindex="0" aria-label="Detect" markdown="1">

Detect<span class="small">watch for intruders</span>

</div>

<div id="nist-node-4" class="nist-phase" style="background:#c0392b"
onclick="nistShow(4)" role="button" tabindex="0" aria-label="Respond" markdown="1">

Respond<span class="small">contain & act</span>

</div>

<div id="nist-node-5" class="nist-phase" style="background:#2e9e5b"
onclick="nistShow(5)" role="button" tabindex="0" aria-label="Recover" markdown="1">

Recover<span class="small">restore to normal</span>

</div>

</div>

↑ **Click a phase** — each maps the house analogy to real company tech

<div id="nist-panel-1" class="nist-panel" markdown="1">

#### 🔎 Identify

Figure out what's valuable and worth protecting — you can't protect what
you don't know you have.

**At home:** the jewelry, the deed.  **In a company:** asset inventory,
data classification.

</div>

<div id="nist-panel-2" class="nist-panel" markdown="1">

#### 🔒 Protect

Put controls in place to keep attackers out.

**At home:** a safe, a locked room, locking the house.  **In a
company:** firewalls, antivirus, patching, MFA.

</div>

<div id="nist-panel-3" class="nist-panel" markdown="1">

#### 👁️ Detect

Because protection eventually fails, watch for anything anomalous.

**At home:** cameras.  **In a company:** IDS/IPS, log monitoring, a SIEM
& SOC.

</div>

<div id="nist-panel-4" class="nist-panel" markdown="1">

#### 🚨 Respond

Act the moment something is caught — contain it and push the attacker
out.

**At home:** call the security company or police.  **In a company:**
auto-quarantine a host, alert a SOC analyst, forensics.

</div>

<div id="nist-panel-5" class="nist-panel" markdown="1">

#### ♻️ Recover

Get back to a normal operating state.

**At home:** replace what was taken.  **In a company:** restore from
backups, harden against a repeat.

</div>

Most security products you'll ever hear of are really just a solution
for one of these five phases.

<div class="admonition note" markdown="1">

A sixth function in CSF 2.0

The 2024 update (**CSF 2.0**) adds a sixth function, **Govern** — the
policy, roles, and risk decisions that wrap the other five. We focus on
the **operational five** above, since those are what attacks actually
touch; just know that in current NIST material you'll see six.

</div>

## 4. The attacker's playbook — the kill chain (*land and expand*)

The attacker's version of that lifecycle is the **kill chain**, and it
has a simple shape: **land, then expand.** First they **land** —
reconnaissance to study the target, then exploitation to get a foothold
on one machine. That first machine is rarely the goal, so they
**expand** — escalate privileges, move laterally to the next machine,
establish persistence — until they reach something of high value and
exfiltrate it.

We'll track this all term. Most of Weeks 2–11 live on one of these
phases (Week 10, cryptography, is the exception — it's a cross-cutting
data-protection topic, not a phase). **Click a phase** to see what it
covers.

<div class="admonition note" markdown="1">

One track runs parallel to this

**Social Engineering & the Identity Layer (Week 11)** is
deliberately *off* this diagram. Social engineering doesn't exploit a
machine; it manipulates a person so the attacker can **log in, not hack
in**. It's a parallel track we close the course on.

</div>

<div class="killchain" markdown="0">

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgODYwIDE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0id2lkdGg6MTAwJTttYXgtd2lkdGg6ODYwcHg7aGVpZ2h0OmF1dG87IiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IkZpdmUtcGhhc2UgZXRoaWNhbCBoYWNraW5nIGtpbGwgY2hhaW4iPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0ia2MtYXJyb3ciIHZpZXdib3g9IjAgMCAxMCAxMCIgcmVmeD0iOSIgcmVmeT0iNSIgbWFya2Vyd2lkdGg9IjgiIG1hcmtlcmhlaWdodD0iOCIgb3JpZW50PSJhdXRvIj4KICAgICAgPHBhdGggZD0iTSAwIDAgTCAxMCA1IEwgMCAxMCB6IiBmaWxsPSIjOWFhMGE2Ij48L3BhdGg+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHJlY3QgY2xhc3M9ImtjLXBoYXNlIiBpZD0ia2MtcmVjdC0xIiB4PSIxMCIgeT0iMzUiIHdpZHRoPSIxNTAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjRTZGMUZCIiBzdHJva2U9IiMwQzQ0N0MiIHN0cm9rZS13aWR0aD0iMSIgb25jbGljaz0ia2hTaG93KDEpIj48L3JlY3Q+CiAgPHRleHQgeD0iODUiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzBDNDQ3QyIgcG9pbnRlci1ldmVudHM9Im5vbmUiPjEgwrcgUmVjb25uYWlzc2FuY2U8L3RleHQ+CiAgPHRleHQgeD0iODUiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMC41IiBmaWxsPSIjMEM0NDdDIiBwb2ludGVyLWV2ZW50cz0ibm9uZSI+UHJvZmlsZSB0aGUgdGFyZ2V0PC90ZXh0PgogIDxsaW5lIHgxPSIxNjIiIHkxPSI3NSIgeDI9IjE3NiIgeTI9Ijc1IiBzdHJva2U9IiM5YWEwYTYiIHN0cm9rZS13aWR0aD0iMS4yIiBtYXJrZXItZW5kPSJ1cmwoI2tjLWFycm93KSI+PC9saW5lPgogIDxyZWN0IGNsYXNzPSJrYy1waGFzZSIgaWQ9ImtjLXJlY3QtMiIgeD0iMTc4IiB5PSIzNSIgd2lkdGg9IjE1MCIgaGVpZ2h0PSI4MCIgcng9IjgiIGZpbGw9IiNFNkYxRkIiIHN0cm9rZT0iIzBDNDQ3QyIgc3Ryb2tlLXdpZHRoPSIxIiBvbmNsaWNrPSJraFNob3coMikiPjwvcmVjdD4KICA8dGV4dCB4PSIyNTMiIHk9IjcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzBDNDQ3QyIgcG9pbnRlci1ldmVudHM9Im5vbmUiPjIgwrcgU2Nhbm5pbmc8L3RleHQ+CiAgPHRleHQgeD0iMjUzIiB5PSI5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAuNSIgZmlsbD0iIzBDNDQ3QyIgcG9pbnRlci1ldmVudHM9Im5vbmUiPkZpbmQgd2hhdCYjMzk7cyByZWFjaGFibGU8L3RleHQ+CiAgPGxpbmUgeDE9IjMzMCIgeTE9Ijc1IiB4Mj0iMzQ0IiB5Mj0iNzUiIHN0cm9rZT0iIzlhYTBhNiIgc3Ryb2tlLXdpZHRoPSIxLjIiIG1hcmtlci1lbmQ9InVybCgja2MtYXJyb3cpIj48L2xpbmU+CiAgPHJlY3QgY2xhc3M9ImtjLXBoYXNlIiBpZD0ia2MtcmVjdC0zIiB4PSIzNDYiIHk9IjM1IiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjgwIiByeD0iOCIgZmlsbD0iI0ZBRUVEQSIgc3Ryb2tlPSIjODU0RjBCIiBzdHJva2Utd2lkdGg9IjEiIG9uY2xpY2s9ImtoU2hvdygzKSI+PC9yZWN0PgogIDx0ZXh0IHg9IjQyMSIgeT0iNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIiBmb250LXNpemU9IjEzIiBmaWxsPSIjODU0RjBCIiBwb2ludGVyLWV2ZW50cz0ibm9uZSI+MyDCtyBHYWluaW5nIEFjY2VzczwvdGV4dD4KICA8dGV4dCB4PSI0MjEiIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMC41IiBmaWxsPSIjODU0RjBCIiBwb2ludGVyLWV2ZW50cz0ibm9uZSI+RXhwbG9pdCAmYW1wOyBmb290aG9sZDwvdGV4dD4KICA8bGluZSB4MT0iNDk4IiB5MT0iNzUiIHgyPSI1MTIiIHkyPSI3NSIgc3Ryb2tlPSIjOWFhMGE2IiBzdHJva2Utd2lkdGg9IjEuMiIgbWFya2VyLWVuZD0idXJsKCNrYy1hcnJvdykiPjwvbGluZT4KICA8cmVjdCBjbGFzcz0ia2MtcGhhc2UiIGlkPSJrYy1yZWN0LTQiIHg9IjUxNCIgeT0iMzUiIHdpZHRoPSIxNTAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjRkFFRURBIiBzdHJva2U9IiM4NTRGMEIiIHN0cm9rZS13aWR0aD0iMSIgb25jbGljaz0ia2hTaG93KDQpIj48L3JlY3Q+CiAgPHRleHQgeD0iNTg5IiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM4NTRGMEIiIHBvaW50ZXItZXZlbnRzPSJub25lIj40IMK3IE1haW50YWluaW5nPC90ZXh0PgogIDx0ZXh0IHg9IjU4OSIgeT0iOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjEwLjUiIGZpbGw9IiM4NTRGMEIiIHBvaW50ZXItZXZlbnRzPSJub25lIj5QZXJzaXN0ZW5jZSAmYW1wOyBDMjwvdGV4dD4KICA8bGluZSB4MT0iNjY2IiB5MT0iNzUiIHgyPSI2ODAiIHkyPSI3NSIgc3Ryb2tlPSIjOWFhMGE2IiBzdHJva2Utd2lkdGg9IjEuMiIgbWFya2VyLWVuZD0idXJsKCNrYy1hcnJvdykiPjwvbGluZT4KICA8cmVjdCBjbGFzcz0ia2MtcGhhc2UiIGlkPSJrYy1yZWN0LTUiIHg9IjY4MiIgeT0iMzUiIHdpZHRoPSIxNTAiIGhlaWdodD0iODAiIHJ4PSI4IiBmaWxsPSIjRkNFQkVCIiBzdHJva2U9IiM3OTFGMUYiIHN0cm9rZS13aWR0aD0iMSIgb25jbGljaz0ia2hTaG93KDUpIj48L3JlY3Q+CiAgPHRleHQgeD0iNzU3IiB5PSI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM3OTFGMUYiIHBvaW50ZXItZXZlbnRzPSJub25lIj41IMK3IENvdmVyaW5nIFRyYWNrczwvdGV4dD4KICA8dGV4dCB4PSI3NTciIHk9IjkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMC41IiBmaWxsPSIjNzkxRjFGIiBwb2ludGVyLWV2ZW50cz0ibm9uZSI+RXZhZGUgJmFtcDsgY2xlYW4gdXA8L3RleHQ+Cjwvc3ZnPg==)

↑ **Click any phase** to see what it covers

<div id="kc-panel-1" class="kc-panel" markdown="1">

#### 1 · Reconnaissance <span style="font-weight:400;color:#6b7280;">— LAND</span>

Gather information about the target without (or before) touching it
directly: footprinting, OSINT, WHOIS, and DNS. The output is a target
profile that drives everything else.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 2 · **ATT&CK tactic:** Reconnaissance (TA0043)

</div>

</div>

<div id="kc-panel-2" class="kc-panel" markdown="1">

#### 2 · Scanning & Enumeration <span style="font-weight:400;color:#6b7280;">— LAND</span>

Actively probe the target to find live hosts, open ports, services, and
versions — then enumerate those services for users, shares, and
configuration.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 3 (and network sniffing, Week 4) · **ATT&CK
technique:** Active Scanning (T1595, under Reconnaissance) — external
scanning is pre-compromise; the *Discovery* tactic (TA0007) is its
internal, post-foothold cousin

</div>

</div>

<div id="kc-panel-3" class="kc-panel" markdown="1">

#### 3 · Gaining Access <span style="font-weight:400;color:#6b7280;">— LAND → EXPAND</span>

Exploit a vulnerability to get code execution — on a system, a web app,
a wireless network, or a person. This is the foothold, and where
**privilege escalation** and **lateral movement** begin.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 5 (wireless), Week 6 (systems), Weeks 8–9 (web) ·
**ATT&CK tactics:** Initial Access (TA0001), Execution (TA0002)

</div>

</div>

<div id="kc-panel-4" class="kc-panel" markdown="1">

#### 4 · Maintaining Access <span style="font-weight:400;color:#6b7280;">— EXPAND</span>

Keep the foothold alive and reach for the crown jewels: backdoors,
trojans/RATs, command-and-control, and exfiltration. Also where
denial-of-service and session hijacking live.

<div class="kc-weeks" markdown="1">

**Covered in:** Week 7 · **ATT&CK tactics:** Persistence (TA0003),
Command & Control (TA0011)

</div>

</div>

<div id="kc-panel-5" class="kc-panel" markdown="1">

#### 5 · Covering Tracks <span style="font-weight:400;color:#6b7280;">— EXPAND</span>

Evade detection and hide the intrusion — log tampering, timestomping,
and anti-forensics. For the defender, this is where good logging and a
pen-test report matter most.

<div class="kc-weeks" markdown="1">

**Covered in:** folded into the full engagement (Week 12) rather than
taught as its own week · **ATT&CK tactic:** Defense Evasion (TA0005)

</div>

</div>

</div>

### One attack, four ways to name it

The attacker loop is simple: **reconnaissance** to study the target,
then **land** — exploitation to get a foothold — then **expand** —
escalate, move, and persist to reach the prize. The course itself is
organized by the **CEH five phases**, and two named industry models —
Lockheed Martin's **Cyber Kill Chain** and **MITRE ATT&CK** — describe
the same sequence. Here's how they line up:

<div style="overflow-x:auto;margin:20px 0;" markdown="1">

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgOTEwIDI5NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0id2lkdGg6MTAwJTttYXgtd2lkdGg6OTEwcHg7aGVpZ2h0OmF1dG87ZGlzcGxheTpibG9jaztmb250LWZhbWlseTpzYW5zLXNlcmlmOyIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJUaGUgbGVjdHVyZSYjMzk7cyBsYW5kLWFuZC1leHBhbmQgYXR0YWNrZXIgbG9vcCwgbWFwcGVkIHRvIHRoZSBDRUggY291cnNlIHN0cnVjdHVyZSwgdGhlIExvY2toZWVkIEN5YmVyIEtpbGwgQ2hhaW4sIGFuZCBNSVRSRSBBVFQmYW1wO0NLLiI+CjxsaW5lIHgxPSIyMTEuMCIgeTE9IjEwNiIgeDI9IjIxMS4wIiB5Mj0iMjg2IiBzdHJva2U9IiNkOWRlZTUiIHN0cm9rZS13aWR0aD0iMSI+PC9saW5lPgo8bGluZSB4MT0iMzY1LjAiIHkxPSIxMDYiIHgyPSIzNjUuMCIgeTI9IjI4NiIgc3Ryb2tlPSIjZDlkZWU1IiBzdHJva2Utd2lkdGg9IjEiPjwvbGluZT4KPGxpbmUgeDE9IjUxOS4wIiB5MT0iMTA2IiB4Mj0iNTE5LjAiIHkyPSIyODYiIHN0cm9rZT0iI2Q5ZGVlNSIgc3Ryb2tlLXdpZHRoPSIxIj48L2xpbmU+CjxsaW5lIHgxPSI2NzMuMCIgeTE9IjEwNiIgeDI9IjY3My4wIiB5Mj0iMjg2IiBzdHJva2U9IiNkOWRlZTUiIHN0cm9rZS13aWR0aD0iMSI+PC9saW5lPgo8bGluZSB4MT0iODI3LjAiIHkxPSIxMDYiIHgyPSI4MjcuMCIgeTI9IjI4NiIgc3Ryb2tlPSIjZDlkZWU1IiBzdHJva2Utd2lkdGg9IjEiPjwvbGluZT4KPHRleHQgeD0iOCIgeT0iMjQuMCIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iIzdhMmYyMiI+QXR0YWNrZXIgbG9vcDwvdGV4dD4KPHRleHQgeD0iOCIgeT0iMzguMCIgZm9udC1zaXplPSI5LjIiIGZpbGw9IiM2YjcyODAiPnRoZSBpbnR1aXRpb248L3RleHQ+Cjx0ZXh0IHg9IjgiIHk9Ijc5LjAiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiMwZTZiODIiPkNFSDwvdGV4dD4KPHRleHQgeD0iOCIgeT0iOTMuMCIgZm9udC1zaXplPSI5LjIiIGZpbGw9IiM2YjcyODAiPmNvdXJzZSBzdHJ1Y3R1cmU8L3RleHQ+Cjx0ZXh0IHg9IjgiIHk9IjEzNy4wIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjMEM0NDdDIj5DeWJlciBLaWxsIENoYWluPC90ZXh0Pgo8dGV4dCB4PSI4IiB5PSIxNTEuMCIgZm9udC1zaXplPSI5LjIiIGZpbGw9IiM2YjcyODAiPkxvY2toZWVkIE1hcnRpbjwvdGV4dD4KPHRleHQgeD0iOCIgeT0iMjI1LjAiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiM3YTRhMGIiPk1JVFJFIEFUVCZhbXA7Q0s8L3RleHQ+Cjx0ZXh0IHg9IjgiIHk9IjIzOS4wIiBmb250LXNpemU9IjkuMiIgZmlsbD0iIzZiNzI4MCI+dGFjdGljcyAvIHRlY2huaXF1ZXM8L3RleHQ+CjxyZWN0IHg9IjEzOCIgeT0iMTAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMzQiIHJ4PSI5IiBmaWxsPSJub25lIiBzdHJva2U9IiNjMmNjZDgiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtZGFzaGFycmF5PSI0IDMiPjwvcmVjdD4KPHRleHQgeD0iMjg4IiB5PSIzMS4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwLjUiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM2NDc0OGIiPnJlY29ubmFpc3NhbmNlIMK3IGJlZm9yZSB0aGUgZm9vdGhvbGQ8L3RleHQ+CjxyZWN0IHg9IjQ0NiIgeT0iMTAiIHdpZHRoPSIxNDYiIGhlaWdodD0iMzQiIHJ4PSIxNyIgZmlsbD0iIzJiNmNiMCI+PC9yZWN0Pgo8dGV4dCB4PSI1MTkiIHk9IjMyLjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiNmZmZmZmYiIGxldHRlci1zcGFjaW5nPSIxIj5MQU5EPC90ZXh0Pgo8dGV4dCB4PSI1OTYiIHk9IjMzLjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiM5YWEzYWYiPuKAujwvdGV4dD4KPHJlY3QgeD0iNjAwIiB5PSIxMCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSIzNCIgcng9IjE3IiBmaWxsPSIjYzA0NTNhIj48L3JlY3Q+Cjx0ZXh0IHg9IjY3MyIgeT0iMzIuMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iI2ZmZmZmZiIgbGV0dGVyLXNwYWNpbmc9IjEiPkVYUEFORDwvdGV4dD4KPHJlY3QgeD0iNzU0IiB5PSIxMCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSIzNCIgcng9IjkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZThmMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjQgMyI+PC9yZWN0Pgo8dGV4dCB4PSI4MjciIHk9IjMxLjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiIGZvbnQtc3R5bGU9Iml0YWxpYyIgZmlsbD0iIzk0YTNiOCI+bm90IGluIHRoZSBsb29wPC90ZXh0Pgo8cmVjdCB4PSIxMzgiIHk9IjU4IiB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjQ4IiByeD0iOSIgZmlsbD0iIzBlNmI4MiIgc3Ryb2tlPSIjMGE1NjY2IiBzdHJva2Utd2lkdGg9IjEiPjwvcmVjdD4KPHRleHQgeD0iMjExLjAiIHk9Ijg3LjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiNmZmZmZmYiPjEgwrcgUmVjb25uYWlzc2FuY2U8L3RleHQ+CjxyZWN0IHg9IjEzOCIgeT0iMTE0IiB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjUyIiByeD0iOSIgZmlsbD0iI2VhZjJmYiIgc3Ryb2tlPSIjYjZjZmU4IiBzdHJva2Utd2lkdGg9IjEiPjwvcmVjdD4KPHRleHQgeD0iMjExLjAiIHk9IjEzNi4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMEM0NDdDIj5SZWNvbm5haXNzYW5jZTwvdGV4dD4KPHRleHQgeD0iMjExLjAiIHk9IjE1MS4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMEM0NDdDIj5XZWFwb25pemF0aW9uPC90ZXh0Pgo8cmVjdCB4PSIxMzgiIHk9IjE3NCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSIxMDgiIHJ4PSI5IiBmaWxsPSIjZmRmMWRmIiBzdHJva2U9IiNlNmM5OWEiIHN0cm9rZS13aWR0aD0iMSI+PC9yZWN0Pgo8dGV4dCB4PSIyMTEuMCIgeT0iMjIyLjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS42IiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSIjN2E0YTBiIj5SZWNvbm5haXNzYW5jZSAoVEEwMDQzKTwvdGV4dD4KPHRleHQgeD0iMjExLjAiIHk9IjIzNy42IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iIzdhNGEwYiI+UmVzb3VyY2UgRGV2LiAoVEEwMDQyKTwvdGV4dD4KPHJlY3QgeD0iMjkyIiB5PSI1OCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSI0OCIgcng9IjkiIGZpbGw9IiMwZTZiODIiIHN0cm9rZT0iIzBhNTY2NiIgc3Ryb2tlLXdpZHRoPSIxIj48L3JlY3Q+Cjx0ZXh0IHg9IjM2NS4wIiB5PSI3OS4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjZmZmZmZmIj4yIMK3IFNjYW5uaW5nICZhbXA7PC90ZXh0Pgo8dGV4dCB4PSIzNjUuMCIgeT0iOTUuMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iI2ZmZmZmZiI+RW51bWVyYXRpb248L3RleHQ+CjxyZWN0IHg9IjI5MiIgeT0iMTE0IiB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjUyIiByeD0iOSIgZmlsbD0iI2YxZjRmOCIgc3Ryb2tlPSIjZDdkZWU4IiBzdHJva2Utd2lkdGg9IjEiPjwvcmVjdD4KPHRleHQgeD0iMzY1LjAiIHk9IjE0My4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwLjUiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiM5YWEzYWYiPihubyBkaXJlY3Qgc3RhZ2UpPC90ZXh0Pgo8cmVjdCB4PSIyOTIiIHk9IjE3NCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSIxMDgiIHJ4PSI5IiBmaWxsPSIjZmRmMWRmIiBzdHJva2U9IiNlNmM5OWEiIHN0cm9rZS13aWR0aD0iMSI+PC9yZWN0Pgo8dGV4dCB4PSIzNjUuMCIgeT0iMjMwLjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS42IiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSIjN2E0YTBiIj5BY3RpdmUgU2Nhbm5pbmcgKFQxNTk1KTwvdGV4dD4KPHJlY3QgeD0iNDQ2IiB5PSI1OCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSI0OCIgcng9IjkiIGZpbGw9IiMwZTZiODIiIHN0cm9rZT0iIzBhNTY2NiIgc3Ryb2tlLXdpZHRoPSIxIj48L3JlY3Q+Cjx0ZXh0IHg9IjUxOS4wIiB5PSI4Ny4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjZmZmZmZmIj4zIMK3IEdhaW5pbmcgQWNjZXNzPC90ZXh0Pgo8cmVjdCB4PSI0NDYiIHk9IjExNCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgcng9IjkiIGZpbGw9IiNlYWYyZmIiIHN0cm9rZT0iI2I2Y2ZlOCIgc3Ryb2tlLXdpZHRoPSIxIj48L3JlY3Q+Cjx0ZXh0IHg9IjUxOS4wIiB5PSIxMjguNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzBDNDQ3QyI+RGVsaXZlcnk8L3RleHQ+Cjx0ZXh0IHg9IjUxOS4wIiB5PSIxNDMuNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzBDNDQ3QyI+RXhwbG9pdGF0aW9uPC90ZXh0Pgo8dGV4dCB4PSI1MTkuMCIgeT0iMTU4LjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMwQzQ0N0MiPkluc3RhbGxhdGlvbjwvdGV4dD4KPHJlY3QgeD0iNDQ2IiB5PSIxNzQiIHdpZHRoPSIxNDYiIGhlaWdodD0iMTA4IiByeD0iOSIgZmlsbD0iI2ZkZjFkZiIgc3Ryb2tlPSIjZTZjOTlhIiBzdHJva2Utd2lkdGg9IjEiPjwvcmVjdD4KPHRleHQgeD0iNTE5LjAiIHk9IjIxNS4xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iIzdhNGEwYiI+SW5pdGlhbCBBY2Nlc3MgKFRBMDAwMSk8L3RleHQ+Cjx0ZXh0IHg9IjUxOS4wIiB5PSIyMzAuMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjYiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiM3YTRhMGIiPkV4ZWN1dGlvbiAoVEEwMDAyKTwvdGV4dD4KPHRleHQgeD0iNTE5LjAiIHk9IjI0NS4xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iIzdhNGEwYiI+UHJpdi4gRXNjYWxhdGlvbiAoVEEwMDA0KTwvdGV4dD4KPHJlY3QgeD0iNjAwIiB5PSI1OCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSI0OCIgcng9IjkiIGZpbGw9IiMwZTZiODIiIHN0cm9rZT0iIzBhNTY2NiIgc3Ryb2tlLXdpZHRoPSIxIj48L3JlY3Q+Cjx0ZXh0IHg9IjY3My4wIiB5PSI3OS4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjZmZmZmZmIj40IMK3IE1haW50YWluaW5nPC90ZXh0Pgo8dGV4dCB4PSI2NzMuMCIgeT0iOTUuMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iI2ZmZmZmZiI+QWNjZXNzPC90ZXh0Pgo8cmVjdCB4PSI2MDAiIHk9IjExNCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSI1MiIgcng9IjkiIGZpbGw9IiNlYWYyZmIiIHN0cm9rZT0iI2I2Y2ZlOCIgc3Ryb2tlLXdpZHRoPSIxIj48L3JlY3Q+Cjx0ZXh0IHg9IjY3My4wIiB5PSIxMzYuMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzBDNDQ3QyI+Q29tbWFuZCAmYW1wOyBDb250cm9sPC90ZXh0Pgo8dGV4dCB4PSI2NzMuMCIgeT0iMTUxLjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMwQzQ0N0MiPkFjdGlvbnMgb24gT2JqZWN0aXZlczwvdGV4dD4KPHJlY3QgeD0iNjAwIiB5PSIxNzQiIHdpZHRoPSIxNDYiIGhlaWdodD0iMTA4IiByeD0iOSIgZmlsbD0iI2ZkZjFkZiIgc3Ryb2tlPSIjZTZjOTlhIiBzdHJva2Utd2lkdGg9IjEiPjwvcmVjdD4KPHRleHQgeD0iNjczLjAiIHk9IjIwMC4xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iIzdhNGEwYiI+UGVyc2lzdGVuY2UgKFRBMDAwMyk8L3RleHQ+Cjx0ZXh0IHg9IjY3My4wIiB5PSIyMTUuMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjYiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiM3YTRhMGIiPkxhdGVyYWwgTW92ZS4gKFRBMDAwOCk8L3RleHQ+Cjx0ZXh0IHg9IjY3My4wIiB5PSIyMzAuMSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5LjYiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiM3YTRhMGIiPkNvbW1hbmQgJmFtcDsgQ29udHJvbCAoVEEwMDExKTwvdGV4dD4KPHRleHQgeD0iNjczLjAiIHk9IjI0NS4xIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iIzdhNGEwYiI+RXhmaWx0cmF0aW9uIChUQTAwMTApPC90ZXh0Pgo8dGV4dCB4PSI2NzMuMCIgeT0iMjYwLjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS42IiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSIjN2E0YTBiIj5JbXBhY3QgKFRBMDA0MCk8L3RleHQ+CjxyZWN0IHg9Ijc1NCIgeT0iNTgiIHdpZHRoPSIxNDYiIGhlaWdodD0iNDgiIHJ4PSI5IiBmaWxsPSIjMGU2YjgyIiBzdHJva2U9IiMwYTU2NjYiIHN0cm9rZS13aWR0aD0iMSI+PC9yZWN0Pgo8dGV4dCB4PSI4MjcuMCIgeT0iODcuMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iI2ZmZmZmZiI+NSDCtyBDb3ZlcmluZyBUcmFja3M8L3RleHQ+CjxyZWN0IHg9Ijc1NCIgeT0iMTE0IiB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjUyIiByeD0iOSIgZmlsbD0iI2YxZjRmOCIgc3Ryb2tlPSIjZDdkZWU4IiBzdHJva2Utd2lkdGg9IjEiPjwvcmVjdD4KPHRleHQgeD0iODI3LjAiIHk9IjE0My4wIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwLjUiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiM5YWEzYWYiPihubyBkaXJlY3Qgc3RhZ2UpPC90ZXh0Pgo8cmVjdCB4PSI3NTQiIHk9IjE3NCIgd2lkdGg9IjE0NiIgaGVpZ2h0PSIxMDgiIHJ4PSI5IiBmaWxsPSIjZmRmMWRmIiBzdHJva2U9IiNlNmM5OWEiIHN0cm9rZS13aWR0aD0iMSI+PC9yZWN0Pgo8dGV4dCB4PSI4MjcuMCIgeT0iMjMwLjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iOS42IiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSIjN2E0YTBiIj5EZWZlbnNlIEV2YXNpb24gKFRBMDAwNSk8L3RleHQ+Cjwvc3ZnPg==)

</div>

<span class="small">In the attacker loop, **recon** comes first
(studying the target); **land** is getting a foothold — CEH’s *Gaining
Access*; and **expand** is the whole post-exploitation loop — CEH’s
*Maintaining Access*. *Covering Tracks* isn’t part of the loop. The
**CEH row is how the course is structured** (one phase per week);
Lockheed and ATT&CK are the industry references, and the fit isn’t
perfectly one-to-one.</span>

## 5. Enterprise architecture — what we're attacking

So what do those attacks target? Picture a bank. Employees use **client
machines** (laptops) to reach **applications on servers**, tied together
by **networking equipment** (routers, switches). To keep the internet's
"bad stuff" out, the network is walled off by **security equipment** —
**firewalls**, and **IDS/IPS** (intrusion detection/prevention) watching
for anomalies. That boundary is the **network perimeter**.

Customers still need in, so external traffic first lands in the **DMZ**
(demilitarized zone), where a **web server** takes the request (and
**secure web** and **email gateways** scan incoming traffic for
malware). Only valid requests pass deeper, to the **application
servers**, and only they may reach the **database servers**, where the
data lives — a **three-tier** architecture on separate subnets,
separated by **internal firewalls** too. Think of a neighborhood: gates
on the streets *and* gates on each house.

<div class="admonition note" markdown="1">

The castle-and-moat — and its flaw

This is the **castle-and-moat** model: a strong wall (firewall) and a
moat separate inside from outside, with a guarded drawbridge (the VPN
and gateways) as the only sanctioned way across, protecting the crown
jewels in the data center. Its weakness: **once you're past the wall,
you can often roam freely** — internal machines trust each other. That
flat internal trust is exactly what "expand" exploits.

</div>

## 6. Defense in depth — the layers

Because one wall is never enough, defenders build **layers** — *defense
in depth* — with protective controls at every level:

<div style="max-width:520px;margin:20px auto;" markdown="1">

![](data:image/svg+xml;base64,PHN2ZyB2aWV3Ym94PSIwIDAgNTYwIDQ4MCIgcm9sZT0iaW1nIiBhcmlhLWxhYmVsPSJJbnRlcmFjdGl2ZSBkZWZlbnNlLWluLWRlcHRoIGxheWVycyDigJQgY2xpY2sgYSByaW5nLiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0id2lkdGg6MTAwJTtoZWlnaHQ6YXV0bztkaXNwbGF5OmJsb2NrO2ZvbnQtZmFtaWx5OiYjMzk7U3luZSYjMzk7LHN5c3RlbS11aSxzYW5zLXNlcmlmOyI+CiAgPGNpcmNsZSBjbGFzcz0iZGlsLXJpbmciIGlkPSJkaWwtcmluZy0xIiBjeD0iMjgwIiBjeT0iMjQwIiByPSIyMDUiIGZpbGw9IiMyYjhjYTYiIG9uY2xpY2s9ImRpbFNob3coMSkiIHRhYmluZGV4PSIwIiByb2xlPSJidXR0b24iIGFyaWEtbGFiZWw9Ik5ldHdvcmsgbGF5ZXIiPjwvY2lyY2xlPgogIDxjaXJjbGUgY2xhc3M9ImRpbC1yaW5nIiBpZD0iZGlsLXJpbmctMiIgY3g9IjI4MCIgY3k9IjI0MCIgcj0iMTY4IiBmaWxsPSIjM2JhMGJhIiBvbmNsaWNrPSJkaWxTaG93KDIpIiB0YWJpbmRleD0iMCIgcm9sZT0iYnV0dG9uIiBhcmlhLWxhYmVsPSJEZXZpY2UgbGF5ZXIiPjwvY2lyY2xlPgogIDxjaXJjbGUgY2xhc3M9ImRpbC1yaW5nIiBpZD0iZGlsLXJpbmctMyIgY3g9IjI4MCIgY3k9IjI0MCIgcj0iMTMxIiBmaWxsPSIjNTdiOGNmIiBvbmNsaWNrPSJkaWxTaG93KDMpIiB0YWJpbmRleD0iMCIgcm9sZT0iYnV0dG9uIiBhcmlhLWxhYmVsPSJBcHBsaWNhdGlvbiBsYXllciI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjbGFzcz0iZGlsLXJpbmciIGlkPSJkaWwtcmluZy00IiBjeD0iMjgwIiBjeT0iMjQwIiByPSI5NCIgZmlsbD0iIzhhZDJlMyIgb25jbGljaz0iZGlsU2hvdyg0KSIgdGFiaW5kZXg9IjAiIHJvbGU9ImJ1dHRvbiIgYXJpYS1sYWJlbD0iRGF0YSBsYXllciI+PC9jaXJjbGU+CiAgPGNpcmNsZSBjbGFzcz0iZGlsLXJpbmciIGlkPSJkaWwtcmluZy01IiBjeD0iMjgwIiBjeT0iMjQwIiByPSI1NyIgZmlsbD0iIzBlNmI4MiIgb25jbGljaz0iZGlsU2hvdyg1KSIgdGFiaW5kZXg9IjAiIHJvbGU9ImJ1dHRvbiIgYXJpYS1sYWJlbD0iSWRlbnRpdHkgbGF5ZXIiPjwvY2lyY2xlPgogIDx0ZXh0IHg9IjI4MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiIHBvaW50ZXItZXZlbnRzPSJub25lIj5ORVRXT1JLPC90ZXh0PgogIDx0ZXh0IHg9IjI4MCIgeT0iOTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiIHBvaW50ZXItZXZlbnRzPSJub25lIj5ERVZJQ0U8L3RleHQ+CiAgPHRleHQgeD0iMjgwIiB5PSIxMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiIHBvaW50ZXItZXZlbnRzPSJub25lIj5BUFBMSUNBVElPTjwvdGV4dD4KICA8dGV4dCB4PSIyODAiIHk9IjE2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMi41IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWEzYTQ0IiBwb2ludGVyLWV2ZW50cz0ibm9uZSI+REFUQTwvdGV4dD4KICA8dGV4dCB4PSIyODAiIHk9IjIzOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iI2ZmZmZmZiIgcG9pbnRlci1ldmVudHM9Im5vbmUiPklERU5USVRZPC90ZXh0PgogIDx0ZXh0IHg9IjI4MCIgeT0iMjU0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjkuNSIgZmlsbD0iI2NmZWVmNiIgcG9pbnRlci1ldmVudHM9Im5vbmUiPnRoZSBjb3JlPC90ZXh0Pgo8L3N2Zz4=)

↑ **Click a layer** to see its controls and which weeks attack it

</div>

<div id="dil-panel-1" class="dil-panel" markdown="1">

#### 🌐 Network — the perimeter

Controls what traffic is even allowed onto the network: **firewalls,
IDS/IPS, the DMZ,** and network segmentation.

**We attack it in:** [Recon (W2)](reconnaissance-footprinting.html) ·
[Scanning (W3)](scanning-enumeration.html) · [Network Hacking & Sniffing
(W4)](network-hacking-sniffing.html) · [Wireless
(W10)](wireless-hacking.html)

</div>

<div id="dil-panel-2" class="dil-panel" markdown="1">

#### 💻 Device — the endpoints

Hardening the machines themselves: **OS patching, antivirus/EDR, disk
encryption,** and host-level firewalls.

**We attack it in:** [System Attacks (W6)](system-attacks.html) ·
[Malware, Trojans & DoS (W7)](malware-trojans-dos.html)

</div>

<div id="dil-panel-3" class="dil-panel" markdown="1">

#### ⚙️ Application — the software

Writing code that isn't exploitable: **secure coding, authentication &
authorization,** and web application firewalls (WAF).

**We attack it in:** [Web Attacks I (W8)](web-attacks-servers-apps.html)
· [Web Attacks II — SQLi (W9)](web-attacks-sqli-session.html)

</div>

<div id="dil-panel-4" class="dil-panel" markdown="1">

#### 🗄️ Data — the information

Protecting the data itself: **encryption, backups,** and tight access
control. This is what attackers ultimately want.

**We attack it in:** [Cryptography (W5)](cryptography.html)

</div>

<div id="dil-panel-5" class="dil-panel" markdown="1">

#### 🪪 Identity — the core

*Who* is allowed to log in and *what* they can do — MFA, IAM, least
privilege. Break identity and you don't hack in, you **log in**.

**We attack it in:** [Social Engineering & the Identity Layer
(W12)](social-engineering-identity.html)

</div>

Each ring is a wall; if one fails, the next still stands.

## 7. The whole course on one map

For the next twelve weeks **we play the attacker**, walking the kill
chain against each layer — and on every technique we also flip to the
**Defender's view**. Here's where each week lives:

| Layer                   | What we attack it with                                                                                                                                                                            |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Network**             | [Recon](reconnaissance-footprinting.html) · [Scanning & Enumeration](scanning-enumeration.html) · [Network Hacking & Sniffing](network-hacking-sniffing.html) · [Wireless](wireless-hacking.html) |
| **Device**              | [System Attacks](system-attacks.html) · [Malware, Trojans & DoS](malware-trojans-dos.html)                                                                                                        |
| **Application**         | [Web Attacks I](web-attacks-servers-apps.html) · [Web Attacks II — SQLi](web-attacks-sqli-session.html)                                                                                           |
| **Data**                | [Cryptography](cryptography.html)                                                                                                                                                                 |
| **Identity**            | [Social Engineering & the Identity Layer](social-engineering-identity.html)                                                                                                                       |
| **The full engagement** | [Penetration Testing](penetration-testing.html) — land & expand, end to end                                                                                                                       |

## 8. What makes it *ethical* — law & authorization

Everything above is the same skill a criminal uses. The **only** thing
separating an ethical hacker from a criminal is **authorization** —
written permission to test. Companies pay people to attack their own
systems precisely because you can't defend what you don't understand;
that's **penetration testing**.

The "hats" describe **intent and authorization, not skill**:

- **White hat** — authorized, works to improve security (this course).
- **Black hat** — unauthorized, for personal gain or harm.
- **Grey hat** — in between; may probe without permission but disclose
  findings. Legally still exposed.

Before any testing, a professional engagement establishes a **signed
scope** (exactly what's in and out of bounds), **rules of engagement**
(allowed techniques, testing windows, emergency contacts), and **written
authorization** — a signed "get out of jail" letter from someone with
the authority to grant it, often with an NDA.

In the U.S. the governing law is the **Computer Fraud and Abuse Act
(CFAA)**; unauthorized access is a federal crime, and "I had good
intentions" is **not** a defense — **authorization is**. When anything
is unclear, stop and confirm scope before you touch a thing.

<div class="admonition note" markdown="1">

Real-world context — authorization is not optional

In 2019, two professional penetration testers from **Coalfire** were
**arrested and jailed** while physically testing an Iowa courthouse —
even though they had a signed contract from the state judicial branch.
The scope had been miscommunicated between the state and the *county*
that actually owned the building. The lesson: a signed contract isn't
enough if the *right* person didn't authorize the *specific* target.
Scope and authorization are the difference between a paycheck and
handcuffs.

</div>

## 9. ATT&CK — the shared vocabulary

Throughout the course each week is tagged with the **MITRE ATT&CK**
techniques it covers — the same IDs used by every SOC and threat-intel
team in industry. You'll see a tag strip near the top of each page:

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span>
<a href="https://attack.mitre.org/tactics/TA0043/" class="attck-tag"
target="_blank">TA0043 Recon</a>
<a href="https://attack.mitre.org/tactics/TA0007/" class="attck-tag"
target="_blank">TA0007 Discovery</a>
<a href="https://attack.mitre.org/tactics/TA0001/" class="attck-tag"
target="_blank">TA0001 Initial Access</a>

</div>

Clicking a tag opens its definition on the MITRE ATT&CK site.

## 10. The Defender's view

Every attack leaves a trace. On each week's page you'll find a blue
**Defender's view** panel showing how that week's technique looks from
the SOC seat — the logs, signatures, or telemetry that reveal it, and
the one control that best stops it:

<div class="admonition defender" markdown="1">

Defender's view — example

Reconnaissance is noisy but easy to dismiss as background internet
traffic. A defender watches for **directionality and pattern**: a single
source touching many ports or many URLs in seconds, often with a scanner
user-agent. The best control isn't detection — it's **reducing what's
exposed** in the first place.

</div>

## References

- **Maurushat, *Ethical Hacking*** (uOttawa, open access) —
  Introduction + Ch. 1.
  [Publisher](https://press.uottawa.ca/en/9780776627946/ethical-hacking/)
  ·
  [PDF](https://library.oapen.org/bitstream/id/ab438eb4-5f5d-4509-8c0b-f6c57f271e84/9780776627922.pdf)
- **NIST SP 800-115** §1–2 (security testing overview). [Free
  PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf)
- **NIST Cybersecurity Framework (CSF)** — Identify · Protect · Detect ·
  Respond · Recover.
  [nist.gov/cyberframework](https://www.nist.gov/cyberframework)
- **MITRE ATT&CK** — the framework we'll use all term.
  [attack.mitre.org](https://attack.mitre.org/)
