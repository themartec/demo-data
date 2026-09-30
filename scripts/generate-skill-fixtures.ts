// Generates the shared EVP + market-research binaries for the role/content/
// brand fixture areas. Run via `npm run generate` (see package.json).
import * as fs from 'fs';
import * as path from 'path';
import { Document, HeadingLevel, Packer, Paragraph } from 'docx';
import { EVP_COMPANY, EVP_PILLARS, MARKET_REGIONS, TESTIMONIALS } from './skill-fixture-data';

const DOCS_DIR = path.join(__dirname, '..', 'docs');

async function writeEvpDocx(): Promise<void> {
  const dir = path.join(DOCS_DIR, 'shared');
  fs.mkdirSync(dir, { recursive: true });
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: `${EVP_COMPANY} — Employee Value Proposition`, heading: HeadingLevel.HEADING_1 }),
          ...EVP_PILLARS.flatMap((pillar) => [
            new Paragraph({ text: pillar.title, heading: HeadingLevel.HEADING_2 }),
            new Paragraph({ text: pillar.body, spacing: { after: 200 } }),
          ]),
        ],
      },
    ],
  });
  fs.writeFileSync(path.join(dir, 'evp.docx'), await Packer.toBuffer(doc));
}

function writeEvpHtml(): void {
  const dir = path.join(DOCS_DIR, 'shared');
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${EVP_COMPANY} — Employee Value Proposition</title>
</head>
<body>
  <h1>${EVP_COMPANY} — Employee Value Proposition</h1>
${EVP_PILLARS.map((p) => `  <h2>${p.title}</h2>\n  <p>${p.body}</p>`).join('\n')}
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, 'evp.html'), html);
}

async function writeMarketResearchDocx(): Promise<void> {
  const dir = path.join(DOCS_DIR, 'brand');
  fs.mkdirSync(dir, { recursive: true });
  for (const region of MARKET_REGIONS) {
    const section = (title: string, points: string[]) => [
      new Paragraph({ text: title, heading: HeadingLevel.HEADING_2 }),
      ...points.map((text) => new Paragraph({ text: `• ${text}`, spacing: { after: 120 } })),
    ];
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: `${region.market} Talent Market Research — prepared for ${EVP_COMPANY} (home market: ${region.homeMarket})`,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: `Named local competitors referenced below: ${region.competitors.join(', ')}.`,
              spacing: { after: 200 },
            }),
            ...section('Talent market', region.talentMarket),
            ...section('Compensation and benefits', region.compensationAndBenefits),
            ...section('Working culture', region.workingCulture),
            ...section('Legal and compliance', region.legalAndCompliance),
            ...section('Recruiting channels', region.recruitingChannels),
          ],
        },
      ],
    });
    fs.writeFileSync(path.join(dir, `market-research-${region.key}.docx`), await Packer.toBuffer(doc));
  }
}

function writeTestimonialPages(): void {
  const dir = path.join(DOCS_DIR, 'shared', 'testimonials');
  fs.mkdirSync(dir, { recursive: true });

  for (const t of TESTIMONIALS) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${t.storyTitle} — ${EVP_COMPANY}</title>
</head>
<body>
  <h1>${t.storyTitle}</h1>
  <p><strong>Employee:</strong> ${t.employeeName}</p>
  <p><strong>Role:</strong> ${t.role}</p>
  <p><strong>Team:</strong> ${t.team}</p>
  <p><strong>Location:</strong> ${t.location}</p>
  <p><strong>Tenure:</strong> ${t.tenure}</p>
  <p><strong>Published:</strong> ${t.publishedDate}</p>
  <blockquote>
    <p>&ldquo;${t.quote}&rdquo;</p>
  </blockquote>
</body>
</html>
`;
    fs.writeFileSync(path.join(dir, `${t.slug}.html`), html);
  }

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${EVP_COMPANY} — Employee stories</title>
</head>
<body>
  <h1>${EVP_COMPANY} — Employee stories</h1>
  <ul>
${TESTIMONIALS.map(
  (t) =>
    `    <li><a href="${t.slug}.html">${t.storyTitle}</a> — ${t.employeeName}, ${t.role} (${t.location})</li>`,
).join('\n')}
  </ul>
</body>
</html>
`;
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);
}

async function main() {
  await writeEvpDocx();
  writeEvpHtml();
  await writeMarketResearchDocx();
  writeTestimonialPages();
  console.log('Generated shared EVP, testimonial and market-research fixtures');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
