---
hide:
  - navigation
---

[← Course home](../index.html) · Ethical Hacking

# Week 4 · Network Hacking & Sniffing

<span class="kc-badge">🧭 Kill chain · Phase 3 — Gaining Access (the quiet way)</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1040/" class="attck-tag" target="_blank">T1040 Network Sniffing</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 Adversary-in-the-Middle</a> <a href="https://attack.mitre.org/techniques/T1557/002/" class="attck-tag" target="_blank">T1557.002 ARP Cache Poisoning</a> <a href="https://attack.mitre.org/tactics/TA0005/" class="attck-tag" target="_blank">TA0005 Defense Evasion</a>

</div>

The <span style="color:#c0392b;font-weight:700;">red line</span> down the left marks the **attacker's** view (most of this page). The <span style="color:#0e6b82;font-weight:700;">blue line</span> near the end marks the **defender's** view.

<div class="rt-rail" markdown="1">

<span class="rail-label red">🔴 RED TEAM · attacker's view</span>

<div class="admonition abstract" markdown="1">

What you'll learn

- Why *gaining access* has **two routes** — find the key vs. kick the door — and why this week is the quiet one
- How **cleartext** traffic hands over credentials to anyone on the path — the outside way in
- Why, once you're **inside** a flat network, listening is so powerful — and how **switches** change the game
- **ARP spoofing** — how an attacker forces a switched network to route a victim's traffic through them (man-in-the-middle)
- The three network defenses — **IDS/IPS, firewalls, honeypots** — and how attackers slip past each
- What the **blue team** can (and can't) see, and why encryption is the great equalizer

</div>

<div class="admonition warning" markdown="1">

⚖️ The authorization line — read this first

Last week's recon was passive and legal; scanning was active and needed authorization. **Sniffing is more subtle.** Even if you send *not a single packet* and "just listen," capturing traffic that isn't yours can be **wiretapping** — a crime. Reading public records about a house is fine; tapping the phone line to listen in is not, even though you're "only listening." And **ARP spoofing**, later on this page, is fully active — you inject forged packets. So everything here runs only on **your own lab, your own VMs, your own traffic** — never a network you don't own or aren't authorized to test.

</div>

## 1. Two ways into the network

Recon built a map; scanning found the unlocked doors and the weak locks. **Gaining access** is actually walking in — and there are two ways to do it.

| | 🔑 Find the key *(this week)* | 🚪 Kick the door *(Week 6)* |
|---|---|---|
| **Method** | Sniff the network; grab credentials off the wire | Exploit a weak service and force entry |
| **Noise** | Quiet — often nothing is "broken" | Loud — crashes, alarms, logs |
| **You walk in with** | A stolen key | A broken lock |

A real attacker tries to **find a key before kicking any doors** — quiet before loud. This week is the quiet way: listen, and let the network hand you the credentials.

## 2. The easiest key — cleartext on the wire

Any protocol that sends its data **unencrypted** — HTTP, FTP, Telnet, old SMTP, legacy database links — hands its username, password, and content to anyone on the path. Picture the attacker on the same coffee-shop Wi-Fi as you: you log into a plain **HTTP** site, and your password crosses the wire in plain text. No exploit, nothing broken — they read the key off the wire and log in as you. **This single fact is the reason the entire web moved to HTTPS.**

<div class="admonition example" markdown="1">

Try it yourself — see a password in the clear (authorized target)

The site `http://demo.testfire.net` is a deliberately vulnerable **practice** app (AltoroMutual, a fake bank) put online for exactly this. Log in with `DemoUser` / `DemoPassword123` over plain HTTP, capture with **Wireshark**, then **Follow → HTTP Stream** on the `POST /doLogin` — the `uid` and `passw` are right there in the request body. Then follow an **HTTPS** stream and it's just opaque bytes. That contrast *is* the lesson: cleartext is free keys; encryption is a wall.

</div>

<div class="admonition note" markdown="1">

The honest caveat — why this alone isn't enough

From the pure outside, almost everything is **HTTPS** today, so you usually can't just grab a login off the open internet — forcing a login from outside is **brute force**, which we save for Week 6. The scary scenario is the attacker who's already **inside** the network. So let's go there.

</div>

## 3. Inside the perimeter — the network goes soft

How does an attacker get *inside*? The perimeter only has to fail **once**: a phishing click that turns an employee's laptop into a foothold, a rogue device plugged into a jack, stolen VPN credentials, guest Wi-Fi, or an exposed service (that's the Week 6 door). Once in, most enterprises are built **castle-and-moat** — a hard outer shell but a soft inside — so the attacker has fairly **free movement** across the internal network. Nobody checks a badge at every hallway.

