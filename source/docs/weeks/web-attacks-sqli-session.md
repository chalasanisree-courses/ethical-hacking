---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 10 · Web Attacks II

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
</style>

<span class="kc-badge">🧭 <span class="eb-layer">Application</span><span class="eb-sep"> · </span><span class="eb-phase">OWASP Top 10</span><span class="eb-sep"> · </span><span class="eb-sum">the deepest injection, and attacks on identity — on the same PhotoViewer</span></span>

Last week opened the application layer and named the common web risks. This week goes deeper on the same app: the most damaging **injection** — into the **database** — a twist where the app is tricked into making its *own* requests, and the attacks that target **identity** itself.

!!! tip "The one idea for the week"
    The app **trusts input** it should have checked (*injection*, *SSRF*), and it **trusts identity** it should have verified (*authentication*, *sessions*, and the *requests* a logged-in browser sends).

## How a session works

The web is **stateless** — the server forgets you between clicks. So when you log in, the server hands your browser a **session cookie**: a random string that stands in for your identity, which your browser then sends with every later request. Two of this week's attacks come down to that cookie.

<div class="wk8" markdown="0">
<figure>
<svg viewBox="0 0 640 184" role="img" aria-label="Session flow: the browser logs in, the server sets a session cookie, and the browser sends that cookie automatically on every later request, which the server trusts as the user's identity">
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
</figure>
</div>

## The attacks

<p class="hint">Click an attack to see how it works, how to defend it, where it's bitten in the real world, and how a pentester spots it.</p>

<div class="wk8" markdown="0">
<div class="atkpick">
<div class="atkcards">
<button class="atkcard" data-atk="sqli" type="button"><span class="ic">🗄️</span><span class="tag">A03 · Code</span><span class="nm">SQL injection</span><span class="sub">input becomes a query</span></button>
<button class="atkcard" data-atk="ssrf" type="button"><span class="ic">🌐</span><span class="tag">A10 · Code</span><span class="nm">SSRF</span><span class="sub">the server fetches for you</span></button>
<button class="atkcard" data-atk="auth" type="button"><span class="ic">🔑</span><span class="tag">A07 · Credentials</span><span class="nm">Broken auth</span><span class="sub">guess your way in</span></button>
<button class="atkcard" data-atk="hijack" type="button"><span class="ic">🎫</span><span class="tag">A07 · Credentials</span><span class="nm">Session hijacking</span><span class="sub">steal the session</span></button>
<button class="atkcard" data-atk="csrf" type="button"><span class="ic">🎣</span><span class="tag">A01 · Credentials</span><span class="nm">CSRF</span><span class="sub">ride the session</span></button>
</div>
<div class="atkpanel">

<div class="atkdetail" data-for="sqli">
<div class="atktitle">🗄️ SQL injection<span class="oc">OWASP A03 · Injection</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><img src="../img/sqli-photoapp.png" alt="PhotoViewer SQL injection: a search of ' OR '1'='1 returns every user's photos"><p>The catalog search glues your text into a SQL query. A quote closes the string, <code>OR '1'='1</code> makes the <code>WHERE</code> always true, and the "public only" filter no longer matters — <b>every photo returns</b>, private ones included. The same trick pulls the <code>users</code> table and its password hashes to crack offline.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Parameterized queries</b> (prepared statements) — the database is told your input is a <i>value</i>, never code, so a quote can't break out. This kills every variant at once. Back it with a <b>least-privilege</b> database account; treat a <b>WAF</b> as a backstop, not the fix.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Heartland Payment Systems (2008)</b> — a single SQL-injection flaw led to ~130 million card numbers stolen, the largest card breach of its day.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>The classic tell: a single quote in an input that triggers a database error. Probe inputs with <b>Burp Suite</b>, then automate detection and dumping with <code>sqlmap</code>. You'll do this hands-on in <b>Lab 3</b>.</p></div>
</div>

<div class="atkdetail" data-for="ssrf">
<div class="atktitle">🌐 Server-side request forgery<span class="oc">OWASP A10</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><img src="../img/ssrf-photoapp.png" alt="PhotoViewer SSRF: an import-from-URL field pointed at the cloud metadata endpoint returns the server's cloud credentials"><p>"Import a photo from a URL" fetches whatever link you give it. Paste an <b>internal</b> address — the cloud metadata endpoint <code>169.254.169.254</code> — and the server, sitting <i>inside</i> the network, fetches it and hands back the app's <b>cloud keys</b>. A firewall stops <i>you</i> reaching that address; it does not stop the server.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Allowlist</b> exactly which hosts the server may fetch; block internal IP ranges and the metadata address; never echo the raw response back; on AWS, require <b>IMDSv2</b>.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Capital One (2019)</b> — SSRF reached the AWS metadata endpoint, stole the server role's keys, and exposed ~100 million+ credit applications.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Anywhere the app fetches a URL you supply, give it an address you control and watch for a call-back (<b>Burp Collaborator</b>). Then try internal addresses and the metadata IP to see what comes back.</p></div>
</div>

