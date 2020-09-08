function randomize(array) {
  const arr = array;
  let currIndex = arr.length;
  let randomIndex;
  let tempValue;
  while (currIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currIndex);
    currIndex -= 1;
    tempValue = array[currIndex];
    arr[currIndex] = arr[randomIndex];
    arr[randomIndex] = tempValue;
  }
  return arr;
}

export default randomize;
