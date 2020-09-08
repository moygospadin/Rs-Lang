export default function createDomElem(
  tag, className, content, attribute,
) {
  const elem = document.createElement(tag);
  elem.classList.add(...className);
  if (content instanceof Array) elem.append(...content);
  if (attribute instanceof Array) {
    attribute.forEach((arr) => {
      const [name, val] = arr;
      elem.setAttribute(name, val);
    });
  }
  return elem;
}

export function createAudio(
  src, audioName, audioClass, sourceClass,
) {
  const cardAudioSource = createDomElem('source', [sourceClass], null, [['src', src], ['type', 'audio/mpeg']]);
  return createDomElem('audio', [audioClass], [cardAudioSource, 'Your browser does not support the audio element.'], [['data-name', audioName]]);
}
