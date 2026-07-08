// Khairkom OS Global Database (English & Arabic)
const OS_DATA = {
  // 10 Core Workspaces Configuration
  workspaces: [
    {
      id: "home",
      icon: "🏠",
      name: { en: "Home Dashboard", ar: "لوحة التحكم الرئيسية" },
      group: "core",
      badge: null,
      desc: { en: "Beautiful personalized center, activities, and insights.", ar: "مركز مخصص للأنشطة اليومية، الإحصائيات، والإشعارات." }
    },
    {
      id: "academy",
      icon: "🎓",
      name: { en: "Academy Center", ar: "أكاديمية خيركم" },
      group: "core",
      badge: "3",
      desc: { en: "Course management, learning paths, and certificates.", ar: "إدارة المسارات التعليمية، المناهج، وإصدار الشهادات." }
    },
    {
      id: "commerce",
      icon: "🛍",
      name: { en: "Commerce Hub", ar: "منصة التجارة" },
      group: "core",
      badge: null,
      desc: { en: "Products, orders, subscriptions, and shipping logs.", ar: "إدارة المنتجات، الطلبات، الاشتراكات، والشحن القيم." }
    },
    {
      id: "ai",
      icon: "🤖",
      name: { en: "AI Engine", ar: "محرك الذكاء الاصطناعي" },
      group: "intelligence",
      badge: "AI",
      desc: { en: "Smart assistants, content writers, and image studios.", ar: "المساعد الذكي، كاتب المحتوى، ومولد الصور." }
    },
    {
      id: "community",
      icon: "👥",
      name: { en: "Community Circle", ar: "مجتمع خيركم" },
      group: "collaboration",
      badge: "9+",
      desc: { en: "Forums, groups, leaderboard standings, and badges.", ar: "المنتديات، المجموعات، قائمة المتصدرين، والأوسمة." }
    },
    {
      id: "analytics",
      icon: "📊",
      name: { en: "Analytics Suite", ar: "غرفة التحليلات" },
      group: "intelligence",
      badge: null,
      desc: { en: "Business intelligence metrics, growth analytics.", ar: "مؤشرات نمو الأعمال والمقاييس المالية والاجتماعية." }
    },
    {
      id: "knowledge",
      icon: "📁",
      name: { en: "Knowledge Hub", ar: "مستودع المعرفة" },
      group: "collaboration",
      badge: null,
      desc: { en: "Corporate files, policies, resources, and templates.", ar: "مستندات المؤسسة، السياسات، النماذج، ومصادر التعلم." }
    },
    {
      id: "planning",
      icon: "📅",
      name: { en: "Planning Workspace", ar: "مخطط المشاريع" },
      group: "core",
      badge: "5",
      desc: { en: "Roadmaps, Kanban tasks, sprint logs, and timelines.", ar: "إدارة خطط العمل، لوحة المهام (كانبان)، والمخططات الزمنية." }
    },
    {
      id: "communication",
      icon: "💬",
      name: { en: "Comm Center", ar: "قنوات الاتصال" },
      group: "collaboration",
      badge: null,
      desc: { en: "Team direct messaging, audio rooms, and client logs.", ar: "المراسلة المباشرة، غرف الصوت، وقنوات التواصل للمشروع." }
    },
    {
      id: "admin",
      icon: "⚙",
      name: { en: "Administration", ar: "إدارة النظام" },
      group: "system",
      badge: null,
      desc: { en: "Users, roles, permissions matrix, billing, audit logs.", ar: "الصلاحيات، الأدوار، إعدادات الحماية، وسجلات الأمان." }
    }
  ],

  // 1. Home Workspace Data
  home: {
    insights: {
      en: [
        "Your community impact index grew by 18% this week. Keep up the ethical leadership!",
        "Academy enrollments increased. 12 students are awaiting certification approvals.",
        "AI Agent suggestions: Automated recurring commerce reporting is ready for deployment."
      ],
      ar: [
        "زاد مؤشر الأثر المجتمعي لبرامجك بنسبة 18% هذا الأسبوع. استمر في ريادتك القيمية!",
        "ارتفعت نسبة التسجيل بالأكاديمية. 12 طالبًا بانتظار اعتماد شهاداتهم اليوم.",
        "اقتراح المساعد الذكي: جاهزية تفعيل التقرير التلقائي الدوري لعمليات البيع والاشتراكات."
      ]
    },
    notifications: [
      { id: 1, type: "academy", time: "5m ago", en: "Ahmed Khalid submitted assignment for Leadership Course", ar: "أرسل أحمد خالد حل التكليف في مسار القيادة الأخلاقية" },
      { id: 2, type: "commerce", time: "1h ago", en: "New annual subscription activated (Plan Premium)", ar: "تفعيل اشتراك سنوي جديد من المتجر (الباقة الممتازة)" },
      { id: 3, type: "system", time: "3h ago", en: "Security audit logs successfully exported to Knowledge Hub", ar: "تصدير سجلات المراجعة الأمنية بنجاح إلى مستودع المعرفة" }
    ],
    activities: [
      { user: "Sarah Omar", action: "Approved Course Certificate", time: "10 mins ago", avatar: "SO" },
      { user: "Khalid Naif", action: "Added product 'Family Values Handbook'", time: "42 mins ago", avatar: "KN" },
      { user: "AI Engine", action: "Generated Marketing Copy for Academy Launch", time: "2 hours ago", avatar: "AI" }
    ]
  },

  // 2. Academy Workspace Data
  academy: {
    metrics: {
      en: { totalStudents: "1,240", courseCompletion: "84%", activePaths: "4" },
      ar: { totalStudents: "١،٢٤٠", courseCompletion: "٨٤٪", activePaths: "٤" }
    },
    paths: [
      { id: "lead", title: { en: "Ethical Values Leadership", ar: "القيادة الأخلاقية والقيمية" }, progress: 75, students: 480, level: { en: "Intermediate", ar: "متوسط" } },
      { id: "tech", title: { en: "AI & Human Values Integration", ar: "الذكاء الاصطناعي ودمج القيم" }, progress: 42, students: 610, level: { en: "Advanced", ar: "متقدم" } },
      { id: "social", title: { en: "Social Action and Community Impact", ar: "العمل المجتمعي وبناء الأثر" }, progress: 90, students: 150, level: { en: "Beginner", ar: "مبتدئ" } }
    ],
    assignments: [
      { id: 1, student: "Omar Farooq", path: "Ethical Leadership", status: "submitted", date: "Today" },
      { id: 2, student: "Huda Jameel", path: "AI Integration", status: "reviewed", date: "Yesterday" }
    ]
  },

  // 3. Commerce Workspace Data
  commerce: {
    metrics: {
      en: { revenue: "$14,820", activeSubs: "312", stockLevel: "98%" },
      ar: { revenue: "١٤،٨٢٠ $", activeSubs: "٣١٢", stockLevel: "٩٨٪" }
    },
    products: [
      { id: 1, title: { en: "Corporate Ethics Handbook", ar: "دليل أخلاقيات العمل المؤسسي" }, price: 49.00, sales: 180, status: "In Stock", emoji: "📚" },
      { id: 2, title: { en: "Values-Driven Strategy Session", ar: "جلسة التخطيط القيمي للمشاريع" }, price: 199.00, sales: 45, status: "Booking Open", emoji: "🤝" },
      { id: 3, title: { en: "E-Learning Path: Annual Seat", ar: "مقعد سنوي متكامل بالأكاديمية" }, price: 299.00, sales: 92, status: "Subscription", emoji: "🎟" }
    ],
    orders: [
      { id: "KH-902", customer: "Yousef Yasin", total: "$248.00", status: "delivered", date: "Today" },
      { id: "KH-901", customer: "Aisha Al-Hadi", total: "$49.00", status: "processing", date: "Today" },
      { id: "KH-900", customer: "Robert Miller", total: "$199.00", status: "delivered", date: "Yesterday" }
    ]
  },

  // 4. AI Workspace Assistant preset responses
  ai: {
    defaultPrompts: {
      en: [
        "Generate a lesson plan outline for ethical leadership.",
        "Create an e-commerce strategy for values-based consulting.",
        "Draft a communication template for new community events."
      ],
      ar: [
        "اكتب خطة درس لمسار القيادة الأخلاقية.",
        "اقترح استراتيجية تسويق للمبيعات والخدمات الاستشارية.",
        "صغ رسالة ترحيبية لأعضاء مجتمع خيركم الجدد."
      ]
    },
    presets: {
      en: {
        "lesson": "Here is a high-level lesson plan outline for Ethical Leadership:\n1. Introduction to Values-driven Influence (45m)\n2. Case Studies in Ethical Decision Making (60m)\n3. Designing Community Action Goals (30m)\nRecommended Assignment: Draft a personal integrity pact.",
        "commerce": "Suggested Commerce Strategy:\n- Position services under a 'Social Impact Return' pricing model.\n- Build a tiered subscription layout: Individual, Team, and Enterprise.\n- Focus coupons on academy-commerce bundle packages.",
        "comm": "Community Welcome Template:\n'Welcome to Khairkom community, where we grow together! We recommend joining the Leadership forum and exploring our ongoing Academy modules. Let's create impact!'"
      },
      ar: {
        "lesson": "إليك خطة الدرس المقترحة لمسار القيادة القيمية:\n١. مقدمة في التأثير الأخلاقي وقيم العطاء (٤٥ دقيقة)\n٢. دراسة حالات ونماذج في اتخاذ القرار القيمي (٦٠ دقيقة)\n٣. صياغة ميثاق النزاهة الشخصي والعمل المجتمعي (٣٠ دقيقة)\nالتكليف المقترح: كتابة خطة عمل قيمية للمشروع.",
        "commerce": "استراتيجية المتجر المقترحة:\n- تقديم الخدمات الاستشارية مع تسليط الضوء على العائد المجتمعي للأعمال.\n- توفير اشتراكات دورية مرنة: للأفراد، وللمجموعات، وللشركات الكبرى.\n- طرح عروض تجمع بين المبيعات المادية والمسارات التعليمية بالأكاديمية.",
        "comm": "نموذج رسالة الترحيب بمجتمع خيركم:\n'أهلاً بك في عائلة مجتمع خيركم! نسعد بانضمامك إلينا لبناء أثر مستدام. نوصيك بزيارة منتدى القيادة الأخلاقية ومطالعة المسارات التعليمية المتاحة بالأكاديمية للبدء في رحلتك.'"
      }
    }
  },

  // 5. Community Workspace Data
  community: {
    forums: [
      { id: 1, title: { en: "Ethical Practices Q&A", ar: "أسئلة وأجوبة في التطبيقات القيمية" }, posts: 42, activeMembers: 18 },
      { id: 2, title: { en: "Academy Study Groups", ar: "مجموعات الدراسة وتطوير المناهج" }, posts: 110, activeMembers: 65 },
      { id: 3, title: { en: "Commerce Collaborations", ar: "فرص التعاون وتطوير المتجر" }, posts: 24, activeMembers: 12 }
    ],
    leaderboard: [
      { rank: 1, name: "Ibrahim Saad", points: 2450, badge: "Grand Ethical Master" },
      { rank: 2, name: "Maria Gomez", points: 1980, badge: "Value Champion" },
      { rank: 3, name: "Fatima Al-Harbi", points: 1850, badge: "Community Pillar" }
    ],
    achievements: [
      { name: { en: "Perfect Academy Streak", ar: "شغف التعلم المتكامل" }, desc: { en: "Completed 3 ethical courses back-to-back.", ar: "إتمام ٣ مسارات تعليمية متتالية بدون انقطاع." }, icon: "🏆" },
      { name: { en: "Ethics Builder", ar: "منارة العطاء الأخلاقي" }, desc: { en: "Shared 10 valuable templates in Knowledge Hub.", ar: "مشاركة ١٠ أدلة وقوالب مفيدة في مستودع المعرفة." }, icon: "🌟" }
    ]
  },

  // 8. Planning Workspace Data
  planning: {
    tasks: [
      { id: "todo-1", title: { en: "Revamp Academy Syllabus", ar: "تطوير مناهج القيادة الأخلاقية" }, desc: { en: "Incorporate new AI ethics modules.", ar: "إدراج فصول جديدة لذكاء الآلة المسؤول." }, status: "todo", priority: "high" },
      { id: "prog-1", title: { en: "Optimize E-Commerce checkout flow", ar: "تحسين واجهة الدفع بالمتجر" }, desc: { en: "Reduce payment friction for subscription.", ar: "تقليل خطوات تفعيل الاشتراكات الشهرية." }, status: "inprogress", priority: "medium" },
      { id: "done-1", title: { en: "Publish Security Auditing Guidelines", ar: "إقرار معايير الحماية والمراجعة" }, desc: { en: "Approved by Admin compliance team.", ar: "مراجعة وإقرار فريق الامتثال الأمني." }, status: "done", priority: "low" }
    ]
  },

  // 10. Admin Workspace Data
  admin: {
    users: [
      { id: 1, name: "Sarah Omar", email: "sarah@khairkom.org", role: "Super Admin", status: "Active" },
      { id: 2, name: "Tareq Fahd", email: "tareq@khairkom.org", role: "Academy Instructor", status: "Active" },
      { id: 3, name: "Lina Munir", email: "lina@khairkom.org", role: "Commerce Manager", status: "Active" }
    ],
    auditLogs: [
      { time: "10:14 AM", action: "User Sarah Omar generated System Tokens", ip: "192.168.1.15", status: "Success" },
      { time: "09:42 AM", action: "Modify course contents 'AI & Values Integration'", ip: "192.168.1.28", status: "Success" },
      { time: "Yesterday", action: "API Client configuration edited (Stripe Webhook)", ip: "84.22.180.12", status: "Success" }
    ]
  },

  // Brand Guidelines Data
  brandGuidelines: {
    logoRules: {
      en: [
        "Use ONLY the official uploaded Khairkom logo. Never redesign, recolor, or distort the logo.",
        "Ensure clear space of at least 32px around the logo.",
        "Do not place the logo on complex backgrounds without a glass overlay card."
      ],
      ar: [
        "استخدم فقط لوجو خيركم الرسمي المرفوع. لا تقم أبداً بإعادة تصميم اللوجو أو تغيير ألوانه أو تدويره.",
        "احرص على ترك مساحة خالية بمقدار ٣٢ بكسل على الأقل حول اللوجو.",
        "لا تضع اللوجو على خلفية مزدحمة دون استخدام لوح زجاجي (Glassmorphic) خلفه لحمايته."
      ]
    },
    colors: [
      { name: "Emerald Green", hex: "#085434", desc: "Core identity, ethics, sustainability" },
      { name: "Heart Pink Accent", hex: "#e81756", desc: "Interactive states, notifications, badges" },
      { name: "Dark Surface HSL", hex: "#0e1814", desc: "Dark mode background and major containers" },
      { name: "Light Surface HSL", hex: "#f5f8f6", desc: "Light mode clean environment background" }
    ]
  },

  // Design Tokens Visual Catalog
  designTokens: {
    spacing: [
      { token: "--space-1", value: "4px", use: "Micro gaps, icon offsets" },
      { token: "--space-2", value: "8px", use: "Small padding inside list items" },
      { token: "--space-4", value: "16px", use: "Standard card padding, button padding" },
      { token: "--space-6", value: "32px", use: "Section spacing, page margins" }
    ],
    radii: [
      { token: "--radius-xs", value: "6px", use: "Tags, small badges" },
      { token: "--radius-sm", value: "10px", use: "Standard inputs, buttons" },
      { token: "--radius-md", value: "14px", use: "Standard dashboard cards, forums list" },
      { token: "--radius-lg", value: "20px", use: "Simulated device layouts, popups" }
    ]
  },

  // Presentation Deck slides
  presentation: [
    {
      slide: "01",
      title: { en: "KHAIRKOM OS Vision", ar: "رؤية نظام خيركم" },
      desc: { 
        en: "A unified digital ecosystem engineered with values, luxury aesthetics, and futuristic OS features. Scalable, intelligent, and designed with premium Apple and Stripe guidelines.", 
        ar: "منظومة رقمية شاملة ومصممة بأعلى معايير الجمالية والفخامة والذكاء. صمم ليوفر تجربة نظام تشغيل ذكي متكامل يربط بين العلم والعمل والعطاء." 
      }
    },
    {
      slide: "02",
      title: { en: "Modular Workspaces", ar: "مساحات عمل مدمجة ومترابطة" },
      desc: { 
        en: "10 enterprise workspaces integrated seamlessly: from learning and certs (Academy), products and subscriptions (Commerce), to generative workflows (AI Engines) and task tracking (Planning).", 
        ar: "١٠ مساحات عمل احترافية مترابطة في شاشة واحدة: تبدأ من إدارة المعرفة والتعلم والشهادات، مروراً بالمنتجات والاشتراكات، والذكاء الاصطناعي، وانتهاءً بمخطط المشاريع وإدارة الفريق." 
      }
    },
    {
      slide: "03",
      title: { en: "Design Tokens & Scale", ar: "هيكل رموز التصميم الموحد" },
      desc: { 
        en: "Engineered with 4 dynamic luxury themes (Emerald Green, Ocean Blue, Royal Purple, Midnight Black) and a fully copyable token scale to ease developer handoff and build with confidence.", 
        ar: "مبني باستخدام ٤ سمات لونية فاخرة تدعم الوضع الداكن والفاتح، مع معايير واضحة للخطوط والمساحات تمكن المطورين من نسخ الكود وبناء الواجهات بدقة فائقة وبشكل فوري." 
      }
    }
  ]
};
