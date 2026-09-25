(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNavWrap = document.querySelector('.mobile-nav-wrap');

  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuToggle && mobileNavWrap) {
    menuToggle.addEventListener('click', function () {
      const isOpen = document.body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNavWrap.querySelectorAll('.nav-item').forEach(function (link) {
      link.addEventListener('click', function (event) {
        const hash = link.getAttribute('href');

        if (hash && hash.startsWith('#')) {
          event.preventDefault();
          closeMenu();
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        }

        closeMenu();
      });
    });

    document.addEventListener('click', function (event) {
      if (!document.body.classList.contains('menu-open')) return;
      if (!mobileNavWrap.contains(event.target) && !menuToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  const accordionItems = document.querySelectorAll('.service-accordion');

  accordionItems.forEach(function (item) {
    const trigger = item.querySelector('.service-trigger');
    const body = item.querySelector('.service-body');

    if (!trigger || !body) return;

    trigger.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      accordionItems.forEach(function (accordion) {
        accordion.classList.remove('is-open');
        const accordionTrigger = accordion.querySelector('.service-trigger');
        if (accordionTrigger) {
          accordionTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const fullName = contactForm.fullName.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!fullName || !email || !message) {
        return;
      }

      const subject = encodeURIComponent('New message from ' + fullName);
      const bodyMessage = encodeURIComponent(
        'Full Name: ' + fullName + '\n' +
        'Email: ' + email + '\n\n' +
        'Message:\n' + message
      );

      window.location.href = 'mailto:gmodisha@gmail.com?subject=' + subject + '&body=' + bodyMessage;
    });
  }
})();
