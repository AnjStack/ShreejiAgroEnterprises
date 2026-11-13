/**
 * SHREEJI AGRO ENTERPRISES - MAIN APPLICATION SCRIPT
 * Features: Scroll Reveal, Mandi Ticker, GST Calculator & Invoice Suite,
 * Crop Specs Lightbox, Hindi/English Toggle, Live Rates Filter.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initLanguageToggle();
  initRatesFilter();
  initGstCalculator();
  initGstInvoiceGenerator();
  initCropModal();
  initPosterModal();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggleBtn.innerHTML = '☰';
      });
    });
  }

  // Active section highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        links.forEach(l => l.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. SCROLL REVEAL & NUMBER COUNTERS
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // Stat Counter Animation
  const counters = document.querySelectorAll('.counter-val');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target.toLocaleString('en-IN');
              clearInterval(timer);
            } else {
              counter.innerText = Math.floor(current).toLocaleString('en-IN');
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.5 });

  const statSection = document.querySelector('.hero-stat-row');
  if (statSection) countObserver.observe(statSection);
}

/* ==========================================================================
   3. LANGUAGE TOGGLE (HINDI / ENGLISH)
   ========================================================================== */
const translations = {
  en: {
    heroTitle: "Reliable Trade & Best Market Rates for Every Harvest",
    heroSubtitle: "Behtar Daam • Vishwasniya Vyapar • Aapke Saath Hamesha",
    heroDesc: "Shreeji Agro Enterprises is your premier trusted grain merchant in the agricultural mandi network. We partner directly with dedicated farmers, millers, and food processing enterprises to ensure fair weighing, instant payments, and unmatched transparency.",
    navHome: "Home",
    navAbout: "About Us",
    navCommodities: "Commodities",
    navRates: "Mandi Bhav",
    navGst: "GST Suite",
    navContact: "Contact Us",
    sloganBanner: "Kisan Ki Mehnat, Hamara Samman",
    sloganSub: "Empowering growers with modern weighing, guaranteed prompt settlements, and fair market commissions.",
  },
  hi: {
    heroTitle: "हर फसल का सही मोल और सबसे भरोसेमंद मंडी व्यापार",
    heroSubtitle: "बेहतर दाम • विश्वसनीय व्यापार • आपके साथ हमेशा",
    heroDesc: "श्रीजी एग्रो एंटरप्राइजेज - अनाज व्यापारी। हम अन्नदाताओं और व्यापारियों के साथ सीधे जुड़कर सही तौल, पारदर्शी व्यवहार और तुरंत भुगतान की गारंटी देते हैं।",
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navCommodities: "उपज / फसलें",
    navRates: "मंडी भाव",
    navGst: "जीएसटी बिलिंग",
    navContact: "संपर्क करें",
    sloganBanner: "किसान की मेहनत, हमारा सम्मान",
    sloganSub: "आधुनिक इलेक्ट्रॉनिक कांटा, उचित कमीशन और त्वरित भुगतान के साथ सदैव आपके साथ।",
  }
};

function initLanguageToggle() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  if (lang === 'hi') {
    document.body.classList.add('hindi-mode');
  } else {
    document.body.classList.remove('hindi-mode');
  }

  const elMap = {
    '[data-i18n="heroTitle"]': dict.heroTitle,
    '[data-i18n="heroSubtitle"]': dict.heroSubtitle,
    '[data-i18n="heroDesc"]': dict.heroDesc,
    '[data-i18n="navHome"]': dict.navHome,
    '[data-i18n="navAbout"]': dict.navAbout,
    '[data-i18n="navCommodities"]': dict.navCommodities,
    '[data-i18n="navRates"]': dict.navRates,
    '[data-i18n="navGst"]': dict.navGst,
    '[data-i18n="navContact"]': dict.navContact,
    '[data-i18n="sloganBanner"]': dict.sloganBanner,
    '[data-i18n="sloganSub"]': dict.sloganSub,
  };

  for (const selector in elMap) {
    const el = document.querySelector(selector);
    if (el && elMap[selector]) el.innerText = elMap[selector];
  }
}

