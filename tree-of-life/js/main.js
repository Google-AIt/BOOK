/* ==========================================
   "شجرة الحياة" (Tree of Life) Main Controller
   ========================================== */

// Global State
let currentTheme = 'light';
let isDashboardUnlocked = false;
let enteredPinDigits = [];
const correctPinCode = '1234';
let isVoiceRecording = false;
let voiceRecordInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Scroll Effect
  const navbar = document.getElementById('top-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Landing Page Instruction Book Controller
  const prevPageBtn = document.getElementById('book-prev');
  const nextPageBtn = document.getElementById('book-next');
  const bookPages = document.querySelectorAll('.book-page');
  let currentPageIndex = 0;

  function updateBookPages() {
    bookPages.forEach((page, index) => {
      page.classList.remove('active', 'prev', 'next');
      if (index === currentPageIndex) {
        page.classList.add('active');
      } else if (index < currentPageIndex) {
        page.classList.add('prev');
      } else {
        page.classList.add('next');
      }
    });

    if (prevPageBtn && nextPageBtn) {
      prevPageBtn.disabled = currentPageIndex === 0;
      nextPageBtn.disabled = currentPageIndex === bookPages.length - 1;
    }
    
    const pageNumIndicator = document.getElementById('book-page-num');
    if (pageNumIndicator) {
      pageNumIndicator.textContent = `صفحة ${currentPageIndex + 1} من ${bookPages.length}`;
    }
  }

  if (prevPageBtn && nextPageBtn) {
    prevPageBtn.addEventListener('click', () => {
      if (currentPageIndex > 0) {
        currentPageIndex--;
        updateBookPages();
      }
    });

    nextPageBtn.addEventListener('click', () => {
      if (currentPageIndex < bookPages.length - 1) {
        currentPageIndex++;
        updateBookPages();
      }
    });

    updateBookPages();
  }

  // 3. Prepopulate Timeline / Memories list
  populateTimelineFeed();
});

/* ===== A. Navigation Outer Views Switcher ===== */
function showOuterSection(sectionId) {
  // Hide all sections
  const sections = ['landing', 'app', 'design-system', 'docs'];
  sections.forEach(s => {
    const el = document.getElementById(`section-${s}`);
    if (el) el.classList.remove('active');
  });

  // Show selected section
  const targetEl = document.getElementById(`section-${sectionId}`);
  if (targetEl) targetEl.classList.add('active');

  // Update top navigation active tabs
  const tabs = document.querySelectorAll('#top-nav-tabs li');
  tabs.forEach(t => t.classList.remove('active'));
  const activeTab = document.getElementById(`tab-${sectionId}`);
  if (activeTab) activeTab.classList.add('active');

  // Trigger scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // If entering app and locked, enforce lockscreen view
  if (sectionId === 'app' && !isDashboardUnlocked) {
    lockPrivateDashboard();
  }
}

/* ===== B. Landing Showcase Showcase Tab Switcher ===== */
function switchShowcaseTab(tabId) {
  const slides = document.querySelectorAll('.showcase-slide');
  slides.forEach(s => s.classList.remove('active'));
  
  const tabBtns = document.querySelectorAll('.showcase-tab-btn');
  tabBtns.forEach(b => b.classList.remove('active'));

  const targetSlide = document.getElementById(`slide-${tabId}`);
  if (targetSlide) targetSlide.classList.add('active');

  // Make active button
  event.target.classList.add('active');
}

/* ===== C. Private Lock Screen PIN Pad Validation ===== */
function pressPinNumber(num) {
  if (enteredPinDigits.length >= 4) return;
  
  enteredPinDigits.push(num);
  updatePinDotIndicators();

  if (enteredPinDigits.length === 4) {
    // Perform PIN validation
    setTimeout(validatePinCode, 200);
  }
}

function updatePinDotIndicators() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`pin-dot-${i}`);
    if (dot) {
      if (i <= enteredPinDigits.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    }
  }
}

