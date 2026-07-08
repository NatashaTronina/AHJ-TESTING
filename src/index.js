import './css/styles.css';
import { initValidator } from './js/dom';

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

function init() {
  initValidator({
    logosContainer: document.getElementById('logos'),
    form: document.getElementById('card-form'),
    input: document.getElementById('card-input'),
    result: document.getElementById('result'),
    logos: LOGOS,
  });
}

document.addEventListener('DOMContentLoaded', init);
