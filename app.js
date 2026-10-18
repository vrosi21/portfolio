// Tabs follow the URL hash (#projects, #cv), so a CV can link straight to a tab.
// Without JavaScript both sections simply show one after the other.
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));

  // Panel ids are "panel-<hash>" so the browser has no anchor to jump to.
  function show(hash) {
    var id = 'panel-' + hash;
    if (!panels.some(function (p) { return p.id === id; })) id = 'panel-projects';
    panels.forEach(function (p) { p.hidden = p.id !== id; });
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', String(t.getAttribute('aria-controls') === id));
    });
  }

  window.addEventListener('hashchange', function () {
    show(location.hash.slice(1));
    window.scrollTo(0, 0);
  });
  show(location.hash.slice(1));

  // Project filters
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-tags]'));
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;
      chips.forEach(function (c) { c.classList.toggle('is-on', c === chip); });
      items.forEach(function (el) {
        var tags = el.dataset.tags.split(' ');
        el.classList.toggle('is-filtered', f !== 'all' && tags.indexOf(f) === -1);
      });
    });
  });

  // Theme toggle, remembered per browser when storage is available
  var toggle = document.querySelector('.theme-toggle');
  toggle.addEventListener('click', function () {
    var dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
})();
