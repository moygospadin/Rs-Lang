import createElement from '../../../shared/createElement';
import properties from '../properties';

export default function createSoundBlock(type, className, color = 'rgb(0,0,0)') {
  const soundIcon = createElement('div', 'sound-block__sound-icon');
  soundIcon.insertAdjacentHTML('beforeend',
    `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-volume-mute sound-off ${properties.sound ? 'hidden' : ''}" fill="${color}" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04L4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708l4-4a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M9.146 5.646a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0z"/>
  </svg>
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-volume-off-fill sound-on ${properties.sound ? '' : 'hidden'}" fill="${color}" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.717 3.55A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.812.39L7.825 10.5H5.5A.5.5 0 0 1 5 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
  </svg>`);
  const block = createElement('div', 'sound-block');
  const text = createElement('p', 'sound-block__text');
  block.append(soundIcon, text);
  return block.outerHTML;
}
