import createElement from '../../shared/createElement';

export default function renderWordBlock(wordInfo) {
  const wordWrapper = createElement('div', 'vocabulary__word');
  const wordBlock = createElement('div', 'word__block');
  const wordDescript = createElement('div', 'word__descript');
  const wordUsage = createElement('div', 'word__usage');
  const { timestamp } = wordInfo.userWord.optional;
  wordBlock.insertAdjacentHTML('beforeend', `
    <div class="word__name">
      <p>${wordInfo.word}</p>
    </div>
    <div class="word__audio">
      <audio src="${wordInfo.audio}"></audio>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-music-note audio-icon" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z" />
        <path fill-rule="evenodd" d="M9 3v10H8V3h1z" />
        <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z" />
      </svg>
    </div>
    <div class="word__last-repeat">
      <p>Last repeat: ${new Date(timestamp).toUTCString()}</p>
    </div>
    `);
  wordWrapper.append(wordBlock);

  if (localStorage.wordImage === 'true') {
    wordWrapper.insertAdjacentHTML('beforeend', `
    <div class="word__image">
      <img src="${wordInfo.image}" alt="${wordInfo.word}">
    </div>
    `);
  }
  if (localStorage.wordTranscription === 'true') {
    wordDescript.insertAdjacentHTML('beforeend', `
    <p class="descript__transcript">Transcription: ${wordInfo.transcription}</p>
    `);
  }
  if (localStorage.wordTranslation === 'true') {
    wordDescript.insertAdjacentHTML('beforeend', `
    <p class="descript__translate">Translation: ${wordInfo.wordTranslate}</p>
    `);
  }
  wordWrapper.append(wordDescript);
  if (localStorage.wordMeaning === 'true') {
    wordUsage.insertAdjacentHTML('beforeend', `
    <p class="usage__meaning">Meaning: ${wordInfo.textMeaning}</p>
    `);
  }
  if (localStorage['wordExample-'] === 'true') {
    wordUsage.insertAdjacentHTML('beforeend', `
    <p class="usage__example">Example: ${wordInfo.textExample}</p>
    `);
  }
  wordWrapper.append(wordUsage);
  return wordWrapper;
}
