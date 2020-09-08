import createElement from '../../../shared/createElement';

function createBtn(text, value) {
  const btn = createElement('button', ['btn', 'btn-primary', 'easy', 'set-difficulty']);
  btn.textContent = text;
  btn.dataset.difficulty = value;
  return btn;
}

export default function buttonsBlock() {
  const block = createElement('div', 'button-block');
  const buttons = [['Easy', 'easy'], ['Good', 'good'], ['Hard', 'hard'], ['Again', 'very hard']];
  block.append(...buttons.map((el) => createBtn(...el)));
  const strongBtn = createElement('button', ['btn', 'btn-danger', 'add-to-difficult']);
  strongBtn.textContent = 'Add to difficult';
  strongBtn.dataset.value = 'difficult';
  block.append(strongBtn);
  return block.outerHTML;
}
