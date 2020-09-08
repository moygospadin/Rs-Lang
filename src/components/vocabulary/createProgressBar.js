import createElement from '../../shared/createElement';

export default function createProgressBar(intervals) {
  const progressBar = createElement('div', 'voc__progress-bar');
  const progressLine = createElement('div', 'progress-bar__line');
  progressBar.style.width = '300px';
  progressBar.style.height = '10px';
  progressLine.style.height = '100%';
  if (intervals.learned.isTrue) {
    progressLine.style.width = '20%';
    progressLine.style.background = 'linear-gradient(90deg, #EB734F, #EBA05A)';
  }
  if (intervals.repeat1.isTrue) {
    progressLine.style.width = '40%';
    progressLine.style.background = 'linear-gradient(90deg, #EB734F, #EBA05A, #EBB657)';
  }
  if (intervals.repeat2.isTrue) {
    progressLine.style.width = '60%';
    progressLine.style.background = 'linear-gradient(90deg, #EB734F, #EBA05A, #EBD74B)';
  }
  if (intervals.repeat3.isTrue) {
    progressLine.style.width = '80%';
    progressLine.style.background = 'linear-gradient(90deg, #EB734F, #EBB657, #D4EB45)';
  }
  if (intervals.repeat4.isTrue) {
    progressLine.style.width = '100%';
    progressLine.style.background = 'linear-gradient(90deg, #EB734F, #EBD74B, #79EB61)';
  }

  progressBar.append(progressLine);
  return progressBar;
}
