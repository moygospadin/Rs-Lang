import './startPage.scss';

export default function renderStartPage() {
  const page = document.querySelector('.root');
  page.insertAdjacentHTML('beforeend',
    `<div class="container">
      <div class="main-page">
        <div class="main-page__content">
          <div class="description">
            <h1>The best way to <br>learn a language</h1>
            <ul class="list">
              <li>Learn words using interval repetition techniques.</li>
              <li>Practice and test your knowledge by playing mini-games.</li>
              <li>Beat your records and improve knowledge every day</li>
            </ul>
              <a class="btn btn_yellow" href="#/auth" role="button">LETS GET STARTED</a>
          </div>
            <img src=${require('../../assets/images/start-page.png')}>
        </div>
      </div>
    </div>`);
}