function clearPinCode() {
  enteredPinDigits = [];
  updatePinDotIndicators();
}

function deletePinDigit() {
  enteredPinDigits.pop();
  updatePinDotIndicators();
}

function validatePinCode() {
  const pinString = enteredPinDigits.join('');
  if (pinString === correctPinCode) {
    unlockPrivateDashboard();
  } else {
    // Error feedback
    showToastAlert('رقم PIN غير صحيح! يرجى المحاولة مجدداً. ❌', 'error');
    clearPinCode();
    
    // Quick shake animation on dots
    const dotsContainer = document.querySelector('.pin-input-indicator');
    if (dotsContainer) {
      dotsContainer.style.animation = 'shake 0.3s ease';
      setTimeout(() => dotsContainer.style.animation = '', 300);
    }
  }
}

function unlockPrivateDashboard() {
  isDashboardUnlocked = true;
  const lockOverlay = document.getElementById('app-lock-screen');
  if (lockOverlay) lockOverlay.classList.remove('active');
  
  showToastAlert('تم فتح قفل لوحة العائلة بنجاح! 🔑✨', 'success');
  
  // Set user role description in sidebar
  const roleEl = document.querySelector('.sidebar-user-role');
  if (roleEl) roleEl.textContent = 'أبو محمد (مشرف) 🟢';
}

function lockPrivateDashboard() {
  isDashboardUnlocked = false;
  const lockOverlay = document.getElementById('app-lock-screen');
  if (lockOverlay) lockOverlay.classList.add('active');
  clearPinCode();

  const roleEl = document.querySelector('.sidebar-user-role');
  if (roleEl) roleEl.textContent = 'الوضع الخاص مقفل 🔒';
}

/* ===== D. App Sidebar Sub-view Switcher ===== */
function showAppSubView(subviewId) {
  // Hide all subviews
  const subviews = ['dashboard', 'tree', 'timeline', 'galleries', 'goals', 'reflections', 'settings'];
  subviews.forEach(sv => {
    const el = document.getElementById(`subview-${sv}`);
    if (el) el.classList.remove('active');
  });

  // Show selected subview
  const targetSv = document.getElementById(`subview-${subviewId}`);
  if (targetSv) targetSv.classList.add('active');

  // Update sidebar active classes
  const menuItems = document.querySelectorAll('#app-sidebar-menu li');
  menuItems.forEach(item => item.classList.remove('active'));

  // Determine active item
  let activeId = 'menu-dash';
  if (subviewId === 'tree') activeId = 'menu-tree';
  else if (subviewId === 'timeline') activeId = 'menu-timeline';
  else if (subviewId === 'galleries') activeId = 'menu-galleries';
  else if (subviewId === 'goals') activeId = 'menu-goals';
  else if (subviewId === 'reflections') activeId = 'menu-reflections';
  else if (subviewId === 'settings') activeId = 'menu-settings';

  const activeItem = document.getElementById(activeId);
  if (activeItem) activeItem.classList.add('active');

  // Update top header title
  const headerTitle = document.getElementById('app-header-title');
  if (headerTitle) {
    const titles = {
      dashboard: 'لوحة التحكم الرئيسية',
      tree: 'شجرة الحياة التفاعلية',
      timeline: 'دفتر الذكريات (خط الزمن)',
      galleries: 'ألبوم الوسائط المتعددة',
      goals: 'الأهداف والوعود العائلية',
      reflections: 'دفتر الامتنان والتأملات',
      settings: 'إعدادات الحماية والخصوصية'
    };
    headerTitle.textContent = titles[subviewId] || 'لوحة التحكم';
  }
}

/* ===== E. Theme Controller (Dark/Light Mode) ===== */
function toggleGlobalTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  
  // Sync checkboxes
  const checkSettings = document.getElementById('check-app-darkmode');
  if (checkSettings) checkSettings.checked = !isDark;

  // Change toggle button icon
  const btnToggle = document.getElementById('btn-theme-toggle');
  if (btnToggle) btnToggle.textContent = isDark ? '💡' : '🌙';

  showToastAlert(`تم تبديل المظهر إلى الوضع ${isDark ? 'النهاري' : 'المظلم الفاخر'} 🌿`, 'success');
}

