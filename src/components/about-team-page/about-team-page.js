import data from '../../data/teamInfo.json';
import createElement from '../../shared/createElement';

export default function renderAboutTeamPage() {
  const page = document.querySelector('.root');
  const wrapper = createElement('div', 'about-team-page');
  const aboutWrapper = createElement('div', 'about-team');
  const links = `<div class="container"><div class="about-team-wrapper">
    <h1>Our Team:</h1>
    </div>`;
  const start = `<div class="swiper-container">
    <div class="swiper-wrapper">`;
  const end = ` </div>
    <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
     <div class="swiper-button-prev"></div>
    </div></div>`;
  let content = '';
  /*eslint-disable*/
  data.forEach((el) => {
    content += `<div class="swiper-slide"><div class="card" >
        <img src="${require(`${el.img}`)}" class="card-img-top" alt="${el.name}">
        <div class="card-body">
        <h2 class="card-name">${el.name}</h2>
          <p class="card-text">${el.description}</p>
        </div>
        </div>
        </div>`;
  });
  /* eslint-enable */
  content = links + start + content + end;
  aboutWrapper.insertAdjacentHTML('beforeend', content);
  wrapper.append(aboutWrapper);
  page.append(wrapper);
}
