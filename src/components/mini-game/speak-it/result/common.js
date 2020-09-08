import createDomElem, { createAudio } from '../common';

export default function wordRow(data) {
  const {
    word, wordTranslate, transcription, audio,
  } = data;
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width: 20px;">'
    + '<path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 '
    + '4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 '
    + '5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>';
  const selectElem = createDomElem('div', ['result__select'], null, [['data-sound', word]]);
  const iconElem = createDomElem('span', ['result__icon']);
  const wordElem = createDomElem('span', ['result__word'], [word]);
  const translationElem = createDomElem('span', ['result__translation'], [wordTranslate]);
  const transcriptionElem = createDomElem('span', ['result__transcription'], [transcription]);
  const audioElem = createAudio(audio, word, 'result__audio', 'result__source');
  iconElem.insertAdjacentHTML('afterbegin', icon);
  return createDomElem('div', ['result__row'], [iconElem, selectElem, wordElem, transcriptionElem, translationElem, audioElem]);
}
