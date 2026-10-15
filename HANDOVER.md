# KACO Systems — new website

Static site (no framework). Open `index.html` via any web server; deploy by uploading the folder.

- `tools/build.mjs` regenerates every page from `tools/content.json` (copy carried over from phirez.ug, rebranded to KACO) — run `node tools/build.mjs`.
- **Clean URLs** (GitHub Pages): internal links are `/folder/`, never `/folder/index.html`, and canonical/sitemap use the same form. Old `…/index.html` addresses still load and `site.js` rewrites them to the clean URL in the address bar (Pages can't do server redirects). To preview from disk without a web server, build with `FILE_URLS=1 node tools/build.mjs`, then rebuild normally before committing.
- `assets/css/site.css` — DJI-style design system (tokens at the top). `assets/js/site.js` — hero slider, mega menu, lightbox, form.
- Design reference: dji.com/global (DJI palette #000/#fff/#303233/#f5f6f7, Open Sans body, Montserrat headings, 48px header, product tiles, sticky local bar). DJI's own "Dji" typeface is proprietary and is **not** used — Montserrat is the closest free match.

## Confirm before launch
1. **Contact details** are Phirez's (Unicalo House, Archer Road, +256 783 549 770, Mon–Fri 8–5). Replace if KACO differs (search `build.mjs` for `ADDR`, `PHONE`, `TEL`, `WA`).
2. **Company claims** (founded 2011, "15+ years", Authorised Trimble Distributor, Esri Silver Partner, "9 partner brands") were carried over verbatim — verify they apply to KACO.
3. **Contact form** posts to FormSubmit → info@kaco.ug. After deploy, send one test and click the activation email.
4. **Duplicate content**: copy is near-identical to phirez.ug. Consider rewording key pages to avoid SEO duplicate-content penalties.
5. Privacy/Terms are boilerplate from the Phirez site — need legal review.
6. Careers email was changed to info@kaco.ug (no careers@ mailbox known). Social links not included (none supplied).
7. Old placeholder folder `images/` is no longer used and can be deleted.
8. **Vendor pages** (`/trimble/`, `/dji-enterprise/`, `/esri-arcgis/`, `/spectra-geospatial/`, `/nikon/`, `/us-radar/`, `/seafloor-systems/`, `/autodesk/`, `/datamine-software/`, `/ibm-tape/`) are all built by `vendorPage()` in `tools/build.mjs` from plain data in `tools/vendors.mjs` — hero slides, latest updates, videos, industries, tabbed products, discover links. Each is modelled on the vendor's own site; names, taglines, headline specs and links were taken from those sites on 2026-10-06. Re-check them when a vendor launches or renames a product. Every section is optional (IBM has no video block). The old copy for support cards and the closing CTA still comes from `tools/content.json` (sections `why-phirez` and the last section).
9. **Media rights**: hero banners and product images are the vendors' marketing assets (as on the previous site); confirm KACO's dealer agreements cover them. Industry tiles use KACO's own field photos from `assets/img/hero/`.
10. **Videos**: only official vendor-channel YouTube uploads, each ID checked against YouTube oEmbed (author + embeddable) on 2026-10-06. They play in a modal via `youtube-nocookie.com` (iframe created on click) and do not play from `file://` — test over http/https. Thumbnails load from `i.ytimg.com`; a few videos lack the high-res size, so `vendors.mjs` sets `thumb` per video. IBM had no verified official video, so none is shown.
11. **Links**: 121 of 131 external vendor links returned 200 when checked. Ten (Autodesk, Esri newsroom, IBM docs) block scripted requests, so they could not be verified automatically — click them once after launch.
12. **Hero carousels** (home + vendor pages) share `heroCarousel()`. A slide is either a studio lineup (`prods`; `win: 'Title'` shows a screenshot in a rectangular app window, `card: 1` is for logo cards, `blk: 1` lifts images shot on a black matte) or a full-bleed photo (`img`). The FOCUS 50, Nikon XF and AC-2S photos use real transparent cutouts (`*-cutout-01.webp` in `assets/img/products/`) rather than `blk`, which left ragged edges. Products without a photo in `assets/img/products/` appear as "Also available" chips that open a prefilled quote request.

## Link preview card (WhatsApp / Facebook / LinkedIn / X)
- Every page shares `assets/img/og-kaco.jpg` (1200×630, ~170 KB — keep it under ~300 KB or WhatsApp drops the image). It is set in `page()` in `tools/build.mjs` together with `og:image:width/height/alt`.
- White card: copy + CTA on the left, a device lineup (Trimble R980/S9/X9, Spectra FOCUS 50, DJI Matrice 350 RTK) on the right, and a partner-logo strip along the bottom (Trimble, DJI, Esri, Spectra, Nikon, US Radar, Seafloor, Autodesk). Devices and logos come from `assets/img/products/`; the `.crop` wrappers trim their padding. It is white on purpose — the vendor logos are JPGs on white.
- Source is `tools/og-card.html`. To change the text, devices or logos, edit it, then:
  `google-chrome --headless=new --allow-file-access-from-files --window-size=1200,630 --virtual-time-budget=8000 --screenshot=/tmp/og.png file://$PWD/tools/og-card.html` and save `/tmp/og.png` as a JPEG (quality ~85) to `assets/img/og-kaco.jpg`.
- **Preview caching:** WhatsApp/Facebook cache a link's preview. If you change the card, give it a new filename (and update `build.mjs`), then re-scrape at developers.facebook.com/tools/debug/ — or share the link with a throwaway query, e.g. `https://kaco.ug/?v=2`.

## Build notes (design audit)
- `tools/optimize.mjs` writes smaller `.webp` copies of heavy PNG/JPG images (`cd tools && npm i && node optimize.mjs`); `build.mjs` uses them automatically. Re-run it after adding images, then `node tools/build.mjs`.
- "Services" is its own page (`/services/`). "Case Studies" was renamed "Capabilities" because the examples are illustrative, not named client projects.
