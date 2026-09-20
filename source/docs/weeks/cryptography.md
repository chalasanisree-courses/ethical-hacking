---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

<style>
.jobwrap { display: none; }
.jobwrap.active { display: block; }
.job-hint { text-align:center; font-size:.82rem; color:var(--md-default-fg-color--light); margin:8px 0 2px; }
.crypto-cap { text-align:center; font-size:.82rem; color:var(--md-default-fg-color--light); margin:6px 0 0; }
.md-typeset .recon-panel h4, .md-typeset .scan-panel h4 { font-size:.95rem; font-weight:700; letter-spacing:0; margin-bottom:6px; }
.jobwrap .rail-label { margin-top: 4px; }
.jobwrap hr { margin: 22px 0; }
</style>

# Week 5 · Cryptography

<span class="kc-badge">🧭 Storming the Perimeter · the shield behind HTTPS — built, then broken</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1110/" class="attck-tag" target="_blank">T1110 Brute Force</a> <a href="https://attack.mitre.org/techniques/T1600/" class="attck-tag" target="_blank">T1600 Weaken Encryption</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 AiTM (downgrade)</a> <a href="https://attack.mitre.org/techniques/T1553/" class="attck-tag" target="_blank">T1553 Subvert Trust Controls</a>

</div>

Last week HTTPS was the hero. This week we **open the hood** on that shield — and, because this is ethical hacking, we break it. The one idea to carry through: **you almost never break the math. You break weak passwords, missing salt, reused keys, and forged identities — the *wrapper*, not the cipher.**

Here's the precise version of what HTTPS does, which is itself the first crypto lesson: an attacker on the wire **can still capture your packets** — encryption doesn't hide that traffic *exists*, it hides the **meaning**. What they grab is gibberish.

<figure>
<svg viewBox="0 0 720 150" role="img" aria-label="You talk to the bank through an encrypted HTTPS tunnel; the attacker on the path captures only unreadable gibberish." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:620px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
  <rect x="8" y="52" width="120" height="46" rx="8" fill="#E6F1FB" stroke="#b6cfe8"/><text x="68" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#0C447C">You</text>
  <rect x="592" y="52" width="120" height="46" rx="8" fill="#E9F2F4" stroke="#8fc7d3"/><text x="652" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#0e6b82">Bank</text>
  <rect x="150" y="58" width="420" height="34" rx="17" fill="#E9F2F4" stroke="#0e6b82" stroke-dasharray="5 4"/>
  <text x="360" y="80" text-anchor="middle" font-size="12.5" font-style="italic" fill="#0b5c70">encrypted tunnel — HTTPS</text>
  <text x="360" y="120" text-anchor="middle" font-size="12" fill="#8a93a3"><tspan fill="#c0392b" font-weight="700">😈 attacker sees:</tspan>  x9$#fZ!q…  (unreadable gibberish)</text>
</svg>
<figcaption class="crypto-cap">Encryption hides <strong>what you say</strong>, not that you're talking. Keeping that secret is the first of cryptography's three jobs.</figcaption>
</figure>

## The three jobs of cryptography

Everything this week is one of **three jobs** — really the **CIA triad** in plain words. **Pick a job below** to open its walkthrough: how we *build* the tool, then how an attacker *breaks* it.

<div class="ai-strip" markdown="1">

<div id="ai-card-1" class="ai-card ai-target selected" onclick="jobTab(1)" role="button" tabindex="0" aria-label="Confidentiality" markdown="1">

<span class="ai-emoji">🔒</span><span class="ai-title">CONFIDENTIALITY</span><span class="ai-sub">no one can read your data · encryption</span>

</div>

<div id="ai-card-2" class="ai-card ai-target" onclick="jobTab(2)" role="button" tabindex="0" aria-label="Integrity" markdown="1">

<span class="ai-emoji">🖋️</span><span class="ai-title">INTEGRITY</span><span class="ai-sub">no one can change it undetected · hashing + signatures</span>

</div>

<div id="ai-card-3" class="ai-card ai-target" onclick="jobTab(3)" role="button" tabindex="0" aria-label="Trust" markdown="1">

<span class="ai-emoji">🪪</span><span class="ai-title">TRUST</span><span class="ai-sub">you're talking to who you think · certificates</span>

</div>

</div>

<p class="job-hint">↑ Click a job — one section shows at a time, so you're never reading the whole wall at once.</p>

