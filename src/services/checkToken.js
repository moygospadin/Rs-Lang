const checkToken = async (id, token) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${id}`, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    return content;
  }
  if (rawResponse.status === 401) {
    throw new Error('Token is not alive');
  }
  throw new Error('something went wrong');
};

export default checkToken;
