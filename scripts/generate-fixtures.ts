// Generates the binary Office fixtures (XLSX/PPTX/DOCX) under docs/<field>/
// and docs/edge-cases/ from scripts/fixture-data.ts. Run with `npm run generate`.
// Everything else in docs/ (HTML, txt, manifest.json) is hand-authored and
// committed directly — only the binary formats benefit from being generated
// from one shared data source instead of hand-built per format.
import * as fs from 'fs';
import * as path from 'path';
import ExcelJS from 'exceljs';
import PptxGenJS from 'pptxgenjs';
import { Document, HeadingLevel, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from 'docx';
import { FIELDS, type RoleRow } from './fixture-data';

const DOCS_DIR = path.join(__dirname, '..', 'docs');

async function writeHiringForecastXlsx(fieldDir: string, roles: RoleRow[]): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Hiring Forecast');
  sheet.columns = [
    { header: 'Role', key: 'role', width: 30 },
    { header: 'Description', key: 'description', width: 60 },
    { header: 'Department', key: 'department', width: 20 },
    { header: 'Region', key: 'region', width: 20 },
  ];
  sheet.getRow(1).font = { bold: true };
  for (const row of roles) sheet.addRow(row);
  await workbook.xlsx.writeFile(path.join(fieldDir, 'hiring-forecast.xlsx'));
}

/**
 * Deliberately harder to parse than the plain forecast: the header row has a
 * merged cell spanning "Role" and "Description" instead of two separate
 * headers, and the data starts two rows down with a blank spacer row. Tests
 * whether the extraction logic assumes a naive "row 1 = headers" layout.
 */
async function writeMergedHeaderEdgeCase(roles: RoleRow[]): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Hiring Forecast');
  sheet.mergeCells('A1:B1');
  sheet.getCell('A1').value = 'Role / Description';
  sheet.getCell('A1').font = { bold: true };
  sheet.getCell('C1').value = 'Department';
  sheet.getCell('C1').font = { bold: true };
  sheet.getCell('D1').value = 'Region';
  sheet.getCell('D1').font = { bold: true };
  // Row 2 left blank on purpose (spacer row some real exports include).
  let rowIndex = 3;
  for (const role of roles) {
    sheet.getCell(`A${rowIndex}`).value = role.role;
    sheet.getCell(`B${rowIndex}`).value = role.description;
    sheet.getCell(`C${rowIndex}`).value = role.department;
    sheet.getCell(`D${rowIndex}`).value = role.region;
    rowIndex += 1;
  }
  sheet.getColumn('A').width = 28;
  sheet.getColumn('B').width = 55;
  sheet.getColumn('C').width = 20;
  sheet.getColumn('D').width = 20;
  await workbook.xlsx.writeFile(path.join(DOCS_DIR, 'edge-cases', 'merged-cell-headers.xlsx'));
}

async function writeHiringForecastPptx(fieldDir: string, company: string, roles: RoleRow[]): Promise<void> {
  const pres = new PptxGenJS();
  const title = pres.addSlide();
  title.addText(`${company}\nHiring Forecast`, {
    x: 0.5, y: 1.5, w: 9, h: 2, fontSize: 32, bold: true, align: 'center',
  });
  for (const role of roles) {
    const slide = pres.addSlide();
    slide.addText(role.role, { x: 0.5, y: 0.4, w: 9, h: 0.7, fontSize: 24, bold: true });
    slide.addText(
      [
        { text: 'Department: ', options: { bold: true } },
        { text: `${role.department}\n` },
        { text: 'Region: ', options: { bold: true } },
        { text: `${role.region}\n\n` },
        { text: role.description },
      ],
      { x: 0.5, y: 1.3, w: 9, h: 4, fontSize: 16 },
    );
  }
  await pres.writeFile({ fileName: path.join(fieldDir, 'hiring-forecast.pptx') });
}

async function writeHiringForecastDocx(fieldDir: string, company: string, roles: RoleRow[]): Promise<void> {
  const headerRow = new TableRow({
    children: ['Role', 'Description', 'Department', 'Region'].map(
      (text) => new TableCell({ children: [new Paragraph({ children: [new TextRun({ text, bold: true })] })] }),
    ),
  });
  const rows = roles.map(
    (role) =>
      new TableRow({
        children: [role.role, role.description, role.department, role.region].map(
          (text) => new TableCell({ children: [new Paragraph(text)] }),
        ),
      }),
  );
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: `${company} — Hiring Forecast`, heading: HeadingLevel.HEADING_1 }),
          new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [headerRow, ...rows] }),
        ],
      },
    ],
  });
  fs.writeFileSync(path.join(fieldDir, 'hiring-forecast.docx'), await Packer.toBuffer(doc));
}