<!-- ============================ JOB 1 · CONFIDENTIALITY ============================ -->
<div class="jobwrap active" id="job-1" markdown="1">

<span class="rail-label blue">🔧 BUILD · Confidentiality — keep it secret</span>

**Symmetric** encryption (AES) uses **one shared key** to lock and unlock — fast, great for bulk data. The catch: both sides need the same secret first, and *sharing a secret over an open network is the very problem we're solving.* Chicken and egg.

**Asymmetric** encryption (RSA, ECC, Diffie–Hellman) breaks the egg with a **key pair** — a **public** key anyone can hold and a **private** key you never share. Anything locked with the public key opens only with the private one, so no shared secret has to travel first.

| | 🔑 Symmetric (AES) | 🗝️ Asymmetric (RSA) |
|---|---|---|
| **Keys** | one shared key | a public + private pair |
| **Speed** | fast — bulk data | slow — heavy math |
| **Key sharing** | the hard problem | solved — no shared secret |

Neither wins alone, so the real world uses **both** — that combination is **TLS**. Walk the handshake:

<div class="recon-strip" markdown="1">

<div id="recon-node-1" class="recon-phase" aria-label="Get the key" onclick="reconShow(1)" role="button" style="background:#0E6B82" tabindex="0" markdown="1">

<span class="num">STEP 1</span>Get the key<small>from the certificate</small>

</div>

<div id="recon-node-2" class="recon-phase" aria-label="Agree a session key" onclick="reconShow(2)" role="button" style="background:#157f8f" tabindex="0" markdown="1">

<span class="num">STEP 2</span>Agree a session key<small>asymmetric, once</small>

</div>

<div id="recon-node-3" class="recon-phase" aria-label="Encrypt everything" onclick="reconShow(3)" role="button" style="background:#1f8a99" tabindex="0" markdown="1">

<span class="num">STEP 3</span>Encrypt everything<small>fast symmetric</small>

</div>

</div>

<div id="recon-panel-1" class="recon-panel" markdown="1">

#### 🪪 Step 1 — get the bank's public key

Your browser asks the bank for its identity. The bank sends its **certificate**, which contains its **public key**. (Whether you can *trust* it is the Trust job.)

</div>

<div id="recon-panel-2" class="recon-panel" markdown="1">

#### 🤝 Step 2 — agree a session key (asymmetric, once)

Your browser makes up a fresh, fast **symmetric session key** and sends it — locked with the bank's **public** key, so only the bank's private key can open it. Slow crypto is used exactly once, to hand over a secret safely.

</div>

<div id="recon-panel-3" class="recon-panel" markdown="1">

#### 🔒 Step 3 — encrypt everything (fast symmetric)

Both sides now share that session key; every message afterward rides fast **symmetric** encryption. Asymmetric did the risky introduction once; symmetric carries the conversation. **That's HTTPS.**

</div>

---

<span class="rail-label red">🔴 BREAK · the downgrade</span>

AES and TLS are too strong to break head-on, so attackers don't try. A man-in-the-middle sits in the handshake and **strips out the strong options**, so both sides "agree" to fall back to old, breakable crypto — then attacks *that*. You never touch AES; you just stop them from using it.

<div class="admonition quote" markdown="1">

🌐 Real-world case — FREAK & POODLE (2014–15)

1990s U.S. export rules forced deliberately **weakened** crypto into software sold abroad, and it lingered for 20 years. **FREAK** (2015) forced connections down to 512-bit "export-grade" keys crackable in *hours*; **POODLE** (2014) forced a fallback to ancient **SSL 3.0**. Neither broke modern crypto — they made sure it was never used. Fix: modern TLS refuses to downgrade; disable old protocols.

</div>

*How does the attacker get **in the middle** to force this? The Evil Twin — **Week 6**.*

</div>

<!-- ============================ JOB 2 · INTEGRITY ============================ -->
<div class="jobwrap" id="job-2" markdown="1">

<span class="rail-label blue">🔧 BUILD · Integrity — prove it wasn't changed</span>

Secrecy hides a message; **integrity** proves it wasn't *changed*, and that it came from who it claims.

