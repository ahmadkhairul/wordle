var lengthOfLongestSubstring = function (s: string) {
    let l = 0;
    let sett = new Set();
    let maxLen = 0;

    for (let r = 0; r < s.length; r++) {
        while (sett.has(s[r])) {
            sett.delete(s[l])
            l += 1
        }

        sett.add(s[r])
        maxLen = Math.max(maxLen, r - l + 1)
    }

    return maxLen
};