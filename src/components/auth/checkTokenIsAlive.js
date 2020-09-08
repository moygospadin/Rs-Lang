import checkToken from '../../services/checkToken';

export default async function checkTokenIsAlive() {
  if (localStorage.getItem('userInfo')) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { token, userId } = userInfo;
    try {
      await checkToken(userId, token);
      return true;
    } catch (error) {
      localStorage.clear();
      return false;
    }
  } else {
    return false;
  }
}
