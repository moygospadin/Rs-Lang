export default function audioButtonHandler() {
  const vocabWrapper = document.querySelector('.vocabulary__wrapper');
  vocabWrapper.addEventListener('click', (event) => {
    const { target } = event;
    const audioBtn = target.closest('.word__audio');
    if (audioBtn) {
      audioBtn.querySelector('audio').play();
    }
  });
}
