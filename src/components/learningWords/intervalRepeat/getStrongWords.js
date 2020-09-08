import getAggregatedWords from '../../../services/getAggregatedWords';

async function getStrongWords() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { userId, token } = userInfo;
  const filter = {
    "userWord.category": "strong",
  };
  const result = await getAggregatedWords({ userId, token, filter });
  return result;
}