/* ==========================================================================
   4. GST CALCULATOR & COMMODITY TAX LOGIC
   ========================================================================== */
function initGstCalculator() {
  // Tab Switcher inside GST Suite
  const tabBtns = document.querySelectorAll('.gst-tab-btn');
  const tabPanels = document.querySelectorAll('.gst-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Calculator inputs
  const cropSelect = document.getElementById('calc-commodity');
  const packagingType = document.getElementById('calc-packaging');
  const amountInput = document.getElementById('calc-amount');
  const gstRateInput = document.getElementById('calc-rate');
  const txTypeSelect = document.getElementById('calc-tx-type');
  const inclusiveCheckbox = document.getElementById('calc-inclusive');

  function updateRateFromCommodity() {
    if (!cropSelect || !packagingType) return;
    const isBranded = packagingType.value === 'branded';
    const isService = cropSelect.value === 'commission_service';

    if (isService) {
      gstRateInput.value = '18';
      document.getElementById('calc-hsn-display').innerText = 'SAC 9985 / 9961 (18% GST on Commission)';
      document.getElementById('tax-status-badge').innerText = 'Standard 18% SAC';
      document.getElementById('tax-status-badge').className = 'badge-exempt';
      document.getElementById('tax-status-badge').style.background = '#f59e0b';
    } else if (isBranded) {
      gstRateInput.value = '5';
      document.getElementById('calc-hsn-display').innerText = 'Branded / Pre-packaged Agricultural Grain (5% GST)';
      document.getElementById('tax-status-badge').innerText = '5% GST Applicable';
      document.getElementById('tax-status-badge').className = 'badge-exempt';
      document.getElementById('tax-status-badge').style.background = '#0284c7';
    } else {
      gstRateInput.value = '0';
      const hsnCodes = {
        wheat: 'HSN 1001 (Wheat / गेहूं)',
        maize: 'HSN 1005 (Maize / मक्का)',
        paddy: 'HSN 1006 (Paddy-Rice / धान)',
        soybean: 'HSN 1201 (Soybean / सोयाबीन)',
        mustard: 'HSN 1207 (Mustard / सरसों)',
        pulses: 'HSN 0713 (Pulses / दालें)'
      };
      const hsn = hsnCodes[cropSelect.value] || 'HSN Chapter 10/12';
      document.getElementById('calc-hsn-display').innerText = `${hsn} - Raw/Unbranded Mandi Grain`;
      document.getElementById('tax-status-badge').innerText = '100% Tax EXEMPT (0% GST)';
      document.getElementById('tax-status-badge').className = 'badge-exempt';
      document.getElementById('tax-status-badge').style.background = '#10b981';
    }
    recalculateGst();
  }

  function recalculateGst() {
    const amount = parseFloat(amountInput.value) || 0;
    const rate = parseFloat(gstRateInput.value) || 0;
    const isInclusive = inclusiveCheckbox.checked;
    const isInterstate = txTypeSelect.value === 'interstate';

    let baseAmount = 0;
    let totalTax = 0;
    let finalAmount = 0;

    if (isInclusive && rate > 0) {
      baseAmount = amount / (1 + (rate / 100));
      totalTax = amount - baseAmount;
      finalAmount = amount;
    } else {
      baseAmount = amount;
      totalTax = (baseAmount * rate) / 100;
      finalAmount = baseAmount + totalTax;
    }

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (isInterstate) {
      igst = totalTax;
    } else {
      cgst = totalTax / 2;
      sgst = totalTax / 2;
    }

    // Display
    document.getElementById('res-base-amount').innerText = formatCurrency(baseAmount);
    document.getElementById('res-cgst').innerText = formatCurrency(cgst) + ` (${(rate/2).toFixed(1)}%)`;
    document.getElementById('res-sgst').innerText = formatCurrency(sgst) + ` (${(rate/2).toFixed(1)}%)`;
    document.getElementById('res-igst').innerText = formatCurrency(igst) + ` (${rate.toFixed(1)}%)`;
    document.getElementById('res-total-tax').innerText = formatCurrency(totalTax);
    document.getElementById('res-grand-total').innerText = formatCurrency(finalAmount);
  }

  if (cropSelect) cropSelect.addEventListener('change', updateRateFromCommodity);
  if (packagingType) packagingType.addEventListener('change', updateRateFromCommodity);
  if (amountInput) amountInput.addEventListener('input', recalculateGst);
  if (gstRateInput) gstRateInput.addEventListener('input', recalculateGst);
  if (txTypeSelect) txTypeSelect.addEventListener('change', recalculateGst);
  if (inclusiveCheckbox) inclusiveCheckbox.addEventListener('change', recalculateGst);

  // Quick initial calculation
  updateRateFromCommodity();
}

/* ==========================================================================
   5. MANDI GST PROFORMA INVOICE GENERATOR
   ========================================================================== */
function initGstInvoiceGenerator() {
  const buyerNameInput = document.getElementById('inv-input-buyer');
  const buyerGstinInput = document.getElementById('inv-input-gstin');
  const buyerStateInput = document.getElementById('inv-input-state');
  const invCommoditySelect = document.getElementById('inv-input-crop');
  const invBagsInput = document.getElementById('inv-input-bags');
  const invWeightInput = document.getElementById('inv-input-weight'); // in quintals
  const invRateInput = document.getElementById('inv-input-rate'); // per quintal
  const invMandiTaxPercent = document.getElementById('inv-input-mandi-tax'); // e.g. 1.5%
  const invHammaliInput = document.getElementById('inv-input-hammali');
  const invTolInput = document.getElementById('inv-input-tol');
  const invGstPercent = document.getElementById('inv-input-gst-rate');
  const invSupplyType = document.getElementById('inv-input-supply');

  // Trigger elements on invoice
  function updateInvoice() {
    const buyerName = buyerNameInput.value.trim() || 'M/S Kisan / Trader Enterprises';
    const buyerGstin = buyerGstinInput.value.trim() || 'URP (Unregistered Person / Farmer)';
    const buyerState = buyerStateInput.value.trim() || 'Madhya Pradesh (23)';
    const cropText = invCommoditySelect.options[invCommoditySelect.selectedIndex].text;
    const bags = parseInt(invBagsInput.value) || 0;
    const weightQtl = parseFloat(invWeightInput.value) || 0;
    const ratePerQtl = parseFloat(invRateInput.value) || 0;
    const mandiTaxRate = parseFloat(invMandiTaxPercent.value) || 0;
    const hammali = parseFloat(invHammaliInput.value) || 0;
    const tol = parseFloat(invTolInput.value) || 0;
    const gstRate = parseFloat(invGstPercent.value) || 0;
    const isInterstate = invSupplyType.value === 'interstate';

    // Grain taxable/base value
    const cropValue = weightQtl * ratePerQtl;

    // Mandi fee (Shulk)
    const mandiShulk = (cropValue * mandiTaxRate) / 100;

    // Subtotal before GST
    const taxableSubtotal = cropValue + mandiShulk + hammali + tol;

    // GST calculation
    const gstAmount = (taxableSubtotal * gstRate) / 100;
    let cgst = 0, sgst = 0, igst = 0;
    if (isInterstate) {
      igst = gstAmount;
    } else {
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    }

    const grandTotal = Math.round(taxableSubtotal + gstAmount);

    // Update screen display
    document.getElementById('inv-disp-buyer').innerText = buyerName;
    document.getElementById('inv-disp-gstin').innerText = buyerGstin;
    document.getElementById('inv-disp-state').innerText = buyerState;
    document.getElementById('inv-disp-crop').innerText = cropText;
    document.getElementById('inv-disp-bags').innerText = bags > 0 ? `${bags} Bags` : '-';
    document.getElementById('inv-disp-weight').innerText = `${weightQtl.toFixed(2)} Qtl`;
    document.getElementById('inv-disp-rate').innerText = formatCurrency(ratePerQtl);
    document.getElementById('inv-disp-crop-amount').innerText = formatCurrency(cropValue);

    document.getElementById('inv-disp-mandi-tax').innerText = formatCurrency(mandiShulk) + ` (${mandiTaxRate}%)`;
    document.getElementById('inv-disp-labor').innerText = formatCurrency(hammali + tol);
    document.getElementById('inv-disp-subtotal').innerText = formatCurrency(taxableSubtotal);

    if (isInterstate) {
      document.getElementById('inv-row-cgst').style.display = 'none';
      document.getElementById('inv-row-sgst').style.display = 'none';
      document.getElementById('inv-row-igst').style.display = 'flex';
      document.getElementById('inv-disp-igst').innerText = formatCurrency(igst) + ` (${gstRate}%)`;
    } else {
      document.getElementById('inv-row-cgst').style.display = 'flex';
      document.getElementById('inv-row-sgst').style.display = 'flex';
      document.getElementById('inv-row-igst').style.display = 'none';
      document.getElementById('inv-disp-cgst').innerText = formatCurrency(cgst) + ` (${(gstRate/2).toFixed(1)}%)`;
      document.getElementById('inv-disp-sgst').innerText = formatCurrency(sgst) + ` (${(gstRate/2).toFixed(1)}%)`;
    }

    document.getElementById('inv-disp-grand-total').innerText = formatCurrency(grandTotal);
    document.getElementById('inv-disp-words').innerText = numberToIndianWords(grandTotal) + ' Only';

    // Auto set invoice date and auto invoice number
    const today = new Date();
    document.getElementById('inv-disp-date').innerText = today.toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }

  // Hook all inputs
  const inputs = [
    buyerNameInput, buyerGstinInput, buyerStateInput, invCommoditySelect,
    invBagsInput, invWeightInput, invRateInput, invMandiTaxPercent,
    invHammaliInput, invTolInput, invGstPercent, invSupplyType
  ];

  inputs.forEach(input => {
    if (input) {
      input.addEventListener('input', updateInvoice);
      input.addEventListener('change', updateInvoice);
    }
  });

  // Print button
  const printBtn = document.getElementById('btn-print-invoice');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // WhatsApp Share Bill Button
  const shareBtn = document.getElementById('btn-whatsapp-invoice');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const buyer = document.getElementById('inv-disp-buyer').innerText;
      const crop = document.getElementById('inv-disp-crop').innerText;
      const weight = document.getElementById('inv-disp-weight').innerText;
      const total = document.getElementById('inv-disp-grand-total').innerText;
      const text = `*Shreeji Agro Enterprises - Mandi Proforma Bill*%0A` +
        `Buyer: ${buyer}%0A` +
        `Commodity: ${crop}%0A` +
        `Net Weight: ${weight}%0A` +
        `Total Amount: ${total}%0A` +
        `Thank you for doing business with Shreeji Agro Enterprises (Grain Merchant).`;
      window.open(`https://wa.me/?text=${text}`, '_blank');
    });
  }

  // Initial call
  updateInvoice();
}

