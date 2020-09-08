import saveSettingsToLocalStorage from './saveSettingsToLocalStorage';
import updateProperties from './updateProperties';
import postUserSettings from '../../services/postUserSettings';
import properties from '../learningWords/properties';

export default function saveButtonHandler() {
  document.querySelector('.save-btn').addEventListener('click', async () => {
    const checkboxes = document.querySelector('.main-settings').querySelectorAll('input');
    const warning = document.querySelector('.warning');
    const success = document.querySelector('.success-notification');

    if ([...checkboxes].some((checkbox) => checkbox.checked)) {
      warning.classList.add('hidden');

      updateProperties();
      await postUserSettings(properties.settings);
      saveSettingsToLocalStorage();

      success.classList.remove('hidden');
    } else {
      success.classList.add('hidden');
      warning.classList.remove('hidden');
    }
  });
}
