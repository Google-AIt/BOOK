// Khairkom OS Shell Master Controller
const App = {
  // Global States
  state: {
    activeWorkspace: "home",
    lang: "en",
    theme: "emerald",
    mode: "dark",
    viewport: "desktop",
    booted: false
  },

  // Initialize
  init() {
    this.bindGlobalEvents();
    this.startClock();
    this.applyThemeAndMode();
    this.updateSystemBattery();
    
    // Switch to initial workspace (Home)
    this.switchWorkspace(this.state.activeWorkspace);
  },

  // Boot / Unlock Screen Trigger
  bootloader() {
    const boot = document.getElementById("bootScreen");
    const shell = document.getElementById("osDesktopShell");
    
    if (boot && shell) {
      boot.classList.add("fade-out");
      shell.classList.add("loaded");
      this.state.booted = true;

      // Render home workspace
      this.switchWorkspace("home");
    }
  },

  // Workspace Routing / Switching
  switchWorkspace(id) {
    this.state.activeWorkspace = id;
    
    // 1. Update active sidebar item
    document.querySelectorAll(".sidebar-item").forEach(item => {
      if (item.dataset.workspace === id) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // 2. Update active dock item
    document.querySelectorAll(".dock-item").forEach(item => {
      if (item.dataset.workspace === id) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // 3. Render contents using Workspace render modules
    Workspaces.render(id, this.state.lang);

    // 4. Update Header Title
    const headerTitle = document.getElementById("headerWorkspaceTitle");
    if (headerTitle) {
      const workspaceConfig = OS_DATA.workspaces.find(w => w.id === id);
      if (workspaceConfig) {
        headerTitle.innerText = workspaceConfig.name[this.state.lang];
      } else {
        // Must be a figma deliverable
        const titles = {
          "brand-guidelines": { en: "Brand Guidelines & Protection", ar: "دليل الهوية والقواعد الإرشادية" },
          "design-system": { en: "Design Tokens & UI Catalog", ar: "أكواد ورموز وعناصر التصميم" },
          "presentation": { en: "Ecosystem Pitch & Presentation", ar: "العرض التعريفي والتقديم للمشروع" },
          "handoff": { en: "Developer Handoff Hub", ar: "مكتب تسليم وبرمجة العناصر" },
          "marketing-site": { en: "Marketing Landing Website", ar: "موقع التسويق التعريفي للخدمات" }
        };
        headerTitle.innerText = titles[id] ? titles[id][this.state.lang] : id;
      }
    }
  },

  // Toggle English / Arabic Language
  toggleLanguage() {
    this.state.lang = this.state.lang === "en" ? "ar" : "en";
    
    // Set html direction
    document.documentElement.dir = this.state.lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = this.state.lang;
    
    // Update language toggle button text
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
      langBtn.innerText = this.state.lang === "en" ? "العربية" : "English";
    }

    // Re-render UI labels in Sidebar
    this.updateSidebarLabels();

    // Re-render active workspace contents
    this.switchWorkspace(this.state.activeWorkspace);

    // Update Boot login texts
    const bootAr = document.getElementById("bootWelcomeAr");
    const bootEn = document.getElementById("bootWelcomeEn");
    const bootBtn = document.getElementById("bootUnlockBtnText");

    if (bootAr && bootEn && bootBtn) {
      bootAr.innerText = this.state.lang === "en" ? "مرحباً بك في نظام خيركم" : "مرحباً بك في نظام خيركم";
      bootEn.innerText = this.state.lang === "en" ? "WELCOME TO KHAIRKOM OS" : "WELCOME TO KHAIRKOM OS";
      bootBtn.innerText = this.state.lang === "en" ? "Unlock Workspace" : "فتح مساحة العمل";
    }
  },

  // Apply Theme & Light/Dark Mode
  setTheme(themeName) {
    this.state.theme = themeName;
    this.applyThemeAndMode();
  },

  toggleDarkMode() {
    this.state.mode = this.state.mode === "dark" ? "light" : "dark";
    this.applyThemeAndMode();

    // Update dark mode button indicator icon
    const darkBtn = document.getElementById("darkModeToggle");
    if (darkBtn) {
      if (this.state.mode === "dark") {
        darkBtn.innerHTML = `<span style="font-size:12px;">☀️</span> Light Mode`;
      } else {
        darkBtn.innerHTML = `<span style="font-size:12px;">🌙</span> Dark Mode`;
      }
    }
  },

  applyThemeAndMode() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    document.documentElement.setAttribute("data-mode", this.state.mode);

    // Update active theme circle style in top bar
    document.querySelectorAll(".theme-option-btn").forEach(btn => {
      if (btn.dataset.themeVal === this.state.theme) {
        btn.style.boxShadow = "0 0 0 3px var(--theme-primary)";
      } else {
        btn.style.boxShadow = "none";
      }
    });
  },

  // Set mockup viewport frames
  setViewport(size) {
    this.state.viewport = size;
    const container = document.getElementById("deviceFrameContainer");
    
    if (container) {
      // Remove previous viewport classes
      container.classList.remove("viewport-desktop", "viewport-tablet", "viewport-mobile");
      container.classList.add(`viewport-${size}`);
    }

    // Toggle active state on buttons
    document.querySelectorAll(".deliverable-btn").forEach(btn => {
      if (btn.dataset.viewportVal === size) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  },

  // Sidebar dynamic updates
  updateSidebarLabels() {
    const l = this.state.lang;
    
    // Update sidebar headings
    const headings = document.querySelectorAll(".sidebar-group-title");
    if (headings.length >= 3) {
      headings[0].innerText = l === "en" ? "Workspaces" : "مساحات العمل";
      headings[1].innerText = l === "en" ? "Intelligence" : "الذكاء والأعمال";
      headings[2].innerText = l === "en" ? "System Deliverables" : "مخرجات المشروع والملفات";
    }

    // Update sidebar items
    document.querySelectorAll(".sidebar-item").forEach(item => {
      const id = item.dataset.workspace;
      const workspaceConfig = OS_DATA.workspaces.find(w => w.id === id);
      
      if (workspaceConfig) {
        const labelNode = item.querySelector(".sidebar-item-label");
        if (labelNode) {
          // preserve icon
          labelNode.innerHTML = `<span class="sidebar-item-icon">${workspaceConfig.icon}</span> ${workspaceConfig.name[l]}`;
        }
      } else {
        // Figma deliverables
        const labels = {
          "brand-guidelines": { en: "🎨 Brand Guidelines", ar: "🎨 دليل الهوية" },
          "design-system": { en: "🧩 Design Tokens", ar: "🧩 رموز التصميم" },
          "presentation": { en: "📈 Slides Pitch", ar: "📈 الشرائح التعريفية" },
          "handoff": { en: "💻 Dev Handoff", ar: "💻 كود المطورين" },
          "marketing-site": { en: "🌐 Marketing Site", ar: "🌐 الموقع التعريفي" }
        };
        const labelNode = item.querySelector(".sidebar-item-label");
        if (labelNode && labels[id]) {
          labelNode.innerText = labels[id][l];
        }
      }
    });
  },

  // Direct actions bindings
  bindGlobalEvents() {
    // Top bar theme circles click
    document.querySelectorAll(".theme-option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const theme = e.target.dataset.themeVal;
        this.setTheme(theme);
      });
    });

    // Viewport sizes click
    document.querySelectorAll(".deliverable-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const size = e.target.dataset.viewportVal;
        if (size) this.setViewport(size);
      });
    });

    // Sidebar items click
    document.querySelectorAll(".sidebar-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const ws = e.currentTarget.dataset.workspace;
        if (ws) this.switchWorkspace(ws);
      });
    });

    // Dock items click
    document.querySelectorAll(".dock-item").forEach(item => {
      item.addEventListener("click", (e) => {
        const ws = e.currentTarget.dataset.workspace;
        if (ws) this.switchWorkspace(ws);
      });
    });

    // Welcome unlock click
    const unlockBtn = document.getElementById("bootUnlockBtn");
    if (unlockBtn) {
      unlockBtn.addEventListener("click", () => {
        this.bootloader();
      });
    }

    // Default boot screen click to listen for language switcher
    const bootLangBtn = document.getElementById("bootLangToggle");
    if (bootLangBtn) {
      bootLangBtn.addEventListener("click", () => {
        this.toggleLanguage();
        bootLangBtn.innerText = this.state.lang === "en" ? "العربية" : "English";
      });
    }
  },

  // Calendar clock loop
  startClock() {
    const update = () => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', hour12: true };
      const timeStr = now.toLocaleTimeString(this.state.lang === 'en' ? 'en-US' : 'ar-EG', options);
      
      const clockEl = document.getElementById("statusBarClock");
      if (clockEl) clockEl.innerText = timeStr;
    };
    
    update();
    setInterval(update, 60000);
  },

  // Update battery level dynamically
  updateSystemBattery() {
    const batteryText = document.getElementById("statusBarBattery");
    if (batteryText) {
      if (navigator.getBattery) {
        navigator.getBattery().then(bat => {
          const update = () => {
            const pct = Math.round(bat.level * 100);
            batteryText.innerText = `${pct}% ${bat.charging ? '⚡' : '🔋'}`;
          };
          update();
          bat.addEventListener("levelchange", update);
          bat.addEventListener("chargingchange", update);
        });
      } else {
        batteryText.innerText = "98% 🔋";
      }
    }
  }
};

// Window load init
window.addEventListener("DOMContentLoaded", () => {
  App.init();
});
