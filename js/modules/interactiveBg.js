/* ==========================================================================
   INTERACTIVE BACKGROUND & AMBIENT GLOW
   Subtle mouse follower glow and interactive button micro-movements
   ========================================================================== */

export function initInteractiveBg() {
  // Only activate mouse follower on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    const ambientLight = document.createElement('div');
    ambientLight.className = 'mouse-ambient-glow';
    ambientLight.style.cssText = `
      position: fixed;
      width: 480px;
      height: 480px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(1, 231, 253, 0.07) 0%, rgba(3, 80, 202, 0.03) 50%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.5s ease;
      opacity: 0;
    `;
    document.body.appendChild(ambientLight);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ambientLight.style.opacity = '1';
    });

    window.addEventListener('mouseleave', () => {
      ambientLight.style.opacity = '0';
    });

    const loop = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      ambientLight.style.left = `${currentX}px`;
      ambientLight.style.top = `${currentY}px`;
      requestAnimationFrame(loop);
    };
    loop();
  }
}
