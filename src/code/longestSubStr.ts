function lengthOfLongestSubstring(s: string) {
  // current left window divider
  let l = 0;
  // current window length
  let sett = new Set();
  // current max window length
  let maxLen = 0;

  // loop through string
  for (let r = 0; r < s.length; r++) {
    // if current window has the alphabet delete the very left alphabet and slide to right
    while (sett.has(s[r])) {
      sett.delete(s[l])
      l += 1
    }

    // slide the very right window to right
    sett.add(s[r])
    // compare current longest window which is maxLeng with the newest window which is dividing the right
    // most window and the left most window + 1
    maxLen = Math.max(maxLen, r - l + 1)
  }

  return maxLen
};