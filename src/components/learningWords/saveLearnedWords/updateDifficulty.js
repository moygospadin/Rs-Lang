import properties from '../properties';

export default function updateDifficulty(word) {
  const indexes = ['weak', 'good', 'hard', 'very hard'];
  const newWord = word;
  indexes.forEach((el, i) => {
    if (el === word.difficulty) {
      newWord.difficulty = indexes[i - 1] ? indexes[i - 1] : indexes[0];
    }
  });
  return newWord;
}