async function writeHiringStrategyDocx(
  fieldDir: string,
  title: string,
  paragraphs: string[],
): Promise<void> {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: title, heading: HeadingLevel.HEADING_1 }),
          ...paragraphs.map((text) => new Paragraph({ text, spacing: { after: 200 } })),
        ],
      },
    ],
  });
  fs.writeFileSync(path.join(fieldDir, 'hiring-strategy.docx'), await Packer.toBuffer(doc));
}

async function writeJobAdvertDocx(
  fieldDir: string,
  advert: { title: string; department: string; region: string; body: string[] },
): Promise<void> {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: advert.title, heading: HeadingLevel.HEADING_1 }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Department: ', bold: true }),
              new TextRun(advert.department),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Region: ', bold: true }), new TextRun(advert.region)],
          }),
          new Paragraph({ text: '' }),
          ...advert.body.map((text) => new Paragraph({ text, spacing: { after: 200 } })),
        ],
      },
    ],
  });
  fs.writeFileSync(path.join(fieldDir, 'job-advert.docx'), await Packer.toBuffer(doc));
}

/**
 * A hiring-strategy document that switches into French for one section
 * without warning — real multinational employers' internal documents
 * sometimes do exactly this for a regional office's contribution. Tests
 * whether extraction breaks or silently drops content on a language switch.
 */
async function writeMixedLanguageEdgeCase(): Promise<void> {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: 'Cascadia Cloud Systems — EMEA Hiring Strategy Addendum', heading: HeadingLevel.HEADING_1 }),
          new Paragraph({
            text:
              'This addendum covers hiring plans for the EMEA region, supplementing the main FY2027 Engineering Hiring Strategy.',
            spacing: { after: 200 },
          }),
          new Paragraph({ text: 'Contribution de l’équipe France', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({
            text:
              'L’équipe française prévoit de recruter trois ingénieurs logiciels seniors au premier semestre 2027, ' +
              'principalement pour renforcer l’équipe Platform Engineering à distance. Le marché du recrutement ' +
              'technique reste très concurrentiel à Paris, notamment face à Vantage Cloud.',
            spacing: { after: 200 },
          }),
          new Paragraph({ text: 'Back to English', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({
            text:
              'All EMEA hires will follow the same remote-first structure described in the main strategy document, ' +
              'reporting into the Austin-based Platform Engineering Lead until a regional lead is hired.',
          }),
        ],
      },
    ],
  });
  fs.writeFileSync(path.join(DOCS_DIR, 'edge-cases', 'mixed-language.docx'), await Packer.toBuffer(doc));
}

function writeJobAdvertHtml(
  fieldDir: string,
  company: string,
  advert: { title: string; department: string; region: string; body: string[] },
): void {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${advert.title} — ${company}</title>
</head>
<body>
  <h1>${advert.title}</h1>
  <p><strong>Department:</strong> ${advert.department}</p>
  <p><strong>Region:</strong> ${advert.region}</p>

${advert.body.map((p) => `  <p>${p}</p>`).join('\n')}
</body>
</html>
`;
  fs.writeFileSync(path.join(fieldDir, 'job-advert.html'), html);
}

function writeJobDescriptionText(fieldDir: string, text: string): void {
  fs.writeFileSync(path.join(fieldDir, 'job-description.txt'), text);
}

function writeMarketResearchHtml(
  fieldDir: string,
  company: string,
  industry: string,
  paragraphs: string[],
): void {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${company} — Talent Market Research</title>
</head>
<body>
  <h1>${company} — Talent Market Research (${industry})</h1>

${paragraphs.map((p) => `  <p>${p}</p>`).join('\n')}
</body>
</html>
`;
  fs.writeFileSync(path.join(fieldDir, 'market-research.html'), html);
}

async function main() {
  for (const field of FIELDS) {
    const fieldDir = path.join(DOCS_DIR, field.key);
    fs.mkdirSync(fieldDir, { recursive: true });
    await writeHiringForecastXlsx(fieldDir, field.roles);
    await writeHiringForecastPptx(fieldDir, field.company, field.roles);
    await writeHiringForecastDocx(fieldDir, field.company, field.roles);
    await writeHiringStrategyDocx(fieldDir, field.strategyTitle, field.strategyParagraphs);
    await writeJobAdvertDocx(fieldDir, field.jobAdvert);
    writeJobAdvertHtml(fieldDir, field.company, field.jobAdvert);
    writeJobDescriptionText(fieldDir, field.jobDescriptionText);
    writeMarketResearchHtml(fieldDir, field.company, field.industry, field.marketResearchParagraphs);
    console.log(`Generated fixtures for ${field.key}`);
  }

  fs.mkdirSync(path.join(DOCS_DIR, 'edge-cases'), { recursive: true });
  await writeMergedHeaderEdgeCase(FIELDS[0].roles);
  await writeMixedLanguageEdgeCase();
  console.log('Generated edge-case fixtures');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
