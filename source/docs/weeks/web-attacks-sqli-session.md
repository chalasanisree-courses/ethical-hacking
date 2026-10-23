---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 10 · Web Attacks II

<style>
.wk8{color:var(--w-ink);--w-ink:#1f2836;--w-muted:#5b6880;--w-line:#e3e8f0;--w-card:#ffffff;--w-teal:#0a7589;--w-amber:#a9700f;--w-surface:#eef2f7;font-family:inherit}
[data-md-color-scheme="slate"] .wk8{--w-ink:#e7edf6;--w-muted:#9fadc3;--w-line:#33405c;--w-card:#1f2a42;--w-teal:#3bb6ce;--w-amber:#d8a646;--w-surface:#17202e}
.wk8 figure{margin:1rem 0}
.wk8 figcaption{font-size:.82rem;color:var(--w-muted);text-align:center;margin-top:.4rem}
.wk8 svg{max-width:100%;height:auto;display:block;margin:0 auto}
.wk8 .node-fill{fill:var(--w-card)}.wk8 .node-line{stroke:var(--w-line)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}.wk8 .amber{fill:var(--w-amber)}
.wk8 .svg-t{fill:var(--w-ink)}.wk8 .svg-m{fill:var(--w-muted)}
/* framed app screenshot — clearly "the app", not the page */
.wk8 .appshot{border:1px solid var(--w-line);border-radius:12px;background:var(--w-surface);padding:11px 11px 8px;margin:1.1rem 0 .5rem;box-shadow:0 2px 12px rgba(20,30,48,.08)}
[data-md-color-scheme="slate"] .wk8 .appshot{box-shadow:none}
.wk8 .appshot .bar{display:flex;align-items:center;gap:7px;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--w-muted);margin:2px 3px 9px}
.wk8 .appshot .bar .dot{width:8px;height:8px;border-radius:50%;background:var(--w-teal);display:inline-block}
.wk8 .appshot img{display:block;width:100%;border-radius:8px;border:1px solid var(--w-line);margin:0}
.wk8 .appshot .cap{font-size:.82rem;color:var(--w-muted);line-height:1.45;margin:9px 3px 1px}
.wk8 .appshot .cap code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.92em;color:var(--w-ink)}
</style>

<span class="kc-badge">🧭 <span class="eb-layer">Application</span><span class="eb-sep"> · </span><span class="eb-phase">OWASP Top 10</span><span class="eb-sep"> · </span><span class="eb-sum">the deepest injection, and attacks on identity — on the same PhotoViewer</span></span>

Last week opened the application layer and named the common web risks. This week goes deeper on the same app: the single most damaging **injection** — into the **database** — a twist where the app is tricked into making its *own* requests, and then the attacks that target **identity** itself.

Each attack below is shown as a screen of **PhotoViewer**, the running example app, followed by the move and the fix.

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

## Attacks on the request

### 🗄️ SQL injection

*OWASP A03 · input the app runs as a query, inside the database.*

<div class="wk8" markdown="0">
<div class="appshot">
<div class="bar"><span class="dot"></span>PhotoViewer · the app</div>
<img src="../img/sqli-photoapp.png" alt="PhotoViewer SQL injection: a search of ' OR '1'='1 returns every user's photos, private ones included">
<div class="cap">A search of <code>' OR '1'='1</code> breaks out of the data into the query — the private filter falls away and every photo returns.</div>
</div>
</div>

**The move.** The catalog search glues your text into a SQL query. A quote closes the string, `OR '1'='1` makes the `WHERE` always true, and the "public only" filter no longer matters — every photo returns. The same trick pulls the `users` table and its password hashes to crack offline.

**Fix.** **Parameterized queries** — the input is bound as a *value*, never code, so a quote can't break out. (Least-privilege DB account; a WAF only as a backstop.) **Real world:** *Heartland Payment Systems (2008)* — ~130 million card numbers.

### 🌐 Server-side request forgery (SSRF)

*OWASP A10 · you give the app a destination, and the server fetches it for you.*

<div class="wk8" markdown="0">
<div class="appshot">
<div class="bar"><span class="dot"></span>PhotoViewer · the app</div>
<img src="../img/ssrf-photoapp.png" alt="PhotoViewer SSRF: an import-from-URL field pointed at the cloud metadata endpoint returns the server's cloud credentials">
<div class="cap">Paste the cloud metadata URL <code>169.254.169.254</code> into "import from URL" and the server fetches its own credentials.</div>
</div>
</div>

