[← Course home](../index.html) · Ethical Hacking

# Week 12 · Penetration Testing — Methodology & Reporting

<span class="kc-badge">🧭 Kill chain · Phase 5 — Covering Tracks &
Reporting</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span>
<a href="https://attack.mitre.org/techniques/T1070/" class="attck-tag"
target="_blank">T1070 Indicator Removal</a>
<a href="https://attack.mitre.org/tactics/TA0005/" class="attck-tag"
target="_blank">TA0005 Defense Evasion</a>
<a href="https://attack.mitre.org/" class="attck-tag"
target="_blank">Full ATT&amp;CK matrix</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- The full penetration-testing methodology, end to end
- Covering tracks — and why it's the defender's problem too
- Scoping an engagement and writing the report *(the skill you'll apply
  in the final capstone project)*

</div>

## 1. The methodology, end to end

Every technical week of this course was one link in a chain. A real
engagement runs the whole thing in order:

**Pre-engagement** (scope, rules of engagement, authorization) →
**Reconnaissance** → **Scanning & vuln analysis** → **Exploitation** →
**Post-exploitation** (privilege escalation, pivoting) → **Reporting**.
Revisit the [Week 1 kill chain](ethics-law-methodology.html) — this is
that diagram, run for real against a live scope.

## 2. Covering tracks

The final *attacker* phase is hiding the intrusion: clearing logs,
timestomping files, and disabling security tooling. For a **pentester**
this is documented rather than hidden — but understanding it is exactly
what lets a defender detect and reconstruct an attack after the fact.

## 3. Frameworks & the report

Click each to expand.

📐 Frameworks

**NIST SP 800-115**, **PTES** (Penetration Testing Execution Standard),
and **OSSTMM** each formalize the process so results are repeatable and
comparable. A named methodology is what separates a professional test
from random hacking.

📝 The report — the actual product

Clients don't pay for shells; they pay for the **report**: an executive
summary, a technical findings section with severity (CVSS) and evidence,
and prioritized, actionable remediation. Communicating clearly to a
non-technical stakeholder is a graded, career-critical skill.

🤝 Professionalism

Retesting after fixes, responsible disclosure, and careful client
communication close the loop and are part of the ethics you set up in
Week 1.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Covering-tracks activity targets *your* evidence: cleared Windows event
logs (**Event ID 1102**), truncated `/var/log`, stopped auditd, or files
with impossible timestamps. If logs live only on the compromised host,
the attacker can erase the story.

**Best control:** forward logs to a **remote, tamper-evident SIEM in
real time**, and use file-integrity monitoring — so clearing local logs
no longer erases the trail. The pentest report's value to the *defender*
is a prioritized list of exactly what to fix first.

</div>

<div class="admonition note" markdown="1">

Looking ahead — the final project

You'll apply everything on this page in the **final capstone project**:
taking the MGM identity-layer attack and writing it up as a professional
incident/pen-test report — timeline, ATT&CK mapping, findings, and
layered remediation.

</div>

## References

- **NIST SP 800-115** §5–8 (analysis, reporting, remediation). [Free
  PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf)
- **Penetration Testing Execution Standard (PTES) — Reporting.**
  [pentest-standard.org](http://www.pentest-standard.org/index.php/Main_Page)
