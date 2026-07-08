// app.js

const App = {
  state: {
    theme: 'emerald',
    mode: 'light',
    viewport: 'desktop',
    section: 'brand',
    lang: 'en' // 'en' or 'ar'
  },

  init() {
    this.bindEvents();
    this.navigateTo(this.state.section);
    this.updateThemeUI();
    this.applyLanguage();
  },

  bindEvents() {
    // Navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        this.navigateTo(section);
      });
    });

    // Viewport switchers
    document.querySelectorAll('.viewport-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const size = btn.getAttribute('data-viewport');
        this.setViewport(size);
      });
    });
  },

  navigateTo(section) {
    this.state.section = section;
    
    // Update sidebar navigation active states
    document.querySelectorAll('.nav-item').forEach(item => {
      if (item.getAttribute('data-section') === section) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    const mainTitle = document.getElementById('mainTitle');
    const hubShell = document.getElementById('hubShell');
    const deviceFrame = document.getElementById('deviceFrame');
    const deviceWrapper = document.getElementById('deviceWrapper');

    // Reset view visibility
    hubShell.style.display = 'none';
    deviceWrapper.style.display = 'none';

    // Show device wrapper if it's one of the platform mockup pages, else show the static documentation hub
    const platformPages = ['dashboard', 'auth', 'learning', 'marketplace', 'community', 'ai', 'settings'];

    const lang = this.state.lang;
    const isAr = lang === 'ar';

    if (platformPages.includes(section)) {
      deviceWrapper.style.display = 'flex';
      
      // Inject page template into the frame
      const pageObj = window.Pages[section];
      if (pageObj) {
        // Handle bilingual title
        mainTitle.innerText = isAr ? pageObj.title.ar : pageObj.title.en;
        deviceFrame.innerHTML = `
          <div class="preview-container">
            ${pageObj.render(lang)}
          </div>
        `;
        // Initialize page elements
        if (pageObj.init) pageObj.init();
        
        // Re-initialize core components inside the dynamic frame
        if (window.Components) window.Components.init();
      }
    } else {
      hubShell.style.display = 'block';
      this.renderStaticSection(section);
    }
  },

  setViewport(size) {
    this.state.viewport = size;
    const deviceContainer = document.getElementById('deviceContainer');
    
    // Set active viewport selector styles
    document.querySelectorAll('.viewport-btn').forEach(btn => {
      if (btn.getAttribute('data-viewport') === size) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Set class name on container for CSS sizing
    deviceContainer.className = `device-container viewport-${size}`;
    
    const isAr = this.state.lang === 'ar';
    Components.showToast(
      isAr ? `تم تبديل العرض إلى ${size === 'mobile' ? 'الهاتف المحمول' : size === 'tablet' ? 'الأجهزة اللوحية' : 'الشاشة الكاملة'}` : `Switched view to ${size.toUpperCase()}`, 
      'info'
    );
  },

  setTheme(themeName) {
    this.state.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    this.updateThemeUI();
    const isAr = this.state.lang === 'ar';
    Components.showToast(isAr ? `تم تغيير نظام الألوان!` : `Switched Theme to ${themeName.toUpperCase()}`, 'success');
  },

  toggleDarkMode() {
    const nextMode = this.state.mode === 'light' ? 'dark' : 'light';
    this.state.mode = nextMode;
    const isAr = this.state.lang === 'ar';
    
    if (nextMode === 'dark') {
      document.documentElement.setAttribute('data-mode', 'dark');
      document.getElementById('darkModeToggle').innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
        ${isAr ? "الوضع المضيء" : "Light Mode"}
      `;
    } else {
      document.documentElement.removeAttribute('data-mode');
      document.getElementById('darkModeToggle').innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        ${isAr ? "الوضع الداكن" : "Dark Mode"}
      `;
    }

    Components.showToast(
      isAr ? `تم تبديل المظهر إلى الوضع ${nextMode === 'dark' ? 'الداكن' : 'المضيء'}` : `Theme mode updated to ${nextMode.toUpperCase()}`, 
      'info'
    );
  },

  toggleLanguage() {
    const nextLang = this.state.lang === 'en' ? 'ar' : 'en';
    this.state.lang = nextLang;
    this.applyLanguage();
    Components.showToast(nextLang === 'ar' ? "تم تفعيل اللغة العربية!" : "Language switched to English!", "success");
  },

  applyLanguage() {
    const lang = this.state.lang;
    const isAr = lang === 'ar';
    
    // Update HTML dir attribute
    if (isAr) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }

    // Toggle button text
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.innerText = isAr ? "English" : "العربية";
    }

    // Translate Sidebar
    const translations = {
      en: {
        fTitle: "Foundation",
        brand: "Brand Identity",
        tokens: "Design Tokens",
        components: "UI Components",
        pTitle: "Platform Pages",
        dashboard: "Overview Dashboard",
        auth: "Authentication state",
        learning: "Learning Platform",
        marketplace: "Values Marketplace",
        community: "Community Forum",
        ai: "AI Smart Assistant",
        settings: "Settings & Account",
        dTitle: "Developers",
        docs: "Integration Docs",
        version: "v1.0.0 (High Fidelity)",
        modeDark: "Dark Mode",
        modeLight: "Light Mode"
      },
      ar: {
        fTitle: "الأساسيات",
        brand: "الهوية التجارية",
        tokens: "رموز التصميم",
        components: "مكونات واجهة المستخدم",
        pTitle: "صفحات المنصة",
        dashboard: "لوحة التحكم الرئيسية",
        auth: "شاشات تسجيل الدخول",
        learning: "المنصة التعليمية",
        marketplace: "متجر خيركم",
        community: "مجتمع خيركم",
        ai: "مساعد الذكاء الاصطناعي",
        settings: "الإعدادات والحساب",
        dTitle: "المطورون",
        docs: "توثيق المطورين",
        version: "نسخة 1.0.0 (عالية الدقة)",
        modeDark: "الوضع الداكن",
        modeLight: "الوضع المضيء"
      }
    };

    const currentTrans = translations[lang];

    // Find and update Group Titles
    const groups = document.querySelectorAll('.nav-group-title');
    if (groups.length >= 3) {
      groups[0].innerText = currentTrans.fTitle;
      groups[1].innerText = currentTrans.pTitle;
      groups[2].innerText = currentTrans.dTitle;
    }

    // Update nav items text
    document.querySelectorAll('.nav-item').forEach(item => {
      const sec = item.getAttribute('data-section');
      const icon = item.querySelector('.nav-item-icon').innerText;
      if (currentTrans[sec]) {
        item.innerHTML = `<span class="nav-item-icon">${icon}</span> ${currentTrans[sec]}`;
      }
    });

    // Update footer version
    const footerSub = document.querySelector('.sidebar-footer div div');
    if (footerSub) footerSub.innerText = currentTrans.version;

    // Update Dark Mode button
    const darkBtn = document.getElementById('darkModeToggle');
    if (darkBtn) {
      const icon = this.state.mode === 'light' 
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
      darkBtn.innerHTML = `${icon} ${this.state.mode === 'light' ? currentTrans.modeDark : currentTrans.modeLight}`;
    }

    // Re-render current page
    this.navigateTo(this.state.section);
  },

  updateThemeUI() {
    document.querySelectorAll('.theme-option-btn').forEach(btn => {
      if (btn.getAttribute('data-theme-val') === this.state.theme) {
        btn.style.borderWidth = '2px';
        btn.style.borderColor = 'var(--theme-primary)';
      } else {
        btn.style.borderWidth = '1px';
        btn.style.borderColor = 'var(--theme-border-color)';
      }
    });
  },

  // --- RENDER BRAND / TOKENS / COMPONENTS / DOCS STATIC PAGES (BILINGUAL) ---
  renderStaticSection(section) {
    const mainTitle = document.getElementById('mainTitle');
    const docArea = document.getElementById('hubContentArea');
    const isAr = this.state.lang === 'ar';

    if (section === 'brand') {
      mainTitle.innerText = isAr ? "دليل الهوية التجارية" : "Brand Identity Guidelines";
      
      let principlesHTML = BrandRules.principles.map(p => `
        <div class="card card-body">
          <h4 style="margin:0 0 6px 0; font-size:14.5px; font-weight:700; color:var(--theme-primary);">${isAr && p.titleAr ? p.titleAr : p.title}</h4>
          <p style="margin:0; font-size:12.5px; color:var(--theme-text-muted); line-height:1.5;">${isAr && p.descAr ? p.descAr : p.desc}</p>
        </div>
      `).join('');

      let logoRulesHTML = (isAr ? [
        "يجب دائمًا إظهار الشعار بنسبه الأصلية وتناسقه اللوني (قلب وردي داكن، لوح فحص أبيض، نص رمادي ووردي).",
        "لا تقم بقص، أو مط، أو تدوير، أو تغيير ألوان الشعار.",
        "تأكد من وجود مساحة فارغة حول الشعار تعادل 25% من طول الشعار من جميع الاتجاهات.",
        "ضعه على خلفية ذات تباين عالي لضمان سهولة القراءة (أبيض دافئ، رمادي فاتح، أو فحمي داكن)."
      ] : BrandRules.logoRules.guidelines).map(rule => `
        <li style="margin-bottom:6px;">${rule}</li>
      `).join('');

      let voiceTraitsHTML = (isAr ? [
        { trait: "متعاطف وودود", desc: "نتحدث بدفء واحترام ونرحب بالمتعلمين والمبدعين ونشجعهم." },
        { trait: "واضح ومحترف", desc: "لا نستخدم مصطلحات معقدة غير ضرورية، ونقدم إرشادات مباشرة وبسيطة." },
        { trait: "ملهم وموجه نحو النمو", desc: "نسلط الضوء على الإنجازات ومؤشرات التقدم لتعزيز المعرفة." }
      ] : BrandRules.voiceAndTone.traits).map(t => `
        <div style="margin-bottom:12px;">
          <strong style="color:var(--theme-primary);">${t.trait}:</strong>
          <span style="font-size:12.5px; color:var(--theme-text-muted); display:block; margin-top:2px;">${t.desc}</span>
        </div>
      `).join('');

      docArea.innerHTML = `
        <div style="margin-bottom:var(--space-6);">
          <h2 style="font-size:22px; font-weight:800; margin:0 0 8px 0;">${isAr ? "رؤية العلامة التجارية" : "Brand Vision"}</h2>
          <p style="margin:0; font-size:14.5px; line-height:1.6; color:var(--theme-text-muted); max-width:700px;">
            ${isAr 
              ? "تمكين الأفراد والعائلات والمجتمعات من خلال تكنولوجيا تعليمية متميزة، واتصالات سوقية مدفوعة بالقيم، ومساعد ذكي مدعوم بالذكاء الاصطناعي، متجذر في الأصالة الثقافية وتجربة المستخدم الحديثة." 
              : BrandRules.vision}
          </p>
        </div>

        <div style="margin-bottom:var(--space-6);">
          <h2 style="font-size:20px; font-weight:800; margin:0 0 16px 0;">${isAr ? "مبادئ التصميم المرئي" : "Visual Principles"}</h2>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            ${principlesHTML}
          </div>
        </div>

        <div class="card card-body" style="margin-bottom:var(--space-6); background:var(--theme-surface);">
          <h2 style="font-size:20px; font-weight:800; margin:0 0 12px 0;">${isAr ? "إرشادات استخدام الشعار" : "Logo Usage Rules"}</h2>
          <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:var(--space-5);">
            <div>
              <p style="font-size:13px; color:var(--theme-text-muted); margin:0 0 12px 0;">
                ${isAr ? "شعار خيركم الرسمي هو علامة تجارية مسجلة ويجب إظهاره بالالتزام التام بحدود الهوامش الفارغة:" : "The official Khairkom logo is a registered brand mark and must follow strict spacing constraints:"}
              </p>
              <ul style="font-size:13px; padding-left:20px; padding-right:20px; line-height:1.6;">
                ${logoRulesHTML}
              </ul>
            </div>
            <div style="background:var(--theme-bg); border:1px dashed var(--theme-border-color); border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; padding:20px;">
              <img src="./assets/logo.png" alt="Khairkom Logo Preview" style="height:56px; object-fit:contain;">
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-5);">
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:16px; font-weight:800;">${isAr ? "نبرة الصوت وأسلوب الكتابة" : "Copywriting Voice & Tone"}</h3>
            ${voiceTraitsHTML}
          </div>
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:16px; font-weight:800;">${isAr ? "آداب استخدام الأيقونات والخطوط" : "Iconography & Layout Rules"}</h3>
            <p style="font-size:13px; color:var(--theme-text-muted); line-height:1.5; margin:0 0 12px 0;">
              ${isAr ? "أيقونات خطية ثنائية التون (Duo-tone) بسُمك 1.5 بكسل وحواف مستديرة تتناسق وتتلون تلقائياً مع نظام الألوان الفعال." : BrandRules.iconography.style}
            </p>
            <ul style="font-size:13px; padding-left:20px; padding-right:20px; line-height:1.6;">
              ${(isAr ? [
                "استخدم الأيقونات المفرغة للحالة العادية، والمملوءة للحالة النشطة.",
                "قم بمحاذاة وتوسيط الأيقونة دائماً داخل صندوق الاحتواء الخاص بها.",
                "يجب أن تكون الأيقونات التفاعلية بمساحة لمس لا تقل عن 44 بكسل على أجهزة الهاتف المحمول."
              ] : BrandRules.iconography.rules).map(r => `<li style="margin-bottom:4px;">${r}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    } 
    else if (section === 'tokens') {
      mainTitle.innerText = isAr ? "مفتش رموز التصميم (Tokens)" : "Design Tokens Inspector";

      docArea.innerHTML = `
        <p style="color:var(--theme-text-muted); font-size:14px; margin:0 0 24px 0;">
          ${isAr 
            ? "نعرض أدناه رموز التصميم النشطة للمنصة والتي تتضمن شبكة الهوامش، أحجام الخطوط، زوايا الانحناء وسلوك الألوان المتغيرة." 
            : "Below are the active design tokens representing spacing, typography scales, border radius settings, and theme colors."}
        </p>

        <!-- Dynamic Colors Token Row -->
        <div style="margin-bottom:var(--space-6);">
          <h3 style="font-size:16px; font-weight:700; margin:0 0 12px 0;">${isAr ? "ألوان السمة التفاعلية" : "Interactive Theme Colors"}</h3>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:12px;">
            <div style="text-align:center;">
              <div style="height:60px; border-radius:var(--radius-sm); background:var(--theme-primary); margin-bottom:6px;"></div>
              <strong style="font-size:12px;">${isAr ? "اللون الأساسي" : "Primary Color"}</strong>
              <div style="font-size:10px; color:var(--theme-text-muted); font-family:monospace; margin-top:2px;">--theme-primary</div>
            </div>
            <div style="text-align:center;">
              <div style="height:60px; border-radius:var(--radius-sm); background:var(--theme-accent); margin-bottom:6px;"></div>
              <strong style="font-size:12px;">${isAr ? "لون التأكيد" : "Accent Color"}</strong>
              <div style="font-size:10px; color:var(--theme-text-muted); font-family:monospace; margin-top:2px;">--theme-accent</div>
            </div>
            <div style="text-align:center;">
              <div style="height:60px; border-radius:var(--radius-sm); background:var(--theme-secondary); margin-bottom:6px;"></div>
              <strong style="font-size:12px;">${isAr ? "اللون الثانوي" : "Secondary Color"}</strong>
              <div style="font-size:10px; color:var(--theme-text-muted); font-family:monospace; margin-top:2px;">--theme-secondary</div>
            </div>
            <div style="text-align:center;">
              <div style="height:60px; border-radius:var(--radius-sm); background:var(--theme-success); margin-bottom:6px;"></div>
              <strong style="font-size:12px;">${isAr ? "حالة النجاح" : "Success State"}</strong>
              <div style="font-size:10px; color:var(--theme-text-muted); font-family:monospace; margin-top:2px;">--theme-success</div>
            </div>
            <div style="text-align:center;">
              <div style="height:60px; border-radius:var(--radius-sm); background:var(--theme-danger); margin-bottom:6px;"></div>
              <strong style="font-size:12px;">${isAr ? "حالة الخطر" : "Danger State"}</strong>
              <div style="font-size:10px; color:var(--theme-text-muted); font-family:monospace; margin-top:2px;">--theme-danger</div>
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-5);">
          <!-- Spacing -->
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:700;">${isAr ? "متغيرات الهوامش والمسافات (شبكة 4px)" : "Spacing Variables (4px Grid)"}</h3>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span>--space-1 (4px)</span>
                <div style="width:4px; height:8px; background:var(--theme-primary);"></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span>--space-2 (8px)</span>
                <div style="width:8px; height:8px; background:var(--theme-primary);"></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span>--space-3 (12px)</span>
                <div style="width:12px; height:8px; background:var(--theme-primary);"></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span>--space-4 (16px)</span>
                <div style="width:16px; height:8px; background:var(--theme-primary);"></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span>--space-5 (24px)</span>
                <div style="width:24px; height:8px; background:var(--theme-primary);"></div>
              </div>
            </div>
          </div>

          <!-- Radius -->
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:700;">${isAr ? "زوايا الانحناء (Border Radii)" : "Border Radii (Corners)"}</h3>
            <div style="display:flex; gap:12px; justify-content:space-around;">
              <div style="text-align:center;">
                <div style="width:40px; height:40px; border-radius:var(--radius-sm); border:2px solid var(--theme-primary); margin:0 auto 4px auto;"></div>
                <span style="font-size:11px;">${isAr ? "صغير (8px)" : "Small (8px)"}</span>
              </div>
              <div style="text-align:center;">
                <div style="width:40px; height:40px; border-radius:var(--radius-md); border:2px solid var(--theme-primary); margin:0 auto 4px auto;"></div>
                <span style="font-size:11px;">${isAr ? "متوسط (12px)" : "Medium (12px)"}</span>
              </div>
              <div style="text-align:center;">
                <div style="width:40px; height:40px; border-radius:var(--radius-lg); border:2px solid var(--theme-primary); margin:0 auto 4px auto;"></div>
                <span style="font-size:11px;">${isAr ? "كبير (16px)" : "Large (16px)"}</span>
              </div>
              <div style="text-align:center;">
                <div style="width:40px; height:40px; border-radius:var(--radius-xl); border:2px solid var(--theme-primary); margin:0 auto 4px auto;"></div>
                <span style="font-size:11px;">${isAr ? "دائري ناعم (24px)" : "Squircle (24px)"}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } 
    else if (section === 'components') {
      mainTitle.innerText = isAr ? "دليل مكونات واجهة المستخدم التفاعلية" : "Interactive UI Components Library";

      docArea.innerHTML = `
        <p style="color:var(--theme-text-muted); font-size:14px; margin:0 0 24px 0;">
          ${isAr 
            ? "استعرض المكونات الرئيسية التي تعتمد عليها شاشات المنصة. انقر فوق زر <strong>عرض الكود</strong> لرؤية الأكواد البرمجية." 
            : "Preview the primary design system components. Click <strong>\"View Code\"</strong> to inspect clean HTML snippets."}
        </p>

        <!-- Buttons Panel -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header">
            <h4 style="margin:0; font-size:15px; font-weight:700;">${isAr ? "الأزرار التفاعلية" : "Interactive Buttons"}</h4>
            <button class="btn btn-sm btn-outline" onclick="App.toggleCodeBlock('btnCode')">${isAr ? "عرض الكود" : "View Code"}</button>
          </div>
          <div class="card-body" style="display:flex; gap:12px; flex-wrap:wrap;">
            <button class="btn btn-primary">${isAr ? "زر أساسي" : "Primary Button"}</button>
            <button class="btn btn-secondary">${isAr ? "زر ثانوي" : "Secondary Button"}</button>
            <button class="btn btn-accent">${isAr ? "زر تأكيد" : "Accent Button"}</button>
            <button class="btn btn-outline">${isAr ? "زر إطار" : "Outline Button"}</button>
            <button class="btn btn-ghost">${isAr ? "رابط نصي" : "Ghost Link"}</button>
          </div>
          <div id="btnCode" style="display:none; padding:12px 18px; background:rgba(0,0,0,0.03); border-top:1px solid var(--theme-border-color); font-family:monospace; font-size:12px; white-space:pre-wrap; color:var(--theme-text-muted);">
&lt;button class="btn btn-primary"&gt;Primary Button&lt;/button&gt;
&lt;button class="btn btn-secondary"&gt;Secondary Button&lt;/button&gt;
&lt;button class="btn btn-accent"&gt;Accent Button&lt;/button&gt;
&lt;button class="btn btn-outline"&gt;Outline Button&lt;/button&gt;
          </div>
        </div>

        <!-- Badges & Indicators -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header">
            <h4 style="margin:0; font-size:15px; font-weight:700;">${isAr ? "الشارات والبطاقات التعريفية" : "Badges & Labels"}</h4>
            <button class="btn btn-sm btn-outline" onclick="App.toggleCodeBlock('badgeCode')">${isAr ? "عرض الكود" : "View Code"}</button>
          </div>
          <div class="card-body" style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
            <span class="badge badge-primary">${isAr ? "شارة أساسية" : "Primary Tag"}</span>
            <span class="badge badge-accent">${isAr ? "شارة تأكيد" : "Accent Tag"}</span>
            <span class="badge badge-success">${isAr ? "مكتمل" : "Completed"}</span>
            <span class="badge badge-warning">${isAr ? "قيد الانتظار" : "Pending"}</span>
            <span class="badge badge-danger">${isAr ? "خطر مرتفع" : "High Risk"}</span>
          </div>
          <div id="badgeCode" style="display:none; padding:12px 18px; background:rgba(0,0,0,0.03); border-top:1px solid var(--theme-border-color); font-family:monospace; font-size:12px; white-space:pre-wrap; color:var(--theme-text-muted);">
&lt;span class="badge badge-primary"&gt;Primary Tag&lt;/span&gt;
&lt;span class="badge badge-accent"&gt;Accent Tag&lt;/span&gt;
&lt;span class="badge badge-success"&gt;Completed&lt;/span&gt;
          </div>
        </div>

        <!-- Floating Form Controls -->
        <div class="card" style="margin-bottom:20px;">
          <div class="card-header">
            <h4 style="margin:0; font-size:15px; font-weight:700;">${isAr ? "حقول الإدخال والاستمارات" : "Form Controls"}</h4>
            <button class="btn btn-sm btn-outline" onclick="App.toggleCodeBlock('formCode')">${isAr ? "عرض الكود" : "View Code"}</button>
          </div>
          <div class="card-body" style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div class="form-group">
              <label class="form-label">${isAr ? "حقل إدخال نشط" : "Active Input"}</label>
              <input type="text" class="form-input" placeholder="Type text here..." value="Sample value text">
            </div>
            <div class="form-group">
              <label class="form-label">${isAr ? "حقل إدخال بحث مع أيقونة" : "Search Input Wrapper"}</label>
              <div class="input-wrapper">
                <span class="search-icon">🔍</span>
                <input type="text" class="form-input form-search" placeholder="${isAr ? "ابحث هنا..." : "Search database..."}">
              </div>
            </div>
          </div>
          <div id="formCode" style="display:none; padding:12px 18px; background:rgba(0,0,0,0.03); border-top:1px solid var(--theme-border-color); font-family:monospace; font-size:12px; white-space:pre-wrap; color:var(--theme-text-muted);">
&lt;div class="form-group"&gt;
  &lt;label class="form-label"&gt;Active Input&lt;/label&gt;
  &lt;input type="text" class="form-input" placeholder="Type here..."&gt;
&lt;/div&gt;
          </div>
        </div>
      `;
    } 
    else if (section === 'docs') {
      mainTitle.innerText = isAr ? "دليل توثيق المطورين" : "Developer Documentation Hub";
      docArea.innerHTML = `
        <div class="card card-body" style="margin-bottom:var(--space-5);">
          <h3 style="margin:0 0 12px 0; font-size:16px; font-weight:800;">${isAr ? "البدء والتهيئة البرمجية (HTML/CSS)" : "Getting Started (HTML/CSS Setup)"}</h3>
          <p style="font-size:13px; color:var(--theme-text-muted); line-height:1.6;">
            ${isAr 
              ? "لتطبيق نظام التصميم في موقعك أو مشروعك، قم باستيراد ملفات الأكواد والأنماط التالية داخل رأس صفحة الويب:" 
              : "To use this premium design system in your products, simply import the tokens and components style sheets into your project header."}
          </p>
          <pre style="background:rgba(0,0,0,0.03); border:1px solid var(--theme-border-color); padding:14px; border-radius:4px; font-family:monospace; font-size:12px; overflow-x:auto; color:var(--theme-text-muted);">
&lt;!-- Include premium Jakarta Sans and Tajawal fonts --&gt;
&lt;link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&amp;family=Tajawal:wght@300;400;500;700;900&amp;display=swap" rel="stylesheet"&gt;

&lt;!-- Include Design Tokens variables --&gt;
&lt;link rel="stylesheet" href="./design-tokens/tokens.css"&gt;

&lt;!-- Include core component classes --&gt;
&lt;link rel="stylesheet" href="./components/components.css"&gt;
          </pre>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-5);">
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:800;">${isAr ? "التحكم في أنظمة الألوان برمجياً" : "Framework Switching (Theme toggle)"}</h3>
            <p style="font-size:12.5px; color:var(--theme-text-muted); line-height:1.5;">
              ${isAr ? "لتحويل المظهر اللوني عبر الجافا سكريبت، قم بتغيير السمة الفعالة على العقدة الجذرية للموقع:" : "To toggle color palettes via JavaScript, apply the theme name as a data-attribute on the root html node:"}
            </p>
            <pre style="background:rgba(0,0,0,0.03); border:1px solid var(--theme-border-color); padding:10px; border-radius:4px; font-family:monospace; font-size:11.5px; overflow-x:auto; color:var(--theme-text-muted);">
// Enable Royal Blue theme
document.documentElement.setAttribute('data-theme', 'royal-blue');

// Enable Dark Mode skins
document.documentElement.setAttribute('data-mode', 'dark');
            </pre>
          </div>
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:800;">${isAr ? "إنشاء الرسوم البيانية التفاعلية" : "SVG Chart API Integration"}</h3>
            <p style="font-size:12.5px; color:var(--theme-text-muted); line-height:1.5;">
              ${isAr ? "يمكنك توليد رسوم ومؤشرات بيانية متجاوبة برمجياً داخل صفحاتك بسهولة:" : "Generate high-fidelity responsive sparklines programmatically inside your grids:"}
            </p>
            <pre style="background:rgba(0,0,0,0.03); border:1px solid var(--theme-border-color); padding:10px; border-radius:4px; font-family:monospace; font-size:11.5px; overflow-x:auto; color:var(--theme-text-muted);">
// Arguments: (elementId, dataArray, isAreaPlot)
Components.createSparkline(
  'chartId',
  [12, 18, 14, 25, 30, 22, 38],
  true
);
            </pre>
          </div>
        </div>
      `;
    }
  },

  toggleCodeBlock(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      if (el.style.display === 'none') {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }
  }
};

window.App = App;
document.addEventListener('DOMContentLoaded', () => App.init());