**The move.** "Import a photo from a URL" fetches whatever link you give it. Paste an **internal** address — the cloud metadata endpoint — and the server, sitting *inside* the network, fetches it and hands back the app's **cloud keys**. A firewall stops *you* reaching that address; it does not stop the server.

**Fix.** **Allowlist** which hosts the server may fetch; block internal ranges and the metadata address (use IMDSv2 on AWS). **Real world:** *Capital One (2019)* — ~100 million+ credit applications.

## Attacks on identity

### 🔑 Broken authentication

*OWASP A07 · the login that never pushes back.*

<div class="wk8" markdown="0">
<div class="appshot">
<div class="bar"><span class="dot"></span>PhotoViewer · the app</div>
<img src="../img/brokenauth-photoapp.png" alt="PhotoViewer broken authentication: an automated leaked-password list runs against the login until one works">
<div class="cap">No lockout, so an automated list of leaked passwords runs against the login until one hits.</div>
</div>
</div>

**The move.** The login has no attempt limit, allows weak passwords, and has no MFA. An attacker replays leaked email/password pairs until one works — **credential stuffing** — landing because the user reused a password breached on another site.

**Fix.** **Lockout + rate-limiting, a strong-password policy, and MFA** above all. **Real world:** *The North Face (2022)* — ~195,000 accounts taken over.

### 🎫 Session hijacking

*OWASP A07 · the session token **is** your identity — so steal it, then replay it.*

<div class="wk8" markdown="0">
<div class="appshot">
<div class="bar"><span class="dot"></span>PhotoViewer · the app</div>
<img src="../img/sessionhijack-photoapp.png" alt="PhotoViewer session hijacking: a stolen session cookie is replayed in the attacker's browser, logging in as Mary with no password">
<div class="cap">A stolen session cookie, replayed in the attacker's browser — now logged in as Mary, no password.</div>
</div>
</div>

**The move.** The server trusts the session cookie as proof of who you are, so the token **is** you. Steal it — by **sniffing** an unencrypted connection (Wireshark, from Week 4) or via **XSS** — and **replay** it in a request to become that user, with no password.

**Fix.** **HTTPS everywhere; HttpOnly / Secure / SameSite cookies; short timeouts and MFA.** **Real world:** *Firesheep (2010)* — session cookies grabbed off open Wi-Fi, which drove the move to HTTPS-everywhere.

### 🎣 Cross-site request forgery (CSRF)

*OWASP A01 · the app honors a logged-in request it can't tell wasn't intended.*

<div class="wk8" markdown="0">
<div class="appshot">
<div class="bar"><span class="dot"></span>PhotoViewer · the app</div>
<img src="../img/csrf-photoapp.png" alt="PhotoViewer CSRF: a trap page auto-submits a change-email request to PhotoViewer, and the browser attaches the victim's cookie automatically">
<div class="cap">A trap page makes Mary's browser POST to PhotoViewer; her session cookie rides along automatically.</div>
</div>
</div>

**The move.** A trap page auto-submits a request to PhotoViewer — "change recovery email." Mary's browser attaches her session cookie **automatically**, so the app obeys. The attacker never sees the cookie — they *ride* it. (The mirror of session hijacking: *steal* the cookie, or *ride* it.)

**Fix.** **Anti-CSRF tokens** and **SameSite** cookies — now the browser default, which closes most of this on its own. **Real world:** *ING Direct (2008)* — forced money transfers out of logged-in accounts.

## Wrap

This finishes the web application — **code** (SQLi, SSRF, the input attacks) and **credentials** (broken auth, session hijacking, CSRF, the identity attacks). Last week's map is in **[Web Attacks I](web-attacks-servers-apps.html)**; next, the target stops being the app and becomes the **person** — **[Social engineering](social-engineering-identity.html)**.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — A03 Injection · A10 SSRF · A07 Identification &amp; Authentication Failures · A01 Broken Access Control
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — how to test for each
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — free labs for [SQLi](https://portswigger.net/web-security/sql-injection), [SSRF](https://portswigger.net/web-security/ssrf), and [CSRF](https://portswigger.net/web-security/csrf)
