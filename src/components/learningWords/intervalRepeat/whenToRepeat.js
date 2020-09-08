const repeatTable = {
  1: {
    difficulty: 'Easy',
    repeat: 'Number of previous trains ^ 2 * 24 hours. Example: if you trained a word with weak difficulty 2 times, you would see it again after 4 days',
  },
  2: {
    difficulty: 'Good',
    repeat: 'Next train at least after 24 hours',
  },
  3: {
    difficulty: 'Hard',
    repeat: 'You need to learn this word better. Do it during the next train',
  },
  4: {
    difficulty: 'Very hard',
    repeat: 'You will see this word again in current train',
  },
};

export default repeatTable;