<figure>
<img src="../img/enterprise-architecture.png" width="720" alt="Enterprise network drawn as a castle: the internet is the moat, the firewall and network are the outer walls, and the data center is the keep." /><br />
<figcaption>The castle from Week 1: the internet is the moat, the firewall and perimeter are the outer walls, and the data center is the keep. The attacker crosses the wall once — and inside, the soft interior lets them roam and <strong>listen</strong>.</figcaption>
</figure>

So the attacker **listens** — that's sniffing. A **sniffer** (Wireshark, tcpdump) captures packets crossing the network. Whether that's easy depends entirely on the **network gear**:

| | 🕳️ Passive sniffing | 🎯 Active sniffing |
|---|---|---|
| **Gear** | Old **hubs** — broadcast every packet to every port | Modern **switches** — send each frame only to its port |
| **What you do** | Just plug in and listen | Manipulate the network so traffic comes to you |
| **Noise** | **Silent** — generates no traffic, invisible on the wire | Injects packets — leaves fingerprints |

On a hub, sniffing is free. On a switch — which is what you'll actually find — you can't just listen; you have to **actively insert yourself** into the path. And the classic way to do that is ARP spoofing.

## 4. ARP spoofing → man-in-the-middle

On a local network, machines find each other by **MAC address** using **ARP** (Address Resolution Protocol) — a trusting protocol with **no authentication**. Whoever answers "who has this IP?" first is believed and cached. ARP spoofing abuses exactly that: the attacker sends **forged replies** telling the victim *"I'm the gateway"* and telling the gateway *"I'm the victim."* Now every packet flows **through** the attacker — a man-in-the-middle who can read it, capture credentials, or change it in transit.

<figure>
<img src="../img/sniff-mitm.svg" width="820" alt="Before ARP poisoning the victim's traffic goes straight to the real gateway; after, forged ARP replies route every packet through the attacker, who relays it on to the gateway." /><br />
<figcaption>Before: the victim's traffic goes straight to the real gateway. After forged ARP replies, every packet detours <strong>through the attacker</strong> — who quietly relays it on, so nothing looks broken.</figcaption>
</figure>

### Walk the attack, step by step

**Click each step** to see what happens on the wire — with the exact packets you'd point to in a Wireshark capture.

<div class="scan-strip" markdown="1">

<div id="scan-node-1" class="scan-phase" aria-label="Learn the next hop" onclick="scanShow(1)" role="button" style="background:#0E6B82" tabindex="0" markdown="1">

<span class="num">STEP 1</span>Learn the next hop<small>who is the gateway</small>

</div>

<div id="scan-node-2" class="scan-phase" aria-label="Normal path" onclick="scanShow(2)" role="button" style="background:#157f8f" tabindex="0" markdown="1">

<span class="num">STEP 2</span>Normal path<small>traffic → real gateway</small>

</div>

<div id="scan-node-3" class="scan-phase" aria-label="Poison the cache" onclick="scanShow(3)" role="button" style="background:#B45309" tabindex="0" markdown="1">

<span class="num">STEP 3</span>Poison the cache<small>forged ARP replies</small>

</div>

<div id="scan-node-4" class="scan-phase" aria-label="Traffic reroutes" onclick="scanShow(4)" role="button" style="background:#c0522b" tabindex="0" markdown="1">

<span class="num">STEP 4</span>Traffic reroutes<small>now via the attacker</small>

</div>

<div id="scan-node-5" class="scan-phase" aria-label="Read and relay" onclick="scanShow(5)" role="button" style="background:#C0392B" tabindex="0" markdown="1">

<span class="num">STEP 5</span>Read &amp; relay<small>the man-in-the-middle</small>

</div>

</div>

↑ **Click a step** — each shows what happens and the packets to look for

<div id="scan-panel-1" class="scan-panel" markdown="1">

#### 📇 Step 1 — learn the next hop's MAC

The victim (`192.168.1.165`) wants to reach `8.8.8.8` — which is **out on the internet, not on the LAN** — so the next hop is the **gateway** `192.168.1.254`. To send even one frame it needs the gateway's **MAC**, so it broadcasts an ARP request: *"Who has 192.168.1.254?"* The gateway replies with its real MAC, and the victim **caches** it. *(If the target were local, it would ARP for that host directly.)*

