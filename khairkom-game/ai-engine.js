// محرك الاتصال بذكاء Gemini الاصطناعي وتوليد النصائح والتقارير الأسرية المخصصة

class AIEngine {
  constructor() {
    this.apiKey = localStorage.getItem("KHAIRKOM_GEMINI_KEY") || "";
  }

  setApiKey(key) {
    this.apiKey = key;
    if (key) {
      localStorage.setItem("KHAIRKOM_GEMINI_KEY", key);
    } else {
      localStorage.removeItem("KHAIRKOM_GEMINI_KEY");
    }
  }

  hasKey() {
    return !!this.apiKey;
  }

  // توليد نصيحة فورية مخصصة بعد الإجابة على سؤال معين
  async generateQuestionAdvice(questionText, answerText, score) {
    if (!this.hasKey()) {
      return this.getLocalQuestionAdvice(questionText, answerText, score);
    }

    try {
      const prompt = `أنت أخصائي إرشاد أسري ونفسي خبير في منصة "خيركم".
لقد أجابت الزوجة على السؤال التالي حول مشاركة زوجها:
السؤال: "${questionText}"
الإجابة المختارة: "${answerText}" (الدرجة: ${score} من 5).

اكتب نصيحة قصيرة جداً ومكثفة (في حدود 15-20 كلمة) بأسلوب راقٍ، إيجابي، ومحفز لتعزيز هذا الجانب في الحياة الزوجية. وجه الخطاب مباشرة للزوجة بلهجة دافئة ومشجعة.
ملاحظة: لا تذكر كود البرمجة أو معلومات تقنية، اكتب النصيحة مباشرة فقط.`;

      const response = await this.callGemini(prompt);
      return response || this.getLocalQuestionAdvice(questionText, answerText, score);
    } catch (e) {
      console.error("Gemini API Error, falling back to local advice:", e);
      return this.getLocalQuestionAdvice(questionText, answerText, score);
    }
  }

  // توليد فقرة توجيهية مخصصة بعد نهاية محور معين
  async generateSectionCoaching(dimensionTitle, scorePercentage, answersList) {
    if (!this.hasKey()) {
      return this.getLocalSectionCoaching(dimensionTitle, scorePercentage, answersList);
    }

    try {
      const answersStr = answersList.map(a => `- ${a.questionText}: إجابتها كانت (${a.answerText})`).join("\n");
      const prompt = `أنت مرشد أسري ونفسي خبير في منصة "خيركم".
أنهت الزوجة تقييم محور "${dimensionTitle}" بنسبة توافق بلغت ${scorePercentage}%.
تفاصيل الإجابات في هذا المحور هي كالتالي:
${answersStr}

اكتب فقرة توجيهية (كوتشينج) مخصصة لهذه الزوجة (حوالي 50-70 كلمة) بلغة عربية فصحى دافئة ومحفزة.
يجب أن تتضمن الفقرة:
1. إشادة بنقاط القوة الظاهرة في هذا المحور بناءً على إجاباتها العالية (دائماً/غالباً).
2. نصيحة عملية دافئة للتعامل مع الجوانب التي حصلت على تقييم منخفض (نادراً/مطلقاً).
اكتب الفقرة مباشرة دون أي مقدمات أو عناوين فرعية.`;

      const response = await this.callGemini(prompt);
      return response || this.getLocalSectionCoaching(dimensionTitle, scorePercentage, answersList);
    } catch (e) {
      console.error("Gemini API Error, falling back to local section coaching:", e);
      return this.getLocalSectionCoaching(dimensionTitle, scorePercentage, answersList);
    }
  }

