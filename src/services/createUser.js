const createUser = async (user) => {
  const rawResponse = await fetch('https://afternoon-falls-25894.herokuapp.com/users', {
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
  if (rawResponse.status === 417) {
    throw new Error('User already exists');
  } else {
    throw new Error(`Something went wrong! ERROR ${rawResponse.status}`);
  }
};

export default createUser;
