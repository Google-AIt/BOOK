// Khairkom OS Workspaces Renderer
const Workspaces = {
  // Current language helper
  lang: "en",

  // Main entry point
  render(id, lang = "en") {
    this.lang = lang;
    const contentArea = document.getElementById("workspaceContent");
    if (!contentArea) return;

    // Reset inline handlers if any
    contentArea.innerHTML = "";

    switch(id) {
      case "home":
        contentArea.innerHTML = this.renderHome();
        break;
      case "academy":
        contentArea.innerHTML = this.renderAcademy();
        this.bindAcademyEvents();
        break;
      case "commerce":
        contentArea.innerHTML = this.renderCommerce();
        this.bindCommerceEvents();
        break;
      case "ai":
        contentArea.innerHTML = this.renderAI();
        this.bindAIEvents();
        break;
      case "community":
        contentArea.innerHTML = this.renderCommunity();
        this.bindCommunityEvents();
        break;
      case "analytics":
        contentArea.innerHTML = this.renderAnalytics();
        break;
      case "knowledge":
        contentArea.innerHTML = this.renderKnowledge();
        break;
      case "planning":
        contentArea.innerHTML = this.renderPlanning();
        this.bindPlanningEvents();
        break;
      case "communication":
        contentArea.innerHTML = this.renderCommunication();
        this.bindCommunicationEvents();
        break;
      case "admin":
        contentArea.innerHTML = this.renderAdmin();
        this.bindAdminEvents();
        break;
      // Viewport / Figma Deliverables
      case "brand-guidelines":
        contentArea.innerHTML = this.renderBrandGuidelines();
        break;
      case "design-system":
        contentArea.innerHTML = this.renderDesignSystem();
        break;
      case "presentation":
        contentArea.innerHTML = this.renderPresentation();
        this.bindPresentationEvents();
        break;
      case "handoff":
        contentArea.innerHTML = this.renderHandoff();
        break;
      case "marketing-site":
        contentArea.innerHTML = this.renderMarketingSite();
        this.bindMarketingEvents();
        break;
      default:
        contentArea.innerHTML = `<div class="empty-state"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">Workspace Not Found</div></div>`;
    }
  },

  // 1. HOME WORKSPACE
  renderHome() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Welcome back, Leader" : "مرحباً بك مجدداً، أيها القائد",
      desc: l === "en" ? "Here is a summary of your value ecosystem's status today." : "إليك ملخص شامل لحالة منظومتك القيمية والعملية اليوم.",
      quickActions: l === "en" ? "Quick Actions" : "إجراءات سريعة",
      addStudent: l === "en" ? "Register Student" : "تسجيل طالب جديد",
      newProduct: l === "en" ? "Add Product" : "إضافة منتج للمتجر",
      askAI: l === "en" ? "Consult AI Assistant" : "استشارة المساعد الذكي",
      recentActivity: l === "en" ? "Recent Activity" : "النشاط الأخير",
      dailyInsights: l === "en" ? "Daily Insights" : "إحصائيات وقيم اليوم",
      notifications: l === "en" ? "Notifications" : "الإشعارات الواردة",
      pinnedTools: l === "en" ? "Pinned Services" : "أدوات مخصصة"
    };

    // Render insights
    const insightsHTML = OS_DATA.home.insights[l].map(ins => `
      <div style="padding: 12px; border-left: 3px solid var(--theme-primary); background: rgba(var(--theme-primary-rgb), 0.02); border-radius: var(--radius-xs); font-size: 13px; font-weight:600; line-height:1.4;">
        ${ins}
      </div>
    `).join("");

    // Render notifications
    const notifsHTML = OS_DATA.home.notifications.map(notif => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 10px 0; border-bottom: 1px solid var(--theme-border-color);">
        <div style="font-size:12px; font-weight:600;">
          <span class="badge badge-primary" style="margin-right:8px; font-size:9px;">${notif.type}</span>
          ${l === "en" ? notif.en : notif.ar}
        </div>
        <div style="font-size:10px; color:var(--theme-text-muted);">${notif.time}</div>
      </div>
    `).join("");

    // Render activities
    const actsHTML = OS_DATA.home.activities.map(act => `
      <div style="display:flex; align-items:center; gap:10px; padding: 8px 0;">
        <div class="user-avatar-sm">${act.avatar}</div>
        <div style="display:flex; flex-direction:column;">
          <span style="font-size:12px; font-weight:700;">${act.user}</span>
          <span style="font-size:11px; color:var(--theme-text-muted);">${act.action}</span>
        </div>
        <span style="margin-left:auto; font-size:10px; color:var(--theme-text-muted);">${act.time}</span>
      </div>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="grid-metrics">
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Active Students' : 'الطلاب النشطين'}</span>
              <span class="metric-value">1,240</span>
              <span class="metric-change up">↑ 12%</span>
            </div>
            <div class="metric-icon">🎓</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Net Sales' : 'صافي المبيعات'}</span>
              <span class="metric-value">$14,820</span>
              <span class="metric-change up">↑ 8.4%</span>
            </div>
            <div class="metric-icon">🛍</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Engagement Rate' : 'معدل التفاعل'}</span>
              <span class="metric-value">94.2%</span>
              <span class="metric-change up">↑ 4.1%</span>
            </div>
            <div class="metric-icon">👥</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 2fr 1fr; gap: var(--space-5);">
          <!-- Left Main Pane -->
          <div style="display:flex; flex-direction:column; gap: var(--space-5);">
            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.dailyInsights}</h3></div>
              <div style="display:flex; flex-direction:column; gap:12px;">
                ${insightsHTML}
              </div>
            </div>

            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.recentActivity}</h3></div>
              <div style="display:flex; flex-direction:column;">
                ${actsHTML}
              </div>
            </div>
          </div>

          <!-- Right Sidebar Pane -->
          <div style="display:flex; flex-direction:column; gap: var(--space-5);">
            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.quickActions}</h3></div>
              <div style="display:flex; flex-direction:column; gap:10px;">
                <button class="btn btn-primary btn-sm" onclick="App.switchWorkspace('academy')">${t.addStudent}</button>
                <button class="btn btn-outline btn-sm" onclick="App.switchWorkspace('commerce')">${t.newProduct}</button>
                <button class="btn btn-secondary btn-sm" onclick="App.switchWorkspace('ai')">${t.askAI}</button>
              </div>
            </div>

            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.notifications}</h3></div>
              <div style="display:flex; flex-direction:column;">
                ${notifsHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 2. ACADEMY WORKSPACE
  renderAcademy() {
    const l = this.lang;
    const m = OS_DATA.academy.metrics[l];
    const t = {
      title: l === "en" ? "Academy Workspace" : "أكاديمية التعليم والتدريب",
      desc: l === "en" ? "Configure paths, inspect student works, and issue verified certificates." : "إدارة المناهج والمسارات التعليمية، متابعة تكليفات الطلاب وإصدار الشهادات المعتمدة.",
      learningPaths: l === "en" ? "Learning Paths" : "المسارات التعليمية الجارية",
      certGenerator: l === "en" ? "Interactive Certificate Generator" : "مولد الشهادات المعتمدة الفوري",
      studentName: l === "en" ? "Student Full Name" : "اسم الطالب الثلاثي",
      issueBtn: l === "en" ? "Generate & Print Certificate" : "إصدار وطباعة الشهادة",
      certifiedIn: l === "en" ? "Values Leadership Academy" : "أكاديمية القيادة الأخلاقية",
      certMotto: l === "en" ? "This is to certify that the student has completed the values module." : "نشهد بأن الطالب قد أتم بنجاح متطلبات المسار الأخلاقي والقيمي."
    };

    // Render paths
    const pathsHTML = OS_DATA.academy.paths.map(path => `
      <div class="course-card">
        <div class="course-banner">
          <span class="course-badge">${path.level[l]}</span>
          <h4 style="margin:0; font-size:15px; font-weight:800; font-family:'Tajawal', sans-serif;">${path.title[l]}</h4>
        </div>
        <div class="course-body">
          <div style="display:flex; justify-content:space-between; font-size:11px; font-weight:700; color:var(--theme-text-muted);">
            <span>${path.students} ${l === 'en' ? 'Students' : 'طالب'}</span>
            <span>${path.progress}% ${l === 'en' ? 'Completed' : 'مكتمل'}</span>
          </div>
          <div class="course-progress-bar-container">
            <div class="course-progress-bar" style="width: ${path.progress}%;"></div>
          </div>
        </div>
      </div>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="grid-metrics">
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Total Enrolled' : 'إجمالي المسجلين'}</span>
              <span class="metric-value">${m.totalStudents}</span>
            </div>
            <div class="metric-icon">👥</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Avg. Completion' : 'متوسط الإتمام'}</span>
              <span class="metric-value">${m.courseCompletion}</span>
            </div>
            <div class="metric-icon">📈</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Active Tracks' : 'المسارات النشطة'}</span>
              <span class="metric-value">${m.activePaths}</span>
            </div>
            <div class="metric-icon">🛣</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom: var(--space-6);">
          <!-- Left Pane: Courses -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.learningPaths}</h3></div>
            <div class="courses-grid">
              ${pathsHTML}
            </div>
          </div>

          <!-- Right Pane: Cert Generator -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.certGenerator}</h3></div>
            <div style="display:flex; flex-direction:column; gap:14px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${t.studentName}</label>
                <input type="text" id="certStudentName" class="form-input" placeholder="e.g. Khalid Al-Faisal" value="Khalid Al-Faisal">
              </div>
              <button id="certGenerateBtn" class="btn btn-primary btn-sm">${t.issueBtn}</button>

              <!-- Live certificate frame -->
              <div class="certificate-preview-box" id="certificateBox">
                <img src="./assets/logo.png" style="height:36px; object-fit:contain; margin-bottom:12px;">
                <h4 style="margin: 0; font-size:16px; font-weight:800; color:var(--theme-primary); text-transform:uppercase; letter-spacing:0.05em;">
                  ${t.certifiedIn}
                </h4>
                <p style="font-size:11px; font-style:italic; color:#555; margin: 10px 0;">
                  ${t.certMotto}
                </p>
                <h2 style="font-family:'Tajawal', sans-serif; font-size:20px; font-weight:800; margin:14px 0; color:#111;" id="certStudentPlaceholder">
                  Khalid Al-Faisal
                </h2>
                <div style="border-top:1px solid #ccc; width:150px; margin: 14px auto 0 auto; padding-top:4px; font-size:10px; color:#666;">
                  ${l === 'en' ? 'Authorized Signature' : 'توقيع إدارة الأكاديمية'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindAcademyEvents() {
    const input = document.getElementById("certStudentName");
    const placeholder = document.getElementById("certStudentPlaceholder");
    const generateBtn = document.getElementById("certGenerateBtn");

    if (input && placeholder) {
      input.addEventListener("input", (e) => {
        placeholder.innerText = e.target.value || "Student Name";
      });
    }

    if (generateBtn) {
      generateBtn.addEventListener("click", () => {
        const certBox = document.getElementById("certificateBox");
        // Simple alert simulation of print
        alert(this.lang === "en" ? "Preparing certificate for print queue!" : "جاري تهيئة الشهادة للإرسال إلى طابعة الأكاديمية!");
      });
    }
  },

  // 3. COMMERCE WORKSPACE
  renderCommerce() {
    const l = this.lang;
    const m = OS_DATA.commerce.metrics[l];
    const t = {
      title: l === "en" ? "Commerce Suite" : "بوابة التجارة والاشتراكات",
      desc: l === "en" ? "Manage values-based items, track subscription sales, and process incoming payments." : "عرض منتجات المؤسسة، متابعة مبيعات الكتب والدورات، والاشتراكات الجارية.",
      products: l === "en" ? "Available Catalog" : "كتالوج المنتجات المتاحة",
      orders: l === "en" ? "Recent Transactions" : "أحدث العمليات المالية",
      newCoupon: l === "en" ? "Generate Coupon Code" : "توليد كود خصم قيمتي",
      statusDelivered: l === "en" ? "Delivered" : "تم التوصيل",
      statusProcessing: l === "en" ? "Processing" : "جاري المعالجة"
    };

    // Render products
    const productsHTML = OS_DATA.commerce.products.map(prod => `
      <div class="product-card">
        <div class="product-image-placeholder">${prod.emoji}</div>
        <div class="product-info">
          <h4 style="margin:0; font-size:12px; font-weight:700;">${prod.title[l]}</h4>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
            <span class="product-price">$${prod.price.toFixed(2)}</span>
            <span class="badge badge-success" style="font-size:8px;">${prod.sales} sold</span>
          </div>
        </div>
      </div>
    `).join("");

    // Render orders
    const ordersHTML = OS_DATA.commerce.orders.map(ord => `
      <tr>
        <td><strong>${ord.id}</strong></td>
        <td>${ord.customer}</td>
        <td>${ord.total}</td>
        <td>
          <span class="badge ${ord.status === 'delivered' ? 'badge-success' : 'badge-warning'}">
            ${ord.status === 'delivered' ? t.statusDelivered : t.statusProcessing}
          </span>
        </td>
        <td>${ord.date}</td>
      </tr>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="grid-metrics">
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Gross Revenue' : 'إجمالي الإيرادات'}</span>
              <span class="metric-value">${m.revenue}</span>
            </div>
            <div class="metric-icon">💰</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Active Subs' : 'الاشتراكات الفعالة'}</span>
              <span class="metric-value">${m.activeSubs}</span>
            </div>
            <div class="metric-icon">🎟</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Logistics Stock' : 'مخزون المستودع'}</span>
              <span class="metric-value">${m.stockLevel}</span>
            </div>
            <div class="metric-icon">📦</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1.2fr; gap: var(--space-5);">
          <!-- Left: Catalog -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">${t.products}</h3>
            </div>
            <div class="products-grid">
              ${productsHTML}
            </div>
          </div>

          <!-- Right: Transactions & Coupon maker -->
          <div style="display:flex; flex-direction:column; gap: var(--space-5);">
            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.orders}</h3></div>
              <div class="table-container">
                <table class="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>${l === 'en' ? 'Customer' : 'العميل'}</th>
                      <th>${l === 'en' ? 'Amount' : 'المبلغ'}</th>
                      <th>${l === 'en' ? 'Status' : 'الحالة'}</th>
                      <th>${l === 'en' ? 'Date' : 'التاريخ'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${ordersHTML}
                  </tbody>
                </table>
              </div>
            </div>

            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.newCoupon}</h3></div>
              <div style="display:flex; gap:10px;">
                <input type="text" id="couponCodeInput" class="form-input" style="flex:1;" placeholder="e.g. KHAIR2026" value="KHAIR2026">
                <button class="btn btn-primary btn-sm" id="couponBtn">${l === 'en' ? 'Activate Coupon' : 'تفعيل الكود'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindCommerceEvents() {
    const couponBtn = document.getElementById("couponBtn");
    const code = document.getElementById("couponCodeInput");
    if (couponBtn && code) {
      couponBtn.addEventListener("click", () => {
        alert(this.lang === "en" ? `Coupon '${code.value}' is now live on the storefront!` : `كود الخصم '${code.value}' مفعل الآن وجاهز للاستخدام!`);
      });
    }
  },

  // 4. AI WORKSPACE
  renderAI() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Khairkom AI Engine" : "محرك الذكاء الاصطناعي",
      desc: l === "en" ? "Leverage localized smart model capabilities to write courses, consult guidelines, and write community announcements." : "استعن بقدرات النماذج اللغوية لكتابة الدروس والمقالات وصياغة محتوى الأكاديمية.",
      assistantName: l === "en" ? "Khairkom AI Assistant" : "مساعد خيركم الذكي",
      placeholder: l === "en" ? "Ask something or select a prompt below..." : "اطرح سؤالك هنا أو اختر من الاقتراحات السفلية...",
      send: l === "en" ? "Send Query" : "إرسال",
      suggestions: l === "en" ? "Quick Suggestions" : "اقتراحات سريعة"
    };

    // Chat presets
    const promptButtons = OS_DATA.ai.defaultPrompts[l].map((p, idx) => {
      let key = "lesson";
      if (idx === 1) key = "commerce";
      if (idx === 2) key = "comm";
      return `<button class="btn btn-outline btn-sm ai-preset-trigger" data-preset="${key}" style="text-align:left; font-size:11px; white-space:normal; width:100%; display:block; margin-bottom:8px;">${p}</button>`;
    }).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="ai-workspace-container">
          <!-- Sidebar suggestions -->
          <div class="ai-sidebar">
            <div style="padding:var(--space-4); font-size:12px; font-weight:800; color:var(--theme-text-main); border-bottom:1px solid var(--theme-border-color);">
              ${t.suggestions}
            </div>
            <div style="padding:var(--space-3);">
              ${promptButtons}
            </div>
          </div>

          <!-- Active chat box -->
          <div class="ai-chat-console">
            <!-- Messages scroll -->
            <div class="ai-chat-messages" id="aiChatMessages">
              <div class="chat-bubble ai">
                ${l === 'en' ? 'Peace be upon you! I am Khairkom AI Engine. How can I help you construct ethical and educational paths today?' : 'السلام عليكم ورحمة الله وبركاته! أنا محرك المساعد الذكي لخيركم. كيف يمكنني مساعدتك في تخطيط وبناء مساراتك التعليمية اليوم؟'}
              </div>
            </div>

            <!-- Input area -->
            <div class="ai-chat-input-area">
              <input type="text" id="aiChatInput" class="form-input" placeholder="${t.placeholder}">
              <button id="aiSendBtn" class="btn btn-primary btn-sm">${t.send}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindAIEvents() {
    const sendBtn = document.getElementById("aiSendBtn");
    const input = document.getElementById("aiChatInput");
    const messages = document.getElementById("aiChatMessages");
    const l = this.lang;

    const postMessage = (text, isUser = false) => {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${isUser ? 'user' : 'ai'}`;
      bubble.innerText = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
    };

    const triggerAI = (presetKey) => {
      postMessage(OS_DATA.ai.defaultPrompts[l][presetKey === 'lesson' ? 0 : presetKey === 'commerce' ? 1 : 2], true);
      
      // Typing status
      const typingBubble = document.createElement("div");
      typingBubble.className = "chat-bubble ai";
      typingBubble.innerText = l === 'en' ? "Typing..." : "جاري الكتابة...";
      messages.appendChild(typingBubble);
      messages.scrollTop = messages.scrollHeight;

      setTimeout(() => {
        typingBubble.remove();
        const responseText = OS_DATA.ai.presets[l][presetKey];
        postMessage(responseText);
      }, 900);
    };

    // Bind custom preset triggers
    document.querySelectorAll(".ai-preset-trigger").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const key = e.target.closest("button").dataset.preset;
        triggerAI(key);
      });
    });

    if (sendBtn && input) {
      const handleSend = () => {
        const text = input.value.trim();
        if (!text) return;
        postMessage(text, true);
        input.value = "";

        // Typing status
        const typingBubble = document.createElement("div");
        typingBubble.className = "chat-bubble ai";
        typingBubble.innerText = l === 'en' ? "Reflecting on values..." : "جاري استحضار الأجوبة...";
        messages.appendChild(typingBubble);
        messages.scrollTop = messages.scrollHeight;

        setTimeout(() => {
          typingBubble.remove();
          // Provide generic value-driven response
          const genericResp = l === 'en' 
            ? "That's an interesting inquiry. According to the Khairkom OS framework, integrating ethical values increases community cohesion. I recommend structuring this into a formal learning module."
            : "سؤال رائع وقيم. يشير ميثاق خيركم للتطوير القيمي إلى أن التركيز على مكارم الأخلاق يزيد من الترابط المؤسسي. نقترح جدولة هذا المحتوى في مسار تعليمي معتمد.";
          postMessage(genericResp);
        }, 1200);
      };

      sendBtn.addEventListener("click", handleSend);
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleSend();
      });
    }
  },

  // 5. COMMUNITY WORKSPACE
  renderCommunity() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Community Workspace" : "مجتمع العطاء والتفاعل",
      desc: l === "en" ? "Engage with students, manage forums, inspect member levels and rewards." : "متابعة تفاعلات الأعضاء، الإشراف على المنتديات، قائمة المتصدرين، وتوزيع الأوسمة التشجيعية.",
      forums: l === "en" ? "Active Forums" : "المنتديات النقاشية",
      leaderboard: l === "en" ? "Leaderboard" : "لوحة الصدارة والتفاعل",
      achievements: l === "en" ? "Active Achievements" : "الأوسمة الحالية",
      postsCount: l === "en" ? "posts" : "موضوع",
      membersCount: l === "en" ? "active members" : "عضو نشط"
    };

    // Render forums
    const forumsHTML = OS_DATA.community.forums.map(frm => `
      <div style="padding: 12px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4 style="margin:0; font-size:13px; font-weight:700;">${frm.title[l]}</h4>
          <span style="font-size:11px; color:var(--theme-text-muted);">${frm.posts} ${t.postsCount} • ${frm.activeMembers} ${t.membersCount}</span>
        </div>
        <button class="btn btn-outline btn-sm" style="font-size:10px; padding: 4px 10px;">${l === 'en' ? 'Enter' : 'دخول'}</button>
      </div>
    `).join("");

    // Render leaderboard
    const leaderHTML = OS_DATA.community.leaderboard.map(ld => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 8px 0; border-bottom: 1px dashed var(--theme-border-color);">
        <div style="display:flex; align-items:center; gap:8px; font-size:12px; font-weight:600;">
          <span style="color:var(--theme-accent); font-weight:800; width:16px;">#${ld.rank}</span>
          <span>${ld.name}</span>
        </div>
        <span class="badge badge-primary" style="font-size:9px;">${ld.points} pts</span>
      </div>
    `).join("");

    // Render achievements
    const achsHTML = OS_DATA.community.achievements.map(ach => `
      <div style="display:flex; gap:12px; padding: 10px; border: 1px solid var(--theme-border-color); border-radius: var(--radius-sm); margin-bottom:8px;">
        <span style="font-size:24px;">${ach.icon}</span>
        <div style="display:flex; flex-direction:column;">
          <strong style="font-size:12px;">${ach.name[l]}</strong>
          <span style="font-size:11px; color:var(--theme-text-muted);">${ach.desc[l]}</span>
        </div>
      </div>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1.2fr 1fr 1fr; gap: var(--space-5);">
          <!-- Forums -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.forums}</h3></div>
            <div style="display:flex; flex-direction:column;">
              ${forumsHTML}
            </div>
          </div>

          <!-- Leaderboard -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.leaderboard}</h3></div>
            <div style="display:flex; flex-direction:column;">
              ${leaderHTML}
            </div>
          </div>

          <!-- Achievements -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.achievements}</h3></div>
            <div style="display:flex; flex-direction:column;">
              ${achsHTML}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindCommunityEvents() {},

  // 6. ANALYTICS WORKSPACE
  renderAnalytics() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Analytics Workspace" : "غرفة البيانات والتحليلات والتقارير",
      desc: l === "en" ? "View real-time growth curves, program outcomes, and system metrics." : "قراءة نسب التفاعل، نمو المبيعات، ومعدلات النجاح اليومية بالأكاديمية.",
      chartsTitle: l === "en" ? "Ecosystem Performance Matrix" : "مصفوفة أداء المنظومة المتكاملة",
      salesGrowth: l === "en" ? "Sales & Donations Curve" : "معدل المبيعات ونشاط العطاء",
      enrollments: l === "en" ? "Academy Enrolled Growth" : "نمو الطلاب الجدد بالأكاديمية",
      impactMetric: l === "en" ? "Verified Social Impact Score" : "نقاط الأثر المجتمعي المعتمدة"
    };

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="grid-metrics">
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'Conversion Rate' : 'معدل التحول للمبيعات'}</span>
              <span class="metric-value">6.82%</span>
              <span class="metric-change up">↑ 0.5%</span>
            </div>
            <div class="metric-icon">🎯</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${l === 'en' ? 'User Retention' : 'معدل بقاء الأعضاء'}</span>
              <span class="metric-value">91.8%</span>
              <span class="metric-change up">↑ 1.2%</span>
            </div>
            <div class="metric-icon">🔄</div>
          </div>
          <div class="metric-card">
            <div class="metric-data">
              <span class="metric-label">${t.impactMetric}</span>
              <span class="metric-value">8,950</span>
              <span class="metric-change up">↑ 18%</span>
            </div>
            <div class="metric-icon">💚</div>
          </div>
        </div>

        <!-- Premium SVG Charts -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--space-5);">
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.salesGrowth}</h3></div>
            <!-- Interactive SVG chart simulation -->
            <svg viewBox="0 0 400 180" style="width:100%; height:auto;">
              <defs>
                <linearGradient id="chartGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--theme-primary)" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="var(--theme-primary)" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 10,140 Q 80,110 150,90 T 290,40 T 390,20" fill="none" stroke="var(--theme-primary)" stroke-width="3" />
              <path d="M 10,140 Q 80,110 150,90 T 290,40 T 390,20 L 390,170 L 10,170 Z" fill="url(#chartGrad1)" />
              <line x1="10" y1="170" x2="390" y2="170" stroke="var(--theme-border-color)" stroke-width="1" />
              <circle cx="150" cy="90" r="4" fill="var(--theme-accent)" />
              <circle cx="290" cy="40" r="4" fill="var(--theme-accent)" />
              <circle cx="390" cy="20" r="4" fill="var(--theme-accent)" />
            </svg>
            <div style="display:flex; justify-content:space-between; font-size:9px; color:var(--theme-text-muted); margin-top:10px;">
              <span>Q1 2026</span><span>Q2 2026</span><span>Q3 2026</span><span>Q4 2026</span>
            </div>
          </div>

          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.enrollments}</h3></div>
            <svg viewBox="0 0 400 180" style="width:100%; height:auto;">
              <defs>
                <linearGradient id="chartGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="var(--theme-accent)" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="var(--theme-accent)" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 10,130 Q 70,120 140,80 T 280,60 T 390,30" fill="none" stroke="var(--theme-accent)" stroke-width="3" />
              <path d="M 10,130 Q 70,120 140,80 T 280,60 T 390,30 L 390,170 L 10,170 Z" fill="url(#chartGrad2)" />
              <line x1="10" y1="170" x2="390" y2="170" stroke="var(--theme-border-color)" stroke-width="1" />
            </svg>
            <div style="display:flex; justify-content:space-between; font-size:9px; color:var(--theme-text-muted); margin-top:10px;">
              <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // 7. KNOWLEDGE WORKSPACE
  renderKnowledge() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Knowledge Hub" : "مستودع المعرفة والملفات",
      desc: l === "en" ? "Manage corporate templates, guides, resources, and policy documents." : "مشاركة ملفات الشركة، وثائق العمل، النماذج المعتمدة، وأدلة الموظفين.",
      folders: l === "en" ? "Active Folders" : "المجلدات النشطة",
      recentDocs: l === "en" ? "Recent Documents" : "أحدث المستندات",
      upload: l === "en" ? "Upload Document" : "رفع مستند جديد"
    };

    const folders = [
      { name: { en: "Academy Syllabus Templates", ar: "قوالب ومناهج الأكاديمية" }, count: "12 files" },
      { name: { en: "Logistics and Shipping Rules", ar: "لوائح الشحن والتسليم للمتجر" }, count: "4 files" },
      { name: { en: "Ethics and Codes of Conduct", ar: "ميثاق الأخلاقيات والسلوك المهني" }, count: "8 files" }
    ];

    const foldersHTML = folders.map(f => `
      <div style="display:flex; align-items:center; gap:12px; padding: 12px; border:1px solid var(--theme-border-color); border-radius:var(--radius-sm); background:var(--theme-card); margin-bottom:8px;">
        <span style="font-size:24px;">📁</span>
        <div style="display:flex; flex-direction:column;">
          <strong style="font-size:13px; font-weight:700;">${f.name[l]}</strong>
          <span style="font-size:11px; color:var(--theme-text-muted);">${f.count}</span>
        </div>
      </div>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 2fr 1fr; gap: var(--space-5);">
          <!-- Folders list -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.folders}</h3></div>
            <div style="display:flex; flex-direction:column;">
              ${foldersHTML}
            </div>
          </div>

          <!-- Upload box -->
          <div class="card" style="display:flex; flex-direction:column; align-items:center; justify-content:center; border: 2px dashed var(--theme-border-color); text-align:center;">
            <div style="font-size:36px; margin-bottom:12px;">📤</div>
            <h4 style="margin:0; font-size:14px; font-weight:700;">${t.upload}</h4>
            <p style="font-size:11px; color:var(--theme-text-muted); margin: 6px 0 14px 0;">PDF, DOCX, PNG (Max 12MB)</p>
            <button class="btn btn-primary btn-sm" onclick="alert('File selector opened (Mock)')">${l === 'en' ? 'Select File' : 'اختيار الملف'}</button>
          </div>
        </div>
      </div>
    `;
  },

  // 8. PLANNING WORKSPACE (Kanban)
  renderPlanning() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Planning & Sprint board" : "مخطط المشاريع ولوحة المهام",
      desc: l === "en" ? "Move tasks between lanes to update completion status instantly." : "إدارة المهام الجارية، انقر على الكرت لنقله للمرحلة التالية تلقائياً.",
      todo: l === "en" ? "To Do" : "بانتظار البدء",
      prog: l === "en" ? "In Progress" : "جاري العمل عليها",
      done: l === "en" ? "Completed" : "تم إنجازها"
    };

    // Filter tasks
    const todoTasks = OS_DATA.planning.tasks.filter(tk => tk.status === "todo");
    const progTasks = OS_DATA.planning.tasks.filter(tk => tk.status === "inprogress");
    const doneTasks = OS_DATA.planning.tasks.filter(tk => tk.status === "done");

    const renderCard = (tk) => `
      <div class="kanban-card kanban-interactive-trigger" data-id="${tk.id}">
        <div class="kanban-card-title">${tk.title[l]}</div>
        <div class="kanban-card-desc">${tk.desc[l]}</div>
        <div class="kanban-card-footer">
          <span class="badge ${tk.priority === 'high' ? 'badge-danger' : tk.priority === 'medium' ? 'badge-warning' : 'badge-success'}" style="font-size:9px;">
            ${tk.priority}
          </span>
          <span style="font-size:10px; color:var(--theme-text-muted);">⏱ 2026</span>
        </div>
      </div>
    `;

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="kanban-board">
          <!-- TODO -->
          <div class="kanban-column" id="kanbanTodo">
            <div class="kanban-column-header">
              <span class="kanban-column-title">📌 ${t.todo}</span>
              <span class="kanban-column-count">${todoTasks.length}</span>
            </div>
            ${todoTasks.map(renderCard).join("")}
          </div>

          <!-- IN PROGRESS -->
          <div class="kanban-column" id="kanbanProgress">
            <div class="kanban-column-header">
              <span class="kanban-column-title">⚡️ ${t.prog}</span>
              <span class="kanban-column-count">${progTasks.length}</span>
            </div>
            ${progTasks.map(renderCard).join("")}
          </div>

          <!-- DONE -->
          <div class="kanban-column" id="kanbanDone">
            <div class="kanban-column-header">
              <span class="kanban-column-title">✅ ${t.done}</span>
              <span class="kanban-column-count">${doneTasks.length}</span>
            </div>
            ${doneTasks.map(renderCard).join("")}
          </div>
        </div>
      </div>
    `;
  },

  bindPlanningEvents() {
    document.querySelectorAll(".kanban-interactive-trigger").forEach(card => {
      card.addEventListener("click", () => {
        const id = card.dataset.id;
        const task = OS_DATA.planning.tasks.find(t => t.id === id);
        if (task) {
          // Cycle status: todo -> inprogress -> done -> todo
          if (task.status === "todo") task.status = "inprogress";
          else if (task.status === "inprogress") task.status = "done";
          else task.status = "todo";

          // Re-render
          this.render("planning", this.lang);
        }
      });
    });
  },

  // 9. COMMUNICATION WORKSPACE
  renderCommunication() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Communication Workspace" : "غرفة الاتصال والاجتماعات",
      desc: l === "en" ? "Discuss goals in direct channels or launch online video consultation rooms." : "إدارة قنوات التواصل المباشرة وتدشين قاعات المشاورات المرئية.",
      channels: l === "en" ? "Active Channels" : "القنوات النشطة",
      activeCall: l === "en" ? "Verified Launch Call Room" : "غرفة المداولات والمشاورات",
      launchCall: l === "en" ? "Launch Call Room" : "بدء الجلسة المرئية"
    };

    const channels = ["General Integration", "Academy Curriculums", "Logistic Operations"];

    const channelsHTML = channels.map(ch => `
      <div style="padding: 10px; border-bottom: 1px solid var(--theme-border-color); font-size:12px; font-weight:700; cursor:pointer;">
        # ${ch}
      </div>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 200px 1fr; gap: var(--space-5); border: 1px solid var(--theme-border-color); border-radius: var(--radius-md); overflow:hidden; background: var(--theme-surface); height: 420px;">
          <!-- Left channels list -->
          <div style="border-right: 1px solid var(--theme-border-color); background: rgba(var(--theme-primary-rgb), 0.01); display:flex; flex-direction:column; padding:10px;">
            <strong style="font-size:11px; text-transform:uppercase; color:var(--theme-text-muted); margin-bottom:10px;">${t.channels}</strong>
            ${channelsHTML}
          </div>

          <!-- Call simulator -->
          <div style="padding: var(--space-5); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
            <div style="font-size:42px; margin-bottom:12px;">📞</div>
            <h3 style="margin:0; font-size:16px; font-weight:700;">${t.activeCall}</h3>
            <p style="font-size:12px; color:var(--theme-text-muted); max-width:320px; margin: 10px 0 var(--space-4) 0;">
              Secure peer-to-peer audio and video transmission is fully configured.
            </p>
            <button class="btn btn-primary btn-sm" id="callStartBtn">${t.launchCall}</button>
          </div>
        </div>
      </div>
    `;
  },

  bindCommunicationEvents() {
    const callBtn = document.getElementById("callStartBtn");
    if (callBtn) {
      callBtn.addEventListener("click", () => {
        alert(this.lang === "en" ? "Consultation call initiated. Room is active!" : "تم بدء جلسة المشاورات. الغرفة نشطة وجاهزة لاستقبال المشاركين!");
      });
    }
  },

  // 10. ADMIN WORKSPACE
  renderAdmin() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "System Administration" : "إدارة وضبط النظام",
      desc: l === "en" ? "Audit roles, update database security configurations, and inspect API access." : "التحكم في أدوار المستخدمين، مراجعة معايير الأمان، وقراءة سجلات التعديل.",
      users: l === "en" ? "Ecosystem User Directory" : "دليل المستخدمين والصلاحيات",
      audit: l === "en" ? "Recent System Audit Logs" : "سجل العمليات الأمنية الأخير",
      active: l === "en" ? "Active" : "نشط",
      action: l === "en" ? "Action" : "العملية",
      status: l === "en" ? "Status" : "الحالة"
    };

    // Users list
    const usersHTML = OS_DATA.admin.users.map(u => `
      <tr>
        <td><strong>${u.name}</strong></td>
        <td>${u.email}</td>
        <td><span class="badge badge-primary" style="font-size:9px;">${u.role}</span></td>
        <td><span class="badge badge-success" style="font-size:9px;">${t.active}</span></td>
        <td><button class="btn btn-outline btn-sm admin-role-change" data-id="${u.id}" style="padding: 2px 6px; font-size:9px;">${l === 'en' ? 'Edit Role' : 'تعديل الدور'}</button></td>
      </tr>
    `).join("");

    // Audit logs
    const auditHTML = OS_DATA.admin.auditLogs.map(aud => `
      <div style="display:flex; justify-content:space-between; align-items:center; padding: 10px 0; border-bottom: 1px dashed var(--theme-border-color); font-size:11px;">
        <div>
          <span style="font-weight:700; color:var(--theme-text-main);">${aud.action}</span>
          <span style="color:var(--theme-text-muted); margin-left:8px;">IP: ${aud.ip}</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="badge badge-success" style="font-size:8px;">${aud.status}</span>
          <span style="color:var(--theme-text-muted);">${aud.time}</span>
        </div>
      </div>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1.4fr 1fr; gap: var(--space-5);">
          <!-- Users table -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.users}</h3></div>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>${l === 'en' ? 'Name' : 'الاسم'}</th>
                    <th>Email</th>
                    <th>${l === 'en' ? 'System Role' : 'الدور بالمنظومة'}</th>
                    <th>${t.status}</th>
                    <th>${t.action}</th>
                  </tr>
                </thead>
                <tbody>
                  ${usersHTML}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Audit logs -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.audit}</h3></div>
            <div style="display:flex; flex-direction:column;">
              ${auditHTML}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindAdminEvents() {
    document.querySelectorAll(".admin-role-change").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        const user = OS_DATA.admin.users.find(u => u.id === id);
        if (user) {
          const newRole = prompt(this.lang === "en" ? `Enter new role for ${user.name}:` : `أدخل الدور الجديد للمستخدم ${user.name}:`, user.role);
          if (newRole) {
            user.role = newRole;
            this.render("admin", this.lang);
          }
        }
      });
    });
  },

  // ==========================================================================
  // FIGMA DELIVERABLES PREVIEWS
  // ==========================================================================

  // BRAND GUIDELINES DELIVERABLE
  renderBrandGuidelines() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Brand Guidelines & Protection" : "دليل الهوية والقواعد الإرشادية",
      desc: l === "en" ? "Official guidelines on how to place and protect the Khairkom OS brand asset." : "القواعد المعتمدة لكيفية استخدام وحماية الهوية البصرية للوجو خيركم.",
      logoProtection: l === "en" ? "Logo Protection Rules" : "قواعد حماية الشعار",
      colorSystem: l === "en" ? "Official Color Palette" : "الباليتة اللونية الرسمية",
      typography: l === "en" ? "Typography Guidelines" : "توجيهات الخطوط والطباعة"
    };

    // Logo protection list
    const rulesHTML = OS_DATA.brandGuidelines.logoRules[l].map(r => `
      <li style="margin-bottom:8px; font-size:12px; font-weight:600; line-height:1.4;">${r}</li>
    `).join("");

    // Color Swatches
    const swatchesHTML = OS_DATA.brandGuidelines.colors.map(c => `
      <div class="swatch-card">
        <div class="swatch-color" style="background:${c.hex};"></div>
        <div class="swatch-label">${c.name}</div>
        <div class="swatch-hex">${c.hex}</div>
      </div>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--space-5);">
          <!-- Logo rules -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.logoProtection}</h3></div>
            <div style="text-align:center; padding:10px; border-bottom:1px solid var(--theme-border-color); margin-bottom:14px;">
              <img src="./assets/logo.png" style="height:64px; object-fit:contain;">
              <div style="font-size:10px; color:var(--theme-text-muted); margin-top:4px;">Official Khairkom Branding Asset</div>
            </div>
            <ul style="padding-left: 20px; padding-right: 20px;">
              ${rulesHTML}
            </ul>
          </div>

          <!-- Colors and fonts -->
          <div style="display:flex; flex-direction:column; gap: var(--space-5);">
            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.colorSystem}</h3></div>
              <div class="swatch-grid">
                ${swatchesHTML}
              </div>
            </div>

            <div class="card">
              <div class="card-header"><h3 class="card-title">${t.typography}</h3></div>
              <div style="font-size:12px;">
                <p><strong>Primary English Font:</strong> Plus Jakarta Sans (Clean, Geometric, Sans-serif)</p>
                <p><strong>Primary Arabic Font:</strong> Tajawal (Elegant, Geometric, High Readability)</p>
                <div style="border-top:1px solid var(--theme-border-color); padding-top:10px; margin-top:10px;">
                  <span style="font-size:24px; font-weight:800; font-family:'Tajawal', sans-serif;">خيركم لأهله</span>
                  <span style="font-size:20px; font-weight:700; margin-left:14px; font-family:'Plus Jakarta Sans';">KHAIRKOM OS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // DESIGN SYSTEM & TOKENS DELIVERABLE
  renderDesignSystem() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Design Tokens & Component Library" : "أكواد ورموز وعناصر مكتبة التصميم",
      desc: l === "en" ? "Fully documented design values for components, spacing grids, and border-radii." : "جدول رموز التصميم الموحد، تفاصيل المسافات، والحواف الدائرية للمبرمجين.",
      spacing: l === "en" ? "Spacing Rules" : "قواعد المسافات",
      radii: l === "en" ? "Border Radii Rules" : "قواعد الحواف الدائرية",
      uiElements: l === "en" ? "Live UI Component Library Preview" : "معاينة حية لعناصر واجهة المستخدم"
    };

    // Spacing table
    const spacingHTML = OS_DATA.designTokens.spacing.map(s => `
      <tr>
        <td><code>${s.token}</code></td>
        <td><strong>${s.value}</strong></td>
        <td>${s.use}</td>
      </tr>
    `).join("");

    // Radii table
    const radiiHTML = OS_DATA.designTokens.radii.map(r => `
      <tr>
        <td><code>${r.token}</code></td>
        <td><strong>${r.value}</strong></td>
        <td>${r.use}</td>
      </tr>
    `).join("");

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-bottom:var(--space-6);">
          <!-- Spacing -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.spacing}</h3></div>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Value</th>
                    <th>Recommended Use</th>
                  </tr>
                </thead>
                <tbody>
                  ${spacingHTML}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Radii -->
          <div class="card">
            <div class="card-header"><h3 class="card-title">${t.radii}</h3></div>
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Value</th>
                    <th>Recommended Use</th>
                  </tr>
                </thead>
                <tbody>
                  ${radiiHTML}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Element showcase -->
        <div class="card">
          <div class="card-header"><h3 class="card-title">${t.uiElements}</h3></div>
          <div style="display:flex; flex-wrap:wrap; gap: var(--space-5);">
            <div>
              <div style="font-size:11px; font-weight:700; color:var(--theme-text-muted); margin-bottom:8px;">BUTTONS</div>
              <div style="display:flex; gap:10px;">
                <button class="btn btn-primary btn-sm">Primary</button>
                <button class="btn btn-accent btn-sm">Accent</button>
                <button class="btn btn-outline btn-sm">Outline</button>
              </div>
            </div>

            <div>
              <div style="font-size:11px; font-weight:700; color:var(--theme-text-muted); margin-bottom:8px;">BADGES</div>
              <div style="display:flex; gap:6px; align-items:center; height:32px;">
                <span class="badge badge-success">Success</span>
                <span class="badge badge-warning">Warning</span>
                <span class="badge badge-danger">Danger</span>
              </div>
            </div>

            <div>
              <div style="font-size:11px; font-weight:700; color:var(--theme-text-muted); margin-bottom:8px;">SPINNING LOADER</div>
              <div class="loader-spinner"></div>
            </div>

            <div style="flex:1; min-width:200px;">
              <div style="font-size:11px; font-weight:700; color:var(--theme-text-muted); margin-bottom:8px;">INPUT ELEMENT</div>
              <input type="text" class="form-input" style="padding:6px 12px; font-size:12px;" value="Active typing state..." readonly>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // PRESENTATION SLIDES DELIVERABLE
  renderPresentation() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Ecosystem Pitch & Presentation" : "العرض التعريفي والتقديم للمشروع",
      desc: l === "en" ? "Slides detailing the vision, core structure, and growth roadmap of the OS." : "شرائح تفصيلية تشرح الرؤية والأهداف وخارطة الطريق للنظام.",
      controls: l === "en" ? "Slide Controls" : "التحكم في الشرائح"
    };

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="presentation-container">
          <div class="slide-deck" id="presentationSlideBox">
            <!-- Rendered dynamically by bindPresentationEvents -->
          </div>

          <div style="display:flex; align-items:center; gap:20px;">
            <button class="btn btn-outline btn-sm" id="prevSlideBtn">← ${l === 'en' ? 'Previous' : 'السابق'}</button>
            <span style="font-size:13px; font-weight:700;" id="slideIndicator">1 / 3</span>
            <button class="btn btn-primary btn-sm" id="nextSlideBtn">${l === 'en' ? 'Next' : 'التالي'} →</button>
          </div>
        </div>
      </div>
    `;
  },

  bindPresentationEvents() {
    let currentIdx = 0;
    const l = this.lang;
    const slideBox = document.getElementById("presentationSlideBox");
    const indicator = document.getElementById("slideIndicator");
    const prevBtn = document.getElementById("prevSlideBtn");
    const nextBtn = document.getElementById("nextSlideBtn");

    const updateSlide = () => {
      const data = OS_DATA.presentation[currentIdx];
      if (!slideBox) return;

      slideBox.innerHTML = `
        <div class="slide-bg-shape"></div>
        <div class="slide-header">
          <img src="./assets/logo.png" class="slide-logo">
          <span class="slide-number">Slide ${data.slide}</span>
        </div>
        <div class="slide-body">
          <h2 class="slide-title">${data.title[l]}</h2>
          <div class="slide-desc">${data.desc[l]}</div>
        </div>
        <div class="slide-footer">
          Khairkom OS • 2026 Ecosystem Blueprint
        </div>
      `;

      if (indicator) indicator.innerText = `${currentIdx + 1} / ${OS_DATA.presentation.length}`;
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIdx > 0) {
          currentIdx--;
          updateSlide();
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentIdx < OS_DATA.presentation.length - 1) {
          currentIdx++;
          updateSlide();
        }
      });
    }

    // Init first slide
    updateSlide();
  },

  // DEVELOPER HANDOFF DELIVERABLE
  renderHandoff() {
    const l = this.lang;
    const t = {
      title: l === "en" ? "Developer Handoff Hub" : "مكتب تسليم وبرمجة العناصر",
      desc: l === "en" ? "Exportable CSS codes, Design system structures, and JSON schemas." : "توفير أكواد التنسيقات الفورية (CSS) وملفات الرموز البرمجية بصيغة JSON.",
      preview: l === "en" ? "Visual Component Preview" : "معاينة حية للمكون",
      code: l === "en" ? "JSON Design Tokens Schema" : "كود رموز التصميم بالكامل"
    };

    const tokenJSON = `{
  "theme": "emerald-green",
  "version": "1.0.0",
  "fonts": {
    "family": "Plus Jakarta Sans, Tajawal, system-ui",
    "sizes": {
      "sm": "12px",
      "base": "14px",
      "lg": "18px",
      "xl": "24px"
    }
  },
  "colors": {
    "primary": "#085434",
    "accent": "#e81756",
    "background": {
      "light": "#f5f8f6",
      "dark": "#0e1814"
    }
  },
  "spacing": {
    "base": "4px",
    "scale": [4, 8, 12, 16, 24, 32, 48, 64]
  }
}`;

    return `
      <div class="workspace-wrapper animate-fade-in">
        <div class="workspace-header">
          <div class="workspace-title-area">
            <h1 class="workspace-title">${t.title}</h1>
            <div class="workspace-desc">${t.desc}</div>
          </div>
        </div>

        <div class="handoff-container">
          <!-- Handoff inspect visual -->
          <div class="handoff-preview-panel card">
            <div style="font-size:11px; font-weight:800; color:var(--theme-text-muted); position:absolute; top:12px; left:12px;">
              ${t.preview}
            </div>
            
            <div style="display:flex; flex-direction:column; align-items:center; gap:12px;">
              <button class="btn btn-primary btn-lg">KHAIRKOM OS</button>
              <div style="font-size:11px; font-family:monospace; color:var(--theme-text-muted);">
                padding: 14px 28px; border-radius: 14px;
              </div>
            </div>
          </div>

          <!-- Code panel -->
          <div class="handoff-code-panel">
            <div style="font-weight:700; border-bottom:1px solid #2d3e52; padding-bottom:6px; margin-bottom:10px;">
              ${t.code}
            </div>
            <pre style="margin:0; overflow-x:auto;">${tokenJSON}</pre>
          </div>
        </div>
      </div>
    `;
  },

  // MARKETING WEBSITE DELIVERABLE
  renderMarketingSite() {
    const l = this.lang;
    const t = {
      heroTitle: l === "en" ? "KHAIRKOM OS" : "نظام تشغيل خيركم",
      heroSub: l === "en" ? "The Futuristic Operating System for Ethical Organizations" : "المنظومة الرقمية المستقبلية للمؤسسات القيمية والأخلاقية",
      cta: l === "en" ? "Launch Digital Shell" : "ابدأ بتشغيل النظام",
      pricingTitle: l === "en" ? "Scale Your Ecosystem Impact" : "اختر باقة التفعيل المناسبة",
      pricingSub: l === "en" ? "Transparent, ethics-aligned structures." : "خطط واضحة وميسرة لدعم نمو برامجك التعليمية والمجتمعية."
    };

    return `
      <div class="workspace-wrapper animate-fade-in" style="max-width:800px; margin: 0 auto; padding-bottom:60px;">
        <!-- Header -->
        <header style="display:flex; justify-content:space-between; align-items:center; padding: 20px 0; border-bottom:1px solid var(--theme-border-color);">
          <img src="./assets/logo.png" style="height:32px; object-fit:contain;">
          <button class="btn btn-primary btn-sm" onclick="App.bootloader()">${t.cta}</button>
        </header>

        <!-- Hero -->
        <section style="text-align:center; padding: var(--space-8) 0; border-bottom:1px solid var(--theme-border-color);">
          <h1 style="font-size:42px; font-weight:900; letter-spacing:-0.03em; margin:0; line-height:1.1; font-family:'Tajawal', sans-serif;">
            ${t.heroTitle}
          </h1>
          <p style="font-size:16px; color:var(--theme-text-muted); max-width:500px; margin: 16px auto var(--space-6) auto; line-height:1.5;">
            ${t.heroSub}
          </p>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button class="btn btn-primary" onclick="App.bootloader()">${t.cta}</button>
            <button class="btn btn-outline" onclick="App.switchWorkspace('brand-guidelines')">${l === 'en' ? 'Brand Guidelines' : 'مطالعة الهوية'}</button>
          </div>
        </section>

        <!-- Dynamic pricing slider section -->
        <section style="padding: var(--space-6) 0;">
          <h2 style="font-size:24px; font-weight:800; text-align:center; margin:0 0 6px 0;">${t.pricingTitle}</h2>
          <p style="font-size:13px; color:var(--theme-text-muted); text-align:center; margin-bottom:var(--space-6);">${t.pricingSub}</p>

          <div class="card" style="max-width:500px; margin: 0 auto; padding: var(--space-5);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <span style="font-size:13px; font-weight:700; color:var(--theme-text-muted);">${l === 'en' ? 'Estimated Active Members' : 'الأعضاء النشطين المتوقعين'}</span>
              <span style="font-size:16px; font-weight:800; color:var(--theme-primary);" id="pricingMembersCount">500</span>
            </div>
            
            <input type="range" min="100" max="10000" step="100" value="500" class="form-input" id="pricingSlider" style="padding:0; height:8px; cursor:pointer; margin-bottom:20px;">

            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--theme-border-color); padding-top:14px;">
              <div>
                <div style="font-size:24px; font-weight:900; color:var(--theme-text-main); font-family:monospace;" id="pricingPlanAmount">$19</div>
                <div style="font-size:10px; color:var(--theme-text-muted);">${l === 'en' ? 'per month (Billed Annually)' : 'شهرياً (الدفع سنوي)'}</div>
              </div>
              <button class="btn btn-accent btn-sm" onclick="alert('Proceeding to billing configuration!')">${l === 'en' ? 'Activate Plan' : 'ابدأ الآن'}</button>
            </div>
          </div>
        </section>
      </div>
    `;
  },

  bindMarketingEvents() {
    const slider = document.getElementById("pricingSlider");
    const membersText = document.getElementById("pricingMembersCount");
    const priceText = document.getElementById("pricingPlanAmount");

    if (slider && membersText && priceText) {
      slider.addEventListener("input", (e) => {
        const val = parseInt(e.target.value);
        membersText.innerText = val.toLocaleString();

        // Calculate price based on slider count
        let price = 19;
        if (val > 1000) price = 49;
        if (val > 3000) price = 99;
        if (val > 7000) price = 199;

        priceText.innerText = `$${price}`;
      });
    }
  }
};
