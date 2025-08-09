document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // Burger menu
  const burgerBtn = document.getElementById('burgerBtn');
  const primaryNav = document.getElementById('primaryNav');
  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = body.classList.toggle('nav-open');
      burgerBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close nav on link click (mobile)
  if (primaryNav) {
    primaryNav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (body.classList.contains('nav-open')) {
          body.classList.remove('nav-open');
          if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Modal open/close
  const signupModal = document.getElementById('signupModal');
  const signupOpenBtn = document.getElementById('signupOpenBtn');
  const joinNow = document.getElementById('joinNow');
  const loginBtn = document.getElementById('loginBtn');

  function openModal() {
    if (!signupModal) return;
    signupModal.classList.add('open');
    signupModal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    if (!signupModal) return;
    signupModal.classList.remove('open');
    signupModal.setAttribute('aria-hidden', 'true');
  }

  signupModal?.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && (target.hasAttribute('data-close') || target.classList.contains('modal'))) {
      closeModal();
    }
  });

  [signupOpenBtn, joinNow, loginBtn].forEach((btn) => {
    if (btn) btn.addEventListener('click', openModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Copy promo code
  const copyBonusBtn = document.getElementById('copyBonus');
  if (copyBonusBtn) {
    copyBonusBtn.addEventListener('click', async () => {
      const code = 'WSB200';
      try {
        await navigator.clipboard.writeText(code);
        const original = copyBonusBtn.textContent || '';
        copyBonusBtn.textContent = 'Скопировано!';
        copyBonusBtn.classList.add('neon');
        setTimeout(() => {
          copyBonusBtn.textContent = original;
          copyBonusBtn.classList.remove('neon');
        }, 1500);
      } catch (err) {
        alert('Не удалось скопировать');
      }
    });
  }

  // Fake form submit
  const signupForm = document.getElementById('signupForm');
  if (signupForm instanceof HTMLFormElement) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(signupForm);
      const email = String(formData.get('email') || '');
      closeModal();
      setTimeout(() => {
        alert(`Добро пожаловать, ${email}! Аккаунт создан (демо).`);
      }, 300);
    });
  }
});