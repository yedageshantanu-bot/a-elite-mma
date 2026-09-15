/**
 * A Elite MMA & Fitness Club - Interactive Logic
 * Location: Malkapur, Karad | Phone: +91 80102 73638
 * Official Crest, UFC-Level Training & 12-Hour Daily Gym
 */

const GYM_WHATSAPP_NUMBER = '918010273638';

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initWhatsAppFunnel();
  initScheduleTabs();
  initGalleryFilterAndLightbox();
  initCombatCalculator();
  initVideoPlayerDefaults();
  initFaqAccordion();
});

/* ==========================================================================
   1. STICKY HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.drawer-link');

  if (!drawer) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => drawer.classList.add('active'));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('active'));
  }

  links.forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('active'));
  });
}

/* ==========================================================================
   3. AUTOMATED WHATSAPP VIP TRIAL FUNNEL
   Direct pre-filled lead capture routing into +91 80102 73638
   ========================================================================== */
function initWhatsAppFunnel() {
  const modal = document.getElementById('bookingModal');
  const openButtons = document.querySelectorAll('.open-booking-modal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('trialBookingForm');

  if (!modal) return;

  // Open modal triggers
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const discipline = btn.getAttribute('data-discipline');
      if (discipline) {
        const select = document.getElementById('modalDisciplineSelect');
        if (select) select.value = discipline;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Form submission -> Redirect to WhatsApp with structured message
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('leadName').value.trim();
      const phone = document.getElementById('leadPhone').value.trim();
      const discipline = document.getElementById('modalDisciplineSelect').value;
      const timeSlot = document.getElementById('leadTimeSlot').value;

      if (!name || !phone) {
        alert('Please fill in your name and WhatsApp contact number.');
        return;
      }

      // Format WhatsApp lead message
      const message = `*FREE VIP TRIAL PASS CLAIM - A ELITE MMA & FITNESS CLUB*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Contact:* ${encodeURIComponent(phone)}%0A` +
        `*Discipline Interested:* ${encodeURIComponent(discipline)}%0A` +
        `*Preferred Time Slot:* ${encodeURIComponent(timeSlot)}%0A` +
        `*Location:* Malkapur, Karad (Opp. DSP City, Near D-Mart)%0A%0A` +
        `Coach, please confirm my 1-Day VIP Trial session!`;

      const whatsappUrl = `https://wa.me/${GYM_WHATSAPP_NUMBER}?text=${message}`;

      window.open(whatsappUrl, '_blank');
      closeModal();
      form.reset();
    });
  }
}

/* Helper to launch pre-filled WhatsApp link directly from any button */
window.bookOnWhatsApp = function(disciplineName = 'VIP 1-Day Trial Pass') {
  const message = `*A ELITE MMA & FITNESS CLUB (MALKAPUR)*%0A%0A` +
    `Hello Coach! I want to book a *${encodeURIComponent(disciplineName)}*.%0A` +
    `Please share class timings and availability for this week. Thank you!`;
  window.open(`https://wa.me/${GYM_WHATSAPP_NUMBER}?text=${message}`, '_blank');
};

/* ==========================================================================
   4. ACTION REEL VIDEO CONTROLLER (TRAINING VIDEO 1 & 2)
   ========================================================================== */
let currentVideoIndex = 1;

function initVideoPlayerDefaults() {
  const player = document.getElementById('mainVideoPlayer');
  if (!player) return;

  player.addEventListener('play', () => updatePlayPauseUI(true));
  player.addEventListener('pause', () => updatePlayPauseUI(false));
}

window.switchVideo = function(videoNum) {
  const player = document.getElementById('mainVideoPlayer');
  const tab1 = document.getElementById('videoTab1');
  const tab2 = document.getElementById('videoTab2');
  const titleBadge = document.getElementById('videoTitleBadge');
  if (!player) return;

  currentVideoIndex = videoNum;
  if (videoNum === 1) {
    if (tab1) tab1.classList.add('active');
    if (tab2) tab2.classList.remove('active');
    if (titleBadge) titleBadge.textContent = 'Striking & Thai Pad Combos';
    player.src = 'assets/client/training-video-1.mp4';
  } else {
    if (tab1) tab1.classList.remove('active');
    if (tab2) tab2.classList.add('active');
    if (titleBadge) titleBadge.textContent = 'Sparring & Fight Conditioning';
    player.src = 'assets/client/training-video-2.mp4';
  }

  player.load();
  player.play().then(() => {
    updatePlayPauseUI(true);
  }).catch(() => {
    updatePlayPauseUI(false);
  });
};

