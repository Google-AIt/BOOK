const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('🚀 بدء تجهيز وتوليد كتاب مقياس خيركم (النسخة الفاخرة المحدثة)...');

  // 1. Copy logo.png from root
  const srcLogo = path.resolve(__dirname, '..', 'logo.png');
  const destLogo = path.resolve(__dirname, 'logo.png');
  if (fs.existsSync(srcLogo)) {
    console.log('🖼️  نسخ شعار خيركم (logo.png)...');
    fs.copyFileSync(srcLogo, destLogo);
  } else {
    console.warn('⚠️  شعار logo.png غير موجود في المجلد الرئيسي:', srcLogo);
  }

  // 2. Copy generated illustrations from brain directory
  const images = {
    'cover_premium_emblem_1783528699820.png': 'cover-family.png',
    'axis1_housework_1783528717033.png': 'axis1.png',
    'axis2_children_1783528730010.png': 'axis2.png',
    'axis3_finance_1783528743512.png': 'axis3.png',
    'axis4_social_1783528755821.png': 'axis4.png',
    'axis5_emotional_1783528767164.png': 'axis5.png'
  };

  const brainDir = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\061ecc42-a137-4417-a7b7-147d4f2f0c0f';

  for (const [srcName, destName] of Object.entries(images)) {
    const srcPath = path.resolve(brainDir, srcName);
    const destPath = path.resolve(__dirname, destName);
    if (fs.existsSync(srcPath)) {
      console.log(`🖼️  نسخ صورة المحور: ${destName}...`);
      fs.copyFileSync(srcPath, destPath);
    } else {
      console.error(`❌ خطأ: لم يتم العثور على الصورة المصدر: ${srcPath}`);
    }
  }

  // 3. Launch Puppeteer
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

  console.log('⏳ انتظار تحميل الخطوط والصور الاحترافية...');
  await sleep(5000);

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

  const outputPath = path.resolve(__dirname, 'مقياس-خيركم-النسخة-الفاخرة.pdf');
  console.log('🖨️  جاري تصدير PDF عالي الجودة للنسخة الفاخرة...');

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
  console.log('✅ تم توليد PDF للنسخة الفاخرة بنجاح!');
  console.log('📁 المسار:', outputPath);
  console.log('📦 الحجم:', sizeMB, 'MB');
  console.log('');
})().catch(err => {
  console.error('❌ خطأ:', err.message);
  process.exit(1);
});
