export function lastStoneWeight(stones: number[]) {
  while (stones.length > 1) {
    // Find the two heaviest stones manually
    let max1 = -1, max2 = -1;
    let idx1 = -1, idx2 = -1;

    for (let i = 0; i < stones.length; i++) {
      if (stones[i] > max1) {
        max2 = max1;
        idx2 = idx1;
        max1 = stones[i];
        idx1 = i;
      } else if (stones[i] > max2) {
        max2 = stones[i];
        idx2 = i;
      }
    }

    // Remove both stones
    stones.splice(idx1, 1); // Remove the heaviest first
    if (idx2 > idx1) idx2--; // Adjust second index if needed
    stones.splice(idx2, 1);

    // If not equal, push the difference
    if (max1 !== max2) {
      stones.push(max1 - max2);
    }
  }

  return stones[0] || 0;
}

export function lastStoneWeightSort(stones: number[]): number {
    while (stones.length > 1) {
        stones.sort((a, b) => a - b)
        const x = stones.pop();
        const y = stones.pop();

        if (x !== y) {
            stones.push(x - y)
        }
    }

    return stones[0] || 0
};