/* ==========================================
   "شجرة الحياة" (Tree of Life) Configurator Script
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Configurator state
  let currentCategory = 'love';
  let activeBoardSize = 'a2';
  
  const board = document.getElementById('keepsake-board');
  const leavesContainer = document.getElementById('interactive-leaves-container');
  const leafTextarea = document.getElementById('leaf-write-text');
  
  // Category configuration details
  const categories = {
    love: { emoji: '❤️', title: 'الحب والود', className: 'leaf-color-love', placeholder: 'اكتب رسالة حب لشريكك...' },
    growth: { emoji: '🌱', title: 'النمو الشخصي', className: 'leaf-color-growth', placeholder: 'هدف أو مهارة تود تطويرها...' },
    gratitude: { emoji: '🙏', title: 'الامتنان والثناء', className: 'leaf-color-gratitude', placeholder: 'شيء أنت ممتن لوجوده اليوم...' },
    family: { emoji: '👨‍👩‍👧', title: 'العائلة والأبناء', className: 'leaf-color-family', placeholder: 'ذكرى عائلية دافئة أو مناسبة...' },
    travel: { emoji: '✈️', title: 'السياحة والسفر', className: 'leaf-color-travel', placeholder: 'مكان تتمنيان زيارته معاً...' },
    home: { emoji: '🏡', title: 'المنزل والسكن', className: 'leaf-color-home', placeholder: 'حلم يخص منزلكما المشترك...' },
    goals: { emoji: '🎯', title: 'الأهداف والخطط', className: 'leaf-color-goals', placeholder: 'هدف تسعيان لتحقيقه معاً...' },
    dreams: { emoji: '⭐', title: 'الأحلام الكبيرة', className: 'leaf-color-dreams', placeholder: 'حلم عائلي بعيد المدى...' }
  };

  // Predefined leaf presets
  const presetLeaves = [
    { text: 'أول منزل لنا 🏡', cat: 'home', x: 45, y: 35, rot: -15 },
    { text: 'امتنان لوجودك 🙏', cat: 'gratitude', x: 28, y: 48, rot: 25 },
    { text: 'سفرنا لمكة 🕋', cat: 'travel', x: 62, y: 30, rot: 10 },
    { text: 'تأسيس شجرة الحياة 🌳', cat: 'family', x: 50, y: 22, rot: -5 },
    { text: 'هدف شراء سيارة 🎯', cat: 'goals', x: 38, y: 55, rot: -30 },
    { text: 'حب متجدد ❤️', cat: 'love', x: 68, y: 45, rot: 35 },
    { text: 'حلم إكمال الدراسات ⭐', cat: 'dreams', x: 22, y: 38, rot: 15 },
    { text: 'حفظ جزء عم 🌱', cat: 'growth', x: 58, y: 52, rot: -20 }
  ];

  // 1. Board Size switches
  window.setBoardSize = function(size) {
    activeBoardSize = size;
    board.className = 'keepsake-board size-' + size;
    
    // Toggle active buttons style
    const sizeBtns = document.querySelectorAll('.size-toggle-btn');
    sizeBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.includes(size.toUpperCase())) {
        btn.classList.add('active');
      }
    });
  };

  // 2. Select category card
  window.selectCategory = function(catId) {
    currentCategory = catId;
    
    // Update text area placeholder
    const details = categories[catId];
    if (leafTextarea) {
      leafTextarea.placeholder = details.placeholder;
      leafTextarea.value = '';
    }
    
    // Update preview card in the control sidebar
    const previewLeafEmoji = document.querySelector('#preview-leaf-card .badge-icon');
    const previewLeafText = document.querySelector('#preview-leaf-card .badge-title');
    const previewLeafDesc = document.querySelector('#preview-leaf-card .badge-sub');
    
    if (previewLeafEmoji && previewLeafText && previewLeafDesc) {
      previewLeafEmoji.textContent = details.emoji;
      previewLeafText.textContent = details.title;
      previewLeafDesc.textContent = details.placeholder;
    }

    // Toggle active category buttons
    const catBtns = document.querySelectorAll('.category-select-btn');
    catBtns.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.getElementById(`btn-cat-${catId}`);
    if (activeBtn) activeBtn.classList.add('active');
  };

  // 3. Update preview text on typing
  window.updateLeafPreviewText = function(text) {
    const previewLeafDesc = document.querySelector('#preview-leaf-card .badge-sub');
    if (previewLeafDesc) {
      previewLeafDesc.textContent = text.trim() || categories[currentCategory].placeholder;
    }
  };

  // 4. Create Leaf SVG Element
  function createLeafElement(text, category, xPercent, yPercent, rotation = 0) {
    const leafId = 'leaf-' + Date.now() + '-' + Math.floor(Math.random() * 100);
    const catDetails = categories[category] || categories.love;
    
    const leafNode = document.createElement('div');
    leafNode.className = 'leaf-node';
    leafNode.id = leafId;
    leafNode.style.left = xPercent + '%';
    leafNode.style.top = yPercent + '%';
    leafNode.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    
    // Structure of the leaf SVG
    leafNode.innerHTML = `
      <div class="leaf-svg-wrapper">
        <svg viewBox="0 0 100 60" class="leaf-svg-content" xmlns="http://www.w3.org/2000/svg">
          <path d="M 5,30 Q 30,5 95,30 Q 30,55 5,30 Z" class="${catDetails.className}" stroke-width="1.8" />
          <path d="M 5,30 Q 40,30 95,30" stroke="${category === 'love' ? '#E21A62' : '#C59F4B'}" stroke-dasharray="2 2" stroke-width="0.8" opacity="0.6" />
        </svg>
        <div class="leaf-text-overlay">${text}</div>
        <button class="delete-leaf-btn" style="position: absolute; top: -8px; right: -8px; width: 18px; height: 18px; border-radius: 50%; background: #ff4d4d; color: white; border: none; font-size: 10px; cursor: pointer; display: none; align-items: center; justify-content: center;">×</button>
      </div>
    `;

    // Add delete functionality on hover
    const deleteBtn = leafNode.querySelector('.delete-leaf-btn');
    
    leafNode.addEventListener('mouseenter', () => {
      deleteBtn.style.display = 'flex';
    });
    leafNode.addEventListener('mouseleave', () => {
      deleteBtn.style.display = 'none';
    });
    
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      leafNode.remove();
      updateDashboardLeafCount();
    });

    // Make element draggable
    makeElementDraggable(leafNode);
    
    return leafNode;
  }

  // 5. Pointer Events Draggable Logic
  function makeElementDraggable(elem) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elem.onpointerdown = dragMouseDown;

    function dragMouseDown(e) {
      if (e.target.classList.contains('delete-leaf-btn')) return;
      
      e = e || window.event;
      e.preventDefault();
      elem.setPointerCapture(e.pointerId);
      
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      elem.onpointermove = elementDrag;
      elem.onpointerup = closeDragElement;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      const boardRect = board.getBoundingClientRect();
      const currentLeftPx = elem.offsetLeft - pos1;
      const currentTopPx = elem.offsetTop - pos2;
      
      let leftPercent = (currentLeftPx / boardRect.width) * 100;
      let topPercent = (currentTopPx / boardRect.height) * 100;
      
      // Clamp boundaries inside the board wood frame
      if (leftPercent < 5) leftPercent = 5;
      if (leftPercent > 95) leftPercent = 95;
      if (topPercent < 15) topPercent = 15;
      if (topPercent > 92) topPercent = 92;
      
      elem.style.left = leftPercent + '%';
      elem.style.top = topPercent + '%';
    }

    function closeDragElement(e) {
      elem.releasePointerCapture(e.pointerId);
      elem.onpointermove = null;
      elem.onpointerup = null;
    }
  }

  // 6. Add Custom Leaf
  window.addNewLeafToStage = function() {
    if (!leafTextarea) return;
    const text = leafTextarea.value.trim();
    if (!text) {
      alert('الرجاء كتابة رسالة أو هدف أولاً!');
      return;
    }
    
    // Random offset near center of tree structure
    const x = 35 + Math.random() * 30;
    const y = 30 + Math.random() * 30;
    const rot = -30 + Math.random() * 60;
    
    const newLeaf = createLeafElement(text, currentCategory, x, y, rot);
    if (leavesContainer) {
      leavesContainer.appendChild(newLeaf);
    }
    
    // Clear textarea
    leafTextarea.value = '';
    
    // Update preview card text
    updateLeafPreviewText('');
    
    // Alert user
    if (typeof showToastAlert !== 'undefined') {
      showToastAlert('تم تعليق ورقتك الجديدة بنجاح! 🍃✨', 'success');
    }

    // Add to timeline list
    if (typeof addMemoryCardToTimelineElement !== 'undefined') {
      addMemoryCardToTimelineElement({
        text: text,
        cat: currentCategory,
        icon: categories[currentCategory].emoji,
        catName: categories[currentCategory].title,
        date: 'اليوم، الآن',
        user: 'أبو محمد',
        detail: `تمت إضافتها وتثبيتها تفاعلياً على اللوحة.`
      });
    }
    
    updateDashboardLeafCount();
  };

  // 7. Preset population
  window.loadPresetLeaves = function() {
    if (!leavesContainer) return;
    leavesContainer.innerHTML = '';
    
    presetLeaves.forEach(preset => {
      const leaf = createLeafElement(preset.text, preset.cat, preset.x, preset.y, preset.rot);
      leavesContainer.appendChild(leaf);
    });

    updateDashboardLeafCount();
  };

  // 8. Clear board
  window.clearAllLeaves = function() {
    if (confirm('هل أنت متأكد من رغبتك في إفراغ الشجرة بالكامل؟')) {
      if (leavesContainer) leavesContainer.innerHTML = '';
      updateDashboardLeafCount();
    }
  };

  // 9. Update total leaf counts on the dashboard
  function updateDashboardLeafCount() {
    const leafCountEl = document.getElementById('dash-leaf-count');
    if (leafCountEl && leavesContainer) {
      const count = leavesContainer.querySelectorAll('.leaf-node').length;
      leafCountEl.textContent = `${count} أوراق`;
    }
  }

  // 10. Direct PNG Export using HTML2Canvas
  window.exportCanvasAsPNG = function() {
    if (typeof html2canvas === 'undefined') {
      alert('عذراً، جاري تحميل مكتبة التصدير، يرجى المحاولة بعد لحظات...');
      return;
    }

    const deleteBtns = document.querySelectorAll('.delete-leaf-btn');
    deleteBtns.forEach(btn => btn.style.setProperty('display', 'none', 'important'));

    html2canvas(board, {
      scale: 3, // 3x high definition
      useCORS: true,
      backgroundColor: '#FBF9F6',
      logging: false
    }).then(canvas => {
      deleteBtns.forEach(btn => btn.style.removeProperty('display'));
      
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `شجرة-الحياة-خيركم-${activeBoardSize.toUpperCase()}.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (typeof showToastAlert !== 'undefined') {
        showToastAlert('تم تصدير وتحميل لوحة الشجرة كصورة PNG عالية الدقة! 📸✨', 'success');
      }
    }).catch(err => {
      console.error(err);
      alert('حدث خطأ أثناء تصدير الصورة، يرجى المحاولة مجدداً.');
    });
  };

  // 11. Direct PDF Export using jsPDF
  window.exportCanvasAsPDF = function() {
    if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
      alert('عذراً، جاري تحميل مكاتب التصدير، يرجى المحاولة بعد لحظات...');
      return;
    }

    const deleteBtns = document.querySelectorAll('.delete-leaf-btn');
    deleteBtns.forEach(btn => btn.style.setProperty('display', 'none', 'important'));

    html2canvas(board, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#FBF9F6'
    }).then(canvas => {
      deleteBtns.forEach(btn => btn.style.removeProperty('display'));

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const isA2 = activeBoardSize === 'a2';
      const pdfWidth = isA2 ? 420 : 297;
      const pdfHeight = isA2 ? 594 : 420;
      
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: isA2 ? 'a2' : 'a3'
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`شجرة-الحياة-خيركم-${activeBoardSize.toUpperCase()}.pdf`);

      if (typeof showToastAlert !== 'undefined') {
        showToastAlert('تم تصدير وتحميل لوحة الشجرة كملف PDF جاهز للطباعة! 📄✨', 'success');
      }
    }).catch(err => {
      console.error(err);
      alert('حدث خطأ أثناء تصدير ملف PDF.');
    });
  };

  // Initialize with Presets
  loadPresetLeaves();
});