- **Hashing** (SHA-256) is **one-way**: any input becomes a fixed-length fingerprint you *cannot* reverse. Change one character and the fingerprint changes completely. It's how passwords should be stored — the site keeps only the fingerprint, so **even if the database is stolen, the attacker gets fingerprints, not passwords.**
- **Salting** adds a unique random value to each password before hashing, so two people with the same password get *different* fingerprints. The salt isn't secret — it's stored in the open; its power is being **unique**, which makes precomputed attack tables useless.
- **Slow hashes** (bcrypt, argon2) are *purpose-built* to be expensive — one login is instant, a billion guesses is not. (Never store passwords with a fast hash like SHA/MD5.)
- **Digital signatures** run the pair backwards: **sign** with the private key, **verify** with the public key — proving *who* sent it and that *nothing changed*. What's signed is the message's hash; the receiver re-hashes the message and checks it matches.

---

<span class="rail-label red">🔴 BREAK · crack it offline</span>

A hash can't be reversed — so the attacker doesn't reverse it. They **capture** the fingerprint and **guess** at their own speed, on their own machine, no contact with the target. Walk the attack:

<div class="scan-strip" markdown="1">

<div id="scan-node-1" class="scan-phase" aria-label="Capture" onclick="scanShow(1)" role="button" style="background:#B45309" tabindex="0" markdown="1">

<span class="num">STEP 1</span>Capture<small>grab the fingerprint</small>

</div>

<div id="scan-node-2" class="scan-phase" aria-label="Guess offline" onclick="scanShow(2)" role="button" style="background:#c0522b" tabindex="0" markdown="1">

<span class="num">STEP 2</span>Guess offline<small>wordlist → brute force</small>

</div>

<div id="scan-node-3" class="scan-phase" aria-label="Match" onclick="scanShow(3)" role="button" style="background:#C0392B" tabindex="0" markdown="1">

<span class="num">STEP 3</span>Match<small>same fingerprint = cracked</small>

</div>

</div>

<div id="scan-panel-1" class="scan-panel" markdown="1">

#### 📥 Step 1 — capture the fingerprint

Grab the hash the moment it's exposed — a stolen password-hash database, or a captured Wi-Fi handshake. It doesn't *contain* the password; it's just the fingerprint.

</div>

<div id="scan-panel-2" class="scan-panel" markdown="1">

#### 💻 Step 2 — guess offline

On your own machine, hash guess after guess — a **wordlist** of common passwords, then brute force — millions per second, no contact with the target. Tools: **hashcat**, **John the Ripper**.

</div>

<div id="scan-panel-3" class="scan-panel" markdown="1">

#### 🔓 Step 3 — match

When a guess produces the **same fingerprint**, you've found the password. Weak → **seconds**; long and random → **hopeless**. A password's strength is just *how expensive you make the guessing.*

</div>

<div class="admonition quote" markdown="1">

🏢 LinkedIn (2012) · *hashing, done halfway*

LinkedIn **did** hash — the right instinct — but used **unsalted SHA-1**. No salt means identical passwords share a fingerprint, so precomputed tables cracked them in bulk. Reported as 6.5M; the full **117 million** surfaced in 2016.

</div>

<div class="admonition quote" markdown="1">

🏢 Adobe (2013) · *the wrong tool entirely*

Adobe didn't hash at all — it **encrypted** passwords (3DES in **ECB mode**, reversible) and stored the hints in plaintext. ECB gives identical passwords identical ciphertext, so attackers **clustered** accounts and read the answer off the pooled hints — **153 million** recovered *without ever stealing the key*. Using crypto and using it *correctly* are completely different things.

</div>

</div>

<!-- ============================ JOB 3 · TRUST ============================ -->
<div class="jobwrap" id="job-3" markdown="1">

<span class="rail-label blue">🔧 BUILD · Trust — make sure it's really them</span>

A public key alone doesn't tell you *whose* it is. **Public Key Infrastructure (PKI)** fixes that with **digital certificates**. The bank goes to a **Certificate Authority (CA)** — a small set everyone agrees to trust (DigiCert, Google…) — which verifies the bank and **signs** its certificate with the CA's own private key.

The chain closes because your browser **already trusts those CAs** — their public keys ship built into your browser and OS. So when the bank presents a CA-signed certificate, your browser checks the CA's signature; if it's valid, the bank's identity is confirmed. It's signatures all the way up to someone you already trust — which is how you connect to a bank you've never met and know it's really them.

---

<span class="rail-label red">🔴 BREAK · send them to a fake</span>

The gap: a certificate proves you're talking to a **real domain** — not that the domain is **honest**. Two ways attackers exploit it:

- **Phishing** — a look-alike domain (`bank-secure-login.com`) with a pixel-perfect copy of the login page. The victim types their password straight into the attacker's site.
- **DNS spoofing** — poison the victim's name lookup so `bank.com` itself resolves to the attacker's server. The address bar looks right; the site is fake.

