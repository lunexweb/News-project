export function formatZAR(amount: number): string {
  try {
    return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `R${amount.toLocaleString()}`;
  }
}