window.togglePlayPause = function() {
  const player = document.getElementById('mainVideoPlayer');
  if (!player) return;

  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
};

function updatePlayPauseUI(isPlaying) {
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const playPauseText = document.getElementById('playPauseText');
  if (isPlaying) {
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'block';
    if (playPauseText) playPauseText.textContent = 'Pause';
  } else {
    if (playIcon) playIcon.style.display = 'block';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (playPauseText) playPauseText.textContent = 'Play';
  }
}

window.toggleMute = function() {
  const player = document.getElementById('mainVideoPlayer');
  const muteText = document.getElementById('muteText');
  if (!player) return;

  player.muted = !player.muted;
  if (muteText) {
    muteText.textContent = player.muted ? 'Unmute Sound' : 'Mute Sound';
  }
};

/* ==========================================================================
   5. OFFICIAL BATCH SCHEDULE MATRIX (FROM CLIENT POSTER)
   Official Timings:
   - Morning Batch: 07:15 AM – 09:00 AM
   - Kids Batch (Under 14): 06:00 PM – 07:00 PM
   - Evening Batch: 07:15 PM – 09:00 PM
   - Open Gym & Iron: 06:00 AM – 10:00 PM
   ========================================================================== */
const scheduleData = {
  all: [
    { time: '06:00 AM - 10:00 AM', program: 'Morning Open Gym & Free Weights', type: 'Strength', typeClass: 'strength', coach: 'Gym Floor Mentors' },
    { time: '07:15 AM - 09:00 AM', program: 'Morning MMA & Striking Batch', type: 'Striking', typeClass: '', coach: 'Head Coach & Striking Specialist' },
    { time: '10:00 AM - 04:00 PM', program: 'Open Mat, Bag Work & Hypertrophy Split', type: 'Open Gym', typeClass: 'open24', coach: 'Coach On Duty' },
    { time: '05:00 PM - 06:00 PM', program: 'Female Batch: Self-Defense & Conditioning', type: 'Striking', typeClass: '', coach: 'Senior Combat Coach' },
    { time: '06:00 PM - 07:00 PM', program: 'Kids Batch (Under 14): MMA & Agility', type: 'Striking', typeClass: '', coach: 'Grassroots Coach' },
    { time: '07:15 PM - 09:00 PM', program: 'Evening Pro MMA, BJJ & Wrestling Batch', type: 'Grappling', typeClass: 'grappling', coach: 'Head Coach & BJJ Specialist' },
    { time: '09:00 PM - 10:00 PM', program: 'Heavy Iron, Core & Cooldown Sparring', type: 'Strength', typeClass: 'strength', coach: 'Strength Mentor' }
  ],
  striking: [
    { time: '07:15 AM - 09:00 AM', program: 'Morning MMA & Striking Batch', type: 'Striking', typeClass: '', coach: 'Head Coach' },
    { time: '05:00 PM - 06:00 PM', program: 'Female Batch: Self-Defense & Striking', type: 'Striking', typeClass: '', coach: 'Senior Combat Coach' },
    { time: '06:00 PM - 07:00 PM', program: 'Kids Batch (Under 14): Boxing & Kicks', type: 'Striking', typeClass: '', coach: 'Grassroots Coach' },
    { time: '07:15 PM - 09:00 PM', program: 'Evening Pro Striking & Octagon Sparring', type: 'Striking', typeClass: '', coach: 'Head Coach' }
  ],
  grappling: [
    { time: '07:15 AM - 09:00 AM', program: 'Morning Wrestling Takedowns & Cage Control', type: 'Grappling', typeClass: 'grappling', coach: 'Wrestling Specialist' },
    { time: '07:15 PM - 09:00 PM', program: 'Evening BJJ Submissions & Ground Control', type: 'Grappling', typeClass: 'grappling', coach: 'BJJ Purple Belt Coach' }
  ],
  open24: [
    { time: '06:00 AM - 10:00 AM', program: 'Morning Heavy Iron & Power Racks', type: 'Strength', typeClass: 'strength', coach: 'Strength Mentor' },
    { time: '10:00 AM - 04:00 PM', program: 'Mid-Day Cardio, Turf & Free Weights', type: 'Open Gym', typeClass: 'open24', coach: 'Floor Supervisor' },
    { time: '05:00 PM - 10:00 PM', program: 'Evening Strength & Conditioning Split', type: 'Strength', typeClass: 'strength', coach: 'Strength Coach' }
  ]
};