  // توليد تقرير نفسي وأسري شامل بعد اكتمال التقييم بأكمله
  async generateFullPsychologicalReport(userName, overallScore, dimensionsScores, strengths, weaknesses) {
    if (!this.hasKey()) {
      return this.getLocalPsychologicalReport(userName, overallScore, dimensionsScores, strengths, weaknesses);
    }

    try {
      const dimensionsStr = Object.values(dimensionsScores).map(d => `- محور ${d.title}: نسبته ${d.percentage}% (الدرجة: ${d.score} من ${d.maxScore})`).join("\n");
      const strengthsStr = strengths.map((s, i) => `${i+1}. ${s.text} (إجابتها: ${s.answerText})`).join("\n");
      const weaknessesStr = weaknesses.map((w, i) => `${i+1}. ${w.text} (إجابتها: ${w.answerText})`).join("\n");

      const prompt = `أنت كبير مستشاري الإرشاد الأسري والعلاقات الزوجية في مبادرة "خيركم لأهله".
المطلوب هو كتابة تقرير نفسي وإرشادي متميز وفاخر موجه للزوجة التي تدعى "${userName}" والتي أتمت التقييم الشامل لزوجها بمعدل عام يبلغ ${overallScore}%.

تفاصيل نتائج التقييم:
أولاً - درجات المحاور الخمسة:
${dimensionsStr}

ثانياً - نقاط القوة (أعلى 3 نقاط تميز للزوج):
${strengthsStr}

ثالثاً - نقاط تحتاج إلى تحسين (أقل 3 نقاط مشاركة):
${weaknessesStr}

اكتب تقريراً نفسياً شاملاً وتطويرياً فخماً باللغة العربية الفصحى. يجب أن يحتوي التقرير على الأقسام التالية مع تحديد العناوين بشكل واضح (باستخدام Markdown):
1. **الملخص التحليلي الذكي للذكاء الاصطناعي**: تحليل عام لطبيعة العلاقة والتناغم بين الزوجين بناءً على النتائج.
2. **تحليل مواطن التميز والقوة (أعمدة بيت السعادة)**: إضاءة على نقاط القوة الثلاثة، وكيفية استثمارها لزيادة التقارب والمحبة.
3. **فرص التطوير والتنمية (جوانب الترميم والتحسين)**: إرشاد عملي بأسلوب تربوي نفسي للتعامل مع نقاط الضعف الثلاثة المحددة.
4. **خريطة طريق التطور العائلي (Roadmap)**: خطة عمل عملية من 4 خطوات واضحة وقابلة للتطبيق (بما في ذلك تحديات عائلية مقترحة).
5. **خاتمة دافئة ملهمة**: رسالة أمل وتشجيع للزوجة لدورها العظيم في قيادة استقرار الأسرة وبنائها.

تنبيه: اكتب التقرير بلغة راقية جداً وبثقة وهيبة علمية، وتجنب الهجوم على الزوج أو إحباط الزوجة، وركز على فلسفة "خيركم خيركم لأهله".`;

      const response = await this.callGemini(prompt);
      return response || this.getLocalPsychologicalReport(userName, overallScore, dimensionsScores, strengths, weaknesses);
    } catch (e) {
      console.error("Gemini API Error, falling back to local report:", e);
      return this.getLocalPsychologicalReport(userName, overallScore, dimensionsScores, strengths, weaknesses);
    }
  }

