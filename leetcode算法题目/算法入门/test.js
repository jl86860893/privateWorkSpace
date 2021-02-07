function quickSort(arr) {
    process(arr, -1, 0, arr.length)
  }
  
  function process(depart, m, i, n) {
    let radomRight = Math.random() * arr.length;
    swap(arr, radomRight, arr.length-1)
    const nextborder = sortHL(arr, m, i, n-1, arr[radomRight])
    const {L,R} = nextborder;
    swap(arr, L+1, n-1)
    process(arr, m, m+1, L+1)
    process(arr, R-1, R, n)
  }
  
  function sortHL(arr, m, i, n, target) {
        if (m === n || i >= n) {
          return {
              L:m,
              R:n,
          };
      }
      if (arr[i] < target) {
          swap(arr, m+1, i)
          i += 1
          m += 1;
      } else if(arr[i] === target){
          i+=1
      } else {
          swap(arr, n-1, i)
          n -= 1;
      }
      process(arr, m, i, n)    
  }
  
  function swap(arr, a, b) {
      let temp = arr[a];
      arr[a] = arr[b];
      arr[b] = temp;
  }
  
  let arr = [3,6,4,5,7,5,2,0]
  quickSort(arr)
  console.log(arr)