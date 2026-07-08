// settings.js
if (!window.Pages) window.Pages = {};

window.Pages.settings = {
  title: {
    en: "System Settings",
    ar: "إعدادات النظام"
  },
  render(lang = 'en') {
    const isAr = lang === 'ar';
    const text = {
      headerTitle: isAr ? "إعدادات النظام" : "System Settings",
      headerDesc: isAr ? "تخصيص معلومات الحساب، إعدادات التنبيهات، خيارات المظهر وطرق الدفع والفواتير." : "Customize profile parameters, notifications thresholds, payment methods, and theme appearances.",
      
      nav1: isAr ? "الملف الشخصي" : "Profile Settings",
      nav2: isAr ? "التنبيهات والإشعارات" : "Notifications",
      nav3: isAr ? "خيارات المظهر" : "Appearance",
      nav4: isAr ? "الفواتير والاشتراكات" : "Billing & Invoices",
      
      profileHeader: isAr ? "الملف الشخصي العام" : "General Profile",
      uploadBtn: isAr ? "رفع صورة جديدة" : "Upload New Image",
      uploadDesc: isAr ? "صيغ JPG أو PNG أو GIF. الحد الأقصى 2 ميجابايت." : "JPG, PNG or GIF. Max size 2MB.",
      displayName: isAr ? "الاسم الكامل المعروض" : "Full Display Name",
      email: isAr ? "البريد الإلكتروني" : "Email Account",
      bio: isAr ? "السيرة الذاتية / الدور" : "Biography / Role",
      bioVal: isAr ? "مستشار إرشاد أسري معتمد ومعلم للمحتوى الأساسي في منصة خيركم." : "Professional marriage counselor and primary content tutor at Khairkom platform.",
      saveProfile: isAr ? "حفظ إعدادات الملف" : "Save Profile Settings",

      notifHeader: isAr ? "تفضيلات الإشعارات" : "Notification Preferences",
      notifDesc: isAr ? "تهيئة كيفية ووقت استقبال التنبيهات والتقارير الأسبوعية." : "Configure how and when you receive message alerts and reports.",
      notif1Title: isAr ? "إشعارات الندوات الأسرية" : "Marital Webinar Notifications",
      notif1Desc: isAr ? "استقبال إشعارات عند جدولة ورش عمل وندوات بث مباشر." : "Receive notifications when counselors schedule live webinars.",
      notif2Title: isAr ? "تقرير الأداء الأسبوعي البريدي" : "Weekly Activity Summary Email",
      notif2Desc: isAr ? "الحصول على ملخص أسبوعي لتقدم الطلاب واجتياز الاختبارات." : "Get email digests of your student quiz completions and rank.",
      notif3Title: isAr ? "تنبيهات المحادثات المباشرة" : "Direct Message Sound Alerts",
      notif3Desc: isAr ? "تشغيل صوت تنبيه عند وصول ردود المستشارين في الدردشة." : "Play alert sounds when counselors respond in direct chat.",
      saveNotif: isAr ? "حفظ التفضيلات" : "Save Preferences",

      appHeader: isAr ? "خيارات المظهر وشاشات العرض" : "Display Settings",
      appDesc: isAr ? "تخصيص المظهر اللوني لمنصة خيركم وتفعيل الإضاءة الليلية." : "Skinnable dashboard color schemes and night lighting.",
      appThemeLabel: isAr ? "اختيار السمة اللونية" : "Theme Palette Selection",
      t1: isAr ? "السمة 1: الزمردي" : "Theme 1: Emerald",
      t2: isAr ? "السمة 2: الأزرق الملكي" : "Theme 2: Royal Blue",
      t3: isAr ? "السمة 3: البنفسجي" : "Theme 3: Purple",
      t4: isAr ? "السمة 4: الفحمي الاحترافي" : "Theme 4: Dark Professional",
      nightMode: isAr ? "الإضاءة الليلية / الوضع الداكن" : "Night Lighting / Dark Mode",
      nightDesc: isAr ? "تجنب الخلفيات الساطعة لصالح واجهات معتمة ومريحة للعين." : "Skips bright backgrounds in favor of low-emission charcoal layouts.",
      toggleMode: isAr ? "تبديل المظهر" : "Toggle Mode",

      billHeader: isAr ? "الاشتراكات والمدفوعات" : "Payment & Subscriptions",
      billDesc: isAr ? "مراجعة باقة الاشتراك الحالية والعمليات الشرائية الأخيرة." : "View subscription state and recent purchases.",
      billBadge: isAr ? "عضوية خيركم الممتازة" : "Khairkom Premium Member",
      billPrice: isAr ? "19.90 دولار / شهرياً" : "$19.90 / month",
      billRenew: isAr ? "تاريخ التجديد القادم: 12 أغسطس 2026" : "Next renewal date: August 12, 2026",
      billCancel: isAr ? "إلغاء الاشتراك" : "Cancel Subscription",
      billTableTitle: isAr ? "سجل العمليات المالية" : "Transaction History",
      th1: isAr ? "رقم الفاتورة" : "Invoice ID",
      th2: isAr ? "التاريخ" : "Date",
      th3: isAr ? "المبلغ" : "Amount",
      th4: isAr ? "الحالة" : "Status",
      statusDone: isAr ? "مكتمل" : "Completed"
    };

    return `
      <div class="page-header" style="margin-bottom:var(--space-5);">
        <h1 style="margin:0; font-size:28px; font-weight:800; letter-spacing:-0.02em;">${text.headerTitle}</h1>
        <p style="margin:4px 0 0 0; color:var(--theme-text-muted); font-size:14px;">${text.headerDesc}</p>
      </div>

      <!-- Settings Layout (Vertical Tabs + Forms) -->
      <div style="display:grid; grid-template-columns: 200px 1fr; gap:var(--space-6);">
        
        <!-- Left Side: Navigation Links -->
        <div style="display:flex; flex-direction:column; gap:8px;">
          <a class="tab-link active" data-tab="set-profile" style="padding:10px 14px; text-align:left; border-radius:4px; border-bottom:none; display:block;">${text.nav1}</a>
          <a class="tab-link" data-tab="set-notifications" style="padding:10px 14px; text-align:left; border-radius:4px; border-bottom:none; display:block;">${text.nav2}</a>
          <a class="tab-link" data-tab="set-appearance" style="padding:10px 14px; text-align:left; border-radius:4px; border-bottom:none; display:block;">${text.nav3}</a>
          <a class="tab-link" data-tab="set-billing" style="padding:10px 14px; text-align:left; border-radius:4px; border-bottom:none; display:block;">${text.nav4}</a>
        </div>

        <!-- Right Side: Forms Container -->
        <div class="card card-body">
          
          <!-- Section 1: Profile Settings -->
          <div class="tab-pane active" data-pane="set-profile">
            <h3 style="margin:0 0 20px 0; font-size:16px; font-weight:700;">${text.profileHeader}</h3>
            
            <div style="display:flex; align-items:center; gap:20px; margin-bottom:24px;">
              <div style="width:72px; height:72px; border-radius:50%; background:var(--theme-border-color); display:flex; align-items:center; justify-content:center; font-size:32px; border:2px solid var(--theme-primary);">
                👤
              </div>
              <div>
                <button class="btn btn-outline btn-sm" onclick="Components.showToast('${isAr ? "جاري محاكاة رفع الصورة..." : "Uploading profile image mockup..."}', 'info')">${text.uploadBtn}</button>
                <div style="font-size:11px; color:var(--theme-text-muted); margin-top:6px;">${text.uploadDesc}</div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${text.displayName}</label>
              <input type="text" class="form-input" id="profileNameVal" value="${isAr ? "د. أحمد عبيد" : "Dr. Ahmed Obaid"}">
            </div>

            <div class="form-group">
              <label class="form-label">${text.email}</label>
              <input type="email" class="form-input" id="profileEmailVal" value="ahmed.obaid@khairkom.org">
            </div>

            <div class="form-group" style="margin-bottom:24px;">
              <label class="form-label">${text.bio}</label>
              <textarea class="form-input" style="height:80px;">${text.bioVal}</textarea>
            </div>

            <button class="btn btn-primary" onclick="Pages.settings.saveProfile()">${text.saveProfile}</button>
          </div>

          <!-- Section 2: Notifications -->
          <div class="tab-pane" data-pane="set-notifications">
            <h3 style="margin:0 0 8px 0; font-size:16px; font-weight:700;">${text.notifHeader}</h3>
            <p style="margin:0 0 24px 0; font-size:12px; color:var(--theme-text-muted);">${text.notifDesc}</p>

            <div style="display:flex; flex-direction:column; gap:20px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size:13.5px; font-weight:700;">${text.notif1Title}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${text.notif1Desc}</span>
                </div>
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="switch-slider"></span>
                </label>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size:13.5px; font-weight:700;">${text.notif2Title}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${text.notif2Desc}</span>
                </div>
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="switch-slider"></span>
                </label>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-size:13.5px; font-weight:700;">${text.notif3Title}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${text.notif3Desc}</span>
                </div>
                <label class="switch">
                  <input type="checkbox">
                  <span class="switch-slider"></span>
                </label>
              </div>
            </div>

            <button class="btn btn-primary" style="margin-top:24px;" onclick="Components.showToast('${isAr ? "تم حفظ التفضيلات بنجاح!" : "Notification settings saved!"}', 'success')">${text.saveNotif}</button>
          </div>

          <!-- Section 3: Appearance -->
          <div class="tab-pane" data-pane="set-appearance">
            <h3 style="margin:0 0 8px 0; font-size:16px; font-weight:700;">${text.appHeader}</h3>
            <p style="margin:0 0 24px 0; font-size:12px; color:var(--theme-text-muted);">${text.appDesc}</p>

            <div class="form-group" style="margin-bottom:24px;">
              <label class="form-label">${text.appThemeLabel}</label>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <button class="btn btn-outline" style="border-left:4px solid #085434; border-right:4px solid #085434;" onclick="App.setTheme('emerald')">${text.t1}</button>
                <button class="btn btn-outline" style="border-left:4px solid #1247d9; border-right:4px solid #1247d9;" onclick="App.setTheme('royal-blue')">${text.t2}</button>
                <button class="btn btn-outline" style="border-left:4px solid #7a17cf; border-right:4px solid #7a17cf;" onclick="App.setTheme('purple')">${text.t3}</button>
                <button class="btn btn-outline" style="border-left:4px solid #1e2530; border-right:4px solid #1e2530;" onclick="App.setTheme('dark-pro')">${text.t4}</button>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:16px; border-top:1px solid var(--theme-border-color);">
              <div>
                <div style="font-size:13.5px; font-weight:700;">${text.nightMode}</div>
                <span style="font-size:11px; color:var(--theme-text-muted);">${text.nightDesc}</span>
              </div>
              <button class="btn btn-outline btn-sm" id="settingsDarkModeToggleBtn" onclick="App.toggleDarkMode()">${text.toggleMode}</button>
            </div>
          </div>

          <!-- Section 4: Billing -->
          <div class="tab-pane" data-pane="set-billing">
            <h3 style="margin:0 0 4px 0; font-size:16px; font-weight:700;">${text.billHeader}</h3>
            <p style="margin:0 0 20px 0; font-size:12px; color:var(--theme-text-muted);">${text.billDesc}</p>

            <div style="background:rgba(var(--theme-primary-rgb), 0.04); padding:16px; border-radius:var(--radius-sm); border:1px solid var(--theme-border-color); margin-bottom:24px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <span class="badge badge-accent">${text.billBadge}</span>
                  <h4 style="margin:8px 0 2px 0; font-size:15px; font-weight:800; font-family:'Plus Jakarta Sans';">${text.billPrice}</h4>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${text.billRenew}</span>
                </div>
                <button class="btn btn-outline btn-sm" onclick="Components.showToast('${isAr ? "جاري فتح بوابة الاشتراكات..." : "Opening billing details portal..."}', 'info')">${text.billCancel}</button>
              </div>
            </div>

            <h4 style="margin:0 0 12px 0; font-size:14px; font-weight:700;">${text.billTableTitle}</h4>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th class="table-th">${text.th1}</th>
                    <th class="table-th">${text.th2}</th>
                    <th class="table-th">${text.th3}</th>
                    <th class="table-th">${text.th4}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-tr">
                    <td class="table-td">INV-KHA-1042</td>
                    <td class="table-td">${isAr ? "08 يوليو 2026" : "July 08, 2026"}</td>
                    <td class="table-td">$14.99</td>
                    <td class="table-td"><span class="badge badge-success">${text.statusDone}</span></td>
                  </tr>
                  <tr class="table-tr">
                    <td class="table-td">INV-KHA-0985</td>
                    <td class="table-td">${isAr ? "12 يونيو 2026" : "June 12, 2026"}</td>
                    <td class="table-td">$19.90</td>
                    <td class="table-td"><span class="badge badge-success">${text.statusDone}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    `;
  },
  init() {},
  saveProfile() {
    const isAr = App.state.lang === 'ar';
    const name = document.getElementById('profileNameVal').value;
    Components.showToast(isAr ? `تم تحديث اسم الحساب إلى: ${name}` : `Profile name updated to: ${name}`, 'success');
  }
};