<div class="admonition warning" markdown="1">

🔓 The padlock lies

These fake sites usually **have a valid padlock** — free certificates are trivial for *any* domain. The lock certifies the attacker's **domain**, not their honesty. "Look for the padlock" is outdated; the real check is the **domain name** itself.

</div>

<div class="admonition quote" markdown="1">

🌐 Real-world case — MyEtherWallet DNS hijack (2018)

Attackers hijacked internet **routing (BGP)** to poison DNS, so people typing the real `myetherwallet.com` reached an attacker's clone. It served an **invalid certificate** — the browser warned — and users who clicked *through* the warning had wallets drained (~$150k). The crypto was perfect; it was just encrypted *to the attacker.*

</div>

*How does the attacker get positioned to reroute traffic? Evil Twin, ARP & DNS spoofing — **Week 6**.*

</div>

<script>
function jobTab(n){
  document.querySelectorAll('.jobwrap').forEach(function(d){ d.classList.remove('active'); });
  var p=document.getElementById('job-'+n); if(p){ p.classList.add('active'); }
  ['1','2','3'].forEach(function(i){
    var c=document.getElementById('ai-card-'+i);
    if(c){ c.classList.toggle('selected', i===String(n)); }
  });
}
</script>

---

## Wrap-up

<div class="admonition quote" markdown="1">

Remember

Three jobs — **Confidentiality** (encryption), **Integrity** (hashing + signatures), **Trust** (certificates). Every one is attacked the **same way**: not by breaking the math, but by **downgrading** it, **cracking** weak/unsalted hashes offline, or **forging** an identity. Build the tool, then break the wrapper.

</div>

??? defender "🛡️ The blue team — keeping crypto honest (click to expand)"

    Crypto weakness rarely fires one alert — it shows up as **deprecated ciphers, expired/mismatched certificates, and downgrade attempts** in TLS logs, or as a breach *after the fact* when weak password stores are cracked en masse.

    - **Enforce modern TLS (1.2+)**, disable legacy protocols/ciphers, turn on **HSTS** so a downgrade or SSL-strip has nothing to grab.
    - **Store passwords only with slow, salted hashes** (bcrypt/argon2) — never SHA/MD5, never encryption.
    - **Monitor certificates** — expiry, mismatches, Certificate Transparency logs for look-alike domains.
    - Treat **"roll your own crypto"** as a finding — the algorithms are solid; the danger is how they're used.

??? tip "🧪 Try it yourself (click to expand)"

    Only on your own machines and accounts.

    1. **Inspect a certificate.** Click the padlock on any HTTPS site → *Certificate*. Read the **issuer** (CA), **valid-from/to**, and **subject** (domain) — the Trust job in action.
    2. **See salting work.** Hash `password123` with SHA-256, then hash it with a random salt prepended. Same password, completely different fingerprint.
    3. **Crack a weak hash.** Take an unsalted MD5/SHA-1 of a common word and run `hashcat`/`john` against a wordlist — watch a weak password fall in seconds, a long random one never.

??? info "🗺️ MITRE ATT&CK mapping (click to expand)"

    **MITRE ATT&CK** is a free public catalog of real attacker techniques. This week maps to **T1110** (Brute Force — offline cracking), **T1600** (Weaken Encryption), **T1557** (Adversary-in-the-Middle — the downgrade), and **T1553** (Subvert Trust Controls — forged/abused certificates). Browse it at [attack.mitre.org](https://attack.mitre.org/techniques/T1600/).

<div class="admonition tip" markdown="1">

Next week →

Every tool here reappears **over the air**. Offline hash cracking → cracking the **Wi-Fi handshake**; certificates and trust → the **Evil Twin**; reused keys → **WEP**. Same crypto, no wire to plug into. **Week 6 · Wireless Hacking.**

</div>

??? note "📚 References (click to expand)"

    - **Crypto 101** (free book) — Ch. 1–7: ciphers, key exchange, public-key, hashes. [crypto101.io](https://www.crypto101.io/)
    - **OWASP — Password Storage Cheat Sheet** (salting, bcrypt/argon2). [cheatsheetseries.owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
    - **MITRE ATT&CK** — T1600 · T1557 · T1553. [attack.mitre.org](https://attack.mitre.org/techniques/T1600/)
    - **How HTTPS works** — an illustrated TLS handshake. [howhttps.works](https://howhttps.works/)
