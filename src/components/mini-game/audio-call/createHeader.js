import createElement from '../../../shared/createElement';

export default function createHeader() {
  const header = createElement('header', 'audio-call__header');
  const closeBtn = createElement('a', ['btn', 'btn-secondary', 'btn-close']);
  closeBtn.insertAdjacentHTML('beforeend', `<svg id="game-menu-btn" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path id="game-menu-btn" fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
  <path id="game-menu-btn" fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
  </svg>`);
  header.append(closeBtn);
  closeBtn.addEventListener('click', () => {
    window.location.reload();
  });
  return header;
}
