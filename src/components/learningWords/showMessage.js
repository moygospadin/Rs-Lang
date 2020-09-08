export default function showMessage() {
  if (localStorage.getItem('currentWordIndex') === localStorage.getItem('wordsLimit')) {
    const page = document.querySelector('.word');
    const content = `<div class="modal modal-fade" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Good Work!</h5>
          <button type="button"  class="close btn-close-show-message" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>You have fulfilled your norm for today, you can stop or continue to learn new words.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-menu">Menu</button>
        </div>
      </div>
    </div>
  </div>
    `;

    page.insertAdjacentHTML('afterbegin', content);
    const btn = document.querySelector('.btn-close-show-message');
    btn.addEventListener('click', () => document.querySelector('.modal').remove());
    const btnMenu = document.querySelector('.btn-menu');
    // eslint-disable-next-line
    btnMenu.addEventListener('click', () => document.location = '#/hub');
  }
}
