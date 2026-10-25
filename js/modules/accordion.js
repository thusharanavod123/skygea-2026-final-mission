/* ==========================================================================
   ACCORDION MODULE
   Handles interactive collapsible items for FAQ and Services Directory
   ========================================================================== */

export function initAccordion() {
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for clean single-view accordion
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive && answer) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Services Directory Expandable Drawers
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    const headerBtn = item.querySelector('.service-header');
    const body = item.querySelector('.service-body');

    headerBtn?.addEventListener('click', () => {
      const isExpanded = body?.classList.contains('expanded');

      serviceItems.forEach(other => {
        const otherBody = other.querySelector('.service-body');
        otherBody?.classList.remove('expanded');
      });

      if (!isExpanded && body) {
        body.classList.add('expanded');
      }
    });
  });
}
