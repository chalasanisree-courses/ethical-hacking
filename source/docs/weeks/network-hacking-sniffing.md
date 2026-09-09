[← Course home](../index.html) · Ethical Hacking

# Week 4 · Network Hacking & Sniffing

<span class="kc-badge">🧭 Kill chain · Phases 2–3 — Sniffing & Evasion</span>

<div class="attck-strip" markdown="1">

<span class="lbl">ATT&CK</span> <a href="https://attack.mitre.org/techniques/T1040/" class="attck-tag" target="_blank">T1040 Network Sniffing</a> <a href="https://attack.mitre.org/techniques/T1557/" class="attck-tag" target="_blank">T1557 Adversary-in-the-Middle</a> <a href="https://attack.mitre.org/tactics/TA0005/" class="attck-tag" target="_blank">TA0005 Defense Evasion</a>

</div>

<div class="admonition abstract" markdown="1">

What this page covers

- How traffic is captured off the wire — and why switches don't stop it
- ARP spoofing and man-in-the-middle
- IDS, firewalls, and honeypots — and how attackers evade them

</div>

## 1. Sniffing — reading the wire

A **sniffer** (Wireshark, tcpdump) captures packets as they cross the network. On old hub-based networks every packet reached every port, so sniffing was trivial. Modern **switches** send each frame only to its destination port — so to see traffic that isn't yours, you have to actively insert yourself into the path. That's the difference between **passive** sniffing (just listening to what reaches you) and **active** sniffing (manipulating the network so more traffic reaches you).

The payoff is enormous: any protocol that sends data in **cleartext** — HTTP, FTP, Telnet, unencrypted SMTP, old database connections — leaks its credentials and content directly to anyone on the path. This single fact is the reason the entire web moved to HTTPS.

## 2. Man-in-the-middle via ARP spoofing

On a local network, hosts find each other by MAC address using **ARP**, a trusting protocol with no authentication. **ARP spoofing** abuses that: the attacker sends forged ARP replies telling the victim "*I* am the gateway" and telling the gateway "*I* am the victim." Now all of the victim's traffic flows *through* the attacker — a **man-in-the-middle** position from which they can read, capture credentials, or modify traffic in transit.

## 3. Network defenses & evasion

Click each to expand.

🛡️ IDS / IPS

Intrusion detection/prevention systems (Snort, Suricata) inspect traffic for known-bad **signatures** and statistical **anomalies**. Attackers evade them with encryption, packet **fragmentation**, timing changes, and by hiding inside protocols the IDS doesn't fully parse.

🧱 Firewalls

Firewalls enforce which connections are allowed. Attackers evade them by **tunneling** — smuggling their traffic inside an allowed protocol (data exfiltration over HTTPS or DNS, which almost every firewall permits outbound).

🍯 Honeypots

Decoy systems designed to be attacked, so defenders can study intruders and generate high-confidence alerts. For the attacker, an unexpectedly easy target that logs everything is a red flag to recognize and avoid.

## 4. Evasion in one line

The theme of this week's offensive side is that **defenses inspect what they can see**. Encrypt it, fragment it, or tunnel it inside allowed traffic, and much of the inspection stops working — which is exactly why exfiltrating data over an encrypted channel is so hard to catch.

## Defender's view

<div class="admonition defender" markdown="1">

How this looks from the SOC seat

Passive sniffing produces **no traffic at all** — it's undetectable on the wire. What *is* detectable is the **ARP poisoning** that enables active MITM: sudden changes to ARP tables, a MAC address suddenly claiming to be the gateway, or duplicate-IP warnings. Tunneled exfiltration shows up as anomalies — oddly large or oddly regular DNS/HTTPS flows to an unfamiliar host.

**Best control:** **encrypt everything in transit** so captured traffic is useless; enable **Dynamic ARP Inspection** and port security on switches to block spoofing; and **segment** sensitive networks so a foothold in one place can't sniff everything.

</div>

<div class="admonition note" markdown="1">

Real-world context — Firesheep

In 2010 a developer released **Firesheep**, a one-click Firefox extension that sniffed unencrypted session cookies on open Wi-Fi and let anyone instantly log in as other people on Facebook, Twitter, and more. It wasn't new — it just made cleartext sniffing *trivially* visible to the public. The backlash is a big reason the entire web shifted to **HTTPS-everywhere**. It's the perfect illustration of why "the network is an attack surface."

</div>

## References

- **Wireshark User's Guide.** [wireshark.org/docs](https://www.wireshark.org/docs/wsug_html_chunked/)
- **MITRE ATT&CK — Network Sniffing (T1040)** · **Defense Evasion (TA0005).** [T1040](https://attack.mitre.org/techniques/T1040/) · [TA0005](https://attack.mitre.org/tactics/TA0005/)
