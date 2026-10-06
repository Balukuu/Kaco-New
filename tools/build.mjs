// KACO Systems static site generator.  Usage: node tools/build.mjs
// Reads tools/content.json (copy extracted from the Phirez build) + the home/contact copy below,
// and writes flat HTML pages (folder/index.html) next to the assets. No dependencies.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VENDORS } from './vendors.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/content.json'), 'utf8'));
const LEGAL = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/legal.json'), 'utf8'));
const SITE = 'https://kaco.ug';
const PHONE = '+256 783 549 770', TEL = '+256783549770', EMAIL = 'info@kaco.ug';
const WA = 'https://wa.me/256783549770?text=Hello%20KACO%20Systems%2C%20I%27d%20like%20to%20make%20an%20enquiry.';
const ADDR = '2nd Floor, Unicalo House, Plot 11, Archer Road, P.O. Box 111999, Kampala, Uganda';
const FORM = 'https://formsubmit.co/ajax/info@kaco.ug';

/* ---------- helpers ---------- */
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Phirez → KACO rebrand of carried-over copy
const rb = (s = '') => String(s)
  .replace(/Hello%20Phirez%2C/g, 'Hello%20KACO%20Systems%2C')
  .replace(/kamugishacosta@gmail\.com/g, EMAIL).replace(/careers@phirez\.ug/g, EMAIL).replace(/careers@kaco\.ug/g, EMAIL)
  .replace(/Phirez International Limited/g, 'KACO Systems').replace(/PHIREZ INTERNATIONAL LIMITED/g, 'KACO SYSTEMS')
  .replace(/phirez\.ug/g, 'kaco.ug').replace(/Phirez/g, 'KACO').replace(/phirez/g, 'kaco');
