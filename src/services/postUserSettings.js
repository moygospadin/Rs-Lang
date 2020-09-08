const postUserSettings = async (settings) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const newSettings = settings;
  newSettings.wordsPerDay = Number(newSettings.wordsPerDay);
  for (const prop in newSettings.optional) {
    if (newSettings.optional[prop] === 'true') {
      newSettings.optional[prop] = true;
    } else if (newSettings.optional[prop] === 'false') {
      newSettings.optional[prop] = false;
    } else if (!(isNaN(newSettings.optional[prop])) && newSettings.optional[prop] !== false
    && newSettings.optional[prop] !== true) {
      newSettings.optional[prop] = Number(newSettings.optional[prop]);
    }
  }
  await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userInfo.userId}/settings`, {
    method: 'PUT',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
    body: JSON.stringify(newSettings),
  });
};
export default postUserSettings;
