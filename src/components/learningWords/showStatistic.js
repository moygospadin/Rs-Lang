export default function showStatistic() {
  if (localStorage.getItem('currentWordIndex') === localStorage.getItem('cardsLimit')) {
    const wordArray = JSON.parse(localStorage.getItem('localAllWords'));
    let trueWords = '';
    let falseWords = '';
    wordArray.forEach((el) => {
      if (el.answer === 'false') {
        falseWords += ` <li class="list-group-item">
  <span class="dropdown-item">${el.word}</span>
 <span class="dropdown-item">${el.transcription}</span>
 <span class="dropdown-item">${el.wordTranslate}</span>
 </li>`;
      } else if (el.answer === 'true') {
        trueWords += `  <li class="list-group-item">
   <span class="dropdown-item">${el.word}</span>
  <span class="dropdown-item">${el.transcription}</span>
  <span class="dropdown-item">${el.wordTranslate}</span>
  </li>`;
      }
    });
    const page = document.querySelector('.word');
    const content = `<div class="modal modal-fade modal-statistic" tabindex="-1" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Good Work!</h5>
          <button type="button"  class="close btn-close-show-message" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>You have fulfilled your card norm for today, you can stop or continue to learn new words.</p>
          <div class="modal-body-flex" >
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    True words
  </button>
  <div class="dropdown-menu dropdown-menu-modal" aria-labelledby="dropdownMenuButton" style="">
  ${trueWords}
  </div>
</div>
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    False words
  </button>
  <div class="dropdown-menu dropdown-menu-modal" aria-labelledby="dropdownMenuButton" style="">
 ${falseWords}
  </div>
</div>
</div>
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
    btnMenu.addEventListener("click", () => (document.location = "#/hub"));
  }
}