const t = (s) => esc(rb(s));
const IMG_MISSING = new Set();
const PHIREZ_GALLERY = '/run/media/ba-luku/AI/Blactec Projects/PHIREZ INTERNATIONAL LIMITED/assets/images/gallery/';
function im(src) {
  let m;
  if ((m = src.match(/^\/assets\/images\/vendor-equipment\/(.+)$/))) src = '/assets/img/products/' + m[1];
  else if ((m = src.match(/^\/assets\/images\/gallery\/(thumbs|medium)\/(.+)$/))) src = `/assets/img/gallery/${m[1]}/${m[2]}`;
  else if ((m = src.match(/^\/assets\/images\/gallery\/([^/]+)$/))) {
    const f = path.join(ROOT, 'assets/img/hero', m[1]);
    if (!fs.existsSync(f) && fs.existsSync(PHIREZ_GALLERY) && fs.existsSync(path.join(PHIREZ_GALLERY, m[1]))) {
      fs.copyFileSync(path.join(PHIREZ_GALLERY, m[1]), f);
    }
    src = '/assets/img/hero/' + m[1];
  } else if ((m = src.match(/^\/assets\/images\/(clients|training)\/(.+)$/))) src = `/assets/img/${m[1]}/${m[2]}`;
  if (src.startsWith('/') && !fs.existsSync(path.join(ROOT, src))) IMG_MISSING.add(src);
  return src;
}
// anchors that were renamed between builds
const ANCHOR = { '#service-centre': '#services-support', '#technical-support': '#services-support', '#consultancy-surveys': '#services-support', '#spatial-infrastructure': '#esri-gis', '#assurance-plan': '#services-support', '#hydrography': '#gpr-subsurface' };
function href(h = '') {
  h = rb(h);
  h = h.replace(/(?:\/solutions\/)?#(?:services-support|service-centre|technical-support|consultancy-surveys|assurance-plan)\b/, '/services/');
  h = h.replace(/(#[\w-]+)/, (a) => ANCHOR[a] || a);
  if (h.includes('why-phirez')) h = h.replace('why-phirez', 'why-kaco');
  return h;
}
const ext = (h) => /^https?:/.test(h);
const aAttr = (h) => (ext(h) && !h.includes('kaco.ug') ? ' target="_blank" rel="noopener"' : '');
const tl = (label, h, cls = '') => `<a class="tl ${cls}" href="${esc(href(h))}"${aAttr(h)}>${t(label)}</a>`;
const chunks = (s) => rb(s).split(/\s*\|\s*/).filter(Boolean);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ---------- shared chrome ---------- */
const BRANDS = [
  { n: 'Trimble', s: 'GNSS · Total Stations · Scanning', h: '/trimble/', i: 'trimble-x9-product-01.webp' },
  { n: 'DJI Enterprise', s: 'Drones · LiDAR · Dock', h: '/dji-enterprise/', i: 'dji-matrice-350-rtk-product-01.png' },
  { n: 'Esri ArcGIS', s: 'GIS & SDI', h: '/esri-arcgis/', i: 'esri-arcgis-pro-product-01.png' },
  { n: 'Spectra Geospatial', s: 'GNSS & Robotic Stations', h: '/spectra-geospatial/', i: 'spectra-sp100-product-01.avif' },
  { n: 'Nikon Precision', s: 'Optical Survey', h: '/nikon/', i: 'nikon-ne100-product-02.png' },
  { n: 'US Radar', s: 'Ground Penetrating Radar', h: '/us-radar/', i: 'usradar-quantum-product-02.avif' },
  { n: 'Seafloor Systems', s: 'Hydrographic Survey', h: '/seafloor-systems/', i: 'seafloor-hydrone-cutout-01.webp' },
  { n: 'Autodesk & Carlson', s: 'CAD & Field Software', h: '/autodesk/', i: 'autodesk-logo.jpg' },
  { n: 'Datamine', s: 'Mine Geology Software', h: '/datamine-software/', i: 'datamine-logo-01.png' },
  { n: 'IBM Tape Storage', s: 'Enterprise Data Archive', h: '/ibm-tape/', i: 'ibm-ts4500-product-02.png' },
  { n: 'XGRIDS', s: 'Handheld SLAM LiDAR', h: '/solutions/#laser-scanning', i: 'xgrids-slam-scanner-01.jpg' },
];
const NAV = [
  ['Solutions', '/solutions/'], ['Services', '/services/'], ['Industries', '/industries/'],
  ['Capabilities', '/projects/'], ['Gallery', '/gallery/'], ['Training', '/training/'], ['Company', '/company/'], ['Contact', '/contact/'],
];
const svg = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.4 11.4 0 0 0 2.2 17.3L1 23l5.8-1.5a11.4 11.4 0 0 0 5.4 1.4h.1A11.4 11.4 0 0 0 20.5 3.5zM12.2 21a9.4 9.4 0 0 1-4.8-1.3l-.3-.2-3.4.9.9-3.3-.2-.3A9.4 9.4 0 1 1 12.2 21zm5.2-7c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a7.7 7.7 0 0 1-3.8-3.3c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z"/></svg>',
  down: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  left: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
  right: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
  x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

function header(cur) {
  const li = NAV.map(([n, h]) => {
    if (n === 'Solutions') {
      return `<li class="has-mega"><button class="nav-btn" type="button" aria-expanded="false" aria-controls="mega">Solutions</button>
      <div class="mega" id="mega"><div class="mega-in">${BRANDS.map((b) => `<a href="${b.h}"><span class="mi"><img src="${im('/assets/images/vendor-equipment/' + b.i)}" alt="" loading="lazy" style="mix-blend-mode:multiply"></span><span class="mn">${esc(b.n)}</span><span class="mt">${esc(b.s)}</span></a>`).join('')}
      <div class="mega-foot">${tl('Explore all solutions & services', '/solutions/')}</div></div></div></li>`;
    }
    const on = cur === h || (h !== '/' && cur.startsWith(h) && !h.includes('#') && h !== '/solutions/');
    return `<li><a href="${h}"${on ? ' aria-current="page"' : ''}>${n}</a></li>`;
  }).join('');
  const sheet = NAV.map(([n, h]) => n === 'Solutions'
    ? `<button class="sh-btn" type="button" aria-expanded="false" aria-controls="sh-sub">Solutions<span aria-hidden="true">${svg.down}</span></button><div class="sub" id="sh-sub"><div>${BRANDS.map((b) => `<a href="${b.h}">${esc(b.n)}</a>`).join('')}<a class="all" href="/solutions/">All solutions &amp; services</a></div></div>`
    : `<a href="${h}"${cur === h || (!h.includes('#') && cur.startsWith(h)) ? ' aria-current="page"' : ''}>${n}<span aria-hidden="true">${svg.right}</span></a>`).join('');
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="hdr">
  <a class="logo" href="/" aria-label="KACO Systems — home"><img src="/kaco-logo.jpg" alt="KACO Systems" width="96" height="26"></a>
  <ul class="nav" aria-label="Primary">${li}</ul>
  <div class="hdr-right"><a class="pill-sm" href="/contact/">Get a Quote</a>
  <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="sheet"><i></i><i></i></button></div>
</div></header>
<div class="sheet" id="sheet" role="dialog" aria-label="Menu"><div class="sheet-in">${sheet}</div><div class="sheet-cta"><a href="/contact/">Get a Quote</a><a href="${WA}" target="_blank" rel="noopener">WhatsApp</a></div></div>`;
}

function footer() {
  return `<footer class="site-footer"><div class="wrap">
<div class="f-grid">
  <div class="f-brand"><img src="/kaco-logo.jpg" alt="KACO Systems" width="112" height="30" loading="lazy">
  <p>Authorised Trimble Distributor, Esri Silver Partner, and DJI Enterprise specialist. Delivering precision geospatial instruments, software, and certified lifecycle support across Uganda and East Africa.</p>
  <p>${esc(ADDR)}<br><a href="tel:${TEL}">${PHONE}</a> · <a href="mailto:${EMAIL}">${EMAIL}</a><br>Mon–Fri: 8:00 AM – 5:00 PM EAT</p></div>
  <div><h4>Solutions &amp; Systems</h4><ul>
    <li><a href="/solutions/#gnss-positioning">Trimble GNSS &amp; Total Stations</a></li><li><a href="/solutions/#drones-aerial">DJI Enterprise Drone LiDAR</a></li>
    <li><a href="/solutions/#laser-scanning">3D Laser Scanning &amp; Mobile SLAM</a></li><li><a href="/solutions/#gpr-subsurface">US Radar Subsurface GPR</a></li>
    <li><a href="/seafloor-systems/">Seafloor Hydrographic USVs</a></li><li><a href="/esri-arcgis/">Esri ArcGIS Enterprise &amp; SDI</a></li>
    <li><a href="/autodesk/">Autodesk &amp; Carlson Software</a></li><li><a href="/datamine-software/">Datamine Mine Geology Software</a></li>
    <li><a href="/ibm-tape/">IBM Tape Storage &amp; Archive</a></li><li><a href="/solutions/#system-integration">System Integration &amp; IT Networks</a></li></ul></div>
  <div><h4>Services &amp; Support</h4><ul>
    <li><a href="/services/#svc-1">Certified Service &amp; Calibration</a></li><li><a href="/services/#svc-2">Technical HelpDesk Support</a></li>
    <li><a href="/training/">KACO Training Academy</a></li><li><a href="/services/#svc-4">Contract Survey &amp; Engineering</a></li>
    <li><a href="/solutions/#esri-gis">Spatial Data Infrastructure</a></li><li><a href="/services/#svc-6">Technology Assurance Plan</a></li>
    <li><a href="/gallery/">Field Gallery</a></li><li><a href="/company/#divisions">Our Technical Divisions</a></li><li><a href="/company/#careers">Careers at KACO</a></li></ul></div>
  <div><h4>Company</h4><ul>
    <li><a href="/company/">About KACO Systems</a></li><li><a href="/industries/">Industries</a></li><li><a href="/projects/">Capabilities</a></li>
    <li><a href="/contact/">Contact</a></li><li><a href="${WA}" target="_blank" rel="noopener">Chat on WhatsApp</a></li><li><a href="/contact/?action=service">Book Instrument Service</a></li></ul></div>
</div>
<div class="f-bottom"><span>© KACO Systems. All rights reserved. Registered in Uganda. · Designed by <a href="https://blactec.ug" target="_blank" rel="noopener">Blactec</a></span><nav><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Service</a></nav></div>
</div></footer>
<a class="fab" href="${WA}" target="_blank" rel="noopener" aria-label="Chat with KACO Systems on WhatsApp">${svg.wa}</a>`;
}

function page({ url, title, desc, body, ogImage = '/assets/img/og-image.png', jsonld = '', bodyClass = '', noindex = false }) {
  const full = `${SITE}${url}`;
  let html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${full}">
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}">
<meta name="theme-color" content="#ffffff">
<meta property="og:type" content="website"><meta property="og:site_name" content="KACO Systems">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${full}"><meta property="og:image" content="${SITE}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE}${ogImage}">
<link rel="icon" type="image/jpeg" href="/kaco-logo.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/site.css">
${jsonld ? `<script type="application/ld+json">${jsonld}</script>` : ''}
</head>
<body class="${bodyClass}">
${header(url)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
  const out = path.join(ROOT, url === '/' ? '' : url, 'index.html');
  html = webpify(html);
  html = relativise(html, url);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  PAGES.push(url);
}
const PAGES = [];
// Heavy PNG/JPG assets get a smaller .webp sibling from tools/optimize.mjs; use it when present.
function webpify(html) {
  return html.replace(/\b(src|data-lb)="(\/assets\/img\/[^"]+)\.(png|jpe?g)"/gi, (m, attr, base, ext) =>
    fs.existsSync(path.join(ROOT, base + '.webp')) ? `${attr}="${base}.webp"` : m);
}
// Make every root-absolute link relative so the site works from file://, subfolders, or any host.
// Folder links get an explicit index.html so they also resolve without a web server. Set CLEAN_URLS=1 to keep /folder/ style.
function relativise(html, url) {
  const depth = url === '/' ? 0 : url.split('/').filter(Boolean).length;
  const pre = depth ? '../'.repeat(depth) : './';
  return html.replace(/\b(href|src|data-lb)="\/([^"]*)"/g, (m, attr, rest) => {
    let [pathPart, tail = ''] = rest.split(/(?=[?#])/).length > 1 ? [rest.split(/[?#]/)[0], rest.slice(rest.split(/[?#]/)[0].length)] : [rest, ''];
    if (!process.env.CLEAN_URLS && (pathPart === '' || pathPart.endsWith('/'))) pathPart += 'index.html';
    return `${attr}="${pre}${pathPart}${tail}"`;
  }).replace(/url\(\/(assets[^)]*)\)/g, `url(${pre}$1)`);
}

/* ---------- components ---------- */
const rv = (cls = '') => `rv ${cls}`.trim();
const head = (h2, lead) => `<div class="sec-head rv"><h2 class="title">${t(h2)}</h2>${lead ? `<p class="lead">${t(lead)}</p>` : ''}</div>`;
// Spec lists: hairline rows, no ticks or bullets. "Label: detail" items get a bold lead-in.
const chk = (arr) => `<ul class="specs">${arr.map((x) => { const m = rb(x).match(/^([^:]{3,44}):\s+(.+)$/); return m ? `<li><b>${esc(m[1])}</b>${esc(m[2])}</li>` : `<li>${t(x)}</li>`; }).join('')}</ul>`;
const linksRow = (ls, cls = '') => (ls.length ? `<div class="links-row">${ls.map((l, i) => tl(l.t, l.href, cls)).join('')}</div>` : '');
const localbar = (title, items, cta = true) => `<div class="localbar"><div class="wrap"><strong>${t(title)}</strong><nav aria-label="On this page">${items.map(([n, h], i) => `<a href="${h}"${i === 0 ? ' class="keep"' : ''}>${t(n)}</a>`).join('')}${cta ? '<a class="pill-sm keep" href="/contact/">Get a Quote</a>' : ''}</nav></div></div>`;

function tile(card, opts = {}) {
  const img = card.imgs[0];
  const photo = img && /\/(gallery|training)\//.test(img.src);
  const [p0, ...pr] = card.ps;
  const parts = p0 && p0.includes('|') ? chunks(p0) : null;
  const body = parts
    ? `<p class="tag">${esc(parts[0])}</p><p class="desc">${esc(parts.slice(1).join(' · '))}</p>`
    : p0 ? `<p class="desc">${t(p0)}</p>` : '';
  return `<article class="tile ${photo ? 'photo' : ''} rv">
  <h3>${t(card.h)}</h3>${body}${pr.length ? pr.map((x) => `<p class="desc">${t(x)}</p>`).join('') : ''}
  ${card.lis.length ? chk(card.lis) : ''}
  ${linksRow(card.links.map((l) => ({ ...l, t: l.t })))}
  ${img ? `<div class="media"><img src="${im(img.src)}" alt="${esc(rb(img.alt))}" loading="lazy" decoding="async" style="${photo ? '' : 'mix-blend-mode:multiply'}"></div>` : ''}
  </article>`;
}
function textCard(card, n) {
  return `<article class="card rv">${n ? `<div class="num">${String(n).padStart(2, '0')}</div>` : ''}<h3>${t(card.h)}</h3>
  ${card.ps.map((x) => `<p>${t(x)}</p>`).join('')}${card.lis.length ? chk(card.lis) : ''}
  ${card.links[0] ? tl(card.links[0].t, card.links[0].href) : ''}</article>`;
}
function rowCard(card, i, spot) {
  const img = card.imgs[0];
  let detail = '';
  if (spot) {
    const labs = card.lis.map((x) => { const m = x.match(/^(The Challenge|The Solution|What This Delivers)(.*)$/); return m ? [m[1], m[2]] : null; }).filter(Boolean);
    detail = `<div class="cs-detail">${labs.map(([a, b]) => `<div><b>${a}</b>${t(b)}</div>`).join('')}</div>`;
  }
  const sid = spot ? ['geodetic-control', 'quarry-volumetrics', 'precision-agri', 'highway-stakeout', 'utility-detection'][i] : slug(card.h).slice(0, 24);
  return `<article class="row rv" id="${sid}">
  <div class="row-media">${img ? `<img src="${im(img.src)}" alt="${esc(rb(img.alt))}" loading="lazy" decoding="async">` : ''}</div>
  <div class="row-body"><div class="n">${String(i + 1).padStart(2, '0')}</div><h3>${t(card.h)}</h3>
  ${spot ? detail : `${card.ps.map((x) => `<p>${t(x)}</p>`).join('')}${card.lis.length ? chk(card.lis) : ''}`}
  ${linksRow(spot ? card.links.filter((l) => /^\/contact/.test(l.href)) : card.links)}</div></article>`;
}
const ctaBand = (h, p, links, id = '') => `<section class="sec dark" ${id ? `id="${id}"` : ''}><div class="wrap center rv"><h2 class="title">${t(h)}</h2>${p ? `<p class="lead" style="margin-top:14px">${t(p)}</p>` : ''}
<div class="links-row" style="margin-top:28px;gap:12px">${links.map((l, i) => `<a class="btn ${i ? 'ghost on-dark' : 'light'}" href="${esc(href(l.href))}"${aAttr(l.href)}>${t(l.t)}</a>`).join('')}</div></div></section>`;

/* ---------- generic page from extracted content ---------- */

function generic(key, opts = {}) {
  const d = C[key];
  const secs = d.secs;
  const hero = secs[0];
  let h1 = hero.intro.find((x) => x.tag === 'h1');
  let lead = hero.intro.find((x) => x.tag === 'p');
  let out = '';
  // sticky local bar
  const quick = secs.find((s) => !s.intro.length && !s.cards.length && s.links.length >= 2 && key === 'projects');
  const anchors = secs.filter((s) => s.id && s.intro.length).map((s) => [s.intro.find((x) => x.tag === 'h2')?.t.split(/[&,]| And /)[0].trim() || s.id, '#' + (s.id === 'why-phirez' ? 'why-kaco' : s.id)]);
  if (key === 'projects' && quick) out += localbar('Capabilities', quick.links.filter((l) => l.href.startsWith('#')).map((l) => [l.t, l.href]));
  else if (key === 'solutions') out += localbar('Solutions', [['Hardware', '#gnss-positioning'], ['GIS', '#esri-gis'], ['Software', '#field-software'], ['Services', '/services/'], ['Partners', '#partners']]);

  // hero
  const heroImgs = hero.imgs.filter((i) => !/-logo/.test(i.src) && (/\/(gallery|training)\//.test(i.src) || /\.(png|webp|avif)$/.test(i.src)));
  const photoHero = heroImgs[0] && /\/(gallery|training)\//.test(heroImgs[0].src);
  const heroLinks = key === 'solutions' ? [{ t: 'Talk to a specialist', href: '/contact/' }, { t: 'Explore services', href: '/services/' }] : [];
  out += `<section class="page-hero"><span class="eyebrow rv">${t(opts.eyebrow || '')}</span>
  <h1 class="display rv">${t(h1?.t || d.meta.title)}</h1>${lead ? `<p class="lead rv">${t(lead.t)}</p>` : ''}${heroLinks.length ? `<div class="rv">${linksRow(heroLinks)}</div>` : ''}
  ${photoHero ? `<div class="hero-photo rv"><img src="${im(heroImgs[0].src)}" alt="${esc(rb(heroImgs[0].alt))}" fetchpriority="high"></div>`
    : heroImgs.length ? `<div class="hero-products rv">${heroImgs.slice(0, 3).map((i) => `<img src="${im(i.src)}" alt="${esc(rb(i.alt))}" style="mix-blend-mode:multiply">`).join('')}</div>` : ''}
  </section>`;

  let n = 0;
  secs.slice(1).forEach((s, idx) => {
    const h2 = s.intro.find((x) => x.tag === 'h2');
    const ps = s.intro.filter((x) => x.tag === 'p');
    const lead = ps[0]?.t;
    const cards = [...s.cards];
    const id = s.id === 'why-phirez' ? 'why-kaco' : s.id;
    const idAttr = id ? ` id="${id}"` : '';
    const bg = (n++ % 2 === 0) ? '' : 'grey';
    if (key === 'solutions' && s.id === 'services-support') return;
    // empty or link-only
    if (!h2 && !cards.length && !ps.length) return;
    // logo wall
    if (s.imgs.length >= 3 && !cards.length) {
      const names = s.id !== 'partners';
      out += `<section class="sec grey"${idAttr}><div class="wrap">${h2 ? head(h2.t, lead) : ''}<div class="logos ${names ? 'names' : ''} rv">${s.imgs.map((i) => `<figure><img src="${im(i.src)}" alt="${esc(rb(i.alt))}" loading="lazy">${names ? `<figcaption>${t(i.alt)}</figcaption>` : ''}</figure>`).join('')}</div></div></section>`;
      return;
    }
    // about-style split
    if (!cards.length && s.imgs.length && ps.length >= 1 && h2) {
      out += `<section class="sec ${bg}"${idAttr}><div class="wrap split"><div class="rv"><h2>${t(h2.t)}</h2>${ps.map((p) => `<p>${t(p.t)}</p>`).join('')}${linksRow(s.links.slice(0, 1))}</div><img class="rv" src="${im(s.imgs[0].src)}" alt="${esc(rb(s.imgs[0].alt))}" loading="lazy"></div></section>`;
      return;
    }
    // final CTA
    if (!cards.length && h2 && s.links.length) {
      out += ctaBand(h2.t, lead, s.links, '');
      return;
    }
    if (!cards.length) { if (h2) out += `<section class="sec ${bg}"${idAttr}><div class="wrap">${head(h2.t, lead)}</div></section>`; return; }

    // trailing banner card (CTA inside a service grid)
    let banner = '';
    const last = cards[cards.length - 1];
    if (cards.length > 2 && !last.lis.length && !last.imgs.length && last.links.length >= 2) { banner = cards.pop(); }
    let body;
    const hasImg = cards.some((c) => c.imgs.length);
    const industry = key === 'industries' && hasImg;
    const spot = key === 'projects' && s.id === 'spotlights';
    if (cards.length === 1 && !hasImg) {
      const c = cards[0];
      body = `<div class="banner rv" style="margin-top:0"><h3>${t(c.h)}</h3>${c.ps.map((x) => `<p>${t(x)}</p>`).join('')}${c.lis.length ? chk(c.lis) : ''}<div class="links-row">${c.links.map((l, i) => `<a class="btn ${i ? 'ghost on-dark' : 'light'}" href="${esc(href(l.href))}"${aAttr(l.href)}>${t(l.t)}</a>`).join('')}</div></div>`;
    } else if (industry || spot) {
      body = `<div class="rows">${cards.map((c, i) => rowCard(c, i, spot)).join('')}</div>`;
    } else if (hasImg) {
      const cls = cards.length % 3 === 0 && !cards.some((c) => c.lis.length > 3) ? 't3' : '';
      body = `<div class="tiles ${cls}">${cards.map((c) => tile(c)).join('')}</div>`;
    } else {
      const numbered = /process/.test(s.cls) || key === 'training' && idx === 3;
      body = `<div class="cards${cards.length % 3 === 0 ? ' c3' : ''}">${cards.map((c, i) => textCard(c, numbered ? i + 1 : 0)).join('')}</div>`;
    }
    if (banner) body += `<div class="banner rv"><h3>${t(banner.h)}</h3>${banner.ps.map((x) => `<p>${t(x)}</p>`).join('')}<div class="links-row">${banner.links.map((l, i) => `<a class="btn ${i ? 'ghost on-dark' : 'light'}" href="${esc(href(l.href))}"${aAttr(l.href)}>${t(l.t)}</a>`).join('')}</div></div>`;
    const darkBanner = cards.length === 1 && !hasImg;
    out += `<section class="sec ${darkBanner ? '' : bg}"${idAttr}><div class="wrap">${h2 ? head(h2.t, lead) : ''}${body}</div></section>`;
  });

  const meta = d.meta;
  const titleBase = rb(meta.title).replace(/\s*\|\s*KACO Systems.*$/i, '').replace(/\s*\|\s*Uganda.*$/i, '');
  page({ url: `/${key}/`, title: `${titleBase} | KACO Systems`, desc: rb(meta.desc || ''), body: out });
}

/* ---------- Hero carousel (shared by the home page and DJI Enterprise) ----------
   slide = { label, eye, h, p, l: [[text, href], [text, href]], img?, pos?, glow?, prods? }
   `img` makes a full-bleed banner slide (pos = horizontal focal point in %); `prods` makes a studio product lineup.
   srTitle gives the page a visually hidden <h1> when the slide headings are product names. */
const stage = (prods, first) => {
  const load = first ? 'fetchpriority="high"' : 'loading="lazy"';
  const items = prods.map((p, k) => {
    const vars = `--s:${p.s || 1};--w:${p.w || 34}%;--wm:${p.wm || 56}%;--m:${p.m || 0}px;${p.r ? `--r:${p.r};` : ''}${p.dy ? `--dy:${p.dy}px;` : ''}${p.ar ? `--ar:${p.ar};` : ''}--i:${k}`;
    const side = p.side ? ' data-side' : '';
    // `win`: a screenshot shown in a rectangular app window (title bar = the string); `main` raises the centre window
    if (p.win) return `<figure class="win${p.main ? ' main' : ''}"${side} style="${vars}"><div class="win-bar" aria-hidden="true"><i></i><i></i><i></i><span>${esc(p.win)}</span></div><img src="${p.src}" alt="${esc(p.alt)}" ${load} decoding="async"></figure>`;
    const cls = [p.blk && 'blk', p.card && 'card'].filter(Boolean).join(' ');
    return `<img${cls ? ` class="${cls}"` : ''}${side} src="${p.src}" alt="${esc(p.alt)}" style="${vars}" ${load} decoding="async">`;
  });
  return `<div class="stage${prods.some((p) => p.win) ? ' wins' : ''}">${items.join('')}</div>`;
};
const heroCarousel = (slides, { label = 'Featured', srTitle = '', banner = false } = {}) => `<section class="hero${banner ? ' hero--banner' : ''}" aria-roledescription="carousel" aria-label="${esc(label)}">
${srTitle ? `<h1 class="sr-only">${esc(srTitle)}</h1>` : ''}${slides.map((s, i) => {
  const H = i === 0 && !srTitle ? 'h1' : 'h2';
  const [primary, secondary] = s.l;
  return `<div class="slide${s.img ? ' photo' : ''}" role="group" aria-label="${i + 1} of ${slides.length}" style="${s.glow ? `--glow:${s.glow};` : ''}--pos:${s.pos || 70}%">
${s.img ? `<img class="bg" src="${s.img}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">` : ''}
<div class="slide-copy"><span class="eyebrow">${esc(s.eye)}</span><${H} class="display">${esc(s.h)}</${H}><p>${esc(s.p)}</p><div class="actions"><a class="btn light" href="${esc(href(primary[1]))}"${aAttr(primary[1])}>${esc(primary[0])}</a>${secondary ? tl(secondary[0], secondary[1]) : ''}</div></div>${s.prods ? stage(s.prods, i === 0) : ''}</div>`;
}).join('')}
<div class="hero-ctl"><div class="hero-dots" role="tablist" aria-label="Choose slide">${slides.map((s, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="${esc(s.label)}"><i></i></button>`).join('')}</div><button class="hero-pause" type="button" aria-pressed="false" aria-label="Pause slideshow"><svg class="i-pause" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg><svg class="i-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></button></div></section>`;

/* ---------- VENDOR PAGES (each modelled on the vendor's own site; the data lives in tools/vendors.mjs) ----------
   Sections are optional: hero, updates, videos, industries, products (tabbed), discover, then KACO's support + CTA. */
function vendorPage(cfg) {
  const d = C[cfg.content || cfg.key];
  const q = (k) => `/contact/?product=${k}`;
  const pre = cfg.chipPrefix || '';
  const qs = (n) => q(slug(pre && !new RegExp('^' + pre.trim(), 'i').test(n) ? pre + n : n));
  const play = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 6.5v11l9-5.5z"/></svg>';
  const attrs = (h) => (ext(h) ? ' target="_blank" rel="noopener"' : '');
  const PRODUCTS = '/assets/img/products/';
  const imgPath = (f) => (f.startsWith('/') ? f : PRODUCTS + f);
  const bar = [];

  const hero = heroCarousel(cfg.hero.slides, { label: cfg.hero.label, srTitle: cfg.srTitle, banner: !!cfg.hero.banner });

  // latest updates: one lead story + cards
  let updates = '';
  if (cfg.updates) {
    const media = (x) => `<div class="news-media${x.fit === 'contain' ? ' contain' : x.fit === 'light' ? ' contain light' : ''}" style="--pos:${x.pos || 50}%"><img${x.blk ? ' class="blk"' : ''} src="${imgPath(x.img)}" alt="" loading="lazy" decoding="async"></div>`;
    const [lead, ...rest] = cfg.updates.items;
    updates = `<section class="sec" id="updates"><div class="wrap">${head(cfg.updates.title, cfg.updates.lead)}<div class="news rv">
<article class="news-lead">${media(lead)}<div class="news-body"><span class="cat">${esc(lead.cat)}</span><h3>${esc(lead.h)}</h3><p>${esc(lead.p)}</p>${tl('Learn more', lead.href)}</div></article>
${rest.map((x) => `<article class="news-card">${media(x)}<div class="news-body"><span class="cat">${esc(x.cat)}</span><h3>${esc(x.h)}</h3>${x.p ? `<p>${esc(x.p)}</p>` : ''}${tl('Learn more', x.href)}</div></article>`).join('')}</div></div></section>`;
    bar.push(['Updates', '#updates']);
  }

  // videos: official YouTube films, played in-page on click (iframe created on demand)
  let videos = '', modal = '';
  if (cfg.videos) {
    const v = cfg.videos, total = v.items.length + (v.channel ? 1 : 0);
    videos = `<section class="sec grey" id="videos"><div class="wrap">${head(v.title, v.lead)}<div class="vgrid${total === 3 ? ' v3' : ''} rv">
${v.items.map((x) => `<button type="button" class="vcard" data-yt="${x.id}" data-title="${esc(x.title)}"><span class="vthumb"><img src="https://i.ytimg.com/vi/${x.id}/${x.thumb || 'maxresdefault'}.jpg" alt="" loading="lazy" decoding="async"><span class="vplay">${play}</span></span><span class="vbody"><span class="cat">${esc(x.cat)}</span><strong>${esc(x.title)}</strong><span class="tl">Watch video</span></span></button>`).join('\n')}
${v.channel ? `<a class="vcard" href="${v.channel.href}" target="_blank" rel="noopener"><span class="vthumb"><img src="${imgPath(v.channel.img)}" alt="" loading="lazy" decoding="async"><span class="vplay">${play}</span></span><span class="vbody"><span class="cat">${esc(v.channel.cat)}</span><strong>${esc(v.channel.title)}</strong><span class="tl">${esc(v.channel.cta || 'Visit the channel')}</span></span></a>` : ''}
</div></div></section>`;
    modal = `<div class="lb vm" id="vm" role="dialog" aria-modal="true" aria-label="Video player"><button class="x" type="button" aria-label="Close video">${svg.x}</button><div class="vm-frame"></div><p></p></div>`;
    bar.push(['Videos', '#videos']);
  }

  // industries / applications
  let industries = '';
  if (cfg.industries) {
    const i = cfg.industries;
    industries = `<section class="sec" id="industries"><div class="wrap">${head(i.title, i.lead)}<div class="photos short cols" style="--cols:${Math.min(i.items.length, 4)}">
${i.items.map((x) => `<a class="ptile rv" href="${esc(href(x.href))}"${attrs(x.href)}><img src="${imgPath(x.img)}" alt="" loading="lazy" decoding="async" style="object-position:${x.pos || 50}% 50%"><h3>${esc(x.n)}</h3><p>${esc(x.p)}</p><span class="tl">Learn more</span></a>`).join('\n')}</div></div></section>`;
    bar.push([i.nav || 'Industries', '#industries']);
  }

  // products: the vendor's own catalogue structure, tabbed. `more` entries link to a prefilled KACO quote request.
  let products = '';
  if (cfg.products) {
    const P = cfg.products;
    const pcard = (it, wide) => `<article class="pcard${wide ? ' wide' : ''}"><div class="pcard-media${it.dark ? ' dark' : ''}"><img${it.cover ? ` class="cover" style="--pos:${it.cover}%"` : `${it.blk ? ' class="blk"' : ''}${it.zoom ? ` style="--z:${it.zoom}"` : ''}`} src="${imgPath(it.img)}" alt="${esc(it.n)}" loading="lazy" decoding="async"></div>
<div class="pcard-body"><h3>${esc(it.n)}</h3><p class="tag">${esc(it.tag)}</p>${chk(it.specs)}<div class="links-row">${tl('Get a quote', q(it.q))}${it.learn ? tl('Learn more', it.learn) : ''}</div></div></article>`;
    products = `<section class="sec grey" id="products"><div class="wrap">${head(P.title, P.lead)}
<div class="rv" data-tabs><div class="ptabs" role="tablist" aria-label="Product categories">${P.cats.map((c, i) => `<button type="button" role="tab" id="ptab-${i}" aria-controls="ppanel-${i}" aria-selected="${i === 0}">${esc(c.tab)}</button>`).join('')}</div>
${P.cats.map((c, i) => `<div class="ppanel" role="tabpanel" id="ppanel-${i}" aria-labelledby="ptab-${i}"><h3 class="pcat">${esc(c.tab)}</h3>${c.note ? `<p class="pnote">${esc(c.note)}</p>` : ''}<div class="pgrid">${c.items.map((it) => pcard(it, c.items.length === 1)).join('')}</div>
${c.more && c.more.length ? `<div class="chips"><span>Also available</span>${c.more.map((m) => { const o = typeof m === 'string' ? { n: m, href: qs(m), t: `Request a quote for ${m}` } : { n: m.n, href: m.href, t: m.n }; return `<a href="${esc(o.href)}"${attrs(o.href)} title="${esc(o.t)}">${esc(o.n)}</a>`; }).join('')}</div>` : ''}</div>`).join('\n')}</div></div></section>`;
    bar.push(['Products', '#products']);
  }

  // discover / resources
  let discover = '';
  if (cfg.discover) {
    discover = `<section class="sec" id="discover"><div class="wrap">${head(cfg.discover.title || 'Discover')}<div class="disc rv">
${cfg.discover.items.map((x) => `<a href="${esc(href(x.href))}"${attrs(x.href)} style="--pos:${x.pos || 50}%"><img${x.fit === 'contain' ? ' class="contain"' : ''} src="${imgPath(x.img)}" alt="" loading="lazy" decoding="async"><div><h3>${esc(x.n)}</h3><p>${esc(x.p)}</p><span class="tl">Learn more</span></div></a>`).join('\n')}</div></div></section>`;
  }

  // KACO support + closing CTA (copy carried over from the previous page)
  const why = d.secs.find((x) => x.id === 'why-phirez');
  const whyH = why.intro.find((x) => x.tag === 'h2'), whyP = why.intro.find((x) => x.tag === 'p');
  const support = `<section class="sec ${products ? '' : 'grey'}" id="why-kaco"><div class="wrap">${head(whyH.t, whyP && whyP.t)}<div class="cards">${why.cards.map((c) => textCard(c)).join('')}</div></div></section>`;
  bar.push(['Support', '#why-kaco']);
  const end = d.secs[4], endH = end.intro.find((x) => x.tag === 'h2'), endP = end.intro.find((x) => x.tag === 'p');

  page({
    url: `/${cfg.key}/`, title: cfg.title, desc: cfg.desc || rb(d.meta.desc), bodyClass: cfg.theme ? `v-${cfg.theme}` : '',
    body: hero + localbar(cfg.nav, bar) + updates + videos + industries + products + discover + support + ctaBand(endH.t, endP && endP.t, end.links) + modal,
  });
}

/* ---------- HOME ---------- */
function home() {
  // Product lineups for the hero. `s` scales a product against the stage height (cutouts carry different
  // amounts of transparent padding); `blk` marks images shot on an opaque black matte so CSS can lift the matte
  // into the studio backdrop; `win` shows a screenshot in an app window; `side` items are dropped on phones.
  const P = '/assets/img/products/';
  const slides = [
    { label: 'Precision Geospatial', eye: 'Geospatial & Advanced IT', h: "Precision for Africa's built environment", p: 'KACO Systems empowers surveying, mining, construction, utilities, and government organizations with industry-standard Trimble GNSS positioning, DJI Enterprise drone LiDAR, and certified calibration support across Uganda and East Africa.', glow: '#3a424b',
      prods: [{ src: P + 'trimble-r980-product-01.avif', alt: 'Trimble R980 GNSS receiver', s: .9 }, { src: P + 'trimble-s9-product-01.avif', alt: 'Trimble S9 robotic total station', s: 1 }, { src: P + 'trimble-r780-product-01.avif', alt: 'Trimble R780 GNSS receiver', s: .9 }],
      l: [['Explore solutions', '/solutions/'], ['Get a quote', '/contact/']] },
    { label: 'Aerial Mapping & LiDAR', eye: 'DJI Enterprise', h: 'See the whole site from above', p: 'DJI Enterprise drone fleets capturing photogrammetry, thermal imagery, and high-density LiDAR across vast project sites.', glow: '#33404d',
      prods: [{ src: P + 'dji-zenmuse-l2-product-01.png', alt: 'DJI Zenmuse L2 LiDAR payload', s: .66, w: 27, m: -60, side: 1 }, { src: P + 'dji-matrice-350-rtk-product-01.png', alt: 'DJI Matrice 350 RTK enterprise drone', s: 1.8, w: 52, wm: 100 }, { src: P + 'dji-dock-3-product-01.png', alt: 'DJI Dock 3 autonomous drone dock', s: .74, w: 27, m: -60, side: 1 }],
      l: [['Learn more', '/dji-enterprise/'], ['Get a quote', '/contact/?product=dji-enterprise']] },
    { label: 'Enterprise GIS & SDI', eye: 'Esri ArcGIS', h: 'From raw capture to decisions', p: 'Esri ArcGIS deployment and spatial data infrastructure that turns raw field capture into decision-ready intelligence.', glow: '#27414f',
      prods: [{ win: 'ArcGIS Online', src: P + 'esri-arcgis-online-product-01.png', alt: 'ArcGIS Online web GIS', w: 33, ar: 1.35, m: -40, dy: 40, side: 1 }, { win: 'ArcGIS Pro', src: P + 'esri-arcgis-pro-product-01.png', alt: 'ArcGIS Pro desktop GIS', w: 50, ar: 1.35, wm: 92, main: 1 }, { win: 'ArcGIS Enterprise', src: P + 'esri-arcgis-enterprise-product-01.jpg', alt: 'ArcGIS Enterprise spatial infrastructure', w: 33, ar: 1.35, m: -40, dy: -26, side: 1 }],
      l: [['Learn more', '/esri-arcgis/'], ['Talk to a specialist', '/contact/']] },
    { label: 'Service & Training', eye: 'Lifecycle support', h: 'Unrivalled service. Unmatched precision.', p: 'Our certified Kampala calibration lab, HelpDesk engineers, and training academy protect your field crews every step of the way.', glow: '#3d3a37',
      prods: [{ src: P + 'nikon-ac2s-cutout-01.webp', alt: 'Nikon AC-2S automatic level', s: .5, side: 1 }, { src: P + 'spectra-focus50-cutout-01.webp', alt: 'Spectra Geospatial FOCUS 50 robotic total station', s: 1 }, { src: P + 'nikon-xf-cutout-01.webp', alt: 'Nikon XF total station', s: .94 }],
      l: [['Services & support', '/solutions/#services-support'], ['Training academy', '/training/']] },
  ];
  const heroHtml = heroCarousel(slides);

  const brandTiles = [
    { n: 'Trimble Geospatial', p: 'Trimble R12i GNSS With ProPoint & TIP Tilt | S-Series Robotic Total Stations & Trimble Access', h: '/trimble/', i: 'trimble-r980-product-01.avif' },
    { n: 'DJI Enterprise Drones & LiDAR', p: 'Matrice 350 RTK Industrial Survey Drone | Mavic 3 Enterprise & Thermal Multispectral', h: '/dji-enterprise/', i: 'dji-matrice-350-rtk-product-01.png' },
    { n: 'Esri GIS & Spatial Infrastructure', p: 'ArcGIS Pro Advanced Desktop Analytics | ArcGIS Enterprise & Spatial Data Infrastructure', h: '/esri-arcgis/', i: 'esri-arcgis-pro-product-01.png' },
    { n: 'Spectra Geospatial', p: 'FOCUS 35 & FOCUS 50 Robotic Stations | SP85 & SP60 GNSS RTK Receivers', h: '/spectra-geospatial/', i: 'spectra-sp100-product-01.avif' },
    { n: 'Nikon Precision Survey', p: 'Nikon XS & XF Series Mechanical Stations | High-Accuracy Optical Auto-Levels', h: '/nikon/', i: 'nikon-ne100-product-02.png' },
    { n: 'XGRIDS Handheld LiDAR', p: 'Lixel L2 Handheld Mobile SLAM Scanner | Real-Time Colored 3D Point Clouds', h: '/solutions/#laser-scanning', i: 'xgrids-slam-scanner-01.jpg' },
    { n: 'US Radar Ground Penetrating Radar', p: 'Quantum Imager Triple-Frequency GPR | Underground Pipe & Cable Line Tracing', h: '/us-radar/', i: 'usradar-quantum-product-02.avif' },
    { n: 'Seafloor Systems Bathymetry', p: 'EchoBoat Autonomous Survey USV | Singlebeam & Multibeam Sonar Systems', h: '/seafloor-systems/', i: 'seafloor-hydrone-cutout-01.webp' },
    { n: 'Carlson Software & Autodesk', p: 'Carlson SurvCE & SurvPC Field Software | Carlson Mining, Geology & Civil Modules', h: '/autodesk/', i: 'autodesk-logo.jpg' },
  ];
  const mk = (b) => { const [a, ...r] = b.p.split(' | '); return tile({ h: b.n, imgs: [{ src: '/assets/images/vendor-equipment/' + b.i, alt: b.n }], ps: [b.p], lis: [], links: [{ t: 'Learn more', href: b.h }, { t: 'Get a quote', href: `/contact/?product=${slug(b.n.split(' ')[0])}` }] }); };
  const solutions = `<section class="sec" id="solutions"><div class="wrap">${head('Solutions & systems', 'Integrated hardware, aerial mapping, and spatial software engineered to work as one connected workflow — from the field to the office.')}
<div class="tiles t2">${brandTiles.slice(0, 2).map(mk).join('')}</div><div class="tiles t3" style="margin-top:var(--gutter)">${brandTiles.slice(2).map(mk).join('')}</div>
<p class="center rv" style="margin-top:36px">${tl('Explore all solutions, software & IT infrastructure', '/solutions/', 'blue')}</p></div></section>`;

  const stats = `<section class="sec grey" style="padding-block:clamp(48px,6vw,80px)"><div class="wrap"><div class="stats">
  <div class="stat rv"><b data-count="15" data-suffix="+">15+</b><span>Years operational excellence (2011–present)</span></div>
  <div class="stat rv"><b data-count="9">9</b><span>World-class partner brands</span></div>
  <div class="stat rv"><b data-count="100" data-suffix="%">100%</b><span>Authorised service &amp; calibration centre</span></div>
  <div class="stat rv"><b data-count="8" data-suffix="+">8+</b><span>Strategic industries powered</span></div></div></div></section>`;

  const caps = `<section class="sec"><div class="wrap">${head('Essential capabilities for precision field operations', 'Integrated hardware, aerial mapping, and spatial software engineered to work as one connected workflow.')}
<div class="photos">
 <a class="ptile rv" href="/solutions/#gnss-positioning"><img src="/assets/img/hero/gnss-rover-farmland-01.jpg" alt="" loading="lazy"><h3>Precision Survey Hardware</h3><p>Trimble, Spectra &amp; Nikon GNSS receivers, robotic total stations, and 3D laser scanners calibrated to millimeter accuracy.</p><span class="tl">Explore hardware</span></a>
 <a class="ptile rv" href="/solutions/#drones-aerial"><img src="/assets/img/hero/drone-gnss-combo-01.jpg" alt="" loading="lazy"><h3>Aerial Mapping &amp; LiDAR</h3><p>DJI Enterprise drone fleets capturing photogrammetry, thermal imagery, and high-density LiDAR across vast project sites.</p><span class="tl">Explore aerial</span></a>
 <a class="ptile rv" href="/solutions/#esri-gis"><img src="/assets/img/hero/precision-agri-drone-02.jpg" alt="" loading="lazy"><h3>Enterprise GIS &amp; SDI</h3><p>Esri ArcGIS deployment and spatial data infrastructure that turns raw field capture into decision-ready intelligence.</p><span class="tl">Explore GIS</span></a>
</div></div></section>`;

  const about = `<section class="sec grey"><div class="wrap split"><div class="rv"><span class="eyebrow">About KACO Systems</span><h2 style="margin-top:14px">Fifteen years of spatial excellence &amp; lifecycle support</h2>
<p>KACO Systems is Uganda's premier multidisciplinary technology company, combining world-class surveying hardware, cutting-edge drone photogrammetry &amp; LiDAR, enterprise GIS integration, and a certified equipment calibration facility.</p>
<p>We don't just supply equipment — we engineer the complete spatial workflow so your projects run accurately, on time, and on budget.</p><p>${tl('Our story', '/company/', 'blue')}</p></div>
<img class="rv" src="/assets/img/gallery/thumbs/gnss-total-station-setup-01.jpg" alt="KACO survey team setting up GNSS and total station equipment in the field" loading="lazy"></div></section>`;

  // use the card's own sentence copy from the Phirez homepage for industries (one line each)
  const IND = [
    ['Mining, Quarrying & Earthworks', 'Stockpile volumetric audits with drone LiDAR, pit slope stability monitoring with robotic total stations, blast hole pattern navigation, and Carlson mine design workflows.'],
    ['Civil Engineering & Road Construction', 'Centimeter-accurate road corridor surveys, machine control positioning, bridge deflection monitoring, and direct BIM-to-field stakeout with Trimble Access.'],
    ['Land Cadastre & Municipal Administration', 'Establishing national geodetic CORS networks, legal boundary cadastre, digital land registries, and enterprise spatial data infrastructure (SDI) with Esri ArcGIS.'],
    ['Utilities, Energy & Telecom Corridors', 'Power transmission line clearance modeling with drone LiDAR, pipeline routing, and non-destructive subsurface pipe/fiber tracing with US Radar GPR.'],
    ['Agriculture, Forestry & Environment', 'Multispectral NDVI drone surveys for variable-rate fertilization, forest canopy biomass estimation, water basin catchment modeling, and environmental impact assessments.'],
    ['Public Safety, UN & Humanitarian Response', 'Rapid drone situational awareness, refugee settlement micro-planning, flood inundation modeling, and mobile spatial data collection for NGOs and UN agencies.'],
  ];
  // Industries: photo tiles in the style of the vendor pages' industries sections, one per KACO sector, linking to the Industries page
  const SECTORS = [
    ['Mining, Quarrying & Earthworks', 'Stockpile volumes, pit monitoring and blast-hole navigation.', 'drone-survey-quarry-01.jpg', 50, 'mining-quarrying-heavy-e'],
    ['Civil Engineering & Road Construction', 'Corridor surveys, machine control and BIM-to-field stakeout.', 'gnss-construction-site-02.jpg', 50, 'civil-engineering-highwa'],
    ['Land Cadastre & Municipal Administration', 'Geodetic control, legal boundaries and digital land registries.', 'gnss-rover-farmland-01.jpg', 30, 'land-administration-titl'],
    ['Utilities, Energy & Telecom', 'Line clearance, pipeline routing and subsurface tracing.', 'drone-gnss-combo-01.jpg', 50, 'utilities-energy-telecom'],
    ['Agriculture, Forestry & Environment', 'Crop health, canopy biomass and catchment modeling.', 'precision-agri-drone-02.jpg', 60, 'commercial-agriculture-f'],
    ['Public Safety & Humanitarian Response', 'Rapid situational awareness and mobile data collection.', 'drone-deployment-01.jpg', 50, 'public-safety-disaster-r'],
  ];
  const industriesTiles = `<section class="sec" id="industries"><div class="wrap">${head('Industries', 'Six sectors, one certified partner: precision geospatial and IT solutions for the sectors we serve.')}<div class="photos short six cols" style="--cols:3">
${SECTORS.map(([n, d, img, pos, id]) => `<a class="ptile rv" href="/industries/#${id}"><img src="/assets/img/hero/${img}" alt="" loading="lazy" decoding="async" style="object-position:${pos}% 50%"><h3>${esc(n)}</h3><p>${esc(d)}</p><span class="tl">Learn more</span></a>`).join('\n')}</div></div></section>`;

  const industries2 = `<section class="sec" data-rail><div class="wrap">${head('Solutions aligned to how you work', "From large-scale national infrastructure and mining pits to municipal cadastre and disaster response, we configure specialized hardware, analytics, and service packages built for Africa's operating realities.")}</div>
<div class="rail-nav"><button type="button" data-prev aria-label="Previous">${svg.left}</button><button type="button" data-next aria-label="Next">${svg.right}</button></div>
<div class="rail rv" style="padding-inline:max(var(--gutter),calc((100vw - var(--max))/2 + var(--gutter)))">${IND.map((c, i) => `<a class="card" href="/industries/"><div class="num">${String(i + 1).padStart(2, '0')}</div><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p><span class="tl">Learn more</span></a>`).join('')}</div></section>`;

  const cs = [
    ['National Geodetic Control & Infrastructure Cadastral Survey', 'High-accuracy Trimble multi-frequency GNSS receivers establish reliable geodetic baselines and legal parcel boundaries for national infrastructure corridors, even across complex terrain.', '/assets/img/gallery/medium/gnss-static-setup-01.webp', '/projects/#geodetic-control'],
    ['Aerial Drone Photogrammetry & Pit Volumetric Auditing', 'DJI Enterprise RTK drones and Trimble Business Center photogrammetry replace manual stockpile surveys with autonomous 3D surface modeling and cut/fill volume calculation — faster, and with nobody climbing hazardous stockpiles.', '/assets/img/gallery/medium/drone-survey-quarry-01.webp', '/projects/#quarry-volumetrics'],
    ['Multispectral Drone Imagery for Precision Crop Health Optimization', 'Multispectral drone sensing over commercial sugarcane estates generates NDVI vegetation indices that pinpoint nutrient deficiencies, guiding targeted rather than blanket fertilizer application.', '/assets/img/gallery/medium/precision-agri-demo-01.webp', '/projects/#precision-agri'],
  ];
  const spotlights = `<section class="sec grey"><div class="wrap">${head('Capability spotlights & field photography', 'Illustrative examples of the type of work we deliver, not named case studies with client-attributed results.')}
<div class="tiles t3">${cs.map((c) => `<article class="tile photo rv"><h3 style="font-size:1.25rem">${esc(c[0])}</h3><p class="desc">${esc(c[1])}</p>${linksRow([{ t: 'Read the capability', href: c[3] }])}<div class="media"><img src="${c[2]}" alt="" loading="lazy"></div></article>`).join('')}</div></div></section>`;

  const svcs = C.solutions.secs[10].cards.slice(0, 6);
  const services = `<section class="sec dark" id="services"><div class="wrap">${head('Comprehensive services & lifecycle support', 'We ensure your investment delivers maximum productivity and zero unexpected downtime. Our certified service center, HelpDesk engineers, and training academy protect your field crews every step of the way.')}
<div class="cards c3">${svcs.map((c, i) => textCard({ ...c, links: c.links.map((l) => ({ ...l })) }, i + 1)).join('')}</div>
<div class="banner rv" style="background:#fff;color:#000;margin-top:var(--gutter)"><h3 style="color:#000">Unrivalled Service. Unmatched Precision. Maximum Field Uptime.</h3><p style="color:var(--ink-2)">Don't let uncalibrated total stations or sensor drift compromise millions in engineering investments. Book your equipment into our factory-calibrated Kampala laboratory today.</p>
<div class="links-row" style="gap:12px"><a class="btn" href="/contact/?action=service">Book Equipment Service</a><a class="btn ghost" href="tel:${TEL}">Call Service Lab: ${PHONE}</a></div></div></div></section>`;

  const G = ['drone-survey-quarry-01', 'gnss-construction-site-02', 'gnss-static-setup-01', 'precision-agri-drone-02', 'industry-event-02', 'gnss-training-01'];
  const gcap = ['Drone survey team at a quarry site', 'GNSS survey team on a construction site', 'GNSS static setup', 'Agricultural spray drone beside a sugarcane field', 'Team member presenting at a GIS industry conference', 'GNSS field training session overlooking Kampala'];
  const gallery = `<section class="sec"><div class="wrap">${head('See our precision systems in the field')}<div class="strip rv">${G.map((g, i) => `<a href="/gallery/" aria-label="${esc(gcap[i])}"><img src="/assets/img/gallery/thumbs/${g}.jpg" alt="${esc(gcap[i])}" loading="lazy"></a>`).join('')}</div><p class="center rv" style="margin-top:28px">${tl('View the full gallery', '/gallery/', 'blue')}</p></div></section>`;

  const cta = `<section class="sec grey"><div class="wrap center rv"><h2 class="title">Ready to equip your team with industry-leading precision?</h2><p class="lead" style="margin-top:14px">Whether you are sourcing Trimble GNSS rovers, upgrading your aerial drone mapping capabilities, designing a national spatial data infrastructure, or scheduling annual equipment calibration — our certified specialists are ready to help.</p>
<div class="links-row" style="margin-top:28px;gap:12px"><a class="btn" href="/contact/">Talk to a specialist</a><a class="btn ghost" href="/contact/?service=calibration">Book equipment service</a></div></div></section>`;

  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'KACO Systems', url: SITE, telephone: PHONE, email: EMAIL, image: SITE + '/kaco-logo.jpg', address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, Unicalo House, Plot 11, Archer Road', addressLocality: 'Kampala', addressCountry: 'UG' }, openingHours: 'Mo-Fr 08:00-17:00' });
  page({ url: '/', title: 'KACO Systems | Precision Geospatial & IT Solutions in Uganda', desc: "KACO Systems supplies Trimble GNSS, DJI Enterprise drones & LiDAR, Esri GIS and certified calibration across Uganda and East Africa.", body: heroHtml + solutions + stats + industriesTiles + about + industries2 + spotlights + services + cta, jsonld: ld });
}

/* ---------- Services (split out of Solutions so "Services" has its own destination) ---------- */
function servicesPage() {
  const sol = C.solutions.secs;
  const sec = sol.find((x) => x.id === 'services-support');
  const h2 = sec.intro.find((x) => x.tag === 'h2'), lead = sec.intro.find((x) => x.tag === 'p');
  const cards = [...sec.cards], banner = cards.pop();
  const end = sol[sol.length - 1], endH = end.intro.find((x) => x.tag === 'h2'), endP = end.intro.find((x) => x.tag === 'p');
  const body = `${localbar('Services', [['Calibration', '#svc-1'], ['Support', '#svc-2'], ['Training', '#svc-3'], ['Survey', '#svc-4'], ['SDI & IT', '#svc-5'], ['Assurance', '#svc-6']])}
<section class="page-hero"><span class="eyebrow">Services &amp; support</span><h1 class="display">${t(h2.t)}</h1><p class="lead">${t(lead.t)}</p></section>
<section class="sec" style="padding-top:8px"><div class="wrap"><div class="cards${cards.length % 3 === 0 ? ' c3' : ''}">${cards.map((c, i) => textCard(c, i + 1).replace('<article class="card rv">', `<article class="card rv" id="svc-${i + 1}">`)).join('')}</div>
<div class="banner rv"><h3>${t(banner.h)}</h3>${banner.ps.map((x) => `<p>${t(x)}</p>`).join('')}<div class="links-row">${banner.links.map((l, i) => `<a class="btn ${i ? 'ghost on-dark' : 'light'}" href="${esc(href(l.href))}"${aAttr(l.href)}>${t(l.t)}</a>`).join('')}</div></div></div></section>
${ctaBand(endH.t, endP && endP.t, end.links)}`;
  page({ url: '/services/', title: 'Services & Certified Support | KACO Systems', desc: 'Certified calibration, HelpDesk support, training, contract survey, spatial data infrastructure and technology assurance from KACO Systems in Kampala.', body });
}

/* ---------- Gallery ---------- */
function galleryPage() {
  const g = C.gallery.secs;
  const sec = g.find((s) => s.id === 'gallery-grid');
  const items = sec.imgs.map((im0, i) => ({ src: im0.src.includes('/thumbs/') ? im(im0.src) : im0.src.replace('/assets/images/gallery/', '/assets/img/gallery/thumbs/'), cap: rb(sec.intro[i]?.t || im0.alt) }));
  items.forEach((it) => { if (!fs.existsSync(path.join(ROOT, it.src))) IMG_MISSING.add(it.src); });
  const body = `<section class="page-hero"><span class="eyebrow">Field gallery</span><h1 class="display">Our work in the field</h1><p class="lead">Real KACO Systems field work: GNSS surveys, drone mapping, precision-agriculture demonstrations and industry events across Uganda.</p></section>
<section class="sec" style="padding-top:8px"><div class="wrap"><div class="masonry">${items.map((it, i) => `<button type="button" data-lb="${it.src}" data-cap="${esc(it.cap)}" aria-label="View photo: ${esc(it.cap)}"><img src="${it.src}" alt="${esc(it.cap)}" loading="${i < 6 ? 'eager' : 'lazy'}" decoding="async"></button>`).join('')}</div></div></section>
${ctaBand('Want work like this on your next project?', '', [{ t: 'Talk to a specialist', href: '/contact/' }, { t: 'Explore solutions', href: '/solutions/' }])}
<div class="lb" id="lb" role="dialog" aria-label="Photo viewer" aria-modal="true"><button class="x" type="button" aria-label="Close">${svg.x}</button><button class="pv" type="button" aria-label="Previous">${svg.left}</button><img alt=""><button class="nx" type="button" aria-label="Next">${svg.right}</button><p></p></div>`;
  page({ url: '/gallery/', title: 'Field Gallery | KACO Systems', desc: 'Photos of KACO Systems GNSS surveys, drone mapping, precision-agriculture demonstrations and training across Uganda.', body });
}

/* ---------- Contact ---------- */
function contactPage() {
  const body = `<section class="page-hero"><span class="eyebrow">Contact</span><h1 class="display">Let's start a conversation</h1><p class="lead">Tell us about your project and our team will get back to you shortly.</p></section>
<section class="sec" style="padding-top:8px"><div class="wrap"><div class="contact-grid">
<div class="rv"><div class="info-list">
<div><h3>Head office · Archer Road HQ</h3><p>2nd Floor, Unicalo House, Plot 11, Archer Road<br>P.O. Box 111999, Kampala, Uganda</p></div>
<div><h3>Phone</h3><a href="tel:${TEL}">${PHONE}</a></div>
<div><h3>WhatsApp</h3><a href="${WA}" target="_blank" rel="noopener">${PHONE}</a></div>
<div><h3>Email</h3><a href="mailto:${EMAIL}">${EMAIL}</a></div>
<div><h3>Office hours</h3><p>Mon–Fri, 8:00 AM – 5:00 PM (EAT)</p></div></div>
<div class="links-row" style="justify-content:flex-start;margin-top:22px;gap:12px"><a class="btn" href="/contact/?action=service">Book instrument service</a><a class="btn ghost" href="${WA}" target="_blank" rel="noopener">Chat on WhatsApp</a></div></div>
<form class="form rv" id="contact-form" action="https://formsubmit.co/info@kaco.ug" method="POST" data-endpoint="${FORM}" novalidate>
<h2>Send us a message</h2>
<div class="two"><div class="fld"><label for="f-name">Full name <small>required</small></label><input id="f-name" name="name" required autocomplete="name" aria-describedby="e-name"><span class="err" id="e-name"></span></div><div class="fld"><label for="f-org">Organisation</label><input id="f-org" name="organisation" autocomplete="organization"></div></div>
<div class="two"><div class="fld"><label for="f-email">Email <small>required</small></label><input id="f-email" name="email" type="email" required autocomplete="email" inputmode="email" aria-describedby="e-email"><span class="err" id="e-email"></span></div><div class="fld"><label for="f-phone">Phone / WhatsApp</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"></div></div>
<div class="fld"><label for="f-int">I'm interested in</label><select id="f-int" name="interest"><option>Equipment &amp; product quote</option><option>Calibration &amp; service booking</option><option>Technical support (HelpDesk)</option><option>Training courses</option><option>Contract survey &amp; engineering</option><option>Spatial data infrastructure &amp; IT</option><option>Technology assurance plan</option><option>Something else</option></select></div>
<div class="fld"><label for="f-msg">How can we help? <small>required</small></label><textarea id="f-msg" name="message" required aria-describedby="e-msg"></textarea><span class="err" id="e-msg"></span></div>
<div class="hp" style="display:none" aria-hidden="true"><input name="_honey" tabindex="-1" autocomplete="off"></div>
<input type="hidden" name="_subject" value="New enquiry from kaco.ug"><input type="hidden" name="_template" value="table">
<button class="btn" type="submit">Send message</button><p class="form-note" role="status" aria-live="polite"></p>
<p class="priv">We use your details only to reply to your enquiry. Messages are delivered by FormSubmit, a third-party form service. See our <a href="/privacy/">Privacy Policy</a>.</p></form>
</div>
<div class="map rv"><iframe title="KACO Systems on the map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Unicalo%20House%2C%20Archer%20Road%2C%20Kampala&output=embed"></iframe></div></div></section>`;
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'KACO Systems', telephone: PHONE, email: EMAIL, url: SITE, address: { '@type': 'PostalAddress', streetAddress: '2nd Floor, Unicalo House, Plot 11, Archer Road', addressLocality: 'Kampala', addressCountry: 'UG' } });
  page({ url: '/contact/', title: 'Contact KACO Systems | Kampala, Uganda', desc: 'Contact KACO Systems in Kampala for Trimble, DJI Enterprise and Esri solutions, equipment calibration, training and support.', body, jsonld: ld });
}

/* ---------- Legal ---------- */
function legal(key, title) {
  const f = LEGAL[key];
  let html = '', open = '';
  const flush = () => { if (open) { html += `<ul class="specs">${open}</ul>`; open = ''; } };
  f.slice(1).forEach((x) => {
    if (x.tag === 'li') { open += `<li>${t(x.t)}</li>`; return; }
    flush();
    if (x.t.startsWith('This page was last updated')) return;
    html += x.tag === 'h3' ? `<h2>${t(x.t)}</h2>` : `<p>${t(x.t)}</p>`;
  });
  flush();
  page({ url: `/${key}/`, title: `${title} | KACO Systems`, desc: `${title} for KACO Systems, Kampala, Uganda.`, body: `<section class="page-hero"><h1 class="display">${title}</h1></section><section class="sec" style="padding-top:0"><div class="wrap narrow prose">${html}</div></section>` });
}

/* ---------- 404 ---------- */
function notFound() {
  page({ url: '/404/', title: 'Page not found | KACO Systems', noindex: true, desc: 'Page not found.', body: `<section class="page-hero" style="min-height:60vh;display:grid;align-content:center"><span class="eyebrow">404</span><h1 class="display">Page not found</h1><p class="lead">The page you're looking for has moved or doesn't exist.</p><div class="links-row" style="margin-top:24px;gap:12px"><a class="btn" href="/">Back to home</a><a class="btn ghost" href="/contact/">Contact us</a></div></section>` });
  {
    const f = path.join(ROOT, '404/index.html');
    const content = fs.readFileSync(f, 'utf8')
      .replace('<head>', '<head>\n<base href="/">')
      .replace(/(href|src)="\.\.\//g, '$1="/');
    fs.writeFileSync(path.join(ROOT, '404.html'), content);
    fs.unlinkSync(f);
  }
  fs.rmdirSync(path.join(ROOT, '404'));
  PAGES.pop();
}

/* ---------- run ---------- */
home();
generic('solutions', { eyebrow: 'Solutions & services' });
servicesPage();
generic('industries', { eyebrow: 'Industries' });
generic('projects', { eyebrow: 'Field capabilities' });
generic('training', { eyebrow: 'KACO Training Academy' });
generic('company', { eyebrow: 'Company' });
for (const cfg of Object.values(VENDORS)) vendorPage(cfg);
galleryPage();
contactPage();
legal('privacy', 'Privacy Policy');
legal('terms', 'Terms of Service');
notFound();

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${PAGES.map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(ROOT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`Built ${PAGES.length} pages.`);
if (IMG_MISSING.size) console.warn('Missing images:\n  ' + [...IMG_MISSING].join('\n  '));
