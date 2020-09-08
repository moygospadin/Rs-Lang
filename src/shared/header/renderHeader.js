import createElement from '../createElement';

export default function renderHeader() {
  const header = createElement('div', 'header');
  header.insertAdjacentHTML('beforeend', `
    <div class="header__buttons">
      <a href="#/" class="btn btn-primary logout-btn btn_yellow btn_small" role="button">Log out</a>
    </div>
  `);
  return header;
}
