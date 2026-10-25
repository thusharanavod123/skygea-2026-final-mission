/* ==========================================================================
   MODAL & ESTIMATOR MODULE
   Interactive Project Calculator & Discovery Call Booking Drawer
   ========================================================================== */

export function initModal() {
  const modalOverlay = document.getElementById('consultationModal');
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const estimatorForm = document.getElementById('estimatorForm');
  const estimatedOutput = document.getElementById('estimatedBudget');
  const formSuccessView = document.getElementById('formSuccessView');
  const formFieldsView = document.getElementById('formFieldsView');

  // Open Modal
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Modal
  const closeModal = () => {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeModal();
    }
  });

  // Dynamic Estimation Calculation
  const calculateBudget = () => {
    const selectedType = document.querySelector('input[name="project_type"]:checked')?.value || 'mvp';
    const selectedSpeed = document.querySelector('input[name="speed"]:checked')?.value || 'standard';
    
    let baseMin = 15000;
    let baseMax = 25000;
    let weeks = "8–10 weeks";

    if (selectedType === 'talent') {
      baseMin = 4800; // per month
      baseMax = 8500;
      weeks = "Continuous / Monthly";
      if (estimatedOutput) {
        estimatedOutput.innerHTML = `Starting at <span class="text-cyan">$${baseMin.toLocaleString()} – $${baseMax.toLocaleString()}/mo</span> (${weeks})`;
        return;
      }
    } else if (selectedType === 'web') {
      baseMin = 8000;
      baseMax = 16000;
      weeks = "4–6 weeks";
    }

    if (selectedSpeed === 'accelerated') {
      baseMin = Math.round(baseMin * 1.25);
      baseMax = Math.round(baseMax * 1.3);
      weeks = "6–8 weeks fast-track";
    }

    if (estimatedOutput) {
      estimatedOutput.innerHTML = `Estimated Investment: <span class="text-cyan">$${baseMin.toLocaleString()} – $${baseMax.toLocaleString()}</span> <span style="font-size:0.85em;color:var(--text-muted);font-weight:normal">(${weeks})</span>`;
    }
  };

  const radioInputs = document.querySelectorAll('input[name="project_type"], input[name="speed"]');
  radioInputs.forEach(input => input.addEventListener('change', calculateBudget));
  calculateBudget();

  // Form Submission
  if (estimatorForm) {
    estimatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = estimatorForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Securing Discovery Slot...';
      }

      setTimeout(() => {
        if (formFieldsView && formSuccessView) {
          formFieldsView.style.display = 'none';
          formSuccessView.style.display = 'block';
        }
      }, 900);
    });
  }
}
