import getAllUserWords from '../../services/getAllUserWords';

export default async function getHardUserWords(userId, token) {
  const words = await getAllUserWords({ userId, token });
  const hardWords = words.filter((word) => word.userWord.difficulty === 'hard' || word.userWord.difficulty === 'very hard');
  return hardWords;
}
