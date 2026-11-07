import { calculate, isCalculatorId } from '../lib/calculators';
const form = document.querySelector<HTMLFormElement>('[data-calculator]');
const first = form?.querySelector<HTMLInputElement>('[name="first"]');
const second = form?.querySelector<HTMLInputElement>('[name="second"]');
const result = form?.querySelector<HTMLElement>('[data-result]');
const output = result?.querySelector('output');
const explanation = result?.querySelector('p');

function updateResult(): void {
  if (
    !form ||
    !first ||
    !second ||
    !result ||
    !output ||
    !explanation ||
    !isCalculatorId(form.dataset.calculator)
  )
    return;
  const calculation = calculate(
    form.dataset.calculator,
    first.valueAsNumber,
    second.valueAsNumber,
  );
  result.classList.toggle('has-error', !calculation.ok);
  if (!calculation.ok) {
    output.textContent = 'Check your inputs';
    explanation.textContent = calculation.error;
    return;
  }
  const number =
    calculation.unit === 'USD'
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(calculation.value)
      : `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(calculation.value)}${calculation.unit}`;
  output.textContent = number;
  explanation.textContent = calculation.explanation;
}
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  updateResult();
});
form?.addEventListener('input', updateResult);
updateResult();

const inputs = form?.querySelector<HTMLFieldSetElement>(
  '[data-calculator-inputs]',
);
if (
  inputs &&
  form &&
  first &&
  second &&
  output &&
  explanation &&
  isCalculatorId(form.dataset.calculator)
) {
  inputs.disabled = false;
}
