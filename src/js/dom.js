import { isValidCardNumber } from './luhn';
import { getPaymentSystem } from './paymentSystem';

export function renderLogos(container, logos) {
  logos.forEach(({ system, label, src }) => {
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

export function highlightPaymentSystem(container, system) {
  container.querySelectorAll('.validator__logo').forEach((item) => {
    item.classList.toggle('validator__logo--active', item.dataset.system === system);
    item.classList.toggle('validator__logo--dim', item.dataset.system !== system);
  });
}

export function renderResult(resultElement, cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');

  if (!digits) {
    resultElement.textContent = '';
    resultElement.className = 'validator__result';
    return;
  }

  const isValid = isValidCardNumber(digits);
  resultElement.textContent = isValid
    ? 'Номер карты действителен'
    : 'Номер карты недействителен';
  resultElement.className = `validator__result ${
    isValid ? 'validator__result--valid' : 'validator__result--invalid'
  }`;
}

export function initValidator({
  logosContainer, form, input, result, logos,
}) {
  renderLogos(logosContainer, logos);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const cardNumber = input.value;
    const system = getPaymentSystem(cardNumber);

    highlightPaymentSystem(logosContainer, system);
    renderResult(result, cardNumber);
  });
}

export default initValidator;
