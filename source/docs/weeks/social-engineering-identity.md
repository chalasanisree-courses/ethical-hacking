---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 11 · Social Engineering

<style>
.wk8{color:var(--w-ink);--w-ink:#1f2836;--w-muted:#5b6880;--w-line:#e3e8f0;--w-card:#ffffff;--w-teal:#0a7589;--w-amber:#a9700f;--w-surface:#eef2f7;font-family:inherit}
[data-md-color-scheme="slate"] .wk8{--w-ink:#e7edf6;--w-muted:#9fadc3;--w-line:#33405c;--w-card:#1f2a42;--w-teal:#3bb6ce;--w-amber:#d8a646;--w-surface:#17202e}
.wk8 figure{margin:1rem 0}.wk8 figcaption{font-size:.82rem;color:var(--w-muted);text-align:center;margin-top:.4rem}
.wk8 svg{max-width:100%;height:auto;display:block;margin:0 auto}
.wk8 .node-fill{fill:var(--w-card)}.wk8 .node-line{stroke:var(--w-line)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}.wk8 .amber{fill:var(--w-amber)}
.wk8 .svg-t{fill:var(--w-ink)}.wk8 .svg-m{fill:var(--w-muted)}
/* clickable attack cards + tabbed detail panel */
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
.wk8 .atksec img{display:block;width:100%;border-radius:8px;border:1px solid var(--w-line);margin:0 0 11px}
.wk8 .atksec p{margin:.35rem 0}
.wk8 .atksec b{color:var(--w-ink)}
.wk8 .atksec code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:var(--w-surface);padding:1px 5px;border-radius:4px;font-size:.88em}
.wk8 .atksec .lab{font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-teal);margin-bottom:.3rem}
.wk8 .hint{font-size:.82rem;color:var(--w-muted);margin:.2rem 0 0}
/* three-factor map */
.wk8 .fct{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.9rem}
.wk8 .fct th,.wk8 .fct td{border:1px solid var(--w-line);padding:9px 12px;text-align:left;vertical-align:top}
.wk8 .fct th{background:var(--w-surface);color:var(--w-ink);font-weight:700}
.wk8 .fct td b{color:var(--w-ink)}
.wk8 .trig{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin:1rem 0}
@media(max-width:620px){.wk8 .trig{grid-template-columns:1fr 1fr}}
@media(max-width:380px){.wk8 .trig{grid-template-columns:1fr}}
.wk8 .trig div{border:1px solid var(--w-line);border-radius:10px;background:var(--w-card);padding:11px 13px}
.wk8 .trig .t{font-weight:700;color:var(--w-ink);font-size:.9rem}
.wk8 .trig .d{font-size:.8rem;color:var(--w-muted);margin-top:.15rem;line-height:1.4}
</style>

<span class="kc-badge">🧑 <span class="eb-layer">Identity</span><span class="eb-sep"> · </span><span class="eb-phase">Hacking the Human</span><span class="eb-sep"> · </span><span class="eb-sum">stop stealing credentials — just ask for them</span></span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1566/" class="attck-tag" target="_blank">T1566 Phishing</a> <a href="https://attack.mitre.org/techniques/T1598/" class="attck-tag" target="_blank">T1598 Vishing</a> <a href="https://attack.mitre.org/techniques/T1656/" class="attck-tag" target="_blank">T1656 Impersonation</a> <a href="https://attack.mitre.org/techniques/T1078/" class="attck-tag" target="_blank">T1078 Valid Accounts</a>

</div>

For eleven weeks we broke into *machines*. This week the target is the *person* who runs them — because you can patch a server, but you can't patch a human brain.

!!! tip "The one idea for the week"
    Every week so far has really been a hunt for one thing: a **valid credential**. We sniffed it, cracked it, stole the token. This week we stop stealing it and just **ask a human to hand it over** — *log in, not hack in.* A credential **is** an identity: hold it, and you don't hack in, you log in as them.

## The thread: it was always about credentials

