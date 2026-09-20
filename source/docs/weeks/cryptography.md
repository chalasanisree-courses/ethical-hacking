---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

<style>
.md-typeset .scan-panel h4,
.md-typeset .recon-panel h4,
.md-typeset .ai-panel h4 { font-size: 0.95rem; font-weight: 700; letter-spacing: 0; margin-bottom: 6px; }
.crypto-cap { text-align:center; font-size:.82rem; color:var(--md-default-fg-color--light); margin:6px 0 0; }
</style>

# Week 5 · Cryptography

<span class="kc-badge">🧭 Storming the Perimeter · the shield behind HTTPS — built, then broken</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1110/" class="attck-tag" target="_blank">T1110 Brute Force</a> <a href="https://attack.mitre.org/techniques/T1600/" class="attck-tag" target="_blank">T1600 Weaken Encryption</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 AiTM (downgrade)</a> <a href="https://attack.mitre.org/techniques/T1553/" class="attck-tag" target="_blank">T1553 Subvert Trust Controls</a>

</div>

This week alternates between <span style="color:#c0392b;font-weight:700;">🔴 building a tool</span> and <span style="color:#c0392b;font-weight:700;">🔴 breaking it</span> — the coloured line down the left tells you when we switch into the attacker's seat. The one idea to carry through: **you almost never break the math — you break weak passwords, missing salt, reused keys, and forged identities. You break the *wrapper*, not the cipher.**

<div class="admonition abstract" markdown="1">

What you'll learn

- Last week HTTPS was the hero. This week we **open the hood** on that shield.
- The **three jobs** cryptography does — **Confidentiality, Integrity, Trust** — and the tool behind each.
- For every tool we build, the **attacker's answer**: downgrade the encryption, crack the hashes offline, forge the identity.
- Why real breaches (Adobe, LinkedIn, FREAK) happened in the **implementation**, never the algorithm.

</div>

## 1. Where we are — open the hood on the shield

Last week ended on a promise: any password sent in the clear is stolen off the wire, and the fix was **encrypt everything** — HTTPS. We treated that shield like magic. It isn't. It's cryptography, and this week we take it apart.

Here's the precise version of what HTTPS actually does, because it's itself the first crypto lesson: an attacker sniffing the wire **can still capture your packets** — encryption doesn't hide that traffic *exists*. It hides the **meaning**. What they grab is gibberish.

<figure>
<svg viewBox="0 0 720 150" role="img" aria-label="You talk to the bank through an encrypted HTTPS tunnel; the attacker on the path captures only unreadable gibberish." xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:640px;height:auto;display:block;margin:0 auto;font-family:system-ui,sans-serif;">
  <rect x="8" y="52" width="120" height="46" rx="8" fill="#E6F1FB" stroke="#b6cfe8"/><text x="68" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#0C447C">You</text>
  <rect x="592" y="52" width="120" height="46" rx="8" fill="#E9F2F4" stroke="#8fc7d3"/><text x="652" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#0e6b82">Bank</text>
  <rect x="150" y="58" width="420" height="34" rx="17" fill="#E9F2F4" stroke="#0e6b82" stroke-dasharray="5 4"/>
  <text x="360" y="80" text-anchor="middle" font-size="12.5" font-style="italic" fill="#0b5c70">encrypted tunnel — HTTPS</text>
  <text x="360" y="120" text-anchor="middle" font-size="12" fill="#8a93a3"><tspan fill="#c0392b" font-weight="700">😈 attacker sees:</tspan>  x9$#fZ!q…  (unreadable gibberish)</text>
</svg>
<figcaption class="crypto-cap">Encryption doesn't hide that you're talking to the bank — it hides <strong>what you say</strong>. That's the whole job of the first of cryptography's three tasks.</figcaption>
</figure>

## 2. The three jobs of cryptography

Everything this week is one of **three jobs** — and it's really the **CIA triad** in plain words. Build all three and you have secure communication; break any one and the attacker wins.

<div class="ai-strip" markdown="1">

<div id="ai-card-1" class="ai-card ai-target" onclick="aiShow(1)" role="button" tabindex="0" aria-label="Confidentiality" markdown="1">

<span class="ai-emoji">🔒</span><span class="ai-title">CONFIDENTIALITY</span><span class="ai-sub">no one can read your data · encryption</span>

</div>

<div id="ai-card-2" class="ai-card ai-target" onclick="aiShow(2)" role="button" tabindex="0" aria-label="Integrity" markdown="1">

<span class="ai-emoji">🖋️</span><span class="ai-title">INTEGRITY</span><span class="ai-sub">no one can change it undetected · hashing + signatures</span>

