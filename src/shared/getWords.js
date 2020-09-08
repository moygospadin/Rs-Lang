function formatData(data) {
  return data.map((elem) => {
    const newElem = elem;
    const {
      image, audio, audioMeaning, audioExample,
    } = newElem;
    newElem.image = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${image}`;
    newElem.audio = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audio}`;
    newElem.audioMeaning = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audioMeaning}`;
    newElem.audioExample = `https://raw.githubusercontent.com/HannaKaliada/rslang-data/master/${audioExample}`;
    return elem;
  });
}

async function getWords(page, group) {
  try {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${Math.floor(page / 2)}&group=${group}`;
    const res = await fetch(url);
    if (res.ok) {
      let data = Array.from(await res.json());
      if (page % 2 === 0) data = data.slice(0, 10);
      else data = data.slice(10);
      return formatData(data);
    }
    throw new Error(`${res.status}`);
  } catch (e) {
    return e.toString();
  }
}

export default getWords;
