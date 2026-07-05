const MIN_CARD_LENGTH = 12;
const MAX_CARD_LENGTH = 19;

export function isValidCardNumber(cardNumber) {
  const digits = String(cardNumber).replace(/\D/g, '');

  if (digits.length < MIN_CARD_LENGTH || digits.length > MAX_CARD_LENGTH) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export default isValidCardNumber;