  // دالة الاتصال المباشر بـ Gemini API
  async callGemini(prompt) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    
    const requestBody = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  }

  // --- محركات التوليد المحلية (Local Fallbacks) ---

  getLocalQuestionAdvice(questionText, answerText, score) {
    const adviceMap = {
      5: "ما شاء الله! هذا التوافق الكامل يعكس ركيزة متينة من المودة والتقدير في بيتكما العامر، حافظي عليه بالثناء المستمر.",
      4: "مؤشر ممتاز! المشاركة الطيبة في هذا الجانب تسهم في تخفيف الضغوط وصناعة ذكريات سعيدة بشكل مستمر.",
      3: "بداية طيبة؛ المشاركة تحدث أحياناً، والتشجيع الإيجابي والكلمة الطيبة قد يدفعان زوجك للمساهمة بشكل أكبر.",
      2: "هذا الجانب يحتاج إلى لفتة لطيفة؛ جربي التعبير عن حاجتك لمساعدته بشكل صريح وودود دون توجيه لوم.",
      1: "المشاركة غائبة هنا؛ ربما يجهل زوجك مدى أهمية هذا الأمر بالنسبة لك. جربي فتح حوار هادئ في وقت مريح."
    };
    return adviceMap[score] || "المشاركة والتعاون هما أساس بيت السعادة الزوجية.";
  }

  getLocalSectionCoaching(dimensionTitle, scorePercentage, answersList) {
    const lowAnswers = answersList.filter(a => a.score <= 3);
    const highAnswers = answersList.filter(a => a.score > 3);
    
    let advice = `لقد حصلتِ في محور **${dimensionTitle}** على نسبة توافق ${scorePercentage}%. `;
    
    if (scorePercentage >= 80) {
      advice += `تظهر نتائجكِ تماسكاً وتفاهماً رائعاً في هذا المحور. زوجكِ يظهر حرصاً كبيراً ودعماً ملموساً. يُنصح بالحفاظ على هذا العطاء المتبادل بكلمات الشكر اليومية وتأكيد دور الزوج كعمود أساسي في استقرار الأسرة.`;
    } else if (scorePercentage >= 50) {
      advice += `هناك مستوى جيد من التعاون المشترك، لكن المساحة لا زالت مفتوحة لتعزيز التفاهم. `;
      if (lowAnswers.length > 0) {
        advice += `من المفيد مناقشة بعض النقاط تحديداً مثل (${lowAnswers[0].questionText.replace("زوجي", "")}) بروح المودة وتبادل الأدوار.`;
      }
    } else {
      advice += `تشير النسبة إلى وجود تحديات في هذا الجانب تستدعي وقفة تفاهم هادئة. `;
      if (lowAnswers.length > 0) {
        advice += `ننصح بالتركيز أولاً على المهام الأكثر إلحاحاً مثل (${lowAnswers[0].questionText.replace("زوجي", "")}) والتحدث عنها بصراحة وهدوء كشركاء في بناء بيت السعادة.`;
      }
    }
    return advice;
  }

  getLocalPsychologicalReport(userName, overallScore, dimensionsScores, strengths, weaknesses) {
    const strengthsLi = strengths.map(s => `<li><strong>${s.text}</strong>: شكر الزوج والثناء عليه في هذا الجانب يعزز دافعيته للعطاء الدائم.</li>`).join("");
    const weaknessesLi = weaknesses.map(w => `<li><strong>${w.text}</strong>: ابدئي بطلب المساعدة في هذا الشأن بلطف، وبصيغة 'نحن كفريق واحد' بدلاً من اللوم.</li>`).join("");

    return `
# التقرير النفسي والأسري الشامل لمنصة "خيركم"
**الاسم المستعار:** ${userName}
**تاريخ التقرير:** ${new Date().toLocaleDateString('ar-EG')}
**مؤشر السعادة الأسرية الإجمالي:** ${overallScore}%

---

### 1. الملخص التحليلي الذكي للذكاء الاصطناعي
بناءً على التقييم الإجمالي الشامل لنسب المشاركة والتوافق، يظهر بيت السعادة الخاص بكِ بنية متوازنة وتفاهماً طيباً في جوانب عدة. تمثل درجاتكما العامة مؤشراً على استعداد متبادل للتكامل وتطوير جودة الحياة الزوجية. تبرز النتائج أن هناك ركائز ممتازة تمثل الأساس العاطفي والاجتماعي للعلاقة، بينما توجد فرصة حقيقية لتقوية بعض الجوانب العملية واليومية لتحسين جودة الحياة داخل بيت السعادة.

---

### 2. تحليل مواطن التميز والقوة (أعمدة بيت السعادة)
تتميز حياتكما المشتركة بنقاط قوة بارزة تساهم في إرساء دعائم المودة، ومن أبرزها:
<ul>
  ${strengthsLi}
</ul>

---

### 3. فرص التطوير والتنمية (جوانب الترميم والتحسين)
لتكتمل تفاصيل بيت السعادة ويصبح أكثر متانة وجمالاً، يُنصح بالالتفات إلى الجوانب التالية والعمل عليها برفق:
<ul>
  ${weaknessesLi}
</ul>

---

### 4. خريطة طريق التطور العائلي (Roadmap)
<ol>
  <li><strong>الخطوة الأولى (الحوار الإيجابي)</strong>: افتحي حواراً دافئاً مع زوجكِ، واذكري فيه مواطن قوته وتقديرك لها أولاً، ثم اطرحي موضوعاً واحداً من مواطن التطوير للمشاركة فيه.</li>
  <li><strong>الخطوة الثانية (تقاسم المهام اللطيف)</strong>: جربا إعداد قائمة بسيطة وممتعة لتوزيع الأدوار في المهام الأسبوعية بشكل مريح ومقنع للطرفين.</li>
  <li><strong>الخطوة الثالثة (التحديات اليومية)</strong>: التزما بتأدية تحدٍ أسري واحد أسبوعياً من التحديات المقترحة في لوحة التحكم (مثل طهي وجبة معاً أو تخصيص 20 دقيقة للحديث الدافئ).</li>
  <li><strong>الخطوة الرابعة (إعادة التقييم الدوري)</strong>: كرري هذا التقييم بعد 30 يوماً لمراقبة التقدم وملاحظة نمو "منزل السعادة" الخاص بكما.</li>
</ol>

---

### 5. خاتمة دافئة ملهمة
تذكري دائماً أيتها الشريكة المباركة أن البيت السعيد لا يُبنى في يوم وليلة، بل هو مسيرة من المودة والرحمة والصبر. دوركِ في التوجيه والتقدير والاحتواء هو المحرك الأساسي الذي يقود هذه الأسرة لتكون نموذجاً لحديث المصطفى ﷺ: *"خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ"*. دمتِ بانية ومحبة وملهمة لأسرتكِ.
`;
  }
}

export const aiEngine = new AIEngine();
