export default function setItemActiveState() {
  const items = document.querySelectorAll('.menu__item');
  items.forEach((item) => {
    if (item.href === window.location.href) {
      item.classList.add('active');
    }
  });
}
