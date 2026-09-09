[← Course home](../index.html) · Ethical Hacking

# Week 10 · Cryptography

<span class="kc-badge">🧭 Foundational — underpins every phase</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span>
<a href="https://attack.mitre.org/techniques/T1110/" class="attck-tag"
target="_blank">T1110 Brute Force</a>
<a href="https://attack.mitre.org/techniques/T1600/" class="attck-tag"
target="_blank">T1600 Weaken Encryption</a>
<a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag"
target="_blank">T1557 AiTM (downgrade)</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- Symmetric vs. asymmetric encryption — and what each is for
- PKI: keys, certificates, and the chain of trust
- Hashing, salting, and digital signatures
- How cryptography fails in practice — almost always in *implementation*

</div>

## 1. Symmetric vs. asymmetric — two tools for two jobs

- **Symmetric** encryption (AES) uses **one shared key** to encrypt and
  decrypt. It's fast and handles bulk data — but both sides need the
  same secret, so *how do you share the key safely* becomes the hard
  problem.
- **Asymmetric** encryption (RSA, ECC) uses a **key pair**: a public key
  anyone can have and a private key you guard. Anything encrypted with
  the public key can only be opened with the private key. This solves
  key distribution and enables **digital signatures**.

In the real world they work together: asymmetric crypto is used briefly
to exchange a symmetric session key, then fast symmetric crypto protects
the actual conversation. That's exactly what happens in the **TLS
handshake** behind every HTTPS connection.

## 2. PKI — turning keys into trust

A public key alone doesn't tell you *who* it belongs to. **Public Key
Infrastructure** solves that with **digital certificates**: a trusted
**Certificate Authority (CA)** cryptographically signs a statement
binding a public key to an identity (a domain, an organization). Your
browser trusts a small set of root CAs, and trust flows down a **chain**
to the site's certificate. This is the machinery that lets you connect
to a bank you've never met and know you're really talking to them.

## 3. Hashing, salting & signatures

- **Hashing** (SHA-256) is one-way — it produces a fixed fingerprint you
  can't reverse. It's used for integrity checks and password storage.
  **A hash is not encryption** (there's no key and no decryption).
- **Salting** adds a unique random value to each password before
  hashing, so identical passwords produce different hashes and
  precomputed **rainbow tables** are useless. Modern password storage
  also uses **slow** hashes (bcrypt, argon2) so guessing is expensive.
- **Digital signatures** reverse asymmetric crypto — sign with the
  private key, verify with the public key — proving authenticity and
  integrity.

## 4. How crypto actually fails

Click each to expand.

🔨 Brute force & weak secrets

Feasible when keys or passwords are short, or when hashing is fast and
unsalted. Defended by strong keys, slow salted hashes, and rate
limiting.

⚙️ Implementation & configuration errors

The math is rarely the weak point — the *implementation* is. Wrong
cipher mode, reused nonces, missing salt, deprecated ciphers, or a
downgrade attack that forces a connection back to breakable crypto.

🎂 Collision & deprecation

MD5 and SHA-1 are broken for signatures because attackers can engineer
**collisions** (two inputs, same hash). This is why they're deprecated
for certificates.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Crypto weakness rarely fires a single alert — it surfaces as
**deprecated ciphers, expired or mismatched certificates, and downgrade
attempts** in TLS inspection logs, or as a breach *after the fact* when
weakly-stored passwords are cracked en masse.

**Best control:** enforce modern TLS (1.2+), disable legacy ciphers and
protocols, use **HSTS**, monitor certificate expiry and transparency
logs, and store passwords only with **slow, salted** hashes
(bcrypt/argon2). Treat "roll your own crypto" as a finding.

</div>

<div class="admonition note" markdown="1">

Real-world context — the Adobe password disaster

In 2013, attackers stole ~153 million **Adobe** account records. Adobe
hadn't hashed the passwords — they *encrypted* them with a symmetric
cipher in **ECB mode** and no salt. ECB encrypts identical blocks
identically, so every user with the same password had the *same*
ciphertext, and the plaintext password *hints* were stored right
alongside. Researchers recovered vast numbers of passwords without
breaking any math. It's the textbook lesson that **using crypto and
using it correctly are completely different things.**

</div>

## References

- **Crypto 101** (free book) — Ch. 1–7 (block/stream ciphers, key
  exchange, public-key, hashes).
  [crypto101.io](https://www.crypto101.io/)
- **OWASP — Password Storage Cheat Sheet.**
  [cheatsheetseries.owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
