import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculate } from '../src/lib/calculators';

test('P/E handles valid earnings and rejects zero or negative earnings', () => {
  assert.deepEqual(calculate('pe-ratio-calculator', 60, 3).ok, true);
  const result = calculate('pe-ratio-calculator', 60, 3);
  assert.ok(result.ok);
  assert.equal(result.value, 20);
  assert.equal(calculate('pe-ratio-calculator', 60, 0).ok, false);
  assert.equal(calculate('pe-ratio-calculator', 60, -3).ok, false);
});
test('market capitalization converts millions to actual shares', () => {
  const result = calculate('market-cap-calculator', 25, 40);
  assert.ok(result.ok);
  assert.equal(result.value, 1_000_000_000);
});
test('dividend yield allows zero income and rejects negative dividends', () => {
  const result = calculate('dividend-yield-calculator', 2, 50);
  assert.ok(result.ok);
  assert.equal(result.value, 4);
  const zero = calculate('dividend-yield-calculator', 0, 50);
  assert.ok(zero.ok);
  assert.equal(zero.value, 0);
  assert.equal(calculate('dividend-yield-calculator', -1, 50).ok, false);
});
test('invalid inputs and overflow never display infinite results', () => {
  assert.equal(calculate('market-cap-calculator', Number.NaN, 40).ok, false);
  assert.equal(calculate('market-cap-calculator', 0, 40).ok, false);
  assert.equal(calculate('market-cap-calculator', 1e308, 1e308).ok, false);
  assert.equal(calculate('pe-ratio-calculator', 1e308, 1e-300).ok, false);
  assert.equal(calculate('dividend-yield-calculator', 2, 0).ok, false);
});
