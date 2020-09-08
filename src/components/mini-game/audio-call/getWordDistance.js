function getWordDistance(a, b) {
  if (a === b) {
    return 10000;
  }
  const matrix = [];
  for (let i = 0; i <= b.length; i += 1) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j += 1) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i += 1) {
    for (let j = 1; j <= a.length; j += 1) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        const position = Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, position);
      }
    }
  }
  return matrix[b.length][a.length];
}

export default getWordDistance;
