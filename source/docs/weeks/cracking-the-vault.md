---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 11 · Cracking the Vault

<style>
.wk8{color:var(--w-ink);--w-ink:#1f2836;--w-muted:#5b6880;--w-line:#e3e8f0;--w-card:#ffffff;--w-teal:#0a7589;--w-amber:#a9700f;--w-surface:#eef2f7;font-family:inherit}
[data-md-color-scheme="slate"] .wk8{--w-ink:#e7edf6;--w-muted:#9fadc3;--w-line:#33405c;--w-card:#1f2a42;--w-teal:#3bb6ce;--w-amber:#d8a646;--w-surface:#17202e}
.wk8 figure{margin:1rem 0}.wk8 figcaption{font-size:.82rem;color:var(--w-muted);text-align:center;margin-top:.4rem}
.wk8 svg{max-width:100%;height:auto;display:block;margin:0 auto}
.wk8 .node-fill{fill:var(--w-card)}.wk8 .node-line{stroke:var(--w-line)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}.wk8 .amber{fill:var(--w-amber)}
.wk8 .svg-t{fill:var(--w-ink)}.wk8 .svg-m{fill:var(--w-muted)}
.wk8 .atkcards{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:1rem 0 .4rem}
@media(max-width:860px){.wk8 .atkcards{grid-template-columns:repeat(2,1fr)}}
@media(max-width:470px){.wk8 .atkcards{grid-template-columns:1fr}}
.wk8 .atkcard{border:1px solid var(--w-line);border-radius:12px;background:var(--w-card);padding:15px 11px;cursor:pointer;text-align:center;font-family:inherit;color:var(--w-ink);transition:border-color .15s,box-shadow .15s}
.wk8 .atkcard:hover{border-color:var(--w-teal);box-shadow:0 2px 10px rgba(20,30,48,.08)}
.wk8 .atkcard.active{border-color:var(--w-teal);background:var(--w-surface);box-shadow:inset 0 0 0 1px var(--w-teal)}
.wk8 .atkcard .ic{font-size:1.5rem;line-height:1;display:block}
.wk8 .atkcard .tag{display:block;font-size:.6rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-muted);margin:.5rem 0 .2rem}
.wk8 .atkcard .nm{display:block;font-weight:700;font-size:.9rem;color:var(--w-ink);line-height:1.2}
.wk8 .atkcard .sub{display:block;font-size:.74rem;color:var(--w-muted);margin-top:.22rem;line-height:1.3}
.wk8 .atkpanel{border:1px solid var(--w-line);border-radius:12px;background:var(--w-card);overflow:hidden;box-shadow:0 2px 12px rgba(20,30,48,.06)}
[data-md-color-scheme="slate"] .wk8 .atkpanel{box-shadow:none}
.wk8 .atkdetail{display:none}.wk8 .atkdetail.active{display:block}
.wk8 .atktitle{padding:12px 18px 0;font-weight:700;font-size:1.05rem;color:var(--w-ink)}
.wk8 .atktitle .oc{font-size:.72rem;font-weight:700;color:var(--w-teal);margin-left:.4rem;text-transform:uppercase;letter-spacing:.04em}
.wk8 .atktabs{display:flex;flex-wrap:wrap;gap:0;border-bottom:1px solid var(--w-line);margin-top:10px;padding:0 8px}
.wk8 .atktab{border:none;background:none;font-family:inherit;font-size:.82rem;font-weight:600;color:var(--w-muted);padding:10px 14px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px}
.wk8 .atktab:hover{color:var(--w-ink)}
.wk8 .atktab.active{color:var(--w-teal);border-bottom-color:var(--w-teal)}
.wk8 .atksec{display:none;padding:15px 18px 18px;font-size:.92rem;line-height:1.55;color:var(--w-ink)}
.wk8 .atksec.active{display:block}
.wk8 .atksec p{margin:.35rem 0}
.wk8 .atksec b{color:var(--w-ink)}
.wk8 .atksec code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--w-surface);padding:1px 5px;border-radius:4px;font-size:.88em}
.wk8 .atksec .lab{font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-teal);margin-bottom:.3rem}
.wk8 .hint{font-size:.82rem;color:var(--w-muted);margin:.2rem 0 0}
.wk8 .fct{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.9rem}
.wk8 .fct th,.wk8 .fct td{border:1px solid var(--w-line);padding:9px 12px;text-align:left;vertical-align:top}
.wk8 .fct th{background:var(--w-surface);color:var(--w-ink);font-weight:700}
.wk8 .fct td b{color:var(--w-ink)}
</style>

