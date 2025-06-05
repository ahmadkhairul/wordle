export function totalWord(sentence: string): { [key: string]: number } {
  const obj: { [key: string]: number } = {};
  const words = sentence.toLowerCase().split(' '); // Normalize casing & split

  for (const word of words) {
    obj[word] = (obj[word] || 0) + 1;
  }

  return obj;
}