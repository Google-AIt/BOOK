// marketplace.js
if (!window.Pages) window.Pages = {};

window.Pages.marketplace = {
  title: {
    en: "Values Marketplace",
    ar: "متجر خيركم"
  },
  render(lang = 'en') {
    const isAr = lang === 'ar';
    const text = {
      headerTitle: isAr ? "متجر القيم" : "Values Marketplace",
      headerDesc: isAr ? "اشترِ مجموعات بطاقات الإهداء التفاعلية الفاخرة، وكتيبات التمارين المنسقة، واحجز ساعات الاستشارة الفردية." : "Purchase premium interactive gifting card sets, curated workbook booklets, and coaching hours.",
      cart: isAr ? "السلة" : "Cart",
      
      filterAll: isAr ? "جميع المنتجات" : "All Items",
      filterCards: isAr ? "بطاقات الإهداء" : "Gifting Cards",
      filterBooks: isAr ? "كتيبات PDF" : "Workbook PDFs",
      filterCoaching: isAr ? "الاستشارات" : "Consultations",
      
      couponPlace: isAr ? "أدخل رمز الخصم (مثل KHAIR20)" : "Enter Coupon Code (e.g. KHAIR20)",
      couponBtn: isAr ? "تطبيق" : "Apply",
      
      p1Title: isAr ? "مجموعة بطاقات الإهداء الأخضر الزيتي" : "Premium Olive Green Cards Pack",
      p1Desc: isAr ? "تحتوي على تنسيقات A6 و 5x7 عالية الدقة صالحة للطباعة." : "Contains A6 & 5x7 high-res printable formats.",
      reviews: isAr ? "تقييم" : "reviews",
      addToCart: isAr ? "إضافة للسلة" : "Add to Cart",
      
      p2Title: isAr ? "كتيب أسرار التوافق العاطفي" : "Secrets of Compatibility Workbook",
      p2Desc: isAr ? "ملف PDF تفاعلي يحتوي على تمارين عملية ودليل كامل للزوجين." : "Interactive exercises PDF, complete guide.",
      
      p3Title: isAr ? "جلسات استشارية فردية" : "Private Coaching Hours",
      p3Desc: isAr ? "جلسة إرشادية عن بعد لمدة 60 دقيقة مع مستشاري المنصة المعتمدين." : "60-minute remote advice session with certified mentors.",

      reviewHeader: isAr ? "كتابة تقييم للمنتج" : "Submit Product Review",
      ratingLabel: isAr ? "التقييم" : "Rating",
      productLabel: isAr ? "المنتج المراد تقييمه" : "Product Reviewed",
      reviewText: isAr ? "مضمون المراجعة" : "Review text",
      reviewPlace: isAr ? "ما رأيك في المواد التعليمية؟" : "What did you think of the material?",
      reviewSubmit: isAr ? "إرسال التقييم" : "Submit Review",

      modalTitle: isAr ? "فاتورة الشراء" : "Purchase Invoice",
      subtotal: isAr ? "المجموع الفرعي المستحق:" : "Subtotal Due:",
      paymentLabel: isAr ? "طريقة الدفع" : "Payment Method",
      payBtn: isAr ? "دفع آمن" : "Secure Payment",
      cancel: isAr ? "إلغاء" : "Cancel"
    };

    return `
      <div class="page-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-5);">
        <div>
          <h1 style="margin:0; font-size:28px; font-weight:800; letter-spacing:-0.02em;">${text.headerTitle}</h1>
          <p style="margin:4px 0 0 0; color:var(--theme-text-muted); font-size:14px;">${text.headerDesc}</p>
        </div>
        <div>
          <button class="btn btn-outline" style="position:relative;" onclick="Pages.marketplace.openCart()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            ${text.cart}
            <span id="cartCountBadge" class="badge badge-accent" style="position:absolute; top:-8px; right:-8px; padding:2px 6px; font-size:9px;">0</span>
          </button>
        </div>
      </div>

      <!-- Marketplace Filter & Coupon Section -->
      <div style="display:grid; grid-template-columns: 2.5fr 1fr; gap:var(--space-4); margin-bottom:var(--space-5); align-items:center;">
        <div style="display:flex; gap:12px; flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm market-filter-btn" onclick="Pages.marketplace.filterProducts('all')">${text.filterAll}</button>
          <button class="btn btn-outline btn-sm market-filter-btn" onclick="Pages.marketplace.filterProducts('cards')">${text.filterCards}</button>
          <button class="btn btn-outline btn-sm market-filter-btn" onclick="Pages.marketplace.filterProducts('books')">${text.filterBooks}</button>
          <button class="btn btn-outline btn-sm market-filter-btn" onclick="Pages.marketplace.filterProducts('coaching')">${text.filterCoaching}</button>
        </div>
        <div class="input-wrapper">
          <input type="text" class="form-input" id="couponCodeInput" placeholder="${text.couponPlace}" style="font-size:12px; padding:8px 12px;">
          <button class="btn btn-primary btn-sm" style="position:absolute; right:3px; top:3px; bottom:3px; padding:0 12px; border-radius:4px;" onclick="Pages.marketplace.applyCoupon()">${text.couponBtn}</button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="products-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:var(--space-4); margin-bottom:var(--space-5);">
        
        <!-- Product 1 -->
        <div class="card product-card" data-category="cards">
          <div style="height:160px; background:linear-gradient(135deg, #1e3a2f 0%, #3a5f43 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#f5ebd5; position:relative; padding:12px; text-align:center;">
            <div style="font-family:'Tajawal'; font-size:18px; font-weight:800; border:2px solid #d4af37; padding:4px 12px; border-radius:4px; margin-bottom:8px;">بطاقات الإهداء</div>
            <div style="font-size:11px; opacity:0.8;">Olive Green Gifting Cards (A6 / 5x7)</div>
            
            <button style="position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.15); border:none; border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; color:white; cursor:pointer;" onclick="Pages.marketplace.toggleWishlist(this)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="heart-icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
          <div class="card-body">
            <h3 style="margin:0 0 4px 0; font-size:15px; font-weight:700;">${text.p1Title}</h3>
            <span style="font-size:12px; color:var(--theme-text-muted);">${text.p1Desc}</span>
            <div style="display:flex; align-items:center; gap:4px; margin:8px 0 12px 0; color:#ffb020; font-size:12px;">
              ★★★★★ <span style="color:var(--theme-text-muted); font-size:11px;">(42 ${text.reviews})</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:18px; font-weight:800; color:var(--theme-primary);">$14.99</span>
              <button class="btn btn-primary btn-sm" onclick="Pages.marketplace.addToCart('${isAr ? "مجموعة بطاقات الإهداء" : "Olive Green Cards Pack"}', 14.99)">${text.addToCart}</button>
            </div>
          </div>
        </div>

        <!-- Product 2 -->
        <div class="card product-card" data-category="books">
          <div style="height:160px; background:linear-gradient(135deg, #1d1b33 0%, #462c7a 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; position:relative; padding:12px; text-align:center;">
            <div style="font-family:'Tajawal'; font-size:18px; font-weight:800; border-bottom:2px solid var(--theme-accent); padding-bottom:4px; margin-bottom:8px;">أسرار التوافق العاطفي</div>
            <div style="font-size:11px; opacity:0.8;">Secrets of Emotional Compatibility eBook</div>
            
            <button style="position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.15); border:none; border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; color:white; cursor:pointer;" onclick="Pages.marketplace.toggleWishlist(this)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="heart-icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
          <div class="card-body">
            <h3 style="margin:0 0 4px 0; font-size:15px; font-weight:700;">${text.p2Title}</h3>
            <span style="font-size:12px; color:var(--theme-text-muted);">${text.p2Desc}</span>
            <div style="display:flex; align-items:center; gap:4px; margin:8px 0 12px 0; color:#ffb020; font-size:12px;">
              ★★★★☆ <span style="color:var(--theme-text-muted); font-size:11px;">(18 ${text.reviews})</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:18px; font-weight:800; color:var(--theme-primary);">$9.99</span>
              <button class="btn btn-primary btn-sm" onclick="Pages.marketplace.addToCart('${isAr ? "كتيب التوافق العاطفي" : "Secrets of Compatibility Workbook"}', 9.99)">${text.addToCart}</button>
            </div>
          </div>
        </div>

        <!-- Product 3 -->
        <div class="card product-card" data-category="coaching">
          <div style="height:160px; background:linear-gradient(135deg, var(--theme-primary) 0%, rgba(var(--theme-primary-rgb),0.5) 100%); display:flex; flex-direction:column; align-items:center; justify-content:center; color:white; position:relative; padding:12px; text-align:center;">
            <div style="font-size:36px; margin-bottom:8px;">👥</div>
            <div style="font-size:14px; font-weight:700; font-family:'Tajawal';">${isAr ? "جلسة استشارة خاصة" : "1-on-1 Counsel Session"}</div>
            <div style="font-size:11px; opacity:0.8;">Private Family Consultation Hours</div>
            
            <button style="position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.15); border:none; border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; color:white; cursor:pointer;" onclick="Pages.marketplace.toggleWishlist(this)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="heart-icon"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </button>
          </div>
          <div class="card-body">
            <h3 style="margin:0 0 4px 0; font-size:15px; font-weight:700;">${text.p3Title}</h3>
            <span style="font-size:12px; color:var(--theme-text-muted);">${text.p3Desc}</span>
            <div style="display:flex; align-items:center; gap:4px; margin:8px 0 12px 0; color:#ffb020; font-size:12px;">
              ★★★★★ <span style="color:var(--theme-text-muted); font-size:11px;">(156 ${text.reviews})</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:18px; font-weight:800; color:var(--theme-primary);">$75.00</span>
              <button class="btn btn-primary btn-sm" onclick="Pages.marketplace.addToCart('${isAr ? "جلسة استشارة خاصة" : "Private Coaching Session"}', 75.00)">${text.addToCart}</button>
            </div>
          </div>
        </div>

      </div>

      <!-- Reviews Section -->
      <div class="card" style="margin-bottom:var(--space-5);">
        <div class="card-header">
          <h3 style="margin:0; font-size:16px; font-weight:700;">${text.reviewHeader}</h3>
        </div>
        <div class="card-body" style="display:grid; grid-template-columns:1fr 1.5fr; gap:var(--space-5);">
          <div>
            <div class="form-group">
              <label class="form-label">${text.ratingLabel}</label>
              <div style="display:flex; gap:6px; font-size:24px; color:#ddd; cursor:pointer;" id="interactiveStarsContainer">
                <span onclick="Pages.marketplace.rate(1)">★</span>
                <span onclick="Pages.marketplace.rate(2)">★</span>
                <span onclick="Pages.marketplace.rate(3)">★</span>
                <span onclick="Pages.marketplace.rate(4)">★</span>
                <span onclick="Pages.marketplace.rate(5)">★</span>
              </div>
              <input type="hidden" id="reviewRatingVal" value="0">
            </div>
            <div class="form-group">
              <label class="form-label">${text.productLabel}</label>
              <select class="form-input">
                <option>${text.p1Title}</option>
                <option>${text.p2Title}</option>
                <option>${text.p3Title}</option>
              </select>
            </div>
          </div>
          <div>
            <div class="form-group">
              <label class="form-label">${text.reviewText}</label>
              <textarea class="form-input" style="height:90px;" placeholder="${text.reviewPlace}"></textarea>
            </div>
            <button class="btn btn-primary" onclick="Components.showToast('${isAr ? "شكراً لك! تم إرسال مراجعتك لاعتمادها." : "Thank you! Review submitted for admin approval."}', 'success')">${text.reviewSubmit}</button>
          </div>
        </div>
      </div>

      <!-- Checkout Dialog -->
      <div id="checkoutModal" class="modal-overlay">
        <div class="modal-container" style="max-width:440px;">
          <div class="card-header">
            <h3 style="margin:0; font-size:16px; font-weight:700;">${text.modalTitle}</h3>
            <span style="cursor:pointer;" data-modal-close>✕</span>
          </div>
          <div class="card-body">
            <div style="border-bottom:1px solid var(--theme-border-color); padding-bottom:12px; margin-bottom:12px;" id="invoiceItemsList">
              <!-- Dynamically populated -->
            </div>
            
            <div style="display:flex; justify-content:space-between; font-weight:700; font-size:15px; margin-bottom:20px;">
              <span>${text.subtotal}</span>
              <span id="invoiceTotalPrice">$0.00</span>
            </div>

            <div class="form-group">
              <label class="form-label">${text.paymentLabel}</label>
              <div style="display:flex; gap:12px;">
                <label class="custom-radio" style="flex:1; padding:10px; border:1px solid var(--theme-border-color); border-radius:var(--radius-sm);">
                  <input type="radio" name="paymentType" checked>
                  <span class="radio-circle"></span>
                  <span>${isAr ? "بطاقة ائتمان" : "Credit Card"}</span>
                </label>
                <label class="custom-radio" style="flex:1; padding:10px; border:1px solid var(--theme-border-color); border-radius:var(--radius-sm);">
                  <input type="radio" name="paymentType">
                  <span class="radio-circle"></span>
                  <span>Apple Pay</span>
                </label>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline" data-modal-close>${text.cancel}</button>
            <button class="btn btn-success" onclick="Pages.marketplace.completeCheckout()">${text.payBtn}</button>
          </div>
        </div>
      </div>
    `;
  },
  init() {
    this.cart = [];
    this.discount = 1.0;
  },
  rate(starsCount) {
    const stars = document.querySelectorAll('#interactiveStarsContainer span');
    stars.forEach((star, idx) => {
      if (idx < starsCount) {
        star.style.color = '#ffb020';
      } else {
        star.style.color = '#ddd';
      }
    });
    document.getElementById('reviewRatingVal').value = starsCount;
  },
  toggleWishlist(btn) {
    const isAr = App.state.lang === 'ar';
    const path = btn.querySelector('.heart-icon path');
    if (path.getAttribute('fill') === 'currentColor') {
      path.setAttribute('fill', 'none');
      btn.style.color = 'white';
      Components.showToast(isAr ? 'تمت الإزالة من المفضلة' : 'Removed from Wishlist', 'info');
    } else {
      path.setAttribute('fill', 'currentColor');
      btn.style.color = '#ff4a5a';
      Components.showToast(isAr ? 'تمت الإضافة للمفضلة!' : 'Added to Wishlist!', 'success');
    }
  },
  filterProducts(category) {
    const isAr = App.state.lang === 'ar';
    const btns = document.querySelectorAll('.market-filter-btn');
    btns.forEach(b => b.className = 'btn btn-outline btn-sm market-filter-btn');
    
    event.target.className = 'btn btn-primary btn-sm market-filter-btn';

    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  },
  addToCart(name, price) {
    const isAr = App.state.lang === 'ar';
    this.cart.push({ name, price });
    document.getElementById('cartCountBadge').innerText = this.cart.length;
    Components.showToast(isAr ? `تمت إضافة ${name} إلى السلة!` : `${name} added to cart!`, 'success');
  },
  applyCoupon() {
    const isAr = App.state.lang === 'ar';
    const val = document.getElementById('couponCodeInput').value.trim().toUpperCase();
    if (val === 'KHAIR20') {
      this.discount = 0.8;
      Components.showToast(isAr ? 'تم تطبيق كوبون الخصم 20% بنجاح!' : '20% discount coupon applied successfully!', 'success');
    } else {
      Components.showToast(isAr ? 'كود الخصم غير صحيح.' : 'Invalid coupon code.', 'danger');
    }
  },
  openCart() {
    const isAr = App.state.lang === 'ar';
    if (this.cart.length === 0) {
      Components.showToast(isAr ? 'السلة فارغة.' : 'Your cart is empty.', 'warning');
      return;
    }

    const itemsList = document.getElementById('invoiceItemsList');
    itemsList.innerHTML = '';
    
    let subtotal = 0;
    this.cart.forEach(item => {
      subtotal += item.price;
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.style.fontSize = '13px';
      row.style.marginBottom = '6px';
      row.innerHTML = `<span>${item.name}</span> <span>$${item.price.toFixed(2)}</span>`;
      itemsList.appendChild(row);
    });

    const finalPrice = subtotal * (this.discount || 1.0);
    document.getElementById('invoiceTotalPrice').innerText = `$${finalPrice.toFixed(2)}`;

    Components.showModal('checkoutModal');
  },
  completeCheckout() {
    const isAr = App.state.lang === 'ar';
    Components.closeModal('checkoutModal');
    Components.showToast(isAr ? 'تم معالجة الطلب بنجاح! تم إرسال الفاتورة لبريدك الإلكتروني.' : 'Order Processed! Invoice sent to your email.', 'success');
    this.cart = [];
    document.getElementById('cartCountBadge').innerText = 0;
  }
};
