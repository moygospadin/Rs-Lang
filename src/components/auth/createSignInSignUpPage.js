import createElement from '../../shared/createElement';
import signInUser from './signInUser';
import createUser from '../../services/createUser';
import checkTokenIsAlive from './checkTokenIsAlive';
import setSettingsToLocalStorage from '../settings/setSettingsToLocalStorage';
import postUserSettings from '../../services/postUserSettings';
import defaultSettings from '../settings/defaultSettings';
import getUserSettings from '../../services/getUserSettings';
import setProps from '../learningWords/setProps';
import info from '../hub/hub-page/info';
import setUserStatistics from '../../services/setUserStatistics'
import defaultStatistics from '../statistics/defaultStatistics';


const FORM_TYPE_SIGNUP = 'signUp';
const FORM_TYPE_SIGNIN = 'signIn';

class CreateSignInSignUpPage {
  constructor(func) {
    this.formType = FORM_TYPE_SIGNUP;
    this.createElement = func;
    this.passwordTipText = 'Password must contain at least 8 characters, at least one uppercase letter, one uppercase letter, one number and one special character from "+-_@$!%*?&#.,;:[]{}]."';
  }

  async formHandler(e) {
    e.preventDefault();
    if (!this.passwordCheck()) {
      this.password.classList.add('invalid-password');
      this.password.focus();
    } else {
      const credentials = {
        email: this.email.value,
        password: this.password.value,
      };
      if (this.formType === FORM_TYPE_SIGNUP) {
        try {
          await createUser(credentials);
          await signInUser(credentials);
          await setUserStatistics(defaultStatistics());
          await postUserSettings(defaultSettings);
          setSettingsToLocalStorage(defaultSettings);
          setProps();
          info.userEmail = credentials.email;
          window.location.hash = '#/hub';
        } catch (error) {
          this.errorField.textContent = error;
        }
      } else {
        try {
          await signInUser(credentials);
          const settings = await getUserSettings();
          setSettingsToLocalStorage(settings);
          setProps();
          info.userEmail = credentials.email;
          window.location.hash = '#/hub';
        } catch (error) {
          this.errorField.textContent = error;
        }
      }
    }
    return false;
  }

  passwordCheck() {
    const passValidRegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\+\-_@$!%*?&#\.,;\:\[\]\{\}])[A-Za-z\d\+\-_@$!%*?&#\.,;\:\[\]\{\}]{8,}$/);
    return !!this.password.value.match(passValidRegExp);
  }

  enterNewPassword() {
    this.password.classList.remove('invalid-password');
  }

  showPasswordTip() {
    if (this.formType === FORM_TYPE_SIGNUP) {
      this.errorField.textContent = '';
      this.passwordTip.style.left = `${this.password.offsetLeft}`;
      this.passwordTip.style.top = `${this.password.offsetHeight + this.password.offsetTop}px`;
      this.passwordTip.style.display = 'block';
      this.passwordTip.innerText = this.passwordTipText;
      const form = document.querySelector('.sign-in-form');
      form.append(this.passwordTip);
    }
  }

  hidePasswordTip() {
    this.passwordTip.style.display = 'none';
  }

  createTitle() {
    this.title = this.createElement('h2', 'auth-page__title');
    this.title.innerText = 'Create an account';
    return this.title;
  }

  createPasswordLabel() {
    const passwordLabel = this.createElement('label', 'sign-in-form__label');
    passwordLabel.innerText = 'Password';
    return passwordLabel;
  }

  createEmail() {
    const emailAttrs = [['type', 'email'], ['name', 'email'], ['placeholder', 'e-mail']];
    this.email = this.createElement('input', 'form-control', emailAttrs);
    this.email.addEventListener('focus', () => {
      this.errorField.textContent = '';
    });
    return this.email;
  }

  createEmailLabel() {
    const emailLabel = this.createElement('label', 'sign-in-form__label');
    emailLabel.innerText = 'Login';
    return emailLabel;
  }

  createPassword() {
    const passwordAttrs = [['type', 'password'], ['name', 'password'], ['placeholder', 'Password']];
    this.password = this.createElement('input', 'form-control', passwordAttrs);
    this.password.addEventListener('focus', this.showPasswordTip.bind(this));
    this.password.addEventListener('blur', this.hidePasswordTip.bind(this));
    this.password.addEventListener('keydown', this.enterNewPassword.bind(this));
    return this.password;
  }

  toggleSingInSignUpForm(e) {
    e.preventDefault();
    this.password.classList.remove('invalid-password');
    if (this.formType === FORM_TYPE_SIGNUP) {
      e.target.innerText = 'Create an account';
      this.submit.value = 'Sign in';
      this.title.innerText = 'Sign in to RS Lang';
      this.formType = FORM_TYPE_SIGNIN;
    } else {
      e.target.innerText = 'Already have an account';
      this.submit.value = 'Sign up';
      this.title.innerText = 'Create an account';
      this.formType = FORM_TYPE_SIGNUP;
    }
  }

  createToggleFormButton() {
    const toggleButton = this.createElement('button', ['btn', 'btn-default']);
    toggleButton.innerText = 'Already have an account';
    toggleButton.addEventListener('click', this.toggleSingInSignUpForm.bind(this));
    return toggleButton;
  }

  createSubmitButton() {
    const submitAttrs = [['type', 'submit']];
    this.submit = this.createElement('input', ['btn', 'btn_yellow', 'btn_medium'], submitAttrs);
    this.submit.value = 'Sign up';
    return this.submit;
  }

  createFormBlock(label, input) {
    const block = this.createElement('div', 'form-group');
    block.append(label, input);
    return block;
  }

  createForm() {
    const form = this.createElement('form', 'sign-in-form');
    this.passwordTip = this.createElement('div', 'password-tip');
    const emailBlock = this.createFormBlock(this.createEmailLabel(), this.createEmail());
    const passwordBlock = this.createFormBlock(this.createPasswordLabel(), this.createPassword());
    this.errorField = this.createElement('p', 'sign-in-form__error-msg');
    const formElements = [this.createTitle(), emailBlock, passwordBlock,
      this.passwordTip, this.errorField,
      this.createSubmitButton(), this.createToggleFormButton()];

    form.append(...formElements);
    form.addEventListener('submit', this.formHandler.bind(this));
    return form;
  }

  async init() {
    const root = document.querySelector('.root');
    const container = this.createElement('div', 'container');
    const formContainer = this.createElement('div', 'form-container');
    container.append(formContainer);
    formContainer.append(this.createForm());
    root.append(container);
    if (await checkTokenIsAlive()) {
      const settings = await getUserSettings();
      setSettingsToLocalStorage(settings);
      setProps();
      window.location.hash = '#/hub';
    }
  }
}

const createSignInSignUpPage = new CreateSignInSignUpPage(createElement);

export default createSignInSignUpPage;
