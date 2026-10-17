[← Course home](../index.html) · Ethical Hacking

# Week 8 · System Attacks, Malware & Persistence

<style>
.wk8{--w-navy:#26324f;--w-ink:#1f2836;--w-muted:#5b6880;--w-surface:#f6f8fb;--w-card:#ffffff;--w-line:#e3e8f0;--w-teal:#0a7589;--w-tealink:#064a59;--w-red:#c1392b;--w-amber:#a9700f;--w-teal-t:#e3f1f4;--w-red-t:#f8e7e4;--w-amber-t:#f6edda;--w-navy-t:#eaedf4;
  font-family:var(--md-text-font,"Lato"),Helvetica,Arial,sans-serif;color:var(--w-ink);}
[data-md-color-scheme="slate"] .wk8{--w-navy:#9fb0d0;--w-ink:#e7edf6;--w-muted:#9fadc3;--w-surface:#1a2338;--w-card:#1f2a42;--w-line:#33405c;--w-teal:#3bb6ce;--w-tealink:#6fcde0;--w-red:#e4786c;--w-amber:#d8a646;--w-teal-t:#123038;--w-red-t:#331f1c;--w-amber-t:#322a16;--w-navy-t:#1b2740;}
.wk8 *{box-sizing:border-box}
.wk8 .lead{font-size:1.05rem;color:var(--w-muted);max-width:60ch;margin:.2rem 0 1.2rem}
.wk8 .eyebrow{font-size:.72rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--w-tealink);margin:.1rem 0 .15rem}
.wk8 .atk{font-size:.78rem;color:var(--w-muted);margin:0 0 .5rem}
.wk8 .atk a{color:var(--w-tealink);text-decoration:none}
.wk8 .atk a:hover{text-decoration:underline}
.wk8 h2.w{font-size:1.4rem;margin:2.4rem 0 .3rem;color:var(--w-ink);scroll-margin-top:70px;display:flex;align-items:baseline;gap:.5rem}
.wk8 h2.w .num{font-size:.7rem;font-weight:700;letter-spacing:.06em;color:#fff;background:var(--w-navy);border-radius:999px;padding:.15rem .55rem}
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
/* loop map */
.wk8 .loop{border:1px solid var(--w-line);border-radius:12px;background:var(--w-surface);padding:14px 14px 12px;margin:0 0 1rem}
.wk8 .loop .cap{font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:var(--w-muted);font-weight:700;margin-bottom:8px}
.wk8 .stages{display:flex;gap:6px}
.wk8 .stage{flex:1 1 0;min-width:0;border:1px solid var(--w-line);background:var(--w-card);border-radius:8px;padding:9px 6px;text-align:center;cursor:pointer;color:var(--w-ink);font:inherit;transition:border-color .15s,transform .1s}
.wk8 .stage:hover{border-color:var(--w-teal);transform:translateY(-1px)}
.wk8 .stage .sn{display:block;font-size:.55rem;letter-spacing:.07em;text-transform:uppercase;color:var(--w-muted);font-weight:700}
.wk8 .stage .st{font-size:.84rem;font-weight:700;line-height:1.1;margin-top:1px}
.wk8 .band{display:flex;gap:6px;margin-top:6px}
.wk8 .band .stealth{flex:1;background:var(--w-teal);color:#fff;border:none;border-radius:7px;padding:7px;font-size:.72rem;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:.02em}
.wk8 .band .exit{background:var(--w-amber-t);color:var(--w-amber);border:1px solid var(--w-amber);border-radius:7px;padding:7px 11px;font-size:.72rem;font-weight:700;cursor:pointer;font-family:inherit;white-space:nowrap}
/* cards */
.wk8 .cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:1rem 0}
.wk8 .card{border:1px solid var(--w-line);background:var(--w-card);border-radius:11px;padding:13px 15px;min-width:0}
.wk8 .card .mini{font-size:.6rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--w-tealink);display:block;margin-bottom:3px}
.wk8 .card h4{margin:.1rem 0 .3rem;font-size:1rem}
.wk8 .card p{margin:.2rem 0;font-size:.9rem;color:var(--w-ink)}
.wk8 .card.red{background:var(--w-red-t);border-color:var(--w-red)}
.wk8 .card.red .mini{color:var(--w-red)}
.wk8 .card.def{background:var(--w-teal-t);border-color:var(--w-teal)}
.wk8 .card.def .mini{color:var(--w-tealink)}
.wk8 .card.def .mini::before{content:"🛡 "}
/* 2x2 */
.wk8 .grid2{display:grid;grid-template-columns:auto 1fr 1fr;gap:6px;margin:1rem 0;font-size:.86rem}
.wk8 .grid2 .cell{border:1px solid var(--w-line);border-radius:8px;padding:9px 11px;background:var(--w-card)}
.wk8 .grid2 .hd{background:var(--w-surface);font-weight:700;text-align:center;color:var(--w-muted);font-size:.72rem;text-transform:uppercase;letter-spacing:.04em}
.wk8 .grid2 .rh{background:var(--w-surface);font-weight:700;display:flex;align-items:center}
.wk8 .grid2 .land{border-color:var(--w-amber);background:var(--w-amber-t)}
.wk8 .grid2 .goal{border-color:var(--w-red);background:var(--w-red-t)}
.wk8 .grid2 .tag{display:block;font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-top:3px}
.wk8 .grid2 .land .tag{color:var(--w-amber)}.wk8 .grid2 .goal .tag{color:var(--w-red)}
/* terminal */
.wk8 .term{background:#16212b;border-radius:11px;padding:15px 17px;font-family:var(--md-code-font,"Roboto Mono"),monospace;font-size:.82rem;line-height:1.6;color:#e9eef3;overflow-x:auto}
.wk8 .term .ln{white-space:pre;display:block}
.wk8 .term .c{color:#6f90b2}.wk8 .term .o{color:#e9eef3}.wk8 .term .nt{color:#c9a46a;font-style:italic}.wk8 .term .hl{color:#e2b97f;font-weight:700}
.wk8 .term .pend{opacity:0;max-height:0;transition:opacity .3s}
.wk8 .term .pend.show{opacity:1;max-height:3rem}
.wk8 .trow{display:flex;gap:10px;align-items:center;margin:.3rem 0 1rem}
.wk8 .runb{border:1px solid var(--w-teal);background:var(--w-teal);color:#fff;border-radius:999px;padding:7px 15px;font:inherit;font-weight:700;font-size:.82rem;cursor:pointer}
.wk8 .runb[disabled]{opacity:.55;cursor:default}
.wk8 .thint{font-size:.78rem;color:var(--w-muted)}
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
@media(max-width:600px){.wk8 .cards{grid-template-columns:1fr}.wk8 .stage .sn{display:none}.wk8 .grid2{font-size:.78rem}}
</style>

<div class="wk8" markdown="0">
<p class="eyebrow">🧭 Owning the Machine · maintaining access, then covering tracks</p>
<p class="atk">MITRE ATT&amp;CK · <a href="https://attack.mitre.org/techniques/T1190/" target="_blank" rel="noopener">T1190</a> · <a href="https://attack.mitre.org/techniques/T1068/" target="_blank" rel="noopener">T1068</a> · <a href="https://attack.mitre.org/techniques/T1003/" target="_blank" rel="noopener">T1003</a> · <a href="https://attack.mitre.org/techniques/T1071/" target="_blank" rel="noopener">T1071</a> · <a href="https://attack.mitre.org/techniques/T1070/" target="_blank" rel="noopener">T1070</a></p>
<p class="lead">We're already through the perimeter, standing on one machine. This week is the <b>routine you run on every host</b> — and how a defender meets you at each step. One running example: ShellShock.</p>
<div class="ceh" role="img" aria-label="CEH life cycle: phases 1 to 3 done, phase 4 Maintaining Access and phase 5 Covering Tracks are this week">
<div class="ph done"><span class="n">Phase 1</span><div class="t">Reconnaissance</div></div>
<div class="ph done"><span class="n">Phase 2</span><div class="t">Scanning</div></div>
<div class="ph done"><span class="n">Phase 3</span><div class="t">Gaining Access</div></div>
<div class="ph here"><span class="n">Phase 4</span><div class="t">Maintaining Access</div><span class="hr">You are here</span></div>
<div class="ph here"><span class="n">Phase 5</span><div class="t">Covering Tracks</div><span class="hr">You are here</span></div>
</div>
<div class="loop">
<span class="cap">The loop — click a stage to jump</span>
<div class="stages">
<button class="stage" data-go="s-getin"><span class="sn">Stage 1</span><span class="st">Get in</span></button>
<button class="stage" data-go="s-esc"><span class="sn">Stage 2</span><span class="st">Escalate</span></button>
<button class="stage" data-go="s-persist"><span class="sn">Stage 3</span><span class="st">Persist</span></button>
<button class="stage" data-go="s-creds"><span class="sn">Stage 4</span><span class="st">Steal creds</span></button>
<button class="stage" data-go="s-act"><span class="sn">Stage 5</span><span class="st">Act / pivot</span></button>
</div>
<div class="band">
<button class="stealth" data-go="s-stealth">STEALTH · hidden through every stage</button>
<button class="exit" data-go="s-tracks">Cover tracks ↪</button>
</div>
</div>
<figure>
<svg viewBox="0 0 640 150" role="img" aria-label="Land and expand: foothold, take full control, harvest secrets, move to the next host, then loop back">
<g font-size="12" text-anchor="middle">
<rect x="8" y="48" width="118" height="52" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="67" y="70" font-weight="700">🖥️ Foothold</text><text class="svg-m" x="67" y="88" font-size="10">low-priv user</text>
<rect x="166" y="48" width="118" height="52" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="225" y="70" font-weight="700">🔓 Own it</text><text class="svg-m" x="225" y="88" font-size="10">climb to root</text>
<rect x="324" y="48" width="118" height="52" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="383" y="70" font-weight="700">🔑 Harvest</text><text class="svg-m" x="383" y="88" font-size="10">creds &amp; keys</text>
<rect x="482" y="48" width="118" height="52" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="541" y="70" font-weight="700">🌐 Next host</text><text class="svg-m" x="541" y="88" font-size="10">log in, repeat</text>
<g class="teal-s" stroke-width="2" marker-end="url(#ar)">
<line x1="128" y1="74" x2="162" y2="74"></line><line x1="286" y1="74" x2="320" y2="74"></line><line x1="444" y1="74" x2="478" y2="74"></line>
</g>
<path d="M541 102 L541 128 L67 128 L67 104" fill="none" class="teal-s" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ar)"></path>
<text class="teal" x="304" y="124" font-size="11" font-weight="700">↻ run the whole loop again, on toward the data</text>
</g>
<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker></defs>
</svg>
<figcaption>Land on one host, take it fully, take its keys, move to the next — the firewall guards the edge, not traffic between inside hosts.</figcaption>
</figure>
<h2 class="w" id="s-getin"><span class="num">1</span> Get in — credentials · code · config</h2>
<p class="lead">Three ways onto a host — the <b>CCC</b> — the same three you'll reuse to climb.</p>
<div class="cards">
<div class="card"><span class="mini">🔑 Credentials</span><h4>Steal a key</h4><p>No exploit — just use a valid login. Steal a password, or phish a user into running your code as them. The quiet way.</p></div>
<div class="card"><span class="mini">🐛 Code</span><h4>Exploit a bug</h4><p>All software has bugs. <b>ShellShock</b> was a Bash bug — not a web-server bug. Dirty COW, PrintNightmare are others. You land at the privilege of what you broke.</p></div>
<div class="card"><span class="mini">⚙️ Config</span><h4>Abuse a setting</h4><p>Nothing broken — a setting left too loose. User error is everywhere, so often the easiest path.</p></div>
<div class="card red"><span class="mini">What you become</span><h4><code>www-data</code>, not root</h4><p>ShellShock lands you as the web server's <b>low-privilege service account</b>. Running code is <b>initial access</b> — climbing higher is a separate job.</p></div>
</div>
<h2 class="w" id="s-machine">The machine you're climbing</h2>
<figure>
<svg viewBox="0 0 540 250" role="img" aria-label="Three layers: applications on top ask the kernel through system calls; the kernel polices hardware access and checks identity on every file access; hardware at the bottom">
<g text-anchor="middle">
<rect x="70" y="14" width="400" height="48" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="270" y="36" font-weight="700" font-size="13">APPLICATIONS</text>
<text class="svg-m" x="270" y="52" font-size="10">browser · web server · Word — what you click on</text>
<rect x="70" y="100" width="400" height="56" rx="8" style="fill:var(--w-teal-t)" class="teal-s" stroke-width="1.8"></rect>
<text x="270" y="124" font-weight="700" font-size="13" style="fill:var(--w-tealink)">OPERATING SYSTEM · the kernel</text>
<text class="svg-m" x="270" y="142" font-size="10">the security guard — mediates hardware, checks identity on every access</text>
<rect x="70" y="194" width="400" height="44" rx="8" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="270" y="221" font-weight="700" font-size="13">HARDWARE · CPU · memory · disk · network</text>
<g class="svg-m" style="stroke:var(--w-muted)" stroke-width="1.6" marker-end="url(#ar2)" marker-start="url(#ar2b)">
<line x1="200" y1="64" x2="200" y2="98"></line><line x1="200" y1="158" x2="200" y2="192"></line>
</g>
<text class="svg-m" x="214" y="84" font-size="10" text-anchor="start" font-style="italic">system calls</text>
<text class="svg-m" x="340" y="84" font-size="10" text-anchor="start" font-style="italic">↑ ask permission, every time</text>
</g>
<defs>
<marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" style="fill:var(--w-muted)"></polygon></marker>
<marker id="ar2b" markerWidth="8" markerHeight="8" refX="1" refY="3" orient="auto"><polygon points="7,0 0,3 7,6" style="fill:var(--w-muted)"></polygon></marker>
</defs>
</svg>
<figcaption>Apps can't touch hardware directly — they ask the kernel. On every file access the kernel checks <i>who's asking</i>. Getting around that one check is the whole week. The hashes in <code>/etc/shadow</code> are root-only, so our <code>www-data</code> foothold is denied — and <b>root (uid 0) bypasses every check</b>, which is why it's the goal.</figcaption>
</figure>
<h2 class="w" id="s-identity">Every process runs as someone</h2>
<p class="lead">Boot starts <b>systemd</b> as root, which spawns everything else — each process tagged with an identity. Two axes: who it's for × how much power.</p>
<div class="grid2" role="img" aria-label="2x2 of identities: you land as a low-privilege service account, the goal is the high-privilege superuser root or SYSTEM">
<div class="cell hd"></div><div class="cell hd">Low privilege</div><div class="cell hd">High privilege</div>
<div class="cell rh">Human</div><div class="cell">ordinary user — <code>alice</code></div><div class="cell">human admin — a sudoer</div>
<div class="cell rh">Service</div><div class="cell land"><code>www-data</code>, <code>mysql</code><span class="tag">▲ you land here</span></div><div class="cell goal"><b>root / SYSTEM</b><span class="tag">● the goal</span></div>
</div>
<h2 class="w" id="s-esc"><span class="num">2</span> Escalate — climb to root</h2>
<p class="lead">A shell runs at the privilege of <b>whoever spawned it</b>. So escalation means getting something already privileged to run your code. The <b>config</b> route — two mistakes combine:</p>
<div class="trow"><button class="runb" id="runT" type="button">▶ Step through the exploit</button><span class="thint" id="hintT">An operator can sudo-run a root script that's also writable.</span></div>
<div class="term" id="term" role="img" aria-label="Terminal where a writable sudo script becomes a root shell">
<span class="ln"><span class="c">$ id</span></span>
<span class="ln"><span class="o">uid=1001(operator) groups=operator,<span class="hl">ops</span></span></span>
<span class="ln pend" data-s="1"><span class="c">$ sudo -l</span></span>
<span class="ln pend" data-s="1"><span class="o">  (root) NOPASSWD: /opt/backup.sh</span></span>
<span class="ln pend" data-s="1"><span class="nt">  mistake #1 → run this script as root</span></span>
<span class="ln pend" data-s="2"><span class="c">$ ls -l /opt/backup.sh</span></span>
<span class="ln pend" data-s="2"><span class="o">-rwxr<span class="hl">w</span>xr-x 1 root <span class="hl">ops</span>  /opt/backup.sh</span></span>
<span class="ln pend" data-s="2"><span class="nt">  mistake #2 → group 'ops' can write it, and we're in ops</span></span>
<span class="ln pend" data-s="3"><span class="c">$ echo 'bash -i' &gt;&gt; /opt/backup.sh</span></span>
<span class="ln pend" data-s="3"><span class="nt">  append one line: spawn a shell</span></span>
<span class="ln pend" data-s="4"><span class="c">$ sudo /opt/backup.sh</span></span>
<span class="ln pend" data-s="4"><span class="c"># whoami</span></span>
<span class="ln pend" data-s="4"><span class="o">root</span></span>
<span class="ln pend" data-s="4"><span class="nt">  sudo ran our edited script as root → root shell</span></span>
</div>
<p class="thint" style="margin:.2rem 0 0">Attackers don't guess — <b>LinPEAS / WinPEAS</b> scan the box and list every opening of all three kinds (the same checks a privesc module carries).</p>
<div class="card def" style="margin-top:1rem"><span class="mini">The defender's counter</span><h4>Least privilege</h4><p>Give each account only the power it needs — then a foothold or a found opening reaches almost nothing, and the climb stalls.</p></div>
<h2 class="w" id="s-persist"><span class="num">3</span> Persist — keep the position, and the RAT</h2>
<p class="lead">Your foothold is fragile: a reboot, a dropped link, or a <b>patch of the hole you came in through</b> locks you out. So leave a way back in, at your elevated level.</p>
<div class="cards">
<div class="card"><span class="mini">Your own way back</span><h4>Key to the door</h4><p>Create an admin/root account, or drop an SSH key in <code>authorized_keys</code> — log straight back in.</p></div>
<div class="card"><span class="mini">Hook into startup</span><h4>Relaunch on boot</h4><p>🐧 a cron job or systemd service · 🪟 a registry Run key, scheduled task, or service — comes up with the legit ones.</p></div>
</div>
<figure>
<svg viewBox="0 0 560 150" role="img" aria-label="A RAT inside the network beacons outbound through the firewall to the attacker's command and control server; inbound is blocked">
<g text-anchor="middle" font-size="12">
<rect x="14" y="40" width="150" height="70" rx="9" class="node-fill node-line" stroke-width="1.5"></rect>
<text class="svg-t" x="89" y="66" font-weight="700">🐀 RAT</text><text class="svg-m" x="89" y="84" font-size="10">on the victim</text><text class="svg-m" x="89" y="99" font-size="10">(inside network)</text>
<line x1="250" y1="24" x2="250" y2="126" style="stroke:var(--w-muted)" stroke-width="2" stroke-dasharray="4 4"></line>
<text class="svg-m" x="250" y="18" font-size="10">firewall</text>
<rect x="396" y="40" width="150" height="70" rx="9" style="fill:var(--w-red-t)" class="red" fill-opacity="1"></rect>
<rect x="396" y="40" width="150" height="70" rx="9" fill="none" style="stroke:var(--w-red)" stroke-width="1.5"></rect>
<text x="471" y="70" font-weight="700" style="fill:var(--w-red)">C2 server</text><text class="svg-m" x="471" y="88" font-size="10">attacker, outside</text>
<path d="M166 62 L394 62" fill="none" class="teal-s" stroke-width="2.2" marker-end="url(#ar3)"></path>
<text class="teal" x="280" y="54" font-size="10.5" font-weight="700">beacon — outbound looks normal ✓</text>
<path d="M394 92 L166 92" fill="none" style="stroke:var(--w-red)" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ar3r)"></path>
<text x="280" y="108" font-size="10.5" font-weight="700" style="fill:var(--w-red)">inbound — blocked &amp; watched ✗</text>
</g>
<defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker>
<marker id="ar3r" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" style="fill:var(--w-red)"></polygon></marker></defs>
</svg>
<figcaption>A <b>RAT</b> (Remote Access Trojan) bundles persistence + remote control + a C2 channel. Its tell is <b>beaconing</b> — it reaches <i>out</i>, because outbound traffic is trusted far more than inbound. In <b>SolarWinds (2020)</b> a poisoned update sat dormant ~2 weeks, then beaconed to its C2 quietly for months before anyone noticed — across thousands of networks.</figcaption>
</figure>
<div class="card def"><span class="mini">The defender's counter</span><h4>Patch first</h4><p>Patching closes the hole the exploit needs — the #1 control. It's <i>because</i> a patch can lock them out that attackers rush to persist. Defenders also hunt rogue Run keys/services and watch for beaconing.</p></div>
<h2 class="w" id="s-stealth">Staying hidden</h2>
<p class="lead">Stealth isn't a stage — it's a band under the whole loop. The host runs <b>endpoint protection (EPP/EDR)</b>, and each evasion beats one of its checks.</p>
<div class="cards">
<div class="card"><span class="mini">Beats the on-disk scan</span><h4>📦 Packing</h4><p>Scramble the file so signature AV matches nothing on its known-bad list. Same malware, new fingerprint.</p></div>
<div class="card"><span class="mini">Beats the process watch</span><h4>🧬 Process hollowing</h4><p>Gut a trusted process like <code>svchost</code> and run your code inside it — looks legitimate.</p></div>
<div class="card"><span class="mini">The arms race</span><h4>🛰️ EDR watches behavior</h4><p>Modern EDR ignores fingerprints and asks: is this process acting wrong? So malware stays under the radar.</p></div>
<div class="card red"><span class="mini">The ultimate evasion</span><h4>🫥 Rootkit</h4><p>AV/EDR trust what the OS reports. Compromise the OS itself and it lies for you — nothing left to detect. <b>Stuxnet (2010)</b> hid at kernel level for months.</p></div>
</div>
<h2 class="w" id="s-creds"><span class="num">4</span> Steal credentials, then pivot</h2>
<p class="lead">Now you're root, the stored secrets are readable. Different from Stage 2: there you stole <i>one</i> key to go <b>up</b>; here you harvest <i>all</i> of them to go <b>out</b> — and it needs root, so it only works now.</p>
<div class="cards">
<div class="card"><span class="mini">🐧 Linux</span><h4><code>/etc/shadow</code></h4><p>Grab the hashes you couldn't read before and crack the weak ones offline.</p></div>
<div class="card"><span class="mini">🪟 Windows</span><h4>LSASS + Mimikatz</h4><p>Recent logins are cached in memory — Mimikatz scrapes them straight out.</p></div>
</div>
<p class="thint" style="margin:.1rem 0 0">Often you don't even crack the hash — just <b>replay it</b> to authenticate elsewhere: <b>pass-the-hash</b>.</p>
<figure>
<svg viewBox="0 0 600 92" role="img" aria-label="Lateral movement: foothold to app server to database, all leading to the domain controller which is game over">
<g text-anchor="middle" font-size="11.5">
<rect x="6" y="28" width="104" height="42" rx="7" class="node-fill node-line" stroke-width="1.4"></rect><text class="svg-t" x="58" y="54" font-weight="700">Foothold</text>
<rect x="150" y="28" width="104" height="42" rx="7" class="node-fill node-line" stroke-width="1.4"></rect><text class="svg-t" x="202" y="54" font-weight="700">App server</text>
<rect x="294" y="28" width="104" height="42" rx="7" class="node-fill node-line" stroke-width="1.4"></rect><text class="svg-t" x="346" y="54" font-weight="700">Database</text>
<rect x="446" y="20" width="148" height="58" rx="8" style="fill:var(--w-red-t);stroke:var(--w-red)" stroke-width="1.8"></rect><text x="520" y="44" font-weight="700" style="fill:var(--w-red)">Domain Controller</text><text class="svg-m" x="520" y="62" font-size="10">keys to everything · game over</text>
<g class="teal-s" stroke-width="2" marker-end="url(#ar4)"><line x1="112" y1="49" x2="146" y2="49"></line><line x1="256" y1="49" x2="290" y2="49"></line><line x1="400" y1="49" x2="442" y2="49"></line></g>
</g>
<defs><marker id="ar4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker></defs>
</svg>
<figcaption>Stolen keys drive <b>lateral movement</b> toward the domain controller — the server that holds every account's credentials. Own it and you log into anything as a legit admin.</figcaption>
</figure>
<div class="card def"><span class="mini">The defender's counter</span><h4>Protect the credentials</h4><p>Credential Guard &amp; LSASS protection wall off memory from Mimikatz; unique local-admin passwords stop one key opening the rest; <b>MFA</b> means a stolen password alone isn't enough.</p></div>
<h2 class="w" id="s-act"><span class="num">5</span> Act — exfiltrate, quietly</h2>
<p class="lead">Reaching the data is easy once you're a trusted admin. Getting it <b>out</b> is hard — a big transfer trips volume alerts and DLP. So the act is done under stealth.</p>
<div class="cards">
<div class="card"><span class="mini">🐢 Low and slow</span><h4>No volume spike</h4><p>Trickle it out in small chunks over days, disguised as ordinary HTTPS and encrypted so inspection can't read it.</p></div>
<div class="card"><span class="mini">🕳️ The clever channel</span><h4>DNS tunneling</h4><p>Hide data in DNS lookups — a protocol that's almost always allowed out and rarely inspected.</p></div>
</div>
<figure>
<svg viewBox="0 0 560 96" role="img" aria-label="DNS tunneling: data is encoded into DNS lookups that pass the firewall to the attacker's DNS server">
<g text-anchor="middle" font-size="11.5">
<rect x="6" y="26" width="150" height="46" rx="8" class="node-fill node-line" stroke-width="1.4"></rect><text class="svg-t" x="81" y="46" font-weight="700">Stolen data</text><text class="svg-m" x="81" y="62" font-size="10">split into chunks</text>
<line x1="270" y1="12" x2="270" y2="84" style="stroke:var(--w-muted)" stroke-width="2" stroke-dasharray="4 4"></line><text class="svg-m" x="270" y="92" font-size="9.5">firewall (DNS allowed ✓)</text>
<rect x="404" y="26" width="150" height="46" rx="8" style="fill:var(--w-red-t);stroke:var(--w-red)" stroke-width="1.6"></rect><text x="479" y="46" font-weight="700" style="fill:var(--w-red)">attacker DNS</text><text class="svg-m" x="479" y="62" font-size="10">reassembles it</text>
<path d="M158 40 L402 40" fill="none" class="teal-s" stroke-width="2" marker-end="url(#ar5)"></path>
<text class="teal" x="280" y="33" font-size="10" font-weight="700">chunk1.attacker.com · chunk2… →</text>
</g>
<defs><marker id="ar5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 7,3 0,6" class="teal"></polygon></marker></defs>
</svg>
<figcaption>Each DNS lookup smuggles a piece of the data out to the attacker's name server. Many lookups, but nothing trips.</figcaption>
</figure>
<h2 class="w" id="s-tracks">Cover your tracks — the exit</h2>
<p class="lead">Different from stealth: that kept you unseen <i>while</i> operating; this is anti-forensics <i>afterward</i> — switch off the cameras <b>and</b> wipe the tape.</p>
<div class="pills"><span class="pill">🎥 <b>Disable logging</b></span><span class="pill">🧹 <b>Clear logs</b> — event, auth, shell history</span><span class="pill">🕰️ <b>Timestomp</b> — fake file timestamps</span></div>
<p style="font-size:.93rem">Two goals: <b>buy time</b> (the later they notice, the colder the trail), and <b>defeat the forensic investigation</b> — leave no evidence of how you got in, what you took, or who you are.</p>
<h2 class="w" id="s-malware">Malware is this loop, automated</h2>
<p class="lead">Everything above, done by hand, is exactly what malware does on its own — modules assembled like any program.</p>
<figure>
<svg viewBox="0 0 640 118" role="img" aria-label="Each loop stage maps to a malware module, with a stealth band spanning all stages">
<g text-anchor="middle" font-size="11">
<g>
<rect x="6" y="14" width="118" height="44" rx="7" class="node-fill node-line" stroke-width="1.3"></rect><text class="svg-m" x="65" y="30" font-size="9">GET IN</text><text class="svg-t" x="65" y="47" font-weight="700">dropper</text>
<rect x="130" y="14" width="118" height="44" rx="7" class="node-fill node-line" stroke-width="1.3"></rect><text class="svg-m" x="189" y="30" font-size="9">ESCALATE</text><text class="svg-t" x="189" y="47" font-weight="700">privesc</text>
<rect x="254" y="14" width="118" height="44" rx="7" class="node-fill node-line" stroke-width="1.3"></rect><text class="svg-m" x="313" y="30" font-size="9">PERSIST</text><text class="svg-t" x="313" y="47" font-weight="700">persistence</text>
<rect x="378" y="14" width="118" height="44" rx="7" class="node-fill node-line" stroke-width="1.3"></rect><text class="svg-m" x="437" y="30" font-size="9">STEAL</text><text class="svg-t" x="437" y="47" font-weight="700">cred theft</text>
<rect x="502" y="14" width="132" height="44" rx="7" class="node-fill node-line" stroke-width="1.3"></rect><text class="svg-m" x="568" y="30" font-size="9">ACT</text><text class="svg-t" x="568" y="47" font-weight="700">payload + C2</text>
</g>
<rect x="6" y="70" width="628" height="30" rx="7" style="fill:var(--w-teal)"></rect><text x="320" y="89" font-weight="700" fill="#fff" font-size="12">STEALTH / armoring — packing · hollowing · rootkit — spans every stage</text>
</g>
</svg>
<figcaption>Names are just common bundles of these pieces: <b>virus</b> infects files (Melissa) · <b>worm</b> self-spreads (WannaCry) · <b>trojan</b> is disguised (Emotet) · <b>RAT</b> gives remote control (DarkComet — your lab) · <b>ransomware</b> is the payoff (CryptoLocker). Real samples use only the subset they need — a worm needs no C2; much ransomware skips persistence.</figcaption>
</figure>
<details class="more"><summary>💣 Damage, not theft <span class="cv">›</span></summary><div class="bd">Not every attacker wants data. Ransomware encrypts files for a ransom; attacks on industrial and refrigeration control systems can manipulate physical equipment directly. When the goal is damage, the "act" looks different, but the routine to reach it is the same.</div></details>
<h2 class="w" id="s-defender">The defender's view</h2>
<p class="lead">Because the attacker <i>must</i> walk this routine, the defender gets a control at every step — that's defense in depth.</p>
<div class="cards">
<div class="card def"><span class="mini">Get in / escalate</span><p><b>Patch</b> — the exploit fails · <b>least privilege</b> — a foothold can't climb</p></div>
<div class="card def"><span class="mini">Stay hidden</span><p><b>EDR</b> — catches behavior packing can't hide</p></div>
<div class="card def"><span class="mini">Steal creds</span><p><b>Credential Guard · LAPS · MFA</b> — nothing worth stealing</p></div>
<div class="card def"><span class="mini">Exfiltrate / cover tracks</span><p><b>DLP</b> · outbound monitoring · <b>protected logs</b> they can't erase</p></div>
</div>
<p class="oneliner">The <span class="k">loop</span> is the spine, <span class="k">stealth</span> is the band, <span class="r">malware</span> is the tooling — run on every host you reach.</p>
<h2 class="w" id="s-labs">This week — put it into practice</h2>
<p class="lead">You'll run the loop two ways: by hand, then automated by a tool.</p>
<div class="cards">
<div class="card"><span class="mini">Lab 1 · by hand</span><h4>Remote &amp; Local Exploitation</h4><p>Exploit a vulnerable service on a Linux server with <b>Metasploit</b> → land a foothold → <b>escalate</b> to a privileged shell. Get in + climb, manually.</p></div>
<div class="card red"><span class="mini">Lab 2 · automated</span><h4>Deploy a RAT</h4><p>Recover the admin password → log in over <b>RDP</b> → deploy <b>DarkComet</b> for command-and-control. The same loop, now bundled into one tool.</p></div>
</div>
<div class="pills"><span class="pill"><b>Concept check:</b> the 2×2 of identities</span><span class="pill">the three ways in — <b>code · config · credentials</b></span><span class="pill">persistence</span><span class="pill">credential theft &amp; pass-the-hash</span><span class="pill">stealth</span><span class="pill">RAT &amp; C2</span><span class="pill">anti-forensics</span></div>
<p style="font-size:.93rem;color:var(--w-muted)">The routine is predictable, which is what makes it defendable: the attacker must get every step right; the defender only has to catch one. Next week we move up a layer — <b>Web Attacks</b>.</p>
</div>

## References

- [MITRE ATT&CK](https://attack.mitre.org/) — technique catalog (T1190, T1068, T1055, T1003, T1071, T1219, T1070)
- [GTFOBins](https://gtfobins.github.io/) — Linux privilege escalation
- [LOLBAS](https://lolbas-project.github.io/) — Windows living-off-the-land
- [Metasploit Unleashed](https://www.offsec.com/metasploit-unleashed/)
- [Kali Linux docs](https://www.kali.org/docs/)
- [↩ Back to the Week 8 module on Canvas](REPLACE_WITH_CANVAS_WEEK8_URL) — labs, the concept-check quiz, and due dates

<script>
(function(){
  var root=document.querySelector('.wk8'); if(!root) return;
  root.querySelectorAll('[data-go]').forEach(function(b){
    b.addEventListener('click',function(){var el=document.getElementById(b.getAttribute('data-go')); if(el) el.scrollIntoView({behavior:'smooth',block:'start'});});
  });
  var term=document.getElementById('term'), btn=document.getElementById('runT'), hint=document.getElementById('hintT'), cur=0, max=4;
  if(btn){btn.addEventListener('click',function(){
    cur++;
    term.querySelectorAll('.pend[data-s="'+cur+'"]').forEach(function(l){l.classList.add('show');});
    if(cur>=max){btn.disabled=true;btn.textContent='✓ root';hint.textContent='Two small mistakes, combined, became a root shell.';}
    else{hint.textContent='Step '+cur+' of '+max+' — keep going.';}
  });}
})();
</script>
