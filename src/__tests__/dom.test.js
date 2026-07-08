/**
 * @jest-environment jsdom
 */

import { initValidator } from '../js/dom';

const LOGOS = [
  { system: 'visa', label: 'Visa', src: 'visa.svg' },
  { system: 'mastercard', label: 'MasterCard', src: 'mastercard.svg' },
  { system: 'mir', label: 'Mir', src: 'mir.svg' },
];

function renderMarkup() {
  document.body.innerHTML = `
    <ul id="logos"></ul>
    <form id="card-form">
      <input id="card-input" />
      <button type="submit">Click to Validate</button>
    </form>
    <p id="result"></p>
  `;

  initValidator({
    logosContainer: document.getElementById('logos'),
    form: document.getElementById('card-form'),
    input: document.getElementById('card-input'),
    result: document.getElementById('result'),
    logos: LOGOS,
  });
}

function submit(cardNumber) {
  document.getElementById('card-input').value = cardNumber;
  document
    .getElementById('card-form')
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

describe('initValidator (DOM interaction)', () => {
  beforeEach(() => {
    renderMarkup();
  });

  test('renders one logo item per payment system on init', () => {
    expect(document.querySelectorAll('#logos .validator__logo')).toHaveLength(LOGOS.length);
  });

  test.each([
    ['4111111111111111', 'visa', 'Номер карты действителен'],
    ['4111111111111112', 'visa', 'Номер карты недействителен'],
    ['2204000000000000', 'mir', 'Номер карты действителен'],
    ['5555555555554444', 'mastercard', 'Номер карты действителен'],
  ])('submitting %s highlights %s and shows "%s"', (cardNumber, expectedSystem, expectedText) => {
    submit(cardNumber);

    const activeLogo = document.querySelector('.validator__logo--active');
    expect(activeLogo.dataset.system).toBe(expectedSystem);
    expect(document.getElementById('result').textContent).toBe(expectedText);
  });

  test('submitting an unrecognized number dims every logo and shows no active one', () => {
    submit('9999999999999999');

    expect(document.querySelector('.validator__logo--active')).toBeNull();
    expect(document.querySelectorAll('.validator__logo--dim')).toHaveLength(LOGOS.length);
  });

  test('submitting an empty value clears the result message', () => {
    submit('');

    expect(document.getElementById('result').textContent).toBe('');
  });
});
