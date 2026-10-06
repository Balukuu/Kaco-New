// KACO Systems — vendor page data. Each entry drives vendorPage() in build.mjs, so a page is just data:
//   hero      carousel slides: `prods` = studio product lineup, `img` = full-bleed photo (see heroCarousel)
//   updates   one lead story + cards          videos     official YouTube films (id verified via oEmbed) + channel card
//   industries / products (tabbed) / discover   — every section is optional.
// Product names, taglines and headline specs follow each vendor's own site (checked 2026-10-06); `learn` links are real vendor URLs.
const IMG = '/assets/img/';
const P = IMG + 'products/';
const H = IMG + 'hero/';
const q = (k) => `/contact/?product=${k}`;
const yt = (h) => `https://www.youtube.com/${h}`;

// KACO's own resources, reused as "Discover" cards
const KACO = {
  training: { n: 'KACO Training Academy', p: 'Hands-on, instructor-led courses for field crews and office teams, delivered in Kampala.', href: '/training/', img: H + 'gnss-training-01.jpg', pos: 50 },
  calibration: { n: 'Calibration & service', p: 'Our Kampala lab services, calibrates and supports your instruments so they stay survey-ready.', href: '/solutions/#services-support', img: H + 'gnss-equipment-loadout-01.jpg', pos: 50 },
};