/* ===== F. Simulated Voice Recorder Waveform ===== */
function toggleSimulatedVoiceRecording() {
  const btnMic = document.getElementById('btn-mic-recorder');
  const txtStatus = document.getElementById('txt-recording-status');
  const waveBars = document.querySelectorAll('#voice-equalizer-bars .wave-bar');

  if (!isVoiceRecording) {
    // Start Recording Simulation
    isVoiceRecording = true;
    btnMic.classList.add('recording');
    btnMic.textContent = '⏹️';
    txtStatus.textContent = 'جاري تسجيل رسالة المودة الصوتية... 🎙️';
    
    // Equalizer animation loop
    voiceRecordInterval = setInterval(() => {
      waveBars.forEach(bar => {
        const randHeight = 5 + Math.random() * 32;
        bar.style.height = `${randHeight}px`;
        bar.classList.add('active');
      });
    }, 150);
  } else {
    // Stop Recording Simulation
    isVoiceRecording = false;
    btnMic.classList.remove('recording');
    btnMic.textContent = '🎙️';
    txtStatus.textContent = 'تم إتمام التسجيل!';
    
    clearInterval(voiceRecordInterval);
    waveBars.forEach(bar => {
      bar.style.height = '5px';
      bar.classList.remove('active');
    });

    showToastAlert('تم حفظ رسالتك الصوتية وتثبيتها كأول ورقة صوتية بنجاح! 🎙️✨', 'success');
    addSimulatedVoiceCardToGallery();
  }
}

function addSimulatedVoiceCardToGallery() {
  const voiceGrid = document.getElementById('gallery-voice-grid');
  
  const voiceCard = document.createElement('div');
  voiceCard.className = 'media-gallery-card';
  voiceCard.innerHTML = `
    <div class="gallery-thumbnail" style="aspect-ratio: 2.1; display:flex; align-items:center; justify-content:center; background: var(--color-khairukum-pink-soft);">
      <div class="gallery-play-icon">▶</div>
    </div>
    <div class="gallery-card-body">
      <span class="ui-kit-badge" style="background-color: var(--color-khairukum-pink-soft); color: var(--color-khairukum-pink); width:fit-content;">🎙️ ورقة صوتية</span>
      <h4 class="gallery-card-title">رسالة امتنان عفوية - سارة</h4>
      <p style="font-size: 0.65rem; opacity:0.6;">اليوم، 7:15 م</p>
    </div>
  `;
  // Insert before the composer
  voiceGrid.insertBefore(voiceCard, voiceGrid.firstChild);
}

/* ===== G. Switch Galleries views (Photos vs Audios) ===== */
function switchGalleryView(tabId) {
  const photoGrid = document.getElementById('gallery-photo-grid');
  const voiceGrid = document.getElementById('gallery-voice-grid');
  
  const btnPhoto = document.getElementById('gallery-tab-photo');
  const btnVoice = document.getElementById('gallery-tab-voice');

  if (tabId === 'photo') {
    photoGrid.style.display = 'grid';
    voiceGrid.style.display = 'none';
    btnPhoto.classList.add('active');
    btnVoice.classList.remove('active');
  } else {
    photoGrid.style.display = 'none';
    voiceGrid.style.display = 'grid';
    btnPhoto.classList.remove('active');
    btnVoice.classList.add('active');
  }
}

