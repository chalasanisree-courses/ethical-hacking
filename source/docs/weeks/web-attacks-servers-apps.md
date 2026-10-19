---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 9 · Web Attacks I

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

<span class="kc-badge">🧭 <span class="eb-layer">Application</span><span class="eb-sep"> · </span><span class="eb-phase">OWASP Top 10</span><span class="eb-sep"> · </span><span class="eb-sum">the web app's own flaws — on one running example, PhotoViewer</span></span>

We're through the network and off the host. The last layer is the **application** — the part users actually touch, exposed to the whole internet by design, and the most-attacked thing an organization owns.

Unlike the single-step attacks of earlier weeks, a web flaw can touch the **whole attack loop** — a way in, a planted web shell to persist, data stolen straight out. So we organize this week not by one lifecycle phase, but by the **OWASP Top 10**: the industry's shared list of the most critical web risks.

## What makes a web app attackable

A **static** site that only hands out pages is almost nothing to attack — the worst you can do is sniff plaintext traffic, which is a *network* attack, not an app one. The moment the app takes **input** — a login, a search, a caption, a filename — and *does something* with it, you've created the attack surface.

!!! tip "The one idea for the week"
    Most of the attacks below come down to the same thing: **the app trusted input it should have checked.** Validate what comes in, encode what goes out, and check *who* is asking for *what*.

## The example — PhotoViewer

PhotoViewer is a simple photo-sharing app: anyone can browse public photos, and once you log in you see your own. A **free** user browses and searches; a **premium** user can upload, tag, delete, and make a photo public.

![What PhotoViewer looks like — a premium user's view, with the free-vs-premium capabilities](../img/photoviewer-app.png){ .atkfig }

Under the hood it's the classic **three tiers**: a **web server** (serves the page), an **app server** (the logic), and a **data tier** — a **catalog database** (who owns which photo, public or private, and *where it's stored*) plus the **photo store** itself. Walk a single request:

<div class="wk8" markdown="0">
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
<figcaption>Hold onto step ⑤: the browser reaches the photo store <b>directly</b>, using the URLs from step ④ — the opening for the first attack.</figcaption>
</figure>
</div>

## The attacks

Each one is a common OWASP web risk, shown on PhotoViewer. Expand any to see how it works — and how to stop it.

### ⚙️ Security misconfiguration

*OWASP A05 · the code is fine — a setting was left loose.*

???+ warning "Walk the attack — and the fix"
    ![Misconfiguration on PhotoApp: the JSON hands back a storage URL, and the public bucket serves another user's private photo directly](../img/misconfig-photoapp.png)

    **The move.** The JSON response hands back the **storage URL**. If the store is left public, anyone requests that URL directly — around the app entirely — and can walk the whole store. Same family: an `/admin` console on default `admin/admin`, a database reachable with its default password, verbose errors that leak the schema.

    **Real world.** *Deep Root Analytics (2017)* — ~198 million US voter records sitting in a public cloud bucket. No exploit; access was just left out.

    **Defense.** Lock storage to **private**; change **every default credential**; disable **directory listing**; keep databases **off the public network** with strong passwords; serve **generic error pages**; **patch** known-vulnerable components.

### 📝 Cross-site scripting (XSS)

*OWASP A03 · input the app renders as code, in another user's browser.*

??? danger "Walk the attack — and the fix"
    ![XSS on PhotoApp: a caption set to a script tag that steals the viewer's cookie](../img/xss-photoapp.png)

    **The move.** A caption is supposed to be **text**, but PhotoViewer writes it straight into the page's HTML. Set the caption to a `<script>`, and it runs in the **next viewer's browser**, with *their* session — the classic payload steals their cookie. The victim isn't the app; it's another user.

    **Real world.** *TweetDeck (2014)* — a script inside a post ran in the TweetDeck client (twitter.com stripped it) and **self-spread** as a worm across feeds.

    **Defense.** **Encode output** for its exact context (HTML, attribute, JS); **sanitize input**; add a **Content-Security-Policy**; set session cookies **HttpOnly** so stolen JavaScript can't read them.

### 🖥️ OS command injection

*OWASP A03 · input the app runs as a command, on the server.*

??? danger "Walk the attack — and the fix"
    ![Command injection on PhotoApp: a filename carrying a shell command opens a reverse shell when the server builds a thumbnail](../img/cmdinjection-photoapp.png)

    **The move.** To make a thumbnail, the server runs a real OS command and pastes your **filename** into it. Name your upload `photo.jpg; <command>` and the `;` **ends the resize and starts your command** — the shell runs both, opening a shell back to you. Now you're on the server.

    **Real world.** *ImageMagick "ImageTragick" (2016, CVE-2016-3714)* — a crafted uploaded image ran commands on any site that processed it.

    **Defense.** Don't build shell commands from input — **call the library API directly** (resize with an image library, not a shell). If you must run a command, pass arguments as an **array with no shell**; **allowlist** the input; run the service as a **least-privileged** account.

### 🔢 IDOR / broken access control

*OWASP A01 · the app does what it was coded to do — for the wrong person.*

??? danger "Walk the attack — and the fix"
    ![IDOR on PhotoApp: changing the id in the URL returns another user's private photo](../img/idor-photoapp.png)

    **The move.** The app checks you're **logged in**, but never that the photo is **yours**. Mary opens hers at `?id=123`, then just changes the number to `124` — David's private photo. Walk the ids and you pull **everyone's**. No injection; the bug is the **missing ownership check**.

    **Real world.** *First American (2019)* — ~885 million mortgage files exposed by changing the number in a document URL.

    **Defense.** Check **ownership on every object**, server-side ("is this record *this user's*?"); **deny by default**; **centralize** the check so no endpoint forgets it; use **unguessable IDs** as defense-in-depth, not as the control.

??? info "📎 In industry terms — OWASP · ATT&CK"

    - **OWASP Top 10:** A01 Broken Access Control (IDOR) · A03 Injection (XSS, command, and next week's SQLi) · A05 Security Misconfiguration
    - **MITRE ATT&CK:** [T1190 Exploit Public-Facing App](https://attack.mitre.org/techniques/T1190/) · [T1059 Command &amp; Scripting](https://attack.mitre.org/techniques/T1059/) · [T1505.003 Web Shell](https://attack.mitre.org/techniques/T1505/003/)
    - A web flaw can span the attack loop — initial access, a web shell for persistence, data theft — so it doesn't sit in a single CEH phase.

    New to these frameworks? The full map is in **[Week 1 · frameworks](ethics-law-methodology.html)**.

Two of these injections — XSS and command injection — are shown here. The database gets its own treatment next: **[Web Attacks II](web-attacks-sqli-session.html)** covers **SQL injection** and stealing the **session**.

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — the industry list of critical web risks
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — how to test for each
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — free, hands-on labs for XSS, access control, command injection
- [MITRE ATT&CK](https://attack.mitre.org/) — T1190, T1059, T1505.003
- [ImageTragick (CVE-2016-3714)](https://imagetragick.com/) — the image-upload command-injection case
