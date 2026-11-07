export const calculatorIds = [
  'pe-ratio-calculator',
  'market-cap-calculator',
  'dividend-yield-calculator',
] as const;
export type CalculatorId = (typeof calculatorIds)[number];
export type Calculation =
  | { ok: true; value: number; unit: string; explanation: string }
  | { ok: false; error: string };

export function isCalculatorId(
  value: string | undefined,
): value is CalculatorId {
  return calculatorIds.some((id) => id === value);
}

export function calculate(
  id: CalculatorId,
  first: number,
  second: number,
): Calculation {
  if (!Number.isFinite(first) || !Number.isFinite(second)) {
    return { ok: false, error: 'Enter a valid number in both fields.' };
  }
  if (id === 'pe-ratio-calculator') {
    if (first <= 0)
      return { ok: false, error: 'Share price must be greater than zero.' };
    if (second <= 0)
      return {
        ok: false,
        error:
          second === 0
            ? 'P/E is undefined when earnings per share are zero.'
            : 'Negative earnings make P/E unsuitable for the usual valuation comparison. Review the company’s losses instead.',
      };
    const value = first / second;
    if (!Number.isFinite(value))
      return {
        ok: false,
        error: 'These inputs exceed the calculator’s numerical range.',
      };
    return {
      ok: true,
      value,
      unit: '×',
      explanation:
        'The share price is this many times the earnings per share you entered. It is not a buy or sell signal.',
    };
  }
  if (id === 'market-cap-calculator') {
    if (first <= 0 || second <= 0)
      return {
        ok: false,
        error:
          'Share price and shares outstanding must both be greater than zero.',
      };
    const value = first * second * 1_000_000;
    if (!Number.isFinite(value))
      return {
        ok: false,
        error: 'These inputs exceed the calculator’s numerical range.',
      };
    return {
      ok: true,
      value,
      unit: 'USD',
      explanation:
        'This is the equity market value implied by your inputs, not enterprise value or a valuation recommendation.',
    };
  }
  if (first < 0 || second <= 0)
    return {
      ok: false,
      error:
        'The dividend cannot be negative, and share price must be greater than zero.',
    };
  const value = (first / second) * 100;
  if (!Number.isFinite(value))
    return {
      ok: false,
      error: 'These inputs exceed the calculator’s numerical range.',
    };
  return {
    ok: true,
    value,
    unit: '%',
    explanation:
      'This yield uses the annual dividend you entered. Payments can change; it is not a guaranteed return and excludes share-price changes and tax.',
  };
}

export const calculatorContent = {
  'pe-ratio-calculator': {
    title: 'P/E ratio calculator',
    description:
      'See how a share price compares with earnings per share. Use consistent currencies and a clearly defined earnings period.',
    firstLabel: 'Share price (USD)',
    secondLabel: 'Earnings per share (USD)',
    firstDefault: 60,
    secondDefault: 3,
    secondHint:
      'Use trailing 12-month EPS, or a forward estimate. Do not mix the two.',
    formula: 'Share price ÷ earnings per share',
    related: '/learn/negative-pe-ratio/',
  },
  'market-cap-calculator': {
    title: 'Market cap calculator',
    description:
      'Calculate a company’s equity market value from its share price and outstanding shares.',
    firstLabel: 'Share price (USD)',
    secondLabel: 'Shares outstanding (millions)',
    firstDefault: 25,
    secondDefault: 40,
    secondHint:
      'Enter 40 for 40 million shares. Use shares outstanding, not daily trading volume.',
    formula: 'Share price × shares outstanding',
    related: '/learn/how-to-research-stocks/',
  },
  'dividend-yield-calculator': {
    title: 'Dividend yield calculator',
    description:
      'Calculate dividend yield from an annual dividend per share and a share price. The result is an estimate, not a promised payout.',
    firstLabel: 'Annual dividend per share (USD)',
    secondLabel: 'Share price (USD)',
    firstDefault: 2,
    secondDefault: 50,
    secondHint:
      'Use the current share price for current yield, rather than your purchase price.',
    formula: 'Annual dividend per share ÷ share price × 100',
    related: '/learn/how-to-research-stocks/',
  },
} satisfies Record<
  CalculatorId,
  {
    title: string;
    description: string;
    firstLabel: string;
    secondLabel: string;
    firstDefault: number;
    secondDefault: number;
    secondHint: string;
    formula: string;
    related: string;
  }
>;