export const VENDORS = {
  /* ------------------------------------------------------------------ DJI ENTERPRISE ------------------------------------------------------------------ */
  'dji-enterprise': {
    key: 'dji-enterprise', theme: 'dji', nav: 'DJI Enterprise', chipPrefix: 'DJI ',
    title: 'DJI Enterprise Drones, LiDAR & Docks in Uganda | KACO Systems',
    srTitle: 'DJI Enterprise drones, LiDAR and docks in Uganda',
    hero: {
      label: 'DJI Enterprise featured products', banner: true,
      slides: [
        { label: 'DJI Matrice 400', eye: 'Drone', h: 'DJI Matrice 400', p: 'Engineered for excellence, designed for versatility.', img: P + 'dji-matrice-400-hero-01.jpg', pos: 56, l: [['Get a quote', q('dji-matrice-400')], ['Learn more', 'https://enterprise.dji.com/matrice-400']] },
        { label: 'Zenmuse L3', eye: 'LiDAR payload', h: 'Zenmuse L3', p: 'See through, far and true.', img: P + 'dji-zenmuse-l3-hero-01.jpg', pos: 64, l: [['Get a quote', q('dji-zenmuse-l3')], ['Learn more', 'https://enterprise.dji.com/zenmuse-l3']] },
        { label: 'DJI Dock 3', eye: 'Remote operations', h: 'DJI Dock 3', p: 'Rise to any challenge.', img: P + 'dji-dock-3-hero-01.jpg', pos: 66, l: [['Get a quote', q('dji-dock-3')], ['Learn more', 'https://enterprise.dji.com/dock-3']] },
        { label: 'DJI Matrice 4 Series', eye: 'Drone', h: 'DJI Matrice 4 Series', p: 'The age of intelligent flight.', img: P + 'dji-matrice-4-series-hero-01.jpg', pos: 50, l: [['Get a quote', q('dji-m4-series')], ['Learn more', 'https://enterprise.dji.com/matrice-4-series']] },
        { label: 'DJI FlightHub 2', eye: 'Software', h: 'DJI FlightHub 2', p: 'Fly with cloud intelligence.', img: P + 'dji-flighthub-2-hero-01.jpg', pos: 74, l: [['Get a quote', q('dji-flighthub-2')], ['Learn more', 'https://enterprise.dji.com/flighthub-2']] },
        { label: 'Dock as First Responder', eye: 'Public safety', h: 'Dock as First Responder', p: 'Launch on alert, eyes on scene first.', img: P + 'dji-dock-first-responder-hero-01.jpg', pos: 80, l: [['Get a quote', q('dji-dock-3')], ['Learn more', 'https://enterprise.dji.com/dock-3']] },
        { label: 'DJI O4 Ground Station', eye: 'Accessory', h: 'DJI O4 Ground Station', p: 'Reach farther, stay aware.', img: P + 'dji-o4-ground-station-hero-01.jpg', pos: 76, l: [['Get a quote', q('dji-o4-ground-station')], ['Learn more', 'https://enterprise.dji.com/o4-ground-station']] },
        { label: 'DJI AP100 Parachute', eye: 'Accessory', h: 'DJI AP100 Parachute', p: 'For the priceless below.', img: P + 'dji-ap100-parachute-hero-01.jpg', pos: 58, l: [['Get a quote', q('dji-ap100')], ['Learn more', 'https://enterprise.dji.com/ap100-parachute']] },
      ],
    },
    updates: {
      title: 'Latest from DJI Enterprise',
      items: [
        { cat: 'Geospatial', h: 'Zenmuse L3: long-range, high-accuracy aerial LiDAR', p: "DJI's first long-range LiDAR system pairs a 1535 nm sensor reaching up to 950 m with dual 100MP mapping cameras and a high-precision POS, covering up to 100 km² a day on the Matrice 400.", img: P + 'dji-zenmuse-l3-hero-01.jpg', pos: 64, href: 'https://enterprise.dji.com/news/detail/zenmuse-l3-release' },
        { cat: 'Public Safety', h: 'From drone to dock as first responder: the next evolution of DFR', img: P + 'dji-dock-first-responder-hero-01.jpg', pos: 80, href: 'https://enterprise.dji.com/dock-3' },
        { cat: 'Industry', h: 'Matrice 400 sets a new standard for long-endurance aerial missions', img: P + 'dji-matrice-400-hero-01.jpg', pos: 56, href: 'https://enterprise.dji.com/news/detail/matrice-400-release' },
        { cat: 'Industry', h: 'Matrice 4 Series: the age of intelligent flight', img: P + 'dji-matrice-4-series-hero-01.jpg', pos: 50, href: 'https://enterprise.dji.com/matrice-4-series' },
      ],
    },
    videos: {
      title: 'Case study videos', lead: 'See how DJI Enterprise drones work in the field.',
      items: [
        { id: 'ieMpv2EQjlU', cat: 'Public Safety', title: 'Fighting Wildfires With DJI Matrice 4T to Save Time and Lives' },
        { id: 'D23O3OGMevc', cat: 'AEC & Surveying', title: 'DJI Zenmuse L2: Using LiDAR Technology for Land Surveying Projects' },
        { id: 'AsrPtDmtXu0', cat: 'Public Safety', title: 'Protecting Iceland from Volcanic Eruptions with DJI Drones' },
      ],
      channel: { href: yt('@DJIEnterprise'), cat: 'DJI Enterprise on YouTube', title: 'More case studies and product films', img: P + 'dji-drone-pair-01.jpg' },
    },
    industries: {
      title: 'Industries', lead: 'Three ways DJI Enterprise puts aerial intelligence to work.',
      items: [
        { n: 'Public Safety', p: 'Give responders accurate, timely aerial intelligence to better serve their communities.', img: P + 'dji-dock-first-responder-hero-01.jpg', pos: 68, href: 'https://enterprise.dji.com/public-safety' },
        { n: 'Geospatial', p: 'Digitize assets and manage projects with drone mapping, photogrammetry and LiDAR.', img: P + 'dji-drone-flight-01.jpg', pos: 50, href: 'https://enterprise.dji.com/geospatial' },
        { n: 'Inspection', p: 'Safely inspect and manage assets, equipment and infrastructure from the air.', img: P + 'dji-dock-3-hero-01.jpg', pos: 70, href: 'https://enterprise.dji.com/inspection' },
      ],
    },
    products: {
      title: 'DJI Enterprise products', lead: "DJI's current enterprise line-up, supplied and supported by KACO Systems across Uganda and East Africa.",
      cats: [
        { tab: 'Drones', note: 'Aerial tools for your daily tasks', more: ['Matrice 4D Series', 'Matrice 30 Series', 'FlyCart 100', 'FlyCart 30'], items: [
          { n: 'DJI Matrice 400', tag: 'Engineered for excellence, designed for versatility', specs: ['59-minute flight time', 'Up to 6 kg payload capacity', 'Rotating LiDAR and mmWave radar obstacle sensing'], img: 'dji-matrice-400-hero-01.jpg', cover: 56, learn: 'https://enterprise.dji.com/matrice-400', q: 'dji-matrice-400' },
          { n: 'DJI Matrice 350 RTK', tag: 'Fully powered to forge ahead', specs: ['55-minute flight time', 'IP55 weather rating', '6-direction sensing and positioning'], img: 'dji-matrice-350-rtk-product-01.png', zoom: 1.15, learn: 'https://enterprise.dji.com/matrice-350-rtk', q: 'dji-m350' },
          { n: 'DJI Matrice 4 Series', tag: 'The age of intelligent flight', specs: ['Matrice 4E for surveying, mapping and construction', 'Matrice 4T for inspection and public safety', 'O4 Enterprise video transmission'], img: 'dji-matrice-4-series-product-01.png', zoom: 1.15, learn: 'https://enterprise.dji.com/matrice-4-series', q: 'dji-m4-series' },
          { n: 'DJI Mavic 3 Enterprise Series', tag: 'Portable mapping and inspection', specs: ['45-minute flight time', 'Mechanical shutter camera with RTK module support', 'Thermal version with 640×512 sensor'], img: 'dji-mavic-3-enterprise-product-01.png', zoom: 1.15, learn: 'https://enterprise.dji.com/mavic-3-enterprise', q: 'dji-mavic-3-enterprise' },
        ] },
        { tab: 'Payloads', note: 'Gather data from multiple angles', more: ['Zenmuse S1', 'Zenmuse V1', 'Zenmuse H30 Series', 'Zenmuse H20N', 'Zenmuse H20 Series'], items: [
          { n: 'Zenmuse L3', tag: 'See through, far and true', specs: ['LiDAR range up to 950 m at 10% reflectivity', 'Dual 100MP RGB mapping cameras', 'Up to 100 km² of coverage per day'], img: 'dji-zenmuse-l3-hero-01.jpg', cover: 64, learn: 'https://enterprise.dji.com/zenmuse-l3', q: 'dji-zenmuse-l3' },
          { n: 'Zenmuse L2', tag: 'Integrated LiDAR and RGB for surveying', specs: ['5 LiDAR returns', '250 m detection range', 'Real-time point cloud coloring'], img: 'dji-zenmuse-l2-product-01.png', learn: 'https://enterprise.dji.com/zenmuse-l2', q: 'dji-zenmuse-l2' },
          { n: 'Zenmuse P1', tag: 'Full-frame photogrammetry', specs: ['45MP full-frame sensor', 'Interchangeable fixed-focus lenses', 'Smart oblique capture'], img: 'dji-zenmuse-p1-product-01.png', learn: 'https://enterprise.dji.com/zenmuse-p1', q: 'dji-zenmuse-p1' },
        ] },
        { tab: 'Docks', note: 'Remote drone operation, for roads less traveled', more: ['Dock 2', 'Dock'], items: [
          { n: 'DJI Dock 3', tag: 'Rise to any challenge', specs: ['The first DJI dock adaptable for vehicle mounting', 'Works with Matrice 4D and 4TD drones', '24/7 remote operations through FlightHub 2'], img: 'dji-dock-3-product-01.png', learn: 'https://enterprise.dji.com/dock-3', q: 'dji-dock-3' },
        ] },
        { tab: 'Software', note: 'Create digital transformation', more: ['FlightHub 2 On-Premises', 'DJI Terra', 'Modify', 'DeliveryHub', 'Cloud API', 'Mobile SDK', 'Payload SDK'], items: [
          { n: 'DJI FlightHub 2', tag: 'Fly with cloud intelligence', specs: ['Remote operation and control', 'Flight planning and route management', 'Secure third-party integration through the API'], img: 'dji-flighthub-2-hero-01.jpg', cover: 74, learn: 'https://enterprise.dji.com/flighthub-2', q: 'dji-flighthub-2' },
        ] },
        { tab: 'Accessories', note: 'Expand your capabilities', more: ['FlightHub 2 AIO', 'Manifold 3', 'D-RTK 3 Multifunctional Station', 'SkyPort V2', 'X-Port'], items: [
          { n: 'DJI AP100 Parachute', tag: 'For the priceless below', specs: ['Response time under 600 ms', 'Descent rate below 5 m/s', 'Manual or automatic deployment'], img: 'dji-ap100-parachute-hero-01.jpg', cover: 58, learn: 'https://enterprise.dji.com/ap100-parachute', q: 'dji-ap100' },
          { n: 'DJI O4 Ground Station', tag: 'Reach farther, stay aware', specs: ['12-antenna array with automatic multi-band selection', 'Gateway mode connects straight to FlightHub 2', 'Built for 24/7 unattended operations'], img: 'dji-o4-ground-station-hero-01.jpg', cover: 76, learn: 'https://enterprise.dji.com/o4-ground-station', q: 'dji-o4-ground-station' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'Learning Center', p: 'Explore new features and courses to optimize your aerial workflows and boost productivity.', href: 'https://enterprise-insights.dji.com/learning-center', img: P + 'dji-dock-3-hero-01.jpg', pos: 66 },
      { n: 'Blogs', p: 'Read real-world case studies and the latest updates.', href: 'https://enterprise-insights.dji.com/blog', img: P + 'dji-matrice-4-series-hero-01.jpg', pos: 50 },
      { n: 'DJI Care Enterprise', p: 'An accident protection solution that gives you and your business peace of mind.', href: 'https://enterprise.dji.com/djicare-enterprise', img: P + 'dji-drone-pair-01.jpg', pos: 50 },
      { n: 'Fly Safe', p: 'Fly safely and responsibly with the latest tips, regulatory links and instructional videos.', href: 'https://www.dji.com/flysafe', img: P + 'dji-flighthub-2-hero-01.jpg', pos: 74 },
    ] },
  },

  /* ------------------------------------------------------------------ TRIMBLE ------------------------------------------------------------------ */
  trimble: {
    key: 'trimble', theme: 'trimble', nav: 'Trimble Geospatial', chipPrefix: 'Trimble ',
    title: 'Trimble GNSS, Total Stations & 3D Scanning in Uganda | KACO Systems',
    srTitle: 'Trimble Geospatial survey equipment in Uganda',
    desc: 'Trimble R-series GNSS, S-series total stations, X-series 3D laser scanners and Trimble Business Center, supplied, calibrated and supported by KACO Systems across Uganda and East Africa.',
    hero: {
      label: 'Trimble featured products',
      slides: [
        { label: 'Survey with confidence', eye: 'Trimble Geospatial', h: 'Survey with confidence at every turn', p: 'High-precision GNSS, total stations and scanners that help surveyors capture and analyze data faster, supplied and supported by KACO across Uganda and East Africa.', glow: '#2c4a63',
          prods: [{ src: P + 'trimble-r980-product-01.avif', alt: 'Trimble R980 GNSS system', s: .88 }, { src: P + 'trimble-x9-product-01.webp', alt: 'Trimble X9 3D laser scanner', s: 1 }, { src: P + 'trimble-s9-product-01.avif', alt: 'Trimble S9 total station', s: .94 }],
          l: [['Get a quote', q('trimble')], ['Explore products', '#products']] },
        { label: 'GNSS systems', eye: 'GNSS', h: 'Trimble GNSS systems', p: 'From the everyday R580 to the ultra-rugged R780 and the R980 for peak accuracy in remote locations.', glow: '#33485c',
          prods: [{ src: P + 'trimble-r580-product-01.avif', alt: 'Trimble R580 GNSS system', s: .88 }, { src: P + 'trimble-r980-product-01.avif', alt: 'Trimble R980 GNSS system', s: 1 }, { src: P + 'trimble-r780-product-01.avif', alt: 'Trimble R780 GNSS system', s: .88 }],
          l: [['Get a quote', q('trimble-gnss')], ['Learn more', 'https://geospatial.trimble.com/en/products/hardware/gnss-systems']] },
        { label: 'Total stations', eye: 'Total stations', h: 'Trimble S-series total stations', p: 'Robotic, Autolock and mechanical total stations for every precision class, from the S5 to the S9 HP.', img: P + 'trimble-gnss-total-station-01.jpg', pos: 50,
          l: [['Get a quote', q('trimble-total-station')], ['Learn more', 'https://geospatial.trimble.com/en/products/hardware/total-stations']] },
        { label: '3D scanning & mapping', eye: 'Reality capture', h: 'Scan and map with confidence', p: 'The X9 laser scanner and MX90 mobile mapping system capture complete, accurate site data fast.', glow: '#2c4a63',
          prods: [{ src: P + 'trimble-x9-product-01.webp', alt: 'Trimble X9 3D laser scanner', s: 1 }, { src: P + 'trimble-mx90-product-01.webp', alt: 'Trimble MX90 mobile mapping system', s: 1 }],
          l: [['Get a quote', q('trimble-x9')], ['Learn more', 'https://geospatial.trimble.com/en/products/hardware/laser-scanning']] },
        { label: 'Trimble Business Center', eye: 'Office software', h: 'From field to finish', p: 'Trimble Business Center turns GNSS, total station, scanner and drone data into client-ready deliverables.', glow: '#33485c',
          prods: [{ src: P + 'trimble-business-center-product-02.avif', alt: 'Trimble Business Center on a desktop monitor', s: 1, w: 52, wm: 100 }],
          l: [['Get a quote', q('trimble-business-center')], ['Learn more', 'https://geospatial.trimble.com/en/products/software/trimble-business-center']] },
      ],
    },
    updates: {
      title: 'Latest from Trimble Geospatial',
      items: [
        { cat: 'New hardware', h: 'Trimble ST30 smart target', p: 'A smart target for fast, confident performance on any jobsite: measure and move faster while boosting accuracy and minimizing errors.', img: P + 'trimble-gnss-total-station-01.jpg', pos: 50, href: 'https://geospatial.trimble.com/en/products/hardware/trimble-st30' },
        { cat: 'Scanning', h: 'Trimble X9: reality capture made simple', img: P + 'trimble-x9-product-01.webp', fit: 'contain', href: 'https://geospatial.trimble.com/en/products/hardware/trimble-x9' },
        { cat: 'GNSS', h: 'Trimble R980: peak accuracy in remote locations', img: P + 'trimble-r980-product-01.avif', fit: 'contain', href: 'https://geospatial.trimble.com/en/products/hardware/trimble-r980' },
        { cat: 'Software', h: 'Trimble Business Center: field-to-finish survey CAD', img: P + 'trimble-business-center-product-02.avif', fit: 'contain', href: 'https://geospatial.trimble.com/en/products/software/trimble-business-center' },
      ],
    },
    videos: {
      title: 'Trimble in action', lead: 'Official films from Trimble Geospatial.',
      items: [
        { id: 'qTvwg886hZ4', cat: 'GNSS', title: 'Introducing the Trimble R980 GNSS System' },
        { id: 'O3B_6U6TQMc', cat: 'Scanning', title: 'Introducing the Trimble X9 3D Laser Scanning System' },
        { id: 'D4RKimnEtI8', thumb: 'sddefault', cat: 'Software', title: 'Trimble Business Center: Overview' },
      ],
      channel: { href: yt('@TrimbleGeospatial'), cat: 'Trimble Geospatial on YouTube', title: 'More product films and tutorials', img: P + 'trimble-gnss-total-station-01.jpg' },
    },
    industries: {
      title: 'Industries', lead: 'Trimble Geospatial solutions for the sectors we serve.',
      items: [
        { n: 'Surveying and mapping', p: 'Capture and deliver topographic, cadastral and engineering survey data with confidence.', img: H + 'gnss-rover-farmland-01.jpg', pos: 50, href: 'https://geospatial.trimble.com/en/industries/surveying-and-mapping' },
        { n: 'Transportation infrastructure', p: 'Control, stake out and verify roads, rail and bridges from design to as-built.', img: H + 'gnss-construction-site-01.jpg', pos: 50, href: 'https://geospatial.trimble.com/en/industries/transportation-infrastructure' },
        { n: 'Mining', p: 'Measure stockpiles, pits and haul roads accurately and safely.', img: H + 'drone-survey-quarry-01.jpg', pos: 50, href: 'https://geospatial.trimble.com/en/industries/mining' },
        { n: 'Utilities', p: 'Map and manage networks, corridors and assets across wide areas.', img: H + 'drone-gnss-combo-01.jpg', pos: 50, href: 'https://geospatial.trimble.com/en/industries/utilities' },
      ],
    },
    products: {
      title: 'Trimble products', lead: 'Survey and positioning hardware and software, supplied and supported by KACO Systems.',
      cats: [
        { tab: 'GNSS', note: 'Integrated GNSS for everyday work and extreme conditions', more: ['R12i GNSS System', 'R750', 'R780-2LE'], items: [
          { n: 'Trimble R980 GNSS System', tag: 'Peak accuracy in remote locations', specs: ['Proven Trimble GNSS performance', 'Built to overcome challenging conditions', 'Ready for any jobsite'], img: 'trimble-r980-product-01.avif', learn: 'https://geospatial.trimble.com/en/products/hardware/trimble-r980', q: 'trimble-r980' },
          { n: 'Trimble R780 GNSS System', tag: 'Ultra-rugged integrated GNSS', specs: ['Built for the toughest environments', 'Adaptable and scalable', 'Trimble ProPoint positioning'], img: 'trimble-r780-product-01.avif', learn: 'https://geospatial.trimble.com/en/products/hardware/trimble-r780', q: 'trimble-r780' },
          { n: 'Trimble R580 GNSS System', tag: 'Everyday integrated GNSS', specs: ['Trimble ProPoint engine', 'Reliable accuracy in more places', 'Built for productivity'], img: 'trimble-r580-product-01.avif', learn: 'https://geospatial.trimble.com/en/products/hardware/trimble-r580', q: 'trimble-r580' },
          { n: 'Trimble Alloy Reference Receiver', tag: 'Built for any real-time network', specs: ['CORS and base station ready', 'Rugged global deployment', 'Reliable continuous operation'], img: 'trimble-alloy-product-01.avif', q: 'trimble-alloy' },
        ] },
        { tab: 'Total stations', note: 'Robotic, Autolock and mechanical total stations', more: ['S5', 'S7', 'S9 HP', 'ST30 smart target', 'SX12 scanning total station'], items: [
          { n: 'Trimble S9 / S9 HP Total Station', tag: 'Top-tier field technologies', specs: ['Highest Trimble accuracy class', 'Built for monitoring and tunneling', 'Advanced robotic engineering'], img: 'trimble-s9-product-01.avif', learn: 'https://geospatial.trimble.com/en/products/hardware/trimble-s9', q: 'trimble-s9' },
        ] },
        { tab: 'Scanning & mapping', note: 'Reality capture from tripod to vehicle', more: ['SX12 scanning total station'], items: [
          { n: 'Trimble X9 3D Laser Scanner', tag: 'Reality capture made simple', specs: ['Automatic self-calibration', 'Full scan in under 2 minutes', 'In-field auto-registration'], img: 'trimble-x9-product-01.webp', learn: 'https://geospatial.trimble.com/en/products/hardware/trimble-x9', q: 'trimble-x9' },
          { n: 'Trimble X12 3D Laser Scanner', tag: 'High-end scanning for demanding projects', specs: ['2.187 million points per second', '365 m operational range', '80MP HDR color imagery'], img: 'trimble-x12-product-01.png', cover: 50, learn: 'https://geospatial.trimble.com/en/products/hardware/trimble-x12', q: 'trimble-x12' },
          { n: 'Trimble MX90 Mobile Mapping System', tag: 'Leading-edge mobile mapping', specs: ['Intuitive field software', 'Integrated office workflow', 'Field-to-finish solution'], img: 'trimble-mx90-product-01.webp', q: 'trimble-mx90' },
        ] },
        { tab: 'Software', note: 'Field and office software for the whole workflow', more: ['Access', 'Connect', '4D Control', 'SiteVision', 'Inpho', 'eCognition'], items: [
          { n: 'Trimble Business Center', tag: 'Field-to-finish survey CAD', specs: ['GNSS, total station and scanner data in one place', 'Drone photogrammetry processing', 'Client-ready deliverables'], img: 'trimble-business-center-product-02.avif', learn: 'https://geospatial.trimble.com/en/products/software/trimble-business-center', q: 'trimble-business-center' },
        ] },
      ],
    },
    discover: { items: [
      KACO.training, KACO.calibration,
      { n: 'Trimble Geospatial support', p: 'Manuals, downloads and technical help for Trimble Geospatial products.', href: 'https://geospatial.trimble.com/en/support', img: P + 'trimble-gnss-total-station-01.jpg', pos: 50 },
      { n: 'Trimble Business Center trial', p: 'Download a trial of Trimble Business Center and try it on your own survey data.', href: 'https://geospatial.trimble.com/en/products/software/trimble-business-center/trial-download', img: P + 'trimble-x12-product-01.png', pos: 50 },
    ] },
  },

  /* ------------------------------------------------------------------ ESRI ARCGIS ------------------------------------------------------------------ */
  'esri-arcgis': {
    key: 'esri-arcgis', theme: 'esri', nav: 'Esri ArcGIS', chipPrefix: 'Esri ',
    title: 'Esri ArcGIS GIS Software in Uganda | KACO Systems',
    srTitle: 'Esri ArcGIS enterprise GIS software in Uganda',
    desc: 'Esri ArcGIS Pro, ArcGIS Online, ArcGIS Enterprise, Field Maps and Survey123, licensed, deployed and supported by KACO Systems across Uganda and East Africa.',
    hero: {
      label: 'Esri ArcGIS featured products',
      slides: [
        { label: 'ArcGIS platform', eye: 'Esri ArcGIS', h: 'Connect your data through geography', p: 'ArcGIS brings maps, analytics and field data together for organizations across Uganda and East Africa, deployed, licensed and supported by KACO Systems.', glow: '#27414f',
          prods: [{ src: P + 'esri-arcgis-online-product-01.png', alt: 'ArcGIS Online web GIS', s: .6, blk: 1, fade: 1, side: 1 }, { src: P + 'esri-arcgis-pro-product-01.png', alt: 'ArcGIS Pro desktop GIS', s: 1, wm: 100, blk: 1, fade: 1 }, { src: P + 'esri-arcgis-enterprise-product-01.jpg', alt: 'ArcGIS Enterprise spatial infrastructure', s: .6, blk: 1, fade: 1, side: 1 }],
          l: [['Get a quote', q('esri-arcgis')], ['Explore the platform', '#products']] },
        { label: 'Field Maps & Survey123', eye: 'Field data collection', h: 'Capture data where work happens', p: 'ArcGIS Field Maps and Survey123 put smart maps and forms in the hands of your field teams, online or offline.', glow: '#1f4a78',
          prods: [{ src: P + 'esri-field-maps-product-01.jpg', alt: 'ArcGIS Field Maps', s: .9, w: 47, m: -24, card: 1 }, { src: P + 'esri-survey123-product-01.jpg', alt: 'ArcGIS Survey123', s: .9, w: 47, card: 1 }],
          l: [['Get a quote', q('esri-field-maps')], ['Learn more', 'https://www.esri.com/en-us/arcgis/products/arcgis-field-maps/overview']] },
        { label: 'Dashboards & Drone2Map', eye: 'Insight and imagery', h: 'Turn data into decisions', p: 'Share live dashboards with decision-makers and process drone imagery into 2D and 3D products inside ArcGIS.', glow: '#27414f',
          prods: [{ src: P + 'esri-dashboards-product-01.jpg', alt: 'ArcGIS Dashboards', s: .9, w: 47, m: -24, card: 1 }, { src: P + 'esri-drone2map-product-01.jpg', alt: 'ArcGIS Drone2Map', s: .9, w: 47, card: 1 }],
          l: [['Get a quote', q('esri-dashboards')], ['Learn more', 'https://www.esri.com/en-us/arcgis/products/arcgis-dashboards/overview']] },
        { label: 'Utility Network', eye: 'Infrastructure', h: 'Model complex networks', p: 'ArcGIS Utility Network traces, analyzes and manages power, water and telecom assets at enterprise scale.', glow: '#1f4a78',
          prods: [{ src: P + 'esri-utility-network-product-01.jpg', alt: 'ArcGIS Utility Network', s: .95, w: 64, wm: 96, card: 1 }],
          l: [['Get a quote', q('esri-utility-network')], ['Learn more', 'https://www.esri.com/en-us/arcgis/products/arcgis-utility-network/overview']] },
      ],
    },
    updates: {
      title: 'Latest from Esri',
      items: [
        { cat: 'Digital twin', h: "A 3D digital twin of Vietnam's busiest port", p: 'See how a live 3D model built on ArcGIS helps run one of the busiest ports in Vietnam.', img: P + 'esri-arcgis-enterprise-product-01.jpg', fit: 'contain', blk: 1, href: 'https://www.esri.com/about/newsroom/blog/video-the-3d-model-running-vietnams-busiest-port' },
        { cat: 'Government', h: 'Data-driven housing affordability in Utah', img: P + 'esri-dashboards-product-01.jpg', pos: 50, href: 'https://www.esri.com/about/newsroom/blog/utah-data-driven-housing-affordability' },
        { cat: 'Energy', h: 'A GIS team embraces automation to speed up solar site selection', img: P + 'esri-drone2map-product-01.jpg', pos: 50, href: 'https://www.esri.com/about/newsroom/publications/wherenext/a-gis-team-embraces-automation-to-speed-up-site-selection' },
        { cat: 'Learn', h: 'Spatial data science: a free course from Esri Training', img: P + 'esri-field-maps-product-01.jpg', pos: 50, href: 'https://www.esri.com/en-us/training/catalog/5d76dcf7e9ccda09bef61294' },
      ],
    },
    videos: {
      title: 'ArcGIS in action', lead: 'Official videos from Esri.',
      items: [
        { id: '7iYtVIokIow', cat: 'Desktop GIS', title: "What's New in ArcGIS Pro 3.7" },
        { id: 'oFPsOsGFbrI', cat: 'Field data', title: 'ArcGIS Survey123: Collecting Data with the Survey123 Field App' },
        { id: 'rX5EMRa6lRE', cat: 'Enterprise GIS', title: 'ArcGIS Enterprise: An Introduction' },
      ],
      channel: { href: yt('@esri_arcgis'), cat: 'ArcGIS on YouTube', title: 'More tutorials and product videos', img: P + 'esri-arcgis-pro-product-01.png' },
    },
    industries: {
      title: 'Industries', lead: 'Where organizations put ArcGIS to work.',
      items: [
        { n: 'Government', p: 'Planning, land administration and public services run on trusted location data.', img: H + 'industry-event-02.jpg', pos: 50, href: 'https://www.esri.com/en-us/industries/index' },
        { n: 'Utilities & energy', p: 'Model, trace and maintain power, water and telecom networks.', img: H + 'drone-gnss-combo-01.jpg', pos: 50, href: 'https://www.esri.com/en-us/industries/index' },
        { n: 'Agriculture & natural resources', p: 'Monitor land, crops and resources from field to portfolio.', img: H + 'precision-agri-drone-02.jpg', pos: 50, href: 'https://www.esri.com/en-us/industries/index' },
        { n: 'Infrastructure & construction', p: 'Connect design, survey and operations in one geographic view.', img: H + 'gnss-construction-site-01.jpg', pos: 50, href: 'https://www.esri.com/en-us/industries/index' },
      ],
    },
    products: {
      title: 'The ArcGIS platform', lead: 'Licensed, deployed and supported locally by KACO Systems.',
      cats: [
        { tab: 'Platform', note: 'Desktop, web and self-hosted GIS', more: ['ArcGIS Hub', 'ArcGIS StoryMaps', 'ArcGIS Experience Builder', 'ArcGIS Velocity'], items: [
          { n: 'ArcGIS Pro', tag: "The world's leading desktop GIS", specs: ['Advanced 2D and 3D spatial analysis', 'Powerful mapping and visualization', 'Geoprocessing automation'], img: 'esri-arcgis-pro-product-01.png', dark: 1, blk: 1, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-pro/overview', q: 'esri-arcgis-pro' },
          { n: 'ArcGIS Online', tag: 'Complete SaaS mapping platform', specs: ['No installation required', 'Create and share interactive maps', 'Runs entirely in your browser'], img: 'esri-arcgis-online-product-01.png', dark: 1, blk: 1, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-online/overview', q: 'esri-arcgis-online' },
          { n: 'ArcGIS Enterprise', tag: 'Your self-hosted GIS system', specs: ['On-premises, cloud or hybrid', 'Centralized spatial data management', 'Scalable enterprise architecture'], img: 'esri-arcgis-enterprise-product-01.jpg', dark: 1, blk: 1, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-enterprise/overview', q: 'esri-arcgis-enterprise' },
        ] },
        { tab: 'Field', note: 'Collect and manage data in the field', more: ['ArcGIS QuickCapture', 'ArcGIS Workforce'], items: [
          { n: 'ArcGIS Field Maps', tag: 'Mobile field data collection', specs: ['Real-time map navigation', 'Mobile workforce management', 'Offline-capable data capture'], img: 'esri-field-maps-product-01.jpg', cover: 50, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-field-maps/overview', q: 'esri-field-maps' },
          { n: 'ArcGIS Survey123', tag: 'Smart form builder', specs: ['High-quality GIS data surveys', 'Easy-to-use data collection', 'Automated data validation'], img: 'esri-survey123-product-01.jpg', cover: 50, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-survey123/overview', q: 'esri-survey123' },
        ] },
        { tab: 'Insight & imagery', note: 'Dashboards, networks and drone mapping', more: ['ArcGIS Image Analyst', 'ArcGIS GeoAnalytics'], items: [
          { n: 'ArcGIS Dashboards', tag: 'Operational and strategic dashboards', specs: ['Real-time data visualization', 'Tailored to your audience', 'Easy results sharing'], img: 'esri-dashboards-product-01.jpg', cover: 50, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-dashboards/overview', q: 'esri-dashboards' },
          { n: 'ArcGIS Utility Network', tag: 'Models complex utility networks', specs: ['Advanced asset tracing and analysis', 'Built for power, water and telecom', 'Enterprise-grade reliability'], img: 'esri-utility-network-product-01.jpg', cover: 50, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-utility-network/overview', q: 'esri-utility-network' },
          { n: 'ArcGIS Drone2Map', tag: 'Drone photogrammetry in GIS', specs: ['2D and 3D products from drone imagery', 'Seamless ArcGIS integration', 'Fast orthomosaic processing'], img: 'esri-drone2map-product-01.jpg', cover: 50, learn: 'https://www.esri.com/en-us/arcgis/products/arcgis-drone2map/overview', q: 'esri-drone2map' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'Esri Training', p: 'Courses and learning paths for every level, from first map to advanced analysis.', href: 'https://www.esri.com/en-us/training/overview', img: P + 'esri-arcgis-pro-product-01.png', pos: 50 },
      { n: 'Esri industries', p: 'See how organizations in every sector use ArcGIS.', href: 'https://www.esri.com/en-us/industries/index', img: P + 'esri-utility-network-product-01.jpg', pos: 50 },
      { n: 'Esri training from KACO', p: 'Structured ArcGIS Pro, Enterprise and Field Maps courses delivered in Kampala.', href: '/training/', img: H + 'gnss-training-01.jpg', pos: 50 },
      { n: 'Enterprise GIS deployment', p: 'Portal design, geodatabases and migration planned and supported by our team.', href: '/solutions/#esri-gis', img: P + 'esri-arcgis-enterprise-product-01.jpg', pos: 50 },
    ] },
  },

  /* ------------------------------------------------------------------ SPECTRA GEOSPATIAL ------------------------------------------------------------------ */
  'spectra-geospatial': {
    key: 'spectra-geospatial', theme: 'spectra', nav: 'Spectra Geospatial', chipPrefix: 'Spectra ',
    title: 'Spectra Geospatial GNSS & Total Stations in Uganda | KACO Systems',
    srTitle: 'Spectra Geospatial GNSS receivers and total stations in Uganda',
    desc: 'Spectra Geospatial SP100 and SP90m GNSS receivers, FOCUS 50 robotic total stations, Nikon optical instruments and Origin field software, supplied and supported by KACO Systems in Uganda.',
    hero: {
      label: 'Spectra Geospatial featured products',
      slides: [
        { label: 'Spectra Geospatial', eye: 'Spectra Geospatial', h: 'Everyday positioning, built to last', p: 'An established survey brand delivering quality GNSS receivers, robotic total stations and field software for surveying, GIS and construction.', glow: '#2e4a66',
          prods: [{ src: P + 'spectra-sp100-product-01.avif', alt: 'Spectra Geospatial SP100 GNSS receiver', s: .95 }, { src: P + 'spectra-focus50-product-01.avif', alt: 'Spectra Geospatial FOCUS 50 total station', s: 1, blk: 1 }, { src: P + 'spectra-ranger7-product-01.avif', alt: 'Spectra Geospatial Ranger 7 field controller', s: .85 }],
          l: [['Get a quote', q('spectra-geospatial')], ['Explore products', '#products']] },
        { label: 'GNSS receivers', eye: 'GNSS surveying', h: 'SP100 and SP90m GNSS receivers', p: 'The SP100 is everything you need for surveying out of the box; the SP90m adds powerful, ultra-rugged reference-grade performance.', glow: '#33516f',
          prods: [{ src: P + 'spectra-sp100-product-01.avif', alt: 'Spectra Geospatial SP100 GNSS receiver', s: 1 }, { src: P + 'spectra-sp90m-product-01.avif', alt: 'Spectra Geospatial SP90m GNSS receiver', s: .72 }],
          l: [['Get a quote', q('spectra-sp100')], ['Learn more', 'https://spectrageospatial.com/sp100/']] },
        { label: 'Optical surveying', eye: 'Optical surveying', h: 'FOCUS 50 and Nikon total stations', p: 'A customizable robotic total station alongside Nikon XF mechanical total stations with reflectorless EDM.', glow: '#2e4a66',
          prods: [{ src: P + 'spectra-focus50-product-01.avif', alt: 'Spectra Geospatial FOCUS 50 robotic total station', s: 1, blk: 1 }, { src: P + 'nikon-xf-product-01.avif', alt: 'Nikon XF total station', s: .86, blk: 1 }],
          l: [['Get a quote', q('spectra-focus-50')], ['Learn more', 'https://spectrageospatial.com/focus-50-total-station/']] },
        { label: 'Field software', eye: 'Controllers & software', h: 'Origin field software', p: 'A modern, efficient field workflow that handles a full range of projects, on rugged Ranger controllers.', glow: '#33516f',
          prods: [{ src: P + 'spectra-ranger5-product-01.avif', alt: 'Spectra Geospatial Ranger 5 field controller', s: .96, blk: 1 }, { src: P + 'spectra-origin-product-01.avif', alt: 'Spectra Geospatial Origin field software', s: .8 }, { src: P + 'spectra-ranger7-product-01.avif', alt: 'Spectra Geospatial Ranger 7 field controller', s: .9 }],
          l: [['Get a quote', q('spectra-origin')], ['Learn more', 'https://spectrageospatial.com/origin/']] },
      ],
    },
    updates: {
      title: 'Spotlight on Spectra Geospatial',
      items: [
        { cat: 'GNSS', h: 'SP100 GNSS receiver: everything you need for surveying', p: 'A complete surveying GNSS solution with everything in the box, entry-level simplicity and dependable everyday performance.', img: P + 'spectra-sp100-product-01.avif', fit: 'contain', href: 'https://spectrageospatial.com/sp100/' },
        { cat: 'Optical', h: 'FOCUS 50 robotic total station', img: P + 'spectra-focus50-product-01.avif', fit: 'contain', blk: 1, href: 'https://spectrageospatial.com/focus-50-total-station/' },
        { cat: 'Software', h: 'Origin field software', img: P + 'spectra-origin-product-01.avif', fit: 'contain', href: 'https://spectrageospatial.com/origin/' },
        { cat: 'Optical', h: 'Nikon XF series mechanical total stations', img: P + 'nikon-xf-product-01.avif', fit: 'contain', blk: 1, href: 'https://spectrageospatial.com/nikon-xf/' },
      ],
    },
    videos: {
      title: 'Spectra Geospatial in action', lead: 'Official films from Spectra Geospatial.',
      items: [
        { id: 'I40qvA0F96w', thumb: 'sddefault', cat: 'GNSS', title: 'Spectra Geospatial SP100 GNSS Receiver' },
        { id: 'K5VofsQgcEc', cat: 'Optical', title: 'Spectra Geospatial FOCUS 50 Robotic Total Station' },
        { id: 'YZehKRKAX2A', cat: 'Optical', title: 'Spectra Geospatial FOCUS 35 Motorized Total Station' },
      ],
      channel: { href: yt('@spectrageospatial7761'), cat: 'Spectra Geospatial on YouTube', title: 'More product films and how-tos', img: P + 'spectra-focus50-product-01.avif' },
    },
    industries: {
      title: 'Applications', lead: 'Spectra Geospatial serves the survey, GIS and construction markets.',
      items: [
        { n: 'Topographic survey', p: 'Everyday GNSS and robotic positioning for fast, dependable field data.', img: H + 'gnss-rover-farmland-01.jpg', pos: 50, href: '/solutions/#gnss-positioning' },
        { n: 'Construction layout', p: 'Stake out, check and verify work with total stations and controllers.', img: H + 'gnss-construction-site-02.jpg', pos: 50, href: '/solutions/#gnss-positioning' },
        { n: 'GIS & mapping', p: 'Capture accurate positions for asset inventories and field GIS.', img: H + 'drone-gnss-combo-01.jpg', pos: 50, href: '/solutions/#esri-gis' },
      ],
    },
    products: {
      title: 'Spectra Geospatial products', lead: 'GNSS, optical and software, supplied and supported by KACO Systems.',
      cats: [
        { tab: 'GNSS', note: 'Receivers for everyday surveying', more: ['SP60', 'SP85', { n: 'ADL450B UHF radio', href: '/contact/?product=spectra-adl450b' }], items: [
          { n: 'Spectra SP100 GNSS Receiver', tag: 'Complete surveying GNSS solution', specs: ['Everything you need out of the box', 'Entry-level simplicity', 'Dependable everyday performance'], img: 'spectra-sp100-product-01.avif', learn: 'https://spectrageospatial.com/sp100/', q: 'spectra-sp100' },
          { n: 'Spectra SP90m GNSS Receiver', tag: 'Powerful and ultra-rugged GNSS', specs: ['Real-time and post-processing ready', 'Versatile across applications', 'Reference-grade performance'], img: 'spectra-sp90m-product-01.avif', learn: 'https://spectrageospatial.com/sp90m-gnss-receiver-2/', q: 'spectra-sp90m' },
        ] },
        { tab: 'Optical', note: 'Robotic and mechanical total stations', more: ['FOCUS 35', { n: 'Nikon XS', href: 'https://spectrageospatial.com/nikon-xs/' }, { n: 'Nikon N & K mechanical', href: 'https://spectrageospatial.com/nikon-nk-total-stations/' }, { n: 'Nikon theodolites', href: 'https://spectrageospatial.com/nikon-theodolites/' }, { n: 'Nikon autolevels', href: 'https://spectrageospatial.com/nikon-autolevels/' }], items: [
          { n: 'Spectra FOCUS 50 Total Station', tag: 'Customizable robotic total station', specs: ['Automatic target tracking', 'Configurable to your workflow', 'Local calibration support'], img: 'spectra-focus50-product-01.avif', dark: 1, blk: 1, learn: 'https://spectrageospatial.com/focus-50-total-station/', q: 'spectra-focus-50' },
          { n: 'Nikon XF Series Total Stations', tag: 'Mechanical total stations for every job', specs: ['Dual full-face display', 'Clear optics for bright daylight', 'Reflectorless EDM'], img: 'nikon-xf-product-01.avif', dark: 1, blk: 1, learn: 'https://spectrageospatial.com/nikon-xf/', q: 'nikon-xf' },
        ] },
        { tab: 'Software & controllers', note: 'Field software and rugged data collectors', more: [{ n: 'Survey Office', href: 'https://spectrageospatial.com/survey-office/' }, { n: 'Survey Basic', href: 'https://spectrageospatial.com/survey-basic/' }, { n: 'Ranger 710', href: 'https://spectrageospatial.com/ranger-710/' }, { n: 'FOCUS data collector', href: 'https://spectrageospatial.com/focus-dc/' }], items: [
          { n: 'Spectra Origin Field Software', tag: 'Handles a full range of projects', specs: ['Fast and efficient field workflow', 'Modern Spectra interface', 'Straightforward field-to-office transfer'], img: 'spectra-origin-product-01.avif', learn: 'https://spectrageospatial.com/origin/', q: 'spectra-origin' },
          { n: 'Spectra Ranger 7 Field Controller', tag: 'Rugged, cost-effective data collection', specs: ['7-inch sunlight-readable touchscreen', 'Full keypad and Windows 10 Pro', 'Easy-to-use data collection'], img: 'spectra-ranger7-product-01.avif', learn: 'https://spectrageospatial.com/ranger-7/', q: 'spectra-ranger-7' },
          { n: 'Spectra Ranger 5 Field Controller', tag: 'Compact rugged controller', specs: ['Built for daily field use', 'Works with Spectra field software', 'Reliable in tough conditions'], img: 'spectra-ranger5-product-01.avif', dark: 1, blk: 1, learn: 'https://spectrageospatial.com/ranger-5/', q: 'spectra-ranger-5' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'Find a dealer', p: 'Locate Spectra Geospatial dealers and distributors worldwide.', href: 'https://spectrageospatial.com/dealer-locator/', img: P + 'spectra-sp100-product-01.avif', pos: 50 },
      { n: 'Spectra Geospatial support', p: 'Manuals, firmware and technical help for Spectra Geospatial products.', href: 'https://spectrageospatial.com/support/', img: P + 'spectra-ranger7-product-01.avif', pos: 50 },
      KACO.training, KACO.calibration,
    ] },
  },

  /* ------------------------------------------------------------------ NIKON ------------------------------------------------------------------ */
  nikon: {
    key: 'nikon', theme: 'nikon', nav: 'Nikon Precision', chipPrefix: 'Nikon ',
    title: 'Nikon Total Stations, Theodolites & Automatic Levels in Uganda | KACO Systems',
    srTitle: 'Nikon total stations, theodolites and automatic levels in Uganda',
    desc: 'Nikon XF total stations, NE-100 theodolites and AC-2S automatic levels, supplied, calibrated and supported by KACO Systems in Uganda and East Africa.',
    hero: {
      label: 'Nikon featured instruments',
      slides: [
        { label: 'Nikon survey instruments', eye: 'Nikon Precision', h: 'Precision optics for everyday survey', p: 'XF total stations, NE-100 theodolites and AC-2S automatic levels: dependable instruments built for daily field use.', glow: '#4a4528',
          prods: [{ src: P + 'nikon-ne100-product-02.png', alt: 'Nikon NE-100 theodolite', s: .95 }, { src: P + 'nikon-xf-product-01.avif', alt: 'Nikon XF total station', s: 1, blk: 1 }, { src: P + 'nikon-ac2s-product-02.png', alt: 'Nikon AC-2S automatic level', s: .6 }],
          l: [['Get a quote', q('nikon')], ['Explore instruments', '#products']] },
        { label: 'XF total stations', eye: 'Total stations', h: 'Nikon XF series', p: 'Mechanical total stations packed with features that make survey work easier and faster, with an 800 m non-prism EDM.', glow: '#4a4528',
          prods: [{ src: P + 'nikon-xf-product-01.avif', alt: 'Nikon XF total station', s: 1, blk: 1 }],
          l: [['Get a quote', q('nikon-xf-series')], ['Learn more', 'https://spectrageospatial.com/nikon-xf/']] },
        { label: 'Theodolites & levels', eye: 'Theodolites and automatic levels', h: 'NE-100 and AC-2S', p: 'A compact digital theodolite and a durable automatic level: simple, low-maintenance tools for layout and elevation work.', glow: '#3f4a52',
          prods: [{ src: P + 'nikon-ne100-product-02.png', alt: 'Nikon NE-100 theodolite', s: 1 }, { src: P + 'nikon-ac2s-product-02.png', alt: 'Nikon AC-2S automatic level', s: .64 }],
          l: [['Get a quote', q('nikon-ne-100')], ['Learn more', 'https://spectrageospatial.com/nikon-theodolites/']] },
      ],
    },
    updates: {
      title: 'Spotlight on Nikon survey',
      items: [
        { cat: 'Total stations', h: 'Nikon XF series: a total station for everyone', p: 'Mechanical total stations with dual full-face displays, clear optics for bright daylight and an 800 m non-prism EDM.', img: P + 'nikon-xf-product-01.avif', fit: 'contain', blk: 1, href: 'https://spectrageospatial.com/nikon-xf/' },
        { cat: 'Theodolites', h: 'Nikon NE-100: simple layout work', img: P + 'nikon-ne100-product-02.png', fit: 'contain', href: 'https://spectrageospatial.com/nikon-theodolites/' },
        { cat: 'Levels', h: 'Nikon AC-2S automatic level', img: P + 'nikon-ac2s-product-02.png', fit: 'contain', href: 'https://spectrageospatial.com/nikon-autolevels/' },
        { cat: 'Total stations', h: 'Nikon N & K mechanical total stations', img: P + 'nikon-xf-product-01.avif', fit: 'contain', blk: 1, href: 'https://spectrageospatial.com/nikon-nk-total-stations/' },
      ],
    },
    videos: {
      title: 'Nikon total stations in action', lead: 'Official films from Spectra Geospatial, the home of Nikon survey instruments.',
      items: [
        { id: '-ay2cYH1-JI', cat: 'Total stations', title: 'Spectra Nikon XF Series: A solution for everyone' },
        { id: 'dw2fRrJ5mIM', cat: 'Total stations', title: 'Nikon X-Series Total Stations' },
      ],
      channel: { href: yt('@spectrageospatial7761'), cat: 'Spectra Geospatial on YouTube', title: 'More survey instrument films', img: P + 'nikon-xf-product-01.avif' },
    },
    industries: {
      title: 'Applications', lead: 'Where Nikon instruments earn their keep.',
      items: [
        { n: 'Construction layout', p: 'Set out and check building and civil works quickly and repeatably.', img: H + 'gnss-construction-site-01.jpg', pos: 50, href: '/solutions/#gnss-positioning' },
        { n: 'Topographic survey', p: 'Capture angles, distances and elevations for dependable base mapping.', img: H + 'gnss-rover-farmland-01.jpg', pos: 50, href: '/solutions/#gnss-positioning' },
        { n: 'Training & education', p: 'Rugged, easy-to-learn instruments that suit new survey crews.', img: H + 'gnss-training-01.jpg', pos: 50, href: '/training/' },
      ],
    },
    products: {
      title: 'Nikon survey instruments', lead: 'Rugged optical and mechanical instruments, backed by local calibration.',
      cats: [
        { tab: 'Total stations', note: 'Mechanical total stations', more: [{ n: 'Nikon XS', href: 'https://spectrageospatial.com/nikon-xs/' }, { n: 'N & K mechanical', href: 'https://spectrageospatial.com/nikon-nk-total-stations/' }], items: [
          { n: 'Nikon XF & N/K Series Total Stations', tag: 'Packed with features for everyday survey', specs: ['Dual full-face display', 'Clear optics for bright daylight', 'Low-maintenance build'], img: 'nikon-xf-product-01.avif', dark: 1, blk: 1, learn: 'https://spectrageospatial.com/nikon-xf/', q: 'nikon-xf-series' },
        ] },
        { tab: 'Theodolites', note: 'Digital angle measurement', items: [
          { n: 'Nikon NE-100 Series', tag: 'Compact digital theodolite', specs: ['Digital angle readout', 'Compact, lightweight build', 'Simple setup for layout work'], img: 'nikon-ne100-product-02.png', learn: 'https://spectrageospatial.com/nikon-theodolites/', q: 'nikon-ne-100' },
        ] },
        { tab: 'Automatic levels', note: 'Elevation and cut/fill measurement', items: [
          { n: 'Nikon AC-2S Automatic Level', tag: 'Dependable everyday level', specs: ['Automatic compensator', 'Elevation and cut/fill measurement', 'Durable daily-use build'], img: 'nikon-ac2s-product-02.png', learn: 'https://spectrageospatial.com/nikon-autolevels/', q: 'nikon-ac-2s' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'Find a dealer', p: 'Locate Nikon survey instrument dealers through Spectra Geospatial.', href: 'https://spectrageospatial.com/dealer-locator/', img: P + 'nikon-xf-product-01.avif', pos: 50 },
      { n: 'Spectra Geospatial support', p: 'Manuals, firmware and technical help for Nikon and Spectra instruments.', href: 'https://spectrageospatial.com/support/', img: P + 'nikon-ac2s-product-02.png', pos: 50 },
      KACO.training, KACO.calibration,
    ] },
  },

  /* ------------------------------------------------------------------ US RADAR ------------------------------------------------------------------ */
  'us-radar': {
    key: 'us-radar', theme: 'usradar', nav: 'US Radar', chipPrefix: 'US Radar ',
    title: 'US Radar Ground Penetrating Radar & Subsurface Imaging in Uganda | KACO Systems',
    srTitle: 'US Radar ground penetrating radar in Uganda',
    desc: 'US Radar Quantum Imager, GPRover and 100 Series ground penetrating radar with Radar Studio software, supplied and supported by KACO Systems in Uganda and East Africa.',
    hero: {
      label: 'US Radar featured systems',
      slides: [
        { label: 'US Radar', eye: 'US Radar', h: 'Proven, reliable, rugged GPR', p: 'For more than 30 years, US Radar has built ground penetrating radar systems with unsurpassed depth penetration and resolution for any subsurface investigation.', glow: '#2b4756',
          prods: [{ src: P + 'usradar-quantum-product-02.avif', alt: 'US Radar Quantum Imager GPR', s: .95 }, { src: P + 'usradar-gprover-product-02.avif', alt: 'US Radar GPRover utility mapping system', s: 1 }, { src: P + 'usradar-100series-product-01.avif', alt: 'US Radar 100 Series geophysical scanner', s: .72, blk: 1 }],
          l: [['Get a quote', q('us-radar')], ['Explore systems', '#products']] },
        { label: 'Quantum Imager', eye: 'Triple-frequency GPR', h: 'Quantum Imager', p: 'The first true triple-frequency GPR: three simultaneous signals for a clearer understanding of what lies beneath.', glow: '#2b4756',
          prods: [{ src: P + 'usradar-quantum-product-02.avif', alt: 'US Radar Quantum Imager GPR', s: 1, w: 42, wm: 90 }],
          l: [['Get a quote', q('us-radar-quantum-imager')], ['Learn more', 'https://usradar.com/ground-penetrating-radar-products/quantum-imager-triple-frequency-gpr-system/']] },
        { label: 'GPRover', eye: 'Utility mapping', h: 'GPRover', p: 'Triple-bandwidth technology with GPS for real-time subsurface mapping across uneven terrain.', glow: '#26505f',
          prods: [{ src: P + 'usradar-gprover-product-02.avif', alt: 'US Radar GPRover', s: 1, w: 40, wm: 80 }, { src: P + 'usradar-gprover-product-01.avif', alt: 'US Radar GPRover with GNSS antenna', s: .94, blk: 1, w: 40, side: 1 }],
          l: [['Get a quote', q('us-radar-gprover')], ['Learn more', 'https://usradar.com/ground-penetrating-radar-products/gp-rover-utility-mapping-system/']] },
        { label: 'Radar Studio', eye: 'Software', h: 'Radar Studio', p: 'All-in-one viewing and processing software, with 3D imaging and GPS integration for GPR data.', glow: '#2b4756',
          prods: [{ src: P + 'usradar-radarstudio-product-01.avif', alt: 'US Radar Radar Studio software', s: .85, w: 50, wm: 100 }],
          l: [['Get a quote', q('us-radar-radar-studio')], ['Learn more', 'https://usradar.com/gpr-software/radar-studio/']] },
      ],
    },
    updates: {
      title: 'Spotlight on US Radar',
      items: [
        { cat: 'Triple frequency', h: 'Quantum Imager: three signals, one clear picture', p: 'Simultaneous 250, 500 and 1000 MHz signals, GPS mapping and real-time 3D depth slicing on a rugged all-terrain cart.', img: P + 'usradar-quantum-imager-01.jpg', fit: 'light', href: 'https://usradar.com/ground-penetrating-radar-products/quantum-imager-triple-frequency-gpr-system/' },
        { cat: 'Utility mapping', h: 'GPRover: GPS-integrated utility mapping', img: P + 'usradar-gprover-product-02.avif', fit: 'contain', href: 'https://usradar.com/ground-penetrating-radar-products/gp-rover-utility-mapping-system/' },
        { cat: 'Software', h: 'Radar Studio: view, process and share GPR data', img: P + 'usradar-radarstudio-product-01.avif', fit: 'contain', href: 'https://usradar.com/gpr-software/radar-studio/' },
        { cat: 'Guide', h: 'Which GPR system is best for me?', img: P + 'usradar-100series-product-01.avif', fit: 'contain', blk: 1, href: 'https://usradar.com/what-gpr-system-is-best-for-me/' },
      ],
    },
    videos: {
      title: 'GPR in action', lead: 'Official videos from US Radar.',
      items: [
        { id: 'hIRIgUhU1E4', cat: 'Overview', title: 'US Radar: Quantum Imager Triple Frequency GPR System' },
        { id: 'JKLXgIxJnEc', cat: 'Getting started', title: 'Quantum Imager Triple Frequency GPR System: Quick Start Guide' },
        { id: 'vl-Okd8yB4I', cat: 'Getting started', title: 'US Radar: GPRover Quick Start Guide' },
      ],
      channel: { href: yt('@USRadar'), cat: 'US Radar on YouTube', title: 'More training and quick-start guides', img: P + 'usradar-quantum-imager-01.jpg' },
    },
    industries: {
      title: 'Applications', lead: 'What ground penetrating radar can tell you.',
      items: [
        { n: 'Utility locating', p: 'Find metallic and non-metallic pipes, cables and ducts before you dig.', img: H + 'gnss-construction-site-02.jpg', pos: 50, href: 'https://usradar.com/gpr-ground-penetrating-radar-applications/utility-locating-applications-for-ground-penetrating-radar/' },
        { n: 'Structural assessment', p: 'Locate rebar, voids and defects in concrete without breaking it.', img: H + 'drone-survey-quarry-01.jpg', pos: 50, href: 'https://usradar.com/gpr-ground-penetrating-radar-applications/structural-assessment/' },
        { n: 'Geophysical & environmental', p: 'Map soil, bedrock and groundwater conditions for site investigation.', img: H + 'drone-survey-aerial-01.jpg', pos: 50, href: 'https://usradar.com/gpr-ground-penetrating-radar-applications/environmental/' },
      ],
    },
    products: {
      title: 'US Radar systems', lead: 'Ground penetrating radar and software, supplied and supported by KACO Systems.',
      cats: [
        { tab: 'GPR systems', note: 'From triple-frequency imaging to geophysical scanning', more: [{ n: 'Q5 series', href: 'https://usradar.com/ground-penetrating-radar-products/q5-series-utility-locating-gpr-system/' }, { n: 'Q10', href: 'https://usradar.com/ground-penetrating-radar-products/q10-locating-system/' }, { n: 'Q25', href: 'https://usradar.com/ground-penetrating-radar-products/q25-geophysical-radar-system/' }], items: [
          { n: 'Quantum Imager Triple-Frequency GPR', tag: 'The first true triple-frequency GPR', specs: ['Simultaneous 250 / 500 / 1000 MHz', 'GPS-georeferenced CAD and GIS export', 'Real-time 3D depth slicing'], img: 'usradar-quantum-imager-01.jpg', learn: 'https://usradar.com/ground-penetrating-radar-products/quantum-imager-triple-frequency-gpr-system/', q: 'us-radar-quantum-imager' },
          { n: 'GPRover', tag: 'Utility mapping with GPS', specs: ['Integrated GNSS georeferencing', 'Triple-bandwidth antenna', 'Real-time on-cart logging'], img: 'usradar-gprover-product-02.avif', learn: 'https://usradar.com/ground-penetrating-radar-products/gp-rover-utility-mapping-system/', q: 'us-radar-gprover' },
          { n: '100 Series Geophysical Scanner', tag: 'Modular radar for deep investigations', specs: ['Up to ~30 m penetration depth', 'Modular antenna configurations', 'Tunnel, dam and geological surveys'], img: 'usradar-100series-product-01.avif', dark: 1, blk: 1, learn: 'https://usradar.com/ground-penetrating-radar-products/100-series-geophysical-scanner/', q: 'us-radar-100-series' },
        ] },
        { tab: 'Software', note: 'Acquire, view and process GPR data', more: [{ n: '3D imaging & modeling', href: 'https://usradar.com/gpr-software/3d-imaging-modeling/' }, { n: 'GPS integration', href: 'https://usradar.com/gpr-software/gps-integration/' }], items: [
          { n: 'Radar Studio', tag: 'All-in-one viewing and processing suite', specs: ['Infinitely customizable interface', 'Intuitive controls', 'Optional post-processing toolkit'], img: 'usradar-radarstudio-product-01.avif', learn: 'https://usradar.com/gpr-software/radar-studio/', q: 'us-radar-radar-studio' },
          { n: 'US Radar Field Software', tag: 'Drives every US Radar system', specs: ['Clear, crisp graphical display', 'Vibrant color palette options', 'Automatic gain and averaging filters'], img: 'usradar-fieldsoftware-product-01.avif', learn: 'https://usradar.com/gpr-software/acquisition-software-gpr/', q: 'us-radar-field-software' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'GPR training', p: 'Learn how to collect and interpret GPR data with US Radar training resources.', href: 'https://usradar.com/resources/gpr-training/', img: P + 'usradar-quantum-product-02.avif', pos: 50 },
      { n: 'Case studies', p: 'Real projects where US Radar systems found what lay below.', href: 'https://usradar.com/resources/case-studies/', img: P + 'usradar-gprover-product-02.avif', pos: 50 },
      { n: 'Tech support', p: 'Manuals, software downloads and help from the US Radar team.', href: 'https://usradar.com/tech-support/', img: P + 'usradar-radarstudio-product-01.avif', pos: 50 },
      { n: 'GPR operator training from KACO', p: 'Hands-on data acquisition and depth-slice interpretation with our trainers.', href: '/training/', img: H + 'gnss-training-01.jpg', pos: 50 },
    ] },
  },

  /* ------------------------------------------------------------------ SEAFLOOR SYSTEMS ------------------------------------------------------------------ */
  'seafloor-systems': {
    key: 'seafloor-systems', theme: 'seafloor', nav: 'Seafloor Systems', chipPrefix: 'Seafloor ',
    title: 'Seafloor Systems Hydrographic Survey Vessels in Uganda | KACO Systems',
    srTitle: 'Seafloor Systems hydrographic survey vessels in Uganda',
    desc: 'Seafloor Systems EchoBoat and HyDrone autonomous survey vessels and HydroLite echosounders, supplied and supported by KACO Systems for bathymetric survey in Uganda and East Africa.',
    hero: {
      label: 'Seafloor Systems featured products',
      slides: [
        { label: 'Seafloor Systems', eye: 'Seafloor Systems', h: 'Complete hydrographic survey solutions', p: 'Autonomous survey vessels, echosounders and software for bathymetry, dredging, reservoir and marine construction surveys.', glow: '#1f5249',
          prods: [{ src: P + 'seafloor-hydrone-product-01.avif', alt: 'Seafloor Systems HyDrone survey vessel', s: .66, blk: 1, w: 36, wm: 80 }, { src: P + 'seafloor-hydrolite-product-01.avif', alt: 'Seafloor Systems HydroLite echosounder kit', s: .74, blk: 1, w: 34, side: 1 }],
          l: [['Get a quote', q('seafloor-systems')], ['Explore products', '#products']] },
        { label: 'EchoBoat', eye: 'Unmanned survey vessels', h: 'EchoBoat survey vessels', p: 'Autonomous and remote-controlled USVs that carry singlebeam or multibeam sonar and keep your crew out of the water.', img: P + 'seafloor-echoboat-usv-01.jpg', pos: 50,
          l: [['Get a quote', q('seafloor-echoboat')], ['Learn more', 'https://www.seafloorsystems.com/echoboat-160']] },
        { label: 'HydroLite', eye: 'Echosounders', h: 'HydroLite echosounder', p: 'A compact, low-power sensor with GNSS-georeferenced soundings, deployable from small boats or survey vessels.', glow: '#1f5249',
          prods: [{ src: P + 'seafloor-hydrolite-product-01.avif', alt: 'Seafloor Systems HydroLite echosounder kit', s: 1, blk: 1, w: 34, wm: 80 }],
          l: [['Get a quote', q('seafloor-hydrolite')], ['Learn more', 'https://www.seafloorsystems.com/products']] },
      ],
    },
    updates: {
      title: 'Spotlight on Seafloor Systems',
      items: [
        { cat: 'Survey vessels', h: 'EchoBoat-160: a compact unmanned survey vessel', p: 'Autonomous waypoint navigation, RTK GNSS integration and siltation volume auditing, without putting a crew on the water.', img: P + 'seafloor-echoboat-usv-01.jpg', pos: 50, href: 'https://www.seafloorsystems.com/echoboat-160' },
        { cat: 'Survey vessels', h: 'EchoBoat-240: multibeam bathymetry, remotely', img: P + 'seafloor-echoboat-usv-01.jpg', pos: 22, href: 'https://www.seafloorsystems.com/echoboat-240' },
        { cat: 'Portable', h: 'HyDrone: one-person hydrographic survey', img: P + 'seafloor-hydrone-product-01.avif', fit: 'contain', blk: 1, href: 'https://www.seafloorsystems.com/hydrone' },
        { cat: 'Resources', h: 'Support videos: set-up and survey walkthroughs', img: P + 'seafloor-hydrolite-product-01.avif', fit: 'contain', blk: 1, href: 'https://www.seafloorsystems.com/support-videos' },
      ],
    },
    videos: {
      title: 'Survey vessels at work', lead: 'Official videos from Seafloor Systems.',
      items: [
        { id: 'bD0ewG110fs', cat: 'HyDrone', title: 'HyDrone-RCV Remote Control Hydrographic Survey Boat' },
        { id: 'qj6nI1-v5og', cat: 'EchoBoat', title: 'EchoBoat-240 for Remote Autonomous High Resolution Multibeam Bathymetry' },
        { id: '1d0GZ_KCX50', cat: 'Autonomy', title: 'Seafloor Systems AutoNav Demo' },
      ],
      channel: { href: yt('@seafloorsystems'), cat: 'Seafloor Systems on YouTube', title: 'More set-up guides and survey films', img: P + 'seafloor-echoboat-usv-01.jpg' },
    },
    products: {
      title: 'Seafloor Systems products', lead: 'Survey vessels and sensors, supplied and supported by KACO Systems.',
      cats: [
        { tab: 'Survey vessels', note: 'Unmanned platforms for safe, repeatable bathymetry', more: [{ n: 'EchoBoat-160', href: 'https://www.seafloorsystems.com/echoboat-160' }, { n: 'EchoBoat-240', href: 'https://www.seafloorsystems.com/echoboat-240' }], items: [
          { n: 'EchoBoat Autonomous Survey USV', tag: 'Survey without a crew on the water', specs: ['Autonomous waypoint navigation', 'RTK GNSS integration', 'Siltation volume auditing'], img: 'seafloor-echoboat-usv-01.jpg', cover: 50, learn: 'https://www.seafloorsystems.com/echoboat-160', q: 'seafloor-echoboat' },
          { n: 'HyDrone & TriDrone', tag: 'Hand-launchable and lightweight', specs: ['Remote or autonomous operation', 'Singlebeam and RTK GNSS ready', 'Ideal for narrow waterways'], img: 'seafloor-hydrone-product-01.avif', dark: 1, blk: 1, learn: 'https://www.seafloorsystems.com/hydrone', q: 'seafloor-hydrone' },
        ] },
        { tab: 'Sensors & software', note: 'Echosounders, sonar and data tools', more: ['Singlebeam sonar', 'Multibeam sonar', 'Side scan sonar', 'Sub-bottom profilers', 'ADCP', 'SVP / CTD', { n: 'Survey software', href: 'https://www.seafloorsystems.com/software' }], items: [
          { n: 'HydroLite Echosounder', tag: 'Compact, low-power sensor', specs: ['GNSS-georeferenced soundings', 'Deployable from small boats or USVs', 'Standard software export'], img: 'seafloor-hydrolite-product-01.avif', dark: 1, blk: 1, learn: 'https://www.seafloorsystems.com/products', q: 'seafloor-hydrolite' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'Support videos', p: 'Set-up, calibration and survey walkthroughs from the Seafloor Systems team.', href: 'https://www.seafloorsystems.com/support-videos', img: P + 'seafloor-echoboat-usv-01.jpg', pos: 50 },
      { n: 'Applications', p: 'Marine construction, hydrographic survey, hydrospatial and mining work.', href: 'https://www.seafloorsystems.com/applications', img: P + 'seafloor-hydrone-product-01.avif', pos: 50 },
      { n: 'Blog', p: 'News and technical articles from Seafloor Systems.', href: 'https://www.seafloorsystems.com/blog', img: P + 'seafloor-hydrolite-product-01.avif', pos: 50 },
      { n: 'Hydrographic survey training', p: 'USV deployment, echosounder calibration and data processing, with our trainers.', href: '/training/', img: H + 'gnss-training-01.jpg', pos: 50 },
    ] },
  },

  /* ------------------------------------------------------------------ AUTODESK & CARLSON ------------------------------------------------------------------ */
  autodesk: {
    key: 'autodesk', theme: 'autodesk', nav: 'Autodesk & Carlson', chipPrefix: '',
    title: 'Autodesk Civil 3D, Revit & Carlson Software in Uganda | KACO Systems',
    srTitle: 'Autodesk and Carlson civil engineering and survey software in Uganda',
    desc: 'Autodesk AutoCAD, Civil 3D, Revit and ReCap Pro, plus Carlson SurvCE, Survey and Civil Suite, licensed and supported by KACO Systems in Uganda and East Africa.',
    hero: {
      label: 'Autodesk and Carlson featured software',
      slides: [
        { label: 'Field to design', eye: 'Autodesk & Carlson', h: 'From field survey to finished design', p: 'Civil 3D, Revit and the Autodesk AEC tools, with Carlson survey software carrying your field data straight into design.', glow: '#1d4a63',
          prods: [{ src: P + 'autodesk-logo.jpg', alt: 'Autodesk', w: 42, r: 1.7, card: 1 }, { src: P + 'carlson-software-logo.jpg', alt: 'Carlson Software', s: .5, w: 42, card: 1 }],
          l: [['Get a quote', q('autodesk')], ['Explore software', '#products']] },
        { label: 'Autodesk', eye: 'Autodesk', h: 'Civil design and BIM', p: 'AutoCAD, Civil 3D, Revit, Navisworks, InfraWorks and ReCap Pro for civil infrastructure and buildings.', glow: '#1d4a63',
          prods: [{ src: P + 'autodesk-logo.jpg', alt: 'Autodesk', w: 48, wm: 96, r: 1.7, card: 1 }],
          l: [['Get a quote', q('autodesk-civil-3d')], ['Learn more', 'https://www.autodesk.com/products/civil-3d/overview']] },
        { label: 'Carlson Software', eye: 'Carlson Software', h: 'Field data collection to civil design', p: 'SurvCE and SurvPC for the field, Carlson Survey and Civil Suite for the office, with automatic field-to-finish drawing.', glow: '#27374a',
          prods: [{ src: P + 'carlson-software-logo.jpg', alt: 'Carlson Software', s: .6, w: 54, wm: 100, card: 1 }],
          l: [['Get a quote', q('carlson-survce')], ['Learn more', 'https://www.carlsonsw.com/product/carlson-survce/']] },
      ],
    },
    updates: {
      title: 'Latest from Autodesk and Carlson',
      items: [
        { cat: 'Autodesk', h: "What's new in Civil 3D, InfraWorks and ReCap Pro", p: 'Read about the latest improvements across the civil design and reality-capture tools in the Autodesk AEC portfolio.', img: P + 'autodesk-logo.jpg', fit: 'contain', href: 'https://www.autodesk.com/blogs/aec/2024/04/03/whats-new-in-civil-3d-infraworks-and-recap-pro-2025/' },
        { cat: 'Carlson', h: 'SurvCE and SurvPC: complete data collection for RTK and total stations', img: P + 'carlson-software-logo.jpg', fit: 'contain', href: 'https://www.carlsonsw.com/product/carlson-survce/' },
        { cat: 'Carlson', h: 'Carlson Civil Suite: survey, civil, hydrology and GIS together', img: P + 'carlson-software-logo.jpg', fit: 'contain', href: 'https://www.carlsonsw.com/product/carlson-civil-suite/' },
        { cat: 'Autodesk', h: 'Autodesk Construction Cloud: a common data environment', img: P + 'autodesk-logo.jpg', fit: 'contain', href: 'https://construction.autodesk.com/' },
      ],
    },
    videos: {
      title: 'See the software at work', lead: 'Official videos from Autodesk and Carlson Software.',
      items: [
        { id: 'kGVJWjTPna8', thumb: 'hqdefault', cat: 'Autodesk', title: "What's New in Civil 3D 2027" },
        { id: 'oDGasw3R7d8', cat: 'Autodesk', title: "What's New in Civil 3D 2026.2" },
        { id: 'Lgut-wI23TM', cat: 'Carlson', title: 'Overview of Carlson Survey 2019' },
        { id: 'jOFO2f449Io', thumb: 'sddefault', cat: 'Carlson', title: 'Carlson SurvCE GPS Webinar' },
      ],
    },
    industries: {
      title: 'Workflows', lead: 'How survey, design and field teams use the software together.',
      items: [
        { n: 'Survey to design', p: 'Bring GNSS and total station data straight into Civil 3D and Carlson Survey.', img: H + 'gnss-construction-site-02.jpg', pos: 50, href: '/solutions/#field-software' },
        { n: 'Civil infrastructure', p: 'Corridor, grading and earthwork design from existing-ground data.', img: H + 'drone-survey-aerial-01.jpg', pos: 50, href: '/solutions/#field-software' },
        { n: 'Training for your team', p: 'Instructor-led AutoCAD, Civil 3D and Revit courses in Kampala.', img: H + 'gnss-training-01.jpg', pos: 50, href: '/training/' },
      ],
    },
    products: {
      title: 'Autodesk and Carlson software', lead: 'Licensed, deployed and supported locally by KACO Systems.',
      cats: [
        { tab: 'Autodesk', note: 'Design, BIM and reality capture', more: ['Navisworks', 'InfraWorks', 'BIM Collaborate'], items: [
          { n: 'AutoCAD Civil 3D', tag: 'Civil engineering design and documentation', specs: ['Dynamic 3D corridor modeling', 'Grading and earthwork analysis', 'Automated plan production'], img: 'autodesk-logo.jpg', cover: 50, learn: 'https://www.autodesk.com/products/civil-3d/overview', q: 'autodesk-civil-3d' },
          { n: 'AutoCAD', tag: 'Industry-standard 2D and 3D CAD', specs: ['Precision drafting and documentation', 'Extensive toolset and add-ons', 'Universal DWG file format'], img: 'autodesk-logo.jpg', cover: 50, learn: 'https://www.autodesk.com/products/autocad/overview', q: 'autodesk-autocad' },
          { n: 'Revit', tag: 'Building information modeling', specs: ['Coordinated architectural and MEP design', 'Parametric 3D building components', 'Construction documentation'], img: 'autodesk-logo.jpg', cover: 50, learn: 'https://www.autodesk.com/products/revit/overview', q: 'autodesk-revit' },
          { n: 'ReCap Pro', tag: 'Point cloud and reality capture', specs: ['Laser scan and drone photo registration', 'Direct import into Civil 3D and Revit', 'As-built verification'], img: 'autodesk-logo.jpg', cover: 50, learn: 'https://www.autodesk.com/products/recap/overview.14', q: 'autodesk-recap' },
        ] },
        { tab: 'Carlson', note: 'Field data collection and civil office software', more: ['Carlson Civil', 'Carlson Hydrology', 'Carlson GIS'], items: [
          { n: 'Carlson SurvCE & SurvPC', tag: 'Field data collection for RTK GPS and total stations', specs: ['Supports a wide range of GNSS and total stations', 'In-field coordinate geometry', 'Automatic field-to-finish drawing in Carlson Survey'], img: 'carlson-software-logo.jpg', learn: 'https://www.carlsonsw.com/product/carlson-survce/', q: 'carlson-survce' },
          { n: 'Carlson Survey', tag: 'Office survey software', specs: ['Works with SurvCE and SurvPC', 'Symbols, points and linework drawn from field codes', 'Available alone or in the Civil Suite'], img: 'carlson-software-logo.jpg', learn: 'https://www.carlsonsw.com/product/carlson-survey/', q: 'carlson-survey' },
          { n: 'Carlson Civil Suite', tag: 'Survey, civil, hydrology and GIS together', specs: ['Four modular programs that work as one', 'Design, grading and drainage tools', 'Built for land development professionals'], img: 'carlson-software-logo.jpg', learn: 'https://www.carlsonsw.com/product/carlson-civil-suite/', q: 'carlson-civil-suite' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'Autodesk for civil engineers', p: 'See how civil engineers use the Autodesk AEC collection from design to construction.', href: 'https://www.autodesk.com/industry/civil-engineering', img: P + 'autodesk-logo.jpg', pos: 50 },
      { n: 'Carlson products', p: 'Browse the full range of Carlson Software products.', href: 'https://www.carlsonsw.com/products/', img: P + 'carlson-software-logo.jpg', pos: 50 },
      KACO.training,
      { n: 'Field-to-design integration', p: 'Import Trimble and drone data into Civil 3D and Revit for as-built and design work.', href: '/solutions/#field-software', img: H + 'drone-survey-quarry-01.jpg', pos: 50 },
    ] },
  },

  /* ------------------------------------------------------------------ DATAMINE ------------------------------------------------------------------ */
  'datamine-software': {
    key: 'datamine-software', theme: 'datamine', nav: 'Datamine', chipPrefix: 'Datamine ',
    title: 'Datamine Mine Geology & Resource Modelling Software in Uganda | KACO Systems',
    srTitle: 'Datamine mining software in Uganda',
    desc: 'Datamine Studio RM, Studio Geo, Isatis.neo, Sirovision and Supervisor, licensed, deployed and supported by KACO Systems for mining and geology teams in Uganda and East Africa.',
    hero: {
      label: 'Datamine featured software',
      slides: [
        { label: 'Datamine', eye: 'Datamine', h: 'Define. Plan. Operate.', p: 'One partner for every role: software built for geologists, engineers, metallurgists and leaders across the mining value chain.', glow: '#264a63',
          prods: [{ src: P + 'datamine-studio-rm-01.svg', alt: 'Datamine Studio RM', s: .8, w: 26 }, { src: P + 'datamine-studio-geo-01.svg', alt: 'Datamine Studio Geo', s: .8, w: 26 }, { src: P + 'datamine-isatis-neo-01.svg', alt: 'Datamine Isatis.neo', s: .8, w: 26 }],
          l: [['Get a quote', q('datamine')], ['Explore software', '#products']] },
        { label: 'Geology & resource modelling', eye: 'Geology', h: 'From drillhole to resource model', p: 'Implicit modelling, geostatistics and resource estimation for a confident view of the subsurface.', glow: '#2b5368',
          prods: [{ src: P + 'datamine-studio-rm-01.svg', alt: 'Datamine Studio RM', s: .7, w: 22 }, { src: P + 'datamine-studio-geo-01.svg', alt: 'Datamine Studio Geo', s: .7, w: 22 }, { src: P + 'datamine-supervisor-01.svg', alt: 'Datamine Supervisor', s: .7, w: 22 }],
          l: [['Get a quote', q('datamine-studio-rm')], ['Learn more', 'https://dataminesoftware.com/studio-rm/']] },
        { label: 'Mapping & planning', eye: 'Planning', h: 'Map the pit face, plan the pit', p: 'Photogrammetry-based mapping with Sirovision and open-pit optimisation with Studio Maxipit.', glow: '#264a63',
          prods: [{ src: P + 'datamine-sirovision-01.svg', alt: 'Datamine Sirovision', s: .7, w: 22 }, { src: P + 'datamine-studio-mapper-01.svg', alt: 'Datamine Studio Mapper', s: .7, w: 22 }, { src: P + 'datamine-studio-maxipit-01.svg', alt: 'Datamine Studio Maxipit', s: .7, w: 22 }],
          l: [['Get a quote', q('datamine-sirovision')], ['Learn more', 'https://dataminesoftware.com/sirovision/']] },
      ],
    },
    updates: {
      title: 'Latest from Datamine',
      items: [
        { cat: 'Company news', h: 'Datamine announces acquisition of Commit Works', p: 'Adding operational planning capabilities to the Datamine portfolio for mines of every size.', img: P + 'datamine-hero-openpit-01.webp', pos: 50, href: 'https://dataminesoftware.com/datamine-announces-acquisition-of-commit-works/' },
        { cat: 'Operations', h: 'Datamine expands operational mine management capabilities', img: P + 'datamine-supervisor-01.svg', fit: 'contain', href: 'https://dataminesoftware.com/datamine-expand-operational-mine-management-capabilities/' },
        { cat: 'Education', h: 'Global university partnerships to support future mining talent', img: P + 'datamine-studio-geo-01.svg', fit: 'contain', href: 'https://dataminesoftware.com/datamine-expands-global-university-partnerships-to-support-future-mining-talent/' },
        { cat: 'Technology', h: 'Next-generation fleet management and AI safety platform', img: P + 'datamine-studio-mapper-01.svg', fit: 'contain', href: 'https://dataminesoftware.com/datamine-next-generation-fleet-management-ai-safety-platform/' },
      ],
    },
    videos: {
      title: 'Datamine in action', lead: 'Official videos and webinars from Datamine Software.',
      items: [
        { id: 'qMGF8LEogqA', thumb: 'hqdefault', cat: 'Sirovision', title: 'Sirovision: Mapping' },
        { id: 'BLPxIlns6wA', cat: 'Studio RM', title: 'Studio RM Webinar: Implicit Modelling Tools' },
        { id: '6MGwNv3yicY', cat: 'Geology', title: 'From Concept to Resource Model: Building a Confident Geological Model' },
      ],
      channel: { href: yt('@DatamineSoftware'), cat: 'Datamine Software on YouTube', title: 'More webinars and tutorials', img: P + 'datamine-hero-openpit-01.webp' },
    },
    industries: {
      title: 'Solutions', lead: 'Datamine software across the mining value chain.',
      items: [
        { n: 'Exploration', p: 'Interpret drilling and survey data to find and define the next resource.', img: H + 'drone-survey-aerial-01.jpg', pos: 50, href: 'https://dataminesoftware.com/solutions/exploration/' },
        { n: 'Geology', p: 'Resource estimation, ore control and geostatistics in one workflow.', img: H + 'drone-survey-quarry-01.jpg', pos: 50, href: 'https://dataminesoftware.com/solutions/geology/' },
        { n: 'Planning', p: 'Design, scheduling and optimisation across short, medium and long horizons.', img: H + 'gnss-construction-site-02.jpg', pos: 50, href: 'https://dataminesoftware.com/solutions/planning/' },
        { n: 'Production', p: 'Reconcile and control production with mining intelligence across the value chain.', img: H + 'gnss-construction-site-01.jpg', pos: 50, href: 'https://dataminesoftware.com/solutions/production/' },
      ],
    },
    products: {
      title: 'Datamine software', lead: 'Geology, estimation and mine optimisation, licensed and supported by KACO Systems.',
      cats: [
        { tab: 'Geology & estimation', note: 'Model, estimate and understand the orebody', more: [{ n: 'Studio Mapper', href: 'https://dataminesoftware.com/products/' }], items: [
          { n: 'Studio RM', tag: 'A true reflection of the subsurface', specs: ['Resource modelling and estimation', 'Geological domain interpretation', 'Block model development'], img: 'datamine-studio-rm-01.svg', dark: 1, learn: 'https://dataminesoftware.com/studio-rm/', q: 'datamine-studio-rm' },
          { n: 'Studio Geo', tag: 'Geological interpretation environment', specs: ['Implicit 3D modelling', 'Structural and stratigraphic analysis', 'Seamless Studio RM integration'], img: 'datamine-studio-geo-01.svg', dark: 1, learn: 'https://dataminesoftware.com/studio-geo-by-datamine/', q: 'datamine-studio-geo' },
          { n: 'Isatis.neo', tag: 'Advanced geostatistical analysis', specs: ['Variogram modelling and kriging', 'Resource estimation confidence', 'Industry-standard geostatistics'], img: 'datamine-isatis-neo-01.svg', dark: 1, learn: 'https://dataminesoftware.com/isatis-neo/', q: 'datamine-isatis-neo' },
          { n: 'Supervisor', tag: 'Mineralisation and variability analysis', specs: ['Grade uncertainty quantification', 'Geostatistical data review', 'Informed estimation decisions'], img: 'datamine-supervisor-01.svg', dark: 1, learn: 'https://dataminesoftware.com/supervisor/', q: 'datamine-supervisor' },
        ] },
        { tab: 'Mapping & planning', note: 'From the pit face to the pit design', more: [{ n: 'DataBlast', href: 'https://dataminesoftware.com/datablast/' }, { n: 'Reconcilor', href: 'https://dataminesoftware.com/reconcilor/' }], items: [
          { n: 'Sirovision', tag: 'Photogrammetry-based mapping', specs: ['Rock face and pit wall imaging', 'Structural geology capture', 'Rapid, non-contact data collection'], img: 'datamine-sirovision-01.svg', dark: 1, learn: 'https://dataminesoftware.com/sirovision/', q: 'datamine-sirovision' },
          { n: 'Studio Mapper', tag: 'Integrated mine mapping tools', specs: ['Latest mapping technologies', 'Field-to-office geology workflow', 'Digital face mapping'], img: 'datamine-studio-mapper-01.svg', dark: 1, q: 'datamine-studio-mapper' },
          { n: 'Studio Maxipit', tag: 'Open-pit reserve preparation', specs: ['Pit optimisation and scheduling', 'Reserve reporting confidence', 'Strategic mine planning'], img: 'datamine-studio-maxipit-01.svg', dark: 1, q: 'datamine-studio-maxipit' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'Customer success stories', p: 'See how mining teams get results with Datamine software.', href: 'https://dataminesoftware.com/customer-success-stories/', img: P + 'datamine-hero-openpit-01.webp', pos: 50 },
      { n: 'Training & events', p: 'Courses, webinars and events from Datamine.', href: 'https://dataminesoftware.com/training-events/', img: P + 'datamine-studio-rm-01.svg', pos: 50 },
      { n: 'Datamine support', p: 'Technical support and resources for Datamine users.', href: 'https://dataminesoftware.com/support/', img: P + 'datamine-supervisor-01.svg', pos: 50 },
      { n: 'Geology & resource modelling training', p: 'Practical courses in interpretation, geostatistics and estimation, delivered by KACO.', href: '/training/', img: H + 'gnss-training-01.jpg', pos: 50 },
    ] },
  },

  /* ------------------------------------------------------------------ IBM TAPE STORAGE ------------------------------------------------------------------ */
  'ibm-tape': {
    key: 'ibm-tape', theme: 'ibm', nav: 'IBM Tape Storage', chipPrefix: 'IBM ',
    title: 'IBM Tape Storage & Data Archive Solutions in Uganda | KACO Systems',
    srTitle: 'IBM tape storage and data archive solutions in Uganda',
    desc: 'IBM TS4500 and TS4300 tape libraries, TS1170 tape drives, TS7700 virtual tape and Diamondback, supplied and integrated by KACO Systems for cyber-resilient backup and archive in Uganda.',
    hero: {
      label: 'IBM tape storage featured products',
      slides: [
        { label: 'IBM tape storage', eye: 'IBM Tape Storage', h: 'Data that survives every threat', p: 'Cyber-resilient, air-gapped tape libraries and drives for backup, archive and long-term retention, from entry-level autoloaders to enterprise-scale libraries.', glow: '#8896a6',
          prods: [{ src: P + 'ibm-ts4500-product-02.png', alt: 'IBM TS4500 tape library', s: 1, w: 24 }, { src: P + 'ibm-ts7700-product-02.png', alt: 'IBM TS7700 virtual tape', s: .96, w: 24 }, { src: P + 'ibm-ts4300-product-02.png', alt: 'IBM TS4300 tape library', s: .92, w: 28 }],
          l: [['Get a quote', q('ibm-tape')], ['Explore products', '#products']] },
        { label: 'TS4500 tape library', eye: 'Enterprise tape library', h: 'IBM TS4500', p: 'Scales to 926 PB with LTO-10 across up to 128 drives, with high storage density and integrated management.', glow: '#8896a6',
          prods: [{ src: P + 'ibm-ts4500-product-02.png', alt: 'IBM TS4500 tape library', s: 1, w: 30, wm: 60 }],
          l: [['Get a quote', q('ibm-ts4500')], ['Learn more', 'https://www.ibm.com/products/ts4500']] },
        { label: 'TS1170 tape drive', eye: 'Enterprise tape drive', h: 'IBM TS1170', p: 'Up to 50 TB native and 150 TB compressed capacity per cartridge at 400 MB/s, for cyber-resilient data archiving.', glow: '#5b8bd6',
          prods: [{ src: P + 'ibm-ts1170-product-02.png', alt: 'IBM TS1170 tape drive illustration', s: .8, w: 36, wm: 80 }, { src: P + 'ibm-storage-archive-illustration-01.svg', alt: 'IBM Storage Archive illustration', s: .62, w: 30, side: 1 }],
          l: [['Get a quote', q('ibm-ts1170')], ['Learn more', 'https://www.ibm.com/products/enterprise-tape-drive']] },
      ],
    },
    updates: {
      title: 'Spotlight on IBM tape storage',
      items: [
        { cat: 'Tape library', h: 'IBM TS4500: up to 926 PB with LTO-10', p: 'A next-generation, high-density tape library scaling to 128 drives, with integrated fleet management for cyber-resilient archive and backup.', img: P + 'ibm-ts4500-product-02.png', fit: 'light', href: 'https://www.ibm.com/products/ts4500' },
        { cat: 'Tape drive', h: 'IBM TS1170: 50 TB native on a single cartridge', img: P + 'ibm-ts1170-product-02.png', fit: 'light', href: 'https://www.ibm.com/products/enterprise-tape-drive' },
        { cat: 'Virtual tape', h: 'IBM TS7700: virtual tape for mainframe systems', img: P + 'ibm-ts7700-product-02.png', fit: 'light', href: 'https://www.ibm.com/products/ts7700' },
        { cat: 'Tape library', h: 'IBM TS4300: high-density, air-gapped backup', img: P + 'ibm-ts4300-product-02.png', fit: 'light', href: 'https://www.ibm.com/products/ts4300' },
      ],
    },
    products: {
      title: 'IBM tape storage products', lead: 'From entry-level autoloaders to enterprise-scale libraries, sized and integrated by KACO Systems.',
      cats: [
        { tab: 'Tape libraries', note: 'High-density, air-gapped storage that scales', more: [{ n: 'IBM Diamondback', href: 'https://www.ibm.com/products/diamondback-tape-library' }], items: [
          { n: 'IBM TS4500 Tape Library', tag: 'Next-generation, high-density storage', specs: ['Up to 926 PB with LTO-10', 'Up to 128 tape drives', 'Integrated fleet management'], img: 'ibm-ts4500-product-02.png', learn: 'https://www.ibm.com/products/ts4500', q: 'ibm-ts4500' },
          { n: 'IBM TS4300 Tape Library', tag: 'High-density and easy to manage', specs: ['Up to 25.6 PB with LTO-10', 'Air-gapped cyber-resilient backup', 'Highly scalable architecture'], img: 'ibm-ts4300-product-02.png', learn: 'https://www.ibm.com/products/ts4300', q: 'ibm-ts4300' },
          { n: 'IBM TS2900 Tape Autoloader', tag: 'Low-profile entry-level storage', specs: ['Up to 162 TB with LTO-9', 'Supported on open system platforms', 'Cost-effective long-term retention'], img: 'ibm-ts2900-product-02.png', q: 'ibm-ts2900' },
        ] },
        { tab: 'Tape drives', note: 'Ultra-high-capacity cartridges for archive', items: [
          { n: 'IBM TS1170 Enterprise Tape Drive', tag: 'Ultra-high capacity for cyber-resilient archiving', specs: ['50 TB native, 150 TB compressed', '400 MB/s throughput', '12 Gb SAS and 16 Gb Fibre Channel'], img: 'ibm-ts1170-product-02.png', learn: 'https://www.ibm.com/products/enterprise-tape-drive', q: 'ibm-ts1170' },
        ] },
        { tab: 'Virtual tape & archive', note: 'Mainframe and file-based archive', items: [
          { n: 'IBM TS7700 Virtual Tape Family', tag: 'Virtual tape for mainframe systems', specs: ['Hybrid cloud integration', 'Cloud-based disaster recovery', '8-cluster grid with encryption'], img: 'ibm-ts7700-product-02.png', learn: 'https://www.ibm.com/products/ts7700', q: 'ibm-ts7700' },
          { n: 'IBM Storage Archive', tag: 'LTFS-based file archive', specs: ['Graphical LTFS management interface', 'Physical air-gap protection', 'Industry-standard LTFS format'], img: 'ibm-storage-archive-illustration-01.svg', q: 'ibm-storage-archive' },
        ] },
      ],
    },
    discover: { items: [
      { n: 'IBM tape storage', p: 'Explore IBM tape storage solutions for backup, archive and cyber resilience.', href: 'https://www.ibm.com/solutions/tape-storage', img: P + 'ibm-ts4500-product-02.png', pos: 50, fit: 'contain' },
      { n: 'TS1170 data sheet', p: 'Specifications and capabilities of the IBM TS1170 tape drive.', href: 'https://www.ibm.com/downloads/documents/us-en/107a02e95cc8f7f4', img: P + 'ibm-ts1170-product-02.png', pos: 50, fit: 'contain' },
      { n: 'TS4500 documentation', p: 'Installation, planning and operation guides for the IBM TS4500 tape library.', href: 'https://www.ibm.com/docs/en/ts4500-tape-library', img: P + 'ibm-ts7700-product-02.png', pos: 50, fit: 'contain' },
      { n: 'IT infrastructure integration', p: 'Tape storage installed as part of a wider IT project: servers, cabling and networks.', href: '/solutions/', img: P + 'ibm-ts4300-product-02.png', pos: 50, fit: 'contain' },
    ] },
  },
};
