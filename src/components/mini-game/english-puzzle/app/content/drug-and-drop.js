// eslint-disable-next-line import/no-cycle
import Field from './field';
import WordsPuzzle from './words-puzzle';
// eslint-disable-next-line import/no-cycle
import Content from './index';
// eslint-disable-next-line import/no-cycle,import/named
import actions, { checkField, cleanCheckWords, replaceWord } from './action';

export function handleDragStart(e) {
  e.target.classList.add('selected');
}

function swapContent(currentElement, activeElement, parent) {
  const nextElement = (currentElement === activeElement.nextElementSibling)
    ? currentElement.nextElementSibling
    : currentElement;
  parent.insertBefore(activeElement, nextElement);
  checkField();
  cleanCheckWords();
}

export function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  const curPos = Content.create().getCurWords();
  const curField = Field.create().getFields()[curPos];
  const puzzle = WordsPuzzle.create().container;
  const activeElement = document.querySelector('.selected');
  const currentElement = e.target;
  if (activeElement === currentElement) return;
  if (currentElement.parentNode === curField && activeElement.parentNode === puzzle) {
    if (activeElement.dataset.action && currentElement.dataset.action) {
      const field = [...curField.children];
      const newElement = replaceWord(field, activeElement, 'in');
      swapContent(currentElement, newElement, curField);
    }
    return;
  }
  if (activeElement.parentNode === curField && currentElement.parentNode === puzzle) {
    if (activeElement.dataset.action && currentElement.dataset.action) {
      const field = [...puzzle.children];
      const newElement = replaceWord(field, activeElement, 'out');
      swapContent(currentElement, newElement, puzzle);
    }
    return;
  }
  if ((activeElement.dataset.action === currentElement.dataset.action)
    && (activeElement.parentNode === puzzle) && activeElement.dataset.action) {
    swapContent(currentElement, activeElement, puzzle);
    return;
  }
  if ((activeElement.dataset.action === currentElement.dataset.action)
    && (activeElement.parentNode === curField) && activeElement.dataset.action) {
    swapContent(currentElement, activeElement, curField);
    return;
  }
  e.dataTransfer.dropEffect = 'none';
}

function addElement(direction, field, element, curElem) {
  const empty = [...field.children].find((el) => el.textContent === '');
  if (empty) {
    if ((element.dataset.action && !curElem.dataset.action)
      || (!element.dataset.action && curElem.dataset.action)) {
      actions[direction](element);
    }
  }
}

export function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  const curPos = Content.create().getCurWords();
  const curField = Field.create().getFields()[curPos];
  const puzzle = WordsPuzzle.create().container;
  const activeElement = document.querySelector('.selected');
  const currentElement = e.target;
  if (currentElement.parentNode === curField && activeElement.parentNode === puzzle
    && !currentElement.dataset.action) {
    addElement('in-field', curField, activeElement, currentElement);
    return;
  }
  if (activeElement.parentNode === curField && currentElement.parentNode === puzzle
    && !currentElement.dataset.action) {
    addElement('out-field', puzzle, activeElement, currentElement);
  }
}

export function handleDragEnd(e) {
  e.target.classList.remove('selected');
}
