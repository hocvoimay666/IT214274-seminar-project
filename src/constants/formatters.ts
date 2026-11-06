export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatScore(score: number, total: number) {
  return `${score} / ${total}`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date);
}
