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
