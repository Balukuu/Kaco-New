/* KACO Systems — interaction layer. Progressive enhancement: the site reads fine without it. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  /* Header: hairline appears once content scrolls beneath the material */
  var hdr = d.querySelector('.site-header');
  var onScroll = function () { hdr && hdr.classList.toggle('scrolled', scrollY > 4); };
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  /* Mobile sheet */
  var burger = d.querySelector('.burger'), sheet = d.getElementById('sheet');
  function setSheet(open) {
    if (!burger || !sheet) return;
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    sheet.classList.toggle('open', open);
    d.body.style.overflow = open ? 'hidden' : '';
  }
  burger && burger.addEventListener('click', function () { setSheet(burger.getAttribute('aria-expanded') !== 'true'); });
  sheet && sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setSheet(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') { setSheet(false); closeMega(); } });
  matchMedia('(min-width: 1041px)').addEventListener('change', function () { setSheet(false); });

  /* Mega panel: hover on desktop (CSS), tap/keyboard toggle for touch laptops */
  var mega = d.querySelector('.has-mega');
  function closeMega() { if (mega) { mega.classList.remove('open'); var b = mega.querySelector('.nav-btn'); b && b.setAttribute('aria-expanded', 'false'); } }
  if (mega) {
    var mb = mega.querySelector('.nav-btn');
    mb.addEventListener('click', function () {
      var o = mega.classList.toggle('open'); mb.setAttribute('aria-expanded', o);
    });
    mega.addEventListener('mouseenter', function () { mb.setAttribute('aria-expanded', 'true'); });
    mega.addEventListener('mouseleave', function () { mb.setAttribute('aria-expanded', 'false'); mega.classList.remove('open'); });
    d.addEventListener('click', function (e) { if (!mega.contains(e.target)) closeMega(); });
  }

  /* Scroll reveal */
  var rv = d.querySelectorAll('.rv');
  if (rv.length) {
    if (reduce || !('IntersectionObserver' in window)) rv.forEach(function (el) { el.classList.add('in'); });
    else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      rv.forEach(function (el, i) { el.style.setProperty('--d', (i % 4) * 0.06 + 's'); io.observe(el); });
    }
  }

  /* Count-up stats */
  d.querySelectorAll('[data-count]').forEach(function (el) {
    var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
    if (reduce || !('IntersectionObserver' in window)) { el.textContent = end + suf; return; }
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect();
      var t0 = performance.now(), dur = 1400;
      (function tick(t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * e) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.6 });
    o.observe(el);
  });

  /* Hero slider: crossfade, progress, swipe by velocity, pause when hidden/hovered */
  var hero = d.querySelector('.hero');
  if (hero) {
    var slides = [].slice.call(hero.querySelectorAll('.slide')), picks = [].slice.call(hero.querySelectorAll('.hero-dots button'));
    var cur = 0, timer = null, DUR = 7000;
    hero.style.setProperty('--dur', DUR + 'ms');
    var show = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === cur); s.setAttribute('aria-hidden', k !== cur); });
      picks.forEach(function (b, k) { b.setAttribute('aria-selected', k === cur); });
      hero.classList.remove('playing'); void hero.offsetWidth; if (timer) hero.classList.add('playing');
    };
    var play = function () { if (reduce) return; stop(); hero.classList.add('playing'); timer = setTimeout(function () { show(cur + 1); play(); }, DUR); };
    var stop = function () { clearTimeout(timer); timer = null; hero.classList.remove('playing'); };
    picks.forEach(function (b, k) { b.addEventListener('click', function () { show(k); play(); }); });
    hero.addEventListener('mouseenter', stop); hero.addEventListener('mouseleave', play);
    hero.addEventListener('focusin', stop); hero.addEventListener('focusout', play);
    d.addEventListener('visibilitychange', function () { d.hidden ? stop() : play(); });
    var sx = 0, st = 0, sy = 0, drag = false;
    hero.addEventListener('pointerdown', function (e) { if (e.target.closest('a,button')) return; drag = true; sx = e.clientX; sy = e.clientY; st = e.timeStamp; });
    hero.addEventListener('pointerup', function (e) {
      if (!drag) return; drag = false;
      var dx = e.clientX - sx, v = dx / Math.max(1, e.timeStamp - st); // px/ms
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - sy) && (Math.abs(dx) > 90 || Math.abs(v) > 0.4)) { show(cur + (dx < 0 ? 1 : -1)); play(); }
    });
    hero.addEventListener('pointercancel', function () { drag = false; });
    show(0); play();
  }

  /* Product tabs: every panel shows without JS; with JS only the selected one does */
  d.querySelectorAll('[data-tabs]').forEach(function (wrap) {
    var tabs = [].slice.call(wrap.querySelectorAll('[role="tab"]')), panels = [].slice.call(wrap.querySelectorAll('[role="tabpanel"]'));
    var select = function (i, focus) {
      tabs.forEach(function (t, k) { t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
      panels.forEach(function (pn, k) { pn.hidden = k !== i; });
      if (focus) tabs[i].focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : null;
        if (n === null) return; e.preventDefault(); select((n + tabs.length) % tabs.length, true);
      });
    });
    select(0);
  });

  /* Video player: the YouTube iframe (privacy-enhanced domain) is only created on click and removed on close */
  var vm = d.getElementById('vm');
  if (vm) {
    var frame = vm.querySelector('.vm-frame'), vcap = vm.querySelector('p'), opener = null;
    var vclose = function () {
      vm.classList.remove('open'); d.body.style.overflow = ''; frame.innerHTML = '';
      if (opener) { opener.focus(); opener = null; }
    };
    d.querySelectorAll('[data-yt]').forEach(function (b) {
      b.addEventListener('click', function () {
        opener = b;
        var id = b.dataset.yt, title = b.dataset.title || '';
        frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1" title="' + title.replace(/"/g, '&quot;') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
        vcap.innerHTML = '';
        var t = d.createElement('span'); t.textContent = title + ' · '; vcap.appendChild(t);
        var a = d.createElement('a'); a.href = 'https://www.youtube.com/watch?v=' + id; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Watch on YouTube'; vcap.appendChild(a);
        vm.classList.add('open'); d.body.style.overflow = 'hidden'; vm.querySelector('.x').focus();
      });
    });
    vm.querySelector('.x').addEventListener('click', vclose);
    vm.addEventListener('click', function (e) { if (e.target === vm) vclose(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && vm.classList.contains('open')) vclose(); });
  }

  /* Rail: momentum drag with mouse, native scroll-snap on touch */
  d.querySelectorAll('[data-rail]').forEach(function (wrap) {
    var rail = wrap.querySelector('.rail'), prev = wrap.querySelector('[data-prev]'), next = wrap.querySelector('[data-next]');
    var sync = function () {
      prev && (prev.disabled = rail.scrollLeft < 8);
      next && (next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8);
    };
    var step = function () { return (rail.querySelector('.card') || rail).getBoundingClientRect().width + 16; };
    prev && prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
    next && next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });
    rail.addEventListener('scroll', sync, { passive: true }); sync(); addEventListener('resize', sync);
    var down = false, x0 = 0, s0 = 0, moved = 0, lastX = 0, lastT = 0, vel = 0, raf = 0;
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      cancelAnimationFrame(raf); down = true; moved = 0; x0 = lastX = e.clientX; s0 = rail.scrollLeft; lastT = e.timeStamp; vel = 0;
    });
    addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - x0; moved = Math.max(moved, Math.abs(dx));
      if (moved > 6) { rail.classList.add('drag'); rail.scrollLeft = s0 - dx; }
      var dt = e.timeStamp - lastT; if (dt > 0) vel = (lastX - e.clientX) / dt; lastX = e.clientX; lastT = e.timeStamp;
    });
    addEventListener('pointerup', function () {
      if (!down) return; down = false;
      if (moved > 6) { // project momentum (exponential decay, as in scroll deceleration)
        var v = vel * 16;
        (function glide() { if (Math.abs(v) < 0.3) { rail.classList.remove('drag'); return; } rail.scrollLeft += v; v *= 0.95; raf = requestAnimationFrame(glide); })();
      } else rail.classList.remove('drag');
    });
    rail.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    rail.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });

  /* Gallery lightbox */
  var lb = d.getElementById('lb');
  if (lb) {
    var items = [].slice.call(d.querySelectorAll('[data-lb]')), li = 0;
    var img = lb.querySelector('img'), cap = lb.querySelector('p');
    var open = function (i) {
      li = (i + items.length) % items.length;
      img.src = items[li].dataset.lb; img.alt = items[li].dataset.cap || ''; cap.textContent = items[li].dataset.cap || '';
      lb.classList.add('open'); d.body.style.overflow = 'hidden';
    };
    var close = function () { lb.classList.remove('open'); d.body.style.overflow = ''; };
    items.forEach(function (b, i) { b.addEventListener('click', function () { open(i); }); });
    lb.querySelector('.x').addEventListener('click', close);
    lb.querySelector('.pv').addEventListener('click', function () { open(li - 1); });
    lb.querySelector('.nx').addEventListener('click', function () { open(li + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') open(li - 1); if (e.key === 'ArrowRight') open(li + 1);
    });
    var tx = 0; lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) open(li + (dx < 0 ? 1 : -1)); });
  }

  /* Contact form */
  var form = d.getElementById('contact-form');
  if (form) {
    var q = new URLSearchParams(location.search), sel = form.querySelector('select[name="interest"]');
    var key = ['product', 'service', 'action', 'course', 'sector', 'project'].filter(function (k) { return q.get(k); })[0];
    if (key) {
      var v = q.get(key), pretty = v.replace(/[-_]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
      var opt = [].slice.call(sel.options).filter(function (o) { return o.value.toLowerCase().indexOf(v.split(/[-_]/)[0].toLowerCase()) > -1; })[0];
      if (opt) sel.value = opt.value;
      var msg = form.querySelector('textarea'); if (!msg.value) msg.value = 'I am interested in: ' + pretty + '.\n\n';
    }
    var note = form.querySelector('.form-note'), btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.hp input').value) return;
      btn.disabled = true; btn.textContent = 'Sending…'; note.className = 'form-note'; note.textContent = '';
      fetch(form.dataset.endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function () { form.reset(); note.className = 'form-note ok'; note.textContent = 'Thank you — your message has been sent. Our team will reply shortly.'; })
        .catch(function () { note.className = 'form-note err'; note.innerHTML = 'We couldn’t send that. Please email <a href="mailto:info@kaco.ug" style="text-decoration:underline">info@kaco.ug</a> or WhatsApp us.'; })
        .finally(function () { btn.disabled = false; btn.textContent = 'Send message'; });
    });
  }
})();
