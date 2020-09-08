import createDomElem from '../common';

function createList(count, name) {
  const items = [];
  for (let i = 0; i < count; i += 1) {
    const elem = createDomElem('li', ['dropdown-item', `dropdown-${name}`], [`${
      name[0].toUpperCase() + name.substring(1)
    }: ${i + 1}`], [[`data-${name}`, `${i}`]]);
    items.push(elem);
  }
  return createDomElem('ul', ['dropdown-menu', `speak-it__${name}`], items);
}

function createDropdown(curNum, name, listNum) {
  const btn = createDomElem(
    'button',
    ['btn', 'btn-secondary', 'dropdown-toggle'],
    [`${name[0].toUpperCase() + name.substring(1)}: ${curNum + 1}`],
    [['type', 'button'], ['data-toggle', 'dropdown'], ['aria-haspopup', 'true'], ['aria-expanded', 'false']],
  );
  const tooltipText = `Select game ${name}`;
  const dropdown = createDomElem('div', [
    'dropdown',
    `puzzle__controls-${name}s`],
  [btn, createList(listNum, name)],
  [['data-toggle', 'tooltip'], ['data-placement', 'right'], ['title', tooltipText]]);
  // eslint-disable-next-line no-undef
  $(dropdown).tooltip('show');
  return dropdown;
}

export function createPages(curPage) {
  const name = 'page';
  const listNum = 60;
  return createDropdown(curPage, name, listNum);
}

export function createGroups(curGroup) {
  const name = 'level';
  const listNum = 6;
  return createDropdown(curGroup, name, listNum);
}

export function createAppControls() {
  return ['restart', 'speak', 'result'].map((str) => createDomElem(
    'button', ['speak-it__controls-app__btn', 'btn', 'btn-primary'],
    [str.toUpperCase()], [['data-action', str]],
  ));
}
