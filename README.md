# demo-data

Static, self-hosted test fixtures for QA-ing document/web extraction tools —
published via GitHub Pages from `docs/`. Built to test a chat-based skill's
job-advert/document extraction, but the repo isn't scoped to just that — add
other fixture sets here as needed.

**Published at:** https://themartec.github.io/demo-data/

## Why self-hosted fixtures instead of real customer sites/documents

- **Stability.** Real career sites redesign, add bot detection, or switch to
  client-side rendering with no warning — a hand-built fixture never rots
  under us.
- **Control.** Some acceptance criteria specifically require a "simple,
  static, not-SPA" multi-page site — we can guarantee that by construction
  instead of hoping a real site stays that way.
- **Deliberate edge cases.** Real sites won't reliably hand us the hard
  cases on demand (merged spreadsheet headers, a language switch mid-document,
  a page that only renders after JS runs). We can, and that's better QA than
  scraping happy-path real ads.

## Why fictional company names

Documents like a "hiring forecast" or "hiring strategy" are the kind of thing
that, if given the real name of a real customer (or their competitor) and
hosted permanently on a public page, could easily be misread as a leak — bad
optics for a company whose product is employer branding. So every fixture
here uses an invented company name modelled on a real customer's *industry*
(see `docs/manifest.json` for the mapping), not the customer itself. Job ads
and descriptions can still borrow real, generic industry phrasing — it's the
strategy/forecast-shaped documents where this matters most.

## Structure

```
docs/                          ← GitHub Pages source (Settings → Pages → branch: master, folder: /docs)
  .nojekyll                    ← tells Pages to serve files as-is, no Jekyll processing
  index.html                   ← human-browsable landing page
  manifest.json                ← file → which acceptance criteria it satisfies → provenance
  careers-site/                ← plain multi-page HTML fixture (+ a JS-only negative-test page)
  careers-site-spa/            ← genuine client-rendered SPA — same jobs, none of it fetchable statically
  <field>/                     ← one folder per test field (sales, software-engineering, hospitality-operations)
    job-advert.html / .docx
    job-description.txt
    hiring-forecast.xlsx / .pptx / .docx
    hiring-strategy.docx
    market-research.html
  shared/                      ← one company's value proposition + employee stories, reused across role/content/brand
    evp.docx / evp.html
    testimonials/index.html + one page per story
  role/                        ← single role + candidate pool scenario (landing page, links into shared/ + software-engineering/)
  content/                     ← role list vs. testimonial coverage scenario (landing page)
  brand/                       ← home-market vs. target-market scenario (landing page + 2 region research docs)
  edge-cases/                  ← deliberately awkward fixtures (merged cells, mixed language, ...)
scripts/
  fixture-data.ts               ← single source of truth for all per-field job-board content
  generate-fixtures.ts          ← regenerates job-board binaries + derived html/txt from fixture-data.ts
  skill-fixture-data.ts         ← single source of truth for the EVP, testimonials and region research
  generate-skill-fixtures.ts    ← regenerates shared/ and brand/*.docx from skill-fixture-data.ts
```

`role/`, `content/` and `brand/` are deliberately generic names, not the name of
whatever feature/skill they're testing — this is a public page, so the landing
pages describe the *scenario* (single role, role-list coverage, market
adaptation) rather than naming a product feature.

Plain HTML/text files that are structurally unique (the careers-site pages,
`index.html`, `manifest.json`) are hand-authored and committed directly — only
the Office-format binaries (and the per-field HTML/txt that mirrors them)
are generated, so there's exactly one place to edit a field's content.

## Regenerating fixtures

```sh
npm install
npm run generate           # both of the below
npm run generate:jobs      # writes into docs/<field>/ and docs/edge-cases/
npm run generate:skills    # writes into docs/shared/ and docs/brand/*.docx
```

Re-run after editing `scripts/fixture-data.ts` or `scripts/skill-fixture-data.ts`,
then commit the regenerated binaries — they're checked into git (this is
published static content, not a build artifact anyone downloads pre-built).

## Why no Jekyll

GitHub Pages will natively build a Jekyll site with no extra CI config if you
point it at `docs/` — but that means every page goes through Jekyll's
Liquid/Markdown pipeline before being served, which is a real risk here: the
whole point of several of these fixtures (the multi-page careers site, the
merged-header spreadsheet) is that a tool under test parses *exactly* the
markup we wrote. Adding a templating layer between "what we authored" and
"what gets served" is one more thing that could reshape it. `.nojekyll` plus
plain committed files avoids that, and avoids the Ruby/Bundler/gem-version
pinning that keeping a Jekyll site building against GitHub's hosted Jekyll
version otherwise requires.

## Adding a new fixture set

1. Add a folder under `docs/` (new field, or an unrelated fixture set — this
   repo isn't limited to any one skill/feature).
2. If it needs a generated binary format, add a data entry + writer function
   in `scripts/`; otherwise just author the file directly.
3. Add an entry to `docs/manifest.json` — path, which criteria it satisfies,
   and its provenance (`"synthetic"`, or a cited real source if grounded in
   one).
4. Link it from `docs/index.html`.
