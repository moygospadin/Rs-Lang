const getAllUserWord = async ({ userId, token }) => {
  const filter = { 'userWord.optional.learned': true };
  const url = new URL(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords`);
  url.searchParams.append('filter', JSON.stringify(filter));
  url.searchParams.append('wordsPerPage', 3600);
  url.searchParams.append('userId', userId);
  const rawResponse = await fetch(url, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    const result = content[0].paginatedResults;
    return result.map((el) => {
      const newElem = el;
      const {
        image, audio, audioMeaning, audioExample, _id,
      } = newElem;
      newElem.image = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${image}`;
      newElem.audio = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audio}`;
      newElem.audioMeaning = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audioMeaning}`;
      newElem.audioExample = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audioExample}`;
      newElem.id = _id;
      return el;
    });
  }
  throw new Error('Getting users word error');
};

export default getAllUserWord;