<div class="wk8" markdown="0">
<figure>
<svg viewBox="0 0 640 128" width="640" height="128" role="img" aria-label="The course thread: Week 4 sniff the credential off the wire, Week 8 crack the hash, Week 10 steal the session token, Week 11 just ask the human for it">
<g text-anchor="middle">
<rect x="8" y="40" width="134" height="56" rx="9" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-m" x="75" y="62" font-size="9.5" font-weight="700" letter-spacing="0.5">WEEK 4</text>
<text class="svg-t" x="75" y="81" font-size="11.5" font-weight="700">Sniff off the wire</text>
<rect x="170" y="40" width="134" height="56" rx="9" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-m" x="237" y="62" font-size="9.5" font-weight="700" letter-spacing="0.5">WEEK 8</text>
<text class="svg-t" x="237" y="81" font-size="11.5" font-weight="700">Crack the hash</text>
<rect x="332" y="40" width="134" height="56" rx="9" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-m" x="399" y="62" font-size="9.5" font-weight="700" letter-spacing="0.5">WEEK 10</text>
<text class="svg-t" x="399" y="81" font-size="11.5" font-weight="700">Steal the token</text>
<rect x="494" y="40" width="138" height="56" rx="9" fill="var(--w-surface)" class="teal-s" stroke-width="2"></rect>
<text class="svg-m" x="563" y="62" font-size="9.5" font-weight="700" letter-spacing="0.5" style="fill:var(--w-teal)">WEEK 11</text>
<text class="svg-t" x="563" y="81" font-size="11.5" font-weight="700">Ask the human</text>
<path d="M142 68 L170 68" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#ar11)"></path>
<path d="M304 68 L332 68" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#ar11)"></path>
<path d="M466 68 L494 68" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#ar11)"></path>
<text class="svg-m" x="320" y="118" font-size="10">four weeks, one goal: a valid credential</text>
</g>
<defs><marker id="ar11" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker></defs>
</svg>
</figure>
</div>

## The identity layer & its three factors

Social engineering attacks **identity**. Authentication rests on three factors — and each has a way in, now supercharged by AI.

<div class="wk8" markdown="0">
<table class="fct">
<thead><tr><th>Factor</th><th>How attackers beat it</th><th>What still holds</th></tr></thead>
<tbody>
<tr><td><b>What you know</b><br>passwords, PINs, security Qs</td><td>Phishing fake login pages · vishing ("read me your OTP") · answers dug off LinkedIn</td><td>Don't reuse passwords; phishing-resistant MFA</td></tr>
<tr><td><b>What you have</b><br>phone, hardware key</td><td>SIM swap · help-desk MFA reset · MFA bombing (fatigue)</td><td><b>FIDO2</b> hardware keys resist all of these</td></tr>
<tr><td><b>What you are</b><br>face, touch, voice</td><td>Voice clone (~$2, 3 sec of audio) · real-time deepfake video</td><td>On-device biometrics; out-of-band verification</td></tr>
</tbody>
</table>
</div>

## The attacks

<p class="hint">Click an attack to see how it works, how to defend it, where it's bitten in the real world, and how a pentester tests for it.</p>

<div class="wk8" markdown="0">
<div class="atkpick">
<div class="atkcards">
<button class="atkcard" data-atk="phish" type="button"><span class="ic">🎣</span><span class="tag">Email · what you know</span><span class="nm">Phishing family</span><span class="sub">phishing → spear → whaling</span></button>
<button class="atkcard" data-atk="vish" type="button"><span class="ic">📞</span><span class="tag">Voice · the MGM pattern</span><span class="nm">Vishing &amp; the help desk</span><span class="sub">trick the front desk</span></button>
<button class="atkcard" data-atk="bomb" type="button"><span class="ic">📱</span><span class="tag">Fatigue · what you have</span><span class="nm">MFA bombing</span><span class="sub">spam until they tap yes</span></button>
<button class="atkcard" data-atk="deep" type="button"><span class="ic">🎭</span><span class="tag">GenAI · what you are</span><span class="nm">Deepfakes &amp; voice clones</span><span class="sub">fake the person</span></button>
<button class="atkcard" data-atk="phys" type="button"><span class="ic">🚪</span><span class="tag">In person · low-tech</span><span class="nm">Physical</span><span class="sub">tailgate &amp; dumpster-dive</span></button>
</div>
<div class="atkpanel">

