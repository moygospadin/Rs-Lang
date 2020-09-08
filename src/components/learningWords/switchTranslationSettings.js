import properties from './properties';
import postUserSettings from '../../services/postUserSettings';

export default function switchTranslationSettings() {
  document.querySelector('.learning-settings').addEventListener('click', async (event) => {
    const settings = properties.settings.optional;
    if (event.target.classList.contains('btn') && !event.target.classList.contains('active')) {
      event.target.parentNode.querySelectorAll('.btn').forEach((button) => {
        button.classList.remove('active');
      });
      event.target.classList.add('active');
      if (event.target.parentNode.classList.contains('word-trans-btns')) {
        localStorage.setItem('wordTranslationHint', event.target.dataset.wordTranslationHint);
        settings.wordTranslationHint = event.target.dataset.wordTranslationHint;
      } else {
        localStorage.setItem('sentencesTranslation', event.target.dataset.sentencesTranslation);
        settings.sentencesTranslation = event.target.dataset.sentencesTranslation;
      }
      await postUserSettings(properties.settings);
    }
  });
}
