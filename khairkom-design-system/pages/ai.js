// ai.js
if (!window.Pages) window.Pages = {};

window.Pages.ai = {
  title: {
    en: "AI Smart Assistant",
    ar: "مساعد الذكاء الاصطناعي"
  },
  render(lang = 'en') {
    const isAr = lang === 'ar';
    const text = {
      headerTitle: isAr ? "مركز مساعد الذكاء الاصطناعي" : "AI Assistant Hub",
      headerDesc: isAr ? "تفاعل مع مستشار خيركم الذكي، واحصل على توصيات بحث ذكية، وقم بإنشاء ملخصات دراسية تلقائية." : "Interact with Khairkom Smart AI helper, get smart search recommendations, and auto-generate study outlines.",
      
      cardHeader: isAr ? "مستشار خيركم الذكي" : "Khairkom AI Advisor",
      welcomeMsg: isAr ? "السلام عليكم ورحمة الله وبركاته! أنا **مساعد خيركم الذكي**.<br>يمكنني مساعدتك في فهم مناهجنا الدراسية، أو إرشادك لكيفية شراء وتحميل بطاقات الإهداء الرقمية، أو تلخيص الدروس.<br><br>*جرب أن تسألني: 'ما هي منصة خيركم؟' أو 'كيف أحمل بطاقات الإهداء؟' أو 'اعرض لي الدورات'*." : "Peace be upon you! I am the **Khairkom AI Assistant**. I can help you understand our course curriculum, locate marketplace items like printable gifting cards, or summarize lessons for you. <br><br>*Try asking: \"What is Khairkom?\", \"How do I download cards?\", or \"Show me courses\".*",
      
      inputPlace: isAr ? "اسأل مساعد الذكاء الاصطناعي أي شيء..." : "Ask AI Assistant anything...",
      askBtn: isAr ? "اسأل المستشار" : "Ask Advisor",
      
      recomTitle: isAr ? "توصيات ذكية" : "AI Recommended",
      recom1Title: "إدارة الأولويات (Idarat al-Awlawiyyat)",
      recom1Desc: isAr ? "تناسب استبيان تنظيم الوقت الخاص بك. توفر لك 3 ساعات أسبوعياً." : "Matches your time-management profile. Save 3 hours a week.",
      recom2Title: "كتيب سكن ومودة (Sakan wa Mawaddah)",
      recom2Desc: isAr ? "موصى به للمتعلمين الذين أتموا دورة الحب بعد الزواج." : "Highly rated by learners who completed Love After Marriage.",
      
      guideTitle: isAr ? "مساعد إعداد أدلة الدراسة" : "Study Guide Generator",
      guideDesc: isAr ? "إنشاء دليل دراسي وملخص مخصص لأي دورة تدريبية." : "Create custom summary outlines from courses.",
      guideLabel: isAr ? "اختر الدورة" : "Select Course",
      opt1: isAr ? "الحب بعد الزواج" : "Love After Marriage",
      opt2: isAr ? "إدارة الأولويات" : "Priority Management",
      opt3: isAr ? "الزوج الراعي" : "The Shepherd Husband",
      guideBtn: isAr ? "إنشاء الملخص" : "Generate Outline"
    };

    return `
      <div class="page-header" style="margin-bottom:var(--space-5);">
        <h1 style="margin:0; font-size:28px; font-weight:800; letter-spacing:-0.02em;">${text.headerTitle}</h1>
        <p style="margin:4px 0 0 0; color:var(--theme-text-muted); font-size:14px;">${text.headerDesc}</p>
      </div>

      <!-- Main Layout Grid -->
      <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:var(--space-4); min-height:500px;">
        
        <!-- Left Side: Interactive AI Assistant Chat -->
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
          <div class="card-header" style="display:flex; align-items:center; gap:8px;">
            <div style="width:10px; height:10px; border-radius:50%; background-color:var(--theme-accent); box-shadow:0 0 8px var(--theme-accent);"></div>
            <h3 style="margin:0; font-size:16px; font-weight:700;">${text.cardHeader}</h3>
          </div>
          
          <!-- Chat messages area -->
          <div id="aiChatBox" style="flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:14px; font-size:13.5px; max-height:360px;">
            
            <div style="align-self:flex-start; background:rgba(var(--theme-primary-rgb),0.06); padding:12px 16px; border-radius:4px 12px 12px 12px; max-width:85%; line-height:1.5;">
              ${text.welcomeMsg}
            </div>

          </div>

          <!-- Chat inputs area -->
          <div class="card-footer" style="padding:14px 20px;">
            <div class="input-wrapper" style="width:100%; gap:10px;">
              <input type="text" class="form-input" id="aiChatMessageInput" placeholder="${text.inputPlace}" onkeydown="if(event.key==='Enter') Pages.ai.sendMessage()" style="padding:12px 16px;">
              <button class="btn btn-primary" onclick="Pages.ai.sendMessage()" style="padding:0 20px; height:42px;">
                ${text.askBtn}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side: AI recommendations and smart stats -->
        <div style="display:flex; flex-direction:column; gap:var(--space-4);">
          
          <!-- Smart course suggestions -->
          <div class="card card-body">
            <h3 style="margin:0 0 16px 0; font-size:15px; font-weight:700; display:flex; align-items:center; gap:8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z"/></svg>
              ${text.recomTitle}
            </h3>
            
            <div style="display:flex; flex-direction:column; gap:12px;">
              <div style="background:rgba(var(--theme-primary-rgb),0.02); padding:10px; border-radius:6px; border:1px solid var(--theme-border-color);">
                <div style="font-weight:700; font-size:12.5px;">${text.recom1Title}</div>
                <p style="margin:2px 0 0 0; font-size:11px; color:var(--theme-text-muted);">${text.recom1Desc}</p>
              </div>
              <div style="background:rgba(var(--theme-primary-rgb),0.02); padding:10px; border-radius:6px; border:1px solid var(--theme-border-color);">
                <div style="font-weight:700; font-size:12.5px;">${text.recom2Title}</div>
                <p style="margin:2px 0 0 0; font-size:11px; color:var(--theme-text-muted);">${text.recom2Desc}</p>
              </div>
            </div>
          </div>

          <!-- AI content generation tool -->
          <div class="card card-body">
            <h3 style="margin:0 0 12px 0; font-size:15px; font-weight:700;">${text.guideTitle}</h3>
            <p style="margin:0 0 14px 0; font-size:12px; color:var(--theme-text-muted);">${text.guideDesc}</p>
            <div class="form-group">
              <label class="form-label" style="font-size:11px;">${text.guideLabel}</label>
              <select class="form-input" id="aiGuideCourseVal" style="font-size:12px; padding:6px 10px;">
                <option>${text.opt1}</option>
                <option>${text.opt2}</option>
                <option>${text.opt3}</option>
              </select>
            </div>
            <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="Pages.ai.generateStudyGuide()">${text.guideBtn}</button>
          </div>

        </div>

      </div>
    `;
  },
  init() {},
  sendMessage() {
    const isAr = App.state.lang === 'ar';
    const input = document.getElementById('aiChatMessageInput');
    const msgText = input.value.trim();
    if (!msgText) return;

    const chatBox = document.getElementById('aiChatBox');
    
    // User message bubble
    const userBubble = document.createElement('div');
    userBubble.style.alignSelf = 'flex-end';
    userBubble.style.background = 'var(--theme-primary)';
    userBubble.style.color = 'var(--theme-text-on-primary)';
    userBubble.style.padding = '12px 16px';
    userBubble.style.borderRadius = '12px 4px 12px 12px';
    userBubble.style.maxWidth = '85%';
    userBubble.style.lineHeight = '1.5';
    userBubble.innerText = msgText;
    chatBox.appendChild(userBubble);
    
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // AI typing/loader indicator
    const typingBubble = document.createElement('div');
    typingBubble.style.alignSelf = 'flex-start';
    typingBubble.style.background = 'rgba(var(--theme-primary-rgb),0.03)';
    typingBubble.style.padding = '10px 14px';
    typingBubble.style.borderRadius = '4px 12px 12px 12px';
    typingBubble.style.maxWidth = '85%';
    typingBubble.innerHTML = `<span style="font-style:italic; opacity:0.5;">${isAr ? "المستشار الذكي يكتب..." : "Advisor is typing..."}</span>`;
    chatBox.appendChild(typingBubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Evaluate response
    let responseText = "I apologize, I didn't quite catch that. I am here to help guide you regarding the courses, printable gifting cards, or counsel schedule. Feel free to rephrase or type: 'What is Khairkom?' for core brand details.";
    if (isAr) {
      responseText = "نعتذر منك، لم أفهم استفسارك تماماً. أنا هنا لمساعدتك في الحصول على معلومات الدورات التدريبية، أو شراء بطاقات الإهداء الرقمية، أو حجز مواعيد الاستشارات. يمكنك إعادة الصياغة أو كتابة 'ما هي منصة خيركم؟'.";
    }

    const query = msgText.toLowerCase();

    if (query.includes('khairkom') || query.includes('خيركم')) {
      responseText = isAr 
        ? "**منصة خيركم (Khairkom)** هي منصة تربوية وأسرية رائدة تهدف إلى تمكين الأفراد والأسر من بناء علاقات قوية وسليمة. شعار واسم المنصة مستوحى من الحديث الشريف *'خيركم خيركم لأهله، وأنا خيركم لأهلي'* (سنن الترمذي)."
        : "**Khairkom (خيركم)** is a premium social & educational platform designed to strengthen marital bonds, support kids education, and build family values. The brand name is based on the prophetic tradition *'خيركم خيركم لأهله'* which translates to *'The best of you are those who are best to their families'* (Sunan al-Tirmidhi).";
    } else if (query.includes('cards') || query.includes('بطاقات') || query.includes('تحميل') || query.includes('تحميل بطاقات')) {
      responseText = isAr
        ? "نوفر في المنصة **بطاقات إهداء رقمية فاخرة** قابلة للطباعة بدقة عالية (بمقاسات A6 و 5x7 بوصة)، وتأتي بنماذج ألوان مميزة مثل الأخضر الزيتي والأزرق الملكي الفاخر. يمكنك شراء المجموعات من قسم **متجر خيركم**، وتنزيل ملفات الـ PDF مباشرة بعد الدفع."
        : "We offer premium high-resolution printable **Gifting Cards** (A6 and 5x7 inch sizes) in various color templates, including Royal Blue and Olive Green. You can purchase these collections in the **Marketplace** tab and access your downloadable PDFs instantly.";
    } else if (query.includes('course') || query.includes('دورة') || query.includes('دورات') || query.includes('learning')) {
      responseText = isAr
        ? "تضم المنصة حالياً المناهج القيمية والأسرية التالية: \n1. **الحب بعد الزواج** (Al-Hubb ba'd al-Zawaj) - مكتملة بنسبة 100%\n2. **إدارة الأولويات** (Idarat al-Awlawiyyat) - مكتملة بنسبة 45%\n3. **الزوج الراعي** (Al-Zawj al-Ra'i) - لم تبدأ بعد\nيمكنك الانتقال لقسم **المنصة التعليمية** لبدء مشاهدة الدروس وحل الاختبارات!"
        : "We currently feature top-tier educational materials including: \n1. **Al-Hubb ba'd al-Zawaj** (Love after Marriage) - 100% completed\n2. **Idarat al-Awlawiyyat** (Priority Management) - 45% completed\n3. **Al-Zawj al-Ra'i** (The Shepherd Husband) - Not started\nGo to the **Learning Platform** sidebar tab to explore lectures, quizzes, and certificates!";
    } else if (query.includes('hello') || query.includes('peace') || query.includes('hi') || query.includes('السلام') || query.includes('مرحبا')) {
      responseText = isAr
        ? "وعليكم السلام ورحمة الله وبركاته! أهلاً بك في منصة خيركم. كيف يمكنني مساعدتك اليوم؟"
        : "Peace be upon you! I am here. Let me know what you would like to find in the Khairkom platform today. I can retrieve courses or detail system pricing.";
    }

    setTimeout(() => {
      typingBubble.remove();
      
      const responseBubble = document.createElement('div');
      responseBubble.style.alignSelf = 'flex-start';
      responseBubble.style.background = 'rgba(var(--theme-primary-rgb),0.06)';
      responseBubble.style.padding = '12px 16px';
      responseBubble.style.borderRadius = '4px 12px 12px 12px';
      responseBubble.style.maxWidth = '85%';
      responseBubble.style.lineHeight = '1.5';
      responseBubble.innerHTML = responseText.replace(/\n/g, '<br>');
      chatBox.appendChild(responseBubble);
      
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1200);
  },
  generateStudyGuide() {
    const isAr = App.state.lang === 'ar';
    const courseName = document.getElementById('aiGuideCourseVal').value;
    Components.showToast(isAr ? `جاري إعداد الدليل لدورة: ${courseName}` : `AI generating outline for: ${courseName}`, 'info');
    setTimeout(() => {
      const chatBox = document.getElementById('aiChatBox');
      const docBubble = document.createElement('div');
      docBubble.style.alignSelf = 'flex-start';
      docBubble.style.background = 'var(--theme-card)';
      docBubble.style.border = '1px solid var(--theme-border-color)';
      docBubble.style.padding = '16px';
      docBubble.style.borderRadius = '12px';
      docBubble.style.maxWidth = '85%';
      docBubble.style.boxShadow = 'var(--theme-shadow-md)';
      docBubble.innerHTML = `
        <h4 style="margin:0 0 8px 0; font-size:14px; font-weight:700; color:var(--theme-primary);">📖 ${isAr ? "ملخص ذكي:" : "AI Outline:"} ${courseName}</h4>
        <ul style="margin:0; padding-left:16px; padding-right:16px; font-size:12px; line-height:1.6; display:flex; flex-direction:column; gap:4px;">
          <li><strong>${isAr ? "القسم 1:" : "Module 1:"}</strong> ${isAr ? "الأسس التاريخية والشرعية للمواثيق الأسرية." : "Historical foundations of family covenants."}</li>
          <li><strong>${isAr ? "القسم 2:" : "Module 2:"}</strong> ${isAr ? "تدريبات عملية لمهارات الاتصال وتوزيع المسؤوليات." : "Communication drills and priority schedules."}</li>
          <li><strong>${isAr ? "القسم 3:" : "Module 3:"}</strong> ${isAr ? "تقييمات دورية أسبوعية وجدول تتبع الشهادات." : "Weekly progress assessments and certificate checklist."}</li>
        </ul>
        <button class="btn btn-outline btn-sm" style="margin-top:12px; width:100%;" onclick="Components.showToast('${isAr ? "تم تحميل ملخص PDF!" : "Downloaded PDF Outlines!"}', 'success')">${isAr ? "تحميل الملخص PDF" : "Download Outline PDF"}</button>
      `;
      chatBox.appendChild(docBubble);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
};
