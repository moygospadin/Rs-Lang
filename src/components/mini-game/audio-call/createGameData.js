import getWords from '../../../shared/get-words';
import randomize from '../../../shared/randomize';
import getWordDistance from './getWordDistance';

const gameData = [];
let answers = [];

async function getPartOfSpeech(word) {
  const url = 'https://dictionary.skyeng.ru/api/public/v1/words/search?search=';
  return fetch(`${url}${word.word}`)
    .then((response) => response.json())
    .then((arr) => arr.filter((el) => {
      const part = el.meanings[0].partOfSpeechCode;
      return part !== 'add' && part !== 'ph';
    }))
    .then((res) => res[0].meanings[0].partOfSpeechCode)
    .catch((e) => `error:${e}`);
}

async function getRandomVariants(word) {
  let words = gameData.flat(1);
  const partOfSpeech = await getPartOfSpeech(word);
  words = words.reduce((acc, curr) => {
    const value = acc.find((item) => item.wordTranslate === curr.wordTranslate);
    return value ? acc : acc.concat([curr]);
  }, []);
  words = words.map((el) => {
    const newElem = el;
    newElem.distance = getWordDistance(word.wordTranslate, el.wordTranslate);
    return newElem;
  });
  words = words.filter((el, i) => words.indexOf(el) === i);
  words = words.sort((a, b) => b.distance - a.distance);
  async function addVariant(el) {
    const variantPartOfSpeech = await getPartOfSpeech(el);
    if (variantPartOfSpeech !== partOfSpeech) {
      const result = await addVariant(words.pop());
      return result;
    }
    return el;
  }
  return Promise.allSettled(words.splice(-4).map((el) => addVariant(el)))
    .then((res) => res.map((el) => el.value));
}

async function createGameData([level, round]) {
  gameData.length = 0;
  answers.length = 0;
  const arr = [];
  for (let i = 0; i <= 59; i += 1) {
    arr.push(i);
  }
  answers = await getWords(round, level);
  const promises = arr.map(async (el) => {
    const result = await getWords(el, level);
    gameData.push(result);
    return result;
  });
  return Promise.allSettled(promises)
    .then(() => {
      const wordsInGame = randomize(answers);
      return Promise.allSettled(wordsInGame.map(async (el) => {
        const newEl = el;
        newEl.variants = await getRandomVariants(el);
        return newEl;
      }))
        .then((res) => res.map((el) => el.value));
    });
}

export default createGameData;
