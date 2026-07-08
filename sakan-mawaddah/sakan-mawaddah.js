/* ========================================================
   Sakan & Mawaddah (سكن ومودة) - Game Logic & Database
   120 Unique Arabic Spouse Relationship Questions
   ======================================================== */

const CARD_DECK = [
  // ------------------------------------------------------
  // 💚 Sakan (سكن القلوب) - 24 Questions (1-24)
  // ------------------------------------------------------
  {
    id: 1,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هو التصرف اليومي البسيط الذي أفعله ويشعرك بالأمان والسكينة داخل المنزل؟",
    meta: "السكينة اليومية"
  },
  {
    id: 2,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "متى تشعر أن المنزل تحول من مجرد جدران إلى 'سكن عاطفي دافئ' بكل ما تحمله الكلمة؟",
    meta: "دفء المنزل"
  },
  {
    id: 3,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هي الكلمة أو العبارة التي أقولها لك وتخفف عنك فوراً ضغوط العمل وأعباء اليوم؟",
    meta: "بلسم الكلمات"
  },
  {
    id: 4,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "كيف يمكنني أن أساعدك في توفير مساحة خاصة وهادئة للاسترخاء عندما تكون متعباً؟",
    meta: "المساحة الخاصة"
  },
  {
    id: 5,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هو الركن المفضل لديك في بيتنا، ولماذا يشعرك بالراحة أكثر من غيره؟",
    meta: "الركن المفضل"
  },
  {
    id: 6,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "عندما تغيب عن البيت لعدة أيام، ما هو أكثر شيء تفتقده في وجودي وفي أرجاء بيتنا؟",
    meta: "قيمة الغياب"
  },
  {
    id: 7,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هي العادة اليومية المشتركة التي نقوم بها معاً وتعتبرها ركيزة أساسية لسكينة يومنا؟",
    meta: "الطقوس اليومية"
  },
  {
    id: 8,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "كيف أثر وجودي بجانبك في الفترات الصعبة على شعورك بالأمان والاستقرار النفسي؟",
    meta: "السند النفسي"
  },
  {
    id: 9,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هو الشيء الذي تصنعه يداي وتعتبره تعبيراً صامتاً وحقيقياً عن المحبة والاهتمام؟",
    meta: "العطاء الصامت"
  },
  {
    id: 10,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "كيف يمكننا تحسين أجواء المنزل ليلاً لنجعله مكاناً أكثر هدوءاً وانسجاماً للحديث؟",
    meta: "هدوء المساء"
  },
  {
    id: 11,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هي الذكرى الأولى التي جعلتك متأكداً بأننا سنكون لبعضنا سكناً ومستقراً مريحاً؟",
    meta: "اليقين الأول"
  },
  {
    id: 12,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "كيف يمكنني أن أظهر لك الاحترام والتقدير أمام الآخرين بطريقة تسعد قلبك وتريحك؟",
    meta: "التقدير المتبادل"
  },
  {
    id: 13,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هو التصرف الذي أفعله عفوياً وتعتبره دليلاً على فهمي العميق لتقلبات مزاجك؟",
    meta: "الفهم العفوي"
  },
  {
    id: 14,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "كيف تصف مشاعرك عندما تستيقظ صباحاً وتجدني بجانبك مبتسماً ومستعداً ليوم جديد؟",
    meta: "بداية اليوم"
  },
  {
    id: 15,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هو الحلم البسيط الذي يخص تفاصيل بيتنا وتتمنى أن نحققه معاً هذا العام؟",
    meta: "أحلام المنزل"
  },
  {
    id: 16,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "في أوقات مرضي أو تعبي، ما هو التصرف الحاني منك الذي يشعرني بالرعاية والأمان الكامل؟",
    meta: "رعاية القلوب"
  },
  {
    id: 17,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هي الأكلة أو الوجبة التي نعدها معاً في المطبخ وتعتبرها متعة وجلسة ودية؟",
    meta: "ساعة المطبخ"
  },
  {
    id: 18,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "كيف تصف طريقة استقبالي لك عند عودتك للمنزل بعد غياب يوم طويل وشاق؟",
    meta: "لهفة اللقاء"
  },
  {
    id: 19,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هو الشيء المادي أو الديكور المعين الذي أضفته لبيتنا وتراه جميلاً ويعبر عن ذوقنا المشترك؟",
    meta: "لمسات عذبة"
  },
  {
    id: 20,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "متى كانت آخر مرة شعرت فيها أننا تخلصنا تماماً من القلق وتحدثنا بصفاء روحي مطلق؟",
    meta: "الصفاء الروحي"
  },
  {
    id: 21,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هي العبارة التي ترددها في دعائك دائماً وتخص بها استقرار ودفء بيتنا وزواجنا؟",
    meta: "دعاء السكينة"
  },
  {
    id: 22,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "كيف تصف شعور الطمأنينة الذي يغمرك عندما نجلس صامتين متأملين معاً دون كلام؟",
    meta: "الصمت الدافئ"
  },
  {
    id: 23,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "ما هي الهواية أو الاهتمام الخاص بي الذي تسعد بمتابعتي له وتدعمني فيه بحب؟",
    meta: "دعم الشغف"
  },
  {
    id: 24,
    category: "sakan",
    categoryAr: "سكن القلوب",
    icon: "💚",
    question: "إذا أردت تلخيص مفهوم زواجنا في كلمة واحدة تعبر عن الراحة والاستقرار، فما هي؟",
    meta: "خلاصة الألفة"
  },

  // ------------------------------------------------------
  // 💬 Meethaq (ميثاق الكلمة) - 24 Questions (25-48)
  // ------------------------------------------------------
  {
    id: 25,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هي طريقتك المفضلة للنقاش عندما نختلف في وجهات النظر حول أمر معين؟",
    meta: "آداب الحوار"
  },
  {
    id: 26,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف تشعر عندما استمع إليك دون أن أقاطعك أو أحاول تقديم حلول فورية؟",
    meta: "الإنصات الواعي"
  },
  {
    id: 27,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هي الكلمة التي تعتبرها مفتاحاً سحرياً لإنهاء الخلافات بيننا والبدء من جديد؟",
    meta: "مفتاح التراضي"
  },
  {
    id: 28,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف تفضل أن أعبر لك عن عتابي أو حزني من تصرف ما دون مضايقتك؟",
    meta: "العتاب الرقيق"
  },
  {
    id: 29,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هو الموضوع الحواري المشترك الذي تحب أن نفتحه ونتحدث فيه بالساعات دون ملل؟",
    meta: "أحاديث لا تنتهي"
  },
  {
    id: 30,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "هل تشعر أننا نتحدث بصراحة كافية عن تفاصيل مخاوفنا وتطلعاتنا الشخصية؟",
    meta: "الوضوح التام"
  },
  {
    id: 31,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هي نبرة الصوت أو الأسلوب الذي يجعلك مستعداً تماماً لتقبل أي رأي مغاير مني؟",
    meta: "نبرة التفاهم"
  },
  {
    id: 32,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف يمكننا ممارسة الحوار اليومي الهادئ بعيداً عن صخب الهواتف والشاشات؟",
    meta: "أوقات بلا اتصال"
  },
  {
    id: 33,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هو اللقب المحبب لقلبك وتفضّل أن أناديك به في حواراتنا اليومية؟",
    meta: "ألقاب المحبة"
  },
  {
    id: 34,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هو المديح اللفظي الأجمل الذي وجهته لك مؤخراً وترك أثراً طيباً في داخلك؟",
    meta: "أثر الثناء"
  },
  {
    id: 35,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف يمكنني التعبير لك عن امتناتي لوجودك بطريقة لفظية تلمس شغاف قلبك؟",
    meta: "عبارات الشكر"
  },
  {
    id: 36,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "عندما أعتذر لك بكلمة صادقة، كيف يؤثر ذلك على مشاعرك وتصفية خاطرك؟",
    meta: "قوة الاعتذار"
  },
  {
    id: 37,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هي الكلمة التشجيعية التي تحتاج سماعها مني في فترات ضغط العمل أو الدراسة؟",
    meta: "شحذ الهمم"
  },
  {
    id: 38,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف تصف التفاهم الحواري بيننا مقارنة بالسنة الأولى من ارتباطنا؟",
    meta: "التطور الحواري"
  },
  {
    id: 39,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هي الرسالة المكتوبة التي أرسلتها لك وحفظتها في هاتفك أو مفكرتك لمحبتك لها؟",
    meta: "رسائل محفوظة"
  },
  {
    id: 40,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هو الشيء الصعب الذي نجد صعوبة في نقاشه، وكيف يمكننا جعله موضوعاً سهلاً ومريحاً؟",
    meta: "المواضيع الحساسة"
  },
  {
    id: 41,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف يمكن للكلمة الطيبة والابتسامة الهادئة أن تحسم أي خلاف ناشئ بيننا في بدايته؟",
    meta: "سحر التبسم"
  },
  {
    id: 42,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هي أفضل فكرة حوارية قمنا بها لقضاء جلسة تقييم ومراجعة لعلاقتنا بانتظام؟",
    meta: "ساعة الصراحة"
  },
  {
    id: 43,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف تؤثر نبرة صوتي على مستوى شعورك بالطمأنينة أثناء الحديث في تفاصيل حياتنا؟",
    meta: "النبرة المطمئنة"
  },
  {
    id: 44,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هي الكلمة التي لا تود سماعها إطلاقاً أثناء النقاش أو العتاب لكونها تؤذي مشاعرك؟",
    meta: "حدود الحوار"
  },
  {
    id: 45,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف تصف الدعم المعنوي واللفظي الذي أقدمه لك عندما تشكك في قدرتك على إنجاز شيء ما؟",
    meta: "الإيمان المشترك"
  },
  {
    id: 46,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "ما هو الشيء الذي أخبرتك به سراً وتعتبره دليلاً على ثقتي اللامتناهية في حفظك لعهدي؟",
    meta: "ميثاق الأسرار"
  },
  {
    id: 47,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "كيف يمكنني تحسين استماعي لك لجعلك تشعر بأن كلماتك واهتماماتك تقع في صدارة أولوياتي؟",
    meta: "أولوية الاستماع"
  },
  {
    id: 48,
    category: "meethaq",
    categoryAr: "ميثاق الكلمة",
    icon: "💬",
    question: "إذا كتبت رسالة حب قصيرة لقلبي الآن، فما هي الكلمة الأساسية التي ستبدأ بها؟",
    meta: "الرسالة العاجلة"
  },

  // ------------------------------------------------------
  // 🌱 Shajarah (شجرة المودة) - 24 Questions (49-72)
  // ------------------------------------------------------
  {
    id: 49,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هي القيمة الأسرية الأساسية التي ترى أننا نجحنا في غرسها في منزلنا الصغير؟",
    meta: "القيم الأسرية"
  },
  {
    id: 50,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف ترى نمو وتطور علاقتنا وتضامننا المشترك منذ بداية زواجنا وحتى اليوم؟",
    meta: "مسيرة النمو"
  },
  {
    id: 51,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو الهدف المستقبلي الأهم الذي تسعى لتحقيقه معي كزوج وشريك حياة؟",
    meta: "الأهداف المشتركة"
  },
  {
    id: 52,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف تؤثر تربيتنا المشتركة لأبنائنا (أو تفكيرنا فيهم) على عمق الروابط العاطفية بيننا؟",
    meta: "إرث التربية"
  },
  {
    id: 53,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو النشاط أو المشروع التطوعي أو الخيري الذي تتمنى أن نساهم فيه سوياً مستقبلاً؟",
    meta: "العطاء المشترك"
  },
  {
    id: 54,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف يمكننا حماية استقرارنا الأسري والمحافظة على خصوصية بيتنا بعيداً عن تدخلات الآخرين؟",
    meta: "حدود المنزل"
  },
  {
    id: 55,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هي العادة الصحية أو المالية الجديدة التي تتمنى أن نتبناها معاً لضمان نمو بيتنا؟",
    meta: "العادات المستدامة"
  },
  {
    id: 56,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "أين ترى مكان عيشنا ووتيرة حياتنا اليومية بعد مرور خمسة عشر عاماً من الآن؟",
    meta: "رؤية مستقبلية"
  },
  {
    id: 57,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو الدرس التربوي أو الأسري الأهم الذي تعلمناه من عائلاتنا ونود نقله لأولادنا؟",
    meta: "توارث القيم"
  },
  {
    id: 58,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف يمكنني أن أكون سنداً أفضل لك في رحلتك المهنية أو الشخصية للوصول لطموحاتك؟",
    meta: "الدعم المتبادل"
  },
  {
    id: 59,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو السفر أو المغامرة المشتركة التي خططنا لها ونجحنا فيها وتعتبرها علامة مميزة لنمونا؟",
    meta: "علامات الطريق"
  },
  {
    id: 60,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف نوازن بين مسؤولياتنا الكثيرة تجاه العمل والأولاد والوقت الخاص بنا كزوجين؟",
    meta: "توازن الوقت"
  },
  {
    id: 61,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو الأثر الأخلاقي الطيب الذي ترغب في أن يذكره جيراننا وأصدقاؤنا عن عائلتنا؟",
    meta: "الأثر والسمعة"
  },
  {
    id: 62,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف نضمن استمرارية الحوار والمرح والابتسامة في بيتنا مهما عظمت ضغوط الحياة ومشاغلها؟",
    meta: "حيوية الأسرة"
  },
  {
    id: 63,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو التحسين الجمالي أو التعديل الذي تتمنى إدخاله على أثاث أو ترتيب منزلنا قريباً؟",
    meta: "جماليات المنزل"
  },
  {
    id: 64,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هي المهارة الحياتية الجديدة التي تعتقد أننا بحاجة لتعلمها معاً لإدارة شؤون منزلنا بكفاءة؟",
    meta: "مهارات مشتركة"
  },
  {
    id: 65,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف ترى طريقة تعاملنا مع الأزمات الطارئة (سواء صحية أو مالية) ومدى تماسكنا فيها؟",
    meta: "التماسك في الشدائد"
  },
  {
    id: 66,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو الجانب الديني أو العبادي الذي تسعد بممارسته معي (كصلاة الليل أو قراءة القرآن)؟",
    meta: "الواحة الروحية"
  },
  {
    id: 67,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "أين تفضل قضاء عطلة نهاية الأسبوع لنجدد فيها نشاطنا ونعزز طاقة الألفة في بيتنا؟",
    meta: "تجديد النشاط"
  },
  {
    id: 68,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هي العادات الاجتماعية التي ترى أننا نبالغ فيها ويجب تقنينها لحماية خصوصية أسرتنا؟",
    meta: "الخصوصية والعلاقات"
  },
  {
    id: 69,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف نستطيع حماية وقت مقدس يومي أو أسبوعي مخصص للحوار الهادئ دون مقاطعة من الأطفال؟",
    meta: "الوقت المقدس"
  },
  {
    id: 70,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "ما هو الإنجاز المالي الصغير الذي خططنا له سوياً ونجحنا فيه مؤخراً وتعتز به؟",
    meta: "إنجاز مالي"
  },
  {
    id: 71,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "كيف تصف النصيحة الأسرية الأجمل التي تلقيناها من شخص حكيم وأثرت إيجاباً على بيتنا؟",
    meta: "حكمة الآخرين"
  },
  {
    id: 72,
    category: "shajarah",
    categoryAr: "شجرة المودة",
    icon: "🌱",
    question: "لو أردنا زرع شجرة في فناء بيتنا ترمز لنمو حبنا، فماذا تقترح أن يكون نوعها؟",
    meta: "رمز المودة"
  },

  // ------------------------------------------------------
  // 🤝 Jisr (جسر التسامح) - 24 Questions (73-96)
  // ------------------------------------------------------
  {
    id: 73,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هو الموقف الذي اختلفت فيه معك وشعرت بأنني تفهمت وجهة نظرك وتسامحت بحب؟",
    meta: "تفهم الاختلاف"
  },
  {
    id: 74,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف تبدو مشاعرك عندما أقدم لك اعتذاراً نابعاً من قلبي ومصحوباً بابتسامة حانية؟",
    meta: "أثر التراضي"
  },
  {
    id: 75,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هو الشيء الصغير الذي كنت أفعله ويضايقك وتسامحت فيه تماماً اليوم لكونك تتفهم طبعي؟",
    meta: "التجاوز عن الصغائر"
  },
  {
    id: 76,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف يساعدنا الغفران المتبادل لزلات اللسان على استعادة الأمان العاطفي بسرعة فائقة؟",
    meta: "استعادة الأمان"
  },
  {
    id: 77,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هي الطريقة الأجمل لقول 'أنا آسف' وتعتبرها مريحة ومقنعة لقلبك؟",
    meta: "طرق الاعتذار"
  },
  {
    id: 78,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "هل تشعر بأن قلبي يحمل أي رواسب من خلافات قديمة، أم أننا نطوي الصفحات بحب حقيقي؟",
    meta: "نقاء القلوب"
  },
  {
    id: 79,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف يمكنني التعبير لك عن أسفي دون كبرياء عندما أدرك أنني أخطأت في حقك؟",
    meta: "التواضع الزوجي"
  },
  {
    id: 80,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هو الخلاف القديم الذي تحول اليوم إلى طرفة نضحك عليها معاً لتجاوزنا له بمرونة؟",
    meta: "خلافات مضحكة"
  },
  {
    id: 81,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف تصف رغبتنا الدائمة في إنهاء أي خصام وتصفية القلوب قبل النوم وتحت سقف واحد؟",
    meta: "قبل المنام"
  },
  {
    id: 82,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هي العادة اليومية البسيطة التي أتحملها منك بصدر رحب وتعتبرها دليلاً على صبري الجميل؟",
    meta: "الصبر الجميل"
  },
  {
    id: 83,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف نبني معاً جسراً متيناً من التسامح يعبر بنا أي عاصفة أو تحدٍ عائلي مستقبلي؟",
    meta: "ميثاق التماسك"
  },
  {
    id: 84,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هو الاعتراف بالتقصير الذي تود سماعه مني اليوم لتشعر بالراحة وتقدير تضحياتك؟",
    meta: "تقدير التضحيات"
  },
  {
    id: 85,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف نضمن عدم تراكم سوء الفهم الصغير وتحوله لفتور عاطفي بمرور الأيام والمشاغل؟",
    meta: "تصفية أولى بأول"
  },
  {
    id: 86,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هو السلوك الحاني الذي يمحو أي غضب في داخلك تجاهي فوراً ودون حاجة لنقاش طويل؟",
    meta: "محو الغضب"
  },
  {
    id: 87,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف ساعدنا تسامحنا المتبادل مع طباع بعضنا البعض على الشعور بالراحة التامة والاستقرار؟",
    meta: "الراحة النفسية"
  },
  {
    id: 88,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هو الدرس الأكبر الذي تعلمته عن العفو والرحمة في علاقتنا الزوجية؟",
    meta: "دروس التسامح"
  },
  {
    id: 89,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف يمكنني دعمك عاطفياً ومساعدتك على التخفيف من لوم الذات عندما تخطئ في أمر ما؟",
    meta: "دعم الشريك المقصر"
  },
  {
    id: 90,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هي العبارة التي تعبر عن التسامح والصفح وتريح قلبك دائماً وتفتح باب الرضا؟",
    meta: "فتح أبواب الرضا"
  },
  {
    id: 91,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "متى كانت آخر مرة تعاملنا فيها بمرونة استثنائية مع موقف محرج ومررناه بسلام وود؟",
    meta: "المرونة والود"
  },
  {
    id: 92,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف يمكن للذكريات الجميلة والمحبة المشتركة أن تكون شفيعاً لنا لتجاوز اللحظات الصعبة؟",
    meta: "شفاعة الذكريات"
  },
  {
    id: 93,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هي اللفتة البسيطة التي أقدمها لك وتعبر عن نيتي الطيبة في إرضاء خاطرك وتصفية الأجواء؟",
    meta: "النية الطيبة"
  },
  {
    id: 94,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "كيف تصف نضج علاقتنا وقدرتنا على إدارة الخلافات اليوم بذكاء عاطفي ودون تشنج؟",
    meta: "النضج العاطفي"
  },
  {
    id: 95,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "ما هو الشيء الذي تسامحني فيه مراراً وتكراراً وتراه تعبيراً عملياً عن عظيم حبك لي؟",
    meta: "الغفران المتكرر"
  },
  {
    id: 96,
    category: "jisr",
    categoryAr: "جسر التسامح",
    icon: "🤝",
    question: "إذا أردت كتابة عهد متجدد على التسامح والغفران المتبادل، فبأي الكلمات ستصيغه؟",
    meta: "ميثاق التسامح"
  },

  // ------------------------------------------------------
  // ✨ Sahrah (سهرتنا) - 24 Questions (97-120)
  // ------------------------------------------------------
  {
    id: 97,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "انظر في عيني شريك حياتك بصمت تام وابتسامة دافئة لمدة ٣٠ ثانية كاملة دون حراك.",
    meta: "تحدي لغة العيون صامتاً"
  },
  {
    id: 98,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اذكر صفتين تتميز بهما شخصية شريكك وتمتن لوجودهما في حياتك اليومية الآن.",
    meta: "تحدي الامتنان اللفظي"
  },
  {
    id: 99,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "قم بتقليد حركة لطيفة أو لازمة كلامية طريفة يكررها الشريك دائماً بالمنزل بشكل فكاهي.",
    meta: "تحدي المحاكاة الطريفة"
  },
  {
    id: 100,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "امسك يد الشريك بقوة وأخبره بعبارة صادقة تعبر عن محبتك وامتنانك لوجوده في حياتك.",
    meta: "تحدي تأكيد المحبة"
  },
  {
    id: 101,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "قم بإعداد كوب من المشروب المفضل للشريك وقدمه له مع لمسة لطيفة وقبلة على رأسه الآن.",
    meta: "تحدي الضيافة الدافئة"
  },
  {
    id: 102,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "احضن شريكك عناقاً متواصلاً وصامتاً لمدة ١٠ ثوانٍ كاملة للمساعدة في التخلص من إرهاق اليوم.",
    meta: "تحدي عناق السكينة"
  },
  {
    id: 103,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اقرأ كف يد الشريك بطريقة طريفة متخيلاً رحلة سياحية أو مفاجأة سارة تنتظره قريباً.",
    meta: "تحدي التخيل اللطيف"
  },
  {
    id: 104,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اذكر وجبة طعام أعدها الشريك سابقاً ونالت إعجابك الشديد وعبر عن شوقك لتناولها مجدداً.",
    meta: "مديح مائدة المحبة"
  },
  {
    id: 105,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "قم بوصف تفاصيل اللقاء الأول بينكما وكيف بدت تصرفات شريكك وملامحه بأسلوب فكاهي وتمثيلي.",
    meta: "تحدي استحضار البدايات"
  },
  {
    id: 106,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اكتب رسالة شكر قصيرة جداً من سطرين على هاتفك وأرسلها للشريك الجالس أمامك الآن.",
    meta: "تحدي الرسالة الرقمية"
  },
  {
    id: 107,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اذكر أمراً واحداً يعجبك في طريقة تعامل الشريك مع عائلتك أو عائلته وتثني عليه.",
    meta: "تحدي المديح العائلي"
  },
  {
    id: 108,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "وجه نصيحة حانية وصادقة للشريك لحماية راحته البدنية وصحته النفسية في الفترات القادمة.",
    meta: "تحدي النصيحة الحانية"
  },
  {
    id: 109,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "امسح على رأس الشريك وادعُ له بدعاء صادق نابع من قلبك بصوت مسموع ودافئ.",
    meta: "تحدي الدعاء المسموع"
  },
  {
    id: 110,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "حدد موعداً مقدساً لنا هذا الأسبوع (خروج أو سهرة منزلية) والتزم بحمايته من أي مشاغل طارئة.",
    meta: "تحدي الموعد المقدس"
  },
  {
    id: 111,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "قم بإلقاء بيت شعر أو مقطع أدبي لطيف يعبر عن مشاعرك الحالية تجاه الشريك بأسلوب معبر.",
    meta: "تحدي الإلقاء الشاعري"
  },
  {
    id: 112,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "امسك يدي الشريك بقوة وأخبره بابتسامة: 'أنا ممتن جداً للقدر الذي جمعني بك كشريك لحياتي'.",
    meta: "تحدي الوفاء والامتنان"
  },
  {
    id: 113,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "قم بعمل مساج خفيف لكف الشريك أو كتفه لمدة دقيقتين متواصلتين لتخفيف عناء وضغوط اليوم.",
    meta: "تحدي المساج السريع"
  },
  {
    id: 114,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "البوح بحدث أو رغبة طريفة صغيرة لم تخبر بها الشريك سابقاً وتود مشاركتها معه الآن.",
    meta: "تحدي البوح اللطيف"
  },
  {
    id: 115,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اعترف بتقصير صغير غير مقصود واعتذر للشريك بابتسامة وطلب العفو والرضا التام.",
    meta: "تحدي الاعتراف والاعتذار"
  },
  {
    id: 116,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اكتب كلمة سرية أو رمزاً محبباً على ورقة صغيرة وضعها في محفظة أو حقيبة الشريك سراً.",
    meta: "تحدي الرسائل السرية"
  },
  {
    id: 117,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "تبادل الأدوار عفوياً؛ ليقم كل منكما بمحاكاة رد فعل الآخر في موقف يومي متكرر بالمنزل.",
    meta: "تحدي تبادل الشخصيات"
  },
  {
    id: 118,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "اذكر عادة حسنة واحدة اكتسبتها بفضل زواجك من الشريك وتعتقد أنها أثرت إيجاباً على شخصيتك.",
    meta: "تحدي الأثر الطيب"
  },
  {
    id: 119,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "قم بوضع خطة تفصيلية ومفاجئة لسهرة الغد، ليكون الشريك ضيفاً معززاً من ترتيبك الكامل.",
    meta: "تحدي السهرة المفاجئة"
  },
  {
    id: 120,
    category: "sahrah",
    categoryAr: "سهرتنا",
    icon: "✨",
    question: "صافح الشريك مصافحة تقدير وعهد على استمرار السكينة والمودة المتبادلة طوال العمر.",
    meta: "تحدي ميثاق الود النهائي"
  }
];

