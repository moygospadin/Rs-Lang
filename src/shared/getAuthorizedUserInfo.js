export default function getAuthorizedUserInfo() {
  if (localStorage.getItem('userInfo')) {
    const userInfo = localStorage.getItem('userInfo');
    return {
      token: userInfo.token,
      userId: userInfo.userId,
    };
  }
  return null;
}
