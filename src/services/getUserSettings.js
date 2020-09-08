const getUserSettings = async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userInfo.userId}/settings`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
  const content = await rawResponse.json();

  return content;
};
export default getUserSettings;
