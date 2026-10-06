/* KACO Systems — interaction layer. Progressive enhancement: the site reads fine without it. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');
  // Apple's momentum projection: where a flick will come to rest (v in px/s)
  var project = function (v, rate) { rate = rate || 0.998; return (v / 1000) * rate / (1 - rate); };
  // Progressive resistance past a boundary
  var rubber = function (over, dim, k) { k = k || 0.55; return (over * dim * k) / (dim + k * Math.abs(over)); };

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
    if (open) {
      var first = sheet.querySelector('.sh-btn, a');
      first && first.focus();
    }
  }
  burger && burger.addEventListener('click', function () { setSheet(burger.getAttribute('aria-expanded') !== 'true'); });
  var shBtn = d.querySelector('.sh-btn');
  shBtn && shBtn.addEventListener('click', function () {
    var o = shBtn.getAttribute('aria-expanded') !== 'true';
    shBtn.setAttribute('aria-expanded', o); d.getElementById('sh-sub').classList.toggle('open', o);
  });
  sheet && sheet.addEventListener('click', function (e) { if (e.target.closest('a')) setSheet(false); });
  sheet && sheet.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      var focusables = [].slice.call(sheet.querySelectorAll('button, a'));
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && d.activeElement === first) { e.preventDefault(); burger && burger.focus(); }
      else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); burger && burger.focus(); }
    }
  });
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (sheet && sheet.classList.contains('open')) {
        setSheet(false);
        burger && burger.focus();
      }
      closeMega();
    }
  });
  matchMedia('(min-width: 1041px)').addEventListener('change', function () { setSheet(false); });

  /* Mega panel: hover-intent for mouse (short close delay so diagonal moves don't drop it), click/keyboard for touch */
  var mega = d.querySelector('.has-mega'), megaT = 0;
  function setMega(o) {
    if (!mega) return; clearTimeout(megaT);
    mega.classList.toggle('open', o);
    var b = mega.querySelector('.nav-btn'); b && b.setAttribute('aria-expanded', o);
  }
  function closeMega() { setMega(false); }
  if (mega) {
    mega.querySelector('.nav-btn').addEventListener('click', function () { setMega(!mega.classList.contains('open')); });
    mega.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') setMega(true); });
    mega.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { clearTimeout(megaT); megaT = setTimeout(closeMega, 160); } });
    mega.addEventListener('focusout', function (e) { if (!mega.contains(e.relatedTarget)) closeMega(); });
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
    el.textContent = '0' + suf;
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect();
      var t0 = performance.now(), dur = 1400;
      (function tick(t) {
        var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * e) + suf;
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.2 });
    o.observe(el);
  });

  /* Hero slider: crossfade + 1:1 drag tracking. On release the projected flick decides, then the slides settle. */
  var hero = d.querySelector('.hero');
  if (hero) {
    var slides = [].slice.call(hero.querySelectorAll('.slide')), picks = [].slice.call(hero.querySelectorAll('.hero-dots button'));
    var pauseBtn = hero.querySelector('.hero-pause');
    var cur = 0, timer = null, DUR = 7000, userPaused = reduce, hovering = false;
    hero.style.setProperty('--dur', DUR + 'ms');
    var show = function (i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle('on', k === cur); s.setAttribute('aria-hidden', k !== cur); });
      picks.forEach(function (b, k) { b.setAttribute('aria-selected', k === cur); });
      hero.classList.remove('playing'); void hero.offsetWidth; if (timer) hero.classList.add('playing');
    };
    var stop = function () { clearTimeout(timer); timer = null; hero.classList.remove('playing'); };
    var play = function () { stop(); if (userPaused || hovering || d.hidden) return; hero.classList.add('playing'); timer = setTimeout(function () { show(cur + 1); play(); }, DUR); };
    if (pauseBtn) {
      var syncPause = function () { pauseBtn.setAttribute('aria-pressed', userPaused); pauseBtn.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow'); };
      pauseBtn.addEventListener('click', function () { userPaused = !userPaused; syncPause(); userPaused ? stop() : play(); });
      syncPause();
    }
    picks.forEach(function (b, k) { b.addEventListener('click', function () { show(k); play(); }); });
    hero.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; stop(); } });
    hero.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hovering = false; play(); } });
    hero.addEventListener('focusin', function () { hovering = true; stop(); }); hero.addEventListener('focusout', function () { hovering = false; play(); });
    d.addEventListener('visibilitychange', play);

    var g = null; // active gesture
    var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
    var neighbour = function (dx) { return slides[(cur + (dx < 0 ? 1 : -1) + slides.length) % slides.length]; };
    var paint = function (dx) {
      var w = hero.clientWidth, p = clamp(dx / w, -1, 1), cs = slides[cur], ns = neighbour(dx);
      // Content follows the finger 1:1 while the slides cross-dissolve; the incoming one arrives from the side it will come from.
      cs.style.opacity = 1 - Math.abs(p) * 1.15; ns.style.visibility = 'visible'; ns.style.opacity = Math.min(1, Math.abs(p) * 1.15);
      if (!reduce) { cs.style.transform = 'translate3d(' + dx * 0.6 + 'px,0,0)'; ns.style.transform = 'translate3d(' + ((dx < 0 ? 1 : -1) * w * 0.3 + dx * 0.6) + 'px,0,0)'; }
      if (g.ns && g.ns !== ns) { g.ns.style.cssText = ''; } g.ns = ns;
    };
    hero.addEventListener('pointerdown', function (e) {
      if (e.target.closest('a,button') || (e.pointerType === 'mouse' && e.button !== 0)) return;
      g = { id: e.pointerId, x: e.clientX, y: e.clientY, on: false, hist: [[e.timeStamp, e.clientX]], ns: null };
    });
    hero.addEventListener('pointermove', function (e) {
      if (!g || e.pointerId !== g.id) return;
      var dx = e.clientX - g.x, dy = e.clientY - g.y;
      if (!g.on) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;      // hysteresis before committing to a direction
        if (Math.abs(dy) > Math.abs(dx)) { g = null; return; }   // vertical: let the page scroll
        g.on = true; hero.setPointerCapture(e.pointerId); hero.classList.add('dragging'); stop();
      }
      g.hist.push([e.timeStamp, e.clientX]); if (g.hist.length > 5) g.hist.shift();
      paint(dx);
    });
    var release = function (e, cancelled) {
      if (!g || e.pointerId !== g.id) return;
      var gg = g; g = null; if (!gg.on) return;
      var dx = e.clientX - gg.x, h0 = gg.hist[0], hN = gg.hist[gg.hist.length - 1];
      var v = hN[0] > h0[0] ? (hN[1] - h0[1]) / (hN[0] - h0[0]) * 1000 : 0;       // px/s at release
      var landing = dx + project(v);
      hero.classList.remove('dragging');
      slides[cur].style.cssText = ''; if (gg.ns) gg.ns.style.cssText = '';
      var go = !cancelled && Math.abs(landing) > hero.clientWidth * 0.3;
      if (go) show(cur + (landing < 0 ? 1 : -1)); else show(cur);
      play();
    };
    hero.addEventListener('pointerup', function (e) { release(e, false); });
    hero.addEventListener('pointercancel', function (e) { release(e, true); });
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
    addEventListener('keydown', function (e) {
      if (vm.classList.contains('open')) {
        if (e.key === 'Escape') vclose();
        else if (e.key === 'Tab') {
          var focusables = [].slice.call(vm.querySelectorAll('button, iframe, a'));
          if (focusables.length) {
            var first = focusables[0], last = focusables[focusables.length - 1];
            if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
          }
        }
      }
    });
  }

  /* Rail: momentum drag with mouse (frame-rate independent), rubber-banding at the ends, native scroll-snap on touch */
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
    var maxScroll = function () { return rail.scrollWidth - rail.clientWidth; };
    var down = false, x0 = 0, s0 = 0, moved = 0, lastX = 0, lastT = 0, vel = 0, raf = 0;
    var setRb = function (px) { rail.style.setProperty('--rb', px + 'px'); };
    var settle = function () { rail.classList.add('snapback'); setRb(0); setTimeout(function () { rail.classList.remove('snapback'); }, 520); };
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      cancelAnimationFrame(raf); rail.classList.remove('snapback'); down = true; moved = 0; x0 = lastX = e.clientX; s0 = rail.scrollLeft; lastT = e.timeStamp; vel = 0;
    });
    addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - x0; moved = Math.max(moved, Math.abs(dx));
      if (moved > 6) {
        rail.classList.add('drag');
        var want = s0 - dx, lo = 0, hi = maxScroll();
        rail.scrollLeft = want;
        var over = want < lo ? want - lo : want > hi ? want - hi : 0;      // past an end: resist progressively
        setRb(over ? -rubber(over, rail.clientWidth) : 0);
      }
      var dt = e.timeStamp - lastT; if (dt > 0) vel = (lastX - e.clientX) / dt; lastX = e.clientX; lastT = e.timeStamp; // px/ms
    });
    addEventListener('pointerup', function () {
      if (!down) return; down = false;
      settle();
      if (moved > 6 && !reduce) {  // decay v *= 0.998^dt — the same exponential form scrolling uses, independent of refresh rate
        var v = vel, t0 = performance.now();
        (function glide(t) {
          var dt = Math.min(32, t - t0); t0 = t;
          if (Math.abs(v) < 0.02) { rail.classList.remove('drag'); return; }
          rail.scrollLeft += v * dt; v *= Math.pow(0.998, dt);
          if (rail.scrollLeft <= 0 || rail.scrollLeft >= maxScroll()) { rail.classList.remove('drag'); return; }
          raf = requestAnimationFrame(glide);
        })(t0);
      } else rail.classList.remove('drag');
    });
    addEventListener('pointercancel', function () {
      if (!down) return; down = false; settle(); rail.classList.remove('drag');
    });
    rail.addEventListener('click', function (e) { if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; } }, true);
    rail.addEventListener('dragstart', function (e) { e.preventDefault(); });
  });

  /* Gallery lightbox: grows out of the tapped photo, drags 1:1 (sideways = browse, down = dismiss), traps and restores focus */
  var lb = d.getElementById('lb');
  if (lb) {
    var items = [].slice.call(d.querySelectorAll('[data-lb]')), li = 0, opener = null;
    var img = lb.querySelector('img'), cap = lb.querySelector('p'), btns = [].slice.call(lb.querySelectorAll('button'));
    var EASE = 'cubic-bezier(.32,.72,0,1)';
    var load = function (i) {
      li = (i + items.length) % items.length;
      img.src = items[li].dataset.lb; img.alt = items[li].dataset.cap || ''; cap.textContent = items[li].dataset.cap || '';
    };
    // Transform-only rect-to-rect animation. transform-origin is the top-left corner so translate+scale map the rects exactly.
    var tf = function (t, nr) { return 'translate(' + (t.left - nr.left) + 'px,' + (t.top - nr.top) + 'px) scale(' + t.width / nr.width + ',' + t.height / nr.height + ')'; };
    var open = function (i, from) {
      load(i); lb.classList.add('open'); d.body.style.overflow = 'hidden';
      if (from) { opener = from; btns[0].focus({ preventScroll: true }); }
      if (from && !reduce && img.animate) {
        var go = function () {
          var nr = img.getBoundingClientRect(); img.style.transformOrigin = '0 0';
          img.animate([{ transform: tf(from.getBoundingClientRect(), nr) }, { transform: 'none' }], { duration: 480, easing: EASE }).onfinish = function () { img.style.transformOrigin = ''; };
          setTimeout(function () { img.style.transformOrigin = ''; }, 560);
        };
        img.complete ? go() : (img.onload = function () { img.onload = null; go(); });
      }
    };
    var close = function () {
      var thumb = items[li], r = thumb.getBoundingClientRect(), vis = r.bottom > 0 && r.top < innerHeight;
      var finish = function () {
        lb.style.transition = 'none'; lb.classList.remove('open'); d.body.style.overflow = '';
        img.style.cssText = ''; lb.style.cssText = ''; btns.forEach(function (x) { x.style.opacity = ''; });
        (opener || thumb).focus({ preventScroll: true }); opener = null;
      };
      if (reduce || !vis || !img.animate) { finish(); return; }
      var vr = img.getBoundingClientRect(); img.style.transform = ''; img.style.opacity = ''; var nr = img.getBoundingClientRect();
      img.style.transformOrigin = '0 0'; lb.style.transition = 'background .38s'; lb.style.background = 'rgba(0,0,0,0)';
      lb.style.webkitBackdropFilter = lb.style.backdropFilter = 'none'; cap.style.opacity = 0;
      btns.forEach(function (x) { x.style.transition = 'opacity .2s'; x.style.opacity = 0; });
      var a = img.animate([{ transform: tf(vr, nr) }, { transform: tf(r, nr) }], { duration: 380, easing: EASE, fill: 'forwards' });
      var done = false, fin = function () { if (done) return; done = true; finish(); a.cancel(); };
      a.onfinish = fin; setTimeout(fin, 520);   // fallback: animations are paused in background tabs
    };
    items.forEach(function (b, i) { b.addEventListener('click', function () { open(i, b); }); });
    lb.querySelector('.x').addEventListener('click', function () { close(); });
    lb.querySelector('.pv').addEventListener('click', function () { load(li - 1); });
    lb.querySelector('.nx').addEventListener('click', function () { load(li + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') load(li - 1); if (e.key === 'ArrowRight') load(li + 1);
      if (e.key === 'Tab') {   // focus trap
        var first = btns[0], last = btns[btns.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // 1:1 drag on the photo itself
    var lg = null;
    img.addEventListener('pointerdown', function (e) { lg = { id: e.pointerId, x: e.clientX, y: e.clientY, on: false, axis: '', hist: [[e.timeStamp, e.clientX, e.clientY]] }; });
    img.addEventListener('pointermove', function (e) {
      if (!lg || e.pointerId !== lg.id) return;
      var dx = e.clientX - lg.x, dy = e.clientY - lg.y;
      if (!lg.on) { if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return; lg.on = true; lg.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'; img.setPointerCapture(e.pointerId); }
      lg.hist.push([e.timeStamp, e.clientX, e.clientY]); if (lg.hist.length > 5) lg.hist.shift();
      if (lg.axis === 'x') img.style.transform = 'translate3d(' + dx + 'px,0,0)', img.style.opacity = 1 - Math.min(0.5, Math.abs(dx) / innerWidth);
      else { var ty = Math.max(0, dy); img.style.transform = 'translate3d(0,' + ty + 'px,0) scale(' + (1 - Math.min(0.2, ty / 1200)) + ')'; lb.style.background = 'rgba(0,0,0,' + (0.92 - Math.min(0.6, ty / 500)) + ')'; }
    });
    var lend = function (e) {
      if (!lg || e.pointerId !== lg.id) return; var g2 = lg; lg = null; if (!g2.on) return;
      var h0 = g2.hist[0], hN = g2.hist[g2.hist.length - 1], dt = Math.max(1, hN[0] - h0[0]);
      var vx = (hN[1] - h0[1]) / dt * 1000, vy = (hN[2] - h0[2]) / dt * 1000;
      var dx = e.clientX - g2.x, dy = e.clientY - g2.y;
      var back = function () { lb.style.background = ''; img.style.transition = 'transform .45s ' + EASE + ', opacity .3s'; img.style.transform = ''; img.style.opacity = ''; setTimeout(function () { img.style.transition = ''; }, 460); };
      if (g2.axis === 'y' && dy + project(vy) > 160) { close(); }
      else if (g2.axis === 'x' && Math.abs(dx + project(vx)) > innerWidth * 0.25) { lb.style.background = ''; img.style.transform = ''; img.style.opacity = ''; load(li + (dx + project(vx) < 0 ? 1 : -1)); }
      else back();
    };
    img.addEventListener('pointerup', lend); img.addEventListener('pointercancel', lend);
  }

  /* Contact form */
  var form = d.getElementById('contact-form');
  if (form) {
    var q = new URLSearchParams(location.search), sel = form.querySelector('select[name="interest"]');
    var key = ['product', 'service', 'action', 'course', 'sector', 'project'].filter(function (k) { return q.get(k); })[0];
    if (key) {
      var v = q.get(key), pretty = v.replace(/[-_]/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
      var msg = form.querySelector('textarea');
      if (key === 'course' || (key === 'action' && v === 'training')) {
        sel.value = 'Training courses';
        if (!msg.value) msg.value = 'I would like to enquire about the training course: ' + pretty + '.\n\n';
      } else if (key === 'product') {
        sel.value = 'Equipment & product quote';
        if (!msg.value) msg.value = 'I would like to request a quote for: ' + pretty + '.\n\n';
      } else if (key === 'service' || (key === 'action' && v === 'service') || v === 'calibration') {
        sel.value = 'Calibration & service booking';
        if (!msg.value) msg.value = 'I would like to book equipment service & calibration for: ' + pretty + '.\n\n';
      } else if (key === 'action' && v === 'support') {
        sel.value = 'Technical support (HelpDesk)';
        if (!msg.value) msg.value = 'I require HelpDesk technical support regarding: \n\n';
      } else if (key === 'project') {
        sel.value = 'Contract survey & engineering';
        if (!msg.value) msg.value = 'I would like to discuss contract survey & engineering for: ' + pretty + '.\n\n';
      } else {
        var opt = [].slice.call(sel.options).filter(function (o) { return o.value.toLowerCase().indexOf(v.split(/[-_]/)[0].toLowerCase()) > -1; })[0];
        if (opt) sel.value = opt.value;
        if (!msg.value) msg.value = 'I am interested in: ' + pretty + '.\n\n';
      }
    }
    var note = form.querySelector('.form-note'), btn = form.querySelector('button[type=submit]');
    var fields = [].slice.call(form.querySelectorAll('input[required], textarea[required]'));
    var label = function (f) { return form.querySelector('label[for="' + f.id + '"]').firstChild.textContent.trim().toLowerCase(); };
    var check = function (f) {                      // inline: validate when the field is left, clear as soon as it's fixed
      var err = d.getElementById(f.getAttribute('aria-describedby')), ok = f.checkValidity();
      f.setAttribute('aria-invalid', !ok);
      err.textContent = ok ? '' : f.validity.valueMissing ? 'Please enter your ' + (label(f) === 'full name' ? 'name' : label(f) === 'how can we help?' ? 'message' : label(f)) + '.' : 'Enter a valid email address, like name@company.com.';
      return ok;
    };
    fields.forEach(function (f) {
      f.addEventListener('blur', function () { if (f.value || f.dataset.touched) { f.dataset.touched = 1; check(f); } else if (f.dataset.touched) check(f); });
      f.addEventListener('input', function () { if (f.getAttribute('aria-invalid') === 'true') check(f); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.hp input').value) return;
      var bad = fields.filter(function (f) { return !check(f); });
      if (bad.length) { bad[0].focus(); note.className = 'form-note err'; note.textContent = 'Please fix the highlighted ' + (bad.length > 1 ? 'fields' : 'field') + '.'; return; }
      btn.disabled = true; btn.textContent = 'Sending…'; note.className = 'form-note'; note.textContent = '';
      fetch(form.dataset.endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .then(function () { form.reset(); fields.forEach(function (f) { f.removeAttribute('aria-invalid'); }); note.className = 'form-note ok'; note.textContent = 'Thank you — your message has been sent. Our team will reply shortly.'; })
        .catch(function () { note.className = 'form-note err'; note.innerHTML = 'We couldn’t send that. Please email <a href="mailto:info@kaco.ug" style="text-decoration:underline">info@kaco.ug</a> or WhatsApp us.'; })
        .finally(function () { btn.disabled = false; btn.textContent = 'Send message'; });
    });
  }
})();
