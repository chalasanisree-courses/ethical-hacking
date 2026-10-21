---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 10 · Web Attacks II

<style>
.wk8{color:var(--w-ink);--w-ink:#1f2836;--w-muted:#5b6880;--w-line:#e3e8f0;--w-card:#ffffff;--w-teal:#0a7589;--w-amber:#a9700f;--w-amber-t:#f6edda;font-family:inherit}
[data-md-color-scheme="slate"] .wk8{--w-ink:#e7edf6;--w-muted:#9fadc3;--w-line:#33405c;--w-card:#1f2a42;--w-teal:#3bb6ce;--w-amber:#d8a646;--w-amber-t:#322a16}
.wk8 figure{margin:1rem 0}
.wk8 figcaption{font-size:.82rem;color:var(--w-muted);text-align:center;margin-top:.4rem}
.wk8 svg{max-width:100%;height:auto;display:block;margin:0 auto}
.wk8 .node-fill{fill:var(--w-card)}.wk8 .node-line{stroke:var(--w-line)}.wk8 .teal{fill:var(--w-teal)}.wk8 .teal-s{stroke:var(--w-teal)}.wk8 .amber{fill:var(--w-amber)}
.wk8 .svg-t{fill:var(--w-ink)}.wk8 .svg-m{fill:var(--w-muted)}
.md-typeset .admonition img,.md-typeset details img{border:1px solid var(--md-default-fg-color--lightest);border-radius:10px;margin:.2rem 0 .6rem}
.md-typeset .defense{color:var(--md-default-fg-color)}
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

??? danger "Walk the attack — and the fix"
    ![SQL injection on PhotoApp: a search of ' OR '1'='1 drops the private filter and returns every user's photos](../img/sqli-photoapp.png)

    **The move.** The catalog search builds a database query by **pasting your text into it**. Type `' OR '1'='1` — the quote ends the string, the always-true `OR` cancels the "public only" filter, and **every photo returns**, private ones included. The same trick pulls the `users` table and its password hashes, which you then crack offline. The variants (UNION, error-based, blind) differ only by *what the app shows back*; `sqlmap` automates all of them.

    **Real world.** *Heartland Payment Systems (2008)* — one SQL-injection flaw led to ~130 million card numbers stolen, the largest card breach of its day.

    **Defense.** **Parameterized queries** (prepared statements) — the database is told your input is a *value*, never code, so the quote can't break out. This kills every variant at once. Add a **least-privilege** database account, and treat a **WAF** as a backstop, not the fix.

### 🌐 Server-side request forgery (SSRF)

*OWASP A10 · you inject a destination, and the server fetches it for you.*

??? danger "Walk the attack — and the fix"
    ![SSRF on PhotoApp: an import-from-URL field pointed at the cloud metadata endpoint returns the server's cloud credentials](../img/ssrf-photoapp.png)

    **The move.** An "import a photo from a URL" feature fetches whatever link you give it. Paste an **internal** address instead — the cloud **metadata endpoint** `169.254.169.254` — and the server, sitting *inside* the network, fetches it and hands back the app's **cloud credentials**. A firewall stops *you* reaching that address; it does not stop the server. The victim isn't a user — it's the **trust boundary of the network**.

    **Real world.** *Capital One (2019)* — SSRF reached the AWS metadata endpoint, stole the server role's keys, and exposed ~100 million+ credit applications.

    **Defense.** **Allowlist** exactly which hosts the server may fetch; block internal IP ranges and the metadata address; never echo the raw response back; on AWS, require **IMDSv2**.

## Attacks on identity and the session

Here nothing is "injected." The app works perfectly — it just can't tell that the legitimate-looking user is really the attacker.

### 🔑 Broken authentication

*OWASP A07 · the login that never pushes back.*

??? danger "Walk the attack — and the fix"
    ![Broken authentication on PhotoApp: an automated leaked-password list runs against the login until one works](../img/brokenauth-photoapp.png)

    **The move.** PhotoViewer's login has **no attempt limit, allows weak passwords, and has no MFA**. An attacker replays a list of leaked email/password pairs against it until one works — **credential stuffing** — and it lands because the user **reused** a password breached on another site.

    **Real world.** *The North Face (2022)* — ~195,000 accounts taken over by credential stuffing.

    **Defense.** **Lockout + rate-limiting** so guessing stops; a **strong-password** policy; and above all **MFA** — a stolen password alone is then no longer enough.

### 🎫 Session hijacking

*OWASP A07 · the session token **is** your identity — so steal it.*

??? danger "Walk the attack — and the fix"
    ![Session hijacking on PhotoApp: a stolen session cookie is pasted into the attacker's browser, logging in as Mary with no password](../img/sessionhijack-photoapp.png)

    **The move.** Because the server trusts the session cookie as proof of who you are, **the token is your identity**. Steal that cookie — by **sniffing** an unencrypted connection (Wireshark, from Week 4), or via **XSS** — and **replay** it in your own browser to become that user, with no password at all.

    **Real world.** *Firesheep (2010)* — sites encrypted the *login* but sent the *session cookie* over plain HTTP afterward; a one-click Firefox add-on grabbed it off open Wi-Fi. It drove the move to HTTPS-everywhere.

    **Defense.** **HTTPS everywhere** (kills sniffing); set cookies **HttpOnly / Secure / SameSite** (kills script theft and cross-site sending); **rotate tokens**, use **short timeouts**, and re-check identity with **MFA**.

### 🎣 Cross-site request forgery (CSRF)

*OWASP A01 · the app honors a logged-in request it can't tell wasn't intended.*

??? danger "Walk the attack — and the fix"
    ![CSRF on PhotoApp: a trap page auto-submits a change-email request to PhotoViewer, and the browser attaches the victim's cookie automatically](../img/csrf-photoapp.png)

    **The move.** A trap page hides a form that **auto-submits** to PhotoViewer — "change recovery email." The victim's browser **attaches their session cookie automatically**, so PhotoViewer sees a valid, logged-in request and obeys. The attacker steals **nothing** — no cookie, no password — they borrow the victim's logged-in browser. The mirror of session hijacking: *steal* the cookie, or *ride* it.

    **Real world.** *ING Direct (2008)* — a CSRF flaw let attackers transfer money out of logged-in users' bank accounts.

    **Defense.** An **anti-CSRF token** the trap page can't guess, and **SameSite** cookies so the browser won't attach the session to a cross-site request. Modern browsers now default cookies to `SameSite=Lax`, which closes most of this on its own.

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
