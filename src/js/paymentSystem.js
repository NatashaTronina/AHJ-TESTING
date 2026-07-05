export const PAYMENT_SYSTEMS = [
  // Checked before MasterCard: 2200-2204 sits right below MasterCard's
  // 2221-2720 extended range, so order avoids ambiguity.
  { name: 'mir', regex: /^220[0-4]/ },
  { name: 'visa', regex: /^4/ },
  { name: 'mastercard', regex: /^(5[1-5]|2(22[1-9]|2[3-9]\d|[3-6]\d{2}|7[01]\d|720))/ },
  { name: 'maestro', regex: /^(5[0678]|6304|6390|67)/ },
  { name: 'amex', regex: /^3[47]/ },
  { name: 'dinersclub', regex: /^3(0[0-5]|[68])/ },
  { name: 'jcb', regex: /^35(2[89]|[3-8]\d)/ },
  { name: 'discover', regex: /^(6011|65|64[4-9]|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9[01]\d|92[0-5]))/ },
];

export function getPaymentSystem(cardNumber) {
  const digits = String(cardNumber).replace(/\D/g, '');
  const system = PAYMENT_SYSTEMS.find(({ regex }) => regex.test(digits));

  return system ? system.name : 'unknown';
}

export default getPaymentSystem;
