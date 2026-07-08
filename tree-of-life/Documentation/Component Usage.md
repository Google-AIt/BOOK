# دليل استخدام المكونات (Component Usage) 🛠️
## شجرة الحياة – خيركم لأهله

يوفر هذا الدليل مقتطفات برمجية جاهزة للاستخدام في تطوير منصة شجرة الحياة.

---

## 1. أزرار الهوية البصرية (Brand Buttons)

### الزر الوردي الأساسي (Khairukum Pink Button)
يُستخدم للعمليات الرئيسية مثل إرسال النماذج والموافقة:
```html
<button class="ui-kit-btn ui-kit-btn-primary">حفظ الذاكرة 🌳</button>
```

### الزر الذهبي الفاخر (Premium Gold Button)
يُستخدم للتحميل والطباعة وعمليات الترقية:
```html
<button class="ui-kit-btn ui-kit-btn-gold">تصدير اللوحة للطباعة ✨</button>
```

---

## 2. بطاقات العرض (UI Cards)

### بطاقة الذكرى الزجاجية (Glassmorphic Memory Card)
بطاقة تستخدم لعرض التفاصيل وتطفو بنعومة:
```html
<div class="ui-kit-card">
  <div style="display: flex; justify-content: space-between;">
    <span class="ui-kit-badge" style="background-color: var(--color-khairukum-pink-soft); color: var(--color-khairukum-pink);">❤️ حب وود</span>
    <span style="font-size: 0.7rem; opacity: 0.6;">8 يوليو 2026</span>
  </div>
  <h3 style="font-size: 1rem; margin: 10px 0;">ذكرى يوم عقد قراننا 💍</h3>
  <p style="font-size: 0.8rem; opacity: 0.8; line-height: 1.6;">سجلنا هذا اليوم السعيد بحضور الأهل والأحباب كبداية لشجرة حياتنا الممتدة.</p>
</div>
```

---

## 3. حقول المدخلات (Form Inputs)
```html
<div class="form-group">
  <label>عنوان الورقة</label>
  <input type="text" class="ui-kit-input" placeholder="مثال: رحلة مكة المكرمة">
</div>
```
- تأكد دائماً من إقران حقل المدخلات بـ `<label>` مناسب لزيادة إمكانية الوصول والتوافق مع قارئات الشاشة.