<div class="atkdetail" data-for="auth">
<div class="atktitle">🔑 Broken authentication<span class="oc">OWASP A07</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><img src="../img/brokenauth-photoapp.png" alt="PhotoViewer broken authentication: an automated leaked-password list runs against the login until one works"><p>The login has <b>no attempt limit, allows weak passwords, and has no MFA</b>. An attacker replays leaked email/password pairs until one works — <b>credential stuffing</b> — landing because the user reused a password breached on another site.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>Lockout + rate-limiting</b> so guessing stops; a <b>strong-password</b> policy; and above all <b>MFA</b> — a stolen password alone is then no longer enough.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>The North Face (2022)</b> — ~195,000 accounts taken over by credential stuffing.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Check whether the login <b>locks out or rate-limits</b> after failed tries, whether it accepts weak passwords, and whether <b>MFA</b> is offered. Test with a small known credential list — never a real breach dump.</p></div>
</div>

<div class="atkdetail" data-for="hijack">
<div class="atktitle">🎫 Session hijacking<span class="oc">OWASP A07</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><img src="../img/sessionhijack-photoapp.png" alt="PhotoViewer session hijacking: a stolen session cookie is replayed in the attacker's browser, logging in as Mary with no password"><p>The server trusts the session cookie as proof of who you are, so <b>the token is you</b>. Steal it — by <b>sniffing</b> an unencrypted connection (Wireshark, Week 4) or via <b>XSS</b> — and <b>replay</b> it in a request to become that user, with no password.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p><b>HTTPS everywhere</b> (kills sniffing); set cookies <b>HttpOnly / Secure / SameSite</b> (kills script theft and cross-site sending); rotate tokens, use <b>short timeouts</b>, and re-check identity with <b>MFA</b>.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>Firesheep (2010)</b> — a one-click add-on grabbed session cookies off open Wi-Fi, which drove the move to HTTPS-everywhere.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Inspect the session cookie in dev tools — is it <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code>? Is <i>all</i> traffic HTTPS? Capture it on an open network with <b>Wireshark</b>, then replay it. You'll do this in <b>Lab 4</b>.</p></div>
</div>

<div class="atkdetail" data-for="csrf">
<div class="atktitle">🎣 Cross-site request forgery<span class="oc">OWASP A01</span></div>
<div class="atktabs"><button class="atktab" data-sec="how" type="button">How it works</button><button class="atktab" data-sec="def" type="button">Defense</button><button class="atktab" data-sec="real" type="button">Real world</button><button class="atktab" data-sec="spot" type="button">Spot it</button></div>
<div class="atksec" data-sec="how"><img src="../img/csrf-photoapp.png" alt="PhotoViewer CSRF: a trap page auto-submits a change-email request, and the browser attaches the victim's cookie automatically"><p>A trap page <b>auto-submits</b> a request to PhotoViewer — "change recovery email." Mary's browser attaches her session cookie <b>automatically</b>, so the app obeys. The attacker never sees the cookie — they <i>ride</i> it. The mirror of session hijacking: <i>steal</i> the cookie, or <i>ride</i> it.</p></div>
<div class="atksec" data-sec="def"><p class="lab">Defense</p><p>An <b>anti-CSRF token</b> the trap page can't guess, and <b>SameSite</b> cookies so the browser won't attach the session to a cross-site request. Modern browsers now default to <code>SameSite=Lax</code>, which closes most of this on its own.</p></div>
<div class="atksec" data-sec="real"><p class="lab">Real world</p><p><b>ING Direct (2008)</b> — a CSRF flaw let attackers transfer money out of logged-in users' bank accounts.</p></div>
<div class="atksec" data-sec="spot"><p class="lab">Spot it</p><p>Take a state-changing request (change email, transfer) and check whether it carries an <b>unguessable token</b> and whether its cookie is <code>SameSite</code>. If you can replay the request from another origin and it works, it's vulnerable.</p></div>
</div>

</div>
</div>
</div>

## Wrap

This finishes the web application — **code** (SQLi, SSRF, the input attacks) and **credentials** (broken auth, session hijacking, CSRF, the identity attacks). Last week's map is in **[Web Attacks I](web-attacks-servers-apps.html)**; next, the target stops being the app and becomes the **person** — **[Social engineering](social-engineering-identity.html)**.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — A03 Injection · A10 SSRF · A07 Identification &amp; Authentication Failures · A01 Broken Access Control
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — how to test for each
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — free labs for [SQLi](https://portswigger.net/web-security/sql-injection), [SSRF](https://portswigger.net/web-security/ssrf), and [CSRF](https://portswigger.net/web-security/csrf)

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
  showAtk('sqli');
})();
</script>
