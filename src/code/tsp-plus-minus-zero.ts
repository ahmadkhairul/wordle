
export function plusMinusZero(digits: string) {
  const queue = [{
    index: 1,
    total: parseInt(digits[0]),
    ops: []
  }];

  while (queue.length > 0) {
    const { index, total, ops } = queue.shift();

    if (index === digits.length) {
      if (total === 0) return ops;
      continue;
    }

    const num = parseInt(digits[index]);

    queue.push({
      index: index + 1,
      total: total + num,
      ops: [...ops, '+']
    });

    queue.push({
      index: index + 1,
      total: total - num,
      ops: [...ops, '-']
    });
  }

  return "not possible";
}



export function plusMinusZeroRecursive(digits: string) {
  const result = findCombination(digits, 1, parseInt(digits[0]), []);

  return result || 'not possible';
}

export function findCombination(digits: string, index: number, currentTotal: number, ops: string[]) {
  if (index === digits.length) {
    return currentTotal === 0 ? ops : null;
  }

  const num = parseInt(digits[index]);

  // Try adding
  const withPlus = findCombination(digits, index + 1, currentTotal + num, [...ops, '+']);
  if (withPlus) return withPlus;

  // Try subtracting
  const withMinus = findCombination(digits, index + 1, currentTotal - num, [...ops, '-']);
  if (withMinus) return withMinus;

  return null;
}