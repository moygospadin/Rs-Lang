import games from '../../data/gamesInfo';

export default function renderContent() {
  const page = document.querySelector('.root');
  page.insertAdjacentHTML('beforeend',
    `<div class="container games-page__wrapper">
      <div class="games-page">
        <h1>Games:</h1>
        <div class="games"></div>
      </div>
    </div>`);
  const gamesContainer = document.querySelector('.games');
  games.forEach((game) => {
    gamesContainer.insertAdjacentHTML('beforeend', `<div class="card game">
  <img src=${game.image}>
  <div class="game__title">${game.gameTitle}</div>
  <div class="game__desc">${game.gameDesc}</div>
  <a href="${game.gameURL}" class="btn btn_yellow btn_small play-btn">Play</a>
  </div>`);
  });
}
