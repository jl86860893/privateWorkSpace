
function isPalindromeString(x) {
  const str = x.toString(); 
  let i = 0, j = str.length - 1; 
  while (i < j) {
    if (str.charAt(i) !== str.charAt(j)) {
      return false;
    }
    ++i;
    --j;
  } 
  return true;
}

function isPalindrome(x) {
  if (x < 0) {
    return false;
  }
  let tmp = x;
  let y = 0;
  while (tmp) {
    let num = tmp % 10;
    y = y * 10 + num;
    tmp = Math.floor(tmp / 10);
  }
  return y === x;
}

module.exports = {
  isPalindromeString,
  isPalindrome
};