</div>

<div id="ai-card-3" class="ai-card ai-target" onclick="aiShow(3)" role="button" tabindex="0" aria-label="Trust" markdown="1">

<span class="ai-emoji">🪪</span><span class="ai-title">TRUST</span><span class="ai-sub">you're talking to who you think · certificates</span>

</div>

</div>

↑ **Click each job** — then we'll build it, and break it

<div id="ai-panel-1" class="ai-panel" markdown="1">

#### 🔒 Confidentiality — keep it secret

Turn readable text into gibberish that only the right party can turn back. Done with **encryption** — *symmetric* (one shared key, fast) and *asymmetric* (a public/private key pair), combined into **TLS**, the machinery behind HTTPS. **Attacked by:** the *downgrade* — force both sides onto weak, breakable crypto (§4).

</div>

<div id="ai-panel-2" class="ai-panel" markdown="1">

#### 🖋️ Integrity — prove it wasn't changed

Detect any tampering, and prove *who* sent it. Done with **hashing** (a one-way fingerprint) and **digital signatures**. It's also how passwords are stored safely. **Attacked by:** cracking stolen hashes *offline* — guess until a fingerprint matches (§6).

</div>

<div id="ai-panel-3" class="ai-panel" markdown="1">

#### 🪪 Trust — make sure it's really them

A key alone doesn't prove *who* owns it. **Digital certificates** and a **Certificate Authority** bind a key to an identity. **Attacked by:** skipping the check entirely — a look-alike site the victim trusts on sight (§8).

</div>

---

<div class="bt-rail" markdown="1">

<span class="rail-label blue">🔧 BUILD · Confidentiality</span>

## 3. Building secrecy — two kinds of key

**Symmetric** encryption (AES) uses **one shared key** to lock and unlock. It's fast and great for bulk data — but both sides need the same secret first, and *sharing a secret over an open network is the very problem we're trying to solve.* Chicken and egg.

**Asymmetric** encryption (RSA, ECC, Diffie–Hellman) breaks the egg with a **key pair**: a **public** key anyone can hold, and a **private** key you never share. Anything locked with the public key can only be opened by the private one — so no shared secret has to travel first.

| | 🔑 Symmetric (AES) | 🗝️ Asymmetric (RSA) |
|---|---|---|
| **Keys** | one shared key | a public + private pair |
| **Speed** | fast — good for bulk data | slow — heavy math |
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

↑ **Click a step** — how HTTPS quietly switches from slow to fast crypto

<div id="recon-panel-1" class="recon-panel" markdown="1">

#### 🪪 Step 1 — get the bank's public key

Your browser asks the bank for its identity. The bank sends its **certificate**, which contains its **public key**. (Whether you can *trust* that certificate is the Trust job — §7.)

</div>

<div id="recon-panel-2" class="recon-panel" markdown="1">

#### 🤝 Step 2 — agree a session key (asymmetric, used once)

Your browser makes up a fresh, fast **symmetric session key** and sends it — locked with the bank's **public** key, so *only* the bank's private key can open it. Slow asymmetric crypto is used exactly once, for one tiny job: to hand over a secret safely. The chicken-and-egg problem is solved.

</div>

<div id="recon-panel-3" class="recon-panel" markdown="1">

#### 🔒 Step 3 — encrypt everything (fast symmetric)

Now both sides — and only both sides — share that session key. Every message afterward rides fast **symmetric** encryption. Asymmetric did the risky introduction once; symmetric carries the whole conversation. **That's HTTPS.**

</div>

</div>

<div class="rt-rail" markdown="1">

<span class="rail-label red">🔴 BREAK · Confidentiality — the downgrade</span>

## 4. Attacking secrecy — don't break it, weaken it

AES and TLS are too strong to break head-on — brute force is hopeless. So attackers don't try. A man-in-the-middle sits in the handshake and **strips out the strong options**, so the two sides "agree" to fall back to old, breakable crypto — then attacks *that*. You never touch AES; you just stop them from using it.

<div class="admonition quote" markdown="1">

🌐 Real-world case — FREAK & POODLE (2014–15)

In the 1990s, U.S. export rules forced software to ship deliberately **weakened** crypto for sale abroad. That junk was still lurking in servers 20 years later. **FREAK** (2015) forced connections down to those 512-bit "export-grade" keys — crackable in *hours* — and **POODLE** (2014) forced a fallback to ancient **SSL 3.0**. Neither broke modern crypto; they made sure it was never used. The fix: modern TLS refuses to downgrade, and servers switch the old protocols off.

</div>