// ========================================================
// BOOKLET PAGES DATABASE
// ========================================================
const BOOKLET_PAGES = [
  {
    title: "مرحباً بكم في سكن ومودة",
    content: `
      <p>لعبة <strong>"سكن ومودة"</strong> هي أداة حوارية وتفاعلية راقية صُممت بعناية لتكون جسراً يعبر بالزوجين نحو مستويات أعمق من التفاهم والانسجام الأسري.</p>
      <p>مستوحاة من الآية الكريمة <em>"ومن آياته أن خلق لكم من أنفسكم أزواجاً لتسكنوا إليها وجعل بينكم مودة ورحمة"</em>، تأتيكم هذه اللعبة بإنتاج مشترك من منصّة <strong>"خيركم" (خيركم لأهله)</strong>.</p>
      <p>تنقسم كروت اللعب إلى 5 فئات أساسية ومميزة:</p>
      <ul>
        <li><strong>💚 سكن القلوب (رملي أخضر)</strong>: أسئلة لتعزيز الطمأنينة والأمان النفسي داخل المنزل.</li>
        <li><strong>💬 ميثاق الكلمة (سماوي مائي)</strong>: لفهم أساليب الحوار والتواصل اللفظي الفعّال.</li>
        <li><strong>🌱 شجرة المودة (ذهبي زيتوني)</strong>: لرسم الرؤية المستقبلية والاتفاق على القيم التربوية.</li>
        <li><strong>🤝 جسر التسامح (خزامى ملكي)</strong>: لتطوير مهارات العفو، الاعتذار، وتجاوز العقبات.</li>
        <li><strong>✨ سهرتنا (وردي توتي)</strong>: أنشطة ومهام عملية تفاعلية فورية لإشعال روح المرح والألفة.</li>
      </ul>
    `
  },
  {
    title: "طريقة الإعداد واللعب",
    content: `
      <p><strong>تهيئة الجلسة:</strong></p>
      <ol>
        <li>قم بفرز كروت كل فئة وخلطها، ثم وضع المجموعات الخمس في منتصف مكان الجلسة.</li>
        <li>أوجدوا بيئة هادئة ومريحة، بعيدة عن الهواتف الذكية أو المشتتات البصرية (شمعة دافئة، مشروب مفضل).</li>
        <li>أحضروا كراسة رصد النتائج الرقمية المتاحة في الواجهة لمتابعة مستويات الانسجام.</li>
      </ol>
      <p><strong>خطوات اللعب الحواري:</strong></p>
      <ul>
        <li>يسحب الطرف الأول كرتاً من المجموعات الحوارية ويقرأ السؤال بصوت واضح ومحبب لشريكه.</li>
        <li>يجيب الشريك بصدق وعمق وشفافية مطلقة.</li>
        <li>يحصل الزوجان على نقاط توافق بناءً على صدق وتطابق الإجابة وتفهم مشاعر الطرف الآخر.</li>
        <li>في كروت <strong>"سهرتنا"</strong>، يقوم الزوجان بأداء التحدي العملي معاً فوراً للحصول على نقاط التحدي الفورية.</li>
      </ul>
    `
  },
  {
    title: "رصد النقاط وقواعد التوافق",
    content: `
      <p>تعتمد لعبة "سكن ومودة" على مفهوم **الرصيد المشترك للانسجام الزوجي**، حيث تسجل النقاط كالتالي:</p>
      <ul>
        <li><strong>الفئات الحوارية (سكن القلوب، ميثاق الكلمة)</strong>: الإجابة النموذجية الملامسة لقلب الشريك = <strong>5 نقاط</strong>.</li>
        <li><strong>الفئات التخطيطية والذكاء العاطفي (شجرة المودة، جسر التسامح)</strong>: الاتفاق وتكامل الرؤى = <strong>10 نقاط</strong>.</li>
        <li><strong>التحديات العفوية والتفاعلية (سهرتنا)</strong>: إنجاز المهمة المشتركة ببهجة ومرح = <strong>15 نقطة</strong>.</li>
      </ul>
      <p>استخدموا حاسبة التوافق الرقمية لحساب النسبة المئوية لانسجام جلستكم الحالية واستكشاف المجالات التي تحتاج لمزيد من التقارب وصب الاهتمام العاطفي فيها.</p>
    `
  },
  {
    title: "وصايا لجلسة استثنائية",
    content: `
      <p>لتحقيق أقصى درجات الفائدة والأثر الطيب من جلستكم، ننصح بالآتي:</p>
      <ul>
        <li><strong>المساحة الآمنة</strong>: اللعبة وُجدت للبناء والتقارب، فلا تجعلوها مكاناً للعتاب أو فتح ملفات الخلافات السابقة بطريقة سلبية.</li>
        <li><strong>الإنصات المفعم بالحب</strong>: استمع لشريك حياتك بكامل حواسك، وتفهم دوافع مشاعره واحتياجاته العاطفية بصدق.</li>
        <li><strong>المرونة والتفاعل</strong>: شاركوا في التحديات والأنشطة بروح طفولية مرحة لتذويب أي فتور أو روتين.</li>
        <li><strong>الاستمرارية</strong>: نوصي بتخصيص جلسة حوارية مخصصة للعبة مرة كل شهر لتتبع تطور مفاهيم التفاهم والسكينة بينكما.</li>
      </ul>
      <p>تمنياتنا لكم بسهرة دافئة مليئة بالسكن والمودة والرحمة الدائمة.</p>
    `
  }
];

