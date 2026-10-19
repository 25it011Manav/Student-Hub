document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('eventSearch');
  const cards = [...document.querySelectorAll('.event-card')];
  const empty = document.getElementById('eventEmpty');
  let category = 'all';
  const render = () => {
    const query = (search?.value || '').toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const match = (category === 'all' || card.dataset.category === category) && card.textContent.toLowerCase().includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
  };
  search?.addEventListener('input', render);
  document.querySelectorAll('[data-event-filter]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.eventFilter || 'all';
    document.querySelectorAll('[data-event-filter]').forEach(item => item.classList.toggle('active', item === button));
    render();
  }));
});