<span class="kc-badge">🔐 <span class="eb-layer">Data</span><span class="eb-sep"> · </span><span class="eb-phase">Cracking the Vault</span><span class="eb-sep"> · </span><span class="eb-sum">the crown jewels, and the two locks on them</span></span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1078/" class="attck-tag" target="_blank">T1078 Valid Accounts</a> <a href="https://attack.mitre.org/techniques/T1552/" class="attck-tag" target="_blank">T1552 Unsecured Credentials</a> <a href="https://attack.mitre.org/techniques/T1530/" class="attck-tag" target="_blank">T1530 Data from Cloud Storage</a> <a href="https://attack.mitre.org/techniques/T1048/" class="attck-tag" target="_blank">T1048 Exfiltration</a> <a href="https://attack.mitre.org/techniques/T1027/003/" class="attck-tag" target="_blank">T1027.003 Steganography</a>

</div>

Every layer so far — network, device, application — exists to protect one thing: the **data**. This is the vault. Here we go after it directly.

!!! tip "The one idea for the week"
    The data has **two locks**: **access control** (*am I allowed to read it?*) and **encryption** (*do I have the key?*). You rarely break either with brute force. You **become authorized**, and you **steal the key** — then you get the data out.

## The attacker's path to the data

<div class="wk8" markdown="0">
<figure>
<svg viewBox="0 0 640 118" width="640" height="118" role="img" aria-label="The data-layer attack path: reach it by defeating access control, read it by getting the key, then remove it by exfiltrating">
<g text-anchor="middle">
<rect x="14" y="34" width="180" height="54" rx="9" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="104" y="56" font-size="12" font-weight="700">① Reach it</text>
<text class="svg-m" x="104" y="74" font-size="10">defeat access control</text>
<rect x="230" y="34" width="180" height="54" rx="9" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="320" y="56" font-size="12" font-weight="700">② Read it</text>
<text class="svg-m" x="320" y="74" font-size="10">get the key, not the cipher</text>
<rect x="446" y="34" width="180" height="54" rx="9" fill="var(--w-surface)" class="teal-s" stroke-width="2"></rect>
<text class="svg-t" x="536" y="56" font-size="12" font-weight="700">③ Remove it</text>
<text class="svg-m" x="536" y="74" font-size="10">exfiltrate past DLP</text>
<path d="M194 61 L230 61" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#arv)"></path>
<path d="M410 61 L446 61" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#arv)"></path>
<text class="svg-m" x="320" y="108" font-size="10">the crown jewels are the goal — everything else was just the way in</text>
</g>
<defs><marker id="arv" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker></defs>
</svg>
</figure>
</div>

## Where the data lives — the three states

Data is protected differently depending on its state — which means it's **stolen** differently too.

<div class="wk8" markdown="0">
<table class="fct">
<thead><tr><th>State</th><th>Normal protection</th><th>Where the attacker grabs it</th></tr></thead>
<tbody>
<tr><td><b>In transit</b><br>moving over the network</td><td>TLS / HTTPS (Week 5)</td><td>Sniff an unencrypted or downgraded connection (Week 4)</td></tr>
<tr><td><b>In use</b><br>being processed in memory</td><td>Hardest to protect; secure enclaves</td><td>Scrape it from <b>memory</b>, where it's plaintext (Target)</td></tr>
<tr><td><b>At rest</b><br>databases, disks, backups</td><td>Encryption at rest (TDE, full-disk)</td><td>Steal the <b>key</b>, or ride a compromised authorized process</td></tr>
</tbody>
</table>
</div>

## The attacks

<p class="hint">Click a step to see how it works, how to defend it, where it's bitten in the real world, and how a pentester tests for it.</p>