function initScheduleTabs() {
  const buttons = document.querySelectorAll('.schedule-tab-btn');
  const tbody = document.getElementById('scheduleTableBody');
  if (!tbody) return;

  function renderRows(filterKey) {
    const list = scheduleData[filterKey] || scheduleData.all;
    tbody.innerHTML = list.map(item => `
      <tr>
        <td>
          <span class="schedule-time-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${item.time}
          </span>
        </td>
        <td><strong>${item.program}</strong></td>
        <td><span class="schedule-discipline-tag ${item.typeClass}">${item.type}</span></td>
        <td style="color: #94A3B8;">${item.coach}</td>
        <td>
          <button onclick="bookOnWhatsApp('${item.program}')" class="btn btn-primary btn-sm">
            Book Slot
          </button>
        </td>
      </tr>
    `).join('');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderRows(filter);
    });
  });

  // Initial render
  renderRows('all');
}

/* ==========================================================================
   6. OFFICIAL FEES STRUCTURE & BILLING DURATION SWITCHER (FROM CLIENT POSTER)
   Rates:
   - Monthly: Pro ₹2,000 | Female ₹1,500 | Kids ₹1,000
   - Quarterly (3M): Pro ₹4,500 (Save ₹1,500) | Female ₹3,800 | Kids ₹2,400
   - Half-Yearly (6M): Pro ₹9,000 (Save ₹3,000) | Female ₹7,500 | Kids ₹4,500
   ========================================================================== */
let currentPricingCycle = 'monthly';

const pricingRates = {
  monthly: {
    period: '/ month',
    pro: '2,000',
    female: '1,500',
    kids: '1,000',
    label: 'Monthly Pass'
  },
  quarterly: {
    period: '/ 3 months',
    pro: '4,500',
    female: '3,800',
    kids: '2,400',
    label: '3 Months (Quarterly)'
  },
  halfyearly: {
    period: '/ 6 months',
    pro: '9,000',
    female: '7,500',
    kids: '4,500',
    label: '6 Months (Half-Yearly)'
  }
};

window.setPricingCycle = function(cycle) {
  if (!pricingRates[cycle]) return;
  currentPricingCycle = cycle;

  // Toggle active class on duration buttons
  const buttons = document.querySelectorAll('.pricing-cycle-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-cycle') === cycle) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const rate = pricingRates[cycle];
  const proElem = document.getElementById('pricePro');
  const femaleElem = document.getElementById('priceFemale');
  const kidsElem = document.getElementById('priceKids');

  const periodPro = document.getElementById('periodPro');
  const periodFemale = document.getElementById('periodFemale');
  const periodKids = document.getElementById('periodKids');

  if (proElem) proElem.textContent = rate.pro;
  if (femaleElem) femaleElem.textContent = rate.female;
  if (kidsElem) kidsElem.textContent = rate.kids;

  if (periodPro) periodPro.textContent = rate.period;
  if (periodFemale) periodFemale.textContent = rate.period;
  if (periodKids) periodKids.textContent = rate.period;
};

