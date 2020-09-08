import settings from '../components/settings/settings';
import renderTeamPage from '../components/about-team-page/render-about-team-page';
import renderStartPage from '../components/start-page/renderStartPage';
import initHubPage from '../components/hub/hub-page/initHubPage';
import createSignInSignUpPage from '../components/auth/createSignInSignUpPage';
import renderSavannaPage from '../components/mini-game/savanna/render-savanna-page';
import learningWords from '../components/learningWords/learningWords';
import englishPuzzle from '../components/mini-game/english-puzzle';
import speakIt from '../components/mini-game/speak-it/start-page';
import renderOurGamePage from '../components/mini-game/our-game/our-game-render-page';
import audioCall from '../components/mini-game/audio-call/createAudioCallPage';
import initVocabulary from '../components/vocabulary/initVocabulary';
import renderStartSprintPage from '../components/mini-game/sprint/pages/StartSprintPage';
import gamesPages from '../components/gamesPage/gamesPage';
import renderTestGraph from '../components/chart/renderGraph';

const routes = {
  '#/': {
    requiresAuth: false,
    render: renderStartPage,
  },
  '#/settings': {
    requiresAuth: true,
    render: settings,
  },
  '#/auth': {
    requiresAuth: false,
    render: createSignInSignUpPage.init.bind(createSignInSignUpPage),
  },
  '#/about-team': {
    requiresAuth: false,
    render: renderTeamPage,
  },
  '#/hub': {
    requiresAuth: true,
    render: initHubPage,
  },
  '#/learning': {
    requiresAuth: true,
    render: learningWords,
  },
  '#/english-puzzle': {
    requiresAuth: true,
    render: englishPuzzle,
  },
  '#/speak-it': {
    requiresAuth: true,
    render: speakIt,
  },
  '#/audiocall': {
    requiresAuth: true,
    render: audioCall,
  },
  '#/savanna-game': {
    requiresAuth: true,
    render: renderSavannaPage,
  },
  '#/vocabulary': {
    requiresAuth: true,
    render: initVocabulary,
  },
  '#/sprint': {
    requiresAuth: true,
    render: renderStartSprintPage,
  },
  '#/our-game': {
    requiresAuth: true,
    render: renderOurGamePage,
  },
  '#/games': {
    requiresAuth: true,
    render: gamesPages,
  },
  '#/chart': {
    requiresAuth: true,
    render: renderTestGraph,
  },
};

export default routes;
