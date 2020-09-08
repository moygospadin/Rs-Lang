export default function logoutButtonHandler() {
  const logoutButton = document.querySelector('.logout-btn');
  logoutButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.hash = '#/';
  });
}