window.bookBatchOnWhatsApp = function(batchName) {
  const rate = pricingRates[currentPricingCycle];
  let price = '';
  if (batchName.toUpperCase().includes('PRO')) price = `₹${rate.pro}`;
  else if (batchName.toUpperCase().includes('FEMALE')) price = `₹${rate.female}`;
  else if (batchName.toUpperCase().includes('KIDS')) price = `₹${rate.kids}`;

  const message = `*MEMBERSHIP ADMISSION ENQUIRY - A ELITE MMA & FITNESS CLUB*%0A%0A` +
    `Hello Coach! I want to join the *${encodeURIComponent(batchName)}*.%0A` +
    `*Selected Plan:* ${encodeURIComponent(rate.label)} (${price} ${encodeURIComponent(rate.period)})%0A` +
    `*Gym Location:* Opp. DSP City, Bharat College Rd, Malkapur, Karad%0A%0A` +
    `Please share the admission process and slot availability. Thank you!`;

  window.open(`https://wa.me/${GYM_WHATSAPP_NUMBER}?text=${message}`, '_blank');
};

/* ==========================================================================
   7. DYNAMIC GALLERY & FULLSCREEN LIGHTBOX
   ========================================================================== */
window.openLightbox = function(imgSrc, title = 'A Elite MMA & Fitness Club', tag = 'Malkapur, Karad') {
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalCaption = document.getElementById('lightboxCaption');
  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  if (modalCaption) {
    modalCaption.textContent = `${title} — ${tag}`;
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const items = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');

  if (!modal) return;

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      items.forEach(item => {
        const catAttr = item.getAttribute('data-category') || '';
        const catList = catAttr.split(' ');
        if (cat === 'all' || catList.includes(cat) || catAttr === cat) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', window.closeLightbox);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) window.closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      window.closeLightbox();
    }
  });
}

/* ==========================================================================
   8. INTERACTIVE COMBAT FITNESS & BMI CALCULATOR
   ========================================================================== */
function initCombatCalculator() {
  const calcBtn = document.getElementById('calcSubmitBtn');
  if (!calcBtn) return;

  calcBtn.addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('calcWeight').value);
    const heightCm = parseFloat(document.getElementById('calcHeight').value);
    const goal = document.getElementById('calcGoal').value;

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
      alert('Please enter valid positive numbers for Weight and Height.');
      return;
    }

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    let category = '';
    let recommendation = '';
    let discipline = 'Mixed Martial Arts (MMA)';

    if (bmi < 18.5) {
      category = 'Lean / Underweight';
      recommendation = 'Focus on Hypertrophy Strength Training + High-Protein nutrition + Fundamental Boxing power building.';
      discipline = 'Strength & Conditioning + Boxing';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Ideal Athletic Conditioning';
      recommendation = 'Prime combat zone! You are ready for high-intensity Pro MMA, BJJ Grappling submissions, and speed kickboxing.';
      discipline = 'MMA & BJJ Grappling';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Bulked / Overweight';
      recommendation = 'Cardio-striking focus: Heavy Thai padwork, calorie-torching Kickboxing, and functional circuit workouts.';
      discipline = 'Kickboxing & Muay Thai';
    } else {
      category = 'Heavyweight / High Body Fat';
      recommendation = 'Aggressive fat-melt circuit: High-repetition combat conditioning, boxing mitts, and dynamic cardio split.';
      discipline = 'Boxing + Strength & Gym';
    }

    document.getElementById('calcScoreDisplay').textContent = bmi;
    document.getElementById('calcCategoryDisplay').textContent = category;
    document.getElementById('calcSuggestionDisplay').innerHTML = `
      <strong>Goal: ${goal}</strong><br/>
      ${recommendation}<br/>
      <span style="color: #00A8FF; font-weight: 700; margin-top: 6px; display: inline-block;">Recommended: ${discipline}</span>
    `;

    const ctaBtn = document.getElementById('calcWhatsAppBtn');
    if (ctaBtn) {
      ctaBtn.style.display = 'inline-flex';
      ctaBtn.onclick = () => {
        bookOnWhatsApp(`BMI (${bmi}) Fitness Plan: ${discipline}`);
      };
    }
  });
}

/* ==========================================================================
   9. LOCAL SEO FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

