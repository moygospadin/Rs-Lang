import properties from './properties';

export default function showTranslation() {
  const currentWord = localStorage.getItem('currentWord');
  const settings = properties.settings.optional;

  if (String(settings.wordTranslationHint) === 'true') {
    document.querySelector('.word__translation').textContent = properties.words[currentWord].wordTranslate;
  }
  if (String(settings.sentencesTranslation) === 'true') {
    if (settings.wordExample === 'true') {
      document.querySelector('.sentence-translation').textContent = properties.words[currentWord].textExampleTranslate;
    }
    if (String(settings.wordMeaning) === 'true') {
      document.querySelector('.meaning-translation').textContent = properties.words[currentWord].textMeaningTranslate;
    }
  }
}
