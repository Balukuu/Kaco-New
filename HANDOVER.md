# KACO Systems — new website

Static site (no framework). Open `index.html` via any web server; deploy by uploading the folder.

- `tools/build.mjs` regenerates every page from `tools/content.json` (copy carried over from phirez.ug, rebranded to KACO) — run `node tools/build.mjs`.
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
12. **Hero carousels** (home + vendor pages) share `heroCarousel()`. A slide is either a studio lineup (`prods`; add `blk: 1` for images shot on a black matte, `fade: 1` for screenshots, `card: 1` for logo cards) or a full-bleed photo (`img`). Products without a photo in `assets/img/products/` appear as "Also available" chips that open a prefilled quote request.

## Build notes (design audit)
- `tools/optimize.mjs` writes smaller `.webp` copies of heavy PNG/JPG images (`cd tools && npm i && node optimize.mjs`); `build.mjs` uses them automatically. Re-run it after adding images, then `node tools/build.mjs`.
- "Services" is its own page (`/services/`). "Case Studies" was renamed "Capabilities" because the examples are illustrative, not named client projects.
