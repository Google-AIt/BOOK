// ملف التحكم والمنطق البرمجي لمنصة "خيركم" الأسرية التفاعلية

import { QUESTIONS, DIMENSIONS, DAILY_CHALLENGES, ACHIEVEMENTS } from './questions.js';
import { soundFx } from './sound-fx.js';
import { aiEngine } from './ai-engine.js';

class KhairkomApp {
  constructor() {
    // حالة اللعبة الافتراضية
    this.state = {
      username: "الزوجة الداعمة",
      avatar: "🌸",
      xp: 0,
      stars: 0,
      hearts: 0,
      currentQuestionIndex: 0,
      answers: [], // مصفوفة كائنات { qId, score }
      streak: 0,
      dailyChallengeCompleted: false,
      dailyChallengeText: "",
      unlockedBadges: [],
      theme: "light",
      soundMuted: false,
      isAssessInProgress: false
    };

    // تعريف نطاقات أسئلة المحاور الخمسة (1-indexed بالنسبة للمعرفات)
    this.sectionRanges = [
      { id: 1, start: 1, end: 9, key: "walls" },       // المشاركة المنزلية (9 أسئلة)
      { id: 2, start: 10, end: 25, key: "garden" },   // تربية الأبناء (16 سؤال)
      { id: 3, start: 26, end: 39, key: "garage" },   // النفقات الأسرية (14 سؤال)
      { id: 4, start: 40, end: 52, key: "door" },     // التوافق الاجتماعي (13 سؤال)
      { id: 5, start: 53, end: 78, key: "roof" }      // التوافق العاطفي (26 سؤال)
    ];

    this.chartInstance = null;
    this.spinTimeout = null;
    this.isSpinning = false;
  }

  init() {
    this.loadState();
    this.bindEvents();
    this.applyTheme();
    this.applySoundState();
    this.updateStatsUI();
    this.initDailyChallenge();
    this.renderBadgesShelf();
    this.updateHouseUI();
    this.renderHistoryList();
  }

  // تحميل حالة اللعبة من التخزين المحلي
  loadState() {
    const saved = localStorage.getItem("KHAIRKOM_STATE");
    if (saved) {
      try {
        this.state = { ...this.state, ...JSON.parse(saved) };
      } catch (e) {
        console.error("خطأ في تحميل الحالة:", e);
      }
    }
  }

  // حفظ حالة اللعبة في التخزين المحلي
  saveState() {
    localStorage.setItem("KHAIRKOM_STATE", JSON.stringify(this.state));
  }

