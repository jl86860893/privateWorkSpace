// Time: O(n^2), Space: O(n^2)
function countPalindromicSubstringsDP(str) {
  if (!str) {
    return 0;
  }

  const len = str.length;
  let count = 0;
  const d = [...Array(len)].map(x => Array(len));

  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        d[i][j] = true;
      } else if (i + 1 === j) {
        d[i][j] = str[i] === str[j];
      } else {
        d[i][j] = (str[i] === str[j] && d[i + 1][j - 1]);
      }

      if (d[i][j]) {
        count++;
      }
    }
  }

  return count;
}

const expand = (s, left, right) => {
  let count = 0;
  while (left >=0 && right < s.length && s[left] === s[right]) {
    ++count;
    --left;
    ++right;
  }
  return count;
}

// Time: O(n^2), Space: O(1)
function countPalindromicSubstringsExpand(str) {
  if (!str) {
    return 0;
  }
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    count += expand(str, i, i);
    count += expand(str, i, i + 1);
  }
  return count;
}

module.exports = {
  countPalindromicSubstringsDP,
  countPalindromicSubstringsExpand
};