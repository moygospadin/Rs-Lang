import properties from '../properties';

export default function createAudioObjects() {
  const currentWord = localStorage.getItem('currentWord');
  properties.currentWordPronunciation = new Audio();
  properties.currentWordPronunciation.src = properties.words[currentWord].audio;
  properties.currentWordExample = new Audio();
  properties.currentWordExample.src = properties.words[currentWord].audioExample;
  properties.currentWordMeaning = new Audio();
  properties.currentWordMeaning.src = properties.words[currentWord].audioMeaning;
}
