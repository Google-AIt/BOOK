// dashboard.js
if (!window.Pages) window.Pages = {};

window.Pages.dashboard = {
  title: {
    en: "Dashboard Overview",
    ar: "لوحة التحكم الرئيسية"
  },
  render(lang = 'en') {
    const isAr = lang === 'ar';
    const text = {
      badge: isAr ? "خيركم لأهله" : "خيركم لأهله",
      welcome: isAr ? "مرحباً بك مجدداً، يا مدير النظام" : "Welcome back, Administrator",
      desc: isAr ? "هنا ملخص مرئي لأداء منصة خيركم اليوم." : "Here is the visual summary of the Khairkom platform performance today.",
      export: isAr ? "تصدير PDF" : "Export PDF",
      actions: isAr ? "إجراءات سريعة" : "Quick Actions",
      
      stat1: isAr ? "إجمالي المتعلمين" : "Total Learners",
      stat2: isAr ? "تقدم الدورات" : "Course Progress",
      stat3: isAr ? "أرباح المتجر" : "Store Revenue",
      stat4: isAr ? "توصيات الذكاء" : "AI Recommendations",
      
      chart1Title: isAr ? "تسجيلات الطلاب (شهرياً)" : "Student Registrations (Monthly)",
      chart1Desc: isAr ? "العام الأكاديمي الحالي" : "Active academic year",
      chart2Title: isAr ? "طلبات المتجر اليومية" : "Daily Marketplace Orders",
      chart2Desc: isAr ? "هذا الأسبوع" : "This week",
      
      actTitle: isAr ? "آخر الأنشطة في المنصة" : "Recent Platform Activity",
      reload: isAr ? "تحديث" : "Reload",
      
      act1: isAr ? "أكملت فاطمة الحربي اختبار 'الحب بعد الزواج'" : "Fatima Al-Harbi completed 'Al-Hubb ba'd al-Zawaj' quiz",
      act1Sub: isAr ? "حصلت على 96% • المنصة التعليمية" : "Scored 96% • Learning Platform",
      act1Time: isAr ? "منذ دقيقتين" : "2 mins ago",
      
      act2: isAr ? "تم معالجة الطلب رقم #KHA-2489 بنجاح" : "Order #KHA-2489 processed successfully",
      act2Sub: isAr ? "تم شراء مجموعة بطاقات الإهداء الزيتية • المتجر" : "Purchased Olive Green Gifting Cards • Marketplace",
      act2Time: isAr ? "منذ 15 دقيقة" : "15 mins ago",
      
      act3: isAr ? "تم تدريب مساعد الذكاء الاصطناعي على إرشادات الاستشارات الأسرية" : "AI Assistant trained on new 'Family Counseling' guidelines",
      act3Sub: isAr ? "تم إضافة 14 ملفاً أساسياً • محرك الذكاء" : "Added 14 core source files • AI Engine",
      act3Time: isAr ? "منذ ساعة" : "1 hr ago",
      
      quickLinks: isAr ? "روابط سريعة للمدير" : "Admin Quick Links",
      link1: isAr ? "إدارة الدورات" : "Manage Courses",
      link2: isAr ? "إدارة المنتجات" : "Manage Products",
      link3: isAr ? "ساحة الذكاء" : "AI Playground",
      link4: isAr ? "إعدادات النظام" : "System Settings",
      
      targetTitle: isAr ? "الهدف الشهري المستهدف" : "Monthly Target Goal",
      targetSub: isAr ? "9.3 ألف متعلم جديد / 12 ألف هدف" : "9.3K New Learners / 12K Goal",
      targetEnd: isAr ? "ينتهي في 12 يوم" : "Ends in 12 days",

      modalTitle: isAr ? "إجراء نظام شامل" : "Global System Action",
      modalDesc: isAr ? "تنفيذ مهام المسؤول الأساسية من هنا بسرعة." : "Quickly perform primary administrator tasks from here.",
      modalLabel1: isAr ? "موضوع الإجراء" : "Action Subject",
      modalLabel2: isAr ? "الفئة" : "Category",
      modalCancel: isAr ? "إلغاء" : "Cancel",
      modalExec: isAr ? "تنفيذ الإجراء" : "Execute Action"
    };

    return `
      <div class="page-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-5);">
        <div>
          <span class="badge badge-primary" style="margin-bottom:var(--space-2)">${text.badge}</span>
          <h1 style="margin:0; font-size:28px; font-weight:800; letter-spacing:-0.02em;">${text.welcome}</h1>
          <p style="margin:4px 0 0 0; color:var(--theme-text-muted); font-size:14px;">${text.desc}</p>
        </div>
        <div style="display:flex; gap:12px;">
          <button class="btn btn-outline" onclick="Components.showToast('${isAr ? "جاري إنشاء التقرير..." : "Generating report..."}', 'info')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
            ${text.export}
          </button>
          <button class="btn btn-primary" onclick="Components.showModal('quickActionModal')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            ${text.actions}
          </button>
        </div>
      </div>

      <!-- Stat Widgets Grid -->
      <div class="stats-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:var(--space-4); margin-bottom:var(--space-5);">
        <div class="stat-widget card">
          <div>
            <span style="font-size:12px; font-weight:700; color:var(--theme-text-muted); text-transform:uppercase;">${text.stat1}</span>
            <div class="stat-number">12,840</div>
            <span class="stat-trend trend-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 5v14"/></svg>
              +14.2%
            </span>
          </div>
          <div style="background:rgba(var(--theme-primary-rgb), 0.08); padding:12px; border-radius:var(--radius-sm); color:var(--theme-primary);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>

        <div class="stat-widget card">
          <div>
            <span style="font-size:12px; font-weight:700; color:var(--theme-text-muted); text-transform:uppercase;">${text.stat2}</span>
            <div class="stat-number">84.3%</div>
            <span class="stat-trend trend-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 5v14"/></svg>
              +3.5%
            </span>
          </div>
          <div style="background:rgba(var(--theme-primary-rgb), 0.08); padding:12px; border-radius:var(--radius-sm); color:var(--theme-primary);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 18.8v-4L2 13v6a1 1 0 0 0 1 1h3Z"/><path d="M21.5 12v6c0 1.1-.9 2-2 2h-3v-4.8"/></svg>
          </div>
        </div>

        <div class="stat-widget card">
          <div>
            <span style="font-size:12px; font-weight:700; color:var(--theme-text-muted); text-transform:uppercase;">${text.stat3}</span>
            <div class="stat-number">$15,248</div>
            <span class="stat-trend trend-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 5v14"/></svg>
              +8.9%
            </span>
          </div>
          <div style="background:rgba(var(--theme-accent-rgb), 0.08); padding:12px; border-radius:var(--radius-sm); color:var(--theme-accent);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
        </div>

        <div class="stat-widget card">
          <div>
            <span style="font-size:12px; font-weight:700; color:var(--theme-text-muted); text-transform:uppercase;">${text.stat4}</span>
            <div class="stat-number">4,120</div>
            <span class="stat-trend trend-down">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m19 12-7 7-7-7"/><path d="M12 5v14"/></svg>
              -1.2%
            </span>
          </div>
          <div style="background:rgba(var(--theme-primary-rgb), 0.08); padding:12px; border-radius:var(--radius-sm); color:var(--theme-primary);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
          </div>
        </div>
      </div>

      <!-- Charts & Visual analytics -->
      <div class="charts-row" style="display:grid; grid-template-columns: 1.5fr 1fr; gap:var(--space-4); margin-bottom:var(--space-5);">
        <div class="card card-body">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="margin:0; font-size:16px; font-weight:700;">${text.chart1Title}</h3>
            <span style="font-size:12px; color:var(--theme-text-muted);">${text.chart1Desc}</span>
          </div>
          <div id="monthlyRegistrationsChart" class="chart-box" style="height:200px;"></div>
        </div>
        
        <div class="card card-body">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h3 style="margin:0; font-size:16px; font-weight:700;">${text.chart2Title}</h3>
            <span style="font-size:12px; color:var(--theme-text-muted);">${text.chart2Desc}</span>
          </div>
          <div id="weeklyOrdersChart" class="chart-box" style="height:200px;"></div>
        </div>
      </div>

      <div class="dashboard-details-row" style="display:grid; grid-template-columns: 2fr 1fr; gap:var(--space-4);">
        <!-- Recent Activities list -->
        <div class="card">
          <div class="card-header">
            <h3 style="margin:0; font-size:16px; font-weight:700;">${text.actTitle}</h3>
            <button class="btn btn-sm btn-ghost" onclick="Components.showToast('${isAr ? "تم التحديث بنجاح" : "Activity reloaded"}', 'success')">${text.reload}</button>
          </div>
          <div class="card-body" style="padding:0;">
            <div class="activity-list">
              <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid var(--theme-border-color);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:rgba(74,222,128,0.15); display:flex; align-items:center; justify-content:center; color:var(--theme-success);">✓</div>
                  <div>
                    <div style="font-weight:600; font-size:13.5px;">${text.act1}</div>
                    <span style="font-size:12px; color:var(--theme-text-muted);">${text.act1Sub}</span>
                  </div>
                </div>
                <span style="font-size:12px; color:var(--theme-text-muted);">${text.act1Time}</span>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid var(--theme-border-color);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:rgba(var(--theme-accent-rgb),0.15); display:flex; align-items:center; justify-content:center; color:var(--theme-accent);">★</div>
                  <div>
                    <div style="font-weight:600; font-size:13.5px;">${text.act2}</div>
                    <span style="font-size:12px; color:var(--theme-text-muted);">${text.act2Sub}</span>
                  </div>
                </div>
                <span style="font-size:12px; color:var(--theme-text-muted);">${text.act2Time}</span>
              </div>
              <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 20px; border-bottom:1px solid var(--theme-border-color);">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:rgba(var(--theme-primary-rgb),0.15); display:flex; align-items:center; justify-content:center; color:var(--theme-primary);">⚡</div>
                  <div>
                    <div style="font-weight:600; font-size:13.5px;">${text.act3}</div>
                    <span style="font-size:12px; color:var(--theme-text-muted);">${text.act3Sub}</span>
                  </div>
                </div>
                <span style="font-size:12px; color:var(--theme-text-muted);">${text.act3Time}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side Widgets -->
        <div style="display:flex; flex-direction:column; gap:var(--space-4);">
          <!-- Quick actions card -->
          <div class="card card-body" style="justify-content:center;">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:700;">${text.quickLinks}</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <a href="#" class="btn btn-outline btn-sm" onclick="App.navigateTo('learning'); return false;">${text.link1}</a>
              <a href="#" class="btn btn-outline btn-sm" onclick="App.navigateTo('marketplace'); return false;">${text.link2}</a>
              <a href="#" class="btn btn-outline btn-sm" onclick="App.navigateTo('ai'); return false;">${text.link3}</a>
              <a href="#" class="btn btn-outline btn-sm" onclick="App.navigateTo('settings'); return false;">${text.link4}</a>
            </div>
          </div>

          <!-- Progress Circle mockup -->
          <div class="card card-body" style="align-items:center; text-align:center;">
            <h3 style="margin:0 0 16px 0; font-size:15px; font-weight:700; width:100%; text-align:left;">${text.targetTitle}</h3>
            <div style="position:relative; width:100px; height:100px; margin-bottom:12px;">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--theme-border-color)" stroke-width="8"></circle>
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--theme-primary)" stroke-width="8" stroke-dasharray="251.2" stroke-dashoffset="62.8" stroke-linecap="round" transform="rotate(-90 50 50)"></circle>
              </svg>
              <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:18px; font-weight:800;">75%</div>
            </div>
            <div style="font-size:13px; font-weight:600;">${text.targetSub}</div>
            <span style="font-size:11px; color:var(--theme-text-muted); margin-top:2px;">${text.targetEnd}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions Modal Overlay -->
      <div id="quickActionModal" class="modal-overlay">
        <div class="modal-container">
          <div class="card-header">
            <h3 style="margin:0; font-size:16px; font-weight:700;">${text.modalTitle}</h3>
            <span style="cursor:pointer;" data-modal-close>✕</span>
          </div>
          <div class="card-body">
            <p style="margin:0 0 16px 0; font-size:13px; color:var(--theme-text-muted);">${text.modalDesc}</p>
            <div class="form-group">
              <label class="form-label">${text.modalLabel1}</label>
              <input type="text" class="form-input" placeholder="e.g. Core System Backup">
            </div>
            <div class="form-group">
              <label class="form-label">${text.modalLabel2}</label>
              <select class="form-input">
                <option>${isAr ? "مزامنة قاعدة البيانات" : "Database Sync"}</option>
                <option>${isAr ? "توثيق المستخدم" : "User Verification"}</option>
                <option>${isAr ? "مدفوعات المتجر" : "Marketplace Payout"}</option>
              </select>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline" data-modal-close>${text.modalCancel}</button>
            <button class="btn btn-primary" onclick="Components.closeModal('quickActionModal'); Components.showToast('${isAr ? "تم بدء مزامنة قاعدة البيانات!" : "Database Sync Initiated!"}', 'success')">${text.modalExec}</button>
          </div>
        </div>
      </div>
    `;
  },
  init() {
    Components.createSparkline('monthlyRegistrationsChart', [140, 290, 420, 310, 560, 490, 710, 680, 890, 820, 950, 1120], true);
    Components.createBarChart('weeklyOrdersChart', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], [34, 48, 62, 53, 71, 95, 84]);
  }
};
