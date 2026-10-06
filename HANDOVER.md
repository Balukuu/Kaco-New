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
8. **DJI Enterprise page** (`/dji-enterprise/`, built by `djiPage()` in `tools/build.mjs`) follows enterprise.dji.com. Product names, taglines and headline specs were taken from DJI's product pages on 2026-10-06 — re-check them when DJI launches or renames products. Hero banners and product images are DJI's marketing assets (as on the previous site); confirm KACO's dealer agreement covers using them.
9. **Videos**: the three case-study films are DJI Enterprise's official YouTube uploads, played in a modal through `youtube-nocookie.com` (iframe only created on click). Swap IDs in the `vids` list in `djiPage()`. Thumbnails load from `i.ytimg.com`. The embeds do not play from `file://` — test over http/https.
10. **Hero carousels** (home + DJI page) share `heroCarousel()`. To add a product slide to the home page, add a `prods` list to a slide in `home()`; images shot on a black matte need `blk: 1`. Products without a photo in `assets/img/products/` appear only as "Also available" quote links.

