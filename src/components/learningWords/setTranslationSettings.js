import properties from './properties';

export default function setTranslationSettings() {
  const settings = properties.settings.optional;
  if (!localStorage.getItem('sentencesTranslation')) {
    localStorage.setItem('sentencesTranslation', 'true');
    settings.sentencesTranslation = 'true';
  }
  if (!localStorage.getItem('wordTranslationHint')) {
    localStorage.setItem('wordTranslationHint', 'true');
    settings.wordTranslationHint = 'true';
  }

  if (String(settings.wordTranslationHint) === 'true') {
    document.querySelector('.word-trans-on').classList.add('active');
  } else {
    document.querySelector('.word-trans-off').classList.add('active');
  }

  if (String(settings.sentencesTranslation) === 'true') {
    document.querySelector('.sent-trans-on').classList.add('active');
  } else {
    document.querySelector('.sent-trans-off').classList.add('active');
  }
}
