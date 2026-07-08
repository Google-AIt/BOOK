const puppeteer = require('puppeteer');
const path = require('path');
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('🚀 جاري إنشاء ملف PDF للعبة سكن ومودة...');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-file-access-from-files',
      '--enable-local-file-accesses',
      '--font-render-hinting=none',
      '--disable-gpu',
    ]
  });

  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  
  // Set viewport to A4 size
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const filePath = path.resolve(__dirname, 'sakan-mawaddah.html');
  const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

  console.log('📄 تحميل الصفحة:', fileUrl);
  await page.goto(fileUrl, {
    waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
    timeout: 90000
  });

  console.log('⏳ انتظار تحميل الخطوط وعناصر الصفحة...');
  await sleep(6000); // Wait for dynamic cards script

  // Inject print styles specific to Sakan & Mawaddah print compilation
  await page.addStyleTag({
    content: `
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body { background: white !important; color: black !important; padding-top: 0 !important; }
      .top-nav, .hero-section, .section-header-wrap, .gallery-filters, .search-wrap,
      .booklet-nav, .score-calculator, footer {
        display: none !important;
      }
      .section {
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
      }
      .glass-panel {
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
      }
      /* Clean print format for cards: 9 cards per A4 page */
      .cards-grid {
        display: grid !important;
        grid-template-columns: repeat(3, 70mm) !important;
        grid-auto-rows: 95mm !important;
        gap: 5mm !important;
        justify-content: center !important;
        page-break-inside: avoid !important;
        margin-top: 15mm !important;
      }
      .card-container {
        height: 95mm !important;
        width: 70mm !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
      }
      .card-inner {
        transform: none !important;
        transition: none !important;
      }
      .card-front {
        position: relative !important;
        width: 70mm !important;
        height: 95mm !important;
        border: 1px solid #000 !important;
        border-radius: 5mm !important;
        box-shadow: none !important;
        page-break-inside: avoid !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        padding: 6mm !important;
      }
      .card-back {
        display: none !important;
      }
      .card-question {
        font-size: 14pt !important;
        line-height: 1.6 !important;
        color: black !important;
      }
      .card-header {
        font-size: 9pt !important;
      }
      .card-footer {
        font-size: 8pt !important;
        padding-top: 5px !important;
      }
    `
  });

  await sleep(2000);

  const outputPath = path.resolve(__dirname, 'سكن-ومودة-خيركم.pdf');
  console.log('🖨 جاري تصدير ملف PDF للعبة سكن ومودة...');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
    preferCSSPageSize: false,
    scale: 1,
    timeout: 120000
  });

  await browser.close();

  const fs = require('fs');
  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log('');
  console.log('✅ تم توليد PDF للعبة بنجاح!');
  console.log('📁 المسار:', outputPath);
  console.log('📦 الحجم:', sizeMB, 'MB');
  console.log('');
})().catch(err => {
  console.error('❌ خطأ:', err.message);
  process.exit(1);
});
