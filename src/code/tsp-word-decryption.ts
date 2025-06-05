export function alphabetRunEncryption(str: string) {
  const SINGLE_OCCURRENCE_RIGHT = 'R';
  const SINGLE_OCCURRENCE_LEFT = 'L';
  const ZERO_OCCURRENCES = 'S';
  const NO_CHANGE = 'N';
  const SPECIALS = 'RLSN';

  function decrypt(piece: string) {
    if (piece.includes(SINGLE_OCCURRENCE_RIGHT)) {
      const c = piece.charAt(0);
      return String.fromCharCode(c.charCodeAt(0) - 1) + String.fromCharCode(c.charCodeAt(0) + 1);
    } else if (piece.includes(SINGLE_OCCURRENCE_LEFT)) {
      const c = piece.charAt(0);
      return String.fromCharCode(c.charCodeAt(0) + 1) + String.fromCharCode(c.charCodeAt(0) - 1);
    } else if (piece.includes(ZERO_OCCURRENCES)) {
      return piece.substring(0, 2);
    } else if (piece.includes(NO_CHANGE)) {
      const c = piece.charAt(0);
      return c + c;
    }

    const start = piece.charAt(0);
    const end = piece.charAt(piece.length - 1);
    if (start > end) {
      return String.fromCharCode(start.charCodeAt(0) + 1) + String.fromCharCode(end.charCodeAt(0) - 1);
    }
    return String.fromCharCode(start.charCodeAt(0) - 1) + String.fromCharCode(end.charCodeAt(0) + 1);
  }

  function findNextPiece(str: string, start: number) {
    let piece = '';
    const ascending = str.charAt(start) < str.charAt(start - 1);

    for (let i = start; i >= 0; i--) {
      const c = str.charAt(i);

      if (SPECIALS.includes(c) && piece.length === 0) {
        if ([SINGLE_OCCURRENCE_RIGHT, SINGLE_OCCURRENCE_LEFT, NO_CHANGE].includes(c)) {
          return str.substring(start - 1, start + 1);
        } else if (c === ZERO_OCCURRENCES) {
          return str.substring(start - 2, start + 1);
        }
      }

      if (i === start) {
        piece = c + piece;
        continue;
      }

      const prevC = str.charAt(i + 1);
      if (ascending && c === String.fromCharCode(prevC.charCodeAt(0) + 1)) {
        piece = c + piece;
      } else if (!ascending && c === String.fromCharCode(prevC.charCodeAt(0) - 1)) {
        piece = c + piece;
      } else {
        break;
      }
    }

    return piece;
  }

  let result = '';
  let i = str.length - 1;

  while (i >= 0) {
    const piece = findNextPiece(str, i);
    const decryption = decrypt(piece);

    if (result.length > 0 && result.charAt(0) === decryption.charAt(decryption.length - 1)) {
      result = decryption.substring(0, decryption.length - 1) + result;
    } else {
      result = decryption + result;
    }

    i -= piece.length;
  }

  return result;
}
