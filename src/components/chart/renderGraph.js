//import createElement from '../../shared/createElement'
import Chart from 'chart.js'
import getUserStatistics from '../../services/getUserStastics'
import '../chart/chart.scss'

const page = document.querySelector('.root');
let chart;
const state = {};


function initState() {
  const settings = JSON.parse(localStorage.getItem('userInfo'));
  state.userId = settings.userId;
  state.token = settings.token;
}


function func(x) {
  if (x == 0)
    return 0;
  return -32.2030 + 13.6835 * Math.log(x);
}

function generateDate(learned) {
  return Array.from(Array(learned).keys()).map(x => ({
    x: x, y: func(x)
  }))
}

function initChart(learnedWords, maxWords) {
  let ctx = document.querySelector('#myChart');
  return new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
      {
        label: "Learned",
        showLine: true,
        data: generateDate(learnedWords),
        backgroundColor: "#A882DD",
      },
      {
        label: "All words",
        showLine: true,
        data:
          generateDate(maxWords),
        backgroundColor: "#E08D79",
      },
  ]
  },
    options: {
      responsive: true,
      scales: {
        yAxes : [{
            ticks : {
                max : 100,
                min : 0,
                stepSize: 10
            }
        }],
        xAxes : [{
          ticks : {
              max : maxWords,
              min : 0,
              stepSize: 1000
          }
      }],
    },
    elements: {
      point:{
          radius: 0
      }
  },
  maintainAspectRatio: false,
   }
});
}


function renderСhart(learnedWords, maxWords) {
  let content = ' <div class="chart-container text-center"><canvas id="myChart" width="600" height="400"></canvas></div>';
  page.insertAdjacentHTML('beforeend', content);
  chart = initChart(learnedWords, maxWords);
}

function renderRangeSlider(currentValue, maxValue) {
  const container = document.querySelector('.chart-container');
  let slider = `<input type="range" class="custom-range" id="customRange1 min="0" max=${maxValue} value=${currentValue} step="50">`;
  container.insertAdjacentHTML('beforeend', slider);
}

function renderText(learnedWords) {
  const container = document.querySelector('.chart-container');
  let text = `<p class="info text-center h3 text-primary">With vocabulary of ${learnedWords} words you are able to understand ${func(learnedWords)}% of any text</p>`;
  container.insertAdjacentHTML('beforeend', text);

}

function handleSlider() {
  let slider = document.querySelector('.custom-range');
  slider.addEventListener("input", function() {
    chart.data.datasets[0].data = generateDate(Number(slider.value));
    chart.update();
    initText(Number(slider.value), func(Number(slider.value)).toFixed(2));
  });
}

function handleButton() {
  const button = document.querySelector('.button-menu');
    button.addEventListener('click', () => {
      window.location.hash = '#/hub';
    });
}

function initText(words, percent) {
  let text = document.querySelector('.info')
  text.textContent = `With vocabulary of ${words} words you are able to understand ${percent}% of any text`;
}

function renderButton() {
  const container = document.querySelector('.chart-container');
  let content = '<button type="button" class="btn btn-primary btn-sm button-menu">Main Page</button>';
  container.insertAdjacentHTML('beforeend', content);
}



async function getNumberLearnedWords() {
    initState();
    const number = 0;
    let data = await getUserStatistics(state);
    return data;
  }



export default function renderTestGraph() {
  getNumberLearnedWords().then(data => {
    renderСhart(data.learnedWords, 5000);
    renderText(data.learnedWords, 5000);
    renderRangeSlider(data.learnedWords, 5000);
    renderButton();
    handleSlider();
    handleButton();
  });
}



