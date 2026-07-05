import { getPaymentSystem } from './paymentSystem';

describe('getPaymentSystem', () => {
  test.each([
    ['4111111111111111', 'visa'],
    ['5555555555554444', 'mastercard'],
    ['2223000048400011', 'mastercard'],
    ['6763000000000004', 'maestro'],
    ['2204000000000000', 'mir'],
    ['378282246310005', 'amex'],
    ['30569309025904', 'dinersclub'],
    ['3530111333300000', 'jcb'],
    ['6011111111111117', 'discover'],
  ])('detects %s as %s', (number, expected) => {
    expect(getPaymentSystem(number)).toBe(expected);
  });

  test('returns "unknown" for an unrecognized prefix', () => {
    expect(getPaymentSystem('9999999999999999')).toBe('unknown');
  });

  test('strips spaces and dashes before matching', () => {
    expect(getPaymentSystem('4111 1111 1111 1111')).toBe('visa');
    expect(getPaymentSystem('4111-1111-1111-1111')).toBe('visa');
  });

  test('returns "unknown" for an empty string', () => {
    expect(getPaymentSystem('')).toBe('unknown');
  });
});
