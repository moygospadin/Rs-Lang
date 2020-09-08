// eslint-disable-next-line import/named
import createDomElem, { createAudio } from '../common';

export default function createWordCards(data) {
  const {
    word, transcription, audio,
  } = data;
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width: 40px;">'
        + '<path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 '
        + '4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 '
        + '5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>';
  const wordIcon = createDomElem('p', ['speak-it__content-word__item-icon']);
  wordIcon.insertAdjacentHTML('afterbegin', icon);
  const wordSelect = createDomElem(
    'div', ['speak-it__content-word__item-select'], null, [['data-word', word]],
  );
  const wordTitle = createDomElem('p', ['speak-it__content-word__item-title'], [word]);
  const wordTranscription = createDomElem('p', ['speak-it__content-word__item-transcription'], [transcription]);
  const wordConatiner = createDomElem('div', ['speak-it__content-word'], [wordTitle, wordTranscription]);
  const wordAudio = createAudio(audio, word, 'speak-it__content-word__item-audio', 'speak-it__content-word__item-source');
  return createDomElem('div', ['speak-it__content-word__item'], [wordSelect, wordConatiner, wordIcon, wordAudio]);
}