/* ==========================================================================
   6. MANDI RATES FILTER & LIVE SEARCH
   ========================================================================== */
function initRatesFilter() {
  const searchInput = document.getElementById('mandi-search-input');
  const cropFilter = document.getElementById('mandi-crop-filter');
  const tableRows = document.querySelectorAll('.mandi-rates-table tbody tr');

  function filterTable() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCrop = cropFilter ? cropFilter.value.toLowerCase() : 'all';

    tableRows.forEach(row => {
      const text = row.innerText.toLowerCase();
      const rowCrop = row.getAttribute('data-crop') || '';

      const matchesSearch = query === '' || text.includes(query);
      const matchesCrop = selectedCrop === 'all' || rowCrop.includes(selectedCrop);

      if (matchesSearch && matchesCrop) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (searchInput) searchInput.addEventListener('input', filterTable);
  if (cropFilter) cropFilter.addEventListener('change', filterTable);
}

/* ==========================================================================
   7. CROP SPECIFICATIONS MODAL
   ========================================================================== */
const cropSpecsData = {
  maize: {
    title: 'Maize / Makka (मक्का)',
    subtitle: 'High Starch & Poultry Feed Quality (HSN: 1005)',
    img: 'assets/images/maize.jpg',
    moisture: 'Max 12.0% - 14.0%',
    foreignMatter: 'Max 1.5%',
    damagedGrains: 'Max 2.0%',
    packaging: '50kg Jute / PP Bags or Loose Bulk',
    currentRate: '₹2,120 - ₹2,280 / Quintal',
    taxInfo: '0% GST (Loose/Mandi) | 5% (Branded Consumer Pack)',
    desc: 'Uniform golden yellow grain with high starch content, thoroughly cleaned and tested for minimal aflatoxin. Preferred by starch manufacturers, ethanol distilleries, and poultry feed formulators.'
  },
  paddy: {
    title: 'Paddy / Rice / Dhan (धान)',
    subtitle: 'Basmati & Non-Basmati Grades (HSN: 1006)',
    img: 'assets/images/paddy.jpg',
    moisture: 'Max 13.0% - 15.0%',
    foreignMatter: 'Max 1.0%',
    millingRecovery: '66% - 68%',
    packaging: '50kg / 75kg Traditional Burlap Bags',
    currentRate: '₹2,240 - ₹3,650 / Quintal',
    taxInfo: '0% GST on Raw Unhusked Grain (Exempted)',
    desc: 'Direct farm-fresh paddy sourced from the finest fertile belts. Ideal moisture retention ensures optimal head rice recovery and low breakage during milling operations.'
  },
  wheat: {
    title: 'Wheat / Gehun (गेहूं)',
    subtitle: 'Sharbati, Lokwan & Mill Quality (HSN: 1001)',
    img: 'assets/images/wheat.jpg',
    moisture: 'Max 10.5% - 12.0%',
    protein: '11.5% - 13.5%',
    foreignMatter: 'Max 0.75%',
    packaging: '50kg HDPE/PP Bags with Double Stitching',
    currentRate: '₹2,380 - ₹2,550 / Quintal',
    taxInfo: '0% GST for Mandi Traders & Whole Grain',
    desc: 'Sun-dried lustrous amber grains boasting high gluten and protein strength. Sourced for leading flour mills, semolina (suji) units, and biscuit makers.'
  },
  soybean: {
    title: 'Soybean / Soya (सोयाबीन)',
    subtitle: 'High Oil & Solvent Extraction Grade (HSN: 1201)',
    img: 'assets/images/soybean.jpg',
    moisture: 'Max 10.0%',
    oilContent: '18.5% - 20.0%',
    foreignMatter: 'Max 2.0%',
    packaging: '50kg / 100kg Jute Bags',
    currentRate: '₹4,550 - ₹4,820 / Quintal',
    taxInfo: '0% GST (Mandi Trading / Wholesale)',
    desc: 'Bold yellow round soybeans with high protein and superior oil content. Cleaned through gravity separators for solvent extraction plants and organic animal feed.'
  },
  mustard: {
    title: 'Mustard / Sarson (सरसों)',
    subtitle: 'Bold Black/Brown Oil Seeds (HSN: 1207)',
    img: 'assets/images/mustard.jpg',
    moisture: 'Max 8.0%',
    oilContent: '40.0% - 42.5%',
    foreignMatter: 'Max 1.5%',
    packaging: '50kg / 80kg Heavy Jute Bags',
    currentRate: '₹5,350 - ₹5,680 / Quintal',
    taxInfo: '0% GST on Raw Agricultural Seeds',
    desc: 'Premium quality high-pungency mustard seeds with exceptional oil yields. Sourced directly from trusted cultivation belts for commercial kachi ghani mustard oil millers.'
  }
};

function initCropModal() {
  const modal = document.getElementById('crop-detail-modal');
  const closeBtn = document.getElementById('close-crop-modal');
  const viewBtns = document.querySelectorAll('.btn-view-crop');

  if (!modal) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cropKey = btn.getAttribute('data-crop-key');
      const data = cropSpecsData[cropKey];
      if (!data) return;

      document.getElementById('modal-crop-title').innerText = data.title;
      document.getElementById('modal-crop-subtitle').innerText = data.subtitle;
      document.getElementById('modal-crop-img').src = data.img;
      document.getElementById('modal-crop-desc').innerText = data.desc;
      document.getElementById('modal-crop-moisture').innerText = data.moisture;
      document.getElementById('modal-crop-impurity').innerText = data.foreignMatter;
      document.getElementById('modal-crop-rate').innerText = data.currentRate;
      document.getElementById('modal-crop-tax').innerText = data.taxInfo;

      const whatsappBtn = document.getElementById('modal-crop-whatsapp');
      if (whatsappBtn) {
        const msg = encodeURIComponent(`Hello Shreeji Agro Enterprises, I am interested in trading/buying ${data.title}. Please provide live mandi quotes.`);
        whatsappBtn.href = `https://wa.me/919876543210?text=${msg}`;
      }

      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* ==========================================================================
   8. POSTER LIGHTBOX MODAL
   ========================================================================== */
function initPosterModal() {
  const posterModal = document.getElementById('poster-lightbox-modal');
  const openBtns = document.querySelectorAll('.btn-open-poster');
  const closeBtn = document.getElementById('close-poster-modal');

  if (!posterModal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      posterModal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => posterModal.classList.remove('active'));
  }

  posterModal.addEventListener('click', (e) => {
    if (e.target === posterModal) posterModal.classList.remove('active');
  });
}

/* ==========================================================================
   9. CONTACT & TRADE ENQUIRY FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('trade-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('enq-name').value;
    const phone = document.getElementById('enq-phone').value;
    const role = document.getElementById('enq-role').value;
    const crop = document.getElementById('enq-crop').value;
    const quantity = document.getElementById('enq-quantity').value;
    const message = document.getElementById('enq-message').value;

    const fullMsg = `*New Mandi Trade Enquiry - Shreeji Agro*%0A` +
      `Name: ${name}%0A` +
      `Phone: ${phone}%0A` +
      `Type: ${role}%0A` +
      `Crop: ${crop}%0A` +
      `Estimated Qty: ${quantity}%0A` +
      `Remarks: ${message || 'Looking for prompt mandi quotation'}`;

    window.open(`https://wa.me/919876543210?text=${fullMsg}`, '_blank');
    alert('Thank you! Redirecting you to WhatsApp to instantly connect with our Mandi Desk.');
    form.reset();
  });
}

/* ==========================================================================
   10. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.querySelector('.back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   HELPER UTILITIES
   ========================================================================== */
function formatCurrency(num) {
  return '₹' + (Number(num) || 0).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}

function numberToIndianWords(n) {
  const num = Math.round(n);
  if (num === 0) return 'Rupees Zero';

  const single = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(v) {
    if (v < 20) return single[v];
    return tens[Math.floor(v / 10)] + (v % 10 !== 0 ? ' ' + single[v % 10] : '');
  }

  let crore = Math.floor(num / 10000000);
  let lakh = Math.floor((num % 10000000) / 100000);
  let thousand = Math.floor((num % 100000) / 1000);
  let hundred = Math.floor((num % 1000) / 100);
  let remainder = num % 100;

  let words = 'Rupees ';
  if (crore > 0) words += convertTwoDigits(crore) + ' Crore ';
  if (lakh > 0) words += convertTwoDigits(lakh) + ' Lakh ';
  if (thousand > 0) words += convertTwoDigits(thousand) + ' Thousand ';
  if (hundred > 0) words += single[hundred] + ' Hundred ';
  if (remainder > 0) {
    if (words !== 'Rupees ') words += 'and ';
    words += convertTwoDigits(remainder) + ' ';
  }

  return words.trim();
}