<div class="atkdetail" data-for="phish">
<div class="atktitle">🎣 Phishing, spear phishing &amp; whaling<span class="oc">defeats "what you know"</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>A lure message gets you to click a link to a <b>fake login page</b>; you type your password and it's captured. Three scales of aim: <b>phishing</b> is a dragnet — a generic blast to thousands, hoping someone bites. <b>Spear phishing</b> is researched and aimed at <i>you</i> — your name, title, and boss, pulled from LinkedIn. <b>Whaling</b> targets a <b>big fish</b> (CEO/CFO), where one catch authorizes a wire or hands over high-level access.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p>Don't trust links in email — verify the sender and open the site directly. Technically: email authentication (<b>SPF / DKIM / DMARC</b>), link sandboxing, and <b>phishing-resistant MFA</b> (FIDO2) so a stolen password isn't enough. And <b>phishing-simulation training</b> so clicks become teachable moments.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Google &amp; Facebook (2013–2015)</b> — one operator ran a vendor-impersonation (BEC) scheme with fake invoices and emails and collected about <b>$100 million</b> before it was caught.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Check the real sender domain and hover every link before clicking; watch for urgency paired with a login prompt. In an authorized engagement you'd craft a spear-phish with the <b>Social Engineer Toolkit (SET)</b> and measure click-through.</p></div>
</div>

<div class="atkdetail" data-for="vish">
<div class="atktitle">📞 Vishing &amp; the help desk<span class="oc">the MGM pattern</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>Instead of the employee, target the people <b>paid to help</b> them. Call the IT help desk, impersonate an employee — <i>"I lost my phone, I need my MFA reset"</i> — and the helpful agent resets it, handing you the account. That's <b>pretexting</b> delivered over voice (<b>vishing</b>). No malware, no exploit — you just logged in.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Blind help-desk PINs</b> — the agent checks a secret the employee set without ever seeing it (pass/fail), so they can't be tricked into revealing it. Plus <b>callback</b> to a known number, <b>quorum / manager approval</b> for privileged resets, and a <b>cool-off sandbox</b> after any reset.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>MGM Resorts (2023)</b> — Scattered Spider vished the help desk, got an MFA reset, escalated to <b>Okta super-admin → Azure admin</b>, and deployed ransomware. A 10-minute call, ~<b>$100M</b>, and <b>zero malware</b> to get in.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>In an authorized test, see whether the help desk will reset MFA or a password without strong verification. Check for a <b>callback policy</b>, blind-PIN enforcement, and whether a single agent can reset a privileged account alone.</p></div>
</div>

<div class="atkdetail" data-for="bomb">
<div class="atktitle">📱 MFA bombing<span class="oc">defeats "what you have"</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>You already have the victim's password, but MFA blocks you. So you trigger push approvals <b>again and again</b> — ideally at 3am — until, worn down, they tap <b>approve</b> just to make it stop. Nothing is cracked; the attack runs on <b>fatigue</b> alone.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Number-matching MFA</b> — the user types a code shown on the login screen, so a blind tap won't do. Plus <b>push rate-limiting</b>, alerts on repeated prompts, phishing-resistant <b>FIDO2</b> keys, and training to <b>deny &amp; report</b> any prompt you didn't start.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Uber (2022)</b> — a contractor was MFA-bombed into approving a login; the attacker then found hard-coded admin credentials and spread across internal systems.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Check whether MFA is simple tap-to-approve versus <b>number-matching</b>, and whether a flood of repeated prompts is rate-limited or alerted. Tap-to-approve with no limit is the gap.</p></div>
</div>

<div class="atkdetail" data-for="deep">
<div class="atktitle">🎭 Deepfakes &amp; voice cloning<span class="oc">defeats "what you are"</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>Generative AI clones a voice from about <b>3 seconds of audio</b> (~$2) and renders a <b>real-time deepfake face</b> on a video call. The factor we trusted most — "what you are" — is now fakeable at a distance. Two models: a human using AI as a <b>mask</b> today; fully <b>autonomous AI agents</b> running the con next.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p>Verify <b>out-of-band</b> with something the AI can't know — a personal question (the Ferrari "book" question) or a pre-agreed <b>code word</b> for high-value requests. Require <b>on-device biometrics / FIDO2</b> (not a face on a call) and <b>quorum approval</b> for payments and resets.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Arup (2024)</b> — a finance worker wired <b>$25M</b> after a video call on which the CFO and colleagues were <i>all</i> deepfakes. <b>Ferrari (2024)</b> — a cloned-CEO voice call was caught only when the exec asked a personal question the AI couldn't answer.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>For any high-value request, does policy require a <b>second channel</b> or code word? Can one person authorize a wire off a video call alone? If yes, a deepfake walks right in.</p></div>
</div>

