const library = document.querySelector<HTMLElement>('[data-library]');
const search = library?.querySelector<HTMLInputElement>(
  '[data-library-search]',
);
const category = library?.querySelector<HTMLSelectElement>(
  '[data-library-category]',
);
const count = library?.querySelector<HTMLElement>('[data-library-count]');
const empty = library?.querySelector<HTMLElement>('[data-library-empty]');
const cards = library?.querySelectorAll<HTMLElement>('[data-article]');

function filterArticles(): void {
  if (!search || !category || !count || !empty || !cards) return;
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const matches =
      (category.value === 'all' || card.dataset.category === category.value) &&
      (card.dataset.search ?? '').includes(query);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  library
    ?.querySelectorAll<HTMLElement>('[data-library-group]')
    .forEach((group) => {
      group.hidden = !group.querySelector('[data-article]:not([hidden])');
    });
  count.textContent = `${visible} ${visible === 1 ? 'article' : 'articles'}`;
  empty.hidden = visible !== 0;
}

search?.addEventListener('input', filterArticles);
category?.addEventListener('change', filterArticles);
library
  ?.querySelector('[data-library-reset]')
  ?.addEventListener('click', () => {
    if (!search || !category) return;
    search.value = '';
    category.value = 'all';
    filterArticles();
    search.focus();
  });
