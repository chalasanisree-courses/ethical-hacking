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
