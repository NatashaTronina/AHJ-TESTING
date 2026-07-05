import './css/styles.css';
import { isValidCardNumber } from './js/luhn';
import { getPaymentSystem } from './js/paymentSystem';

import visaLogo from './img/visa.svg';
import mastercardLogo from './img/mastercard.svg';
import maestroLogo from './img/maestro.svg';
import mirLogo from './img/mir.svg';
import amexLogo from './img/amex.svg';
import discoverLogo from './img/discover.svg';
import jcbLogo from './img/jcb.svg';
import dinersclubLogo from './img/dinersclub.svg';

const LOGOS = [
  { system: 'visa', label: 'Visa', src: visaLogo },
  { system: 'mastercard', label: 'MasterCard', src: mastercardLogo },
  { system: 'maestro', label: 'Maestro', src: maestroLogo },
  { system: 'mir', label: 'Mir', src: mirLogo },
  { system: 'amex', label: 'American Express', src: amexLogo },
  { system: 'discover', label: 'Discover', src: discoverLogo },
  { system: 'jcb', label: 'JCB', src: jcbLogo },
  { system: 'dinersclub', label: 'Diners Club', src: dinersclubLogo },
];

function renderLogos(container) {
  LOGOS.forEach(({ system, label, src }) => {
    const item = document.createElement('li');
    item.className = 'validator__logo';
    item.dataset.system = system;

    const img = document.createElement('img');
    img.src = src;
    img.alt = label;
    img.title = label;

    item.appendChild(img);
    container.appendChild(item);
  });
}

function highlightPaymentSystem(container, system) {
  container.querySelectorAll('.validator__logo').forEach((item) => {
    item.classList.toggle('validator__logo--active', item.dataset.system === system);
    item.classList.toggle('validator__logo--dim', item.dataset.system !== system);
  });
}

function renderResult(resultElement, cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');

  if (!digits) {
    resultElement.textContent = '';
    resultElement.className = 'validator__result';
    return;
  }

  const isValid = isValidCardNumber(digits);
  resultElement.textContent = isValid ? 'Номер карты действителен' : 'Номер карты недействителен';
  resultElement.className = `validator__result ${isValid ? 'validator__result--valid' : 'validator__result--invalid'}`;
}

function init() {
  const logosContainer = document.getElementById('logos');
  const form = document.getElementById('card-form');
  const input = document.getElementById('card-input');
  const result = document.getElementById('result');

  renderLogos(logosContainer);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const cardNumber = input.value;
    const system = getPaymentSystem(cardNumber);

    highlightPaymentSystem(logosContainer, system);
    renderResult(result, cardNumber);
  });
}

document.addEventListener('DOMContentLoaded', init);
