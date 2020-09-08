export default function burgerIconHandler() {
  const burger = document.querySelector('.menu__burger');
  burger.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
  });
}
