// 求 x^11
// 11 = 1011  =>  x^8 * x^2 * x^1
function mathpow(x, n) {
  let result = 1;
  const N = Math.abs(n)
  for (let i = 0; i < N; ++i) {
    result *= x;
  }
  return n < 0 ? 1 / result : result;
}

function powFast(x, n) {
  let result = 1;
  const N = Math.abs(n)
  for (let i = 0; i < N; ++i) {
    result *= x;
  }
  return n < 0 ? 1 / result : result;
}