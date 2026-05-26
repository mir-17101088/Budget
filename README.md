# Budget at a Glance · FY 2025—26

An editorial visualization of Bangladesh's national budget, built with HTML, CSS and React (loaded via CDN — no build step required).

## Pages

| File                        | Description                                |
| --------------------------- | ------------------------------------------ |
| `Budget at a Glance.html`   | Home — taka note, GDP share, treemap, debt |
| `Price Impact.html`         | What gets pricier, what gets cheaper       |
| `Sector Deep Dive.html`     | 14 sectors, FY09 → FY26 panel              |
| `index.html`                | Redirects to the home page                 |

## Local development

There is **no build step**. Just open `index.html` in a browser, or run a local static server so the JSX files load cleanly:

```bash
# any of these will work
python3 -m http.server 5173
# or
npx serve .
# or
npx http-server -p 5173
```

Then visit `http://localhost:5173`.

You can edit any `.jsx`, `.css` or `.html` file and refresh the browser — no compile cycle.

## Deploying to Vercel

1. Download / clone this folder.
2. Push it to a GitHub repository.
3. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
4. **Framework Preset:** *Other* (Vercel will detect a static site automatically).
5. Click **Deploy**. There is no build command and no output directory to configure.

`vercel.json` in the project root tells Vercel to treat this as a plain static site and to serve `index.html` at `/`.

## Where to edit the data

All numbers live in two data files. Every chart on the page reads from these arrays — change a value, refresh the browser, the chart updates.

### 1. `app-data.jsx` — home page

| Array            | What it drives                                | Year range    |
| ---------------- | --------------------------------------------- | ------------- |
| `TAKA_SECTORS`   | 100-taka note + per-sector 5-year bar charts  | FY22 → FY26   |
| `GDP_DATA`       | Budget as % of GDP line chart                 | FY09 → FY26   |
| `TREEMAP`        | Ministry treemap                              | FY26 snapshot |
| `INTEREST_DATA`  | Interest payment stacked bars (domestic/foreign) | FY09 → FY26 |
| `NEWS`           | News card grid                                | —             |

The `TAKA_SECTORS` `series` arrays are positional. The 5 values are `[FY22, FY23, FY24, FY25, FY26]`. Just edit the numbers and the bar chart updates.

### 2. `sector-data.jsx` — sector deep-dive page

The single source of truth here is the `SECTOR_VALUES` object — one block per sector, with a key for every fiscal year from FY09 to FY26. Edit `FY26: 157000` (or any other year) and the sector grid, the stacked bar chart, the heatmap, and the rankings table all pick it up.

```js
interest: {
  color: "#C60001", parent: "Interest",
  FY09: 15180, FY10: 14868, …, FY22: 92107,
  FY23: 106600, FY24: 122100, FY25: 138900, FY26: 157000,  // ← edit me
},
```

Also editable from this file:
- `IMPL` — implementation rate (%) per fiscal year for the gauge dials.
- `DEPTS` — top 15 department snapshot for the rankings bars.

### 3. `price-data.jsx` — Price Impact page

- `PRICIER`, `CHEAPER` — six items each, edited as plain arrays.
- `TAX_REVENUE` — donut chart slices.
- `SUBSIDY` — 5-year subsidy bar chart, `FY22 → FY26`.
- `HOUSEHOLD` — calculator pie.

### Mock data flag

Wherever the README or comments say *"mock"*, the value is a placeholder so the layout has something to render. Replace with the official Ministry of Finance number when it's released.

## Project structure

```
/
├── index.html                  ← redirects to the home page
├── Budget at a Glance.html     ← home
├── Price Impact.html
├── Sector Deep Dive.html
│
├── app.jsx                     ← home page React root
├── app-data.jsx                ← home-page data + Nav + Hero
├── app-taka-gdp.jsx            ← TakaSection + GDPSection
├── app-rest.jsx                ← Treemap + Debt + News + Footer
│
├── price-app.jsx               ← Price Impact React root
├── price-data.jsx              ← Price Impact data + section components
├── price-charts.jsx            ← donut + subsidy bar chart
├── price-calc.jsx              ← household calculator
│
├── sector-app.jsx              ← Sector Deep Dive React root
├── sector-data.jsx             ← ★ EDIT HERE — per-year totals
├── sector-grid.jsx             ← sector card grid + expanded view
├── sector-charts.jsx           ← heatmap + rankings + gauges
│
├── tweaks-panel.jsx            ← reusable tweak controls
├── styles.css                  ← global tokens + home page
├── styles-price.css            ← price page additive styles
├── styles-sector.css           ← sector page additive styles
│
├── assets/
│   ├── logo.svg
│   └── 100_taka_note.jpg
│
└── vercel.json                 ← optional Vercel config
```

## Source

Ministry of Finance, Bangladesh · Bangladesh Bureau of Statistics · Bangladesh Bank.

Designed & engineered by The Daily Star Digital Team.
