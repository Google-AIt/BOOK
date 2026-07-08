// brand-rules.js
const BrandRules = {
  name: "خيركم (Khairkom)",
  tagline: "خيركم خيركم لأهله",
  vision: "To empower individuals, families, and communities with premium educational technology, values-driven marketplace connections, and smart AI assistants, all rooted in cultural authenticity and modern user experience.",
  principles: [
    {
      title: "Premium & Clean",
      titleAr: "الجودة العالية والنظافة البصرية",
      desc: "Minimal layout, generous whitespace, sharp typography, and subtle shadows. We design for clarity, eliminating clutter to highlight valuable content.",
      descAr: "تنسيق بسيط، مسافات بيضاء سخية، خطوط واضحة، وظلال ناعمة. نصمم من أجل الوضوح والبعد عن التشتت لإبراز المحتوى القيمي."
    },
    {
      title: "Soft Glassmorphism",
      titleAr: "الزجاجية الناعمة (Glassmorphism)",
      desc: "Use of frosted-glass overlays (backdrop-filter) and thin, translucent borders to create depth and layering without feeling heavy.",
      descAr: "استخدام طبقات الزجاج البلوري المغشى وحدود شفافة رفيعة لإنشاء عمق وتداخل بصري أنيق دون إثقال الواجهة."
    },
    {
      title: "Culturally Harmonious",
      titleAr: "التناغم الثقافي واللغوي",
      desc: "Blending premium Latin typography (Plus Jakarta Sans) with elegant Arabic type (Tajawal), offering full layout support for both RTL and LTR.",
      descAr: "مزج الخطوط اللاتينية الحديثة مع الخطوط العربية الهندسية الأنيقة (خط تاجاول)، مع دعم كامل للتنسيق والاتجاهات من اليمين لليسار."
    },
    {
      title: "Smooth Micro-interactions",
      titleAr: "التفاعلات والحركات الدقيقة",
      desc: "Delightful transitions, hover states, and click feedback that make the platform feel alive and responsive.",
      descAr: "انتقالات مرئية مبهجة، وحالات استجابة عند التمرير والنقر تجعل المنصة تبدو نابضة بالحياة وتفاعلية للغاية."
    }
  ],
  logoRules: {
    guidelines: [
      "Always display the logo with its original proportions and color scheme (Deep Pink heart, white clipboard, charcoal/pink text).",
      "Do NOT crop, stretch, rotate, recolor, or modify the logo files.",
      "Ensure a minimum clear space equal to 25% of the logo height on all sides.",
      "Place on high-contrast backgrounds (warm white, light gray, or deep charcoal) to maintain legibility."
    ],
    dimensions: {
      desktop: "48px height",
      tablet: "40px height",
      mobile: "32px height"
    }
  },
  voiceAndTone: {
    traits: [
      {
        trait: "Empathetic & Friendly",
        desc: "We speak with warmth and respect, welcoming learners and creators alike. We use supportive language that encourages progress."
      },
      {
        trait: "Clear & Professional",
        desc: "No unnecessary jargon. We provide straightforward instructions, clean tooltips, and transparent pricing."
      },
      {
        trait: "Inspiring & Growth-oriented",
        desc: "Highlighting achievements, progress indicators, and positive reinforcements to fuel the user's educational and community journey."
      }
    ],
    examples: [
      {
        context: "Welcome screen",
        doText: "Welcome back, Ahmed! Let's continue your learning journey today.",
        dontText: "Login successful. Redirecting user to course index."
      },
      {
        context: "Error message",
        doText: "We couldn't load your certificates just now. Let's try reloading the page.",
        dontText: "Error 500: Database connection failure in Certificate Table."
      }
    ]
  },
  typography: {
    primaryEnglish: "Plus Jakarta Sans (Sans-serif)",
    primaryArabic: "Tajawal (Sans-serif)",
    scale: [
      { name: "Display 1", size: "48px", weight: "800", usage: "Hero headers, landing page titles" },
      { name: "Heading 1", size: "32px", weight: "700", usage: "Dashboard titles, main page headers" },
      { name: "Heading 2", size: "24px", weight: "600", usage: "Section titles, card headers" },
      { name: "Heading 3", size: "18px", weight: "600", usage: "Subsections, small modals" },
      { name: "Body Lg", size: "16px", weight: "400", usage: "Intro text, blog paragraphs" },
      { name: "Body Md", size: "14px", weight: "400", usage: "Standard body text, form labels, list items" },
      { name: "Body Sm", size: "12px", weight: "400", usage: "Metadata, table captions, helper text" }
    ]
  },
  iconography: {
    style: "Duo-tone / Outline style, featuring thin stroke widths (1.5px) and rounded caps. Icons adapt to active theme colors.",
    rules: [
      "Use outline icons for standard state, filled icons for active/selected states.",
      "Always center icons inside their bounding box.",
      "Main interactive icons should have a minimum click-target size of 44x44px on mobile."
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BrandRules;
}
