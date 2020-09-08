import properties from './properties';

export default function setInputWidth() {
  const ToCheckWidthBlock = document.querySelector('.to-check-width');
  const input = document.querySelector('form input');
  ToCheckWidthBlock.textContent = properties.missingWord;
  input.style.width = `${ToCheckWidthBlock.offsetWidth}px`;
  input.focus();
}
