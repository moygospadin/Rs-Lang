/* eslint-disable no-unused-expressions */
function createElement(tag, className, attrs) {
  const element = document.createElement(tag);
  if (className) {
    typeof className === 'string' ? element.classList.add(className) : element.classList.add(...className);
  }
  if (attrs) {
    attrs.forEach((el) => {
      element.setAttribute(el[0], el[1]);
    });
  }
  return element;
}

export default createElement;
