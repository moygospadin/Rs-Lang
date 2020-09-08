import getAllUserWords from '../../../services/getAllUserWords';

const milisecInHour = 36000000;
export default async function createLearningData() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { token, userId } = userInfo;
  const answer = await getAllUserWords({ token, userId });

  const learningData = [];
  const now = new Date();
  answer.forEach((el) => {
    const time = (Number(now) - Number(new Date(el.userWord.optional.timestamp))) / milisecInHour;
    const period = Number(el.userWord.optional.repeat) ** 2 * 24;
    switch (el.userWord.difficulty) {
      case ('very hard'):
        learningData.push(el);
        return;
      case ('hard'):
        if (time > 2) {
          learningData.push(el);
        }
        return;
      case ('good'):
        if (time >= 24) {
          learningData.push(el);
        }
        return;
      default:
        if (time > period) {
          learningData.push();
        }
    }
  });
  return learningData;
}
