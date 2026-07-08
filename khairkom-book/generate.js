const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('🚀 بدء تجهيز وتوليد كتاب مقياس خيركم...');

  // 1. Copy cover image
  const srcImage = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\061ecc42-a137-4417-a7b7-147d4f2f0c0f\\cover_family_1783527723657.png';
  const destImage = path.resolve(__dirname, 'cover-family.png');
  
  if (fs.existsSync(srcImage)) {
    console.log('🖼️  نسخ صورة الغلاف...');
    fs.copyFileSync(srcImage, destImage);
  } else {
    console.warn('⚠️  صورة الغلاف غير موجودة في المجلد الأصلي، يرجى التحقق من المسار:', srcImage);
  }

  // 2. Launch Puppeteer
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
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });

  const filePath = path.resolve(__dirname, 'book.html');
  const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;

  console.log('📄 تحميل الصفحة...');
  await page.goto(fileUrl, {
    waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
    timeout: 90000
  });

  console.log('⏳ انتظار تحميل الخطوط والصور...');
  await sleep(4000);

  // Inject print overrides
  await page.addStyleTag({
    content: `
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      body { background: white !important; }
      .page {
        width: 210mm !important;
        min-height: 297mm !important;
        margin: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        page-break-after: always !important;
        break-after: page !important;
      }
    `
  });

  await sleep(1000);

  const outputPath = path.resolve(__dirname, 'مقياس-خيركم-لتقييم-العلاقة-الزوجية.pdf');
  console.log('🖨️  جاري تصدير PDF عالي الجودة...');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
    scale: 1,
    timeout: 120000
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log('');
  console.log('✅ تم توليد PDF بنجاح!');
  console.log('📁 المسار:', outputPath);
  console.log('📦 الحجم:', sizeMB, 'MB');
  console.log('');
})().catch(err => {
  console.error('❌ خطأ:', err.message);
  process.exit(1);
});
