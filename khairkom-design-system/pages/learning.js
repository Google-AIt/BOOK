// learning.js
if (!window.Pages) window.Pages = {};

window.Pages.learning = {
  title: {
    en: "Learning Platform",
    ar: "المنصة التعليمية"
  },
  render(lang = 'en') {
    const isAr = lang === 'ar';
    const text = {
      headerTitle: isAr ? "البوابة التعليمية" : "Educational Portal",
      headerDesc: isAr ? "ادرس المناهج القيمية، واجتاز الاختبارات، وتابع شهاداتك الرسمية." : "Study values-based curriculum, take quizzes, and track official certificates.",
      
      tab1: isAr ? "دليل الدورات" : "Courses Catalog",
      tab2: isAr ? "مشغل الدروس التفاعلي" : "Interactive Lesson Player",
      tab3: isAr ? "الاختبار الحالي" : "Active Quiz",
      tab4: isAr ? "شهاداتي" : "My Certificates",
      tab5: isAr ? "الطلاب والمعلمون" : "Students & Teachers",
      
      progressLabel: isAr ? "التقدم العام: 64% مكتمل" : "Overall Progress: 64% Completed",
      
      resume: isAr ? "متابعة الدورة" : "Resume Course",
      watch: isAr ? "مشاهدة الدورة" : "Watch Course",
      start: isAr ? "بدء الدورة" : "Start Course",
      instructor: isAr ? "المشرف" : "Instructor",
      
      c1Title: isAr ? "الحب بعد الزواج" : "Love After Marriage",
      c1Desc: isAr ? "بناء الذكاء العاطفي ومفاتيح التوافق في الحياة الزوجية." : "Building emotional intelligence and compatibility keys in marital life.",
      c1Tutor: isAr ? "د. أحمد عبيد" : "Dr. Ahmed Obaid",
      
      c2Title: isAr ? "إدارة الأولويات" : "Priority Management",
      c2Desc: isAr ? "استراتيجيات واضحة لموازنة شؤون الأسرة، والأهداف الشخصية، والعمل." : "Strategies to balance family, personal goals, and work requirements efficiently.",
      c2Tutor: isAr ? "أ. سارة علي" : "Tutor Sarah Ali",
      
      c3Title: isAr ? "الزوج الراعي" : "The Shepherd Husband",
      c3Desc: isAr ? "استكشاف دور القيادة والرعاية داخل الأسرة الحديثة." : "Exploring leadership and care roles inside a modern family unit.",
      c3Tutor: isAr ? "الشيخ عبدالله عمر" : "Sheikh Abdullah Omar",

      clickToPlay: isAr ? "انقر لتشغيل المحاضرة المرئية" : "Click to play video lecture",
      nowPlaying: isAr ? "المحاضرة 1: الميثاق الغليظ" : "Lecture 1: The Core Covenant",
      playingTime: "04:12 / 18:40",
      contentTitle: isAr ? "محتوى الدورة" : "Course Content",
      
      quizQ: isAr ? "أي مما يلي يعتبر الركيزة الأهم لبناء حوار بناء أثناء الخلافات الأسرية؟" : "Which of the following is considered the most crucial pillar of constructive dialogue during family disputes?",
      quizA1: isAr ? "التزام الصمت التام حتى يغادر الطرف الآخر الغرفة." : "Maintaining absolute silence until the other party leaves the room.",
      quizA2: isAr ? "الإنصات الفعال المصحوب باحتواء الحالة العاطفية للطرف الآخر قبل تقديم الحلول." : "Active listening accompanied by validating emotional states before offering solutions.",
      quizA3: isAr ? "التركيز بالكامل على تحديد المخطئ بدلاً من كيفية تحسين الوضع." : "Focusing entirely on defining who was wrong rather than how to improve.",
      quizSubmit: isAr ? "إرسال ومتابعة" : "Submit & Continue",
      quizPrev: isAr ? "السابق" : "Previous",

      certTitle1: isAr ? "شهادة التوافق الزواجي" : "Certificate of Marital Ethics",
      certSub1: isAr ? "تم الاجتياز: الحب بعد الزواج • بتقدير ممتاز مرتفع" : "Completed: Love After Marriage Course • Grade A+",
      certTitle2: isAr ? "خبير إدارة الأولويات" : "Priority Management Expert",
      certSub2: isAr ? "أكمل ما تبقى من الدروس لفتح الشهادة." : "Complete remaining lessons of Idarat al-Awlawiyyat to unlock.",
      locked: isAr ? "مغلق" : "Locked",
      download: isAr ? "تحميل PDF" : "Download PDF"
    };

    return `
      <div class="page-header" style="margin-bottom:var(--space-5);">
        <h1 style="margin:0; font-size:28px; font-weight:800; letter-spacing:-0.02em;">${text.headerTitle}</h1>
        <p style="margin:4px 0 0 0; color:var(--theme-text-muted); font-size:14px;">${text.headerDesc}</p>
      </div>

      <!-- Segmented Category Tabs -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--theme-border-color); margin-bottom:var(--space-5); padding-bottom:8px;">
        <div class="tabs-header" style="margin-bottom:0; border-bottom:none;">
          <a class="tab-link active" data-tab="courses">${text.tab1}</a>
          <a class="tab-link" data-tab="player">${text.tab2}</a>
          <a class="tab-link" data-tab="quiz">${text.tab3}</a>
          <a class="tab-link" data-tab="certificates">${text.tab4}</a>
          <a class="tab-link" data-tab="users">${text.tab5}</a>
        </div>
        <div style="font-size:13px; font-weight:700; color:var(--theme-primary);">
          ${text.progressLabel}
        </div>
      </div>

      <!-- TAB CONTENT PANES -->
      
      <!-- 1. COURSES -->
      <div class="tab-pane active" data-pane="courses">
        <div class="courses-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:var(--space-4);">
          
          <!-- Course Card 1 -->
          <div class="card">
            <div style="height:140px; background:linear-gradient(135deg, var(--theme-primary) 0%, rgba(var(--theme-primary-rgb),0.7) 100%); display:flex; align-items:center; justify-content:center; color:white; font-size:24px; font-weight:bold; position:relative; font-family:'Tajawal';">
              ${text.c1Title}
              <span class="badge badge-accent" style="position:absolute; top:12px; right:12px; font-size:10px;">${isAr ? "إرشاد أسري" : "Counseling"}</span>
            </div>
            <div class="card-body">
              <h3 style="margin:0 0 8px 0; font-size:16px; font-weight:700;">${text.c1Title}</h3>
              <p style="margin:0 0 16px 0; font-size:13px; color:var(--theme-text-muted); line-height:1.5;">${text.c1Desc}</p>
              
              <div class="form-group" style="margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>${isAr ? "التقدم" : "Progress"}</span>
                  <span>100%</span>
                </div>
                <div class="progress-track" style="height:4px;"><div class="progress-fill" style="width:100%;"></div></div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; color:var(--theme-text-muted); font-weight:600;">${text.c1Tutor}</span>
                <button class="btn btn-secondary btn-sm" onclick="Pages.learning.loadLessonPlayer('marriage')">${text.watch}</button>
              </div>
            </div>
          </div>

          <!-- Course Card 2 -->
          <div class="card">
            <div style="height:140px; background:linear-gradient(135deg, var(--theme-accent) 0%, rgba(var(--theme-accent-rgb),0.7) 100%); display:flex; align-items:center; justify-content:center; color:white; font-size:24px; font-weight:bold; position:relative; font-family:'Tajawal';">
              ${text.c2Title}
              <span class="badge badge-primary" style="position:absolute; top:12px; right:12px; font-size:10px;">${isAr ? "تطوير الذات" : "Self-Development"}</span>
            </div>
            <div class="card-body">
              <h3 style="margin:0 0 8px 0; font-size:16px; font-weight:700;">${text.c2Title}</h3>
              <p style="margin:0 0 16px 0; font-size:13px; color:var(--theme-text-muted); line-height:1.5;">${text.c2Desc}</p>
              
              <div class="form-group" style="margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>${isAr ? "التقدم" : "Progress"}</span>
                  <span>45%</span>
                </div>
                <div class="progress-track" style="height:4px;"><div class="progress-fill" style="width:45%; background-color:var(--theme-accent);"></div></div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; color:var(--theme-text-muted); font-weight:600;">${text.c2Tutor}</span>
                <button class="btn btn-primary btn-sm" onclick="Pages.learning.loadLessonPlayer('priorities')">${text.resume}</button>
              </div>
            </div>
          </div>

          <!-- Course Card 3 -->
          <div class="card">
            <div style="height:140px; background:linear-gradient(135deg, var(--theme-secondary) 0%, rgba(var(--theme-primary-rgb),0.3) 100%); display:flex; align-items:center; justify-content:center; color:white; font-size:24px; font-weight:bold; position:relative; font-family:'Tajawal';">
              ${text.c3Title}
              <span class="badge badge-info" style="position:absolute; top:12px; right:12px; font-size:10px;">${isAr ? "رعاية الأسرة" : "Family Care"}</span>
            </div>
            <div class="card-body">
              <h3 style="margin:0 0 8px 0; font-size:16px; font-weight:700;">${text.c3Title}</h3>
              <p style="margin:0 0 16px 0; font-size:13px; color:var(--theme-text-muted); line-height:1.5;">${text.c3Desc}</p>
              
              <div class="form-group" style="margin-bottom:16px;">
                <div style="display:flex; justify-content:space-between; font-size:12px; font-weight:600; margin-bottom:4px;">
                  <span>${isAr ? "التقدم" : "Progress"}</span>
                  <span>0%</span>
                </div>
                <div class="progress-track" style="height:4px;"><div class="progress-fill" style="width:0%;"></div></div>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:12px; color:var(--theme-text-muted); font-weight:600;">${text.c3Tutor}</span>
                <button class="btn btn-outline btn-sm" onclick="Pages.learning.loadLessonPlayer('shepherd')">${text.start}</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 2. LESSON PLAYER -->
      <div class="tab-pane" data-pane="player">
        <div class="player-layout" style="display:grid; grid-template-columns: 2fr 1fr; gap:var(--space-4);">
          
          <!-- Main Player -->
          <div>
            <div class="card" style="margin-bottom:16px;">
              <div id="videoContainer" style="height:320px; background:#12131a; display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; position:relative;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer; color:var(--theme-accent); filter:drop-shadow(0 4px 12px rgba(0,0,0,0.5));" onclick="Components.showToast('${isAr ? "جاري تشغيل الدرس المرئي..." : "Playing lecture..."}', 'success')"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                <span style="font-size:13px; margin-top:12px; opacity:0.7;">${text.clickToPlay}</span>
                
                <!-- Custom video controls overlay -->
                <div style="position:absolute; bottom:0; left:0; right:0; padding:12px 18px; background:linear-gradient(to top, rgba(0,0,0,0.8), transparent); display:flex; align-items:center; justify-content:space-between; font-size:12px;">
                  <span id="playerLectureTitle">${text.nowPlaying}</span>
                  <span id="playerLectureTime">${text.playingTime}</span>
                </div>
              </div>
              <div class="card-body">
                <h3 id="playerCourseName" style="margin:0 0 8px 0; font-size:18px; font-weight:700;">${text.c1Title}</h3>
                <p id="playerCourseDesc" style="margin:0; font-size:13px; color:var(--theme-text-muted); line-height:1.6;">${text.c1Desc}</p>
              </div>
            </div>
          </div>

          <!-- Lessons List Sidebar -->
          <div class="card">
            <div class="card-header" style="background:rgba(var(--theme-primary-rgb),0.02);">
              <h4 style="margin:0; font-size:14px; font-weight:700;">${text.contentTitle}</h4>
            </div>
            <div style="display:flex; flex-direction:column;" id="playerLessonList">
              <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center; background:rgba(var(--theme-primary-rgb),0.04); cursor:pointer;" onclick="Pages.learning.changeLecture(1)">
                <div>
                  <div style="font-size:13px; font-weight:700; color:var(--theme-primary);">${isAr ? "1. الميثاق الغليظ" : "1. The Core Covenant"}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "18 دقيقة • مكتمل" : "18 mins • Completed"}</span>
                </div>
                <span>✓</span>
              </div>
              <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="Pages.learning.changeLecture(2)">
                <div>
                  <div style="font-size:13px; font-weight:600;">${isAr ? "2. ركائز التفاهم الزوجي" : "2. Pillars of Understanding"}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "22 دقيقة" : "22 mins"}</span>
                </div>
              </div>
              <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="Pages.learning.changeLecture(3)">
                <div>
                  <div style="font-size:13px; font-weight:600;">${isAr ? "3. مفاتيح حل الخلافات" : "3. Conflict Resolution Keys"}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "15 دقيقة" : "15 mins"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 3. ACTIVE QUIZ -->
      <div class="tab-pane" data-pane="quiz">
        <div style="max-width:600px; margin:0 auto;">
          <div class="card" id="quizCard">
            <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12px; font-weight:700; color:var(--theme-text-muted);">${isAr ? "السؤال 3 من 5" : "Question 3 of 5"}</span>
              <span class="badge badge-accent">${isAr ? "اختبار آداب الحوار الزواجي" : "Marital Ethics Quiz"}</span>
            </div>
            <div class="card-body">
              <h3 style="margin:0 0 20px 0; font-size:16px; font-weight:700; line-height:1.5;">${text.quizQ}</h3>
              
              <!-- Quiz Options -->
              <div style="display:flex; flex-direction:column; gap:12px;" id="quizOptions">
                <label class="custom-radio" style="padding:12px 16px; border:1px solid var(--theme-border-color); border-radius:var(--radius-sm); transition:all var(--transition-fast);" onclick="Pages.learning.selectQuizOption(this)">
                  <input type="radio" name="familyQuiz">
                  <span class="radio-circle"></span>
                  <span>${text.quizA1}</span>
                </label>
                
                <label class="custom-radio" style="padding:12px 16px; border:1px solid var(--theme-border-color); border-radius:var(--radius-sm); transition:all var(--transition-fast);" onclick="Pages.learning.selectQuizOption(this)">
                  <input type="radio" name="familyQuiz" id="correctQuizOption">
                  <span class="radio-circle"></span>
                  <span>${text.quizA2}</span>
                </label>

                <label class="custom-radio" style="padding:12px 16px; border:1px solid var(--theme-border-color); border-radius:var(--radius-sm); transition:all var(--transition-fast);" onclick="Pages.learning.selectQuizOption(this)">
                  <input type="radio" name="familyQuiz">
                  <span class="radio-circle"></span>
                  <span>${text.quizA3}</span>
                </label>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline" onclick="Components.showToast('${isAr ? "تم قفل السؤال السابق" : "Previous question locked"}', 'warning')">${text.quizPrev}</button>
              <button class="btn btn-primary" onclick="Pages.learning.checkQuizAnswer()">${text.quizSubmit}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. MY CERTIFICATES -->
      <div class="tab-pane" data-pane="certificates">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">
          
          <!-- Certificate Card 1 -->
          <div class="card card-body" style="display:flex; flex-direction:row; align-items:center; gap:20px;">
            <div style="width:80px; height:80px; background:rgba(var(--theme-accent-rgb),0.1); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; color:var(--theme-accent); font-size:32px;">
              🏆
            </div>
            <div style="flex:1;">
              <h3 style="margin:0 0 4px 0; font-size:15px; font-weight:700;">${text.certTitle1}</h3>
              <p style="margin:0 0 12px 0; font-size:12px; color:var(--theme-text-muted);">${text.certSub1}</p>
              <button class="btn btn-secondary btn-sm" onclick="Pages.learning.downloadCert('${isAr ? "الحب بعد الزواج" : "Love After Marriage"}')">${text.download}</button>
            </div>
          </div>

          <!-- Certificate Card 2 -->
          <div class="card card-body" style="display:flex; flex-direction:row; align-items:center; gap:20px; opacity:0.6;">
            <div style="width:80px; height:80px; background:var(--theme-border-color); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; color:var(--theme-text-muted); font-size:32px;">
              🔒
            </div>
            <div style="flex:1;">
              <h3 style="margin:0 0 4px 0; font-size:15px; font-weight:700;">${text.certTitle2}</h3>
              <p style="margin:0 0 12px 0; font-size:12px; color:var(--theme-text-muted);">${text.certSub2}</p>
              <button class="btn btn-outline btn-sm" disabled>${text.locked}</button>
            </div>
          </div>

        </div>
      </div>

      <!-- 5. USERS -->
      <div class="tab-pane" data-pane="users">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:var(--space-4);">
          <!-- Teachers -->
          <div class="card">
            <div class="card-header">
              <h4 style="margin:0; font-size:14px; font-weight:700;">${isAr ? "المشرفون والمعلمون" : "Official Teachers"}</h4>
            </div>
            <div class="card-body" style="padding:0;">
              <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; align-items:center; gap:12px;">
                <div style="width:36px; height:36px; border-radius:50%; background:#ddd; display:flex; align-items:center; justify-content:center; font-weight:bold;">AO</div>
                <div>
                  <div style="font-size:13px; font-weight:700;">${text.c1Tutor}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "خبير إرشاد أسري • 12 دورة فعالة" : "Family Counseling Expert • 12 Active Courses"}</span>
                </div>
              </div>
              <div style="padding:12px 18px; display:flex; align-items:center; gap:12px;">
                <div style="width:36px; height:36px; border-radius:50%; background:#ddd; display:flex; align-items:center; justify-content:center; font-weight:bold;">SA</div>
                <div>
                  <div style="font-size:13px; font-weight:700;">${text.c2Tutor}</div>
                  <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "مستشارة إدارة وتنظيم الوقت • 4 دورات فعالة" : "Time Management Consultant • 4 Active Courses"}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Students -->
          <div class="card">
            <div class="card-header">
              <h4 style="margin:0; font-size:14px; font-weight:700;">${isAr ? "الطلاب الأكثر نشاطاً" : "Top Performing Students"}</h4>
            </div>
            <div class="card-body" style="padding:0;">
              <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:#eee; display:flex; align-items:center; justify-content:center; font-weight:bold;">1</div>
                  <div>
                    <div style="font-size:13px; font-weight:700;">${isAr ? "أحمد المنصوري" : "Ahmed Al-Mansoori"}</div>
                    <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "أتم 14 دورة • 45 اختباراً قيمياً" : "14 courses completed • 45 quiz badges"}</span>
                  </div>
                </div>
                <span class="badge badge-success">${isAr ? "الأول على المنصة" : "Top Student"}</span>
              </div>
              <div style="padding:12px 18px; display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:12px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:#eee; display:flex; align-items:center; justify-content:center; font-weight:bold;">2</div>
                  <div>
                    <div style="font-size:13px; font-weight:700;">${isAr ? "فاطمة جميل" : "Fatimah Jameel"}</div>
                    <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "أتمت 11 دورة • 32 اختباراً قيمياً" : "11 courses completed • 32 quiz badges"}</span>
                  </div>
                </div>
                <span class="badge badge-primary">${isAr ? "متعلمة فائقة" : "Super Learner"}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  },
  init() {},
  loadLessonPlayer(courseCode) {
    const playerLink = document.querySelector('.tab-link[data-tab="player"]');
    if (playerLink) playerLink.click();

    const isAr = App.state.lang === 'ar';
    const titleEl = document.getElementById('playerCourseName');
    const descEl = document.getElementById('playerCourseDesc');
    const videoEl = document.getElementById('videoContainer');
    const listEl = document.getElementById('playerLessonList');

    if (courseCode === 'marriage') {
      titleEl.innerHTML = isAr ? "الحب بعد الزواج" : "Love After Marriage (الحب بعد الزواج)";
      descEl.innerHTML = isAr ? "مرحباً بك في المحاضرة التمهيدية لكيفية بناء أساسات الاحترام والشفافية العاطفية بين الزوجين." : "Welcome to the introductory lesson on how shared respect and emotional transparency create robust long-term relationships.";
      videoEl.style.background = "linear-gradient(135deg, #12131a 0%, #171b26 100%)";
      listEl.innerHTML = `
        <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center; background:rgba(var(--theme-primary-rgb),0.04);" onclick="Pages.learning.changeLecture(1)">
          <div>
            <div style="font-size:13px; font-weight:700; color:var(--theme-primary);">${isAr ? "1. الميثاق الغليظ" : "1. The Core Covenant"}</div>
            <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "18 دقيقة • مكتمل" : "18 mins • Completed"}</span>
          </div>
          <span>✓</span>
        </div>
        <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="Pages.learning.changeLecture(2)">
          <div>
            <div style="font-size:13px; font-weight:600;">${isAr ? "2. ركائز التفاهم الزوجي" : "2. Pillars of Understanding"}</div>
            <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "22 دقيقة" : "22 mins"}</span>
          </div>
        </div>
        <div style="padding:12px 18px; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="Pages.learning.changeLecture(3)">
          <div>
            <div style="font-size:13px; font-weight:600;">${isAr ? "3. مفاتيح حل الخلافات" : "3. Conflict Resolution Keys"}</div>
            <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "15 دقيقة" : "15 mins"}</span>
          </div>
        </div>
      `;
    } else if (courseCode === 'priorities') {
      titleEl.innerHTML = isAr ? "إدارة الأولويات" : "Priority Management (إدارة الأولويات)";
      descEl.innerHTML = isAr ? "تعلم كيفية ترتيب مسؤوليات الأسرة، التعليم، والعمل بنجاح باستخدام النماذج الذهنية الحديثة." : "Understand how to prioritize family wellbeing, educational milestones, and career duties using modern mental models.";
      videoEl.style.background = "linear-gradient(135deg, #181515 0%, #292121 100%)";
      listEl.innerHTML = `
        <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center; background:rgba(var(--theme-primary-rgb),0.04);" onclick="Pages.learning.changeLecture(1)">
          <div>
            <div style="font-size:13px; font-weight:700; color:var(--theme-primary);">${isAr ? "1. جرد وتدقيق الوقت" : "1. Time Auditing"}</div>
            <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "12 دقيقة • مكتمل" : "12 mins • Completed"}</span>
          </div>
          <span>✓</span>
        </div>
        <div style="padding:12px 18px; border-bottom:1px solid var(--theme-border-color); display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="Pages.learning.changeLecture(2)">
          <div>
            <div style="font-size:13px; font-weight:600;">${isAr ? "2. الموازنة بين المهام" : "2. Balancing Duties"}</div>
            <span style="font-size:11px; color:var(--theme-text-muted);">${isAr ? "20 دقيقة" : "20 mins"}</span>
          </div>
        </div>
      `;
    }
  },
  changeLecture(lectureNum) {
    const isAr = App.state.lang === 'ar';
    const lectureTitleEl = document.getElementById('playerLectureTitle');
    const lectureTimeEl = document.getElementById('playerLectureTime');
    if (lectureNum === 1) {
      lectureTitleEl.innerText = isAr ? "المحاضرة 1: الميثاق الغليظ" : "Lecture 1: The Core Covenant";
      lectureTimeEl.innerText = "04:12 / 18:40";
    } else if (lectureNum === 2) {
      lectureTitleEl.innerText = isAr ? "المحاضرة 2: ركائز التفاهم الزوجي" : "Lecture 2: Pillars of Understanding";
      lectureTimeEl.innerText = "00:00 / 22:15";
    } else {
      lectureTitleEl.innerText = isAr ? "المحاضرة 3: مفاتيح حل الخلافات" : "Lecture 3: Conflict Resolution Keys";
      lectureTimeEl.innerText = "00:00 / 15:30";
    }
    Components.showToast(isAr ? `تم الانتقال للمحاضرة ${lectureNum}` : `Switched to Lecture ${lectureNum}`, 'info');
  },
  selectQuizOption(el) {
    const options = document.getElementById('quizOptions');
    options.querySelectorAll('label').forEach(label => {
      label.style.borderColor = 'var(--theme-border-color)';
      label.style.backgroundColor = 'transparent';
    });
    el.style.borderColor = 'var(--theme-primary)';
    el.style.backgroundColor = 'rgba(var(--theme-primary-rgb), 0.04)';
  },
  checkQuizAnswer() {
    const isAr = App.state.lang === 'ar';
    const correctRadio = document.getElementById('correctQuizOption');
    if (correctRadio && correctRadio.checked) {
      Components.showToast(isAr ? 'إجابة صحيحة! أحسنت العمل.' : 'Correct! That is the correct answer.', 'success');
      const quizCard = document.getElementById('quizCard');
      quizCard.innerHTML = `
        <div style="padding:48px 24px; text-align:center;">
          <span style="font-size:48px;">🎉</span>
          <h2 style="margin:16px 0 8px 0; font-size:22px; font-weight:800;">${isAr ? "اكتمل الاختبار بنجاح!" : "Quiz Completed Successfully!"}</h2>
          <p style="margin:0 0 24px 0; font-size:14px; color:var(--theme-text-muted);">${isAr ? "لقد حصلت على درجة 100% (5 إجابات صحيحة من أصل 5)." : "You scored 100% (5/5 correct answers) on marital ethics module."}</p>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button class="btn btn-outline" onclick="App.navigateTo('learning')">${isAr ? "العودة للدورات" : "Back to Courses"}</button>
            <button class="btn btn-primary" onclick="Pages.learning.downloadCert('${isAr ? "أخلاقيات الحوار الزوجي" : "Marital Ethics"}')">${isAr ? "استلام الشهادة" : "Claim Certificate"}</button>
          </div>
        </div>
      `;
    } else {
      Components.showToast(isAr ? 'إجابة خاطئة. يرجى مراجعة الخيارات وإعادة المحاولة.' : 'Incorrect answer. Please read carefully and try again.', 'danger');
    }
  },
  downloadCert(certName) {
    const isAr = App.state.lang === 'ar';
    Components.showToast(isAr ? `جاري إنشاء شهادة ${certName} كملف PDF...` : `Generating ${certName} certificate PDF...`, 'info');
    setTimeout(() => {
      Components.showToast(isAr ? `تم تحميل شهادة ${certName} بنجاح!` : `Downloaded ${certName} Certificate successfully!`, 'success');
    }, 1500);
  }
};
