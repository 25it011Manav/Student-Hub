(() => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav'); const header = document.querySelector('header');
    if (nav && header && !header.querySelector('.mobile-menu-btn')) {
      const button = document.createElement('button'); button.className = 'mobile-menu-btn'; button.type = 'button'; button.setAttribute('aria-label', 'Open navigation menu'); button.setAttribute('aria-expanded', 'false'); button.textContent = '☰'; header.append(button);
      button.addEventListener('click', () => { const open = nav.classList.toggle('mobile-active'); button.setAttribute('aria-expanded', String(open)); button.textContent = open ? '×' : '☰'; });
      nav.querySelectorAll('a').forEach(link => { if ((link.getAttribute('href') || '').split('/').pop() === page) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); } link.addEventListener('click', () => { nav.classList.remove('mobile-active'); button.setAttribute('aria-expanded', 'false'); button.textContent = '☰'; }); });
    }
    document.querySelectorAll('[data-password-toggle]').forEach(button => button.addEventListener('click', () => { const input = document.querySelector(button.dataset.passwordToggle); if (!input) return; const revealed = input.type === 'password'; input.type = revealed ? 'text' : 'password'; button.textContent = revealed ? 'Hide' : 'Show'; button.setAttribute('aria-label', revealed ? 'Hide password' : 'Show password'); }));
    document.querySelectorAll('form[data-api-form]').forEach(form => form.addEventListener('submit', async event => {
      event.preventDefault(); const message = form.querySelector('.form-message'); const submit = form.querySelector('[type=submit]'); if (!form.checkValidity()) { form.reportValidity(); return; }
      submit.disabled = true; const original = submit.textContent; submit.textContent = 'Please wait…';
      try { const csrfResponse = await fetch('../api/csrf.php', { credentials:'same-origin' }); const csrf = await csrfResponse.json(); if (!csrfResponse.ok || !csrf.token) throw new Error('Could not prepare a secure request.'); const data = new FormData(form); data.append('csrf', csrf.token); const response = await fetch(form.dataset.apiForm, { method:'POST', body:data, credentials:'same-origin', headers:{'X-Requested-With':'XMLHttpRequest'} }); const result = await response.json(); if (!response.ok || !result.success) throw new Error(result.message || 'Unable to complete this request.'); message.textContent = result.message; message.className = 'form-message success'; if (result.redirect) location.assign(result.redirect); else form.reset(); }
      catch (error) { message.textContent = error.message || 'Something went wrong. Please try again.'; message.className = 'form-message error'; }
      finally { submit.disabled = false; submit.textContent = original; }
    }));
    const search = document.querySelector('[data-table-search]'); if (search) search.addEventListener('input', () => document.querySelectorAll(search.dataset.tableSearch + ' tbody tr').forEach(row => row.hidden = !row.textContent.toLowerCase().includes(search.value.toLowerCase())));
  });
})();
