function isAnagram(s: string, t: string) {
    return s.split('').sort().join('') === t.split('').sort().join('')
};

function isAnagramHashmap(s: string, t: string): boolean {
    if (s.length !== t.length) return false

    const _s: { [key: string]: number } = {};

    for (let i of s) {
        _s[i] = (_s[i] || 0) + 1
    }

    for (let i of t) {
        if (!_s[i]) return false;
        _s[i]--
    }

    return true
};