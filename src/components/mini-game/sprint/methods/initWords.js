import getJsonWords from '../../../../services/getWords';

const initCollection = async () => {
  const data = await getJsonWords(localStorage.getItem('round_sprint'), localStorage.getItem('level_sprint'));
  const collection = data.map((item) => ({ eng: item.word, rus: item.wordTranslate }));
  return collection;
};

export default initCollection;
