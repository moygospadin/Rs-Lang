import properties from './properties';

export default function showWrongAndRightLetters() {
  const input = document.querySelector('form input');
  const inputValueSpell = input.value.split('');
  const correctWord = properties.missingWord.split('');

  correctWord.forEach((letter, index) => {
    document.querySelector('.input-top-layer').insertAdjacentHTML('beforeend',
      `<span class=${letter === inputValueSpell[index] ? 'correct-letter' : 'wrong-letter'}>${letter}</span>`);
  });
}
