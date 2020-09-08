const getAggregatedWords = async ({ userId, token, filter }) => {
  const url = new URL(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/aggregatedWords`);
  url.searchParams.append('filter', JSON.stringify(filter));
  url.searchParams.append('wordsPerPage', 100);
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
    return content;
  }
  throw new Error('Getting users word error');
};

export default getAggregatedWords;
