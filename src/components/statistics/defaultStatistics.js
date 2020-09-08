const obj = {
  learnedWords: 0,
  optional: {
  },
}




const defaultStatistics = () => {
  const settings = JSON.parse(localStorage.getItem('userInfo'));
  console.log(settings);
  return {
    userId: settings.userId,
    token: settings.token,
    obj: obj,
  }
};

export default defaultStatistics;
