/* ==========================================================================
   SKYGEA - MAIN JAVASCRIPT ENTRYPOINT
   ========================================================================== */

import { initNavigation } from './modules/navigation.js';
import { initAccordion } from './modules/accordion.js';
import { initCounter } from './modules/counter.js';
import { initModal } from './modules/modal.js';
import { initInteractiveBg } from './modules/interactiveBg.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAccordion();
  initCounter();
  initModal();
  initInteractiveBg();
  
  // Newsletter subscription toast simulation
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      const btn = newsletterForm.querySelector('button');
      if (input && btn) {
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#10b981';
        btn.style.color = '#ffffff';
        input.value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 3000);
      }
    });
  }
});