<div class="wk8" markdown="0">
<div class="atkpick">
<div class="atkcards">
<button class="atkcard" data-atk="access" type="button"><span class="ic">🔓</span><span class="tag">Reach it</span><span class="nm">Defeat access control</span><span class="sub">become authorized</span></button>
<button class="atkcard" data-atk="keys" type="button"><span class="ic">🔑</span><span class="tag">Read it</span><span class="nm">Defeat encryption</span><span class="sub">steal the key</span></button>
<button class="atkcard" data-atk="mem" type="button"><span class="ic">🧠</span><span class="tag">Read it · in use</span><span class="nm">Memory scraping</span><span class="sub">plaintext in RAM</span></button>
<button class="atkcard" data-atk="exfil" type="button"><span class="ic">📤</span><span class="tag">Remove it</span><span class="nm">Exfiltration</span><span class="sub">get it out past DLP</span></button>
<button class="atkcard" data-atk="steg" type="button"><span class="ic">🖼️</span><span class="tag">Remove it · covert</span><span class="nm">Steganography</span><span class="sub">hide in plain sight</span></button>
</div>
<div class="atkpanel">

<div class="atkdetail" data-for="access">
<div class="atktitle">🔓 Defeat access control<span class="oc">Reach it</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>Only the DBA and the app's <b>service account</b> should read the database. So you <i>become</i> one of them: escalate to DBA (<b>privilege escalation</b>, Week 8), abuse an <b>over-privileged service account</b>, or inject straight into the query path (<b>SQLi</b>, Week 10). The lock asks "are you allowed?" — you make the answer yes. This is the same muscle as every access-control bypass in the course.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Least privilege</b> — scope each service account to only the columns and rows it needs, read-only where it only displays data. Keep the DBA role to a handful of people, separate duties, and log privileged access. The tighter the grant, the less a compromised web server can reach.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Equifax (2017)</b> — after an unpatched web app got them in, attackers reached dozens of databases using <b>credentials sitting in plaintext</b>, and walked off with ~147M records.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Enumerate the database accounts and their grants — is the app's service account over-privileged? Can a normal web user reach data the page never needs? Test everything through the least-privilege lens.</p></div>
</div>

<div class="atkdetail" data-for="keys">
<div class="atktitle">🔑 Defeat encryption<span class="oc">Read it</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>Data at rest is encrypted — but here's the catch: <b>TDE is transparent to any authorized process.</b> Compromise the app or its service account and the database hands you <b>plaintext</b>; you never touch the cipher. Encryption-at-rest really defends against a <i>stolen disk or backup</i>. So "beating encryption" means getting the <b>key</b> — from the keystore/KMS, a config file, or the server's <b>cloud keys via SSRF</b> (Week 10) — not cracking the algorithm. The only time you truly crack is <b>offline</b>, on stolen backups or password hashes (Week 5).</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p>Keep keys <b>off the box</b> that holds the data — a managed <b>KMS/HSM</b>, rotated and access-logged. For the crown-jewel fields, encrypt at the <b>application</b> layer so even the DBA sees ciphertext. TDE and full-disk encryption still matter — for stolen drives and backups.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Capital One (2019)</b> — SSRF stole the server's cloud keys and unlocked the storage. The encryption was irrelevant once the keys were gone — ~100M+ applications exposed.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Ask: <b>where are the keys?</b> If the decryption key lives on the same host as the data, or in a readable config or environment variable, encryption-at-rest adds little against a host compromise.</p></div>
</div>

<div class="atkdetail" data-for="mem">
<div class="atktitle">🧠 Memory scraping<span class="oc">Read it · data in use</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>Data <b>in transit</b> is encrypted (TLS) and data <b>at rest</b> is encrypted (TDE) — but data <b>in use</b>, being processed, sits in memory as <b>plaintext</b>. So you grab it there. Point-of-sale RAM-scraping malware reads card numbers out of memory in the instant they're handled, before they're re-encrypted.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p>The hardest state to protect. Minimize how long sensitive data lives in memory, use <b>secure enclaves / confidential computing</b> (encrypt even in use), and hunt for the malware that does the scraping.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Target (2013)</b> — RAM-scraping malware on the POS terminals lifted ~40M card numbers straight from memory as cards were swiped.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Look for processes reading another process's memory, and for sensitive data lingering in memory, logs, or temp files longer than it needs to.</p></div>
</div>