🔎 In a capture: a broadcast **who-has** request, then a unicast **is-at** reply — the reply nobody authenticates.

</div>

<div id="scan-panel-2" class="scan-panel" markdown="1">

#### ➡️ Step 2 — the normal path

With the gateway's real MAC cached, the victim's traffic (say a ping to `8.8.8.8`) leaves with the **destination MAC = the real gateway**. Everything flows correctly out to the internet. This is the "before" picture — worth showing first so the change stands out.

🔎 In a capture: the outbound packet's **Ethernet destination** is the gateway's real MAC (`ec:c3:…:c1`).

</div>

<div id="scan-panel-3" class="scan-panel" markdown="1">

#### ☠️ Step 3 — poison the cache

The attacker (`192.168.1.199`, MAC `de:ad:be:ef:00:99`) sends **unsolicited** ARP replies — ARP has no rule that says *"only accept a reply if I asked,"* so the victim's cache happily **overwrites** the good entry: `192.168.1.254 → de:ad:be:ef:00:99`. A matching lie goes to the gateway (*"192.168.1.165 is at de:ad…"*). The attacker repeats every couple of seconds so the real gateway's legit replies never win the entry back. *(Tools: Ettercap, bettercap, arpspoof.)*

🚩 In a capture: this is the tell — Wireshark raises **"Duplicate IP address configured"** (one IP, two MACs).

</div>

<div id="scan-panel-4" class="scan-panel" markdown="1">

#### 🔀 Step 4 — the traffic reroutes

Same lookup, poisoned answer. The victim's next packet to `8.8.8.8` now leaves with **destination MAC = the attacker**. The IP addresses are unchanged (`192.168.1.165 → 8.8.8.8`) — only the **MAC** hopped. That's why a man-in-the-middle is nearly invisible if you only read Wireshark's default Source/Destination (IP) columns.

🔎 In a capture: the **Ethernet destination** on the identical packet is now the attacker's MAC — add `eth.src` / `eth.dst` columns to see it.

</div>

<div id="scan-panel-5" class="scan-panel" markdown="1">

#### 🕳️ Step 5 — read &amp; relay (the MITM)

The attacker receives the victim's traffic, reads it (grabbing any cleartext credentials or cookies), and **forwards** it on to the real gateway — keeping the victim's connection alive so nothing looks broken. He doesn't rewrite the IP source, because if he did the reply would come back to *him* and tip the victim off. He's a **silent relay**, sitting in the middle of every conversation.

🔎 In a capture: the relayed packet keeps the **victim's IP** as source but rides the **attacker's MAC** — proof of the man-in-the-middle.

</div>

## 5. Network defenses & evasion

The network isn't defenceless — three systems watch it, and the attacker's job is knowing how each is slipped past.

<div class="admonition info" markdown="1">

🛡️ IDS / IPS — signature &amp; anomaly detection

Intrusion detection/prevention systems (**Snort**, **Suricata**) match traffic against known-bad **signatures** and statistical **anomalies**. *Evaded by:* encryption, packet **fragmentation**, timing changes, and hiding inside protocols the sensor doesn't fully parse.

</div>

<div class="admonition info" markdown="1">

🧱 Firewalls — connection control

Firewalls decide which connections are allowed in and out (you saw them in Week 2 as `filtered` ports). *Evaded by:* **tunneling** — smuggling traffic inside something already allowed, like **HTTPS** or **DNS**, which almost every firewall lets out.

</div>

<div class="admonition info" markdown="1">

🍯 Honeypots — decoys

Fake systems planted to be attacked, so defenders get high-confidence alerts. *Evaded by:* recognising the tell — a target that's **suspiciously easy** and seems to log everything is a trap; a careful attacker backs away.

</div>

> **Evasion in one line:** defenses can only inspect what they can **see**. Encrypt it, fragment it, or tunnel it inside allowed traffic, and much of the inspection stops working — which is exactly why exfiltrating data over an encrypted channel is so hard to catch.

## 6. It's real

🐑 **Firesheep (2010)** — a one-click Firefox add-on that sniffed **unencrypted session cookies** on open Wi-Fi and let anyone log in as other people on Facebook, Twitter, and more. It wasn't new tech; it just made cleartext sniffing so public it embarrassed the industry into **HTTPS-everywhere**.

