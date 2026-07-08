// components.js

const Components = {
  init() {
    this.initTabs();
    this.initAccordions();
    this.initDropdowns();
    this.initModals();
  },

  // --- TABS CONTROLLER ---
  initTabs() {
    document.addEventListener('click', (e) => {
      const tabLink = e.target.closest('.tab-link');
      if (!tabLink) return;
      e.preventDefault();

      const tabsHeader = tabLink.closest('.tabs-header');
      if (!tabsHeader) return;

      const tabId = tabLink.getAttribute('data-tab');
      const container = tabsHeader.parentElement;

      // Deactivate all links & panes in this container
      tabsHeader.querySelectorAll('.tab-link').forEach(link => link.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

      // Activate selected
      tabLink.classList.add('active');
      const targetPane = container.querySelector(`.tab-pane[data-pane="${tabId}"]`);
      if (targetPane) targetPane.classList.add('active');
    });

    // Segmented controls (pill tabs)
    document.addEventListener('click', (e) => {
      const segmentItem = e.target.closest('.segment-item');
      if (!segmentItem) return;

      const control = segmentItem.closest('.segmented-control');
      if (!control) return;

      const segmentId = segmentItem.getAttribute('data-segment');
      const parentContainer = control.parentElement;

      control.querySelectorAll('.segment-item').forEach(item => item.classList.remove('active'));
      segmentItem.classList.add('active');

      if (parentContainer) {
        parentContainer.querySelectorAll('.segment-pane').forEach(pane => pane.classList.remove('active'));
        const targetPane = parentContainer.querySelector(`.segment-pane[data-pane="${segmentId}"]`);
        if (targetPane) targetPane.classList.add('active');
      }
    });
  },

  // --- ACCORDION CONTROLLER ---
  initAccordions() {
    document.addEventListener('click', (e) => {
      const header = e.target.closest('.accordion-header');
      if (!header) return;

      const item = header.closest('.accordion-item');
      if (!item) return;

      const isAlreadyActive = item.classList.contains('active');
      const accordionGroup = item.closest('.accordion-group');

      // If grouped, close others
      if (accordionGroup) {
        accordionGroup.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      }

      if (!isAlreadyActive) {
        item.classList.add('active');
      } else if (!accordionGroup) {
        item.classList.remove('active');
      }
    });
  },

  // --- DROPDOWN CONTROLLER ---
  initDropdowns() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.dropdown-trigger');
      const activeDropdowns = document.querySelectorAll('.dropdown-menu.active');

      // Close all active dropdowns unless clicking inside
      activeDropdowns.forEach(menu => {
        if (!e.target.closest('.dropdown-container') || menu.parentElement !== e.target.closest('.dropdown-container')) {
          menu.classList.remove('active');
        }
      });

      if (trigger) {
        const container = trigger.closest('.dropdown-container');
        if (container) {
          const menu = container.querySelector('.dropdown-menu');
          if (menu) {
            menu.classList.toggle('active');
            e.stopPropagation();
          }
        }
      }
    });
  },

  // --- MODAL / DIALOG CONTROLLER ---
  initModals() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-open]')) {
        const modalId = e.target.closest('[data-modal-open]').getAttribute('data-modal-open');
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
      }

      if (e.target.closest('[data-modal-close]') || e.target.classList.contains('modal-overlay')) {
        const openModal = e.target.closest('.modal-overlay');
        if (openModal) openModal.classList.remove('active');
      }
    });
  },

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  },

  // --- TOAST CONTROLLER ---
  showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let icon = '✓';
    if (type === 'danger') icon = '✕';
    if (type === 'warning') icon = '⚠';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="badge badge-${type}" style="width:20px; height:20px; padding:0; display:inline-flex; align-items:center; justify-content:center; border-radius:50%;">${icon}</span>
        <span>${message}</span>
      </div>
      <span style="cursor:pointer; opacity:0.5;" onclick="this.parentElement.remove()">✕</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // --- SVG CHARTS GENERATOR ---
  createSparkline(elementId, data, isArea = true, strokeWidth = 2.5) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = '';
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 150;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;

    // Map data points to SVG coordinates
    const points = data.map((val, index) => {
      const x = (index / (data.length - 1)) * (width - 16) + 8;
      const y = height - ((val - min) / range) * (height - 32) - 16;
      return { x, y };
    });

    const dPath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

    let areaPath = '';
    if (isArea) {
      areaPath = `${dPath} L ${points[points.length - 1].x.toFixed(1)} ${height} L ${points[0].x.toFixed(1)} ${height} Z`;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.overflow = 'visible';

    // Gradients
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="chartGrad-${elementId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--theme-primary)" stop-opacity="0.25"></stop>
        <stop offset="100%" stop-color="var(--theme-primary)" stop-opacity="0.00"></stop>
      </linearGradient>
      <linearGradient id="accentGrad-${elementId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--theme-accent)" stop-opacity="0.25"></stop>
        <stop offset="100%" stop-color="var(--theme-accent)" stop-opacity="0.00"></stop>
      </linearGradient>
    `;
    svg.appendChild(defs);

    // Grid lines
    for (let i = 0; i <= 3; i++) {
      const lineY = 16 + (i * (height - 32)) / 3;
      const grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      grid.setAttribute('x1', '8');
      grid.setAttribute('y1', lineY.toString());
      grid.setAttribute('x2', (width - 8).toString());
      grid.setAttribute('y2', lineY.toString());
      grid.setAttribute('stroke', 'var(--theme-border-color)');
      grid.setAttribute('stroke-width', '1');
      grid.setAttribute('stroke-dasharray', '4 4');
      svg.appendChild(grid);
    }

    if (isArea) {
      const pathArea = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathArea.setAttribute('d', areaPath);
      pathArea.setAttribute('fill', `url(#chartGrad-${elementId})`);
      svg.appendChild(pathArea);
    }

    const pathLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathLine.setAttribute('d', dPath);
    pathLine.setAttribute('fill', 'none');
    pathLine.setAttribute('stroke', 'var(--theme-primary)');
    pathLine.setAttribute('stroke-width', strokeWidth.toString());
    pathLine.setAttribute('stroke-linecap', 'round');
    pathLine.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(pathLine);

    // Dots for hover points
    points.forEach((p, idx) => {
      if (idx === 0 || idx === points.length - 1 || idx % 2 === 0) {
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('cx', p.x.toString());
        dot.setAttribute('cy', p.y.toString());
        dot.setAttribute('r', '4');
        dot.setAttribute('fill', 'var(--theme-card)');
        dot.setAttribute('stroke', 'var(--theme-primary)');
        dot.setAttribute('stroke-width', '2');
        svg.appendChild(dot);
      }
    });

    container.appendChild(svg);
  },

  createBarChart(elementId, labels, data) {
    const container = document.getElementById(elementId);
    if (!container) return;

    container.innerHTML = '';
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 150;

    const max = Math.max(...data);
    const range = max || 1;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    
    const barCount = data.length;
    const gap = 12;
    const padding = 16;
    const barWidth = (width - padding * 2 - gap * (barCount - 1)) / barCount;

    data.forEach((val, idx) => {
      const barHeight = ((val / range) * (height - 40));
      const x = padding + idx * (barWidth + gap);
      const y = height - barHeight - 20;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x.toString());
      rect.setAttribute('y', y.toString());
      rect.setAttribute('width', barWidth.toString());
      rect.setAttribute('height', barHeight.toString());
      rect.setAttribute('rx', '4');
      rect.setAttribute('fill', 'var(--theme-primary)');
      rect.style.opacity = '0.85';
      rect.style.transition = 'all var(--transition-fast)';

      rect.addEventListener('mouseenter', () => {
        rect.style.opacity = '1';
        rect.setAttribute('fill', 'var(--theme-accent)');
      });
      rect.addEventListener('mouseleave', () => {
        rect.style.opacity = '0.85';
        rect.setAttribute('fill', 'var(--theme-primary)');
      });

      svg.appendChild(rect);

      // Label
      const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      txt.setAttribute('x', (x + barWidth / 2).toString());
      txt.setAttribute('y', (height - 4).toString());
      txt.setAttribute('text-anchor', 'middle');
      txt.setAttribute('fill', 'var(--theme-text-muted)');
      txt.setAttribute('font-size', '10');
      txt.setAttribute('font-weight', '600');
      txt.textContent = labels[idx];
      svg.appendChild(txt);
    });

    container.appendChild(svg);
  }
};

window.Components = Components;
document.addEventListener('DOMContentLoaded', () => Components.init());
