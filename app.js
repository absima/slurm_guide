(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  let savedTheme;
  try { savedTheme = localStorage.getItem('small-cluster-theme'); } catch {}
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const setTheme = (theme) => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  };
  setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : dark ? 'dark' : 'light');
  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('small-cluster-theme', theme); } catch {}
  });
  const menu = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const closeMenu = () => { sidebar.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = sidebar.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  const links = [...document.querySelectorAll('nav a')];
  links.forEach((link) => link.addEventListener('click', closeMenu));
  const sections = links.map((link) => document.querySelector(link.getAttribute('href')));
  const updateActive = () => {
    let active = sections[0];
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= 140) active = section; });
    links.forEach((link) => {
      const current = link.getAttribute('href') === `#${active.id}`;
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateActive(); scheduled = false; });
  }, { passive: true });
  updateActive();
  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-block').querySelector('code').textContent;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = 'Copied';
        document.querySelector('#copy-status').textContent = 'Code copied to clipboard.';
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(button.closest('.code-block').querySelector('code'));
        selection.removeAllRanges(); selection.addRange(range);
        button.textContent = 'Selected';
        document.querySelector('#copy-status').textContent = 'Clipboard unavailable. Code selected; copy with your keyboard.';
      }
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    });
  });
})();
