[← Course home](../index.html) · Ethical Hacking

# Week 11 · Social Engineering & the Identity Layer

<span class="kc-badge">🧑 Parallel track — the human / identity
layer</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span>
<a href="https://attack.mitre.org/techniques/T1566/" class="attck-tag"
target="_blank">T1566 Phishing</a>
<a href="https://attack.mitre.org/techniques/T1656/" class="attck-tag"
target="_blank">T1656 Impersonation</a>
<a href="https://attack.mitre.org/techniques/T1078/" class="attck-tag"
target="_blank">T1078 Valid Accounts</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- Why social engineering is a **parallel track**, not another exploit
- The identity layer: authentication factors and how each fails
- How Generative AI supercharges these attacks
- The **MGM final project** — analyze and report a real identity-layer
  breach

</div>

## 1. A different kind of attack — "log in, not hack in"

For eleven weeks you've broken into *machines* — finding flaws,
exploiting them, hacking **in**. This module is the parallel world:
attacking **people**. There's no vulnerability, no payload, no exploit.
The attacker manipulates a human and then uses **legitimate
credentials** to walk through the front door. As the demo puts it: *if
the identity layer is breached, attackers* *log in* *rather than* *hack
in.*

That's why social engineering sits outside the technical kill chain — it
targets the innermost layer of the defense-in-depth model (Identity),
where the "vulnerability" is human judgment, not software.

<div class="admonition tip" markdown="1">

Interactive notes — the full lesson

Work through the interactive lesson: **[Identity Under Attack: When AI
Targets the Weakest Link
→](../human-layer/identity-under-attack.html)**. It covers the layered
model, the three authentication factors, the MGM case study, real
deepfake incidents, and the layered defenses in depth.

</div>

## 2. The identity layer & its three factors

Authentication rests on three factors — and AI now stresses all three:

- **What you know** (passwords, PINs) — *AI-compromised*: LLMs craft
  personalized phishing at scale.
- **What you have** (phone, hardware key) — *depends*: SIM-swap and
  help-desk MFA resets beat SMS; **FIDO2** keys resist it.
- **What you are** (Face/Touch ID, voice) — *depends*: voice clones
  (~\$2, 3 seconds of audio) and real-time deepfakes beat *remote*
  biometrics; on-device biometrics hold.

## 3. Why humans are the weakest link

Attackers exploit emotion — **fear, authority, trust, urgency, greed,
fatigue** — through phishing, vishing, pretexting, and physical
tailgating. And Generative AI removed every constraint that used to
limit these attacks: cloned voices, deepfake video calls, and 50
simultaneous campaigns run by one operator (Arup lost **\$25M** to a
deepfake Zoom call).

## Defender's view

<div class="admonition defender" markdown="1">

How you defend the identity layer

Human judgment isn't reliable, so you defend with things AI can't fake:

- **Physical / local factors** — FIDO2 hardware keys, on-device
  biometrics, blind help-desk PINs.
- **Procedural controls** — quorum approval for privileged resets,
  cool-off sandboxes after any MFA reset.
- **Behavioral AI (UEBA)** — the attacker's AI *creates* a convincing
  disguise; the defender's AI *detects* the behavior the disguise can't
  hide (a reset credential logging in from a new device/geo and
  immediately hitting admin functions).

**Best control:** defense in depth — physical factors **+** procedural
policy **+** behavioral analytics. No single silver bullet.

</div>

## <span class="twemoji">![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE0LjQgNkgyMHYxMGgtN2wtLjQtMkg3djdINVY0aDl6bS0uNCA4aDJ2LTJoMnYtMmgtMlY4aC0ydjJsLTEtMlY2aC0ydjJIOVY2SDd2MmgydjJIN3YyaDJ2LTJoMnYyaDJ2LTJsMSAyem0tMy00VjhoMnYyem0zIDBoMnYyaC0yeiI+PC9wYXRoPjwvc3ZnPg==)</span> Final Project — the MGM breach

Your capstone applies the **Week 12 reporting methodology** to a real
identity-layer attack: the **September 2023 MGM Resorts breach**
(Scattered Spider). Attackers looked up an employee on LinkedIn, called
the IT help desk, claimed a lost phone, got MFA reset, escalated Okta →
Azure admin, and deployed ransomware — a **10-minute phone call, zero
malware, ~\$100M** in damage.

**Deliverable — a professional incident / pen-test report covering:**

1.  **Attack reconstruction** — the full timeline, each step mapped to
    MITRE ATT&CK.
2.  **Identity-layer analysis** — why "log in, not hack in" made this so
    effective (no exploit to detect).
3.  **Layered defense design** — which controls (FIDO2, blind PINs,
    quorum approval, cool-off sandbox, UEBA) would have broken the
    chain, and *where*.
4.  **The AI dimension** — how deepfakes/voice cloning would supercharge
    the same attack, and what changes for the defender.

## References

- **Identity Under Attack** — the interactive lesson for this module.
  [Open →](../human-layer/identity-under-attack.html)
- **Maurushat, *Ethical Hacking*** — ethics of deception & consent.
  [PDF](https://library.oapen.org/bitstream/id/ab438eb4-5f5d-4509-8c0b-f6c57f271e84/9780776627922.pdf)
- **MITRE ATT&CK — Phishing (T1566).**
  [attack.mitre.org](https://attack.mitre.org/techniques/T1566/)
- **CISA — Avoiding Social Engineering & Phishing.**
  [cisa.gov](https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks)