<div class="atkdetail" data-for="exfil">
<div class="atktitle">📤 Exfiltration<span class="oc">Remove it</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>Having the data isn't enough — you have to get it <b>out</b>, past egress filtering and DLP. So you blend in: tunnel it over an allowed protocol (DNS, HTTPS), trickle it slowly, or send it over an <b>encrypted channel</b> so inspection sees nothing (Week 7).</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Egress filtering</b> and <b>DLP</b> to watch for bulk or sensitive data leaving, anomaly detection on outbound volume and destinations (UEBA), and blocking or inspecting unusual tunnels.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p>Most large breaches end here — the <b>dwell time</b> between first access and detected exfiltration is often <i>months</i>, which is why the data is long gone before anyone notices.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Baseline normal outbound traffic; a host suddenly sending large or encrypted volumes to an unfamiliar destination is the tell.</p></div>
</div>

<div class="atkdetail" data-for="steg">
<div class="atktitle">🖼️ Steganography<span class="oc">Remove it · covert</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>To slip data past inspection, hide its <b>existence</b> — embed the stolen file inside an innocent-looking image or document. <b>Encryption hides meaning; steganography hides that there's a message at all.</b> Combine them — encrypt, then hide — and even a found carrier reveals nothing.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Steganalysis</b> — statistical analysis of carriers for odd file sizes or least-significant-bit patterns; <b>re-encode</b> images at the boundary to destroy hidden payloads; DLP that flags anomalous media.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p>Used in real exfiltration and malware command-and-control to evade detection — a long-standing staple of covert data theft.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>You'll try it yourself — hide a message inside an image and extract it again in this week's <b>steganography assignment</b>.</p></div>
</div>

</div>
</div>
</div>

## Defender's view

<div class="admonition defender" markdown="1">

How you protect the crown jewels

The data sits behind **defense in depth** — two locks, plus lifecycle controls:

- **Encryption** — **TDE** for databases and **full-disk encryption** (BitLocker) for laptops, so a stolen drive or backup is useless. Keep keys in a **KMS/HSM**, off the data host.
- **Access control** — least-privilege **service accounts** scoped to just the data they need; a tightly limited **DBA** role; and for files, the three models — **DAC** (owner decides), **RBAC** (by role, the enterprise standard), **MAC** (labels, the military model).
- **Backups** — your ransomware safety net. Modern ransomware hunts the backups too, so make them **immutable** (write-once, locked for a set period — not even an admin can alter them).
- **End of life** — `delete` only removes the pointer; the data stays on the disk. True **sanitization** is **wiping** (overwrite), **degaussing** (magnets — magnetic drives only, *not* SSDs), or physical **shredding**.

**Watch the deep dive:** the full defender walkthrough of the data layer — *recording coming soon*.

</div>

## References

- [MITRE ATT&CK — Exfiltration (TA0010)](https://attack.mitre.org/tactics/TA0010/) and [Steganography (T1027.003)](https://attack.mitre.org/techniques/T1027/003/)
- [NIST SP 800-88 — Guidelines for Media Sanitization](https://csrc.nist.gov/pubs/sp/800/88/r1/final)
- [OWASP — Cryptographic Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)

<script>
(function(){
  var pick=document.querySelector('.atkpick'); if(!pick) return;
  var cards=[].slice.call(pick.querySelectorAll('.atkcard'));
  var details=[].slice.call(pick.querySelectorAll('.atkdetail'));
  function showAtk(id){
    cards.forEach(function(c){c.classList.toggle('active',c.getAttribute('data-atk')===id);});
    details.forEach(function(d){
      var on=d.getAttribute('data-for')===id;
      d.classList.toggle('active',on);
      if(on){
        d.querySelectorAll('.atktab').forEach(function(t,i){t.classList.toggle('active',i===0);});
        d.querySelectorAll('.atksec').forEach(function(s,i){s.classList.toggle('active',i===0);});
      }
    });
  }
  cards.forEach(function(c){c.addEventListener('click',function(){showAtk(c.getAttribute('data-atk'));});});
  pick.querySelectorAll('.atktab').forEach(function(t){
    t.addEventListener('click',function(){
      var det=t.closest('.atkdetail'), sec=t.getAttribute('data-sec');
      det.querySelectorAll('.atktab').forEach(function(x){x.classList.toggle('active',x===t);});
      det.querySelectorAll('.atksec').forEach(function(x){x.classList.toggle('active',x.getAttribute('data-sec')===sec);});
    });
  });
  showAtk('access');
})();
</script>
