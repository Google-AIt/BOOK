// community.js
if (!window.Pages) window.Pages = {};

window.Pages.community = {
  title: {
    en: "Values Community",
    ar: "مجتمع خيركم"
  },
  render(lang = 'en') {
    const isAr = lang === 'ar';
    const text = {
      headerTitle: isAr ? "مجتمع القيم" : "Values Community",
      headerDesc: isAr ? "تواصل مع المستشارين المعتمدين، وشارك في المنتديات العامة، واحضر لقاءات التوعية الأسرية." : "Connect with counselors, participate in forums, and attend online family events.",
      
      boardTitle: isAr ? "لوحة النقاشات العامة" : "Discussion Boards",
      seg1: isAr ? "آخر المواضيع" : "Recent Threads",
      seg2: isAr ? "استشارة مباشرة" : "Direct Counsel Chat",
      
      badge1: isAr ? "إرشاد أسري" : "Counseling",
      badge2: isAr ? "تكنولوجيا التعليم" : "Educational Tech",
      badge3: isAr ? "شؤون المجتمع" : "Community",

      q1: isAr ? "كيف نساعد أطفالنا في تنظيم أوقات استخدام الشاشات والألعاب بشكل فعال؟" : "How to help children manage screen time effectively?",
      q1Sub: isAr ? "بواسطة سارة العنزي • 22 رد • 142 مشاهدة" : "Posted by Sarah Al-Enazi • 22 replies • 142 views",
      
      q2: isAr ? "أفضل الممارسات لدمج المبادئ القيمية والأخلاقية في المناهج الابتدائية." : "Best practices for integrating values into elementary study materials.",
      q2Sub: isAr ? "بواسطة د. أحمد عبيد • 12 رد • 95 مشاهدة" : "Posted by Dr. Ahmed Obaid • 12 replies • 95 views",
      
      q3: isAr ? "آراؤكم حول التنسيق والمقاس المفضل لبطاقات الإهداء الزيتية." : "Feedback on Olive Green gifting cards printable layout.",
      q3Sub: isAr ? "بواسطة عمر جميل • 6 ردود • 54 مشاهدة" : "Posted by Omar Jameel • 6 replies • 54 views",

      counselorName: isAr ? "المستشارة فاطمة" : "Mentor Fatimah",
      counselorOmar: isAr ? "الأستاذ عمر" : "Tutor Omar",
      chatWelcome: isAr ? "السلام عليكم يا أحمد. أنا المستشارة فاطمة، كيف يمكنني مساعدتك اليوم في شؤون الإرشاد الأسري والتربوي؟" : "Peace be upon you Ahmed. I am Mentor Fatimah. How can I help you today regarding family counseling?",
      chatPlace: isAr ? "اكتب رسالتك للمستشار هنا..." : "Write message to counselor...",
      send: isAr ? "إرسال" : "Send",

      eventsTitle: isAr ? "الفعاليات القادمة" : "Upcoming Events",
      event1Title: isAr ? "ندوة التوافق والانسجام الأسري" : "Marital Harmony Webinar",
      event1Sub: isAr ? "د. أحمد عبيد • 12 يوليو، 18:00 (مكة)" : "Dr. Ahmed Obaid • July 12, 18:00 (GMT+3)",
      
      event2Title: isAr ? "ورشة عمل القيم في الفصول الدراسية" : "Values in Classrooms workshop",
      event2Sub: isAr ? "أ. سارة علي • 15 يوليو، 14:00 (مكة)" : "Tutor Sarah Ali • July 15, 14:00 (GMT+3)",
      
      joinBtn: isAr ? "الانضمام لمركز الفعاليات" : "Join Webinar Hub",
      leadTitle: isAr ? "المتعلمون الأكثر تفاعلاً" : "Weekly Activity Leaders",
      points: isAr ? "نقطة" : "Points"
    };

    return `
      <div class="page-header" style="margin-bottom:var(--space-5);">
        <h1 style="margin:0; font-size:28px; font-weight:800; letter-spacing:-0.02em;">${text.headerTitle}</h1>
        <p style="margin:4px 0 0 0; color:var(--theme-text-muted); font-size:14px;">${text.headerDesc}</p>
      </div>

      <!-- Main Layout -->
      <div style="display:grid; grid-template-columns: 2fr 1fr; gap:var(--space-4);">
        
        <!-- Left Side: Forums & Chat -->
        <div>
          
          <!-- Forum discussions tab switcher -->
          <div class="card" style="margin-bottom:var(--space-4);">
            <div class="card-header">
              <h3 style="margin:0; font-size:16px; font-weight:700;">${text.boardTitle}</h3>
              <div class="segmented-control">
                <span class="segment-item active" data-segment="discussions">${text.seg1}</span>
                <span class="segment-item" data-segment="chat">${text.seg2}</span>
              </div>
            </div>
            
            <div class="card-body" style="padding:0;">
              
              <!-- Segment Pane 1: Forum Threads -->
              <div class="segment-pane active" data-pane="discussions">
                <div class="threads-list">
                  
                  <div style="padding:16px 20px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                      <span class="badge badge-primary" style="font-size:9px; margin-bottom:6px;">${text.badge1}</span>
                      <h4 style="margin:0 0 4px 0; font-size:14.5px; font-weight:700;"><a href="#" style="color:inherit; text-decoration:none;" onclick="Components.showToast('${isAr ? "جاري تحميل تفاصيل الموضوع..." : "Thread details loading..."}', 'info'); return false;">${text.q1}</a></h4>
                      <p style="margin:0; font-size:12px; color:var(--theme-text-muted);">${text.q1Sub}</p>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="Components.showToast('${isAr ? "تم تسجيل الإعجاب!" : "Liked thread!"}', 'success')">👍 18</button>
                  </div>

                  <div style="padding:16px 20px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                      <span class="badge badge-accent" style="font-size:9px; margin-bottom:6px;">${text.badge2}</span>
                      <h4 style="margin:0 0 4px 0; font-size:14.5px; font-weight:700;"><a href="#" style="color:inherit; text-decoration:none;" onclick="Components.showToast('${isAr ? "جاري تحميل تفاصيل الموضوع..." : "Thread details loading..."}', 'info'); return false;">${text.q2}</a></h4>
                      <p style="margin:0; font-size:12px; color:var(--theme-text-muted);">${text.q2Sub}</p>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="Components.showToast('${isAr ? "تم تسجيل الإعجاب!" : "Liked thread!"}', 'success')">👍 24</button>
                  </div>

                  <div style="padding:16px 20px; display:flex; justify-content:space-between; align-items:flex-start;">
                    <div>
                      <span class="badge badge-info" style="font-size:9px; margin-bottom:6px;">${text.badge3}</span>
                      <h4 style="margin:0 0 4px 0; font-size:14.5px; font-weight:700;"><a href="#" style="color:inherit; text-decoration:none;" onclick="Components.showToast('${isAr ? "جاري تحميل تفاصيل الموضوع..." : "Thread details loading..."}', 'info'); return false;">${text.q3}</a></h4>
                      <p style="margin:0; font-size:12px; color:var(--theme-text-muted);">${text.q3Sub}</p>
                    </div>
                    <button class="btn btn-outline btn-sm" onclick="Components.showToast('${isAr ? "تم تسجيل الإعجاب!" : "Liked thread!"}', 'success')">👍 9</button>
                  </div>

                </div>
              </div>

              <!-- Segment Pane 2: Counsel Chat Console -->
              <div class="segment-pane" data-pane="chat" style="padding:16px;">
                <div style="display:grid; grid-template-columns:150px 1fr; gap:16px; height:300px;">
                  
                  <!-- Counselors sidebar list -->
                  <div style="border-right:1px solid var(--theme-border-color); border-left:1px solid var(--theme-border-color); display:flex; flex-direction:column; gap:8px;">
                    <div style="padding:8px; border-radius:4px; background:rgba(var(--theme-primary-rgb),0.08); font-size:12px; font-weight:700; color:var(--theme-primary); cursor:pointer;">
                       ${text.counselorName}
                    </div>
                    <div style="padding:8px; border-radius:4px; font-size:12px; cursor:pointer;" onclick="Components.showToast('${isAr ? "المستشار مشغول حالياً" : "Counselor busy, please wait."}', 'info')">
                      ${text.counselorOmar}
                    </div>
                  </div>

                  <!-- Chat messages frame -->
                  <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
                    
                    <!-- Messages container -->
                    <div id="directChatBox" style="flex:1; overflow-y:auto; padding-right:8px; padding-left:8px; display:flex; flex-direction:column; gap:10px; font-size:13px; margin-bottom:12px;">
                      <div style="align-self:flex-start; background:rgba(var(--theme-primary-rgb),0.06); padding:10px 14px; border-radius:4px 12px 12px 12px; max-width:80%;">
                        ${text.chatWelcome}
                      </div>
                    </div>

                    <!-- Input block -->
                    <div class="input-wrapper" style="gap:8px;">
                      <input type="text" class="form-input" id="directChatMessageVal" placeholder="${text.chatPlace}" onkeydown="if(event.key==='Enter') Pages.community.sendChatMessage()">
                      <button class="btn btn-primary btn-sm" onclick="Pages.community.sendChatMessage()">${text.send}</button>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Right Side: Leaderboard & Events -->
        <div style="display:flex; flex-direction:column; gap:var(--space-4);">
          
          <!-- Upcoming Events -->
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:700;">${text.eventsTitle}</h3>
            
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="border-inline-start:3px solid var(--theme-primary); padding-inline-start:12px;">
                <div style="font-size:13px; font-weight:700;">${text.event1Title}</div>
                <span style="font-size:11px; color:var(--theme-text-muted);">${text.event1Sub}</span>
              </div>
              <div style="border-inline-start:3px solid var(--theme-accent); padding-inline-start:12px;">
                <div style="font-size:13px; font-weight:700;">${text.event2Title}</div>
                <span style="font-size:11px; color:var(--theme-text-muted);">${text.event2Sub}</span>
              </div>
            </div>
            
            <button class="btn btn-outline btn-sm" style="margin-top:16px; width:100%;" onclick="Components.showToast('${isAr ? "جاري نقلك لبوابة الفعاليات..." : "Opening event register portal..."}', 'info')">${text.joinBtn}</button>
          </div>

          <!-- Weekly Leaderboard -->
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:700;">${text.leadTitle}</h3>
            
            <div style="display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span style="font-weight:600;">1. ${isAr ? "عبدالله سعد" : "Abdullah Saad"}</span>
                <span style="font-weight:700; color:var(--theme-primary);">2,840 ${text.points}</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span style="font-weight:600;">2. ${isAr ? "ريم خالد" : "Reem Khaled"}</span>
                <span style="font-weight:700; color:var(--theme-primary);">2,410 ${text.points}</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px;">
                <span style="font-weight:600;">3. ${isAr ? "خالد يوسف" : "Khalid Yousuf"}</span>
                <span style="font-weight:700; color:var(--theme-primary);">1,950 ${text.points}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  },
  init() {},
  sendChatMessage() {
    const isAr = App.state.lang === 'ar';
    const input = document.getElementById('directChatMessageVal');
    const msgText = input.value.trim();
    if (!msgText) return;

    const chatBox = document.getElementById('directChatBox');
    
    // Add user bubble
    const userBubble = document.createElement('div');
    userBubble.style.alignSelf = 'flex-end';
    userBubble.style.background = 'var(--theme-primary)';
    userBubble.style.color = 'var(--theme-text-on-primary)';
    userBubble.style.padding = '10px 14px';
    userBubble.style.borderRadius = '12px 4px 12px 12px';
    userBubble.style.maxWidth = '80%';
    userBubble.innerText = msgText;
    chatBox.appendChild(userBubble);
    
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Trigger mock response
    setTimeout(() => {
      const responseBubble = document.createElement('div');
      responseBubble.style.alignSelf = 'flex-start';
      responseBubble.style.background = 'rgba(var(--theme-primary-rgb),0.06)';
      responseBubble.style.padding = '10px 14px';
      responseBubble.style.borderRadius = '4px 12px 12px 12px';
      responseBubble.style.maxWidth = '80%';
      responseBubble.innerText = isAr 
        ? "أشكرك على رسالتك. لقد قمت بتدوين استفسارك بخصوص التوجيه الأسري. سنقوم بترتيب موعد لجلسة حوار خاصة يوم الثلاثاء القادم الساعة 4:00 عصراً."
        : "Thank you for reaching out. I've noted down your query regarding family guidance. Let's arrange a 1-on-1 private scheduling next Tuesday at 4:00 PM.";
      chatBox.appendChild(responseBubble);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
};