*And how does the attacker get **in the middle** to force this? That's the Evil Twin — **Week 6**.*

</div>

<div class="bt-rail" markdown="1">

<span class="rail-label blue">🔧 BUILD · Integrity</span>

## 5. Building integrity — fingerprints & signatures

Secrecy hides a message. **Integrity** proves it wasn't *changed* — and that it came from who it claims.

- **Hashing** (SHA-256) is **one-way**: it turns any input into a fixed-length fingerprint you *cannot* reverse. Change one character and the fingerprint changes completely. It's how passwords should be stored — the site keeps only the fingerprint, so **even if the database is stolen, the attacker gets fingerprints, not passwords.**
- **Salting** adds a unique random value to each password before hashing, so two people with the same password get *different* fingerprints. The salt isn't secret — it's stored in the open; its power is being **unique**, which makes precomputed attack tables useless.
- **Slow hashes** (bcrypt, argon2) are *purpose-built* to be expensive — one login is instant, but a billion guesses is not. (Don't hash passwords with a fast hash like SHA/MD5.)
- **Digital signatures** run the key pair backwards: **sign** with the private key, **verify** with the public key — proving both *who* sent it and that *nothing changed*. What actually gets signed is the message's hash, and the receiver re-hashes the message and checks it matches.

</div>

<div class="rt-rail" markdown="1">

<span class="rail-label red">🔴 BREAK · Integrity — crack it offline</span>

## 6. Attacking integrity — guess it offline

A hash can't be reversed — so the attacker doesn't reverse it. They **capture** the fingerprint and **guess** at their own speed, on their own machine, with no contact with the target. Walk the attack:

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

↑ **Click a step** — the number-one crypto attack, and the one you'll run on Wi-Fi next week

<div id="scan-panel-1" class="scan-panel" markdown="1">

#### 📥 Step 1 — capture the fingerprint

Grab the hash the moment it's exposed — a stolen password-hash database, or a captured Wi-Fi handshake. It doesn't *contain* the password; it's just the fingerprint.

</div>

<div id="scan-panel-2" class="scan-panel" markdown="1">

#### 💻 Step 2 — guess offline

On your own machine, hash guess after guess — a **wordlist** of common passwords first, then brute force — millions per second, with no contact with the target. Tools: **hashcat**, **John the Ripper**.

</div>

<div id="scan-panel-3" class="scan-panel" markdown="1">

#### 🔓 Step 3 — match

When a guess produces the **same fingerprint**, you've found the password. A weak or common password falls in **seconds**; a long, random one is **hopeless**. A password's strength is simply *how expensive you make the guessing.*

</div>

<div class="admonition quote" markdown="1">

🏢 Real-world case — LinkedIn (2012) · *hashing, done halfway*

LinkedIn **did** hash its passwords — the right instinct — but used **unsalted SHA-1**. With no salt, identical passwords share a fingerprint, so precomputed tables cracked them in bulk. First reported as 6.5M; the full **117 million** surfaced in 2016.

</div>

<div class="admonition quote" markdown="1">

🏢 Real-world case — Adobe (2013) · *the wrong tool entirely*

Adobe didn't hash at all — it **encrypted** passwords (3DES in **ECB mode**, which is reversible) and stored the password *hints* in plaintext. ECB gives identical passwords identical ciphertext, so attackers **clustered** accounts by password and read the answer off the pooled hints — **153 million** recovered *without ever stealing the key*. The lesson: using crypto and using it *correctly* are completely different things.

</div>

</div>

<div class="bt-rail" markdown="1">

<span class="rail-label blue">🔧 BUILD · Trust</span>

## 7. Building trust — certificates & the chain

A public key alone doesn't tell you *whose* it is. **Public Key Infrastructure (PKI)** fixes that with **digital certificates**. The bank goes to a **Certificate Authority (CA)** — a small set everyone agrees to trust (DigiCert, Google, etc.) — which verifies the bank and **signs** its certificate with the CA's own private key.

The chain closes because your browser **already trusts those CAs** — their public keys ship built into your browser and operating system. So when the bank presents a CA-signed certificate, your browser checks the CA's signature; if it's valid, the bank's identity is confirmed. It's signatures all the way up to someone you already trust — which is how you connect to a bank you've never met and know it's really them.

</div>

<div class="rt-rail" markdown="1">

<span class="rail-label red">🔴 BREAK · Trust — send them to a fake</span>

## 8. Attacking trust — the look-alike

Here's the gap: a certificate proves you're talking to a **real domain** — not that the domain is **honest**. Two ways attackers exploit it:

- **Phishing** — a look-alike domain (`bank-secure-login.com`) with a pixel-perfect copy of the login page. The victim types their password straight into the attacker's site.
- **DNS spoofing** — poison the victim's name lookup so `bank.com` itself resolves to the attacker's server. The address bar looks right; the site is fake.

<div class="admonition warning" markdown="1">

🔓 The padlock lies

These fake sites usually **have a valid padlock** — free certificates are trivial to get for *any* domain. The lock certifies the attacker's **domain**, not their honesty. "Look for the padlock" is outdated advice; the real check is the **domain name** itself.

</div>

<div class="admonition quote" markdown="1">

🌐 Real-world case — MyEtherWallet DNS hijack (2018)

Attackers hijacked internet **routing (BGP)** to poison DNS, so people typing the real `myetherwallet.com` were sent to an attacker's clone. The clone served an **invalid certificate** — the browser threw a warning — and users who clicked *through* the warning had their crypto wallets drained (~$150k). The crypto was perfect; it was just encrypted *to the attacker.*

</div>

*And how does the attacker get positioned to reroute traffic? Evil Twin, ARP & DNS spoofing — **Week 6**.*

</div>

---

## 9. The blue team — keeping crypto honest

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Crypto weakness rarely fires a single alert — it shows up as **deprecated ciphers, expired or mismatched certificates, and downgrade attempts** in TLS-inspection logs, or as a breach *after the fact* when weakly-stored passwords are cracked en masse.

- **Enforce modern TLS (1.2+)**, disable legacy protocols/ciphers, and turn on **HSTS** so a downgrade or SSL-strip has nothing to grab.
- **Store passwords only with slow, salted hashes** (bcrypt/argon2) — never SHA/MD5, never encryption.
- **Monitor certificates** — expiry, mismatches, and Certificate Transparency logs for look-alike domains issued against your brand.
- Treat **"roll your own crypto"** as a finding. The algorithms are solid; the danger is always in how they're used.

</div>

## 10. Try it yourself

<div class="admonition tip" markdown="1">

Hands-on — only on your own machines and accounts

1. **Inspect a real certificate.** Click the padlock on any HTTPS site → *Connection secure* → *Certificate*. Read the **issuer** (the CA), the **valid-from/to** dates, and the **subject** (the domain). That chain is the Trust job in action.
2. **See salting work.** Hash `password123` with SHA-256, then hash `password123` + a random salt. Same password, completely different fingerprint — now imagine a stolen database and why the salt breaks bulk cracking.
3. **Crack a weak hash.** In the lab, take an unsalted MD5/SHA-1 of a common word and run it against a wordlist with `hashcat` or `john`. Watch a weak password fall in seconds — and a long random one never fall.

**This week's labs:** Encryption · Hashing · Digital Certificates.

</div>

<div class="admonition info" markdown="1">

Where this maps in MITRE ATT&CK

**MITRE ATT&CK** is a free public catalog of real attacker techniques. This week maps to **T1110** (Brute Force — offline cracking), **T1600** (Weaken Encryption), **T1557** (Adversary-in-the-Middle — the downgrade), and **T1553** (Subvert Trust Controls — forged/abused certificates). Browse it at [attack.mitre.org](https://attack.mitre.org/techniques/T1600/).

</div>

<div class="admonition quote" markdown="1">

Remember

Cryptography does **three jobs** — **Confidentiality** (encryption), **Integrity** (hashing + signatures), **Trust** (certificates). Every one gets attacked the **same way**: not by breaking the math, but by **downgrading** it, **cracking** weak/unsalted hashes offline, or **forging** an identity the victim trusts on sight. Build the tool, then break the wrapper.

</div>

<div class="admonition tip" markdown="1">

Next week →

Every tool here reappears **over the air**. Offline hash cracking becomes cracking the **Wi-Fi handshake**; certificates and trust become the **Evil Twin**; reused keys become **WEP**. Same crypto — now with no wire to plug into. **Week 6 · Wireless Hacking.**

</div>

---

## References

- **Crypto 101** (free book) — Ch. 1–7: block/stream ciphers, key exchange, public-key, hashes. [crypto101.io](https://www.crypto101.io/)
- **OWASP — Password Storage Cheat Sheet** (salting, bcrypt/argon2). [cheatsheetseries.owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- **MITRE ATT&CK** — Weaken Encryption (T1600) · Adversary-in-the-Middle (T1557) · Subvert Trust Controls (T1553). [attack.mitre.org](https://attack.mitre.org/techniques/T1600/)
- **How HTTPS works** — an illustrated guide to the TLS handshake. [howhttps.works](https://howhttps.works/)
