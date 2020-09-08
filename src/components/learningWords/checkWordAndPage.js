import setProps from './setProps';
import properties from './properties';
import postUserSettings from '../../services/postUserSettings';

export default async function checkWordAndPage() {
  const settings = properties.settings.optional;
  if (String(settings.wordExample) === 'true' && String(settings.wordTranslation) === 'true') {
    document.querySelector('.sentence .hidden-word').textContent = properties.words[settings.currentWord].textExample.match(/(?<=\>).*(?=\<)/);
  }
  if ((String(settings.wordMeaning) === 'true' && String(settings.wordExample) === 'true')
    || (String(settings.wordMeaning) === 'true' && String(settings.wordTranslation) === 'true')) {
    document.querySelector('.meaning .hidden-word').textContent = properties.words[settings.currentWord].textMeaning.match(/(?<=\>).*(?=\<)/);
  }

  if (settings.currentWord < (properties.words.length - 1)) {
    localStorage.setItem('currentWord', Number(settings.currentWord) + 1);
    settings.currentWord = Number(settings.currentWord) + 1;
    try {
      await postUserSettings(properties.settings);
    } catch (er) {
      properties.error = er;
    }
  } else {
    if (settings.currentPage < 30) {
      localStorage.setItem('currentPage', Number(settings.currentPage) + 1);
      settings.currentPage = Number(settings.currentPage) + 1;
      setProps();
    } else {
      localStorage.setItem('currentPage', 0);
      settings.currentPage = 0;
      localStorage.setItem('currentGroup', Number(settings.currentGroup) + 1);
      settings.currentGroup = Number(settings.currentGroup) + 1;
    }
    localStorage.setItem('currentWord', 0);
    settings.currentWord = 0;
    postUserSettings(properties.settings);
  }
}
