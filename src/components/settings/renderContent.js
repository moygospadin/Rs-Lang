import createElement from '../../shared/createElement';

export default function renderContent() {
  const wrapper = createElement('div', 'settings__wrapper');
  const page = document.querySelector('.root');
  const cardsLimit = localStorage.getItem('cardsLimit');
  const wordsLimit = localStorage.getItem('wordsLimit');
  wrapper.insertAdjacentHTML('beforeend',
    `<div class="container settings">
      <h1>Settings:</h1>
      <div class="limits">
        <div class="limit">
          <label for="word-limit">New words per day: </label>
          <input
            class="change-limit words-limit"
            type="range"
            name="words-limit"
            id="words-limit"
            min="1"
            max="300"
            step="1"
            value="${wordsLimit}"
          />
          <output class="words-limit-output" for="words-limit">${wordsLimit}</output>
        </div>
        <div class="limit">
          <label for="cards-limit">New cards per day: </label>
          <input
            class="change-limit cards-limit"
            type="range"
            name="cards-limit"
            id="cards-limit"
            min="1"
            max="500"
            step="1"
            value="${cardsLimit}"
          />
          <output class="cards-limit-output" for="cards-limit">${cardsLimit}</output>
        </div>
      </div>
      <div class="main-settings">
        <p><b>Main settings:</b></p>
        <p>What information do you want to see on the cards?</p>
        <label>
          <input
            type="checkbox"
            name="wordTranslation"
            class="settings-to-save"
          />
          Word translation</label
        >
        <label>
          <input type="checkbox" name="wordMeaning" class="settings-to-save" />
          Sentence explaining the meaning of the word</label
        >
        <label>
          <input type="checkbox" name="wordExample" class="settings-to-save" />
          Sentence with an example of using the studied word</label
        >
        <p class="warning hidden">
          At least one point from main settings must be chosen!
        </p>
      </div>
      <div class="main-settings sound-settings">
        <p><b>Sound settings:</b></p>
        <label>
          <input type="checkbox" name="playWordExample" class="settings-to-save" />
          Voice the sentence with an example of using the studied word</label
        >
        <label>
          <input type="checkbox" name="playWordMeaning" class="settings-to-save" />
          Voice the sentence explaining the meaning of the word</label
        >
      </div>
      <div class="additional-settings">
        <p><b>Additional settings:</b></p>
        <label
          data-toggle="tooltip"
          data-placement="top"
          title="Use the 'Again', 'Hard', 'Good', 'Easy' buttons to specify the individual complexity of the studied word"
        >
          <input
            type="checkbox"
            name="intervalRepeating"
            class="settings-to-save"
          />
          Show buttons 'Again', 'Difficult', 'Good', 'Easy'</label
        >
        <label>
          <input
            type="checkbox"
            name="wordTranscription"
            class="settings-to-save"
          />
          Show word transcription</label
        >
        <label>
          <input type="checkbox" name="wordImage" class="settings-to-save" />
          Show image-association to the studied word</label
        >
        <label
          data-toggle="tooltip"
          data-placement="top"
          title="Use 'Delete' button to exclude the word from studied"
        >
          <input type="checkbox" name="deleteBtn" class="settings-to-save" />
          Show 'Delete' button</label
        >
        <label
          data-toggle="tooltip"
          data-placement="top"
          title="Use 'Show answer' button to go to the next word without answer"
        >
          <input
            type="checkbox"
            name="ShowAnswerBtn"
            class="settings-to-save"
          />
          Show 'Show answer' button</label
        >
        <label
          data-toggle="tooltip"
          data-placement="top"
          title="Use 'Move to difficult' button to move the word to the group 'Difficult' and to learn this word apart"
        >
          <input
            type="checkbox"
            name="MoveToDifficultBtn"
            class="settings-to-save"
          />
          Show 'Move to difficult' button</label
        >
        <p class="success-notification hidden">
          Your settings have been successfully saved!
        </p>
      </div>
      <div class="save-btn-container">
        <input class="btn btn_medium btn_yellow save-btn" type="button" value="Save" />
      </div>
    </div>`);
  page.append(wrapper);
}
