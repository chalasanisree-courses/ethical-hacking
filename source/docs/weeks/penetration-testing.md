---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 12 · Penetration Testing

<style>
.wk8{color:var(--w-ink);--w-ink:#1f2836;--w-muted:#5b6880;--w-line:#e3e8f0;--w-card:#ffffff;--w-teal:#0a7589;--w-amber:#a9700f;--w-green:#2e7d53;--w-violet:#5b4b8a;--w-surface:#eef2f7;font-family:inherit}
[data-md-color-scheme="slate"] .wk8{--w-ink:#e7edf6;--w-muted:#9fadc3;--w-line:#33405c;--w-card:#1f2a42;--w-teal:#3bb6ce;--w-amber:#d8a646;--w-green:#5bbd86;--w-violet:#b9a9e0;--w-surface:#17202e}
.wk8 figure{margin:1rem 0}.wk8 figcaption{font-size:.82rem;color:var(--w-muted);text-align:center;margin-top:.4rem}
.wk8 svg{max-width:100%;height:auto;display:block;margin:0 auto}
.wk8 .svg-t{fill:var(--w-ink)}.wk8 .svg-m{fill:var(--w-muted)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}
.wk8 .grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:1rem 0}
@media(max-width:620px){.wk8 .grid2{grid-template-columns:1fr}}
.wk8 .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:1rem 0}
@media(max-width:780px){.wk8 .grid3{grid-template-columns:1fr}}
.wk8 .rcard{border:1px solid var(--w-line);border-radius:12px;background:var(--w-card);padding:15px 17px}
.wk8 .rcard.feat{border-color:var(--w-teal);box-shadow:inset 0 0 0 1px var(--w-teal)}
.wk8 .rcard .tag{display:inline-block;font-size:.62rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#fff;background:var(--w-teal);border-radius:5px;padding:2px 9px;margin-bottom:.55rem}
.wk8 .rcard .tag.vi{background:var(--w-violet)}.wk8 .rcard .tag.am{background:var(--w-amber)}.wk8 .rcard .tag.gr{background:var(--w-green)}
.wk8 .rcard h4{margin:.1rem 0 .45rem;font-size:1.02rem;color:var(--w-ink)}
.wk8 .rcard p{margin:.3rem 0;font-size:.9rem;line-height:1.5;color:var(--w-muted)}
.wk8 .rcard ul{margin:.3rem 0 .1rem;padding-left:1.1rem}
.wk8 .rcard li{font-size:.86rem;line-height:1.5;color:var(--w-ink);margin:.18rem 0}
.wk8 .rcard .note{font-size:.78rem;font-style:italic;color:var(--w-teal);margin-top:.5rem}
.wk8 .rcard .note.vi{color:var(--w-violet)}
.wk8 .fct{width:100%;border-collapse:collapse;margin:1rem 0;font-size:.9rem}
.wk8 .fct th,.wk8 .fct td{border:1px solid var(--w-line);padding:9px 12px;text-align:left;vertical-align:top}
.wk8 .fct th{background:var(--w-surface);color:var(--w-ink);font-weight:700}
.wk8 .fct td b{color:var(--w-ink)}
</style>

<span class="kc-badge">🧭 <span class="eb-layer">Capstone</span><span class="eb-sep"> · </span><span class="eb-phase">The Full Engagement</span><span class="eb-sep"> · </span><span class="eb-sum">every technique in this course, run as one authorized operation</span></span>

<div class="attck-strip" markdown="1">

<span class="lbl">Frameworks</span> <a href="https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf" class="attck-tag" target="_blank">NIST SP 800-115</a> <a href="http://www.pentest-standard.org/index.php/Main_Page" class="attck-tag" target="_blank">PTES</a> <a href="https://attack.mitre.org/" class="attck-tag" target="_blank">MITRE ATT&amp;CK</a>

</div>

For eleven weeks we studied one technique at a time. This week we stop looking at isolated attacks and run them as **one operation**, start to finish — a penetration test. Because it ties the whole course into one job, we call it *the full engagement*.

!!! tip "The one idea for the week"
    The techniques are not the job — the **engagement** is. What turns a pile of attacks into a profession is three things: a signed **scope** going in, a disciplined **method** in the middle, and an honest **report** coming out. The first one is also what keeps you on the right side of the law.

## Two roles companies hire for

So — how is everything we learned actually useful? It's two of the main jobs in cybersecurity, told apart by **when** they show up relative to an attack.

<div class="wk8" markdown="0">
<div class="grid2">
<div class="rcard feat">
<span class="tag">Before · prevent</span>
<h4>Penetration tester</h4>
<p>A company authorizes a skilled hacker to try to break into their environment <b>on purpose</b> — so the weak points get found and fixed before a real attacker finds them.</p>
<p class="note">← this week's focus</p>
</div>
<div class="rcard">
<span class="tag vi">After · reconstruct</span>
<h4>Forensic investigator</h4>
<p>After a breach, they piece together what happened — how the attacker got in, what they touched, and how far they got — working backwards from the evidence left behind.</p>
<p class="note vi">the defensive mirror image</p>
</div>
</div>
</div>

You'd rather pay someone to break in and hand you the list than find out the hard way. The rest of this page is mostly the first role — the pen test.

## The engagement — input, process, output

Every engagement has the same shape.

<div class="wk8" markdown="0">
<figure>
<svg viewBox="0 0 640 108" width="640" height="108" role="img" aria-label="Penetration testing as input, process, output: scope and authorization in, the methodology as process, the report out">
<g text-anchor="middle">
<rect x="10" y="26" width="178" height="56" rx="9" fill="var(--w-surface)" class="teal-s" stroke-width="1.6"></rect>
<text class="svg-t" x="99" y="49" font-size="12" font-weight="700">INPUT</text>
<text class="svg-m" x="99" y="68" font-size="10">scope &amp; authorization</text>
<rect x="231" y="26" width="178" height="56" rx="9" class="teal-s" fill="var(--w-card)" stroke-width="1.6"></rect>
<text class="svg-t" x="320" y="49" font-size="12" font-weight="700">PROCESS</text>
<text class="svg-m" x="320" y="68" font-size="10">the methodology = this course</text>
<rect x="452" y="26" width="178" height="56" rx="9" fill="var(--w-surface)" class="teal-s" stroke-width="1.6"></rect>
<text class="svg-t" x="541" y="49" font-size="12" font-weight="700">OUTPUT</text>
<text class="svg-m" x="541" y="68" font-size="10">the report</text>
<path d="M188 54 L231 54" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#ar)"></path>
<path d="M409 54 L452 54" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#ar)"></path>
</g>
<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker></defs>
</svg>
</figure>
</div>

<div class="wk8" markdown="0">
<div class="grid3">
<div class="rcard">
<span class="tag">Input</span>
<h4>Scope &amp; authorization</h4>
<ul>
<li>A written, signed agreement</li>
<li>What you may attack — and what's off-limits</li>
<li>One machine, one app, or the whole network</li>
<li>Out of scope is out of bounds</li>
</ul>
<p class="note">This is what makes it legal, not criminal.</p>
</div>
<div class="rcard">
<span class="tag am">Process</span>
<h4>The methodology</h4>
<ul>
<li>Recon &amp; information gathering</li>
<li>Scanning &amp; enumeration</li>
<li>Gaining access — exploit / SQLi / social</li>
<li>Escalation &amp; persistence</li>
<li>Covering tracks → analysis</li>
</ul>
<p class="note" style="color:var(--w-amber)">Every week this quarter was one phase.</p>
</div>
<div class="rcard">
<span class="tag gr">Output</span>
<h4>The report</h4>
<ul>
<li><b>Risk rating</b> — what to fix first</li>
<li><b>Evidence</b> — so they believe you</li>
<li><b>Business impact</b> — why it matters</li>
<li><b>Remediation</b> — how to fix it</li>
</ul>
<p class="note" style="color:var(--w-green)">The report is the product, not the hack.</p>
</div>
</div>
</div>

!!! note "Covering tracks — the honest version"
    The final *attacker* phase is hiding the intrusion — clearing logs, timestomping files, disabling security tooling. A pentester does the **opposite**: every step is timestamped, screenshotted, and kept, so the client can retrace exactly what happened. Same knowledge, opposite behavior — and understanding how tracks get covered is exactly what lets a **defender** detect and reconstruct an attack later.

## How AI is changing the game

In 2025, an AI system called **XBOW** became the **#1 ranked bug hunter on HackerOne's US leaderboard** — the first non-human ever to top it, out-hunting every human researcher by autonomously finding and validating thousands of real vulnerabilities. So where is this going?

<div class="wk8" markdown="0">
<div class="grid2">
<div class="rcard">
<span class="tag">⚡ What AI now does — fast</span>
<ul>
<li>Recon, scanning, probing applications</li>
<li>Recognizing known vulnerability classes at scale</li>
<li>Even drafting the report</li>
<li>The grunt work of <b>finding</b> holes</li>
</ul>
</div>
<div class="rcard">
<span class="tag gr">🛡️ What stays human</span>
<ul>
<li><b>Judgment</b> — a flaw on the billing system matters more than the same flaw on a forgotten marketing page; that's business context</li>
<li><b>Accountability</b> — a person signs the report and is on the hook; you can't sue a model</li>
<li><b>Validation</b> — deciding which findings are real, and standing behind the call</li>
</ul>
</div>
</div>
</div>

The technical skill — finding and exploiting — is becoming a **commodity**. The judgment and accountability around it are not. The job isn't disappearing; it's moving up a level, from *"I can run the tools"* to *"I know what it means, and I'll stand behind it."*

## Keep going

!!! tip "Capture the Flag — and where to practice"
    **Capture the Flag (CTF)** is the gamified, safe, legal version of everything we've done: you're dropped into a deliberately vulnerable system and your job is to break in far enough to grab a planted token — the *flag* — which proves you got there. Free, endless practice lives at **Hack The Box**, **TryHackMe**, and **PicoCTF** (HTB Academy has an ~$8/month student plan for the guided courses). Start with the beginner tracks on any of those — and the **CEH** exam is a natural next credential.

## References

- **NIST SP 800-115** §5–8 — technical guide to security testing, analysis, and reporting. [Free PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf)
- **Penetration Testing Execution Standard (PTES).** [pentest-standard.org](http://www.pentest-standard.org/index.php/Main_Page)
- **How an AI-based "pen tester" became a top bug hunter on HackerOne** (XBOW, 2025). [Dark Reading](https://www.darkreading.com/vulnerabilities-threats/ai-based-pen-tester-top-bug-hunter-hackerone)
