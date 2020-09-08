async function getImg() {
  try {
    const imgKey = 'uqKnWKJjxeW_UdkP5R_DOLfSPSZ7Ry0LqkqDRtFUmJQ';
    const res = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=${imgKey}`);
    if (res.ok) {
      const imgData = await res.json();
      return imgData;
    }
    throw new Error(`${res.status}`);
  } catch (e) {
    return e.toString();
  }
}

function formatData(data) {
  return data.map((elem) => {
    const newElem = elem;
    const {
      image, audio, textExample, audioExample,
    } = newElem;
    newElem.textExample = textExample.replace(/<\/?b>/g, '');
    newElem.audioExample = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audioExample}`;
    newElem.image = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${image}`;
    newElem.audio = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audio}`;
    return elem;
  });
}

export async function getWords(page, group) {
  try {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return formatData(data);
    }
    throw new Error(`${res.status}`);
  } catch (e) {
    return e.toString();
  }
}

export default getImg;
