(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const themeMeta = document.getElementById('theme-color-meta');

  const getCurrentTheme = () => root.dataset.theme === 'light' ? 'light' : 'dark';
  const updateThemeControl = (theme) => {
    if (!themeButton) return;
    const nextTheme = theme === 'dark' ? 'claro' : 'oscuro';
    const label = `Cambiar a tema ${nextTheme}`;
    themeButton.setAttribute('aria-label', label);
    themeButton.setAttribute('title', label);
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#07111f' : '#f5f8fd');
  };

  updateThemeControl(getCurrentTheme());
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = nextTheme;
      updateThemeControl(nextTheme);
      try {
        localStorage.setItem('miguel-puma-theme', nextTheme);
      } catch (error) {
        // La alternancia sigue funcionando durante esta visita aunque no haya almacenamiento.
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
      navigation.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 621px)').matches) closeMenu();
    });
  }

  // Animaciones de entrada discretas; el contenido sigue visible sin JavaScript.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }
})();
