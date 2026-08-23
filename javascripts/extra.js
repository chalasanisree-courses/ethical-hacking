// Interactive kill-chain diagram: reveal a phase panel + highlight the clicked phase.
function khShow(n) {
  document.querySelectorAll('.kc-panel').forEach(function (p) { p.classList.remove('active'); });
  var panel = document.getElementById('kc-panel-' + n);
  if (panel) panel.classList.add('active');
  document.querySelectorAll('.kc-phase').forEach(function (r) {
    r.classList.remove('selected');
    r.setAttribute('stroke-width', '1');
  });
  var rect = document.getElementById('kc-rect-' + n);
  if (rect) { rect.classList.add('selected'); rect.setAttribute('stroke-width', '2.5'); }
  if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Interactive defense-in-depth rings: reveal a layer panel + outline the clicked ring.
function dilShow(n) {
  document.querySelectorAll('.dil-panel').forEach(function (p) { p.classList.remove('active'); });
  var panel = document.getElementById('dil-panel-' + n);
  if (panel) panel.classList.add('active');
  document.querySelectorAll('.dil-ring').forEach(function (r) { r.classList.remove('selected'); });
  var ring = document.getElementById('dil-ring-' + n);
  if (ring) ring.classList.add('selected');
  if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Interactive NIST CSF strip: reveal a phase panel + highlight the clicked phase.
function nistShow(n) {
  document.querySelectorAll('.nist-panel').forEach(function (p) { p.classList.remove('active'); });
  var panel = document.getElementById('nist-panel-' + n);
  if (panel) panel.classList.add('active');
  document.querySelectorAll('.nist-phase').forEach(function (r) { r.classList.remove('selected'); });
  var node = document.getElementById('nist-node-' + n);
  if (node) node.classList.add('selected');
  if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Keyboard activation (Enter/Space) for clickable SVG rings & phase chips
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
    var t = e.target;
    if (t.classList && (t.classList.contains('dil-ring') || t.classList.contains('nist-phase') || t.classList.contains('kc-phase'))) {
      e.preventDefault();
      t.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }
});
