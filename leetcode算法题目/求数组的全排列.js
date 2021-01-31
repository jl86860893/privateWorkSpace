const permuteRec = (nums, start, result) => {
  if (start === nums.length) {
    result.push([...nums]);
  } else {
    for (let i = start; i < nums.length; i++) {
      [nums[i], nums[start]] = [nums[start], nums[i]];
      permuteRec(nums, start + 1, result);
      [nums[i], nums[start]] = [nums[start], nums[i]];
    }
  }
}

// Time: O(n*n!), Space: O(n)
const permute = (nums = []) => {
  if (nums.length === 0) {
    return nums;
  }
  let result = [];
  permuteRec(nums, 0, result);
  return result;
}

module.exports = permute;