  // تطبيق المظهر المظلم أو المضيء
  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.textContent = this.state.theme === "dark" ? "☀️" : "🌙";
    }
  }

  // تطبيق حالة كتم الصوت
  applySoundState() {
    soundFx.muted = this.state.soundMuted;
    const soundBtn = document.getElementById("sound-toggle");
    if (soundBtn) {
      soundBtn.textContent = this.state.soundMuted ? "🔇" : "🔊";
    }
  }

  // تحديث شريط الإحصائيات العلوي
  updateStatsUI() {
    document.getElementById("stat-xp-val").textContent = this.state.xp;
    document.getElementById("stat-stars-val").textContent = this.state.stars;
    document.getElementById("stat-hearts-val").textContent = this.state.hearts;
  }

  // إعداد وتحديث شاشات التطبيق
  showScreen(screenId) {
    document.querySelectorAll(".app-screen").forEach(screen => {
      screen.classList.remove("active");
    });
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
      window.scrollTo(0, 0);
    }
  }

  // ربط أحداث العناصر التفاعلية
  bindEvents() {
    // كتم الصوت والمظهر والإعدادات
    document.getElementById("sound-toggle").addEventListener("click", () => {
      this.state.soundMuted = soundFx.toggleMute();
      this.applySoundState();
      this.saveState();
    });

    document.getElementById("theme-toggle").addEventListener("click", () => {
      this.state.theme = this.state.theme === "dark" ? "light" : "dark";
      this.applyTheme();
      this.saveState();
    });

    document.getElementById("settings-btn").addEventListener("click", () => {
      const modal = document.getElementById("settings-modal");
      document.getElementById("gemini-key-input").value = aiEngine.apiKey;
      modal.classList.add("active");
    });

    document.getElementById("close-settings-btn").addEventListener("click", () => {
      document.getElementById("settings-modal").classList.remove("active");
    });

    document.getElementById("save-settings-btn").addEventListener("click", () => {
      const key = document.getElementById("gemini-key-input").value.trim();
      aiEngine.setApiKey(key);
      document.getElementById("settings-modal").classList.remove("active");
      soundFx.playClick();
    });

    document.getElementById("btn-clear-data").addEventListener("click", () => {
      if (confirm("هل أنتِ متأكدة من رغبتكِ في مسح كافة التقييمات والإنجازات والبدء من جديد؟")) {
        localStorage.removeItem("KHAIRKOM_STATE");
        localStorage.removeItem("KHAIRKOM_ASSESSMENTS_HISTORY");
        location.reload();
      }
    });

    // شاشة الترحيب
    document.querySelectorAll(".avatar-option").forEach(opt => {
      opt.addEventListener("click", () => {
        document.querySelectorAll(".avatar-option").forEach(o => o.classList.remove("selected"));
        opt.classList.add("selected");
        this.state.avatar = opt.getAttribute("data-avatar");
        soundFx.playClick();
      });
    });

    document.getElementById("start-journey-btn").addEventListener("click", () => {
      const nameInput = document.getElementById("username-input").value.trim();
      if (!nameInput) {
        alert("الرجاء إدخال اسم مستعار لبدء رحلتكِ!");
        return;
      }
      this.state.username = nameInput;
      this.state.isAssessInProgress = true;
      
      // إظهار الإحصائيات
      document.getElementById("user-stats").style.display = "flex";
      document.getElementById("user-avatar-disp").textContent = this.state.avatar;
      document.getElementById("username-disp").textContent = this.state.username;
      
      soundFx.playVictory();
      this.saveState();
      this.showScreen("dashboard-screen");
    });

    // لوحة التحكم
    document.getElementById("go-assess-btn").addEventListener("click", () => {
      soundFx.playClick();
      this.startOrResumeAssessment();
    });

    // التحدي اليومي
    document.getElementById("challenge-check-btn").addEventListener("click", () => {
      if (!this.state.dailyChallengeCompleted) {
        this.state.dailyChallengeCompleted = true;
        this.state.xp += 100;
        this.state.stars += 20;
        this.state.hearts += 5;
        soundFx.playChime();
        this.updateStatsUI();
        
        const card = document.getElementById("daily-challenge-card");
        card.classList.add("completed");
        
        this.triggerFloatingPointsAtBtn(document.getElementById("challenge-check-btn"), "+100 XP");
        this.unlockBadge("streak_3"); // فتح وسام تشجيعي
        this.saveState();
      }
    });

    // التقييم والخيارات
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const score = parseInt(btn.getAttribute("data-score"));
        this.handleAnswer(score, e);
      });
    });

    // عجلة الحظ
    document.getElementById("spin-wheel-btn").addEventListener("click", () => {
      this.spinWheel();
    });
    document.getElementById("wheel-center-btn").addEventListener("click", () => {
      this.spinWheel();
    });

    document.getElementById("next-level-btn").addEventListener("click", () => {
      soundFx.playClick();
      this.startOrResumeAssessment();
    });

    // تقرير النهاية
    document.getElementById("btn-show-certificate").addEventListener("click", () => {
      soundFx.playClick();
      this.openCertificateModal();
    });

    document.getElementById("close-cert-btn").addEventListener("click", () => {
      document.getElementById("cert-modal").classList.remove("active");
    });

    document.getElementById("btn-print-certificate").addEventListener("click", () => {
      soundFx.playClick();
      window.print();
    });

    document.getElementById("btn-share-whatsapp").addEventListener("click", () => {
      this.shareWhatsApp();
    });

    document.getElementById("btn-email-report").addEventListener("click", () => {
      this.sendEmailReport();
    });

    document.getElementById("btn-retake-assess").addEventListener("click", () => {
      if (confirm("هل تودين إطلاق تقييم أسري جديد وحفظ التقييم الحالي في السجل؟")) {
        this.archiveCurrentAssessment();
      }
    });
  }

  // تهيئة التحدي اليومي العشوائي
  initDailyChallenge() {
    const today = new Date().toDateString();
    const lastChallengeDate = localStorage.getItem("KHAIRKOM_CHALLENGE_DATE");
    
    if (lastChallengeDate !== today || !this.state.dailyChallengeText) {
      const idx = Math.floor(Math.random() * DAILY_CHALLENGES.length);
      this.state.dailyChallengeText = DAILY_CHALLENGES[idx];
      this.state.dailyChallengeCompleted = false;
      localStorage.setItem("KHAIRKOM_CHALLENGE_DATE", today);
      this.saveState();
    }
    
    document.getElementById("challenge-text-val").textContent = this.state.dailyChallengeText;
    const card = document.getElementById("daily-challenge-card");
    if (this.state.dailyChallengeCompleted) {
      card.classList.add("completed");
    } else {
      card.classList.remove("completed");
    }
  }

  // تحديث حالة الأجزاء المبنية للمنزل في الواجهة (SVG)
  updateHouseUI() {
    this.sectionRanges.forEach(range => {
      const el = document.getElementById(`part-${range.key}`);
      if (el) {
        // فحص إذا كان المحور مكتملاً
        const rangeQuestions = QUESTIONS.filter(q => q.dimensionId === range.id);
        const answeredRange = rangeQuestions.filter(q => this.state.answers.some(a => a.qId === q.id));
        
        if (answeredRange.length === rangeQuestions.length && answeredRange.length > 0) {
          el.classList.remove("locked");
          el.classList.add("unlocked");
        } else {
          el.classList.remove("unlocked");
          el.classList.add("locked");
        }
      }
    });
  }

  // رسم الأوسمة المفتوحة في شاشة لوحة التحكم
  renderBadgesShelf() {
    const shelf = document.getElementById("badges-shelf");
    shelf.innerHTML = "";
    
    ACHIEVEMENTS.forEach(ach => {
      const isUnlocked = this.state.unlockedBadges.includes(ach.id);
      const item = document.createElement("div");
      item.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
      item.title = ach.desc;
      item.innerHTML = `
        <div class="badge-icon">${ach.icon}</div>
        <div class="badge-title">${ach.title}</div>
      `;
      shelf.appendChild(item);
    });
  }

  // فتح وسام جديد وإعلام المستخدم
  unlockBadge(badgeId) {
    if (!this.state.unlockedBadges.includes(badgeId)) {
      this.state.unlockedBadges.push(badgeId);
      this.renderBadgesShelf();
      this.saveState();
      
      const badge = ACHIEVEMENTS.find(a => a.id === badgeId);
      if (badge) {
        soundFx.playAchievement();
        
        // إشعار فتح وسام لطيف
        const notification = document.createElement("div");
        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.background = "linear-gradient(135deg, #ffd54f, #ffb300)";
        notification.style.color = "#3e2723";
        notification.style.padding = "16px";
        notification.style.borderRadius = "12px";
        notification.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
        notification.style.zIndex = "1001";
        notification.style.display = "flex";
        notification.style.alignItems = "center";
        notification.style.gap = "12px";
        notification.style.direction = "rtl";
        notification.style.border = "2px solid #ffd54f";
        notification.style.animation = "slideInRight 0.5s ease-out";
        
        notification.innerHTML = `
          <div style="font-size: 32px;">${badge.icon}</div>
          <div>
            <div style="font-weight: 800; font-size: 14px;">تم فتح إنجاز جديد! 🏅</div>
            <div style="font-size: 12px; font-weight: 600;">${badge.title}</div>
          </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.animation = "slideOutRight 0.5s ease-in";
          setTimeout(() => notification.remove(), 500);
        }, 4000);
      }
    }
  }

  // استئناف أو بدء التقييم
  startOrResumeAssessment() {
    // البحث عن أول سؤال غير مجاب عليه
    let nextQIndex = 0;
    for (let i = 0; i < QUESTIONS.length; i++) {
      const q = QUESTIONS[i];
      if (!this.state.answers.some(a => a.qId === q.id)) {
        nextQIndex = i;
        break;
      }
      nextQIndex = i + 1; // إذا كانت كلها مجابة
    }

    if (nextQIndex >= QUESTIONS.length) {
      // إتمام كل الأسئلة
      this.generateFinalReport();
      return;
    }

    this.state.currentQuestionIndex = nextQIndex;
    this.renderQuestion();
    this.showScreen("assessment-screen");
  }

  // رسم السؤال الحالي في بطاقة التقييم
  renderQuestion() {
    const q = QUESTIONS[this.state.currentQuestionIndex];
    const range = this.sectionRanges.find(r => q.id >= r.start && q.id <= r.end);
    const dim = DIMENSIONS[range.id];

    // تحديث ترويسة البعد
    document.getElementById("current-dim-icon").textContent = dim.icon;
    document.getElementById("current-dim-title").textContent = dim.title;
    
    // حساب رقم السؤال داخل المحور والنسبة
    const totalInDim = range.end - range.start + 1;
    const indexInDim = q.id - range.start + 1;
    document.getElementById("question-counter-txt").textContent = `السؤال ${indexInDim} من ${totalInDim}`;

    const progressPercent = ((indexInDim - 1) / totalInDim) * 100;
    document.getElementById("assessment-progress-bar").style.width = `${progressPercent}%`;

    // تعبئة بطاقة السؤال
    document.getElementById("question-text-val").textContent = q.text;
    
    // إخفاء التغذية الراجعة
    document.getElementById("advice-feedback-overlay").style.display = "none";
    
    // تمكين أزرار الإجابات
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.classList.remove("selected");
      btn.style.pointerEvents = "auto";
    });
  }

  // معالجة الإجابة عند اختيار خيار
  async handleAnswer(score, event) {
    const q = QUESTIONS[this.state.currentQuestionIndex];
    const range = this.sectionRanges.find(r => q.id >= r.start && q.id <= r.end);
    const dim = DIMENSIONS[range.id];

    // تعطيل الأزرار لمنع النقر المزدوج
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.style.pointerEvents = "none";
    });
    
    // تحديد الزر المختار بصرياً
    const clickedBtn = [...document.querySelectorAll(".option-btn")].find(b => parseInt(b.getAttribute("data-score")) === score);
    if (clickedBtn) clickedBtn.classList.add("selected");

    // تحديث إحصائيات الحالة
    this.state.xp += 15;
    this.state.stars += 5;
    this.state.hearts += 1;
    this.state.streak++;
    this.updateStatsUI();

    // حفظ الإجابة
    const existingIdx = this.state.answers.findIndex(a => a.qId === q.id);
    if (existingIdx !== -1) {
      this.state.answers[existingIdx].score = score;
    } else {
      this.state.answers.push({ qId: q.id, score: score });
    }

    // تشغيل الصوت ومؤثر النقاط العائم
    soundFx.playChime();
    this.triggerFloatingPointsAtBtn(clickedBtn, "+15 XP");

    // التحقق من سلاسل الإنجازات (Streaks)
    if (this.state.streak === 3) this.unlockBadge("streak_3");
    if (this.state.streak === 10) this.unlockBadge("streak_10");

    // جلب النصيحة الفورية من الذكاء الاصطناعي أو محلياً
    const adviceText = await aiEngine.generateQuestionAdvice(q.text, clickedBtn.textContent.trim(), score);
    
    // عرض صندوق التغذية الراجعة
    const feedbackBox = document.getElementById("advice-feedback-overlay");
    const feedbackTxt = document.getElementById("advice-feedback-txt");
    feedbackTxt.textContent = adviceText;
    feedbackBox.style.display = "flex";

    // حفظ التقدم بشكل مستمر
    this.saveState();

    // انتظار 2 ثانية ثم الانتقال تلقائياً
    setTimeout(() => {
      this.advanceAfterAnswer(q, range, dim);
    }, 2200);
  }

  // التقديم التلقائي بعد انتهاء زمن عرض النصيحة
  advanceAfterAnswer(q, range, dim) {
    // هل انتهى المحور بالكامل؟
    const isSectionComplete = q.id === range.end;
    
    if (isSectionComplete) {
      this.state.streak = 0;
      this.showSpinWheelScreen(range, dim);
    } else {
      this.state.currentQuestionIndex++;
      this.renderQuestion();
    }
  }

  // عرض شاشة عجلة الحظ الكبرى
  showSpinWheelScreen(range, dim) {
    document.getElementById("level-complete-title").textContent = `🎉 محور ${dim.title} اكتمل!`;
    document.getElementById("built-part-announcement").textContent = `تم بناء [ ${dim.elementName} ] بنجاح 🏡`;
    
    // إخفاء صندوق الإرشاد لحين دوران العجلة
    document.getElementById("section-coaching-box").style.display = "none";
    document.getElementById("spin-wheel-btn").style.display = "inline-flex";
    
    // تحديث رسمة المنزل
    this.updateHouseUI();
    
    // فتح شارة إتمام المحور
    const sectionBadges = { 1: "home_hero", 2: "parenting_expert", 3: "finance_planner", 4: "social_star", 5: "love_champion" };
    this.unlockBadge(sectionBadges[range.id]);

    this.showScreen("spin-screen");

    // جلب فقرة كوتشينج الذكاء الاصطناعي في الخلفية
    this.fetchSectionCoachingInBg(range, dim);
  }

  // جلب فقرة التوجيه في الخلفية لسرعة الأداء
  async fetchSectionCoachingInBg(range, dim) {
    const rangeQuestions = QUESTIONS.filter(q => q.dimensionId === range.id);
    const rangeAnswers = this.state.answers.filter(a => rangeQuestions.some(q => q.id === a.qId));
    
    const scoreSum = rangeAnswers.reduce((sum, a) => sum + a.score, 0);
    const maxScore = rangeQuestions.length * 5;
    const percentage = Math.round((scoreSum / maxScore) * 100);

    const answersList = rangeQuestions.map(q => {
      const ans = rangeAnswers.find(a => a.qId === q.id);
      return {
        questionText: q.text,
        score: ans ? ans.score : 3,
        answerText: this.getAnswerText(ans ? ans.score : 3)
      };
    });

    const coachingText = await aiEngine.generateSectionCoaching(dim.title, percentage, answersList);
    document.getElementById("section-coaching-txt").textContent = coachingText;
  }

  // إدارة حركة دوران عجلة الحظ
  spinWheel() {
    if (this.isSpinning) return;
    this.isSpinning = true;
    soundFx.playClick();
    
    const wheel = document.getElementById("wheel-element");
    const spinBtn = document.getElementById("spin-wheel-btn");
    spinBtn.style.display = "none";

    // تدوير عشوائي كبير (على الأقل 4 لفات كاملة)
    const randomDeg = Math.floor(Math.random() * 360) + 1440;
    wheel.style.transform = `rotate(${randomDeg}deg)`;

    // محاكاة صوت التكة أثناء الدوران
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      if (tickCount < 30) {
        soundFx.playTick();
        tickCount++;
      } else {
        clearInterval(tickInterval);
      }
    }, 120);

    // بعد انتهاء الحركة (4 ثوانٍ)
    setTimeout(() => {
      this.isSpinning = false;
      clearInterval(tickInterval);
      
      // تحديد الجائزة الفائزة بناءً على زاوية النهاية
      const finalAngle = randomDeg % 360;
      // تقسيم العجلة (6 قطاعات كل منها 60 درجة)
      // الزاوية تحسب عكس اتجاه عقارب الساعة
      const prizes = ["كتاب إلكتروني 📖", "كوبون خصم 🎁", "دورة مجانية 🎓", "+100 نقطة ⭐", "وسام ذهبي 🏆", "سعادة مضاعفة 💖"];
      const prizeIdx = Math.floor(((360 - finalAngle + 30) % 360) / 60);
      const wonPrize = prizes[prizeIdx];

      // مكافأة المستخدم
      this.state.xp += 150;
      this.state.stars += 30;
      this.state.hearts += 5;
      this.updateStatsUI();
      soundFx.playVictory();

      // رسم الاحتفالات والكونفيتي
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // إظهار الإرشاد وزر الاستمرار
      const coachingBox = document.getElementById("section-coaching-box");
      coachingBox.style.display = "flex";
      
      const wonMsg = document.createElement("div");
      wonMsg.style.background = "#e8f5e9";
      wonMsg.style.color = "#2e7d32";
      wonMsg.style.padding = "10px";
      wonMsg.style.borderRadius = "8px";
      wonMsg.style.fontWeight = "700";
      wonMsg.style.fontSize = "14px";
      wonMsg.style.marginBottom = "14px";
      wonMsg.textContent = `مبروك! لقد فزتِ بـ: ${wonPrize} (+150 XP, +30 نجوم)`;
      coachingBox.insertBefore(wonMsg, coachingBox.firstChild);
      
      this.saveState();
    }, 4000);
  }

  // توليد وعرض التقرير النفسي والأسري الشامل
  async generateFinalReport() {
    this.showScreen("report-screen");
    this.unlockBadge("home_builder");
    
    // حساب درجات الأبعاد الخمسة بالتفصيل
    const scores = {};
    let grandTotal = 0;
    let grandMax = 0;

    this.sectionRanges.forEach(range => {
      const dim = DIMENSIONS[range.id];
      const rangeQuestions = QUESTIONS.filter(q => q.dimensionId === range.id);
      const rangeAnswers = this.state.answers.filter(a => rangeQuestions.some(q => q.id === a.qId));
      
      const scoreSum = rangeAnswers.reduce((sum, a) => sum + a.score, 0);
      const maxScore = rangeQuestions.length * 5;
      const percentage = maxScore > 0 ? Math.round((scoreSum / maxScore) * 100) : 0;
      
      scores[range.id] = {
        title: dim.title,
        score: scoreSum,
        maxScore: maxScore,
        percentage: percentage
      };

      grandTotal += scoreSum;
      grandMax += maxScore;
    });

    const overallPercentage = Math.round((grandTotal / grandMax) * 100);

    // تحديث النسبة الكلية الدائرية مع الرسوم المتحركة
    document.getElementById("report-overall-val").textContent = `${overallPercentage}%`;
    const progressCircle = document.getElementById("report-radial-fill");
    const strokeDashOffset = 251.2 - (251.2 * overallPercentage) / 100;
    progressCircle.style.strokeDashoffset = strokeDashOffset;

    // استخراج أفضل 3 نقاط قوة وأبرز 3 نقاط ضعف
    const sortedAnswers = [...this.state.answers].map(ans => {
      const q = QUESTIONS.find(qi => qi.id === ans.qId);
      return { qId: ans.qId, score: ans.score, text: q.text, dimensionId: q.dimensionId };
    });

    // ترتيب تصاعدي للحصول على الضعف (الأقل نقاط) ثم التنازلي للقوة
    const sortedLow = [...sortedAnswers].sort((a,b) => a.score - b.score);
    const sortedHigh = [...sortedAnswers].sort((a,b) => b.score - a.score);

    const weaknesses = sortedLow.slice(0, 3).map(w => ({ ...w, answerText: this.getAnswerText(w.score) }));
    const strengths = sortedHigh.slice(0, 3).map(s => ({ ...s, answerText: this.getAnswerText(s.score) }));

    // تهيئة الرسم البياني الراداري
    this.renderRadarChart(scores);

    // جلب تقرير الذكاء الاصطناعي النفسي الكامل
    const reportBox = document.getElementById("ai-psychological-report-content");
    reportBox.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <span style="font-size: 24px; animation: spin 1s infinite linear; display: inline-block;">🌀</span>
        <p style="margin-top: 8px;">جاري إرسال البيانات وتحليلها عبر ذكاء Gemini الاصطناعي الفاخر...</p>
      </div>
    `;

    const reportMarkdown = await aiEngine.generateFullPsychologicalReport(
      this.state.username,
      overallPercentage,
      scores,
      strengths,
      weaknesses
    );

    // تحويل Markdown البسيط لـ HTML
    reportBox.innerHTML = this.parseMarkdown(reportMarkdown);
    
    // تشغيل احتفالات النهاية
    soundFx.playVictory();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 }
    });

    // إعداد الشهادة
    document.getElementById("cert-user-name").textContent = this.state.username;
    document.getElementById("cert-score-val").textContent = `${overallPercentage}%`;
    document.getElementById("cert-date-val").textContent = new Date().toLocaleDateString('ar-EG');

    this.state.isAssessInProgress = false;
    this.saveState();
  }

  // رسم المخطط الراداري Radar Chart
  renderRadarChart(scores) {
    const ctx = document.getElementById("radarChartCanvas").getContext("2d");
    
    const labels = Object.values(scores).map(s => s.title);
    const dataValues = Object.values(scores).map(s => s.percentage);

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    this.chartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'نسبة التوافق والمشاركة %',
          data: dataValues,
          backgroundColor: 'rgba(216, 27, 96, 0.2)',
          borderColor: '#d81b60',
          pointBackgroundColor: '#d81b60',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#d81b60',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              color: 'rgba(0, 0, 0, 0.08)'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.08)'
            },
            pointLabels: {
              font: {
                family: 'Cairo',
                size: 11,
                weight: '700'
              },
              color: '#2d3748'
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // فتح نافذة عرض الشهادة
  openCertificateModal() {
    const modal = document.getElementById("cert-modal");
    modal.classList.add("active");
    
    // تأثير احتفالي صغير
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }

  // مشاركة ملخص التقرير على واتساب
  shareWhatsApp() {
    const overallScore = document.getElementById("report-overall-val").textContent;
    const text = encodeURIComponent(
      `🏡 الحمد لله، لقد أتممتُ رحلة التقييم الأسري الرقمي التفاعلي "خيركم لأهله" وبنيتُ منزل السعادة بنسبة نجاح بلغت ${overallScore}!\n\nأنصح كل زوجة بتجربة هذا التقييم الرائع لتعزيز المشاركة وبناء بيت متماسك ومستقر.\n\nشعارنا: "خيركم خيركم لأهله" 🌸`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  // إرسال التقرير عبر البريد
  sendEmailReport() {
    const overallScore = document.getElementById("report-overall-val").textContent;
    const subject = encodeURIComponent(`تقرير تقييم خيركم الأسري - ${this.state.username}`);
    const body = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،\n\nلقد تم إصدار تقرير السعادة الأسرية للزوجة الداعمة: ${this.state.username} بمعدل إجمالي يبلغ ${overallScore}.\n\nالتقرير الشامل والشهادة التقديرية متاحة للتحميل والطباعة مباشرة من لوحة التحكم الخاصة بكِ.\n\nمنصة خيركم لبناء السعادة الأسرية 🏡`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  // أرشفة التقييم الحالي في السجل والبدء من جديد
  archiveCurrentAssessment() {
    const history = JSON.parse(localStorage.getItem("KHAIRKOM_ASSESSMENTS_HISTORY") || "[]");
    
    const scores = {};
    let grandTotal = 0;
    let grandMax = 0;

    this.sectionRanges.forEach(range => {
      const rangeQuestions = QUESTIONS.filter(q => q.dimensionId === range.id);
      const rangeAnswers = this.state.answers.filter(a => rangeQuestions.some(q => q.id === a.qId));
      const scoreSum = rangeAnswers.reduce((sum, a) => sum + a.score, 0);
      const maxScore = rangeQuestions.length * 5;
      grandTotal += scoreSum;
      grandMax += maxScore;
    });

    const overallPercentage = Math.round((grandTotal / grandMax) * 100);

    const reportArchive = {
      date: new Date().toLocaleDateString('ar-EG'),
      score: overallPercentage,
      xpEarned: this.state.xp,
      badgesCount: this.state.unlockedBadges.length
    };

    history.push(reportArchive);
    localStorage.setItem("KHAIRKOM_ASSESSMENTS_HISTORY", JSON.stringify(history));

    // تصفية أجزاء من حالة التقييم
    this.state.answers = [];
    this.state.currentQuestionIndex = 0;
    this.state.isAssessInProgress = false;
    
    // الاحتفاظ بالاسم والـ XP
    this.saveState();
    
    location.reload();
  }

  // رسم قائمة تاريخ التقييمات في لوحة التحكم
  renderHistoryList() {
    const history = JSON.parse(localStorage.getItem("KHAIRKOM_ASSESSMENTS_HISTORY") || "[]");
    const container = document.getElementById("history-list");
    
    if (history.length > 0) {
      container.innerHTML = "";
      history.forEach((h, idx) => {
        const item = document.createElement("div");
        item.className = "report-card-item";
        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.alignItems = "center";
        item.style.background = "var(--card-glass)";
        item.style.margin = "0";
        item.innerHTML = `
          <div>
            <strong>تقييم تاريخ ${h.date}</strong>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              أوسمة مفتوحة: ${h.badgesCount} شارة
            </div>
          </div>
          <div style="font-weight: 900; color: var(--primary-pink); font-size: 16px;">
            ${h.score}%
          </div>
        `;
        container.appendChild(item);
      });
    }
  }

  // --- دوال مساعدة برمجية ---

  // إظهار النقاط العائمة
  triggerFloatingPointsAtBtn(targetElement, text) {
    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    
    const floating = document.createElement("div");
    floating.className = "floating-points";
    floating.textContent = text;
    
    // الألوان
    floating.style.color = "var(--primary-pink)";
    floating.style.textShadow = "0 2px 4px rgba(0,0,0,0.1)";
    floating.style.left = `${rect.left + rect.width / 2}px`;
    floating.style.top = `${rect.top}px`;
    
    document.body.appendChild(floating);
    
    setTimeout(() => {
      floating.remove();
    }, 1200);
  }

  // ترجمة نقاط الإجابة إلى نصها العربي المقابل
  getAnswerText(score) {
    const textMap = {
      5: "دائمًا",
      4: "غالبًا",
      3: "أحيانًا",
      2: "نادرًا",
      1: "مطلقًا"
    };
    return textMap[score] || "أحيانًا";
  }

  // تحويل Markdown بسيط لعناصر HTML منسقة للتقرير النهائي
  parseMarkdown(text) {
    if (!text) return "";
    let html = text;
    // العناوين الكبيرة
    html = html.replace(/^### (.*$)/gim, '<h4 style="color: var(--primary-pink-dark); font-weight: 800; font-size: 15px; margin-top: 14px; margin-bottom: 6px;">$1</h4>');
    html = html.replace(/^## (.*$)/gim, '<h3 style="color: var(--primary-pink); font-weight: 900; font-size: 17px; margin-top: 18px; margin-bottom: 8px; border-bottom: 1.5px solid var(--bg-cream-dark); padding-bottom: 4px;">$1</h3>');
    html = html.replace(/^# (.*$)/gim, '<h2 style="color: var(--primary-dark); font-weight: 900; font-size: 20px; text-align: center; margin-bottom: 16px;">$1</h2>');
    
    // النصوص السميكة
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // القوائم المنظمة والغير منظمة
    html = html.replace(/^\s*\n\* (.*)/gim, '<ul>\n<li>$1</li>\n</ul>');
    html = html.replace(/^\s*\n\d+\. (.*)/gim, '<ol>\n<li>$1</li>\n</ol>');
    
    // الفقرات العادية وفواصل الأسطر
    html = html.replace(/\n/g, '<br>');
    
    return html;
  }
}

// تشغيل التطبيق بعد تحميل الصفحة كاملة
window.addEventListener("DOMContentLoaded", () => {
  const app = new KhairkomApp();
  app.init();
});
export default KhairkomApp;
