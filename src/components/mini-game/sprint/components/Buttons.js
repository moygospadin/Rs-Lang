export default class Buttons {
  // eslint-disable-next-line class-methods-use-this
  renderButtons() {
    const container = document.querySelector('.card-body');
    container.insertAdjacentHTML('beforeend', `<div class="buttons mt-5">
    <button type="button" class="btn btn-danger">Неверно</button>
    <button type="button" class="btn btn-success">Верно</button>
  </div>`);
  }
}