/* ===== H. Design System Tab Playground Switches ===== */
function switchPlaygroundTab(tabId) {
  const demoTabs = ['buttons', 'cards', 'forms', 'tables', 'badges'];
  demoTabs.forEach(t => {
    const el = document.getElementById(`pg-demo-${t}`);
    if (el) el.style.display = 'none';
  });

  const targetDemo = document.getElementById(`pg-demo-${tabId}`);
  if (targetDemo) targetDemo.style.display = 'flex';

  // Toggle active menu list
  const navBtns = document.querySelectorAll('.playground-sidebar button');
  navBtns.forEach(b => b.classList.remove('active'));
  
  const activeBtn = document.getElementById(`pg-nav-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');
}

/* ===== I. Toast Alerts Drawer System ===== */
function showToastAlert(message, type = 'success') {
  const drawer = document.getElementById('global-toasts-drawer');
  if (!drawer) return;

  const toast = document.createElement('div');
  toast.className = `ui-kit-toast ${type === 'success' ? 'ui-kit-toast-success' : ''}`;
  toast.style.animation = 'fadeIn 0.3s ease';
  
  const icon = type === 'success' ? '✨' : '⚠️';
  toast.innerHTML = `
    <span>${icon}</span>
    <div>
      <div style="font-weight:700;">${message}</div>
    </div>
  `;

  drawer.appendChild(toast);
  
  // Remove toast after 4s
  setTimeout(() => {
    toast.style.animation = 'fadeIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ===== J. Clipboard Copy Code Blocks ===== */
function copyCodeSnippet(preId) {
  const preEl = document.getElementById(preId);
  if (!preEl) return;

  navigator.clipboard.writeText(preEl.textContent).then(() => {
    showToastAlert('تم نسخ كود المكون البرمجي بنجاح! 📋✨', 'success');
  }).catch(() => {
    showToastAlert('فشل نسخ كود المكون، يرجى نسخه يدوياً.', 'error');
  });
}

/* ===== K. Prepopulate Memories Timeline Data ===== */
const initialMemories = [
  { text: 'ليلة زفافنا المبهجة 💍', cat: 'memories', icon: '❤️', catName: 'ذكريات الحب', date: '4 يوليو 2026', user: 'أبو محمد', detail: 'أول ليلة لجمع شمل عائلتنا السعيدة.' },
  { text: 'أول منزل مستقل لنا 🏡', cat: 'home', icon: '🏡', catName: 'بيت وسكن', date: '29 يونيو 2026', user: 'أم محمد', detail: 'استلام مفاتيح شقتنا الجديدة وترتيب الأثاث معاً.' },
  { text: 'رحلة لأداء مناسك العمرة 🕋', cat: 'travel', icon: '✈️', catName: 'سفر ونزهة', date: '15 يونيو 2026', user: 'أبو محمد', detail: 'شكر الله تعالى في البيت الحرام والدعاء لعائلتنا بالألفة.' }
];

function populateTimelineFeed() {
  const feed = document.getElementById('timeline-feed-container');
  if (!feed) return;
  feed.innerHTML = '';

  initialMemories.forEach(mem => {
    addMemoryCardToTimelineElement(mem);
  });
}

function addMemoryCardToTimelineElement(mem) {
  const feed = document.getElementById('timeline-feed-container');
  if (!feed) return;

  const card = document.createElement('div');
  card.className = 'timeline-item';
  
  let dotColorClass = '';
  if (mem.cat === 'memories') dotColorClass = 'timeline-dot-pink';
  if (mem.cat === 'gratitude') dotColorClass = 'timeline-dot-gold';

  card.innerHTML = `
    <div class="timeline-dot ${dotColorClass}"></div>
    <div class="timeline-card">
      <div class="timeline-meta-row">
        <span class="timeline-category-tag" style="background-color: var(--color-beige-medium); color: var(--color-green-olive);">
          ${mem.icon} ${mem.catName}
        </span>
        <span class="timeline-date-stamp">${mem.date} | المضيف: ${mem.user}</span>
      </div>
      <h3 class="timeline-title-text">${mem.text}</h3>
      <p class="timeline-content-desc">${mem.detail || 'لا توجد تفاصيل إضافية مسجلة.'}</p>
    </div>
  `;
  feed.appendChild(card);
}

function saveAppSettings() {
  showToastAlert('تم حفظ إعدادات الأمان والتفضيلات العائلية بنجاح! 🔒✨', 'success');
}
