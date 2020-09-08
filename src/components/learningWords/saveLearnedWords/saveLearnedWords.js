import createUserWord from '../../../services/createUserWord';
import updateUserWord from '../../../services/updateUserWord';
import properties from '../properties';
import getUserWord from '../../../services/getUserWord';
import updateDifficulty from './updateDifficulty';

export default async function saveLearnedWords(category) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { userId, token } = userInfo;
  const settings = properties.settings.optional;
  const wordId = properties.words[(settings.currentWord)].id;
  let word = {};
  try {
    const oldword = await getUserWord({ userId, wordId, token });
    word.optional = oldword.optional;
    word.difficulty = oldword.difficulty;
    word.optional.timestamp = new Date();
    word.optional.repeat = Number(word.optional.repeat) + 1;
    word = updateDifficulty(word);
    if (category) {
      word.optional.category = category;
    }
    await updateUserWord({
      userId, wordId, word, token,
    });
  } catch (er) {
    word = {
      difficulty: properties.difficulty,
      optional: {
        learned: true,
        repeat: 0,
        timestamp: new Date(),
      },
    };
    if (category) {
      word.optional.category = category;
    }
    await createUserWord({
      userId, wordId, word, token,
    });
    properties.difficulty = 'hard';
    properties.category = null;
  }
}
