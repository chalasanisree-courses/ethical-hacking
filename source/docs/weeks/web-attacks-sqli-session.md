---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 10 · Web Attacks II

<style>
.wk8{color:var(--w-ink);--w-ink:#1f2836;--w-muted:#5b6880;--w-line:#e3e8f0;--w-card:#ffffff;--w-teal:#0a7589;--w-amber:#a9700f;--w-amber-t:#f6edda;--w-teal-t:#e5f0f3;font-family:inherit}
[data-md-color-scheme="slate"] .wk8{--w-ink:#e7edf6;--w-muted:#9fadc3;--w-line:#33405c;--w-card:#1f2a42;--w-teal:#3bb6ce;--w-amber:#d8a646;--w-amber-t:#322a16;--w-teal-t:#123038}
.wk8 figure{margin:1rem 0}
.wk8 figcaption{font-size:.82rem;color:var(--w-muted);text-align:center;margin-top:.4rem}
.wk8 svg{max-width:100%;height:auto;display:block;margin:0 auto}
.wk8 .node-fill{fill:var(--w-card)}.wk8 .node-line{stroke:var(--w-line)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}.wk8 .amber{fill:var(--w-amber)}
.wk8 .svg-t{fill:var(--w-ink)}.wk8 .svg-m{fill:var(--w-muted)}
.md-typeset .admonition img,.md-typeset details img{border:1px solid var(--md-default-fg-color--lightest);border-radius:10px;margin:.2rem 0 .6rem}
.md-typeset .defense{color:var(--md-default-fg-color)}
/* interactive SQLi playground */
.wk8 .sqli{border:1px solid var(--w-line);border-radius:12px;padding:16px 18px;background:var(--w-card);margin:1rem 0}
.wk8 .sqli-cap{font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-muted);margin-bottom:10px}
.wk8 .sqli-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.wk8 .sqli-lab{font-size:.85rem;color:var(--w-muted)}
.wk8 .sqli-in{flex:1;min-width:200px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88rem;padding:8px 11px;border:2px solid var(--w-teal);border-radius:8px;background:var(--md-default-bg-color);color:var(--w-ink)}
.wk8 .sqli-btn{font-size:.85rem;font-weight:700;border:none;border-radius:8px;padding:9px 16px;background:var(--w-teal);color:#fff;cursor:pointer}
.wk8 .sqli-presets{font-size:.78rem;color:var(--w-muted);margin:11px 0 3px}
.wk8 .sqli-p{font-family:ui-monospace,monospace;font-size:.75rem;border:1px solid var(--w-line);background:transparent;color:var(--w-teal);border-radius:6px;padding:3px 8px;margin:3px 4px 0 0;cursor:pointer}
.wk8 .sqli-p:hover{border-color:var(--w-teal)}
.wk8 .sqli-qlab{font-size:.72rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--w-muted);margin:13px 0 5px}
.wk8 .sqli-code{background:#0f1720;border-radius:8px;padding:12px 14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.82rem;line-height:1.6;color:#cdd6e2;white-space:pre-wrap;word-break:break-word;margin:0}
.wk8 .sqli-code .kw{color:#7fb0e0}.wk8 .sqli-code .inj{color:#f3736b;font-weight:700;background:rgba(243,115,107,.15);border-radius:3px;padding:0 2px}
.wk8 .sqli-res{margin-top:11px;font-size:.88rem;padding:11px 13px;border-radius:8px;line-height:1.45}
.wk8 .sqli-res.ok{background:var(--w-teal-t);color:var(--w-ink);border:1px solid var(--w-teal)}
.wk8 .sqli-res.bad{background:#fbeceb;color:#8a2a22;border:1px solid #e3b3af}
[data-md-color-scheme="slate"] .wk8 .sqli-res.bad{background:#331f1c;color:#e4a79f;border-color:#6b3a34}
.wk8 .sqli-res b{font-weight:700}
/* step-through hijack */
.wk8 .hj{border:1px solid var(--w-line);border-radius:12px;padding:16px 18px;background:var(--w-card);margin:1rem 0}
.wk8 .hj-top{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.wk8 .hj-btn{font-size:.85rem;font-weight:700;border:none;border-radius:8px;padding:9px 16px;background:var(--w-teal);color:#fff;cursor:pointer}
.wk8 .hj-hint{font-size:.8rem;color:var(--w-muted)}
.wk8 .hj-step{opacity:.22;transition:opacity .25s;border-left:3px solid var(--w-line);padding:8px 0 8px 14px;margin:12px 0;font-size:.88rem;color:var(--w-ink)}
.wk8 .hj-step.on{opacity:1;border-left-color:var(--w-teal)}
.wk8 .hj-step .n{font-size:.7rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--w-teal)}
.wk8 .hj-step code{font-family:ui-monospace,monospace;background:#0f1720;color:#cdd6e2;border-radius:5px;padding:4px 8px;display:inline-block;margin-top:5px;font-size:.78rem;white-space:pre-wrap}
.wk8 .hj-step code .hot{color:#f3b14e;font-weight:700}.wk8 .hj-step code .ok{color:#7fd49a;font-weight:700}
/* xss vs csrf */
.wk8 .vs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:.6rem 0 0}
@media(max-width:640px){.wk8 .vs{grid-template-columns:1fr}}
.wk8 .vs-col{border:1px solid var(--w-line);border-radius:10px;padding:13px 15px;background:var(--w-card)}
.wk8 .vs-col h4{margin:0 0 7px;font-size:.92rem;color:var(--w-ink)}
.wk8 .vs-col ul{margin:0;padding-left:17px;font-size:.83rem;color:var(--w-muted);line-height:1.6}
.wk8 .vs-col .tell{margin-top:9px;font-size:.8rem;color:var(--w-ink)}
.wk8 .vs-col .tell b{color:var(--w-teal)}
</style>

<span class="kc-badge">🧭 <span class="eb-layer">Application</span><span class="eb-sep"> · </span><span class="eb-phase">OWASP Top 10</span><span class="eb-sep"> · </span><span class="eb-sum">the deepest injection, and attacks on identity — on the same PhotoViewer</span></span>

Last week opened the application layer and named the common web risks. This week goes deeper on the same app, in two directions: the single most damaging **injection** — into the **database** — and a twist where the app is tricked into making its *own* requests; then the attacks that target **identity** itself — logging in, holding a session, and acting through someone who is already logged in.

We stay organized by the **OWASP Top 10** — the Open Worldwide Application Security Project's shared list of the most critical web risks.

!!! tip "The one idea for the week"
    Two families, one sentence each. The app **trusts input** it should have checked — *injection* and *SSRF*. And the app **trusts identity** it should have verified — *authentication*, *sessions*, and the *requests* a logged-in browser sends.

## The example — PhotoViewer, and how a session works

Same app as last week: a photo-sharing site where a **free** user browses public photos and a **premium** user (Mary) can upload, tag, and make photos public. New this week, we look at the part that proves **who you are**.

The web is **stateless** — the server forgets you between clicks. So when you log in, the server hands your browser a **session cookie**: a random string that stands in for your identity. From then on, your browser sends that cookie with every request, and the server trusts it.

<div class="wk8" markdown="0">
<figure>
<svg viewBox="0 0 640 184" role="img" aria-label="Session flow: the browser logs in with a password, the server sets a session cookie, and the browser then sends that cookie automatically on every later request, which the server trusts as the user's identity">
<g text-anchor="middle" font-size="11.5">
<rect x="18" y="58" width="158" height="62" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="97" y="84" font-weight="700">🧑‍💻 Mary's browser</text><text class="svg-m" x="97" y="102" font-size="10">holds the cookie</text>
<rect x="464" y="58" width="158" height="62" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="543" y="84" font-weight="700">PhotoViewer server</text><text class="svg-m" x="543" y="102" font-size="10">trusts the cookie</text>
<path d="M176 74 L460 74" fill="none" class="teal-s" stroke-width="1.8" marker-end="url(#ar)"></path>
<text class="svg-m" x="318" y="68" font-size="9.5">① POST login — username + password</text>
<path d="M460 96 L176 96" fill="none" style="stroke:var(--w-amber)" stroke-width="1.8" marker-end="url(#ara)"></path>
<text x="318" y="110" font-size="9.5" font-weight="700" style="fill:var(--w-amber)">② Set-Cookie: session=a3f9… — this IS your identity</text>
<path d="M176 140 L460 140" fill="none" class="teal-s" stroke-width="1.8" stroke-dasharray="5 4" marker-end="url(#ar)"></path>
<text class="svg-m" x="318" y="156" font-size="9.5">③ every later request automatically carries that cookie</text>
</g>
<defs>
<marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker>
<marker id="ara" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="amber"></polygon></marker>
</defs>
</svg>
<figcaption>The session cookie <b>is</b> your identity. Two of this week's attacks live right here: <b>steal</b> the cookie (session hijacking), or <b>make the browser send it</b> for you (CSRF).</figcaption>
</figure>
</div>

## Attacks on the request

The app takes something you send and acts on it — a search, or a URL to fetch — without checking it hard enough.

### 🗄️ SQL injection

*OWASP A03 · input the app runs as a query, inside the database.*

The catalog search builds a database query by **pasting your text into it**. Try it below — type a normal word, then try breaking out of the quotes. Watch the query the app runs, and what comes back.

<div class="wk8" markdown="0">
<div class="sqli">
<div class="sqli-cap">🔎 PhotoViewer search — try an injection</div>
<div class="sqli-row">
<span class="sqli-lab">caption contains:</span>
<input id="sqliIn" class="sqli-in" value="beach" spellcheck="false" autocomplete="off" aria-label="search input">
<button id="sqliGo" class="sqli-btn" type="button">Search</button>
</div>
<div class="sqli-presets">try:
<button class="sqli-p" type="button" data-v="beach">beach</button>
<button class="sqli-p" type="button" data-v="beach' OR '1'='1">beach' OR '1'='1</button>
<button class="sqli-p" type="button" data-v="x' UNION SELECT username, password_hash FROM users --">' UNION SELECT … FROM users</button>
</div>
<div class="sqli-qlab">The query the app runs</div>
<pre class="sqli-code" id="sqliCode"></pre>
<div class="sqli-res ok" id="sqliRes"></div>
</div>
</div>

??? danger "Walk the attack — and the fix"
    ![SQL injection on PhotoViewer: a search of ' OR '1'='1 drops the private filter and returns every user's photos](../img/sqli-photoapp.png)

    **The move.** Type `' OR '1'='1` into the search. The quote ends the string, the always-true `OR` cancels the "public only" filter, and **every photo returns**, private ones included. The same trick pulls the `users` table and its password hashes, which you then crack offline. The variants (UNION, error-based, blind) differ only by *what the app shows back*; `sqlmap` automates all of them.

    **Real world.** *Heartland Payment Systems (2008)* — one SQL-injection flaw led to ~130 million card numbers stolen, the largest card breach of its day.

    **Defense.** **Parameterized queries** (prepared statements) — the database is told your input is a *value*, never code, so the quote can't break out. This kills every variant at once. Add a **least-privilege** database account, and treat a **WAF** as a backstop, not the fix.

### 🌐 Server-side request forgery (SSRF)

*OWASP A10 · you inject a destination, and the server fetches it for you.*

??? danger "Walk the attack — and the fix"
    ![SSRF on PhotoViewer: an import-from-URL field pointed at the cloud metadata endpoint returns the server's cloud credentials](../img/ssrf-photoapp.png)

    **The move.** An "import a photo from a URL" feature fetches whatever link you give it. Paste an **internal** address instead — the cloud **metadata endpoint** `169.254.169.254` — and the server, sitting *inside* the network, fetches it and hands back the app's **cloud credentials**. A firewall stops *you* reaching that address; it does not stop the server. The victim isn't a user — it's the **trust boundary of the network**.

    **Real world.** *Capital One (2019)* — SSRF reached the AWS metadata endpoint, stole the server role's keys, and exposed ~100 million+ credit applications.

    **Defense.** **Allowlist** exactly which hosts the server may fetch; block internal IP ranges and the metadata address; never echo the raw response back; on AWS, require **IMDSv2**.

## Attacks on identity and the session

Here nothing is "injected." The app works perfectly — it just can't tell that the legitimate-looking user is really the attacker.

### 🔑 Broken authentication

*OWASP A07 · the login that never pushes back.*

??? danger "Walk the attack — and the fix"
    ![Broken authentication on PhotoViewer: an automated leaked-password list runs against the login until one works](../img/brokenauth-photoapp.png)

    **The move.** PhotoViewer's login has **no attempt limit, allows weak passwords, and has no MFA**. An attacker replays a list of leaked email/password pairs against it until one works — **credential stuffing** — and it lands because the user **reused** a password breached on another site.

    **Real world.** *The North Face (2022)* — ~195,000 accounts taken over by credential stuffing.

    **Defense.** **Lockout + rate-limiting** so guessing stops; a **strong-password** policy; and above all **MFA** — a stolen password alone is then no longer enough.

### 🎫 Session hijacking

*OWASP A07 · the session token **is** your identity — so steal it, then replay it.*

Stealing the cookie is only half the attack — it becomes a hijack when you **replay** that cookie in a request. Step through the whole chain:

<div class="wk8" markdown="0">
<div class="hj">
<div class="hj-top">
<button id="hjBtn" class="hj-btn" type="button">▶ Step through the hijack</button>
<span class="hj-hint" id="hjHint">Three steps: steal the cookie → replay it → you're Mary.</span>
</div>
<div class="hj-step" id="hj-1"><span class="n">Step 1 · steal</span><br>A script injected via <b>XSS</b> (or <b>sniffing</b> on open Wi-Fi) grabs Mary's session cookie and sends it to the attacker.<br><code>session=<span class="hot">a3f9c1e8b7d24f60a1c8</span></code></div>
<div class="hj-step" id="hj-2"><span class="n">Step 2 · replay</span><br>The attacker makes a request to PhotoViewer that <b>carries the stolen cookie</b> — no password anywhere.<br><code>GET /account  HTTP/1.1
Host: photoapp.com
Cookie: session=<span class="hot">a3f9c1e8b7d24f60a1c8</span></code></div>
<div class="hj-step" id="hj-3"><span class="n">Step 3 · become Mary</span><br>The server only checks the cookie, so it answers as if Mary asked. Session hijacked.<br><code><span class="ok">200 OK · Welcome back, Mary</span></code></div>
</div>
</div>

??? danger "Walk the attack — and the fix"
    ![Session hijacking on PhotoViewer: a stolen session cookie is replayed in the attacker's browser, logging in as Mary with no password](../img/sessionhijack-photoapp.png)

    **The move.** Because the server trusts the session cookie as proof of who you are, **the token is your identity**. Steal that cookie — by **sniffing** an unencrypted connection (Wireshark, from Week 4), or via **XSS** — and **replay** it in a request to become that user, with no password at all.

    **Real world.** *Firesheep (2010)* — sites encrypted the *login* but sent the *session cookie* over plain HTTP afterward; a one-click Firefox add-on grabbed it off open Wi-Fi. It drove the move to HTTPS-everywhere.

    **Defense.** **HTTPS everywhere** (kills sniffing); set cookies **HttpOnly / Secure / SameSite** (kills script theft and cross-site sending); **rotate tokens**, use **short timeouts**, and re-check identity with **MFA**.

### 🎣 Cross-site request forgery (CSRF)

*OWASP A01 · the app honors a logged-in request it can't tell wasn't intended.*

??? danger "Walk the attack — and the fix"
    ![CSRF on PhotoViewer: a trap page auto-submits a change-email request to PhotoViewer, and the browser attaches the victim's cookie automatically](../img/csrf-photoapp.png)

    **The move.** A trap page hides a form that **auto-submits** to PhotoViewer — "change recovery email." The victim's browser **attaches their session cookie automatically**, so PhotoViewer sees a valid, logged-in request and obeys. The attacker steals **nothing** — no cookie, no password — they borrow the victim's logged-in browser. The mirror of session hijacking: *steal* the cookie, or *ride* it.

    **Real world.** *ING Direct (2008)* — a CSRF flaw let attackers transfer money out of logged-in users' bank accounts.

    **Defense.** An **anti-CSRF token** the trap page can't guess, and **SameSite** cookies so the browser won't attach the session to a cross-site request. Modern browsers now default cookies to `SameSite=Lax`, which closes most of this on its own.

**Don't confuse XSS and CSRF.** Both ride a logged-in session, but they're opposites — and the giveaway is *whether the attacker's script runs on the target site and reads the cookie*:

<div class="wk8" markdown="0">
<div class="vs">
<div class="vs-col">
<h4>📝 XSS → cookie theft</h4>
<ul>
<li>Attacker's script runs <b>inside the target page</b></li>
<li>It <b>reads</b> the cookie (<code>document.cookie</code>)</li>
<li>Attacker ends up <b>holding the token</b> — replay anytime</li>
</ul>
<div class="tell">Stopped by <b>HttpOnly</b> — script can't read the cookie.</div>
</div>
<div class="vs-col">
<h4>🎣 CSRF</h4>
<ul>
<li><b>No script on the target</b>, ever</li>
<li>Never sees the cookie — the <b>browser</b> auto-attaches it</li>
<li>Attacker forces <b>one action</b>, in the victim's browser</li>
</ul>
<div class="tell">Stopped by <b>SameSite</b> — browser won't attach it cross-site.</div>
</div>
</div>
</div>

??? info "📎 In industry terms — OWASP · ATT&CK"

    - **OWASP Top 10:** A03 Injection (SQLi) · A10 Server-Side Request Forgery · A07 Identification &amp; Authentication Failures (broken auth, session hijacking) · A01 Broken Access Control (CSRF)
    - **MITRE ATT&CK:** [T1190 Exploit Public-Facing App](https://attack.mitre.org/techniques/T1190/) · [T1539 Steal Web Session Cookie](https://attack.mitre.org/techniques/T1539/) · [T1185 Browser Session Hijacking](https://attack.mitre.org/techniques/T1185/)
    - New to these frameworks? The full map is in **[Week 1 · frameworks](ethics-law-methodology.html)**.

This finishes the web application. Last week's map is in **[Web Attacks I](web-attacks-servers-apps.html)**; next, the target stops being the app and becomes the **person** — **[Social engineering](social-engineering-identity.html)**.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — the industry list of critical web risks
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — how to test for each
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — free hands-on labs for SQLi, SSRF, authentication, and CSRF
- [SQL injection (PortSwigger)](https://portswigger.net/web-security/sql-injection) · [SSRF (PortSwigger)](https://portswigger.net/web-security/ssrf) · [CSRF (PortSwigger)](https://portswigger.net/web-security/csrf)
- [MITRE ATT&CK](https://attack.mitre.org/) — T1190, T1539, T1185

<script>
(function(){
  // ---- interactive SQL injection playground ----
  var inp=document.getElementById('sqliIn'), code=document.getElementById('sqliCode'), res=document.getElementById('sqliRes');
  function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function render(){
    if(!inp||!code||!res) return;
    var v=inp.value;
    var low=v.toLowerCase();
    var injected = v.indexOf("'")>-1 && (low.indexOf("or '1'='1")>-1 || low.indexOf("or 1=1")>-1 || low.indexOf("union")>-1 || low.indexOf("--")>-1 || low.indexOf(" or ")>-1);
    // visible query with the user's literal text (quotes shown), injection span highlighted
    var shown='%'+esc(v)+'%';
    if(injected){
      // highlight everything from the first quote onward as "broke out"
      var i=esc(v).indexOf('&#39;'); if(i<0) i=esc(v).indexOf("'");
      var pre=esc(v).slice(0,i), rest=esc(v).slice(i);
      shown='%'+pre+'<span class="inj">'+rest+'</span>%';
    }
    code.innerHTML='<span class="kw">SELECT</span> * <span class="kw">FROM</span> photos <span class="kw">WHERE</span> caption <span class="kw">LIKE</span> \''+shown+'\' <span class="kw">AND</span> public = 1;';
    if(low.indexOf("union")>-1){
      res.className='sqli-res bad';
      res.innerHTML='⚠️ <b>Users table dumped.</b> The UNION stapled a second query on — usernames and password hashes come back where captions should: <code style="font-family:ui-monospace,monospace">mary : 5f4dcc3b…, david : e99a18c4…</code> → crack offline.';
    } else if(injected){
      res.className='sqli-res bad';
      res.innerHTML='⚠️ <b>12 of 12 photos returned — everyone’s, private included.</b> The quote closed the string and <code style="font-family:ui-monospace,monospace">OR \'1\'=\'1\'</code> made the <code style="font-family:ui-monospace,monospace">WHERE</code> always true, so <code style="font-family:ui-monospace,monospace">public = 1</code> no longer matters.';
    } else {
      res.className='sqli-res ok';
      var n = v.trim()==='' ? 'all public' : '3 public';
      res.innerHTML='✓ <b>'+n+' “'+(esc(v.trim())||'…')+'” photos.</b> Your input stayed inside the quotes — treated as text to match, exactly as intended.';
    }
  }
  if(inp){
    inp.addEventListener('input',render);
    document.getElementById('sqliGo').addEventListener('click',render);
    var ps=document.querySelectorAll('.sqli-p');
    for(var k=0;k<ps.length;k++){ps[k].addEventListener('click',function(){inp.value=this.getAttribute('data-v');render();inp.focus();});}
    render();
  }
  // ---- session-hijacking step-through ----
  var hjBtn=document.getElementById('hjBtn'), hjHint=document.getElementById('hjHint'), hjCur=0, hjMax=3;
  function hjRender(){
    for(var i=1;i<=hjMax;i++){var e=document.getElementById('hj-'+i); if(e){ if(i<=hjCur) e.classList.add('on'); else e.classList.remove('on'); }}
    if(hjCur===0) hjHint.textContent='Three steps: steal the cookie → replay it → you’re Mary.';
    else if(hjCur<hjMax) hjHint.textContent='Step '+hjCur+' of '+hjMax+' — keep going.';
    else hjHint.textContent='Hijacked — no password was ever used. Click to replay.';
    hjBtn.textContent = hjCur>=hjMax ? '↻ Replay' : (hjCur===0 ? '▶ Step through the hijack' : '▶ Next step');
  }
  if(hjBtn){
    hjBtn.addEventListener('click',function(){ hjCur = hjCur>=hjMax ? 0 : hjCur+1; hjRender(); });
    hjRender();
  }
})();
</script>