<div class="atkdetail" data-for="phys">
<div class="atktitle">🚪 Physical / tailgating<span class="oc">the low-tech other half</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><p>The same levers — authority, trust, urgency — work <b>in person</b>. <b>Tailgate</b> through a badged door behind an employee, <b>clone an RFID badge</b>, <b>shoulder-surf</b> a password, or <b>dumpster-dive</b> for discarded documents. No network required — you simply walk in.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Mantraps / turnstiles</b> (one badge, one person), <b>visitor escort</b> and badge policies, <b>clean-desk</b> and shredding, and a <b>challenge culture</b> where staff feel safe asking "can I help you?"</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p>A staple of authorized <b>physical red-team</b> engagements — skilled social engineers routinely tailgate into "secure" buildings; it's the low-tech half of the CEH social-engineering module.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>In a physical assessment, test whether doors can be <b>tailgated</b>, whether visitors are <b>escorted</b>, whether badges are challenged, and what ends up in the <b>trash</b> unshredded.</p></div>
</div>

</div>
</div>
</div>

## Why humans are the weakest link

Social engineering isn't technical — it's **psychological**. Attackers pull on emotion so you act before you think:

<div class="wk8" markdown="0">
<div class="trig">
<div><span class="t">😨 Fear</span><div class="d">"Your account will be deleted — verify now."</div></div>
<div><span class="t">⏰ Urgency</span><div class="d">"This offer expires in one hour."</div></div>
<div><span class="t">👔 Authority</span><div class="d">"This is the CEO — I need it now."</div></div>
<div><span class="t">💰 Greed</span><div class="d">"You've won $100,000 — click to claim."</div></div>
<div><span class="t">🤝 Trust</span><div class="d">"Hi, I'm from IT support, here to help."</div></div>
<div><span class="t">😮‍💨 Fatigue</span><div class="d">MFA prompts buzzing until you tap yes.</div></div>
</div>
</div>

## Defender's view

<div class="admonition defender" markdown="1">

How you defend the identity layer

Human judgment isn't reliable, so you defend with things AI can't fake, backed by policy and behavioral analytics:

- **Physical / local factors** — FIDO2 hardware keys, on-device biometrics, blind help-desk PINs.
- **Procedural controls** — quorum approval for privileged resets, cool-off sandboxes after any MFA reset, callback verification.
- **Behavioral AI (UEBA)** — the attacker's AI *creates* a convincing disguise; the defender's AI *detects* the behavior the disguise can't hide — a reset credential logging in from a new device and geo and immediately hitting admin functions. **SOAR** then auto-revokes and quarantines.

**Best control:** defense in depth — physical factors **+** procedural policy **+** behavioral analytics. No single silver bullet.

</div>

## Case study — the MGM breach

The **September 2023 MGM Resorts breach** (Scattered Spider) is this whole chapter in a single attack — and no malware was needed to get in:

1.  **Reconnaissance** — they looked up a privileged employee on **LinkedIn**: name, role, department.
2.  **Vishing** — they called the **IT help desk** posing as that employee: *"I lost my phone, I need my MFA reset."*
3.  **MFA hijack** — the helpful agent reset it, handing over the account.
4.  **Escalation** — they used that foothold in **Okta** to become super-admin, and because Okta was the trust root for the cloud, that became **Azure admin** too.
5.  **Ransomware** — Vegas went dark. A **10-minute phone call**, **zero malware** to get in, and roughly **$100M** in damage.

The sharpest detail: **no AI was used** — Scattered Spider were simply skilled human impersonators. So the question that defines where this is heading is what happens when **generative AI** removes even that barrier. It already has — a **$25M** deepfake-video wire transfer at **Arup (2024)**, and a cloned-CEO voice call at **Ferrari (2024)** caught only when the exec asked a personal question the AI couldn't answer. The attacker's AI *creates* the disguise; the defender's AI (**behavioral analytics / UEBA**) has to *detect the behavior* the disguise can't hide.

Go deeper in the companion lesson: **[Identity Under Attack: When AI Targets the Weakest Link →](../human-layer/identity-under-attack.html)**.

## References

- **Identity Under Attack** — the interactive lesson for this module. [Open →](../human-layer/identity-under-attack.html)
- **Maurushat, *Ethical Hacking*** — ethics of deception &amp; consent. [PDF](https://library.oapen.org/bitstream/id/ab438eb4-5f5d-4509-8c0b-f6c57f271e84/9780776627922.pdf)
- **MITRE ATT&CK — Phishing (T1566).** [attack.mitre.org](https://attack.mitre.org/techniques/T1566/)
- **CISA — Avoiding Social Engineering &amp; Phishing.** [cisa.gov](https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks)

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
  showAtk('phish');
})();
</script>
