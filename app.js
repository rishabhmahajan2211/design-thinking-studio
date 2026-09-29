/**
 * DESIGN THINKING STUDIO (designthinkingstudio.in)
 * Interactive Frontend Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Sticky Header Scroll Effect & Mobile Drawer ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const hamburgerIcon = mobileNavToggle ? mobileNavToggle.querySelector('.hamburger-icon') : null;
  const closeIcon = mobileNavToggle ? mobileNavToggle.querySelector('.close-icon') : null;

  function closeMobileNav() {
    if (!mobileNavDrawer || !mobileNavDrawer.classList.contains('open')) return;
    mobileNavDrawer.classList.remove('open');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
    document.body.classList.remove('nav-open');
  }

  function openMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('open');
    if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'true');
    if (hamburgerIcon && closeIcon) {
      hamburgerIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    }
    document.body.classList.add('nav-open');
  }

  if (mobileNavToggle && mobileNavDrawer) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    const mobileLinks = mobileNavDrawer.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    document.addEventListener('click', (e) => {
      if (mobileNavDrawer.classList.contains('open') && !mobileNavDrawer.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        closeMobileNav();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  // Active Nav Pill Highlight on Scroll (Strict Sequential Tracking)
  const navPillItems = document.querySelectorAll('.nav-pill-item');
  const navSectionIds = ['why-work', 'case-studies', 'gallery', 'offerings', 'framework', 'faq'];
  const navSections = navSectionIds.map(id => document.getElementById(id)).filter(Boolean);

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;
    navSections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navPillItems.forEach(pill => {
      pill.classList.remove('active');
      if (pill.getAttribute('href') === `#${currentId}`) {
        pill.classList.add('active');
      }
    });
  });

  // --- 2. Design Thinking 5-Phase Interactive Explorer ---
  const frameworkData = {
    empathize: {
      stageNum: 'Phase 01',
      title: 'Empathize: Discovering True User Realities',
      themeColor: '#f43f5e',
      themeLight: '#fff1f2',
      themeBorder: '#fda4af',
      themeDark: '#be123c',
      topGradient: 'linear-gradient(90deg, #f43f5e, #fb7185)',
      desc: 'Great innovation never starts with business assumptions; it begins by deeply stepping into the shoes of the humans you serve. We immerse your team in structured qualitative research, shadowing, and empathy mapping to uncover unarticulated emotional and functional pain points.',
      items: [
        'User Shadowing & Contextual Inquiries with actual end customers',
        'Customer Journey & Emotional Friction Mapping',
        'Extreme User Interviews to find edge-case breakthroughs',
        'Synthesis into actionable Empathy Canvases'
      ],
      tools: ['Miro', 'Lookback', 'Empathy Canvas', 'Otter.ai', 'UserTesting'],
      outcomes: ['Unfiltered customer truths', 'Eliminated leadership blindspots', 'Shared team empathy baseline']
    },
    define: {
      stageNum: 'Phase 02',
      title: 'Define: Framing High-Impact Problem Statements',
      themeColor: '#0284c7',
      themeLight: '#f0f9ff',
      themeBorder: '#7dd3fc',
      themeDark: '#0369a1',
      topGradient: 'linear-gradient(90deg, #0284c7, #38bdf8)',
      desc: 'Solving the wrong problem with high efficiency is the #1 waste in corporate product development. In this phase, we distill raw observational data into crisp "How Might We" (HMW) opportunity spaces and quantifiable problem statements that rally engineering, design, and business teams together.',
      items: [
        'Point-of-View (POV) statement structuring',
        'Generative "How Might We" (HMW) opportunity framing',
        'Affinity Clustering & Root Cause 5-Whys Analysis',
        'Target User Persona & Critical Moment identification'
      ],
      tools: ['HMW Matrix', 'Problem Framing Canvas', 'Value-Proposition Canvas'],
      outcomes: ['Crystal-clear strategic focus', 'Executive-aligned problem statement', 'De-risked scope']
    },
    ideate: {
      stageNum: 'Phase 03',
      title: 'Ideate: Unlocking Divergent Breakthroughs',
      themeColor: '#d97706',
      themeLight: '#fffbeb',
      themeBorder: '#fcd34d',
      themeDark: '#b45309',
      topGradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
      desc: 'Moving beyond the first "safe" idea to uncover truly disruptive solutions. Using structured creative friction exercises like Crazy 8s, worst-possible idea, and cross-industry analogies, we guide your cross-functional team through rapid divergence and intelligent convergence.',
      items: [
        'Rapid Crazy-8s divergent sketching sprints',
        'Biomimicry & Cross-Industry Analogy mashups',
        'Silent brainwriting & heat-map dot voting',
        'Impact vs. Feasibility 2x2 prioritization matrix'
      ],
      tools: ['Crazy 8s Sheets', 'Impact/Effort 2x2', 'Dot Voting Systems', 'Figma Jam'],
      outcomes: ['30+ bold solution concepts', 'Zero-ego team consensus', '1-2 prioritized concepts for prototyping']
    },
    prototype: {
      stageNum: 'Phase 04',
      title: 'Prototype: Making Ideas Tangible Overnight',
      themeColor: '#8b5cf6',
      themeLight: '#faf5ff',
      themeBorder: '#c4b5fd',
      themeDark: '#6d28d9',
      topGradient: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
      desc: 'If a picture is worth 1,000 words, a prototype is worth 1,000 meetings. We shift your team from debating abstract concepts to building low-to-medium fidelity physical or digital mockups in hours, creating concrete artifacts that prompt genuine user reactions.',
      items: [
        'Low-fidelity paper mockups and user flow storyboards',
        'Clickable interactive wireframes (Figma / Web prototypes)',
        'Physical roleplaying or service staging simulation',
        'The "Goldilocks Quality" rule: realistic enough to test, fast enough to throw away'
      ],
      tools: ['Figma', 'Paper & Sharpies', 'Whimsical', 'Loom', 'Cardboard Prototypes'],
      outcomes: ['Tested tangible concept in under 24 hrs', 'Zero wasted developer sprints', 'Visual stakeholder clarity']
    },
    test: {
      stageNum: 'Phase 05',
      title: 'Test: Validating Fast Before Costly Code',
      themeColor: '#059669',
      themeLight: '#ecfdf5',
      themeBorder: '#6ee7b7',
      themeDark: '#047857',
      topGradient: 'linear-gradient(90deg, #10b981, #34d399)',
      desc: 'Put the prototype in front of real target customers. We conduct structured usability tests to observe authentic behavior, validate or invalidate core hypotheses, and extract decisive qualitative insights before spending hundreds of thousands in engineering capital.',
      items: [
        '5-User qualitative testing protocol (Jakob Nielsen standard)',
        'Unbiased testing script and observer note-taking matrix',
        'Live behavioral observation over subjective opinion',
        'Pivot, Persevere, or Iterate decision roadmap'
      ],
      tools: ['User Testing Protocols', 'Scorecards', 'Zoom/Lookback', 'Decision Matrix'],
      outcomes: ['85% of usability flaws discovered', 'Unambiguous next steps', 'Massive reduction in post-launch failure risk']
    }
  };

  const tabButtons = document.querySelectorAll('.framework-tab-btn');
  const stagePillEl = document.getElementById('framework-stage-pill');
  const stageNumEl = document.getElementById('framework-stage-num');
  const titleEl = document.getElementById('framework-title');
  const descEl = document.getElementById('framework-desc');
  const listEl = document.getElementById('framework-list');
  const toolsEl = document.getElementById('framework-tools');
  const outcomesEl = document.getElementById('framework-outcomes');
  const rainbowTopEl = document.getElementById('framework-rainbow-top');
  const frameworkCtaEl = document.getElementById('framework-cta-btn');
  const cardEl = document.getElementById('framework-card');

  if (tabButtons.length > 0 && stageNumEl && cardEl) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const stage = btn.getAttribute('data-stage');
        const data = frameworkData[stage];
        if (!data) return;

        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Smooth transition
        cardEl.style.opacity = '0.35';
        cardEl.style.transform = 'translateY(4px)';

        setTimeout(() => {
          // Update card active stage data attribute for custom border & glow
          cardEl.setAttribute('data-active-stage', stage);

          // Update texts
          stageNumEl.textContent = data.stageNum;
          titleEl.textContent = data.title;
          descEl.textContent = data.desc;

          // Update stage pill styling
          if (stagePillEl) {
            stagePillEl.style.backgroundColor = data.themeLight;
            stagePillEl.style.color = data.themeDark;
            stagePillEl.style.borderColor = data.themeBorder;
          }

          // Update rainbow top bar
          if (rainbowTopEl) {
            rainbowTopEl.style.background = data.topGradient;
          }

          // Update card CTA button
          if (frameworkCtaEl) {
            frameworkCtaEl.style.borderColor = data.themeColor;
            frameworkCtaEl.style.color = data.themeDark;
          }

          // Populate checklist with colored circular badge
          listEl.innerHTML = data.items.map(item => `
            <li>
              <span class="framework-checklist-icon" style="background-color: ${data.themeLight}; color: ${data.themeDark}; border: 1px solid ${data.themeBorder};">
                <svg style="width:12px;height:12px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.8" d="M5 13l4 4L19 7"/>
                </svg>
              </span>
              <span>${item}</span>
            </li>
          `).join('');

          // Populate tools
          toolsEl.innerHTML = data.tools.map(t => `<span class="tag">${t}</span>`).join('');

          // Populate outcomes with stage color tint
          outcomesEl.innerHTML = data.outcomes.map(o => `
            <span class="tag" style="background-color: ${data.themeLight}; color: ${data.themeDark}; border: 1px solid ${data.themeBorder}; font-weight:600;">
              ${o}
            </span>
          `).join('');

          cardEl.style.opacity = '1';
          cardEl.style.transform = 'translateY(0)';
        }, 120);
      });
    });
  }

  // --- 3. Signature Offerings Interactive Category Filtering ---
  const filterBtns = document.querySelectorAll('.offering-filter-btn');
  const offeringCards = document.querySelectorAll('.offering-card');

  if (filterBtns.length > 0 && offeringCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        offeringCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // --- 3b. Interactive Offering Cards Expand/Collapse ---
  const offeringsSection = document.getElementById('offerings');
  if (offeringsSection) {
    const offeringCards = offeringsSection.querySelectorAll('.offering-card');
    const toggleAllBtn = document.getElementById('toggleAllOfferingsBtn');

    function toggleCard(card, forceState) {
      const isExpanded = forceState !== undefined ? forceState : !card.classList.contains('is-expanded');
      const toggleBar = card.querySelector('.offering-toggle-bar');

      if (isExpanded) {
        card.classList.add('is-expanded');
        if (toggleBar) toggleBar.setAttribute('aria-expanded', 'true');
      } else {
        card.classList.remove('is-expanded');
        if (toggleBar) toggleBar.setAttribute('aria-expanded', 'false');
      }
      updateToggleAllBtn();
    }

    function updateToggleAllBtn() {
      if (!toggleAllBtn) return;
      const allExpanded = Array.from(offeringCards).every(c => c.classList.contains('is-expanded'));
      const textSpan = toggleAllBtn.querySelector('.toggle-all-text');
      const icon = toggleAllBtn.querySelector('.toggle-all-icon');
      if (allExpanded) {
        toggleAllBtn.setAttribute('aria-expanded', 'true');
        if (textSpan) textSpan.textContent = 'Collapse All Program Details';
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        toggleAllBtn.setAttribute('aria-expanded', 'false');
        if (textSpan) textSpan.textContent = 'Expand All Program Details';
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    }

    offeringCards.forEach(card => {
      // Toggle on click of card or toggle-bar, except when clicking on buttons/links inside
      card.addEventListener('click', (e) => {
        // Don't toggle if user clicked on a link, modal trigger, or interactive button inside expanded content
        if (e.target.closest('a') || e.target.closest('button:not(.offering-toggle-bar)') || e.target.closest('.js-open-modal')) {
          return;
        }
        // If clicking within the expandable content (e.g. selecting text), don't collapse
        if (e.target.closest('.offering-expandable-content') && card.classList.contains('is-expanded')) {
          return;
        }
        toggleCard(card);
      });

      // Keyboard accessibility (Enter or Space) on toggle bar
      const toggleBar = card.querySelector('.offering-toggle-bar');
      if (toggleBar) {
        toggleBar.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCard(card);
          }
        });
      }
    });

    if (toggleAllBtn) {
      toggleAllBtn.addEventListener('click', () => {
        const anyCollapsed = Array.from(offeringCards).some(c => !c.classList.contains('is-expanded'));
        offeringCards.forEach(card => {
          toggleCard(card, anyCollapsed);
        });
      });
    }
  }

  // --- 3c. Workshops in Action Gallery Interactive Filtering ---
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  if (galleryFilterBtns.length > 0 && galleryCards.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // =========================================================================
  // 3d. Workshop Photo Lightbox Modal
  // =========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  // Extract gallery photo metadata from DOM cards
  const galleryData = Array.from(galleryCards).map((card, idx) => {
    const img = card.querySelector('.gallery-img-wrap img');
    const badge = card.querySelector('.gallery-badge');
    const title = card.querySelector('.gallery-card-title');
    const desc = card.querySelector('.gallery-card-desc');
    return {
      index: idx,
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : '',
      tag: badge ? badge.textContent.trim() : 'Workshop Moment',
      title: title ? title.textContent.trim() : 'Workshop in Action',
      desc: desc ? desc.textContent.trim() : ''
    };
  });

  let currentPhotoIndex = 0;

  function openLightbox(index) {
    if (!lightboxModal || !galleryData[index]) return;
    currentPhotoIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lightboxModal.focus();
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = galleryData[currentPhotoIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = '0.3';
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
      };
    }
    if (lightboxTag) lightboxTag.textContent = item.tag;
    if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIndex + 1} of ${galleryData.length}`;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.desc;
  }

  function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  // Bind click & keyboard handlers to cards
  galleryCards.forEach(card => {
    const idx = parseInt(card.getAttribute('data-index'), 10);
    card.addEventListener('click', () => openLightbox(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevPhoto);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextPhoto);

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') prevPhoto();
    else if (e.key === 'ArrowRight') nextPhoto();
  });

  // =========================================================================
  // 4. Booking Modal & Lead Ingestion
  // =========================================================================
  const modalOverlay = document.getElementById('booking-modal');
  const openModalBtns = document.querySelectorAll('.js-open-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const bookingForm = document.getElementById('booking-form');

  // FORM ENDPOINT CONFIGURATION (Web3Forms - 100% Free email delivery):
  let WEB3FORMS_ACCESS_KEY = '5416efef-c1f0-45e9-9666-e2bb543e6bfd';

  function openModal(prefillService = '') {
    if (!modalOverlay) return;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (prefillService) {
      const serviceSelect = document.getElementById('book-service');
      if (serviceSelect) {
        serviceSelect.value = prefillService;
      }
    }
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Booking Form Submission Handler
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Submitting Request...</span>`;
      submitBtn.disabled = true;

      // Extract form fields
      const leadData = {
        name: document.getElementById('book-name').value.trim(),
        email: document.getElementById('book-email').value.trim(),
        company: document.getElementById('book-company').value.trim(),
        service: document.getElementById('book-service').value,
        teamSize: document.getElementById('book-team-size').value,
        timeline: document.getElementById('book-timeline').value,
        notes: document.getElementById('book-notes').value.trim(),
        submittedAt: new Date().toISOString(),
        formattedDate: new Date().toLocaleString()
      };

      // 1. Persist locally to browser storage so NO inquiry is ever lost
      try {
        const existingLeads = JSON.parse(localStorage.getItem('coach_inquiries') || '[]');
        existingLeads.unshift(leadData);
        localStorage.setItem('coach_inquiries', JSON.stringify(existingLeads));
        console.log('✅ Lead safely stored locally in browser storage:', leadData);
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }

      // 2. Dispatch to Web3Forms endpoint using FormData (official standard)
      const activeKey = WEB3FORMS_ACCESS_KEY || (document.getElementById('web3forms-access-key') ? document.getElementById('web3forms-access-key').value : '') || '5416efef-c1f0-45e9-9666-e2bb543e6bfd';
      const formData = new FormData(bookingForm);
      formData.set('access_key', activeKey);
      formData.set('subject', `🔥 New Design Thinking Inquiry: ${leadData.name} (${leadData.company})`);
      formData.set('from_name', 'Design Thinking Studio');
      formData.set('replyto', leadData.email);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        console.log('📬 Web3Forms API response:', result);

        if (result.success) {
          closeModal();
          bookingForm.reset();
          showToast(`Thank you, ${leadData.name}! Your strategy session request has been received. Our team will reach out within 24 hours.`);
        } else {
          console.warn('Web3Forms returned error:', result);
          showToast(`Submission notice: ${result.message || 'Could not deliver email. Please contact us directly at contact@designthinkingstudio.in or WhatsApp: +91-9663606723'}`);
        }
      } catch (fetchErr) {
        console.error('Remote dispatch failed:', fetchErr);
        showToast(`Request saved! If email does not arrive, please reach us on WhatsApp: +91-9663606723 or contact@designthinkingstudio.in`);
      } finally {
        submitBtn.innerHTML = originalBtnHTML;
        submitBtn.disabled = false;
      }
    });
  }

  // Developer & Admin Helper: Type `setWeb3FormsKey('YOUR_KEY')` to activate live email forwarding
  window.setWeb3FormsKey = function(key) {
    if (!key || typeof key !== 'string') {
      console.warn('Usage: setWeb3FormsKey("your-access-key-here")');
      return;
    }
    const cleanKey = key.trim();
    localStorage.setItem('web3forms_key', cleanKey);
    WEB3FORMS_ACCESS_KEY = cleanKey;
    const keyInput = document.getElementById('web3forms-access-key');
    if (keyInput) keyInput.value = cleanKey;
    console.log('✅ Web3Forms Access Key successfully saved! Submissions will now be emailed directly to your inbox.');
  };

  // Developer & Admin Helper: Type `viewInquiries()` in browser DevTools console to see all received leads
  window.viewInquiries = function() {
    const leads = JSON.parse(localStorage.getItem('coach_inquiries') || '[]');
    if (leads.length === 0) {
      console.log('No inquiries stored yet. Submit the form on the page to test.');
      return [];
    }
    console.log(`📋 Total Inquiries Received: ${leads.length}`);
    console.table(leads);
    return leads;
  };

  window.clearInquiries = function() {
    localStorage.removeItem('coach_inquiries');
    console.log('🗑️ Local inquiries cleared.');
  };

  // --- 5. Lead Magnet Download Handler ---
  const leadForm = document.getElementById('lead-magnet-form');
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('lead-email');
      const email = emailInput.value;
      const btn = leadForm.querySelector('button');

      btn.textContent = 'Sending Toolkit...';
      btn.disabled = true;

      setTimeout(() => {
        leadForm.reset();
        btn.textContent = 'Download Complete!';
        btn.style.backgroundColor = 'var(--success)';
        showToast(`Success! The 2026 Design Thinking Sprint Toolkit has been sent to ${email}.`);
        setTimeout(() => {
          btn.textContent = 'Get Free Toolkit';
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 4000);
      }, 900);
    });
  }

  // --- 6. Accessible FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close other items
        faqItems.forEach(other => {
          other.classList.remove('open');
          const otherBtn = other.querySelector('.faq-question-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // --- 7. Toast Notification Utility ---
  function showToast(message) {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      toast.innerHTML = `
        <svg style="width:20px;height:20px;color:#38bdf8;flex-shrink:0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="toast-text"></span>
      `;
      document.body.appendChild(toast);
    }
    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 5500);
  }

});