📢 **Superfish (2015)** — Lenovo shipped laptops with adware that installed its **own root certificate** to break HTTPS and inject ads — a factory-installed man-in-the-middle. Worse, it was so poorly secured that *third parties* could ride it to intercept users' banking traffic. Millions in fines followed.

🔏 **DigiNotar (2011)** — attackers breached a **certificate authority**, forged Google certificates, and used them to man-in-the-middle **Gmail for ~300,000 people in Iran**. Listening, and impersonating — the network isn't just something you cross; it's a place you can sit and intercept.

</div>

------------------------------------------------------------------------

<div class="bt-rail" markdown="1">

<span class="rail-label blue">🔵 BLUE TEAM · defender's view</span>

## Blue Team — you can't hear a listener

<div class="admonition defender" markdown="1">

What the SOC can and can't see

Here's the hard part: **passive sniffing is invisible** — a listener generates no traffic, so there's nothing on the wire to catch. But the **active** moves leave fingerprints:

- **ARP poisoning** shows up as a MAC suddenly claiming to be the gateway, **duplicate-IP warnings**, and ARP tables changing.
- **Tunneled exfiltration** shows up as anomalies — oddly large or oddly regular DNS/HTTPS flows to an unfamiliar host.

**So the defense is protection + detection:**

- **Encrypt everything in transit** — the great equalizer. If captured traffic is encrypted, a listener gets useless bytes. *(This is the wall from the demo.)*
- **Dynamic ARP Inspection + port security** on switches — block the spoofing that enables active MITM.
- **Segment the network** — so a foothold in one corner (remember the soft castle interior, and the Target breach) can't sniff everything.
- **Watch for the fingerprints** — sudden ARP-table changes and unexplained outbound volume are your exfiltration alarms.

You can't hear a listener — so you make sure whatever they hear is **worthless**.

</div>

</div>

------------------------------------------------------------------------

<div class="admonition info" markdown="1">

Where this maps in MITRE ATT&CK

**MITRE ATT&CK** is a free public catalog of real attacker techniques, each with an ID. This week maps to **T1040** (Network Sniffing), **T1557** (Adversary-in-the-Middle) and its sub-technique **T1557.002** (ARP Cache Poisoning), and the evasion side to **TA0005** (Defense Evasion). Browse it at [attack.mitre.org](https://attack.mitre.org/techniques/T1557/002/).

</div>

<div class="admonition tip" markdown="1">

Try it yourself — only on your own lab and your own traffic

1. **See cleartext:** capture your own login to `http://demo.testfire.net` (`DemoUser` / `DemoPassword123`), then **Follow → HTTP Stream** the `POST /doLogin`. Compare against an HTTPS stream — opaque.
2. **Read ARP:** open any capture, filter `arp`, and find a **who-has** request paired with its **is-at** reply. Ask: *who verified that reply?* (Nobody — that's the hole.)
3. **Spot poisoning:** in a capture that contains ARP spoofing, `Analyze → Expert Information` flags **"Duplicate IP address configured."** Add **Hardware Source/Dest Address** (`eth.src` / `eth.dst`) columns and watch the same IP hop onto a new MAC.

**Next week →** we take the same idea off the wire and into the air — **Wireless Hacking**, where the keys are left out over the radio. Then in Week 6 we finally *kick the door in*.

</div>

<div class="admonition quote" markdown="1">

Remember

Network hacking is the **quiet** way in: read credentials off the wire, or sit in the middle of the traffic. **Cleartext** hands you keys; a **switch** forces you to ARP-spoof your way into the path; **passive** listening is silent while the **active** moves get you caught — and **encryption** turns all of it into useless bytes.

</div>

------------------------------------------------------------------------

## References

- **Wireshark User's Guide.** [wireshark.org/docs](https://www.wireshark.org/docs/wsug_html_chunked/)
- **MITRE ATT&CK — Adversary-in-the-Middle (T1557) · ARP Cache Poisoning (T1557.002) · Network Sniffing (T1040).** [attack.mitre.org](https://attack.mitre.org/techniques/T1557/)
- **NIST SP 800-115** — Technical Guide to Information Security Testing. [Free PDF](https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-115.pdf)
- **Practice safely:** [demo.testfire.net](http://demo.testfire.net) — an intentionally vulnerable practice application.
