export default function renderSavannaContent() {
  if (!localStorage.getItem('savanna-level')) {
    localStorage.setItem('savanna-level', 1);
  }
  if (!localStorage.getItem('savanna-difficulty')) {
    localStorage.setItem('savanna-difficulty', 1);
  }
  const page = document.querySelector('.root');
  const links = `<div class="savanna-game-wrapper">`;

  let content = `
  <div class="level-difficulty"><span>level: ${localStorage.getItem(
    'savanna-level',
  )}  difficulty:${localStorage.getItem('savanna-difficulty')}</span></div>
  <div class="d-flex">
  <div class="dropdown mr-1">
    <button type="button" class="btn btn_gray dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
      Level
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
      <a class="dropdown-item" id="dropdown-level" >1</a>
      <a class="dropdown-item" id="dropdown-level" >2</a>
      <a class="dropdown-item" id="dropdown-level" >3</a>
      <a class="dropdown-item" id="dropdown-level" >4</a>
      <a class="dropdown-item" id="dropdown-level" >5</a>
      <a class="dropdown-item" id="dropdown-level" >6</a>
    </div>
  </div>

  <div class="dropdown mr-1">
    <button type="button" class="btn btn_gray dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
      Difficulty
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu1">
      <a class="dropdown-item" id="dropdown-difficulty" >1</a>
      <a class="dropdown-item" id="dropdown-difficulty" >2</a>
      <a class="dropdown-item" id="dropdown-difficulty" >3</a>
      <a class="dropdown-item" id="dropdown-difficulty" >4</a>
      <a class="dropdown-item" id="dropdown-difficulty" >5</a>
    </div>
  </div>

  </div>
  <div class="card game-rules">
  <img src="${require('../../../assets/images/savanna-2.png')}">
  <p class="info">There are descriptions of two different words on the left and right sides. Your task is to match the words with there meaning correctly. You can use the arrows ← → and keyboard keys to correlate words and meanings. The game ends when the timer expires or after 10 words have passed.</p>
  <button type="button" class="btn mx-auto btn-primary">Start</button>
  </div>
`;

  content = `${links + content}</div>`;
  page.insertAdjacentHTML('beforeend', content);
}
