import loginUser from '../../services/loginUser';

export default async function signInUser(credentials) {
  const result = await loginUser(credentials);
  const userInfo = {
    token: result.token,
    userId: result.userId,
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  localStorage.setItem('authorized', 'true');
}
