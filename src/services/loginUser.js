const loginUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (rawResponse.ok) {
    const content = await rawResponse.json();
    return content;
  }
  if (rawResponse.status === 403) {
    throw new Error('Invalid e-mail or password');
  }
  if (rawResponse.status === 404) {
    throw new Error('Couldn\'t find user');
  } else {
    throw new Error(`Something went wrong! ERROR ${rawResponse.status}`);
  }
};

export default loginUser;
