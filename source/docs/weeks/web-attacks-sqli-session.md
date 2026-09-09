[← Course home](../index.html) · Ethical Hacking

# Week 9 · Web Attacks II — SQL Injection & Session Hijacking

<span class="kc-badge">🧭 Kill chain · Phase 3 — Gaining Access (web)</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1190/" class="attck-tag" target="_blank">T1190 Exploit Public-Facing App</a> <a href="https://attack.mitre.org/techniques/T1185/" class="attck-tag" target="_blank">T1185 Browser Session Hijacking</a> <a href="https://attack.mitre.org/techniques/T1539/" class="attck-tag" target="_blank">T1539 Steal Web Session Cookie</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- How SQL injection works and why it's still so damaging
- In-band, blind, and error-based SQLi
- **Session hijacking** — stealing or forging a session to become the user
- Defenses: parameterized queries, secure sessions, least privilege

</div>

## 1. SQL injection mechanics

Untrusted input concatenated into a database query lets an attacker change the query's *meaning* — the classic `' OR 1=1 --` that turns a login check into "always true." From there: dump entire tables, bypass authentication, read/write files, and on some databases reach OS command execution.

## 2. SQLi variants

Click each to expand.

🔗 In-band (union / error-based)

Results come straight back in the response — appended via `UNION SELECT`, or leaked through verbose database error messages.

🕶️ Blind (boolean / time-based)

No visible output, so you infer data one bit at a time — `AND 1=1` vs `AND 1=2` for boolean, or `SLEEP(5)` to read answers from response timing.

🤖 Automation (sqlmap)

`sqlmap` automates detection and extraction across all these variants — powerful as an attacker, and a distinctive traffic pattern for defenders to recognize.

## 3. Session hijacking

A logged-in user is tracked by a **session token** (usually a cookie). Steal or forge that token and you *are* that user — no password needed. This is conceptually close to the human/identity attacks in Module 7 ("become the user"), but here the mechanism is technical:

- **Token theft** — via XSS (Week 8) reading `document.cookie`, or sniffing an unencrypted session (Week 4).
- **Session fixation** — force a known session ID on the victim, then ride it after they log in.
- **Man-in-the-middle** — intercept the token in transit.

## 4. Defense

- **SQLi:** parameterized queries / prepared statements eliminate the class entirely; add input validation, least-privilege DB accounts, and a WAF as depth.
- **Session hijacking:** `Secure` + `HttpOnly` + `SameSite` cookies, TLS everywhere, session regeneration on login, and short idle timeouts.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

SQLi shows as **suspicious query strings** in web logs (quotes, `UNION`, `--`, `SLEEP(`, encoded variants) and **database error spikes** from the app account. Session hijacking shows as **one session used from two IPs/geographies or two devices at once**, or a session that suddenly changes user-agent — exactly the kind of anomaly UEBA is built to catch.

**Best control:** parameterized queries kill SQLi at the source; for sessions, bind tokens to context and alert on impossible-travel / concurrent-session anomalies.

</div>

<div class="admonition note" markdown="1">

Real-world context

The 2008 **Heartland Payment Systems** breach — 130M+ card numbers — began with a **SQL injection** flaw in a web form that led to the payment network. Fifteen years later SQLi is still a top-cause web vulnerability, which is exactly why it gets its own week.

</div>

## References

- **OWASP — SQL Injection** · **SQL Injection Prevention Cheat Sheet.** [Attack](https://owasp.org/www-community/attacks/SQL_Injection) · [Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- **OWASP — Session Management Cheat Sheet.** [cheatsheetseries.owasp.org](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
