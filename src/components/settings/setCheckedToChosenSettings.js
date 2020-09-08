export default function setCheckedToChosenSettings() {
  document.querySelectorAll('.settings-to-save').forEach((setting) => {
    if (localStorage.getItem(setting.getAttribute('name')) === 'true') {
      setting.setAttribute('checked', 'checked');
    }
  });
}
