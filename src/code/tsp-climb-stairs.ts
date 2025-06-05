export function climbStair(step: number): number {
  if (step <= 2) return step;

  const n: number[] = [];
  n[1] = 1;
  n[2] = 2;

  for (let i = 3; i <= step; i++) { // should be i <= step, not i < step
    n[i] = n[i - 1] + n[i - 2];
  }

  return n[step];
}

export function climbStairsNonArray(n: number): number {
    if (n <= 2) return n;

    let first = 1; // ways to climb 1 step
    let second = 2; // ways to climb 2 steps

    for (let i = 3; i <= n; i++) {
        const third = first + second;
        first = second;
        second = third;
    }

    return second;
}