// ========================================================
// INTERACTIVE LOGIC & APPLICATION INITIALIZATION
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCardDeck(CARD_DECK);
  setupFilters();
  setupSearch();
  setupBooklet(0);
  setupScoreCalculator();
  setupAnimations();
});

// Render cards dynamically
function renderCardDeck(cards) {
  const grid = document.getElementById("cards-grid");
  if (!grid) return;
  grid.innerHTML = "";

  cards.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "card-container";
    cardEl.setAttribute("data-id", card.id);
    cardEl.setAttribute("data-category", card.category);

    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-front cat-${card.category}">
          <div class="card-header">
            <span class="card-category-label">${card.icon} ${card.categoryAr}</span>
            <span class="card-number">#${String(card.id).padStart(3, '0')}</span>
          </div>
          <div class="card-body">
            <h3 class="card-question">${card.question}</h3>
          </div>
          <div class="card-footer">
            <span>${card.meta}</span>
            <div class="card-footer-logo">
              <img src="logo.png" alt="شعار خيركم" onerror="this.style.display='none'">
            </div>
          </div>
        </div>
        <div class="card-back">
          <div class="card-back-pattern">
            <div class="luxury-ornament orn-top-right"></div>
            <div class="luxury-ornament orn-top-left"></div>
            <div class="luxury-ornament orn-bottom-right"></div>
            <div class="luxury-ornament orn-bottom-left"></div>
            <h2 class="card-back-logo">سكن ومودة</h2>
            <span class="card-back-subtitle">لعبة التفهم والانسجام الأسري</span>
          </div>
        </div>
      </div>
    `;

    // Click to flip card
    cardEl.addEventListener("click", () => {
      cardEl.classList.toggle("flipped");
    });

    grid.appendChild(cardEl);
  });
}

// Setup category filters
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      filterCards(category, document.getElementById("card-search").value);
    });
  });
}

// Setup search bar
function setupSearch() {
  const searchInput = document.getElementById("card-search");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const activeFilter = document.querySelector(".filter-btn.active");
    const category = activeFilter ? activeFilter.getAttribute("data-category") : "all";
    filterCards(category, e.target.value);
  });
}

// Filter cards combined logic
function filterCards(category, query) {
  const cards = document.querySelectorAll(".card-container");
  let matchesCount = 0;

  cards.forEach(card => {
    const catMatch = (category === "all" || card.getAttribute("data-category") === category);
    const qMatch = !query || card.querySelector(".card-question").textContent.includes(query);

    if (catMatch && qMatch) {
      card.style.display = "block";
      matchesCount++;
    } else {
      card.style.display = "none";
    }
  });

  console.log(`Cards Filtered: category=${category}, query=${query}, matches=${matchesCount}`);
}

// Booklet Logic
let currentBookletPage = 0;
function setupBooklet(pageIndex) {
  const viewer = document.getElementById("booklet-viewer");
  if (!viewer) return;

  const page = BOOKLET_PAGES[pageIndex];
  const titleEl = viewer.querySelector(".booklet-title");
  const bodyEl = viewer.querySelector(".booklet-body");
  const footerPageNum = viewer.querySelector(".booklet-page-num");

  titleEl.innerHTML = page.title;
  bodyEl.innerHTML = page.content;
  footerPageNum.textContent = `صفحة ${pageIndex + 1} من ${BOOKLET_PAGES.length}`;

  // Update navigation buttons
  const navBtns = document.querySelectorAll(".booklet-nav-btn");
  navBtns.forEach((btn, idx) => {
    btn.classList.toggle("active", idx === pageIndex);
  });

  currentBookletPage = pageIndex;
}

// Digital Score Calculator Logic
function setupScoreCalculator() {
  const calcInputs = document.querySelectorAll(".score-input");
  const progressCircle = document.getElementById("score-progress");
  const percentText = document.getElementById("score-percent");
  const messageText = document.getElementById("score-message");

  if (!calcInputs.length || !progressCircle) return;

  const calculateCompatibility = () => {
    let totalScore = 0;
    let maxPossibleScore = 0;

    calcInputs.forEach(input => {
      const val = parseInt(input.value) || 0;
      const weight = parseInt(input.dataset.weight) || 5;
      totalScore += val * weight;
      maxPossibleScore += 5 * weight; // Assume 5 is maximum grade per category input
    });

    const percentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;
    
    // Update SVG progress circle
    const r = 70; // radius of SVG circle
    const circumference = 2 * Math.PI * r;
    const offset = circumference - (percentage / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    
    percentText.textContent = `${percentage}%`;

    // Messages
    let message = "";
    if (percentage >= 85) {
      message = "امتياز! توافق أسري باهر وسكينة حقيقية تغمر أرجاء بيتكما وتنسج خيوط المودة والرحمة بأجمل صورة.";
    } else if (percentage >= 65) {
      message = "جيد جداً! تفاهم طيب وانسجام أسري متين. هناك ركائز ممتازة لتعميق الحوار وبناء مزيد من مساحات التقارب.";
    } else if (percentage >= 45) {
      message = "مقبول! يحتاج بيتكما لمزيد من الاهتمام اللفظي وقنوات التعبير العاطفي وتصفية أي تراكمات أولاً بأول.";
    } else {
      message = "رصيد منخفض! ننصح بالعودة لدليل الوصايا والبدء فوراً بإنشاء أوقات مقدسة يومية لتغذية السكن والمحبة.";
    }
    messageText.textContent = message;
  };

  calcInputs.forEach(input => {
    input.addEventListener("input", () => {
      // Limit values between 0 and 5
      let val = parseInt(input.value);
      if (val > 5) input.value = 5;
      if (val < 0) input.value = 0;
      calculateCompatibility();
    });
  });

  // Init calculation
  calculateCompatibility();
}

// Interactivity / Animations helpers
function setupAnimations() {
  const elements = document.querySelectorAll(".glass-panel");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(el);
  });
}

// Print Deck trigger
function printDeck() {
  window.print();
}

// Booklet page trigger
function navigateBooklet(direction) {
  let next = currentBookletPage + direction;
  if (next >= 0 && next < BOOKLET_PAGES.length) {
    setupBooklet(next);
  }
}
